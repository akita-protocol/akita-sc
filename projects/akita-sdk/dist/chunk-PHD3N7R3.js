"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkEBWCKG2Cjs = require('./chunk-EBWCKG2C.js');


var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkKLHVDYDWjs = require('./chunk-KLHVDYDW.js');


var _chunkHFHM5QOFjs = require('./chunk-HFHM5QOF.js');

// src/auction/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/AuctionClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Auction", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "BidInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }, { "name": "marketplace", "type": "address" }, { "name": "refunded", "type": "bool" }], "FindWinnerCursors": [{ "name": "startingIndex", "type": "uint64" }, { "name": "currentRangeStart", "type": "uint64" }], "AkitaConfig": [{ "name": "akitaDao", "type": "uint64" }, { "name": "akitaDaoEscrow", "type": "EscrowConfig" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAsset" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "seller" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "(uint64,(string,uint64))", "struct": "AkitaConfig", "name": "akitaConfig" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancel", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "deletes the application & returns the mbr + asset\nto the seller IF the auction hasn't started", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "bid", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "bidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundBid", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimPrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "hasBid", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool", "desc": "a boolean of whether the address has bid in the auction" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMinimumBidAmount", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 25, "bytes": 10 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset up for auction" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "whether the prize has been claimed" }, "bidAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2Fzc2V0", "desc": "the asset that is being used for bidding in the auction" }, "bidFee": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2ZlZQ==", "desc": "the percentage fee to take for the raffle on each bid in hundreds to support two decimals" }, "startingBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRpbmdfYmlk", "desc": "the starting amount to begin bids at" }, "bidMinimumIncrease": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX21pbmltdW1faW5jcmVhc2U=", "desc": "the smallest amount each new bid need increment the auction price" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "the unix time that the auction starts on" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "the round that the auction ends on" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the royalty percentage the creator will get for the auction" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that created the auction to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the royalty percentage each side of the market will take for the auction" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to bid in the auction" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "refundCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX2NvdW50", "desc": "the number of bids that have been refunded" }, "bidTotal": { "keyType": "AVMString", "valueType": "uint128", "key": "YmlkX3RvdGFs", "desc": "the total sum of all bids" }, "weightedBidTotal": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0ZWRfYmlkX3RvdGFs", "desc": "the total sum of all highest bids" }, "highestBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aGlnaGVzdF9iaWQ=", "desc": "highest bid the contract has received thus far" }, "bidID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2lk", "desc": "the id or index of the last bid" }, "raffleAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX2Ftb3VudA==", "desc": "the total amount collected for the loser raffle" }, "rafflePrizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3ByaXplX2NsYWltZWQ=", "desc": "whether the raffle winner has claimed their prize" }, "uniqueAddressCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dW5pcXVlX2FkZHJlc3NfY291bnQ=", "desc": "we count how many unique addresses bid so we can\nproperly get each bids % of the total bid amount" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "we get the winning number from the randomness beacon\nafter the auction ends & we have ran findWinner\nto compile our list" }, "raffleWinner": { "keyType": "AVMString", "valueType": "address", "key": "cmFmZmxlX3dpbm5lcg==", "desc": "the winning address of the raffle" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "salt for randomness" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called after auction ends\nused for VRF since round times are dynamic and we need a deterministic round" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "bids": { "keyType": "uint64", "valueType": "BidInfo", "desc": "the list of bids in the auction", "prefix": "Yg==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "bidsByAddress": { "keyType": "address", "valueType": "uint64", "desc": "when we run our raffle we need to transform\nour list of bids into an address based box", "prefix": "YQ==" }, "locations": { "keyType": "uint64", "valueType": "address", "desc": "the addresses associated with highest bid locations", "prefix": "bA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3768, 3957, 4033, 4136, 5991, 6915], "errorMessage": "Box must have value" }, { "pc": [1213, 1443, 1595, 3097, 4913, 6394], "errorMessage": "Bytes has valid prefix" }, { "pc": [2540], "errorMessage": "ERR:AAST" }, { "pc": [2963, 3513, 4102, 5494], "errorMessage": "ERR:AHNE" }, { "pc": [2702, 2763, 2846, 2918], "errorMessage": "ERR:ANLV" }, { "pc": [3894], "errorMessage": "ERR:ARFC" }, { "pc": [6947], "errorMessage": "ERR:BARF" }, { "pc": [6912], "errorMessage": "ERR:BNFD" }, { "pc": [6886], "errorMessage": "ERR:CRMR" }, { "pc": [2729, 2873], "errorMessage": "ERR:FGTE" }, { "pc": [5862], "errorMessage": "ERR:FORB" }, { "pc": [2775, 2930], "errorMessage": "ERR:HGTE" }, { "pc": [2141], "errorMessage": "ERR:IAPP" }, { "pc": [2056], "errorMessage": "ERR:IAST" }, { "pc": [2287, 2299, 6589, 6602, 6718, 6732], "errorMessage": "ERR:IPAY" }, { "pc": [5905], "errorMessage": "ERR:IPMA" }, { "pc": [5884], "errorMessage": "ERR:IPMR" }, { "pc": [3268, 3280], "errorMessage": "ERR:IRBD" }, { "pc": [3174], "errorMessage": "ERR:IRSD" }, { "pc": [5782], "errorMessage": "ERR:IUPG" }, { "pc": [6753, 6763, 6779], "errorMessage": "ERR:IXFR" }, { "pc": [2269], "errorMessage": "ERR:M3HB" }, { "pc": [2018, 2238, 2343, 2517], "errorMessage": "ERR:MBFF" }, { "pc": [2250, 3499], "errorMessage": "ERR:NAPP" }, { "pc": [2374, 2424], "errorMessage": "ERR:NARC" }, { "pc": [5709, 5753, 5818], "errorMessage": "ERR:NDAO" }, { "pc": [4947], "errorMessage": "ERR:NESC" }, { "pc": [3034], "errorMessage": "ERR:NETM" }, { "pc": [4122], "errorMessage": "ERR:PACL" }, { "pc": [2386, 3841, 5506], "errorMessage": "ERR:PZNC" }, { "pc": [5328], "errorMessage": "ERR:RAPC" }, { "pc": [5526], "errorMessage": "ERR:RNPC" }, { "pc": [2406], "errorMessage": "ERR:RWHC" }, { "pc": [2436, 2552], "errorMessage": "ERR:SHBB" }, { "pc": [6099], "errorMessage": "ERR:TMPT" }, { "pc": [2983], "errorMessage": "ERR:WADR" }, { "pc": [3556], "errorMessage": "ERR:WAFD" }, { "pc": [4971], "errorMessage": "ERR:WESC" }, { "pc": [3868, 5308], "errorMessage": "ERR:WNFD" }, { "pc": [3533], "errorMessage": "ERR:WNNF" }, { "pc": [1718, 5350, 6232, 6285, 6427, 6468], "errorMessage": "IPCT" }, { "pc": [1345], "errorMessage": "NCCA" }, { "pc": [1378, 1464, 1484, 1496, 1506, 1617, 2123, 4240, 4410, 4429, 5033, 5082, 5162, 5380, 5428, 5701, 5745, 5810], "errorMessage": "application exists" }, { "pc": [2041, 4318, 4576, 4595, 4632], "errorMessage": "asset exists" }, { "pc": [2194, 2243, 2348, 2358, 2366, 2379, 2391, 2411, 2416, 2429, 2441, 2451, 2466, 2476, 2524, 2545, 2557, 2566, 2570, 2590, 2600, 2631, 2635, 2684, 2706, 2711, 2768, 2828, 2850, 2855, 2923, 2955, 2968, 2988, 3004, 3009, 3041, 3053, 3123, 3242, 3492, 3505, 3518, 3538, 3561, 3575, 3586, 3596, 3630, 3715, 3741, 3750, 3834, 3846, 3854, 3873, 3878, 3905, 3910, 3976, 4073, 4094, 4107, 4127, 4156, 4164, 4185, 4214, 4234, 4259, 4291, 4307, 4315, 4341, 4385, 4404, 4414, 4426, 4433, 4453, 4457, 4470, 4474, 4493, 4508, 4527, 4531, 4544, 4548, 4566, 4573, 4580, 4592, 4599, 4621, 4625, 4629, 4667, 4671, 4676, 4711, 4715, 4753, 4757, 4762, 4800, 4804, 4837, 5028, 5186, 5190, 5213, 5236, 5255, 5259, 5298, 5313, 5332, 5344, 5365, 5374, 5399, 5422, 5432, 5455, 5486, 5499, 5511, 5547, 5570, 5694, 5738, 5757, 5803, 5930, 5970, 6022, 6035, 6058, 6075, 6080, 6104, 6122, 6168, 6191, 6227, 6247, 6272, 6280, 6302, 6317, 6343, 6348, 6455, 6463, 6485, 6616, 6627, 6639, 6651, 6671, 6771, 6793, 6804, 6816, 6828, 6848, 6866, 6970, 6990, 7002, 7025, 7035, 7048, 7056, 7061, 7068], "errorMessage": "check GlobalState exists" }, { "pc": [6061, 6173], "errorMessage": "index access is out of bounds" }, { "pc": [3708, 6012, 6049, 6158, 6960], "errorMessage": "index out of bounds" }, { "pc": [1216, 1357, 1952, 2004, 3100, 4916, 5067, 5683, 5721], "errorMessage": "invalid array length header" }, { "pc": [1832], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1960, 5729], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [4926], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1915, 1946, 2680, 2753, 2824, 2908, 5629], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1823, 1842, 1851, 1861, 1871, 1881, 1891, 1923, 1933, 2225, 2943, 3486, 3828, 5479, 5796, 5841], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1223, 3107], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [2009], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::AkitaConfig" }, { "pc": [5688], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1904], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1448, 1600, 6399], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [2e3, 5675], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1980], "errorMessage": "invalid tail pointer at index 1 of (uint64,((len+utf8[]),uint64))" }, { "pc": [1975, 1995, 5670], "errorMessage": "invalid tuple encoding" }, { "pc": [2671, 2813], "errorMessage": "transaction type is appl" }, { "pc": [2802, 2899], "errorMessage": "transaction type is axfer" }, { "pc": [2217, 2660, 2744, 2791, 2889, 5833], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgNDA5NiAxODQ0Njc0NDA3MzcwOTU1MTYxNSA2MzY0MTM2MjIzODQ2NzkzMDA1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSAzNDkwMCA1MzQwMCA3MjMwMCA0Mjk0OTY3Mjk1IDEzMTEzMzAwCiAgICBieXRlY2Jsb2NrICJiaWRfYXNzZXQiICJha2l0YV9kYW8iICJwcml6ZSIgImVuZF90aW1lc3RhbXAiICJiaWRfaWQiICJiaWRfZmVlIiAweDE1MWY3Yzc1ICJhIiAiaXNfcHJpemVfYm94IiAic2VsbGVyIiAid190b3RhbHMiICJ3ZWlnaHRzX2JveF9jb3VudCIgIndpbm5pbmdfdGlja2V0IiAweDAwMDEgImFraXRhX2VzY3JvdyIgInJhZmZsZV93aW5uZXIiICJ3ZWlnaHRlZF9iaWRfdG90YWwiICJoaWdoZXN0X2JpZCIgInJhZmZsZV9hbW91bnQiICJyZWZ1bmRfbWJyX2N1cnNvciIgInByaXplX2NsYWltZWQiICJFUlI6SVBBWSIgInZyZl9mYWlsdXJlX2NvdW50IiAicmFmZmxlX3ByaXplX2NsYWltZWQiICJ1bmlxdWVfYWRkcmVzc19jb3VudCIgImdhdGVfaWQiICJtYXJrZXRwbGFjZSIgInciICJ3YWxsZXQiICJyZWZ1bmRfY291bnQiICJyYWZmbGVfcm91bmQiICJFUlI6TUJGRiIgImNyZWF0b3Jfcm95YWx0eSIgIm1hcmtldHBsYWNlX3JveWFsdGllcyIgIkVSUjpBTkxWIiAiRVJSOkFITkUiICJiIiAic3RhcnRfdGltZXN0YW1wIiAiZmluZF93aW5uZXJfY3Vyc29ycyIgIm5mdF9mZWVzIiAiRVJSOlBaTkMiICJsIiAweDAwICJFUlI6TkRBTyIgIkVSUjpJWEZSIiAweDA2ODEwMSAib2FsIiAiYWFsIiAic3RhcnRpbmdfYmlkIiAiYmlkX21pbmltdW1faW5jcmVhc2UiICJ2ZXJzaW9uIiAic2FsdCIgIkVSUjpOQVBQIiAiRVJSOk5BUkMiICJFUlI6U0hCQiIgMHhhZGY5MmFlNCAiRVJSOkZHVEUiICJFUlI6SEdURSIgMHgwMDAwICJFUlI6SVJCRCIgIkVSUjpXTkZEIiAicGFsIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIyIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MQogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAyOSAvLyAicmVmdW5kX2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxNiAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAxNyAvLyAiaGlnaGVzdF9iaWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV9hbW91bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OAogICAgLy8gdW5pcXVlQWRkcmVzc0NvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlVbmlxdWVBZGRyZXNzQ291bnQgfSkKICAgIGJ5dGVjIDI0IC8vICJ1bmlxdWVfYWRkcmVzc19jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxOSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMiAvLyAid2lubmluZ190aWNrZXQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDMwIC8vICJyYWZmbGVfcm91bmQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMy0yOAogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDI0ODdjMzJjIDB4MzFmMjZhOWIgMHhlYTkxODBkZCAvLyBtZXRob2QgImRlbGV0ZUFwcGxpY2F0aW9uKCl2b2lkIiwgbWV0aG9kICJjYW5jZWwoKXZvaWQiLCBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANCBtYWluX2NhbmNlbF9yb3V0ZUA1IG1haW5fdXBkYXRlX3JvdXRlQDYKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMy0yOAogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzMAogICAgcHVzaGJ5dGVzcyAweGJkNzE0OGQwIDB4OTgzNmM4OWYgMHg0ZDU4NTY5NyAweGQ5ZjRmMDNhIDB4NzY5NTI5MzEgMHhiOWUzOWM1YyAweDY5NjUwMWRlIDB4YmQxYjI3ZDEgMHhmMmNlMmY0NiAweDlkYWYwNTBhIDB4NjVmY2E5OGIgMHgwNWU1ZGU0ZCAweDhmYTRhMTYwIDB4NjA4MjMwM2MgMHgyMDg5NWUyNiAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDNlYTExODMyIDB4NzMxMTEwNzAgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWQocGF5LGFwcGwsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJiaWQocGF5LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWRBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJiaWRBc2EocGF5LGF4ZmVyLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicmVmdW5kQmlkKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJyYWZmbGUoKXZvaWQiLCBtZXRob2QgImZpbmRXaW5uZXIodWludDY0KXZvaWQiLCBtZXRob2QgInJlZnVuZE1CUih1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2xhaW1Qcml6ZSgpdm9pZCIsIG1ldGhvZCAiY2xhaW1SYWZmbGVQcml6ZSgpdm9pZCIsIG1ldGhvZCAiY2xlYXJXZWlnaHRzQm94ZXModWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiaXNMaXZlKClib29sIiwgbWV0aG9kICJoYXNCaWQoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRNaW5pbXVtQmlkQW1vdW50KCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBnYXRlZEJpZCBiaWQgZ2F0ZWRCaWRBc2EgYmlkQXNhIHJlZnVuZEJpZCByYWZmbGUgZmluZFdpbm5lciByZWZ1bmRNQlIgY2xhaW1Qcml6ZSBjbGFpbVJhZmZsZVByaXplIGNsZWFyV2VpZ2h0c0JveGVzIGlzTGl2ZSBoYXNCaWQgZ2V0TWluaW11bUJpZEFtb3VudCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMjYgb3B0aW4gbWFpbl9tYnJfcm91dGVAMjgKICAgIGVycgoKbWFpbl9tYnJfcm91dGVAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9iYXNlLnRzOjcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ4NDQwMDAwMDAwMDAwMDA0OWQ0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMy0yOAogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzIDB4ODJmZmEyY2UgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsKHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIGludGNfMyAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKbWFpbl9jYW5jZWxfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiBjYW5jZWwKCm1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiBkZWxldGVBcHBsaWNhdGlvbgoKCi8vIF9wdXlhX2xpYi51dGlsLmVuc3VyZV9idWRnZXQocmVxdWlyZWRfYnVkZ2V0OiB1aW50NjQsIGZlZV9zb3VyY2U6IHVpbnQ2NCkgLT4gdm9pZDoKZW5zdXJlX2J1ZGdldDoKICAgIHByb3RvIDIgMAogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDEwCiAgICArCgplbnN1cmVfYnVkZ2V0X3doaWxlX3RvcEAxOgogICAgZHVwCiAgICBnbG9iYWwgT3Bjb2RlQnVkZ2V0CiAgICA+CiAgICBieiBlbnN1cmVfYnVkZ2V0X2FmdGVyX3doaWxlQDYKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBieXRlYyA0NSAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW0KICAgIGJ5dGVjIDQ1IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3aXRjaCBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzBAMyBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzFANAoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICBpdHhuX3N1Ym1pdAogICAgYiBlbnN1cmVfYnVkZ2V0X3doaWxlX3RvcEAxCgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzFANDoKICAgIGdsb2JhbCBNaW5UeG5GZWUKICAgIGl0eG5fZmllbGQgRmVlCiAgICBiIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1CgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzBAMzoKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgYiBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANQoKZW5zdXJlX2J1ZGdldF9hZnRlcl93aGlsZUA2OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo6X19wY2czMk91dHB1dChzdGF0ZTogdWludDY0KSAtPiB1aW50NjQ6Cl9fcGNnMzJPdXRwdXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gX19wY2czMk91dHB1dChzdGF0ZTogUENHMzJTVEFURSk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzAKICAgIC8vIGNvbnN0IHhvcnNoaWZ0ZWQgPSBfX21hc2tUb1VpbnQzMihvcC5zaHIob3Auc2hyKHN0YXRlLCAxOCkgXiBzdGF0ZSwgMjcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDE4CiAgICBzaHIKICAgIGZyYW1lX2RpZyAtMQogICAgXgogICAgcHVzaGludCAyNwogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE5CiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDEzIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzEKICAgIC8vIGNvbnN0IHJvdCA9IG9wLnNocihzdGF0ZSwgNTkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgNTkKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgZHVwMgogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyh+dmFsdWUsIDEpCiAgICBzd2FwCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICBwdXNoaW50IDMxCiAgICAmCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIHNobAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOQogICAgLy8gcmV0dXJuIHZhbHVlICYgKG9wLnNobCgxLCAzMikgLSAxKQogICAgaW50YyAxMyAvLyA0Mjk0OTY3Mjk1CiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICB8CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PclR4blNlbmRlcih3YWxsZXRJRDogdWludDY0KSAtPiBieXRlczoKb3JpZ2luT3JUeG5TZW5kZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgcmV0c3ViCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjcKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgcHVzaGJ5dGVzICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDQ2IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4Ni0xODkKICAgIC8vIGNvbnN0IGRhdGEgPSBhYmlDYWxsPHR5cGVvZiBFc2Nyb3dGYWN0b3J5LnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGVzY3Jvd0ZhY3RvcnksCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4M2MxYTZmMzMgLy8gbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIHN3YXAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIGIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdhdGVDaGVjayhnYXRlVHhuOiB1aW50NjQsIGFraXRhREFPOiB1aW50NjQsIGNhbGxlcjogYnl0ZXMsIGlkOiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2F0ZUNoZWNrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDcKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnYXRlQ2hlY2soZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFraXRhREFPOiBBcHBsaWNhdGlvbiwgY2FsbGVyOiBBY2NvdW50LCBpZDogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byA0IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgNDcgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTAKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MQogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIGludGNfMyAvLyA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUxCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUyCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUzCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU0CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjU0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDgtMjU1CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ4LTI1NQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IGJ5dGVzLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IHVpbnQ2NCkgLT4gYnl0ZXMsIGJ5dGVzOgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzQKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sIHN1bTogdWludDY0LCBjbG9zZU91dDogYm9vbGVhbik6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gNyAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzNQogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgRVJSX0NBTk5PVF9DTE9TRV9PVVRfT0ZfQUxHT19GT1JCSURERU4pCiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM1CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGFzc2VydCAvLyBOQ0NBCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTcKICAgIGJ5dGVjIDQ3IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzNgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOQogICAgLy8gbGV0IGNvc3Q6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDQxNzAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MAogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MS01NTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDUKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NgogICAgLy8gYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgZGlnIDIKICAgIGZyYW1lX2RpZyAtMgogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ0LTU0NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDEtNTUyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDgKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDkKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MS01NTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4N2I3ZGM1ZmMgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MwogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1NAogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtNgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5CiAgICBkaWcgMQogICAgY292ZXIgMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY4CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NAogICAgLy8gaWYgKGNsb3NlT3V0KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzUKICAgIC8vIHRyYW5zZmVyVHhuLnNldCh7IGFzc2V0Q2xvc2VUbzogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcyB9KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTc4LTU5MAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4MgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgxLTU4NAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODUKICAgIC8vIHRyYW5zZmVyVHhuLAogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgMAogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3CiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNzoKICAgIGZyYW1lX2RpZyAtNgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2OC01NzIKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHN1bSwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTc4LTU5MAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg2CiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg3CiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzgtNTkwCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGFmMWExNGYyIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDYgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTUKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Ni01NjUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYwCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cG4gMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjEKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OS01NjIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Ni01NjUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjMKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU2LTU2NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpzZW5kUmVmZXJyYWxQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDcKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiBSZWZlcnJhbFBheW1lbnRJbmZvIHsKICAgIHByb3RvIDMgMQogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOAogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC0zCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMQogICAgYnVyeSAxCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEyCiAgICAvLyBpZiAoYW1vdW50ID4gMCAmJiByZWZlcnJlciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICBkdXAKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBjb25zdCBbd2FsbGV0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldEZlZXMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTQKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE3CiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxOAogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI0CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjUKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgZHVwCiAgICBwdXNoaW50IDYwNDgwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjYKICAgIC8vIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMS02MjkKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEtNjI5CiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMxCiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM0CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogYW1vdW50LCByZWZlcnJhbE1icjogMCB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTE6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc1CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbWJyLnRzOjpGdW5kZXJJbmZvCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50NjQsKChsZW4rdXRmOFtdKSx1aW50NjQpKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQ29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkICE9PSAwLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6TUJGRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQkZGCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyB0aGlzLnByaXplLnZhbHVlID0gcHJpemUKICAgIHVuY292ZXIgMTYKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDggLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyB0aGlzLmlzUHJpemVCb3gudmFsdWUgPSBpc1ByaXplQm94CiAgICB1bmNvdmVyIDE1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjAgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gaWYgKGJpZEFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMgogICAgYnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldChiaWRBc3NldCkudG90YWwgPiAwLCBFUlJfSU5WQUxJRF9BU1NFVCkKICAgIGRpZyAyCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0VG90YWwKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGJueiBjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3CiAgICBwdXNoYnl0ZXMgIkVSUjpJQVNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBU1QKCmNyZWF0ZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlID0gQXNzZXQoYmlkQXNzZXQpCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0MgogICAgLy8gdGhpcy5iaWRGZWUudmFsdWUgPSBiaWRGZWUKICAgIHVuY292ZXIgMTMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBzdGFydGluZ0JpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0aW5nQmlkIH0pCiAgICBieXRlYyA0OCAvLyAic3RhcnRpbmdfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUgPSBzdGFydGluZ0JpZAogICAgdW5jb3ZlciAxMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZE1pbmltdW1JbmNyZWFzZSB9KQogICAgYnl0ZWMgNDkgLy8gImJpZF9taW5pbXVtX2luY3JlYXNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIHRoaXMuYmlkTWluaW11bUluY3JlYXNlLnZhbHVlID0gYmlkTWluaW11bUluY3JlYXNlCiAgICB1bmNvdmVyIDExCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NwogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzcgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlID0gc3RhcnRUaW1lc3RhbXAKICAgIHVuY292ZXIgMTAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgPSBlbmRUaW1lc3RhbXAKICAgIHVuY292ZXIgOQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyB0aGlzLmZ1bmRlci52YWx1ZSA9IGNsb25lKGZ1bmRlcikKICAgIHVuY292ZXIgOAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDkgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ4CiAgICAvLyB0aGlzLnNlbGxlci52YWx1ZSA9IHNlbGxlcgogICAgdW5jb3ZlciA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MwogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzIgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIHVuY292ZXIgNgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gdGhpcy5nYXRlSUQudmFsdWUgPSBnYXRlSUQKICAgIHVuY292ZXIgNQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1MQogICAgLy8gdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSA9IG1hcmtldHBsYWNlCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFraXRhQ29uZmlnLmFraXRhREFPLmFkZHJlc3MgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX0lOVkFMSURfQVBQKQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6SUFQUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVBQCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFDb25maWcuYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxNCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NTYKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YUNvbmZpZy5ha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTAgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1OAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTYxCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZSA9IG5ldyBTdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBwdXNoaW50IDEyMAogICAgYnplcm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMCAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWUgPSBuZXcgU3RhdGljQXJyYXk8VWludDY0LCAxNT4oKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyQ3Vyc29ycyB9KQogICAgYnl0ZWMgMzggLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsgc3RhcnRpbmdJbmRleDogMCwgY3VycmVudFJhbmdlU3RhcnQ6IDEgfQogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTUgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEwCiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM8MzI+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNTEgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2NAogICAgLy8gdGhpcy5zYWx0LnZhbHVlID0gVHhuLnR4SWQKICAgIHR4biBUeElECiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25Db21wb3NhYmxlUGVyY2VudGFnZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25Db21wb3NhYmxlUGVyY2VudGFnZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyAzOSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NQogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMzMgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxNAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmluaXRbcm91dGluZ10oKSAtPiB2b2lkOgppbml0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzEgLy8gIkVSUjpNQkZGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1CRkYKCmluaXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgRVJSX05PVF9BUFBMSUNBQkxFX1RPX1RISVNfQVVDVElPTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgRVJSX05PVF9BUFBMSUNBQkxFX1RPX1RISVNfQVVDVElPTikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTIgLy8gIkVSUjpOQVBQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BUFAKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPj0gMywgRVJSX01VU1RfQUxMT0NBVEVfQVRfTEVBU1RfVEhSRUVfSElHSEVTVF9CSURTX0NIVU5LUykKICAgIGR1cAogICAgcHVzaGludCAzCiAgICA+PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOk0zSEIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TTNIQgoKaW5pdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSB3ZWlnaHRMaXN0TGVuZ3RoICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBkdXAKICAgIGludGMgMTQgLy8gMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIxIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgppbml0X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gd2VpZ2h0c01CUiwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAyMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKaW5pdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3OQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHdlaWdodExpc3RMZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmluaXRfd2hpbGVfdG9wQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGJ6IGluaXRfYWZ0ZXJfd2hpbGVAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIHRoaXMud2VpZ2h0cyhpKS5jcmVhdGUoKQogICAgcHVzaGludCAzMjc2OAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3OQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHdlaWdodExpc3RMZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgaW5pdF93aGlsZV90b3BAMTIKCmluaXRfYWZ0ZXJfd2hpbGVAMTQ6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID0gd2VpZ2h0TGlzdExlbmd0aAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyBpbml0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgd2VpZ2h0TGlzdExlbmd0aDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5kZWxldGVBcHBsaWNhdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUFwcGxpY2F0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6TUJGRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQkZGCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyBjb25zdCBleHBlY3RlZFJlZnVuZENvdW50OiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlID4gMSA/IHRoaXMuYmlkSUQudmFsdWUgLSAyIDogMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfZmFsc2VANQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICAtCgpkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmdW5kQ291bnQudmFsdWUgPT09IGV4cGVjdGVkUmVmdW5kQ291bnQsIEVSUl9OT1RfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MQogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAyOSAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJlZnVuZENvdW50LnZhbHVlID09PSBleHBlY3RlZFJlZnVuZENvdW50LCBFUlJfTk9UX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDUzIC8vICJFUlI6TkFSQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQVJDCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyMCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyA0MCAvLyAiRVJSOlBaTkMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UFpOQwoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9XSU5ORVJfSEFTX05PVF9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIEVSUl9SQUZGTEVfV0lOTkVSX0hBU19OT1RfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjpSV0hDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlJXSEMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyBjb25zdCByZWZ1bmRzQ29tcGxldGUgPSB0aGlzLmJpZElELnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIGNvbnN0IHJlZnVuZHNDb21wbGV0ZSA9IHRoaXMuYmlkSUQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTkgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIGNvbnN0IHJlZnVuZHNDb21wbGV0ZSA9IHRoaXMuYmlkSUQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk0CiAgICAvLyBsb2dnZWRBc3NlcnQocmVmdW5kc0NvbXBsZXRlLCBFUlJfTk9UX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNTMgLy8gIkVSUjpOQVJDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BUkMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIEVSUl9TVElMTF9IQVNfSElHSEVTVF9CSURTX0JPWEVTKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgRVJSX1NUSUxMX0hBU19ISUdIRVNUX0JJRFNfQk9YRVMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyA1NCAvLyAiRVJSOlNIQkIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0hCQgoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA4IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgtNjAzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDAKICAgIC8vIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwMQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDEKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk4LTYwMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgtNjAzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwNgogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA2CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA3LTYxMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwNy02MTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA3LTYxMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTUtNjE5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxNS02MTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjE1LTYxOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9mYWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDYKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNhbmNlbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzEgLy8gIkVSUjpNQkZGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1CRkYKCmNhbmNlbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUsIEVSUl9BVUNUSU9OX0FMUkVBRFlfU1RBUlRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNyAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fQUxSRUFEWV9TVEFSVEVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDwKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOkFBU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUFTVAoKY2FuY2VsX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgRVJSX1NUSUxMX0hBU19ISUdIRVNUX0JJRFNfQk9YRVMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX0hJR0hFU1RfQklEU19CT1hFUykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDU0IC8vICJFUlI6U0hCQiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTSEJCCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOCAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzIKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjYW5jZWxfZWxzZV9ib2R5QDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMy02MzYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNQogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyA5IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNQogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMiAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMy02MzYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBieXRlYyA1NSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDYKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjYW5jZWxfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDctNjUyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ3LTY1MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDctNjUyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTUtNjU5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1NS02NTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjU1LTY1OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2FuY2VsX2Vsc2VfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjM4LTY0MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDAKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgOSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDAKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzOC02NDIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzgtNjQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjYW5jZWxfYWZ0ZXJfaWZfZWxzZUAxMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2F0ZWRCaWRbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY0LTY2OAogICAgLy8gZ2F0ZWRCaWQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjkKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjkKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3MAogICAgLy8gY29uc3Qgb3JpZ2luID0gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0KQogICAgY2FsbHN1YiBvcmlnaW5PclR4blNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfQVVDVElPTl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGJueiBnYXRlZEJpZF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjpBTkxWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFOTFYKCmdhdGVkQmlkX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzMKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEJpZF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTYgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkQmlkX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzUKICAgIC8vIHRoaXMuY3JlYXRlQmlkKHBheW1lbnQsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY0LTY2OAogICAgLy8gZ2F0ZWRCaWQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5iaWRbcm91dGluZ10oKSAtPiB2b2lkOgpiaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3OAogICAgLy8gYmlkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfQVVDVElPTl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGJueiBiaWRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM0IC8vICJFUlI6QU5MViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBTkxWCgpiaWRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NwogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAyNSAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIEVSUl9IQVNfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBiaWRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDU3IC8vICJFUlI6SEdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpIR1RFCgpiaWRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MgogICAgLy8gdGhpcy5jcmVhdGVCaWQocGF5bWVudCwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIGJpZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nYXRlZEJpZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODUtNjkwCiAgICAvLyBnYXRlZEJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5MgogICAgLy8gY29uc3Qgb3JpZ2luID0gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0KQogICAgY2FsbHN1YiBvcmlnaW5PclR4blNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfQVVDVElPTl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGJueiBnYXRlZEJpZEFzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjpBTkxWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFOTFYKCmdhdGVkQmlkQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEJpZEFzYV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTYgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkQmlkQXNhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTcKICAgIC8vIHRoaXMuY3JlYXRlQmlkQXNhKHBheW1lbnQsIGFzc2V0WGZlciwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZEFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODUtNjkwCiAgICAvLyBnYXRlZEJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmJpZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzAwLTcwNAogICAgLy8gYmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIEVSUl9BVUNUSU9OX05PVF9MSVZFKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZQogICAgYm56IGJpZEFzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjpBTkxWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFOTFYKCmJpZEFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIEVSUl9IQVNfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDI1IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGJpZEFzYV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTcgLy8gIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCmJpZEFzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyB0aGlzLmNyZWF0ZUJpZEFzYShwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWRBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzAwLTcwNAogICAgLy8gYmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRbcm91dGluZ10oKSAtPiB2b2lkOgpyZWZ1bmRCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8gcmVmdW5kQmlkKGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJhZmZsZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWNfMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6QUhORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBSE5FCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgRVJSX1dJTk5FUl9BTFJFQURZX0RSQVdOKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMiAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgRVJSX1dJTk5FUl9BTFJFQURZX0RSQVdOKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJhZmZsZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6V0FEUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXQURSCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1MwogICAgLy8gaWYgKHRoaXMucmFmZmxlUm91bmQudmFsdWUgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAzMCAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTMKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gR2xvYmFsLnJvdW5kIC0gOAogICAgZ2xvYmFsIFJvdW5kCiAgICBpbnRjXzIgLy8gOAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMzAgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gR2xvYmFsLnJvdW5kIC0gOAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1OAogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMzAgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU4CiAgICAvLyBjb25zdCByb3VuZFRvVXNlOiB1aW50NjQgPSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgKDQgKiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIyIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU4CiAgICAvLyBjb25zdCByb3VuZFRvVXNlOiB1aW50NjQgPSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgKDQgKiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gNAogICAgKgogICAgKwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSByb3VuZFRvVXNlICsgOCwgRVJSX05PVF9FTk9VR0hfVElNRSkKICAgIGdsb2JhbCBSb3VuZAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgICsKICAgID49CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjpORVRNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FVE0KCnJhZmZsZV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYyLTc2NQogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjQKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEwCiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM8MzI+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNTEgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYzCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYzCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5CiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGJ5dGVjIDQ2IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MwogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjItNzY1CiAgICAvLyBjb25zdCBzZWVkID0gYWJpQ2FsbDx0eXBlb2YgUmFuZG9tbmVzc0JlYWNvbi5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgLy8gICBhcmdzOiBbcm91bmRUb1VzZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgxODkzOTJjNSAvLyBtZXRob2QgImdldCh1aW50NjQsYnl0ZVtdKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjcKICAgIC8vIGlmIChzZWVkLmxlbmd0aCA9PT0gMCkgewogICAgbGVuCiAgICBkdXAKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2OAogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMiAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2OAogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMjIgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjgKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcyCiAgICAvLyBjb25zdCBybmdTdGF0ZSA9IHBjZzY0SW5pdChzZWVkLnNsaWNlKDAsIDE2KSkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTYKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxNgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE3CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VlZC5sZW5ndGggPT09IDE2LCBFUlJfSU5WQUxJRF9SQU5ET01fU0VFRCkKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDQyCiAgICBwdXNoYnl0ZXMgIkVSUjpJUlNEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSU0QKCnJhZmZsZV9hZnRlcl9hc3NlcnRANDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OAogICAgLy8gY29uc3Qgc3RhdGUgPSBfX3BjZzMyU3RlcCgwLCBpbmNyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDggLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk5CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhzdGF0ZSwgaW5pdGlhbFN0YXRlKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIHVuY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OQogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDcgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxOS0yMgogICAgLy8gcmV0dXJuIFsKICAgIC8vICAgICBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIC8vIF0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzUKICAgIC8vIGxldCB1cHBlckJvdW5kID0gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NQogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTYgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gaWYgKHVwcGVyQm91bmQgPCBNQVhfVUlOVDY0KSB7CiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NwogICAgLy8gdXBwZXJCb3VuZCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgKwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgRHluYW1pY0FycmF5PGFyYzQuVWludDY0PigpCiAgICBieXRlYyA1OCAvLyAweDAwMDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDMKICAgIC8vIGlmICh1cHBlckJvdW5kICE9PSAwKSB7CiAgICBkdXAKICAgIGJ6IHJhZmZsZV9lbHNlX2JvZHlAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDQKICAgIC8vIGxvZ2dlZEFzc2VydCh1cHBlckJvdW5kID4gMSwgRVJSX0lOVkFMSURfUkFORE9NX0JPVU5EUykKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBieXRlYyA1OSAvLyAiRVJSOklSQkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJCRAoKcmFmZmxlX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChsb3dlckJvdW5kIDwgdXBwZXJCb3VuZCAtIDEsIEVSUl9JTlZBTElEX1JBTkRPTV9CT1VORFMpCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MAogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgRVJSX0lOVkFMSURfUkFORE9NX0JPVU5EUykKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAzMQogICAgYnl0ZWMgNTkgLy8gIkVSUjpJUkJEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSQkQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgZHVwbiAyCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU0CiAgICAvLyBjb25zdCB0aHJlc2hvbGQ6IHVpbnQ2NCA9IF9fdWludDY0VHdvcyhhYnNvbHV0ZUJvdW5kKSAlIGFic29sdXRlQm91bmQKICAgIHN3YXAKICAgICUKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHVuY292ZXIgMgoKcmFmZmxlX3doaWxlX3RvcEAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgZGlnIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl93aGlsZUAzNwoKcmFmZmxlX3doaWxlX3RvcEAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMAogICAgLy8gY29uc3QgbmV3U3RhdGUxID0gX19wY2czMlN0ZXAoc3RhdGVbMF0sIHBjZ0ZpcnN0SW5jcmVtZW50KQogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjExCiAgICAvLyBjb25zdCBuZXdTdGF0ZTIgPSBfX3BjZzMyU3RlcChzdGF0ZVsxXSwgbmV3U3RhdGUxID09PSAwID8gb3Auc2hsKHBjZ1NlY29uZEluY3JlbWVudCwgMSkgOiBwY2dTZWNvbmRJbmNyZW1lbnQpCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGJueiByYWZmbGVfdGVybmFyeV9mYWxzZUA0NQogICAgcHVzaGludCAyODg1MzkwMDgxNzc3OTI2ODE4CgpyYWZmbGVfdGVybmFyeV9tZXJnZUA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjIDcgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICB1bmNvdmVyIDIKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMwogICAgLy8gcmV0dXJuIFtbbmV3U3RhdGUxLCBuZXdTdGF0ZTJdLCBvcC5zaGwoX19wY2czMk91dHB1dChzdGF0ZVswXSksIDMyKSB8IF9fcGNnMzJPdXRwdXQoc3RhdGVbMV0pXQogICAgdW5jb3ZlciA1CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICBwdXNoaW50IDMyCiAgICBzaGwKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICB8CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTgKICAgIC8vIGNvbnN0IFtuZXdTdGF0ZSwgY2FuZGlkYXRlXSA9IF9fcGNnNjRVbmJvdW5kZWRSYW5kb20oc3RhdGUpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxNgogICAgY292ZXIgNAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MAogICAgLy8gaWYgKGNhbmRpZGF0ZSA+PSB0aHJlc2hvbGQpIHsKICAgIGRpZyA2CiAgICA+PQogICAgYnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgIGRpZyAxCiAgICAlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MAogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgKwogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgYiByYWZmbGVfd2hpbGVfdG9wQDMyCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAzNjoKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBiIHJhZmZsZV93aGlsZV90b3BAMzQKCnJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIGIgcmFmZmxlX3Rlcm5hcnlfbWVyZ2VANDYKCnJhZmZsZV9hZnRlcl93aGlsZUAzNzoKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2OAogICAgLy8gcmV0dXJuIFtzdGF0ZSwgcmVzdWx0XQogICAgcHVzaGJ5dGVzIDB4MDAxMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgxCiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgZHVwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgxCiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMiAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlQDE1CgpyYWZmbGVfZWxzZV9ib2R5QDI4OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjUxCiAgICAvLyBhYnNvbHV0ZUJvdW5kID0gb3AuYnRvaShCeXRlcyhCaWdVaW50KDIgKiogNjQpIC0gQmlnVWludChsb3dlckJvdW5kKSkpCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGIgcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzEKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmZpbmRXaW5uZXJbcm91dGluZ10oKSAtPiB2b2lkOgpmaW5kV2lubmVyOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg1CiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgRVJSX05PVF9BUFBMSUNBQkxFX1RPX1RISVNfQVVDVElPTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgRVJSX05PVF9BUFBMSUNBQkxFX1RPX1RISVNfQVVDVElPTikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNTIgLy8gIkVSUjpOQVBQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BUFAKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMzUgLy8gIkVSUjpBSE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFITkUKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSAhPT0gMCwgRVJSX1dJTk5JTkdfTlVNQkVSX05PVF9GT1VORCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTIgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIEVSUl9XSU5OSU5HX05VTUJFUl9OT1RfRk9VTkQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOldOTkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V05ORgoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9BTFJFQURZX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxNSAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9BTFJFQURZX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjpXQUZEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldBRkQKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNAogICAgLy8gbGV0IHsgc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnQgfSA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDM4IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGxldCB7IHN0YXJ0aW5nSW5kZXgsIGN1cnJlbnRSYW5nZVN0YXJ0IH0gPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpmaW5kV2lubmVyX3doaWxlX3RvcEAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgID4KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyBjb25zdCBib3hTdGFrZSA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2ldLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTAgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGNvbnN0IGJveFN0YWtlID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbaV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlU3RhcnQgKyBib3hTdGFrZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMiAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyOAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZVN0YXJ0ICsgYm94U3Rha2UpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNgogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAyNQogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGl0b2IKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKCmZpbmRXaW5uZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldFdpbm5lcldlaWdodEJveEluZm9AMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5MwogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHdpbm5pbmdCb3hJbmZvWzBdCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyBsZXQgY3VycmVudFJhbmdlU3RhcnQgPSB3aW5uaW5nQm94SW5mb1sxXQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlIC0gc3RhcnRpbmdJbmRleAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAyNCAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5NwogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICBkaWcgNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gY29uc3QgY2h1bmtPZmZzZXQ6IHVpbnQ2NCA9IHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUKICAgIHN3YXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAlCiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDEKICAgIC8vIGNvbnN0IHJlbWFpbmluZ0luQ2h1bms6IHVpbnQ2NCA9IENodW5rU2l6ZSAtIGNodW5rT2Zmc2V0CiAgICBpbnRjIDUgLy8gNDA5NgogICAgc3dhcAogICAgLQogICAgZHVwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAyCiAgICAvLyBpZiAoaXRlcmF0aW9uQW1vdW50ID4gcmVtYWluaW5nSW5DaHVuaykgewogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDExCiAgICBkaWcgMgogICAgYnVyeSAyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwNgogICAgLy8gY29uc3Qgd2VpZ2h0ID0gY2xvbmUodGhpcy53ZWlnaHRzKHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUpLnZhbHVlKQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGVuc3VyZUJ1ZGdldCgoaXRlcmF0aW9uQW1vdW50ICogNjApKQogICAgZGlnIDIKICAgIHB1c2hpbnQgNjAKICAgICoKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpmaW5kV2lubmVyX3doaWxlX3RvcEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDQKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyBjb25zdCBhbW91bnQgPSB3ZWlnaHRbY2h1bmtPZmZzZXQgKyBpXS5hc1VpbnQ2NCgpCiAgICBkaWcgNgogICAgZGlnIDEKICAgICsKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkaWcgMwogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBpZiAoYW1vdW50ID09PSB0aGlzLmhpZ2hlc3RCaWQudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAxNyAvLyAiaGlnaGVzdF9iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxMgogICAgLy8gaWYgKGFtb3VudCA9PT0gdGhpcy5oaWdoZXN0QmlkLnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIGN1cnJlbnRSYW5nZVN0YXJ0ICs9IGFtb3VudAogICAgZGlnIDYKICAgICsKICAgIGJ1cnkgNgoKZmluZFdpbm5lcl9ibG9ja0AxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDEyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxNwogICAgLy8gY3VycmVudFJhbmdlRW5kID0gY3VycmVudFJhbmdlU3RhcnQgKyBhbW91bnQKICAgIGRpZyA2CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPj0gY3VycmVudFJhbmdlU3RhcnQgJiYgdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE4CiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDw9CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTIgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPj0gY3VycmVudFJhbmdlU3RhcnQgJiYgdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTkKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gdGhpcy5sb2NhdGlvbnMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlCiAgICBkaWcgMgogICAgZGlnIDIKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTMxCiAgICAvLyBsb2NhdGlvbnMgPSBCb3hNYXA8dWludDY0LCBBY2NvdW50Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeExvY2F0aW9ucyB9KQogICAgYnl0ZWMgNDEgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9IHRoaXMubG9jYXRpb25zKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxNSAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9IHRoaXMubG9jYXRpb25zKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIGJ1cnkgNgogICAgYiBmaW5kV2lubmVyX2Jsb2NrQDE5CgpmaW5kV2lubmVyX2FmdGVyX3doaWxlQDIwOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNQogICAgLy8gc3RhcnRpbmdJbmRleDogKHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQpLAogICAgZGlnIDIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODI0LTgyNwogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsKICAgIC8vICAgc3RhcnRpbmdJbmRleDogKHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQpLAogICAgLy8gICBjdXJyZW50UmFuZ2VTdGFydDogY3VycmVudFJhbmdlU3RhcnQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBkaWcgNAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDM4IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjQtODI3CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0gewogICAgLy8gICBzdGFydGluZ0luZGV4OiAoc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCksCiAgICAvLyAgIGN1cnJlbnRSYW5nZVN0YXJ0OiBjdXJyZW50UmFuZ2VTdGFydCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4NQogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzIKICAgIC8vIHN0YXJ0aW5nSW5kZXggKz0gQ2h1bmtTaXplCiAgICB1bmNvdmVyIDIKICAgIGludGMgNSAvLyA0MDk2CiAgICArCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBidXJ5IDUKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMjIKCmZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMjY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyByZXR1cm4gW3N0YXJ0aW5nSW5kZXgsIGN1cnJlbnRSYW5nZVN0YXJ0XQogICAgaXRvYgogICAgZGlnIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTEKICAgIC8vIGNvbnN0IHdpbm5pbmdCb3hJbmZvID0gdGhpcy5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvKCkKICAgIGIgZmluZFdpbm5lcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0V2lubmVyV2VpZ2h0Qm94SW5mb0AyNwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kTUJSW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVmdW5kTUJSOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzAKICAgIC8vIHJlZnVuZE1CUihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIwIC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQwIC8vICJFUlI6UFpOQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQWk5DCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNSAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcmVmdW5kTUJSX2Jvb2xfdHJ1ZUA1CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE1IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiByZWZ1bmRNQlJfYm9vbF9mYWxzZUA2CgpyZWZ1bmRNQlJfYm9vbF90cnVlQDU6CiAgICBpbnRjXzEgLy8gMQoKcmVmdW5kTUJSX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA2MCAvLyAiRVJSOldORkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V05GRAoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE5IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRJRC52YWx1ZSAhPT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIEVSUl9BTExfUkVGVU5EU19DT01QTEVURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAhPQogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOkFSRkMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVJGQwoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM3CiAgICAvLyBjb25zdCBzdGFydGluZ0luZGV4ID0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE5IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM3CiAgICAvLyBjb25zdCBzdGFydGluZ0luZGV4ID0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM4CiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzgKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM5CiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgID4KICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0MQogICAgLy8gZW5zdXJlQnVkZ2V0KChpdGVyYXRpb25BbW91bnQgKiA2MCkpCiAgICBwdXNoaW50IDYwCiAgICAqCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnN1cmVfYnVkZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0MwogICAgLy8gY29uc3QgeyBiaWRzLCBiaWRzQnlBZGRyZXNzLCBsb2NhdGlvbnMgfSA9IHRoaXMubWJyKCkKICAgIGludGMgMTAgLy8gMzQ5MDAKCnJlZnVuZE1CUl93aGlsZV90b3BAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMwogICAgKwogICAgZGlnIDIKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl93aGlsZUAyMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDcKICAgIC8vIGNvbnN0IHsgcmVmdW5kZWQsIGFjY291bnQgfSA9IHRoaXMuYmlkcyhpKS52YWx1ZQogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAzNiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NwogICAgLy8gY29uc3QgeyByZWZ1bmRlZCwgYWNjb3VudCB9ID0gdGhpcy5iaWRzKGkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDU3NgogICAgZ2V0Yml0CiAgICBzd2FwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDQgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyAzCiAgICAhPQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ5CiAgICAvLyB0aGlzLnJlZnVuZEJpZChpKQogICAgZGlnIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTQKICAgIC8vIHRoaXMuYmlkcyhpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA3IC8vICJhIgogICAgZGlnIDQKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1NQogICAgLy8gaWYgKHRoaXMuYmlkc0J5QWRkcmVzcyhhY2NvdW50KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlZnVuZE1CUl9pZl9ib2R5QDE3CiAgICBwb3AKICAgIGR1cAogICAgYnVyeSA2CgpyZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY2LTg3MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY2LTg3MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2Ni04NzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIHJlZnVuZE1CUl93aGlsZV90b3BAMTIKCnJlZnVuZE1CUl9pZl9ib2R5QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTYKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuYmlkc0J5QWRkcmVzcyhhY2NvdW50KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTcKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhhY2NvdW50KS5kZWxldGUoKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1OAogICAgLy8gcmVmdW5kQW1vdW50ICs9IGJpZHNCeUFkZHJlc3MKICAgIGludGMgMTEgLy8gNTM0MDAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjAKICAgIC8vIGlmICh0aGlzLmxvY2F0aW9ucyhsb2MpLmV4aXN0cykgewogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzEKICAgIC8vIGxvY2F0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjY291bnQ+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4TG9jYXRpb25zIH0pCiAgICBieXRlYyA0MSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODYwCiAgICAvLyBpZiAodGhpcy5sb2NhdGlvbnMobG9jKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODYxCiAgICAvLyB0aGlzLmxvY2F0aW9ucyhsb2MpLmRlbGV0ZSgpCiAgICBkaWcgNgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2MgogICAgLy8gcmVmdW5kQW1vdW50ICs9IGxvY2F0aW9ucwogICAgaW50YyAxMiAvLyA3MjMwMAogICAgYnVyeSA2CiAgICBiIHJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDIwCgpyZWZ1bmRNQlJfYWZ0ZXJfd2hpbGVAMjI6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE5IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE5IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMAogICAgLy8gcmVmdW5kTUJSKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyZWZ1bmRNQlJfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVmdW5kTUJSX2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2xhaW1Qcml6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUHJpemU6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIEVSUl9BVUNUSU9OX0hBU19OT1RfRU5ERUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIEVSUl9BVUNUSU9OX0hBU19OT1RfRU5ERUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6QUhORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBSE5FCgpjbGFpbVByaXplX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODAKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9BTFJFQURZX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjAgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX0FMUkVBRFlfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpQQUNMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBBQ0wKCmNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4MwogICAgLy8gY29uc3QgeyBhY2NvdW50LCBhbW91bnQsIG1hcmtldHBsYWNlIH0gPSB0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA0IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4MwogICAgLy8gY29uc3QgeyBhY2NvdW50LCBhbW91bnQsIG1hcmtldHBsYWNlIH0gPSB0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAzNiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODMKICAgIC8vIGNvbnN0IHsgYWNjb3VudCwgYW1vdW50LCBtYXJrZXRwbGFjZSB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBleHRyYWN0IDQwIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOCAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMjYKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjI3LTIzMAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbYnV5ZXJdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjI3LTIzMAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbYnV5ZXJdLAogICAgLy8gfSkKICAgIGJ5dGVjIDU1IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24udHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJANTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4NwogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODg3CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVByaXplX2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1OAogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBha2l0YSwgbWFya2V0cGxhY2UsIHNlbGxlciB9ID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDggLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBjb25zdCBha2l0YUFtb3VudDogdWludDY0ID0gdGhpcy5pc1ByaXplQm94LnZhbHVlID8gKGFraXRhICsgY3JlYXRvcikgOiBha2l0YQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAzOAogICAgdW5jb3ZlciAyCiAgICBkaWcgNgogICAgKwoKY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjMKICAgIC8vIGlmIChha2l0YUFtb3VudCA+IDApIHsKICAgIGR1cAogICAgYm56IGNsYWltUHJpemVfaWZfYm9keUA0MAogICAgYnVyeSA1CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2Ny0yNzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2Ny0yNzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2Ny0yNzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc1LTI4MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI3NwogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MwogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDI2IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc1LTI3OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc1LTI4MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODMtMjg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjgzLTI4NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGJ1eVNpZGVNYXJrZXRwbGFjZSwKICAgIC8vICAgICBhbW91bnQ6IG1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODMtMjg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjkxLTI5NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogc2VsbGVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgOSAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTEtMjk1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBzZWxsZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5MS0yOTYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICBhbW91bnQ6IHNlbGxlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA4IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5OQogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwMC0zMDQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFtb3VudDogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIwIC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTMKICAgIC8vIHRoaXMucHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3NwogICAgLy8gY2xhaW1Qcml6ZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsYWltUHJpemVfaWZfYm9keUA0MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjY0CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBha2l0YUFtb3VudCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgMCwgYWtpdGFBbW91bnQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDQxCgpjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMzg6CiAgICB1bmNvdmVyIDIKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDM5CgpjbGFpbVByaXplX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTEKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgYWtpdGEsIG1hcmtldHBsYWNlLCBzZWxsZXIgfSA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTMKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA4IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMTEKICAgIHVuY292ZXIgMgogICAgZGlnIDYKICAgICsKCmNsYWltUHJpemVfdGVybmFyeV9tZXJnZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzE2CiAgICAvLyBpZiAoYWtpdGFBbW91bnQgPiAwKSB7CiAgICBkdXAKICAgIGJueiBjbGFpbVByaXplX2lmX2JvZHlAMTMKICAgIGJ1cnkgNQoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gaWYgKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjItMzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjItMzI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzIyLTMyOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzcKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM4LTM0NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzgtMzQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzOC0zNDQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTgKICAgIC8vIGlmIChidXlTaWRlTWFya2V0cGxhY2UuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gaWYgKGJ1eVNpZGVNYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNsYWltUHJpemVfZWxzZV9ib2R5QDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OS0zNjUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGJ1eVNpZGVNYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzU5LTM2NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OS0zNjUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGJ1eVNpZGVNYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDkgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc5CiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGlmICh0aGlzLnNlbGxlci52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgwLTM4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHNlbGxlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDkgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4MC0zODUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzZWxsZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODAtMzg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogc2VsbGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA4IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAxCiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAxCiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIGlmIChBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAzMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDItNDA4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBjcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDA0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDItNDA3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBjcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAyLTQwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDgKCmNsYWltUHJpemVfZWxzZV9ib2R5QDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDE1CiAgICAvLyBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGNyZWF0b3IgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMiAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxNQogICAgLy8gW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBjcmVhdG9yIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMC00MTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIC8vICAgY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxNAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNiAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTAtNDE4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGNyZWF0b3IgfV0sCiAgICAvLyAgIGNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTAtNDE4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGNyZWF0b3IgfV0sCiAgICAvLyAgIGNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAOAoKY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkwCiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTMKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHNlbGxlciB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyA5IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4OC0zOTYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHNlbGxlciB9XSwKICAgIC8vICAgc2VsbGVyLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkxCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkyCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4OC0zOTYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IHNlbGxlciB9XSwKICAgIC8vICAgc2VsbGVyLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk1CiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg4LTM5NgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgLy8gICBzZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMzAKCmNsYWltUHJpemVfZWxzZV9ib2R5QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OQogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBbeyBhZGRyZXNzOiBidXlTaWRlTWFya2V0cGxhY2UsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2Ny0zNzUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzAKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzEKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY3LTM3NQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5U2lkZU1hcmtldHBsYWNlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3NAogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2Ny0zNzUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMjcKCmNsYWltUHJpemVfZWxzZV9ib2R5QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ4CiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0Ni0zNTQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ5CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUwCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0Ni0zNTQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUzCiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ2LTM1NAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMjQKCmNsYWltUHJpemVfZWxzZV9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzMQogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBidXJ5IDkKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDI4IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyA2MSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE4CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciA2CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxNCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIxCiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlYyAyOCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgNQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRANTgKICAgIHB1c2hieXRlcyAiRVJSOk5FU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVTQwoKY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRANTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjIKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgRVJSX1dST05HX0VTQ1JPV19GT1JfT1BFUkFUSU9OKQogICAgdW5jb3ZlciA1CiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTEKICAgID09CiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRAMTgKICAgIHB1c2hieXRlcyAiRVJSOldFU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0VTQwoKY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMwCiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMQogICAgLy8gW10KICAgIGJ5dGVjIDU4IC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgYnVyeSAxMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBkaWcgNQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQwCiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBkaWcgMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDU0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZGlnIDEwCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ0CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBidXJ5IDkKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0MQogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyA5CiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MAogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGRpZyA2CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ5LTE1MgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NgogICAgLy8gd2FsbGV0LAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OAogICAgLy8gW2Fzc2V0LmlkXSwKICAgIGRpZyAxMAogICAgaXRvYgogICAgYnl0ZWMgMTMgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDcKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTYKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTgKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBkaWcgNAogICAgYnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTktMTY1CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0KAogICAgLy8gICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyApCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2MQogICAgLy8gYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyA4CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwLTE2NAogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyMQoKY2xhaW1Qcml6ZV9pZl9ib2R5QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTcKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzE3CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLCBha2l0YUFtb3VudCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTcKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE0CgpjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMTE6CiAgICB1bmNvdmVyIDIKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDEyCgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNAogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM0CiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gaWYgKGJ1eWVyLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGRpZyAzCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlANDkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzctMjQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IGJ1eWVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0MAogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM3LTI0MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNy0yNDIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyQDUxCgpjbGFpbVByaXplX2Vsc2VfYm9keUA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMiAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NgogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NC0yNTIKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ3CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ4CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NC0yNTIKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDQtMjUyCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyQDUxCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVJhZmZsZVByaXplW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xhaW1SYWZmbGVQcml6ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE1IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNjAgLy8gIkVSUjpXTkZEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldORkQKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5OAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9BTFJFQURZX1BSSVpFX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MwogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjMgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTgKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIEVSUl9SQUZGTEVfQUxSRUFEWV9QUklaRV9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOlJBUEMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UkFQQwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAwCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlIH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwMAogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyAzOSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwMAogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgcHVzaGludCA4MAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBjb25zdCBha2l0YUZlZSA9IGNhbGNQZXJjZW50KHRoaXMucmFmZmxlQW1vdW50LnZhbHVlLCBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwMQogICAgLy8gY29uc3QgYWtpdGFGZWUgPSBjYWxjUGVyY2VudCh0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSwgYXVjdGlvblJhZmZsZVBlcmNlbnRhZ2UpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkaWcgMQogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAyCiAgICAvLyBjb25zdCBsZWZ0b3ZlcjogdWludDY0ID0gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgLSBha2l0YUZlZQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDQKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwNAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDUtOTEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFraXRhRmVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxNCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1LTkwOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1LTkxMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MTItOTE3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxNAogICAgLy8gcmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxNSAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyByZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTEyLTkxNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMi05MTcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyMyAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MAogICAgLy8gdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBjbGFpbVJhZmZsZVByaXplKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIzLTkyOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYWtpdGFGZWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI1CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjcKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjMtOTI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMy05MjkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFraXRhRmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzEtOTM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMzCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTUgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzEtOTM2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzEtOTM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2xlYXJXZWlnaHRzQm94ZXNbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhcldlaWdodHNCb3hlczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyBjbGVhcldlaWdodHNCb3hlcyhpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6QUhORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBSE5FCgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyMCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQwIC8vICJFUlI6UFpOQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQWk5DCgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIEVSUl9SQUZGTEVfTk9UX1BSSVpFX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MwogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjMgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9OT1RfUFJJWkVfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOlJOUEMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Uk5QQwoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0OAogICAgLy8gZW5zdXJlQnVkZ2V0KChpdGVyYXRpb25BbW91bnQgKiAzMCkpCiAgICBkdXAKICAgIHB1c2hpbnQgMzAKICAgICoKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpjbGVhcldlaWdodHNCb3hlc193aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGJ6IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX3doaWxlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1MQogICAgLy8gY29uc3Qgcmk6IHVpbnQ2NCA9ICh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtIDEpIC0gaQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTEKICAgIC8vIGNvbnN0IHJpOiB1aW50NjQgPSAodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgLSAxKSAtIGkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUyCiAgICAvLyB0aGlzLndlaWdodHMocmkpLmRlbGV0ZSgpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBjbGVhcldlaWdodHNCb3hlc193aGlsZV90b3BAOAoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfd2hpbGVAMTA6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDExIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1NQogICAgLy8gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgLT0gaXRlcmF0aW9uQW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTcKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gaXRlcmF0aW9uQW1vdW50ICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBpbnRjIDE0IC8vIDEzMTEzMzAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1OS05NjQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjEKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTktOTYzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTktOTY0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MwogICAgLy8gY2xlYXJXZWlnaHRzQm94ZXMoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZQogICAgYnl0ZWMgNDIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5oYXNCaWRbcm91dGluZ10oKSAtPiB2b2lkOgpoYXNCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA3IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MwogICAgLy8gcmV0dXJuIHRoaXMuYmlkc0J5QWRkcmVzcyhhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgNDIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0TWluaW11bUJpZEFtb3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50CiAgICBpdG9iCiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4udXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI4IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQzIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGNvbmZpZykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI4IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0MyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgNjEgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVVQRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJVVBHCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTAgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI4IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQzIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX0ZPUkJJRERFTikKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6Rk9SQiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGT1JCCgpvcHRpbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpvcHRpbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsIEVSUl9JTlZBTElEX1BBWU1FTlRfQU1PVU5UKQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOklQTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNQQoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTMtNTcKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1NAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1NQogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTMtNTcKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkuc3VibWl0KCkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NDcKICAgIC8vIG9wdGluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubmV3QmlkSUQoKSAtPiB1aW50NjQ6Cm5ld0JpZElEOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5iaWRJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5iaWRJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM3CiAgICAvLyB0aGlzLmJpZElELnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzcKICAgIC8vIHRoaXMuYmlkSUQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyByZXR1cm4gaWQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uc2V0TmV3QmlkKGlkOiB1aW50NjQsIGJpZEFtb3VudDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMpIC0+IHZvaWQ6CnNldE5ld0JpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQxCiAgICAvLyBwcml2YXRlIHNldE5ld0JpZChpZDogdWludDY0LCBiaWRBbW91bnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0Mi0xNDcKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogYmlkQW1vdW50LAogICAgLy8gICByZWZ1bmRlZDogZmFsc2UsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGJ5dGVjIDQyIC8vIDB4MDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUgPSB7CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAzNiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDItMTQ3CiAgICAvLyB0aGlzLmJpZHMoaWQpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IGJpZEFtb3VudCwKICAgIC8vICAgcmVmdW5kZWQ6IGZhbHNlLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ5CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA1IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzZXROZXdCaWRfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gaWYgKHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIGlmICh0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHNldE5ld0JpZF9lbHNlX2JvZHlAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTEKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyBjb25zdCBsYXN0QmlkID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBkdXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjcgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyBjb25zdCBsYXN0QmlkID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICB1bmNvdmVyIDIKICAgIGludGMgNSAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gY29uc3QgZGlmZmVyZW5jZTogdWludDY0ID0gYmlkQW1vdW50IC0gbGFzdEJpZAogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gY29uc3QgbGFzdFdlaWdodGVkVG90YWwgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTAgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIGNvbnN0IGxhc3RXZWlnaHRlZFRvdGFsID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciA0CiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgc3dhcAogICAgZGlnIDEKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlICs9IGRpZmZlcmVuY2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxNiAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBkaWZmZXJlbmNlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE2IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlICs9IGRpZmZlcmVuY2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NwogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYmlkQW1vdW50KQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGRpZmZlcmVuY2UpCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTAgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGxhc3RXZWlnaHRlZFRvdGFsICsgZGlmZmVyZW5jZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjb3ZlciAyCiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMCAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBkaWZmZXJlbmNlKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCnNldE5ld0JpZF9hZnRlcl9pZl9lbHNlQDEwOgogICAgcmV0c3ViCgpzZXROZXdCaWRfZWxzZV9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gY29uc3QgbG9jID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjQgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBsb2dnZWRBc3NlcnQobG9jIDwgQ2h1bmtTaXplICogdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUsIEVSUl9UT09fTUFOWV9QQVJUSUNJUEFOVFMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvYyA8IENodW5rU2l6ZSAqIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlLCBFUlJfVE9PX01BTllfUEFSVElDSVBBTlRTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGMgNSAvLyA0MDk2CiAgICAqCiAgICA8CiAgICBibnogc2V0TmV3QmlkX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpUTVBUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlRNUFQKCnNldE5ld0JpZF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMCAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gY29uc3QgbGFzdFdlaWdodGVkVG90YWwgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgaW50YyA1IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHVuY292ZXIgMgogICAgZGlnIDEKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlICs9IGJpZEFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE2IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlICs9IGJpZEFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NQogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTYgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gYmlkQW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSBsb2MKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgZGlnIDQKICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYmlkQW1vdW50KQogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYmlkQW1vdW50KQogICAgdW5jb3ZlciA0CiAgICBpbnRjIDUgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHVuY292ZXIgNQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGJpZEFtb3VudCkKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMgogICAgKwogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMCAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBiaWRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDEwIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGJpZEFtb3VudCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2OAogICAgLy8gdGhpcy5sb2NhdGlvbnMobG9jKS52YWx1ZSA9IFR4bi5zZW5kZXIKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTMxCiAgICAvLyBsb2NhdGlvbnMgPSBCb3hNYXA8dWludDY0LCBBY2NvdW50Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeExvY2F0aW9ucyB9KQogICAgYnl0ZWMgNDEgLy8gImwiCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjgKICAgIC8vIHRoaXMubG9jYXRpb25zKGxvYykudmFsdWUgPSBUeG4uc2VuZGVyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAyNCAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjQgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCnNldE5ld0JpZF9lbHNlX2JvZHlANzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB9IGVsc2UgaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB9IGVsc2UgaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXROZXdCaWRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSAwCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgYm94X3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRCaWRGZWUoYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2V0QmlkRmVlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIHByaXZhdGUgZ2V0QmlkRmVlKGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGNvbnN0IGZlZSA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5iaWRGZWUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA1IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGNvbnN0IGZlZSA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5iaWRGZWUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzkKICAgIC8vIGlmIChmZWUgPT09IDAgJiYgdGhpcy5iaWRGZWUudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRCaWRGZWVfYWZ0ZXJfaWZfZWxzZUA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA1IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzkKICAgIC8vIGlmIChmZWUgPT09IDAgJiYgdGhpcy5iaWRGZWUudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRCaWRGZWVfYWZ0ZXJfaWZfZWxzZUA0CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyByZXR1cm4gMQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKICAgIHJldHN1YgoKZ2V0QmlkRmVlX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyByZXR1cm4gZmVlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODUKICAgIC8vIHByaXZhdGUgZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCk6IFJveWFsdHlBbW91bnRzIHsKICAgIHByb3RvIDEgMQogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg3CiAgICAvLyBsZXQgY3JlYXRvckFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg4CiAgICAvLyBpZiAodGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDApIHsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MwogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzIgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg4CiAgICAvLyBpZiAodGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MwogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzIgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg5CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDMyIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5MQogICAgLy8gY3JlYXRvckFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDQKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGNvbnN0IHsgYXVjdGlvblNhbGVJbXBhY3RUYXhNaW46IG1pbiwgYXVjdGlvblNhbGVJbXBhY3RUYXhNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGNvbnN0IHsgYXVjdGlvblNhbGVJbXBhY3RUYXhNaW46IG1pbiwgYXVjdGlvblNhbGVJbXBhY3RUYXhNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyAzOSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5NQogICAgLy8gY29uc3QgeyBhdWN0aW9uU2FsZUltcGFjdFRheE1pbjogbWluLCBhdWN0aW9uU2FsZUltcGFjdFRheE1heDogbWF4IH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDMKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIGxldCBha2l0YUFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTcKICAgIC8vIGlmIChtYXggPiAwKSB7CiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDkgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM2LTEzOQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNwogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBnZXRBbW91bnRzX3Rlcm5hcnlfZmFsc2VAMjIKICAgIGludGNfMSAvLyAxCiAgICAtCgpnZXRBbW91bnRzX3Rlcm5hcnlfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBmcmFtZV9kaWcgMwogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAKICAgIC8KICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDIKICAgIC8vIGlmIChha2l0YUFtb3VudCA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDMKICAgIC8vIGFraXRhQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIGxldCBtYXJrZXRwbGFjZUFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDgKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMzIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwOQogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NQogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMzMgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMzIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAxCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gY29uc3Qgc2VsbGVyQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkpCiAgICBmcmFtZV9kaWcgNAogICAgZHVwCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICArCiAgICBwdXNoaW50IDIKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDUKICAgICoKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMTctMjIyCiAgICAvLyByZXR1cm4gewogICAgLy8gICBjcmVhdG9yOiBjcmVhdG9yQW1vdW50LAogICAgLy8gICBha2l0YTogYWtpdGFBbW91bnQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBtYXJrZXRwbGFjZUFtb3VudCwKICAgIC8vICAgc2VsbGVyOiBzZWxsZXJBbW91bnQsCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmdldEFtb3VudHNfdGVybmFyeV9mYWxzZUAyMjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGdldEFtb3VudHNfdGVybmFyeV9tZXJnZUAyMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkKHBheW1lbnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpjcmVhdGVCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gcHJpdmF0ZSBjcmVhdGVCaWQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3QmlkSUQoKQogICAgY2FsbHN1YiBuZXdCaWRJRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIGNvbnN0IHsgYmlkcywgYmlkc0J5QWRkcmVzcywgbG9jYXRpb25zIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDEwIC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA3IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUJpZF9pZl9ib2R5QDEKICAgIGZyYW1lX2J1cnkgMAoKY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyBjb25zdCBiaWRBbW91bnQ6IHVpbnQ2NCA9IHBheW1lbnQuYW1vdW50IC0gbWJyCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9kaWcgMAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIGNvbnN0IG1pbmltdW1CaWRBbW91bnQgPSB0aGlzLmdldE1pbmltdW1CaWRBbW91bnQoKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDIxIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVCaWRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID49IChtaW5pbXVtQmlkQW1vdW50ICsgbWJyKSwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAwCiAgICArCiAgICB1bmNvdmVyIDMKICAgIDw9CiAgICBibnogY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAyMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIHRoaXMuc2V0TmV3QmlkKGlkLCBiaWRBbW91bnQsIG1hcmtldHBsYWNlKQogICAgc3dhcAogICAgZGlnIDEKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBzZXROZXdCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBpZiAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+ICh0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSAtIFNOSVBFX1JBTkdFKSkgewogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWNfMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBpZiAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+ICh0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSAtIFNOSVBFX1JBTkdFKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMTIwCiAgICAtCiAgICA+CiAgICBieiBjcmVhdGVCaWRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWNfMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSArPSBTTklQRV9FWFRFTlNJT04KICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDMwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2NAogICAgLy8gY29uc3QgYmlkRmVlID0gdGhpcy5nZXRCaWRGZWUoYmlkQW1vdW50KQogICAgZHVwCiAgICBjYWxsc3ViIGdldEJpZEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjUKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2NQogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAxNyAvLyAiaGlnaGVzdF9iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gdGhpcy5oaWdoZXN0QmlkLnZhbHVlID0gYmlkQW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpjcmVhdGVCaWRfaWZfYm9keUAxOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gbWJyICs9IGJpZHNCeUFkZHJlc3MKICAgIGludGMgMTEgLy8gNTM0MDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyBtYnIgKz0gbG9jYXRpb25zCiAgICBpbnRjIDEyIC8vIDcyMzAwCiAgICBmcmFtZV9idXJ5IDAKICAgIGIgY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkQXNhKHBheW1lbnQ6IHVpbnQ2NCwgYXNzZXRYZmVyOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcykgLT4gdm9pZDoKY3JlYXRlQmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzEtNDc1CiAgICAvLyBwcml2YXRlIGNyZWF0ZUJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDc2CiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3QmlkSUQoKQogICAgY2FsbHN1YiBuZXdCaWRJRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGNvbnN0IHsgYmlkcywgYmlkc0J5QWRkcmVzcywgbG9jYXRpb25zIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDEwIC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA3IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUJpZEFzYV9pZl9ib2R5QDEKICAgIGZyYW1lX2J1cnkgMAoKY3JlYXRlQmlkQXNhX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDg3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDIxIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBtYnIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAyMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGNvbnN0IGJpZEFtb3VudCA9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTEKICAgIC8vIGNvbnN0IG1pbmltdW1CaWRBbW91bnQgPSB0aGlzLmdldE1pbmltdW1CaWRBbW91bnQoKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNDQgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSBtaW5pbXVtQmlkQW1vdW50LCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAxCiAgICA8PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDQ0IC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0ID09PSB0aGlzLmJpZEFzc2V0LnZhbHVlLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMuYmlkQXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNDQgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gdGhpcy5zZXROZXdCaWQoaWQsIGJpZEFtb3VudCwgbWFya2V0cGxhY2UpCiAgICBzd2FwCiAgICBkaWcgMQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHNldE5ld0JpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMjAKICAgIC0KICAgID4KICAgIGJ6IGNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwMQogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDEKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwMQogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKY3JlYXRlQmlkQXNhX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNSAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY3JlYXRlQmlkQXNhX2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA1CiAgICAvLyBjb25zdCBiaWRGZWUgPSB0aGlzLmdldEJpZEZlZShiaWRBbW91bnQpCiAgICBkdXAKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNgogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gcmFmZmxlQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVBbW91bnQgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE3IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPSBiaWRBbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCmNyZWF0ZUJpZEFzYV9pZl9ib2R5QDE6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyBtYnIgKz0gYmlkc0J5QWRkcmVzcwogICAgaW50YyAxMSAvLyA1MzQwMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNSAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY3JlYXRlQmlkQXNhX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODMKICAgIC8vIG1iciArPSBsb2NhdGlvbnMKICAgIGludGMgMTIgLy8gNzIzMDAKICAgIGZyYW1lX2J1cnkgMAogICAgYiBjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQoaWQ6IHVpbnQ2NCkgLT4gdm9pZDoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8gcmVmdW5kQmlkKGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTMKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA8IHRoaXMuYmlkSUQudmFsdWUgLSAxLCBFUlJfQ0FOTk9UX1JFRlVORF9NT1NUX1JFQ0VOVF9CSUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA0IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkIDwgdGhpcy5iaWRJRC52YWx1ZSAtIDEsIEVSUl9DQU5OT1RfUkVGVU5EX01PU1RfUkVDRU5UX0JJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICA+CiAgICBibnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOkNSTVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q1JNUgoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyhpZCkuZXhpc3RzLCBFUlJfQklEX05PVF9GT1VORCkKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDM2IC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzE1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRzKGlkKS5leGlzdHMsIEVSUl9CSURfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOkJORkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Qk5GRAoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gY29uc3QgeyByZWZ1bmRlZCwgYW1vdW50LCBhY2NvdW50OiByZWNlaXZlciB9ID0gdGhpcy5iaWRzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDU3NgogICAgZ2V0Yml0CiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTkKICAgIC8vIGxvZ2dlZEFzc2VydCghcmVmdW5kZWQsIEVSUl9CSURfQUxSRUFEWV9SRUZVTkRFRCkKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjpCQVJGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJBUkYKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjEKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUucmVmdW5kZWQgPSB0cnVlCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNzIKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBzZXRiaXQKICAgIHB1c2hpbnQgNzIKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyMwogICAgLy8gY29uc3QgYmlkRmVlID0gdGhpcy5nZXRCaWRGZWUoYW1vdW50KQogICAgc3dhcAogICAgZHVwCiAgICBjYWxsc3ViIGdldEJpZEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjUKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gYW1vdW50IC0gYmlkRmVlCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjktNzMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50OiByZXR1cm5BbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI5LTczMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudDogcmV0dXJuQW1vdW50LCByZWNlaXZlciB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjktNzMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50OiByZXR1cm5BbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0MgogICAgLy8gdGhpcy5yZWZ1bmRDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MQogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAyOSAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIHRoaXMucmVmdW5kQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDI5IC8vICJyZWZ1bmRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0MgogICAgLy8gdGhpcy5yZWZ1bmRDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzMzLTczOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzM3CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzMtNzM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldEFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzMzLTczOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRfYWZ0ZXJfaWZfZWxzZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlKCkgLT4gdWludDY0OgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc1CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNyAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzUKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID49CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NS05NzYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmVfYm9vbF9mYWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWNfMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc1LTk3NgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NC05NzcKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NC05NzcKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQoKSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg4CiAgICAvLyBpZiAodGhpcy5oaWdoZXN0QmlkLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE3IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg4CiAgICAvLyBpZiAodGhpcy5oaWdoZXN0QmlkLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg5CiAgICAvLyByZXR1cm4gdGhpcy5oaWdoZXN0QmlkLnZhbHVlICsgdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAxNyAvLyAiaGlnaGVzdF9iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gcmV0dXJuIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSArIHRoaXMuYmlkTWluaW11bUluY3JlYXNlLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZE1pbmltdW1JbmNyZWFzZSB9KQogICAgYnl0ZWMgNDkgLy8gImJpZF9taW5pbXVtX2luY3JlYXNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODkKICAgIC8vIHJldHVybiB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgKyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyByZXR1cm4gdGhpcy5zdGFydGluZ0JpZC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHN0YXJ0aW5nQmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRpbmdCaWQgfSkKICAgIGJ5dGVjIDQ4IC8vICJzdGFydGluZ19iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5MQogICAgLy8gcmV0dXJuIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAPAAEIBKCNBoAg////////////Aa3+1eTUhf2oWM+Cnrvv796CFNGCnrvv796CFNSQApihA+y0BP////8P1K+gBiY+CWJpZF9hc3NldAlha2l0YV9kYW8FcHJpemUNZW5kX3RpbWVzdGFtcAZiaWRfaWQHYmlkX2ZlZQQVH3x1AWEMaXNfcHJpemVfYm94BnNlbGxlcgh3X3RvdGFscxF3ZWlnaHRzX2JveF9jb3VudA53aW5uaW5nX3RpY2tldAIAAQxha2l0YV9lc2Nyb3cNcmFmZmxlX3dpbm5lchJ3ZWlnaHRlZF9iaWRfdG90YWwLaGlnaGVzdF9iaWQNcmFmZmxlX2Ftb3VudBFyZWZ1bmRfbWJyX2N1cnNvcg1wcml6ZV9jbGFpbWVkCEVSUjpJUEFZEXZyZl9mYWlsdXJlX2NvdW50FHJhZmZsZV9wcml6ZV9jbGFpbWVkFHVuaXF1ZV9hZGRyZXNzX2NvdW50B2dhdGVfaWQLbWFya2V0cGxhY2UBdwZ3YWxsZXQMcmVmdW5kX2NvdW50DHJhZmZsZV9yb3VuZAhFUlI6TUJGRg9jcmVhdG9yX3JveWFsdHkVbWFya2V0cGxhY2Vfcm95YWx0aWVzCEVSUjpBTkxWCEVSUjpBSE5FAWIPc3RhcnRfdGltZXN0YW1wE2ZpbmRfd2lubmVyX2N1cnNvcnMIbmZ0X2ZlZXMIRVJSOlBaTkMBbAEACEVSUjpOREFPCEVSUjpJWEZSAwaBAQNvYWwDYWFsDHN0YXJ0aW5nX2JpZBRiaWRfbWluaW11bV9pbmNyZWFzZQd2ZXJzaW9uBHNhbHQIRVJSOk5BUFAIRVJSOk5BUkMIRVJSOlNIQkIErfkq5AhFUlI6RkdURQhFUlI6SEdURQIAAAhFUlI6SVJCRAhFUlI6V05GRANwYWwxGEAALCcWImcnHSJnJxAiZycRImcnBCNnJxIiZycXImcnGCJnJxMjZycMImcnHiJnggMEJIfDLAQx8mqbBOqRgN02GgCOAwDtAOEA1jEZFEQxGEEAv4IUBL1xSNAEmDbInwRNWFaXBNn08DoEdpUpMQS545xcBGllAd4EvRsn0QTyzi9GBJ2vBQoEZfypiwQF5d5NBI+koWAEYIIwPAQgiV4mBK6Ey9gEM+kslASFTe3gBD6hGDIEcxEQcDYaAI4UBPoGtAcJBzcHmQfSB+AJ7QtEDE8RCBG6Ej8STxJsEncS9wAqExoAAQCAJBUffHUAAAAAAACIVAAAAAAAyBfUAAAAAAAASEQAAAAAAABJ1LAjQyNDgASC/6LONhoAjgEDOQAxGSUSMRgQREISaTEZgQUSMRgQREIF0zEZgQUSMRgQREIFGYoCAIv+gQoISTIMDUEAKrGBBrIQgQWyGSctsh4nLbIfi/+NAgALAASzQv/cMgCyAUL/9SKyAUL/74mKAQGL/4ESkYv/G4EbkSENGov/gTuRSpFMHCMeRQGBHxpPAkyQIQ0aGYmKAQExAIv/QAABiUiL/4ASY29udHJvbGxlZF9hZGRyZXNzZUiJigIBi/4nLmVIgRhbsbIYgAQ8Gm8zshqL/7IagQayECKyAbO0PklXBABLAVcABCcGEkRJIlmBAghMFRJEVwYASRVJTgJBAAeLACQTQQAESCJMiRdC//qKBAGL/DgYi/0nL2VIgShbEkEAOIv8OBlAADGL/DgbJRJBACiL/DkaAIAEQ5ImVRJBABmL/DkaAYv+EkEADov8ORoCi/8WEkEAAiOJIomKBwKAACKL+kAABYv/QAE6I0SL+ScvZUgkW4v9IlmB1MUBC4HkxQIITIv6QABXsUlyCERLAov+CLIIsgcjshAisgG2i/sWi/wWTwKyGIAEe33F/LIaTLIashqL/bIagQayECKyAbO0PklXBABMVwAEJwYSREkVJBJEFxZMFlCL/U8DTwOJSXIIRIv6cABFAUEAg0sBTgJJcghMTgNEIowAi/9BAAlJcghEI4wAjAGxSXIIRE8CsgiyByOyECKyAbaLAEEABIsBshWL+rIRi/6yEkyyFCWyECKyAbaL+xaL/BZPArIYgASvGhTyshpMshqyGov9shqBBrIQIrIBs7Q+SVcEAExXAAQnBhJESRUkEkQXQv9lSwEyEAhOArFHAnIIRDIQsgiyByOyECKyAbaL+hZMshiABDlOrrKyGrIagQayECKyAbNC/0wiQv7DigMBgACL/TEAiP4CSTIDTEAAd0UBi/9BAGdJMgMTQQBgi/2AC3dhbGxldF9mZWVzZUgkW0khBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjAAyB0mBgPUkCIsASU4CFk8ETFAnDUxQi/2L/k8FTwRPBEsFIoj+P0hXCAiL/08CCRZMUEyJi/8WIhZQjACJSIAIcmVmZXJyZXJlSEL/ezYaAUkVJBJEFzYaAkkVIxJEIlM2GgNJFSQSRBc2GgRJFSQSRBdMNhoFSRUkEkQXTDYaBkkVJBJEF0w2GgdJFSQSRBdMNhoISRUkEkQXTDYaCUlOAhWBKBJENhoKSU4CFYEgEkQ2GgtJFSQSRBdMNhoMSRUkEkQXTDYaDUlOAhWBIBJENhoOSSJZgQIISwEVEkRXAgA2Gg9JTgNJFUsBJFlJgQoSRE8CTEsCUklOAkkVSwEiWUmBChJETFIiWYEWCBJEMg1AAAQnH7AAKk8QZycITw9nJxQiZ0sCQQAUSwJxAERAAAyACEVSUjpJQVNUsAAoTwNnJwVPDWcnME8MZycxTwtnJyVPCmcrTwlngAZmdW5kZXJPCGcnCU8HZycgTwZnJxlPBWcnGk8EZ08CIltJcghEMgMTQAAMgAhFUlI6SUFQULAAKUxnJw5MZycyTGeBeK8nCkxnJyaAEAAAAAAAAAAAAAAAAAAAAAFnJw8yA2cnMzEXZyIpZUQnJ2VIgUhbJyFMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAEJx+wACInBWVEQAAEJzSwAEmBAw9AAAyACEVSUjpNM0hCsABJIQ4LSwI4BzIKEkAABCcVsABPAjgIEkAABCcVsAAiSUsCDEEAEUkWJxtMUIGAgAK5SCMIQv/oSCcLTGcjQzEAMgkSQAAEJx+wACInBGVEIw1BAJQiJwRlRIECCSInHWVEEkAABCc1sAAiJxRlREAABCcosAAiJxdlREAADIAIRVJSOlJXSEOwACInBGVEIicTZUQSQAAEJzWwACInC2VEQQAEJzawACInCGVEQAASsTIJIiplRLIRshUlshAisgGzIihlREEAErEyCSIoZUSyEbIVJbIQIrIBs7EyCbIJI7IQIrIBsyNDIkL/cDEAMgkSQAAEJx+wADIHIiclZUQMQAAMgAhFUlI6QUFTVLAAIicLZURBAAQnNrAAIicIZURBAEGxIicJZUQiKmVEshgnN7IashqBBrIQIrIBsyIoZURBABKxMgkiKGVEshGyFSWyECKyAbOxMgmyCSOyECKyAbMjQ7EiJwllRCIqZUSyEbIVJbIQIrIBs0L/wTEWgQIJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFYEgEkQiKWVEMQCI+gqI+eKIEONAAAQnIrAAIillRCInGWVETwRPAk8DTwOI+j9AAAQnOLAAiA7fI0MxFiMJSTgQIxJENhoBSRWBIBJEiBCmQAAEJyKwACInGWVEQQAEJzmwAIgOsSNDMRaBAwlJOBAjEkQxFoECCUk4ECUSRDEWIwlJOBCBBhJENhoBSU4CFYEgEkQiKWVEMQCI+XqI+VKIEFNAAAQnIrAAIillRCInGWVETwNPAk8DTwOI+a9AAAQnOLAAiA7dI0MxFoECCUk4ECMSRDEWIwlJOBAlEkQ2GgFJFYEgEkSIEAtAAAQnIrAAIicZZURBAAQnObAAiA6kI0M2GgFJFSQSRBeID0cjQzIHIitlRA1AAAQnI7AAIicMZURBAAyACEVSUjpXQURSsAAiJx5lREAACDIGJAknHkxnIiceZUQiJxZlRCULCEkyBkwkCA9AAAyACEVSUjpORVRNsACxFiInM2VESRUWVwYCTFAiKWVEJy5lSCJbshiABBiTksWyGkyyGrIagQayECKyAbO0PklXBABLAVcABCcGEkRJIlmBAghMFRJEVwYASRVJQAAPRgIiJxZlRCMIJxZMZyNDIksBDyJLAk8CTYEQSwIPgRBPA08CTVJJFYEQEkAADIAIRVJSOklSU0SwAEkiWyIhBx1FAUkhCB5FAU8CHkUBIQcdRQEhCB5OAkhPAiRbTCEJHkUBHkUBIQcdRQEhCR5FAUwWTBZQIicQZUxJTwJEIQYMQQACIwgnOk4CSUEA0kkjDUAABCc7sAAjCUkjDUAABCc7sABHAhwjHkUBTBhOAyJMTwJLAiMMQQCCSSJbSU4FIQcdRQEhCB5JTgJOBkhMJFtMQABigaKFvPbe372FKExJIQcdRQFPAh5FAU8FFkwWUE8FiPcagSCQTwKI9xIZFlBJVwAQTgSBEFtJSwYPQQAgSwEYIwgWTwNJIlkjCBZXBgBcAExQTgJMIwhMTwNC/4JITwNC/4MhCUL/o0UBRQFPAkiAAgASUExQSYEQWUsBFVKBAlsnDExnJxYiZ0L+rUghBkL/PoAARwI2GgFJFSQSRBciJwVlREAABCc0sAAyByIrZUQNQAAEJyOwACInDGVEQAAMgAhFUlI6V05ORrAAIicPZUQyAxJAAAyACEVSUjpXQUZEsAAiJyZlREkiW0wkW0UEIiInC2VESwENQQDjIicKZURLASQLWyInDGVESwZPAghJTgIMQQC4RgIWSwMWUEkiW0lPAiRbRQUiJxhlREsBCUlLBElOAw1MTgJNSUUETCEFGElFByEFTAlJRQUNQQAESwJFAkkhBQoWJxtMUExLAoE8CyKI9ZoiSUsEDEEAUUsGSwEIJAtLA0wkuhdJIicRZUQSQQAKSwYIRQYjCEL/2EsGSU8CCEwiJwxlRA5BABsiJwxlREsBDEEAEEsCSwIIFicpTFC+RCcPTGdFBkL/y0hLAggWSwQWUCcmTGcjQ08CIQUITgJMIwhMRQVC/xJIFksDFlBC/zYigAA2GgFJFSQSRBciJxRlREAABCcosAAiJwVlREEACyInD2VEMgMTQQDcI0AABCc8sAAiJwRlRCInE2VEE0AADIAIRVJSOkFSRkOwACInE2VMSU4CTgNEIicEZURLAQlJTwNJTgMNTE4CTUlOAoE8CyKI9KQhCksDSwMISwINQQB3SwEWJyRMUEm+REmBwARTTFcAIE4FQAASIicEZUQjCUsDE0EABUsCiAs1vEgnB0sEUEm9RQFAABtISUUGsUsFsghPA7IHI7IQIrIBs0wjCExC/6JJvkQXTLxIIQtFBxYnKUxQSUUIvUUBQf/QSwa8SCEMRQZC/8VGAiInE2VECCcTTGcjQyJC/yGAAEcFMgciK2VEDUAABCcjsAAiJxRlREEADIAIRVJSOlBBQ0ywACInBGVEIwkWJyRMUL5ESVcAIExJgSBbTFcoIE4CIicIZURBBBixIiplRLIYJzeyGkyyGoEGshAisgGzIihlREAAq4gIFEkiW0UFSSRbTEmBEFtMgRhbTCInCGVEQQCJTwJLBghJQABvRQWxIicOZUSBAltyCERLBbIIsgcjshAisgGzsSInGmVESwGyCLIHI7IQIrIBs7GyCEyyByOyECKyAbOxIicJZUSyB7III7IQIrIBsyInCGVEQAAVsSIqZURxC0RLA7IIsgcjshAisgGzJxQjZyNDIillRCJPAoj1giJbRQVC/4JPAkL/d4gHaUkiW0UFSSRbTEmBEFtMgRhbTCInCGVEQQMuTwJLBghJQAMRRQUiJw5lRIECW3IIRCIoZURwAEUBQQF0sSIpZURyCEQiKGVEshFLBbISshQlshAisgGzIicaZUQiKGVEcABFAUEBHbEiJxplRCIoZUSyEUsBshKyFCWyECKyAbMiKGVESwNMcABFAUEAzLEiKGVEshGyEkyyFCWyECKyAbMiJwllRCIoZURwAEUBQQB9sSInCWVEIihlRLIRshSyEiWyECKyAbMiJwhlRED/EiIqZURxC0QiKGVEcABFAUEAHrEiKmVEcQtEIihlRLIRSwOyErIUJbIQIrIBs0L+4iIpZUQiKGVEIiplRHELREsFSU4CFlAnDUxQTwNPAyIhBk8ETwUiiPL9RgJC/rQiKWVEIihlRCInCWVETwNJTgIWUCcNTFBPA08DIiEGTwRPBSKI8tFGAkL/biIpZUQiKGVETwJJTgIWTwVMUCcNTFBPA08CIiEGTwRPBSKI8qdGAkL/HSIpZUQiKGVEIicaZURLA0lOAhZQJw1MUE8DTwMiIQZPBE8FIojye0YCQv7QIihlTEUJRCIpZURJJxxlSE4ESSc9ZUhJVwgITgYkW04GIicOZUxJTgJOBkRJIllLARVSSU4GVwIATCccZUhMsSMWTgVJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGoEGshAisgGztD5JVwQASwFXAAQnBhJESSJZgSkLgQIITBUSRFcGKSJbSUAADIAIRVJSOk5FU0OwAE8FgQJbSUULEkAADIAIRVJSOldFU0OwALFLBbIYgARa3zOPshpPBrIaTwOyGk8DshqACgABAAAAAAAAAACyGic6shqBBrIQIrIBIillTEUMREsFcghEIkUKSwpwAEUBQAAaSwqADnJldmVudWVfc3BsaXRzZUgiWSMIRQkyEEsJC7ZLBnIIRLIHsggjshAisgG2TwNJFksKFicNTFBPBrIYgARoNeO8shpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAUsEQQAWtksDcghESwiyEUsFshKyFCWyECKyAbNC/SIiKWVEIihlRE8CiPIyIltFBUL83U8CQvzSMgoiKmVETEsBcABITEsDTHAARQFBABVIsSIqZUSyEUyyFSWyECKyAbNC+9IiKWVEIiplRE8CSU4CFk8FTFAnDUxQTwNPAiIhBk8ETwUjiPCHRgJC+6giJw9lRDIDE0AABCc8sAAiJxdlREEADIAIRVJSOlJBUEOwACIpZUQnJ2VIgVBbIicSZURLASEEDkRJTwIdIQSXSU4CCSIoZURAADCxIicOZUSBAltyCERPArIIsgcjshAisgGzsSInD2VEsgeyCCOyECKyAbMnFyNnI0OxIicOZUSBAltyCEQiKGVESbIRTwOyEkyyFCWyECKyAbOxIicPZUSyFLIRshIlshAisgGzQv/DNhoBSRUkEkQXMgciK2VEDUAABCcjsAAiJxRlREAABCcosAAiJxdlREAADIAIRVJSOlJOUEOwAEmBHgsiiO5kIklLAgxBABYiJwtlRCMJSwEJFicbTFC8SCMIQv/jSCInC2VESwEJJwtMZyEOC7EyCUsBsgiyByOyECKyAbMWJwZMULAjQ4gFgycqIk8CVCcGTFCwI0M2GgFJFYEgEkQnB0xQvUUBJyoiTwJUJwZMULAjQ4gFbxYnBkxQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIillRCccZUhyCEQSQAAEJyuwACcOTGcjQzYaAUkiWYECCEsBFRJEVwIAMQAiKWVEJxxlSHIIRBJAAAQnK7AAIillRCc9ZUiBEFsyDRJAAAyACEVSUjpJVVBHsAAnMkxnI0M2GgFJFSQSRBcxACIpZUQnHGVIcghEEkAABCcrsAApTGcjQzEWIwlJOBAjEkQ2GgFJFSQSRBcxADIJEkAADIAIRVJSOkZPUkKwAEsBOAcyChJAAAyACEVSUjpJUE1SsABMOAgyEBJAAAyACEVSUjpJUE1BsACxMgpMshEishKyFCWyECKyAbMjQyInBGVESSMIJwRMZ4mKAwAxAIv+FklOAlCL/1AnKlCL/RYnJExQTL8iJwVlREEA4ScHMQBQvUUBQQBSJwcxAFC+RBdJIQUKSRYnG0xQTwIhBRgkC0okuheL/kwJIicKZURPBCQLTEsBWyInEGVESwMIJxBMZ08ETwRPBbtPAggWIicKZUROAl0nCkxniSInGGVMSU8CRCInC2VEIQULDEAADIAIRVJSOlRNUFSwACInCmVESwEhBQpJJAtPAksBWyInEGVEi/4IJxBMZycHMQBQSwQWTEsBv08DFicbTFBPBCEFGCQLTwW7TIv+CBYiJwplRE8DTwJdJwpMZzEAJylPAlBMvyInGGVEIwgnGExniUgnBzEAUL1FAUD/bycHMQBQIha/iYoBASInBWVESSEEDkSL/x0hBJdJQAAQIicFZURBAAiL/0EAAyNMiYmKAQGAAEcDIkknIGVEQQAmIicgZURJIQQORIv/HSEEl0mMBEAAECInIGVEQQAIi/9BAAMjjAQiKWVEJydlSEmBOFuMA4FAW0mMAiKMAEEAbCIpZUQiJwllRLFMgANzYWxlSIEQW7IYgATVdLsQshqyGoEGshAisgGztD5JVwQATFcABCcGEkRJFSQSRBdJIw1BAIAjCYsCSYsDCU8CC4HoBwoJSSEEDkSL/x0hBJdJjABAAAiL/0EAAyOMACKMASInIWVEQQAmIichZURJIQQORIv/HSEEl0mMAUAAECInIWVEQQAIi/9BAAMjjAGLBEmLAElOAwiBAosBSU4FCwiL/0wJTBZPAhZQTwIWUEwWUIwAiUgjQv99igIAgACI/ZIhCicHMQBQvUUBQQBljACL/jgISU4CiwAJiAHUi/44BzIKEkAABCcVsACLAAhPAw5AAAQnFbAATEsBi/+I/WAyByIrZUSBeAkNQQALIitlRIGsAggrTGciJwVlREEADkmI/lUiJxJlRAgnEkxnJxFMZ4lIIQuMACInBWVEQf+QIQyMAEL/iYoDAIAAiP0EIQonBzEAUL1FAUEAiIwAi/04BzIKEkAABCcVsACL/TgIiwASQAAEJxWwAIv+OBKIATCL/jgUMgoSQAAEJyywAEsBDkAABCcssACL/jgRIihlRBJAAAQnLLAATEsBi/+I/K8yByIrZUSBeAkNQQALIitlRIGsAggrTGciJwVlREEADkmI/aQiJxJlRAgnEkxnJxFMZ4lIIQuMACInBWVEQf9tIQyMAEL/ZooBACInBGVEIwmL/w1AAAyACEVSUjpDUk1SsACL/xYnJExQSb1FAUAADIAIRVJSOkJORkSwAEm+REmBwARTSwGBIFtOA0xXACBMQQAMgAhFUlI6QkFSRrAATEmBSCO6IiNUgUhMu0xJiP0WCSIoZURAABixsgiyByOyECKyAbMiJx1lRCMIJx1MZ4mxIihlRLIRshKyFCWyECKyAbNC/98yByInJWVED0EADDIHIitlRA5BAAIjiSKJIicRZURBAAwiJxFlRCInMWVECIkiJzBlRIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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



var APP_SPEC2 = { "name": "AuctionFactory", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteAuctionApp", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancelAuction", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuctionCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "prizeAssetID" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1143, 1828], "errorMessage": "Box must have value" }, { "pc": [540, 2978], "errorMessage": "Bytes has valid prefix" }, { "pc": [939, 1728], "errorMessage": "ERR:BINC" }, { "pc": [1671], "errorMessage": "ERR:BMPT" }, { "pc": [963, 1752, 2699], "errorMessage": "ERR:CNST" }, { "pc": [952, 1741], "errorMessage": "ERR:EMFM" }, { "pc": [2688], "errorMessage": "ERR:ICOR" }, { "pc": [1068, 1082, 1798, 1812], "errorMessage": "ERR:IPAY" }, { "pc": [2830], "errorMessage": "ERR:IPMA" }, { "pc": [2804], "errorMessage": "ERR:IPMR" }, { "pc": [3346], "errorMessage": "ERR:IUPG" }, { "pc": [1096, 1110, 1122], "errorMessage": "ERR:IXFR" }, { "pc": [2178, 2267], "errorMessage": "ERR:NAUC" }, { "pc": [2544, 2570, 2729, 3275, 3317, 3381], "errorMessage": "ERR:NDAO" }, { "pc": [3012], "errorMessage": "ERR:NESC" }, { "pc": [998], "errorMessage": "ERR:NOPT" }, { "pc": [1719, 2193, 2282], "errorMessage": "ERR:NPBO" }, { "pc": [3036], "errorMessage": "ERR:WESC" }, { "pc": [1700], "errorMessage": "NAPB" }, { "pc": [610, 1310, 1331, 1368, 1395, 1439, 1686, 1698, 1998, 2019, 2045, 2089, 2168, 2257, 2562, 2721, 2778, 3098, 3114, 3207, 3267, 3309, 3373], "errorMessage": "application exists" }, { "pc": [452], "errorMessage": "asset exists" }, { "pc": [1013, 1126, 1180, 1192, 1196, 1484, 1675, 1816, 1868, 1880, 1884, 2134, 2402, 2447, 2475, 2556, 2715, 2767, 2771, 2874, 2904, 3090, 3197, 3201, 3261, 3303, 3321, 3367], "errorMessage": "check GlobalState exists" }, { "pc": [433, 543, 661, 675, 692, 734, 790, 812, 2500, 2592, 2981, 3250, 3286], "errorMessage": "invalid array length header" }, { "pc": [2343], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [683, 700, 798, 2508, 2600, 3294], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [822], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [2991], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [918, 1625], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [711, 833, 846, 859, 870, 882, 895, 907, 929, 1538, 1552, 1565, 1576, 1589, 1602, 1614, 1636, 2163, 2252, 2354, 2366, 2377, 2519, 2584, 2753, 3192, 3360], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [739, 3255], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [550], "errorMessage": "invalid number of bytes for string" }, { "pc": [726, 3242], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [721, 3237], "errorMessage": "invalid tuple encoding" }, { "pc": [1515], "errorMessage": "transaction type is appl" }, { "pc": [784], "errorMessage": "transaction type is axfer" }, { "pc": [773, 1527, 2745], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiA2NzAwMCA0MDk2IDEzMTEzMzAwIDE2MTI1MDAgNTAwMDAgMzM1MDAwIDI2ODAwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmMiICJha2l0YV9lc2Nyb3ciICJ3YWxsZXQiIDB4MTUxZjdjNzUgIkVSUjpOREFPIiAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIgIkVSUjpJUEFZIiAiYWFsIiAiRVJSOkNOU1QiICJFUlI6SVhGUiIgMHgzZWExMTgzMiAiRVJSOk5QQk8iIDB4YzUzYjMyY2MgInZlcnNpb24iICJFUlI6QklOQyIgIkVSUjpFTUZNIiAweDAwMGEgYmFzZTY0KEM0RUJRdz09KSAweDgyZmZhMmNlIDB4YmQ3MTQ4ZDAgMHhhZGY5MmFlNCAweDAwMDAgIkVSUjpOQVVDIiAic2VsbGVyIiAiZnVuZGVyIiAicGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwLTI2CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBBdWN0aW9uRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZUF1Y3Rpb24sIEZhY3RvcnlDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMC0yNgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbkZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VBdWN0aW9uLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjIKICAgIHB1c2hieXRlc3MgMHhkMTU0OGZmZiAweDczZjAwMjIzIDB4MTcxNGRhNjUgMHg4MGY0NDU0MSAweGE1ZDQyYjNhIC8vIG1ldGhvZCAibmV3QXVjdGlvbihwYXksYXhmZXIsc3RyaW5nLGJ5dGVbMzJdW10sdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3UHJpemVCb3hBdWN0aW9uKGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImRlbGV0ZUF1Y3Rpb25BcHAodWludDY0KXZvaWQiLCBtZXRob2QgImNhbmNlbEF1Y3Rpb24odWludDY0KXZvaWQiLCBtZXRob2QgIm5ld0F1Y3Rpb25Db3N0KGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IgogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHg3MzExMTA3MCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbmV3QXVjdGlvbiBuZXdQcml6ZUJveEF1Y3Rpb24gZGVsZXRlQXVjdGlvbkFwcCBjYW5jZWxBdWN0aW9uIG5ld0F1Y3Rpb25Db3N0IGluaXRCb3hlZENvbnRyYWN0IGxvYWRCb3hlZENvbnRyYWN0IGRlbGV0ZUJveGVkQ29udHJhY3Qgb3B0SW4gb3B0SW5Db3N0IHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxOSBtYWluX21icl9yb3V0ZUAyMAogICAgZXJyCgptYWluX21icl9yb3V0ZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2Jhc2UudHM6NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMDg4NTQwMDAwMDAwMDAwYzgxN2Q0MDAwMDAwMDAwMDAwNDg0NDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjAtMjYKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb25GYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlQXVjdGlvbiwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHg4MTE1MzYyOCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzKGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIG5hbWU6IGJ5dGVzLCBwcm9vZjogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CnJveWFsdGllczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDMzCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcm95YWx0aWVzKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IEFzc2V0LCBuYW1lOiBzdHJpbmcsIHByb29mOiBQcm9vZik6IHVpbnQ2NCB7CiAgICBwcm90byA0IDIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzNAogICAgLy8gbGV0IGNyZWF0b3JSb3lhbHR5OiB1aW50NjQgPSAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM2CiAgICAvLyBpZiAoIShwcm9vZi5sZW5ndGggPiAwKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgYm56IHJveWFsdGllc19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM3CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlEZWZhdWx0CiAgICBwdXNoaW50IDUwMDAKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQxLTQ1MQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ0CiAgICAvLyBhc3NldC5jcmVhdG9yLAogICAgZnJhbWVfZGlnIC0zCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDUKICAgIC8vIG5hbWUsCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NgogICAgLy8gc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDgKICAgIC8vIDEsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC00CiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MS00NTEKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgwY2YxYjljZiAvLyBtZXRob2QgInZlcmlmaWVkUmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDkKICAgIC8vICdyb3lhbHR5JywKICAgIHB1c2hieXRlcyAweDAwMDc3MjZmNzk2MTZjNzQ3OQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQxLTQ1MQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTMKICAgIC8vIGlmIChCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykubGVuZ3RoID4gMCkgewogICAgbGVuCiAgICBieiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1NAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBidG9pKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKSkKICAgIGZyYW1lX2RpZyAwCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDEKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1NwogICAgLy8gaWYgKGNyZWF0b3JSb3lhbHR5ID4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlKSB7CiAgICBmcmFtZV9kaWcgMQogICAgaW50YyA4IC8vIDUwMDAwCiAgICA+CiAgICBieiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1OAogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZQogICAgaW50YyA4IC8vIDUwMDAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2MQogICAgLy8gcmV0dXJuIGNyZWF0b3JSb3lhbHR5CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmV3YXJkc09wdEluQ29zdChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJld2FyZHNPcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZXdhcmRzT3B0SW5Db3N0X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNwogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI4CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzNwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQwCiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ0CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NwogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDE0IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDYgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzMKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSBjaGlsZFZlcnNpb24KICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpuZXdBdWN0aW9uOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MC01NAogICAgLy8gbmV3QXVjdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgY292ZXIgNwogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBjb3ZlciA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTUKICAgIC8vIGxvZ2dlZEFzc2VydChiaWRNaW5pbXVtSW5jcmVhc2UgPiAwLCBFUlJfQklEU19NVVNUX0FMV0FZU19JTkNSRUFTRSkKICAgIGJueiBuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNSAvLyAiRVJSOkJJTkMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QklOQwoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICsgMzAwLCBFUlJfRU5EX01VU1RfQkVfQVRMRUFTVF9GSVZFX01JTlVURVNfQUZURVJfU1RBUlQpCiAgICBzd2FwCiAgICBwdXNoaW50IDMwMAogICAgKwogICAgPgogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE2IC8vICJFUlI6RU1GTSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFTUZNCgpuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIEVSUl9DT05UUkFDVF9OT1RfU0VUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOSAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1OQogICAgLy8gY29uc3QgaXNBbGdvQmlkID0gYmlkQXNzZXRJRCA9PT0gMAogICAgZGlnIDEKICAgIGR1cAogICAgIQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjYxCiAgICAvLyBsb2dnZWRBc3NlcnQoaXNBbGdvQmlkIHx8IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChiaWRBc3NldElEKSksIEVSUl9OT1RfT1BURURfSU4pCiAgICBieiBuZXdBdWN0aW9uX2Jvb2xfdHJ1ZUA5CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBuZXdBdWN0aW9uX2Jvb2xfZmFsc2VAMTAKCm5ld0F1Y3Rpb25fYm9vbF90cnVlQDk6CiAgICBpbnRjXzEgLy8gMQoKbmV3QXVjdGlvbl9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjYxCiAgICAvLyBsb2dnZWRBc3NlcnQoaXNBbGdvQmlkIHx8IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChiaWRBc3NldElEKSksIEVSUl9OT1RfT1BURURfSU4pCiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOk5PUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9QVAoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjMKICAgIC8vIGNvbnN0IG9wdGluTUJSOiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoaXNBbGdvQmlkID8gMSA6IDIpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHB1c2hpbnQgMgogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgc2VsZWN0CiAgICAqCiAgICBidXJ5IDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzMKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzMKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBidXJ5IDIwCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzMKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzQKICAgIC8vIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAyCiAgICBibnogbmV3QXVjdGlvbl9lbHNlX2JvZHlAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzUKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpuZXdBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIGNvbnN0IGNoaWxkQXBwTUJSOiB1aW50NjQgPSBHbG9iYWwubWluQmFsYW5jZSArIG9wdGluTUJSICsgKHdlaWdodHNMaXN0Q291bnQgKiBjb3N0cy53ZWlnaHRzKSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGRpZyAyMAogICAgKwogICAgZGlnIDUKICAgIGludGMgNiAvLyAxMzExMzMwMAogICAgKgogICAgZHVwCiAgICBidXJ5IDIwCiAgICArCiAgICBkaWcgMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjgyLTg0CiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgaW50YyA3IC8vIDE2MTI1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo4Mi04NQogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyA0CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDcgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjkwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRvdGFsTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDQKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDEKICAgID09CiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjIDcgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjkzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnNlbmRlciA9PT0gVHhuLnNlbmRlciwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDIyCiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTQKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZGlnIDIKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDI2CiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjk3CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMjAKICAgIGR1cAogICAgY292ZXIgMgogICAgZGlnIDIwCiAgICBkaWcgMjAKICAgIGNhbGxzdWIgcm95YWx0aWVzCiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCBhcHByb3ZhbFNpemUgPSB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDEKICAgIC8vIGNvbnN0IGNodW5rMSA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDAsIDQwOTYpCiAgICBpbnRjXzAgLy8gMAogICAgaW50YyA1IC8vIDQwOTYKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAyCiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgc3dhcAogICAgaW50YyA1IC8vIDQwOTYKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAyCiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgaW50YyA1IC8vIDQwOTYKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDQtMTI2CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwNwogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIGRpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICB1bmNvdmVyIDkKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMTYKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE3CiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDYgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTIwCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTIxCiAgICAvLyB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlYyAxNyAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjcKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgcHVzaGludCAxMAogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMjUKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwNC0xMjYKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjUKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICBwdXNoaW50IDMKICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2NwogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBieXRlYyAxOCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA0LTEyNgogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLCh1aW50NjQsKHN0cmluZyx1aW50NjQpKSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwOAogICAgLy8gZmFsc2UsCiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxOQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA0LTEyNgogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA0LTEyOAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzMS0xMzYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzMKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzQKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDcKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTMxLTEzNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTMxLTEzNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzktMTQ4CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0MwogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0NAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNDItMTQ1CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTM5LTE0OAogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTEgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUxLTE1NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE1MwogICAgLy8gYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUxLTE1NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE1MS0xNTcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTU5CiAgICAvLyBpZiAoIWlzQWxnb0JpZCkgewogICAgc3dhcAogICAgYnogbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDM1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTYxLTE3MAogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjUKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjYKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY0LTE2NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2MS0xNzAKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMSAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3NAogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGRpZyA5CiAgICBieiBuZXdBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzctMTg2CiAgICAvLyBhdWN0aW9uLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLmlkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxODEKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTYKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgwLTE4MwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTc3LTE4NgogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAyMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld0F1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MC01NAogICAgLy8gbmV3QXVjdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3QXVjdGlvbl9lbHNlX2JvZHlAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjc3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNwogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgOSAvLyAzMzUwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3NwogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICArCiAgICBiIG5ld0F1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAxNgoKbmV3QXVjdGlvbl9ib29sX2ZhbHNlQDEwOgogICAgaW50Y18wIC8vIDAKICAgIGIgbmV3QXVjdGlvbl9ib29sX21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5uZXdQcml6ZUJveEF1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpuZXdQcml6ZUJveEF1Y3Rpb246CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE5Mi0yMDQKICAgIC8vIG5ld1ByaXplQm94QXVjdGlvbigKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgNQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgOAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgY292ZXIgOAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgY292ZXIgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwNwogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDIxIC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDctMjA4CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbl9ib29sX2ZhbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDgKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGRpZyA1CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDctMjA4CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKbmV3UHJpemVCb3hBdWN0aW9uX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDYtMjA5CiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gKSwgRVJSX0JBRF9NRVRIT0RfUFJJWkVfQk9YX1RSQU5TRkVSX05FRURFRCkKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOkJNUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Qk1QVAoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTAKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciA2CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGJ1cnkgMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDY1CiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgRVJSX05PVF9BX1BSSVpFX0JPWCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2NQogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIEVSUl9OT1RfQV9QUklaRV9CT1gpCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBOQVBCCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2NgogICAgLy8gY29uc3QgW293bmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMocHJpemVCb3gsIEJ5dGVzKFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lcikpCiAgICBwdXNoYnl0ZXMgIm93bmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUEJPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QQk8KCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTEKICAgIC8vIGxvZ2dlZEFzc2VydChiaWRNaW5pbXVtSW5jcmVhc2UgPiAwLCBFUlJfQklEU19NVVNUX0FMV0FZU19JTkNSRUFTRSkKICAgIHVuY292ZXIgMgogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDE1IC8vICJFUlI6QklOQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCSU5DCgpuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICsgMzAwLCBFUlJfRU5EX01VU1RfQkVfQVRMRUFTVF9GSVZFX01JTlVURVNfQUZURVJfU1RBUlQpCiAgICBzd2FwCiAgICBwdXNoaW50IDMwMAogICAgKwogICAgPgogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDE2IC8vICJFUlI6RU1GTSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFTUZNCgpuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDkgLy8gIkVSUjpDTlNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkNOU1QKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE2CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gaXNBbGdvQmlkID8gMCA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZGlnIDEKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fdGVybmFyeV9mYWxzZUAxNwogICAgaW50Y18wIC8vIDAKCm5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X21lcmdlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyNwogICAgLy8gaWYgKGlzQWxnb0JpZCkgewogICAgZGlnIDIKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fZWxzZV9ib2R5QDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNwogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2NzAwMAogICAgc3dhcAoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjMzCiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArICh3ZWlnaHRzTGlzdENvdW50ICogY29zdHMud2VpZ2h0cykgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICArCiAgICBkaWcgNAogICAgaW50YyA2IC8vIDEzMTEzMzAwCiAgICAqCiAgICBkdXAKICAgIGJ1cnkgMTcKICAgICsKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM1LTIzNwogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNyAvLyAxNjEyNTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM1LTIzOAogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjMKICAgIGJ5dGVjIDcgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRvdGFsTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDIKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDEKICAgID09CiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNDUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFzc2V0KDApLCAnJywgW10pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQ1CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBBc3NldCgwKSwgJycsIFtdKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGJ5dGVjIDIyIC8vIDB4MDAwMAogICAgY2FsbHN1YiByb3lhbHRpZXMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNDgKICAgIC8vIGNvbnN0IGFwcHJvdmFsU2l6ZSA9IHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0OQogICAgLy8gY29uc3QgY2h1bmsxID0gdGhpcy5ib3hlZENvbnRyYWN0LmV4dHJhY3QoMCwgNDA5NikKICAgIGludGNfMCAvLyAwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTAKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBzd2FwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTAKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBpbnRjIDUgLy8gNDA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI1Mi0yNzQKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTUKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBkaWcgMTkKICAgIGR1cAogICAgY292ZXIgNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2MwogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgdW5jb3ZlciA3CiAgICBndHhucyBTZW5kZXIKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjY0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2NQogICAgLy8gY3JlYXRvclJveWFsdHksCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjgKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA2IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2OAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2OQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjkKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjkKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgMTcgLy8gMHgwMDBhCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyMAogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBwdXNoaW50IDEwCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyNQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjUyLTI3NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjczCiAgICAvLyBleHRyYVByb2dyYW1QYWdlczogMwogICAgcHVzaGludCAzCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjIwCiAgICAvLyBjb25zdCBhdWN0aW9uID0gY29tcGlsZUFyYzQoQXVjdGlvbikKICAgIGJ5dGVjIDE4IC8vIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTItMjc0CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBieXRlYyAxOSAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZywodWludDY0LChzdHJpbmcsdWludDY0KSkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjU2CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjUyLTI3NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTItMjc2CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICAvLyAgIC5pdHhuCiAgICAvLyAgIC5jcmVhdGVkQXBwCiAgICBnaXR4biAwIENyZWF0ZWRBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzgtMjgxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFthdWN0aW9uQXBwLmFkZHJlc3NdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI4MAogICAgLy8gYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzgtMjgxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFthdWN0aW9uQXBwLmFkZHJlc3NdCiAgICAvLyB9KQogICAgYnl0ZWMgMjEgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI4NgogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyODcKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDMKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTEKICAgIC8vIGlmICghaXNBbGdvQmlkKSB7CiAgICBzd2FwCiAgICBieiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5My0zMDIKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjk3CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjk4CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5Ni0yOTkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTMtMzAyCiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBiaWRBc3NldElELAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTEgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMwNgogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGRpZyA5CiAgICBieiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAzNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMwOC0zMTcKICAgIC8vIGF1Y3Rpb24uY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAuaWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMxMgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMTEtMzE0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMDgtMzE3CiAgICAvLyBhdWN0aW9uLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLmlkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDIwIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTkyLTIwNAogICAgLy8gbmV3UHJpemVCb3hBdWN0aW9uKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1ByaXplQm94QXVjdGlvbl9lbHNlX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjMwCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzMAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNwogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgMTAgLy8gMjY4MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjMwCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgKwogICAgc3dhcAogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAyMQoKbmV3UHJpemVCb3hBdWN0aW9uX3Rlcm5hcnlfZmFsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE2CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gaXNBbGdvQmlkID8gMCA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X21lcmdlQDE4CgpuZXdQcml6ZUJveEF1Y3Rpb25fYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgbmV3UHJpemVCb3hBdWN0aW9uX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkuZGVsZXRlQXVjdGlvbkFwcFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUF1Y3Rpb25BcHA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzIzCiAgICAvLyBkZWxldGVBdWN0aW9uQXBwKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzI0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQU5fQVVDVElPTikKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZUF1Y3Rpb25BcHBfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIzIC8vICJFUlI6TkFVQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQVVDCgpkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyNQogICAgLy8gY29uc3Qgc2VsbGVyID0gQWNjb3VudChvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyKSlbMF0pCiAgICBkdXAKICAgIGJ5dGVjIDI0IC8vICJzZWxsZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzI2CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VsbGVyID09PSBUeG4uc2VuZGVyLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogZGVsZXRlQXVjdGlvbkFwcF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUEJPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QQk8KCmRlbGV0ZUF1Y3Rpb25BcHBfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ3MQogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBkdXAKICAgIGJ5dGVjIDI1IC8vICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzI4CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzMgogICAgLy8gYXVjdGlvbi5jYWxsLmRlbGV0ZUFwcGxpY2F0aW9uKHsgYXBwSWQgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgyNDg3YzMyYyAvLyBtZXRob2QgImRlbGV0ZUFwcGxpY2F0aW9uKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzM0LTMzNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzNC0zMzUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzM0LTMzNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyMwogICAgLy8gZGVsZXRlQXVjdGlvbkFwcChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5LmNhbmNlbEF1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpjYW5jZWxBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzOQogICAgLy8gY2FuY2VsQXVjdGlvbihhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX0FOX0FVQ1RJT04pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjYW5jZWxBdWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyMyAvLyAiRVJSOk5BVUMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkFVQwoKY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDEKICAgIC8vIGNvbnN0IHNlbGxlciA9IEFjY291bnQob3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlcikpWzBdKQogICAgZHVwCiAgICBieXRlYyAyNCAvLyAic2VsbGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlbGxlciA9PT0gVHhuLnNlbmRlciwgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGNhbmNlbEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDEyIC8vICJFUlI6TlBCTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUEJPCgpjYW5jZWxBdWN0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NzEKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZHVwCiAgICBieXRlYyAyNSAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0NAogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDgKICAgIC8vIGF1Y3Rpb24uY2FsbC5jYW5jZWwoeyBhcHBJZCB9KQogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDMxZjI2YTliIC8vIG1ldGhvZCAiY2FuY2VsKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzUwLTM1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1MC0zNTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzUwLTM1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzOQogICAgLy8gY2FuY2VsQXVjdGlvbihhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3QXVjdGlvbkNvc3Q6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzU4CiAgICAvLyBjb25zdCBpc0FsZ29CaWQgPSBiaWRBc3NldElEID09PSAwCiAgICAhCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzU5CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgc3dhcAogICAgYnogbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9mYWxzZUAzCiAgICBzd2FwCiAgICAhCgpuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzU5CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgICoKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2NwogICAgLy8gaWYgKCFpc1ByaXplQm94KSB7CiAgICB1bmNvdmVyIDIKICAgIGJueiBuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2OAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjgKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUFzc2V0SUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY4CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2OQogICAgLy8gaWYgKGlzQWxnb0JpZCkgewogICAgZGlnIDEKICAgIGJueiBuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlANwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNwogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2NzAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3MAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkKICAgICsKCm5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzgwCiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArICh3ZWlnaHRzTGlzdENvdW50ICogY29zdHMud2VpZ2h0cykgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBkaWcgMwogICAgKwogICAgZGlnIDIKICAgIGludGMgNiAvLyAxMzExMzMwMAogICAgKgogICAgKwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4Mi0zODQKICAgIC8vIE1BWF9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBhdWN0aW9uLmdsb2JhbEJ5dGVzKSArCiAgICBpbnRjIDcgLy8gMTYxMjUwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4Mi0zODUKICAgIC8vIE1BWF9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBhdWN0aW9uLmdsb2JhbEJ5dGVzKSArCiAgICAvLyBjaGlsZEFwcE1CUgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzIKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3MgogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA5IC8vIDMzNTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3MgogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICArCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUA5OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc0CiAgICAvLyB9IGVsc2UgaWYgKGlzQWxnb0JpZCkgewogICAgZHVwCiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDExCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTcKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDEwIC8vIDI2ODAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NwogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgICsKICAgIGIgbmV3QXVjdGlvbkNvc3RfYWZ0ZXJfaWZfZWxzZUAxMwoKbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1OQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc1ByaXplQm94ID8gKGlzQWxnb0JpZCA/IDAgOiAxKSA6IChpc0FsZ29CaWQgPyAxIDogMikpCiAgICBwdXNoaW50IDIKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDMKICAgIHNlbGVjdAogICAgYiBuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmluaXRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA2IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDMKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ0CiAgICAvLyBpZiAoIXRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDUgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ2CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuY3JlYXRlKHsgc2l6ZSB9KQogICAgc3dhcAogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlc2l6ZShzaXplKQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgYiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmxvYWRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbG9hZEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTcKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU4CiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgZGlnIDIKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTkKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBkaWcgMgogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTkKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjAKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZGlnIDIKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjEKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgZGlnIDIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ni02MwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBFUlJfSU5WQUxJRF9DQUxMX09SREVSKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6SUNPUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQ09SCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgOSAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY1CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVwbGFjZShvZmZzZXQsIGRhdGEpCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5kZWxldGVCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgpkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcwCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjgKICAgIC8vIGRlbGV0ZUJveGVkQ29udHJhY3QoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NAogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTYKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk2CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDMKICAgICsKICAgICoKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklQTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNQQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDItMjA4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwNQogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDItMjA3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGlmIChjb3VudCA+IDAgJiYgZXNjcm93Lm5hbWUgIT09ICcnKSB7CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgcHVzaGJ5dGVzICIiCiAgICAhPQogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlY18zIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAyNiAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE4CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMQogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjpORVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBkaWcgNgogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjpXRVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldFU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzAKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMxCiAgICAvLyBbXQogICAgYnl0ZWMgMjIgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUtMTM5CiAgICAvLyBjb25zdCBvcHRJbkNvdW50ID0gc3BsaXRPcHRJbkNvdW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0CiAgICAvLyApCiAgICBkaWcgNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQxCiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTAKICAgIC8vIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ5LTE1MgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NgogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OAogICAgLy8gW2Fzc2V0LmlkXSwKICAgIHN3YXAKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMwogICAgLy8gcmV0dXJuIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgICsKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4udXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGNvbmZpZykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDI2IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDE0IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18zIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyALAAEIBriLBIAg1K+gBtS1YtCGA5i5FOCtECYbCWFraXRhX2RhbwJiYwxha2l0YV9lc2Nyb3cGd2FsbGV0BBUffHUIRVJSOk5EQU8WY2hpbGRfY29udHJhY3RfdmVyc2lvbghFUlI6SVBBWQNhYWwIRVJSOkNOU1QIRVJSOklYRlIEPqEYMghFUlI6TlBCTwTFOzLMB3ZlcnNpb24IRVJSOkJJTkMIRVJSOkVNRk0CAAoEC4EBQwSC/6LOBL1xSNAErfkq5AIAAAhFUlI6TkFVQwZzZWxsZXIGZnVuZGVyA3BhbIAE6pGA3TYaAI4BAKsxGRREMRhBAJSCBQTRVI//BHPwAiMEFxTaZQSA9EVBBKXUKzonDYIIBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eAEcxEQcDYaAI4OAZQEegcJB2IHuwhcCK4JMwlMCw4LOQu2ACoAAQCAJBUffHUAAAAAAACIVAAAAAAAyBfUAAAAAAAASEQAAAAAAABJ1LAjQyNDgASBFTYoNhoAjgEBAgAxGYEEEjEYEERCCyiKBAIiSYv/IllAAAqBiCeL/08DTwOJsYv9cQtEi/4VFlcGAov+UIv9FgEBIxaL/CcIZUiBSFuyGIAEDPG5z7IaTwOyGk8CshpMshqL/7IashqACQAHcm95YWx0ebIaJbIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWYECCEwVEkRXBgBJjAAVQQAFiwAXjAGLASEIDUEACSEIi/9PA08DiYsBi/9PA08DiYoCAYv/QQAXi/4nCGVIJFtyCESL/3AARQFAAAMyEIkiiYoDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiTYaAUkiWYECCEsBFRJEVwIANhoCSSJZgQIISwEVEkRXAgA2GgNJFSQSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnDk8EZycGTwNnKE8CZypMZyNDgABHAjEWgQIJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJIlmBAghLARUSRFcCAE4CNhoCSU4DSSJZgSALgQIITBUSRDYaA0lOA0kVJBJEF0w2GgRJTgRJFSQSRBdOAzYaBUlOBBUkEkQ2GgZJTgRJFSQSRBc2GgdJTgVJFSQSRBdMNhoISU4GSRUkEkQXTDYaCUlOBxUkEkQ2GgpJTgcVgSASRDYaC0lOB0kVJBJEF04GQAAEJw+wAEyBrAIIDUAABCcQsAApvUUBQAAEJwmwAEsBSRRMQQALMgpLA3AARQFBAgIjQAAMgAhFUlI6Tk9QVLAAMhCBAiNPA00LRRMiKGVESwE4EUlFFIj+UCEECEsCQAHBIQQIMgFLFAhLBSEGC0lFFAhLAQghBwhLBDgHMgoSQAAEJwewAEsEOAhLARJAAAQnB7AASwI4ADEAEkAABCcKsABLAjgUMgoSQAAEJwqwAE8COBJJQAAEJwqwACIoZURLFElOAksUSxSI/TZITCm9RCkiIQW6TCEFCSkhBU8CurFLAhZPCTgATwcWUDEATwYWIicGZURJFRZXBgJMUCIoZUQiKmVETBYnEVBMUIEKsjWBGbI0IrIZgQOyOCcSskJPB7JATwayQCcTshpLBbIagAEAshpLFLIaSxOyGksRshpLELIaSw+yGksOshpPBLIaTwOyGk8CshpLCrIaSwmyGkyyGrIaJbIQIrIBs7cAPUlOA7FJcghEMgFPBwiyCLIHI7IQIrIBs7FJcghEMhCyCLIHI7IQIrIBtiKyGUmyGCcLshpMsholshAisgGzsXIIREyyEU8CshKyFIEEshAisgGzTEEAJ7FHAnIIRDIQsgiyByOyECKyAbYishmyGCcLshpLC7IaJbIQIrIBs0sJQQAnsUcCcghESxCyCLIHI7IQIrIBtiKyGbIYJxSyGksCsholshAisgGzFicETFCwI0MiKGVESwOI/H4hCQgIQv4yIkL9+4AASTEWgQIJRwI4ECUSRDEWIwlJTgI4ECMSRDYaAUlOBEkVJBJEF04CNhoCSU4FSRUkEkQXTgQ2GgNJTgUVJBJENhoESU4FSRUkEkQXTDYaBUlOBkkVJBJEF0w2GgZJTgdJFSQSRBdMNhoHSU4IFSQSRDYaCElOCBWBIBJENhoJSU4ISRUkEkQXTgc5GgAnFRJBAfdLBTgZQAHwI0AADIAIRVJSOkJNUFSwACIoZURPBjgYSUUUSXIHRE8CJwhlSIEYW3IIRBJEgAVvd25lcmVIMgoSQAAEJwywAE8CQAAEJw+wAEyBrAIIDUAABCcQsAApvUUBQAAEJwmwAEsBQAGFIksCQAFvIQRMMgEISwQhBgtJRREISwEIIQcISwI4BzIKEkAABCcHsABLAjgISwESQAAEJwewACIoZUQigAAnFoj6iEgpvUQpIiEFukwhBQkpIQVPArqxSxNJTgQWTwc4AE8GFlAxAE8FFiInBmVESRUWVwYCTFAiKGVEIiplREwWJxFQTFCBCrI1gRmyNCKyGYEDsjgnErJCTweyQE8GskAnE7IaTwWyGoABgLIaSxKyGksRshpLD7IaSw6yGksNshpLDLIaTwSyGk8DshpPArIaSwiyGksHshpMshqyGiWyECKyAbO3AD1JTgKxSXIIRE8CshgnFbIasholshAisgGzsXIIRDIBTwMIsgiyByOyECKyAbNMQQAnsUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJwuyGksLsholshAisgGzSwlBACexRwJyCERLDrIIsgcjshAisgG2IrIZshgnFLIaSwKyGiWyECKyAbMWJwRMULAjQyIoZURLA4j59CEKCExC/oQyEEL+dyJC/g02GgFJFSQSRBdJcgdEMgoSQAAEJxewAEknGGVIMQASQAAEJwywAEknGWVISVcAIEyBIFuxgQWyGU8CshiABCSHwyyyGiWyECKyAbOxsgiyByOyECKyAbMjQzYaAUkVJBJEF0lyB0QyChJAAAQnF7AASScYZUgxABJAAAQnDLAASScZZUhJVwAgTIEgW7GBBbIZTwKyGIAEMfJqm7IaJbIQIrIBs7GyCLIHI7IQIrIBsyNDgAA2GgFJFSMSRCJTSTYaAkkVJBJEF0lOAjYaA0kVJBJEF04DNhoESRUkEkQXTgUUTDIQTEEAYUwUC0UFTwJAAD0iKGVETwKI+OghBAhLAUAAHEUBIQQIMgFLAwhLAiEGCwgIIQcIFicETFCwI0MiKGVETwKI+LshCQgIQv/ZRQFJQAAGSCEEQv/NIihlREyI+KAhCghC/7+BAiNPA01C/5g2GgFJIlmBAghLARUSRFcCADYaAkkVJBJEF0wnBkxnKb1FAUAAEjEAMgkSQAAEJwWwAClMuUgjQzEAIihlRCtlSHIIRBJAAAQnBbAAKUzTQv/kNhoBSRUkEkQXSTYaAkkiWYECCEsBFRJEVwIATIHwDwoxFkwJIwlJTgM4ECUSQQBRSwI4GDIIEkEAR0sCOBuBAxJBAD1LAjgZQAA2SwI5GgAnDRJBACtLAjgAMQASQQAhI0AADIAIRVJSOklDT1KwACm9RQFAAAQnCbAAKU4CuyNDIkL/3DEAIihlRCtlSHIIRBJAAAQnBbAAKbxII0MxFiMJRwI4ECMSRDYaAUkVJBJEF0lOAyIqZUxJTgJOBUQiKGVETIECW3IIRE8CiPeRTDgHMgoSQAAMgAhFUlI6SVBNUrAATDgIMhAjSwMICxJAAAyACEVSUjpJUE1BsACxMgpLA7IRIrISshSBBLIQIrIBs0EBSUcCIllLARVSVwIAgAATQQE4IihlREkrZUhMSScaZUhJVwgITgIkW04DIiplTElOAkUHREkiWUsBFVJJTgJXAgBMK2VITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IasholshAisgGztD5JVwQASwFXAAQnBBJESSJZgSkLgQIITBUSRFcGKSJbSUAADIAIRVJSOk5FU0OwAEsGgQJbSU8CEkAADIAIRVJSOldFU0OwALFPBEmyGIAEWt8zj7IaTwSyGk8CshpPArIagAoAAQAAAAAAAAAAshonFrIaJbIQIrIBIihlRE8CSU4CcghESwZJTgSI9k4yEAu2THIIRLIHsggjshAisgG2SwEWTBaAAgABTFBPA7IYgARoNeO8shpMshqAAYCyGrIaJbIQIrIBtrIYgARsw/YGsholshAisgGzI0M2GgFJFSQSRBciKGVEIiplRIECW3IIRE8CiPXkMhAjTwIICxYnBExQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCtlSHIIRBJAAAQnBbAAKkxnI0M2GgFJIlmBAghLARUSRFcCADEAIihlRCtlSHIIRBJAAAQnBbAAIihlRCcaZUiBEFsyDRJAAAyACEVSUjpJVVBHsAAnDkxnI0M2GgFJFSQSRBcxACIoZUQrZUhyCEQSQAAEJwWwAChMZyND", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var AuctionFactorySDK = class extends _chunkKLHVDYDWjs.BaseSDK {
  constructor(params) {
    super({ factory: AuctionFactoryFactory, ...params }, _chunkHFHM5QOFjs.ENV_VAR_NAMES.AUCTION_FACTORY_APP_ID);
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
      const prizeBoxSDK = new (0, _chunkEBWCKG2Cjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
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
    } else {
      const { prizeAsset: prizeAsset2, prizeAmount } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset2),
        receiver: this.client.appAddress
      });
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
var AuctionSDK = class extends _chunkKLHVDYDWjs.BaseSDK {
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
        await this.client.send.gatedBidAsa({
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
      if (gateTxn) {
        await this.client.send.gatedBid({
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







exports.AuctionFactorySDK = AuctionFactorySDK; exports.newAuction = newAuction; exports.AUCTION_ERROR_MESSAGES = AUCTION_ERROR_MESSAGES; exports.translateAuctionError = translateAuctionError; exports.AuctionSDK = AuctionSDK;
//# sourceMappingURL=chunk-PHD3N7R3.js.map
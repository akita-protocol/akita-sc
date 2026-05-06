"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkEY3JLM56js = require('./chunk-EY3JLM56.js');


var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkOPF2XL3Kjs = require('./chunk-OPF2XL3K.js');


var _chunkVMMDQU5Ujs = require('./chunk-VMMDQU5U.js');

// src/raffle/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/RaffleClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Raffle", "structs": { "EntryData": [{ "name": "account", "type": "address" }, { "name": "marketplace", "type": "address" }], "FindWinnerCursors": [{ "name": "index", "type": "uint64" }, { "name": "amountIndex", "type": "uint64" }], "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "RaffleState": [{ "name": "ticketAsset", "type": "uint64" }, { "name": "startTimestamp", "type": "uint64" }, { "name": "endTimestamp", "type": "uint64" }, { "name": "seller", "type": "address" }, { "name": "minTickets", "type": "uint64" }, { "name": "maxTickets", "type": "uint64" }, { "name": "entryCount", "type": "uint64" }, { "name": "ticketCount", "type": "uint64" }, { "name": "winningTicket", "type": "uint64" }, { "name": "winner", "type": "address" }, { "name": "prize", "type": "uint64" }, { "name": "prizeClaimed", "type": "bool" }, { "name": "gateId", "type": "uint64" }, { "name": "vrfFailureCount", "type": "uint64" }, { "name": "entryId", "type": "uint64" }, { "name": "refundMbrCursor", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "enter", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnterAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "enterAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAdd", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "add", "args": [{ "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAddAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addAsa", "args": [{ "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getState", "args": [], "returns": { "type": "(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)", "struct": "RaffleState" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 21, "bytes": 9 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "ticketAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2Fzc2V0", "desc": "The asset required to enter the raffle" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "The start round of the raffle as a unix timestamp" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "The end time of the raffle as a unix timestamp" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "minTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluX3RpY2tldHM=", "desc": "The minimum number of tickets to use for the raffle" }, "maxTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWF4X3RpY2tldHM=", "desc": "The maximum number of tickets users can enter the raffle with" }, "entryCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfY291bnQ=", "desc": "The number of entries for the raffle" }, "ticketCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2NvdW50", "desc": "The number of tickets entered into the raffle" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "the winning ticket" }, "winner": { "keyType": "AVMString", "valueType": "address", "key": "d2lubmVy", "desc": "the winning address of the raffle" }, "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the prize for the raffle if prizeBox is true prize represents the app id of the prize box, otherwise the asset being raffled" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "Indicator for whether the prize has been claimed" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate to use for the raffle" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "the address of the creation side marketplace" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfcm95YWx0eQ==", "desc": "the minimum impact tax for the raffle" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "entryID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfaWQ=", "desc": "The id's of the raffle entries" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "the transaction id of the create application call for salting our VRF call" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called, used for VRF" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "entries": { "keyType": "uint64", "valueType": "EntryData", "desc": "The entries for the raffle", "prefix": "ZQ==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "entriesByAddress": { "keyType": "address", "valueType": "uint64", "desc": "The address map of entries for the raffle", "prefix": "YQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2413, 3791, 4149, 4157, 6234, 6426], "errorMessage": "Box must have value" }, { "pc": [1210, 1368, 1493, 2055, 3114, 4838], "errorMessage": "Bytes has valid prefix" }, { "pc": [5758, 5972], "errorMessage": "ERR:AENT" }, { "pc": [2353], "errorMessage": "ERR:ARFC" }, { "pc": [5743, 5957, 6212, 6404], "errorMessage": "ERR:BMGN" }, { "pc": [6227, 6419], "errorMessage": "ERR:EDNE" }, { "pc": [2678, 2777, 2868, 2934], "errorMessage": "ERR:FGTE" }, { "pc": [5632], "errorMessage": "ERR:FORB" }, { "pc": [1874], "errorMessage": "ERR:IAST" }, { "pc": [1916], "errorMessage": "ERR:IENR" }, { "pc": [2237, 2251, 5772, 5813, 5986, 6e3, 6277, 6301], "errorMessage": "ERR:IPAY" }, { "pc": [5676], "errorMessage": "ERR:IPMA" }, { "pc": [5654], "errorMessage": "ERR:IPMR" }, { "pc": [3305, 3320], "errorMessage": "ERR:IRBD" }, { "pc": [3202], "errorMessage": "ERR:IRSD" }, { "pc": [5543], "errorMessage": "ERR:IUPG" }, { "pc": [6014, 6030, 6065, 6469, 6485, 6509], "errorMessage": "ERR:IXFR" }, { "pc": [2198], "errorMessage": "ERR:MALF" }, { "pc": [2217], "errorMessage": "ERR:MAMF" }, { "pc": [1839, 2180, 2563], "errorMessage": "ERR:MBFF" }, { "pc": [5469, 5514, 5587], "errorMessage": "ERR:NDAO" }, { "pc": [4874], "errorMessage": "ERR:NESC" }, { "pc": [3049], "errorMessage": "ERR:NETM" }, { "pc": [5711, 5925, 6180, 6372], "errorMessage": "ERR:NLIV" }, { "pc": [3567], "errorMessage": "ERR:NWTY" }, { "pc": [3907], "errorMessage": "ERR:PACL" }, { "pc": [2313, 2474, 2575], "errorMessage": "ERR:PNCL" }, { "pc": [2600], "errorMessage": "ERR:RFNC" }, { "pc": [2976, 3547], "errorMessage": "ERR:RHNE" }, { "pc": [2620], "errorMessage": "ERR:SHWB" }, { "pc": [5936, 6383], "errorMessage": "ERR:TAAL" }, { "pc": [5722, 6191], "errorMessage": "ERR:TANA" }, { "pc": [2996], "errorMessage": "ERR:WADR" }, { "pc": [3590], "errorMessage": "ERR:WAFD" }, { "pc": [4900], "errorMessage": "ERR:WESC" }, { "pc": [2328, 3887], "errorMessage": "ERR:WNFD" }, { "pc": [1572, 3983, 4032, 4073], "errorMessage": "IPCT" }, { "pc": [1107], "errorMessage": "NCCA" }, { "pc": [1145, 1233, 1254, 1267, 1278, 1395, 4233, 4407, 4430, 4961, 5010, 5089, 5461, 5506, 5579], "errorMessage": "application exists" }, { "pc": [1859, 4188, 4330, 4350, 5125], "errorMessage": "asset exists" }, { "pc": [1980, 2004, 2009, 2306, 2318, 2332, 2337, 2364, 2368, 2452, 2467, 2482, 2493, 2520, 2568, 2579, 2584, 2605, 2661, 2668, 2760, 2767, 2851, 2858, 2917, 2924, 2968, 2981, 3001, 3017, 3022, 3058, 3070, 3142, 3276, 3539, 3552, 3572, 3595, 3612, 3623, 3633, 3668, 3764, 3773, 3816, 3877, 3892, 3912, 3921, 3926, 3954, 3959, 3970, 3978, 4e3, 4019, 4027, 4060, 4068, 4090, 4143, 4166, 4185, 4213, 4227, 4250, 4291, 4327, 4334, 4347, 4354, 4383, 4387, 4401, 4411, 4424, 4434, 4454, 4458, 4471, 4480, 4497, 4517, 4537, 4541, 4554, 4563, 4583, 4587, 4592, 4631, 4635, 4674, 4678, 4683, 4725, 4729, 4762, 4956, 5113, 5117, 5122, 5163, 5176, 5190, 5195, 5213, 5218, 5223, 5275, 5280, 5285, 5290, 5295, 5300, 5304, 5309, 5314, 5319, 5324, 5329, 5334, 5339, 5344, 5349, 5454, 5499, 5518, 5572, 5715, 5727, 5784, 5796, 5817, 5873, 5891, 5901, 5929, 5941, 6022, 6042, 6051, 6069, 6124, 6142, 6152, 6184, 6196, 6289, 6328, 6348, 6376, 6388, 6477, 6497, 6536, 6556, 6569, 6580], "errorMessage": "check GlobalState exists" }, { "pc": [5883, 6134, 6339, 6547], "errorMessage": "index access is out of bounds" }, { "pc": [3750, 5868, 6119, 6261, 6311, 6323, 6453, 6519, 6531], "errorMessage": "index out of bounds" }, { "pc": [1121, 1496, 1825, 3117, 4841, 4995, 5443, 5482], "errorMessage": "invalid array length header" }, { "pc": [1701], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [5490], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [4851], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1739, 1793, 2657, 2703, 2756, 2818], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1692, 1711, 1720, 1729, 1756, 1765, 1774, 1783, 1801, 2167, 2300, 3531, 5565, 5611], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1503, 3124], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1830, 5448], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1748], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1215, 1373, 2060], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1817, 5435], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1812, 5430], "errorMessage": "invalid tuple encoding" }, { "pc": [2634, 2720, 2835, 2901], "errorMessage": "transaction type is appl" }, { "pc": [2745, 2809, 2913, 2950], "errorMessage": "transaction type is axfer" }, { "pc": [2159, 2646, 2694, 2733, 2799, 2847, 2884, 5603], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCA0MDk2IDEwMDAwMCAxODQ0Njc0NDA3MzcwOTU1MTYxNSA1MDYwMCA2MzY0MTM2MjIzODQ2NzkzMDA1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSA0Mjk0OTY3Mjk1IDEzMTEzMzAwCiAgICBieXRlY2Jsb2NrICJ0aWNrZXRfYXNzZXQiICJha2l0YV9kYW8iICIiICJlbnRyeV9jb3VudCIgInRpY2tldF9jb3VudCIgIndpbm5lciIgInByaXplIiAiZ2F0ZV9pZCIgIndfdG90YWxzIiAiYSIgMHgxNTFmN2M3NSAid2lubmluZ190aWNrZXQiICJ3ZWlnaHRzX2JveF9jb3VudCIgIkVSUjpJUEFZIiAicHJpemVfY2xhaW1lZCIgInJlZnVuZF9tYnJfY3Vyc29yIiAweDAwMDEgInNlbGxlciIgInciICJtYXhfdGlja2V0cyIgImFraXRhX2VzY3JvdyIgIkVSUjpJWEZSIiAidnJmX2ZhaWx1cmVfY291bnQiICJlbmRfdGltZXN0YW1wIiAibWFya2V0cGxhY2UiICJlIiAid2FsbGV0IiAicmFmZmxlX3JvdW5kIiAiY3JlYXRvcl9yb3lhbHR5IiAibWluX3RpY2tldHMiICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiICJmaW5kX3dpbm5lcl9jdXJzb3JzIiAiRVJSOkZHVEUiICJFUlI6TkxJViIgIkVSUjpCTUdOIiAiRVJSOk1CRkYiICJpc19wcml6ZV9ib3giICJzdGFydF90aW1lc3RhbXAiICJha2l0YV9yb3lhbHR5IiAiRVJSOlBOQ0wiICJFUlI6TkRBTyIgImVudHJ5X2lkIiAweDVjNTdmNmQ4IDB4MzhlNjI0MzMgMHhkYzUwYjM1NCAweDYzYmJiNzM1IDB4MDY4MTAxICJhYWwiICJvYWwiICJzYWx0IiAiRVJSOldORkQiICJFUlI6UkhORSIgMHgwMDAwICJFUlI6SVJCRCIgInBhbCIgIkVSUjpUQU5BIiAiRVJSOkFFTlQiICJFUlI6VEFBTCIgIkVSUjpFRE5FIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18zIC8vICJlbnRyeV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjIDQgLy8gInRpY2tldF9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMSAvLyAid2lubmluZ190aWNrZXQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTQgLy8gInByaXplX2NsYWltZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIyIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUlEIH0pCiAgICBieXRlYyA0MSAvLyAiZW50cnlfaWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTUgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMjcgLy8gInJhZmZsZV9yb3VuZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTgtMTAzCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQmFzZVJhZmZsZSwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDI0ODdjMzJjIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIsIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0IG1haW5fdXBkYXRlX3JvdXRlQDUKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4LTEwMwogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMzAKICAgIHB1c2hieXRlc3MgMHhiZDcxNDhkMCAweGYyY2UyZjQ2IDB4MmM5NDI1MTQgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVmdW5kTUJSKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGVhcldlaWdodHNCb3hlcygpdWludDY0IgogICAgYnl0ZWMgNDIgLy8gbWV0aG9kICJnYXRlZEVudGVyKGFwcGwscGF5LGFkZHJlc3Mpdm9pZCIKICAgIHB1c2hieXRlcyAweDk2MjcxMmYxIC8vIG1ldGhvZCAiZW50ZXIocGF5LGFkZHJlc3Mpdm9pZCIKICAgIGJ5dGVjIDQzIC8vIG1ldGhvZCAiZ2F0ZWRFbnRlckFzYShhcHBsLHBheSxheGZlcixhZGRyZXNzKXZvaWQiCiAgICBwdXNoYnl0ZXMgMHg0M2E1M2U0ZSAvLyBtZXRob2QgImVudGVyQXNhKHBheSxheGZlcixhZGRyZXNzKXZvaWQiCiAgICBieXRlYyA0NCAvLyBtZXRob2QgImdhdGVkQWRkKGFwcGwscGF5KXZvaWQiCiAgICBwdXNoYnl0ZXMgMHg2YTZkOWI5ZiAvLyBtZXRob2QgImFkZChwYXkpdm9pZCIKICAgIGJ5dGVjIDQ1IC8vIG1ldGhvZCAiZ2F0ZWRBZGRBc2EoYXBwbCxheGZlcil2b2lkIgogICAgcHVzaGJ5dGVzcyAweGViMTY4MWI0IDB4Njk2NTAxZGUgMHhiZDFiMjdkMSAweDY1ZmNhOThiIDB4OGZhNGExNjAgMHg5ZTU3MjZmMSAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweGQ5YTM1ZmE0IDB4M2VhMTE4MzIgLy8gbWV0aG9kICJhZGRBc2EoYXhmZXIpdm9pZCIsIG1ldGhvZCAicmFmZmxlKCl2b2lkIiwgbWV0aG9kICJmaW5kV2lubmVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGFpbVJhZmZsZVByaXplKCl2b2lkIiwgbWV0aG9kICJpc0xpdmUoKWJvb2wiLCBtZXRob2QgImdldFN0YXRlKCkodWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGluaXQgcmVmdW5kTUJSIGNsZWFyV2VpZ2h0c0JveGVzIGdhdGVkRW50ZXIgZW50ZXIgZ2F0ZWRFbnRlckFzYSBlbnRlckFzYSBnYXRlZEFkZCBhZGQgZ2F0ZWRBZGRBc2EgYWRkQXNhIHJhZmZsZSBmaW5kV2lubmVyIGNsYWltUmFmZmxlUHJpemUgaXNMaXZlIGdldFN0YXRlIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAyNiBtYWluX21icl9yb3V0ZUAyNyBvcHRpbgogICAgZXJyCgptYWluX21icl9yb3V0ZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvYmFzZS50czo2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwN2JkNDAwMDAwMDAwMDBjODE3ZDQwMDAwMDAwMDAwMDA0OWQ0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4LTEwMwogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweDNhMjMyNzE1IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIGludGNfMyAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgZGVsZXRlQXBwbGljYXRpb24KCgovLyBfcHV5YV9saWIudXRpbC5lbnN1cmVfYnVkZ2V0KHJlcXVpcmVkX2J1ZGdldDogdWludDY0LCBmZWVfc291cmNlOiB1aW50NjQpIC0+IHZvaWQ6CmVuc3VyZV9idWRnZXQ6CiAgICBwcm90byAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxMAogICAgKwoKZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMToKICAgIGZyYW1lX2RpZyAwCiAgICBnbG9iYWwgT3Bjb2RlQnVkZ2V0CiAgICA+CiAgICBieiBlbnN1cmVfYnVkZ2V0X2FmdGVyX3doaWxlQDYKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBieXRlYyA0NiAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW0KICAgIGJ5dGVjIDQ2IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3aXRjaCBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzBAMyBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzFANAoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICBpdHhuX3N1Ym1pdAogICAgYiBlbnN1cmVfYnVkZ2V0X3doaWxlX3RvcEAxCgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzFANDoKICAgIGdsb2JhbCBNaW5UeG5GZWUKICAgIGl0eG5fZmllbGQgRmVlCiAgICBiIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1CgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzBAMzoKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgYiBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANQoKZW5zdXJlX2J1ZGdldF9hZnRlcl93aGlsZUA2OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo6X19wY2czMk91dHB1dChzdGF0ZTogdWludDY0KSAtPiB1aW50NjQ6Cl9fcGNnMzJPdXRwdXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gX19wY2czMk91dHB1dChzdGF0ZTogUENHMzJTVEFURSk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzAKICAgIC8vIGNvbnN0IHhvcnNoaWZ0ZWQgPSBfX21hc2tUb1VpbnQzMihvcC5zaHIob3Auc2hyKHN0YXRlLCAxOCkgXiBzdGF0ZSwgMjcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDE4CiAgICBzaHIKICAgIGZyYW1lX2RpZyAtMQogICAgXgogICAgcHVzaGludCAyNwogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE5CiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDExIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzEKICAgIC8vIGNvbnN0IHJvdCA9IG9wLnNocihzdGF0ZSwgNTkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgNTkKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgZHVwMgogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyh+dmFsdWUsIDEpCiAgICBzd2FwCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICBwdXNoaW50IDMxCiAgICAmCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIHNobAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOQogICAgLy8gcmV0dXJuIHZhbHVlICYgKG9wLnNobCgxLCAzMikgLSAxKQogICAgaW50YyAxMSAvLyA0Mjk0OTY3Mjk1CiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICB8CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnYXRlQ2hlY2soZ2F0ZVR4bjogdWludDY0LCBha2l0YURBTzogdWludDY0LCBjYWxsZXI6IGJ5dGVzLCBpZDogdWludDY0KSAtPiB1aW50NjQ6CmdhdGVDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGNhbGxlcjogQWNjb3VudCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDQ3IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM0CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzUKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBpbnRjXzMgLy8gNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMSAvLyAxCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzOAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC00CiAgICBwdXNoaW50IDIKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMi0yMzkKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCmdhdGVDaGVja19ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzItMjM5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Y3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogYnl0ZXMsIHN1bTogdWludDY0LCBjbG9zZU91dDogdWludDY0KSAtPiBieXRlcywgYnl0ZXM6CmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiBib29sZWFuKTogeyBpZDogdWludDY0LCBjb3N0OiB1aW50NjQgfSB7CiAgICBwcm90byA3IDIKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOQogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgRVJSX0NBTk5PVF9DTE9TRV9PVVRfT0ZfQUxHT19GT1JCSURERU4pCiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE5CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGFzc2VydCAvLyBOQ0NBCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTcKICAgIGJ5dGVjIDQ3IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIzCiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGZyYW1lX2RpZyAtMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNDE3MDAKICAgICsKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjQKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC02CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI5CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTMwCiAgICAvLyBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjgtNTMxCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMgogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI1LTUzNgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg3YjdkYzVmYyAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NwogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzgKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZnJhbWVfZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtNgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfYnVyeSAyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1MwogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUyCiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OAogICAgLy8gaWYgKGNsb3NlT3V0KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTkKICAgIC8vIHRyYW5zZmVyVHhuLnNldCh7IGFzc2V0Q2xvc2VUbzogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcyB9KQogICAgZnJhbWVfZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDQKICAgIGZyYW1lX2J1cnkgNQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY2CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY1LTU2OAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjkKICAgIC8vIHRyYW5zZmVyVHhuLAogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgNAogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3CiAgICBmcmFtZV9kaWcgNQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNzoKICAgIGZyYW1lX2RpZyAtNgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTItNTU2CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2Mi01NzQKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MAogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgZnJhbWVfZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGFmMWExNGYyIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAyCiAgICBmcmFtZV9idXJ5IDEKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDIwCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2lmX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM5CiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZnJhbWVfZGlnIDEKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ0CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ1CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDMtNTQ2CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAtNTQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ3CiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDM5NGVhZWIyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSAtPiBieXRlczoKc2VuZFJlZmVycmFsUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KTogUmVmZXJyYWxQYXltZW50SW5mbyB7CiAgICBwcm90byAzIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTIKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA0OCAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTEKICAgIGZyYW1lX2RpZyA1CiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAzCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgMwogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNwogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2J1cnkgMQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5NgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDEKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBjb25zdCBbd2FsbGV0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldEZlZXMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAxCiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMgogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAyCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA4CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDkKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgZHVwCiAgICBwdXNoaW50IDYwNDgwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTAKICAgIC8vIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTYgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA1LTYxMwogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGRpZyA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxMgogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwNS02MTMKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBleHRyYWN0IDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTUKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxOAogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IGFtb3VudCwgcmVmZXJyYWxNYnI6IDAgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgZnJhbWVfZGlnIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc1CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckAxOAoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTUKICAgIC8vIHJldHVybiBidG9pKGRhdGEpCiAgICBmcmFtZV9kaWcgNAogICAgYnRvaQogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MgogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGdldFdhbGxldElEKGVzY3Jvd0ZhY3RvcnksIGFkZHJlc3MpKQogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAMTMKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9tYnIudHM6OkZ1bmRlckluZm8KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNAogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNSAvLyAiRVJSOk1CRkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJGRgoKY3JlYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA2IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTEKICAgIC8vIHRoaXMucHJpemUudmFsdWUgPSBwcml6ZQogICAgZGlnIDE0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDM2IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyB0aGlzLmlzUHJpemVCb3gudmFsdWUgPSBpc1ByaXplQm94CiAgICBkaWcgMTMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyBpZiAodGlja2V0QXNzZXQgIT09IDApIHsKICAgIGRpZyAxMQogICAgYnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEFzc2V0KHRpY2tldEFzc2V0KS50b3RhbCA+IDAsIEVSUl9JTlZBTElEX0FTU0VUKQogICAgZGlnIDExCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0VG90YWwKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGJueiBjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3CiAgICBwdXNoYnl0ZXMgIkVSUjpJQVNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBU1QKCmNyZWF0ZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1NwogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZSA9IEFzc2V0KHRpY2tldEFzc2V0KQogICAgZGlnIDEyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNyAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1OAogICAgLy8gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSA9IHN0YXJ0VGltZXN0YW1wCiAgICBkaWcgMTEKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTkKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCAmJiBlbmRUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfSU5WQUxJRF9FTkRJTkdfUk9VTkQpCiAgICBkaWcgMTAKICAgIDwKICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDEwCiAgICBkaWcgOQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpjcmVhdGVfYm9vbF9tZXJnZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTkKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCAmJiBlbmRUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBFUlJfSU5WQUxJRF9FTkRJTkdfUk9VTkQpCiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6SUVOUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRU5SCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDIzIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgPSBlbmRUaW1lc3RhbXAKICAgIGRpZyAxMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICBkaWcgOQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIHRoaXMuZnVuZGVyLnZhbHVlID0gY2xvbmUoZnVuZGVyKQogICAgZGlnIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDI4IC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjYzCiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIGRpZyA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gbWluVGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluVGlja2V0cyB9KQogICAgYnl0ZWMgMjkgLy8gIm1pbl90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gdGhpcy5taW5UaWNrZXRzLnZhbHVlID0gbWluVGlja2V0cwogICAgZGlnIDYKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTE4CiAgICAvLyBtYXhUaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXhUaWNrZXRzIH0pCiAgICBieXRlYyAxOSAvLyAibWF4X3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY1CiAgICAvLyB0aGlzLm1heFRpY2tldHMudmFsdWUgPSBtYXhUaWNrZXRzCiAgICBkaWcgNQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NgogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyA3IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NwogICAgLy8gdGhpcy5nYXRlSUQudmFsdWUgPSBnYXRlSUQKICAgIGRpZyA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjQgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2OAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSA9IG1hcmtldHBsYWNlCiAgICBkaWcgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDIwIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjcwCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBwdXNoYnl0ZXMgIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3NAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGZlZXMucmFmZmxlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGR1cAogICAgcHVzaGludCAxMTIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMwIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjc0CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZmVlcy5yYWZmbGVDb21wb3NhYmxlUGVyY2VudGFnZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzYKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjc2CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDE3IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjc2CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM2LTEzOQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNwogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGJ1cnkgMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlID0gaW1wYWN0UmFuZ2UoaW1wYWN0LCBmZWVzLnJhZmZsZVNhbGVJbXBhY3RUYXhNaW4sIGZlZXMucmFmZmxlU2FsZUltcGFjdFRheE1heCkKICAgIGRpZyAxCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxNwogICAgc3dhcAogICAgcHVzaGludCAxMDQKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGNyZWF0ZV90ZXJuYXJ5X2ZhbHNlQDIwCiAgICBkaWcgMTYKICAgIGludGNfMSAvLyAxCiAgICAtCgpjcmVhdGVfdGVybmFyeV9tZXJnZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMyCiAgICAvLyByZXR1cm4gbWF4IC0gKCgobWF4IC0gbWluKSAqIG1pbkltcGFjdCkgLyBJTVBBQ1RfRElWSVNPUikKICAgIGRpZyAxNgogICAgZHVwCiAgICBkaWcgMTcKICAgIC0KICAgIHVuY292ZXIgMgogICAgKgogICAgcHVzaGludCAxMDAwCiAgICAvCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzggLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSA9IGltcGFjdFJhbmdlKGltcGFjdCwgZmVlcy5yYWZmbGVTYWxlSW1wYWN0VGF4TWluLCBmZWVzLnJhZmZsZVNhbGVJbXBhY3RUYXhNYXgpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3OQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWUgPSBuZXcgYXJjNC5TdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBwdXNoaW50IDEyMAogICAgYnplcm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA4IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzkKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlID0gbmV3IGFyYzQuU3RhdGljQXJyYXk8VWludDY0LCAxNT4oKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIHNhbHQgPSBHbG9iYWxTdGF0ZTxieXRlcz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNDkgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjgwCiAgICAvLyB0aGlzLnNhbHQudmFsdWUgPSBUeG4udHhJZAogICAgdHhuIFR4SUQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyc0N1cnNvciB9KQogICAgYnl0ZWMgMzEgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjgxCiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBpbmRleDogMCwgYW1vdW50SW5kZXg6IDEgfQogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjMyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlX3Rlcm5hcnlfZmFsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgY3JlYXRlX3Rlcm5hcnlfbWVyZ2VAMjEKCmNyZWF0ZV9ib29sX2ZhbHNlQDEwOgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlX2Jvb2xfbWVyZ2VAMTEKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pbml0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdDoKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gaW5pdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHdlaWdodExpc3RMZW5ndGg6IHVpbnQ2NCkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6TUJGRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQkZGCgppbml0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPj0gNCwgRVJSX01VU1RfQUxMT0NBVEVfQVRfTEVBU1RfRk9VUl9ISUdIRVNUX0JJRFNfQ0hVTktTKQogICAgZHVwCiAgICBpbnRjXzMgLy8gNAogICAgPj0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpNQUxGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1BTEYKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg3CiAgICAvLyBsb2dnZWRBc3NlcnQod2VpZ2h0TGlzdExlbmd0aCA8IDE2LCBFUlJfTVVTVF9BTExPQ0FURV9BVF9NT1NUX0ZJRlRFRU5fSElHSEVTVF9CSURTX0NIVU5LUykKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgPAogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOk1BTUYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUFNRgoKaW5pdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIGNvbnN0IHdlaWdodHNNQlI6IHVpbnQ2NCA9ICh3ZWlnaHRMaXN0TGVuZ3RoICogdGhpcy5tYnIoKS53ZWlnaHRzKQogICAgZHVwCiAgICBpbnRjIDEyIC8vIDEzMTEzMzAwCiAgICAqCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHdlaWdodHNNQlIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NgogICAgLy8gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPSB3ZWlnaHRMaXN0TGVuZ3RoCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKCmluaXRfd2hpbGVfdG9wQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHdlaWdodExpc3RMZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDMKICAgIGRpZyAxCiAgICA8CiAgICBieiBpbml0X2FmdGVyX3doaWxlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIGRpZyAzCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIHB1c2hpbnQgMzI3NjgKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHdlaWdodExpc3RMZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgNAogICAgYiBpbml0X3doaWxlX3RvcEAxMgoKaW5pdF9hZnRlcl93aGlsZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yZWZ1bmRNQlJbcm91dGluZ10oKSAtPiB2b2lkOgpyZWZ1bmRNQlI6CiAgICBieXRlY18yIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDIKICAgIC8vIHJlZnVuZE1CUihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM5IC8vICJFUlI6UE5DTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQTkNMCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gd2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmVyIH0pCiAgICBieXRlYyA1IC8vICJ3aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTAgLy8gIkVSUjpXTkZEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldORkQKCnJlZnVuZE1CUl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18zIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE1IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgIT0KICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOkFSRkMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVJGQwoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTUgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDQKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTEKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlIC0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzEyCiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgZGlnIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gY29uc3Qgb3BVcEl0ZXJhdGlvbkFtb3VudDogdWludDY0ID0gaXRlcmF0aW9uQW1vdW50ICogMTAwCiAgICBwdXNoaW50IDEwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gZW5zdXJlQnVkZ2V0KG9wVXBJdGVyYXRpb25BbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnN1cmVfYnVkZ2V0CiAgICBidXJ5IDMKCnJlZnVuZE1CUl93aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGZvciAobGV0IGkgPSBzdGFydGluZ0luZGV4OyBpIDwgc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkdXAyCiAgICArCiAgICBkaWcgMwogICAgPgogICAgYnogcmVmdW5kTUJSX2FmdGVyX3doaWxlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBjb25zdCB7IGFjY291bnQgfSA9IHRoaXMuZW50cmllcyhpKS52YWx1ZQogICAgZGlnIDIKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDI1IC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBjb25zdCB7IGFjY291bnQgfSA9IHRoaXMuZW50cmllcyhpKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyB0aGlzLmVudHJpZXMoaSkuZGVsZXRlKCkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyMwogICAgLy8gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKGFjY291bnQpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjQtMzI5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGVudHJ5VG90YWxNQlIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gY29uc3QgZW50cnlUb3RhbE1CUjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNyAvLyA1MDYwMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjQtMzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGVudHJ5VG90YWxNQlIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI0LTMyOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBlbnRyeVRvdGFsTUJSLAogICAgLy8gICAgIHJlY2VpdmVyOiBhY2NvdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMwogICAgYiByZWZ1bmRNQlJfd2hpbGVfdG9wQDgKCnJlZnVuZE1CUl9hZnRlcl93aGlsZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzIKICAgIC8vIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlICs9IGl0ZXJhdGlvbkFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE1IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzIKICAgIC8vIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlICs9IGl0ZXJhdGlvbkFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxNSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgYnl0ZWNfMiAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzkgLy8gIkVSUjpQTkNMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBOQ0wKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDEKCmNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA+CiAgICBieiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOQogICAgLy8gY29uc3Qgcmk6IHVpbnQ2NCA9ICh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtIDEpIC0gaQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyB0aGlzLndlaWdodHMocmkpLmRlbGV0ZSgpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxOCAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQogICAgYiBjbGVhcldlaWdodHNCb3hlc193aGlsZV90b3BANAoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfd2hpbGVANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgKiB0aGlzLm1icigpLndlaWdodHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQzCiAgICAvLyBjb25zdCByZXR1cm5BbW91bnQ6IHVpbnQ2NCA9IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50YyAxMiAvLyAxMzExMzMwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NS0zNTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQ1LTM0OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDUtMzUwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gY2xlYXJXZWlnaHRzQm94ZXMoKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDEwIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZGVsZXRlQXBwbGljYXRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVBcHBsaWNhdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6TUJGRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQkZGCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTQgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzU5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDM5IC8vICJFUlI6UE5DTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQTkNMCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfUkVGVU5EU19OT1RfQ09NUExFVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18zIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfUkVGVU5EU19OT1RfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE1IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfUkVGVU5EU19OT1RfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6UkZOQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSRk5DCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgRVJSX1NUSUxMX0hBU19XRUlHSFRTX0JPWEVTKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgRVJSX1NUSUxMX0hBU19XRUlHSFRTX0JPWEVTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjpTSFdCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNIV0IKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmdhdGVkRW50ZXJbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NgogICAgLy8gZ2F0ZWRFbnRlcihnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEVudGVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMiAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRFbnRlcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIHRoaXMuZW50ZXIocGF5bWVudCwgbWFya2V0cGxhY2UpCiAgICBkdXAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBnYXRlZEVudGVyKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJbcm91dGluZ10oKSAtPiB2b2lkOgplbnRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNzEtMzc0CiAgICAvLyBlbnRlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXIKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nYXRlZEVudGVyQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRFbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTAKICAgIC8vIGdhdGVkRW50ZXJBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEVudGVyQXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMiAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRFbnRlckFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHRoaXMuZW50ZXJBc2EocGF5bWVudCwgYXNzZXRYZmVyLCBtYXJrZXRwbGFjZSkKICAgIGRpZyAyCiAgICBkaWcgMgogICAgZGlnIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTAKICAgIC8vIGdhdGVkRW50ZXJBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgplbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTUtNDE5CiAgICAvLyBlbnRlckFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmdhdGVkQWRkW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRBZGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU4CiAgICAvLyBnYXRlZEFkZChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTkKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyA3IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGdhdGVkQWRkX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMiAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRBZGRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyB0aGlzLmFkZChwYXltZW50KQogICAgZHVwCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gZ2F0ZWRBZGQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGFkZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGQKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nYXRlZEFkZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQWRkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gZ2F0ZWRBZGRBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEFkZEFzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzIgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkQWRkQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gdGhpcy5hZGRBc2EoYXNzZXRYZmVyKQogICAgZHVwCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gZ2F0ZWRBZGRBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NAogICAgLy8gYWRkQXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJhZmZsZToKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX1JBRkZMRV9IQVNfTk9UX0VOREVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAyMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIEVSUl9SQUZGTEVfSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1MSAvLyAiRVJSOlJITkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UkhORQoKcmFmZmxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgRVJSX1dJTk5FUl9BTFJFQURZX0RSQVdOKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTEgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgRVJSX1dJTk5FUl9BTFJFQURZX0RSQVdOKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJhZmZsZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6V0FEUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXQURSCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI1CiAgICAvLyBpZiAodGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAyNyAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gaWYgKHRoaXMucmFmZmxlUm91bmQudmFsdWUgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyNgogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZCAtIDgKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18yIC8vIDgKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAyNyAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyNgogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZCAtIDgKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyOQogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDI3IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyBjb25zdCByb3VuZFRvVXNlOiB1aW50NjQgPSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgKDQgKiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMjIgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyOQogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDQKICAgICoKICAgICsKICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHJvdW5kVG9Vc2UgKyA4LCBFUlJfTk9UX0VOT1VHSF9USU1FKQogICAgZ2xvYmFsIFJvdW5kCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgKwogICAgPj0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOk5FVE0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVUTQoKcmFmZmxlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMi01MzUKICAgIC8vIGNvbnN0IHNlZWQgPSBhYmlDYWxsPHR5cGVvZiBSYW5kb21uZXNzQmVhY29uLnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICAvLyAgIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgZGlnIDUKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDQ5IC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzMKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMwogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBieXRlYyA0OCAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMwogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMi01MzUKICAgIC8vIGNvbnN0IHNlZWQgPSBhYmlDYWxsPHR5cGVvZiBSYW5kb21uZXNzQmVhY29uLnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICAvLyAgIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDE4OTM5MmM1IC8vIG1ldGhvZCAiZ2V0KHVpbnQ2NCxieXRlW10pYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyAxMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gaWYgKHNlZWQubGVuZ3RoID09PSAwKSB7CiAgICBsZW4KICAgIGR1cAogICAgYnVyeSAzCiAgICBibnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMiAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIyIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIGNvbnN0IHJuZ1N0YXRlID0gcGNnNjRJbml0KHNlZWQuc2xpY2UoMCwgMTYpKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAxMwogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE3CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VlZC5sZW5ndGggPT09IDE2LCBFUlJfSU5WQUxJRF9SQU5ET01fU0VFRCkKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDQyCiAgICBwdXNoYnl0ZXMgIkVSUjpJUlNEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSU0QKCnJhZmZsZV9hZnRlcl9hc3NlcnRANDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBkaWcgMTEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk4CiAgICAvLyBjb25zdCBzdGF0ZSA9IF9fcGNnMzJTdGVwKDAsIGluY3IpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDggLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICB1bmNvdmVyIDIKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDggLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgdW5jb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjEKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICBpbnRjIDEwIC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OQogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDggLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyAxMCAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTktMjIKICAgIC8vIHJldHVybiBbCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICAvLyBdCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDUKICAgIC8vIGxldCB1cHBlckJvdW5kID0gdGhpcy50aWNrZXRDb3VudC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlYyA0IC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMudGlja2V0Q291bnQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gaWYgKHVwcGVyQm91bmQgPCBNQVhfVUlOVDY0KSB7CiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyB1cHBlckJvdW5kID0gdXBwZXJCb3VuZCArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czozMQogICAgLy8gY29uc3QgcmVzdWx0ID0gbmV3IER5bmFtaWNBcnJheTxhcmM0LlVpbnQ2ND4oKQogICAgYnl0ZWMgNTIgLy8gMHgwMDAwCiAgICBidXJ5IDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQzCiAgICAvLyBpZiAodXBwZXJCb3VuZCAhPT0gMCkgewogICAgZHVwCiAgICBieiByYWZmbGVfZWxzZV9ib2R5QDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ0CiAgICAvLyBsb2dnZWRBc3NlcnQodXBwZXJCb3VuZCA+IDEsIEVSUl9JTlZBTElEX1JBTkRPTV9CT1VORFMpCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgNTMgLy8gIkVSUjpJUkJEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSQkQKCnJhZmZsZV9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxLCBFUlJfSU5WQUxJRF9SQU5ET01fQk9VTkRTKQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxLCBFUlJfSU5WQUxJRF9SQU5ET01fQk9VTkRTKQogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDMxCiAgICBieXRlYyA1MyAvLyAiRVJSOklSQkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJCRAoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyh+dmFsdWUsIDEpCiAgICBkaWcgOQogICAgZHVwCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU0CiAgICAvLyBjb25zdCB0aHJlc2hvbGQ6IHVpbnQ2NCA9IF9fdWludDY0VHdvcyhhYnNvbHV0ZUJvdW5kKSAlIGFic29sdXRlQm91bmQKICAgIHN3YXAKICAgICUKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA3CiAgICBkaWcgMTIKICAgIGJ1cnkgMTEKCnJhZmZsZV93aGlsZV90b3BAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIGRpZyA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl93aGlsZUAzNwoKcmFmZmxlX3doaWxlX3RvcEAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGRpZyAxMAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgOCAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMTIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIGJueiByYWZmbGVfdGVybmFyeV9mYWxzZUA0NQogICAgcHVzaGludCAyODg1MzkwMDgxNzc3OTI2ODE4CgpyYWZmbGVfdGVybmFyeV9tZXJnZUA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgZGlnIDUKICAgIGR1cAogICAgaW50YyA4IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTMKICAgIC8vIHJldHVybiBbW25ld1N0YXRlMSwgbmV3U3RhdGUyXSwgb3Auc2hsKF9fcGNnMzJPdXRwdXQoc3RhdGVbMF0pLCAzMikgfCBfX3BjZzMyT3V0cHV0KHN0YXRlWzFdKV0KICAgIGRpZyAxMAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNQogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICBwdXNoaW50IDMyCiAgICBzaGwKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICB8CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTgKICAgIC8vIGNvbnN0IFtuZXdTdGF0ZSwgY2FuZGlkYXRlXSA9IF9fcGNnNjRVbmJvdW5kZWRSYW5kb20oc3RhdGUpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxNgogICAgc3dhcAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MAogICAgLy8gaWYgKGNhbmRpZGF0ZSA+PSB0aHJlc2hvbGQpIHsKICAgIGRpZyA0CiAgICA+PQogICAgYnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgIGRpZyA4CiAgICBkaWcgMTEKICAgICUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgICsKICAgIGl0b2IKICAgIGRpZyAxNQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIGRpZyA3CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA4CiAgICBidXJ5IDExCiAgICBiIHJhZmZsZV93aGlsZV90b3BAMzIKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDM2OgogICAgYnVyeSAxMQogICAgYiByYWZmbGVfd2hpbGVfdG9wQDM0CgpyYWZmbGVfdGVybmFyeV9mYWxzZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTEKICAgIC8vIGNvbnN0IG5ld1N0YXRlMiA9IF9fcGNnMzJTdGVwKHN0YXRlWzFdLCBuZXdTdGF0ZTEgPT09IDAgPyBvcC5zaGwocGNnU2Vjb25kSW5jcmVtZW50LCAxKSA6IHBjZ1NlY29uZEluY3JlbWVudCkKICAgIGludGMgMTAgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgYiByYWZmbGVfdGVybmFyeV9tZXJnZUA0NgoKcmFmZmxlX2FmdGVyX3doaWxlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2OAogICAgLy8gcmV0dXJuIFtzdGF0ZSwgcmVzdWx0XQogICAgZGlnIDEwCiAgICBwdXNoYnl0ZXMgMHgwMDEyCiAgICBjb25jYXQKICAgIGRpZyAxNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUxCiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgZHVwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMSAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUxCiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGIgcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmFmZmxlQDE1CgpyYWZmbGVfZWxzZV9ib2R5QDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1MQogICAgLy8gYWJzb2x1dGVCb3VuZCA9IG9wLmJ0b2koQnl0ZXMoQmlnVWludCgyICoqIDY0KSAtIEJpZ1VpbnQobG93ZXJCb3VuZCkpKQogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICBidXJ5IDEwCiAgICBiIHJhZmZsZV9hZnRlcl9pZl9lbHNlQDMxCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZmluZFdpbm5lcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmZpbmRXaW5uZXI6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU0CiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU1CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfUkFGRkxFX0hBU19OT1RfRU5ERUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDIzIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX1JBRkZMRV9IQVNfTk9UX0VOREVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1MSAvLyAiRVJSOlJITkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UkhORQoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIEVSUl9OT19XSU5OSU5HX1RJQ0tFVF9ZRVQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMSAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlICE9PSAwLCBFUlJfTk9fV0lOTklOR19USUNLRVRfWUVUKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpOV1RZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5XVFkKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9BTFJFQURZX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfQUxSRUFEWV9GT1VORCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6V0FGRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXQUZECgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbGV0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmluZGV4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmluZFdpbm5lcnNDdXJzb3IgfSkKICAgIGJ5dGVjIDMxIC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbGV0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmluZGV4CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gbGV0IGN1cnJlbnRSYW5nZVN0YXJ0ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5hbW91bnRJbmRleAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA0CgpmaW5kV2lubmVyX3doaWxlX3RvcEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNAogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl93aGlsZUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gY29uc3QgYm94U3Rha2UgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtpXS5hc1VpbnQ2NCgpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDggLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gY29uc3QgYm94U3Rha2UgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtpXS5hc1VpbnQ2NCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDQKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZVN0YXJ0ICsgYm94U3Rha2UpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDExIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VTdGFydCArIGJveFN0YWtlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDcKICAgIHVuY292ZXIgMgogICAgKwogICAgZHVwCiAgICBidXJ5IDcKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgNgogICAgaXRvYgogICAgY29uY2F0CgpmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2V0V2lubmVyV2VpZ2h0Qm94SW5mb0AyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB3aW5uaW5nQm94SW5mb1swXQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTYzCiAgICAvLyBsZXQgY3VycmVudFJhbmdlU3RhcnQgPSB3aW5uaW5nQm94SW5mb1sxXQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjYKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlIC0gc3RhcnRpbmdJbmRleAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTY2CiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuZW50cnlDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2NwogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gcmVtYWluZGVyID4gaXRlcmF0aW9uQW1vdW50ID8gaXRlcmF0aW9uQW1vdW50IDogcmVtYWluZGVyCiAgICBkdXAKICAgIGRpZyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgID4KICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIGNvbnN0IGNodW5rT2Zmc2V0OiB1aW50NjQgPSBzdGFydGluZ0luZGV4ICUgQ2h1bmtTaXplCiAgICBzd2FwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgZHVwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTcwCiAgICAvLyBjb25zdCByZW1haW5pbmdJbkNodW5rOiB1aW50NjQgPSBDaHVua1NpemUgLSBjaHVua09mZnNldAogICAgaW50YyA0IC8vIDQwOTYKICAgIHN3YXAKICAgIC0KICAgIGR1cAogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTcxCiAgICAvLyBpZiAoaXRlcmF0aW9uQW1vdW50ID4gcmVtYWluaW5nSW5DaHVuaykgewogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDkKICAgIGRpZyAyCiAgICBidXJ5IDEKCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU3NQogICAgLy8gY29uc3Qgd2VpZ2h0ID0gY2xvbmUodGhpcy53ZWlnaHRzKHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUpLnZhbHVlKQogICAgZGlnIDEKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxOCAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyBjb25zdCBvcFVwSXRlcmF0aW9uQW1vdW50OiB1aW50NjQgPSBpdGVyYXRpb25BbW91bnQgKiA0MAogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTc4CiAgICAvLyBlbnN1cmVCdWRnZXQob3BVcEl0ZXJhdGlvbkFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNAoKZmluZFdpbm5lcl93aGlsZV90b3BAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMQogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl93aGlsZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MQogICAgLy8gY3VycmVudFJhbmdlRW5kID0gY3VycmVudFJhbmdlU3RhcnQgKyB3ZWlnaHRbY2h1bmtPZmZzZXQgKyBpXS5hc1VpbnQ2NCgpCiAgICBkaWcgNwogICAgZGlnIDQKICAgICsKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkaWcgOQogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgNgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDExIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPj0gY3VycmVudFJhbmdlU3RhcnQgJiYgdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxNAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTEgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNwogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyB0aGlzLndpbm5lci52YWx1ZSA9IHRoaXMuZW50cmllcyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUuYWNjb3VudAogICAgZGlnIDEKICAgIGRpZyA0CiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjUgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5lbnRyaWVzKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZS5hY2NvdW50CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5lbnRyaWVzKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZS5hY2NvdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkaWcgMwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgNAogICAgZGlnIDYKICAgIGJ1cnkgNgogICAgYiBmaW5kV2lubmVyX3doaWxlX3RvcEAxMAoKZmluZFdpbm5lcl9hZnRlcl93aGlsZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuaW5kZXggKz0gaXRlcmF0aW9uQW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmluZFdpbm5lcnNDdXJzb3IgfSkKICAgIGJ5dGVjIDMxIC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4OAogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5pbmRleCArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDIKICAgICsKICAgIGl0b2IKICAgIHJlcGxhY2UyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuYW1vdW50SW5kZXggPSBjdXJyZW50UmFuZ2VTdGFydAogICAgZGlnIDYKICAgIGl0b2IKICAgIHJlcGxhY2UyIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJzQ3Vyc29yIH0pCiAgICBieXRlYyAzMSAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuYW1vdW50SW5kZXggPSBjdXJyZW50UmFuZ2VTdGFydAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTQKICAgIC8vIGZpbmRXaW5uZXIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIHN0YXJ0aW5nSW5kZXggKz0gQ2h1bmtTaXplCiAgICBkaWcgMQogICAgaW50YyA0IC8vIDQwOTYKICAgICsKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA0CiAgICBkaWcgNAogICAgYnVyeSA2CiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDE3CgpmaW5kV2lubmVyX2FmdGVyX3doaWxlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5MQogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgNgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBjb25zdCB3aW5uaW5nQm94SW5mbyA9IHRoaXMuZ2V0V2lubmVyV2VpZ2h0Qm94SW5mbygpCiAgICBiIGZpbmRXaW5uZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvQDIyCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2xhaW1SYWZmbGVQcml6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmFmZmxlUHJpemU6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiA1CiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gd2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmVyIH0pCiAgICBieXRlYyA1IC8vICJ3aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUwIC8vICJFUlI6V05GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXTkZECgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX0FMUkVBRFlfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDE0IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX0FMUkVBRFlfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpQQUNMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBBQ0wKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDM2IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5OC02MDEKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMud2lubmVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjAwCiAgICAvLyBhcmdzOiBbdGhpcy53aW5uZXIudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gYXJnczogW3RoaXMud2lubmVyLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDYgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTk4LTYwMQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy53aW5uZXIudmFsdWVdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGFkZjkyYWU0IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyh0aGlzLnRpY2tldENvdW50LnZhbHVlLCB0aGlzLmlzUHJpemVCb3gudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjIDQgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy50aWNrZXRDb3VudC52YWx1ZSwgdGhpcy5pc1ByaXplQm94LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGJ1cnkgMTQKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMzYgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy50aWNrZXRDb3VudC52YWx1ZSwgdGhpcy5pc1ByaXplQm94LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gaWYgKCFpc1ByaXplQm94ICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDY3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyOCAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gaWYgKCFpc1ByaXplQm94ICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDY3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjggLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMTMKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgYnVyeSAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OQogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA2NwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjggLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANjcKICAgIGRpZyAxMgogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDY3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMTAKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA2NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGxldCBha2l0YUFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIGlmICh0aGlzLmFraXRhUm95YWx0eS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzggLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA1CiAgICAvLyBpZiAodGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDcyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyBha2l0YUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5ha2l0YVJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gYWtpdGFSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlBa2l0YVJveWFsdHkgfSkKICAgIGJ5dGVjIDM4IC8vICJha2l0YV9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwNgogICAgLy8gYWtpdGFBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEzCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGJ1cnkgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIGlmIChha2l0YUFtb3VudCA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDcyCiAgICBkaWcgMTIKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA3MgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSAxNQoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDcyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxMgogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMwIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTQKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMzAgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTQKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEzCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMwIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjE1CiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA3OAogICAgZGlnIDEyCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTYKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgNwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDc4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gY29uc3Qgc2VsbGVyQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkpCiAgICBkaWcgOQogICAgZHVwCiAgICBkaWcgMTYKICAgIGR1cAogICAgY292ZXIgMwogICAgKwogICAgcHVzaGludCAyCiAgICBkaWcgMTAKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgZGlnIDE2CiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjIyLTIyNwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgY3JlYXRvcjogY3JlYXRvckFtb3VudCwKICAgIC8vICAgYWtpdGE6IGFraXRhQW1vdW50LAogICAgLy8gICBtYXJrZXRwbGFjZTogbWFya2V0cGxhY2VBbW91bnQsCiAgICAvLyAgIHNlbGxlcjogc2VsbGVyQW1vdW50LAogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ1cnkgMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjI4CiAgICAvLyBjb25zdCBtYXJrZXRwbGFjZSA9IHRoaXMuZW50cmllcyhsb2MpLnZhbHVlLm1hcmtldHBsYWNlCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjUgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjgKICAgIC8vIGNvbnN0IG1hcmtldHBsYWNlID0gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUubWFya2V0cGxhY2UKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDMyIDMyCiAgICBidXJ5IDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzMgogICAgLy8gaWYgKGFtb3VudHMuY3JlYXRvciA+IDApIHsKICAgIGRpZyAxNwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjM0LTYzOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzNgogICAgLy8gcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA2IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzYKICAgIC8vIHJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzQtNjM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzQtNjM5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBkaWcgMTcKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyBpZiAoYW1vdW50cy5ha2l0YSA+IDApIHsKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgMCwgYW1vdW50cy5ha2l0YSkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBhbW91bnRzLmFraXRhKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0OC02NTMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjAgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ4LTY1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDgtNjUzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjU1LTY2MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDI0IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyAxOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1NS02NTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTUtNjYwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjItNjY3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMTYKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjItNjY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY2Mi02NjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjktNjc0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjcxCiAgICAvLyByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3MQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzIKICAgIC8vIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICBzd2FwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjktNjczCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjktNjc0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQ5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODIKICAgIC8vIHRoaXMucHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTkyCiAgICAvLyBjbGFpbVJhZmZsZVByaXplKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njc4CiAgICAvLyBpZiAoYW1vdW50cy5jcmVhdG9yID4gMCkgewogICAgZGlnIDE3CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA0CiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIGlmIChBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODAtNjg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA2IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4NAogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjgwLTY4NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODAtNjg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzAxCiAgICAvLyBsZXQgbGVmdG92ZXI6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGEKICAgIGRpZyAxNwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMgogICAgLy8gaWYgKGFtb3VudHMuYWtpdGEgPiAwKSB7CiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDMKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzAzCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgOQogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNgogICAgLy8gaWYgKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjAgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNgogICAgLy8gaWYgKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDM1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA3LTcxMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjAgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyA4CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDctNzEyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA3LTcxMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNCAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjEKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUAzOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyMi03MjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjQgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyNAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI1CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyAxOAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyNgogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjItNzI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjItNzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0MQogICAgLy8gaWYgKG1hcmtldHBsYWNlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQxCiAgICAvLyBpZiAobWFya2V0cGxhY2UuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDE2CiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlANDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDItNzQ4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBkaWcgMTcKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQ2CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDE1CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDItNzQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQyLTc0OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzYxCiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA0NwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2Mi03NjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgZGlnIDE4CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NgogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzY2CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2Mi03NjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzYyLTc2OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDkKCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDQ3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDE3IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMjAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAxNiAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MC03NzgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMuc2VsbGVyIH1dLAogICAgLy8gICBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzczCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzQKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzAtNzc4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIC8vICAgYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3NwogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzcwLTc3OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICAvLyAgIGFtb3VudHMuc2VsbGVyLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQ5CgpjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA0MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTIKICAgIC8vIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTIKICAgIC8vIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIGRpZyAxOQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDE5CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDE2IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUwLTc1OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUzCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTQKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTAtNzU4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1MC03NTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IG1hcmtldHBsYWNlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDQKCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjQgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczNQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAyMAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDE2IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzMwLTczOAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzMKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczNAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNiAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMC03MzgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM3CiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzAtNzM4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDAKCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBidXJ5IDEzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlYyAyNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyA1NCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE4CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBidXJ5IDIyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDIwIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDIwCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjEKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgYnVyeSAyMQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDI2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBidXJ5IDIzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweGEyNDAzZGRmIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgMTAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDkKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgOQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1MgogICAgcHVzaGJ5dGVzICJFUlI6TkVTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpORVNDCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBkaWcgMTYKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSAzCiAgICBkaWcgOQogICAgPT0KICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1NAogICAgcHVzaGJ5dGVzICJFUlI6V0VTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXRVNDCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDIwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMwCiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMQogICAgLy8gW10KICAgIGJ5dGVjIDUyIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgYnVyeSAxNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjIKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI0CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBkaWcgMTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZGlnIDEzCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBidXJ5IDExCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDEKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMTEKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDktMTUyCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ2CiAgICAvLyB3YWxsZXQsCiAgICBkdXBuIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OAogICAgLy8gW2Fzc2V0LmlkXSwKICAgIGRpZyAxMwogICAgaXRvYgogICAgYnl0ZWMgMTYgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OAogICAgLy8gaWYgKGFtb3VudCA+IDApIHsKICAgIGRpZyA3CiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OS0xNjUKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYxCiAgICAvLyBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDgKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwLTE2NAogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA1ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzNgoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTMKICAgIC8vIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNiAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyAxNiAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4OC02OTYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5MQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg4LTY5NgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICAvLyAgIGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODgtNjk2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciB9XSwKICAgIC8vICAgYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMwCgpjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDYgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHBvcAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjA1CiAgICAvLyBpZiAodGhpcy53aW5uZXIudmFsdWUuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwNQogICAgLy8gaWYgKHRoaXMud2lubmVyLnZhbHVlLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDYtNjExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjA4CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwOAogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA2IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDYtNjEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDYtNjExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTMKCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDYgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLndpbm5lci52YWx1ZSwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMud2lubmVyLnZhbHVlLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTYgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTMtNjIxCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLndpbm5lci52YWx1ZSwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTMtNjIxCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLndpbm5lci52YWx1ZSwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjIwCiAgICAvLyB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxMy02MjEKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMud2lubmVyLnZhbHVlLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWMgMTAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nZXRTdGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN0YXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5OAogICAgLy8gdGlja2V0QXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzcgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDAKICAgIC8vIGVuZFRpbWVzdGFtcDogdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDIzIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAxCiAgICAvLyBzZWxsZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDEKICAgIC8vIHNlbGxlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMgogICAgLy8gbWluVGlja2V0czogdGhpcy5taW5UaWNrZXRzLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIG1pblRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pblRpY2tldHMgfSkKICAgIGJ5dGVjIDI5IC8vICJtaW5fdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIG1pblRpY2tldHM6IHRoaXMubWluVGlja2V0cy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyBtYXhUaWNrZXRzOiB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMTkgLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gbWF4VGlja2V0czogdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDQKICAgIC8vIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwNAogICAgLy8gZW50cnlDb3VudDogdGhpcy5lbnRyeUNvdW50LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDUKICAgIC8vIHRpY2tldENvdW50OiB0aGlzLnRpY2tldENvdW50LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlYyA0IC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODA1CiAgICAvLyB0aWNrZXRDb3VudDogdGhpcy50aWNrZXRDb3VudC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyB3aW5uaW5nVGlja2V0OiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMSAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyB3aW5uaW5nVGlja2V0OiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDcKICAgIC8vIHdpbm5lcjogdGhpcy53aW5uZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwOAogICAgLy8gcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA2IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIHByaXplOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxMAogICAgLy8gZ2F0ZUlEOiB0aGlzLmdhdGVJRC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTAKICAgIC8vIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxMQogICAgLy8gdnJmRmFpbHVyZUNvdW50OiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMiAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyB2cmZGYWlsdXJlQ291bnQ6IHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5SUQgfSkKICAgIGJ5dGVjIDQxIC8vICJlbnRyeV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODEzCiAgICAvLyByZWZ1bmRNQlJDdXJzb3I6IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE1IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIHJlZnVuZE1CUkN1cnNvcjogdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5Ny04MTQKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgc2VsbGVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgbWluVGlja2V0czogdGhpcy5taW5UaWNrZXRzLnZhbHVlLAogICAgLy8gICBtYXhUaWNrZXRzOiB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICAvLyAgIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIC8vICAgdGlja2V0Q291bnQ6IHRoaXMudGlja2V0Q291bnQudmFsdWUsCiAgICAvLyAgIHdpbm5pbmdUaWNrZXQ6IHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSwKICAgIC8vICAgd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIC8vICAgcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICAvLyAgIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICAvLyAgIHZyZkZhaWx1cmVDb3VudDogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUsCiAgICAvLyAgIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIC8vICAgcmVmdW5kTUJSQ3Vyc29yOiB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwKICAgIC8vIH0KICAgIHVuY292ZXIgMTUKICAgIGl0b2IKICAgIHVuY292ZXIgMTUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDEzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgOQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgNwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5NgogICAgLy8gZ2V0U3RhdGUoKTogUmFmZmxlU3RhdGUgewogICAgYnl0ZWMgMTAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjYgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjAgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0MCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgNTQgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVVQRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJVVBHCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgcHVzaGJ5dGVzICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjYgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX0ZPUkJJRERFTikKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6Rk9SQiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGT1JCCgpvcHRpbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpvcHRpbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsIEVSUl9JTlZBTElEX1BBWU1FTlRfQU1PVU5UKQogICAgZGlnIDEKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdGluX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXIocGF5bWVudDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMpIC0+IHZvaWQ6CnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3MS0zNzQKICAgIC8vIGVudGVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgYnl0ZWNfMiAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIEVSUl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDMzIC8vICJFUlI6TkxJViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTElWCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfVElDS0VUX0FTU0VUX05PVF9BTEdPKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzc2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgRVJSX1RJQ0tFVF9BU1NFVF9OT1RfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNTUgLy8gIkVSUjpUQU5BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlRBTkEKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gaWYgKHRoaXMuZ2F0ZUlELnZhbHVlICE9PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDcgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyBpZiAodGhpcy5nYXRlSUQudmFsdWUgIT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uYXBwbGljYXRpb25BcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUmFmZmxlLnByb3RvdHlwZS5nYXRlZEVudGVyPigpLCBFUlJfQkFEX01FVEhPRF9HQVRFX05FRURFRCkKICAgIGludGNfMCAvLyAwCiAgICB0eG5hcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDQyIC8vIG1ldGhvZCAiZ2F0ZWRFbnRlcihhcHBsLHBheSxhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2lmX2Vsc2VAOAogICAgYnl0ZWMgMzQgLy8gIkVSUjpCTUdOIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJNR04KCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOSAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX0FMUkVBRFlfRU5URVJFRCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9BTFJFQURZX0VOVEVSRUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNTYgLy8gIkVSUjpBRU5UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFFTlQKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIHBheW1lbnQuYW1vdW50ID49ICh0aGlzLm1pblRpY2tldHMudmFsdWUgKyBtYnIpICYmIHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgKyBtYnIpLAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gbWluVGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluVGlja2V0cyB9KQogICAgYnl0ZWMgMjkgLy8gIm1pbl90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4NQogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSBjb3N0cy5lbnRyaWVzICsgY29zdHMuZW50cmllc0J5QWRkcmVzcwogICAgaW50YyA3IC8vIDUwNjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgICsKICAgID49CiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9ib29sX2ZhbHNlQDE1CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMTkgLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4NQogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSBjb3N0cy5lbnRyaWVzICsgY29zdHMuZW50cmllc0J5QWRkcmVzcwogICAgaW50YyA3IC8vIDUwNjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgICsKICAgIGZyYW1lX2RpZyAwCiAgICA+PQogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJfYm9vbF9mYWxzZUAxNQogICAgaW50Y18xIC8vIDEKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2Jvb2xfbWVyZ2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzg4LTM5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgMTMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozOTMKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cnlDb3VudC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzk1CiAgICAvLyBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5NC0zOTcKICAgIC8vIHRoaXMuZW50cmllcyhsb2MpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjUgLy8gImUiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzk0LTM5NwogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gfQogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gcGF5bWVudC5hbW91bnQgLSBtYnIKICAgIGZyYW1lX2RpZyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzg1CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IGNvc3RzLmVudHJpZXMgKyBjb3N0cy5lbnRyaWVzQnlBZGRyZXNzCiAgICBpbnRjIDcgLy8gNTA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gcGF5bWVudC5hbW91bnQgLSBtYnIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGFtb3VudCkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDIKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDAyCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChhbW91bnQpCiAgICB1bmNvdmVyIDQKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgdW5jb3ZlciAzCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gY29uc3QgbmV3V2VpZ2h0ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDggLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gY29uc3QgbmV3V2VpZ2h0ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ld1dlaWdodAogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOCAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDA0CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3V2VpZ2h0CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18zIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWMgNCAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWMgNCAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2Jvb2xfZmFsc2VAMTU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9ib29sX21lcmdlQDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2EocGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTUtNDE5CiAgICAvLyBlbnRlckFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICBieXRlY18yIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX05PVF9MSVZFKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMzMgLy8gIkVSUjpOTElWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5MSVYKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9USUNLRVRfQVNTRVRfQUxHTykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9USUNLRVRfQVNTRVRfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDU3IC8vICJFUlI6VEFBTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUQUFMCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MjMKICAgIC8vIGlmICh0aGlzLmdhdGVJRC52YWx1ZSAhPT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyA3IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gaWYgKHRoaXMuZ2F0ZUlELnZhbHVlICE9PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLmFwcGxpY2F0aW9uQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFJhZmZsZS5wcm90b3R5cGUuZ2F0ZWRFbnRlckFzYT4oKSwgRVJSX0JBRF9NRVRIT0RfR0FURV9ORUVERUQpCiAgICBpbnRjXzAgLy8gMAogICAgdHhuYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyA0MyAvLyBtZXRob2QgImdhdGVkRW50ZXJBc2EoYXBwbCxwYXksYXhmZXIsYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDM0IC8vICJFUlI6Qk1HTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTUdOCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9BTFJFQURZX0VOVEVSRUQpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfQUxSRUFEWV9FTlRFUkVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDU2IC8vICJFUlI6QUVOVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBRU5UCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDEzIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDMzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGVudHJ5VG90YWxNQlIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMAogICAgLy8gY29uc3QgZW50cnlUb3RhbE1CUjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNyAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBlbnRyeVRvdGFsTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDEzIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAyMSAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlYyAyMSAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyBtaW5UaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5UaWNrZXRzIH0pCiAgICBieXRlYyAyOSAvLyAibWluX3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gdGhpcy5taW5UaWNrZXRzLnZhbHVlICYmIGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhX2Jvb2xfZmFsc2VAMjEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTE4CiAgICAvLyBtYXhUaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXhUaWNrZXRzIH0pCiAgICBieXRlYyAxOSAvLyAibWF4X3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gdGhpcy5taW5UaWNrZXRzLnZhbHVlICYmIGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIDAKICAgID49CiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9ib29sX2ZhbHNlQDIxCiAgICBpbnRjXzEgLy8gMQoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYm9vbF9tZXJnZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzctNDQwCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSB0aGlzLm1pblRpY2tldHMudmFsdWUgJiYgYXNzZXRYZmVyLmFzc2V0QW1vdW50IDw9IHRoaXMubWF4VGlja2V0cy52YWx1ZSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDIxIC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQyCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0MgogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gYWNjb3VudDogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDMtNDQ2CiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgbWFya2V0cGxhY2UKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjUgLy8gImUiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQzLTQ0NgogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIG1hcmtldHBsYWNlCiAgICAvLyB9CiAgICB1bmNvdmVyIDIKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOSAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYW1vdW50KQogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgZGlnIDEKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChhbW91bnQpCiAgICB1bmNvdmVyIDMKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgdW5jb3ZlciAzCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1MQogICAgLy8gY29uc3QgbmV3V2VpZ2h0ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDggLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1MQogICAgLy8gY29uc3QgbmV3V2VpZ2h0ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ld1dlaWdodAogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgOCAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUyCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3V2VpZ2h0CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18zIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTQKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWMgNCAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWMgNCAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhX2Jvb2xfZmFsc2VAMjE6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9ib29sX21lcmdlQDIyCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkKHBheW1lbnQ6IHVpbnQ2NCkgLT4gdm9pZDoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gYWRkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMzMgLy8gIkVSUjpOTElWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5MSVYKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfVElDS0VUX0FTU0VUX05PVF9BTEdPKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgRVJSX1RJQ0tFVF9BU1NFVF9OT1RfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDU1IC8vICJFUlI6VEFOQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUQU5BCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY4CiAgICAvLyBpZiAodGhpcy5nYXRlSUQudmFsdWUgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIGlmICh0aGlzLmdhdGVJRC52YWx1ZSAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uYXBwbGljYXRpb25BcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUmFmZmxlLnByb3RvdHlwZS5nYXRlZEFkZD4oKSwgRVJSX0JBRF9NRVRIT0RfR0FURV9ORUVERUQpCiAgICBpbnRjXzAgLy8gMAogICAgdHhuYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyA0NCAvLyBtZXRob2QgImdhdGVkQWRkKGFwcGwscGF5KXZvaWQiCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDM0IC8vICJFUlI6Qk1HTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTUdOCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9FTlRSWV9ET0VTX05PVF9FWElTVCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDcyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX0VOVFJZX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNTggLy8gIkVSUjpFRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVETkUKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBjb25zdCBhbW91bnQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdCiAgICBkdXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBjb25zdCBhbW91bnQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdCiAgICBzd2FwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTMgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSAtIGFtb3VudC5hc1VpbnQ2NCgpKSwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTgKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDE5IC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlIC0gYW1vdW50LmFzVWludDY0KCkpLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAwCiAgICBidG9pCiAgICAtCiAgICA8PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDEzIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4MQogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgcGF5bWVudC5hbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgY292ZXIgNAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4MC00ODIKICAgIC8vIGNvbnN0IG5ld1dlaWdodHMgPSBuZXcgVWludDY0KAogICAgLy8gICB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBwYXltZW50LmFtb3VudAogICAgLy8gKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4MwogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ld1dlaWdodHMKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyBjb25zdCBib3hBbW91bnQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIHBheW1lbnQuYW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA4IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIGNvbnN0IGJveEFtb3VudCA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgcGF5bWVudC5hbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIDMKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDggLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IGJveEFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gcGF5bWVudC5hbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWMgNCAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBwYXltZW50LmFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlYyA0IC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDg2CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IHBheW1lbnQuYW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhKGFzc2V0WGZlcjogdWludDY0KSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBhZGRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4pOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX05PVF9MSVZFKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDMzIC8vICJFUlI6TkxJViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTElWCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCwgRVJSX1RJQ0tFVF9BU1NFVF9BTEdPKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCwgRVJSX1RJQ0tFVF9BU1NFVF9BTEdPKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDU3IC8vICJFUlI6VEFBTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUQUFMCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyBpZiAodGhpcy5nYXRlSUQudmFsdWUgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTkKICAgIC8vIGlmICh0aGlzLmdhdGVJRC52YWx1ZSAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uYXBwbGljYXRpb25BcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUmFmZmxlLnByb3RvdHlwZS5nYXRlZEFkZEFzYT4oKSwgRVJSX0JBRF9NRVRIT0RfR0FURV9ORUVERUQpCiAgICBpbnRjXzAgLy8gMAogICAgdHhuYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyA0NSAvLyBtZXRob2QgImdhdGVkQWRkQXNhKGFwcGwsYXhmZXIpdm9pZCIKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2lmX2Vsc2VAOAogICAgYnl0ZWMgMzQgLy8gIkVSUjpCTUdOIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJNR04KCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX0VOVFJZX0RPRVNfTk9UX0VYSVNUKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfRU5UUllfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyA1OCAvLyAiRVJSOkVETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RURORQoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOSAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIGNvbnN0IGFtb3VudCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0KICAgIGR1cAogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxOCAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIGNvbnN0IGFtb3VudCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0KICAgIHN3YXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTA4CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMjEgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAyMSAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSAtIGFtb3VudC5hc1VpbnQ2NCgpKSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTgKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDE5IC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSAtIGFtb3VudC5hc1VpbnQ2NCgpKSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIC0KICAgIDw9CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgMjEgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgY292ZXIgNAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxMi01MTQKICAgIC8vIGNvbnN0IG5ld1dlaWdodHMgPSBuZXcgVWludDY0KAogICAgLy8gICB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIC8vICkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXdXZWlnaHRzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNgogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDggLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNgogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIDMKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDggLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IGJveEFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYXNzZXRYZmVyLmFzc2V0QW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjIDQgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYXNzZXRYZmVyLmFzc2V0QW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjIDQgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYXNzZXRYZmVyLmFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlKCkgLT4gdWludDY0OgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkxCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTEwCiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM3IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkxCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+PQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MS03OTIKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlX2Jvb2xfZmFsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAyMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTIKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MS03OTIKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlX2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTAtNzkzCiAgICAvLyByZXR1cm4gKAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgLy8gKQogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmVfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTAtNzkzCiAgICAvLyByZXR1cm4gKAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgLy8gKQogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyANAAEIBIAgoI0G////////////AaiLA63+1eTUhf2oWM+Cnrvv796CFNGCnrvv796CFP////8P1K+gBiY7DHRpY2tldF9hc3NldAlha2l0YV9kYW8AC2VudHJ5X2NvdW50DHRpY2tldF9jb3VudAZ3aW5uZXIFcHJpemUHZ2F0ZV9pZAh3X3RvdGFscwFhBBUffHUOd2lubmluZ190aWNrZXQRd2VpZ2h0c19ib3hfY291bnQIRVJSOklQQVkNcHJpemVfY2xhaW1lZBFyZWZ1bmRfbWJyX2N1cnNvcgIAAQZzZWxsZXIBdwttYXhfdGlja2V0cwxha2l0YV9lc2Nyb3cIRVJSOklYRlIRdnJmX2ZhaWx1cmVfY291bnQNZW5kX3RpbWVzdGFtcAttYXJrZXRwbGFjZQFlBndhbGxldAxyYWZmbGVfcm91bmQPY3JlYXRvcl9yb3lhbHR5C21pbl90aWNrZXRzFW1hcmtldHBsYWNlX3JveWFsdGllcxNmaW5kX3dpbm5lcl9jdXJzb3JzCEVSUjpGR1RFCEVSUjpOTElWCEVSUjpCTUdOCEVSUjpNQkZGDGlzX3ByaXplX2JveA9zdGFydF90aW1lc3RhbXANYWtpdGFfcm95YWx0eQhFUlI6UE5DTAhFUlI6TkRBTwhlbnRyeV9pZARcV/bYBDjmJDME3FCzVARju7c1AwaBAQNhYWwDb2FsBHNhbHQIRVJSOldORkQIRVJSOlJITkUCAAAIRVJSOklSQkQDcGFsCEVSUjpUQU5BCEVSUjpBRU5UCEVSUjpUQUFMCEVSUjpFRE5FMRhAACMrImcnBCJnJwsiZycOImcnFiJnJykiZycMImcnDyJnJxsiZ4ICBCSHwywE6pGA3TYaAI4CANkAzjEZFEQxGEEAt4IDBL1xSNAE8s4vRgQslCUUJyqABJYnEvEnK4AEQ6U+TicsgARqbZufJy2CCwTrFoG0BGllAd4EvRsn0QRl/KmLBI+koWAEnlcm8QSuhMvYBDPpLJQEhU3t4ATZo1+kBD6hGDI2GgCOFQUhBbAGWwb8BzoHUgeiB8UH+AgHCDoISQp9C9gRRBFVEeoScwAiAAESlwCAHBUffHUAAAAAAAB71AAAAAAAyBfUAAAAAAAASdSwI0MjQ4AEOiMnFTYaAI4BAx4AMRklEjEYEERCEeUxGYEFEjEYEERCBmyKAgCL/oEKCIsAMgwNQQAqsYEGshCBBbIZJy6yHicush+L/40CAAsABLNC/9syALIBQv/1IrIBQv/viYoBAYv/gRKRi/8bgRuRIQsai/+BO5FKkUwcIx5FAYEfGk8CTJAhCxoZiYoEAYv8OBiL/ScvZUiBKFsSQQA5i/w4GUAAMov8OBslEkEAKYv8IsIagARDkiZVEkEAGov8I8Iai/4SQQAPi/yBAsIai/8WEkEAAiOJIomKBwIiKkcDIov6QAAFi/9AAUojRIv5Jy9lSCRbjAOL/SJZgdTFAQuB5MUCCIwBi/pAAFqxiwNJcghEiwGL/giyCLIHI7IQIrIBtov7Fov8Fk8CshiABHt9xfyyGkyyGrIai/2yGoEGshAisgGztD5JVwQATFcABCcKEkRJFSQSRBcWiwEWUIv9jAGMAImLA3IIRIv6cABFAUEAi4sBjAKLA3IITIwARCKMBIv/QQAKiwNyCEQjjASMBbGLA3IIRIsBsgiyByOyECKyAbaLBEEABIsFshWL+rIRi/6yEosAshQlshAisgG2i/sWi/wWiwOyGIAErxoU8rIaTLIashqL/bIagQayECKyAbO0PklXBABMVwAEJwoSREkVJBJEF4sCjAFC/1uLATIQCIwCsYsDSXIIRDIQsgiyByOyECKyAbaL+hZMshiABDlOrrKyGrIagQayECKyAbNC/0MiQv6zigMBIkkqSTEAi/0nMGVIgRhbsbIYgAQ8Gm8zshqyGoEGshAisgGztD5JVwQASwFXAAQnChJESSJZgQIITBUSRFcGAEkVSUEAB4sFJBNBAJoijAMyA4wAiwNAAHuLAIwBi/9BAGmLATIDE0EAYYv9gAt3YWxsZXRfZmVlc2VIJFtJIQUORIv/HSEFl0mMAkAACIv/QQADI4wCMgdJgYD1JAiLAklOAhaLAUxQJxBMUIv9i/5PBU8ETwRLBSKI/eFIVwgIi/9PAgkWTFCMAImL/xYiFlCMAImLA4AIcmVmZXJyZXJlSIwBQv92iwQXjANC/2EqRwI2GgFJFSQSRBc2GgJJFSMSRCJTNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSRWBIBJENhoHSRWBKBJENhoISRUkEkQXNhoJSRUkEkQXNhoKSRUkEkQXNhoLSRUkEkQXNhoMSRWBIBJENhoNSRUkEkQXNhoORwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDINQAAEJyOwACcGSw5nJyRLDWdLC0EAFEsLcQBEQAAMgAhFUlI6SUFTVLAAKEsMZyclSwtJTgJnSwoMQQD7SwkyBw1BAPMjQAAMgAhFUlI6SUVOUrAAJxdLCmcnEUsJZ4AGZnVuZGVySwhnJxxLB2cnHUsGZycTSwVnJwUyA2cnB0sEZycYSwNnKUsCZycUSwFnIillRIAIbmZ0X2ZlZXNlSEmBcFsnHkxnIillRCInEWVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwoSREkVJBJEF0lFE0sBgWBbRRFMgWhbRREjDUEAOUsQIwlLEElLEQlPAguB6AcKCScmTGeBeK8nCExnJzExF2cnH4AQAAAAAAAAAAAAAAAAAAAAAWcjQyNC/8ciQv8KKkkxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAAQnI7AASSUPQAAMgAhFUlI6TUFMRrAASYEQDEAADIAIRVJSOk1BTUawAEkhDAtFA0sBOAcyChJAAAQnDbAASwE4CEsDEkAABCcNsAAnDEsBZyJFBEsDSwEMQQAVSwNJFicSTFCBgIACuUgjCEUEQv/jI0MqSTYaAUkVJBJEFyInDmVEQAAEJyewACInBWVEMgMTQAAEJzKwACIrZUQiJw9lRBNAAAyACEVSUjpBUkZDsAAiJw9lTElOAkUERCIrZURLAQlJSwNJTgMNTE4CTUlFA4FkCyKI+jNFA0oISwMNQQAtSwJJFicZTFBJvkRXACBMvEgnCUsBULxIsbIHIQeyCCOyECKyAbMjCEUDQv/LIicPZURLAQgnD0xnI0MqIicOZURAAAQnJ7AAIkUBIicMZURLAQ1BABsiJwxlRCMJSwFJTgIJFicSTFC8SCMIRQFC/9oiJwxlRCEMC7EyCUsBsgiyByOyECKyAbMnDCJnFicKTFCwI0MxADIJEkAABCcjsAAiJw5lREAABCcnsAAiK2VEIicPZUQSQAAMgAhFUlI6UkZOQ7AAIicMZURBAAyACEVSUjpTSFdCsAAjQzEWgQIJSTgQgQYSRDEWIwlJTgI4ECMSRDYaAUlOAhWBIBJEIillRDEAIicHZUSI+YFAAAQnILAASogLxyNDMRYjCUk4ECMSRDYaAUkVgSASRIgLryNDMRaBAwlJOBCBBhJEMRaBAglJTgI4ECMSRDEWIwlJTgI4ECUSRDYaAUlOAhWBIBJEIillRDEAIicHZUSI+R5AAAQnILAASwJLAksCiAw1I0MxFoECCUk4ECMSRDEWIwlJOBAlEkQ2GgFJFYEgEkSIDBIjQzEWgQIJSTgQgQYSRDEWIwlJTgI4ECMSRCIpZUQxACInB2VEiPjDQAAEJyCwAEmIDNojQzEWIwlJOBAjEkSIDMsjQzEWgQIJSTgQgQYSRDEWIwlJTgI4ECUSRCIpZUQxACInB2VEiPiBQAAEJyCwAEmIDVgjQzEWIwlJOBAlEkSIDUkjQyJHAypHCTIHIicXZUQNQAAEJzOwACInC2VEQQAMgAhFUlI6V0FEUrAAIicbZURAAAgyBiQJJxtMZyInG2VEIicWZUQlCwhJRQcyBkwkCA9AAAyACEVSUjpORVRNsACxSwUWIicxZURJFRZXBgJMUCIpZUQnMGVIIluyGIAEGJOSxbIaTLIashqBBrIQIrIBs7Q+SVcEAEsBVwAEJwoSREkiWYECCEwVEkRXBgBJRQ0VSUUDQAANIicWZUQjCCcWTGcjQyJLAklOAg8iSwJPAk2BEEsCD4EQTwNPAk1LDU4CUklFDRWBEBJAAAyACEVSUjpJUlNEsABLC0kiWyIhCB1FAUkhCR5FAU8CHkUBIQgdRQEhCR5OAkhPAiRbTCEKHkUBHkUBIQgdRQEhCh5FAUwWTBZQRQ0iJwRlTElOAkUDRCEGDEEABUkjCEUBJzRFDklBANlJIw1AAAQnNbAASSMJSUULIw1AAAQnNbAASwlJHCMeRQFMGEUDIkUHSwxFC0sGIwxBAIpLCkkiW0lFBiEIHUUBIQkeSU4CRQxITCRbRQZAAGeBooW89t7fvYUoSwVJIQgdRQFPAh5FAUsKFkwWUEsFiPZ0gSCQTwKI9mwZFlBJVwAQTIEQW0lFCksED0EAJEsISwsYIwgWSw9JIlkjCBZXBgBcAExQRQ9LByMIRQhFC0L/eUULQv97IQpC/55LCoACABJQSw5QSYEQWUsBFVKBAlsnC0xnQv6UIQZFCkL/OSIqRwY2GgFJFSQSRBcyByInF2VEDUAABCczsAAiJwtlREAADIAIRVJSOk5XVFmwACInBWVEMgMSQAAMgAhFUlI6V0FGRLAAIicfZURJIltFAyRbRQYiRQQiJwxlREsEDUEA7iInCGVESwQkC1siJwtlREsHTwIISUUHDEEAv0sBFksGFlBJIltJTgJFBCRbRQciK2VESwEJSUsDSU4DDUxOAk1JRQNMIQQYSUUKIQRMCUlFBQ1BAARLAkUBSwEhBAoWJxJMUEUJSYEoCyKI9PwiRQRLA0sBDEEASUsHSwQIJAtLCUwkuhdLBklPAghFCCInC2VEDkEAHiInC2VESwcMQQATSwFLBAgWJxlMUL5EVwAgJwVMZ0sDIwhFBEsGRQZC/68iJx9lREkiW0sCCBZcAEsGFlwIJx9MZyNDSwEhBAhFAksDIwhFBEsERQZC/wdLARZLBhZQQv8qIkcFKkcOIicFZUQyAxNAAAQnMrAAIicOZURBAAyACEVSUjpQQUNMsAAiJyRlREEE2bEiJwVlRCInBmVEshiABK35KuSyGrIagQayECKyAbMiJwRlTEUORCInJGVEIkULQAAuIiccZURBACYiJxxlREkhBQ5ESw0dIQWXSUULQAAQIiccZURBAAhLDEEAAyNFCiJFDyInJmVEQQAeIicmZURJIQUOREsNHSEFl0lFEEAACEsMQQADI0UPIkUHIiceZURBACYiJx5lREkhBQ5ESw0dIQWXSUUIQAAQIiceZURBAAhLDEEAAyNFB0sJSUsQSU4DCIECSwpJTgULCEsQTAlMFk8CFlBPAhZQTBZQRRIiJwVlRCcJTFC+RBcWJxlMUL5EVyAgRRAiKGVEQACPSxEiW0lFBUEAFrEiJwZlRHELREsEsgiyByOyECKyAbNLESRbSUEADCIpZUQiTwKI9SQiW7EiJxRlRIECW3IIRLIHsggjshAisgGzsSInGGVESxJJTgKBEFtJsghMsgcjshAisgGzsbIISxCyByOyECKyAbOxIicRZURMgRhbsgiyByOyECKyAbMnDiNnI0NLESJbSUUEQQAvIicGZURxC0QiKGVEcABFAUEDALEiJwZlRHELRCIoZUSyEUsDshKyFCWyECKyAbNLESRbSUUJQQARIillRCIoZURLCYj0dyJbRQgiJxRlRIECW3IIRCIoZURwAEUBQQEssSInFGVEgQJbcghEIihlRLIRSwiyErIUJbIQIrIBsyInGGVEIihlRHAARQFBAM2xIicYZURLEoEQWyIoZUSyEbISshQlshAisgGzIihlREsQTHAARQFBAHixSxGBEFsiKGVEshGyEksPshQlshAisgGzIicRZUQiKGVEcABFAUEAH7EiJxFlREsSgRhbIihlRLIRshKyFCWyECKyAbNC/u8iKWVEIihlRCInEWVESxSBGFtJFk8CTFAnEExQTwNPAyIhBk8ETwUiiPIxRgJC/r8iKWVEIihlREsTgRBbSRZLE0xQJxBMUE8DTwMiIQZPBE8FIojyBkYCQv92IillRCIoZUQiJxhlREsUgRBbSRZPAkxQJxBMUE8DTwMiIQZPBE8FIojx1kYCQv8fIihlTEUNRCIpZURJJxplSEUCSSc2ZUhJVwgIRRYkW0UGIicUZUxJTgJFFERJIllLARVSSUUVVwIATCcaZUhMsSMWRRdJFRZXBgJMUIAEAAEAAkxQTLIYgASiQD3fshqyGoEGshAisgGztD5JVwQASwFXAAQnChJESSJZgQkLgQIITBUSRFcGCSJbSUUKQAAMgAhFUlI6TkVTQ7AASxCBAltJRQNLCRJAAAyACEVSUjpXRVNDsACxSbIYgARa3zOPshpLE7IaSxSyGksSshqACgABAAAAAAAAAACyGic0shqBBrIQIrIBIillTEUPREsBcghEIkUMSwxwAEUBQAAaSw2ADnJldmVudWVfc3BsaXRzZUgiWSMIRQsyEEsLC7ZLAnIIRLIHsggjshAisgG2RwIWSw0WJxBMUEsHshiABGg147yyGkyyGoABgLIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBSwdBABa2SwFyCERLDLIRSwiyErIUJbIQIrIBs0L9bCIpZUQiKGVEIicGZURxC0RLBUlOAhZQJxBMUE8DTwMiIQZPBE8FIojwIEYCQvztMgoiJwZlRExLAXAASEUHIicFZURMcABFAUEAGbEiJwVlRCInBmVEshGyFSWyECKyAbNC+xEiKWVEIicGZUQiJwVlREsISU4CFlAnEExQTwNPAyIhBk8ETwUjiO++RgJC+uSIBRmAAQAiTwJUJwpMULAjQyIoZUQiJyVlRCInF2VEIicRZUQiJx1lRCInE2VEIitlRCInBGVEIicLZUQiJwVlRCInBmVEIicOZUQiJwdlRCInFmVEIicpZUQiJw9lRE8PFk8PFlBPDhZQTw1QTwwWUE8LFlBPChZQTwkWUE8IFlBPB1BPBhZQgAEAIk8HVFBPBBZQTwMWUE8CFlBMFlAnCkxQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIillRCcaZUhyCEQSQAAEJyiwACcUSwFnI0M2GgFJIlmBAghLARUSRFcCADEAIillRCcaZUhyCEQSQAAEJyiwACIpZUQnNmVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAgAd2ZXJzaW9uSwFnI0M2GgFJFSQSRBcxACIpZUQnGmVIcghEEkAABCcosAApSwFnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAAyACEVSUjpGT1JCsABLATgHMgoSQAAMgAhFUlI6SVBNUrAASwE4CDIQEkAADIAIRVJSOklQTUGwALEyCksBshEishKyFCWyECKyAbMjQ4oCACqIA1pAAAQnIbAAIihlREEABCc3sAAiJwdlREEADSLAGicqEkAABCcisAAnCTEAUL1FAUEABCc4sACL/jgHMgoSQAAEJw2wAIv+OAhJjAAiJx1lRCEHCA9BAHQiJxNlRCEHCIsAD0EAZiNAAAQnDbAAIitlRDEAi/9QSwEWJxlLAVBPAr8nCTEAUEy/iwAhBwlJFksCIQQKSRYnEkxQTwQhBBgkC08DuyInCGVETCQLSltLAwgWXScITGciK2VEIwgrTGciJwRlRAgnBExniSJC/5eKAwAqiAKEQAAEJyGwACIoZURAAAQnObAAIicHZURBAA0iwBonKxJAAAQnIrAAJwkxAFC9RQFBAAQnOLAAi/04BzIKEkAABCcNsACL/TgIIQcSQAAEJw2wAIv+OBQyChJAAAQnFbAAi/44ESIoZUQSQAAEJxWwAIv+OBJJjAAiJx1lRA9BAHAiJxNlRIsAD0EAZSNAAAQnFbAAIitlRDEAi/9QSwEWJxlLAVBPAr8nCTEAUEy/iwBJTgIWSwEhBApJFicSTFBPAyEEGCQLTwO7IicIZURMJAtKW0sDCBZdJwhMZyIrZUQjCCtMZyInBGVECCcETGeJIkL/mIoBACJJKkcCiAGFQAAEJyGwACIoZURBAAQnN7AAIicHZURBAA0iwBonLBJAAAQnIrAAJwkxAFC9RQFAAAQnOrAAJwkxAFC+RBdJIQQKSYwDFicSTFBJjAFMIQQYJAtJjAIkuowAi/84BzIKEkAABCcNsACL/zgISYwEIicTZUSLABcJDkAABCcNsACLAUmLAklOAyS6F4sESU4ECBZMTgK7IicIZUSLAyQLSltLAwgWXScITGciJwRlRAgnBExniYoBACJJKkcCiADFQAAEJyGwACIoZURAAAQnObAAIicHZURBAA0iwBonLRJAAAQnIrAAJwkxAFC9RQFAAAQnOrAAJwkxAFC+RBdJIQQKSYwDFicSTFBJjAFMIQQYJAtJjAIkuowAi/84FDIKEkAABCcVsACL/zgRIihlRBJAAAQnFbAAi/84EkmMBCInE2VEiwAXCQ5AAAQnFbAAiwFJiwJJTgMkuheLBElOBAgWTE4CuyInCGVEiwMkC0pbSwMIFl0nCExnIicEZUQIJwRMZ4kyByInJWVED0EADTIHIicXZUQOQQACI4kiiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
          case "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,address,uint64,(string,uint64))void":
            return _RaffleParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Raffle smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,address,uint64,(string,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,address,uint64,(string,uint64))void",
          args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.isPrizeBox, params.args.ticketAsset, params.args.startTimestamp, params.args.endTimestamp, params.args.seller, params.args.funder, params.args.creatorRoyalty, params.args.minTickets, params.args.maxTickets, params.args.gateId, params.args.marketplace, params.args.akitaDao, params.args.akitaDaoEscrow]
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
   * Constructs a no op call for the gatedEnter(appl,pay,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEnter(params) {
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
   * Constructs a no op call for the gatedEnterAsa(appl,pay,axfer,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEnterAsa(params) {
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
   * Constructs a no op call for the gatedAdd(appl,pay)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedAdd(params) {
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
   * Constructs a no op call for the gatedAddAsa(appl,axfer)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedAddAsa(params) {
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
   * Constructs a no op call for the getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getState(params) {
    return {
      ...params,
      method: "getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)",
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
       * Creates a new instance of the Raffle smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,address,uint64,(string,uint64))void ABI method.
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
       * Creates a new instance of the Raffle smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,address,uint64,(string,uint64))void ABI method.
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
       * Creates a new instance of the Raffle smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,address,uint64,(string,uint64))void ABI method.
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
     * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEnter: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedEnter(params));
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
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEnterAsa: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedEnterAsa(params));
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
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedAdd: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedAdd(params));
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
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedAddAsa: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedAddAsa(params));
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
     * Makes a call to the Raffle smart contract using the `getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEnter: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedEnter(params));
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
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEnterAsa: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedEnterAsa(params));
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
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedAdd: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedAdd(params));
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
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedAddAsa: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedAddAsa(params));
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
     * Makes a call to the Raffle smart contract using the `getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)` ABI method.
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
     * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEnter: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedEnter(params));
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
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEnterAsa: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedEnterAsa(params));
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
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedAdd: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedAdd(params));
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
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedAddAsa: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedAddAsa(params));
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
     * Makes a call to the Raffle smart contract using the `getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)` ABI method.
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a init(pay,uint64)void method call against the Raffle contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        return this;
      },
      /**
       * Add a refundMBR(uint64)void method call against the Raffle contract
       */
      refundMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.refundMbr(params)));
        return this;
      },
      /**
       * Add a clearWeightsBoxes()uint64 method call against the Raffle contract
       */
      clearWeightsBoxes(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.clearWeightsBoxes(params)));
        return this;
      },
      /**
       * Add a gatedEnter(appl,pay,address)void method call against the Raffle contract
       */
      gatedEnter(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnter(params)));
        return this;
      },
      /**
       * Add a enter(pay,address)void method call against the Raffle contract
       */
      enter(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.enter(params)));
        return this;
      },
      /**
       * Add a gatedEnterAsa(appl,pay,axfer,address)void method call against the Raffle contract
       */
      gatedEnterAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnterAsa(params)));
        return this;
      },
      /**
       * Add a enterAsa(pay,axfer,address)void method call against the Raffle contract
       */
      enterAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.enterAsa(params)));
        return this;
      },
      /**
       * Add a gatedAdd(appl,pay)void method call against the Raffle contract
       */
      gatedAdd(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedAdd(params)));
        return this;
      },
      /**
       * Add a add(pay)void method call against the Raffle contract
       */
      add(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.add(params)));
        return this;
      },
      /**
       * Add a gatedAddAsa(appl,axfer)void method call against the Raffle contract
       */
      gatedAddAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedAddAsa(params)));
        return this;
      },
      /**
       * Add a addAsa(axfer)void method call against the Raffle contract
       */
      addAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addAsa(params)));
        return this;
      },
      /**
       * Add a raffle()void method call against the Raffle contract
       */
      raffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.raffle(params)));
        return this;
      },
      /**
       * Add a findWinner(uint64)void method call against the Raffle contract
       */
      findWinner(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.findWinner(params)));
        return this;
      },
      /**
       * Add a claimRafflePrize()void method call against the Raffle contract
       */
      claimRafflePrize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimRafflePrize(params)));
        return this;
      },
      /**
       * Add a isLive()bool method call against the Raffle contract
       */
      isLive(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isLive(params)));
        return this;
      },
      /**
       * Add a getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64) method call against the Raffle contract
       */
      getState(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getState(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Raffle contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Raffle contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Raffle contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64) method call against the Raffle contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        return this;
      },
      /**
       * Add a optin(pay,uint64)void method call against the Raffle contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
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

// src/raffle/errors.ts
var RAFFLE_ERROR_MESSAGES = {
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
  CNRF: "Creator is not the raffle factory"
};
var translateRaffleError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, RAFFLE_ERROR_MESSAGES);

// src/raffle/factory.ts

var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/RaffleFactoryClient.ts



var APP_SPEC2 = { "name": "RaffleFactory", "structs": { "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newRaffle", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPrizeBoxRaffle", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteRaffle", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2330], "errorMessage": "Box must have value" }, { "pc": [866, 1729], "errorMessage": "Bytes has valid prefix" }, { "pc": [1033], "errorMessage": "ERR:BMPT" }, { "pc": [1437, 2164], "errorMessage": "ERR:CNST" }, { "pc": [1426], "errorMessage": "ERR:ICOR" }, { "pc": [2289, 2303], "errorMessage": "ERR:IPAY" }, { "pc": [1577], "errorMessage": "ERR:IPMA" }, { "pc": [1550], "errorMessage": "ERR:IPMR" }, { "pc": [2103], "errorMessage": "ERR:IUPG" }, { "pc": [639, 653], "errorMessage": "ERR:IXFR" }, { "pc": [1287, 1314, 1469, 2032, 2074, 2139], "errorMessage": "ERR:NDAO" }, { "pc": [1764], "errorMessage": "ERR:NESC" }, { "pc": [1089], "errorMessage": "ERR:NPBO" }, { "pc": [1179], "errorMessage": "ERR:NRAF" }, { "pc": [1789], "errorMessage": "ERR:WESC" }, { "pc": [1062], "errorMessage": "NAPB" }, { "pc": [337, 713, 755, 1048, 1060, 1122, 1161, 1306, 1461, 1524, 1854, 1870, 1964, 2024, 2066, 2131, 2314, 2503, 2531, 2572], "errorMessage": "application exists" }, { "pc": [788], "errorMessage": "asset exists" }, { "pc": [660, 1037, 1300, 1455, 1514, 1518, 1623, 1654, 1846, 1955, 1959, 2018, 2060, 2078, 2125, 2201, 2248, 2308, 2394, 2620, 2654], "errorMessage": "check GlobalState exists" }, { "pc": [388, 402, 418, 459, 590, 605, 869, 1244, 1337, 1732, 2007, 2044], "errorMessage": "invalid array length header" }, { "pc": [409, 425, 596, 1251, 1344, 2051], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [617], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [1741], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [581, 1002], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [436, 518, 528, 538, 548, 558, 568, 625, 939, 949, 959, 969, 979, 989, 1010, 1156, 1262, 1329, 1500, 1950, 2118], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [464, 2012], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [875], "errorMessage": "invalid number of bytes for string" }, { "pc": [451, 1999], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [446, 1994], "errorMessage": "invalid tuple encoding" }, { "pc": [919], "errorMessage": "transaction type is appl" }, { "pc": [510], "errorMessage": "transaction type is axfer" }, { "pc": [498, 931, 1492], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA2NzAwMCA0MDk2IDUwMDAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJiYyIgIndhbGxldCIgImFraXRhX2VzY3JvdyIgIkVSUjpOREFPIiAweDE1MWY3Yzc1ICJhYWwiIDB4YzUzYjMyY2MgInZlcnNpb24iICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAiRVJSOklYRlIiIDB4M2VhMTE4MzIgMHhhZGY5MmFlNCAiRVJSOkNOU1QiICJwYWwiICJFUlI6SVBBWSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5LTM1CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBSYWZmbGVGYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlUmFmZmxlLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOS0zNQogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVJhZmZsZSwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIwCiAgICBwdXNoYnl0ZXNzIDB4MTg1ODRmMjAgMHgzYjcyM2I4MSAweDkxZGQzYzc1IC8vIG1ldGhvZCAibmV3UmFmZmxlKHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzMyXVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm5ld1ByaXplQm94UmFmZmxlKGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZGVsZXRlUmFmZmxlKHVpbnQ2NCl2b2lkIgogICAgYnl0ZWMgNyAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhkY2EyZDg2MiAweGQzNDZiMWE0IDB4Mzk0ZWFlYjIgMHgzM2Y3ODgwOCAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweGQ5YTM1ZmE0IC8vIG1ldGhvZCAibG9hZEJveGVkQ29udHJhY3QodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVCb3hlZENvbnRyYWN0KCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm1icigpKHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG5ld1JhZmZsZSBuZXdQcml6ZUJveFJhZmZsZSBkZWxldGVSYWZmbGUgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE3IG1haW5fbWJyX3JvdXRlQDE4CiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9iYXNlLnRzOjYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA3YmQ0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOS0zNQogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVJhZmZsZSwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHg4MTE1MzYyOCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmV3YXJkc09wdEluQ29zdChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJld2FyZHNPcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDkKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZXdhcmRzT3B0SW5Db3N0X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMQogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTEyCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjIKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI0CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzMQogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTgwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4MgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTgzCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gY2hpbGRWZXJzaW9uCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4NAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODUKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkubmV3UmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UmFmZmxlOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxOTAtMjAzCiAgICAvLyBuZXdSYWZmbGUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpY2tldEFzc2V0OiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBtaW5UaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1heFRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBuYW1lOiBzdHJpbmcsCiAgICAvLyAgIHByb29mOiBQcm9vZiwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxieXRlc1szMl0+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjA2CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCm5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+IDAsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZGlnIDExCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBidXJ5IDE1CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjA5CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwOQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgYnVyeSAxOAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDExCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGJ1cnkgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDE4CiAgICAvLyBsZXQgY3JlYXRvclJveWFsdHk6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyMAogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIGRpZyAxCiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjEKICAgIC8vIHJldHVybiBDcmVhdG9yUm95YWx0eURlZmF1bHQKICAgIHB1c2hpbnQgNTAwMAogICAgYnVyeSAxNQoKbmV3UmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjEyCiAgICAvLyBmYWxzZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMTEtMjI0CiAgICAvLyBjb25zdCByYWZmbGVBcHAgPSB0aGlzLmNyZWF0ZUNoaWxkQXBwKAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICBtaW5UaWNrZXRzLAogICAgLy8gICBtYXhUaWNrZXRzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50CiAgICAvLyApCiAgICBkaWcgMTMKICAgIGRpZyAxNwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkaWcgMTQKICAgIGRpZyAxNAogICAgZGlnIDE0CiAgICBkaWcgMjEKICAgIGRpZyAxNQogICAgZGlnIDE1CiAgICBkaWcgMTUKICAgIGRpZyAxNQogICAgZGlnIDEyCiAgICBjYWxsc3ViIGNyZWF0ZUNoaWxkQXBwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMjktMjM4CiAgICAvLyByYWZmbGUuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiByYWZmbGVBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMzMKICAgIC8vIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjM0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIzMi0yMzUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIyOS0yMzgKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjM2CiAgICAvLyBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIyOS0yMzgKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTEgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNDEtMjQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNDMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgMTUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjQxLTI0NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjQxLTI0NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE5MC0yMDMKICAgIC8vIG5ld1JhZmZsZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjUtNDM1CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZmllZFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjgKICAgIC8vIGFzc2V0LmNyZWF0b3IsCiAgICBkaWcgMTUKICAgIGR1cAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDMwCiAgICAvLyBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICBzd2FwCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzIKICAgIC8vIDEsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZGlnIDE5CiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNS00MzUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgwY2YxYjljZiAvLyBtZXRob2QgInZlcmlmaWVkUmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDMzCiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNS00MzUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGJ1cnkgMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM3CiAgICAvLyBpZiAoQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogbmV3UmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM4CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IGJ0b2koQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpKQogICAgZGlnIDE3CiAgICBidG9pCiAgICBidXJ5IDE1CgpuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQxCiAgICAvLyBpZiAoY3JlYXRvclJveWFsdHkgPiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUpIHsKICAgIGRpZyAxNAogICAgaW50YyA2IC8vIDUwMDAwCiAgICA+CiAgICBieiBuZXdSYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyCiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDYgLy8gNTAwMDAKICAgIGJ1cnkgMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwOQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBiIG5ld1JhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5Lm5ld1ByaXplQm94UmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UHJpemVCb3hSYWZmbGU6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI1Mi0yNjMKICAgIC8vIG5ld1ByaXplQm94UmFmZmxlKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjY1CiAgICAvLyBsb2dnZWRBc3NlcnQocHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpLCBFUlJfQkFEX01FVEhPRF9QUklaRV9CT1hfVFJBTlNGRVJfTkVFREVEKQogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyAxMiAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgID09CiAgICBibnogbmV3UHJpemVCb3hSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkJNUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Qk1QVAoKbmV3UHJpemVCb3hSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjYKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjYKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEwCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5CiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgRVJSX05PVF9BX1BSSVpFX0JPWCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0OQogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIEVSUl9OT1RfQV9QUklaRV9CT1gpCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBOQVBCCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1MAogICAgLy8gY29uc3QgW293bmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMocHJpemVCb3gsIEJ5dGVzKFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lcikpCiAgICBwdXNoYnl0ZXMgIm93bmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjY2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3UHJpemVCb3hSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOk5QQk8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBCTwoKbmV3UHJpemVCb3hSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjkKICAgIC8vIHRydWUsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjY4LTI4MQogICAgLy8gY29uc3QgcmFmZmxlQXBwID0gdGhpcy5jcmVhdGVDaGlsZEFwcCgKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgIDAsCiAgICAvLyAgIG1pblRpY2tldHMsCiAgICAvLyAgIG1heFRpY2tldHMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQKICAgIC8vICkKICAgIGRpZyA5CiAgICBkaWcgMTIKICAgIGR1cAogICAgY292ZXIgMwogICAgZGlnIDExCiAgICBkaWcgMTEKICAgIGRpZyAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6Mjc1CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI2OC0yODEKICAgIC8vIGNvbnN0IHJhZmZsZUFwcCA9IHRoaXMuY3JlYXRlQ2hpbGRBcHAoCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgIHRpY2tldEFzc2V0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAwLAogICAgLy8gICBtaW5UaWNrZXRzLAogICAgLy8gICBtYXhUaWNrZXRzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50CiAgICAvLyApCiAgICBkaWcgMTIKICAgIGRpZyAxMgogICAgZGlnIDEyCiAgICBkaWcgMTIKICAgIGRpZyAxMgogICAgY2FsbHN1YiBjcmVhdGVDaGlsZEFwcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjgzLTI4NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLAogICAgLy8gICBhcmdzOiBbcmFmZmxlQXBwLmFkZHJlc3NdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4NQogICAgLy8gYXJnczogW3JhZmZsZUFwcC5hZGRyZXNzXSwKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4My0yODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW3JhZmZsZUFwcC5hZGRyZXNzXSwKICAgIC8vIH0pCiAgICBieXRlYyAxMiAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI1Mi0yNjMKICAgIC8vIG5ld1ByaXplQm94UmFmZmxlKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmRlbGV0ZVJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVJhZmZsZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5MQogICAgLy8gZGVsZXRlUmFmZmxlKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTIKICAgIC8vIGxvZ2dlZEFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9BX1JBRkZMRSkKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZVJhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6TlJBRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUkFGCgpkZWxldGVSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1NQogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBkdXBuIDIKICAgIHB1c2hieXRlcyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6Mjk1CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6Mjk4CiAgICAvLyByYWZmbGUuY2FsbC5kZWxldGVBcHBsaWNhdGlvbih7IGFwcElkIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MjQ4N2MzMmMgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzAwLTMwMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzAwLTMwMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMwMC0zMDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5MQogICAgLy8gZGVsZXRlUmFmZmxlKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQzCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NAogICAgLy8gaWYgKCF0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA0IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NgogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmNyZWF0ZSh7IHNpemUgfSkKICAgIGRpZyAxCiAgICBib3hfY3JlYXRlCiAgICBwb3AKCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDQgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ5CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVzaXplKHNpemUpCiAgICBkaWcgMQogICAgYm94X3Jlc2l6ZQogICAgYiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmxvYWRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbG9hZEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NAogICAgLy8gY29uc3QgZXhwZWN0ZWRQcmV2aW91c0NhbGxzOiB1aW50NjQgPSBvZmZzZXQgLyAyMDMyCiAgICBwdXNoaW50IDIwMzIKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU1CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4IC0gZXhwZWN0ZWRQcmV2aW91c0NhbGxzIC0gMSkKICAgIHR4biBHcm91cEluZGV4CiAgICBzd2FwCiAgICAtCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NwogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU4CiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgZHVwCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU5CiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgZHVwCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MAogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBkdXAKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjEKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDcgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTYtNjMKICAgIC8vIGxvZ2dlZEFzc2VydCgoCiAgICAvLyAgIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAgICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAgICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAgICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gICAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICAgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgLy8gKSwgRVJSX0lOVkFMSURfQ0FMTF9PUkRFUikKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOklDT1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUNPUgoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDEzIC8vICJFUlI6Q05TVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDTlNUCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjUKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIGRpZyAzCiAgICBkaWcgMwogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuZGVsZXRlQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MAogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY4CiAgICAvLyBkZWxldGVCb3hlZENvbnRyYWN0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk0CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NgogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTYKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBkaWcgMwogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICBkaWcgMwogICAgKwogICAgKgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDItMjA4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gaWYgKGNvdW50ID4gMCAmJiBlc2Nyb3cubmFtZSAhPT0gJycpIHsKICAgIGR1cAogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICBkaWcgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgMTQgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExOAogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgYnVyeSAxMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMQogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBidXJ5IDExCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgYnVyeSAxMwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHhhMjQwM2RkZiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDkKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgRVJSX0VTQ1JPV19ET0VTX05PVF9FWElTVCkKICAgIGV4dHJhY3QgNiA5CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA5CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjpORVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBkaWcgMQogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgZGlnIDgKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjpXRVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldFU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMwCiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMQogICAgLy8gW10KICAgIHB1c2hieXRlcyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM2CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM2CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNwogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZGlnIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM1LTEzOQogICAgLy8gY29uc3Qgb3B0SW5Db3VudCA9IHNwbGl0T3B0SW5Db3VudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldAogICAgLy8gKQogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgNAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0MQogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OS0xNTIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHdhbGxldCwKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDgKICAgIC8vIFthc3NldC5pZF0sCiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMTQgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVVQRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJVVBHCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmNyZWF0ZUNoaWxkQXBwKGlzUHJpemVCb3g6IHVpbnQ2NCwgcGF5bWVudDogdWludDY0LCBwcml6ZUlEOiB1aW50NjQsIHRpY2tldEFzc2V0OiB1aW50NjQsIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsIGVuZFRpbWVzdGFtcDogdWludDY0LCBjcmVhdG9yUm95YWx0eTogdWludDY0LCBtaW5UaWNrZXRzOiB1aW50NjQsIG1heFRpY2tldHM6IHVpbnQ2NCwgZ2F0ZUlEOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNyZWF0ZUNoaWxkQXBwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzktNTIKICAgIC8vIHByaXZhdGUgY3JlYXRlQ2hpbGRBcHAoCiAgICAvLyAgIGlzUHJpemVCb3g6IGJvb2xlYW4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcHJpemVJRDogdWludDY0LCAvLyBBc3NldCBvciBQcml6ZSBCb3ggQXBwbGljYXRpb24KICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JSb3lhbHR5OiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogQXBwbGljYXRpb24gewogICAgcHJvdG8gMTIgMQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAxMyAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo1NQogICAgLy8gbGV0IG9wdGluTUJSOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gY29uc3QgaXNBbGdvT3JQcml6ZUJveCA9IHByaXplSUQgPT09IDAgfHwgaXNQcml6ZUJveAogICAgZnJhbWVfZGlnIC0xMAogICAgIQogICAgZnJhbWVfZGlnIC0xMgogICAgfHwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjU4CiAgICAvLyBpZiAoIWlzQWxnb09yUHJpemVCb3gpIHsKICAgIGJueiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjU5CiAgICAvLyBvcHRpbk1CUiA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9idXJ5IDMKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjYzCiAgICAvLyBpZiAoIWlzQWxnb1RpY2tldCkgewogICAgZnJhbWVfZGlnIC05CiAgICBieiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY0CiAgICAvLyBvcHRpbk1CUiArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAzCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIGZyYW1lX2J1cnkgMwoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzUKICAgIC8vIGlmICghaXNQcml6ZUJveCkgewogICAgZnJhbWVfZGlnIC0xMgogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzYKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUlEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzYKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUlEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMTAKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjcwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc2CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVJRCkKICAgICsKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzcKICAgIC8vIGlmIChpc0FsZ29UaWNrZXQpIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2Vsc2VfYm9keUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3OAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkKICAgIGZyYW1lX2RpZyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2NzAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzgKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCiAgICBmcmFtZV9idXJ5IDIKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4OAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgZnJhbWVfZGlnIDIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg5CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTMxMTMzMDAKICAgICoKICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MAogICAgLy8gY29uc3QgZmVlcyA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjkwCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBwdXNoYnl0ZXMgIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OTUKICAgIC8vIGZlZXMucmFmZmxlQ3JlYXRpb25GZWUgKwogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5NS05OAogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiByYWZmbGUuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiByYWZmbGUuZ2xvYmFsQnl0ZXMpICsKICAgIHB1c2hpbnQgMTQ0ODUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OTUtOTkKICAgIC8vIGZlZXMucmFmZmxlQ3JlYXRpb25GZWUgKwogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcmFmZmxlLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogcmFmZmxlLmdsb2JhbEJ5dGVzKSArCiAgICAvLyBjaGlsZEFwcE1CUiArCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5NS0xMDAKICAgIC8vIGZlZXMucmFmZmxlQ3JlYXRpb25GZWUgKwogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcmFmZmxlLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogcmFmZmxlLmdsb2JhbEJ5dGVzKSArCiAgICAvLyBjaGlsZEFwcE1CUiArCiAgICAvLyB3ZWlnaHRzTUJSCiAgICArCiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMTUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtMTEKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIDUKICAgID09CiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAxNSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTA2LTExMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEwOAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTA4CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMDYtMTEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZXMucmFmZmxlQ3JlYXRpb25GZWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMDYtMTExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZXMucmFmZmxlQ3JlYXRpb25GZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTQKICAgIC8vIGNvbnN0IGFwcHJvdmFsU2l6ZSA9IHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyBjb25zdCBjaHVuazEgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCgwLCA0MDk2KQogICAgaW50Y18wIC8vIDAKICAgIGludGMgNSAvLyA0MDk2CiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE2CiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgc3dhcAogICAgaW50YyA1IC8vIDQwOTYKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTYKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBpbnRjIDUgLy8gNDA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE4LTEzOQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMywKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8gcHJpemVJRCwKICAgIGZyYW1lX2RpZyAtMTAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyMgogICAgLy8gaXNQcml6ZUJveCwKICAgIHB1c2hieXRlcyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xMgogICAgc2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjMKICAgIC8vIHRpY2tldEFzc2V0LAogICAgZnJhbWVfZGlnIC05CiAgICBpdG9iCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI0CiAgICAvLyBzdGFydFRpbWVzdGFtcCwKICAgIGZyYW1lX2RpZyAtOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI1CiAgICAvLyBlbmRUaW1lc3RhbXAsCiAgICBmcmFtZV9kaWcgLTcKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyNgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyNwogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjgKICAgIC8vIGNyZWF0b3JSb3lhbHR5LAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjkKICAgIC8vIG1pblRpY2tldHMsCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMAogICAgLy8gbWF4VGlja2V0cywKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTMxCiAgICAvLyBnYXRlSUQsCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MgogICAgLy8gY29uc3QgcmFmZmxlID0gY29tcGlsZUFyYzQoUmFmZmxlKQogICAgcHVzaGludCA5CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyMQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTgtMTM5CiAgICAvLyBjb25zdCBhcHBJZCA9IHJhZmZsZS5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplSUQsCiAgICAvLyAgICAgICBpc1ByaXplQm94LAogICAgLy8gICAgICAgdGlja2V0QXNzZXQsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIG1pblRpY2tldHMsCiAgICAvLyAgICAgICBtYXhUaWNrZXRzLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzgKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzLAogICAgcHVzaGludCAzCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MgogICAgLy8gY29uc3QgcmFmZmxlID0gY29tcGlsZUFyYzQoUmFmZmxlKQogICAgcHVzaGJ5dGVzIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAxMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAxMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE4LTEzOQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMywKICAgIC8vICAgfSkKICAgIHB1c2hieXRlcyAweDNhMjMyNzE1IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE4LTE0MQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMywKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDQtMTQ5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ2CiAgICAvLyByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0NwogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAyCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ0LTE0OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ0LTE0OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTEKICAgIC8vIGlmICghaXNBbGdvVGlja2V0KSB7CiAgICBmcmFtZV9kaWcgLTkKICAgIGJ6IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1Mi0xNjEKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aWNrZXRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTYKICAgIC8vIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTU3CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1NS0xNTgKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTUyLTE2MQogICAgLy8gcmFmZmxlLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpY2tldEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDExIC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNjQtMTczCiAgICAvLyByYWZmbGUuY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNjgKICAgIC8vIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDYKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNjctMTcwCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNjQtMTczCiAgICAvLyByYWZmbGUuY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE3MQogICAgLy8gd2VpZ2h0c0xpc3RDb3VudCwKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY0LTE3MwogICAgLy8gcmFmZmxlLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHhiZDcxNDhkMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTc1CiAgICAvLyByZXR1cm4gYXBwSWQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjcmVhdGVDaGlsZEFwcF9lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjgwCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRpY2tldEFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtOQogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIHB1c2hpbnQgMzM1MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRpY2tldEFzc2V0KQogICAgKwogICAgZnJhbWVfZGlnIDIKICAgICsKICAgIGZyYW1lX2J1cnkgMgogICAgYiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDE1CgpjcmVhdGVDaGlsZEFwcF9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4MgogICAgLy8gfSBlbHNlIGlmIChpc0FsZ29UaWNrZXQpIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2Vsc2VfYm9keUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjcwMDAKICAgIGZyYW1lX2J1cnkgMgogICAgYiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDE1CgpjcmVhdGVDaGlsZEFwcF9lbHNlX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4NQogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4NQogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC05CiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAyNjgwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgICsKICAgIGZyYW1lX2J1cnkgMgogICAgYiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDE1Cg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIAriLBIAg0IYDJhAJYWtpdGFfZGFvAmJjBndhbGxldAxha2l0YV9lc2Nyb3cIRVJSOk5EQU8EFR98dQNhYWwExTsyzAd2ZXJzaW9uFmNoaWxkX2NvbnRyYWN0X3ZlcnNpb24IRVJSOklYRlIEPqEYMgSt+SrkCEVSUjpDTlNUA3BhbAhFUlI6SVBBWYAE6pGA3TYaAI4BAJUxGRREMRhBAH6CAwQYWE8gBDtyO4EEkd08dScHgggE3KLYYgTTRrGkBDlOrrIEM/eICASuhMvYBDPpLJQEhU3t4ATZo1+kNhoAjgwA4wKJA3wD1gQpBKkEwgaWBsAHPgAiAAEAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABIEVNig2GgCOAQBbADEZgQQSMRgQREIGuIoCAYv/QQAXi/4nBmVIJFtyCESL/3AARQFAAAMyEIkiiYoDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiTYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIANhoDSRUkEkQXNhoESRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJwhPBGcnCU8DZyhPAmcrTGcjQyKAAEcDMRYlCUk4ECMSRDEWIwlHAjgQgQQSRDYaAUkVJBJEF0w2GgJJFSQSRBdMNhoDSRUkEkQXTDYaBEkVJBJEF0w2GgVJFSQSRBdMNhoGSRUkEkQXTDYaB0lOAhWBIBJENhoISU4CSSJZJQhMFRJENhoJSU4CSSJZSU4DgSALJQhMFRJENhoKSRUkEkQXTDgUMgoSQAAEJwqwAEsLOBJJRQ9AAAQnCrAAIihlTEUSREsLOBFFECJFD0sBQABrgYgnRQ8iSw1LEUlOA0sOSw5LDksVSw9LD0sPSw9LDIgFnbFJcghEMhCyCLIHI7IQIrIBtksBFiKyGUsBshgnC7IashqBBrIQIrIBs7FJcghETwKyEUsPshKyFIEEshAisgGzFicFTFCwI0OxSw9JcQtETBYBASMWSxMnBmVIgUhbshiABAzxuc+yGk8CshpLBbIaTLIaSwOyGrIagAkAB3JveWFsdHmyGoEGshAisgGztD5JVwQASwFXAAQnBRJESSJZJQhMFRJEVwYASUUTFUEABUsRF0UPSw4hBg1B/yUhBkUPQv8egAAxFiUJRwI4EIEGEkQxFiMJSU4COBAjEkQ2GgFJFSQSRBdMNhoCSRUkEkQXTDYaA0kVJBJEF0w2GgRJFSQSRBdMNhoFSRUkEkQXTDYaBkkVJBJEF0w2GgdJTgIVgSASRDYaCEkVJBJEF0wiwhonDBJAAAyACEVSUjpCTVBUsAAiKGVESwo4GElFDUlyB0RPAicGZUiBGFtyCEQSRIAFb3duZXJlSDIKEkAADIAIRVJSOk5QQk+wACNLCUsMSU4DSwtLC0sLIksMSwxLDEsMSwyIBASxSXIIRE8CshgnDLIashqBBrIQIrIBsxYnBUxQsCNDNhoBSRUkEkQXSXIHRDIKEkAADIAIRVJSOk5SQUawAEcCgAZmdW5kZXJlSElXACBMgSBbsYEFshlPArIYgAQkh8MsshqBBrIQIrIBs7GyCLIHI7IQIrIBsyNDNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEF0wnCUxnKb1FAUAAEzEAMgkSQAAEJwSwAClLAblII0MxACIoZUQqZUhyCEQSQAAEJwSwAClLAdNC/+M2GgFJFSQSRBdJNhoCSSJZJQhLARUSRFcCAEyB8A8KMRZMCSMJSTgQgQYSQQBOSTgYMggSQQBFSTgbgQMSQQA8STgZQAA2SSLCGicHEkEALEk4ADEAEkEAIyNAAAyACEVSUjpJQ09SsAApvUUBQAAEJw2wAClLA0sDuyNDIkL/2jEAIihlRCplSHIIRBJAAAQnBLAAKbxII0MiRwKAAEcDMRYjCUcCOBAjEkQ2GgFJFSQSRBdJTgIiK2VMSU4CTgREIihlREwlW3IIRE8CiPtmTDgHMgoSQAAMgAhFUlI6SVBNUrAASwM4CDIQI0sDCAsSQAAMgAhFUlI6SVBNQbAAsTIKSwOyESKyErIUgQSyECKyAbNJQQFTSwFJIllLARVSVwIAgAATQQFBIihlREkqZUhFBkknDmVISVcICEUMJFtFCCIrZUxJTgJFBURJIllLARVSSUULVwIATCplSEyxIxZFDUkVFlcGAkxQgAQAAQACTFBMshiABKJAPd+yGrIagQayECKyAbO0PklXBABLAVcABCcFEkRJIlmBCQslCEwVEkRXBgkiW0lFCUAADIAIRVJSOk5FU0OwAEsBJVtJRQdLCBJAAAyACEVSUjpXRVNDsACxSwRJshiABFrfM4+yGksKshpLC7IaSwmyGoAKAAEAAAAAAAAAALIagAIAALIagQayECKyASIoZURLB0lOAnIIREsGSU4EiPoZMhALtkxyCESyB7III7IQIrIBtksBFkwWgAIAAUxQSwmyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVEIitlRCVbcghETwKI+a4yECNPAggLFicFTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEKmVIcghEEkAABCcEsAArSwFnI0M2GgFJIlklCEsBFRJEVwIAMQAiKGVEKmVIcghEEkAABCcEsAAiKGVEJw5lSIEQWzINEkAADIAIRVJSOklVUEewACcISwFnI0M2GgFJFSQSRBcxACIoZUQqZUhyCEQSQAAEJwSwAChLAWcjQ4oMASKAAEcFKb1FAUAABCcNsAAijAOL9hSL9BFAAAQyEIwDi/dBAAeLAzIQCIwDi/RAAbkiKGVEi/aI+KAhBAiMAov3QAGQiwIhBAiMAjIBiwMIiwIIi/+B1K+gBgtJTgKMBiIoZUSACG5mdF9mZWVzZUiBWFtJjASBtLRYCAgIjAWL9TgHMgoSQAAEJw+wAIv1OAiLBRJAAAQnD7AAsSIrZURJJVtyCESLBLIIsgcjshAisgGzKb1EKSIhBbpMIQUJKSEFTwK6sYv2FoABACKL9FSL9xZJjACL+BaL+RYxAIv1OACLBRZQi/oWi/sWi/wWi/0WIihlRBaBCbI1gRWyNCKyGYEDsjiABAuBAUOyQk8NskBPDLJAgAQ6IycVshpPC7IaTwqyGk8JshpPCLIaTweyGk8GshpPBbIaTwSyGk8DshpPArIaTLIai/6yGrIashqBBrIQIrIBs7cAPUmMAbFyCEQyAYsCCLIIsgcjshAisgGzi/dBACmxiwFJcghEMhCyCLIHI7IQIrIBtiKyGbIYJwuyGosAshqBBrIQIrIBs7GLAUlyCESLBrIIsgcjshAisgG2i/8WIrIZSwGyGIAEvXFI0LIashqBBrIQIrIBs4wAiSIoZUSL94j2/YGYuRQIiwIIjAJC/mGL90AAByEEjAJC/lUiKGVEi/eI9tuB4K0QCIwCQv5C", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Constructs a no op call for the newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newRaffle(params) {
    return {
      ...params,
      method: "newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.ticketAsset, params.args.startTimestamp, params.args.endTimestamp, params.args.minTickets, params.args.maxTickets, params.args.gateId, params.args.marketplace, params.args.name, params.args.proof, params.args.weightsListCount]
    };
  }
  /**
   * Constructs a no op call for the newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPrizeBoxRaffle(params) {
    return {
      ...params,
      method: "newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.ticketAsset, params.args.startTimestamp, params.args.endTimestamp, params.args.minTickets, params.args.maxTickets, params.args.gateId, params.args.marketplace, params.args.weightsListCount]
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
     * Makes a call to the RaffleFactory smart contract using the `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newRaffle: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.newRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
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
     * Makes a call to the RaffleFactory smart contract using the `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newRaffle: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.newRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
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
     * Makes a call to the RaffleFactory smart contract using the `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newRaffle: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.newRaffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _RaffleFactoryClient(this.appClient.clone(params));
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
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64 method call against the RaffleFactory contract
       */
      newRaffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newRaffle(params)));
        return this;
      },
      /**
       * Add a newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the RaffleFactory contract
       */
      newPrizeBoxRaffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPrizeBoxRaffle(params)));
        return this;
      },
      /**
       * Add a deleteRaffle(uint64)void method call against the RaffleFactory contract
       */
      deleteRaffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteRaffle(params)));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the RaffleFactory contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the RaffleFactory contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the RaffleFactory contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the RaffleFactory contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the RaffleFactory contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the RaffleFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the RaffleFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the RaffleFactory contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64) method call against the RaffleFactory contract
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

// src/raffle/factory.ts
var RaffleFactorySDK = class extends _chunkOPF2XL3Kjs.BaseSDK {
  constructor(params) {
    super({ factory: RaffleFactoryFactory, ...params }, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID);
  }
  /**
   * Creates a new raffle and returns a RaffleSDK instance.
   * Use `isPrizeBox: true` with `prizeBoxId` for PrizeBox prizes,
   * or omit/set `isPrizeBox: false` with `prizeAsset` and `prizeAmount` for ASA prizes.
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
    gateId,
    marketplace,
    weightsListCount,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const isAlgoTicket = BigInt(ticketAsset) === 0n;
    const prizeId = isPrizeBox ? 0n : BigInt(rest.prizeAsset);
    const [prizeRewardsOptInCost, ticketRewardsOptInCost] = await Promise.all([
      this.getRewardsOptInCost(prizeId),
      this.getRewardsOptInCost(BigInt(ticketAsset))
    ]);
    const cost = this.cost({ isPrizeBox, isAlgoTicket, weightsListCount, prizeRewardsOptInCost, ticketRewardsOptInCost });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    const needsOpUp = BigInt(weightsListCount) > 0n;
    let appId;
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new (0, _chunkEY3JLM56js.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
      if (needsOpUp) {
        const group = this.client.newGroup();
        group.newPrizeBoxRaffle({
          ...sendParams,
          args: {
            prizeBoxTransferTxn,
            payment,
            ticketAsset,
            startTimestamp,
            endTimestamp,
            minTickets,
            maxTickets,
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
            gateId,
            marketplace,
            weightsListCount
          }
        }));
      }
    } else {
      const { prizeAsset, prizeAmount, name, proof } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset),
        receiver: this.client.appAddress
      });
      if (needsOpUp) {
        const group = this.client.newGroup();
        group.newRaffle({
          ...sendParams,
          args: {
            payment,
            assetXfer,
            ticketAsset,
            startTimestamp,
            endTimestamp,
            minTickets,
            maxTickets,
            gateId,
            marketplace,
            name,
            proof,
            weightsListCount
          }
        });
        for (let i = 0; i < 10; i++) {
          group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
        }
        const result = await group.send(sendParams);
        appId = result.returns[0];
      } else {
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
            gateId,
            marketplace,
            name,
            proof,
            weightsListCount
          }
        }));
      }
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
   * Checks if the rewards app is already opted into the given asset.
   * Returns 0n if opted in (no cost needed), 100_000n if not.
   */
  async getRewardsOptInCost(assetId) {
    const asset = BigInt(assetId);
    if (asset === 0n) return 0n;
    try {
      const akitaDaoAppId = await this.client.state.global.akitaDao();
      if (!akitaDaoAppId) return 100000n;
      const algod = this.algorand.client.algod;
      const daoApp = await algod.applicationById(akitaDaoAppId);
      const globalState = daoApp.params.globalState;
      if (!globalState) return 100000n;
      const aalKey = new TextEncoder().encode("aal");
      const aalEntry = globalState.find(
        (kv) => kv.key.length === aalKey.length && kv.key.every((b, i) => b === aalKey[i])
      );
      if (!aalEntry || aalEntry.value.type !== 1) return 100000n;
      const aalBytes = aalEntry.value.bytes;
      if (aalBytes.length < 16) return 100000n;
      const view = new DataView(aalBytes.buffer, aalBytes.byteOffset, aalBytes.byteLength);
      const rewardsAppId = view.getBigUint64(8);
      if (rewardsAppId === 0n) return 100000n;
      const rewardsAddress = _algosdk2.default.getApplicationAddress(rewardsAppId).toString();
      const response = await algod.accountAssetInformation(rewardsAddress, asset);
      return response.assetHolding ? 0n : 100000n;
    } catch (e) {
      return 100000n;
    }
  }
  /**
   * Gets the cost to create a new raffle.
   * @param isPrizeBox - Whether the prize is a PrizeBox
   * @param isAlgoTicket - Whether tickets are paid in ALGO (ticketAsset === 0)
   * @param weightsListCount - Number of weights boxes
   * @param raffleCreationFee - Optional: the raffle creation fee from the DAO (default: 10 ALGO)
   * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
   * @param ticketRewardsOptInCost - Rewards app opt-in cost for the ticket asset (default: 100,000, pass 0 if already opted in)
   */
  cost({ isPrizeBox = false, isAlgoTicket = true, weightsListCount = 1n, raffleCreationFee = 10000000n, prizeRewardsOptInCost = 100000n, ticketRewardsOptInCost = 100000n } = {}) {
    const baseCost = 1448500n;
    const minBalance = 100000n;
    const assetOptInMinBalance = 100000n;
    const weightsMbr = 13113300n;
    const perDisbursement = 67000n;
    let optinMbr = 0n;
    if (!isPrizeBox) {
      optinMbr += assetOptInMinBalance;
    }
    if (!isAlgoTicket) {
      optinMbr += assetOptInMinBalance;
    }
    let disbursementMbr = 0n;
    if (!isPrizeBox) {
      disbursementMbr += perDisbursement + prizeRewardsOptInCost;
      if (isAlgoTicket) {
        disbursementMbr += perDisbursement;
      } else {
        disbursementMbr += perDisbursement * 5n + ticketRewardsOptInCost;
      }
    } else if (isAlgoTicket) {
      disbursementMbr = perDisbursement;
    } else {
      disbursementMbr = perDisbursement * 4n + ticketRewardsOptInCost;
    }
    const childAppMbr = minBalance + optinMbr + disbursementMbr;
    const weightsMbrTotal = BigInt(weightsListCount) * weightsMbr;
    return raffleCreationFee + baseCost + childAppMbr + weightsMbrTotal;
  }
  /**
   * Opts the raffle factory into an asset so it can receive/forward that
   * asset as a rewards referral or prize. When the factory has a named DAO
   * escrow configured, this also eagerly opts the escrow + every revenue-
   * split escrow in via the revenue-manager plugin, so downstream raffle
   * creations/entries don't have to do the rekey dance mid-group.
   *
   * Worst case touches ~10 foreign refs (DAO, wallet, plugin, main escrow,
   * N split escrows, the asset). Since a single app call only holds 8
   * foreign-ref slots, we wrap the optIn in a 2-app-call group (optIn +
   * one opUp) so the resource populator has 16 slots to distribute refs
   * across.
   */
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
var CHUNK_SIZE = 4096n;
var RaffleSDK = class extends _chunkOPF2XL3Kjs.BaseSDK {
  constructor(params) {
    super({ factory: RaffleFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the raffle.
   */
  async state() {
    const { return: state } = await this.client.send.getState({ args: {} });
    if (state === void 0) {
      throw new Error("Failed to get raffle state");
    }
    return state;
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
    } catch (e2) {
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
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr();
    const mbrCost = mbrData.entries + mbrData.entriesByAddress;
    const group = this.client.newGroup();
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
      if (gateTxn) {
        group.gatedEnterAsa({
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
      if (gateTxn) {
        group.gatedEnter({
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
    for (let i = 0; i < 10; i++) {
      group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
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
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.client.newGroup();
    if (isAsa) {
      const { ticketAsset } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(ticketAsset),
        receiver: this.client.appAddress
      });
      if (gateTxn) {
        group.gatedAddAsa({
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
      if (gateTxn) {
        group.gatedAdd({
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
    for (let i = 0; i < 10; i++) {
      group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
    }
    await group.send(sendParams);
  }
  /**
   * Triggers the raffle to draw the winning ticket number.
   * Can only be called after the raffle has ended.
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







exports.RAFFLE_ERROR_MESSAGES = RAFFLE_ERROR_MESSAGES; exports.translateRaffleError = translateRaffleError; exports.RaffleFactorySDK = RaffleFactorySDK; exports.newRaffle = newRaffle; exports.RaffleSDK = RaffleSDK;
//# sourceMappingURL=chunk-DMGTVYYE.js.map
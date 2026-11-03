"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkEBWCKG2Cjs = require('./chunk-EBWCKG2C.js');


var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkKLHVDYDWjs = require('./chunk-KLHVDYDW.js');


var _chunkHFHM5QOFjs = require('./chunk-HFHM5QOF.js');

// src/raffle/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/RaffleClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Raffle", "structs": { "EntryData": [{ "name": "account", "type": "address" }, { "name": "marketplace", "type": "address" }], "FindWinnerCursors": [{ "name": "index", "type": "uint64" }, { "name": "amountIndex", "type": "uint64" }], "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "RaffleState": [{ "name": "ticketAsset", "type": "uint64" }, { "name": "startTimestamp", "type": "uint64" }, { "name": "endTimestamp", "type": "uint64" }, { "name": "seller", "type": "address" }, { "name": "minTickets", "type": "uint64" }, { "name": "maxTickets", "type": "uint64" }, { "name": "entryCount", "type": "uint64" }, { "name": "ticketCount", "type": "uint64" }, { "name": "winningTicket", "type": "uint64" }, { "name": "winner", "type": "address" }, { "name": "prize", "type": "uint64" }, { "name": "prizeClaimed", "type": "bool" }, { "name": "gateId", "type": "uint64" }, { "name": "vrfFailureCount", "type": "uint64" }, { "name": "entryId", "type": "uint64" }, { "name": "refundMbrCursor", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "enter", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnterAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "enterAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAdd", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "add", "args": [{ "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAddAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addAsa", "args": [{ "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getState", "args": [], "returns": { "type": "(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)", "struct": "RaffleState" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 21, "bytes": 9 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "ticketAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2Fzc2V0", "desc": "The asset required to enter the raffle" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "The start round of the raffle as a unix timestamp" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "The end time of the raffle as a unix timestamp" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "minTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluX3RpY2tldHM=", "desc": "The minimum number of tickets to use for the raffle" }, "maxTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWF4X3RpY2tldHM=", "desc": "The maximum number of tickets users can enter the raffle with" }, "entryCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfY291bnQ=", "desc": "The number of entries for the raffle" }, "ticketCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2NvdW50", "desc": "The number of tickets entered into the raffle" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "the winning ticket" }, "winner": { "keyType": "AVMString", "valueType": "address", "key": "d2lubmVy", "desc": "the winning address of the raffle" }, "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the prize for the raffle if prizeBox is true prize represents the app id of the prize box, otherwise the asset being raffled" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "Indicator for whether the prize has been claimed" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate to use for the raffle" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "the address of the creation side marketplace" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfcm95YWx0eQ==", "desc": "the minimum impact tax for the raffle" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "entryID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfaWQ=", "desc": "The id's of the raffle entries" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "the transaction id of the create application call for salting our VRF call" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called, used for VRF" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "entries": { "keyType": "uint64", "valueType": "EntryData", "desc": "The entries for the raffle", "prefix": "ZQ==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "entriesByAddress": { "keyType": "address", "valueType": "uint64", "desc": "The address map of entries for the raffle", "prefix": "YQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2378, 3683, 4021, 4029, 6067, 6244], "errorMessage": "Box must have value" }, { "pc": [1199, 1351, 1469, 2033, 3049, 4698], "errorMessage": "Bytes has valid prefix" }, { "pc": [5609, 5817], "errorMessage": "ERR:AENT" }, { "pc": [2317], "errorMessage": "ERR:ARFC" }, { "pc": [5594, 5802, 6045, 6222], "errorMessage": "ERR:BMGN" }, { "pc": [6060, 6237], "errorMessage": "ERR:EDNE" }, { "pc": [2632, 2730, 2815, 2880], "errorMessage": "ERR:FGTE" }, { "pc": [5486], "errorMessage": "ERR:FORB" }, { "pc": [1855], "errorMessage": "ERR:IAST" }, { "pc": [1896], "errorMessage": "ERR:IENR" }, { "pc": [2212, 2224, 5623, 5662, 5831, 5845, 6107, 6129], "errorMessage": "ERR:IPAY" }, { "pc": [5529], "errorMessage": "ERR:IPMA" }, { "pc": [5508], "errorMessage": "ERR:IPMR" }, { "pc": [3219, 3231], "errorMessage": "ERR:IRBD" }, { "pc": [3126], "errorMessage": "ERR:IRSD" }, { "pc": [5399], "errorMessage": "ERR:IUPG" }, { "pc": [5859, 5875, 5908, 6284, 6300, 6322], "errorMessage": "ERR:IXFR" }, { "pc": [2175], "errorMessage": "ERR:MALF" }, { "pc": [2194], "errorMessage": "ERR:MAMF" }, { "pc": [1820, 2157, 2517], "errorMessage": "ERR:MBFF" }, { "pc": [5326, 5370, 5442], "errorMessage": "ERR:NDAO" }, { "pc": [4732], "errorMessage": "ERR:NESC" }, { "pc": [2986], "errorMessage": "ERR:NETM" }, { "pc": [5562, 5770, 6013, 6190], "errorMessage": "ERR:NLIV" }, { "pc": [3469], "errorMessage": "ERR:NWTY" }, { "pc": [3788], "errorMessage": "ERR:PACL" }, { "pc": [2277, 2435, 2529], "errorMessage": "ERR:PNCL" }, { "pc": [2554], "errorMessage": "ERR:RFNC" }, { "pc": [2915, 3449], "errorMessage": "ERR:RHNE" }, { "pc": [2574], "errorMessage": "ERR:SHWB" }, { "pc": [5781, 6201], "errorMessage": "ERR:TAAL" }, { "pc": [5573, 6024], "errorMessage": "ERR:TANA" }, { "pc": [2935], "errorMessage": "ERR:WADR" }, { "pc": [3492], "errorMessage": "ERR:WAFD" }, { "pc": [4756], "errorMessage": "ERR:WESC" }, { "pc": [2292, 3768], "errorMessage": "ERR:WNFD" }, { "pc": [1544, 3860, 3908, 3948], "errorMessage": "IPCT" }, { "pc": [1101], "errorMessage": "NCCA" }, { "pc": [1134, 1220, 1240, 1252, 1262, 1373, 4102, 4270, 4293, 4818, 4867, 4947, 5318, 5362, 5434], "errorMessage": "application exists" }, { "pc": [1840, 4058, 4194, 4214, 4983], "errorMessage": "asset exists" }, { "pc": [1958, 1982, 1987, 2270, 2282, 2296, 2301, 2328, 2332, 2416, 2428, 2441, 2452, 2474, 2522, 2533, 2538, 2559, 2615, 2622, 2713, 2720, 2798, 2805, 2863, 2870, 2907, 2920, 2940, 2956, 2961, 2993, 3005, 3075, 3193, 3441, 3454, 3474, 3497, 3511, 3522, 3532, 3565, 3656, 3665, 3704, 3758, 3773, 3793, 3802, 3807, 3831, 3836, 3847, 3855, 3877, 3895, 3903, 3935, 3943, 3965, 4015, 4037, 4055, 4082, 4096, 4119, 4156, 4191, 4198, 4211, 4218, 4246, 4250, 4264, 4274, 4287, 4297, 4317, 4321, 4334, 4343, 4360, 4379, 4398, 4402, 4415, 4423, 4443, 4447, 4452, 4491, 4495, 4534, 4538, 4543, 4585, 4589, 4622, 4813, 4971, 4975, 4980, 5021, 5033, 5048, 5053, 5071, 5076, 5081, 5133, 5138, 5143, 5148, 5153, 5158, 5162, 5166, 5171, 5176, 5181, 5186, 5191, 5196, 5201, 5206, 5311, 5355, 5374, 5427, 5566, 5578, 5633, 5645, 5666, 5721, 5739, 5748, 5774, 5786, 5867, 5885, 5894, 5912, 5964, 5982, 5991, 6017, 6029, 6117, 6153, 6172, 6194, 6206, 6292, 6310, 6346, 6365, 6377, 6388], "errorMessage": "check GlobalState exists" }, { "pc": [5731, 5974, 6164, 6357], "errorMessage": "index access is out of bounds" }, { "pc": [3643, 5716, 5959, 6093, 6139, 6148, 6270, 6332, 6341], "errorMessage": "index out of bounds" }, { "pc": [1113, 1472, 1806, 3052, 4701, 4852, 5300, 5338], "errorMessage": "invalid array length header" }, { "pc": [1663], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [5346], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [4711], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1704, 1770, 2611, 2656, 2709, 2765], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1654, 1673, 1682, 1692, 1723, 1734, 1745, 1756, 1778, 2144, 2264, 3433, 5420, 5465], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1479, 3059], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1811, 5305], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1715], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1204, 1356, 2038], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1798, 5292], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1793, 5287], "errorMessage": "invalid tuple encoding" }, { "pc": [2588, 2673, 2782, 2847], "errorMessage": "transaction type is appl" }, { "pc": [2698, 2756, 2859, 2895], "errorMessage": "transaction type is axfer" }, { "pc": [2136, 2600, 2647, 2686, 2746, 2794, 2830, 5457], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCA0MDk2IDEwMDAwMCAxODQ0Njc0NDA3MzcwOTU1MTYxNSA1MDYwMCA2MzY0MTM2MjIzODQ2NzkzMDA1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSA0Mjk0OTY3Mjk1IDEzMTEzMzAwCiAgICBieXRlY2Jsb2NrICJ0aWNrZXRfYXNzZXQiICJha2l0YV9kYW8iICJlbnRyeV9jb3VudCIgInRpY2tldF9jb3VudCIgIndpbm5lciIgInByaXplIiAiZ2F0ZV9pZCIgIndfdG90YWxzIiAiYSIgMHgxNTFmN2M3NSAid2lubmluZ190aWNrZXQiICJ3ZWlnaHRzX2JveF9jb3VudCIgIkVSUjpJUEFZIiAicHJpemVfY2xhaW1lZCIgInJlZnVuZF9tYnJfY3Vyc29yIiAweDAwMDEgInNlbGxlciIgInciICJtYXhfdGlja2V0cyIgImFraXRhX2VzY3JvdyIgIkVSUjpJWEZSIiAidnJmX2ZhaWx1cmVfY291bnQiICJlbmRfdGltZXN0YW1wIiAibWFya2V0cGxhY2UiICJlIiAid2FsbGV0IiAicmFmZmxlX3JvdW5kIiAiY3JlYXRvcl9yb3lhbHR5IiAibWluX3RpY2tldHMiICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiICJmaW5kX3dpbm5lcl9jdXJzb3JzIiAiRVJSOkZHVEUiICJFUlI6TkxJViIgIkVSUjpCTUdOIiAiRVJSOk1CRkYiICJpc19wcml6ZV9ib3giICJzdGFydF90aW1lc3RhbXAiICJha2l0YV9yb3lhbHR5IiAiRVJSOlBOQ0wiICJFUlI6TkRBTyIgImVudHJ5X2lkIiAweDVjNTdmNmQ4IDB4MzhlNjI0MzMgMHhkYzUwYjM1NCAweDYzYmJiNzM1IDB4MDY4MTAxICJhYWwiICJvYWwiICJzYWx0IiAiRVJSOldORkQiICJFUlI6UkhORSIgMHgwMDAwICJFUlI6SVJCRCIgInBhbCIgIkVSUjpUQU5BIiAiRVJSOkFFTlQiICJFUlI6VEFBTCIgIkVSUjpFRE5FIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTMgLy8gInByaXplX2NsYWltZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIxIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUlEIH0pCiAgICBieXRlYyA0MCAvLyAiZW50cnlfaWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDExIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTQgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMjYgLy8gInJhZmZsZV9yb3VuZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTgtMTAzCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQmFzZVJhZmZsZSwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDI0ODdjMzJjIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIsIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0IG1haW5fdXBkYXRlX3JvdXRlQDUKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4LTEwMwogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMzAKICAgIHB1c2hieXRlc3MgMHhiZDcxNDhkMCAweGYyY2UyZjQ2IDB4MmM5NDI1MTQgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVmdW5kTUJSKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGVhcldlaWdodHNCb3hlcygpdWludDY0IgogICAgYnl0ZWMgNDEgLy8gbWV0aG9kICJnYXRlZEVudGVyKGFwcGwscGF5LGFkZHJlc3Mpdm9pZCIKICAgIHB1c2hieXRlcyAweDk2MjcxMmYxIC8vIG1ldGhvZCAiZW50ZXIocGF5LGFkZHJlc3Mpdm9pZCIKICAgIGJ5dGVjIDQyIC8vIG1ldGhvZCAiZ2F0ZWRFbnRlckFzYShhcHBsLHBheSxheGZlcixhZGRyZXNzKXZvaWQiCiAgICBwdXNoYnl0ZXMgMHg0M2E1M2U0ZSAvLyBtZXRob2QgImVudGVyQXNhKHBheSxheGZlcixhZGRyZXNzKXZvaWQiCiAgICBieXRlYyA0MyAvLyBtZXRob2QgImdhdGVkQWRkKGFwcGwscGF5KXZvaWQiCiAgICBwdXNoYnl0ZXMgMHg2YTZkOWI5ZiAvLyBtZXRob2QgImFkZChwYXkpdm9pZCIKICAgIGJ5dGVjIDQ0IC8vIG1ldGhvZCAiZ2F0ZWRBZGRBc2EoYXBwbCxheGZlcil2b2lkIgogICAgcHVzaGJ5dGVzcyAweGViMTY4MWI0IDB4Njk2NTAxZGUgMHhiZDFiMjdkMSAweDY1ZmNhOThiIDB4OGZhNGExNjAgMHg5ZTU3MjZmMSAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweGQ5YTM1ZmE0IDB4M2VhMTE4MzIgLy8gbWV0aG9kICJhZGRBc2EoYXhmZXIpdm9pZCIsIG1ldGhvZCAicmFmZmxlKCl2b2lkIiwgbWV0aG9kICJmaW5kV2lubmVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGFpbVJhZmZsZVByaXplKCl2b2lkIiwgbWV0aG9kICJpc0xpdmUoKWJvb2wiLCBtZXRob2QgImdldFN0YXRlKCkodWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGluaXQgcmVmdW5kTUJSIGNsZWFyV2VpZ2h0c0JveGVzIGdhdGVkRW50ZXIgZW50ZXIgZ2F0ZWRFbnRlckFzYSBlbnRlckFzYSBnYXRlZEFkZCBhZGQgZ2F0ZWRBZGRBc2EgYWRkQXNhIHJhZmZsZSBmaW5kV2lubmVyIGNsYWltUmFmZmxlUHJpemUgaXNMaXZlIGdldFN0YXRlIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAyNiBtYWluX21icl9yb3V0ZUAyNyBvcHRpbgogICAgZXJyCgptYWluX21icl9yb3V0ZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvYmFzZS50czo2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwN2JkNDAwMDAwMDAwMDBjODE3ZDQwMDAwMDAwMDAwMDA0OWQ0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4LTEwMwogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweDNhMjMyNzE1IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIGludGNfMyAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgZGVsZXRlQXBwbGljYXRpb24KCgovLyBfcHV5YV9saWIudXRpbC5lbnN1cmVfYnVkZ2V0KHJlcXVpcmVkX2J1ZGdldDogdWludDY0LCBmZWVfc291cmNlOiB1aW50NjQpIC0+IHZvaWQ6CmVuc3VyZV9idWRnZXQ6CiAgICBwcm90byAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxMAogICAgKwoKZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMToKICAgIGR1cAogICAgZ2xvYmFsIE9wY29kZUJ1ZGdldAogICAgPgogICAgYnogZW5zdXJlX2J1ZGdldF9hZnRlcl93aGlsZUA2CiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgYnl0ZWMgNDUgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtCiAgICBieXRlYyA0NSAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbQogICAgZnJhbWVfZGlnIC0xCiAgICBzd2l0Y2ggZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8wQDMgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8xQDQKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgaXR4bl9zdWJtaXQKICAgIGIgZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMQoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8xQDQ6CiAgICBnbG9iYWwgTWluVHhuRmVlCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgYiBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANQoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8wQDM6CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGIgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDUKCmVuc3VyZV9idWRnZXRfYWZ0ZXJfd2hpbGVANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6Ol9fcGNnMzJPdXRwdXQoc3RhdGU6IHVpbnQ2NCkgLT4gdWludDY0OgpfX3BjZzMyT3V0cHV0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyOQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIF9fcGNnMzJPdXRwdXQoc3RhdGU6IFBDRzMyU1RBVEUpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMwCiAgICAvLyBjb25zdCB4b3JzaGlmdGVkID0gX19tYXNrVG9VaW50MzIob3Auc2hyKG9wLnNocihzdGF0ZSwgMTgpIF4gc3RhdGUsIDI3KSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxOAogICAgc2hyCiAgICBmcmFtZV9kaWcgLTEKICAgIF4KICAgIHB1c2hpbnQgMjcKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOQogICAgLy8gcmV0dXJuIHZhbHVlICYgKG9wLnNobCgxLCAzMikgLSAxKQogICAgaW50YyAxMSAvLyA0Mjk0OTY3Mjk1CiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByb3QgPSBvcC5zaHIoc3RhdGUsIDU5KQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDU5CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIGR1cDIKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgc3dhcAogICAgfgogICAgaW50Y18xIC8vIDEKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgcHVzaGludCAzMQogICAgJgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBzaGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTEgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgfAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2F0ZUNoZWNrKGdhdGVUeG46IHVpbnQ2NCwgYWtpdGFEQU86IHVpbnQ2NCwgY2FsbGVyOiBieXRlcywgaWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpnYXRlQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdhdGVDaGVjayhnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjYWxsZXI6IEFjY291bnQsIGlkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA0NiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUwCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MAogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUxCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgaW50Y18zIC8vIDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTEKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTIKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDQzOTIyNjU1IC8vIG1ldGhvZCAibXVzdENoZWNrKGFkZHJlc3MsdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUyCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTMKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAtMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTQKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OC0yNTUKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCmdhdGVDaGVja19ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDgtMjU1CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Y3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogYnl0ZXMsIHN1bTogdWludDY0LCBjbG9zZU91dDogdWludDY0KSAtPiBieXRlcywgYnl0ZXM6CmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzNAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiBib29sZWFuKTogeyBpZDogdWludDY0LCBjb3N0OiB1aW50NjQgfSB7CiAgICBwcm90byA3IDIKICAgIHB1c2hieXRlcyAiIgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM1CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGZyYW1lX2RpZyAtNgogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAzCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzUKICAgIC8vIGFzc2VydChhc3NldCAhPT0gMCB8fCBjbG9zZU91dCA9PT0gZmFsc2UsIEVSUl9DQU5OT1RfQ0xPU0VfT1VUX09GX0FMR09fRk9SQklEREVOKQogICAgYXNzZXJ0IC8vIE5DQ0EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtNwogICAgYnl0ZWMgNDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM2CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM5CiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGZyYW1lX2RpZyAtMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNDE3MDAKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwCiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtNgogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQxLTU1MgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ2CiAgICAvLyBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICBkaWcgMgogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDQtNTQ3CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MS01NTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0OAogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0OQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQxLTU1MgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg3YjdkYzVmYyAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA5IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkzCiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU0CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC02CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDkKICAgIGRpZyAxCiAgICBjb3ZlciAyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2OQogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjgKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTc0CiAgICAvLyBpZiAoY2xvc2VPdXQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NQogICAgLy8gdHJhbnNmZXJUeG4uc2V0KHsgYXNzZXRDbG9zZVRvOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzIH0pCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKICAgIGZyYW1lX2J1cnkgMQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzgtNTkwCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgyCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODEtNTg0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4NQogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAwCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTcKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3OgogICAgZnJhbWVfZGlnIC02CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY4LTU3MgogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzgtNTkwCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODYKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODcKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3OC01OTAKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YWYxYTE0ZjIgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1NQogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU2LTU2NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjAKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2MQogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU5LTU2MgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU2LTU2NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2MwogICAgLy8gQXNzZXQoYXNzZXQpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTYtNTY1CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHgzOTRlYWViMiAvLyBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwNwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gMyAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA4CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU8sIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5CiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgNDcgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQKICAgIC8vIHJldHVybiBnZXRPdGhlckFwcExpc3QoYWtpdGFEQU8pLmVzY3JvdwogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTg2LTE4OQogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA5IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTEKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDExOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZGlnIDEKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTcKICAgIGJ1cnkgMQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxMgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgZHVwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE0CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxNwogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTgKICAgIC8vIHJlZmVycmFsRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIGR1cAogICAgcHVzaGludCA2MDQ4MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI2CiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgNAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAxNSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEtNjI5CiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyAtMgogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgZGlnIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIxLTYyOQogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzMQogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IChhbW91bnQgLSByZWZlcnJhbEZlZSksIHJlZmVycmFsTWJyIH0KICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM0CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogYW1vdW50LCByZWZlcnJhbE1icjogMCB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc1CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTgKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzMgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL21ici50czo6RnVuZGVySW5mbwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjpNQkZGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1CRkYKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNSAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyB0aGlzLnByaXplLnZhbHVlID0gcHJpemUKICAgIHVuY292ZXIgMTQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMzUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIHRoaXMuaXNQcml6ZUJveC52YWx1ZSA9IGlzUHJpemVCb3gKICAgIHVuY292ZXIgMTMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyBpZiAodGlja2V0QXNzZXQgIT09IDApIHsKICAgIGRpZyAxCiAgICBieiBjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjU1CiAgICAvLyBsb2dnZWRBc3NlcnQoQXNzZXQodGlja2V0QXNzZXQpLnRvdGFsID4gMCwgRVJSX0lOVkFMSURfQVNTRVQpCiAgICBkaWcgMQogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFRvdGFsCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBibnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgcHVzaGJ5dGVzICJFUlI6SUFTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVNUCgpjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIHRoaXMudGlja2V0QXNzZXQudmFsdWUgPSBBc3NldCh0aWNrZXRBc3NldCkKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzYgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTgKICAgIC8vIHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgPSBzdGFydFRpbWVzdGFtcAogICAgdW5jb3ZlciAxMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICYmIGVuZFRpbWVzdGFtcCA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9JTlZBTElEX0VORElOR19ST1VORCkKICAgIGRpZyAxCiAgICA8CiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUAxMAogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUAxMAogICAgaW50Y18xIC8vIDEKCmNyZWF0ZV9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICYmIGVuZFRpbWVzdGFtcCA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIEVSUl9JTlZBTElEX0VORElOR19ST1VORCkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBwdXNoYnl0ZXMgIkVSUjpJRU5SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklFTlIKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMjIgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9IGVuZFRpbWVzdGFtcAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTYgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICB1bmNvdmVyIDkKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvY2hpbGQudHM6MTEKICAgIC8vIGZ1bmRlciA9IEdsb2JhbFN0YXRlPEZ1bmRlckluZm8+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUZ1bmRlciB9KQogICAgcHVzaGJ5dGVzICJmdW5kZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyB0aGlzLmZ1bmRlci52YWx1ZSA9IGNsb25lKGZ1bmRlcikKICAgIHVuY292ZXIgOAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjcgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjMKICAgIC8vIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPSBjcmVhdG9yUm95YWx0eQogICAgdW5jb3ZlciA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gbWluVGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluVGlja2V0cyB9KQogICAgYnl0ZWMgMjggLy8gIm1pbl90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gdGhpcy5taW5UaWNrZXRzLnZhbHVlID0gbWluVGlja2V0cwogICAgdW5jb3ZlciA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMTggLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NQogICAgLy8gdGhpcy5tYXhUaWNrZXRzLnZhbHVlID0gbWF4VGlja2V0cwogICAgdW5jb3ZlciA1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gd2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmVyIH0pCiAgICBieXRlYyA0IC8vICJ3aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY2CiAgICAvLyB0aGlzLndpbm5lci52YWx1ZSA9IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyB0aGlzLmdhdGVJRC52YWx1ZSA9IGdhdGVJRAogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjMgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2OAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSA9IG1hcmtldHBsYWNlCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMTkgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzAKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8gY29uc3QgZmVlcyA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgcHVzaGJ5dGVzICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzQKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBmZWVzLnJhZmZsZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBkdXAKICAgIHB1c2hpbnQgMTEyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyOSAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3NAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGZlZXMucmFmZmxlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjc2CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3NgogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0VXNlckltcGFjdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3NgogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0VXNlckltcGFjdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNi0xMzkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuZ2V0VXNlckltcGFjdD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KGFraXRhREFPKS5pbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIHN3YXAKICAgIHB1c2hieXRlcyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzcKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM2LTEzOQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZDU3NGJiMTAgLy8gbWV0aG9kICJnZXRVc2VySW1wYWN0KGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlID0gaW1wYWN0UmFuZ2UoaW1wYWN0LCBmZWVzLnJhZmZsZVNhbGVJbXBhY3RUYXhNaW4sIGZlZXMucmFmZmxlU2FsZUltcGFjdFRheE1heCkKICAgIGRpZyAxCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgc3dhcAogICAgcHVzaGludCAxMDQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGNyZWF0ZV90ZXJuYXJ5X2ZhbHNlQDIwCiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICAtCgpjcmVhdGVfdGVybmFyeV9tZXJnZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMyCiAgICAvLyByZXR1cm4gbWF4IC0gKCgobWF4IC0gbWluKSAqIG1pbkltcGFjdCkgLyBJTVBBQ1RfRElWSVNPUikKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICAtCiAgICB1bmNvdmVyIDIKICAgICoKICAgIHB1c2hpbnQgMTAwMAogICAgLwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gYWtpdGFSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlBa2l0YVJveWFsdHkgfSkKICAgIGJ5dGVjIDM3IC8vICJha2l0YV9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3NwogICAgLy8gdGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPSBpbXBhY3RSYW5nZShpbXBhY3QsIGZlZXMucmFmZmxlU2FsZUltcGFjdFRheE1pbiwgZmVlcy5yYWZmbGVTYWxlSW1wYWN0VGF4TWF4KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzkKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlID0gbmV3IGFyYzQuU3RhdGljQXJyYXk8VWludDY0LCAxNT4oKQogICAgcHVzaGludCAxMjAKICAgIGJ6ZXJvCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNyAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZSA9IG5ldyBhcmM0LlN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+KCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDQ4IC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4MAogICAgLy8gdGhpcy5zYWx0LnZhbHVlID0gVHhuLnR4SWQKICAgIHR4biBUeElECiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmluZFdpbm5lcnNDdXJzb3IgfSkKICAgIGJ5dGVjIDMwIC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4MQogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsgaW5kZXg6IDAsIGFtb3VudEluZGV4OiAxIH0KICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzMgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNyZWF0ZV90ZXJuYXJ5X2ZhbHNlQDIwOgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyBjb25zdCBtaW5JbXBhY3Q6IHVpbnQ2NCA9IChpbXBhY3QgPiAxKSA/IGltcGFjdCAtIDEgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgYiBjcmVhdGVfdGVybmFyeV9tZXJnZUAyMQoKY3JlYXRlX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmluaXRbcm91dGluZ10oKSAtPiB2b2lkOgppbml0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gaW5pdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHdlaWdodExpc3RMZW5ndGg6IHVpbnQ2NCkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM0IC8vICJFUlI6TUJGRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQkZGCgppbml0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPj0gNCwgRVJSX01VU1RfQUxMT0NBVEVfQVRfTEVBU1RfRk9VUl9ISUdIRVNUX0JJRFNfQ0hVTktTKQogICAgZHVwCiAgICBpbnRjXzMgLy8gNAogICAgPj0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpNQUxGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1BTEYKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg3CiAgICAvLyBsb2dnZWRBc3NlcnQod2VpZ2h0TGlzdExlbmd0aCA8IDE2LCBFUlJfTVVTVF9BTExPQ0FURV9BVF9NT1NUX0ZJRlRFRU5fSElHSEVTVF9CSURTX0NIVU5LUykKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgPAogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOk1BTUYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUFNRgoKaW5pdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIGNvbnN0IHdlaWdodHNNQlI6IHVpbnQ2NCA9ICh3ZWlnaHRMaXN0TGVuZ3RoICogdGhpcy5tYnIoKS53ZWlnaHRzKQogICAgZHVwCiAgICBpbnRjIDEyIC8vIDEzMTEzMzAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDEyIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgppbml0X2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB3ZWlnaHRzTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDEyIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgppbml0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDExIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTYKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID0gd2VpZ2h0TGlzdExlbmd0aAogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKaW5pdF93aGlsZV90b3BAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBieiBpbml0X2FmdGVyX3doaWxlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTcgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTgKICAgIC8vIHRoaXMud2VpZ2h0cyhpKS5jcmVhdGUoKQogICAgcHVzaGludCAzMjc2OAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBpbml0X3doaWxlX3RvcEAxMgoKaW5pdF9hZnRlcl93aGlsZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yZWZ1bmRNQlJbcm91dGluZ10oKSAtPiB2b2lkOgpyZWZ1bmRNQlI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTMgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzOCAvLyAiRVJSOlBOQ0wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UE5DTAoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNCAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQ5IC8vICJFUlI6V05GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXTkZECgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxNCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICE9CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjpBUkZDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFSRkMKCnJlZnVuZE1CUl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTAKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE0IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTAKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzExCiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuZW50cnlDb3VudC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTIKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTcKICAgIC8vIGNvbnN0IG9wVXBJdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCA9IGl0ZXJhdGlvbkFtb3VudCAqIDEwMAogICAgcHVzaGludCAxMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTgKICAgIC8vIGVuc3VyZUJ1ZGdldChvcFVwSXRlcmF0aW9uQW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAogICAgc3dhcAoKcmVmdW5kTUJSX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyMAogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAyCiAgICBkaWcgMQogICAgKwogICAgZGlnIDIKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl93aGlsZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gY29uc3QgeyBhY2NvdW50IH0gPSB0aGlzLmVudHJpZXMoaSkudmFsdWUKICAgIHN3YXAKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDI0IC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBjb25zdCB7IGFjY291bnQgfSA9IHRoaXMuZW50cmllcyhpKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyB0aGlzLmVudHJpZXMoaSkuZGVsZXRlKCkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyMwogICAgLy8gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKGFjY291bnQpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjQtMzI5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGVudHJ5VG90YWxNQlIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gY29uc3QgZW50cnlUb3RhbE1CUjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNyAvLyA1MDYwMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjQtMzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGVudHJ5VG90YWxNQlIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI0LTMyOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBlbnRyeVRvdGFsTUJSLAogICAgLy8gICAgIHJlY2VpdmVyOiBhY2NvdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIGIgcmVmdW5kTUJSX3doaWxlX3RvcEA4CgpyZWZ1bmRNQlJfYWZ0ZXJfd2hpbGVAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxNCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxNCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzAyCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMyAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzggLy8gIkVSUjpQTkNMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBOQ0wKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpjbGVhcldlaWdodHNCb3hlc193aGlsZV90b3BANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgPgogICAgYnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfd2hpbGVANgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOQogICAgLy8gY29uc3Qgcmk6IHVpbnQ2NCA9ICh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtIDEpIC0gaQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDExIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGNvbnN0IHJpOiB1aW50NjQgPSAodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgLSAxKSAtIGkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDAKICAgIC8vIHRoaXMud2VpZ2h0cyhyaSkuZGVsZXRlKCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyB0aGlzLndlaWdodHMocmkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBjbGVhcldlaWdodHNCb3hlc193aGlsZV90b3BANAoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfd2hpbGVANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgKiB0aGlzLm1icigpLndlaWdodHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQzCiAgICAvLyBjb25zdCByZXR1cm5BbW91bnQ6IHVpbnQ2NCA9IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50YyAxMiAvLyAxMzExMzMwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NS0zNTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQ1LTM0OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDUtMzUwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gY2xlYXJXZWlnaHRzQm94ZXMoKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDkgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5kZWxldGVBcHBsaWNhdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUFwcGxpY2F0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjpNQkZGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1CRkYKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMyAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMzggLy8gIkVSUjpQTkNMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBOQ0wKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIEVSUl9SRUZVTkRTX05PVF9DT01QTEVURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIEVSUl9SRUZVTkRTX05PVF9DT01QTEVURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTQgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIEVSUl9SRUZVTkRTX05PVF9DT01QTEVURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjpSRk5DIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlJGTkMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX1dFSUdIVFNfQk9YRVMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX1dFSUdIVFNfQk9YRVMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOlNIV0IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0hXQgoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzU2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2F0ZWRFbnRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkRW50ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBnYXRlZEVudGVyKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyA2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGdhdGVkRW50ZXJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6RkdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGR1RFCgpnYXRlZEVudGVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy5lbnRlcihwYXltZW50LCBtYXJrZXRwbGFjZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGdhdGVkRW50ZXIoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3MS0zNzQKICAgIC8vIGVudGVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcgogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmdhdGVkRW50ZXJBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEVudGVyQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gZ2F0ZWRFbnRlckFzYShnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyA2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGdhdGVkRW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6RkdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGR1RFCgpnYXRlZEVudGVyQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gdGhpcy5lbnRlckFzYShwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gZ2F0ZWRFbnRlckFzYShnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVudGVyQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxNS00MTkKICAgIC8vIGVudGVyQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2F0ZWRBZGRbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEFkZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTgKICAgIC8vIGdhdGVkQWRkKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogZ2F0ZWRBZGRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6RkdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGR1RFCgpnYXRlZEFkZF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIHRoaXMuYWRkKHBheW1lbnQpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gZ2F0ZWRBZGQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjMKICAgIC8vIGFkZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGQKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nYXRlZEFkZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQWRkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gZ2F0ZWRBZGRBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNiAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTAKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEFkZEFzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzEgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkQWRkQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gdGhpcy5hZGRBc2EoYXNzZXRYZmVyKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIGdhdGVkQWRkQXNhKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4bik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTQKICAgIC8vIGFkZEFzYShhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4bik6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2EKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVbcm91dGluZ10oKSAtPiB2b2lkOgpyYWZmbGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfUkFGRkxFX0hBU19OT1RfRU5ERUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDIyIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX1JBRkZMRV9IQVNfTk9UX0VOREVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUwIC8vICJFUlI6UkhORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSSE5FCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID09PSAwLCBFUlJfV0lOTkVSX0FMUkVBRFlfRFJBV04pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID09PSAwLCBFUlJfV0lOTkVSX0FMUkVBRFlfRFJBV04pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcmFmZmxlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpXQURSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldBRFIKCnJhZmZsZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDI2IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI1CiAgICAvLyBpZiAodGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI2CiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gR2xvYmFsLnJvdW5kIC0gOAogICAgZ2xvYmFsIFJvdW5kCiAgICBpbnRjXzIgLy8gOAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDI2IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI2CiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gR2xvYmFsLnJvdW5kIC0gOAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyBjb25zdCByb3VuZFRvVXNlOiB1aW50NjQgPSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgKDQgKiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMjYgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjkKICAgIC8vIGNvbnN0IHJvdW5kVG9Vc2U6IHVpbnQ2NCA9IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyAoNCAqIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMSAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyBjb25zdCByb3VuZFRvVXNlOiB1aW50NjQgPSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgKDQgKiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gNAogICAgKgogICAgKwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHJvdW5kVG9Vc2UgKyA4LCBFUlJfTk9UX0VOT1VHSF9USU1FKQogICAgZ2xvYmFsIFJvdW5kCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgKwogICAgPj0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOk5FVE0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVUTQoKcmFmZmxlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMi01MzUKICAgIC8vIGNvbnN0IHNlZWQgPSBhYmlDYWxsPHR5cGVvZiBSYW5kb21uZXNzQmVhY29uLnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICAvLyAgIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIHNhbHQgPSBHbG9iYWxTdGF0ZTxieXRlcz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNDggLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBhcmdzOiBbcm91bmRUb1VzZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMwogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5CiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGJ5dGVjIDQ3IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMyLTUzNQogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MTg5MzkyYzUgLy8gbWV0aG9kICJnZXQodWludDY0LGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDkgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIGlmIChzZWVkLmxlbmd0aCA9PT0gMCkgewogICAgbGVuCiAgICBkdXAKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMjEgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMSAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmFmZmxlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQyCiAgICAvLyBjb25zdCBybmdTdGF0ZSA9IHBjZzY0SW5pdChzZWVkLnNsaWNlKDAsIDE2KSkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTYKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxNgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE3CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VlZC5sZW5ndGggPT09IDE2LCBFUlJfSU5WQUxJRF9SQU5ET01fU0VFRCkKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDQyCiAgICBwdXNoYnl0ZXMgIkVSUjpJUlNEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSU0QKCnJhZmZsZV9hZnRlcl9hc3NlcnRANDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OAogICAgLy8gY29uc3Qgc3RhdGUgPSBfX3BjZzMyU3RlcCgwLCBpbmNyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA4IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk5CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhzdGF0ZSwgaW5pdGlhbFN0YXRlKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA4IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIHVuY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyAxMCAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA4IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgMTAgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE5LTIyCiAgICAvLyByZXR1cm4gWwogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIC8vICAgICBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgLy8gXQogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMudGlja2V0Q291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NQogICAgLy8gbGV0IHVwcGVyQm91bmQgPSB0aGlzLnRpY2tldENvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDYKICAgIC8vIGlmICh1cHBlckJvdW5kIDwgTUFYX1VJTlQ2NCkgewogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICA8CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NwogICAgLy8gdXBwZXJCb3VuZCA9IHVwcGVyQm91bmQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgICsKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czozMQogICAgLy8gY29uc3QgcmVzdWx0ID0gbmV3IER5bmFtaWNBcnJheTxhcmM0LlVpbnQ2ND4oKQogICAgYnl0ZWMgNTEgLy8gMHgwMDAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQzCiAgICAvLyBpZiAodXBwZXJCb3VuZCAhPT0gMCkgewogICAgZHVwCiAgICBieiByYWZmbGVfZWxzZV9ib2R5QDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ0CiAgICAvLyBsb2dnZWRBc3NlcnQodXBwZXJCb3VuZCA+IDEsIEVSUl9JTlZBTElEX1JBTkRPTV9CT1VORFMpCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgNTIgLy8gIkVSUjpJUkJEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSQkQKCnJhZmZsZV9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxLCBFUlJfSU5WQUxJRF9SQU5ET01fQk9VTkRTKQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgRVJSX0lOVkFMSURfUkFORE9NX0JPVU5EUykKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAzMQogICAgYnl0ZWMgNTIgLy8gIkVSUjpJUkJEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSQkQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgZHVwbiAyCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU0CiAgICAvLyBjb25zdCB0aHJlc2hvbGQ6IHVpbnQ2NCA9IF9fdWludDY0VHdvcyhhYnNvbHV0ZUJvdW5kKSAlIGFic29sdXRlQm91bmQKICAgIHN3YXAKICAgICUKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHVuY292ZXIgMgoKcmFmZmxlX3doaWxlX3RvcEAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgZGlnIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgPAogICAgYnogcmFmZmxlX2FmdGVyX3doaWxlQDM3CgpyYWZmbGVfd2hpbGVfdG9wQDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMAogICAgLy8gY29uc3QgbmV3U3RhdGUxID0gX19wY2czMlN0ZXAoc3RhdGVbMF0sIHBjZ0ZpcnN0SW5jcmVtZW50KQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDggLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTEKICAgIC8vIGNvbnN0IG5ld1N0YXRlMiA9IF9fcGNnMzJTdGVwKHN0YXRlWzFdLCBuZXdTdGF0ZTEgPT09IDAgPyBvcC5zaGwocGNnU2Vjb25kSW5jcmVtZW50LCAxKSA6IHBjZ1NlY29uZEluY3JlbWVudCkKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgYm56IHJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDQ1CiAgICBwdXNoaW50IDI4ODUzOTAwODE3Nzc5MjY4MTgKCnJhZmZsZV90ZXJuYXJ5X21lcmdlQDQ2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBzd2FwCiAgICBkdXAKICAgIGludGMgOCAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEzCiAgICAvLyByZXR1cm4gW1tuZXdTdGF0ZTEsIG5ld1N0YXRlMl0sIG9wLnNobChfX3BjZzMyT3V0cHV0KHN0YXRlWzBdKSwgMzIpIHwgX19wY2czMk91dHB1dChzdGF0ZVsxXSldCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjYWxsc3ViIF9fcGNnMzJPdXRwdXQKICAgIHB1c2hpbnQgMzIKICAgIHNobAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIF9fcGNnMzJPdXRwdXQKICAgIHwKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1OAogICAgLy8gY29uc3QgW25ld1N0YXRlLCBjYW5kaWRhdGVdID0gX19wY2c2NFVuYm91bmRlZFJhbmRvbShzdGF0ZSkKICAgIGR1cAogICAgZXh0cmFjdCAwIDE2CiAgICBjb3ZlciA0CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYwCiAgICAvLyBpZiAoY2FuZGlkYXRlID49IHRocmVzaG9sZCkgewogICAgZGlnIDYKICAgID49CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAzNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgZGlnIDEKICAgICUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgICsKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIGIgcmFmZmxlX3doaWxlX3RvcEAzMgoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzY6CiAgICBwb3AKICAgIHVuY292ZXIgMwogICAgYiByYWZmbGVfd2hpbGVfdG9wQDM0CgpyYWZmbGVfdGVybmFyeV9mYWxzZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTEKICAgIC8vIGNvbnN0IG5ld1N0YXRlMiA9IF9fcGNnMzJTdGVwKHN0YXRlWzFdLCBuZXdTdGF0ZTEgPT09IDAgPyBvcC5zaGwocGNnU2Vjb25kSW5jcmVtZW50LCAxKSA6IHBjZ1NlY29uZEluY3JlbWVudCkKICAgIGludGMgMTAgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgYiByYWZmbGVfdGVybmFyeV9tZXJnZUA0NgoKcmFmZmxlX2FmdGVyX3doaWxlQDM3OgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjY4CiAgICAvLyByZXR1cm4gW3N0YXRlLCByZXN1bHRdCiAgICBwdXNoYnl0ZXMgMHgwMDEyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MQogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MQogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJhZmZsZUAxNQoKcmFmZmxlX2Vsc2VfYm9keUAyODoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1MQogICAgLy8gYWJzb2x1dGVCb3VuZCA9IG9wLmJ0b2koQnl0ZXMoQmlnVWludCgyICoqIDY0KSAtIEJpZ1VpbnQobG93ZXJCb3VuZCkpKQogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICBiIHJhZmZsZV9hZnRlcl9pZl9lbHNlQDMxCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZmluZFdpbm5lcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmZpbmRXaW5uZXI6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NAogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX1JBRkZMRV9IQVNfTk9UX0VOREVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAyMiAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTUKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIEVSUl9SQUZGTEVfSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNTAgLy8gIkVSUjpSSE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlJITkUKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlICE9PSAwLCBFUlJfTk9fV0lOTklOR19USUNLRVRfWUVUKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSAhPT0gMCwgRVJSX05PX1dJTk5JTkdfVElDS0VUX1lFVCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6TldUWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOV1RZCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfQUxSRUFEWV9GT1VORCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDQgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX0FMUkVBRFlfRk9VTkQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOldBRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0FGRAoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGxldCBzdGFydGluZ0luZGV4ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5pbmRleAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJzQ3Vyc29yIH0pCiAgICBieXRlYyAzMCAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIGxldCBzdGFydGluZ0luZGV4ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5pbmRleAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBsZXQgY3VycmVudFJhbmdlU3RhcnQgPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmFtb3VudEluZGV4CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpmaW5kV2lubmVyX3doaWxlX3RvcEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl93aGlsZUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gY29uc3QgYm94U3Rha2UgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtpXS5hc1VpbnQ2NCgpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gY29uc3QgYm94U3Rha2UgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtpXS5hc1VpbnQ2NCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZVN0YXJ0ICsgYm94U3Rha2UpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEwIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VTdGFydCArIGJveFN0YWtlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDYKICAgIHVuY292ZXIgMgogICAgKwogICAgZHVwCiAgICBjb3ZlciAyCiAgICA8CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMjAKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGl0b2IKICAgIGRpZyAzCiAgICBpdG9iCiAgICBjb25jYXQKCmZpbmRXaW5uZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHdpbm5pbmdCb3hJbmZvWzBdCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIGxldCBjdXJyZW50UmFuZ2VTdGFydCA9IHdpbm5pbmdCb3hJbmZvWzFdCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2NgogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUgLSBzdGFydGluZ0luZGV4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjYKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlIC0gc3RhcnRpbmdJbmRleAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTY3CiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgZGlnIDQKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2OQogICAgLy8gY29uc3QgY2h1bmtPZmZzZXQ6IHVpbnQ2NCA9IHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUKICAgIHN3YXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gY29uc3QgcmVtYWluaW5nSW5DaHVuazogdWludDY0ID0gQ2h1bmtTaXplIC0gY2h1bmtPZmZzZXQKICAgIGludGMgNCAvLyA0MDk2CiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gaWYgKGl0ZXJhdGlvbkFtb3VudCA+IHJlbWFpbmluZ0luQ2h1bmspIHsKICAgID4KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUA5CiAgICBkaWcgMgogICAgYnVyeSAyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NzUKICAgIC8vIGNvbnN0IHdlaWdodCA9IGNsb25lKHRoaXMud2VpZ2h0cyhzdGFydGluZ0luZGV4IC8gQ2h1bmtTaXplKS52YWx1ZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyBjb25zdCBvcFVwSXRlcmF0aW9uQW1vdW50OiB1aW50NjQgPSBpdGVyYXRpb25BbW91bnQgKiA0MAogICAgZGlnIDIKICAgIHB1c2hpbnQgNDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NzgKICAgIC8vIGVuc3VyZUJ1ZGdldChvcFVwSXRlcmF0aW9uQW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKZmluZFdpbm5lcl93aGlsZV90b3BAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDQKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODEKICAgIC8vIGN1cnJlbnRSYW5nZUVuZCA9IGN1cnJlbnRSYW5nZVN0YXJ0ICsgd2VpZ2h0W2NodW5rT2Zmc2V0ICsgaV0uYXNVaW50NjQoKQogICAgZGlnIDYKICAgIGRpZyAxCiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZGlnIDMKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDYKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA8CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5lbnRyaWVzKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZS5hY2NvdW50CiAgICBkaWcgMgogICAgZGlnIDIKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzIH0pCiAgICBieXRlYyAyNCAvLyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSB0aGlzLmVudHJpZXMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlLmFjY291bnQKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNCAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSB0aGlzLmVudHJpZXMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlLmFjY291bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBidXJ5IDYKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMTAKCmZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTg4CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmluZGV4ICs9IGl0ZXJhdGlvbkFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJzQ3Vyc29yIH0pCiAgICBieXRlYyAzMCAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuaW5kZXggKz0gaXRlcmF0aW9uQW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA1CiAgICArCiAgICBpdG9iCiAgICByZXBsYWNlMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmFtb3VudEluZGV4ID0gY3VycmVudFJhbmdlU3RhcnQKICAgIGRpZyA2CiAgICBpdG9iCiAgICByZXBsYWNlMiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyc0N1cnNvciB9KQogICAgYnl0ZWMgMzAgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmFtb3VudEluZGV4ID0gY3VycmVudFJhbmdlU3RhcnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU0CiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTg3CiAgICAvLyBzdGFydGluZ0luZGV4ICs9IENodW5rU2l6ZQogICAgdW5jb3ZlciAyCiAgICBpbnRjIDQgLy8gNDA5NgogICAgKwogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBidXJ5IDUKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMTcKCmZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMjE6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIHJldHVybiBbc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnRdCiAgICBpdG9iCiAgICBkaWcgMwogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBjb25zdCB3aW5uaW5nQm94SW5mbyA9IHRoaXMuZ2V0V2lubmVyV2VpZ2h0Qm94SW5mbygpCiAgICBiIGZpbmRXaW5uZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvQDIyCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2xhaW1SYWZmbGVQcml6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmFmZmxlUHJpemU6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNCAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0OSAvLyAiRVJSOldORkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V05GRAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9BTFJFQURZX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMyAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9BTFJFQURZX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6UEFDTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQQUNMCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAzNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTgtNjAxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLndpbm5lci52YWx1ZV0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gYXJnczogW3RoaXMud2lubmVyLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDQgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDAKICAgIC8vIGFyZ3M6IFt0aGlzLndpbm5lci52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA1IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTkKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5OC02MDEKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMud2lubmVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHhhZGY5MmFlNCAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy50aWNrZXRDb3VudC52YWx1ZSwgdGhpcy5pc1ByaXplQm94LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjI1CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMudGlja2V0Q291bnQudmFsdWUsIHRoaXMuaXNQcml6ZUJveC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDM1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjI1CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMudGlja2V0Q291bnQudmFsdWUsIHRoaXMuaXNQcml6ZUJveC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyBsZXQgY3JlYXRvckFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gaWYgKCFpc1ByaXplQm94ICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDY3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNyAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gaWYgKCFpc1ByaXplQm94ICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDY3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjcgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANjcKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDI3IC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk5CiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCA9PT0gMCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDY3CiAgICBkdXAKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA2NwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gY3JlYXRvckFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDcKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA2NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGxldCBha2l0YUFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIGlmICh0aGlzLmFraXRhUm95YWx0eS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzcgLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA1CiAgICAvLyBpZiAodGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDcyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyBha2l0YUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5ha2l0YVJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gYWtpdGFSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlBa2l0YVJveWFsdHkgfSkKICAgIGJ5dGVjIDM3IC8vICJha2l0YV9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwNgogICAgLy8gYWtpdGFBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gaWYgKGFraXRhQW1vdW50ID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzIKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDcyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyBha2l0YUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDExCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBsZXQgbWFya2V0cGxhY2VBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjkgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA3OAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxNAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyOSAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxNAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIGlmIChtYXJrZXRwbGFjZUFtb3VudCA9PT0gMCAmJiB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDc4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyOSAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzgKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDc4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjE2CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDUKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA3ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMjAKICAgIC8vIGNvbnN0IHNlbGxlckFtb3VudDogdWludDY0ID0gYW1vdW50IC0gKGNyZWF0b3JBbW91bnQgKyBha2l0YUFtb3VudCArICgyICogbWFya2V0cGxhY2VBbW91bnQpKQogICAgZGlnIDYKICAgIGR1cAogICAgZGlnIDEyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIHB1c2hpbnQgMgogICAgZGlnIDgKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjIyLTIyNwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgY3JlYXRvcjogY3JlYXRvckFtb3VudCwKICAgIC8vICAgYWtpdGE6IGFraXRhQW1vdW50LAogICAgLy8gICBtYXJrZXRwbGFjZTogbWFya2V0cGxhY2VBbW91bnQsCiAgICAvLyAgIHNlbGxlcjogc2VsbGVyQW1vdW50LAogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDQgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjI4CiAgICAvLyBjb25zdCBtYXJrZXRwbGFjZSA9IHRoaXMuZW50cmllcyhsb2MpLnZhbHVlLm1hcmtldHBsYWNlCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjQgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjgKICAgIC8vIGNvbnN0IG1hcmtldHBsYWNlID0gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUubWFya2V0cGxhY2UKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDMyIDMyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzMgogICAgLy8gaWYgKGFtb3VudHMuY3JlYXRvciA+IDApIHsKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjM0LTYzOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzNgogICAgLy8gcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA1IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzYKICAgIC8vIHJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgNQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzQtNjM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzQtNjM5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyBpZiAoYW1vdW50cy5ha2l0YSA+IDApIHsKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgMCwgYW1vdW50cy5ha2l0YSkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBhbW91bnRzLmFraXRhKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0OC02NTMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMTkgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ4LTY1MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDgtNjUzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjU1LTY2MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDIzIC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1NS02NTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTUtNjYwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjItNjY3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjYyLTY2NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjItNjY3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY5LTY3NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3MQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTYgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzEKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBhbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgc3dhcAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY5LTY3MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY5LTY3NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTMgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzgyCiAgICAvLyB0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gY2xhaW1SYWZmbGVQcml6ZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3OAogICAgLy8gaWYgKGFtb3VudHMuY3JlYXRvciA+IDApIHsKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDUgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3OQogICAgLy8gaWYgKEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3OQogICAgLy8gaWYgKEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjgwLTY4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjgyCiAgICAvLyBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNSAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjgyCiAgICAvLyBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4MC02ODUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjgwLTY4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMQogICAgLy8gbGV0IGxlZnRvdmVyOiB1aW50NjQgPSBhbW91bnRzLmFraXRhCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDIKICAgIC8vIGlmIChhbW91bnRzLmFraXRhID4gMCkgewogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzAzCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDMKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDgKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDcKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE5IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBpZiAodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNy03MTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE5IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA3LTcxMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNy03MTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyMQogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2UudmFsdWUuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjMgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyMQogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2UudmFsdWUuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMzkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjItNzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI0CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDIzIC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyNQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyNgogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjItNzI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjItNzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0MQogICAgLy8gaWYgKG1hcmtldHBsYWNlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQxCiAgICAvLyBpZiAobWFya2V0cGxhY2UuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDIKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA0MwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0Mi03NDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDItNzQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQyLTc0OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzYxCiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA0NwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2Mi03NjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMuc2VsbGVyLAogICAgc3dhcAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NjYKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NgogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NjItNzY3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2Mi03NjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQ5CgpjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA0NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzcxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzIKICAgIC8vIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzIKICAgIC8vIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTUgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzAtNzc4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBhbW91bnRzLnNlbGxlciB9XSwKICAgIC8vICAgYW1vdW50cy5zZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzc0CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzcwLTc3OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogYW1vdW50cy5zZWxsZXIgfV0sCiAgICAvLyAgIGFtb3VudHMuc2VsbGVyLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzcKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MC03NzgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMuc2VsbGVyIH1dLAogICAgLy8gICBhbW91bnRzLnNlbGxlciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0OQoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1MQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUyCiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUyCiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTUKICAgIC8vIFt7IGFkZHJlc3M6IG1hcmtldHBsYWNlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICBkaWcgMgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgaXRvYgogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDE1IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUwLTc1OAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogbWFya2V0cGxhY2UsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzUzCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTQKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTAtNzU4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBtYXJrZXRwbGFjZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1MC03NTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IG1hcmtldHBsYWNlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDQKCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjMgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczNQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTUgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzAtNzM4CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IGFtb3VudHMubWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIGFtb3VudHMubWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM0CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzMwLTczOAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBhbW91bnRzLm1hcmtldHBsYWNlIH1dLAogICAgLy8gICBhbW91bnRzLm1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMC03MzgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogYW1vdW50cy5tYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgYW1vdW50cy5tYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0MAoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzE2CiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzE2CiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGJ1cnkgMTEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDI1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyA1MyAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE4CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciA1CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxOSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIxCiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlYyAyNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgNAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANTIKICAgIHB1c2hieXRlcyAiRVJSOk5FU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVTQwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjIKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgRVJSX1dST05HX0VTQ1JPV19GT1JfT1BFUkFUSU9OKQogICAgdW5jb3ZlciA0CiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTAKICAgID09CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANTQKICAgIHB1c2hieXRlcyAiRVJSOldFU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0VTQwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgZGlnIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMwCiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMQogICAgLy8gW10KICAgIGJ5dGVjIDUxIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgYnVyeSAxNAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBkaWcgNAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQwCiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBkaWcgMTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZGlnIDEyCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ0CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBidXJ5IDExCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDEKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMTEKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZGlnIDUKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDktMTUyCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ2CiAgICAvLyB3YWxsZXQsCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ4CiAgICAvLyBbYXNzZXQuaWRdLAogICAgZGlnIDEyCiAgICBpdG9iCiAgICBieXRlYyAxNSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OAogICAgLy8gaWYgKGFtb3VudCA+IDApIHsKICAgIGRpZyA2CiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OS0xNjUKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYxCiAgICAvLyBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwLTE2NAogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA1ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzNgoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4OQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTMKICAgIC8vIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNSAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyAxNSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4OC02OTYKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogYW1vdW50cy5jcmVhdG9yIH1dLAogICAgLy8gICBhbW91bnRzLmNyZWF0b3IsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5MQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg4LTY5NgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBhbW91bnRzLmNyZWF0b3IgfV0sCiAgICAvLyAgIGFtb3VudHMuY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODgtNjk2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnQ6IGFtb3VudHMuY3JlYXRvciB9XSwKICAgIC8vICAgYW1vdW50cy5jcmVhdG9yLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMwCgpjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDUgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwMwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwNQogICAgLy8gaWYgKHRoaXMud2lubmVyLnZhbHVlLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDQgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDUKICAgIC8vIGlmICh0aGlzLndpbm5lci52YWx1ZS5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDExCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDYtNjExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjA4CiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNCAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwOAogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA1IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDYtNjEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDYtNjExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTMKCmNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDUgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLndpbm5lci52YWx1ZSwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDQgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMud2lubmVyLnZhbHVlLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDE1IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjEzLTYyMQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy53aW5uZXIudmFsdWUsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE3CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjEzLTYyMQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy53aW5uZXIudmFsdWUsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTMtNjIxCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLndpbm5lci52YWx1ZSwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzTGl2ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIHB1c2hieXRlcyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDkgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nZXRTdGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN0YXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5OAogICAgLy8gdGlja2V0QXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzYgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDAKICAgIC8vIGVuZFRpbWVzdGFtcDogdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDIyIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAxCiAgICAvLyBzZWxsZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTYgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDEKICAgIC8vIHNlbGxlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMgogICAgLy8gbWluVGlja2V0czogdGhpcy5taW5UaWNrZXRzLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIG1pblRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pblRpY2tldHMgfSkKICAgIGJ5dGVjIDI4IC8vICJtaW5fdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIG1pblRpY2tldHM6IHRoaXMubWluVGlja2V0cy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyBtYXhUaWNrZXRzOiB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMTggLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gbWF4VGlja2V0czogdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDQKICAgIC8vIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwNAogICAgLy8gZW50cnlDb3VudDogdGhpcy5lbnRyeUNvdW50LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDUKICAgIC8vIHRpY2tldENvdW50OiB0aGlzLnRpY2tldENvdW50LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODA1CiAgICAvLyB0aWNrZXRDb3VudDogdGhpcy50aWNrZXRDb3VudC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyB3aW5uaW5nVGlja2V0OiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyB3aW5uaW5nVGlja2V0OiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDQgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDcKICAgIC8vIHdpbm5lcjogdGhpcy53aW5uZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwOAogICAgLy8gcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA1IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIHByaXplOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMyAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxMAogICAgLy8gZ2F0ZUlEOiB0aGlzLmdhdGVJRC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNiAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTAKICAgIC8vIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxMQogICAgLy8gdnJmRmFpbHVyZUNvdW50OiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMSAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyB2cmZGYWlsdXJlQ291bnQ6IHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5SUQgfSkKICAgIGJ5dGVjIDQwIC8vICJlbnRyeV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODEzCiAgICAvLyByZWZ1bmRNQlJDdXJzb3I6IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDE0IC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIHJlZnVuZE1CUkN1cnNvcjogdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5Ny04MTQKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgc2VsbGVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgbWluVGlja2V0czogdGhpcy5taW5UaWNrZXRzLnZhbHVlLAogICAgLy8gICBtYXhUaWNrZXRzOiB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICAvLyAgIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIC8vICAgdGlja2V0Q291bnQ6IHRoaXMudGlja2V0Q291bnQudmFsdWUsCiAgICAvLyAgIHdpbm5pbmdUaWNrZXQ6IHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSwKICAgIC8vICAgd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIC8vICAgcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICAvLyAgIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICAvLyAgIHZyZkZhaWx1cmVDb3VudDogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUsCiAgICAvLyAgIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIC8vICAgcmVmdW5kTUJSQ3Vyc29yOiB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwKICAgIC8vIH0KICAgIHVuY292ZXIgMTUKICAgIGl0b2IKICAgIHVuY292ZXIgMTUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDEzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgOQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgNwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5NgogICAgLy8gZ2V0U3RhdGUoKTogUmFmZmxlU3RhdGUgewogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzOSAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxOSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODYKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzkgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDUzIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIHB1c2hieXRlcyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzkgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbi5vcHRpbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdGluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfRk9SQklEREVOKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpGT1JCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZPUkIKCm9wdGluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlRfUkVDRUlWRVIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdGluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpvcHRpbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXIocGF5bWVudDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMpIC0+IHZvaWQ6CnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3MS0zNzQKICAgIC8vIGVudGVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIEVSUl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDMyIC8vICJFUlI6TkxJViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTElWCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfVElDS0VUX0FTU0VUX05PVF9BTEdPKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzc2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgRVJSX1RJQ0tFVF9BU1NFVF9OT1RfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNTQgLy8gIkVSUjpUQU5BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlRBTkEKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gaWYgKHRoaXMuZ2F0ZUlELnZhbHVlICE9PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyBpZiAodGhpcy5nYXRlSUQudmFsdWUgIT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uYXBwbGljYXRpb25BcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUmFmZmxlLnByb3RvdHlwZS5nYXRlZEVudGVyPigpLCBFUlJfQkFEX01FVEhPRF9HQVRFX05FRURFRCkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDQxIC8vIG1ldGhvZCAiZ2F0ZWRFbnRlcihhcHBsLHBheSxhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2lmX2Vsc2VAOAogICAgYnl0ZWMgMzMgLy8gIkVSUjpCTUdOIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJNR04KCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX0FMUkVBRFlfRU5URVJFRCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9BTFJFQURZX0VOVEVSRUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNTUgLy8gIkVSUjpBRU5UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFFTlQKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIHBheW1lbnQuYW1vdW50ID49ICh0aGlzLm1pblRpY2tldHMudmFsdWUgKyBtYnIpICYmIHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgKyBtYnIpLAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIG1pblRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pblRpY2tldHMgfSkKICAgIGJ5dGVjIDI4IC8vICJtaW5fdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIHBheW1lbnQuYW1vdW50ID49ICh0aGlzLm1pblRpY2tldHMudmFsdWUgKyBtYnIpICYmIHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgKyBtYnIpLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODUKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNyAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICArCiAgICA+PQogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJfYm9vbF9mYWxzZUAxNQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTgKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDE4IC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIHBheW1lbnQuYW1vdW50ID49ICh0aGlzLm1pblRpY2tldHMudmFsdWUgKyBtYnIpICYmIHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgKyBtYnIpLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozODUKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNyAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICArCiAgICBkaWcgMQogICAgPj0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2Jvb2xfZmFsc2VAMTUKICAgIGludGNfMSAvLyAxCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9ib29sX21lcmdlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4OC0zOTEKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDEyIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5NQogICAgLy8gYWNjb3VudDogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozOTQtMzk3CiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDI0IC8vICJlIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5NC0zOTcKICAgIC8vIHRoaXMuZW50cmllcyhsb2MpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5OAogICAgLy8gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM5OAogICAgLy8gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDAwCiAgICAvLyBjb25zdCBhbW91bnQ6IHVpbnQ2NCA9IHBheW1lbnQuYW1vdW50IC0gbWJyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mzg1CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IGNvc3RzLmVudHJpZXMgKyBjb3N0cy5lbnRyaWVzQnlBZGRyZXNzCiAgICBpbnRjIDcgLy8gNTA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gcGF5bWVudC5hbW91bnQgLSBtYnIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGFtb3VudCkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDIKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDAyCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChhbW91bnQpCiAgICB1bmNvdmVyIDQKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgdW5jb3ZlciAzCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gY29uc3QgbmV3V2VpZ2h0ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gY29uc3QgbmV3V2VpZ2h0ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ld1dlaWdodAogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNyAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDA0CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3V2VpZ2h0CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyX2Jvb2xfZmFsc2VAMTU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcl9ib29sX21lcmdlQDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2EocGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTUtNDE5CiAgICAvLyBlbnRlckFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX05PVF9MSVZFKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMzIgLy8gIkVSUjpOTElWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5MSVYKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9USUNLRVRfQVNTRVRfQUxHTykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9USUNLRVRfQVNTRVRfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDU2IC8vICJFUlI6VEFBTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUQUFMCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MjMKICAgIC8vIGlmICh0aGlzLmdhdGVJRC52YWx1ZSAhPT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyA2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gaWYgKHRoaXMuZ2F0ZUlELnZhbHVlICE9PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLmFwcGxpY2F0aW9uQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFJhZmZsZS5wcm90b3R5cGUuZ2F0ZWRFbnRlckFzYT4oKSwgRVJSX0JBRF9NRVRIT0RfR0FURV9ORUVERUQpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyA0MiAvLyBtZXRob2QgImdhdGVkRW50ZXJBc2EoYXBwbCxwYXksYXhmZXIsYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDMzIC8vICJFUlI6Qk1HTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTUdOCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9BTFJFQURZX0VOVEVSRUQpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfQUxSRUFEWV9FTlRFUkVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDU1IC8vICJFUlI6QUVOVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBRU5UCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDEyIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDMzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGVudHJ5VG90YWxNQlIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMAogICAgLy8gY29uc3QgZW50cnlUb3RhbE1CUjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNyAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBlbnRyeVRvdGFsTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDEyIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAyMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlYyAyMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gbWluVGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluVGlja2V0cyB9KQogICAgYnl0ZWMgMjggLy8gIm1pbl90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID49CiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYV9ib29sX2ZhbHNlQDIxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMTggLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA+PQogICAgYnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYm9vbF9mYWxzZUAyMQogICAgaW50Y18xIC8vIDEKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhX2Jvb2xfbWVyZ2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM3LTQ0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gdGhpcy5taW5UaWNrZXRzLnZhbHVlICYmIGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlYyAyMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0MgogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cnlDb3VudC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQzLTQ0NgogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIG1hcmtldHBsYWNlCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0MwogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDI0IC8vICJlIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0My00NDYKICAgIC8vIHRoaXMuZW50cmllcyhsb2MpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBtYXJrZXRwbGFjZQogICAgLy8gfQogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSBsb2MKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSBsb2MKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGFtb3VudCkKICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgMQogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTcgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGFtb3VudCkKICAgIHVuY292ZXIgMwogICAgaW50YyA0IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICB1bmNvdmVyIDMKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBjb25zdCBuZXdXZWlnaHQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNyAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBjb25zdCBuZXdXZWlnaHQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFtb3VudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUyCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3V2VpZ2h0CiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA3IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTIKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXdXZWlnaHQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU0CiAgICAvLyB0aGlzLmVudHJ5Q291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU0CiAgICAvLyB0aGlzLmVudHJ5Q291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU1CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2FfYm9vbF9mYWxzZUAyMToKICAgIGludGNfMCAvLyAwCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhX2Jvb2xfbWVyZ2VAMjIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGQocGF5bWVudDogdWludDY0KSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBhZGQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMzIgLy8gIkVSUjpOTElWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5MSVYKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwLCBFUlJfVElDS0VUX0FTU0VUX05PVF9BTEdPKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgRVJSX1RJQ0tFVF9BU1NFVF9OT1RfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDU0IC8vICJFUlI6VEFOQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUQU5BCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY4CiAgICAvLyBpZiAodGhpcy5nYXRlSUQudmFsdWUgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgNiAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIGlmICh0aGlzLmdhdGVJRC52YWx1ZSAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uYXBwbGljYXRpb25BcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUmFmZmxlLnByb3RvdHlwZS5nYXRlZEFkZD4oKSwgRVJSX0JBRF9NRVRIT0RfR0FURV9ORUVERUQpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyA0MyAvLyBtZXRob2QgImdhdGVkQWRkKGFwcGwscGF5KXZvaWQiCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDMzIC8vICJFUlI6Qk1HTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTUdOCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9FTlRSWV9ET0VTX05PVF9FWElTVCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDcyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX0VOVFJZX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNTcgLy8gIkVSUjpFRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVETkUKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBjb25zdCBhbW91bnQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdCiAgICBkdXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXQogICAgaW50YyA0IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSAtIGFtb3VudC5hc1VpbnQ2NCgpKSwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTE4CiAgICAvLyBtYXhUaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXhUaWNrZXRzIH0pCiAgICBieXRlYyAxOCAvLyAibWF4X3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSAtIGFtb3VudC5hc1VpbnQ2NCgpKSwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGJ0b2kKICAgIC0KICAgIDw9CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgMTIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZF9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBwYXltZW50LmFtb3VudAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyAzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDgwLTQ4MgogICAgLy8gY29uc3QgbmV3V2VpZ2h0cyA9IG5ldyBVaW50NjQoCiAgICAvLyAgIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIHBheW1lbnQuYW1vdW50CiAgICAvLyApCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDgzCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3V2VpZ2h0cwogICAgc3dhcAogICAgY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODQKICAgIC8vIGNvbnN0IGJveEFtb3VudCA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgcGF5bWVudC5hbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NAogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBwYXltZW50LmFtb3VudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IGJveEFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gcGF5bWVudC5hbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBwYXltZW50LmFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDg2CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IHBheW1lbnQuYW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhKGFzc2V0WGZlcjogdWludDY0KSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBhZGRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4pOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIEVSUl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMiAvLyAiRVJSOk5MSVYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkxJVgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9USUNLRVRfQVNTRVRfQUxHTykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAsIEVSUl9USUNLRVRfQVNTRVRfQUxHTykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA1NiAvLyAiRVJSOlRBQUwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VEFBTAoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gaWYgKHRoaXMuZ2F0ZUlELnZhbHVlICE9PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyBpZiAodGhpcy5nYXRlSUQudmFsdWUgIT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLmFwcGxpY2F0aW9uQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFJhZmZsZS5wcm90b3R5cGUuZ2F0ZWRBZGRBc2E+KCksIEVSUl9CQURfTUVUSE9EX0dBVEVfTkVFREVEKQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgNDQgLy8gbWV0aG9kICJnYXRlZEFkZEFzYShhcHBsLGF4ZmVyKXZvaWQiCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDMzIC8vICJFUlI6Qk1HTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTUdOCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9FTlRSWV9ET0VTX05PVF9FWElTVCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX0VOVFJZX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNTcgLy8gIkVSUjpFRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVETkUKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTA1CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTA1CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyBjb25zdCBhbW91bnQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdCiAgICBkdXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwNgogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXQogICAgaW50YyA0IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDIwIC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgMjAgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTEwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgLSBhbW91bnQuYXNVaW50NjQoKSksIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIC0xCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExOAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMTggLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlIC0gYW1vdW50LmFzVWludDY0KCkpLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGJ0b2kKICAgIC0KICAgIDw9CiAgICBibnogc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgMjAgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYV9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxMi01MTQKICAgIC8vIGNvbnN0IG5ld1dlaWdodHMgPSBuZXcgVWludDY0KAogICAgLy8gICB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIC8vICkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXdXZWlnaHRzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNgogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDcgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNgogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE3CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gYm94QW1vdW50CiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA3IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZSgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNiAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTEtNzkyCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTIKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMjIgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkyCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTEtNzkyCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkwLTc5MwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkwLTc5MwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyANAAEIBIAgoI0G////////////AaiLA63+1eTUhf2oWM+Cnrvv796CFNGCnrvv796CFP////8P1K+gBiY6DHRpY2tldF9hc3NldAlha2l0YV9kYW8LZW50cnlfY291bnQMdGlja2V0X2NvdW50Bndpbm5lcgVwcml6ZQdnYXRlX2lkCHdfdG90YWxzAWEEFR98dQ53aW5uaW5nX3RpY2tldBF3ZWlnaHRzX2JveF9jb3VudAhFUlI6SVBBWQ1wcml6ZV9jbGFpbWVkEXJlZnVuZF9tYnJfY3Vyc29yAgABBnNlbGxlcgF3C21heF90aWNrZXRzDGFraXRhX2VzY3JvdwhFUlI6SVhGUhF2cmZfZmFpbHVyZV9jb3VudA1lbmRfdGltZXN0YW1wC21hcmtldHBsYWNlAWUGd2FsbGV0DHJhZmZsZV9yb3VuZA9jcmVhdG9yX3JveWFsdHkLbWluX3RpY2tldHMVbWFya2V0cGxhY2Vfcm95YWx0aWVzE2ZpbmRfd2lubmVyX2N1cnNvcnMIRVJSOkZHVEUIRVJSOk5MSVYIRVJSOkJNR04IRVJSOk1CRkYMaXNfcHJpemVfYm94D3N0YXJ0X3RpbWVzdGFtcA1ha2l0YV9yb3lhbHR5CEVSUjpQTkNMCEVSUjpOREFPCGVudHJ5X2lkBFxX9tgEOOYkMwTcULNUBGO7tzUDBoEBA2FhbANvYWwEc2FsdAhFUlI6V05GRAhFUlI6UkhORQIAAAhFUlI6SVJCRANwYWwIRVJSOlRBTkEIRVJSOkFFTlQIRVJSOlRBQUwIRVJSOkVETkUxGEAAIioiZysiZycKImcnDSJnJxUiZycoImcnCyJnJw4iZycaImeCAgQkh8MsBOqRgN02GgCOAgDZAM4xGRREMRhBALeCAwS9cUjQBPLOL0YELJQlFCcpgASWJxLxJyqABEOlPk4nK4AEam2bnycsggsE6xaBtARpZQHeBL0bJ9EEZfypiwSPpKFgBJ5XJvEEroTL2AQz6SyUBIVN7eAE2aNfpAQ+oRgyNhoAjhUFDgWQBjcG0AcNByUHbweSB8QH0wgFCBQKHQtlELgQyRFdEeQAIgABEgcAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABDojJxU2GgCOAQL9ADEZJRIxGBBEQhFXMRmBBRIxGBBEQgZAigIAi/6BCghJMgwNQQAqsYEGshCBBbIZJy2yHictsh+L/40CAAsABLNC/9wyALIBQv/1IrIBQv/viYoBAYv/gRKRi/8bgRuRIQsai/+BO5FKkUwcIx5FAYEfGk8CTJAhCxoZiYoEAYv8OBiL/ScuZUiBKFsSQQA4i/w4GUAAMYv8OBslEkEAKIv8ORoAgARDkiZVEkEAGYv8ORoBi/4SQQAOi/w5GgKL/xYSQQACI4kiiYoHAoAAIov6QAAFi/9AATojRIv5Jy5lSCRbi/0iWYHUxQELgeTFAghMi/pAAFexSXIIREsCi/4IsgiyByOyECKyAbaL+xaL/BZPArIYgAR7fcX8shpMshqyGov9shqBBrIQIrIBs7Q+SVcEAExXAAQnCRJESRUkEkQXFkwWUIv9TwNPA4lJcghEi/pwAEUBQQCDSwFOAklyCExOA0QijACL/0EACUlyCEQjjACMAbFJcghETwKyCLIHI7IQIrIBtosAQQAEiwGyFYv6shGL/rISTLIUJbIQIrIBtov7Fov8Fk8CshiABK8aFPKyGkyyGrIai/2yGoEGshAisgGztD5JVwQATFcABCcJEkRJFSQSRBdC/2VLATIQCE4CsUcCcghEMhCyCLIHI7IQIrIBtov6FkyyGIAEOU6usrIashqBBrIQIrIBs0L/TCJC/sOKAwGAADEAi/0nL2VIgRhbsbIYgAQ8Gm8zshqyGoEGshAisgGztD5JVwQASwFXAAQnCRJESSJZgQIITBUSRFcGAEkVSU4CQQAHiwEkE0EAkUgiMgNLAUAAeEUBi/9BAGhJMgMTQQBhi/2AC3dhbGxldF9mZWVzZUgkW0khBQ5Ei/8dIQWXSYwAQAAIi/9BAAMjjAAyB0mBgPUkCIsASU4CFk8ETFAnD0xQi/2L/k8FTwRPBEsFIoj9+UhXCAiL/08CCRZMUIwAiYv/FiIWUIwAiUiACHJlZmVycmVyZUhC/3oXQv9tNhoBSRUkEkQXNhoCSRUjEkQiUzYaA0kVJBJEFzYaBEkVJBJEF0w2GgVJFSQSRBc2GgZJTgMVgSASRDYaB0lOAxWBKBJENhoISRUkEkQXTgI2GglJFSQSRBdOAjYaCkkVJBJEF04CNhoLSRUkEkQXTgI2GgxJTgMVgSASRDYaDUkVJBJEF04CNhoOSU4DSRVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMg1AAAQnIrAAJwVPDmcnI08NZ0sBQQAUSwFxAERAAAyACEVSUjpJQVNUsAAoTwJnJyRPC0lOAmdLAQxBAPlJMgcNQQDyI0AADIAIRVJSOklFTlKwACcWTGcnEE8JZ4AGZnVuZGVyTwhnJxtPB2cnHE8GZycSTwVnJwQyA2cnBk8EZycXTwNnKU8CZycTTGciKWVEgAhuZnRfZmVlc2VISYFwWycdTGciKWVEIicQZUSxTIADc2FsZUiBEFuyGIAE1XS7ELIashqBBrIQIrIBs7Q+SVcEAExXAAQnCRJESRUkEkQXSU4CSwGBYFtOAkyBaFtMIw1BADhPAiMJTElPAwlPAguB6AcKCSclTGeBeK8nB0xnJzAxF2cnHoAQAAAAAAAAAAAAAAAAAAAAAWcjQ08CSCNC/8UiQv8LMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAEJyKwAEklD0AADIAIRVJSOk1BTEawAEmBEAxAAAyACEVSUjpNQU1GsABJIQwLSwI4BzIKEkAABCcMsABPAjgIEkAABCcMsAAnC0sBZyJJSwIMQQARSRYnEUxQgYCAArlIIwhC/+gjQzYaAUkVJBJEFyInDWVEQAAEJyawACInBGVEMgMTQAAEJzGwACIqZUQiJw5lRBNAAAyACEVSUjpBUkZDsAAiJw5lTElOAk4DRCIqZURLAQlJTwNJTgMNTE4CTUlOAoFkCyKI+lVMSwJLAQhLAg1BACtMSRYnGExQSb5EVwAgTLxIJwhLAVC8SLGyByEHsggjshAisgGzIwhMQv/KIicOZUQIJw5MZyNDIicNZURAAAQnJrAAIiInC2VESwENQQAWIicLZUQjCUsBCRYnEUxQvEgjCEL/3yInC2VEIQwLsTIJSwGyCLIHI7IQIrIBsycLImcWJwlMULAjQzEAMgkSQAAEJyKwACInDWVEQAAEJyawACIqZUQiJw5lRBJAAAyACEVSUjpSRk5DsAAiJwtlREEADIAIRVJSOlNIV0KwACNDMRaBAglJOBCBBhJEMRYjCUlOAjgQIxJENhoBSU4CFYEgEkQiKWVEMQAiJwZlRIj5rEAABCcfsACIC2IjQzEWIwlJOBAjEkQ2GgFJFYEgEkSIC0ojQzEWgQMJSTgQgQYSRDEWgQIJSU4COBAjEkQxFiMJSU4COBAlEkQ2GgFJTgIVgSASRCIpZUQxACInBmVEiPlKQAAEJx+wAIgL0CNDMRaBAglJOBAjEkQxFiMJSTgQJRJENhoBSRWBIBJEiAutI0MxFoECCUk4EIEGEkQxFiMJSU4COBAjEkQiKWVEMQAiJwZlRIj49UAABCcfsACIDG4jQzEWIwlJOBAjEkSIDF8jQzEWgQIJSTgQgQYSRDEWIwlJTgI4ECUSRCIpZUQxACInBmVEiPi0QAAEJx+wAIgM3iNDMRYjCUk4ECUSRIgMzyNDMgciJxZlRA1AAAQnMrAAIicKZURBAAyACEVSUjpXQURSsAAiJxplREAACDIGJAknGkxnIicaZUQiJxVlRCULCEkyBkwkCA9AAAyACEVSUjpORVRNsACxFiInMGVESRUWVwYCTFAiKWVEJy9lSCJbshiABBiTksWyGkyyGrIagQayECKyAbO0PklXBABLAVcABCcJEkRJIlmBAghMFRJEVwYASRVJQAAPRgIiJxVlRCMIJxVMZyNDIksBDyJLAk8CTYEQSwIPgRBPA08CTVJJFYEQEkAADIAIRVJSOklSU0SwAEkiWyIhCB1FAUkhCR5FAU8CHkUBIQgdRQEhCR5OAkhPAiRbTCEKHkUBHkUBIQgdRQEhCh5FAUwWTBZQIitlTElPAkQhBgxBAAIjCCczTgJJQQDOSSMNQAAEJzSwACMJSSMNQAAEJzSwAEcCHCMeRQFMGE4DIkxPAksCIwxBAIJJIltJTgUhCB1FASEJHklOAk4GSEwkW0xAAGKBooW89t7fvYUoTEkhCB1FAU8CHkUBTwUWTBZQTwWI9tKBIJBPAoj2yhkWUElXABBOBIEQW0lLBg9BACBLARgjCBZPA0kiWSMIFlcGAFwATFBOAkwjCExPA0L/gkhPA0L/gyEKQv+jRQFFAU8CSIACABJQTFBJgRBZSwEVUoECWycKTGdC/rJIIQZC/0KAAEcCNhoBSRUkEkQXMgciJxZlRA1AAAQnMrAAIicKZURAAAyACEVSUjpOV1RZsAAiJwRlRDIDEkAADIAIRVJSOldBRkSwACInHmVESSJbTCRbRQQiIicLZURLAQ1BAN8iJwdlREsBJAtbIicKZURLBk8CCElOAgxBALRGAhZLAxZQSSJbSU8CJFtFBSIqZURLAQlJSwRJTgMNTE4CTUlFBEwhBBhJRQchBEwJSUUFDUEABEsCRQJJIQQKFicRTFBMSwKBKAsiiPViIklLBAxBAERLBksBCCQLSwNMJLoXSwZJTwIITCInCmVEDkEAHiInCmVESwEMQQATSwJLAggWJxhMUL5EVwAgJwRMZ0wjCExFBkL/tSInHmVESSJbSwUIFlwASwYWXAgnHkxnI0NPAiEECE4CTCMITEUFQv8WSBZLAxZQQv86gABHCSInBGVEMgMTQAAEJzGwACInDWVEQQAMgAhFUlI6UEFDTLAAIicjZURBBMKxIicEZUQiJwVlRLIYgASt+SrkshqyGoEGshAisgGzIitlRCInI2VEIkUIQAAtIicbZURBACUiJxtlREkhBQ5ESwEdIQWXSUUIQAAPIicbZURBAAdJQQADI0UHIkULIiclZURBAB0iJyVlREkhBQ5ESwEdIQWXSUUMQAAHSUEAAyNFCyJFBSInHWVEQQAlIicdZURJIQUOREsBHSEFl0lFBkAADyInHWVEQQAHSUEAAyNFBUsGSUsMSU4DCIECSwhJTgULCE8ETAlMFk8CFlBPAhZQTBZQIicEZUQnCExQvkQXFicYTFC+RFcgIEwiKGVEQACJSSJbSUUGQQAWsSInBWVEcQtESwWyCLIHI7IQIrIBs0kkW0lBAAwiKWVEIk8CiPWRIluxIicTZUSBAltyCESyB7III7IQIrIBs7EiJxdlREsBgRBbSbIITLIHI7IQIrIBs7GyCEyyByOyECKyAbOxIicQZURMgRhbsgiyByOyECKyAbMnDSNnI0NJIltJRQVBAC8iJwVlRHELRCIoZURwAEUBQQL6sSInBWVEcQtEIihlRLIRSwSyErIUJbIQIrIBs0kkW0lFCEEAESIpZUQiKGVESwiI9OoiW0UHIicTZUSBAltyCEQiKGVEcABFAUEBKbEiJxNlRIECW3IIRCIoZUSyEUsHshKyFCWyECKyAbMiJxdlRCIoZURwAEUBQQDKsSInF2VESwGBEFsiKGVEshGyErIUJbIQIrIBsyIoZURLAkxwAEUBQQB1sUmBEFsiKGVEshGyEkyyFCWyECKyAbMiJxBlRCIoZURwAEUBQQAesSInEGVETIEYWyIoZUSyEbISshQlshAisgGzQv70IillRCIoZUQiJxBlRE8DgRhbSRZPAkxQJw9MUE8DTwMiIQZPBE8FIojyuUYCQv7EIillRCIoZURLAoEQW0kWTwVMUCcPTFBPA08DIiEGTwRPBSKI8o5GAkL/dyIpZUQiKGVEIicXZURLA4EQW0kWTwJMUCcPTFBPA08DIiEGTwRPBSKI8l5GAkL/IiIoZUxFC0QiKWVESScZZUhOA0knNWVISVcICE4FJFtOBSInE2VMSU4CTgVESSJZSwEVUklOBVcCAEwnGWVITLEjFk4ESRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEJwkSREkiWYEpC4ECCEwVEkRXBikiW0lAAAyACEVSUjpORVNDsABPBIECW0lFChJAAAyACEVSUjpXRVNDsACxSwSyGIAEWt8zj7IaTwWyGk8CshpPArIagAoAAQAAAAAAAAAAshonM7IagQayECKyASIpZUxFDkRLBHIIRCJFDEsMcABFAUAAGksMgA5yZXZlbnVlX3NwbGl0c2VIIlkjCEULMhBLCwu2SwVyCESyB7III7IQIrIBtk8CSRZLDBYnD0xQTwWyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgFLBkEAFrZLAnIIREsKshFLB7ISshQlshAisgGzQv1xIillRCIoZUQiJwVlRHELREsGSU4CFlAnD0xQTwNPAyIhBk8ETwUiiPCqRgJC/PMyCiInBWVETEsBcABITCInBGVETHAARQFBABpIsSInBGVEIicFZUSyEbIVJbIQIrIBs0L7KCIpZUQiJwVlRCInBGVETwNJTgIWUCcPTFBPA08DIiEGTwRPBSOI8EhGAkL6+4gE54ABACJPAlQnCUxQsCNDIihlRCInJGVEIicWZUQiJxBlRCInHGVEIicSZUQiKmVEIitlRCInCmVEIicEZUQiJwVlRCInDWVEIicGZUQiJxVlRCInKGVEIicOZURPDxZPDxZQTw4WUE8NUE8MFlBPCxZQTwoWUE8JFlBPCBZQTwdQTwYWUIABACJPB1RQTwQWUE8DFlBPAhZQTBZQJwlMULAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACIpZUQnGWVIcghEEkAABCcnsAAnE0xnI0M2GgFJIlmBAghLARUSRFcCADEAIillRCcZZUhyCEQSQAAEJyewACIpZUQnNWVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAgAd2ZXJzaW9uTGcjQzYaAUkVJBJEFzEAIillRCcZZUhyCEQSQAAEJyewAClMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAMgAhFUlI6Rk9SQrAASwE4BzIKEkAADIAIRVJSOklQTVKwAEw4CDIQEkAADIAIRVJSOklQTUGwALEyCkyyESKyErIUJbIQIrIBsyNDigIAiAMvQAAEJyCwACIoZURBAAQnNrAAIicGZURBAA02GgAnKRJAAAQnIbAAJwgxAFC9RQFBAAQnN7AAi/44BzIKEkAABCcMsACL/jgISSInHGVEIQcID0EAcSInEmVEIQcISwEPQQBjI0AABCcMsAAiKmVEMQCL/1BLARYnGEsBUE8CvycIMQBQTL9MIQcJSRZLAiEECkkWJxFMUE8EIQQYJAtPA7siJwdlREwkC0pbSwMIFl0nB0xnIiplRCMIKkxnIitlRAgrTGeJIkL/mooDAIgCX0AABCcgsAAiKGVEQAAEJziwACInBmVEQQANNhoAJyoSQAAEJyGwACcIMQBQvUUBQQAEJzewAIv9OAcyChJAAAQnDLAAi/04CCEHEkAABCcMsACL/jgUMgoSQAAEJxSwAIv+OBEiKGVEEkAABCcUsACL/jgSSSInHGVED0EAayInEmVESwEPQQBgI0AABCcUsAAiKmVEMQCL/1BLARYnGEsBUE8CvycIMQBQTL9LARZLASEECkkWJxFMUE8DIQQYJAtPA7siJwdlREwkC0pbSwMIFl0nB0xnIiplRCMIKkxnIitlRAgrTGeJIkL/nYoBAIgBbEAABCcgsAAiKGVEQQAEJzawACInBmVEQQANNhoAJysSQAAEJyGwACcIMQBQvUUBQAAEJzmwACcIMQBQvkQXSSEECklOAhYnEUxQSU8CIQQYJAtJTgIkuov/OAcyChJAAAQnDLAAi/84CEkiJxJlRE8DFwkOQAAEJwywAE8CSU8DSU4DJLoXSwMIFkxOArsiJwdlRE8CJAtKW0sDCBZdJwdMZyIrZUQIK0xniYoBAIgAu0AABCcgsAAiKGVEQAAEJziwACInBmVEQQANNhoAJywSQAAEJyGwACcIMQBQvUUBQAAEJzmwACcIMQBQvkQXSSEECklOAhYnEUxQSU8CIQQYJAtJTgIkuov/OBQyChJAAAQnFLAAi/84ESIoZUQSQAAEJxSwAIv/OBJJIicSZURPAxcJDkAABCcUsABPAklPA0lOAyS6F0sDCBZMTgK7IicHZURPAiQLSltLAwgWXScHTGciK2VECCtMZ4kyByInJGVED0EADTIHIicWZUQOQQACI4kiiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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



var APP_SPEC2 = { "name": "RaffleFactory", "structs": { "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newRaffle", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPrizeBoxRaffle", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteRaffle", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2309], "errorMessage": "Box must have value" }, { "pc": [868, 1725], "errorMessage": "Bytes has valid prefix" }, { "pc": [1040], "errorMessage": "ERR:BMPT" }, { "pc": [1446, 2151], "errorMessage": "ERR:CNST" }, { "pc": [1435], "errorMessage": "ERR:ICOR" }, { "pc": [2268, 2282], "errorMessage": "ERR:IPAY" }, { "pc": [1576], "errorMessage": "ERR:IPMA" }, { "pc": [1550], "errorMessage": "ERR:IPMR" }, { "pc": [2094], "errorMessage": "ERR:IUPG" }, { "pc": [644, 658], "errorMessage": "ERR:IXFR" }, { "pc": [1291, 1317, 1476, 2024, 2065, 2129], "errorMessage": "ERR:NDAO" }, { "pc": [1758], "errorMessage": "ERR:NESC" }, { "pc": [1096], "errorMessage": "ERR:NPBO" }, { "pc": [1184], "errorMessage": "ERR:NRAF" }, { "pc": [1781], "errorMessage": "ERR:WESC" }, { "pc": [1069], "errorMessage": "NAPB" }, { "pc": [337, 716, 758, 1055, 1067, 1127, 1166, 1309, 1468, 1524, 1846, 1862, 1956, 2016, 2057, 2121, 2293, 2480, 2507, 2546], "errorMessage": "application exists" }, { "pc": [790], "errorMessage": "asset exists" }, { "pc": [662, 1044, 1303, 1462, 1514, 1518, 1620, 1650, 1838, 1947, 1951, 2010, 2051, 2069, 2115, 2188, 2229, 2287, 2373, 2594, 2622], "errorMessage": "check GlobalState exists" }, { "pc": [388, 402, 418, 459, 594, 609, 871, 1248, 1339, 1728, 1999, 2035], "errorMessage": "invalid array length header" }, { "pc": [409, 425, 600, 1255, 1346, 2042], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [621], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [1737], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [585, 1008], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [436, 516, 527, 538, 549, 560, 571, 629, 939, 950, 961, 972, 983, 994, 1016, 1161, 1266, 1331, 1500, 1942, 2108], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [464, 2004], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [877], "errorMessage": "invalid number of bytes for string" }, { "pc": [451, 1991], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [446, 1986], "errorMessage": "invalid tuple encoding" }, { "pc": [919], "errorMessage": "transaction type is appl" }, { "pc": [508], "errorMessage": "transaction type is axfer" }, { "pc": [496, 931, 1492], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA2NzAwMCA0MDk2IDUwMDAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJiYyIgIndhbGxldCIgImFraXRhX2VzY3JvdyIgIkVSUjpOREFPIiAweDE1MWY3Yzc1ICJhYWwiIDB4YzUzYjMyY2MgInZlcnNpb24iICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAiRVJSOklYRlIiIDB4M2VhMTE4MzIgMHhhZGY5MmFlNCAiRVJSOkNOU1QiICJwYWwiICJFUlI6SVBBWSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5LTM1CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBSYWZmbGVGYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlUmFmZmxlLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOS0zNQogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVJhZmZsZSwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIwCiAgICBwdXNoYnl0ZXNzIDB4MTg1ODRmMjAgMHgzYjcyM2I4MSAweDkxZGQzYzc1IC8vIG1ldGhvZCAibmV3UmFmZmxlKHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzMyXVtdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm5ld1ByaXplQm94UmFmZmxlKGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZGVsZXRlUmFmZmxlKHVpbnQ2NCl2b2lkIgogICAgYnl0ZWMgNyAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhkY2EyZDg2MiAweGQzNDZiMWE0IDB4Mzk0ZWFlYjIgMHgzM2Y3ODgwOCAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweGQ5YTM1ZmE0IC8vIG1ldGhvZCAibG9hZEJveGVkQ29udHJhY3QodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVCb3hlZENvbnRyYWN0KCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm1icigpKHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG5ld1JhZmZsZSBuZXdQcml6ZUJveFJhZmZsZSBkZWxldGVSYWZmbGUgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE3IG1haW5fbWJyX3JvdXRlQDE4CiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9iYXNlLnRzOjYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA3YmQ0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOS0zNQogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVJhZmZsZSwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHg4MTE1MzYyOCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmV3YXJkc09wdEluQ29zdChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJld2FyZHNPcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZXdhcmRzT3B0SW5Db3N0X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNwogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI4CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzNwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQwCiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ0CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NwogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTgwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4MgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTgzCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gY2hpbGRWZXJzaW9uCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4NAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODUKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkubmV3UmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UmFmZmxlOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTkwLTIwMwogICAgLy8gbmV3UmFmZmxlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciA3CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEwIC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMDcKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAzCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBjb3ZlciA2CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjA5CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwOQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciA0CiAgICBndHhucyBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM0CiAgICAvLyBsZXQgY3JlYXRvclJveWFsdHk6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzNgogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIHVuY292ZXIgMgogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9pZl9lbHNlQDgKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDM3CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlEZWZhdWx0CiAgICBwdXNoaW50IDUwMDAKICAgIGJ1cnkgMTIKCm5ld1JhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMgogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjExLTIyNAogICAgLy8gY29uc3QgcmFmZmxlQXBwID0gdGhpcy5jcmVhdGVDaGlsZEFwcCgKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIHRpY2tldEFzc2V0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgZW5kVGltZXN0YW1wLAogICAgLy8gICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgbWluVGlja2V0cywKICAgIC8vICAgbWF4VGlja2V0cywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudAogICAgLy8gKQogICAgdW5jb3ZlciA3CiAgICBkaWcgMgogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgZGlnIDEzCiAgICB1bmNvdmVyIDEzCiAgICB1bmNvdmVyIDEzCiAgICB1bmNvdmVyIDEzCiAgICB1bmNvdmVyIDEzCiAgICB1bmNvdmVyIDEyCiAgICBjYWxsc3ViIGNyZWF0ZUNoaWxkQXBwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMjktMjM4CiAgICAvLyByYWZmbGUuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiByYWZmbGVBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMzMKICAgIC8vIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjM0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIzMi0yMzUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIyOS0yMzgKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjM2CiAgICAvLyBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIyOS0yMzgKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTEgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNDEtMjQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNDMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjQxLTI0NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjQxLTI0NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE5MC0yMDMKICAgIC8vIG5ld1JhZmZsZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDEtNDUxCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZmllZFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDQKICAgIC8vIGFzc2V0LmNyZWF0b3IsCiAgICBkdXBuIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NgogICAgLy8gc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgc3dhcAogICAgaXRvYgogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ4CiAgICAvLyAxLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgNAogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDIKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDEtNDUxCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZmllZFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MGNmMWI5Y2YgLy8gbWV0aG9kICJ2ZXJpZmllZFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5CiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MS00NTEKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDUzCiAgICAvLyBpZiAoQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogbmV3UmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IGJ0b2koQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpKQogICAgZGlnIDEyCiAgICBidG9pCiAgICBidXJ5IDEyCgpuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU3CiAgICAvLyBpZiAoY3JlYXRvclJveWFsdHkgPiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUpIHsKICAgIGRpZyAxMQogICAgaW50YyA2IC8vIDUwMDAwCiAgICA+CiAgICBieiBuZXdSYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU4CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDYgLy8gNTAwMDAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwOQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBiIG5ld1JhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5Lm5ld1ByaXplQm94UmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UHJpemVCb3hSYWZmbGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNTItMjYzCiAgICAvLyBuZXdQcml6ZUJveFJhZmZsZSgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSwgRVJSX0JBRF9NRVRIT0RfUFJJWkVfQk9YX1RSQU5TRkVSX05FRURFRCkKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMTIgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94UmFmZmxlX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpCTVBUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJNUFQKCm5ld1ByaXplQm94UmFmZmxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjY2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjY2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMTAKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NjUKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBFUlJfTk9UX0FfUFJJWkVfQk9YKQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDY1CiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgRVJSX05PVF9BX1BSSVpFX0JPWCkKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5BUEIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDY2CiAgICAvLyBjb25zdCBbb3duZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhwcml6ZUJveCwgQnl0ZXMoUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyKSkKICAgIHB1c2hieXRlcyAib3duZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjYKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdQcml6ZUJveFJhZmZsZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6TlBCTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUEJPCgpuZXdQcml6ZUJveFJhZmZsZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI2OQogICAgLy8gdHJ1ZSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjgtMjgxCiAgICAvLyBjb25zdCByYWZmbGVBcHAgPSB0aGlzLmNyZWF0ZUNoaWxkQXBwKAogICAgLy8gICB0cnVlLAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICB0aWNrZXRBc3NldCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgMCwKICAgIC8vICAgbWluVGlja2V0cywKICAgIC8vICAgbWF4VGlja2V0cywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudAogICAgLy8gKQogICAgY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICB1bmNvdmVyIDExCiAgICB1bmNvdmVyIDExCiAgICB1bmNvdmVyIDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNzUKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjY4LTI4MQogICAgLy8gY29uc3QgcmFmZmxlQXBwID0gdGhpcy5jcmVhdGVDaGlsZEFwcCgKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgIDAsCiAgICAvLyAgIG1pblRpY2tldHMsCiAgICAvLyAgIG1heFRpY2tldHMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQKICAgIC8vICkKICAgIHVuY292ZXIgMTIKICAgIHVuY292ZXIgMTIKICAgIHVuY292ZXIgMTIKICAgIHVuY292ZXIgMTIKICAgIHVuY292ZXIgMTIKICAgIGNhbGxzdWIgY3JlYXRlQ2hpbGRBcHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4My0yODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW3JhZmZsZUFwcC5hZGRyZXNzXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyODUKICAgIC8vIGFyZ3M6IFtyYWZmbGVBcHAuYWRkcmVzc10sCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyODMtMjg2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtyYWZmbGVBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgYnl0ZWMgMTIgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNTItMjYzCiAgICAvLyBuZXdQcml6ZUJveFJhZmZsZSgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo6UmFmZmxlRmFjdG9yeS5kZWxldGVSYWZmbGVbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVSYWZmbGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTEKICAgIC8vIGRlbGV0ZVJhZmZsZShhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjkyCiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQV9SQUZGTEUpCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOk5SQUYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlJBRgoKZGVsZXRlUmFmZmxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NzEKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZHVwCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5NQogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5OAogICAgLy8gcmFmZmxlLmNhbGwuZGVsZXRlQXBwbGljYXRpb24oeyBhcHBJZCB9KQogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDI0ODdjMzJjIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMwMC0zMDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMwMC0zMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMDAtMzAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTEKICAgIC8vIGRlbGV0ZVJhZmZsZShhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmluaXRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDkgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDQKICAgIC8vIGlmICghdGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDYKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5jcmVhdGUoeyBzaXplIH0pCiAgICBzd2FwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDQgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ5CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVzaXplKHNpemUpCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICBiIGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QubG9hZEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsb2FkQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU0CiAgICAvLyBjb25zdCBleHBlY3RlZFByZXZpb3VzQ2FsbHM6IHVpbnQ2NCA9IG9mZnNldCAvIDIwMzIKICAgIHB1c2hpbnQgMjAzMgogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTUKICAgIC8vIGNvbnN0IHR4biA9IGd0eG4uVHJhbnNhY3Rpb24oVHhuLmdyb3VwSW5kZXggLSBleHBlY3RlZFByZXZpb3VzQ2FsbHMgLSAxKQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHN3YXAKICAgIC0KICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTgKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBkaWcgMgogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTgKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1OQogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGRpZyAyCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MAogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBkaWcgMgogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny02MAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MQogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBkaWcgMgogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyA3IC8vIG1ldGhvZCAiaW5pdEJveGVkQ29udHJhY3Qoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYxCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MgogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgZGlnIDIKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTYtNjMKICAgIC8vIGxvZ2dlZEFzc2VydCgoCiAgICAvLyAgIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAgICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAgICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAgICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gICAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICAgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgLy8gKSwgRVJSX0lOVkFMSURfQ0FMTF9PUkRFUikKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOklDT1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUNPUgoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDEzIC8vICJFUlI6Q05TVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDTlNUCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjUKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIGNvdmVyIDIKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmRlbGV0ZUJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzAKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OAogICAgLy8gZGVsZXRlQm94ZWRDb250cmFjdCgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk0CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NgogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTYKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVF9SRUNFSVZFUikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6SVBNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1SCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwNAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgMTQgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExOAogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjEKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk1LTk4CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTcKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk1LTk4CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgcHVzaGJ5dGVzIDB4M2FiMjg5NWIgLy8gbWV0aG9kICJhcmM1OF9nZXRFc2Nyb3dzKHN0cmluZ1tdKSh1aW50NjQsYWRkcmVzcyxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQxCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjpORVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBkaWcgNgogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMTQKICAgIHB1c2hieXRlcyAiRVJSOldFU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0VTQwoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMAogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzEKICAgIC8vIFtdCiAgICBwdXNoYnl0ZXMgMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUtMTM5CiAgICAvLyBjb25zdCBvcHRJbkNvdW50ID0gc3BsaXRPcHRJbkNvdW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0CiAgICAvLyApCiAgICBkaWcgNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQxCiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTAKICAgIC8vIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ5LTE1MgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NgogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OAogICAgLy8gW2Fzc2V0LmlkXSwKICAgIHN3YXAKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAxNCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBFUlJfSU5WQUxJRF9VUEdSQURFKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJVVBHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklVUEcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA4IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmNyZWF0ZUNoaWxkQXBwKGlzUHJpemVCb3g6IHVpbnQ2NCwgcGF5bWVudDogdWludDY0LCBwcml6ZUlEOiB1aW50NjQsIHRpY2tldEFzc2V0OiB1aW50NjQsIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsIGVuZFRpbWVzdGFtcDogdWludDY0LCBjcmVhdG9yUm95YWx0eTogdWludDY0LCBtaW5UaWNrZXRzOiB1aW50NjQsIG1heFRpY2tldHM6IHVpbnQ2NCwgZ2F0ZUlEOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNyZWF0ZUNoaWxkQXBwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzktNTIKICAgIC8vIHByaXZhdGUgY3JlYXRlQ2hpbGRBcHAoCiAgICAvLyAgIGlzUHJpemVCb3g6IGJvb2xlYW4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcHJpemVJRDogdWludDY0LCAvLyBBc3NldCBvciBQcml6ZSBCb3ggQXBwbGljYXRpb24KICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JSb3lhbHR5OiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogQXBwbGljYXRpb24gewogICAgcHJvdG8gMTIgMQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjUzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMTMgLy8gIkVSUjpDTlNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkNOU1QKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NTUKICAgIC8vIGxldCBvcHRpbk1CUjogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NTcKICAgIC8vIGNvbnN0IGlzQWxnb09yUHJpemVCb3ggPSBwcml6ZUlEID09PSAwIHx8IGlzUHJpemVCb3gKICAgIGZyYW1lX2RpZyAtMTAKICAgICEKICAgIGZyYW1lX2RpZyAtMTIKICAgIHx8CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo1OAogICAgLy8gaWYgKCFpc0FsZ29PclByaXplQm94KSB7CiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo1OQogICAgLy8gb3B0aW5NQlIgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgZnJhbWVfYnVyeSAxCgpjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo2MwogICAgLy8gaWYgKCFpc0FsZ29UaWNrZXQpIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo2NAogICAgLy8gb3B0aW5NQlIgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc1CiAgICAvLyBpZiAoIWlzUHJpemVCb3gpIHsKICAgIGZyYW1lX2RpZyAtMTIKICAgIGJueiBjcmVhdGVDaGlsZEFwcF9lbHNlX2JvZHlAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc2CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc2CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3NgogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplSUQpCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3NwogICAgLy8gaWYgKGlzQWxnb1RpY2tldCkgewogICAgZnJhbWVfZGlnIC05CiAgICBibnogY3JlYXRlQ2hpbGRBcHBfZWxzZV9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3OAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkKICAgICsKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4OAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgKwogICAgZGlnIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg5CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTMxMTMzMDAKICAgICoKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OTAKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MAogICAgLy8gY29uc3QgZmVlcyA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgcHVzaGJ5dGVzICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjk1CiAgICAvLyBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlICsKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjk1LTk4CiAgICAvLyBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlICsKICAgIC8vIE1BWF9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIHJhZmZsZS5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHJhZmZsZS5nbG9iYWxCeXRlcykgKwogICAgcHVzaGludCAxNDQ4NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5NS05OQogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiByYWZmbGUuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiByYWZmbGUuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSICsKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjk1LTEwMAogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiByYWZmbGUuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiByYWZmbGUuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSICsKICAgIC8vIHdlaWdodHNNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMTUgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtMTEKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDEKICAgID09CiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAxNSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTA2LTExMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEwOAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTA4CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTA2LTExMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTA2LTExMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE0CiAgICAvLyBjb25zdCBhcHByb3ZhbFNpemUgPSB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjExNQogICAgLy8gY29uc3QgY2h1bmsxID0gdGhpcy5ib3hlZENvbnRyYWN0LmV4dHJhY3QoMCwgNDA5NikKICAgIGludGNfMCAvLyAwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjExNgogICAgLy8gY29uc3QgY2h1bmsyID0gdGhpcy5ib3hlZENvbnRyYWN0LmV4dHJhY3QoNDA5NiwgYXBwcm92YWxTaXplIC0gNDA5NikKICAgIHN3YXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE2CiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgaW50YyA1IC8vIDQwOTYKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjExOC0xMzkKICAgIC8vIGNvbnN0IGFwcElkID0gcmFmZmxlLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVJRCwKICAgIC8vICAgICAgIGlzUHJpemVCb3gsCiAgICAvLyAgICAgICB0aWNrZXRBc3NldCwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgbWluVGlja2V0cywKICAgIC8vICAgICAgIG1heFRpY2tldHMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiByYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMsCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjEKICAgIC8vIHByaXplSUQsCiAgICBmcmFtZV9kaWcgLTEwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjIKICAgIC8vIGlzUHJpemVCb3gsCiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMTIKICAgIHNldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTIzCiAgICAvLyB0aWNrZXRBc3NldCwKICAgIGZyYW1lX2RpZyAtOQogICAgaXRvYgogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyNAogICAgLy8gc3RhcnRUaW1lc3RhbXAsCiAgICBmcmFtZV9kaWcgLTgKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyNQogICAgLy8gZW5kVGltZXN0YW1wLAogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjYKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjcKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIGZyYW1lX2RpZyAtMTEKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciAxMAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjgKICAgIC8vIGNyZWF0b3JSb3lhbHR5LAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjkKICAgIC8vIG1pblRpY2tldHMsCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMAogICAgLy8gbWF4VGlja2V0cywKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTMxCiAgICAvLyBnYXRlSUQsCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MgogICAgLy8gY29uc3QgcmFmZmxlID0gY29tcGlsZUFyYzQoUmFmZmxlKQogICAgcHVzaGludCA5CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyMQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTgtMTM5CiAgICAvLyBjb25zdCBhcHBJZCA9IHJhZmZsZS5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplSUQsCiAgICAvLyAgICAgICBpc1ByaXplQm94LAogICAgLy8gICAgICAgdGlja2V0QXNzZXQsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIG1pblRpY2tldHMsCiAgICAvLyAgICAgICBtYXhUaWNrZXRzLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzgKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzLAogICAgcHVzaGludCAzCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MgogICAgLy8gY29uc3QgcmFmZmxlID0gY29tcGlsZUFyYzQoUmFmZmxlKQogICAgcHVzaGJ5dGVzIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAxMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAxMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE4LTEzOQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMywKICAgIC8vICAgfSkKICAgIHB1c2hieXRlcyAweDNhMjMyNzE1IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE4LTE0MQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMywKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ0LTE0OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0NgogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDcKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDMKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDQtMTQ4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDQtMTQ5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1MQogICAgLy8gaWYgKCFpc0FsZ29UaWNrZXQpIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfaWZfZWxzZUAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTUyLTE2MQogICAgLy8gcmFmZmxlLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpY2tldEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1NgogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1NwogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTUtMTU4CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1Mi0xNjEKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aWNrZXRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMSAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY0LTE3MwogICAgLy8gcmFmZmxlLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY4CiAgICAvLyByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY3LTE3MAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUiwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY0LTE3MwogICAgLy8gcmFmZmxlLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNzEKICAgIC8vIHdlaWdodHNMaXN0Q291bnQsCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE2NC0xNzMKICAgIC8vIHJhZmZsZS5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUiwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4YmQ3MTQ4ZDAgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE3NQogICAgLy8gcmV0dXJuIGFwcElkCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY3JlYXRlQ2hpbGRBcHBfZWxzZV9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4MAogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRpY2tldEFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTkKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTcKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBwdXNoaW50IDMzNTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgICsKICAgICsKICAgIGIgY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfaWZfZWxzZUAxNQoKY3JlYXRlQ2hpbGRBcHBfZWxzZV9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODIKICAgIC8vIH0gZWxzZSBpZiAoaXNBbGdvVGlja2V0KSB7CiAgICBmcmFtZV9kaWcgLTkKICAgIGJueiBjcmVhdGVDaGlsZEFwcF9lbHNlX2JvZHlAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE3CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICBiIGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMTUKCmNyZWF0ZUNoaWxkQXBwX2Vsc2VfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTkKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTcKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBwdXNoaW50IDI2ODAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODUKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRpY2tldEFzc2V0KQogICAgKwogICAgYiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDE1Cg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIAriLBIAg0IYDJhAJYWtpdGFfZGFvAmJjBndhbGxldAxha2l0YV9lc2Nyb3cIRVJSOk5EQU8EFR98dQNhYWwExTsyzAd2ZXJzaW9uFmNoaWxkX2NvbnRyYWN0X3ZlcnNpb24IRVJSOklYRlIEPqEYMgSt+SrkCEVSUjpDTlNUA3BhbAhFUlI6SVBBWYAE6pGA3TYaAI4BAJUxGRREMRhBAH6CAwQYWE8gBDtyO4EEkd08dScHgggE3KLYYgTTRrGkBDlOrrIEM/eICASuhMvYBDPpLJQEhU3t4ATZo1+kNhoAjgwA4wKLA4ED2gQrBLAEyQaOBrgHNAAiAAEAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABIEVNig2GgCOAQBbADEZgQQSMRgQREIGr4oCAYv/QQAXi/4nBmVIJFtyCESL/3AARQFAAAMyEIkiiYoDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiTYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIANhoDSRUkEkQXNhoESRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJwhPBGcnCU8DZyhPAmcrTGcjQyKAADEWJQlJOBAjEkQxFiMJRwI4EIEEEkQ2GgFJFSQSRBdOAjYaAkkVJBJEF04CNhoDSRUkEkQXTgI2GgRJFSQSRBdOBjYaBUkVJBJEF04GNhoGSRUkEkQXTgY2GgdJTgcVgSASRDYaCElOAkkiWSUITBUSRDYaCUlOAkkiWUlOA4EgCyUITBUSRDYaCkkVJBJEF04FOBQyChJAAAQnCrAASwM4EklOBkAABCcKsAAiKGVETwQ4ESJFEE8CQABuRQFFAUUBgYgnRQwiTwdLAk8ITwhPCEsNTw1PDU8NTw1PDIgFj7FJcghEMhCyCLIHI7IQIrIBtksBFiKyGUsBshgnC7IashqBBrIQIrIBs7FJcghETwKyEU8CshKyFIEEshAisgGzFicFTFCwI0OxRwJxC0RMFgEBIxZPBCcGZUiBSFuyGIAEDPG5z7IaTwKyGk8EshpMshpPArIashqACQAHcm95YWx0ebIagQayECKyAbO0PklXBABLAVcABCcFEkRJIlklCEwVEkRXBgBJRQ4VQQAFSwwXRQxLCyEGDUH/KSEGRQxC/yIxFiUJRwI4EIEGEkQxFiMJSU4COBAjEkQ2GgFJFSQSRBdOAjYaAkkVJBJEF04CNhoDSRUkEkQXTgI2GgRJFSQSRBdOAjYaBUkVJBJEF04CNhoGSRUkEkQXTgI2GgdJTgMVgSASRDYaCEkVJBJEF04CORoAJwwSQAAMgAhFUlI6Qk1QVLAAIihlRE8KOBhJTgJJcgdETwInBmVIgRhbcghEEkSABW93bmVyZUgyChJAAAyACEVSUjpOUEJPsAAjTgJJTgNPC08LTwsiTwxPDE8MTwxPDIgD9LFJcghETwKyGCcMshqyGoEGshAisgGzFicFTFCwI0M2GgFJFSQSRBdJcgdEMgoSQAAMgAhFUlI6TlJBRrAASYAGZnVuZGVyZUhJVwAgTIEgW7GBBbIZTwKyGIAEJIfDLLIagQayECKyAbOxsgiyByOyECKyAbMjQzYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBdMJwlMZym9RQFAABIxADIJEkAABCcEsAApTLlII0MxACIoZUQqZUhyCEQSQAAEJwSwAClM00L/5DYaAUkVJBJEF0k2GgJJIlklCEsBFRJEVwIATIHwDwoxFkwJIwlJTgM4EIEGEkEAUUsCOBgyCBJBAEdLAjgbgQMSQQA9SwI4GUAANksCORoAJwcSQQArSwI4ADEAEkEAISNAAAyACEVSUjpJQ09SsAApvUUBQAAEJw2wAClOArsjQyJC/9wxACIoZUQqZUhyCEQSQAAEJwSwACm8SCNDMRYjCUcCOBAjEkQ2GgFJFSQSRBdJTgMiK2VMSU4CTgVEIihlREwlW3IIRE8CiPtmTDgHMgoSQAAMgAhFUlI6SVBNUrAATDgIMhAjSwMICxJAAAyACEVSUjpJUE1BsACxMgpLA7IRIrISshSBBLIQIrIBs0EBTUcCIllLARVSVwIAgAATQQE8IihlREkqZUhMSScOZUhJVwgITgIkW04DIitlTElOAkUHREkiWUsBFVJJTgJXAgBMKmVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEJwUSREkiWYEpCyUITBUSRFcGKSJbSUAADIAIRVJSOk5FU0OwAEsGJVtJTwISQAAMgAhFUlI6V0VTQ7AAsU8ESbIYgARa3zOPshpPBLIaTwKyGk8CshqACgABAAAAAAAAAACyGoACAACyGoEGshAisgEiKGVETwJJTgJyCERLBklOBIj6ITIQC7ZMcghEsgeyCCOyECKyAbZLARZMFoACAAFMUE8DshiABGg147yyGkyyGoABgLIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBsyNDNhoBSRUkEkQXIihlRCIrZUQlW3IIRE8CiPm2MhAjTwIICxYnBUxQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCplSHIIRBJAAAQnBLAAK0xnI0M2GgFJIlklCEsBFRJEVwIAMQAiKGVEKmVIcghEEkAABCcEsAAiKGVEJw5lSIEQWzINEkAADIAIRVJSOklVUEewACcITGcjQzYaAUkVJBJEFzEAIihlRCplSHIIRBJAAAQnBLAAKExnI0OKDAEigAApvUUBQAAEJw2wACKMAYv2FIv0EUAABDIQjAGL90EAB4sBMhAIjAGL9EABqCIoZUSL9oj4rSEECIv3QAGFIQQIMgGLAQhLAQiL/4HUr6AGC0lOAk4DIihlRIAIbmZ0X2ZlZXNlSIFYW0lOBIG0tFgICAiL9TgHMgoSQAAEJw+wAIv1OAhLARJAAAQnD7AAsSIrZURJJVtyCERPBLIIsgcjshAisgGzKb1EKSIhBbpMIQUJKSEFTwK6sYv2FoABACKL9FSL9xZJjACL+BaL+RYxAIv1OABPChZQi/oWi/sWi/wWi/0WIihlRBaBCbI1gRWyNCKyGYEDsjiABAuBAUOyQk8NskBPDLJAgAQ6IycVshpPC7IaTwqyGk8JshpPCLIaTweyGk8GshpPBbIaTwSyGk8DshpPArIaTLIai/6yGrIashqBBrIQIrIBs7cAPUmxcghEMgFPAwiyCLIHI7IQIrIBs4v3QQAosUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJwuyGosAshqBBrIQIrIBs7FJcghETwKyCLIHI7IQIrIBtov/FiKyGUsBshiABL1xSNCyGrIagQayECKyAbOMAIkiKGVEi/eI9xeBmLkUCAhC/myL90AABSEEQv5iIihlRIv3iPb7geCtEAhC/lE=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var RaffleFactorySDK = class extends _chunkKLHVDYDWjs.BaseSDK {
  constructor(params) {
    super({ factory: RaffleFactoryFactory, ...params }, _chunkHFHM5QOFjs.ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID);
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
          gateId,
          marketplace,
          name,
          proof,
          weightsListCount
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
var CHUNK_SIZE = 4096n;
var RaffleSDK = class extends _chunkKLHVDYDWjs.BaseSDK {
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
//# sourceMappingURL=chunk-GSN3JJOO.js.map
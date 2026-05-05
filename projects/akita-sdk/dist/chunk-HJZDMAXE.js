"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4; var _class5; var _class6; var _class7; var _class8; var _class9;

var _chunkPFX6BSCEjs = require('./chunk-PFX6BSCE.js');







var _chunkVMMDQU5Ujs = require('./chunk-VMMDQU5U.js');



var _chunkFZLF55XCjs = require('./chunk-FZLF55XC.js');

// src/social/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var _transact = require('@algorandfoundation/algokit-utils/transact');

// src/generated/AkitaSocialClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "AkitaSocial", "structs": { "AkitaSocialMBRData": [{ "name": "follows", "type": "uint64" }, { "name": "blocks", "type": "uint64" }, { "name": "posts", "type": "uint64" }, { "name": "votes", "type": "uint64" }, { "name": "votelist", "type": "uint64" }, { "name": "reactions", "type": "uint64" }, { "name": "reactionlist", "type": "uint64" }, { "name": "meta", "type": "uint64" }, { "name": "moderators", "type": "uint64" }, { "name": "banned", "type": "uint64" }, { "name": "actions", "type": "uint64" }, { "name": "refTypes", "type": "uint64" }], "MetaValue": [{ "name": "initialized", "type": "bool" }, { "name": "wallet", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "lastActive", "type": "uint64" }, { "name": "followerIndex", "type": "uint64" }, { "name": "followerCount", "type": "uint64" }, { "name": "automated", "type": "bool" }, { "name": "followGateId", "type": "uint64" }, { "name": "addressGateId", "type": "uint64" }, { "name": "defaultPayWallId", "type": "uint64" }], "PostValue": [{ "name": "creator", "type": "address" }, { "name": "timestamp", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "usePayWall", "type": "bool" }, { "name": "payWallId", "type": "uint64" }, { "name": "againstContentPolicy", "type": "bool" }, { "name": "postType", "type": "uint8" }, { "name": "creatorFlags", "type": "uint64" }, { "name": "moderatorFlags", "type": "uint64" }, { "name": "ref", "type": "byte[]" }], "ReactionListKey": [{ "name": "user", "type": "byte[16]" }, { "name": "ref", "type": "byte[16]" }, { "name": "nft", "type": "uint64" }], "ReactionsKey": [{ "name": "ref", "type": "byte[32]" }, { "name": "nft", "type": "uint64" }], "RefTypeValue": [{ "name": "name", "type": "string" }, { "name": "schema", "type": "byte[]" }], "SocialImpactInputs": [{ "name": "hasMeta", "type": "bool" }, { "name": "streak", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "voteCount", "type": "uint64" }, { "name": "isNegative", "type": "bool" }], "ViewPayWallValue": [{ "name": "userPayInfo", "type": "(uint8,uint64,uint64)[]" }, { "name": "agentPayInfo", "type": "(uint8,uint64,uint64)[]" }], "VoteListKey": [{ "name": "user", "type": "byte[16]" }, { "name": "ref", "type": "byte[16]" }], "VoteListValue": [{ "name": "impact", "type": "uint64" }, { "name": "isUp", "type": "bool" }], "VotesValue": [{ "name": "voteCount", "type": "uint64" }, { "name": "isNegative", "type": "bool" }], "tipMBRInfo": [{ "name": "type", "type": "uint8" }, { "name": "arc58", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "post", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "uint64", "name": "timestamp" }, { "type": "byte[24]", "name": "nonce" }, { "type": "byte[36]", "name": "cid" }, { "type": "uint64", "name": "gateID" }, { "type": "bool", "name": "usePayWall" }, { "type": "uint64", "name": "payWallID" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editPost", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[32]", "name": "amendment" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedReply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "timestamp" }, { "type": "byte[24]", "name": "nonce" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "gateID" }, { "type": "bool", "name": "usePayWall" }, { "type": "uint64", "name": "payWallID" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "reply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "uint64", "name": "timestamp" }, { "type": "byte[24]", "name": "nonce" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "gateID" }, { "type": "bool", "name": "usePayWall" }, { "type": "uint64", "name": "payWallID" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEditReply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "appl", "name": "gateTxn" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[32]", "name": "amendment" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editReply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[32]", "name": "amendment" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "vote", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "bool", "name": "isUp" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editVote", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[32]", "name": "ref" }, { "type": "bool", "name": "flip" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedReact", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "appl", "name": "gateTxn" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "react", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteReaction", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setPostModeration", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "bool", "name": "againstContentPolicy" }, { "type": "uint64", "name": "moderatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initMeta", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "address", "name": "user" }, { "type": "bool", "name": "automated" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "NFD" }, { "type": "uint64", "name": "akitaNFT" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createPayWall", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "((uint8,uint64,uint64)[],(uint8,uint64,uint64)[])", "struct": "ViewPayWallValue", "name": "payWall" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateMeta", "args": [{ "type": "uint64", "name": "followGateID" }, { "type": "uint64", "name": "addressGateID" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "NFD" }, { "type": "uint64", "name": "akitaNFT" }, { "type": "uint64", "name": "defaultPayWallID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateFollowerMeta", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "newFollowerIndex" }, { "type": "uint64", "name": "newFollowerCount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "registerRefType", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "name" }, { "type": "byte[]", "name": "schema" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "getSocialImpactInputs", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(bool,uint64,uint64,uint64,bool)", "struct": "SocialImpactInputs" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMetaExists", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMeta", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)", "struct": "MetaValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getPostExists", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getPost", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])", "struct": "PostValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getVote", "args": [{ "type": "address", "name": "account" }, { "type": "byte[32]", "name": "ref" }], "returns": { "type": "(uint64,bool)", "struct": "VoteListValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getVotes", "args": [{ "type": "(address,byte[32])[]", "name": "keys" }], "returns": { "type": "(uint64,bool)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getReactionExists", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "byte[]", "name": "ref" }, { "type": "string", "name": "refTypeName" }, { "type": "byte[]", "name": "refTypeSchema" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "AkitaSocialMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "payWallMbr", "args": [{ "type": "((uint8,uint64,uint64)[],(uint8,uint64,uint64)[])", "struct": "ViewPayWallValue", "name": "paywall" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkTipMbrRequirements", "args": [{ "type": "uint64", "name": "akitaDAO" }, { "type": "address", "name": "creator" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(uint8,uint64)", "struct": "tipMBRInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "payWallId": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGF5d2FsbF9pZA==" }, "refTypeCounter": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmX3R5cGVfY291bnRlcg==" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "posts": { "keyType": "AVMBytes", "valueType": "PostValue", "desc": "All the posts on the network", "prefix": "cA==" }, "paywall": { "keyType": "uint64", "valueType": "ViewPayWallValue", "desc": "Pay wall information for posts", "prefix": "dw==" }, "votes": { "keyType": "AVMBytes", "valueType": "VotesValue", "desc": "Counters for each post to track votes", "prefix": "dg==" }, "votelist": { "keyType": "VoteListKey", "valueType": "VoteListValue", "desc": "User votes and their impact", "prefix": "bw==" }, "reactions": { "keyType": "ReactionsKey", "valueType": "uint64", "desc": "Counters for each post to track reactions", "prefix": "cg==" }, "reactionlist": { "keyType": "ReactionListKey", "valueType": "AVMBytes", "desc": "Who has reacted to what", "prefix": "ZQ==" }, "meta": { "keyType": "address", "valueType": "MetaValue", "desc": "The meta data for each user", "prefix": "bQ==" }, "refTypes": { "keyType": "uint64", "valueType": "RefTypeValue", "desc": "Registered ref types (key = uint64 ID, value = name + external flag + schema)", "prefix": "dA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2559, 2931, 3578, 3960, 4020, 4071, 4154, 4746, 5256, 5555, 5594, 5773, 6240, 6306, 6371, 6600, 7157, 7555], "errorMessage": "Box must have value" }, { "pc": [742, 1057, 1189, 3284, 3351, 3653, 4928, 5687, 7905, 8145], "errorMessage": "Bytes has valid prefix" }, { "pc": [1362], "errorMessage": "ERR:AOPT" }, { "pc": [2919, 7429], "errorMessage": "ERR:ARCT" }, { "pc": [7176], "errorMessage": "ERR:AUTO" }, { "pc": [7130], "errorMessage": "ERR:AVOT" }, { "pc": [4953, 6555, 6852], "errorMessage": "ERR:BAND" }, { "pc": [4992, 6876], "errorMessage": "ERR:BLKD" }, { "pc": [5228], "errorMessage": "ERR:EAMD" }, { "pc": [3163], "errorMessage": "ERR:EMTA" }, { "pc": [6682, 6987], "errorMessage": "ERR:EPST" }, { "pc": [1828, 2179, 2740], "errorMessage": "ERR:FGTE" }, { "pc": [2014, 2312, 2841, 4756], "errorMessage": "ERR:HGTE" }, { "pc": [4809], "errorMessage": "ERR:IAPP" }, { "pc": [4677], "errorMessage": "ERR:IAST" }, { "pc": [3195, 3452, 3827, 7277, 7325, 7545, 7753], "errorMessage": "ERR:IPAY" }, { "pc": [6629], "errorMessage": "ERR:IPWL" }, { "pc": [4623, 4653, 4725, 4784], "errorMessage": "ERR:IRFL" }, { "pc": [1616], "errorMessage": "ERR:ISRP" }, { "pc": [4524], "errorMessage": "ERR:IUPG" }, { "pc": [7654], "errorMessage": "ERR:IXFR" }, { "pc": [5465], "errorMessage": "ERR:NARP" }, { "pc": [3796, 4451, 4495, 4561], "errorMessage": "ERR:NDAO" }, { "pc": [5197], "errorMessage": "ERR:NEDT" }, { "pc": [3715], "errorMessage": "ERR:NGRF" }, { "pc": [3024], "errorMessage": "ERR:NMDX" }, { "pc": [3547, 6235], "errorMessage": "ERR:NMTA" }, { "pc": [7393], "errorMessage": "ERR:NONT" }, { "pc": [1564, 2442, 3042, 4017, 4971, 5066], "errorMessage": "ERR:NPST" }, { "pc": [3571], "errorMessage": "ERR:NPWL" }, { "pc": [5396], "errorMessage": "ERR:NRPL" }, { "pc": [4862], "errorMessage": "ERR:NRTP" }, { "pc": [2555, 4068], "errorMessage": "ERR:NVOT" }, { "pc": [7150], "errorMessage": "ERR:SVOT" }, { "pc": [5019], "errorMessage": "ERR:TSOL" }, { "pc": [910, 6923, 7240], "errorMessage": "IPCT" }, { "pc": [625], "errorMessage": "Length must be 16" }, { "pc": [4626, 4690, 4728, 4822, 5500], "errorMessage": "Length must be 32" }, { "pc": [993, 1087, 1104, 1110, 1213, 3008, 3211, 3699, 3788, 4443, 4487, 4553, 4793, 4830, 5731, 6004, 6060, 6808, 7336, 7778], "errorMessage": "application exists" }, { "pc": [4662, 4698], "errorMessage": "asset exists" }, { "pc": [1333, 1810, 2161, 2722, 2998, 3131, 3199, 3457, 3601, 3690, 3781, 3832, 4436, 4480, 4499, 4546, 4883, 5643, 5714, 5726, 5781, 5801, 5824, 5870, 5999, 6052, 6771, 6803, 6885, 6903, 7180, 7197, 7331, 7438, 7588, 7688, 7863], "errorMessage": "check GlobalState exists" }, { "pc": [4120], "errorMessage": "index access is out of bounds" }, { "pc": [2448, 3060, 3065, 3726, 3731, 4977, 5073, 5078, 5124, 5151, 5160, 5170, 5178, 5509, 6279, 6292, 6316, 6861], "errorMessage": "index out of bounds" }, { "pc": [745, 969, 1268, 1309, 1714, 1917, 2372, 2669, 2787, 3394, 3417, 3749, 3765, 4085, 4251, 4267, 4283, 4324, 4347, 4425, 4464, 8031, 8043], "errorMessage": "invalid array length header" }, { "pc": [1449, 1752, 1955, 2399, 2527, 2982, 3094], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [4097], "errorMessage": "invalid number of bytes for arc4.dynamic_array<ObjectE3B8A401>" }, { "pc": [1275, 1721, 1924, 2379, 2676, 2794, 3756, 3772, 4258, 4274, 4290, 4471], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1423, 1697, 1900], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 24>" }, { "pc": [1540, 2104, 2254, 2519, 2871, 2974, 3086, 3668, 3909, 3927, 3954, 3975, 4002, 4035, 4044, 4216, 4384], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1432, 1530, 1708, 1911, 2092, 2242], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [1286, 1413, 1440, 1459, 1468, 1548, 1687, 1732, 1741, 1764, 1775, 1890, 1935, 1944, 1967, 1978, 2112, 2262, 2390, 2687, 2696, 2805, 2814, 2879, 2992, 3107, 3117, 3127, 3490, 3498, 3506, 3514, 3522, 3531, 3676, 3684, 4224, 4374, 4392, 4539], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [4933, 7910, 8150], "errorMessage": "invalid number of bytes for bool" }, { "pc": [751], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [3425, 4355], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::ViewPayWallValue" }, { "pc": [1314, 4430], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1062, 1194, 3288, 3356, 3657, 5692], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [3386, 4316], "errorMessage": "invalid tail pointer at index 0 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1301, 4417], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [3409, 4339], "errorMessage": "invalid tail pointer at index 1 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1296, 3381, 3404, 4311, 4334, 4412], "errorMessage": "invalid tuple encoding" }, { "pc": [1679, 2080, 2663], "errorMessage": "transaction type is appl" }, { "pc": [1405, 1521, 1668, 1882, 2069, 2232, 2366, 2509, 2652, 2781], "errorMessage": "transaction type is axfer" }, { "pc": [1394, 1510, 1657, 1871, 2058, 2221, 2355, 2498, 2641, 2770, 3077, 3372, 3743], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgMTMyMDAgMzE3MDAgODY0MDAgNjcwMDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgIiIgMHgxNTFmN2M3NSAweDAwICJwIiAibSIgMHgxNCAiYWtpdGFfYXNzZXRzIiAiYWtpdGFfZXNjcm93IiAic2FsIiAiRVJSOklQQVkiICJzb2NpYWxfZmVlcyIgIkVSUjpOUFNUIiAweDAwMDAgMHgwMyAibyIgMHgwMSAiRVJSOkhHVEUiICJ3IiAid2FsbGV0IiAiRVJSOk5EQU8iICJFUlI6SVJGTCIgInBheXdhbGxfaWQiICJyZWZfdHlwZV9jb3VudGVyIiAiYWFsIiAweDBhIDB4MDIgIkVSUjpGR1RFIiAiciIgMHgyN2UzYmI0ZiAicGFsIiAiRVJSOkJBTkQiIDB4MDAwMSAidmVyc2lvbiIgIkVSUjpOVk9UIiAiRVJSOkFSQ1QiICJFUlI6Tk1UQSIgMHgwMDAwMDAwMDAwMDAwMDAwMDAgIkVSUjpCTEtEIiAweDY4MzVlM2JjICJFUlI6RVBTVCIgMHgwMDRkCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIHBheVdhbGxJZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEFraXRhU29jaWFsR2xvYmFsU3RhdGVLZXlzUGF5d2FsbElELCBpbml0aWFsVmFsdWU6IDEgfSkKICAgIGJ5dGVjIDIyIC8vICJwYXl3YWxsX2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHJlZlR5cGVDb3VudGVyID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQWtpdGFTb2NpYWxHbG9iYWxTdGF0ZUtleXNSZWZUeXBlQ291bnRlciwgaW5pdGlhbFZhbHVlOiBCdWlsdEluUmVmVHlwZUNvdW50IH0pCiAgICBieXRlYyAyMyAvLyAicmVmX3R5cGVfY291bnRlciIKICAgIHB1c2hpbnQgNAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI2LTMyCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbCBleHRlbmRzIGNsYXNzZXMoQmFzZVNvY2lhbCwgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNi0zMgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWwgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4pIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BANDAKICAgIHB1c2hieXRlc3MgMHg4M2YxNDc0OCAweDhlNTA3ZjFiIDB4MzM1YjNhOWMgMHhlMTVhODQyYiAweDAxMDI0NWRhIDB4ZjY1YTQ3YmQgMHhiZmY4YzNiNSAweDNhOWZkYTVlIDB4ODRmYTRiNWUgMHg1YWY2MDIyNyAweDYzNTk4YTE4IDB4NmU1Yjc3MDIgMHg1MTBlZGViNiAweDg1NjQzM2VhIDB4ZDA5ZjNkZTggMHg2OWE0ZWY5NyAweDMzMDZiMzJhIDB4OTVmOWYxYTMgMHhlM2JlZjk0MyAweGU2ZTY3YmRjIDB4NzM5ZWE3MGIgMHhjMDIyYmU4OSAweDk4YjgxZjc4IDB4OWUxNzRiYjYgMHhhODkxMjA0NCAweGYxMzYwMGQxIDB4MTQzMjRmYjcgMHhhMTM0YTI3OCAweDM0NDE3NWYwIDB4YWU4NGNiZDggMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAiaW5pdCgpdm9pZCIsIG1ldGhvZCAicG9zdChwYXksYXhmZXIsdWludDY0LGJ5dGVbMjRdLGJ5dGVbMzZdLHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZWRpdFBvc3QocGF5LGF4ZmVyLGJ5dGVbMzZdLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJnYXRlZFJlcGx5KHBheSxheGZlcixhcHBsLHVpbnQ2NCxieXRlWzI0XSxieXRlWzM2XSxieXRlW10sdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVwbHkocGF5LGF4ZmVyLHVpbnQ2NCxieXRlWzI0XSxieXRlWzM2XSxieXRlW10sdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRFZGl0UmVwbHkocGF5LGF4ZmVyLGFwcGwsYnl0ZVszNl0sYnl0ZVszMl0sdWludDY0KXZvaWQiLCBtZXRob2QgImVkaXRSZXBseShwYXksYXhmZXIsYnl0ZVszNl0sYnl0ZVszMl0sdWludDY0KXZvaWQiLCBtZXRob2QgInZvdGUocGF5LGF4ZmVyLGJ5dGVbXSx1aW50NjQsYm9vbCl2b2lkIiwgbWV0aG9kICJlZGl0Vm90ZShwYXksYXhmZXIsYnl0ZVszMl0sYm9vbCl2b2lkIiwgbWV0aG9kICJnYXRlZFJlYWN0KHBheSxheGZlcixhcHBsLGJ5dGVbXSx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgInJlYWN0KHBheSxheGZlcixieXRlW10sdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkZWxldGVSZWFjdGlvbihieXRlWzMyXSx1aW50NjQpdm9pZCIsIG1ldGhvZCAic2V0UG9zdE1vZGVyYXRpb24oYnl0ZVszMl0sYm9vbCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiaW5pdE1ldGEocGF5LGFkZHJlc3MsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImNyZWF0ZVBheVdhbGwocGF5LCgodWludDgsdWludDY0LHVpbnQ2NClbXSwodWludDgsdWludDY0LHVpbnQ2NClbXSkpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVNZXRhKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUZvbGxvd2VyTWV0YShhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVnaXN0ZXJSZWZUeXBlKHBheSxzdHJpbmcsYnl0ZVtdKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0U29jaWFsSW1wYWN0SW5wdXRzKGFkZHJlc3MpKGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbCkiLCBtZXRob2QgImdldE1ldGFFeGlzdHMoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRNZXRhKGFkZHJlc3MpKGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImdldFBvc3RFeGlzdHMoYnl0ZVszMl0pYm9vbCIsIG1ldGhvZCAiZ2V0UG9zdChieXRlWzMyXSkoYWRkcmVzcyx1aW50NjQsdWludDY0LGJvb2wsdWludDY0LGJvb2wsdWludDgsdWludDY0LHVpbnQ2NCxieXRlW10pIiwgbWV0aG9kICJnZXRWb3RlKGFkZHJlc3MsYnl0ZVszMl0pKHVpbnQ2NCxib29sKSIsIG1ldGhvZCAiZ2V0Vm90ZXMoKGFkZHJlc3MsYnl0ZVszMl0pW10pKHVpbnQ2NCxib29sKVtdIiwgbWV0aG9kICJnZXRSZWFjdGlvbkV4aXN0cyhieXRlWzMyXSx1aW50NjQpYm9vbCIsIG1ldGhvZCAibWJyKGJ5dGVbXSxzdHJpbmcsYnl0ZVtdKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInBheVdhbGxNYnIoKCh1aW50OCx1aW50NjQsdWludDY0KVtdLCh1aW50OCx1aW50NjQsdWludDY0KVtdKSl1aW50NjQiLCBtZXRob2QgImNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCkodWludDgsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBwb3N0IGVkaXRQb3N0IGdhdGVkUmVwbHkgcmVwbHkgZ2F0ZWRFZGl0UmVwbHkgZWRpdFJlcGx5IHZvdGUgZWRpdFZvdGUgZ2F0ZWRSZWFjdCByZWFjdCBkZWxldGVSZWFjdGlvbiBzZXRQb3N0TW9kZXJhdGlvbiBpbml0TWV0YSBjcmVhdGVQYXlXYWxsIHVwZGF0ZU1ldGEgdXBkYXRlRm9sbG93ZXJNZXRhIHJlZ2lzdGVyUmVmVHlwZSBnZXRTb2NpYWxJbXBhY3RJbnB1dHMgZ2V0TWV0YUV4aXN0cyBnZXRNZXRhIGdldFBvc3RFeGlzdHMgZ2V0UG9zdCBnZXRWb3RlIGdldFZvdGVzIGdldFJlYWN0aW9uRXhpc3RzIG1iciBwYXlXYWxsTWJyIGNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAzOAogICAgZXJyCgptYWluX29wVXBfcm91dGVAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MQogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEA0MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNi0zMgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWwgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweDVhZDlmNGM2IC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6YjE2KGI6IGJ5dGVzKSAtPiBieXRlczoKYjE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYjE2KGI6IGJ5dGVzKTogYnl0ZXM8MTY+IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzCiAgICAvLyByZXR1cm4gYi5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmltcGFjdFJhbmdlKGltcGFjdDogdWludDY0LCBtaW46IHVpbnQ2NCwgbWF4OiB1aW50NjQpIC0+IHVpbnQ2NDoKaW1wYWN0UmFuZ2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGltcGFjdFJhbmdlKGltcGFjdDogdWludDY0LCBtaW46IHVpbnQ2NCwgbWF4OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogaW1wYWN0UmFuZ2VfdGVybmFyeV9mYWxzZUAyCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMSAvLyAxCiAgICAtCgppbXBhY3RSYW5nZV90ZXJuYXJ5X21lcmdlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgKgogICAgcHVzaGludCAxMDAwCiAgICAvCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIC0KICAgIHJldHN1YgoKaW1wYWN0UmFuZ2VfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGltcGFjdFJhbmdlX3Rlcm5hcnlfbWVyZ2VAMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXRJRDogdWludDY0KSAtPiBieXRlczoKcmVmZXJyZXJPclplcm9BZGRyZXNzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0SUQ6IEFwcGxpY2F0aW9uKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiByZWZlcnJlck9yWmVyb0FkZHJlc3NfYWZ0ZXJfaWZfZWxzZUAzCiAgICBmcmFtZV9kaWcgMAoKcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBzd2FwCiAgICByZXRzdWIKCnJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc1CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGIgcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBiIGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnYXRlQ2hlY2soZ2F0ZVR4bjogdWludDY0LCBha2l0YURBTzogdWludDY0LCBjYWxsZXI6IGJ5dGVzLCBpZDogdWludDY0KSAtPiB1aW50NjQ6CmdhdGVDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGNhbGxlcjogQWNjb3VudCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM0CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzUKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBpbnRjXzAgLy8gMAogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hieXRlcyAweDQzOTIyNjU1IC8vIG1ldGhvZCAibXVzdENoZWNrKGFkZHJlc3MsdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzcKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgZnJhbWVfZGlnIC00CiAgICBpbnRjXzEgLy8gMQogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzgKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18zIC8vIDIKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMi0yMzkKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCmdhdGVDaGVja19ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzItMjM5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MgogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC0zCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTMKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldCkKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5NgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDYKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBjb25zdCBbd2FsbGV0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldEZlZXMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAxCiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMgogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAzCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA4CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOQogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBwdXNoaW50IDYwNDgwMAogICAgKwogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxMAogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMwogICAgaXRvYgogICAgZnJhbWVfZGlnIDYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzIgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIzCiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDQxNzAwCiAgICArCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI0CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfZWxzZV9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjkKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzAKICAgIC8vIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI4LTUzMQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzIKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDdiN2RjNWZjIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NwogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDUtNjEzCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBleHRyYWN0IDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTUKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAzCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2Vsc2VfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM4CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGZyYW1lX2RpZyA0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTQKICAgIGZyYW1lX2RpZyAxCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1MwogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyA0CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYyLTU3NAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2NgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2NS01NjgKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY5CiAgICAvLyB0cmFuc2ZlclR4biwKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTItNTU2CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzAKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGFmMWExNGYyIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDEKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDIwCgpzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOQogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDQKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDUKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0My01NDYKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDcKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxOAogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IGFtb3VudCwgcmVmZXJyYWxNYnI6IDAgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc5OQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMzMgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODAxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pbml0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDcKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGJ5dGVjIDcgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDcKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGxvZ2dlZEFzc2VydCghR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKGFrdGEpLCBFUlJfQUxSRUFEWV9PUFRFRF9JTikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogaW5pdF9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6QU9QVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBT1BUCgppbml0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgxMC04MTYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgxMwogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODEwLTgxNQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgxMC04MTYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyBpbml0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwucG9zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnBvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODIxLTgzMQogICAgLy8gcG9zdCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG5vbmNlOiBieXRlczwyND4sCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMjQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDI0PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MzIKICAgIC8vIGNvbnN0IHBvc3RLZXkgPSB0aGlzLmNvbXB1dGVQb3N0S2V5KHRpbWVzdGFtcCwgbm9uY2UpCiAgICB1bmNvdmVyIDYKICAgIHVuY292ZXIgNgogICAgY2FsbHN1YiBjb21wdXRlUG9zdEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblBvc3QpCiAgICB1bmNvdmVyIDYKICAgIGJ5dGVjIDI1IC8vIDB4MGEKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIHRoaXMuY3JlYXRlUG9zdChwb3N0S2V5LCBtYnJQYXltZW50LCBjaWQsIGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBQb3N0VHlwZVBvc3QsIEJ5dGVzKCcnKSwgY3JlYXRvckZsYWdzKQogICAgY292ZXIgNgogICAgY292ZXIgNgogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBieXRlY18xIC8vICIiCiAgICB1bmNvdmVyIDgKICAgIGNhbGxzdWIgY3JlYXRlUG9zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgyMS04MzEKICAgIC8vIHBvc3QoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBub25jZTogYnl0ZXM8MjQ+LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5lZGl0UG9zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVkaXRQb3N0OgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgzOC04NDQKICAgIC8vIGVkaXRQb3N0KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBvc3RzKGFtZW5kbWVudCkuZXhpc3RzLCBFUlJfUE9TVF9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlZGl0UG9zdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUFNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QU1QKCmVkaXRQb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg0NgogICAgLy8gY29uc3QgeyBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUsIGVkaXRLZXkgfSA9IHRoaXMudmVyaWZ5RWRpdEFtZW5kbWVudChhbWVuZG1lbnQsIGNpZCkKICAgIGRpZyAxCiAgICBkaWcgMwogICAgY2FsbHN1YiB2ZXJpZnlFZGl0QW1lbmRtZW50CiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA5CiAgICBkdXAKICAgIHB1c2hpbnQgODAKICAgIGdldGJpdAogICAgYnVyeSA3CiAgICBkdXAKICAgIHB1c2hpbnQgMTEKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDgKICAgIGR1cAogICAgZXh0cmFjdCAxOSAxCiAgICBzd2FwCiAgICBleHRyYWN0IDIwIDMyCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNSZXBseShwb3N0VHlwZSksIEVSUl9JU19BX1JFUExZKQogICAgY2FsbHN1YiBpc1JlcGx5CiAgICBieiBlZGl0UG9zdF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVNSUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1JQCgplZGl0UG9zdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NDkKICAgIC8vIHRoaXMudmFsaWRhdGVUaXAodGlwLCBUaXBBY3Rpb25Qb3N0KQogICAgZGlnIDMKICAgIGJ5dGVjIDI1IC8vIDB4MGEKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NTAKICAgIC8vIHRoaXMuY3JlYXRlUG9zdChlZGl0S2V5LCBtYnJQYXltZW50LCBjaWQsIGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBQb3N0VHlwZUVkaXRQb3N0LCBhbWVuZG1lbnQsIGNyZWF0b3JGbGFncykKICAgIGRpZyA4CiAgICBkaWcgNQogICAgZGlnIDQKICAgIGRpZyAxMAogICAgZGlnIDkKICAgIGRpZyAxMQogICAgYnl0ZWMgMjYgLy8gMHgwMgogICAgZGlnIDgKICAgIGRpZyA4CiAgICBjYWxsc3ViIGNyZWF0ZVBvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MzgtODQ0CiAgICAvLyBlZGl0UG9zdCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIGFtZW5kbWVudDogYnl0ZXM8MzI+LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nYXRlZFJlcGx5W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRSZXBseToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NTMtODY2CiAgICAvLyBnYXRlZFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgdGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG5vbmNlOiBieXRlczwyND4sCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICB1c2VQYXlXYWxsOiBib29sZWFuLAogICAgLy8gICBwYXlXYWxsSUQ6IHVpbnQ2NCwKICAgIC8vICAgY3JlYXRvckZsYWdzOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDI0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAyND4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgNQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg2NwogICAgLy8gY29uc3QgcmVwbHlLZXkgPSB0aGlzLmNvbXB1dGVQb3N0S2V5KHRpbWVzdGFtcCwgbm9uY2UpCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjb21wdXRlUG9zdEtleQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gY29uc3QgeyByZWZCeXRlcywgYWRkZWRNYnIsIHBvc3RHYXRlSUQgfSA9IHRoaXMucmVzb2x2ZVBhcmVudENvbnRleHQodHlwZSwgcmVmKQogICAgc3dhcAogICAgY2FsbHN1YiByZXNvbHZlUGFyZW50Q29udGV4dAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODcwCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHBvc3RHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODcwCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHBvc3RHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogZ2F0ZWRSZXBseV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjcgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkUmVwbHlfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODcyCiAgICAvLyB0aGlzLnZhbGlkYXRlVGlwKHRpcCwgVGlwQWN0aW9uUmVhY3QpCiAgICBkaWcgOAogICAgYnl0ZWMgNiAvLyAweDE0CiAgICBjYWxsc3ViIHZhbGlkYXRlVGlwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODczCiAgICAvLyB0aGlzLmNyZWF0ZVJlcGx5KHJlcGx5S2V5LCBtYnJQYXltZW50LCBhZGRlZE1iciwgY2lkLCByZWZCeXRlcywgZ2F0ZUlELCB1c2VQYXlXYWxsLCBwYXlXYWxsSUQsIFBvc3RUeXBlUmVwbHksIEJ5dGVzKCcnKSwgY3JlYXRvckZsYWdzKQogICAgZGlnIDIKICAgIGRpZyAxMAogICAgZGlnIDIKICAgIGRpZyAxMAogICAgZGlnIDUKICAgIGRpZyAxMQogICAgZGlnIDExCiAgICBkaWcgMTEKICAgIGJ5dGVjIDE2IC8vIDB4MDEKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGRpZyAxMwogICAgY2FsbHN1YiBjcmVhdGVSZXBseQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg1My04NjYKICAgIC8vIGdhdGVkUmVwbHkoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICB0aW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbm9uY2U6IGJ5dGVzPDI0PiwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIHJlZjogYnl0ZXMsCiAgICAvLyAgIHR5cGU6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5yZXBseVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlcGx5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg3Ni04ODgKICAgIC8vIHJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0aW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbm9uY2U6IGJ5dGVzPDI0PiwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIHJlZjogYnl0ZXMsCiAgICAvLyAgIHR5cGU6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDI0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAyND4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg4OQogICAgLy8gY29uc3QgcmVwbHlLZXkgPSB0aGlzLmNvbXB1dGVQb3N0S2V5KHRpbWVzdGFtcCwgbm9uY2UpCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjb21wdXRlUG9zdEtleQogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg5MQogICAgLy8gY29uc3QgeyByZWZCeXRlcywgYWRkZWRNYnIsIHBvc3RHYXRlSUQgfSA9IHRoaXMucmVzb2x2ZVBhcmVudENvbnRleHQodHlwZSwgcmVmKQogICAgc3dhcAogICAgY2FsbHN1YiByZXNvbHZlUGFyZW50Q29udGV4dAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODkyCiAgICAvLyBsb2dnZWRBc3NlcnQocG9zdEdhdGVJRCA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgYnogcmVwbHlfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6SEdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpIR1RFCgpyZXBseV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4OTQKICAgIC8vIHRoaXMudmFsaWRhdGVUaXAodGlwLCBUaXBBY3Rpb25SZWFjdCkKICAgIGRpZyA4CiAgICBieXRlYyA2IC8vIDB4MTQKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4OTUKICAgIC8vIHRoaXMuY3JlYXRlUmVwbHkocmVwbHlLZXksIG1iclBheW1lbnQsIGFkZGVkTWJyLCBjaWQsIHJlZkJ5dGVzLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgUG9zdFR5cGVSZXBseSwgQnl0ZXMoJycpLCBjcmVhdG9yRmxhZ3MpCiAgICBkaWcgMgogICAgZGlnIDEwCiAgICBkaWcgMgogICAgZGlnIDEwCiAgICBkaWcgNQogICAgZGlnIDExCiAgICBkaWcgMTEKICAgIGRpZyAxMQogICAgYnl0ZWMgMTYgLy8gMHgwMQogICAgYnl0ZWNfMSAvLyAiIgogICAgZGlnIDEzCiAgICBjYWxsc3ViIGNyZWF0ZVJlcGx5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODc2LTg4OAogICAgLy8gcmVwbHkoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBub25jZTogYnl0ZXM8MjQ+LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdhdGVkRWRpdFJlcGx5W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRFZGl0UmVwbHk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODk4LTkwNQogICAgLy8gZ2F0ZWRFZGl0UmVwbHkoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkwNgogICAgLy8gY29uc3QgeyBwYXJlbnRQb3N0UmVmLCBvZ1Bvc3RHYXRlSUQsIGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBlZGl0S2V5IH0gPSB0aGlzLnByZXBhcmVSZXBseUVkaXQoYW1lbmRtZW50LCBjaWQpCiAgICBzd2FwCiAgICBjYWxsc3ViIHByZXBhcmVSZXBseUVkaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDM4NAogICAgZ2V0Yml0CiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA0OQogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIGV4dHJhY3QgNTcgMzIKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MDcKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgb2dQb3N0R2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCBvZ1Bvc3RHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogZ2F0ZWRFZGl0UmVwbHlfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI3IC8vICJFUlI6RkdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGR1RFCgpnYXRlZEVkaXRSZXBseV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIHRoaXMudmFsaWRhdGVUaXAodGlwLCBUaXBBY3Rpb25SZWFjdCkKICAgIGRpZyA4CiAgICBieXRlYyA2IC8vIDB4MTQKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MTAKICAgIC8vIHRoaXMuY3JlYXRlUmVwbHkoZWRpdEtleSwgbWJyUGF5bWVudCwgMCwgY2lkLCBwYXJlbnRQb3N0UmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgUG9zdFR5cGVFZGl0UmVwbHksIGFtZW5kbWVudCwgY3JlYXRvckZsYWdzKQogICAgZHVwCiAgICBkaWcgMTAKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMTAKICAgIGRpZyA4CiAgICBkaWcgOAogICAgZGlnIDgKICAgIGRpZyA4CiAgICBieXRlYyAxNCAvLyAweDAzCiAgICBkaWcgMTUKICAgIGRpZyAxNQogICAgY2FsbHN1YiBjcmVhdGVSZXBseQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg5OC05MDUKICAgIC8vIGdhdGVkRWRpdFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIGFtZW5kbWVudDogYnl0ZXM8MzI+LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5lZGl0UmVwbHlbcm91dGluZ10oKSAtPiB2b2lkOgplZGl0UmVwbHk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTEzLTkxOQogICAgLy8gZWRpdFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTIwCiAgICAvLyBjb25zdCB7IHBhcmVudFBvc3RSZWYsIG9nUG9zdEdhdGVJRCwgZ2F0ZUlELCB1c2VQYXlXYWxsLCBwYXlXYWxsSUQsIGVkaXRLZXkgfSA9IHRoaXMucHJlcGFyZVJlcGx5RWRpdChhbWVuZG1lbnQsIGNpZCkKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJlcGFyZVJlcGx5RWRpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgZGlnIDEKICAgIHB1c2hpbnQgMzg0CiAgICBnZXRiaXQKICAgIGNvdmVyIDIKICAgIGRpZyAxCiAgICBwdXNoaW50IDQ5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgc3dhcAogICAgZXh0cmFjdCA1NyAzMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KG9nUG9zdEdhdGVJRCA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgYnogZWRpdFJlcGx5X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOkhHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEdURQoKZWRpdFJlcGx5X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkyMwogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgZGlnIDgKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkyNAogICAgLy8gdGhpcy5jcmVhdGVSZXBseShlZGl0S2V5LCBtYnJQYXltZW50LCAwLCBjaWQsIHBhcmVudFBvc3RSZWYsIGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBQb3N0VHlwZUVkaXRSZXBseSwgYW1lbmRtZW50LCBjcmVhdG9yRmxhZ3MpCiAgICBkdXAKICAgIGRpZyAxMAogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxMAogICAgZGlnIDgKICAgIGRpZyA4CiAgICBkaWcgOAogICAgZGlnIDgKICAgIGJ5dGVjIDE0IC8vIDB4MDMKICAgIGRpZyAxNQogICAgZGlnIDE1CiAgICBjYWxsc3ViIGNyZWF0ZVJlcGx5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTEzLTkxOQogICAgLy8gZWRpdFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnZvdGVbcm91dGluZ10oKSAtPiB2b2lkOgp2b3RlOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MjctOTMzCiAgICAvLyB2b3RlKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIGlzVXA6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MzQKICAgIC8vIGxldCB7IHJlZkJ5dGVzLCBjcmVhdG9yIH0gPSB0aGlzLnRvQnl0ZXMzMih0eXBlLCByZWYpCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiB0b0J5dGVzMzIKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDMyIDMyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTM1CiAgICAvLyBpZiAodHlwZSA9PT0gUmVmVHlwZVBvc3QpIHsKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYnogdm90ZV9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MwogICAgLy8gcG9zdHMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBQb3N0VmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFBvc3RzIH0pCiAgICBieXRlYyA0IC8vICJwIgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBvc3RzKHJlZkJ5dGVzKS5leGlzdHMsIEVSUl9QT1NUX05PVF9GT1VORCk7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB2b3RlX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAxMiAvLyAiRVJSOk5QU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBTVAoKdm90ZV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MzcKICAgIC8vICh7IGNyZWF0b3IgfSA9IHRoaXMucG9zdHMocmVmQnl0ZXMpLnZhbHVlKTsKICAgIGRpZyA1CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ1cnkgMQoKdm90ZV9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTQwCiAgICAvLyBjb25zdCBhZGRlZE1iciA9IHRoaXMuY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3NhcnkocmVmQnl0ZXMsIGNyZWF0b3IpCiAgICBkaWcgMQogICAgZHVwCiAgICBkaWcgMgogICAgY2FsbHN1YiBjcmVhdGVFbXB0eVBvc3RJZk5lY2Vzc2FyeQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk0MgogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgZGlnIDUKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk0MwogICAgLy8gY29uc3QgbWJyTmVlZGVkOiB1aW50NjQgPSB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLnZvdGVsaXN0ICsgYWRkZWRNYnIKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk0NAogICAgLy8gdGhpcy5jcmVhdGVWb3RlKG1iclBheW1lbnQsIG1ick5lZWRlZCwgcmVmQnl0ZXMsIGlzVXApCiAgICBkaWcgNgogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBkaWcgNQogICAgY2FsbHN1YiBjcmVhdGVWb3RlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTI3LTkzMwogICAgLy8gdm90ZSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBpc1VwOiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmVkaXRWb3RlW3JvdXRpbmddKCkgLT4gdm9pZDoKZWRpdFZvdGU6CiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTQ3LTk1MgogICAgLy8gZWRpdFZvdGUoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlZjogYnl0ZXM8MzI+LAogICAgLy8gICBmbGlwOiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIGNvbnN0IHZvdGVMaXN0S2V5OiBWb3RlTGlzdEtleSA9IHsgdXNlcjogYjE2KFR4bi5zZW5kZXIuYnl0ZXMpLCByZWY6IGIxNihyZWYpIH0KICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYjE2CiAgICBzd2FwCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLmV4aXN0cywgRVJSX0hBVkVOVF9WT1RFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVkaXRWb3RlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNCAvLyAiRVJSOk5WT1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlZPVAoKZWRpdFZvdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTU2CiAgICAvLyBjb25zdCB7IGltcGFjdCwgaXNVcCB9ID0gdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUKICAgIGR1cG4gMgogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDY0CiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIHRoaXMudXBkYXRlVm90ZXMocmVmLCAhaXNVcCwgaW1wYWN0KQogICAgIQogICAgZHVwCiAgICBidXJ5IDkKICAgIGRpZyA1CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgdXBkYXRlVm90ZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NjUKICAgIC8vIGlmICghZmxpcCkgewogICAgZGlnIDEKICAgIGJueiBlZGl0Vm90ZV9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NjctOTcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkudm90ZWxpc3QKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTY5CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NzAKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS52b3RlbGlzdAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwbiAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk2Ny05NzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS52b3RlbGlzdAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk2Ny05NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS52b3RlbGlzdAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgplZGl0Vm90ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZWRpdFZvdGVANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NDctOTUyCiAgICAvLyBlZGl0Vm90ZSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlczwzMj4sCiAgICAvLyAgIGZsaXA6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZWRpdFZvdGVfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgZGlnIDMKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gdGhpcy5jcmVhdGVWb3RlKG1iclBheW1lbnQsIDAsIHJlZiwgIWlzVXApCiAgICBkaWcgNAogICAgaW50Y18wIC8vIDAKICAgIGRpZyA0CiAgICBkaWcgOAogICAgY2FsbHN1YiBjcmVhdGVWb3RlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTQ3LTk1MgogICAgLy8gZWRpdFZvdGUoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlZjogYnl0ZXM8MzI+LAogICAgLy8gICBmbGlwOiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIGIgZWRpdFZvdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmVkaXRWb3RlQDcKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdhdGVkUmVhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFJlYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk4Mi05ODkKICAgIC8vIGdhdGVkUmVhY3QoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIE5GVDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk5MAogICAgLy8gY29uc3QgeyByZWZCeXRlcywgYWRkZWRNYnIsIHBvc3RHYXRlSUQgfSA9IHRoaXMucmVzb2x2ZVBhcmVudENvbnRleHQodHlwZSwgcmVmKQogICAgc3dhcAogICAgY2FsbHN1YiByZXNvbHZlUGFyZW50Q29udGV4dAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHBvc3RHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIHBvc3RHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogZ2F0ZWRSZWFjdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjcgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkUmVhY3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTkzCiAgICAvLyB0aGlzLnZhbGlkYXRlVGlwKHRpcCwgVGlwQWN0aW9uUmVhY3QpCiAgICBkaWcgMwogICAgYnl0ZWMgNiAvLyAweDE0CiAgICBjYWxsc3ViIHZhbGlkYXRlVGlwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTk0CiAgICAvLyB0aGlzLmNyZWF0ZVJlYWN0aW9uKG1iclBheW1lbnQsIGFkZGVkTWJyLCByZWZCeXRlcywgTkZUKQogICAgZGlnIDQKICAgIGRpZyAxCiAgICBkaWcgMwogICAgZGlnIDUKICAgIGNhbGxzdWIgY3JlYXRlUmVhY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5ODItOTg5CiAgICAvLyBnYXRlZFJlYWN0KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBORlQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5yZWFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk5Ny0xMDAzCiAgICAvLyByZWFjdCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBORlQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAwNAogICAgLy8gY29uc3QgeyByZWZCeXRlcywgYWRkZWRNYnIsIHBvc3RHYXRlSUQgfSA9IHRoaXMucmVzb2x2ZVBhcmVudENvbnRleHQodHlwZSwgcmVmKQogICAgc3dhcAogICAgY2FsbHN1YiByZXNvbHZlUGFyZW50Q29udGV4dAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBvc3RHYXRlSUQgPT09IDAsIEVSUl9IQVNfR0FURSkKICAgIGJ6IHJlYWN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOkhHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEdURQoKcmVhY3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAwNwogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgZGlnIDMKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMDgKICAgIC8vIHRoaXMuY3JlYXRlUmVhY3Rpb24obWJyUGF5bWVudCwgYWRkZWRNYnIsIHJlZkJ5dGVzLCBORlQpCiAgICBkaWcgNAogICAgZGlnIDEKICAgIGRpZyAzCiAgICBkaWcgNQogICAgY2FsbHN1YiBjcmVhdGVSZWFjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk5Ny0xMDAzCiAgICAvLyByZWFjdCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBORlQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5kZWxldGVSZWFjdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVJlYWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMTEKICAgIC8vIGRlbGV0ZVJlYWN0aW9uKHJlZjogYnl0ZXM8MzI+LCBORlQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMTIKICAgIC8vIHRoaXMubG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2socmVmKQogICAgZGlnIDEKICAgIGNhbGxzdWIgbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2sKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMTQKICAgIC8vIGNvbnN0IHJlYWN0aW9uTGlzdEtleTogUmVhY3Rpb25MaXN0S2V5ID0geyB1c2VyOiBiMTYoVHhuLnNlbmRlci5ieXRlcyksIHJlZjogYjE2KHJlZiksIE5GVCB9CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGIxNgogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyByZWFjdGlvbmxpc3QgPSBCb3hNYXA8UmVhY3Rpb25MaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UmVhY3Rpb25MaXN0IH0pCiAgICBwdXNoYnl0ZXMgImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJlYWN0aW9ubGlzdChyZWFjdGlvbkxpc3RLZXkpLmV4aXN0cywgRVJSX0FMUkVBRFlfUkVBQ1RFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlbGV0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNSAvLyAiRVJSOkFSQ1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVJDVAoKZGVsZXRlUmVhY3Rpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxOAogICAgLy8gdGhpcy5yZWFjdGlvbnMoeyByZWYsIE5GVCB9KS52YWx1ZSAtPSAxCiAgICBkaWcgMgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyByZWFjdGlvbnMgPSBCb3hNYXA8UmVhY3Rpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFJlYWN0aW9ucyB9KQogICAgYnl0ZWMgMjggLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDE4CiAgICAvLyB0aGlzLnJlYWN0aW9ucyh7IHJlZiwgTkZUIH0pLnZhbHVlIC09IDEKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxOQogICAgLy8gdGhpcy5yZWFjdGlvbmxpc3QocmVhY3Rpb25MaXN0S2V5KS5kZWxldGUoKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDIxLTEwMjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5yZWFjdGlvbmxpc3QsCiAgICAvLyAKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAyMwogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAyNAogICAgLy8gYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLnJlYWN0aW9ubGlzdCwKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBwdXNoaW50IDQ4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDIxLTEwMjYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5yZWFjdGlvbmxpc3QsCiAgICAvLyAKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDIxLTEwMjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5yZWFjdGlvbmxpc3QsCiAgICAvLyAKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMTEKICAgIC8vIGRlbGV0ZVJlYWN0aW9uKHJlZjogYnl0ZXM8MzI+LCBORlQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuc2V0UG9zdE1vZGVyYXRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpzZXRQb3N0TW9kZXJhdGlvbjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAzNgogICAgLy8gc2V0UG9zdE1vZGVyYXRpb24ocmVmOiBieXRlczwzMj4sIGFnYWluc3RDb250ZW50UG9saWN5OiBib29sZWFuLCBtb2RlcmF0b3JGbGFnczogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMzgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubW9kZXJhdGlvbikuYWRkcmVzcywgRVJSX05PVF9NT0RFUkFUSU9OKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMzgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubW9kZXJhdGlvbikuYWRkcmVzcywgRVJSX05PVF9NT0RFUkFUSU9OKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDM4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1vZGVyYXRpb24pLmFkZHJlc3MsIEVSUl9OT1RfTU9ERVJBVElPTikKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHNldFBvc3RNb2RlcmF0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpOTURYIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NRFgKCnNldFBvc3RNb2RlcmF0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICBkaWcgMwogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBvc3RzKHJlZikuZXhpc3RzLCBFUlJfUE9TVF9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRQb3N0TW9kZXJhdGlvbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUFNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QU1QKCnNldFBvc3RNb2RlcmF0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNDAKICAgIC8vIHRoaXMucG9zdHMocmVmKS52YWx1ZS5hZ2FpbnN0Q29udGVudFBvbGljeSA9IGFnYWluc3RDb250ZW50UG9saWN5CiAgICBkaWcgMwogICAgZHVwCiAgICBwdXNoaW50IDU3CiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QKICAgIGludGNfMCAvLyAwCiAgICBkaWcgNAogICAgc2V0Yml0CiAgICBkaWcgMQogICAgcHVzaGludCA1NwogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNDEKICAgIC8vIHRoaXMucG9zdHMocmVmKS52YWx1ZS5tb2RlcmF0b3JGbGFncyA9IG1vZGVyYXRvckZsYWdzCiAgICBwdXNoaW50IDY3CiAgICBkaWcgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDM2CiAgICAvLyBzZXRQb3N0TW9kZXJhdGlvbihyZWY6IGJ5dGVzPDMyPiwgYWdhaW5zdENvbnRlbnRQb2xpY3k6IGJvb2xlYW4sIG1vZGVyYXRvckZsYWdzOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmluaXRNZXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdE1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0NC0xMDUxCiAgICAvLyBpbml0TWV0YSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB1c2VyOiBBY2NvdW50LAogICAgLy8gICBhdXRvbWF0ZWQ6IGJvb2xlYW4sCiAgICAvLyAgIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsCiAgICAvLyAgIE5GRDogdWludDY0LAogICAgLy8gICBha2l0YU5GVDogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDUyCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgdXNlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDUyCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgdXNlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDUzCiAgICAvLyBjb25zdCB1c2VySXNTZW5kZXIgPSAoVHhuLnNlbmRlciA9PT0gdXNlcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNTUKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5tZXRhKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX01FVEFfQUxSRUFEWV9FWElTVFMpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU1CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMubWV0YShUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9NRVRBX0FMUkVBRFlfRVhJU1RTKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBpbml0TWV0YV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6RU1UQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFTVRBCgppbml0TWV0YV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU4LTEwNjQKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5tZXRhICsgSW1wYWN0TWV0YU1CUgogICAgLy8gICB9CiAgICAvLyApLAogICAgZGlnIDYKICAgIGR1cAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDYxCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNTgtMTA2NAogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLm1ldGEgKyBJbXBhY3RNZXRhTUJSCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA2MgogICAgLy8gYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLm1ldGEgKyBJbXBhY3RNZXRhTUJSCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIGludGMgNiAvLyAzMTcwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNTgtMTA2NAogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLm1ldGEgKyBJbXBhY3RNZXRhTUJSCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU3LTEwNjYKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgbWJyUGF5bWVudCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkubWV0YSArIEltcGFjdE1ldGFNQlIKICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBpbml0TWV0YV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmluaXRNZXRhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNjgKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5pbXBhY3QKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDY4CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgOSAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNjgKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5pbXBhY3QKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDcwLTEwNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihpbXBhY3QpLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBJbXBhY3RNZXRhTUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNzIKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihpbXBhY3QpLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA3MwogICAgLy8gYW1vdW50OiBJbXBhY3RNZXRhTUJSCiAgICBpbnRjIDYgLy8gMzE3MDAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA3MC0xMDc0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oaW1wYWN0KS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogSW1wYWN0TWV0YU1CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNzAtMTA3NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGltcGFjdCkuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEltcGFjdE1ldGFNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNzcKICAgIC8vIGlmIChhdXRvbWF0ZWQpIHsKICAgIGRpZyA2CiAgICBieiBpbml0TWV0YV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDc4CiAgICAvLyB0aGlzLmNyZWF0ZURlZmF1bHRNZXRhKFR4bi5zZW5kZXIsIHVzZXJJc1NlbmRlciwgd2FsbGV0LmlkLCB0cnVlKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGRpZyA0CiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjcmVhdGVEZWZhdWx0TWV0YQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwODAtMTA4OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmNhY2hlTWV0YT4oewogICAgLy8gICBhcHBJZDogaW1wYWN0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAwLAogICAgLy8gICAgIDAsCiAgICAvLyAgICAgMAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwODMKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA4NAogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwODAtMTA4OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmNhY2hlTWV0YT4oewogICAgLy8gICBhcHBJZDogaW1wYWN0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAwLAogICAgLy8gICAgIDAsCiAgICAvLyAgICAgMAogICAgLy8gICBdCiAgICAvLyB9KQogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJjYWNoZU1ldGEoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOTAKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKaW5pdE1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmluaXRNZXRhQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNDQtMTA1MQogICAgLy8gaW5pdE1ldGEoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdXNlcjogQWNjb3VudCwKICAgIC8vICAgYXV0b21hdGVkOiBib29sZWFuLAogICAgLy8gICBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LAogICAgLy8gICBORkQ6IHVpbnQ2NCwKICAgIC8vICAgYWtpdGFORlQ6IHVpbnQ2NCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppbml0TWV0YV9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA5MwogICAgLy8gdGhpcy5jcmVhdGVEZWZhdWx0TWV0YShUeG4uc2VuZGVyLCB1c2VySXNTZW5kZXIsIHdhbGxldC5pZCwgZmFsc2UpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgZGlnIDQKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGNyZWF0ZURlZmF1bHRNZXRhCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA5OS0xMTA3CiAgICAvLyBjb25zdCBpbXBhY3RTY29yZSA9IGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5jYWNoZU1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IGltcGFjdCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgc3Vic2NyaXB0aW9uSW5kZXgsCiAgICAvLyAgICAgTkZELAogICAgLy8gICAgIGFraXRhTkZUCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEwMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOTktMTEwNwogICAgLy8gY29uc3QgaW1wYWN0U2NvcmUgPSBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuY2FjaGVNZXRhPih7CiAgICAvLyAgIGFwcElkOiBpbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHN1YnNjcmlwdGlvbkluZGV4LAogICAgLy8gICAgIE5GRCwKICAgIC8vICAgICBha2l0YU5GVAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJjYWNoZU1ldGEoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTEzCiAgICAvLyByZXR1cm4gaW1wYWN0U2NvcmUgKyAxCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNDQtMTA1MQogICAgLy8gaW5pdE1ldGEoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdXNlcjogQWNjb3VudCwKICAgIC8vICAgYXV0b21hdGVkOiBib29sZWFuLAogICAgLy8gICBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LAogICAgLy8gICBORkQ6IHVpbnQ2NCwKICAgIC8vICAgYWtpdGFORlQ6IHVpbnQ2NCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBiIGluaXRNZXRhX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pbml0TWV0YUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlUGF5V2FsbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZVBheVdhbGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTExNgogICAgLy8gY3JlYXRlUGF5V2FsbChtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHBheVdhbGw6IFZpZXdQYXlXYWxsVmFsdWUpOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbisodWludDgsdWludDY0LHVpbnQ2NClbXSksKGxlbisodWludDgsdWludDY0LHVpbnQ2NClbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDE3CiAgICAqCiAgICBwdXNoaW50IDYKICAgICsKICAgIGRpZyAyCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAoKGxlbisodWludDgsdWludDY0LHVpbnQ2NClbXSksKGxlbisodWludDgsdWludDY0LHVpbnQ2NClbXSkpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDE3CiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3NvY2lhbC90eXBlcy50czo6Vmlld1BheVdhbGxWYWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTgtMTEyNgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB7CiAgICAvLyAgICAgICBncmVhdGVyVGhhbkVxOiB0aGlzLnBheVdhbGxNYnIocGF5V2FsbCkKICAgIC8vICAgICB9CiAgICAvLyAgIH0KICAgIC8vICksCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTIxCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTgtMTEyNgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB7CiAgICAvLyAgICAgICBncmVhdGVyVGhhbkVxOiB0aGlzLnBheVdhbGxNYnIocGF5V2FsbCkKICAgIC8vICAgICB9CiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTIzCiAgICAvLyBncmVhdGVyVGhhbkVxOiB0aGlzLnBheVdhbGxNYnIocGF5V2FsbCkKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwucGF5V2FsbE1icgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTgtMTEyNgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB7CiAgICAvLyAgICAgICBncmVhdGVyVGhhbkVxOiB0aGlzLnBheVdhbGxNYnIocGF5V2FsbCkKICAgIC8vICAgICB9CiAgICAvLyAgIH0KICAgIC8vICksCiAgICA+PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTE3LTExMjgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgbWJyUGF5bWVudCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHsKICAgIC8vICAgICAgICAgZ3JlYXRlclRoYW5FcTogdGhpcy5wYXlXYWxsTWJyKHBheVdhbGwpCiAgICAvLyAgICAgICB9CiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogY3JlYXRlUGF5V2FsbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVBheVdhbGxfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEzMAogICAgLy8gY29uc3QgaWQgPSB0aGlzLnBheVdhbGxJZC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNgogICAgLy8gcGF5V2FsbElkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQWtpdGFTb2NpYWxHbG9iYWxTdGF0ZUtleXNQYXl3YWxsSUQsIGluaXRpYWxWYWx1ZTogMSB9KQogICAgYnl0ZWMgMjIgLy8gInBheXdhbGxfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEzMAogICAgLy8gY29uc3QgaWQgPSB0aGlzLnBheVdhbGxJZC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTMxCiAgICAvLyB0aGlzLnBheVdhbGxJZC52YWx1ZSsrCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIHBheVdhbGxJZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEFraXRhU29jaWFsR2xvYmFsU3RhdGVLZXlzUGF5d2FsbElELCBpbml0aWFsVmFsdWU6IDEgfSkKICAgIGJ5dGVjIDIyIC8vICJwYXl3YWxsX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMzEKICAgIC8vIHRoaXMucGF5V2FsbElkLnZhbHVlKysKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEzMwogICAgLy8gdGhpcy5wYXl3YWxsKGlkKS52YWx1ZSA9IGNsb25lKHBheVdhbGwpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIHBheXdhbGwgPSBCb3hNYXA8dWludDY0LCBWaWV3UGF5V2FsbFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxib3hQcmVmaXhQYXlXYWxsIH0pCiAgICBieXRlYyAxOCAvLyAidyIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTMzCiAgICAvLyB0aGlzLnBheXdhbGwoaWQpLnZhbHVlID0gY2xvbmUocGF5V2FsbCkKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBkaWcgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTYKICAgIC8vIGNyZWF0ZVBheVdhbGwobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBwYXlXYWxsOiBWaWV3UGF5V2FsbFZhbHVlKTogdWludDY0IHsKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnVwZGF0ZU1ldGFbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVNZXRhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMzgtMTE0NQogICAgLy8gdXBkYXRlTWV0YSgKICAgIC8vICAgZm9sbG93R2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIGFkZHJlc3NHYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgc3Vic2NyaXB0aW9uSW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgTkZEOiB1aW50NjQsCiAgICAvLyAgIGFraXRhTkZUOiB1aW50NjQsCiAgICAvLyAgIGRlZmF1bHRQYXlXYWxsSUQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1ldGEoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTUVUQV9ET0VTTlRfRVhJU1QpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tZXRhKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX01FVEFfRE9FU05UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdXBkYXRlTWV0YV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzYgLy8gIkVSUjpOTVRBIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NVEEKCnVwZGF0ZU1ldGFfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5d2FsbChkZWZhdWx0UGF5V2FsbElEKS5leGlzdHMsIEVSUl9QQVlXQUxMX05PVF9GT1VORCkKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBwYXl3YWxsID0gQm94TWFwPHVpbnQ2NCwgVmlld1BheVdhbGxWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsYm94UHJlZml4UGF5V2FsbCB9KQogICAgYnl0ZWMgMTggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXl3YWxsKGRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cywgRVJSX1BBWVdBTExfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdXBkYXRlTWV0YV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6TlBXTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUFdMCgp1cGRhdGVNZXRhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTU0CiAgICAvLyBjb25zdCBtID0gY2xvbmUodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE1NAogICAgLy8gY29uc3QgbSA9IGNsb25lKHRoaXMubWV0YShUeG4uc2VuZGVyKS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE1NQogICAgLy8gbS5mb2xsb3dHYXRlSUQgPSBmb2xsb3dHYXRlSUQKICAgIGRpZyA3CiAgICByZXBsYWNlMiA1MAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNTYKICAgIC8vIG0uYWRkcmVzc0dhdGVJRCA9IGFkZHJlc3NHYXRlSUQKICAgIGRpZyA2CiAgICByZXBsYWNlMiA1OAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNTcKICAgIC8vIG0uZGVmYXVsdFBheVdhbGxJRCA9IGRlZmF1bHRQYXlXYWxsSUQKICAgIGRpZyAyCiAgICByZXBsYWNlMiA2NgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTU4CiAgICAvLyB0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUgPSBjbG9uZShtKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE1OAogICAgLy8gdGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlID0gY2xvbmUobSkKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTYwCiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE2MAogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmltcGFjdAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTYwCiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNjEtMTE2OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmNhY2hlTWV0YT4oewogICAgLy8gICBhcHBJZDogaW1wYWN0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBzdWJzY3JpcHRpb25JbmRleCwKICAgIC8vICAgICBORkQsCiAgICAvLyAgICAgYWtpdGFORlQKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTY0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE2MS0xMTY5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuY2FjaGVNZXRhPih7CiAgICAvLyAgIGFwcElkOiBpbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHN1YnNjcmlwdGlvbkluZGV4LAogICAgLy8gICAgIE5GRCwKICAgIC8vICAgICBha2l0YU5GVAogICAgLy8gICBdCiAgICAvLyB9KQogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJjYWNoZU1ldGEoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEzOC0xMTQ1CiAgICAvLyB1cGRhdGVNZXRhKAogICAgLy8gICBmb2xsb3dHYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgYWRkcmVzc0dhdGVJRDogdWludDY0LAogICAgLy8gICBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LAogICAgLy8gICBORkQ6IHVpbnQ2NCwKICAgIC8vICAgYWtpdGFORlQ6IHVpbnQ2NCwKICAgIC8vICAgZGVmYXVsdFBheVdhbGxJRDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnVwZGF0ZUZvbGxvd2VyTWV0YVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUZvbGxvd2VyTWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTcyCiAgICAvLyB1cGRhdGVGb2xsb3dlck1ldGEoYWRkcmVzczogQWNjb3VudCwgbmV3Rm9sbG93ZXJJbmRleDogdWludDY0LCBuZXdGb2xsb3dlckNvdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTczCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmdyYXBoKS5hZGRyZXNzLCBFUlJfTk9UX0dSQVBIKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNzMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuZ3JhcGgpLmFkZHJlc3MsIEVSUl9OT1RfR1JBUEgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgOSAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNzMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuZ3JhcGgpLmFkZHJlc3MsIEVSUl9OT1RfR1JBUEgpCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlRm9sbG93ZXJNZXRhX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpOR1JGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5HUkYKCnVwZGF0ZUZvbGxvd2VyTWV0YV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NQogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1ldGEgfSkKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBkaWcgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE3NAogICAgLy8gdGhpcy5tZXRhKGFkZHJlc3MpLnZhbHVlLmZvbGxvd2VySW5kZXggPSBuZXdGb2xsb3dlckluZGV4CiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGRpZyA0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNzUKICAgIC8vIHRoaXMubWV0YShhZGRyZXNzKS52YWx1ZS5mb2xsb3dlckNvdW50ID0gbmV3Rm9sbG93ZXJDb3VudAogICAgcHVzaGludCA0MQogICAgZGlnIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE3MgogICAgLy8gdXBkYXRlRm9sbG93ZXJNZXRhKGFkZHJlc3M6IEFjY291bnQsIG5ld0ZvbGxvd2VySW5kZXg6IHVpbnQ2NCwgbmV3Rm9sbG93ZXJDb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5yZWdpc3RlclJlZlR5cGVbcm91dGluZ10oKSAtPiB2b2lkOgpyZWdpc3RlclJlZlR5cGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4MAogICAgLy8gcmVnaXN0ZXJSZWZUeXBlKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbmFtZTogc3RyaW5nLCBzY2hlbWE6IGJ5dGVzKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHJlZ2lzdGVyUmVmVHlwZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnJlZ2lzdGVyUmVmVHlwZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTg0LTExOTAKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCBuYW1lLCBzY2hlbWEpLnJlZlR5cGVzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICBkaWcgMgogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODcKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4NC0xMTkwCiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgbmFtZSwgc2NoZW1hKS5yZWZUeXBlcwogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODgKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCBuYW1lLCBzY2hlbWEpLnJlZlR5cGVzCiAgICBieXRlY18xIC8vICIiCiAgICBkaWcgNAogICAgZGlnIDQKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTg0LTExOTAKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCBuYW1lLCBzY2hlbWEpLnJlZlR5cGVzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTgzLTExOTIKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgbWJyUGF5bWVudCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgbmFtZSwgc2NoZW1hKS5yZWZUeXBlcwogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IHJlZ2lzdGVyUmVmVHlwZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnJlZ2lzdGVyUmVmVHlwZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTk0CiAgICAvLyB0aGlzLnJlZlR5cGVDb3VudGVyLnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHJlZlR5cGVDb3VudGVyID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQWtpdGFTb2NpYWxHbG9iYWxTdGF0ZUtleXNSZWZUeXBlQ291bnRlciwgaW5pdGlhbFZhbHVlOiBCdWlsdEluUmVmVHlwZUNvdW50IH0pCiAgICBieXRlYyAyMyAvLyAicmVmX3R5cGVfY291bnRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTk0CiAgICAvLyB0aGlzLnJlZlR5cGVDb3VudGVyLnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyByZWZUeXBlQ291bnRlciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEFraXRhU29jaWFsR2xvYmFsU3RhdGVLZXlzUmVmVHlwZUNvdW50ZXIsIGluaXRpYWxWYWx1ZTogQnVpbHRJblJlZlR5cGVDb3VudCB9KQogICAgYnl0ZWMgMjMgLy8gInJlZl90eXBlX2NvdW50ZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE5NAogICAgLy8gdGhpcy5yZWZUeXBlQ291bnRlci52YWx1ZSArPSAxCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTk3CiAgICAvLyB0aGlzLnJlZlR5cGVzKGlkKS52YWx1ZSA9IHsgbmFtZSwgc2NoZW1hIH0KICAgIGRpZyAyCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNAogICAgKwogICAgZGlnIDMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgcHVzaGJ5dGVzIDB4MDAwNAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTcKICAgIC8vIHJlZlR5cGVzID0gQm94TWFwPHVpbnQ2NCwgUmVmVHlwZVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhSZWZUeXBlcyB9KQogICAgcHVzaGJ5dGVzICJ0IgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExOTcKICAgIC8vIHRoaXMucmVmVHlwZXMoaWQpLnZhbHVlID0geyBuYW1lLCBzY2hlbWEgfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODAKICAgIC8vIHJlZ2lzdGVyUmVmVHlwZShtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywgc2NoZW1hOiBieXRlcyk6IHVpbnQ2NCB7CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRTb2NpYWxJbXBhY3RJbnB1dHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTb2NpYWxJbXBhY3RJbnB1dHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIyMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIyNQogICAgLy8gcmV0dXJuIHRoaXMucmVhZFNvY2lhbEltcGFjdElucHV0cyh1c2VyKQogICAgY2FsbHN1YiByZWFkU29jaWFsSW1wYWN0SW5wdXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIyMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRNZXRhRXhpc3RzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0TWV0YUV4aXN0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjI4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NQogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1ldGEgfSkKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjMwCiAgICAvLyByZXR1cm4gdGhpcy5tZXRhKHVzZXIpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIyOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18zIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0TWV0YVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldE1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIzMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIzNQogICAgLy8gcmV0dXJuIHRoaXMubWV0YSh1c2VyKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjMzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldFBvc3RFeGlzdHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRQb3N0RXhpc3RzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMzkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQxCiAgICAvLyByZXR1cm4gdGhpcy5wb3N0cyhyZWYpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIzOQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18zIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0UG9zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFBvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI0NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucG9zdHMocmVmKS5leGlzdHMsIEVSUl9QT1NUX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFBvc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEyIC8vICJFUlI6TlBTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUFNUCgpnZXRQb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNDcKICAgIC8vIHJldHVybiB0aGlzLnBvc3RzKHJlZikudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQ0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldFZvdGVbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRWb3RlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTIKICAgIC8vIGNvbnN0IHZvdGVMaXN0S2V5OiBWb3RlTGlzdEtleSA9IHsgdXNlcjogYjE2KGFjY291bnQuYnl0ZXMpLCByZWY6IGIxNihyZWYpIH0KICAgIHN3YXAKICAgIGNhbGxzdWIgYjE2CiAgICBzd2FwCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnZvdGVsaXN0KHZvdGVMaXN0S2V5KS5leGlzdHMsIEVSUl9IQVZFTlRfVk9URUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRWb3RlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNCAvLyAiRVJSOk5WT1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlZPVAoKZ2V0Vm90ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjU1CiAgICAvLyByZXR1cm4gdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjUwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldFZvdGVzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0Vm90ZXM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDY0CiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8T2JqZWN0RTNCOEE0MDE+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI2MAogICAgLy8gY29uc3Qgdm90ZXM6IFZvdGVMaXN0VmFsdWVbXSA9IFtdCiAgICBieXRlYyAxMyAvLyAweDAwMDAKICAgIGludGNfMCAvLyAwCgpnZXRWb3Rlc19mb3JfaGVhZGVyQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI2MQogICAgLy8gZm9yIChjb25zdCB7IHVzZXIsIHJlZiB9IG9mIGNsb25lKGtleXMpKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRWb3Rlc19hZnRlcl9mb3JAOAogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA2NAogICAgKgogICAgcHVzaGludCA2NAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjIKICAgIC8vIGNvbnN0IHZvdGVMaXN0S2V5OiBWb3RlTGlzdEtleSA9IHsgdXNlcjogYjE2KHVzZXIuYnl0ZXMpLCByZWY6IGIxNihyZWYpIH0KICAgIHN3YXAKICAgIGNhbGxzdWIgYjE2CiAgICBzd2FwCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI2MwogICAgLy8gaWYgKHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRWb3Rlc19lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjQKICAgIC8vIHZvdGVzLnB1c2godGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUpCiAgICBkaWcgNAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGRpZyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjQKICAgIC8vIHZvdGVzLnB1c2godGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAyCgpnZXRWb3Rlc19hZnRlcl9pZl9lbHNlQDY6CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKICAgIGIgZ2V0Vm90ZXNfZm9yX2hlYWRlckAyCgpnZXRWb3Rlc19lbHNlX2JvZHlANToKICAgIGRpZyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjYKICAgIC8vIHZvdGVzLnB1c2goeyBpbXBhY3Q6IDAsIGlzVXA6IGZhbHNlIH0pCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjY2CiAgICAvLyB2b3Rlcy5wdXNoKHsgaW1wYWN0OiAwLCBpc1VwOiBmYWxzZSB9KQogICAgYnl0ZWMgMzcgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAogICAgYnVyeSAyCiAgICBiIGdldFZvdGVzX2FmdGVyX2lmX2Vsc2VANgoKZ2V0Vm90ZXNfYWZ0ZXJfZm9yQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI1OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0UmVhY3Rpb25FeGlzdHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRSZWFjdGlvbkV4aXN0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjczCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjc1CiAgICAvLyByZXR1cm4gdGhpcy5yZWFjdGlvbnMoeyByZWYsIE5GVCB9KS5leGlzdHMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyByZWFjdGlvbnMgPSBCb3hNYXA8UmVhY3Rpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFJlYWN0aW9ucyB9KQogICAgYnl0ZWMgMjggLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjc1CiAgICAvLyByZXR1cm4gdGhpcy5yZWFjdGlvbnMoeyByZWYsIE5GVCB9KS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNzMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE1CiAgICAvLyBtYnIocmVmOiBieXRlcywgcmVmVHlwZU5hbWU6IHN0cmluZywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpOiBBa2l0YVNvY2lhbE1CUkRhdGEgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLnBheVdhbGxNYnJbcm91dGluZ10oKSAtPiB2b2lkOgpwYXlXYWxsTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM0CiAgICAvLyBwYXlXYWxsTWJyKHBheXdhbGw6IFZpZXdQYXlXYWxsVmFsdWUpOiB1aW50NjQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pLChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxNwogICAgKgogICAgcHVzaGludCA2CiAgICArCiAgICBkaWcgMgogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pLChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxNwogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvdHlwZXMudHM6OlZpZXdQYXlXYWxsVmFsdWUKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLnBheVdhbGxNYnIKICAgIHBvcAogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjU1CiAgICAvLyBjaGVja1RpcE1iclJlcXVpcmVtZW50cyhha2l0YURBTzogQXBwbGljYXRpb24sIGNyZWF0b3I6IEFjY291bnQsIHdhbGxldDogQXBwbGljYXRpb24pOiB0aXBNQlJJbmZvIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4udXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDggLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAzMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBFUlJfSU5WQUxJRF9VUEdSQURFKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJVVBHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklVUEcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAzMyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pc1JlcGx5KHBvc3RUeXBlOiBieXRlcykgLT4gdWludDY0Ogppc1JlcGx5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY1CiAgICAvLyBwcml2YXRlIGlzUmVwbHkocG9zdFR5cGU6IFBvc3RUeXBlKTogYm9vbGVhbiB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gcmV0dXJuIHBvc3RUeXBlID09PSBQb3N0VHlwZVJlcGx5IHx8IHBvc3RUeXBlID09PSBQb3N0VHlwZUVkaXRSZXBseQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxNiAvLyAweDAxCiAgICA9PQogICAgYm56IGlzUmVwbHlfYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTQgLy8gMHgwMwogICAgPT0KICAgIGJ6IGlzUmVwbHlfYm9vbF9mYWxzZUAzCgppc1JlcGx5X2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NgogICAgLy8gcmV0dXJuIHBvc3RUeXBlID09PSBQb3N0VHlwZVJlcGx5IHx8IHBvc3RUeXBlID09PSBQb3N0VHlwZUVkaXRSZXBseQogICAgcmV0c3ViCgppc1JlcGx5X2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIHJldHVybiBwb3N0VHlwZSA9PT0gUG9zdFR5cGVSZXBseSB8fCBwb3N0VHlwZSA9PT0gUG9zdFR5cGVFZGl0UmVwbHkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwudG9CeXRlczMyKHR5cGU6IHVpbnQ2NCwgcmVmOiBieXRlcykgLT4gYnl0ZXM6CnRvQnl0ZXMzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NQogICAgLy8gcHJpdmF0ZSB0b0J5dGVzMzIodHlwZTogdWludDY0LCByZWY6IGJ5dGVzKTogeyByZWZCeXRlczogYnl0ZXM8MzI+LCBjcmVhdG9yOiBBY2NvdW50IH0gewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NwogICAgLy8gbGV0IGNyZWF0b3I6IEFjY291bnQgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyBjYXNlIFJlZlR5cGVQb3N0OgogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5OS0xMDIKICAgIC8vIGNhc2UgUmVmVHlwZVBvc3Q6CiAgICAvLyAgIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIC8vICAgcmVmQnl0ZXMgPSByZWYudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIC8vICAgYnJlYWsKICAgIGJ6IHRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDQKICAgIGJueiB0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDIxIC8vICJFUlI6SVJGTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUkZMCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxCiAgICAvLyByZWZCeXRlcyA9IHJlZi50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KQogICAgZnJhbWVfZGlnIDQKICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAzMgogICAgZnJhbWVfZGlnIC0xCgp0b0J5dGVzMzJfYmxvY2tAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM1CiAgICAvLyByZXR1cm4geyByZWZCeXRlcywgY3JlYXRvciB9CiAgICBmcmFtZV9kaWcgNgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDMKICAgIC8vIGNhc2UgUmVmVHlwZUFzc2V0OgogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzMgLy8gMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDMtMTA4CiAgICAvLyBjYXNlIFJlZlR5cGVBc3NldDoKICAgIC8vICAgbG9nZ2VkQXNzZXJ0KHJlZi5sZW5ndGggPT09IDgsIEVSUl9JTlZBTElEX1JFRl9MRU5HVEgpCiAgICAvLyAgIGxvZ2dlZEFzc2VydChBc3NldChidG9pKHJlZikpLnRvdGFsID4gMCwgRVJSX0lOVkFMSURfQVNTRVQpCiAgICAvLyAgIHJlZkJ5dGVzID0gcmVmLmNvbmNhdChvcC5iemVybygyNCkpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pCiAgICAvLyAgIGNyZWF0b3IgPSBBc3NldChidG9pKHJlZikpLmNyZWF0b3IKICAgIC8vICAgYnJlYWsKICAgIGJ6IHRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBsb2dnZWRBc3NlcnQocmVmLmxlbmd0aCA9PT0gOCwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGJueiB0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIxIC8vICJFUlI6SVJGTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUkZMCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBsb2dnZWRBc3NlcnQoQXNzZXQoYnRvaShyZWYpKS50b3RhbCA+IDAsIEVSUl9JTlZBTElEX0FTU0VUKQogICAgZnJhbWVfZGlnIC0xCiAgICBidG9pCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNQogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFRvdGFsCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6SUFTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVNUCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gcmVmQnl0ZXMgPSByZWYuY29uY2F0KG9wLmJ6ZXJvKDI0KSkudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIHB1c2hpbnQgMjQKICAgIGJ6ZXJvCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIGNyZWF0b3IgPSBBc3NldChidG9pKHJlZikpLmNyZWF0b3IKICAgIGZyYW1lX2RpZyA1CiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSA2CiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyBicmVhawogICAgYiB0b0J5dGVzMzJfYmxvY2tAMzIKCnRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gY2FzZSBSZWZUeXBlQWRkcmVzczoKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOS0xMTkKICAgIC8vIGNhc2UgUmVmVHlwZUFkZHJlc3M6CiAgICAvLyAgIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIC8vICAgcmVmQnl0ZXMgPSByZWYudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIC8vICAgY3JlYXRvciA9IEFjY291bnQocmVmQnl0ZXMpCiAgICAvLyAKICAgIC8vICAgaWYgKHRoaXMubWV0YShjcmVhdG9yKS5leGlzdHMpIHsKICAgIC8vICAgICBjb25zdCB7IGFkZHJlc3NHYXRlSUQgfSA9IHRoaXMubWV0YShjcmVhdG9yKS52YWx1ZQogICAgLy8gICAgIGxvZ2dlZEFzc2VydChhZGRyZXNzR2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICAvLyAgIH0KICAgIC8vIAogICAgLy8gICBicmVhawogICAgYnogdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIGJueiB0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAyMSAvLyAiRVJSOklSRkwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJGTAoKdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTEKICAgIC8vIHJlZkJ5dGVzID0gcmVmLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pCiAgICBmcmFtZV9kaWcgMgogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyBpZiAodGhpcy5tZXRhKGNyZWF0b3IpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB0b0J5dGVzMzJfYWZ0ZXJfaWZfZWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gY29uc3QgeyBhZGRyZXNzR2F0ZUlEIH0gPSB0aGlzLm1ldGEoY3JlYXRvcikudmFsdWUKICAgIGZyYW1lX2RpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA1OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIGxvZ2dlZEFzc2VydChhZGRyZXNzR2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiB0b0J5dGVzMzJfYWZ0ZXJfaWZfZWxzZUAyMAogICAgYnl0ZWMgMTcgLy8gIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCnRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDIwOgogICAgZnJhbWVfZGlnIC0xCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExOQogICAgLy8gYnJlYWsKICAgIGIgdG9CeXRlczMyX2Jsb2NrQDMyCgp0b0J5dGVzMzJfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGNhc2UgUmVmVHlwZUFwcDoKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMC0xMjUKICAgIC8vIGNhc2UgUmVmVHlwZUFwcDoKICAgIC8vICAgbG9nZ2VkQXNzZXJ0KHJlZi5sZW5ndGggPT09IDgsIEVSUl9JTlZBTElEX1JFRl9MRU5HVEgpCiAgICAvLyAgIGxvZ2dlZEFzc2VydChBcHBsaWNhdGlvbihidG9pKHJlZikpLmFwcHJvdmFsUHJvZ3JhbS5sZW5ndGggPiAwLCBFUlJfSU5WQUxJRF9BUFApCiAgICAvLyAgIHJlZkJ5dGVzID0gcmVmLmNvbmNhdChvcC5iemVybygyNCkpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pCiAgICAvLyAgIGNyZWF0b3IgPSBBcHBsaWNhdGlvbihidG9pKHJlZikpLmNyZWF0b3IKICAgIC8vICAgYnJlYWsKICAgIGJ6IHRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIxCiAgICAvLyBsb2dnZWRBc3NlcnQocmVmLmxlbmd0aCA9PT0gOCwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGJueiB0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBieXRlYyAyMSAvLyAiRVJSOklSRkwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJGTAoKdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIGxvZ2dlZEFzc2VydChBcHBsaWNhdGlvbihidG9pKHJlZikpLmFwcHJvdmFsUHJvZ3JhbS5sZW5ndGggPiAwLCBFUlJfSU5WQUxJRF9BUFApCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ0b2kKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBcHByb3ZhbFByb2dyYW0KICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGxlbgogICAgYm56IHRvQnl0ZXMzMl9hZnRlcl9hc3NlcnRAMjcKICAgIHB1c2hieXRlcyAiRVJSOklBUFAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUFQUAoKdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjMKICAgIC8vIHJlZkJ5dGVzID0gcmVmLmNvbmNhdChvcC5iemVybygyNCkpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pCiAgICBwdXNoaW50IDI0CiAgICBiemVybwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBjcmVhdG9yID0gQXBwbGljYXRpb24oYnRvaShyZWYpKS5jcmVhdG9yCiAgICBmcmFtZV9kaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSA2CiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyBicmVhawogICAgYiB0b0J5dGVzMzJfYmxvY2tAMzIKCnRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmVHlwZXModHlwZSkuZXhpc3RzLCBFUlJfUkVGX1RZUEVfTk9UX0ZPVU5EKQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3CiAgICAvLyByZWZUeXBlcyA9IEJveE1hcDx1aW50NjQsIFJlZlR5cGVWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UmVmVHlwZXMgfSkKICAgIHB1c2hieXRlcyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmVHlwZXModHlwZSkuZXhpc3RzLCBFUlJfUkVGX1RZUEVfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAzMQogICAgcHVzaGJ5dGVzICJFUlI6TlJUUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUlRQCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gcmVmQnl0ZXMgPSBvcC5zaGEyNTYoaXRvYih0eXBlKS5jb25jYXQocmVmKSkKICAgIGZyYW1lX2RpZyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMxCiAgICAvLyBjcmVhdG9yID0gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gYnJlYWsKICAgIGIgdG9CeXRlczMyX2Jsb2NrQDMyCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pc0Jsb2NrZWQodXNlcjogYnl0ZXMsIGJsb2NrZWQ6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzQmxvY2tlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHByaXZhdGUgaXNCbG9ja2VkKHVzZXI6IEFjY291bnQsIGJsb2NrZWQ6IEFjY291bnQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzOS0xNDIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEdyYXBoLnByb3RvdHlwZS5pc0Jsb2NrZWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCwKICAgIC8vICAgYXJnczogW3VzZXIsIGJsb2NrZWRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuZ3JhcGgsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgOSAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCwKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM5LTE0MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsR3JhcGgucHJvdG90eXBlLmlzQmxvY2tlZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmdyYXBoLAogICAgLy8gICBhcmdzOiBbdXNlciwgYmxvY2tlZF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg0MzAzNjY4ZSAvLyBtZXRob2QgImlzQmxvY2tlZChhZGRyZXNzLGFkZHJlc3MpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5sb2FkUG9zdFdpdGhBY2Nlc3NDaGVjayhyZWY6IGJ5dGVzKSAtPiBieXRlczoKbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBwcml2YXRlIGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrKHJlZjogYnl0ZXM8MzI+KTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jhbm5lZChUeG4uc2VuZGVyKSwgRVJSX0JBTk5FRCkKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgaXNCYW5uZWQKICAgIGJ6IGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMSAvLyAiRVJSOkJBTkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkFORAoKbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2tfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucG9zdHMocmVmKS5leGlzdHMsIEVSUl9QT1NUX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAxMiAvLyAiRVJSOk5QU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBTVAoKbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2tfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyBjb25zdCB7IGNyZWF0b3IgfSA9IHRoaXMucG9zdHMocmVmKS52YWx1ZQogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jsb2NrZWQoY3JlYXRvciwgVHhuLnNlbmRlciksIEVSUl9CTE9DS0VEKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBpc0Jsb2NrZWQKICAgIGJ6IGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAzOCAvLyAiRVJSOkJMS0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkxLRAoKbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2tfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUzCiAgICAvLyByZXR1cm4gY3JlYXRvcgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jb21wdXRlUG9zdEtleSh0aW1lc3RhbXA6IHVpbnQ2NCwgbm9uY2U6IGJ5dGVzKSAtPiBieXRlczoKY29tcHV0ZVBvc3RLZXk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBwcml2YXRlIGNvbXB1dGVQb3N0S2V5KHRpbWVzdGFtcDogdWludDY0LCBub25jZTogYnl0ZXM8MjQ+KTogYnl0ZXM8MzI+IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSB0aW1lc3RhbXAgPD0gTUFYX1RJTUVTVEFNUF9EUklGVCwgRVJSX1RJTUVTVEFNUF9UT09fT0xEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZnJhbWVfZGlnIC0yCiAgICAtCiAgICBwdXNoaW50IDYwCiAgICA8PQogICAgYm56IGNvbXB1dGVQb3N0S2V5X2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjpUU09MIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlRTT0wKCmNvbXB1dGVQb3N0S2V5X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gcmV0dXJuIG9wLnNoYTI1NihUeG4uc2VuZGVyLmJ5dGVzLmNvbmNhdChpdG9iKHRpbWVzdGFtcCkpLmNvbmNhdChub25jZSkpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5yZXNvbHZlUGFyZW50Q29udGV4dCh0eXBlOiB1aW50NjQsIHJlZjogYnl0ZXMpIC0+IGJ5dGVzOgpyZXNvbHZlUGFyZW50Q29udGV4dDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNzItMTc1CiAgICAvLyBwcml2YXRlIHJlc29sdmVQYXJlbnRDb250ZXh0KAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIHJlZjogYnl0ZXMsCiAgICAvLyApOiB7IHJlZkJ5dGVzOiBieXRlczwzMj4sIGFkZGVkTWJyOiB1aW50NjQsIHBvc3RHYXRlSUQ6IHVpbnQ2NCB9IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gY29uc3QgeyByZWZCeXRlcywgY3JlYXRvcjogZmFsbGJhY2sgfSA9IHRoaXMudG9CeXRlczMyKHR5cGUsIHJlZikKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHRvQnl0ZXMzMgogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDMyIDMyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wb3N0cyhyZWZCeXRlcykuZXhpc3RzLCBFUlJfUE9TVF9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZXNvbHZlUGFyZW50Q29udGV4dF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUFNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QU1QKCnJlc29sdmVQYXJlbnRDb250ZXh0X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBnYXRlSUQ6IHBvc3RHYXRlSUQgfSA9IHRoaXMucG9zdHMocmVmQnl0ZXMpLnZhbHVlCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgNDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gY29uc3QgYyA9IChmYWxsYmFjayA9PT0gR2xvYmFsLnplcm9BZGRyZXNzKSA/IGNyZWF0b3IgOiBmYWxsYmFjawogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyBjb25zdCBhZGRlZE1iciA9IHRoaXMuY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3NhcnkocmVmQnl0ZXMsIGMpCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3NhcnkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxODQKICAgIC8vIHJldHVybiB7IHJlZkJ5dGVzLCBhZGRlZE1iciwgcG9zdEdhdGVJRCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnZlcmlmeUVkaXRBbWVuZG1lbnQoYW1lbmRtZW50OiBieXRlcywgY2lkOiBieXRlcykgLT4gYnl0ZXM6CnZlcmlmeUVkaXRBbWVuZG1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTk1LTIwMgogICAgLy8gcHJpdmF0ZSB2ZXJpZnlFZGl0QW1lbmRtZW50KGFtZW5kbWVudDogYnl0ZXM8MzI+LCBjaWQ6IENJRCk6IHsKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBwb3N0VHlwZTogUG9zdFR5cGUsCiAgICAvLyAgIGVkaXRLZXk6IGJ5dGVzPDMyPiwKICAgIC8vIH0gewogICAgcHJvdG8gMiAxCiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDMKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgcmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUgfSA9IHRoaXMucG9zdHMoYW1lbmRtZW50KS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCA3NwogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNzcKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgcHVzaGludCA0OAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgcHVzaGludCA0OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAyCiAgICBzd2FwCiAgICBwdXNoaW50IDU4CiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzQ3JlYXRvcihjcmVhdG9yLCBUeG4uc2VuZGVyKSwgRVJSX05PVF9ZT1VSX1BPU1RfVE9fRURJVCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MgogICAgLy8gcmV0dXJuIGNyZWF0b3IgPT09IHNlbmRlcgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzQ3JlYXRvcihjcmVhdG9yLCBUeG4uc2VuZGVyKSwgRVJSX05PVF9ZT1VSX1BPU1RfVE9fRURJVCkKICAgIGJueiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjpORURUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FRFQKCnZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIGNhc2UgUG9zdFR5cGVQb3N0OgogICAgZnJhbWVfZGlnIDYKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3Ni03NwogICAgLy8gY2FzZSBQb3N0VHlwZVBvc3Q6CiAgICAvLyAgIHJldHVybiAzNgogICAgYnogdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NwogICAgLy8gcmV0dXJuIDM2CiAgICBwdXNoaW50IDM2Cgp2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRCYXNlUmVmTGVuZ3RoQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyByZXR1cm4gcmVmLmxlbmd0aCA+IGJhc2VMZW5ndGgKICAgIGZyYW1lX2RpZyAyCiAgICBsZW4KICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICA8CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjA1CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNBbWVuZGVkKHJlZiwgcG9zdFR5cGUpLCBFUlJfSVNfQUxSRUFEWV9BTUVOREVEKQogICAgYnogdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6RUFNRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFQU1ECgp2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gY29uc3QgZWRpdEtleSA9IG9wLnNoYTI1NihUeG4uc2VuZGVyLmJ5dGVzLmNvbmNhdChhbWVuZG1lbnQpLmNvbmNhdChCeXRlcyhjaWQpKSkKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyB0aGlzLnBvc3RzKGFtZW5kbWVudCkudmFsdWUucmVmID0gcmVmLmNvbmNhdChCeXRlcygnYScpLmNvbmNhdChlZGl0S2V5KSkKICAgIHB1c2hieXRlcyAiYSIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgcHVzaGludCA3NQogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gcmV0dXJuIHsgcmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUsIGVkaXRLZXkgfQogICAgZnJhbWVfZGlnIDAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAzCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDM0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyA0CiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4CiAgICAvLyBjYXNlIFBvc3RUeXBlUmVwbHk6CiAgICBmcmFtZV9kaWcgNgogICAgYnl0ZWMgMTYgLy8gMHgwMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3OC03OQogICAgLy8gY2FzZSBQb3N0VHlwZVJlcGx5OgogICAgLy8gICByZXR1cm4gNjgKICAgIGJ6IHZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIHJldHVybiA2OAogICAgcHVzaGludCA2OAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyBjb25zdCBiYXNlTGVuZ3RoID0gdGhpcy5nZXRCYXNlUmVmTGVuZ3RoKHBvc3RUeXBlKQogICAgYiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRCYXNlUmVmTGVuZ3RoQDE0Cgp2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MAogICAgLy8gY2FzZSBQb3N0VHlwZUVkaXRQb3N0OgogICAgZnJhbWVfZGlnIDYKICAgIGJ5dGVjIDI2IC8vIDB4MDIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODAtODEKICAgIC8vIGNhc2UgUG9zdFR5cGVFZGl0UG9zdDoKICAgIC8vICAgcmV0dXJuIDY4CiAgICBieiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MQogICAgLy8gcmV0dXJuIDY4CiAgICBwdXNoaW50IDY4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIGNvbnN0IGJhc2VMZW5ndGggPSB0aGlzLmdldEJhc2VSZWZMZW5ndGgocG9zdFR5cGUpCiAgICBiIHZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldEJhc2VSZWZMZW5ndGhAMTQKCnZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MgogICAgLy8gY2FzZSBQb3N0VHlwZUVkaXRSZXBseToKICAgIGZyYW1lX2RpZyA2CiAgICBieXRlYyAxNCAvLyAweDAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgyLTgzCiAgICAvLyBjYXNlIFBvc3RUeXBlRWRpdFJlcGx5OgogICAgLy8gICByZXR1cm4gMTAwCiAgICBieiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MwogICAgLy8gcmV0dXJuIDEwMAogICAgcHVzaGludCAxMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gY29uc3QgYmFzZUxlbmd0aCA9IHRoaXMuZ2V0QmFzZVJlZkxlbmd0aChwb3N0VHlwZSkKICAgIGIgdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNAoKdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gMzYKICAgIHB1c2hpbnQgMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gY29uc3QgYmFzZUxlbmd0aCA9IHRoaXMuZ2V0QmFzZVJlZkxlbmd0aChwb3N0VHlwZSkKICAgIGIgdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwucHJlcGFyZVJlcGx5RWRpdChhbWVuZG1lbnQ6IGJ5dGVzLCBjaWQ6IGJ5dGVzKSAtPiBieXRlczoKcHJlcGFyZVJlcGx5RWRpdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMTYtMjIzCiAgICAvLyBwcml2YXRlIHByZXBhcmVSZXBseUVkaXQoYW1lbmRtZW50OiBieXRlczwzMj4sIGNpZDogQ0lEKTogewogICAgLy8gICBwYXJlbnRQb3N0UmVmOiBieXRlczwzMj4sCiAgICAvLyAgIG9nUG9zdEdhdGVJRDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGVkaXRLZXk6IGJ5dGVzPDMyPiwKICAgIC8vIH0gewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICBieXRlY18xIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjI0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wb3N0cyhhbWVuZG1lbnQpLmV4aXN0cywgRVJSX1JFUExZX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHByZXBhcmVSZXBseUVkaXRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOk5SUEwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlJQTAoKcHJlcGFyZVJlcGx5RWRpdF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMjUKICAgIC8vIGNvbnN0IHsgcmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUsIGVkaXRLZXkgfSA9IHRoaXMudmVyaWZ5RWRpdEFtZW5kbWVudChhbWVuZG1lbnQsIGNpZCkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHZlcmlmeUVkaXRBbWVuZG1lbnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBkaWcgMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGZyYW1lX2J1cnkgMwogICAgZHVwCiAgICBleHRyYWN0IDIgOAogICAgZnJhbWVfYnVyeSAwCiAgICBkdXAKICAgIHB1c2hpbnQgODAKICAgIGdldGJpdAogICAgZnJhbWVfYnVyeSA0CiAgICBkdXAKICAgIGV4dHJhY3QgMTEgOAogICAgZnJhbWVfYnVyeSAxCiAgICBkdXAKICAgIGV4dHJhY3QgMTkgMQogICAgc3dhcAogICAgZXh0cmFjdCAyMCAzMgogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc1JlcGx5KHBvc3RUeXBlKSwgRVJSX05PVF9BX1JFUExZKQogICAgY2FsbHN1YiBpc1JlcGx5CiAgICBibnogcHJlcGFyZVJlcGx5RWRpdF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6TkFSUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQVJQCgpwcmVwYXJlUmVwbHlFZGl0X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIyOAogICAgLy8gY29uc3QgcGFyZW50UG9zdFJlZiA9IHJlZi5zbGljZSgzNiwgNjgpLnRvRml4ZWQoeyBsZW5ndGg6IDMyIH0pCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAzNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDY4CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgNjgKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMjkKICAgIC8vIGNvbnN0IHsgZ2F0ZUlEOiBvZ1Bvc3RHYXRlSUQgfSA9IHRoaXMucG9zdHMocGFyZW50UG9zdFJlZikudmFsdWUKICAgIHB1c2hpbnQgNDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gcmV0dXJuIHsgcGFyZW50UG9zdFJlZiwgb2dQb3N0R2F0ZUlELCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgZWRpdEtleSB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAwCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyA0CiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDEKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDIKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnJlYWRTb2NpYWxJbXBhY3RJbnB1dHMoYWNjb3VudDogYnl0ZXMpIC0+IGJ5dGVzOgpyZWFkU29jaWFsSW1wYWN0SW5wdXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gcHJpdmF0ZSByZWFkU29jaWFsSW1wYWN0SW5wdXRzKGFjY291bnQ6IEFjY291bnQpOiBTb2NpYWxJbXBhY3RJbnB1dHMgewogICAgcHJvdG8gMSAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBsZXQgaGFzTWV0YSA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzOC0yMzkKICAgIC8vIGxldCBzdHJlYWs6IHVpbnQ2NCA9IDAKICAgIC8vIGxldCBzdGFydERhdGU6IHVpbnQ2NCA9IDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIGlmICh0aGlzLm1ldGEoYWNjb3VudCkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHJlYWRTb2NpYWxJbXBhY3RJbnB1dHNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQyCiAgICAvLyBjb25zdCBtID0gY2xvbmUodGhpcy5tZXRhKGFjY291bnQpLnZhbHVlKQogICAgZnJhbWVfZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBoYXNNZXRhID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI0NAogICAgLy8gc3RyZWFrID0gbS5zdHJlYWsKICAgIGR1cAogICAgcHVzaGludCA5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBzdGFydERhdGUgPSBtLnN0YXJ0RGF0ZQogICAgcHVzaGludCAxNwogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNQoKcmVhZFNvY2lhbEltcGFjdElucHV0c19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQ4CiAgICAvLyBsZXQgdm90ZUNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBsZXQgaXNOZWdhdGl2ZSA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDcKICAgIC8vIHZvdGVzID0gQm94TWFwPGJ5dGVzPDMyPiwgVm90ZXNWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4Vm90ZXMgfSkKICAgIHB1c2hieXRlcyAidiIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8gaWYgKHRoaXMudm90ZXMoYWNjb3VudC5ieXRlcykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHJlYWRTb2NpYWxJbXBhY3RJbnB1dHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBjb25zdCB2ID0gY2xvbmUodGhpcy52b3RlcyhhY2NvdW50LmJ5dGVzKS52YWx1ZSkKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gdm90ZUNvdW50ID0gdi52b3RlQ291bnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGlzTmVnYXRpdmUgPSB2LmlzTmVnYXRpdmUKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgZnJhbWVfYnVyeSAxCgpyZWFkU29jaWFsSW1wYWN0SW5wdXRzX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIHJldHVybiB7IGhhc01ldGEsIHN0cmVhaywgc3RhcnREYXRlLCB2b3RlQ291bnQsIGlzTmVnYXRpdmUgfQogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIDMKICAgIHNldGJpdAogICAgZnJhbWVfZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIDEKICAgIHNldGJpdAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0VXNlckltcGFjdChhY2NvdW50OiBieXRlcykgLT4gdWludDY0OgpnZXRVc2VySW1wYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gcHJpdmF0ZSBnZXRVc2VySW1wYWN0KGFjY291bnQ6IEFjY291bnQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjY0CiAgICAvLyBjb25zdCBpbnB1dHMgPSB0aGlzLnJlYWRTb2NpYWxJbXBhY3RJbnB1dHMoYWNjb3VudCkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZWFkU29jaWFsSW1wYWN0SW5wdXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjY2LTI2OQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0V2l0aElucHV0cz4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnQsIGlucHV0c10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmltcGFjdCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0LAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI2Ni0yNjkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuZ2V0VXNlckltcGFjdFdpdGhJbnB1dHM+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5pbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50LCBpbnB1dHNdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZjI0ZDYwNjMgLy8gbWV0aG9kICJnZXRVc2VySW1wYWN0V2l0aElucHV0cyhhZGRyZXNzLChib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC50aXBDcmVhdG9yKGNyZWF0b3I6IGJ5dGVzLCBmZWU6IHVpbnQ2NCwgdGF4OiB1aW50NjQpIC0+IHVpbnQ2NDoKdGlwQ3JlYXRvcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIHByaXZhdGUgdGlwQ3JlYXRvcihjcmVhdG9yOiBBY2NvdW50LCBmZWU6IHVpbnQ2NCwgdGF4OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjIKICAgIC8vIGlmIChjcmVhdG9yID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogdGlwQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGJ5dGVjIDcgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzY0LTM3MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogZmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2NgogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2NC0zNjkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGZlZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFrdGEKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzY0LTM3MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogZmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzcxCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgp0aXBDcmVhdG9yX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIGxldCB3YWxsZXQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NQogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1ldGEgfSkKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNzUKICAgIC8vIGlmICh0aGlzLm1ldGEoY3JlYXRvcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mzc2CiAgICAvLyB3YWxsZXQgPSB0aGlzLm1ldGEoY3JlYXRvcikudmFsdWUud2FsbGV0CiAgICBmcmFtZV9kaWcgMAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGludGNfMSAvLyAxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2Cgp0aXBDcmVhdG9yX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGNvbnN0IHsgdHlwZSwgYXJjNTggfSA9IHRoaXMuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHModGhpcy5ha2l0YURBTy52YWx1ZSwgY3JlYXRvciwgQXBwbGljYXRpb24od2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGNvbnN0IHsgdHlwZSwgYXJjNTggfSA9IHRoaXMuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHModGhpcy5ha2l0YURBTy52YWx1ZSwgY3JlYXRvciwgQXBwbGljYXRpb24od2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2RpZyA2CiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50cwogICAgZHVwCiAgICBleHRyYWN0IDAgMQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODAKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgwCiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBkdXAKICAgIGJ5dGVjIDcgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODAKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgxCiAgICAvLyBjb25zdCB7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFrdGEsIHRheCkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gY29uc3QgeyByZWFjdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gY29uc3QgeyByZWFjdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMKICAgIC8vIGNvbnN0IFtzb2NpYWxGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU29jaWFsRmVlcykpCiAgICBieXRlYyAxMSAvLyAic29jaWFsX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBjb25zdCB7IHJlYWN0RmVlIH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODQKICAgIC8vIGlmICh0eXBlID09PSBUaXBTZW5kVHlwZUFSQzU4KSB7CiAgICBieXRlYyA2IC8vIDB4MTQKICAgID09CiAgICBieiB0aXBDcmVhdG9yX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4NQogICAgLy8gdGhpcy5hcmM1OFNlbmRSZWFjdGlvblBheW1lbnRzKEFwcGxpY2F0aW9uKHdhbGxldCksIGFrdGEsIGxlZnRvdmVyLCAocmVhY3RGZWUgLSB0YXgpKQogICAgZnJhbWVfZGlnIC0xCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgNgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NwogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBwdXNoYnl0ZXMgImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIGNvbnN0IG9wdGluID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5vcHRpbgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gY29uc3Qgb3B0aW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDMwIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjg4CiAgICAvLyBjb25zdCBvcHRpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI5MC0yOTkKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgb3B0aW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICAnJywgLy8gZGVmYXVsdCBhY2NvdW50CiAgICAvLyAgICAgW10sIC8vIG5vIG1ldGhvZCBvZmZzZXRzCiAgICAvLyAgICAgW10gLy8gbm8gZnVuZHMgcmVxdWVzdAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gQ2FsbGVyVHlwZUdsb2JhbCwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjkwLTI5OQogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgICcnLCAvLyBkZWZhdWx0IGFjY291bnQKICAgIC8vICAgICBbXSwgLy8gbm8gbWV0aG9kIG9mZnNldHMKICAgIC8vICAgICBbXSAvLyBubyBmdW5kcyByZXF1ZXN0CiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gJycsIC8vIGRlZmF1bHQgYWNjb3VudAogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI5NgogICAgLy8gW10sIC8vIG5vIG1ldGhvZCBvZmZzZXRzCiAgICBieXRlYyAxMyAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBbXSAvLyBubyBmdW5kcyByZXF1ZXN0CiAgICBieXRlYyAxMyAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjkwLTI5OQogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgICcnLCAvLyBkZWZhdWx0IGFjY291bnQKICAgIC8vICAgICBbXSwgLy8gbm8gbWV0aG9kIG9mZnNldHMKICAgIC8vICAgICBbXSAvLyBubyBmdW5kcyByZXF1ZXN0CiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzAxLTMxMgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiBvcHRpbiwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLCAvLyByZWtleSBiYWNrIGltbWVkaWF0ZWx5CiAgICAvLyAgICAgW2Fzc2V0XSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgICByZWNlaXZlcjogb3JpZ2luCiAgICAvLyAgICAgfSkKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDctMzEwCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgcmVjZWl2ZXI6IG9yaWdpbgogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDEtMzEyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIC8vICAgICBbYXNzZXRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4KICAgIC8vICAgICB9KQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMwNAogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDYKICAgIC8vIFthc3NldF0sCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBpdG9iCiAgICBieXRlYyAzMiAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDEtMzEyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIC8vICAgICBbYXNzZXRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4KICAgIC8vICAgICB9KQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGJ5dGVjIDM5IC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDEtMzEyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIC8vICAgICBbYXNzZXRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4KICAgIC8vICAgICB9KQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMTQtMzE2CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMTgtMzI0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0KAogICAgLy8gICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHRheCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyApCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMyMAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMxOS0zMjMKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiB0YXgsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMyNi0zMzIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiByZW1haW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzI3LTMzMQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogb3JpZ2luLAogICAgLy8gICBhc3NldEFtb3VudDogcmVtYWluZGVyLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gcmV0dXJuIGFyYzU4CiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gdGhpcy5zZW5kRGlyZWN0UmVhY3Rpb25QYXltZW50cyhjcmVhdG9yLCBha3RhLCBsZWZ0b3ZlciwgKHJlYWN0RmVlIC0gdGF4KSkKICAgIGZyYW1lX2RpZyAtMQogICAgLQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNDAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMQogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM0NQogICAgLy8gaWYgKHJlbWFpbmRlciA+IDAgJiYgY3JlYXRvci5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgYnogdGlwQ3JlYXRvcl9lbHNlX2JvZHlAMTEKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIDIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiB0aXBDcmVhdG9yX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cCh0YXhUeG4sIHhmZXJUeG4pCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMzktMzQzCiAgICAvLyBjb25zdCB0YXhUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogdGF4LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNTIKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAodGF4VHhuLCB4ZmVyVHhuKQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzQ2LTM1MAogICAgLy8gY29uc3QgeGZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGNyZWF0b3IsCiAgICAvLyAgIGFzc2V0QW1vdW50OiByZW1haW5kZXIsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cCh0YXhUeG4sIHhmZXJUeG4pCiAgICBpdHhuX3N1Ym1pdAoKdGlwQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKdGlwQ3JlYXRvcl9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzU1CiAgICAvLyBhc3NldEFtb3VudDogdGF4ICsgcmVtYWluZGVyCiAgICBmcmFtZV9kaWcgNAogICAgZnJhbWVfZGlnIDUKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNTcKICAgIC8vIHRheFR4bi5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzM5LTM0MwogICAgLy8gY29uc3QgdGF4VHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHRheCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzU3CiAgICAvLyB0YXhUeG4uc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUAxMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3Nhcnkoa2V5OiBieXRlcywgY3JlYXRvcjogYnl0ZXMpIC0+IHVpbnQ2NDoKY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3Nhcnk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBwcml2YXRlIGNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5KGtleTogYnl0ZXM8MzI+LCBjcmVhdG9yOiBBY2NvdW50KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBpZiAoIXRoaXMucG9zdHMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM5NS00MTMKICAgIC8vIHRoaXMucG9zdHMoa2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVmOiBvcC5iemVybygwKSwKICAgIC8vICAgLyoqCiAgICAvLyAgICAqIHdoZW4gYSB1c2VyIHJlYWN0cyB0byBjb250ZW50IG90aGVyIHRoYW4gcG9zdHMKICAgIC8vICAgICogd2Ugc2V0IHRoZSBjcmVhdG9yIHRvIHRoZSBmb2xsb3dpbmc6CiAgICAvLyAgICAqIC0gQXNzZXRJRDogQXNzZXQgQ3JlYXRvcgogICAgLy8gICAgKiAtIEFkZHJlc3M6IEFjY291bnQKICAgIC8vICAgICogLSAgIEFwcElEOiBBcHBsaWNhdGlvbiBDcmVhdG9yCiAgICAvLyAgICAqLwogICAgLy8gICBjcmVhdG9yLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGdhdGVJRDogMCwKICAgIC8vICAgdXNlUGF5V2FsbDogZmFsc2UsCiAgICAvLyAgIHBheVdhbGxJRDogMCwKICAgIC8vICAgYWdhaW5zdENvbnRlbnRQb2xpY3k6IGZhbHNlLAogICAgLy8gICBwb3N0VHlwZTogUG9zdFR5cGVQb3N0LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IDAsCiAgICAvLyAgIG1vZGVyYXRvckZsYWdzOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIGdhdGVJRDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mzk1LTQxMwogICAgLy8gdGhpcy5wb3N0cyhrZXkpLnZhbHVlID0gewogICAgLy8gICByZWY6IG9wLmJ6ZXJvKDApLAogICAgLy8gICAvKioKICAgIC8vICAgICogd2hlbiBhIHVzZXIgcmVhY3RzIHRvIGNvbnRlbnQgb3RoZXIgdGhhbiBwb3N0cwogICAgLy8gICAgKiB3ZSBzZXQgdGhlIGNyZWF0b3IgdG8gdGhlIGZvbGxvd2luZzoKICAgIC8vICAgICogLSBBc3NldElEOiBBc3NldCBDcmVhdG9yCiAgICAvLyAgICAqIC0gQWRkcmVzczogQWNjb3VudAogICAgLy8gICAgKiAtICAgQXBwSUQ6IEFwcGxpY2F0aW9uIENyZWF0b3IKICAgIC8vICAgICovCiAgICAvLyAgIGNyZWF0b3IsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZ2F0ZUlEOiAwLAogICAgLy8gICB1c2VQYXlXYWxsOiBmYWxzZSwKICAgIC8vICAgcGF5V2FsbElEOiAwLAogICAgLy8gICBhZ2FpbnN0Q29udGVudFBvbGljeTogZmFsc2UsCiAgICAvLyAgIHBvc3RUeXBlOiBQb3N0VHlwZVBvc3QsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogMCwKICAgIC8vICAgbW9kZXJhdG9yRmxhZ3M6IDAsCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBieXRlY18zIC8vIDB4MDAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDA0ZDAwMDAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDE1CiAgICAvLyByZXR1cm4gdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5wb3N0cwogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwbiAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICByZXRzdWIKCmNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC51cGRhdGVTdHJlYWsoYWNjb3VudDogYnl0ZXMpIC0+IHZvaWQ6CnVwZGF0ZVN0cmVhazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIHByaXZhdGUgdXBkYXRlU3RyZWFrKGFjY291bnQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubWV0YShhY2NvdW50KS5leGlzdHMsIEVSUl9NRVRBX0RPRVNOVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVwZGF0ZVN0cmVha19hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMzYgLy8gIkVSUjpOTVRBIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NVEEKCnVwZGF0ZVN0cmVha19hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjMKICAgIC8vIGNvbnN0IHsgc3RhcnREYXRlLCBsYXN0QWN0aXZlIH0gPSB0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgMTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDI1CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIGNvbnN0IHRoaXNXaW5kb3dTdGFydDogdWludDY0ID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtICgoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtIHN0YXJ0RGF0ZSkgJSBPTkVfREFZKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGludGMgNyAvLyA4NjQwMAogICAgJQogICAgLQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGNvbnN0IGxhc3RXaW5kb3dTdGFydDogdWludDY0ID0gdGhpc1dpbmRvd1N0YXJ0IC0gT05FX0RBWQogICAgaW50YyA3IC8vIDg2NDAwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyB0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUubGFzdEFjdGl2ZSA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgcHVzaGludCAyNQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzMQogICAgLy8gaWYgKGxhc3RXaW5kb3dTdGFydCA+IGxhc3RBY3RpdmUpIHsKICAgIDwKICAgIGJ6IHVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MzIKICAgIC8vIHRoaXMubWV0YShhY2NvdW50KS52YWx1ZS5zdHJlYWsgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgZnJhbWVfZGlnIDIKICAgIHB1c2hpbnQgOQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBpZiAobGFzdEFjdGl2ZSA8IHRoaXNXaW5kb3dTdGFydCkgewogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2RpZyAxCiAgICA8CiAgICBieiB1cGRhdGVTdHJlYWtfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyB0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUuc3RyZWFrICs9IDEKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCA5CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwudXBkYXRlVm90ZXMocmVmOiBieXRlcywgaXNVcDogdWludDY0LCBpbXBhY3Q6IHVpbnQ2NCkgLT4gdm9pZDoKdXBkYXRlVm90ZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBwcml2YXRlIHVwZGF0ZVZvdGVzKHJlZjogYnl0ZXM8MzI+LCBpc1VwOiBib29sZWFuLCBpbXBhY3Q6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NwogICAgLy8gdm90ZXMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBWb3Rlc1ZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlcyB9KQogICAgcHVzaGJ5dGVzICJ2IgogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gaWYgKCF0aGlzLnZvdGVzKHJlZikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1cGRhdGVWb3Rlc19hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIHJldHVybiB7IG5ld0NvdW50OiBpbXBhY3QsIGlzTmVnYXRpdmU6ICFpc1VwIH0KICAgIGZyYW1lX2RpZyAtMgogICAgIQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0Cgp1cGRhdGVWb3Rlc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY2FsY1ZvdGVzQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY29uc3QgeyBuZXdDb3VudDogdm90ZUNvdW50LCBpc05lZ2F0aXZlIH0gPSB0aGlzLmNhbGNWb3RlcyhyZWYsIGlzVXAsIGltcGFjdCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDgKICAgIHN3YXAKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gdGhpcy52b3RlcyhyZWYpLnZhbHVlID0geyB2b3RlQ291bnQsIGlzTmVnYXRpdmUgfQogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDMKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIHJldHN1YgoKdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gY29uc3QgeyBpc05lZ2F0aXZlLCB2b3RlQ291bnQgfSA9IHRoaXMudm90ZXMocmVmKS52YWx1ZQogICAgZnJhbWVfZGlnIDMKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgZnJhbWVfYnVyeSAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1MwogICAgLy8gY29uc3QgZGlmZmVyaW5nRGlyZWN0aW9ucyA9IChpc1VwICYmIGlzTmVnYXRpdmUpIHx8ICghaXNVcCAmJiAhaXNOZWdhdGl2ZSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnogdXBkYXRlVm90ZXNfb3JfY29udGRANQogICAgZnJhbWVfZGlnIDEKICAgIGJueiB1cGRhdGVWb3Rlc19ib29sX3RydWVANwoKdXBkYXRlVm90ZXNfb3JfY29udGRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NTMKICAgIC8vIGNvbnN0IGRpZmZlcmluZ0RpcmVjdGlvbnMgPSAoaXNVcCAmJiBpc05lZ2F0aXZlKSB8fCAoIWlzVXAgJiYgIWlzTmVnYXRpdmUpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiB1cGRhdGVWb3Rlc19ib29sX2ZhbHNlQDgKICAgIGZyYW1lX2RpZyAxCiAgICBibnogdXBkYXRlVm90ZXNfYm9vbF9mYWxzZUA4Cgp1cGRhdGVWb3Rlc19ib29sX3RydWVANzoKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnVwZGF0ZVZvdGVzX2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIGlmICh2b3RlQ291bnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAyCiAgICBibnogdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1NgogICAgLy8gcmV0dXJuIHsgbmV3Q291bnQ6IGltcGFjdCwgaXNOZWdhdGl2ZTogIWlzVXAgfQogICAgZnJhbWVfZGlnIC0yCiAgICAhCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIGNvbnN0IHsgbmV3Q291bnQ6IHZvdGVDb3VudCwgaXNOZWdhdGl2ZSB9ID0gdGhpcy5jYWxjVm90ZXMocmVmLCBpc1VwLCBpbXBhY3QpCiAgICBiIHVwZGF0ZVZvdGVzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jYWxjVm90ZXNAMjAKCnVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyBpZiAoaW1wYWN0ID09PSB2b3RlQ291bnQgJiYgZGlmZmVyaW5nRGlyZWN0aW9ucykgewogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgMgogICAgPT0KICAgIGJ6IHVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMTQKICAgIGZyYW1lX2RpZyAwCiAgICBieiB1cGRhdGVWb3Rlc19hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyByZXR1cm4geyBuZXdDb3VudDogMCwgaXNOZWdhdGl2ZTogZmFsc2UgfQogICAgYnl0ZWMgMzcgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIGNvbnN0IHsgbmV3Q291bnQ6IHZvdGVDb3VudCwgaXNOZWdhdGl2ZSB9ID0gdGhpcy5jYWxjVm90ZXMocmVmLCBpc1VwLCBpbXBhY3QpCiAgICBiIHVwZGF0ZVZvdGVzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jYWxjVm90ZXNAMjAKCnVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyBjb25zdCBmbGlwID0gaW1wYWN0ID4gdm90ZUNvdW50ICYmIGRpZmZlcmluZ0RpcmVjdGlvbnMKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfZGlnIDIKICAgID4KICAgIGZyYW1lX2RpZyAwCiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gaWYgKGZsaXApIHsKICAgIGJ6IHVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGNvbnN0IG5ld0NvdW50OiB1aW50NjQgPSBpbXBhY3QgLSB2b3RlQ291bnQKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfZGlnIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIHJldHVybiB7IG5ld0NvdW50LCBpc05lZ2F0aXZlOiAhaXNOZWdhdGl2ZSB9CiAgICBmcmFtZV9kaWcgMQogICAgIQogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY29uc3QgeyBuZXdDb3VudDogdm90ZUNvdW50LCBpc05lZ2F0aXZlIH0gPSB0aGlzLmNhbGNWb3RlcyhyZWYsIGlzVXAsIGltcGFjdCkKICAgIGIgdXBkYXRlVm90ZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNhbGNWb3Rlc0AyMAoKdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGNvbnN0IG5ld0NvdW50OiB1aW50NjQgPSBkaWZmZXJpbmdEaXJlY3Rpb25zID8gdm90ZUNvdW50IC0gaW1wYWN0IDogdm90ZUNvdW50ICsgaW1wYWN0CiAgICBmcmFtZV9kaWcgMAogICAgYnogdXBkYXRlVm90ZXNfdGVybmFyeV9mYWxzZUAxOAogICAgZnJhbWVfZGlnIDIKICAgIGZyYW1lX2RpZyAtMQogICAgLQoKdXBkYXRlVm90ZXNfdGVybmFyeV9tZXJnZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIHJldHVybiB7IG5ld0NvdW50LCBpc05lZ2F0aXZlIH0KICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAxCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY29uc3QgeyBuZXdDb3VudDogdm90ZUNvdW50LCBpc05lZ2F0aXZlIH0gPSB0aGlzLmNhbGNWb3RlcyhyZWYsIGlzVXAsIGltcGFjdCkKICAgIGIgdXBkYXRlVm90ZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNhbGNWb3Rlc0AyMAoKdXBkYXRlVm90ZXNfdGVybmFyeV9mYWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGNvbnN0IG5ld0NvdW50OiB1aW50NjQgPSBkaWZmZXJpbmdEaXJlY3Rpb25zID8gdm90ZUNvdW50IC0gaW1wYWN0IDogdm90ZUNvdW50ICsgaW1wYWN0CiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBiIHVwZGF0ZVZvdGVzX3Rlcm5hcnlfbWVyZ2VAMTkKCnVwZGF0ZVZvdGVzX2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIGIgdXBkYXRlVm90ZXNfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jcmVhdGVWb3RlTGlzdChyZWY6IGJ5dGVzLCBpc1VwOiB1aW50NjQsIGFjY291bnQ6IGJ5dGVzLCBpbXBhY3Q6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlVm90ZUxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDgwCiAgICAvLyBwcml2YXRlIGNyZWF0ZVZvdGVMaXN0KHJlZjogYnl0ZXM8MzI+LCBpc1VwOiBib29sZWFuLCBhY2NvdW50OiBBY2NvdW50LCBpbXBhY3Q6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyBjb25zdCB2b3RlTGlzdEtleTogVm90ZUxpc3RLZXkgPSB7IHVzZXI6IGIxNihhY2NvdW50LmJ5dGVzKSwgcmVmOiBiMTYocmVmKSB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgYjE2CiAgICBmcmFtZV9kaWcgLTQKICAgIGNhbGxzdWIgYjE2CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLnZhbHVlID0geyBpbXBhY3QsIGlzVXAgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUgPSB7IGltcGFjdCwgaXNVcCB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNyZWF0ZVBvc3QocG9zdEtleTogYnl0ZXMsIG1iclBheW1lbnQ6IHVpbnQ2NCwgY2lkOiBieXRlcywgZ2F0ZUlEOiB1aW50NjQsIHVzZVBheVdhbGw6IHVpbnQ2NCwgcGF5V2FsbElEOiB1aW50NjQsIHBvc3RUeXBlOiBieXRlcywgYW1lbmRtZW50T2Y6IGJ5dGVzLCBjcmVhdG9yRmxhZ3M6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlUG9zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0ODUtNDk5CiAgICAvLyBwcml2YXRlIGNyZWF0ZVBvc3QoCiAgICAvLyAgIHBvc3RLZXk6IGJ5dGVzPDMyPiwKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBwb3N0VHlwZTogUG9zdFR5cGUsCiAgICAvLyAgIC8vIGBhbWVuZG1lbnRPZmAgaXMgb25seSBjb25zdW1lZCB3aGVuIGBwb3N0VHlwZSA9PT0gUG9zdFR5cGVFZGl0UG9zdGA7CiAgICAvLyAgIC8vIG5vbi1lZGl0IGNhbGxlcnMgcGFzcyBgQnl0ZXMoJycpYCBzbyB0aGUgY29tcGlsZXIgY2FuIHN1YnN0aXR1dGUgdGhlCiAgICAvLyAgIC8vIGFscmVhZHktYnl0ZWNibG9ja2VkIGVtcHR5LWJ5dGVzIGNvbnN0YW50ICgxIGJ5dGUpIGZvciBhbiBleHBsaWNpdAogICAgLy8gICAvLyBgcHVzaGludCAzMjsgYnplcm9gIHNlcXVlbmNlICgzIGJ5dGVzKSBhdCBlYWNoIGNhbGwgc2l0ZS4KICAgIC8vICAgYW1lbmRtZW50T2Y6IGJ5dGVzLAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NCwKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gOSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCYW5uZWQoVHhuLnNlbmRlciksIEVSUl9CQU5ORUQpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGlzQmFubmVkCiAgICBieiBjcmVhdGVQb3N0X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMSAvLyAiRVJSOkJBTkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkFORAoKY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vICghdXNlUGF5V2FsbCAmJiBwYXlXYWxsSUQgPT09IDApIHx8ICgKICAgIGZyYW1lX2RpZyAtNQogICAgYm56IGNyZWF0ZVBvc3Rfb3JfY29udGRANAogICAgZnJhbWVfZGlnIC00CiAgICBieiBjcmVhdGVQb3N0X2Jvb2xfdHJ1ZUA5CgpjcmVhdGVQb3N0X29yX2NvbnRkQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTAzLTUwNgogICAgLy8gdXNlUGF5V2FsbCAmJiAoCiAgICAvLyAgIHBheVdhbGxJRCAhPT0gMCAmJiB0aGlzLnBheXdhbGwocGF5V2FsbElEKS5leGlzdHMgfHwKICAgIC8vICAgcGF5V2FsbElEID09PSAwICYmIHRoaXMucGF5d2FsbCh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuZGVmYXVsdFBheVdhbGxJRCkuZXhpc3RzCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTUKICAgIGJ6IGNyZWF0ZVBvc3RfYm9vbF9mYWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gcGF5V2FsbElEICE9PSAwICYmIHRoaXMucGF5d2FsbChwYXlXYWxsSUQpLmV4aXN0cyB8fAogICAgZnJhbWVfZGlnIC00CiAgICBieiBjcmVhdGVQb3N0X29yX2NvbnRkQDcKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBwYXl3YWxsID0gQm94TWFwPHVpbnQ2NCwgVmlld1BheVdhbGxWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsYm94UHJlZml4UGF5V2FsbCB9KQogICAgYnl0ZWMgMTggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIHBheVdhbGxJRCAhPT0gMCAmJiB0aGlzLnBheXdhbGwocGF5V2FsbElEKS5leGlzdHMgfHwKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZVBvc3RfYm9vbF90cnVlQDkKCmNyZWF0ZVBvc3Rfb3JfY29udGRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHBheVdhbGxJRCA9PT0gMCAmJiB0aGlzLnBheXdhbGwodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cwogICAgZnJhbWVfZGlnIC00CiAgICBibnogY3JlYXRlUG9zdF9ib29sX2ZhbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUwNQogICAgLy8gcGF5V2FsbElEID09PSAwICYmIHRoaXMucGF5d2FsbCh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuZGVmYXVsdFBheVdhbGxJRCkuZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHBheVdhbGxJRCA9PT0gMCAmJiB0aGlzLnBheXdhbGwodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGV4dHJhY3QgNjYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBwYXl3YWxsID0gQm94TWFwPHVpbnQ2NCwgVmlld1BheVdhbGxWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsYm94UHJlZml4UGF5V2FsbCB9KQogICAgYnl0ZWMgMTggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHBheVdhbGxJRCA9PT0gMCAmJiB0aGlzLnBheXdhbGwodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVQb3N0X2Jvb2xfZmFsc2VAMTAKCmNyZWF0ZVBvc3RfYm9vbF90cnVlQDk6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlUG9zdF9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUwMS01MDkKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgKCF1c2VQYXlXYWxsICYmIHBheVdhbGxJRCA9PT0gMCkgfHwgKAogICAgLy8gICAgIHVzZVBheVdhbGwgJiYgKAogICAgLy8gICAgICAgcGF5V2FsbElEICE9PSAwICYmIHRoaXMucGF5d2FsbChwYXlXYWxsSUQpLmV4aXN0cyB8fAogICAgLy8gICAgICAgcGF5V2FsbElEID09PSAwICYmIHRoaXMucGF5d2FsbCh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuZGVmYXVsdFBheVdhbGxJRCkuZXhpc3RzCiAgICAvLyAgICAgKQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlXQUxMCiAgICAvLyApCiAgICBibnogY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOklQV0wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBXTAoKY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyBjb25zdCBpc0VkaXRQb3N0ID0gcG9zdFR5cGUgPT09IFBvc3RUeXBlRWRpdFBvc3QKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMjYgLy8gMHgwMgogICAgPT0KICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyBjb25zdCBlZGl0RXh0cmFNYnI6IHVpbnQ2NCA9IGlzRWRpdFBvc3QgPyBFZGl0QmFja1JlZk1CUiA6IDAKICAgIGR1cAogICAgaW50YyA1IC8vIDEzMjAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyB0aGlzLnZhbGlkYXRlUG9zdFBheW1lbnQobWJyUGF5bWVudCwgY2lkLCBpc0VkaXRQb3N0LCBlZGl0RXh0cmFNYnIpCiAgICBmcmFtZV9kaWcgLTgKICAgIGZyYW1lX2RpZyAtNwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgdmFsaWRhdGVQb3N0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUxOAogICAgLy8gdGhpcy51cGRhdGVTdHJlYWsoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgdXBkYXRlU3RyZWFrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyBjb25zdCBpbXBhY3QgPSB0aGlzLmdldFVzZXJJbXBhY3QoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtOQogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnBvc3RzKHBvc3RLZXkpLmV4aXN0cywgRVJSX1BPU1RfRVhJU1RTKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVQb3N0X2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgNDAgLy8gIkVSUjpFUFNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVQU1QKCmNyZWF0ZVBvc3RfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUyNy01MjkKICAgIC8vIGNvbnN0IHBvc3RSZWY6IGJ5dGVzID0gaXNFZGl0UG9zdAogICAgLy8gICA/IEJ5dGVzKGNpZCkuY29uY2F0KGFtZW5kbWVudE9mKQogICAgLy8gICA6IEJ5dGVzKGNpZCkKICAgIGZyYW1lX2RpZyAyCiAgICBieiBjcmVhdGVQb3N0X3Rlcm5hcnlfZmFsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MjgKICAgIC8vID8gQnl0ZXMoY2lkKS5jb25jYXQoYW1lbmRtZW50T2YpCiAgICBmcmFtZV9kaWcgLTcKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CgpjcmVhdGVQb3N0X3Rlcm5hcnlfbWVyZ2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUzMS01NDIKICAgIC8vIHRoaXMucG9zdHMocG9zdEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlZjogcG9zdFJlZiwKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBnYXRlSUQ6IGdhdGVJRCwKICAgIC8vICAgdXNlUGF5V2FsbCwKICAgIC8vICAgcGF5V2FsbElELAogICAgLy8gICBhZ2FpbnN0Q29udGVudFBvbGljeTogZmFsc2UsCiAgICAvLyAgIHBvc3RUeXBlOiBwb3N0VHlwZSwKICAgIC8vICAgY3JlYXRvckZsYWdzLAogICAgLy8gICBtb2RlcmF0b3JGbGFnczogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18zIC8vIDB4MDAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyBtb2RlcmF0b3JGbGFnczogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMxLTU0MgogICAgLy8gdGhpcy5wb3N0cyhwb3N0S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVmOiBwb3N0UmVmLAogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGdhdGVJRDogZ2F0ZUlELAogICAgLy8gICB1c2VQYXlXYWxsLAogICAgLy8gICBwYXlXYWxsSUQsCiAgICAvLyAgIGFnYWluc3RDb250ZW50UG9saWN5OiBmYWxzZSwKICAgIC8vICAgcG9zdFR5cGU6IHBvc3RUeXBlLAogICAgLy8gICBjcmVhdG9yRmxhZ3MsCiAgICAvLyAgIG1vZGVyYXRvckZsYWdzOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgNDEgLy8gMHgwMDRkCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyB0aGlzLnVwZGF0ZVZvdGVzKHBvc3RLZXksIHRydWUsIGltcGFjdCkKICAgIGZyYW1lX2RpZyAtOQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGNhbGxzdWIgdXBkYXRlVm90ZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIHRoaXMuY3JlYXRlVm90ZUxpc3QocG9zdEtleSwgdHJ1ZSwgVHhuLnNlbmRlciwgaW1wYWN0KQogICAgZnJhbWVfZGlnIC05CiAgICBpbnRjXzEgLy8gMQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVZvdGVMaXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgZHVwCiAgICBieXRlYyA3IC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczCiAgICAvLyBjb25zdCBbc29jaWFsRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1NvY2lhbEZlZXMpKQogICAgZGlnIDEKICAgIGJ5dGVjIDExIC8vICJzb2NpYWxfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNzQKICAgIC8vIGNvbnN0IHsgcG9zdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc1CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFrdGEsIHBvc3RGZWUpCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc3LTI4MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI3OQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc3LTI4MgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI3Ny0yODMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCmNyZWF0ZVBvc3RfdGVybmFyeV9mYWxzZUAxNzoKICAgIGZyYW1lX2RpZyAtNwogICAgYiBjcmVhdGVQb3N0X3Rlcm5hcnlfbWVyZ2VAMTgKCmNyZWF0ZVBvc3RfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZVBvc3RfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlUmVwbHkocmVwbHlLZXk6IGJ5dGVzLCBtYnJQYXltZW50OiB1aW50NjQsIG1ick5lZWRlZDogdWludDY0LCBjaWQ6IGJ5dGVzLCBwYXJlbnRSZWY6IGJ5dGVzLCBnYXRlSUQ6IHVpbnQ2NCwgdXNlUGF5V2FsbDogdWludDY0LCBwYXlXYWxsSUQ6IHVpbnQ2NCwgcG9zdFR5cGU6IGJ5dGVzLCBhbWVuZG1lbnRPZjogYnl0ZXMsIGNyZWF0b3JGbGFnczogdWludDY0KSAtPiB2b2lkOgpjcmVhdGVSZXBseToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NDgtNTYyCiAgICAvLyBwcml2YXRlIGNyZWF0ZVJlcGx5KAogICAgLy8gICByZXBseUtleTogYnl0ZXM8MzI+LAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1ick5lZWRlZDogdWludDY0LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgcGFyZW50UmVmOiBieXRlczwzMj4sCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICB1c2VQYXlXYWxsOiBib29sZWFuLAogICAgLy8gICBwYXlXYWxsSUQ6IHVpbnQ2NCwKICAgIC8vICAgcG9zdFR5cGU6IFBvc3RUeXBlLAogICAgLy8gICAvLyBgYW1lbmRtZW50T2ZgIGlzIG9ubHkgY29uc3VtZWQgd2hlbiBgcG9zdFR5cGUgPT09IFBvc3RUeXBlRWRpdFJlcGx5YDsKICAgIC8vICAgLy8gbm9uLWVkaXQgY2FsbGVycyBwYXNzIGBCeXRlcygnJylgIOKAlCBzZWUgbm90ZSBvbiBgY3JlYXRlUG9zdGAuCiAgICAvLyAgIGFtZW5kbWVudE9mOiBieXRlcywKICAgIC8vICAgY3JlYXRvckZsYWdzOiB1aW50NjQsCiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDExIDAKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGJ5dGVjXzEgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jhbm5lZChUeG4uc2VuZGVyKSwgRVJSX0JBTk5FRCkKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgaXNCYW5uZWQKICAgIGJ6IGNyZWF0ZVJlcGx5X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMSAvLyAiRVJSOkJBTkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkFORAoKY3JlYXRlUmVwbHlfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTY0CiAgICAvLyBjb25zdCB7IGNyZWF0b3IgfSA9IHRoaXMucG9zdHMocGFyZW50UmVmKS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzQmxvY2tlZChjcmVhdG9yLCBUeG4uc2VuZGVyKSwgRVJSX0JMT0NLRUQpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGlzQmxvY2tlZAogICAgYnogY3JlYXRlUmVwbHlfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDM4IC8vICJFUlI6QkxLRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCTEtECgpjcmVhdGVSZXBseV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIHRoaXMudXBkYXRlU3RyZWFrKFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHVwZGF0ZVN0cmVhawogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gY29uc3QgeyByZWFjdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gY29uc3QgeyByZWFjdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMKICAgIC8vIGNvbnN0IFtzb2NpYWxGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU29jaWFsRmVlcykpCiAgICBieXRlYyAxMSAvLyAic29jaWFsX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTcxCiAgICAvLyBjb25zdCB7IHJlYWN0RmVlIH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NzIKICAgIC8vIGNvbnN0IGNyZWF0b3JJbXBhY3QgPSB0aGlzLmdldFVzZXJJbXBhY3QoY3JlYXRvcikKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3MwogICAgLy8gY29uc3QgdGF4UGVyY2VudGFnZSA9IGFraXRhU29jaWFsRmVlKHRoaXMuYWtpdGFEQU8udmFsdWUsIGNyZWF0b3JJbXBhY3QpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTczCiAgICAvLyBjb25zdCB0YXhQZXJjZW50YWdlID0gYWtpdGFTb2NpYWxGZWUodGhpcy5ha2l0YURBTy52YWx1ZSwgY3JlYXRvckltcGFjdCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczCiAgICAvLyBjb25zdCBbc29jaWFsRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1NvY2lhbEZlZXMpKQogICAgYnl0ZWMgMTEgLy8gInNvY2lhbF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjUKICAgIC8vIGNvbnN0IHsgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXggfSA9IGdldFNvY2lhbEZlZXMoYWtpdGFEQU8pCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjYKICAgIC8vIHJldHVybiBpbXBhY3RSYW5nZShpbXBhY3QsIGltcGFjdFRheE1pbiwgaW1wYWN0VGF4TWF4KQogICAgY2FsbHN1YiBpbXBhY3RSYW5nZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3NgogICAgLy8gY29uc3QgaXNFZGl0UmVwbHkgPSBwb3N0VHlwZSA9PT0gUG9zdFR5cGVFZGl0UmVwbHkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMTQgLy8gMHgwMwogICAgPT0KICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBleHRyYSArPSB0aGlzLnRpcENyZWF0b3IoY3JlYXRvciwgcmVhY3RGZWUsIHRheCkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgdGlwQ3JlYXRvcgogICAgZnJhbWVfZGlnIC05CiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyBpZiAoaXNFZGl0UmVwbHkpIHsKICAgIGJ6IGNyZWF0ZVJlcGx5X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gZXh0cmEgKz0gRWRpdEJhY2tSZWZNQlIKICAgIGludGMgNSAvLyAxMzIwMAogICAgKwoKY3JlYXRlUmVwbHlfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gdGhpcy52YWxpZGF0ZVBvc3RQYXltZW50KG1iclBheW1lbnQsIGNpZCwgaXNFZGl0UmVwbHksIGV4dHJhKQogICAgZnJhbWVfZGlnIC0xMAogICAgZnJhbWVfZGlnIC04CiAgICBmcmFtZV9kaWcgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHZhbGlkYXRlUG9zdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MwogICAgLy8gcG9zdHMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBQb3N0VmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFBvc3RzIH0pCiAgICBieXRlYyA0IC8vICJwIgogICAgZnJhbWVfZGlnIC0xMQogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnBvc3RzKHJlcGx5S2V5KS5leGlzdHMsIEVSUl9QT1NUX0VYSVNUUykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlUmVwbHlfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDQwIC8vICJFUlI6RVBTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFUFNUCgpjcmVhdGVSZXBseV9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1OTItNTk0CiAgICAvLyBjb25zdCByZXBseVJlZjogYnl0ZXMgPSBpc0VkaXRSZXBseQogICAgLy8gICA/IEJ5dGVzKGNpZCkuY29uY2F0KHBhcmVudFJlZikuY29uY2F0KGFtZW5kbWVudE9mKQogICAgLy8gICA6IEJ5dGVzKGNpZCkuY29uY2F0KHBhcmVudFJlZikKICAgIGZyYW1lX2RpZyAyCiAgICBieiBjcmVhdGVSZXBseV90ZXJuYXJ5X2ZhbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyA/IEJ5dGVzKGNpZCkuY29uY2F0KHBhcmVudFJlZikuY29uY2F0KGFtZW5kbWVudE9mKQogICAgZnJhbWVfZGlnIC04CiAgICBmcmFtZV9kaWcgLTcKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKCmNyZWF0ZVJlcGx5X3Rlcm5hcnlfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTk4CiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU5Ni02MDcKICAgIC8vIHRoaXMucG9zdHMocmVwbHlLZXkpLnZhbHVlID0gewogICAgLy8gICByZWY6IHJlcGx5UmVmLAogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgdXNlUGF5V2FsbCwKICAgIC8vICAgcGF5V2FsbElELAogICAgLy8gICBhZ2FpbnN0Q29udGVudFBvbGljeTogZmFsc2UsCiAgICAvLyAgIHBvc3RUeXBlOiBwb3N0VHlwZSwKICAgIC8vICAgY3JlYXRvckZsYWdzLAogICAgLy8gICBtb2RlcmF0b3JGbGFnczogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18zIC8vIDB4MDAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjA2CiAgICAvLyBtb2RlcmF0b3JGbGFnczogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTk2LTYwNwogICAgLy8gdGhpcy5wb3N0cyhyZXBseUtleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlZjogcmVwbHlSZWYsCiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICB1c2VQYXlXYWxsLAogICAgLy8gICBwYXlXYWxsSUQsCiAgICAvLyAgIGFnYWluc3RDb250ZW50UG9saWN5OiBmYWxzZSwKICAgIC8vICAgcG9zdFR5cGU6IHBvc3RUeXBlLAogICAgLy8gICBjcmVhdG9yRmxhZ3MsCiAgICAvLyAgIG1vZGVyYXRvckZsYWdzOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgNDEgLy8gMHgwMDRkCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyBjb25zdCBzZW5kZXJJbXBhY3QgPSB0aGlzLmdldFVzZXJJbXBhY3QoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gdGhpcy51cGRhdGVWb3RlcyhyZXBseUtleSwgdHJ1ZSwgc2VuZGVySW1wYWN0KQogICAgZnJhbWVfZGlnIC0xMQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAyCiAgICBjYWxsc3ViIHVwZGF0ZVZvdGVzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjExCiAgICAvLyB0aGlzLmNyZWF0ZVZvdGVMaXN0KHJlcGx5S2V5LCB0cnVlLCBUeG4uc2VuZGVyLCBzZW5kZXJJbXBhY3QpCiAgICBmcmFtZV9kaWcgLTExCiAgICBpbnRjXzEgLy8gMQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVZvdGVMaXN0CiAgICByZXRzdWIKCmNyZWF0ZVJlcGx5X3Rlcm5hcnlfZmFsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTk0CiAgICAvLyA6IEJ5dGVzKGNpZCkuY29uY2F0KHBhcmVudFJlZikKICAgIGZyYW1lX2RpZyAtOAogICAgZnJhbWVfZGlnIC03CiAgICBjb25jYXQKICAgIGIgY3JlYXRlUmVwbHlfdGVybmFyeV9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlVm90ZShtYnJQYXltZW50OiB1aW50NjQsIG1ick5lZWRlZDogdWludDY0LCByZWY6IGJ5dGVzLCBpc1VwOiB1aW50NjQpIC0+IHZvaWQ6CmNyZWF0ZVZvdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjE0LTYxOQogICAgLy8gcHJpdmF0ZSBjcmVhdGVWb3RlKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1ick5lZWRlZDogdWludDY0LAogICAgLy8gICByZWY6IGJ5dGVzPDMyPiwKICAgIC8vICAgaXNVcDogYm9vbGVhbgogICAgLy8gKTogdm9pZCB7CiAgICBwcm90byA0IDAKICAgIGJ5dGVjXzEgLy8gIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMubG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2socmVmKQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjIyCiAgICAvLyBjb25zdCB2b3RlTGlzdEtleTogVm90ZUxpc3RLZXkgPSB7IHVzZXI6IGIxNihUeG4uc2VuZGVyLmJ5dGVzKSwgcmVmOiBiMTYocmVmKSB9CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGIxNgogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkuZXhpc3RzLCBFUlJfQUxSRUFEWV9WT1RFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlVm90ZV9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6QVZPVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBVk9UCgpjcmVhdGVWb3RlX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgIT09IGNyZWF0b3IsIEVSUl9OT19TRUxGX1ZPVEUpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgNAogICAgIT0KICAgIGJueiBjcmVhdGVWb3RlX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjpTVk9UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNWT1QKCmNyZWF0ZVZvdGVfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gY29uc3Qgc2VuZGVySXNBdXRvbWF0ZWQgPSB0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuYXV0b21hdGVkCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIGNvbnN0IHNlbmRlcklzQXV0b21hdGVkID0gdGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmF1dG9tYXRlZAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMzkyCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGxvZ2dlZEFzc2VydCghc2VuZGVySXNBdXRvbWF0ZWQsIEVSUl9BVVRPTUFURURfQUNDT1VOVCkKICAgIGJ6IGNyZWF0ZVZvdGVfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOkFVVE8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVVUTwoKY3JlYXRlVm90ZV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBieXRlYyA3IC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzMKICAgIC8vIHRoaXMudXBkYXRlU3RyZWFrKFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIHVwZGF0ZVN0cmVhawogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gY29uc3QgeyByZWFjdEZlZSwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXggfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUsIGltcGFjdFRheE1pbiwgaW1wYWN0VGF4TWF4IH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MwogICAgLy8gY29uc3QgW3NvY2lhbEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTb2NpYWxGZWVzKSkKICAgIGJ5dGVjIDExIC8vICJzb2NpYWxfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUsIGltcGFjdFRheE1pbiwgaW1wYWN0VGF4TWF4IH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAzCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDIKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzYKICAgIC8vIGlmIChpc1VwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGNyZWF0ZVZvdGVfZWxzZV9ib2R5QDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjM4CiAgICAvLyBjb25zdCByZWNpcGllbnRJbXBhY3QgPSB0aGlzLmdldFVzZXJJbXBhY3QoY3JlYXRvcikKICAgIGZyYW1lX2RpZyA0CiAgICBkdXAKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYzOQogICAgLy8gY29uc3QgdGF4UGVyY2VudGFnZSA9IGltcGFjdFJhbmdlKHJlY2lwaWVudEltcGFjdCwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXgpCiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfZGlnIDEKICAgIGNhbGxzdWIgaW1wYWN0UmFuZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjQyCiAgICAvLyBjb25zdCBleHRyYSA9IHRoaXMudGlwQ3JlYXRvcihjcmVhdG9yLCByZWFjdEZlZSwgdGF4KQogICAgY2FsbHN1YiB0aXBDcmVhdG9yCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjQ1LTY1MQogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQgKyBleHRyYQogICAgLy8gICB9CiAgICAvLyApLAogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY0OAogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NDUtNjUxCiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ick5lZWRlZCArIGV4dHJhCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIGFtb3VudDogbWJyTmVlZGVkICsgZXh0cmEKICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciAzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjQ1LTY1MQogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQgKyBleHRyYQogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjQ0LTY1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaCgKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyTmVlZGVkICsgZXh0cmEKICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBjcmVhdGVWb3RlX2FmdGVyX2lmX2Vsc2VAMTQKICAgIGJ5dGVjIDEwIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpjcmVhdGVWb3RlX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Njc2CiAgICAvLyBjb25zdCBzZW5kZXJJbXBhY3QgPSB0aGlzLmdldFVzZXJJbXBhY3QoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY3NwogICAgLy8gdGhpcy51cGRhdGVWb3RlcyhyZWYsIGlzVXAsIHNlbmRlckltcGFjdCkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMgogICAgY2FsbHN1YiB1cGRhdGVWb3RlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY3OAogICAgLy8gdGhpcy5jcmVhdGVWb3RlTGlzdChyZWYsIGlzVXAsIFR4bi5zZW5kZXIsIHNlbmRlckltcGFjdCkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgY3JlYXRlVm90ZUxpc3QKICAgIHJldHN1YgoKY3JlYXRlVm90ZV9lbHNlX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjU2LTY2MgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQKICAgIC8vICAgfQogICAgLy8gKSwKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjU2LTY2MgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0zCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NTUtNjY0CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJOZWVkZWQKICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBjcmVhdGVWb3RlX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVZvdGVfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY2Ni02NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJlYWN0RmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NjgKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY2OAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY2Ni02NzEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJlYWN0RmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NjYtNjcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiByZWFjdEZlZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFrdGEKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjcmVhdGVWb3RlX2FmdGVyX2lmX2Vsc2VAMTQKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNyZWF0ZVJlYWN0aW9uKG1iclBheW1lbnQ6IHVpbnQ2NCwgbWJyTmVlZGVkOiB1aW50NjQsIHJlZjogYnl0ZXMsIE5GVDogdWludDY0KSAtPiB2b2lkOgpjcmVhdGVSZWFjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2ODEtNjg2CiAgICAvLyBwcml2YXRlIGNyZWF0ZVJlYWN0aW9uKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1ick5lZWRlZDogdWludDY0LAogICAgLy8gICByZWY6IGJ5dGVzPDMyPiwKICAgIC8vICAgTkZUOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gNCAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAyCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2ODcKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLmxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrKHJlZikKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBsb2FkUG9zdFdpdGhBY2Nlc3NDaGVjawogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoVHhuLnNlbmRlciwgTkZUKVswXSA+IDAsIEVSUl9VU0VSX0RPRVNfTk9UX09XTl9ORlQpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBibnogY3JlYXRlUmVhY3Rpb25fYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOk5PTlQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9OVAoKY3JlYXRlUmVhY3Rpb25fYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBjb25zdCByZWFjdGlvbkxpc3RLZXk6IFJlYWN0aW9uTGlzdEtleSA9IHsgdXNlcjogYjE2KFR4bi5zZW5kZXIuYnl0ZXMpLCByZWY6IGIxNihyZWYpLCBORlQgfQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBiMTYKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBiMTYKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIHJlYWN0aW9ubGlzdCA9IEJveE1hcDxSZWFjdGlvbkxpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhSZWFjdGlvbkxpc3QgfSkKICAgIHB1c2hieXRlcyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2OTMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5yZWFjdGlvbmxpc3QocmVhY3Rpb25MaXN0S2V5KS5leGlzdHMsIEVSUl9BTFJFQURZX1JFQUNURUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAzNSAvLyAiRVJSOkFSQ1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVJDVAoKY3JlYXRlUmVhY3Rpb25fYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Njk3CiAgICAvLyB0aGlzLnVwZGF0ZVN0cmVhayhUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiB1cGRhdGVTdHJlYWsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2OTkKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUsIGltcGFjdFRheE1pbiwgaW1wYWN0VGF4TWF4IH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Njk5CiAgICAvLyBjb25zdCB7IHJlYWN0RmVlLCBpbXBhY3RUYXhNaW4sIGltcGFjdFRheE1heCB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMKICAgIC8vIGNvbnN0IFtzb2NpYWxGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU29jaWFsRmVlcykpCiAgICBieXRlYyAxMSAvLyAic29jaWFsX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Njk5CiAgICAvLyBjb25zdCB7IHJlYWN0RmVlLCBpbXBhY3RUYXhNaW4sIGltcGFjdFRheE1heCB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcwMAogICAgLy8gY29uc3QgcmVjaXBpZW50SW1wYWN0ID0gdGhpcy5nZXRVc2VySW1wYWN0KGNyZWF0b3IpCiAgICBmcmFtZV9kaWcgNgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjYWxsc3ViIGdldFVzZXJJbXBhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MDEKICAgIC8vIGNvbnN0IHRheCA9IGltcGFjdFJhbmdlKHJlY2lwaWVudEltcGFjdCwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXgpCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGltcGFjdFJhbmdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzAzCiAgICAvLyBjb25zdCByZWFjdGlvbktleTogUmVhY3Rpb25zS2V5ID0geyByZWYsIE5GVCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MQogICAgLy8gcmVhY3Rpb25zID0gQm94TWFwPFJlYWN0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhSZWFjdGlvbnMgfSkKICAgIGJ5dGVjIDI4IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcwNAogICAgLy8gY29uc3QgcmVhY3Rpb25FeGlzdHMgPSB0aGlzLnJlYWN0aW9ucyhyZWFjdGlvbktleSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGZyYW1lX2J1cnkgNAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBleHRyYSArPSB0aGlzLnRpcENyZWF0b3IoY3JlYXRvciwgcmVhY3RGZWUsIHRheCkKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHRpcENyZWF0b3IKICAgIGZyYW1lX2RpZyAtMwogICAgKwogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzY0CiAgICAvLyBjb25zdCB7IHJlYWN0aW9ubGlzdCwgcmVhY3Rpb25zIH0gPSB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpCiAgICBieXRlY18xIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgZHVwCiAgICBwdXNoaW50IDQ4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc2NS03NjcKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gcmVhY3Rpb25FeGlzdHMKICAgIC8vICAgPyByZWFjdGlvbmxpc3QKICAgIC8vICAgOiByZWFjdGlvbnMgKyByZWFjdGlvbmxpc3QKICAgIGJ6IGNyZWF0ZVJlYWN0aW9uX3Rlcm5hcnlfZmFsc2VAMTAKCmNyZWF0ZVJlYWN0aW9uX3Rlcm5hcnlfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzcwLTc3NgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJBbW91bnQgKyBleHRyYQogICAgLy8gICB9CiAgICAvLyApLAogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc3MwogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NzAtNzc2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ickFtb3VudCArIGV4dHJhCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NzQKICAgIC8vIGFtb3VudDogbWJyQW1vdW50ICsgZXh0cmEKICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NzAtNzc2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ickFtb3VudCArIGV4dHJhCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NjktNzc4CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQgKyBleHRyYQogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IGNyZWF0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIGlmIChyZWFjdGlvbkV4aXN0cykgewogICAgZnJhbWVfZGlnIDQKICAgIGJ6IGNyZWF0ZVJlYWN0aW9uX2Vsc2VfYm9keUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzEzCiAgICAvLyB0aGlzLnJlYWN0aW9ucyhyZWFjdGlvbktleSkudmFsdWUgKz0gMQogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBib3hfcHV0CgpjcmVhdGVSZWFjdGlvbl9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzE4CiAgICAvLyB0aGlzLnJlYWN0aW9ubGlzdChyZWFjdGlvbkxpc3RLZXkpLmNyZWF0ZSgpCiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgcmV0c3ViCgpjcmVhdGVSZWFjdGlvbl9lbHNlX2JvZHlANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MTUKICAgIC8vIHRoaXMucmVhY3Rpb25zKHJlYWN0aW9uS2V5KS52YWx1ZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMgogICAgc3dhcAogICAgYm94X3B1dAogICAgYiBjcmVhdGVSZWFjdGlvbl9hZnRlcl9pZl9lbHNlQDcKCmNyZWF0ZVJlYWN0aW9uX3Rlcm5hcnlfZmFsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzY3CiAgICAvLyA6IHJlYWN0aW9ucyArIHJlYWN0aW9ubGlzdAogICAgZnJhbWVfZGlnIDUKICAgICsKICAgIGIgY3JlYXRlUmVhY3Rpb25fdGVybmFyeV9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwudmFsaWRhdGVUaXAodGlwOiB1aW50NjQsIGFjdGlvbjogYnl0ZXMpIC0+IHZvaWQ6CnZhbGlkYXRlVGlwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyMQogICAgLy8gcHJpdmF0ZSB2YWxpZGF0ZVRpcCh0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgYWN0aW9uOiBUaXBBY3Rpb24pIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyMgogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzIyCiAgICAvLyBjb25zdCBha3RhID0gQXNzZXQoZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgZHVwCiAgICBieXRlYyA3IC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzIyCiAgICAvLyBjb25zdCBha3RhID0gQXNzZXQoZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MwogICAgLy8gY29uc3QgW3NvY2lhbEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTb2NpYWxGZWVzKSkKICAgIHN3YXAKICAgIGJ5dGVjIDExIC8vICJzb2NpYWxfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MjMKICAgIC8vIGNvbnN0IHsgcG9zdEZlZSwgcmVhY3RGZWUgfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MjUtNzMyCiAgICAvLyBtYXRjaCgKICAgIC8vICAgdGlwLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAoYWN0aW9uID09PSBUaXBBY3Rpb25Qb3N0KSA/IHBvc3RGZWUgOiByZWFjdEZlZQogICAgLy8gICB9CiAgICAvLyApLAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzI4CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzI1LTczMgogICAgLy8gbWF0Y2goCiAgICAvLyAgIHRpcCwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YSwKICAgIC8vICAgICBhc3NldEFtb3VudDogKGFjdGlvbiA9PT0gVGlwQWN0aW9uUG9zdCkgPyBwb3N0RmVlIDogcmVhY3RGZWUKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgdW5jb3ZlciA0CiAgICA9PQogICAgJiYKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MzAKICAgIC8vIGFzc2V0QW1vdW50OiAoYWN0aW9uID09PSBUaXBBY3Rpb25Qb3N0KSA/IHBvc3RGZWUgOiByZWFjdEZlZQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAyNSAvLyAweDBhCiAgICA9PQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzI1LTczMgogICAgLy8gbWF0Y2goCiAgICAvLyAgIHRpcCwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YSwKICAgIC8vICAgICBhc3NldEFtb3VudDogKGFjdGlvbiA9PT0gVGlwQWN0aW9uUG9zdCkgPyBwb3N0RmVlIDogcmVhY3RGZWUKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyNC03MzQKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgdGlwLAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgeGZlckFzc2V0OiBha3RhLAogICAgLy8gICAgICAgYXNzZXRBbW91bnQ6IChhY3Rpb24gPT09IFRpcEFjdGlvblBvc3QpID8gcG9zdEZlZSA6IHJlYWN0RmVlCiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9UUkFOU0ZFUgogICAgLy8gKQogICAgYm56IHZhbGlkYXRlVGlwX2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCnZhbGlkYXRlVGlwX2FmdGVyX2Fzc2VydEAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC52YWxpZGF0ZVBvc3RQYXltZW50KG1iclBheW1lbnQ6IHVpbnQ2NCwgY2lkOiBieXRlcywgaXNBbWVuZG1lbnQ6IHVpbnQ2NCwgZXh0cmFBbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKdmFsaWRhdGVQb3N0UGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MzctNzQyCiAgICAvLyBwcml2YXRlIHZhbGlkYXRlUG9zdFBheW1lbnQoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIGlzQW1lbmRtZW50OiBib29sZWFuLAogICAgLy8gICBleHRyYUFtb3VudDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzQzCiAgICAvLyBjb25zdCB7IHBvc3RzLCB2b3Rlcywgdm90ZWxpc3QgfSA9IHRoaXMubWJyKGNpZCwgJycsIEJ5dGVzKCcnKSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWNfMSAvLyAiIgogICAgZHVwCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzQ0CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0NAogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGR1cAogICAgYnl0ZWMgNyAvLyAiYWtpdGFfYXNzZXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0NAogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODEKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4MgogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0KQogICAgY2FsbHN1YiByZWZlcnJlck9yWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg0CiAgICAvLyBpZiAocmVmZXJyZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogdmFsaWRhdGVQb3N0UGF5bWVudF9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJhbEZlZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIGxldCBhbW91bnQ6IHVpbnQ2NCA9IHBvc3RzICsgdm90ZXMgKyB2b3RlbGlzdCArIHJlZmVycmFsRmVlQW1vdW50ICsgZXh0cmFBbW91bnQKICAgIGZyYW1lX2RpZyAyCiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgZnJhbWVfZGlnIDQKICAgICsKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gaWYgKGlzQW1lbmRtZW50KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzQ4CiAgICAvLyBhbW91bnQgKz0gQW1lbmRtZW50TUJSCiAgICBpbnRjIDUgLy8gMTMyMDAKICAgICsKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc1Mi03NTgKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudAogICAgLy8gICB9CiAgICAvLyApLAogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NTItNzU4CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NTEtNzYwCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50CiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogdmFsaWRhdGVQb3N0UGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIDUKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ4NgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg3CiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zTGVuZ3RoKQogICAgaW50YyA4IC8vIDY3MDAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg5CiAgICAvLyBpZiAoYXNzZXQgIT09IDAgJiYgIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGZyYW1lX2RpZyA2CiAgICBieiB2YWxpZGF0ZVBvc3RQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTAKICAgIGZyYW1lX2RpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgNgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiB2YWxpZGF0ZVBvc3RQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg3CiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zTGVuZ3RoKQogICAgaW50YyA4IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5MAogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgZnJhbWVfYnVyeSAwCgp2YWxpZGF0ZVBvc3RQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTA6CiAgICBmcmFtZV9kaWcgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gY29uc3QgcmVmZXJyYWxGZWVBbW91bnQgPSByZWZlcnJhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCBha3RhKQogICAgYiB2YWxpZGF0ZVBvc3RQYXltZW50X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyYWxGZWVAMTEKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNyZWF0ZURlZmF1bHRNZXRhKG9yaWdpbjogYnl0ZXMsIGluaXRpYWxpemVkOiB1aW50NjQsIHdhbGxldDogdWludDY0LCBhdXRvbWF0ZWQ6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlRGVmYXVsdE1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzgxCiAgICAvLyBwcml2YXRlIGNyZWF0ZURlZmF1bHRNZXRhKG9yaWdpbjogQWNjb3VudCwgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4sIHdhbGxldDogdWludDY0LCBhdXRvbWF0ZWQ6IGJvb2xlYW4pOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4NwogICAgLy8gbGFzdEFjdGl2ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4Mi03OTQKICAgIC8vIHRoaXMubWV0YShvcmlnaW4pLnZhbHVlID0gewogICAgLy8gICBpbml0aWFsaXplZCwKICAgIC8vICAgd2FsbGV0LAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgbGFzdEFjdGl2ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZm9sbG93ZXJJbmRleDogMCwKICAgIC8vICAgZm9sbG93ZXJDb3VudDogMCwKICAgIC8vICAgYXV0b21hdGVkLAogICAgLy8gICBmb2xsb3dHYXRlSUQ6IDAsCiAgICAvLyAgIGFkZHJlc3NHYXRlSUQ6IDAsCiAgICAvLyAgIGRlZmF1bHRQYXlXYWxsSUQ6IDAKICAgIC8vIH0KICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMwogICAgc2V0Yml0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4NQogICAgLy8gc3RyZWFrOiAxLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3ODItNzk0CiAgICAvLyB0aGlzLm1ldGEob3JpZ2luKS52YWx1ZSA9IHsKICAgIC8vICAgaW5pdGlhbGl6ZWQsCiAgICAvLyAgIHdhbGxldCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGxhc3RBY3RpdmU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGZvbGxvd2VySW5kZXg6IDAsCiAgICAvLyAgIGZvbGxvd2VyQ291bnQ6IDAsCiAgICAvLyAgIGF1dG9tYXRlZCwKICAgIC8vICAgZm9sbG93R2F0ZUlEOiAwLAogICAgLy8gICBhZGRyZXNzR2F0ZUlEOiAwLAogICAgLy8gICBkZWZhdWx0UGF5V2FsbElEOiAwCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3ODgKICAgIC8vIGZvbGxvd2VySW5kZXg6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4Mi03OTQKICAgIC8vIHRoaXMubWV0YShvcmlnaW4pLnZhbHVlID0gewogICAgLy8gICBpbml0aWFsaXplZCwKICAgIC8vICAgd2FsbGV0LAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgbGFzdEFjdGl2ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZm9sbG93ZXJJbmRleDogMCwKICAgIC8vICAgZm9sbG93ZXJDb3VudDogMCwKICAgIC8vICAgYXV0b21hdGVkLAogICAgLy8gICBmb2xsb3dHYXRlSUQ6IDAsCiAgICAvLyAgIGFkZHJlc3NHYXRlSUQ6IDAsCiAgICAvLyAgIGRlZmF1bHRQYXlXYWxsSUQ6IDAKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzgyLTc5NAogICAgLy8gdGhpcy5tZXRhKG9yaWdpbikudmFsdWUgPSB7CiAgICAvLyAgIGluaXRpYWxpemVkLAogICAgLy8gICB3YWxsZXQsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBsYXN0QWN0aXZlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBmb2xsb3dlckluZGV4OiAwLAogICAgLy8gICBmb2xsb3dlckNvdW50OiAwLAogICAgLy8gICBhdXRvbWF0ZWQsCiAgICAvLyAgIGZvbGxvd0dhdGVJRDogMCwKICAgIC8vICAgYWRkcmVzc0dhdGVJRDogMCwKICAgIC8vICAgZGVmYXVsdFBheVdhbGxJRDogMAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pc0Jhbm5lZChhY2NvdW50OiBieXRlcykgLT4gdWludDY0Ogppc0Jhbm5lZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjEzCiAgICAvLyBwcml2YXRlIGlzQmFubmVkKGFjY291bnQ6IEFjY291bnQpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMTQtMTIxNwogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsTW9kZXJhdGlvbi5wcm90b3R5cGUuaXNCYW5uZWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tb2RlcmF0aW9uLAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIxNQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tb2RlcmF0aW9uLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMTUKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubW9kZXJhdGlvbiwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBieXRlYyA5IC8vICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIxNQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tb2RlcmF0aW9uLAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMTQtMTIxNwogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsTW9kZXJhdGlvbi5wcm90b3R5cGUuaXNCYW5uZWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tb2RlcmF0aW9uLAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg4NDI2OWM3OCAvLyBtZXRob2QgImlzQmFubmVkKGFkZHJlc3MpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icihyZWY6IGJ5dGVzLCByZWZUeXBlTmFtZTogYnl0ZXMsIHJlZlR5cGVTY2hlbWE6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNQogICAgLy8gbWJyKHJlZjogYnl0ZXMsIHJlZlR5cGVOYW1lOiBzdHJpbmcsIHJlZlR5cGVTY2hlbWE6IGJ5dGVzKTogQWtpdGFTb2NpYWxNQlJEYXRhIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE5CiAgICAvLyBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIGZyYW1lX2RpZyAtMwogICAgbGVuCiAgICBwdXNoaW50IDQwMAogICAgKgogICAgcHVzaGludCA0NjUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjMwCiAgICAvLyByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICArCiAgICBwdXNoaW50IDQwMAogICAgKgogICAgcHVzaGludCA5MzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwN2JkNDAwMDAwMDAwMDAwMDNkNTQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjIwCiAgICAvLyB2b3RlczogVm90ZXNNQlIsCiAgICBwdXNoaW50IDE5MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjIKICAgIC8vIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgcHVzaGludCAyMjEwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE2LTMxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBmb2xsb3dzOiBGb2xsb3dzTUJSLAogICAgLy8gICBibG9ja3M6IEJsb2Nrc01CUiwKICAgIC8vICAgcG9zdHM6IE1pblBvc3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogcmVmLmxlbmd0aCksCiAgICAvLyAgIHZvdGVzOiBWb3Rlc01CUiwKICAgIC8vICAgdm90ZWxpc3Q6IFZvdGVsaXN0TUJSLAogICAgLy8gICByZWFjdGlvbnM6IFJlYWN0aW9uc01CUiwKICAgIC8vICAgcmVhY3Rpb25saXN0OiBSZWFjdGlvbmxpc3RNQlIsCiAgICAvLyAgIG1ldGE6IE1ldGFNQlIsCiAgICAvLyAgIG1vZGVyYXRvcnM6IE1vZGVyYXRvcnNNQlIsCiAgICAvLyAgIGJhbm5lZDogQmFubmVkTUJSLAogICAgLy8gICBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgLy8gICAvLyBCb3gga2V5OiBwcmVmaXgoMSkgKyB1aW50NjQoOCkgPSA5IGJ5dGVzCiAgICAvLyAgIC8vIEJveCB2YWx1ZTogQVJDLTQgaGVhZGVyKDQpICsgc3RyaW5nIGxlbmd0aCgyKSArIG5hbWUgKyBieXRlcyBsZW5ndGgoMikgKyBzY2hlbWEKICAgIC8vICAgcmVmVHlwZXM6IFJlZlR5cGVzQmFzZU1CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyhyZWZUeXBlTmFtZSkubGVuZ3RoICsgQnl0ZXMocmVmVHlwZVNjaGVtYSkubGVuZ3RoKSkKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjIzCiAgICAvLyByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIHB1c2hpbnQgMTg5MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjQKICAgIC8vIG1ldGE6IE1ldGFNQlIsCiAgICBwdXNoaW50IDQ1MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoyNwogICAgLy8gYWN0aW9uczogQWN0aW9uc01CUiwKICAgIHB1c2hpbnQgMjk3MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLnBheVdhbGxNYnIocGF5d2FsbDogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5wYXlXYWxsTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM0CiAgICAvLyBwYXlXYWxsTWJyKHBheXdhbGw6IFZpZXdQYXlXYWxsVmFsdWUpOiB1aW50NjQgewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzcKICAgIC8vIFBheVdhbGxQYXlPcHRpb25TaXplICogKHBheXdhbGwuYWdlbnRQYXlJbmZvLmxlbmd0aCArIHBheXdhbGwudXNlclBheUluZm8ubGVuZ3RoKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzYtMzgKICAgIC8vIEJveENvc3RQZXJCeXRlICogKAogICAgLy8gICBQYXlXYWxsUGF5T3B0aW9uU2l6ZSAqIChwYXl3YWxsLmFnZW50UGF5SW5mby5sZW5ndGggKyBwYXl3YWxsLnVzZXJQYXlJbmZvLmxlbmd0aCkKICAgIC8vICkKICAgIHB1c2hpbnQgNjgwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM1CiAgICAvLyByZXR1cm4gTWluUGF5V2FsbE1CUiArICgKICAgIHB1c2hpbnQgNTIwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM1LTM5CiAgICAvLyByZXR1cm4gTWluUGF5V2FsbE1CUiArICgKICAgIC8vICAgQm94Q29zdFBlckJ5dGUgKiAoCiAgICAvLyAgICAgUGF5V2FsbFBheU9wdGlvblNpemUgKiAocGF5d2FsbC5hZ2VudFBheUluZm8ubGVuZ3RoICsgcGF5d2FsbC51c2VyUGF5SW5mby5sZW5ndGgpCiAgICAvLyAgICkKICAgIC8vICkKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzKGFraXRhREFPOiB1aW50NjQsIGNyZWF0b3I6IGJ5dGVzLCB3YWxsZXQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NQogICAgLy8gY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjcmVhdG9yOiBBY2NvdW50LCB3YWxsZXQ6IEFwcGxpY2F0aW9uKTogdGlwTUJSSW5mbyB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDcgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NgogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKGFraXRhREFPKS5ha3RhKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NTgKICAgIC8vIGlmICghY3JlYXRvci5pc09wdGVkSW4oYWt0YSkgJiYgd2FsbGV0LmlkICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzX2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDMtNTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KCkKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDMwIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDYKICAgIC8vIGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluLAogICAgZXh0cmFjdCAwIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0NwogICAgLy8gQ2FsbGVyVHlwZUdsb2JhbCwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDgKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0My01MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgbWV0aG9kU2VsZWN0b3I8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oKQogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YjM2MjM0YTUgLy8gbWV0aG9kICJhcmM1OF9jYW5DYWxsKHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVs0XSlib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQ5CiAgICAvLyAnJywKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1MAogICAgLy8gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oKQogICAgYnl0ZWMgMzkgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDMtNTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KCkKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjAKICAgIC8vIGlmIChjYW5DYWxsQXJjNThPcHRJbikgewogICAgYnogc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjYzCiAgICAvLyBhcmM1ODogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MS02NAogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgdHlwZTogVGlwU2VuZFR5cGVBUkM1OCwKICAgIC8vICAgYXJjNTg6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjYyCiAgICAvLyB0eXBlOiBUaXBTZW5kVHlwZUFSQzU4LAogICAgYnl0ZWMgNiAvLyAweDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjEtNjQKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHR5cGU6IFRpcFNlbmRUeXBlQVJDNTgsCiAgICAvLyAgIGFyYzU4OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0KICAgIHN3YXAKICAgIGNvbmNhdAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjY4LTcxCiAgICAvLyByZXR1cm4gewogICAgLy8gICB0eXBlOiBUaXBTZW5kVHlwZURpcmVjdCwKICAgIC8vICAgYXJjNTg6IDAKICAgIC8vIH0KICAgIHB1c2hieXRlcyAweDBhMDAwMDAwMDAwMDAwMDAwMAogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAJAAEIAqCNBpBn1PcBgKMFuIsEJioJYWtpdGFfZGFvAAQVH3x1AQABcAFtARQMYWtpdGFfYXNzZXRzDGFraXRhX2VzY3JvdwNzYWwIRVJSOklQQVkLc29jaWFsX2ZlZXMIRVJSOk5QU1QCAAABAwFvAQEIRVJSOkhHVEUBdwZ3YWxsZXQIRVJSOk5EQU8IRVJSOklSRkwKcGF5d2FsbF9pZBByZWZfdHlwZV9jb3VudGVyA2FhbAEKAQIIRVJSOkZHVEUBcgQn47tPA3BhbAhFUlI6QkFORAIAAQd2ZXJzaW9uCEVSUjpOVk9UCEVSUjpBUkNUCEVSUjpOTVRBCQAAAAAAAAAAAAhFUlI6QkxLRARoNeO8CEVSUjpFUFNUAgBNMRhAAAknFiNnJxeBBGeABOqRgN02GgCOAQEBMRkURDEYQQDqgiAEg/FHSASOUH8bBDNbOpwE4VqEKwQBAkXaBPZaR70Ev/jDtQQ6n9peBIT6S14EWvYCJwRjWYoYBG5bdwIEUQ7etgSFZDPqBNCfPegEaaTvlwQzBrMqBJX58aME4775QwTm5nvcBHOepwsEwCK+iQSYuB94BJ4XS7YEqJEgRATxNgDRBBQyT7cEoTSieAQ0QXXwBK6Ey9gEM+kslASFTe3gNhoAjiADBAM7A6sEQQUYBdIGdgb7B4oIGQibCQAJZwnOCvULbQweDGgNDw0hDTwNUQ1sDY0NwA5CDmgOoQ7hDwUPhgABACNDgARa2fTGNhoAjgECsQAxGYEEEjEYEERCDyCKAQGL/xUiSwEPIksCTwJNgRBLAg+BEE8DTwJNi/9OAlJJFYEQEkSJigMBi/0jDUEAE4v9IwmL/4v+CQuB6AcKi/9MCYkjQv/tigEBMgOL/0AABIsATImL/4AIcmVmZXJyZXJlSEL/7YoCAYv+gANvYWxlSIEYW7GyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQqEkRJIlklCEwVEkRXBgBJFUlBAAeLASQTQQAEIowAiYsAF0L/94oEAYv8OBiL/ScYZUiBKFsSQQA5i/w4GUAAMov8OBuBBBJBACiL/CLCGoAEQ5ImVRJBABmL/CPCGov+EkEADov8JcIai/8WEkEAAiOJIomKAwEiKUcEi/0xAIj/TIj/Kov/QQF3iwYyAxNBAW+L/YALd2FsbGV0X2ZlZXNlSCRbSSEEDkSL/x0hBJdJjANAAAiL/0EAAyOMAzIHjAUyB4GA9SQIjAKLAxaLBkxQJyBMUEmMAIv9JxhlSCRbjAQiWYHUxQELgeTFAgiMAYv+QABgsYsESXIIRIsBiwMIsgiyByOyECKyAbaLBRaLAhZPArIYgAR7fcX8shpMshqyGosAshqBBrIQIrIBs7Q+SVcEAExXAAQqEkRJFSQSRBcWiwEWUFcICIv/iwMJFkxQjACJiwRyCESL/nAARQFBAGmLAYsESXIIRLFLAXIIRIsBsgiyByOyECKyAbaL/rIRiwOyErIUgQSyECKyAbaLBRaLAhZPArIYgASvGhTyshpMshqyGosAshqBBrIQIrIBs7Q+SVcEAExXAAQqEkRJFSQSRBdMjAFC/3aLATIQCLGLBElyCEQyELIIsgcjshAisgG2i/4WTLIYgAQ5Tq6yshqyGoEGshAisgGzQv9li/8WIhZQjACJNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVSwEiWUmBChJESwJMSwJSIlmBDAgSRCchTwNnKE8CZycITGcjQyIoZUQnB2VIIltJMgpMcABFAUEADIAIRVJSOkFPUFSwALEyCksBshEishKyFIEEshAisgGzI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBc2GgJJFYEYEkQ2GgNJFYEkEkQ2GgRJFSQSRBc2GgVJFSMSRCJTNhoGSRUkEkQXNhoHSRUkEkQXTwZPBogNvU8GJxmIF9JOBk4GKylPCIgTsyNDIilHAjEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkVgSQSRDYaAkcCFYEgEkQ2GgNJFSQSRBdMJwRMUL1FAUAABCcMsABLAUsDiA3SSSVbRQlJgVBTRQdJgQtbRQhJVxMBTFcUIEUKiAuWQQAMgAhFUlI6SVNSULAASwMnGYgXRksISwVLBEsKSwlLCycaSwhLCIgTHSNDMRaBAwlJOBAjEkQxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSRUkEkQXNhoCSRWBGBJENhoDSU4EFYEkEkQ2GgRJIlklCEsBFRJEVwIANhoFSRUkEkQXNhoGSRUkEkQXTgU2GgdJFSMSRCJTTgU2GghJFSQSRBdOBTYaCUkVJBJEF04FTwNPA4gMiE4DTIgMp0lXACBOAkmBIFtOAoEoWyIoZUQxAE8DTgJPA4j77EAABCcbsABLCCcGiBZySwJLCksCSwpLBUsLSwtLCycQKUsNiBNvI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBc2GgJJFYEYEkQ2GgNJTgMVgSQSRDYaBEkiWSUISwEVEkRXAgA2GgVJFSQSRBc2GgZJFSQSRBdOBDYaB0kVIxJEIlNOBDYaCEkVJBJEF04ENhoJSRUkEkQXTgRPA08DiAu9TgJMiAvcSVcAIExJgSBbTIEoW0EABCcRsABLCCcGiBW4SwJLCksCSwpLBUsLSwtLCycQKUsNiBK1I0MxFoEDCUk4ECMSRDEWJQlJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJTgJJFYEkEkQ2GgJJTgNJFYEgEkQ2GgNJFSQSRBdOA0yIDK9JVwAgTgJJgSBbSwGBKFtOA0sBgYADU04DSwGBMVtOA0xXOSBOAiIoZUQxAE8DTgJPA4j6jUAABCcbsABLCCcGiBUTSUsKIksKSwhLCEsISwgnDksPSw+IEhEjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUcCFYEkEkQ2GgJJTgJJFYEgEkQ2GgNJFSQSRBdOAkyIDBlJVwAgTEmBIFtLAYEoW04CSwGBgANTTgJLAYExW04CTFc5IExBAAQnEbAASwgnBogUjklLCiJLCksISwhLCEsIJw5LD0sPiBGMI0MiMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVIxJEIlNOAklPAogIhUlXACBOAlcgIEwjEkEAGicESwJQSUUHvUUBQAAEJwywAEsFIoEgukUBSwFJSwKIDmdLBScGiBP8KUcCiBVCgSBbCEsGTE8CSwWIEfkjQykxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFHAhWBIBJENhoCSRUjEkQiU0wxAIj4Y0yI+F9QJw9MUEm9RQFAAAQnIrAARwK+REkiW0yBQFMUSUUJSwVMTwKIDpu8SEsBQAAZsTEAKUcCiBTHgSBbsgiyByOyECKyAbMjQ0sDJwaIE2RLBCJLBEsIiBFrQv/qMRaBAwlJOBAjEkQxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVJBJEF04DTIgJF0lXACBOAkmBIFtOAoEoWyIoZUQxAE8DTgJPA4j4XEAABCcbsABLAycGiBLiSwRLAUsDSwWIEfcjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBc2GgNJFSQSRBdOAkyICKFJVwAgTEmBIFtMgShbQQAEJxGwAEsDJwaIEn1LBEsBSwNLBYgRkiNDNhoBRwIVgSASRDYaAkkVJBJEF0sBiAgDSDEAiPb/TwKI9vpQTBZJTgJQgAFlTFBJvUUBQAAEJyOwAEsCSwJQJxxMUEm+RBcjCRa/SbxIsTEAKUcCiBNlgTBbsgiyByOyECKyAbMjQyI2GgFJFYEgEkQ2GgJJFSMSRCJTNhoDSRUkEkQxACIoZUQnCWVIgRhbcghEEkAADIAIRVJSOk5NRFiwACcESwNQSUUFvUUBQAAEJwywAEsDSYE5I7oiSwRUSwGBOU8Cu4FDSwK7I0MxFiMJSTgQIxJENhoBSRWBIBJENhoCSRUjEkQiU0w2GgNJTgIVJBJENhoESU4CFSQSRDYaBUlOAhUkEkQiKGVESwGI9nJMMQASJwUxAFC9RQFBAAyACEVSUjpFTVRBsABLBkk4BzIKEkw4CClHAogSfYE4WyEGCBIQQAAEJwqwACIoZUQnCWVIgRBbSbFyCEQhBrIIsgcjshAisgGzSwZBAEMxAEsCSwQjiBHQsTEAIhZPArIYJx2yGkyyGkmyGkmyGrIagQayECKyAbO0PklXBABMVwAEKhJEFSQSRCIWKkxQsCNDMQBLAksEIogRjbExAEyyGCcdshqyGksEshpLA7IaSwKyGoEGshAisgGztD5JVwQATFcABCoSREkVJBJEFyMIQv+3MRYjCUk4ECMSRDYaAUkVSwEiWUmBBBJESwJMSwJSIlmBEQuBBghLAiVZSUsCEkRLA0xLA1IiWYERCyUICBJESwE4BzIKEk8COAhPAogR204DDxBAAAQnCrAAIicWZURJIwgnFkxnFicSSwFQSbxISwK/KkxQsCNDNhoBSRUkEkQ2GgJJFSQSRDYaA0kVJBJENhoESRUkEkQ2GgVJFSQSRDYaBkcCFSQSRBcnBTEAUL1FAUAABCcksABJFicSTFC9RQFAAAyACEVSUjpOUFdMsAAnBTEAUL5ESwdcMksGXDpLAlxCJwUxAFBMvyIoZUQnCWVIgRBbsTEATLIYJx2yGrIaSwSyGksDshpLArIagQayECKyAbO0PklXBABMVwAEKhJEFSQSRCNDNhoBSRWBIBJENhoCSRUkEkQ2GgNJFSQSRDEAIihlRCcJZUgkW3IIRBJAAAyACEVSUjpOR1JGsAAnBUsDUEmBIUsEu4EpSwK7I0MxFiMJSTgQIxJENhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgAxACIoZUQnE2VIcghEEkAABCcUsABLAkk4BzIKEkw4CClLBEsEiBACgVhbEhBAAAQnCrAAIicXZUQjCCcXSwFnSwJJFRZXBgJMUEkVgQQISwNJFRZXBgJMUEwWVwYCgAIABExQTwJQTFBMFoABdEsBUEm8SE8CvypMULAjQzYaAUkVgSASRIgGUipMULAjQzYaAUkVgSASRCcFTFC9RQErIk8CVCpMULAjQzYaAUkVgSASRCcFTFC+RCpMULAjQzYaAUkVgSASRCcETFC9RQErIk8CVCpMULAjQzYaAUkVgSASRCcETFBJvUUBQAAEJwywAEm+RCpMULAjQzYaAUkVgSASRDYaAkkVgSASREyI8npMiPJ2UCcPTFBJvUUBQAAEJyKwAEm+RCpMULAjQyI2GgFHAiJZSU4CgUALJQhMFRJEJw0iSUsDDEEAXUsDVwIASwGBQAuBQFhJVwAgTFcgIEyI8iZMiPIiUCcPTFBJRQa9RQFBAB1LBL5ESwJJIlkjCBZXBgBcAExQRQJJIwhFAUL/sUsBSSJZIwgWVwYAXAAnJVBFAkL/4ypLAlCwI0M2GgFJFYEgEkQ2GgJJFSQSRBcWUCccTFC9RQErIk8CVCpMULAjQzYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIANhoDSSJZJQhLARUSRFcCAIgOISpMULAjQzYaAUkVSwEiWUmBBBJESwJMSwJSIlmBEQuBBghLAiVZSUsCEkRLA0xLA1IiWYERCyUICBJEiA5GSBYqTFCwI0M2GgFJFSQSRBc2GgJJFYEgEkQ2GgNJFSQSRBeIDksqTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJxNlSHIIRBJAAAQnFLAAJwhLAWcjQzYaAUkiWSUISwEVEkRXAgAxACIoZUQnE2VIcghEEkAABCcUsAAiKGVEJx5lSIEQWzINEkAADIAIRVJSOklVUEewACchSwFnI0M2GgFJFSQSRBcxACIoZUQnE2VIcghEEkAABCcUsAAoSwFnI0OKAQGL/ycQEkAACIv/Jw4SQQACI4kiiYoCASJJKUcDMgOL/iMSQQAbi/8VgSASSYwEQAAEJxWwAIsERIv/iwZQjACJi/4lEkEAPIv/FSQSQAAEJxWwAIv/F0mMBXEAREAADIAIRVJSOklBU1SwAIEYr4v/TFBJFYEgEkSLBXELTIwGREL/t4v+gQMSQQA3i/8VgSASSYwCQAAEJxWwAIsCRCcFi/9QSYwBvUUBQQAOiwG+RIE6W0EABCcRsACL/0mMBkL/eIv+gQQSQQA9i/8VJBJAAAQnFbAAi/8XSYwDcgBEFUAADIAIRVJSOklBUFCwAIEYr4v/TFBJFYEgEkSLA3IHTIwGREL/M4v+FkmMAIABdExQvUUBQAAMgAhFUlI6TlJUULAAiwCL/1ABMgOMBkL/CYoCAbEiKGVEJwllSCRbshiABEMDZo6yGov+shqL/7IagQayECKyAbO0PklXBABMVwAEKhJESRUjEkQiU4mKAQEiSTEAiAtdQQAEJx+wACcEi/9QSYwBvUUBQAAEJwywAIsBIoEgukmMADEAiP+SQQAEJyawAImKAgEyB4v+CYE8DkAADIAIRVJSOlRTT0ywADEAi/4WUIv/UAGJigIBi/6L/4j+PklXACBJTwJXICBMJwRMUEm9RQFAAAQnDLAAiwJJIoEgukyBKCS6FzIDiwFJTwISTE8DTwJNiwBJTwKIBBQWUEwWUIwAiYoCASknBIv+UEcCIoEguksBgU0luhclCEsCgU1PArpXAgBOAksBgSgkuhdOAksBgTAjuiJTTgJLAYExJLoXTgJMgTojukwxABJAAAyACEVSUjpORURUsACLBisSQQB2gSSLAhVJjAAMQQAMgAhFUlI6RUFNRLAAMQCL/lCL/1ABgAFhSwFQiwJJTwJQiwFJTgK+REsBFRZXBgJPAlBLAYFLWU8CIk8CWExQSwG8SL+LABZXBgJMUIsDFoACADRMUCsiiwRUUIsFFlCLBlBPAlBMUIwAiYsGJxASQQAFgURC/3+LBicaEkEABYFEQv9yiwYnDhJBAAWBZEL/ZYEkQv9gigIBIkcDKScEi/5QvUUBQAAMgAhFUlI6TlJQTLAAi/6L/4j+2kkiWUsBFUsCTgJSVwIAjANJVwIIjABJgVBTjARJVwsIjAFJVxMBTFcUIIwCiPyNQAAMgAhFUlI6TkFSULAAiwNJFYEkSwEPgSRLAk8CTYFESwIPgURPA08CTVJJFYEgEkQnBEsBUIEoJLoXFlCLAFArIosEVFCLAVCLAlCMAImKAQEiKUkiRwInBYv/UEm9RQFBABKLBr5EI4wDSYEJW4wEgRFbjAUijAIijAGAAXaL/1BJjAC9RQFBAA6LAL5ESSJbjAKBQFOMASsiiwNUiwQWUIsFFlCLAhZQKyKLAVRQjACJigEBi/+I/5SxIihlRCcJZUiBEFuyGIAE8k1gY7Iai/+yGrIagQayECKyAbO0PklXBABMVwAEKhJESRUkEkQXiYoDASJJKUcEi/0yAxJBACoiKGVEJwdlSCJbsSInCGVEJVtyCERMshGL/rISshSBBLIQIrIBsyKMAIkijAYnBYv9UEmMAL1FAUEACIsAvkQjW4wGIihlRIv9iwaICNtJVwABTCNbjAMiKGVESScHZUgiW0mMAov/iOygIluMBCIoZUQnC2VIJFtMJwYSQQDMi/8JiwZJgBJjb250cm9sbGVkX2FkZHJlc3NlSEwiKGVEJx5lSElXAAhMIluxIxZLA7IYgARa3zOPshpPArIashonDbIaJw2yGicNshqBBrIQIrIBtjIQSwOyB7III7IQIrIBtksBFosCSU4EFicgTFBPArIYJyeyGkyyGoABgLIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBtiInCGVEJVtyCERLAbIRiwSyErIUgQSyECKyAbayEbIUshKBBLIQIrIBs4sDjACJi/8JSYwFIicIZUQlW3IITIwBREEAN4v9iwJwAEUBQQAssYsCSbIRiwSyEosBshSBBLIQIrIBtrIRiwWyEov9shSBBLIQIrIBsyKMAImLBIsFCLGLArIRshKLAbIUgQSyECKyAbNC/+GKAgEnBIv+UEm9RQFAADMyBxaL/0xQIhZMSwFQK1BLAVAnDVBLAVBMUIAEAE0AAFCLAEm8SEy/KUcCiAargRBbTIkiTImKAQApSScFi/9QSb1FAUAABCcksACLAkm+REmBEVtMgRlbSU4CjAAyB0lPAgkhBxgJSYwBIQcJMgcWTwOBGU8CuwxBAAojFosCgQlPAruJiwCLAQxBAA+LAkm+RIEJWyMIFoEJTLuJigMAKUcCgAF2i/1QSb1FAUAAH4v+FIv/FisiTwNUUElXAAhMgUBTKyJPAlRQiwNMv4mLA75ESYFAU4wBIluMAov+QQAFiwFAAAqL/kAAaIsBQABjI4wAiwJAAA+L/hSL/xYrIk8DVFBC/7SL/4sCEkEACosAQQAFJyVC/6KL/4sCDYsAEEEAE4v/iwIJiwEUTBYrIk8DVFBC/4SLAEEAD4sCi/8JFisiiwFUUEL/cIsCi/8IQv/uIowAQv+aigQAi/6I6NiL/Ijo01CL/xYrIov9VFAnD08CUEy/iYoJACIpSTEAiAUbQQAEJx+wAIv7QAAFi/xBADCL+0EBBIv8QQANi/wWJxJMUL1FAUAAGYv8QADtJwUxAFC+RFdCCCcSTFC9RQFBANkjQAAMgAhFUlI6SVBXTLAAi/0nGhJJjAJJIQULi/iL+U8DTwOIA+sxAIj+RTEAiPv4jAEnBIv3UEmMAL1FAUEABCcosACLAkEAiov5i/5QMQAyBxZQi/oWUCsii/tUUIv8FlArUIv9UIv/FlAiFlBMSRUWVwYCTFBMJylQTFCLAEm8SEy/i/cjiwFJTgOI/kiL9yMxAE8DiP77IihlREknB2VIIltLAScLZUgiW08CSwJPAojozSJbsSInCGVEJVtyCERPArIRshSyEoEEshAisgGziYv5Qv92IkL/JIoLACJJKTEAiAPyQQAEJx+wACcEi/lQIoEgukmMADEAiPg2QQAEJyawADEAiP1lIihlRCcLZUgkW4sASU4CiPsLIihlRCcLZUhJgRBbTIEYW4jnbEkhBA5ESwEdIQSXi/0nDhJJTgKMAk8DTwNPAoj7Gov3CExBAAMhBQiL9ov4iwJPA4gCricEi/VQSYwBvUUBQQAEJyiwAIsCQQBWi/iL+VCL/lAxADIHFlCL+hZQKyKL+1RQi/wWUCtQi/1Qi/8WUCIWUExJFRZXBgJMUEwnKVBMUIsBSbxITL8xAIj6a4v1I0sCiP0Si/UjMQBPA4j9xYmL+Iv5UEL/qooEAClHA4v+iPePMQCI5oyL/ojmh1AnD0xQvUUBQQAMgAhFUlI6QVZPVLAAMQCLBBNAAAyACEVSUjpTVk9UsAAnBTEAUL5EgYgDU0EADIAIRVJSOkFVVE+wACIoZUQnB2VIIluMADEAiPwtIihlRCcLZUhJJFuMA0mBEFuMAoEYW4wBi/9BAFGLBEmI+cKLAosBiOYvSSEEDkSLA0lPAh0hBJeI+eqL/DgHMgoSi/w4CIv9TwMIEhBAAAQnCrAAMQCI+YyL/ov/SwKI/DKL/ov/MQBPA4j85ImL/DgHMgoSi/w4CIv9EhBAAAQnCrAAsSInCGVEJVtyCESLALIRiwOyErIUgQSyECKyAbNC/7CKBAAiRwIpRwKL/oj2fTEAi/9wAEhAAAyACEVSUjpOT05UsAAxAIjlZIv+iOVfUIv/FkmMAFCAAWVMUEmMAb1FAUEABCcjsAAxAIj7PCIoZUQnC2VISSRbSwGBEFtPAoEYW4sGSU4DiPjXTgKI5UaL/osAUCccTFBJjAK9SU4EjARITE8DTwKI+PeL/QiMAylHAogBl0mBMFtOAoEoW4wFQQA3i/w4BzIKEov8OAhPAosDCBIQQAAEJwqwAIsEQQAQiwJJvkQXIwgWv4sBIrlIiSMWiwJMv0L/8YsFCEL/w4oCACIoZURJJwdlSCJbTCcLZUhJIltMJFuL/jgUMgoSi/44EU8EEhCL/jgSi/8nGRJPA08ETwJNEhBAAAyACEVSUjpJWEZSsACJigQAKUmL/SlJiAD2SYEQW0xJgRhbTIEgWyIoZUxJTwJESScHZUgiW0wxAIjknYjkezIDEkEALCKLAosDCIsECAiL/wiL/kEAAyEFCIv8OAcyChKL/DgITwISEEAABCcKsACJiwUnGGVIJFuMASEIjACLBkEAFYsBcghEiwZwAEUBQAAHIQgyEAiMAIsAQv+oigQAMgdJKyKL/VSL/hZQIxZQTwIWUEwWUCIWTEsBUEsBUCsii/9UUEsBUEsBUExQJwWL/FBMv4mKAQGxIihlRCcJZUiBGFuyGIAEhCaceLIai/+yGoEGshAisgGztD5JVwQATFcABCoSREkVIxJEIlOJigMBi/0VgZADC4Gk6wIIi/4Vi/8VCIGQAwuB1EgITBaAEAAAAAAAAHvUAAAAAAAAPVRMUIHklgEWTEsBUExQgdSsARZQgdSTARZMSwFQgfThAhZQSwFQTFCBhOgBFlBMFlCJigECi/8lWYv/FYv/SwJPAlIiWYv/IlmL/0xPA1IiWQiBkDULgdAoCIv/iYoDAYv9JwdlSCJbi/5McABFAUAAV4v/QQBSsYv9Jx5lSFcACCMWMgOL/7IYgASzYjSlshpPArIaTLIashonDbIaJyeyGoEGshAisgGztD5JVwQATFcABCoSREkVIxJEIlNBAAgyEBYnBkxQiYAJCgAAAAAAAAAAiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var AkitaSocialParamsFactory = class _AkitaSocialParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64,(string,uint64))void":
            return _AkitaSocialParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the AkitaSocial smart contract using the create(string,uint64,(string,uint64))void ABI method
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
            return _AkitaSocialParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the AkitaSocial smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the init()void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static init(params) {
    return {
      ...params,
      method: "init()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static post(params) {
    return {
      ...params,
      method: "post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.timestamp, params.args.nonce, params.args.cid, params.args.gateId, params.args.usePayWall, params.args.payWallId, params.args.creatorFlags]
    };
  }
  /**
   * Constructs a no op call for the editPost(pay,axfer,byte[36],byte[32],uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static editPost(params) {
    return {
      ...params,
      method: "editPost(pay,axfer,byte[36],byte[32],uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.cid, params.args.amendment, params.args.creatorFlags]
    };
  }
  /**
   * Constructs a no op call for the gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedReply(params) {
    return {
      ...params,
      method: "gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.gateTxn, params.args.timestamp, params.args.nonce, params.args.cid, params.args.ref, params.args.type, params.args.gateId, params.args.usePayWall, params.args.payWallId, params.args.creatorFlags]
    };
  }
  /**
   * Constructs a no op call for the reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static reply(params) {
    return {
      ...params,
      method: "reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.timestamp, params.args.nonce, params.args.cid, params.args.ref, params.args.type, params.args.gateId, params.args.usePayWall, params.args.payWallId, params.args.creatorFlags]
    };
  }
  /**
   * Constructs a no op call for the gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEditReply(params) {
    return {
      ...params,
      method: "gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.gateTxn, params.args.cid, params.args.amendment, params.args.creatorFlags]
    };
  }
  /**
   * Constructs a no op call for the editReply(pay,axfer,byte[36],byte[32],uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static editReply(params) {
    return {
      ...params,
      method: "editReply(pay,axfer,byte[36],byte[32],uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.cid, params.args.amendment, params.args.creatorFlags]
    };
  }
  /**
   * Constructs a no op call for the vote(pay,axfer,byte[],uint64,bool)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static vote(params) {
    return {
      ...params,
      method: "vote(pay,axfer,byte[],uint64,bool)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.ref, params.args.type, params.args.isUp]
    };
  }
  /**
   * Constructs a no op call for the editVote(pay,axfer,byte[32],bool)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static editVote(params) {
    return {
      ...params,
      method: "editVote(pay,axfer,byte[32],bool)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.ref, params.args.flip]
    };
  }
  /**
   * Constructs a no op call for the gatedReact(pay,axfer,appl,byte[],uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedReact(params) {
    return {
      ...params,
      method: "gatedReact(pay,axfer,appl,byte[],uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.gateTxn, params.args.ref, params.args.type, params.args.nft]
    };
  }
  /**
   * Constructs a no op call for the react(pay,axfer,byte[],uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static react(params) {
    return {
      ...params,
      method: "react(pay,axfer,byte[],uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.tip, params.args.ref, params.args.type, params.args.nft]
    };
  }
  /**
   * Constructs a no op call for the deleteReaction(byte[32],uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteReaction(params) {
    return {
      ...params,
      method: "deleteReaction(byte[32],uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.ref, params.args.nft]
    };
  }
  /**
   * Constructs a no op call for the setPostModeration(byte[32],bool,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setPostModeration(params) {
    return {
      ...params,
      method: "setPostModeration(byte[32],bool,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.ref, params.args.againstContentPolicy, params.args.moderatorFlags]
    };
  }
  /**
   * Constructs a no op call for the initMeta(pay,address,bool,uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static initMeta(params) {
    return {
      ...params,
      method: "initMeta(pay,address,bool,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.user, params.args.automated, params.args.subscriptionIndex, params.args.nfd, params.args.akitaNft]
    };
  }
  /**
   * Constructs a no op call for the createPayWall(pay,((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static createPayWall(params) {
    return {
      ...params,
      method: "createPayWall(pay,((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.payWall]
    };
  }
  /**
   * Constructs a no op call for the updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateMeta(params) {
    return {
      ...params,
      method: "updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.followGateId, params.args.addressGateId, params.args.subscriptionIndex, params.args.nfd, params.args.akitaNft, params.args.defaultPayWallId]
    };
  }
  /**
   * Constructs a no op call for the updateFollowerMeta(address,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateFollowerMeta(params) {
    return {
      ...params,
      method: "updateFollowerMeta(address,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.newFollowerIndex, params.args.newFollowerCount]
    };
  }
  /**
   * Constructs a no op call for the registerRefType(pay,string,byte[])uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static registerRefType(params) {
    return {
      ...params,
      method: "registerRefType(pay,string,byte[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.name, params.args.schema]
    };
  }
  /**
   * Constructs a no op call for the getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getSocialImpactInputs(params) {
    return {
      ...params,
      method: "getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool)",
      args: Array.isArray(params.args) ? params.args : [params.args.user]
    };
  }
  /**
   * Constructs a no op call for the getMetaExists(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getMetaExists(params) {
    return {
      ...params,
      method: "getMetaExists(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.user]
    };
  }
  /**
   * Constructs a no op call for the getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getMeta(params) {
    return {
      ...params,
      method: "getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.user]
    };
  }
  /**
   * Constructs a no op call for the getPostExists(byte[32])bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getPostExists(params) {
    return {
      ...params,
      method: "getPostExists(byte[32])bool",
      args: Array.isArray(params.args) ? params.args : [params.args.ref]
    };
  }
  /**
   * Constructs a no op call for the getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getPost(params) {
    return {
      ...params,
      method: "getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])",
      args: Array.isArray(params.args) ? params.args : [params.args.ref]
    };
  }
  /**
   * Constructs a no op call for the getVote(address,byte[32])(uint64,bool) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getVote(params) {
    return {
      ...params,
      method: "getVote(address,byte[32])(uint64,bool)",
      args: Array.isArray(params.args) ? params.args : [params.args.account, params.args.ref]
    };
  }
  /**
   * Constructs a no op call for the getVotes((address,byte[32])[])(uint64,bool)[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getVotes(params) {
    return {
      ...params,
      method: "getVotes((address,byte[32])[])(uint64,bool)[]",
      args: Array.isArray(params.args) ? params.args : [params.args.keys]
    };
  }
  /**
   * Constructs a no op call for the getReactionExists(byte[32],uint64)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getReactionExists(params) {
    return {
      ...params,
      method: "getReactionExists(byte[32],uint64)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.ref, params.args.nft]
    };
  }
  /**
   * Constructs a no op call for the mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.ref, params.args.refTypeName, params.args.refTypeSchema]
    };
  }
  /**
   * Constructs a no op call for the payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static payWallMbr(params) {
    return {
      ...params,
      method: "payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.paywall]
    };
  }
  /**
   * Constructs a no op call for the checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static checkTipMbrRequirements(params) {
    return {
      ...params,
      method: "checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.akitaDao, params.args.creator, params.args.wallet]
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
var AkitaSocialFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `AkitaSocialFactory`
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
    return new AkitaSocialClient(this.appFactory.getAppClientById(params));
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
    return new AkitaSocialClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the AkitaSocial smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? AkitaSocialParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? AkitaSocialParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new AkitaSocialClient(result.appClient) };
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
       * Creates a new instance of the AkitaSocial smart contract using the create(string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(AkitaSocialParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the AkitaSocial smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(AkitaSocialParamsFactory.update.update(params));
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
       * Creates a new instance of the AkitaSocial smart contract using the create(string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(AkitaSocialParamsFactory.create.create(params));
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
       * Creates a new instance of the AkitaSocial smart contract using an ABI method call using the create(string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(AkitaSocialParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new AkitaSocialClient(result.appClient) };
      }
    }
  }}
}, _class);
var AkitaSocialClient = (_class2 = class _AkitaSocialClient {
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
   * Returns a new `AkitaSocialClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AkitaSocialClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `AkitaSocialClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AkitaSocialClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the AkitaSocial smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(AkitaSocialParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocial smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `init()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    init: (params = { args: [] }) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.init(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    post: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.post(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editPost(pay,axfer,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    editPost: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.editPost(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedReply: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.gatedReply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    reply: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.reply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEditReply: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.gatedEditReply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editReply(pay,axfer,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    editReply: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.editReply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `vote(pay,axfer,byte[],uint64,bool)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    vote: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.vote(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editVote(pay,axfer,byte[32],bool)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    editVote: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.editVote(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedReact(pay,axfer,appl,byte[],uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedReact: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.gatedReact(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `react(pay,axfer,byte[],uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    react: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.react(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `deleteReaction(byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteReaction: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.deleteReaction(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `setPostModeration(byte[32],bool,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setPostModeration: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.setPostModeration(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `initMeta(pay,address,bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initMeta: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.initMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `createPayWall(pay,((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    createPayWall: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.createPayWall(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateMeta: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.updateMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateFollowerMeta(address,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateFollowerMeta: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.updateFollowerMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `registerRefType(pay,string,byte[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    registerRefType: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.registerRefType(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getSocialImpactInputs: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getSocialImpactInputs(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getMetaExists(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getMetaExists: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getMetaExists(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getMeta: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getPostExists(byte[32])bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getPostExists: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getPostExists(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getPost: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getPost(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getVote(address,byte[32])(uint64,bool)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getVote: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getVote(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getVotes((address,byte[32])[])(uint64,bool)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getVotes: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getVotes(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getReactionExists(byte[32],uint64)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getReactionExists: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.getReactionExists(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    payWallMbr: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.payWallMbr(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    checkTipMbrRequirements: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.checkTipMbrRequirements(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(AkitaSocialParamsFactory.opUp(params));
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
       * Updates an existing instance of the AkitaSocial smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(AkitaSocialParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocial smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `init()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    init: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.init(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    post: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.post(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editPost(pay,axfer,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    editPost: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.editPost(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedReply: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.gatedReply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    reply: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.reply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEditReply: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.gatedEditReply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editReply(pay,axfer,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    editReply: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.editReply(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `vote(pay,axfer,byte[],uint64,bool)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    vote: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.vote(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editVote(pay,axfer,byte[32],bool)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    editVote: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.editVote(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedReact(pay,axfer,appl,byte[],uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedReact: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.gatedReact(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `react(pay,axfer,byte[],uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    react: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.react(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `deleteReaction(byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteReaction: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.deleteReaction(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `setPostModeration(byte[32],bool,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setPostModeration: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.setPostModeration(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `initMeta(pay,address,bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.initMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `createPayWall(pay,((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    createPayWall: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.createPayWall(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.updateMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateFollowerMeta(address,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateFollowerMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.updateFollowerMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `registerRefType(pay,string,byte[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    registerRefType: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.registerRefType(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getSocialImpactInputs: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getSocialImpactInputs(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getMetaExists(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getMetaExists: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getMetaExists(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getMeta(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getPostExists(byte[32])bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getPostExists: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getPostExists(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getPost: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getPost(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getVote(address,byte[32])(uint64,bool)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getVote: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getVote(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getVotes((address,byte[32])[])(uint64,bool)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getVotes: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getVotes(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getReactionExists(byte[32],uint64)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getReactionExists: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.getReactionExists(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    payWallMbr: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.payWallMbr(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    checkTipMbrRequirements: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.checkTipMbrRequirements(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AkitaSocialParamsFactory.opUp(params));
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
       * Updates an existing instance of the AkitaSocial smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(AkitaSocialParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocial smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `init()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    init: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.init(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    post: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.post(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editPost(pay,axfer,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    editPost: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.editPost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedReply: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.gatedReply(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    reply: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.reply(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEditReply: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.gatedEditReply(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editReply(pay,axfer,byte[36],byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    editReply: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.editReply(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `vote(pay,axfer,byte[],uint64,bool)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    vote: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.vote(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `editVote(pay,axfer,byte[32],bool)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    editVote: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.editVote(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `gatedReact(pay,axfer,appl,byte[],uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedReact: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.gatedReact(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `react(pay,axfer,byte[],uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    react: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.react(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `deleteReaction(byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteReaction: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.deleteReaction(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `setPostModeration(byte[32],bool,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setPostModeration: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.setPostModeration(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `initMeta(pay,address,bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.initMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `createPayWall(pay,((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    createPayWall: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.createPayWall(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.updateMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateFollowerMeta(address,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateFollowerMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.updateFollowerMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `registerRefType(pay,string,byte[])uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    registerRefType: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.registerRefType(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getSocialImpactInputs: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getSocialImpactInputs(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getMetaExists(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getMetaExists: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getMetaExists(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getPostExists(byte[32])bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getPostExists: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getPostExists(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getPost: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getPost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getVote(address,byte[32])(uint64,bool)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getVote: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getVote(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getVotes((address,byte[32])[])(uint64,bool)[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getVotes: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getVotes(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `getReactionExists(byte[32],uint64)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getReactionExists: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.getReactionExists(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.mbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    payWallMbr: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.payWallMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    checkTipMbrRequirements: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.checkTipMbrRequirements(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocial smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AkitaSocialParamsFactory.opUp(params));
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
    return new _AkitaSocialClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getSocialImpactInputs(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getSocialImpactInputs(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getMetaExists(address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getMetaExists(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getMetaExists(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getMeta(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getMeta(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getPostExists(byte[32])bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getPostExists(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getPostExists(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getPost(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getPost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getVote(address,byte[32])(uint64,bool)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getVote(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getVote(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getVotes((address,byte[32])[])(uint64,bool)[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getVotes(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getVotes(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocial smart contract using the `getReactionExists(byte[32],uint64)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getReactionExists(params) {
    const result = await this.appClient.send.call(AkitaSocialParamsFactory.getReactionExists(params));
    return result.return;
  }
  /**
   * Methods to access state for the current AkitaSocial app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current AkitaSocial app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          payWallId: result.payWallId,
          refTypeCounter: result.refTypeCounter,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the payWallId key in global state
       */
      payWallId: async () => {
        return await this.appClient.state.global.getValue("payWallId");
      },
      /**
       * Get the current value of the refTypeCounter key in global state
       */
      refTypeCounter: async () => {
        return await this.appClient.state.global.getValue("refTypeCounter");
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
     * Methods to access box state for the current AkitaSocial app
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
       * Get values from the posts map in box state
       */
      posts: {
        /**
         * Get all current values of the posts map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("posts");
        },
        /**
         * Get a current value of the posts map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("posts", key);
        }
      },
      /**
       * Get values from the paywall map in box state
       */
      paywall: {
        /**
         * Get all current values of the paywall map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("paywall");
        },
        /**
         * Get a current value of the paywall map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("paywall", key);
        }
      },
      /**
       * Get values from the votes map in box state
       */
      votes: {
        /**
         * Get all current values of the votes map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("votes");
        },
        /**
         * Get a current value of the votes map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("votes", key);
        }
      },
      /**
       * Get values from the votelist map in box state
       */
      votelist: {
        /**
         * Get all current values of the votelist map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("votelist");
        },
        /**
         * Get a current value of the votelist map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("votelist", key);
        }
      },
      /**
       * Get values from the reactions map in box state
       */
      reactions: {
        /**
         * Get all current values of the reactions map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("reactions");
        },
        /**
         * Get a current value of the reactions map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("reactions", key);
        }
      },
      /**
       * Get values from the reactionlist map in box state
       */
      reactionlist: {
        /**
         * Get all current values of the reactionlist map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("reactionlist");
        },
        /**
         * Get a current value of the reactionlist map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("reactionlist", key);
        }
      },
      /**
       * Get values from the meta map in box state
       */
      meta: {
        /**
         * Get all current values of the meta map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("meta");
        },
        /**
         * Get a current value of the meta map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("meta", key);
        }
      },
      /**
       * Get values from the refTypes map in box state
       */
      refTypes: {
        /**
         * Get all current values of the refTypes map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("refTypes");
        },
        /**
         * Get a current value of the refTypes map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("refTypes", key);
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
       * Add a init()void method call against the AkitaSocial contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        return this;
      },
      /**
       * Add a post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void method call against the AkitaSocial contract
       */
      post(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.post(params)));
        return this;
      },
      /**
       * Add a editPost(pay,axfer,byte[36],byte[32],uint64)void method call against the AkitaSocial contract
       */
      editPost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editPost(params)));
        return this;
      },
      /**
       * Add a gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void method call against the AkitaSocial contract
       */
      gatedReply(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedReply(params)));
        return this;
      },
      /**
       * Add a reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void method call against the AkitaSocial contract
       */
      reply(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.reply(params)));
        return this;
      },
      /**
       * Add a gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void method call against the AkitaSocial contract
       */
      gatedEditReply(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEditReply(params)));
        return this;
      },
      /**
       * Add a editReply(pay,axfer,byte[36],byte[32],uint64)void method call against the AkitaSocial contract
       */
      editReply(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editReply(params)));
        return this;
      },
      /**
       * Add a vote(pay,axfer,byte[],uint64,bool)void method call against the AkitaSocial contract
       */
      vote(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.vote(params)));
        return this;
      },
      /**
       * Add a editVote(pay,axfer,byte[32],bool)void method call against the AkitaSocial contract
       */
      editVote(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editVote(params)));
        return this;
      },
      /**
       * Add a gatedReact(pay,axfer,appl,byte[],uint64,uint64)void method call against the AkitaSocial contract
       */
      gatedReact(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedReact(params)));
        return this;
      },
      /**
       * Add a react(pay,axfer,byte[],uint64,uint64)void method call against the AkitaSocial contract
       */
      react(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.react(params)));
        return this;
      },
      /**
       * Add a deleteReaction(byte[32],uint64)void method call against the AkitaSocial contract
       */
      deleteReaction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteReaction(params)));
        return this;
      },
      /**
       * Add a setPostModeration(byte[32],bool,uint64)void method call against the AkitaSocial contract
       */
      setPostModeration(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setPostModeration(params)));
        return this;
      },
      /**
       * Add a initMeta(pay,address,bool,uint64,uint64,uint64)uint64 method call against the AkitaSocial contract
       */
      initMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initMeta(params)));
        return this;
      },
      /**
       * Add a createPayWall(pay,((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64 method call against the AkitaSocial contract
       */
      createPayWall(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.createPayWall(params)));
        return this;
      },
      /**
       * Add a updateMeta(uint64,uint64,uint64,uint64,uint64,uint64)void method call against the AkitaSocial contract
       */
      updateMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateMeta(params)));
        return this;
      },
      /**
       * Add a updateFollowerMeta(address,uint64,uint64)void method call against the AkitaSocial contract
       */
      updateFollowerMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateFollowerMeta(params)));
        return this;
      },
      /**
       * Add a registerRefType(pay,string,byte[])uint64 method call against the AkitaSocial contract
       */
      registerRefType(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.registerRefType(params)));
        return this;
      },
      /**
       * Add a getSocialImpactInputs(address)(bool,uint64,uint64,uint64,bool) method call against the AkitaSocial contract
       */
      getSocialImpactInputs(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSocialImpactInputs(params)));
        return this;
      },
      /**
       * Add a getMetaExists(address)bool method call against the AkitaSocial contract
       */
      getMetaExists(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getMetaExists(params)));
        return this;
      },
      /**
       * Add a getMeta(address)(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64) method call against the AkitaSocial contract
       */
      getMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getMeta(params)));
        return this;
      },
      /**
       * Add a getPostExists(byte[32])bool method call against the AkitaSocial contract
       */
      getPostExists(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getPostExists(params)));
        return this;
      },
      /**
       * Add a getPost(byte[32])(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[]) method call against the AkitaSocial contract
       */
      getPost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getPost(params)));
        return this;
      },
      /**
       * Add a getVote(address,byte[32])(uint64,bool) method call against the AkitaSocial contract
       */
      getVote(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getVote(params)));
        return this;
      },
      /**
       * Add a getVotes((address,byte[32])[])(uint64,bool)[] method call against the AkitaSocial contract
       */
      getVotes(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getVotes(params)));
        return this;
      },
      /**
       * Add a getReactionExists(byte[32],uint64)bool method call against the AkitaSocial contract
       */
      getReactionExists(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getReactionExists(params)));
        return this;
      },
      /**
       * Add a mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the AkitaSocial contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        return this;
      },
      /**
       * Add a payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64 method call against the AkitaSocial contract
       */
      payWallMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.payWallMbr(params)));
        return this;
      },
      /**
       * Add a checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64) method call against the AkitaSocial contract
       */
      checkTipMbrRequirements(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.checkTipMbrRequirements(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the AkitaSocial contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the AkitaSocial contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the AkitaSocial contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
       * Add a clear state call to the AkitaSocial contract
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

// src/generated/AkitaSocialGraphClient.ts



var APP_SPEC2 = { "name": "AkitaSocialGraph", "structs": { "AkitaSocialMBRData": [{ "name": "follows", "type": "uint64" }, { "name": "blocks", "type": "uint64" }, { "name": "posts", "type": "uint64" }, { "name": "votes", "type": "uint64" }, { "name": "votelist", "type": "uint64" }, { "name": "reactions", "type": "uint64" }, { "name": "reactionlist", "type": "uint64" }, { "name": "meta", "type": "uint64" }, { "name": "moderators", "type": "uint64" }, { "name": "banned", "type": "uint64" }, { "name": "actions", "type": "uint64" }, { "name": "refTypes", "type": "uint64" }], "BlockListKey": [{ "name": "user", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "FollowsKey": [{ "name": "user", "type": "byte[16]" }, { "name": "follower", "type": "byte[16]" }], "ViewPayWallValue": [{ "name": "userPayInfo", "type": "(uint8,uint64,uint64)[]" }, { "name": "agentPayInfo", "type": "(uint8,uint64,uint64)[]" }], "tipMBRInfo": [{ "name": "type", "type": "uint8" }, { "name": "arc58", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "akitaDao", "desc": "The Akita DAO app ID" }, { "type": "string", "name": "version", "desc": "The version string for this contract" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "desc": "Create method to initialize the contract with the DAO reference", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedFollow", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "follow", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unfollow", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "user" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFollowing", "args": [{ "type": "address", "name": "follower" }, { "type": "address", "name": "user" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getFollowIndex", "args": [{ "type": "address", "name": "follower" }, { "type": "address", "name": "user" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "byte[]", "name": "ref" }, { "type": "string", "name": "refTypeName" }, { "type": "byte[]", "name": "refTypeSchema" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "AkitaSocialMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "payWallMbr", "args": [{ "type": "((uint8,uint64,uint64)[],(uint8,uint64,uint64)[])", "struct": "ViewPayWallValue", "name": "paywall" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkTipMbrRequirements", "args": [{ "type": "uint64", "name": "akitaDAO" }, { "type": "address", "name": "creator" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(uint8,uint64)", "struct": "tipMBRInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "follows": { "keyType": "FollowsKey", "valueType": "uint64", "desc": "Who follows who - key is {user, follower}, value is the follow index", "prefix": "Zg==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "All the blocks on the network", "prefix": "Yg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [899], "errorMessage": "Box must have value" }, { "pc": [1176, 1374, 1485], "errorMessage": "Bytes has valid prefix" }, { "pc": [1662], "errorMessage": "ERR:AFLW" }, { "pc": [1630], "errorMessage": "ERR:AUTO" }, { "pc": [292, 377, 716, 1557], "errorMessage": "ERR:BAND" }, { "pc": [1586], "errorMessage": "ERR:BLKD" }, { "pc": [574], "errorMessage": "ERR:FGTE" }, { "pc": [657], "errorMessage": "ERR:HGTE" }, { "pc": [341, 604, 687], "errorMessage": "ERR:IPAY" }, { "pc": [1280], "errorMessage": "ERR:IUPG" }, { "pc": [1251, 1318], "errorMessage": "ERR:NDAO" }, { "pc": [747], "errorMessage": "ERR:NFLW" }, { "pc": [312], "errorMessage": "ERR:SBLK" }, { "pc": [1606], "errorMessage": "ERR:SFLW" }, { "pc": [409], "errorMessage": "ERR:UNBK" }, { "pc": [1396, 1407, 1423, 1434], "errorMessage": "Length must be 16" }, { "pc": [1243, 1310], "errorMessage": "application exists" }, { "pc": [482, 1236, 1255, 1303, 1331, 1443, 1499], "errorMessage": "check GlobalState exists" }, { "pc": [243, 913, 929, 945, 987, 1011, 1029, 1220], "errorMessage": "invalid array length header" }, { "pc": [250, 920, 936, 952, 1227], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [281, 366, 471, 636, 705, 802, 810, 841, 849, 881, 889, 1064], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [236, 1054, 1073, 1296], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1181, 1379], "errorMessage": "invalid number of bytes for bool" }, { "pc": [1491], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::MetaValue" }, { "pc": [1024], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::ViewPayWallValue" }, { "pc": [978], "errorMessage": "invalid tail pointer at index 0 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1002], "errorMessage": "invalid tail pointer at index 1 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [973, 997], "errorMessage": "invalid tuple encoding" }, { "pc": [460], "errorMessage": "transaction type is appl" }, { "pc": [273, 448, 627], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDMyIDIKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAiIiAiRVJSOkJBTkQiICJiIiAiZiIgIkVSUjpJUEFZIiAic2FsIiAidmVyc2lvbiIgInBhbCIgIndhbGxldCIgIkVSUjpOREFPIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxHcmFwaCBleHRlbmRzIGNsYXNzZXMoQmFzZVNvY2lhbCwgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsR3JhcGggZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjEKICAgIHB1c2hieXRlc3MgMHhiNTljOGE1NCAweGFlZWJiMzc4IDB4ODY2NzU0OTQgMHg0YjZmOTA3ZiAweDE2MWIzYTdhIDB4NDMwMzY2OGUgMHhlYjYyZjUwOCAweDA5ODM4MGE0IDB4MTQzMjRmYjcgMHhhMTM0YTI3OCAweDM0NDE3NWYwIDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImJsb2NrKHBheSxhZGRyZXNzKXZvaWQiLCBtZXRob2QgInVuYmxvY2soYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZEZvbGxvdyhwYXksYXBwbCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImZvbGxvdyhwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1bmZvbGxvdyhhZGRyZXNzKXZvaWQiLCBtZXRob2QgImlzQmxvY2tlZChhZGRyZXNzLGFkZHJlc3MpYm9vbCIsIG1ldGhvZCAiaXNGb2xsb3dpbmcoYWRkcmVzcyxhZGRyZXNzKWJvb2wiLCBtZXRob2QgImdldEZvbGxvd0luZGV4KGFkZHJlc3MsYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgIm1icihieXRlW10sc3RyaW5nLGJ5dGVbXSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJwYXlXYWxsTWJyKCgodWludDgsdWludDY0LHVpbnQ2NClbXSwodWludDgsdWludDY0LHVpbnQ2NClbXSkpdWludDY0IiwgbWV0aG9kICJjaGVja1RpcE1iclJlcXVpcmVtZW50cyh1aW50NjQsYWRkcmVzcyx1aW50NjQpKHVpbnQ4LHVpbnQ2NCkiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggYmxvY2sgdW5ibG9jayBnYXRlZEZvbGxvdyBmb2xsb3cgdW5mb2xsb3cgaXNCbG9ja2VkIGlzRm9sbG93aW5nIGdldEZvbGxvd0luZGV4IG1iciBwYXlXYWxsTWJyIGNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzIHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxOQogICAgZXJyCgptYWluX29wVXBfcm91dGVAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MQogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsR3JhcGggZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweDZmOTgxN2Y2IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURhbwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjMKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmJsb2NrW3JvdXRpbmddKCkgLT4gdm9pZDoKYmxvY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OTUKICAgIC8vIGJsb2NrKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzQmFubmVkKFR4bi5zZW5kZXIpLCBFUlJfQkFOTkVEKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBpc0Jhbm5lZAogICAgYnogYmxvY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpCQU5EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJBTkQKCmJsb2NrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjk3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciAhPT0gYWRkcmVzcywgRVJSX1NFTEZfQkxPQ0spCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgIT0KICAgIGJueiBibG9ja19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6U0JMSyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTQkxLCgpibG9ja19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMDAtMTA2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICBkaWcgMQogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEwMwogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMDAtMTA2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTA0CiAgICAvLyBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgcHVzaGludCA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEwMC0xMDYKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjk5LTEwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaCgKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBibG9ja19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKYmxvY2tfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTEwCiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmJsayhUeG4uc2VuZGVyLCBhZGRyZXNzKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDEKICAgIGNhbGxzdWIgYmxrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjkKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDQgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTEKICAgIC8vIHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuY3JlYXRlKCkKICAgIGludGNfMCAvLyAwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo5NQogICAgLy8gYmxvY2sobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhZGRyZXNzOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLnVuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgp1bmJsb2NrOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTQKICAgIC8vIHVuYmxvY2soYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTE1CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCYW5uZWQoVHhuLnNlbmRlciksIEVSUl9CQU5ORUQpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGlzQmFubmVkCiAgICBieiB1bmJsb2NrX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6QkFORCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCQU5ECgp1bmJsb2NrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjExNwogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5ibGsoVHhuLnNlbmRlciwgYWRkcmVzcykKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxCiAgICBjYWxsc3ViIGJsawogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjI5CiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyA0IC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjExOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzLCBFUlJfVVNFUl9OT1RfQkxPQ0tFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuYmxvY2tfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOlVOQksiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VU5CSwoKdW5ibG9ja19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTkKICAgIC8vIHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZGVsZXRlKCkKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMjEtMTI2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEyMwogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTI0CiAgICAvLyBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgcHVzaGludCA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMjEtMTI1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTIxLTEyNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmJsb2NrcwogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTE0CiAgICAvLyB1bmJsb2NrKGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGguZ2F0ZWRGb2xsb3dbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEZvbGxvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMjktMTMzCiAgICAvLyBnYXRlZEZvbGxvdygKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYWRkcmVzczogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzNAogICAgLy8gY29uc3QgeyBmb2xsb3dHYXRlSUQgfSA9IHRoaXMuZ2V0TWV0YShhZGRyZXNzKQogICAgY2FsbHN1YiBnZXRNZXRhCiAgICBleHRyYWN0IDUwIDgKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMzUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgZm9sbG93R2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCBmb2xsb3dHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHN3YXAKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHN3YXAKICAgIHB1c2hieXRlcyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBnYXRlZEZvbGxvd19ib29sX2ZhbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNAogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZGlnIDMKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZWRGb2xsb3dfYm9vbF9mYWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzUKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZGlnIDMKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlZEZvbGxvd19ib29sX2ZhbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBkaWcgMwogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVkRm9sbG93X2Jvb2xfZmFsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGRpZyAzCiAgICBpbnRjXzEgLy8gMQogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlZEZvbGxvd19ib29sX2ZhbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzOAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZGlnIDMKICAgIGludGNfMyAvLyAyCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVkRm9sbG93X2Jvb2xfZmFsc2VAMTMKICAgIGludGNfMSAvLyAxCgpnYXRlZEZvbGxvd19ib29sX21lcmdlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCBmb2xsb3dHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBibnogZ2F0ZWRGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTM3CiAgICAvLyBjb25zdCB7IGZvbGxvd3MgfSA9IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMzktMTQ1CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZvbGxvd3MKICAgIC8vICAgfQogICAgLy8gKSwKICAgIGRpZyA1CiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTQyCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzOS0xNDUKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZm9sbG93cwogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMzgtMTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBmb2xsb3dzCiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogZ2F0ZWRGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDYgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmdhdGVkRm9sbG93X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE0OQogICAgLy8gdGhpcy5jcmVhdGVGb2xsb3coVHhuLnNlbmRlciwgYWRkcmVzcykKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBjYWxsc3ViIGNyZWF0ZUZvbGxvdwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEyOS0xMzMKICAgIC8vIGdhdGVkRm9sbG93KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBhZGRyZXNzOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdhdGVkRm9sbG93X2Jvb2xfZmFsc2VAMTM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBnYXRlZEZvbGxvd19ib29sX21lcmdlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmZvbGxvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmZvbGxvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNTIKICAgIC8vIGZvbGxvdyhtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTUzCiAgICAvLyBjb25zdCB7IGZvbGxvd0dhdGVJRCB9ID0gdGhpcy5nZXRNZXRhKGFkZHJlc3MpCiAgICBjYWxsc3ViIGdldE1ldGEKICAgIHB1c2hpbnQgNTAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTU0CiAgICAvLyBsb2dnZWRBc3NlcnQoZm9sbG93R2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiBmb2xsb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkhHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEdURQoKZm9sbG93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE1NgogICAgLy8gY29uc3QgeyBmb2xsb3dzIH0gPSB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTU4LTE2NAogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmb2xsb3dzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICBkaWcgMgogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE2MQogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNTgtMTY0CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZvbGxvd3MKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgMgogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTU3LTE2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaCgKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogZm9sbG93cwogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IGZvbGxvd19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKZm9sbG93X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE2OAogICAgLy8gdGhpcy5jcmVhdGVGb2xsb3coVHhuLnNlbmRlciwgYWRkcmVzcykKICAgIHR4biBTZW5kZXIKICAgIGRpZyAxCiAgICBjYWxsc3ViIGNyZWF0ZUZvbGxvdwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE1MgogICAgLy8gZm9sbG93KG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC51bmZvbGxvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVuZm9sbG93OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNzEKICAgIC8vIHVuZm9sbG93KGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzQmFubmVkKFR4bi5zZW5kZXIpLCBFUlJfQkFOTkVEKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBpc0Jhbm5lZAogICAgYnogdW5mb2xsb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpCQU5EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJBTkQKCnVuZm9sbG93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3NAogICAgLy8gY29uc3QgZm9sbG93c0tleSA9IHRoaXMuZmx3KGFkZHJlc3MsIFR4bi5zZW5kZXIpCiAgICBkdXAKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZmx3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjcKICAgIC8vIGZvbGxvd3MgPSBCb3hNYXA8Rm9sbG93c0tleSwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhGb2xsb3dzIH0pCiAgICBieXRlYyA1IC8vICJmIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZm9sbG93cyhmb2xsb3dzS2V5KS5leGlzdHMsIEVSUl9OT1RfRk9MTE9XSU5HKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdW5mb2xsb3dfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOk5GTFciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkZMVwoKdW5mb2xsb3dfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTc4CiAgICAvLyBjb25zdCB7IGZvbGxvd2VyQ291bnQsIGZvbGxvd2VySW5kZXggfSA9IHRoaXMuZ2V0TWV0YShhZGRyZXNzKQogICAgZHVwbiAyCiAgICBjYWxsc3ViIGdldE1ldGEKICAgIGR1cAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTgwCiAgICAvLyB0aGlzLnVwZGF0ZUZvbGxvd2VyTWV0YShhZGRyZXNzLCBmb2xsb3dlckluZGV4LCBmb2xsb3dlckNvdW50IC0gMSkKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBjYWxsc3ViIHVwZGF0ZUZvbGxvd2VyTWV0YQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE4MQogICAgLy8gdGhpcy5mb2xsb3dzKGZvbGxvd3NLZXkpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTgzLTE4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmZvbGxvd3MKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTg1CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxODYKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5mb2xsb3dzCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE4My0xODcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5mb2xsb3dzCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTgzLTE4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmZvbGxvd3MKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3MQogICAgLy8gdW5mb2xsb3coYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5pc0Jsb2NrZWRbcm91dGluZ10oKSAtPiB2b2lkOgppc0Jsb2NrZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTkxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTkzCiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmJsayh1c2VyLCBibG9ja2VkKQogICAgY2FsbHN1YiBibGsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyOQogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNCAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE5NAogICAgLy8gcmV0dXJuIHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxOTEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5pc0ZvbGxvd2luZ1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzRm9sbG93aW5nOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE5NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE5OQogICAgLy8gY29uc3QgZm9sbG93c0tleSA9IHRoaXMuZmx3KHVzZXIsIGZvbGxvd2VyKQogICAgc3dhcAogICAgY2FsbHN1YiBmbHcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyNwogICAgLy8gZm9sbG93cyA9IEJveE1hcDxGb2xsb3dzS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEZvbGxvd3MgfSkKICAgIGJ5dGVjIDUgLy8gImYiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyMDAKICAgIC8vIHJldHVybiB0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxOTcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5nZXRGb2xsb3dJbmRleFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEZvbGxvd0luZGV4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjIwMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjIwNQogICAgLy8gY29uc3QgZm9sbG93c0tleSA9IHRoaXMuZmx3KHVzZXIsIGZvbGxvd2VyKQogICAgc3dhcAogICAgY2FsbHN1YiBmbHcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyNwogICAgLy8gZm9sbG93cyA9IEJveE1hcDxGb2xsb3dzS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEZvbGxvd3MgfSkKICAgIGJ5dGVjIDUgLy8gImYiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyMDYKICAgIC8vIHJldHVybiB0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjAzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE1CiAgICAvLyBtYnIocmVmOiBieXRlcywgcmVmVHlwZU5hbWU6IHN0cmluZywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpOiBBa2l0YVNvY2lhbE1CUkRhdGEgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLnBheVdhbGxNYnJbcm91dGluZ10oKSAtPiB2b2lkOgpwYXlXYWxsTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM0CiAgICAvLyBwYXlXYWxsTWJyKHBheXdhbGw6IFZpZXdQYXlXYWxsVmFsdWUpOiB1aW50NjQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pLChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pKQogICAgZGlnIDIKICAgIGRpZyAxCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIHB1c2hpbnQgNgogICAgKwogICAgZGlnIDMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICgobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSwobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSkKICAgIGRpZyA0CiAgICBkaWcgMQogICAgZGlnIDUKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICB1bmNvdmVyIDMKICAgICsKICAgIHVuY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3NvY2lhbC90eXBlcy50czo6Vmlld1BheVdhbGxWYWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM3CiAgICAvLyBQYXlXYWxsUGF5T3B0aW9uU2l6ZSAqIChwYXl3YWxsLmFnZW50UGF5SW5mby5sZW5ndGggKyBwYXl3YWxsLnVzZXJQYXlJbmZvLmxlbmd0aCkKICAgIGNvdmVyIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzYtMzgKICAgIC8vIEJveENvc3RQZXJCeXRlICogKAogICAgLy8gICBQYXlXYWxsUGF5T3B0aW9uU2l6ZSAqIChwYXl3YWxsLmFnZW50UGF5SW5mby5sZW5ndGggKyBwYXl3YWxsLnVzZXJQYXlJbmZvLmxlbmd0aCkKICAgIC8vICkKICAgIHB1c2hpbnQgNjgwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM1CiAgICAvLyByZXR1cm4gTWluUGF5V2FsbE1CUiArICgKICAgIHB1c2hpbnQgNTIwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM1LTM5CiAgICAvLyByZXR1cm4gTWluUGF5V2FsbE1CUiArICgKICAgIC8vICAgQm94Q29zdFBlckJ5dGUgKiAoCiAgICAvLyAgICAgUGF5V2FsbFBheU9wdGlvblNpemUgKiAocGF5d2FsbC5hZ2VudFBheUluZm8ubGVuZ3RoICsgcGF5d2FsbC51c2VyUGF5SW5mby5sZW5ndGgpCiAgICAvLyAgICkKICAgIC8vICkKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czozNAogICAgLy8gcGF5V2FsbE1icihwYXl3YWxsOiBWaWV3UGF5V2FsbFZhbHVlKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNbcm91dGluZ10oKSAtPiB2b2lkOgpjaGVja1RpcE1iclJlcXVpcmVtZW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NQogICAgLy8gY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjcmVhdG9yOiBBY2NvdW50LCB3YWxsZXQ6IEFwcGxpY2F0aW9uKTogdGlwTUJSSW5mbyB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NTYKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyhha2l0YURBTykuYWt0YSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjU4CiAgICAvLyBpZiAoIWNyZWF0b3IuaXNPcHRlZEluKGFrdGEpICYmIHdhbGxldC5pZCAhPT0gMCkgewogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgYnogY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDMtNTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KCkKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkaWcgMQogICAgYnl0ZWMgOSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQ2CiAgICAvLyBnZXRQbHVnaW5BcHBMaXN0KGFraXRhREFPKS5vcHRpbiwKICAgIGV4dHJhY3QgMCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDcKICAgIC8vIENhbGxlclR5cGVHbG9iYWwsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQ4CiAgICAvLyBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0My01MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgbWV0aG9kU2VsZWN0b3I8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oKQogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YjM2MjM0YTUgLy8gbWV0aG9kICJhcmM1OF9jYW5DYWxsKHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVs0XSlib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQ5CiAgICAvLyAnJywKICAgIHB1c2hieXRlcyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NTAKICAgIC8vIG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KCkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQzLTUyCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NhbkNhbGw+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBnZXRQbHVnaW5BcHBMaXN0KGFraXRhREFPKS5vcHRpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgICAnJywKICAgIC8vICAgICBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPigpCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjYwCiAgICAvLyBpZiAoY2FuQ2FsbEFyYzU4T3B0SW4pIHsKICAgIGJ6IGNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjYzCiAgICAvLyBhcmM1ODogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MS02NAogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgdHlwZTogVGlwU2VuZFR5cGVBUkM1OCwKICAgIC8vICAgYXJjNTg6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjYyCiAgICAvLyB0eXBlOiBUaXBTZW5kVHlwZUFSQzU4LAogICAgcHVzaGJ5dGVzIDB4MTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MS02NAogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgdHlwZTogVGlwU2VuZFR5cGVBUkM1OCwKICAgIC8vICAgYXJjNTg6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfQogICAgc3dhcAogICAgY29uY2F0CgpjaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50c0A3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjU1CiAgICAvLyBjaGVja1RpcE1iclJlcXVpcmVtZW50cyhha2l0YURBTzogQXBwbGljYXRpb24sIGNyZWF0b3I6IEFjY291bnQsIHdhbGxldDogQXBwbGljYXRpb24pOiB0aXBNQlJJbmZvIHsKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2OC03MQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgdHlwZTogVGlwU2VuZFR5cGVEaXJlY3QsCiAgICAvLyAgIGFyYzU4OiAwCiAgICAvLyB9CiAgICBwdXNoYnl0ZXMgMHgwYTAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NQogICAgLy8gY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjcmVhdG9yOiBBY2NvdW50LCB3YWxsZXQ6IEFwcGxpY2F0aW9uKTogdGlwTUJSSW5mbyB7CiAgICBiIGNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzQDcKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDExIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyA5IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTEgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGguaXNCYW5uZWQoYWNjb3VudDogYnl0ZXMpIC0+IHVpbnQ2NDoKaXNCYW5uZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MzEKICAgIC8vIHByaXZhdGUgaXNCYW5uZWQoYWNjb3VudDogQWNjb3VudCk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MzIKICAgIC8vIGNvbnN0IHsgbW9kZXJhdGlvbiB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MzIKICAgIC8vIGNvbnN0IHsgbW9kZXJhdGlvbiB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgNyAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjMyCiAgICAvLyBjb25zdCB7IG1vZGVyYXRpb24gfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czozMy0zNgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsTW9kZXJhdGlvbi5wcm90b3R5cGUuaXNCYW5uZWQ+KHsKICAgIC8vICAgYXBwSWQ6IG1vZGVyYXRpb24sCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4ODQyNjljNzggLy8gbWV0aG9kICJpc0Jhbm5lZChhZGRyZXNzKWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5ibGsodXNlckFkZHJlc3M6IGJ5dGVzLCBibG9ja2VkQWRkcmVzczogYnl0ZXMpIC0+IGJ5dGVzOgpibGs6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NDAKICAgIC8vIHByaXZhdGUgYmxrKHVzZXJBZGRyZXNzOiBBY2NvdW50LCBibG9ja2VkQWRkcmVzczogQWNjb3VudCk6IEJsb2NrTGlzdEtleSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo0MQogICAgLy8gY29uc3QgdXNlciA9IHVzZXJBZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KQogICAgZnJhbWVfZGlnIC0yCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo0MgogICAgLy8gY29uc3QgYmxvY2tlZCA9IGJsb2NrZWRBZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KQogICAgZnJhbWVfZGlnIC0xCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo0MwogICAgLy8gcmV0dXJuIHsgdXNlciwgYmxvY2tlZCB9CiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5mbHcodXNlcjogYnl0ZXMsIGZvbGxvd2VyOiBieXRlcykgLT4gYnl0ZXM6CmZsdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo0NwogICAgLy8gcHJpdmF0ZSBmbHcodXNlcjogQWNjb3VudCwgZm9sbG93ZXI6IEFjY291bnQpOiBGb2xsb3dzS2V5IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjQ4CiAgICAvLyBjb25zdCB1c2VyQnl0ZXMgPSB1c2VyLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KQogICAgZnJhbWVfZGlnIC0yCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo0OQogICAgLy8gY29uc3QgZm9sbG93ZXJCeXRlcyA9IGZvbGxvd2VyLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KQogICAgZnJhbWVfZGlnIC0xCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo1MAogICAgLy8gcmV0dXJuIHsgdXNlcjogdXNlckJ5dGVzLCBmb2xsb3dlcjogZm9sbG93ZXJCeXRlcyB9CiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5nZXRNZXRhKGFkZHJlc3M6IGJ5dGVzKSAtPiBieXRlczoKZ2V0TWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo1MwogICAgLy8gcHJpdmF0ZSBnZXRNZXRhKGFkZHJlc3M6IEFjY291bnQpOiBNZXRhVmFsdWUgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NTQKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo1NAogICAgLy8gY29uc3QgeyBzb2NpYWwgfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDcgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo1NAogICAgLy8gY29uc3QgeyBzb2NpYWwgfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NTUtNTgKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbC5wcm90b3R5cGUuZ2V0TWV0YT4oewogICAgLy8gICBhcHBJZDogc29jaWFsLAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDczOWVhNzBiIC8vIG1ldGhvZCAiZ2V0TWV0YShhZGRyZXNzKShib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNzQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvdHlwZXMudHM6Ok1ldGFWYWx1ZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLnVwZGF0ZUZvbGxvd2VyTWV0YShhY2NvdW50OiBieXRlcywgbmV3Rm9sbG93ZXJJbmRleDogdWludDY0LCBuZXdGb2xsb3dlckNvdW50OiB1aW50NjQpIC0+IHZvaWQ6CnVwZGF0ZUZvbGxvd2VyTWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo2MQogICAgLy8gcHJpdmF0ZSB1cGRhdGVGb2xsb3dlck1ldGEoYWNjb3VudDogQWNjb3VudCwgbmV3Rm9sbG93ZXJJbmRleDogdWludDY0LCBuZXdGb2xsb3dlckNvdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjYyCiAgICAvLyBjb25zdCB7IHNvY2lhbCB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NjIKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBieXRlYyA3IC8vICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NjIKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjYzLTY2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbC5wcm90b3R5cGUudXBkYXRlRm9sbG93ZXJNZXRhPih7CiAgICAvLyAgIGFwcElkOiBzb2NpYWwsCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50LCBuZXdGb2xsb3dlckluZGV4LCBuZXdGb2xsb3dlckNvdW50XQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo2NQogICAgLy8gYXJnczogW2FjY291bnQsIG5ld0ZvbGxvd2VySW5kZXgsIG5ld0ZvbGxvd2VyQ291bnRdCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo2My02NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLnVwZGF0ZUZvbGxvd2VyTWV0YT4oewogICAgLy8gICBhcHBJZDogc29jaWFsLAogICAgLy8gICBhcmdzOiBbYWNjb3VudCwgbmV3Rm9sbG93ZXJJbmRleCwgbmV3Rm9sbG93ZXJDb3VudF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHgzMzA2YjMyYSAvLyBtZXRob2QgInVwZGF0ZUZvbGxvd2VyTWV0YShhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGguY3JlYXRlRm9sbG93KHNlbmRlcjogYnl0ZXMsIGFkZHJlc3M6IGJ5dGVzKSAtPiB2b2lkOgpjcmVhdGVGb2xsb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NjkKICAgIC8vIHByaXZhdGUgY3JlYXRlRm9sbG93KHNlbmRlcjogQWNjb3VudCwgYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjcwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCYW5uZWQoc2VuZGVyKSwgRVJSX0JBTk5FRCkKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBpc0Jhbm5lZAogICAgYnogY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlY18zIC8vICJFUlI6QkFORCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCQU5ECgpjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTkzCiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmJsayh1c2VyLCBibG9ja2VkKQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgYmxrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjkKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDQgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxOTQKICAgIC8vIHJldHVybiB0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NzEKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jsb2NrZWQoYWRkcmVzcywgc2VuZGVyKSwgRVJSX0JMT0NLRUQpCiAgICBieiBjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOkJMS0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkxLRAoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjcyCiAgICAvLyBsb2dnZWRBc3NlcnQoc2VuZGVyICE9PSBhZGRyZXNzLCBFUlJfU0VMRl9GT0xMT1cpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJueiBjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOlNGTFciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0ZMVwoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjc1CiAgICAvLyBjb25zdCB7IGF1dG9tYXRlZCB9ID0gdGhpcy5nZXRNZXRhKHNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBnZXRNZXRhCiAgICBwdXNoaW50IDM5MgogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NzYKICAgIC8vIGxvZ2dlZEFzc2VydCghYXV0b21hdGVkLCBFUlJfQVVUT01BVEVEX0FDQ09VTlQpCiAgICBieiBjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDgKICAgIHB1c2hieXRlcyAiRVJSOkFVVE8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVVUTwoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjc5CiAgICAvLyBjb25zdCBmb2xsb3dzS2V5ID0gdGhpcy5mbHcoYWRkcmVzcywgc2VuZGVyKQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgZmx3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjcKICAgIC8vIGZvbGxvd3MgPSBCb3hNYXA8Rm9sbG93c0tleSwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhGb2xsb3dzIH0pCiAgICBieXRlYyA1IC8vICJmIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjgyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZm9sbG93cyhmb2xsb3dzS2V5KS5leGlzdHMsIEVSUl9BTFJFQURZX0ZPTExPV0lORykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEAxMAogICAgcHVzaGJ5dGVzICJFUlI6QUZMVyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBRkxXCgpjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjg1CiAgICAvLyBjb25zdCB7IGZvbGxvd2VyQ291bnQsIGZvbGxvd2VySW5kZXggfSA9IHRoaXMuZ2V0TWV0YShhZGRyZXNzKQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGdldE1ldGEKICAgIGR1cAogICAgcHVzaGludCA0MQogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6ODgKICAgIC8vIHRoaXMuZm9sbG93cyhmb2xsb3dzS2V5KS52YWx1ZSA9IGZvbGxvd2VySW5kZXggKyAxCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZHVwCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjkwCiAgICAvLyB0aGlzLnVwZGF0ZUZvbGxvd2VyTWV0YShhZGRyZXNzLCBmb2xsb3dlckluZGV4ICsgMSwgZm9sbG93ZXJDb3VudCArIDEpCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHVwZGF0ZUZvbGxvd2VyTWV0YQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icihyZWY6IGJ5dGVzLCByZWZUeXBlTmFtZTogYnl0ZXMsIHJlZlR5cGVTY2hlbWE6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNQogICAgLy8gbWJyKHJlZjogYnl0ZXMsIHJlZlR5cGVOYW1lOiBzdHJpbmcsIHJlZlR5cGVTY2hlbWE6IGJ5dGVzKTogQWtpdGFTb2NpYWxNQlJEYXRhIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE5CiAgICAvLyBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIGZyYW1lX2RpZyAtMwogICAgbGVuCiAgICBwdXNoaW50IDQwMAogICAgKgogICAgcHVzaGludCA0NjUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjMwCiAgICAvLyByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICArCiAgICBwdXNoaW50IDQwMAogICAgKgogICAgcHVzaGludCA5MzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwN2JkNDAwMDAwMDAwMDAwMDNkNTQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjIwCiAgICAvLyB2b3RlczogVm90ZXNNQlIsCiAgICBwdXNoaW50IDE5MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjIKICAgIC8vIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgcHVzaGludCAyMjEwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE2LTMxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBmb2xsb3dzOiBGb2xsb3dzTUJSLAogICAgLy8gICBibG9ja3M6IEJsb2Nrc01CUiwKICAgIC8vICAgcG9zdHM6IE1pblBvc3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogcmVmLmxlbmd0aCksCiAgICAvLyAgIHZvdGVzOiBWb3Rlc01CUiwKICAgIC8vICAgdm90ZWxpc3Q6IFZvdGVsaXN0TUJSLAogICAgLy8gICByZWFjdGlvbnM6IFJlYWN0aW9uc01CUiwKICAgIC8vICAgcmVhY3Rpb25saXN0OiBSZWFjdGlvbmxpc3RNQlIsCiAgICAvLyAgIG1ldGE6IE1ldGFNQlIsCiAgICAvLyAgIG1vZGVyYXRvcnM6IE1vZGVyYXRvcnNNQlIsCiAgICAvLyAgIGJhbm5lZDogQmFubmVkTUJSLAogICAgLy8gICBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgLy8gICAvLyBCb3gga2V5OiBwcmVmaXgoMSkgKyB1aW50NjQoOCkgPSA5IGJ5dGVzCiAgICAvLyAgIC8vIEJveCB2YWx1ZTogQVJDLTQgaGVhZGVyKDQpICsgc3RyaW5nIGxlbmd0aCgyKSArIG5hbWUgKyBieXRlcyBsZW5ndGgoMikgKyBzY2hlbWEKICAgIC8vICAgcmVmVHlwZXM6IFJlZlR5cGVzQmFzZU1CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyhyZWZUeXBlTmFtZSkubGVuZ3RoICsgQnl0ZXMocmVmVHlwZVNjaGVtYSkubGVuZ3RoKSkKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjIzCiAgICAvLyByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIHB1c2hpbnQgMTg5MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjQKICAgIC8vIG1ldGE6IE1ldGFNQlIsCiAgICBwdXNoaW50IDQ1MzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoyNwogICAgLy8gYWN0aW9uczogQWN0aW9uc01CUiwKICAgIHB1c2hpbnQgMjk3MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAEgAiYMCWFraXRhX2RhbwQVH3x1AAhFUlI6QkFORAFiAWYIRVJSOklQQVkDc2FsB3ZlcnNpb24DcGFsBndhbGxldAhFUlI6TkRBT4AE6pGA3TYaAI4BAHwxGRREMRhBAGWCDQS1nIpUBK7rs3gEhmdUlARLb5B/BBYbOnoEQwNmjgTrYvUIBAmDgKQEFDJPtwShNKJ4BDRBdfAEM+kslASFTe3gNhoAjg0AQQCfAPABowHyAlQCewKjAsUC/gNPBEEAAQAjQ4AEb5gX9jYaAI4BAA0AMRmBBBIxGBBEQgPbNhoBSRWBCBJEFzYaAkkiWSUISwEVEkRXAgAoTwJnJwhMZyNDMRYjCUk4ECMSRDYaAUkVJBJEMQCIBA5BAAMrsAAxAEsBE0AADIAIRVJSOlNCTEuwAEsBSTgHMgoSTDgIKkcCiAVVgQhbEhBAAAQnBrAAMQBLAYgECicETFAiuUgjQyI2GgFJFSQSRDEAiAO5QQADK7AAMQBLAYgD5icETFBJRQO9RQFAAAyACEVSUjpVTkJLsABLAbxIsTEAKkcCiAT4gQhbsgiyByOyECKyAbMjQzEWJQlJOBAjEkQxFiMJRwI4EIEGEkQ2GgFJTgJJFSQSRIgDwlcyCEwiKGVEMQBOAkw4GEyAA2FhbGVIgShbEkEAbUsDOBlAAGZLAzgbgQQSQQBcSwMiwhqABEOSJlUSQQBNSwMjwhpLARJBAEJLAyXCGksCEkEANyNAAAyACEVSUjpGR1RFsAAqRwKIBFoiW0sFSTgHMgoSTDgITwISEEAABCcGsAAxAEsDiAOjI0MiQv/GMRYjCUk4ECMSRDYaAUcCFSQSRIgDHYEyW0EADIAIRVJSOkhHVEWwACpHAogEByJbSwJJOAcyChJMOAhPAhIQQAAEJwawADEASwGIA1AjQyI2GgFJFSQSRDEAiAJmQQADK7AASTEAiAKvJwVMUElFA71FAUAADIAIRVJSOk5GTFewAEcCiAKsSYEpW0yBIVtMIwmIAtZLAbxIsTEAKkcCiAOTIluyCLIHI7IQIrIBsyNDNhoBSRUkEkQ2GgJJFSQSRIgCOScETFC9RQGAAQAiTwJUKUxQsCNDNhoBSRUkEkQ2GgJJFSQSREyIAiwnBUxQvUUBgAEAIk8CVClMULAjQzYaAUkVJBJENhoCSRUkEkRMiAIEJwVMUL5EFxYpTFCwI0M2GgFJIlklCEsBFRJEVwIANhoCSSJZJQhLARUSRFcCADYaA0kiWSUISwEVEkRXAgCIAuApTFCwI0M2GgFJFUsBIllJgQQSREsCSwFLA1IiWYERC4EGCEsDJVlJSwISREsESwFLBVIiWUmBEQslCE8DCE8EEkROA1IiWQiBkDULgdAoCBYpTFCwI0M2GgFJFYEIEkQXSTYaAkkVJBJENhoDSRWBCBJEF04CTIAMYWtpdGFfYXNzZXRzZUgiW3AARQFAAGJJQQBesUsBJwllSFcACCMWMgNLA7IYgASzYjSlshpPArIaTLIashqAAgAAshqABGg147yyGoEGshAisgGztD5JVwQATFcABCkSREkVIxJEIlNBAA4yEBaAARRMUClMULAjQ4AJCgAAAAAAAAAAQv/sNhoBSSJZJQhLARUSRFcCADEAIihlRCcKZUhyCEQSQAAEJwuwACIoZUQnCWVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAJwhLAWcjQzYaAUkVgQgSRBcxACIoZUQnCmVIcghEEkAABCcLsAAoSwFnI0OKAQEiKGVEJwdlSIEYW7GyGIAEhCaceLIai/+yGoEGshAisgGztD5JVwQATFcABCkSREkVIxJEIlOJigIBi/5RABBJFYEQEkSL/1EAEEkVgRASRFCJigIBi/5RABBJFYEQEkSL/1EAEEkVgRASRFCJigEBIihlRCcHZUgiW7GyGIAEc56nC7Iai/+yGoEGshAisgGztD5JVwQATFcABCkSREkVgUoSRImKAwAiKGVEJwdlSCJbsYv+Fov/Fk8CshiABDMGsyqyGov9shpMshqyGoEGshAisgGziYoCACKL/oj/HUEAAyuwAIv/i/6I/0onBExQvUUBQQAMgAhFUlI6QkxLRLAAi/6L/xNAAAyACEVSUjpTRkxXsACL/oj/UYGIA1NBAAyACEVSUjpBVVRPsACL/4v+iP8cJwVMUEmMAL1FAUEADIAIRVJSOkFGTFewAIv/iP8ZSYEpW0yBIVsjCEkWiwBMv0wjCIv/TgKI/zeJigMBi/0VgZADC4Gk6wIIi/4Vi/8VCIGQAwuB1EgITBaAEAAAAAAAAHvUAAAAAAAAPVRMUIHklgEWTEsBUExQgdSsARZQgdSTARZMSwFQgfThAhZQSwFQTFCBhOgBFlBMFlCJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var AkitaSocialGraphParamsFactory = class _AkitaSocialGraphParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,string)void":
            return _AkitaSocialGraphParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the AkitaSocialGraph smart contract using the create(uint64,string)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,string)void",
          args: Array.isArray(params.args) ? params.args : [params.args.akitaDao, params.args.version]
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
            return _AkitaSocialGraphParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the AkitaSocialGraph smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the block(pay,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static block(params) {
    return {
      ...params,
      method: "block(pay,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.address]
    };
  }
  /**
   * Constructs a no op call for the unblock(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unblock(params) {
    return {
      ...params,
      method: "unblock(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the gatedFollow(pay,appl,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedFollow(params) {
    return {
      ...params,
      method: "gatedFollow(pay,appl,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.gateTxn, params.args.address]
    };
  }
  /**
   * Constructs a no op call for the follow(pay,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static follow(params) {
    return {
      ...params,
      method: "follow(pay,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.address]
    };
  }
  /**
   * Constructs a no op call for the unfollow(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unfollow(params) {
    return {
      ...params,
      method: "unfollow(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the isBlocked(address,address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isBlocked(params) {
    return {
      ...params,
      method: "isBlocked(address,address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.user, params.args.blocked]
    };
  }
  /**
   * Constructs a no op call for the isFollowing(address,address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isFollowing(params) {
    return {
      ...params,
      method: "isFollowing(address,address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.follower, params.args.user]
    };
  }
  /**
   * Constructs a no op call for the getFollowIndex(address,address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getFollowIndex(params) {
    return {
      ...params,
      method: "getFollowIndex(address,address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.follower, params.args.user]
    };
  }
  /**
   * Constructs a no op call for the mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.ref, params.args.refTypeName, params.args.refTypeSchema]
    };
  }
  /**
   * Constructs a no op call for the payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static payWallMbr(params) {
    return {
      ...params,
      method: "payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.paywall]
    };
  }
  /**
   * Constructs a no op call for the checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static checkTipMbrRequirements(params) {
    return {
      ...params,
      method: "checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.akitaDao, params.args.creator, params.args.wallet]
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
var AkitaSocialGraphFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `AkitaSocialGraphFactory`
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
    return new AkitaSocialGraphClient(this.appFactory.getAppClientById(params));
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
    return new AkitaSocialGraphClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the AkitaSocialGraph smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? AkitaSocialGraphParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? AkitaSocialGraphParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new AkitaSocialGraphClient(result.appClient) };
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
       * Creates a new instance of the AkitaSocialGraph smart contract using the create(uint64,string)void ABI method.
       *
       * Create method to initialize the contract with the DAO reference
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(AkitaSocialGraphParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the AkitaSocialGraph smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(AkitaSocialGraphParamsFactory.update.update(params));
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
       * Creates a new instance of the AkitaSocialGraph smart contract using the create(uint64,string)void ABI method.
       *
       * Create method to initialize the contract with the DAO reference
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(AkitaSocialGraphParamsFactory.create.create(params));
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
       * Creates a new instance of the AkitaSocialGraph smart contract using an ABI method call using the create(uint64,string)void ABI method.
       *
       * Create method to initialize the contract with the DAO reference
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(AkitaSocialGraphParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new AkitaSocialGraphClient(result.appClient) };
      }
    }
  }}
}, _class3);
var AkitaSocialGraphClient = (_class4 = class _AkitaSocialGraphClient {
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
   * Returns a new `AkitaSocialGraphClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AkitaSocialGraphClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `AkitaSocialGraphClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AkitaSocialGraphClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
       * Updates an existing instance of the AkitaSocialGraph smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(AkitaSocialGraphParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialGraph smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `block(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    block: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.block(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `unblock(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unblock: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.unblock(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `gatedFollow(pay,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedFollow: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.gatedFollow(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `follow(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    follow: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.follow(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `unfollow(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unfollow: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.unfollow(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `isBlocked(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isBlocked: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.isBlocked(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `isFollowing(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isFollowing: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.isFollowing(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `getFollowIndex(address,address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getFollowIndex: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.getFollowIndex(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    payWallMbr: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.payWallMbr(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    checkTipMbrRequirements: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.checkTipMbrRequirements(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(AkitaSocialGraphParamsFactory.opUp(params));
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
       * Updates an existing instance of the AkitaSocialGraph smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(AkitaSocialGraphParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialGraph smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `block(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    block: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.block(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `unblock(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unblock: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.unblock(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `gatedFollow(pay,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedFollow: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.gatedFollow(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `follow(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    follow: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.follow(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `unfollow(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unfollow: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.unfollow(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `isBlocked(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isBlocked: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.isBlocked(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `isFollowing(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isFollowing: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.isFollowing(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `getFollowIndex(address,address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getFollowIndex: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.getFollowIndex(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    payWallMbr: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.payWallMbr(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    checkTipMbrRequirements: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.checkTipMbrRequirements(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AkitaSocialGraphParamsFactory.opUp(params));
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
       * Updates an existing instance of the AkitaSocialGraph smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(AkitaSocialGraphParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialGraph smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `block(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    block: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.block(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `unblock(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unblock: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.unblock(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `gatedFollow(pay,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedFollow: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.gatedFollow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `follow(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    follow: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.follow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `unfollow(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unfollow: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.unfollow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `isBlocked(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isBlocked: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.isBlocked(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `isFollowing(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isFollowing: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.isFollowing(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `getFollowIndex(address,address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getFollowIndex: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.getFollowIndex(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.mbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    payWallMbr: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.payWallMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    checkTipMbrRequirements: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.checkTipMbrRequirements(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialGraph smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.opUp(params));
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
    return new _AkitaSocialGraphClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialGraph smart contract using the `isBlocked(address,address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isBlocked(params) {
    const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.isBlocked(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialGraph smart contract using the `isFollowing(address,address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isFollowing(params) {
    const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.isFollowing(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialGraph smart contract using the `getFollowIndex(address,address)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getFollowIndex(params) {
    const result = await this.appClient.send.call(AkitaSocialGraphParamsFactory.getFollowIndex(params));
    return result.return;
  }
  /**
   * Methods to access state for the current AkitaSocialGraph app
   */
  __init14() {this.state = {
    /**
     * Methods to access global state for the current AkitaSocialGraph app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          version: result.version,
          akitaDao: result.akitaDAO
        };
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
     * Methods to access box state for the current AkitaSocialGraph app
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
       * Get values from the follows map in box state
       */
      follows: {
        /**
         * Get all current values of the follows map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("follows");
        },
        /**
         * Get a current value of the follows map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("follows", key);
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
      }
    }
  }}
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a block(pay,address)void method call against the AkitaSocialGraph contract
       */
      block(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.block(params)));
        return this;
      },
      /**
       * Add a unblock(address)void method call against the AkitaSocialGraph contract
       */
      unblock(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unblock(params)));
        return this;
      },
      /**
       * Add a gatedFollow(pay,appl,address)void method call against the AkitaSocialGraph contract
       */
      gatedFollow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedFollow(params)));
        return this;
      },
      /**
       * Add a follow(pay,address)void method call against the AkitaSocialGraph contract
       */
      follow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.follow(params)));
        return this;
      },
      /**
       * Add a unfollow(address)void method call against the AkitaSocialGraph contract
       */
      unfollow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unfollow(params)));
        return this;
      },
      /**
       * Add a isBlocked(address,address)bool method call against the AkitaSocialGraph contract
       */
      isBlocked(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isBlocked(params)));
        return this;
      },
      /**
       * Add a isFollowing(address,address)bool method call against the AkitaSocialGraph contract
       */
      isFollowing(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isFollowing(params)));
        return this;
      },
      /**
       * Add a getFollowIndex(address,address)uint64 method call against the AkitaSocialGraph contract
       */
      getFollowIndex(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getFollowIndex(params)));
        return this;
      },
      /**
       * Add a mbr(byte[],string,byte[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the AkitaSocialGraph contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        return this;
      },
      /**
       * Add a payWallMbr(((uint8,uint64,uint64)[],(uint8,uint64,uint64)[]))uint64 method call against the AkitaSocialGraph contract
       */
      payWallMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.payWallMbr(params)));
        return this;
      },
      /**
       * Add a checkTipMbrRequirements(uint64,address,uint64)(uint8,uint64) method call against the AkitaSocialGraph contract
       */
      checkTipMbrRequirements(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.checkTipMbrRequirements(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the AkitaSocialGraph contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the AkitaSocialGraph contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
       * Add a clear state call to the AkitaSocialGraph contract
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

// src/generated/AkitaSocialImpactClient.ts



var APP_SPEC3 = { "name": "AkitaSocialImpact", "structs": { "arc4ImpactMetaValue": [{ "name": "subscriptionIndex", "type": "uint64" }, { "name": "nfd", "type": "uint64" }, { "name": "nfdTimeChanged", "type": "uint64" }, { "name": "nfdImpact", "type": "uint64" }, { "name": "akitaNft", "type": "uint64" }], "MetaValue": [{ "name": "walletId", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "lastActive", "type": "uint64" }, { "name": "followerIndex", "type": "uint64" }, { "name": "followerCount", "type": "uint64" }, { "name": "automated", "type": "bool" }, { "name": "followGateId", "type": "uint64" }, { "name": "addressGateId", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "akitaDAO" }, { "type": "string", "name": "version" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cacheMeta", "args": [{ "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "NFDAppID" }, { "type": "uint64", "name": "akitaAssetID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateSubscriptionStateModifier", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "newModifier" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "getUserImpactWithoutSocial", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getUserImpact", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMeta", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64)", "struct": "MetaValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "meta": { "keyType": "address", "valueType": "arc4ImpactMetaValue", "desc": "A map of the meta data for each user", "prefix": "bQ==" }, "subscriptionStateModifier": { "keyType": "uint64", "valueType": "uint64", "desc": "A map of how each akita subscription affects impact calculation", "prefix": "cw==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [560, 689, 770, 1750], "errorMessage": "Box must have value" }, { "pc": [481, 627, 763, 1067, 1199, 1250], "errorMessage": "Bytes has valid prefix" }, { "pc": [798], "errorMessage": "Invalid NFD" }, { "pc": [1716], "errorMessage": "Invalid payment" }, { "pc": [800], "errorMessage": "NFD changed since impact last calculated" }, { "pc": [1202], "errorMessage": "Not an NFD" }, { "pc": [1615], "errorMessage": "Not an akita NFT" }, { "pc": [1109], "errorMessage": "Not an akita subscription contract" }, { "pc": [1681], "errorMessage": "Not the DAO" }, { "pc": [202, 238, 313, 333, 353, 383, 412], "errorMessage": "OnCompletion is not NoOp" }, { "pc": [220], "errorMessage": "OnCompletion is not UpdateApplication" }, { "pc": [1817, 1837], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [1335], "errorMessage": "User does not own this NFD" }, { "pc": [1623], "errorMessage": "User does not own this NFT" }, { "pc": [515, 1679, 1815, 1835], "errorMessage": "application exists" }, { "pc": [834, 873, 1611], "errorMessage": "asset exists" }, { "pc": [416], "errorMessage": "can only call when creating" }, { "pc": [205, 223, 241, 316, 336, 356, 386], "errorMessage": "can only call when not creating" }, { "pc": [439, 575, 715, 804, 1137, 1383, 1676, 1812, 1832], "errorMessage": "check GlobalState exists" }, { "pc": [366], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDYgOCAxMDAwMDAwMDAwMDAwIDIwMDAwMDAwMDAwMCAzMTUzNjAwMCAxMDAwMDAwMDAwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAweDE1MWY3Yzc1ICJha2l0YV9hbCIgIm0iICJha2l0YV9hc3NldHMiICJpLnRpbWVDaGFuZ2VkIiBiYXNlMzIoQUtDVFJESzRPV05XSFRQSDRYUEtMTldOTFozMzNWRTM1U0tRNEZHUUszWkpBNEZJSENMUSkgMHg2YzEzZWRlNCAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMDgKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbEltcGFjdCBleHRlbmRzIEFraXRhQmFzZUNvbnRyYWN0IGltcGxlbWVudHMgQWtpdGFTb2NpYWxJbXBhY3RJbnRlcmZhY2UgewogICAgdHhuIE51bUFwcEFyZ3MKICAgIGJ6IG1haW5fYWZ0ZXJfaWZfZWxzZUAxNAogICAgcHVzaGJ5dGVzcyAweDZmOTgxN2Y2IDB4M2U2ZWUzZDYgMHg5ZDc0ZjVhMSAweGY4MWM3YjYyIDB4ZDU3NGJiMTAgMHgyODgyYmI4YSAweGVhOTE4MGRkIDB4MzNlOTJjOTQgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LHN0cmluZyl2b2lkIiwgbWV0aG9kICJjYWNoZU1ldGEodWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyKHBheSx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImdldFVzZXJJbXBhY3RXaXRob3V0U29jaWFsKGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnZXRVc2VySW1wYWN0KGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnZXRNZXRhKGFkZHJlc3MpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX2NyZWF0ZV9yb3V0ZUAzIG1haW5fY2FjaGVNZXRhX3JvdXRlQDQgbWFpbl91cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyX3JvdXRlQDUgbWFpbl9nZXRVc2VySW1wYWN0V2l0aG91dFNvY2lhbF9yb3V0ZUA2IG1haW5fZ2V0VXNlckltcGFjdF9yb3V0ZUA3IG1haW5fZ2V0TWV0YV9yb3V0ZUA4IG1haW5fdXBkYXRlX3JvdXRlQDkgbWFpbl91cGRhdGVBa2l0YURBT19yb3V0ZUAxMAoKbWFpbl9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMwOAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsSW1wYWN0IGV4dGVuZHMgQWtpdGFCYXNlQ29udHJhY3QgaW1wbGVtZW50cyBBa2l0YVNvY2lhbEltcGFjdEludGVyZmFjZSB7CiAgICBpbnRjXzAgLy8gMAogICAgcmV0dXJuCgptYWluX3VwZGF0ZUFraXRhREFPX3JvdXRlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFwcDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMDgKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbEltcGFjdCBleHRlbmRzIEFraXRhQmFzZUNvbnRyYWN0IGltcGxlbWVudHMgQWtpdGFTb2NpYWxJbXBhY3RJbnRlcmZhY2UgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFwcDogdWludDY0KTogdm9pZCB7CiAgICBjYWxsc3ViIHVwZGF0ZUFraXRhREFPCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX3VwZGF0ZV9yb3V0ZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgVXBkYXRlQXBwbGljYXRpb24KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMwOAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsSW1wYWN0IGV4dGVuZHMgQWtpdGFCYXNlQ29udHJhY3QgaW1wbGVtZW50cyBBa2l0YVNvY2lhbEltcGFjdEludGVyZmFjZSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgY2FsbHN1YiB1cGRhdGUKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fZ2V0TWV0YV9yb3V0ZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTY2MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMDgKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbEltcGFjdCBleHRlbmRzIEFraXRhQmFzZUNvbnRyYWN0IGltcGxlbWVudHMgQWtpdGFTb2NpYWxJbXBhY3RJbnRlcmZhY2UgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTY2MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBjYWxsc3ViIGdldE1ldGEKICAgIHVuY292ZXIgOAogICAgaXRvYgogICAgdW5jb3ZlciA4CiAgICBpdG9iCiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIHVuY292ZXIgOAogICAgaXRvYgogICAgdW5jb3ZlciA4CiAgICBpdG9iCiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAxMAogICAgc2V0Yml0CiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIHVuY292ZXIgOAogICAgaXRvYgogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2dldFVzZXJJbXBhY3Rfcm91dGVANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2NTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzA4CiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxJbXBhY3QgZXh0ZW5kcyBBa2l0YUJhc2VDb250cmFjdCBpbXBsZW1lbnRzIEFraXRhU29jaWFsSW1wYWN0SW50ZXJmYWNlIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2NTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBnZXRVc2VySW1wYWN0CiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2dldFVzZXJJbXBhY3RXaXRob3V0U29jaWFsX3JvdXRlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjUwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgbm90IE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMwOAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsSW1wYWN0IGV4dGVuZHMgQWtpdGFCYXNlQ29udHJhY3QgaW1wbGVtZW50cyBBa2l0YVNvY2lhbEltcGFjdEludGVyZmFjZSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjUwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdFdpdGhvdXRTb2NpYWwKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fdXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcl9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYzMgogICAgLy8gdXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsIG5ld01vZGlmaWVyOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgbm90IE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMwOAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsSW1wYWN0IGV4dGVuZHMgQWtpdGFCYXNlQ29udHJhY3QgaW1wbGVtZW50cyBBa2l0YVNvY2lhbEltcGFjdEludGVyZmFjZSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MzIKICAgIC8vIHVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LCBuZXdNb2RpZmllcjogdWludDY0KTogdm9pZCB7CiAgICBjYWxsc3ViIHVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY2FjaGVNZXRhX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTk5CiAgICAvLyBjYWNoZU1ldGEoc3Vic2NyaXB0aW9uSW5kZXg6IHVpbnQ2NCwgTkZEQXBwSUQ6IHVpbnQ2NCwgYWtpdGFBc3NldElEOiB1aW50NjQpOiB1aW50NjQgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzA4CiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxJbXBhY3QgZXh0ZW5kcyBBa2l0YUJhc2VDb250cmFjdCBpbXBsZW1lbnRzIEFraXRhU29jaWFsSW1wYWN0SW50ZXJmYWNlIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1OTkKICAgIC8vIGNhY2hlTWV0YShzdWJzY3JpcHRpb25JbmRleDogdWludDY0LCBORkRBcHBJRDogdWludDY0LCBha2l0YUFzc2V0SUQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBjYWxsc3ViIGNhY2hlTWV0YQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfcm91dGVAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1OTEKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgIQogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBjcmVhdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMwOAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsSW1wYWN0IGV4dGVuZHMgQWtpdGFCYXNlQ29udHJhY3QgaW1wbGVtZW50cyBBa2l0YVNvY2lhbEltcGFjdEludGVyZmFjZSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU5MQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGNhbGxzdWIgY3JlYXRlCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmlzU3Vic2NyaWJlZChhY2NvdW50OiBieXRlcywgaW5kZXg6IHVpbnQ2NCkgLT4gdWludDY0LCB1aW50NjQsIHVpbnQ2NDoKaXNTdWJzY3JpYmVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMzMAogICAgLy8gcHJpdmF0ZSBpc1N1YnNjcmliZWQoYWNjb3VudDogQWNjb3VudCwgaW5kZXg6IHVpbnQ2NCk6IHsgYWN0aXZlOiBib29sZWFuOyBzZXJ2aWNlSUQ6IHVpbnQ2NDsgc3RyZWFrOiB1aW50NjQgfSB7CiAgICBwcm90byAyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMzEtMTMzOAogICAgLy8gY29uc3QgaW5mbyA9IGFiaUNhbGwoCiAgICAvLyAgIFN1YnNjcmlwdGlvbnMucHJvdG90eXBlLmdldFN1YnNjcmlwdGlvbkluZm8sCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN1YnNjcmlwdGlvbnMsCiAgICAvLyAgICAgYXJnczogW25ldyBBZGRyZXNzKGFjY291bnQpLCBpbmRleF0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9LAogICAgLy8gKS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbnN0YW50cy50czoxCiAgICAvLyBleHBvcnQgY29uc3QgR2xvYmFsU3RhdGVLZXlBa2l0YURBTyA9ICdha2l0YV9kYW8nCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2Rhby9jb25zdGFudHMudHM6NwogICAgLy8gZXhwb3J0IGNvbnN0IEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0ID0gJ2FraXRhX2FsJwogICAgYnl0ZWNfMiAvLyAiYWtpdGFfYWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI2CiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxBa2l0YUFwcExpc3Q+KGFwcExpc3RCeXRlcykKICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzM1CiAgICAvLyBhcmdzOiBbbmV3IEFkZHJlc3MoYWNjb3VudCksIGluZGV4XSwKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMzMS0xMzM4CiAgICAvLyBjb25zdCBpbmZvID0gYWJpQ2FsbCgKICAgIC8vICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuZ2V0U3Vic2NyaXB0aW9uSW5mbywKICAgIC8vICAgewogICAgLy8gICAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Vic2NyaXB0aW9ucywKICAgIC8vICAgICBhcmdzOiBbbmV3IEFkZHJlc3MoYWNjb3VudCksIGluZGV4XSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0sCiAgICAvLyApLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg0MDE1Yjg0MCAvLyBtZXRob2QgImdldFN1YnNjcmlwdGlvbkluZm8oYWRkcmVzcyx1aW50NjQpKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzc1tdKSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2NvbnN0YW50cy50czo0CiAgICAvLyBleHBvcnQgY29uc3QgZmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMzEtMTMzOAogICAgLy8gY29uc3QgaW5mbyA9IGFiaUNhbGwoCiAgICAvLyAgIFN1YnNjcmlwdGlvbnMucHJvdG90eXBlLmdldFN1YnNjcmlwdGlvbkluZm8sCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN1YnNjcmlwdGlvbnMsCiAgICAvLyAgICAgYXJnczogW25ldyBBZGRyZXNzKGFjY291bnQpLCBpbmRleF0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9LAogICAgLy8gKS5yZXR1cm5WYWx1ZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgZXh0cmFjdCA0IDMyCiAgICBkaWcgMQogICAgcHVzaGludCAzNiAvLyAzNgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAyCiAgICBwdXNoaW50IDQ0IC8vIDQ0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIHB1c2hpbnQgNjAgLy8gNjAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNAogICAgcHVzaGludCA4NCAvLyA4NAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgNQogICAgcHVzaGludCA5MiAvLyA5MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNDEKICAgIC8vIGNvbnN0IHRvQWtpdGEgPSBpbmZvLnJlY2lwaWVudC5uYXRpdmUgPT09IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcwogICAgdW5jb3ZlciA2CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzQ1CiAgICAvLyBjb25zdCBub3REb25hdGluZyA9IGluZm8uc2VydmljZUlEICE9PSAwCiAgICBkaWcgNQogICAgaW50Y18wIC8vIDAKICAgICE9CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzQ3CiAgICAvLyBjb25zdCBsYXN0V2luZG93U3RhcnQ6IHVpbnQ2NCA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSAoKChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gaW5mby5zdGFydERhdGUpICUgaW5mby5pbnRlcnZhbCkgKyBpbmZvLmludGVydmFsKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZHVwCiAgICB1bmNvdmVyIDcKICAgIC0KICAgIGRpZyA2CiAgICAlCiAgICB1bmNvdmVyIDYKICAgICsKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNTEKICAgIC8vIGNvbnN0IG5vdFN0YWxlID0gaW5mby5sYXN0UGF5bWVudCA+IGxhc3RXaW5kb3dTdGFydAogICAgdW5jb3ZlciA0CiAgICA8CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzU0CiAgICAvLyBhY3RpdmU6IHRvQWtpdGEgJiYgbm90RG9uYXRpbmcgJiYgbm90U3RhbGUsCiAgICBjb3ZlciAyCiAgICAmJgogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNTMtMTM1NwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYWN0aXZlOiB0b0FraXRhICYmIG5vdERvbmF0aW5nICYmIG5vdFN0YWxlLAogICAgLy8gICBzZXJ2aWNlSUQ6IGluZm8uc2VydmljZUlELAogICAgLy8gICBzdHJlYWs6IGluZm8uc3RyZWFrLAogICAgLy8gfQogICAgY292ZXIgMgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LnVzZXJJbXBhY3QoYWNjb3VudDogYnl0ZXMsIGluY2x1ZGVTb2NpYWw6IHVpbnQ2NCkgLT4gdWludDY0Ogp1c2VySW1wYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQwMAogICAgLy8gcHJpdmF0ZSB1c2VySW1wYWN0KGFjY291bnQ6IEFjY291bnQsIGluY2x1ZGVTb2NpYWw6IGJvb2xlYW4pOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb25zdGFudHMudHM6MTUKICAgIC8vIGV4cG9ydCBjb25zdCBJbXBhY3RCb3hQcmVmaXhNZXRhID0gJ20nCiAgICBieXRlY18zIC8vICJtIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQwMQogICAgLy8gY29uc3QgbWV0YSA9IGRlY29kZUFyYzQ8SW1wYWN0TWV0YVZhbHVlPih0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUuYnl0ZXMpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbnN0YW50cy50czoxCiAgICAvLyBleHBvcnQgY29uc3QgR2xvYmFsU3RhdGVLZXlBa2l0YURBTyA9ICdha2l0YV9kYW8nCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjUKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9kYW8vY29uc3RhbnRzLnRzOjE5CiAgICAvLyBleHBvcnQgY29uc3QgQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cyA9ICdha2l0YV9hc3NldHMnCiAgICBieXRlYyA0IC8vICJha2l0YV9hc3NldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NgogICAgLy8gcmV0dXJuIGRlY29kZUFyYzQ8QWtpdGFBc3NldHM+KGFraXRhQXNzZXRzQnl0ZXMpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MjItMTQzNQogICAgLy8gY29uc3QgaW5mbyA9IGFiaUNhbGwoCiAgICAvLyAgIFN0YWtpbmcucHJvdG90eXBlLmdldEluZm8sCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcsCiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgbmV3IEFkZHJlc3MoYWNjb3VudCksCiAgICAvLyAgICAgICB7CiAgICAvLyAgICAgICAgIGFzc2V0OiBha3RhLAogICAgLy8gICAgICAgICB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCwKICAgIC8vICAgICAgIH0KICAgIC8vICAgICBdLAogICAgLy8gICAgIGZlZSwKICAgIC8vICAgfQogICAgLy8gKS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2Rhby9jb25zdGFudHMudHM6NwogICAgLy8gZXhwb3J0IGNvbnN0IEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0ID0gJ2FraXRhX2FsJwogICAgYnl0ZWNfMiAvLyAiYWtpdGFfYWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI2CiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxBa2l0YUFwcExpc3Q+KGFwcExpc3RCeXRlcykKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQyOQogICAgLy8gYXNzZXQ6IGFrdGEsCiAgICBzd2FwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czoxNwogICAgLy8gZXhwb3J0IGNvbnN0IFNUQUtJTkdfVFlQRV9TT0ZUOiBTdGFraW5nVHlwZSA9IG5ldyBhcmM0LlVpbnROOCgxKQogICAgcHVzaGJ5dGVzIDB4MDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MjgtMTQzMQogICAgLy8gewogICAgLy8gICBhc3NldDogYWt0YSwKICAgIC8vICAgdHlwZTogU1RBS0lOR19UWVBFX1NPRlQsCiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MjItMTQzNQogICAgLy8gY29uc3QgaW5mbyA9IGFiaUNhbGwoCiAgICAvLyAgIFN0YWtpbmcucHJvdG90eXBlLmdldEluZm8sCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcsCiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgbmV3IEFkZHJlc3MoYWNjb3VudCksCiAgICAvLyAgICAgICB7CiAgICAvLyAgICAgICAgIGFzc2V0OiBha3RhLAogICAgLy8gICAgICAgICB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCwKICAgIC8vICAgICAgIH0KICAgIC8vICAgICBdLAogICAgLy8gICAgIGZlZSwKICAgIC8vICAgfQogICAgLy8gKS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YzkwNjg4MDkgLy8gbWV0aG9kICJnZXRJbmZvKGFkZHJlc3MsKHVpbnQ2NCx1aW50OCkpKHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2NvbnN0YW50cy50czo0CiAgICAvLyBleHBvcnQgY29uc3QgZmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MjItMTQzNQogICAgLy8gY29uc3QgaW5mbyA9IGFiaUNhbGwoCiAgICAvLyAgIFN0YWtpbmcucHJvdG90eXBlLmdldEluZm8sCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcsCiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgbmV3IEFkZHJlc3MoYWNjb3VudCksCiAgICAvLyAgICAgICB7CiAgICAvLyAgICAgICAgIGFzc2V0OiBha3RhLAogICAgLy8gICAgICAgICB0eXBlOiBTVEFLSU5HX1RZUEVfU09GVCwKICAgIC8vICAgICAgIH0KICAgIC8vICAgICBdLAogICAgLy8gICAgIGZlZSwKICAgIC8vICAgfQogICAgLy8gKS5yZXR1cm5WYWx1ZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgcHVzaGludCA0IC8vIDQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgcHVzaGludCAxMiAvLyAxMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MzcKICAgIC8vIGNvbnN0IGVsYXBzZWQ6IHVpbnQ2NCA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBpbmZvLmxhc3RVcGRhdGUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHN3YXAKICAgIC0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb25zdGFudHMudHM6MzYKICAgIC8vIGV4cG9ydCBjb25zdCBURU5fVEhPVVNBTkRfQUtJVEE6IHVpbnQ2NCA9IDEwXzAwMF8wMDBfMDAwCiAgICBpbnRjIDcgLy8gMTAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NDAKICAgIC8vIGlmIChpbmZvLmFtb3VudCA8IFRFTl9USE9VU0FORF9BS0lUQSB8fCBlbGFwc2VkIDwgVEhJUlRZX0RBWVMpIHsKICAgIDwKICAgIGJueiB1c2VySW1wYWN0X2lmX2JvZHlAMjcKICAgIGZyYW1lX2RpZyAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czozMQogICAgLy8gZXhwb3J0IGNvbnN0IFRISVJUWV9EQVlTOiB1aW50NjQgPSAyXzU5Ml8wMDAKICAgIHB1c2hpbnQgMjU5MjAwMCAvLyAyNTkyMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDQwCiAgICAvLyBpZiAoaW5mby5hbW91bnQgPCBURU5fVEhPVVNBTkRfQUtJVEEgfHwgZWxhcHNlZCA8IFRISVJUWV9EQVlTKSB7CiAgICA8CiAgICBieiB1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VAMjgKCnVzZXJJbXBhY3RfaWZfYm9keUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NDEKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA1Cgp1c2VySW1wYWN0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFN0YWtpbmdJbXBhY3RTY29yZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NzAKICAgIC8vIGxldCBzdWJzY3JpYmVySW1wYWN0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDcyCiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25TdGF0ZSA9IHRoaXMuaXNTdWJzY3JpYmVkKGFjY291bnQsIHN1YnNjcmlwdGlvbkluZGV4KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgMTEKICAgIGNhbGxzdWIgaXNTdWJzY3JpYmVkCiAgICBmcmFtZV9idXJ5IDgKICAgIGZyYW1lX2J1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ3NAogICAgLy8gaWYgKCFzdWJzY3JpcHRpb25TdGF0ZS5hY3RpdmUpIHsKICAgIGJ6IHVzZXJJbXBhY3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0U3Vic2NyaWJlckltcGFjdFNjb3JlQDM5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDc4CiAgICAvLyBjb25zdCBtb2RpZmllciA9IHRoaXMuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihzdWJzY3JpcHRpb25TdGF0ZS5zZXJ2aWNlSUQpLnZhbHVlCiAgICBmcmFtZV9kaWcgNwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoxNgogICAgLy8gZXhwb3J0IGNvbnN0IEltcGFjdEJveFByZWZpeFN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIgPSAncycKICAgIHB1c2hieXRlcyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ3OAogICAgLy8gY29uc3QgbW9kaWZpZXIgPSB0aGlzLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIoc3Vic2NyaXB0aW9uU3RhdGUuc2VydmljZUlEKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0ODEKICAgIC8vIGlmIChzdWJzY3JpcHRpb25TdGF0ZS5zdHJlYWsgPj0gMTIpIHsKICAgIGZyYW1lX2RpZyA4CiAgICBwdXNoaW50IDEyIC8vIDEyCiAgICA+PQogICAgYnogdXNlckltcGFjdF9lbHNlX2JvZHlAMzcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0ODIKICAgIC8vIHN1YnNjcmliZXJJbXBhY3QgKz0gMjUwIC8gbW9kaWZpZXIKICAgIHB1c2hpbnQgMjUwIC8vIDI1MAogICAgc3dhcAogICAgLwogICAgZnJhbWVfYnVyeSA2Cgp1c2VySW1wYWN0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFN1YnNjcmliZXJJbXBhY3RTY29yZUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MDUKICAgIC8vIGNvbnN0IHNvY2lhbEltcGFjdCA9IGluY2x1ZGVTb2NpYWwgPyB0aGlzLmdldFNvY2lhbEltcGFjdFNjb3JlKGFjY291bnQpIDogVWludDY0KDApIC8vIFNvY2lhbCBBY3Rpdml0eSB8IHVwIHRvIDI1MAogICAgZnJhbWVfZGlnIC0xCiAgICBieiB1c2VySW1wYWN0X3Rlcm5hcnlfZmFsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ5MS0xNDk4CiAgICAvLyByZXR1cm4gYWJpQ2FsbCgKICAgIC8vICAgQWtpdGFTb2NpYWxQbHVnaW4ucHJvdG90eXBlLmdldFVzZXJTb2NpYWxJbXBhY3QsCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zb2NpYWwsCiAgICAvLyAgICAgYXJnczogW25ldyBBZGRyZXNzKGFjY291bnQpXSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0KICAgIC8vICkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb25zdGFudHMudHM6MQogICAgLy8gZXhwb3J0IGNvbnN0IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gPSAnYWtpdGFfZGFvJwogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZGFvL2NvbnN0YW50cy50czo4CiAgICAvLyBleHBvcnQgY29uc3QgQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0ID0gJ3BsdWduX2FsJwogICAgcHVzaGJ5dGVzICJwbHVnbl9hbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzAKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMxCiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxQbHVnaW5BcHBMaXN0PihwbHVnaW5BcHBMaXN0Qnl0ZXMpCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0OTEtMTQ5OAogICAgLy8gcmV0dXJuIGFiaUNhbGwoCiAgICAvLyAgIEFraXRhU29jaWFsUGx1Z2luLnByb3RvdHlwZS5nZXRVc2VyU29jaWFsSW1wYWN0LAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc29jaWFsLAogICAgLy8gICAgIGFyZ3M6IFtuZXcgQWRkcmVzcyhhY2NvdW50KV0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9CiAgICAvLyApLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhlODY5OTM0ZCAvLyBtZXRob2QgImdldFVzZXJTb2NpYWxJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2NvbnN0YW50cy50czo0CiAgICAvLyBleHBvcnQgY29uc3QgZmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0OTEtMTQ5OAogICAgLy8gcmV0dXJuIGFiaUNhbGwoCiAgICAvLyAgIEFraXRhU29jaWFsUGx1Z2luLnByb3RvdHlwZS5nZXRVc2VyU29jaWFsSW1wYWN0LAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc29jaWFsLAogICAgLy8gICAgIGFyZ3M6IFtuZXcgQWRkcmVzcyhhY2NvdW50KV0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9CiAgICAvLyApLnJldHVyblZhbHVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgNAoKdXNlckltcGFjdF90ZXJuYXJ5X21lcmdlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTY1CiAgICAvLyBjb25zdCBtZXRhID0gZGVjb2RlQXJjNDxJbXBhY3RNZXRhVmFsdWU+KHRoaXMubWV0YShhY2NvdW50KS52YWx1ZS5ieXRlcykKICAgIGZyYW1lX2RpZyAxMAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgcHVzaGludCAyNCAvLyAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU2NgogICAgLy8gY29uc3QgW2xhc3RDaGFuZ2VkQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMobWV0YS5ORkQsIEJ5dGVzKE5GREdsb2JhbFN0YXRlS2V5c1RpbWVDaGFuZ2VkKSkKICAgIGRpZyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjIxCiAgICAvLyBleHBvcnQgY29uc3QgTkZER2xvYmFsU3RhdGVLZXlzVGltZUNoYW5nZWQgPSAnaS50aW1lQ2hhbmdlZCcKICAgIGJ5dGVjIDUgLy8gImkudGltZUNoYW5nZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTY2CiAgICAvLyBjb25zdCBbbGFzdENoYW5nZWRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhtZXRhLk5GRCwgQnl0ZXMoTkZER2xvYmFsU3RhdGVLZXlzVGltZUNoYW5nZWQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU2NwogICAgLy8gY29uc3QgdGltZUNoYW5nZWQgPSBidG9pKGxhc3RDaGFuZ2VkQnl0ZXMpCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTY5CiAgICAvLyBhc3NlcnQoTkZEQXBwLmlkID09PSBBcHBsaWNhdGlvbihtZXRhLk5GRCkuaWQsIEVSUl9JTlZBTElEX05GRCkKICAgIGZyYW1lX2RpZyAxMgogICAgdW5jb3ZlciAzCiAgICA9PQogICAgYXNzZXJ0IC8vIEludmFsaWQgTkZECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTcwCiAgICAvLyBhc3NlcnQobWV0YS5uZmRUaW1lQ2hhbmdlZCA9PT0gdGltZUNoYW5nZWQsIEVSUl9ORkRfQ0hBTkdFRCkKICAgID09CiAgICBhc3NlcnQgLy8gTkZEIGNoYW5nZWQgc2luY2UgaW1wYWN0IGxhc3QgY2FsY3VsYXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbnN0YW50cy50czoxCiAgICAvLyBleHBvcnQgY29uc3QgR2xvYmFsU3RhdGVLZXlBa2l0YURBTyA9ICdha2l0YV9kYW8nCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9kYW8vY29uc3RhbnRzLnRzOjE5CiAgICAvLyBleHBvcnQgY29uc3QgQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cyA9ICdha2l0YV9hc3NldHMnCiAgICBieXRlYyA0IC8vICJha2l0YV9hc3NldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NgogICAgLy8gcmV0dXJuIGRlY29kZUFyYzQ8QWtpdGFBc3NldHM+KGFraXRhQXNzZXRzQnl0ZXMpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NTgKICAgIC8vIGNvbnN0IGJhbGFuY2UgPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKGFjY291bnQsIGFrdGEpWzBdCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czozNgogICAgLy8gZXhwb3J0IGNvbnN0IFRFTl9USE9VU0FORF9BS0lUQTogdWludDY0ID0gMTBfMDAwXzAwMF8wMDAKICAgIGludGMgNyAvLyAxMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ2MQogICAgLy8gaWYgKGJhbGFuY2UgPCBURU5fVEhPVVNBTkRfQUtJVEEpIHsKICAgIDwKICAgIGJ6IHVzZXJJbXBhY3RfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ2MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDIKCnVzZXJJbXBhY3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0SGVsZEFrdGFJbXBhY3RTY29yZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1NzYKICAgIC8vIGNvbnN0IHByZWZpeCA9IGFzc2V0LnVuaXROYW1lLnNsaWNlKDAsIDMpCiAgICBmcmFtZV9kaWcgMTMKICAgIGR1cAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFVuaXROYW1lCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAzIC8vIDMKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzIC8vIDMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU3NwogICAgLy8gY29uc3QgYmFsYW5jZSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoYWNjb3VudCwgYXNzZXQpWzBdCiAgICBmcmFtZV9kaWcgLTIKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHBvcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTc4CiAgICAvLyBpZiAoYXNzZXQuY3JlYXRvciA9PT0gQWNjb3VudChBa2l0YU5GVENyZWF0b3JBZGRyZXNzKSAmJiBiYWxhbmNlID4gMCkgewogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9jb25zdGFudHMudHM6NjIKICAgIC8vIGV4cG9ydCBjb25zdCBBa2l0YU5GVENyZWF0b3JBZGRyZXNzID0gJ0FLQ1RSREs0T1dOV0hUUEg0WFBLTE5XTkxaMzMzVkUzNVNLUTRGR1FLM1pKQTRGSUhDTFRSRzNQRkknCiAgICBieXRlYyA2IC8vIGFkZHIgQUtDVFJESzRPV05XSFRQSDRYUEtMTldOTFozMzNWRTM1U0tRNEZHUUszWkpBNEZJSENMVFJHM1BGSQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU3OAogICAgLy8gaWYgKGFzc2V0LmNyZWF0b3IgPT09IEFjY291bnQoQWtpdGFORlRDcmVhdG9yQWRkcmVzcykgJiYgYmFsYW5jZSA+IDApIHsKICAgID09CiAgICBieiB1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTkKICAgIGZyYW1lX2RpZyAxCiAgICBieiB1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1NzkKICAgIC8vIGlmIChwcmVmaXggPT09IEJ5dGVzKEFraXRhQ29sbGVjdGlvbnNQcmVmaXhBS0MpKSB7CiAgICBmcmFtZV9kaWcgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2NvbnN0YW50cy50czo2NAogICAgLy8gZXhwb3J0IGNvbnN0IEFraXRhQ29sbGVjdGlvbnNQcmVmaXhBS0MgPSAnQUtDJwogICAgcHVzaGJ5dGVzICJBS0MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTc5CiAgICAvLyBpZiAocHJlZml4ID09PSBCeXRlcyhBa2l0YUNvbGxlY3Rpb25zUHJlZml4QUtDKSkgewogICAgPT0KICAgIGJ6IHVzZXJJbXBhY3RfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU4MAogICAgLy8gcmV0dXJuIDUwCiAgICBwdXNoaW50IDUwIC8vIDUwCgp1c2VySW1wYWN0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldE5GVEltcGFjdFNjb3JlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQxMAogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IHN0YWtlZEFrdGFJbXBhY3QgKyBzdWJzY3JpYmVySW1wYWN0ICsgc29jaWFsSW1wYWN0ICsgbmZkU2NvcmUgKyBoZWxkQWtpdGFJbXBhY3QgKyBuZnRJbXBhY3QKICAgIGZyYW1lX2RpZyA1CiAgICBmcmFtZV9kaWcgNgogICAgKwogICAgZnJhbWVfZGlnIDQKICAgICsKICAgIGZyYW1lX2RpZyAzCiAgICArCiAgICBmcmFtZV9kaWcgMgogICAgKwogICAgKwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MTEKICAgIC8vIGlmICh0b3RhbCA9PT0gMCkgewogICAgYm56IHVzZXJJbXBhY3RfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDEyCiAgICAvLyByZXR1cm4gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgp1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MTUKICAgIC8vIHJldHVybiB0b3RhbAogICAgZnJhbWVfZGlnIDkKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgp1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTgyCiAgICAvLyBpZiAocHJlZml4ID09PSBCeXRlcyhBa2l0YUNvbGxlY3Rpb25zUHJlZml4QU9HKSkgewogICAgZnJhbWVfZGlnIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9jb25zdGFudHMudHM6NjUKICAgIC8vIGV4cG9ydCBjb25zdCBBa2l0YUNvbGxlY3Rpb25zUHJlZml4QU9HID0gJ0FPRycKICAgIHB1c2hieXRlcyAiQU9HIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU4MgogICAgLy8gaWYgKHByZWZpeCA9PT0gQnl0ZXMoQWtpdGFDb2xsZWN0aW9uc1ByZWZpeEFPRykpIHsKICAgID09CiAgICBieiB1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1ODMKICAgIC8vIHJldHVybiAyNQogICAgcHVzaGludCAyNSAvLyAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQwOAogICAgLy8gY29uc3QgbmZ0SW1wYWN0ID0gdGhpcy5nZXRORlRJbXBhY3RTY29yZShhY2NvdW50LCBBc3NldChtZXRhLmFraXRhTkZUKSkgLy8gSG9sZHMgQUtDL09tbmlnZW0gfCA1MAogICAgYiB1c2VySW1wYWN0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldE5GVEltcGFjdFNjb3JlQDIwCgp1c2VySW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTg2CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MDgKICAgIC8vIGNvbnN0IG5mdEltcGFjdCA9IHRoaXMuZ2V0TkZUSW1wYWN0U2NvcmUoYWNjb3VudCwgQXNzZXQobWV0YS5ha2l0YU5GVCkpIC8vIEhvbGRzIEFLQy9PbW5pZ2VtIHwgNTAKICAgIGIgdXNlckltcGFjdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5nZXRORlRJbXBhY3RTY29yZUAyMAoKdXNlckltcGFjdF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ2NQogICAgLy8gY29uc3QgY2FwcGVkID0gYmFsYW5jZSA+PSBPTkVfTUlMTElPTl9BS0lUQSA/IE9ORV9NSUxMSU9OX0FLSVRBIDogYmFsYW5jZQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czozNAogICAgLy8gZXhwb3J0IGNvbnN0IE9ORV9NSUxMSU9OX0FLSVRBOiB1aW50NjQgPSAxXzAwMF8wMDBfMDAwXzAwMAogICAgaW50YyA0IC8vIDEwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NjUKICAgIC8vIGNvbnN0IGNhcHBlZCA9IGJhbGFuY2UgPj0gT05FX01JTExJT05fQUtJVEEgPyBPTkVfTUlMTElPTl9BS0lUQSA6IGJhbGFuY2UKICAgID49CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjM0CiAgICAvLyBleHBvcnQgY29uc3QgT05FX01JTExJT05fQUtJVEE6IHVpbnQ2NCA9IDFfMDAwXzAwMF8wMDBfMDAwCiAgICBpbnRjIDQgLy8gMTAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ2NQogICAgLy8gY29uc3QgY2FwcGVkID0gYmFsYW5jZSA+PSBPTkVfTUlMTElPTl9BS0lUQSA/IE9ORV9NSUxMSU9OX0FLSVRBIDogYmFsYW5jZQogICAgc3dhcAogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDY2CiAgICAvLyByZXR1cm4gKGNhcHBlZCAqIDUwKSAvIE9ORV9NSUxMSU9OX0FLSVRBCiAgICBwdXNoaW50IDUwIC8vIDUwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjM0CiAgICAvLyBleHBvcnQgY29uc3QgT05FX01JTExJT05fQUtJVEE6IHVpbnQ2NCA9IDFfMDAwXzAwMF8wMDBfMDAwCiAgICBpbnRjIDQgLy8gMTAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ2NgogICAgLy8gcmV0dXJuIChjYXBwZWQgKiA1MCkgLyBPTkVfTUlMTElPTl9BS0lUQQogICAgLwogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDA3CiAgICAvLyBjb25zdCBoZWxkQWtpdGFJbXBhY3QgPSB0aGlzLmdldEhlbGRBa3RhSW1wYWN0U2NvcmUoYWNjb3VudCkgLy8gSGVsZCBBS1RBIHwgdXAgdG8gNTAKICAgIGIgdXNlckltcGFjdF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5nZXRIZWxkQWt0YUltcGFjdFNjb3JlQDExCgp1c2VySW1wYWN0X3Rlcm5hcnlfZmFsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MDUKICAgIC8vIGNvbnN0IHNvY2lhbEltcGFjdCA9IGluY2x1ZGVTb2NpYWwgPyB0aGlzLmdldFNvY2lhbEltcGFjdFNjb3JlKGFjY291bnQpIDogVWludDY0KDApIC8vIFNvY2lhbCBBY3Rpdml0eSB8IHVwIHRvIDI1MAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgNAogICAgYiB1c2VySW1wYWN0X3Rlcm5hcnlfbWVyZ2VAMwoKdXNlckltcGFjdF9lbHNlX2JvZHlAMzc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDg0CiAgICAvLyBzdWJzY3JpYmVySW1wYWN0ICs9IChzdWJzY3JpcHRpb25TdGF0ZS5zdHJlYWsgKiAyMCkgLyBtb2RpZmllcgogICAgZnJhbWVfZGlnIDgKICAgIHB1c2hpbnQgMjAgLy8gMjAKICAgICoKICAgIHN3YXAKICAgIC8KICAgIGZyYW1lX2J1cnkgNgogICAgYiB1c2VySW1wYWN0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFN1YnNjcmliZXJJbXBhY3RTY29yZUAzOQoKdXNlckltcGFjdF9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ0NQogICAgLy8gY29uc3QgYW10Q2FwcGVkID0gaW5mby5hbW91bnQgPj0gVFdPX0hVTkRSRURfVEhPVVNBTkRfQUtJVEEgPyBUV09fSFVORFJFRF9USE9VU0FORF9BS0lUQSA6IGluZm8uYW1vdW50CiAgICBmcmFtZV9kaWcgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb25zdGFudHMudHM6MzUKICAgIC8vIGV4cG9ydCBjb25zdCBUV09fSFVORFJFRF9USE9VU0FORF9BS0lUQTogdWludDY0ID0gMjAwXzAwMF8wMDBfMDAwCiAgICBpbnRjIDUgLy8gMjAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDQ1CiAgICAvLyBjb25zdCBhbXRDYXBwZWQgPSBpbmZvLmFtb3VudCA+PSBUV09fSFVORFJFRF9USE9VU0FORF9BS0lUQSA/IFRXT19IVU5EUkVEX1RIT1VTQU5EX0FLSVRBIDogaW5mby5hbW91bnQKICAgID49CiAgICBieiB1c2VySW1wYWN0X3Rlcm5hcnlfZmFsc2VAMzAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb25zdGFudHMudHM6MzUKICAgIC8vIGV4cG9ydCBjb25zdCBUV09fSFVORFJFRF9USE9VU0FORF9BS0lUQTogdWludDY0ID0gMjAwXzAwMF8wMDBfMDAwCiAgICBpbnRjIDUgLy8gMjAwMDAwMDAwMDAwCgp1c2VySW1wYWN0X3Rlcm5hcnlfbWVyZ2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDQ4CiAgICAvLyBjb25zdCBtYXhTY29yZTogdWludDY0ID0gKGFtdENhcHBlZCAqIDI1MCkgLyBUV09fSFVORFJFRF9USE9VU0FORF9BS0lUQQogICAgcHVzaGludCAyNTAgLy8gMjUwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjM1CiAgICAvLyBleHBvcnQgY29uc3QgVFdPX0hVTkRSRURfVEhPVVNBTkRfQUtJVEE6IHVpbnQ2NCA9IDIwMF8wMDBfMDAwXzAwMAogICAgaW50YyA1IC8vIDIwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ0OAogICAgLy8gY29uc3QgbWF4U2NvcmU6IHVpbnQ2NCA9IChhbXRDYXBwZWQgKiAyNTApIC8gVFdPX0hVTkRSRURfVEhPVVNBTkRfQUtJVEEKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NTEKICAgIC8vIGNvbnN0IHRpbWVDYXBwZWQgPSBlbGFwc2VkID49IE9ORV9ZRUFSID8gT05FX1lFQVIgOiBlbGFwc2VkCiAgICBmcmFtZV9kaWcgMTUKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czozMgogICAgLy8gZXhwb3J0IGNvbnN0IE9ORV9ZRUFSOiB1aW50NjQgPSAzMV81MzZfMDAwCiAgICBpbnRjIDYgLy8gMzE1MzYwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NTEKICAgIC8vIGNvbnN0IHRpbWVDYXBwZWQgPSBlbGFwc2VkID49IE9ORV9ZRUFSID8gT05FX1lFQVIgOiBlbGFwc2VkCiAgICA+PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czozMgogICAgLy8gZXhwb3J0IGNvbnN0IE9ORV9ZRUFSOiB1aW50NjQgPSAzMV81MzZfMDAwCiAgICBpbnRjIDYgLy8gMzE1MzYwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NTEKICAgIC8vIGNvbnN0IHRpbWVDYXBwZWQgPSBlbGFwc2VkID49IE9ORV9ZRUFSID8gT05FX1lFQVIgOiBlbGFwc2VkCiAgICBzd2FwCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0NTMKICAgIC8vIHJldHVybiAodGltZUNhcHBlZCAqIG1heFNjb3JlKSAvIE9ORV9ZRUFSCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjMyCiAgICAvLyBleHBvcnQgY29uc3QgT05FX1lFQVI6IHVpbnQ2NCA9IDMxXzUzNl8wMDAKICAgIGludGMgNiAvLyAzMTUzNjAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ1MwogICAgLy8gcmV0dXJuICh0aW1lQ2FwcGVkICogbWF4U2NvcmUpIC8gT05FX1lFQVIKICAgIC8KICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQwMwogICAgLy8gY29uc3Qgc3Rha2VkQWt0YUltcGFjdCA9IHRoaXMuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlKGFjY291bnQpIC8vIFN0YWtlZCBBS1RBIHwgdXAgdG8gMjUwCiAgICBiIHVzZXJJbXBhY3RfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlQDMyCgp1c2VySW1wYWN0X3Rlcm5hcnlfZmFsc2VAMzA6CiAgICBmcmFtZV9kaWcgMTQKICAgIGIgdXNlckltcGFjdF90ZXJuYXJ5X21lcmdlQDMxCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0Lm5mZFJlYWRGaWVsZChORkRBcHA6IHVpbnQ2NCwgZmllbGQ6IGJ5dGVzKSAtPiBieXRlczoKbmZkUmVhZEZpZWxkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUwMQogICAgLy8gcHJpdmF0ZSBuZmRSZWFkRmllbGQoTkZEQXBwOiBBcHBsaWNhdGlvbiwgZmllbGQ6IHN0cmluZyk6IGJ5dGVzIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUwMi0xNTA5CiAgICAvLyBjb25zdCBmaWVsZEJ5dGVzID0gYWJpQ2FsbCgKICAgIC8vICAgTkZELnByb3RvdHlwZS5yZWFkRmllbGQsCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogTkZEQXBwLmlkLAogICAgLy8gICAgIGFyZ3M6IFtCeXRlcyhmaWVsZCldLAogICAgLy8gICAgIGZlZSwKICAgIC8vICAgfQogICAgLy8gKS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUwNgogICAgLy8gYXJnczogW0J5dGVzKGZpZWxkKV0sCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTAyLTE1MDkKICAgIC8vIGNvbnN0IGZpZWxkQnl0ZXMgPSBhYmlDYWxsKAogICAgLy8gICBORkQucHJvdG90eXBlLnJlYWRGaWVsZCwKICAgIC8vICAgewogICAgLy8gICAgIGFwcElkOiBORkRBcHAuaWQsCiAgICAvLyAgICAgYXJnczogW0J5dGVzKGZpZWxkKV0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9CiAgICAvLyApLnJldHVyblZhbHVlCiAgICBieXRlYyA3IC8vIG1ldGhvZCAicmVhZEZpZWxkKGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2NvbnN0YW50cy50czo0CiAgICAvLyBleHBvcnQgY29uc3QgZmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MDItMTUwOQogICAgLy8gY29uc3QgZmllbGRCeXRlcyA9IGFiaUNhbGwoCiAgICAvLyAgIE5GRC5wcm90b3R5cGUucmVhZEZpZWxkLAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IE5GREFwcC5pZCwKICAgIC8vICAgICBhcmdzOiBbQnl0ZXMoZmllbGQpXSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0KICAgIC8vICkucmV0dXJuVmFsdWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBleHRyYWN0IDYgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUxMQogICAgLy8gcmV0dXJuIGZpZWxkQnl0ZXMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5jcmVhdGUoYWtpdGFEQU86IHVpbnQ2NCwgdmVyc2lvbjogYnl0ZXMpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1OTEtMTU5MgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIC8vIGNyZWF0ZShha2l0YURBTzogdWludDY0LCB2ZXJzaW9uOiBzdHJpbmcpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbnN0YW50cy50czozCiAgICAvLyBleHBvcnQgY29uc3QgR2xvYmFsU3RhdGVLZXlWZXJzaW9uID0gJ3ZlcnNpb24nCiAgICBieXRlYyA4IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU5MwogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbnN0YW50cy50czoxCiAgICAvLyBleHBvcnQgY29uc3QgR2xvYmFsU3RhdGVLZXlBa2l0YURBTyA9ICdha2l0YV9kYW8nCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTk0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gQXBwbGljYXRpb24oYWtpdGFEQU8pCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuY2FjaGVNZXRhKHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsIE5GREFwcElEOiB1aW50NjQsIGFraXRhQXNzZXRJRDogdWludDY0KSAtPiB1aW50NjQ6CmNhY2hlTWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1OTkKICAgIC8vIGNhY2hlTWV0YShzdWJzY3JpcHRpb25JbmRleDogdWludDY0LCBORkRBcHBJRDogdWludDY0LCBha2l0YUFzc2V0SUQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAzIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDYKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjAwCiAgICAvLyBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IDApIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYwMQogICAgLy8gYXNzZXJ0KHRoaXMuaXNTdWJzY3JpYmVkKFR4bi5zZW5kZXIsIHN1YnNjcmlwdGlvbkluZGV4KS5hY3RpdmUsIEVSUl9OT1RfQV9TVUJTQ1JJUFRJT04pCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgaXNTdWJzY3JpYmVkCiAgICBwb3BuIDIKICAgIGFzc2VydCAvLyBOb3QgYW4gYWtpdGEgc3Vic2NyaXB0aW9uIGNvbnRyYWN0CgpjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYwNAogICAgLy8gbGV0IG5mZFRpbWVDaGFuZ2VkOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYwNQogICAgLy8gbGV0IG5mZEltcGFjdDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYwNgogICAgLy8gaWYgKE5GREFwcElEICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNjEKICAgIC8vIGNvbnN0IFtuZmROYW1lQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoTkZEQXBwLCBCeXRlcyhORkRHbG9iYWxTdGF0ZUtleXNOYW1lKSkKICAgIGZyYW1lX2RpZyAtMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoxOAogICAgLy8gZXhwb3J0IGNvbnN0IE5GREdsb2JhbFN0YXRlS2V5c05hbWUgPSAnaS5uYW1lJwogICAgcHVzaGJ5dGVzICJpLm5hbWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzYxCiAgICAvLyBjb25zdCBbbmZkTmFtZUJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKE5GREFwcCwgQnl0ZXMoTkZER2xvYmFsU3RhdGVLZXlzTmFtZSkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzYzLTEzNzAKICAgIC8vIHJldHVybiBhYmlDYWxsKAogICAgLy8gICBORkRSZWdpc3RyeS5wcm90b3R5cGUuaXNWYWxpZE5mZEFwcElkLAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5uZmRSZWdpc3RyeSwKICAgIC8vICAgICBhcmdzOiBbU3RyaW5nKG5mZE5hbWVCeXRlcyksIE5GREFwcC5pZF0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9CiAgICAvLyApLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29uc3RhbnRzLnRzOjEKICAgIC8vIGV4cG9ydCBjb25zdCBHbG9iYWxTdGF0ZUtleUFraXRhREFPID0gJ2FraXRhX2RhbycKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2Rhby9jb25zdGFudHMudHM6OQogICAgLy8gZXhwb3J0IGNvbnN0IEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0ID0gJ290aGVyX2FsJwogICAgcHVzaGJ5dGVzICJvdGhlcl9hbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNgogICAgLy8gcmV0dXJuIGRlY29kZUFyYzQ8T3RoZXJBcHBMaXN0PihvdGhlckFwcExpc3RCeXRlcykKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM2NwogICAgLy8gYXJnczogW1N0cmluZyhuZmROYW1lQnl0ZXMpLCBORkRBcHAuaWRdLAogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNjMtMTM3MAogICAgLy8gcmV0dXJuIGFiaUNhbGwoCiAgICAvLyAgIE5GRFJlZ2lzdHJ5LnByb3RvdHlwZS5pc1ZhbGlkTmZkQXBwSWQsCiAgICAvLyAgIHsKICAgIC8vICAgICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm5mZFJlZ2lzdHJ5LAogICAgLy8gICAgIGFyZ3M6IFtTdHJpbmcobmZkTmFtZUJ5dGVzKSwgTkZEQXBwLmlkXSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0KICAgIC8vICkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDRiZTIyZmM2IC8vIG1ldGhvZCAiaXNWYWxpZE5mZEFwcElkKHN0cmluZyx1aW50NjQpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18yIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9jb25zdGFudHMudHM6NAogICAgLy8gZXhwb3J0IGNvbnN0IGZlZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzYzLTEzNzAKICAgIC8vIHJldHVybiBhYmlDYWxsKAogICAgLy8gICBORkRSZWdpc3RyeS5wcm90b3R5cGUuaXNWYWxpZE5mZEFwcElkLAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5uZmRSZWdpc3RyeSwKICAgIC8vICAgICBhcmdzOiBbU3RyaW5nKG5mZE5hbWVCeXRlcyksIE5GREFwcC5pZF0sCiAgICAvLyAgICAgZmVlLAogICAgLy8gICB9CiAgICAvLyApLnJldHVyblZhbHVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MDgKICAgIC8vIGFzc2VydCh0aGlzLmlzTkZEKG5mZEFwcCksIEVSUl9OT1RfQU5fTkZEKQogICAgYXNzZXJ0IC8vIE5vdCBhbiBORkQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MDkKICAgIC8vIGFzc2VydCh0aGlzLmFkZHJlc3NWZXJpZmllZE9uTkZEKFR4bi5zZW5kZXIsIG5mZEFwcCksIEVSUl9VU0VSX0RPRVNfTk9UX09XTl9ORkQpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNzUtMTM4NAogICAgLy8gY29uc3QgY2FBbGdvRGF0YSA9IGFiaUNhbGwoCiAgICAvLyAgIE5GRC5wcm90b3R5cGUucmVhZEZpZWxkLAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IE5GREFwcC5pZCwKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBCeXRlcyhORkRNZXRhS2V5VmVyaWZpZWRBZGRyZXNzZXMpCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0sCiAgICAvLyApLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBieXRlYyA3IC8vIG1ldGhvZCAicmVhZEZpZWxkKGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoyMwogICAgLy8gZXhwb3J0IGNvbnN0IE5GRE1ldGFLZXlWZXJpZmllZEFkZHJlc3NlcyA9ICd2LmNhQWxnby4wLmFzJwogICAgcHVzaGJ5dGVzIDB4MDAwZDc2MmU2MzYxNDE2YzY3NmYyZTMwMmU2MTczCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNzUtMTM4NAogICAgLy8gY29uc3QgY2FBbGdvRGF0YSA9IGFiaUNhbGwoCiAgICAvLyAgIE5GRC5wcm90b3R5cGUucmVhZEZpZWxkLAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IE5GREFwcC5pZCwKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBCeXRlcyhORkRNZXRhS2V5VmVyaWZpZWRBZGRyZXNzZXMpCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0sCiAgICAvLyApLnJldHVyblZhbHVlCiAgICBpbnRjXzIgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2NvbnN0YW50cy50czo0CiAgICAvLyBleHBvcnQgY29uc3QgZmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzNzUtMTM4NAogICAgLy8gY29uc3QgY2FBbGdvRGF0YSA9IGFiaUNhbGwoCiAgICAvLyAgIE5GRC5wcm90b3R5cGUucmVhZEZpZWxkLAogICAgLy8gICB7CiAgICAvLyAgICAgYXBwSWQ6IE5GREFwcC5pZCwKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBCeXRlcyhORkRNZXRhS2V5VmVyaWZpZWRBZGRyZXNzZXMpCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBmZWUsCiAgICAvLyAgIH0sCiAgICAvLyApLnJldHVyblZhbHVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZXh0cmFjdCA2IDAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM4NgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNhQWxnb0RhdGEubGVuZ3RoOyBpICs9IDMyKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA3CgpjYWNoZU1ldGFfd2hpbGVfdG9wQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM4NgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNhQWxnb0RhdGEubGVuZ3RoOyBpICs9IDMyKSB7CiAgICBmcmFtZV9kaWcgMgogICAgbGVuCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMTEKICAgIGZyYW1lX2RpZyA3CiAgICA+CiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfd2hpbGVAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzODcKICAgIC8vIGNvbnN0IGFkZHIgPSBjYUFsZ29EYXRhLnNsaWNlKGksIGkgKyAzMikKICAgIGZyYW1lX2RpZyA3CiAgICBkdXAKICAgIGZyYW1lX2RpZyAxMQogICAgZHVwCiAgICBjb3ZlciAzCiAgICA+PQogICAgZGlnIDEKICAgIGRpZyAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3dhcAogICAgcHVzaGludCAzMiAvLyAzMgogICAgKwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDcKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBkaWcgMgogICAgc3dhcAogICAgc2VsZWN0CiAgICBmcmFtZV9kaWcgMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzODgKICAgIC8vIGlmIChhZGRyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MuYnl0ZXMgJiYgYWRkciA9PT0gYWNjb3VudC5ieXRlcykgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogY2FjaGVNZXRhX3doaWxlX3RvcEAxNAogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogY2FjaGVNZXRhX3doaWxlX3RvcEAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM4OQogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCgpjYWNoZU1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuYWRkcmVzc1ZlcmlmaWVkT25ORkRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjA5CiAgICAvLyBhc3NlcnQodGhpcy5hZGRyZXNzVmVyaWZpZWRPbk5GRChUeG4uc2VuZGVyLCBuZmRBcHApLCBFUlJfVVNFUl9ET0VTX05PVF9PV05fTkZEKQogICAgYXNzZXJ0IC8vIFVzZXIgZG9lcyBub3Qgb3duIHRoaXMgTkZECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjEwCiAgICAvLyBjb25zdCBbdGltZUNoYW5nZWRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhuZmRBcHAsIEJ5dGVzKE5GREdsb2JhbFN0YXRlS2V5c1RpbWVDaGFuZ2VkKSkKICAgIGZyYW1lX2RpZyAtMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoyMQogICAgLy8gZXhwb3J0IGNvbnN0IE5GREdsb2JhbFN0YXRlS2V5c1RpbWVDaGFuZ2VkID0gJ2kudGltZUNoYW5nZWQnCiAgICBieXRlYyA1IC8vICJpLnRpbWVDaGFuZ2VkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYxMAogICAgLy8gY29uc3QgW3RpbWVDaGFuZ2VkQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMobmZkQXBwLCBCeXRlcyhORkRHbG9iYWxTdGF0ZUtleXNUaW1lQ2hhbmdlZCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjExCiAgICAvLyBuZmRUaW1lQ2hhbmdlZCA9IGJ0b2kodGltZUNoYW5nZWRCeXRlcykKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MjUKICAgIC8vIGxldCBuZmRJbXBhY3Q6IHVpbnQ2NCA9IDUwCiAgICBwdXNoaW50IDUwIC8vIDUwCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUyNwogICAgLy8gY29uc3QgW3BhcmVudEFwcElEQnl0ZXMsIHBhcmVudEFwcElEQnl0ZXNFeGlzdF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhORkRBcHAsIEJ5dGVzKE5GREdsb2JhbFN0YXRlS2V5c1BhcmVudEFwcElEKSkKICAgIGZyYW1lX2RpZyAtMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoxOQogICAgLy8gZXhwb3J0IGNvbnN0IE5GREdsb2JhbFN0YXRlS2V5c1BhcmVudEFwcElEID0gJ2kucGFyZW50QXBwSUQnCiAgICBwdXNoYnl0ZXMgImkucGFyZW50QXBwSUQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTI3CiAgICAvLyBjb25zdCBbcGFyZW50QXBwSURCeXRlcywgcGFyZW50QXBwSURCeXRlc0V4aXN0XSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKE5GREFwcCwgQnl0ZXMoTkZER2xvYmFsU3RhdGVLZXlzUGFyZW50QXBwSUQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgNAogICAgc3dhcAogICAgZnJhbWVfYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTI5CiAgICAvLyBpZiAocGFyZW50QXBwSURCeXRlc0V4aXN0ICYmIGJ0b2kocGFyZW50QXBwSURCeXRlcykgPT09IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ha2l0YU5GRCkgewogICAgYnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMjQKICAgIGZyYW1lX2RpZyA0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29uc3RhbnRzLnRzOjEKICAgIC8vIGV4cG9ydCBjb25zdCBHbG9iYWxTdGF0ZUtleUFraXRhREFPID0gJ2FraXRhX2RhbycKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2Rhby9jb25zdGFudHMudHM6NwogICAgLy8gZXhwb3J0IGNvbnN0IEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0ID0gJ2FraXRhX2FsJwogICAgYnl0ZWNfMiAvLyAiYWtpdGFfYWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI2CiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxBa2l0YUFwcExpc3Q+KGFwcExpc3RCeXRlcykKICAgIHB1c2hpbnQgODggLy8gODgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTI5CiAgICAvLyBpZiAocGFyZW50QXBwSURCeXRlc0V4aXN0ICYmIGJ0b2kocGFyZW50QXBwSURCeXRlcykgPT09IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ha2l0YU5GRCkgewogICAgPT0KICAgIGZyYW1lX2RpZyA4CiAgICBmcmFtZV9idXJ5IDkKICAgIGJ6IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTMwCiAgICAvLyBuZmRJbXBhY3QgKz0gNTAKICAgIHB1c2hpbnQgMTAwIC8vIDEwMAogICAgZnJhbWVfYnVyeSA5CgpjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIGZyYW1lX2RpZyA5CiAgICBmcmFtZV9idXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MzMKICAgIC8vIGNvbnN0IHZlcnNpb24gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhORkRBcHAsIEJ5dGVzKE5GREdsb2JhbFN0YXRlS2V5c1ZlcnNpb24pKVswXS5zbGljZSgwLCAyKQogICAgZnJhbWVfZGlnIC0yCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjIwCiAgICAvLyBleHBvcnQgY29uc3QgTkZER2xvYmFsU3RhdGVLZXlzVmVyc2lvbiA9ICdpLnZlcicKICAgIHB1c2hieXRlcyAiaS52ZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTMzCiAgICAvLyBjb25zdCB2ZXJzaW9uID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoTkZEQXBwLCBCeXRlcyhORkRHbG9iYWxTdGF0ZUtleXNWZXJzaW9uKSlbMF0uc2xpY2UoMCwgMikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDIgLy8gMgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDIgLy8gMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUzNQogICAgLy8gaWYgKHZlcnNpb24gIT09IEJ5dGVzKCczLicpKSB7CiAgICBwdXNoYnl0ZXMgIjMuIgogICAgIT0KICAgIGJueiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTE1CiAgICAvLyBjb25zdCBkb21haW4gPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZERvbWFpbikKICAgIGZyYW1lX2RpZyAtMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoyNAogICAgLy8gZXhwb3J0IGNvbnN0IE5GRE1ldGFLZXlWZXJpZmllZERvbWFpbiA9ICd2LmRvbWFpbicKICAgIHB1c2hieXRlcyAidi5kb21haW4iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTE1CiAgICAvLyBjb25zdCBkb21haW4gPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZERvbWFpbikKICAgIGNhbGxzdWIgbmZkUmVhZEZpZWxkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTE2CiAgICAvLyBjb25zdCB0d2l0dGVyID0gdGhpcy5uZmRSZWFkRmllbGQoTkZEQXBwLCBORkRNZXRhS2V5VmVyaWZpZWRUd2l0dGVyKQogICAgZnJhbWVfZGlnIC0yCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjI1CiAgICAvLyBleHBvcnQgY29uc3QgTkZETWV0YUtleVZlcmlmaWVkVHdpdHRlciA9ICd2LnR3aXR0ZXInCiAgICBwdXNoYnl0ZXMgInYudHdpdHRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MTYKICAgIC8vIGNvbnN0IHR3aXR0ZXIgPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZFR3aXR0ZXIpCiAgICBjYWxsc3ViIG5mZFJlYWRGaWVsZAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTE3CiAgICAvLyBjb25zdCBkaXNjb3JkID0gdGhpcy5uZmRSZWFkRmllbGQoTkZEQXBwLCBORkRNZXRhS2V5VmVyaWZpZWREaXNjb3JkKQogICAgZnJhbWVfZGlnIC0yCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjI2CiAgICAvLyBleHBvcnQgY29uc3QgTkZETWV0YUtleVZlcmlmaWVkRGlzY29yZCA9ICd2LmRpc2NvcmQnCiAgICBwdXNoYnl0ZXMgInYuZGlzY29yZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MTcKICAgIC8vIGNvbnN0IGRpc2NvcmQgPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZERpc2NvcmQpCiAgICBjYWxsc3ViIG5mZFJlYWRGaWVsZAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTE4CiAgICAvLyBjb25zdCB0ZWxlZ3JhbSA9IHRoaXMubmZkUmVhZEZpZWxkKE5GREFwcCwgTkZETWV0YUtleVZlcmlmaWVkVGVsZWdyYW0pCiAgICBmcmFtZV9kaWcgLTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb25zdGFudHMudHM6MjcKICAgIC8vIGV4cG9ydCBjb25zdCBORkRNZXRhS2V5VmVyaWZpZWRUZWxlZ3JhbSA9ICd2LnRlbGVncmFtJwogICAgcHVzaGJ5dGVzICJ2LnRlbGVncmFtIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUxOAogICAgLy8gY29uc3QgdGVsZWdyYW0gPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZFRlbGVncmFtKQogICAgY2FsbHN1YiBuZmRSZWFkRmllbGQKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU0MgogICAgLy8gaWYgKGRvbWFpbi5sZW5ndGggPiAwKSB7CiAgICBsZW4KICAgIGZyYW1lX2RpZyA4CiAgICBmcmFtZV9idXJ5IDkKICAgIGJ6IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTQzCiAgICAvLyBuZmRJbXBhY3QgKz0gMTAKICAgIGZyYW1lX2RpZyA4CiAgICBwdXNoaW50IDEwIC8vIDEwCiAgICArCiAgICBmcmFtZV9idXJ5IDkKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDI4OgogICAgZnJhbWVfZGlnIDkKICAgIGR1cAogICAgZnJhbWVfYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTQ3CiAgICAvLyBpZiAodHdpdHRlci5sZW5ndGggPiAwKSB7CiAgICBmcmFtZV9kaWcgNgogICAgbGVuCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDkKICAgIGJ6IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTQ4CiAgICAvLyBuZmRJbXBhY3QgKz0gMjAKICAgIGZyYW1lX2RpZyA4CiAgICBwdXNoaW50IDIwIC8vIDIwCiAgICArCiAgICBmcmFtZV9idXJ5IDkKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDMwOgogICAgZnJhbWVfZGlnIDkKICAgIGR1cAogICAgZnJhbWVfYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTUyCiAgICAvLyBpZiAoZGlzY29yZC5sZW5ndGggPiAwKSB7CiAgICBmcmFtZV9kaWcgMwogICAgbGVuCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDkKICAgIGJ6IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTUzCiAgICAvLyBuZmRJbXBhY3QgKz0gMTAKICAgIGZyYW1lX2RpZyA4CiAgICBwdXNoaW50IDEwIC8vIDEwCiAgICArCiAgICBmcmFtZV9idXJ5IDkKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDMyOgogICAgZnJhbWVfZGlnIDkKICAgIGR1cAogICAgZnJhbWVfYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTU3CiAgICAvLyBpZiAodGVsZWdyYW0ubGVuZ3RoID4gMCkgewogICAgZnJhbWVfZGlnIDUKICAgIGxlbgogICAgc3dhcAogICAgZnJhbWVfYnVyeSA5CiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAzNAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTU1OAogICAgLy8gbmZkSW1wYWN0ICs9IDEwCiAgICBmcmFtZV9kaWcgOAogICAgcHVzaGludCAxMCAvLyAxMAogICAgKwogICAgZnJhbWVfYnVyeSA5CgpjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAzNDoKICAgIGZyYW1lX2RpZyA5CiAgICBmcmFtZV9idXJ5IDgKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjE1CiAgICAvLyBpZiAoYWtpdGFBc3NldElEICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzOTcKICAgIC8vIHJldHVybiBha2l0YU5GVC5jcmVhdG9yID09PSBBY2NvdW50KEFraXRhTkZUQ3JlYXRvckFkZHJlc3MpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvY29uc3RhbnRzLnRzOjYyCiAgICAvLyBleHBvcnQgY29uc3QgQWtpdGFORlRDcmVhdG9yQWRkcmVzcyA9ICdBS0NUUkRLNE9XTldIVFBINFhQS0xOV05MWjMzM1ZFMzVTS1E0RkdRSzNaSkE0RklIQ0xUUkczUEZJJwogICAgYnl0ZWMgNiAvLyBhZGRyIEFLQ1RSREs0T1dOV0hUUEg0WFBLTE5XTkxaMzMzVkUzNVNLUTRGR1FLM1pKQTRGSUhDTFRSRzNQRkkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzOTcKICAgIC8vIHJldHVybiBha2l0YU5GVC5jcmVhdG9yID09PSBBY2NvdW50KEFraXRhTkZUQ3JlYXRvckFkZHJlc3MpCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYxNwogICAgLy8gYXNzZXJ0KHRoaXMuaXNBa2l0YU5GVChha2l0YU5GVCksIEVSUl9OT1RfQU5fQUtJVEFfTkZUKQogICAgYXNzZXJ0IC8vIE5vdCBhbiBha2l0YSBORlQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MTgKICAgIC8vIGFzc2VydCh0aGlzLnVzZXJIb2xkcyhUeG4uc2VuZGVyLCBha2l0YU5GVCksIEVSUl9VU0VSX0RPRVNfTk9UX09XTl9ORlQpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzI3CiAgICAvLyByZXR1cm4gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhY2NvdW50LCBORlQpWzBdID4gMAogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYxOAogICAgLy8gYXNzZXJ0KHRoaXMudXNlckhvbGRzKFR4bi5zZW5kZXIsIGFraXRhTkZUKSwgRVJSX1VTRVJfRE9FU19OT1RfT1dOX05GVCkKICAgIGFzc2VydCAvLyBVc2VyIGRvZXMgbm90IG93biB0aGlzIE5GVAoKY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MjIKICAgIC8vIHN1YnNjcmlwdGlvbkluZGV4OiBuZXcgVWludE42NChzdWJzY3JpcHRpb25JbmRleCksCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MjMKICAgIC8vIE5GRDogbmV3IFVpbnRONjQoTkZEQXBwSUQpLAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjI0CiAgICAvLyBuZmRUaW1lQ2hhbmdlZDogbmV3IFVpbnRONjQobmZkVGltZUNoYW5nZWQpLAogICAgZnJhbWVfZGlnIDEwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjI1CiAgICAvLyBuZmRJbXBhY3Q6IG5ldyBVaW50TjY0KG5mZEltcGFjdCksCiAgICBmcmFtZV9kaWcgOAogICAgZHVwCiAgICBjb3ZlciA0CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjI2CiAgICAvLyBha2l0YU5GVDogbmV3IFVpbnRONjQoYWtpdGFBc3NldElEKSwKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYyMS0xNjI3CiAgICAvLyB0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUgPSBuZXcgYXJjNEltcGFjdE1ldGFWYWx1ZSh7CiAgICAvLyAgIHN1YnNjcmlwdGlvbkluZGV4OiBuZXcgVWludE42NChzdWJzY3JpcHRpb25JbmRleCksCiAgICAvLyAgIE5GRDogbmV3IFVpbnRONjQoTkZEQXBwSUQpLAogICAgLy8gICBuZmRUaW1lQ2hhbmdlZDogbmV3IFVpbnRONjQobmZkVGltZUNoYW5nZWQpLAogICAgLy8gICBuZmRJbXBhY3Q6IG5ldyBVaW50TjY0KG5mZEltcGFjdCksCiAgICAvLyAgIGFraXRhTkZUOiBuZXcgVWludE42NChha2l0YUFzc2V0SUQpLAogICAgLy8gfSkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjE1CiAgICAvLyBleHBvcnQgY29uc3QgSW1wYWN0Qm94UHJlZml4TWV0YSA9ICdtJwogICAgYnl0ZWNfMyAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MjEKICAgIC8vIHRoaXMubWV0YShUeG4uc2VuZGVyKS52YWx1ZSA9IG5ldyBhcmM0SW1wYWN0TWV0YVZhbHVlKHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb25zdGFudHMudHM6MTUKICAgIC8vIGV4cG9ydCBjb25zdCBJbXBhY3RCb3hQcmVmaXhNZXRhID0gJ20nCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MjEtMTYyNwogICAgLy8gdGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlID0gbmV3IGFyYzRJbXBhY3RNZXRhVmFsdWUoewogICAgLy8gICBzdWJzY3JpcHRpb25JbmRleDogbmV3IFVpbnRONjQoc3Vic2NyaXB0aW9uSW5kZXgpLAogICAgLy8gICBORkQ6IG5ldyBVaW50TjY0KE5GREFwcElEKSwKICAgIC8vICAgbmZkVGltZUNoYW5nZWQ6IG5ldyBVaW50TjY0KG5mZFRpbWVDaGFuZ2VkKSwKICAgIC8vICAgbmZkSW1wYWN0OiBuZXcgVWludE42NChuZmRJbXBhY3QpLAogICAgLy8gICBha2l0YU5GVDogbmV3IFVpbnRONjQoYWtpdGFBc3NldElEKSwKICAgIC8vIH0pCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjI5CiAgICAvLyByZXR1cm4gbmZkSW1wYWN0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FjaGVNZXRhX2FmdGVyX3doaWxlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM5MwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYwOQogICAgLy8gYXNzZXJ0KHRoaXMuYWRkcmVzc1ZlcmlmaWVkT25ORkQoVHhuLnNlbmRlciwgbmZkQXBwKSwgRVJSX1VTRVJfRE9FU19OT1RfT1dOX05GRCkKICAgIGIgY2FjaGVNZXRhX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmFkZHJlc3NWZXJpZmllZE9uTkZEQDIwCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LnVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIocGF5bWVudDogdWludDY0LCBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LCBuZXdNb2RpZmllcjogdWludDY0KSAtPiB2b2lkOgp1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYzMgogICAgLy8gdXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsIG5ld01vZGlmaWVyOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYzMwogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcywgRVJSX05PVF9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29uc3RhbnRzLnRzOjEKICAgIC8vIGV4cG9ydCBjb25zdCBHbG9iYWxTdGF0ZUtleUFraXRhREFPID0gJ2FraXRhX2RhbycKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYzMwogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcywgRVJSX05PVF9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5vdCB0aGUgREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjM1CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIoc3Vic2NyaXB0aW9uSW5kZXgpLnZhbHVlID0gbmV3TW9kaWZpZXIKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnN0YW50cy50czoxNgogICAgLy8gZXhwb3J0IGNvbnN0IEltcGFjdEJveFByZWZpeFN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIgPSAncycKICAgIHB1c2hieXRlcyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYzNQogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyKHN1YnNjcmlwdGlvbkluZGV4KS52YWx1ZSA9IG5ld01vZGlmaWVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MzctMTY0NAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icigpLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTY0MAogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MzctMTY0NAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icigpLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGJ6IHVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXJfYm9vbF9mYWxzZUAzCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTMyMgogICAgLy8gc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcjogOV8zMDAsCiAgICBwdXNoaW50IDkzMDAgLy8gOTMwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTYzNy0xNjQ0CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKCkuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcgogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgYnogdXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcl9ib29sX2ZhbHNlQDMKICAgIGludGNfMSAvLyAxCgp1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyX2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MzctMTY0NAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icigpLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgcmV0c3ViCgp1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIHVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXJfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFVzZXJJbXBhY3RXaXRob3V0U29jaWFsKGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFVzZXJJbXBhY3RXaXRob3V0U29jaWFsOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTY1MC0xNjUxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIGdldFVzZXJJbXBhY3RXaXRob3V0U29jaWFsKGFkZHJlc3M6IEFkZHJlc3MpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjUyCiAgICAvLyByZXR1cm4gdGhpcy51c2VySW1wYWN0KGFkZHJlc3MubmF0aXZlLCBmYWxzZSkKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgdXNlckltcGFjdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L3BsdWdpbnMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFVzZXJJbXBhY3QoYWRkcmVzczogYnl0ZXMpIC0+IHVpbnQ2NDoKZ2V0VXNlckltcGFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2NTUtMTY1NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBnZXRVc2VySW1wYWN0KGFkZHJlc3M6IEFkZHJlc3MpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjU3CiAgICAvLyByZXR1cm4gdGhpcy51c2VySW1wYWN0KGFkZHJlc3MubmF0aXZlLCB0cnVlKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1c2VySW1wYWN0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0TWV0YSh1c2VyOiBieXRlcykgLT4gdWludDY0LCB1aW50NjQsIHVpbnQ2NCwgdWludDY0LCB1aW50NjQsIHVpbnQ2NCwgdWludDY0LCB1aW50NjQsIHVpbnQ2NDoKZ2V0TWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9wbHVnaW5zL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2NjAtMTY2MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBnZXRNZXRhKHVzZXI6IEFkZHJlc3MpOiBNZXRhVmFsdWUgewogICAgcHJvdG8gMSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29uc3RhbnRzLnRzOjE1CiAgICAvLyBleHBvcnQgY29uc3QgSW1wYWN0Qm94UHJlZml4TWV0YSA9ICdtJwogICAgYnl0ZWNfMyAvLyAibSIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvcGx1Z2lucy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjYyCiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxNZXRhVmFsdWU+KHRoaXMubWV0YSh1c2VyLm5hdGl2ZSkudmFsdWUuYnl0ZXMpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAyCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIHB1c2hpbnQgMjQgLy8gMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNAogICAgcHVzaGludCAzMiAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA1CiAgICBwdXNoaW50IDQwIC8vIDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDYKICAgIHB1c2hpbnQgMzg0IC8vIDM4NAogICAgZ2V0Yml0CiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBkaWcgNwogICAgcHVzaGludCA0OSAvLyA0OQogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgOAogICAgcHVzaGludCA1NyAvLyA1NwogICAgZXh0cmFjdF91aW50NjQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGUobmV3VmVyc2lvbjogYnl0ZXMpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwLTIxCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIC8vIHVwZGF0ZShuZXdWZXJzaW9uOiBzdHJpbmcpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2NvbnN0YW50cy50czoxCiAgICAvLyBleHBvcnQgY29uc3QgR2xvYmFsU3RhdGVLZXlBa2l0YURBTyA9ICdha2l0YV9kYW8nCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb25zdGFudHMudHM6MwogICAgLy8gZXhwb3J0IGNvbnN0IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiA9ICd2ZXJzaW9uJwogICAgYnl0ZWMgOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIzCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU8oYXBwOiB1aW50NjQpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFwcDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9jb25zdGFudHMudHM6MQogICAgLy8gZXhwb3J0IGNvbnN0IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gPSAnYWtpdGFfZGFvJwogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvY29uc3RhbnRzLnRzOjEKICAgIC8vIGV4cG9ydCBjb25zdCBHbG9iYWxTdGF0ZUtleUFraXRhREFPID0gJ2FraXRhX2RhbycKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gQXBwbGljYXRpb24oYXBwKQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CiAIAAEGCICglKWNHYCgt4fpBYDnhA+AyK+gJSYJCWFraXRhX2RhbwQVH3x1CGFraXRhX2FsAW0MYWtpdGFfYXNzZXRzDWkudGltZUNoYW5nZWQgAoU4jVx1m2PN5+XepbbNXne91JvslQ4U0FbykHCoOJcEbBPt5Ad2ZXJzaW9uMRtBAD+CCARvmBf2BD5u49YEnXT1oQT4HHtiBNV0uxAEKIK7igTqkYDdBDPpLJQ2GgCOCADUALcAmQCFAHEAJgASAAIiQzEZFEQxGEQ2GgEXiAZLI0MxGYEEEkQxGEQ2GgFXAgCIBiMjQzEZFEQxGEQ2GgGIBdZPCBZPCBZPCBZPCBZPCBZPCBaAAQAiTwpUTwgWTwgWTwhPCFBPB1BPBlBPBVBPBFBPA1BPAlBMUClMULAjQzEZFEQxGEQ2GgGIBYEWKUxQsCNDMRkURDEYRDYaAYgFYxYpTFCwI0MxGRREMRhEMRYjCUk4ECMSRDYaARc2GgIXiAUKI0MxGRREMRhENhoBFzYaAhc2GgMXiAKrFilMULAjQzEZFEQxGBRENhoBFzYaAlcCAIgCgiNDigIDsSIoZURJKmVIgSBbi/8WgARAFbhAshqL/rIashqyGCSyECKyAbO0PklXAAQpEkRJVwQgSwGBJFtLAoEsW0sDgTxbSwSBVFtPBYFcW08GcghETwYSSwUiEzIHSU8HCUsGGE8GCAlPBAxOAhAQTgKJigIBIoAARwgri/5QSb5ESSJbTEklW0yBIFsiKGVESScEZUgiW7FMKmVIIltMFoABAVCABMkGiAmyGov+shqyGrIYJLIQIrIBs7Q+SVcABCkSREmBBFtJTwKBDFsyB0wJTCEHDEAAC4sPgYCangEMQQFHIowFIowGi/6LC4j/D4wIjAdBABqLBxaAAXNMUL5EF4sIgQwPQQEUgfoBTAqMBov/QQECsSIoZUSACHBsdWduX2FsZUglW4AE6GmTTbIai/6yGrIYJLIQIrIBs7Q+SVcEAExXAAQpEkQXjASLCr5ESSVbSwGBEFtPAoEYW4wDSwEnBWVIF4sMTwMSRBJEIihlRCcEZUgiW4v+THAASEmMASEHDEEAeiKMAosNSXEDREkVIksBDyJLAk8CTYEDSwIPgQNPA08CTVKMAIv+SwFwAEiMAXELRCcGEkEAQIsBQQA7iwCAA0FLQxJBACCBMosFiwYIiwQIiwMIiwIICEmMCUAABCOMAImLCYwAiYsAgANBT0cSQQAFgRlC/9IiQv/OiwFJIQQPIQRMTYEyCyEECowCQv90IowEQv8wiwiBFAtMCowGQv7niw4hBQ9BABwhBYH6AQshBQqLD0khBg8hBkxNCyEGCowFQv6Yiw5C/+GKAgGxi/8VFlcGAov/UCcHshqyGov+shgkshAisgGztD5JVwAEKRJEVwYAiYoCACcIi/9nKIv+Z4mKAwEiRwaAAEcEi/1BAAoxAIv9iP1dRgJEIowKIowIi/5BAeGL/oAGaS5uYW1lZUixIihlRIAIb3RoZXJfYWxlSCVbSwEVFlcGAk8CUIv+FoAES+IvxrIaTLIashqyGCSyECKyAbO0PklXBABMVwAEKRJEIlNEMQCMALEnB7IagA8ADXYuY2FBbGdvLjAuYXOyGov+shgkshAisgGztD5JVwAEKRJEVwYAjAIijAeLAhVJjAuLBw1BAYmLB0mLC0lOAw9LAUsDTwJNTIEgCEmMB0lLAw9MTwNPAk1JSwIMSwJMTYsCTgJSSYwBMgMTQf+9iwGLABJB/7UjRIv+JwVlSBeMCoEySYwIi/6ADWkucGFyZW50QXBwSURlTIwETIwJQQAZiwQXIihlRCplSIFYWxKLCIwJQQAEgWSMCYsJjAiL/oAFaS52ZXJlSEkVIksBDyJLAk8CTYECSwIPgQJPA08CTVKAAjMuE0AAmIv+gAh2LmRvbWFpboj+S4v+gAl2LnR3aXR0ZXKI/juMBov+gAl2LmRpc2NvcmSI/imMA4v+gAp2LnRlbGVncmFtiP4WjAUViwiMCUEAB4sIgQoIjAmLCUmMCIsGFUyMCUEAB4sIgRQIjAmLCUmMCIsDFUyMCUEAB4sIgQoIjAmLCUmMCIsFFUyMCUEAB4sIgQoIjAmLCYwIi/9BABGL/3ELRCcGEkQxAIv/cABIRIv9Fov+FosKFosISU4EFov/Fk8ETwRQTwNQTwJQTFArMQBQTL+MAIkiQv6zigMAMQAiKGVEcghEEkSL/haAAXNMUIv/Fr+L/TgHMgoSQQAOi/04CIHUSBJBAAMjRIkiQv/6igEBi/8iiPtfiYoBAYv/I4j7VYmKAQkri/9QvkRJIltLASVbSwKBEFtLA4EYW0sEgSBbSwWBKFtLBoGAA1OAAQAiTwJUIlNLB4ExW08IgTlbiYoBADEAIihlRHIIRBJEJwiL/2eJigEAMQAiKGVEcghEEkQoi/9niQ==", "clear": "CoEBQw==" }, "events": [], "templateVariables": {} };
var AkitaSocialImpactParamsFactory = class _AkitaSocialImpactParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,string)void":
            return _AkitaSocialImpactParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the AkitaSocialImpact smart contract using the create(uint64,string)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,string)void",
          args: Array.isArray(params.args) ? params.args : [params.args.akitaDao, params.args.version]
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
            return _AkitaSocialImpactParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the AkitaSocialImpact smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the cacheMeta(uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static cacheMeta(params) {
    return {
      ...params,
      method: "cacheMeta(uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.subscriptionIndex, params.args.nfdAppId, params.args.akitaAssetId]
    };
  }
  /**
   * Constructs a no op call for the updateSubscriptionStateModifier(pay,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateSubscriptionStateModifier(params) {
    return {
      ...params,
      method: "updateSubscriptionStateModifier(pay,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.subscriptionIndex, params.args.newModifier]
    };
  }
  /**
   * Constructs a no op call for the getUserImpactWithoutSocial(address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getUserImpactWithoutSocial(params) {
    return {
      ...params,
      method: "getUserImpactWithoutSocial(address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getUserImpact(address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getUserImpact(params) {
    return {
      ...params,
      method: "getUserImpact(address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getMeta(params) {
    return {
      ...params,
      method: "getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.user]
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
      args: Array.isArray(params.args) ? params.args : [params.args.app]
    };
  }
};
var AkitaSocialImpactFactory = (_class5 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `AkitaSocialImpactFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {;_class5.prototype.__init15.call(this);_class5.prototype.__init16.call(this);_class5.prototype.__init17.call(this);
    this.appFactory = new (0, _appfactory.AppFactory)({
      ...params,
      appSpec: APP_SPEC3
    });
  }
  /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
  get appName() {
    return this.appFactory.appName;
  }
  /** The ARC-56 app spec being used */
  get appSpec() {
    return APP_SPEC3;
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
    return new AkitaSocialImpactClient(this.appFactory.getAppClientById(params));
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
    return new AkitaSocialImpactClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the AkitaSocialImpact smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? AkitaSocialImpactParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? AkitaSocialImpactParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new AkitaSocialImpactClient(result.appClient) };
  }
  /**
   * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  __init15() {this.params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the AkitaSocialImpact smart contract using the create(uint64,string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(AkitaSocialImpactParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the AkitaSocialImpact smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(AkitaSocialImpactParamsFactory.update.update(params));
      }
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init16() {this.createTransaction = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the AkitaSocialImpact smart contract using the create(uint64,string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(AkitaSocialImpactParamsFactory.create.create(params));
      }
    }
  }}
  /**
   * Send calls to the current app
   */
  __init17() {this.send = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the AkitaSocialImpact smart contract using an ABI method call using the create(uint64,string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(AkitaSocialImpactParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new AkitaSocialImpactClient(result.appClient) };
      }
    }
  }}
}, _class5);
var AkitaSocialImpactClient = (_class6 = class _AkitaSocialImpactClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  
  constructor(appClientOrParams) {;_class6.prototype.__init18.call(this);_class6.prototype.__init19.call(this);_class6.prototype.__init20.call(this);_class6.prototype.__init21.call(this);
    this.appClient = appClientOrParams instanceof _appclient.AppClient ? appClientOrParams : new (0, _appclient.AppClient)({
      ...appClientOrParams,
      appSpec: APP_SPEC3
    });
  }
  /**
   * Returns a new `AkitaSocialImpactClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AkitaSocialImpactClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC3 }));
  }
  /**
   * Returns an `AkitaSocialImpactClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AkitaSocialImpactClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC3 }));
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
  __init18() {this.params = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the AkitaSocialImpact smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(AkitaSocialImpactParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialImpact smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `cacheMeta(uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    cacheMeta: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.cacheMeta(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `updateSubscriptionStateModifier(pay,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateSubscriptionStateModifier: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.updateSubscriptionStateModifier(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpactWithoutSocial(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getUserImpactWithoutSocial: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.getUserImpactWithoutSocial(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpact(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getUserImpact: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.getUserImpact(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getMeta: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.getMeta(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.updateAkitaDao(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init19() {this.createTransaction = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the AkitaSocialImpact smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(AkitaSocialImpactParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialImpact smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `cacheMeta(uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    cacheMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.cacheMeta(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `updateSubscriptionStateModifier(pay,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateSubscriptionStateModifier: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.updateSubscriptionStateModifier(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpactWithoutSocial(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getUserImpactWithoutSocial: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.getUserImpactWithoutSocial(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpact(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getUserImpact: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.getUserImpact(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.getMeta(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.updateAkitaDao(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init20() {this.send = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the AkitaSocialImpact smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(AkitaSocialImpactParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialImpact smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `cacheMeta(uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    cacheMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.cacheMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `updateSubscriptionStateModifier(pay,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateSubscriptionStateModifier: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.updateSubscriptionStateModifier(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpactWithoutSocial(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getUserImpactWithoutSocial: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getUserImpactWithoutSocial(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpact(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getUserImpact: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getUserImpact(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.updateAkitaDao(params));
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
    return new _AkitaSocialImpactClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `getUserImpactWithoutSocial(address)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getUserImpactWithoutSocial(params) {
    const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getUserImpactWithoutSocial(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `getUserImpact(address)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getUserImpact(params) {
    const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getUserImpact(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getMeta(params) {
    const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getMeta(params));
    return result.return;
  }
  /**
   * Methods to access state for the current AkitaSocialImpact app
   */
  __init21() {this.state = {
    /**
     * Methods to access global state for the current AkitaSocialImpact app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          version: result.version,
          akitaDao: result.akitaDAO
        };
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
     * Methods to access box state for the current AkitaSocialImpact app
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
       * Get values from the meta map in box state
       */
      meta: {
        /**
         * Get all current values of the meta map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("meta");
        },
        /**
         * Get a current value of the meta map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("meta", key);
        }
      },
      /**
       * Get values from the subscriptionStateModifier map in box state
       */
      subscriptionStateModifier: {
        /**
         * Get all current values of the subscriptionStateModifier map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("subscriptionStateModifier");
        },
        /**
         * Get a current value of the subscriptionStateModifier map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("subscriptionStateModifier", key);
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
       * Add a cacheMeta(uint64,uint64,uint64)uint64 method call against the AkitaSocialImpact contract
       */
      cacheMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cacheMeta(params)));
        return this;
      },
      /**
       * Add a updateSubscriptionStateModifier(pay,uint64,uint64)void method call against the AkitaSocialImpact contract
       */
      updateSubscriptionStateModifier(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateSubscriptionStateModifier(params)));
        return this;
      },
      /**
       * Add a getUserImpactWithoutSocial(address)uint64 method call against the AkitaSocialImpact contract
       */
      getUserImpactWithoutSocial(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getUserImpactWithoutSocial(params)));
        return this;
      },
      /**
       * Add a getUserImpact(address)uint64 method call against the AkitaSocialImpact contract
       */
      getUserImpact(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getUserImpact(params)));
        return this;
      },
      /**
       * Add a getMeta(address)(uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64) method call against the AkitaSocialImpact contract
       */
      getMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getMeta(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the AkitaSocialImpact contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
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
       * Add a clear state call to the AkitaSocialImpact contract
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
}, _class6);

// src/generated/AkitaSocialModerationClient.ts



var APP_SPEC4 = { "name": "AkitaSocialModeration", "structs": { "ObjectAED1FA93": [{ "name": "exists", "type": "bool" }, { "name": "lastActive", "type": "uint64" }], "Action": [{ "name": "content", "type": "byte[36]" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addModerator", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "removeModerator", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "ban", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unban", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "flagPost", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unflagPost", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setModeratorContentFlags", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "uint64", "name": "flags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addAction", "args": [{ "type": "uint64", "name": "actionAppID" }, { "type": "byte[36]", "name": "content" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "removeAction", "args": [{ "type": "uint64", "name": "actionAppID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isBanned", "args": [{ "type": "address", "name": "account" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isModerator", "args": [{ "type": "address", "name": "account" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "moderatorMeta", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(bool,uint64)", "struct": "ObjectAED1FA93" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "moderators": { "keyType": "address", "valueType": "uint64", "desc": "Who is a moderator", "prefix": "ZA==" }, "banned": { "keyType": "address", "valueType": "uint64", "desc": "Who is banned and when they can return", "prefix": "bg==" }, "actions": { "keyType": "uint64", "valueType": "Action", "desc": "Actions usable on an akita post", "prefix": "YQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [745, 818], "errorMessage": "Box must have value" }, { "pc": [1014], "errorMessage": "Bytes has valid prefix" }, { "pc": [661, 717], "errorMessage": "ERR:EACT" }, { "pc": [432], "errorMessage": "ERR:EBAN" }, { "pc": [316], "errorMessage": "ERR:EMOD" }, { "pc": [914], "errorMessage": "ERR:IUPG" }, { "pc": [489], "errorMessage": "ERR:NBAN" }, { "pc": [291, 351, 640, 697, 882, 949], "errorMessage": "ERR:NDAO" }, { "pc": [368, 406, 463, 517, 549, 590], "errorMessage": "ERR:NMOD" }, { "pc": [284, 344, 633, 690, 875, 942], "errorMessage": "application exists" }, { "pc": [278, 338, 627, 684, 869, 886, 936, 964], "errorMessage": "check GlobalState exists" }, { "pc": [233, 852, 1034], "errorMessage": "invalid array length header" }, { "pc": [241, 860], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [272, 332, 383, 449, 503, 535, 567, 731, 778, 805], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [621], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [252, 391, 575, 611, 677, 929], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1039], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::PostValue" }, { "pc": [1026], "errorMessage": "invalid tail pointer at index 9 of (uint8[32],uint64,uint64,bool1,uint64,bool1,uint8,uint64,uint64,(len+uint8[]))" }, { "pc": [1021], "errorMessage": "invalid tuple encoding" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDMyIDgKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgImQiICJ3YWxsZXQiICJFUlI6TkRBTyIgIkVSUjpOTU9EIiAweDE1MWY3Yzc1ICJuIiAweDAwICJ2ZXJzaW9uIiAiRVJSOkVBQ1QiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsTW9kZXJhdGlvbiBleHRlbmRzIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUAyCgptYWluX3N3aXRjaF9jYXNlX25leHRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEzCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxNb2RlcmF0aW9uIGV4dGVuZHMgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIwCiAgICBwdXNoYnl0ZXNzIDB4Y2NkOWI4ZDMgMHgwM2UzYWIyMiAweDdhODMzYjQwIDB4YTBkMjMyMWQgMHg2MWRjZDJlZiAweDc5NjBlYTc2IDB4ZmJmNGRkMzUgMHhkYTZhZGNkOSAweGYxNDkyYmY0IDB4ODQyNjljNzggMHg3MTJlZTgyMyAweDFmM2M2MThjIDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImFkZE1vZGVyYXRvcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgInJlbW92ZU1vZGVyYXRvcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgImJhbihhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bmJhbihhZGRyZXNzKXZvaWQiLCBtZXRob2QgImZsYWdQb3N0KGJ5dGVbMzJdKXZvaWQiLCBtZXRob2QgInVuZmxhZ1Bvc3QoYnl0ZVszMl0pdm9pZCIsIG1ldGhvZCAic2V0TW9kZXJhdG9yQ29udGVudEZsYWdzKGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJhZGRBY3Rpb24odWludDY0LGJ5dGVbMzZdKXZvaWQiLCBtZXRob2QgInJlbW92ZUFjdGlvbih1aW50NjQpdm9pZCIsIG1ldGhvZCAiaXNCYW5uZWQoYWRkcmVzcylib29sIiwgbWV0aG9kICJpc01vZGVyYXRvcihhZGRyZXNzKWJvb2wiLCBtZXRob2QgIm1vZGVyYXRvck1ldGEoYWRkcmVzcykoYm9vbCx1aW50NjQpIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGFkZE1vZGVyYXRvciByZW1vdmVNb2RlcmF0b3IgYmFuIHVuYmFuIGZsYWdQb3N0IHVuZmxhZ1Bvc3Qgc2V0TW9kZXJhdG9yQ29udGVudEZsYWdzIGFkZEFjdGlvbiByZW1vdmVBY3Rpb24gaXNCYW5uZWQgaXNNb2RlcmF0b3IgbW9kZXJhdG9yTWV0YSB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTgKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsTW9kZXJhdGlvbiBleHRlbmRzIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4Y2Q5YWQ2N2UgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjI2CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjI4CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjI5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoyNgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmFkZE1vZGVyYXRvcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZE1vZGVyYXRvcjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czozNAogICAgLy8gYWRkTW9kZXJhdG9yKGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MzUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MzUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGFkZE1vZGVyYXRvcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKYWRkTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBieXRlY18xIC8vICJkIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjM2CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMubW9kZXJhdG9ycyhhZGRyZXNzKS5leGlzdHMsIEVSUl9BTFJFQURZX0FfTU9ERVJBVE9SKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBhZGRNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOkVNT0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RU1PRAoKYWRkTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MzcKICAgIC8vIHRoaXMubW9kZXJhdG9ycyhhZGRyZXNzKS5jcmVhdGUoKQogICAgZGlnIDEKICAgIGludGNfMyAvLyA4CiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjM0CiAgICAvLyBhZGRNb2RlcmF0b3IoYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjpBa2l0YVNvY2lhbE1vZGVyYXRpb24ucmVtb3ZlTW9kZXJhdG9yW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVtb3ZlTW9kZXJhdG9yOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjQwCiAgICAvLyByZW1vdmVNb2RlcmF0b3IoYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogcmVtb3ZlTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgpyZW1vdmVNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoYWRkcmVzcykuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVtb3ZlTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0IC8vICJFUlI6Tk1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTU9ECgpyZW1vdmVNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MwogICAgLy8gdGhpcy5tb2RlcmF0b3JzKGFkZHJlc3MpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MAogICAgLy8gcmVtb3ZlTW9kZXJhdG9yKGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmJhbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmJhbjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0NgogICAgLy8gYmFuKGFkZHJlc3M6IEFjY291bnQsIGV4cGlyYXRpb246IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubW9kZXJhdG9ycyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9OT1RfQV9NT0RFUkFUT1IpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYmFuX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTU9ECgpiYW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoyMAogICAgLy8gYmFubmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4QmFubmVkIH0pCiAgICBieXRlYyA2IC8vICJuIgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmFubmVkKGFkZHJlc3MpLmV4aXN0cywgRVJSX0FMUkVBRFlfQkFOTkVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBiYW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOkVCQU4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUJBTgoKYmFuX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDkKICAgIC8vIHRoaXMuYmFubmVkKGFkZHJlc3MpLnZhbHVlID0gZXhwaXJhdGlvbgogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDYKICAgIC8vIGJhbihhZGRyZXNzOiBBY2NvdW50LCBleHBpcmF0aW9uOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLnVuYmFuW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5iYW46CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTIKICAgIC8vIHVuYmFuKGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBieXRlY18xIC8vICJkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjUzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuYmFuX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTU9ECgp1bmJhbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjIwCiAgICAvLyBiYW5uZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhCYW5uZWQgfSkKICAgIGJ5dGVjIDYgLy8gIm4iCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJhbm5lZChhZGRyZXNzKS5leGlzdHMsIEVSUl9VU0VSX05PVF9CQU5ORUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bmJhbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6TkJBTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQkFOCgp1bmJhbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjU1CiAgICAvLyB0aGlzLmJhbm5lZChhZGRyZXNzKS5kZWxldGUoKQogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTIKICAgIC8vIHVuYmFuKGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmZsYWdQb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKZmxhZ1Bvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo1OAogICAgLy8gZmxhZ1Bvc3QocmVmOiBieXRlczwzMj4pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBieXRlY18xIC8vICJkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjU5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGZsYWdQb3N0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTU9ECgpmbGFnUG9zdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjYwCiAgICAvLyB0aGlzLmFwcGx5TW9kZXJhdGlvbihyZWYsIHRydWUsIHRydWUsIDAsIGZhbHNlKQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBjYWxsc3ViIGFwcGx5TW9kZXJhdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTgKICAgIC8vIGZsYWdQb3N0KHJlZjogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi51bmZsYWdQb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKdW5mbGFnUG9zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjYzCiAgICAvLyB1bmZsYWdQb3N0KHJlZjogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgYnl0ZWNfMSAvLyAiZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjY0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubW9kZXJhdG9ycyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9OT1RfQV9NT0RFUkFUT1IpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bmZsYWdQb3N0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6Tk1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTU9ECgp1bmZsYWdQb3N0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NjUKICAgIC8vIHRoaXMuYXBwbHlNb2RlcmF0aW9uKHJlZiwgdHJ1ZSwgZmFsc2UsIDAsIGZhbHNlKQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgY2FsbHN1YiBhcHBseU1vZGVyYXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjYzCiAgICAvLyB1bmZsYWdQb3N0KHJlZjogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5zZXRNb2RlcmF0b3JDb250ZW50RmxhZ3Nbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRNb2RlcmF0b3JDb250ZW50RmxhZ3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2OAogICAgLy8gc2V0TW9kZXJhdG9yQ29udGVudEZsYWdzKHJlZjogYnl0ZXM8MzI+LCBmbGFnczogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgYnl0ZWNfMSAvLyAiZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubW9kZXJhdG9ycyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9OT1RfQV9NT0RFUkFUT1IpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRNb2RlcmF0b3JDb250ZW50RmxhZ3NfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOTU9EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NT0QKCnNldE1vZGVyYXRvckNvbnRlbnRGbGFnc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjcwCiAgICAvLyB0aGlzLmFwcGx5TW9kZXJhdGlvbihyZWYsIGZhbHNlLCBmYWxzZSwgZmxhZ3MsIHRydWUpCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGFwcGx5TW9kZXJhdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NjgKICAgIC8vIHNldE1vZGVyYXRvckNvbnRlbnRGbGFncyhyZWY6IGJ5dGVzPDMyPiwgZmxhZ3M6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjpBa2l0YVNvY2lhbE1vZGVyYXRpb24uYWRkQWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkQWN0aW9uOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEwMQogICAgLy8gYWRkQWN0aW9uKGFjdGlvbkFwcElEOiB1aW50NjQsIGNvbnRlbnQ6IENJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTAyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogYWRkQWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgphZGRBY3Rpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5hY3Rpb25zKGFjdGlvbkFwcElEKS5leGlzdHMsIEVSUl9BTFJFQURZX0FOX0FDVElPTikKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoyMgogICAgLy8gYWN0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjdGlvbj4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4QWN0aW9ucyB9KQogICAgcHVzaGJ5dGVzICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTAzCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYWN0aW9ucyhhY3Rpb25BcHBJRCkuZXhpc3RzLCBFUlJfQUxSRUFEWV9BTl9BQ1RJT04pCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFkZEFjdGlvbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgOSAvLyAiRVJSOkVBQ1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUFDVAoKYWRkQWN0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTA0CiAgICAvLyB0aGlzLmFjdGlvbnMoYWN0aW9uQXBwSUQpLnZhbHVlID0geyBjb250ZW50IH0KICAgIGRpZyAyCiAgICBkaWcgMQogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTAxCiAgICAvLyBhZGRBY3Rpb24oYWN0aW9uQXBwSUQ6IHVpbnQ2NCwgY29udGVudDogQ0lEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5yZW1vdmVBY3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpyZW1vdmVBY3Rpb246CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTA3CiAgICAvLyByZW1vdmVBY3Rpb24oYWN0aW9uQXBwSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTA4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogcmVtb3ZlQWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgpyZW1vdmVBY3Rpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFjdGlvbnMoYWN0aW9uQXBwSUQpLmV4aXN0cywgRVJSX0FMUkVBRFlfQU5fQUNUSU9OKQogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoyMgogICAgLy8gYWN0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjdGlvbj4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4QWN0aW9ucyB9KQogICAgcHVzaGJ5dGVzICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTA5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hY3Rpb25zKGFjdGlvbkFwcElEKS5leGlzdHMsIEVSUl9BTFJFQURZX0FOX0FDVElPTikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlbW92ZUFjdGlvbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgOSAvLyAiRVJSOkVBQ1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUFDVAoKcmVtb3ZlQWN0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTEwCiAgICAvLyB0aGlzLmFjdGlvbnMoYWN0aW9uQXBwSUQpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDcKICAgIC8vIHJlbW92ZUFjdGlvbihhY3Rpb25BcHBJRDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5pc0Jhbm5lZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzQmFubmVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTE1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MjAKICAgIC8vIGJhbm5lZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEJhbm5lZCB9KQogICAgYnl0ZWMgNiAvLyAibiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMTcKICAgIC8vIHJldHVybiB0aGlzLmJhbm5lZChhY2NvdW50KS5leGlzdHMgJiYgdGhpcy5iYW5uZWQoYWNjb3VudCkudmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGlzQmFubmVkX2Jvb2xfZmFsc2VANAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYnogaXNCYW5uZWRfYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKaXNCYW5uZWRfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTE1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDcgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppc0Jhbm5lZF9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBpc0Jhbm5lZF9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmlzTW9kZXJhdG9yW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNNb2RlcmF0b3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyMgogICAgLy8gcmV0dXJuIHRoaXMubW9kZXJhdG9ycyhhY2NvdW50KS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDcgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5tb2RlcmF0b3JNZXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKbW9kZXJhdG9yTWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgYnl0ZWNfMSAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMjcKICAgIC8vIGlmICh0aGlzLm1vZGVyYXRvcnModXNlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IG1vZGVyYXRvck1ldGFfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMzAKICAgIC8vIGxhc3RBY3RpdmU6IHRoaXMubW9kZXJhdG9ycyh1c2VyKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTI4LTEzMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZXhpc3RzOiB0cnVlLAogICAgLy8gICBsYXN0QWN0aXZlOiB0aGlzLm1vZGVyYXRvcnModXNlcikudmFsdWUKICAgIC8vIH0KICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDgwCiAgICBzd2FwCiAgICBjb25jYXQKCm1vZGVyYXRvck1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLm1vZGVyYXRvck1ldGFANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptb2RlcmF0b3JNZXRhX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEzMwogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiBmYWxzZSwgbGFzdEFjdGl2ZTogMCB9CiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIG1vZGVyYXRvck1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLm1vZGVyYXRvck1ldGFANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmFwcGx5TW9kZXJhdGlvbihyZWY6IGJ5dGVzLCB1cGRhdGVGbGFnZ2VkOiB1aW50NjQsIGZsYWdnZWRWYWx1ZTogdWludDY0LCBmbGFnc1ZhbHVlOiB1aW50NjQsIHVwZGF0ZUZsYWdzOiB1aW50NjQpIC0+IHZvaWQ6CmFwcGx5TW9kZXJhdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjc5LTg1CiAgICAvLyBwcml2YXRlIGFwcGx5TW9kZXJhdGlvbigKICAgIC8vICAgcmVmOiBieXRlczwzMj4sCiAgICAvLyAgIHVwZGF0ZUZsYWdnZWQ6IGJvb2xlYW4sCiAgICAvLyAgIGZsYWdnZWRWYWx1ZTogYm9vbGVhbiwKICAgIC8vICAgZmxhZ3NWYWx1ZTogdWludDY0LAogICAgLy8gICB1cGRhdGVGbGFnczogYm9vbGVhbiwKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gNSAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjg2CiAgICAvLyBjb25zdCB7IHNvY2lhbCB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo4NgogICAgLy8gY29uc3QgeyBzb2NpYWwgfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIHB1c2hieXRlcyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6ODYKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo4Ny05MAogICAgLy8gY29uc3QgcG9zdCA9IGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsLnByb3RvdHlwZS5nZXRQb3N0Pih7CiAgICAvLyAgIGFwcElkOiBzb2NpYWwsCiAgICAvLyAgIGFyZ3M6IFtyZWZdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg5OGI4MWY3OCAvLyBtZXRob2QgImdldFBvc3QoYnl0ZVszMl0pKGFkZHJlc3MsdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCxib29sLHVpbnQ4LHVpbnQ2NCx1aW50NjQsYnl0ZVtdKSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXBuIDIKICAgIGV4dHJhY3QgNCAwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIHB1c2hpbnQgNzUKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNzcKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggOSBvZiAodWludDhbMzJdLHVpbnQ2NCx1aW50NjQsYm9vbDEsdWludDY0LGJvb2wxLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbit1aW50OFtdKSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDc5CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc29jaWFsL3R5cGVzLnRzOjpQb3N0VmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjkyCiAgICAvLyBjb25zdCBuZXh0RmxhZ2dlZDogYm9vbGVhbiA9IHVwZGF0ZUZsYWdnZWQgPyBmbGFnZ2VkVmFsdWUgOiBwb3N0LmFnYWluc3RDb250ZW50UG9saWN5CiAgICBmcmFtZV9kaWcgLTQKICAgIGJ6IGFwcGx5TW9kZXJhdGlvbl90ZXJuYXJ5X2ZhbHNlQDMKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfYnVyeSAwCgphcHBseU1vZGVyYXRpb25fdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OTMKICAgIC8vIGNvbnN0IG5leHRGbGFnczogdWludDY0ID0gdXBkYXRlRmxhZ3MgPyBmbGFnc1ZhbHVlIDogcG9zdC5tb2RlcmF0b3JGbGFncwogICAgZnJhbWVfZGlnIC0xCiAgICBieiBhcHBseU1vZGVyYXRpb25fdGVybmFyeV9mYWxzZUA2CiAgICBmcmFtZV9kaWcgLTIKCmFwcGx5TW9kZXJhdGlvbl90ZXJuYXJ5X21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo5NS05OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLnNldFBvc3RNb2RlcmF0aW9uPih7CiAgICAvLyAgIGFwcElkOiBzb2NpYWwsCiAgICAvLyAgIGFyZ3M6IFtyZWYsIG5leHRGbGFnZ2VkLCBuZXh0RmxhZ3NdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OTcKICAgIC8vIGFyZ3M6IFtyZWYsIG5leHRGbGFnZ2VkLCBuZXh0RmxhZ3NdCiAgICBieXRlYyA3IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgMAogICAgc2V0Yml0CiAgICBzd2FwCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo5NS05OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLnNldFBvc3RNb2RlcmF0aW9uPih7CiAgICAvLyAgIGFwcElkOiBzb2NpYWwsCiAgICAvLyAgIGFyZ3M6IFtyZWYsIG5leHRGbGFnZ2VkLCBuZXh0RmxhZ3NdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NTEwZWRlYjYgLy8gbWV0aG9kICJzZXRQb3N0TW9kZXJhdGlvbihieXRlWzMyXSxib29sLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKYXBwbHlNb2RlcmF0aW9uX3Rlcm5hcnlfZmFsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjkzCiAgICAvLyBjb25zdCBuZXh0RmxhZ3M6IHVpbnQ2NCA9IHVwZGF0ZUZsYWdzID8gZmxhZ3NWYWx1ZSA6IHBvc3QubW9kZXJhdG9yRmxhZ3MKICAgIGZyYW1lX2RpZyAyCiAgICBwdXNoaW50IDcxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYiBhcHBseU1vZGVyYXRpb25fdGVybmFyeV9tZXJnZUA3CgphcHBseU1vZGVyYXRpb25fdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OTIKICAgIC8vIGNvbnN0IG5leHRGbGFnZ2VkOiBib29sZWFuID0gdXBkYXRlRmxhZ2dlZCA/IGZsYWdnZWRWYWx1ZSA6IHBvc3QuYWdhaW5zdENvbnRlbnRQb2xpY3kKICAgIGZyYW1lX2RpZyAzCiAgICBwdXNoaW50IDQ1NgogICAgZ2V0Yml0CiAgICBmcmFtZV9idXJ5IDAKICAgIGIgYXBwbHlNb2RlcmF0aW9uX3Rlcm5hcnlfbWVyZ2VANAo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAEgCCYKCWFraXRhX2RhbwFkBndhbGxldAhFUlI6TkRBTwhFUlI6Tk1PRAQVH3x1AW4BAAd2ZXJzaW9uCEVSUjpFQUNUgATqkYDdNhoAjgEAgzEZFEQxGEEAbIIOBMzZuNMEA+OrIgR6gztABKDSMh0EYdzS7wR5YOp2BPv03TUE2mrc2QTxSSv0BIQmnHgEcS7oIwQfPGGMBDPpLJQEhU3t4DYaAI4OAEEAfQCwAPIBKQFJAWkBlAHWAg0CPAJXAtMAAQAjQ4AEzZrWfjYaAI4BAA0AMRmBBBIxGBBEQgJrNhoBSSJZgQIISwEVEkRXAgA2GgJJFSUSRBcnCE8CZyhMZyNDIjYaAUkVJBJEMQAiKGVEKmVIcghEEkAAAyuwAClLAVBJRQO9RQFBAAyACEVSUjpFTU9EsABLASW5SCNDIjYaAUkVJBJEMQAiKGVEKmVIcghEEkAAAyuwAClLAVBJRQO9RQFAAAQnBLAASwG8SCNDIjYaAUkVJBJENhoCSRUlEkQXKTEAUL1FAUAABCcEsAAnBksCUElFBL1FAUEADIAIRVJSOkVCQU6wAEkWSwNMvyNDIjYaAUkVJBJEKTEAUL1FAUAABCcEsAAnBksBUElFA71FAUAADIAIRVJSOk5CQU6wAEsBvEgjQzYaAUkVJBJEKTEAUL1FAUAABCcEsABJI0kiSYgBriNDNhoBSRUkEkQpMQBQvUUBQAAEJwSwAEkjIkcCiAGOI0M2GgFJFSQSRDYaAkkVJRJEFykxAFC9RQFAAAQnBLAASwEiSUsDI4gBYyNDIjYaAUkVJRJEFzYaAkkVgSQSRDEAIihlRCplSHIIRBJAAAMrsABLARaAAWFMUElFBL1FAUEABCcJsABLAksBvyNDIjYaAUkVJRJEFzEAIihlRCplSHIIRBJAAAMrsABJFoABYUxQSUUDvUUBQAAEJwmwAEsBvEgjQzYaAUkVJBJEJwZMUEm9RQFBABhJvkQXMgcNQQAOIycHIk8CVCcFTFCwI0MiQv/vNhoBSRUkEkQpTFC9RQEnByJPAlQnBUxQsCNDNhoBSRUkEkQpTFBJvUUBQQARSb5EFxaAAYBMUCcFTFCwI0OACQAAAAAAAAAAAEL/6zYaAUkiWYECCEsBFRJEVwIAMQAiKGVEKmVIcghEEkAAAyuwACIoZUSAA3BhbGVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAJwhLAWcjQzYaAUkVJRJEFzEAIihlRCplSHIIRBJAAAMrsAAoSwFnI0OKBQCAACIoZUSAA3NhbGVIIltJsbIYgASYuB94shqL+7IagQayECKyAbO0PkcCVwQASU8CVwAEJwUSREkVSwGBS1lJgU0SRE8CTEsCUiJZgU8IEkSL/EEAOov9jACL/0EAKYv+sScHIosAVEwWiwGyGIAEUQ7etrIai/uyGkyyGrIagQayECKyAbOJiwKBR1tC/9GLA4HIA1OMAEL/vw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var AkitaSocialModerationParamsFactory = class _AkitaSocialModerationParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64)void":
            return _AkitaSocialModerationParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the AkitaSocialModeration smart contract using the create(string,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.akitaDao]
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
            return _AkitaSocialModerationParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the AkitaSocialModeration smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the addModerator(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addModerator(params) {
    return {
      ...params,
      method: "addModerator(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the removeModerator(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static removeModerator(params) {
    return {
      ...params,
      method: "removeModerator(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the ban(address,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static ban(params) {
    return {
      ...params,
      method: "ban(address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.expiration]
    };
  }
  /**
   * Constructs a no op call for the unban(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unban(params) {
    return {
      ...params,
      method: "unban(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the flagPost(byte[32])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static flagPost(params) {
    return {
      ...params,
      method: "flagPost(byte[32])void",
      args: Array.isArray(params.args) ? params.args : [params.args.ref]
    };
  }
  /**
   * Constructs a no op call for the unflagPost(byte[32])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unflagPost(params) {
    return {
      ...params,
      method: "unflagPost(byte[32])void",
      args: Array.isArray(params.args) ? params.args : [params.args.ref]
    };
  }
  /**
   * Constructs a no op call for the setModeratorContentFlags(byte[32],uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setModeratorContentFlags(params) {
    return {
      ...params,
      method: "setModeratorContentFlags(byte[32],uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.ref, params.args.flags]
    };
  }
  /**
   * Constructs a no op call for the addAction(uint64,byte[36])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addAction(params) {
    return {
      ...params,
      method: "addAction(uint64,byte[36])void",
      args: Array.isArray(params.args) ? params.args : [params.args.actionAppId, params.args.content]
    };
  }
  /**
   * Constructs a no op call for the removeAction(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static removeAction(params) {
    return {
      ...params,
      method: "removeAction(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.actionAppId]
    };
  }
  /**
   * Constructs a no op call for the isBanned(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isBanned(params) {
    return {
      ...params,
      method: "isBanned(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.account]
    };
  }
  /**
   * Constructs a no op call for the isModerator(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isModerator(params) {
    return {
      ...params,
      method: "isModerator(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.account]
    };
  }
  /**
   * Constructs a no op call for the moderatorMeta(address)(bool,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static moderatorMeta(params) {
    return {
      ...params,
      method: "moderatorMeta(address)(bool,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.user]
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
var AkitaSocialModerationFactory = (_class7 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `AkitaSocialModerationFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {;_class7.prototype.__init22.call(this);_class7.prototype.__init23.call(this);_class7.prototype.__init24.call(this);
    this.appFactory = new (0, _appfactory.AppFactory)({
      ...params,
      appSpec: APP_SPEC4
    });
  }
  /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
  get appName() {
    return this.appFactory.appName;
  }
  /** The ARC-56 app spec being used */
  get appSpec() {
    return APP_SPEC4;
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
    return new AkitaSocialModerationClient(this.appFactory.getAppClientById(params));
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
    return new AkitaSocialModerationClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the AkitaSocialModeration smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? AkitaSocialModerationParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? AkitaSocialModerationParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new AkitaSocialModerationClient(result.appClient) };
  }
  /**
   * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  __init22() {this.params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the AkitaSocialModeration smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(AkitaSocialModerationParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the AkitaSocialModeration smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(AkitaSocialModerationParamsFactory.update.update(params));
      }
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init23() {this.createTransaction = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the AkitaSocialModeration smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(AkitaSocialModerationParamsFactory.create.create(params));
      }
    }
  }}
  /**
   * Send calls to the current app
   */
  __init24() {this.send = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the AkitaSocialModeration smart contract using an ABI method call using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(AkitaSocialModerationParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new AkitaSocialModerationClient(result.appClient) };
      }
    }
  }}
}, _class7);
var AkitaSocialModerationClient = (_class8 = class _AkitaSocialModerationClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  
  constructor(appClientOrParams) {;_class8.prototype.__init25.call(this);_class8.prototype.__init26.call(this);_class8.prototype.__init27.call(this);_class8.prototype.__init28.call(this);
    this.appClient = appClientOrParams instanceof _appclient.AppClient ? appClientOrParams : new (0, _appclient.AppClient)({
      ...appClientOrParams,
      appSpec: APP_SPEC4
    });
  }
  /**
   * Returns a new `AkitaSocialModerationClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AkitaSocialModerationClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC4 }));
  }
  /**
   * Returns an `AkitaSocialModerationClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AkitaSocialModerationClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC4 }));
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
  __init25() {this.params = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the AkitaSocialModeration smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(AkitaSocialModerationParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialModeration smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `addModerator(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addModerator: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.addModerator(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `removeModerator(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    removeModerator: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.removeModerator(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `ban(address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    ban: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.ban(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `unban(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unban: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.unban(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `flagPost(byte[32])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    flagPost: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.flagPost(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `unflagPost(byte[32])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unflagPost: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.unflagPost(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `setModeratorContentFlags(byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setModeratorContentFlags: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.setModeratorContentFlags(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `addAction(uint64,byte[36])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addAction: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.addAction(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `removeAction(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    removeAction: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.removeAction(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `isBanned(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isBanned: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.isBanned(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `isModerator(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isModerator: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.isModerator(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `moderatorMeta(address)(bool,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    moderatorMeta: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.moderatorMeta(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(AkitaSocialModerationParamsFactory.opUp(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init26() {this.createTransaction = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the AkitaSocialModeration smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(AkitaSocialModerationParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialModeration smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `addModerator(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addModerator: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.addModerator(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `removeModerator(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    removeModerator: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.removeModerator(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `ban(address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    ban: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.ban(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `unban(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unban: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.unban(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `flagPost(byte[32])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    flagPost: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.flagPost(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `unflagPost(byte[32])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unflagPost: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.unflagPost(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `setModeratorContentFlags(byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setModeratorContentFlags: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.setModeratorContentFlags(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `addAction(uint64,byte[36])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addAction: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.addAction(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `removeAction(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    removeAction: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.removeAction(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `isBanned(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isBanned: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.isBanned(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `isModerator(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isModerator: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.isModerator(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `moderatorMeta(address)(bool,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    moderatorMeta: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.moderatorMeta(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AkitaSocialModerationParamsFactory.opUp(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init27() {this.send = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the AkitaSocialModeration smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(AkitaSocialModerationParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AkitaSocialModeration smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `addModerator(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addModerator: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.addModerator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `removeModerator(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    removeModerator: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.removeModerator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `ban(address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    ban: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.ban(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `unban(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unban: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.unban(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `flagPost(byte[32])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    flagPost: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.flagPost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `unflagPost(byte[32])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unflagPost: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.unflagPost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `setModeratorContentFlags(byte[32],uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setModeratorContentFlags: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.setModeratorContentFlags(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `addAction(uint64,byte[36])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addAction: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.addAction(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `removeAction(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    removeAction: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.removeAction(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `isBanned(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isBanned: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.isBanned(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `isModerator(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isModerator: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.isModerator(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `moderatorMeta(address)(bool,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    moderatorMeta: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.moderatorMeta(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialModeration smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.opUp(params));
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
    return new _AkitaSocialModerationClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialModeration smart contract using the `isBanned(address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isBanned(params) {
    const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.isBanned(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialModeration smart contract using the `isModerator(address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isModerator(params) {
    const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.isModerator(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialModeration smart contract using the `moderatorMeta(address)(bool,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async moderatorMeta(params) {
    const result = await this.appClient.send.call(AkitaSocialModerationParamsFactory.moderatorMeta(params));
    return result.return;
  }
  /**
   * Methods to access state for the current AkitaSocialModeration app
   */
  __init28() {this.state = {
    /**
     * Methods to access global state for the current AkitaSocialModeration app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          version: result.version,
          akitaDao: result.akitaDAO
        };
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
     * Methods to access box state for the current AkitaSocialModeration app
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
       * Get values from the moderators map in box state
       */
      moderators: {
        /**
         * Get all current values of the moderators map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("moderators");
        },
        /**
         * Get a current value of the moderators map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("moderators", key);
        }
      },
      /**
       * Get values from the banned map in box state
       */
      banned: {
        /**
         * Get all current values of the banned map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("banned");
        },
        /**
         * Get a current value of the banned map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("banned", key);
        }
      },
      /**
       * Get values from the actions map in box state
       */
      actions: {
        /**
         * Get all current values of the actions map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("actions");
        },
        /**
         * Get a current value of the actions map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("actions", key);
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
       * Add a addModerator(address)void method call against the AkitaSocialModeration contract
       */
      addModerator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addModerator(params)));
        return this;
      },
      /**
       * Add a removeModerator(address)void method call against the AkitaSocialModeration contract
       */
      removeModerator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.removeModerator(params)));
        return this;
      },
      /**
       * Add a ban(address,uint64)void method call against the AkitaSocialModeration contract
       */
      ban(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.ban(params)));
        return this;
      },
      /**
       * Add a unban(address)void method call against the AkitaSocialModeration contract
       */
      unban(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unban(params)));
        return this;
      },
      /**
       * Add a flagPost(byte[32])void method call against the AkitaSocialModeration contract
       */
      flagPost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.flagPost(params)));
        return this;
      },
      /**
       * Add a unflagPost(byte[32])void method call against the AkitaSocialModeration contract
       */
      unflagPost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unflagPost(params)));
        return this;
      },
      /**
       * Add a setModeratorContentFlags(byte[32],uint64)void method call against the AkitaSocialModeration contract
       */
      setModeratorContentFlags(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setModeratorContentFlags(params)));
        return this;
      },
      /**
       * Add a addAction(uint64,byte[36])void method call against the AkitaSocialModeration contract
       */
      addAction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addAction(params)));
        return this;
      },
      /**
       * Add a removeAction(uint64)void method call against the AkitaSocialModeration contract
       */
      removeAction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.removeAction(params)));
        return this;
      },
      /**
       * Add a isBanned(address)bool method call against the AkitaSocialModeration contract
       */
      isBanned(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isBanned(params)));
        return this;
      },
      /**
       * Add a isModerator(address)bool method call against the AkitaSocialModeration contract
       */
      isModerator(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isModerator(params)));
        return this;
      },
      /**
       * Add a moderatorMeta(address)(bool,uint64) method call against the AkitaSocialModeration contract
       */
      moderatorMeta(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.moderatorMeta(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the AkitaSocialModeration contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the AkitaSocialModeration contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
       * Add a clear state call to the AkitaSocialModeration contract
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
}, _class8);

// src/social/types.ts
var RefType = /* @__PURE__ */ ((RefType2) => {
  RefType2[RefType2["Post"] = 1] = "Post";
  RefType2[RefType2["Asset"] = 2] = "Asset";
  RefType2[RefType2["Address"] = 3] = "Address";
  RefType2[RefType2["App"] = 4] = "App";
  RefType2[RefType2["Collection"] = 5] = "Collection";
  return RefType2;
})(RefType || {});
var PayWallType = /* @__PURE__ */ ((PayWallType2) => {
  PayWallType2[PayWallType2["OneTimePayment"] = 0] = "OneTimePayment";
  PayWallType2[PayWallType2["Subscription"] = 1] = "Subscription";
  return PayWallType2;
})(PayWallType || {});

// src/social/index.ts
var _sha2 = require('@noble/hashes/sha2');

// src/social/constants.ts
var BOX_COST_PER_BYTE = 400n;
var FOLLOWS_MBR = 31700n;
var BLOCKS_MBR = 15700n;
var MIN_POSTS_MBR = 46500n;
var MIN_PAYWALL_MBR = 5200n;
var VOTES_MBR = 19300n;
var VOTELIST_MBR = 19300n;
var REACTIONS_MBR = 22100n;
var REACTIONLIST_MBR = 18900n;
var META_MBR = 45300n;
var MODERATORS_MBR = 18900n;
var BANNED_MBR = 18900n;
var ACTIONS_MBR = 29700n;
var AMENDMENT_MBR = 13200n;
var EDIT_BACK_REF_MBR = 13200n;
var PAYWALL_PAY_OPTION_SIZE = 17n;
var IMPACT_META_MBR = 31700n;
var SUBSCRIPTION_STATE_MODIFIER_MBR = 9300n;
var POST_BASE_MBR = MIN_POSTS_MBR + VOTES_MBR + VOTELIST_MBR;
var REPLY_BASE_MBR = POST_BASE_MBR;
var VOTE_BASE_MBR = VOTELIST_MBR;
var REACT_BASE_MBR = REACTIONLIST_MBR;
var REACT_NEW_NFT_MBR = REACTIONLIST_MBR + REACTIONS_MBR;
var ONE_DAY_SECONDS = 86400n;
var ONE_WEEK_SECONDS = 604800n;
var ONE_MONTH_SECONDS = 2592000n;
var ONE_YEAR_SECONDS = 31536000n;
var TWO_YEARS_SECONDS = 63072000n;
var MAX_TIMESTAMP_DRIFT_SECONDS = 60n;
var CID_LENGTH = 36;
var POST_REF_LENGTH = 32;
var REPLY_TYPE_POST = 1;
var REPLY_TYPE_ASSET = 2;
var REPLY_TYPE_ADDRESS = 3;
var REPLY_TYPE_APP = 4;
var POST_TYPE_POST = 0;
var POST_TYPE_REPLY = 1;
var POST_TYPE_EDIT_POST = 2;
var POST_TYPE_EDIT_REPLY = 3;
var TIP_ACTION_POST = 10;
var TIP_ACTION_REACT = 20;
var TIP_SEND_TYPE_DIRECT = 10;
var TIP_SEND_TYPE_ARC59 = 20;
var TIP_SEND_TYPE_ARC58 = 30;

// src/social/errors.ts
var SOCIAL_ERROR_MESSAGES = {
  // --- Top-level / shared aliases -----------------------------------------
  NDAO: "Not the Akita DAO",
  IPAY: "Invalid payment",
  IXFR: "Invalid transfer",
  FGTE: "Failed gate",
  // --- Plugin aliases ------------------------------------------------------
  AOPT: "Already opted in",
  // --- Subscriptions alias -------------------------------------------------
  UNBK: "User not blocked",
  // --- Moderation errors ---------------------------------------------------
  NMOD: "Not a moderator",
  EMOD: "Already a moderator",
  EBAN: "Already banned",
  NBAN: "User not banned",
  BAND: "Account is banned",
  EACT: "Action already exists",
  EFLG: "Already flagged",
  NFLG: "Not flagged",
  // --- Graph errors --------------------------------------------------------
  BLKD: "Blocked",
  SFLW: "Cannot follow yourself",
  SBLK: "Cannot block yourself",
  AFLW: "Already following",
  NFLW: "Not following",
  WFLK: "Wrong follower key",
  HGTE: "Account has a follow gate",
  AUTO: "Automated accounts cannot follow",
  // --- Main social errors --------------------------------------------------
  IPWL: "Invalid paywall",
  NPWL: "Paywall not found",
  ICID: "Invalid CID",
  NPST: "Post not found",
  EPST: "Post already exists",
  NRPL: "Reply not found",
  AVOT: "Already voted",
  NVOT: "Haven't voted",
  NMTA: "Meta doesn't exist",
  EMTA: "Meta already exists",
  NGRF: "Not the graph contract",
  NMDX: "Not the moderation contract",
  NATH: "Plugin not auth address",
  IAST: "Invalid asset",
  IAPP: "Invalid app",
  IRTY: "Invalid reply type",
  NEDT: "Not your post to edit",
  ISRP: "Is a reply",
  NARP: "Not a reply",
  EAMD: "Already amended",
  SVOT: "Cannot self-vote",
  ARCT: "Already reacted",
  FTSM: "Fee too small",
  IRFL: "Invalid ref length",
  TSOL: "Timestamp too old",
  NRTP: "Ref type not found",
  NONT: "User does not own the NFT",
  // --- Impact errors -------------------------------------------------------
  INFD: "Invalid NFD",
  NNFD: "Not an NFD",
  NONF: "User does not own the NFD",
  CNFD: "NFD has changed",
  NANT: "Not an Akita NFT",
  NSUB: "Not a subscription",
  NSOC: "Not the social contract",
  // --- Social plugin -------------------------------------------------------
  NTDO: "Not the DAO"
};
var ARC65_PREFIX = "ERR:";
var ARC65_ALT_PREFIX = "AER:";
function parseSocialErrorCode(input) {
  var _a;
  if (!input) return void 0;
  let rest = input;
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length);
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length);
  const code = (_a = rest.split(":", 1)[0]) == null ? void 0 : _a.trim();
  if (!code) return void 0;
  return code in SOCIAL_ERROR_MESSAGES ? code : void 0;
}
function translateSocialError(input) {
  const code = parseSocialErrorCode(input);
  if (code !== void 0) return SOCIAL_ERROR_MESSAGES[code];
  return input;
}

// src/social/index.ts
var SocialSDK = (_class9 = class _SocialSDK {
  // Core clients for each contract
  
  
  
  
  // DAO client for reading config (lightweight - only used for state reads)
  // Optional: only created when daoAppId is provided
  __init29() {this.daoClient = null}
  // App IDs for easy access
  
  
  
  
  
  // Shared properties
  
  
  
  
  /** The detected network for this SDK instance */
  
  // Cached DAO data (to avoid repeated calls)
  __init30() {this._socialFees = null}
  __init31() {this._akitaAssets = null}
  constructor({
    algorand,
    daoAppId,
    socialFactoryParams = {},
    graphFactoryParams = {},
    impactFactoryParams = {},
    moderationFactoryParams = {},
    readerAccount = _chunkVMMDQU5Ujs.DEFAULT_READER,
    sendParams = _chunkVMMDQU5Ujs.DEFAULT_SEND_PARAMS,
    ipfsUrl = ""
  }) {;_class9.prototype.__init29.call(this);_class9.prototype.__init30.call(this);_class9.prototype.__init31.call(this);
    this.algorand = algorand;
    this.network = _chunkVMMDQU5Ujs.detectNetworkFromClient.call(void 0, algorand);
    this.daoAppId = _nullishCoalesce(daoAppId, () => ( _chunkVMMDQU5Ujs.getAppIdFromEnv.call(void 0, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.DAO_APP_ID)));
    this.readerAccount = readerAccount;
    this.sendParams = { ...sendParams };
    this.ipfsUrl = ipfsUrl;
    if (socialFactoryParams.defaultSender) {
      this.sendParams.sender = socialFactoryParams.defaultSender;
    }
    if (socialFactoryParams.defaultSigner) {
      this.sendParams.signer = socialFactoryParams.defaultSigner;
    }
    const resolvedSocialAppId = _chunkVMMDQU5Ujs.resolveAppIdWithClient.call(void 0, algorand, socialFactoryParams.appId, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.SOCIAL_APP_ID, "SocialSDK.social");
    const resolvedGraphAppId = _chunkVMMDQU5Ujs.resolveAppIdWithClient.call(void 0, algorand, graphFactoryParams.appId, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.SOCIAL_GRAPH_APP_ID, "SocialSDK.graph");
    const resolvedImpactAppId = _chunkVMMDQU5Ujs.resolveAppIdWithClient.call(void 0, algorand, impactFactoryParams.appId, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.SOCIAL_IMPACT_APP_ID, "SocialSDK.impact");
    const resolvedModerationAppId = _chunkVMMDQU5Ujs.resolveAppIdWithClient.call(void 0, algorand, moderationFactoryParams.appId, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.SOCIAL_MODERATION_APP_ID, "SocialSDK.moderation");
    this.socialClient = new AkitaSocialFactory({ algorand }).getAppClientById({
      ...socialFactoryParams,
      appId: resolvedSocialAppId
    });
    this.graphClient = new AkitaSocialGraphFactory({ algorand }).getAppClientById({
      ...graphFactoryParams,
      appId: resolvedGraphAppId
    });
    this.impactClient = new AkitaSocialImpactFactory({ algorand }).getAppClientById({
      ...impactFactoryParams,
      appId: resolvedImpactAppId
    });
    this.moderationClient = new AkitaSocialModerationFactory({ algorand }).getAppClientById({
      ...moderationFactoryParams,
      appId: resolvedModerationAppId
    });
    if (this.daoAppId !== void 0 && this.daoAppId > 0n) {
      this.daoClient = new (0, _chunkPFX6BSCEjs.AkitaDaoFactory)({ algorand }).getAppClientById({ appId: this.daoAppId });
    }
    this.socialAppId = this.socialClient.appId;
    this.graphAppId = this.graphClient.appId;
    this.impactAppId = this.impactClient.appId;
    this.moderationAppId = this.moderationClient.appId;
  }
  // ============================================================================
  // Blockchain Utilities
  // ============================================================================
  /**
   * Get the latest timestamp from the blockchain.
   * This is useful when creating posts/replies since the contract validates
   * that the provided timestamp is not too far from Global.latestTimestamp.
   * 
   * @returns The latest block timestamp as a bigint (unix seconds)
   */
  async getBlockchainTimestamp() {
    const status = await this.algorand.client.algod.status();
    const block = await this.algorand.client.algod.block(status.lastRound);
    return BigInt(block.block.header.timestamp);
  }
  // ============================================================================
  // Configuration Methods
  // ============================================================================
  setReaderAccount(readerAccount) {
    this.readerAccount = readerAccount;
  }
  setSendParams(sendParams) {
    this.sendParams = sendParams;
  }
  getSendParams({ sender, signer } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 && { sender },
      ...signer !== void 0 && { signer: _chunkFZLF55XCjs.normalizeSigner.call(void 0, signer) }
    };
  }
  getRequiredSendParams(params = {}) {
    const sendParams = this.getSendParams(params);
    if (!_chunkFZLF55XCjs.hasSenderSigner.call(void 0, sendParams)) {
      throw new Error("Sender and signer must be provided either explicitly or through defaults at SDK instantiation");
    }
    return sendParams;
  }
  getReaderSendParams({ sender } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 ? { sender } : { sender: this.readerAccount },
      signer: _transact.makeEmptyTransactionSigner.call(void 0, )
    };
  }
  // ============================================================================
  // Post Key Methods - Deterministic key derivation for posts
  // ============================================================================
  /**
   * Generate a random 24-byte nonce for post key derivation
   * The contract will combine this with the chain timestamp to derive the full key.
   * @returns A random 24-byte Uint8Array
   */
  static generatePostNonce() {
    return crypto.getRandomValues(new Uint8Array(24));
  }
  /**
   * Compute the deterministic post key from creator address, timestamp, and nonce
   * The key is sha256(creatorAddressBytes + timestamp + nonce)
   * 
   * Note: The timestamp used by the contract is Global.latestTimestamp at execution time.
   * This method allows estimating the key for a given timestamp.
   * 
   * @param creatorAddress - The Algorand address of the post creator
   * @param timestamp - The timestamp (unix seconds) - use current time to estimate
   * @param nonce - A 24-byte nonce (use generatePostNonce() or provide your own)
   * @returns The 32-byte post key
   */
  computePostKey(creatorAddress, timestamp, nonce) {
    const addressBytes = _algosdk.decodeAddress.call(void 0, creatorAddress).publicKey;
    const timestampBytes = new Uint8Array(8);
    const ts = BigInt(timestamp);
    for (let i = 7; i >= 0; i--) {
      timestampBytes[i] = Number(ts >> BigInt((7 - i) * 8) & 0xFFn);
    }
    const combined = new Uint8Array(addressBytes.length + 8 + nonce.length);
    combined.set(addressBytes, 0);
    combined.set(timestampBytes, addressBytes.length);
    combined.set(nonce, addressBytes.length + 8);
    return _sha2.sha256.call(void 0, combined);
  }
  /**
   * Compute the deterministic key for external content (Twitter, Farcaster, etc.)
   * The key is sha256(platformPrefix + externalId)
   * 
   * @param platform - The platform identifier (e.g., "twitter", "farcaster")
   * @param externalId - The external content identifier (e.g., tweet ID, cast hash)
   * @returns The 32-byte external ref key
   */
  static computeExternalRefKey(platform, externalId) {
    const combined = new TextEncoder().encode(`${platform}:${externalId}`);
    return _sha2.sha256.call(void 0, combined);
  }
  /**
   * Compute the deterministic key for an edit
   * The key is sha256(creatorAddressBytes + originalPostKey + newCID)
   * 
   * This cryptographically links the edit to its original and makes same edits idempotent.
   * 
   * @param creatorAddress - The Algorand address of the edit creator
   * @param originalKey - The 32-byte key of the post being edited
   * @param newCid - The CID of the new content
   * @returns The 32-byte edit key
   */
  computeEditKey(creatorAddress, originalKey, newCid) {
    const addressBytes = _algosdk.decodeAddress.call(void 0, creatorAddress).publicKey;
    const combined = new Uint8Array(addressBytes.length + originalKey.length + newCid.length);
    combined.set(addressBytes, 0);
    combined.set(originalKey, addressBytes.length);
    combined.set(newCid, addressBytes.length + originalKey.length);
    return _sha2.sha256.call(void 0, combined);
  }
  // ============================================================================
  // DAO Config Methods - Fetch social fees and AKTA asset ID from DAO
  // ============================================================================
  /**
   * Get social fees from the DAO config (cached after first call)
   * @returns Social fees including postFee, reactFee, impactTaxMin, impactTaxMax
   * @throws Error if daoAppId was not provided during SDK construction
   */
  async getSocialFees() {
    if (this._socialFees) {
      return this._socialFees;
    }
    if (!this.daoClient) {
      throw new Error("DAO client not available - daoAppId must be provided during SDK construction to fetch social fees");
    }
    const fees = await this.daoClient.state.global.socialFees();
    if (!fees) {
      throw new Error("Failed to fetch social fees from DAO");
    }
    this._socialFees = fees;
    return fees;
  }
  /**
   * Get AKTA asset info from the DAO config (cached after first call)
   * @returns Akita assets including akta and bones asset IDs
   * @throws Error if daoAppId was not provided during SDK construction
   */
  async getAkitaAssets() {
    if (this._akitaAssets) {
      return this._akitaAssets;
    }
    if (!this.daoClient) {
      throw new Error("DAO client not available - daoAppId must be provided during SDK construction to fetch akita assets");
    }
    const assets = await this.daoClient.state.global.akitaAssets();
    if (!assets) {
      throw new Error("Failed to fetch akita assets from DAO");
    }
    this._akitaAssets = assets;
    return assets;
  }
  /**
   * Clear cached DAO config (call this if fees change)
   */
  clearCache() {
    this._socialFees = null;
    this._akitaAssets = null;
  }
  // ============================================================================
  // Contract MBR Methods - Call contract directly for MBR calculations
  // ============================================================================
  /**
   * Get MBR values from the contract for various box types
   * @param ref - Optional reference bytes (empty for default MBR values)
   * @returns MBR data for all social box types
   */
  async getMbr({ sender, signer, ref = new Uint8Array(), refTypeName = "", refTypeSchema = new Uint8Array() }) {
    const sendParams = this.getSendParams({ sender, signer });
    const result = await this.socialClient.send.mbr({
      ...sendParams,
      args: { ref, refTypeName, refTypeSchema }
    });
    return result.return;
  }
  /**
   * Check tip MBR requirements for sending tips to a recipient
   * This determines if the recipient can receive tips directly, via ARC-58, or ARC-59
   * @param creator - The address of the tip recipient
   * @param wallet - The wallet app ID of the recipient (0 if none)
   * @returns Tip MBR info including type and additional MBR needed
   */
  async checkTipMbrRequirements({
    sender,
    signer,
    creator,
    wallet = 0n
  }) {
    const sendParams = this.getSendParams({ sender, signer });
    const result = await this.socialClient.send.checkTipMbrRequirements({
      ...sendParams,
      args: {
        akitaDao: _nullishCoalesce(this.daoAppId, () => ( 0n)),
        creator,
        wallet: BigInt(wallet)
      }
    });
    return result.return;
  }
  /**
   * Calculate the extra MBR needed for tip delivery based on recipient wallet type
   * @param tipMbrInfo - The tip MBR info from checkTipMbrRequirements
   * @returns Extra MBR amount in microAlgos
   */
  calculateTipExtraMbr(tipMbrInfo) {
    if (tipMbrInfo.type === TIP_SEND_TYPE_ARC58) {
      return tipMbrInfo.arc58;
    }
    return 0n;
  }
  // ============================================================================
  // MBR Calculation Methods (Static calculations)
  // ============================================================================
  /**
   * Calculate the MBR required for a post
   * Formula: posts + votes + votelist
   * Where posts = MinPostsMBR + (BoxCostPerByte * cid.length)
   * 
   * @param cidLength - Length of the CID (default 36 for IPFS CIDv1)
   * @param isAmendment - Whether this is an edit/amendment (adds extra MBR)
   * @returns MBR in microAlgos
   */
  calculatePostMBR(cidLength = CID_LENGTH, isAmendment = false) {
    const postsMbr = MIN_POSTS_MBR + BOX_COST_PER_BYTE * BigInt(cidLength);
    let total = postsMbr + VOTES_MBR + VOTELIST_MBR;
    if (isAmendment) {
      total += AMENDMENT_MBR + EDIT_BACK_REF_MBR;
    }
    return total;
  }
  /**
   * Calculate the MBR required for a reply
   * Same as post, but may include extra MBR for creating empty post for reference
   * 
   * @param cidLength - Length of the CID (default 36 for IPFS CIDv1)
   * @param isAmendment - Whether this is an edit/amendment
   * @param needsEmptyPost - Whether an empty post needs to be created for the reference
   * @returns MBR in microAlgos
   */
  calculateReplyMBR(cidLength = CID_LENGTH, isAmendment = false, needsEmptyPost = false) {
    let total = this.calculatePostMBR(cidLength, isAmendment);
    if (needsEmptyPost) {
      total += MIN_POSTS_MBR + VOTES_MBR;
    }
    return total;
  }
  /**
   * Calculate the MBR required for a vote
   * Formula: votelist (+ extra if creating empty post for reference)
   * 
   * @param needsEmptyPost - Whether an empty post needs to be created for the reference
   * @returns MBR in microAlgos
   */
  calculateVoteMBR(needsEmptyPost = false) {
    let total = VOTELIST_MBR;
    if (needsEmptyPost) {
      total += MIN_POSTS_MBR + VOTES_MBR;
    }
    return total;
  }
  /**
   * Calculate the MBR required for a reaction
   * Formula: reactionlist (+ reactions if first reaction with this NFT)
   * 
   * @param isFirstReactionWithNFT - Whether this is the first reaction with this specific NFT
   * @param needsEmptyPost - Whether an empty post needs to be created for the reference
   * @returns MBR in microAlgos
   */
  calculateReactMBR(isFirstReactionWithNFT = true, needsEmptyPost = false) {
    let total = REACTIONLIST_MBR;
    if (isFirstReactionWithNFT) {
      total += REACTIONS_MBR;
    }
    if (needsEmptyPost) {
      total += MIN_POSTS_MBR + VOTES_MBR;
    }
    return total;
  }
  /**
   * Calculate the MBR required for a follow
   * @returns MBR in microAlgos
   */
  calculateFollowMBR() {
    return FOLLOWS_MBR;
  }
  /**
   * Calculate the MBR required for a block
   * @returns MBR in microAlgos
   */
  calculateBlockMBR() {
    return BLOCKS_MBR;
  }
  /**
   * Calculate the MBR required for initializing meta
   * Includes META_MBR for the social contract + IMPACT_META_MBR for the impact contract
   * @returns MBR in microAlgos
   */
  calculateMetaMBR() {
    return META_MBR + IMPACT_META_MBR;
  }
  /**
   * Calculate the MBR required for a paywall
   * Formula: MinPayWallMBR + (BoxCostPerByte * PayWallPayOptionSize * totalOptions)
   * 
   * @param userOptionsCount - Number of user pay options
   * @param agentOptionsCount - Number of agent pay options
   * @returns MBR in microAlgos
   */
  calculatePayWallMBR(userOptionsCount, agentOptionsCount) {
    const totalOptions = userOptionsCount + agentOptionsCount;
    return MIN_PAYWALL_MBR + BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE * BigInt(totalOptions);
  }
  /**
   * Calculate the MBR required for adding a moderator
   * @returns MBR in microAlgos
   */
  calculateModeratorMBR() {
    return MODERATORS_MBR;
  }
  /**
   * Calculate the MBR required for banning a user
   * @returns MBR in microAlgos
   */
  calculateBanMBR() {
    return BANNED_MBR;
  }
  /**
   * Calculate the MBR required for adding an action
   * @returns MBR in microAlgos
   */
  calculateActionMBR() {
    return ACTIONS_MBR;
  }
  // ============================================================================
  // READ METHODS - Social Contract
  // ============================================================================
  /**
   * Check if an account is banned. Delegates to `AkitaSocialModeration.isBanned`
   * directly — the corresponding `AkitaSocial.isBanned` ABI method was removed to
   * keep the main contract under its program-size budget.
   */
  async isBanned({ sender, signer, account }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.moderationClient.isBanned({ ...sendParams, args: { account } });
  }
  /**
   * Get the raw inputs used to derive a user's social impact score from the
   * Social contract. The final impact computation is performed off-chain in
   * consumer code (previously this method returned a single bigint; the
   * contract now exposes the individual factors instead).
   */
  async getUserSocialImpact({ sender, signer, user }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.socialClient.getSocialImpactInputs({ ...sendParams, args: { user } });
  }
  /**
   * Get moderator metadata for a user
   */
  async getModeratorMeta({ sender, signer, user }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.moderationClient.moderatorMeta({ ...sendParams, args: { user } });
  }
  /**
   * Get user metadata from the Social contract
   */
  async getMeta({ sender, signer, user }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.socialClient.getMeta({ ...sendParams, args: { user } });
  }
  /**
   * Get a post by reference
   */
  async getPost({ sender, signer, ref }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.socialClient.getPost({ ...sendParams, args: { ref } });
  }
  /**
   * Get a post and its creator's metadata
   * This is a convenience method that fetches both post and creator meta in sequence
   */
  async getPostAndCreatorMeta({ sender, signer, ref }) {
    const sendParams = this.getSendParams({ sender, signer });
    const post = await this.socialClient.getPost({ ...sendParams, args: { ref } });
    const meta = await this.socialClient.getMeta({ ...sendParams, args: { user: post.creator } });
    return { post, meta };
  }
  /**
   * Get vote data for a post reference (returns impact and direction of vote)
   */
  async getVote({ sender, signer, account, ref }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.socialClient.getVote({ ...sendParams, args: { account, ref } });
  }
  /**
   * Get vote data for multiple post references at once
   * Returns an array of VoteListValue in the same order as the input refs
   * For posts the user hasn't voted on, returns { impact: 0n, isUp: false }
   * This method is more efficient than calling getVote multiple times and won't error on missing votes
   */
  async getVotes({ sender, signer, keys }) {
    const sendParams = this.getSendParams({ sender, signer });
    const result = await this.socialClient.getVotes({ ...sendParams, args: { keys: keys.map(({ account, ref }) => [account, ref]) } });
    return result.map(([impact, isUp]) => ({ impact, isUp }));
  }
  // ============================================================================
  // READ METHODS - Graph Contract
  // ============================================================================
  /**
   * Check if a user is blocked by another user
   */
  async isBlocked({ sender, signer, user, blocked }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.graphClient.isBlocked({ ...sendParams, args: { user, blocked } });
  }
  /**
   * Check if one account is following another
   * @param follower - The account that may be following
   * @param user - The account that may be followed
   */
  async isFollowing({ sender, signer, follower, user }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.graphClient.isFollowing({ ...sendParams, args: { follower, user } });
  }
  /**
   * Get the follow index for a follower-user pair
   * @param follower - The account that is following
   * @param user - The account that is followed
   */
  async getFollowIndex({ sender, signer, follower, user }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.graphClient.getFollowIndex({ ...sendParams, args: { follower, user } });
  }
  // ============================================================================
  // READ METHODS - Impact Contract
  // ============================================================================
  /**
   * Get user impact score (including social impact)
   */
  async getUserImpact({ sender, signer, address }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.impactClient.getUserImpact({ ...sendParams, args: { address } });
  }
  /**
   * Get user impact score (excluding social impact)
   */
  async getUserImpactWithoutSocial({ sender, signer, address }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.impactClient.getUserImpactWithoutSocial({ ...sendParams, args: { address } });
  }
  /**
   * Get impact metadata for a user
   */
  async getImpactMeta({ sender, signer, user }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.impactClient.getMeta({ ...sendParams, args: { user } });
  }
  async init({
    sender,
    signer
  } = {}) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.socialClient.newGroup();
    group.init({
      ...sendParams,
      args: [],
      maxFee: 1e4.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    return await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  // ============================================================================
  // WRITE METHODS - Meta Operations
  // ============================================================================
  /**
   * Initialize meta for a user (required before using social features)
   */
  async initMeta({
    sender,
    signer,
    user,
    automated = false,
    subscriptionIndex = 0n,
    nfd = 0n,
    akitaNFT = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrAmount = this.calculateMetaMBR();
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const result = await this.socialClient.send.initMeta({
      ...sendParams,
      args: {
        mbrPayment,
        user: _nullishCoalesce(user, () => ( sendParams.sender.toString())),
        automated,
        subscriptionIndex,
        nfd,
        akitaNft: akitaNFT
      }
    });
    return result.return;
  }
  /**
   * Update meta settings for the sender
   */
  async updateMeta({
    sender,
    signer,
    followGateId = 0n,
    addressGateId = 0n,
    subscriptionIndex = 0n,
    nfd = 0n,
    akitaNFT = 0n,
    defaultPayWallId = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.socialClient.send.updateMeta({
      ...sendParams,
      args: {
        followGateId,
        addressGateId,
        subscriptionIndex,
        nfd,
        akitaNft: akitaNFT,
        defaultPayWallId
      }
    });
  }
  // ============================================================================
  // WRITE METHODS - Post Operations
  // ============================================================================
  /**
   * Create a new post
   * 
   * @param args - Post arguments including optional timestamp, nonce and CID
   * @returns The post key, timestamp, and nonce used
   * 
   * Automatically calculates:
   * - MBR: posts + votes + votelist
   * - Tip: postFee in AKTA from DAO social fees
   * 
   * The post key is derived as sha256(creator + timestamp + nonce).
   * The timestamp is validated by the contract to be within 60 seconds of chain time.
   */
  async post({
    sender,
    signer,
    timestamp: providedTimestamp,
    nonce: providedNonce,
    cid,
    gateId = 0n,
    usePayWall = false,
    payWallId = 0n,
    creatorFlags = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const [socialFees, akitaAssets, blockchainTimestamp] = await Promise.all([
      this.getSocialFees(),
      this.getAkitaAssets(),
      providedTimestamp ? Promise.resolve(BigInt(providedTimestamp)) : this.getBlockchainTimestamp()
    ]);
    const timestamp = BigInt(_nullishCoalesce(providedTimestamp, () => ( blockchainTimestamp)));
    const nonce = _nullishCoalesce(providedNonce, () => ( _SocialSDK.generatePostNonce()));
    const creatorAddress = sendParams.sender.toString();
    const postKey = this.computePostKey(creatorAddress, timestamp, nonce);
    const mbrAmount = this.calculatePostMBR(cid.length, false);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: socialFees.postFee,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    const group = this.socialClient.newGroup();
    group.post({
      ...sendParams,
      args: {
        mbrPayment,
        tip: tipTxn,
        timestamp,
        nonce,
        cid,
        gateId,
        usePayWall,
        payWallId,
        creatorFlags
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    return { postKey, timestamp, nonce };
  }
  /**
   * Edit an existing post (creates an amendment)
   * 
   * @param args - Edit post arguments including new CID and amendment reference
   * @returns The deterministic post key for the edited post (derived from creator + original + CID)
   * 
   * Automatically calculates:
   * - MBR: posts + votes + votelist + amendment + edit back-ref
   * - Tip: postFee in AKTA from DAO social fees
   * 
   * The edit key is derived as sha256(creator + originalPostKey + newCID), making edits
   * cryptographically linked to their original and idempotent (same edit = same key).
   */
  async editPost({
    sender,
    signer,
    cid,
    amendment,
    creatorFlags = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const postKey = this.computeEditKey(sendParams.sender.toString(), amendment, cid);
    const [socialFees, akitaAssets] = await Promise.all([
      this.getSocialFees(),
      this.getAkitaAssets()
    ]);
    const mbrAmount = this.calculatePostMBR(cid.length, true);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: socialFees.postFee,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    await this.socialClient.send.editPost({
      ...sendParams,
      args: {
        mbrPayment,
        tip: tipTxn,
        cid,
        amendment,
        creatorFlags
      }
    });
    return postKey;
  }
  /**
   * Reply to a post or comment
   * 
   * @param args - Reply arguments including optional timestamp, nonce, CID and reference
   * @returns The reply key, timestamp, and nonce used
   * 
   * Automatically calculates:
   * - MBR: reply base + potential tip delivery MBR (ARC-58/ARC-59)
   * - Tip: reactFee in AKTA from DAO social fees
   * 
   * Note: Replies validate tips using TipActionReact (reactFee), not postFee
   */
  async reply({
    sender,
    signer,
    timestamp: providedTimestamp,
    nonce: providedNonce,
    cid,
    ref,
    refType,
    gateId = 0n,
    usePayWall = false,
    payWallId = 0n,
    gateTxn,
    creatorFlags = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const [socialFees, akitaAssets, blockchainTimestamp] = await Promise.all([
      this.getSocialFees(),
      this.getAkitaAssets(),
      providedTimestamp ? Promise.resolve(BigInt(providedTimestamp)) : this.getBlockchainTimestamp()
    ]);
    const timestamp = BigInt(_nullishCoalesce(providedTimestamp, () => ( blockchainTimestamp)));
    const nonce = _nullishCoalesce(providedNonce, () => ( _SocialSDK.generatePostNonce()));
    const creatorAddress = sendParams.sender.toString();
    const replyKey = this.computePostKey(creatorAddress, timestamp, nonce);
    const mbrAmount = this.calculateReplyMBR(cid.length, false, false);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: socialFees.reactFee,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    const group = this.socialClient.newGroup();
    if (gateTxn) {
      group.gatedReply({
        ...sendParams,
        args: {
          mbrPayment,
          tip: tipTxn,
          gateTxn,
          timestamp,
          nonce,
          cid,
          ref,
          type: refType,
          gateId,
          usePayWall,
          payWallId,
          creatorFlags
        }
      });
    } else {
      group.reply({
        ...sendParams,
        args: {
          mbrPayment,
          tip: tipTxn,
          timestamp,
          nonce,
          cid,
          ref,
          type: refType,
          gateId,
          usePayWall,
          payWallId,
          creatorFlags
        }
      });
    }
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "2"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    return { replyKey, timestamp, nonce };
  }
  // ============================================================================
  // WRITE METHODS - Vote Operations
  // ============================================================================
  /**
   * Vote on a post (upvote or downvote)
   * 
   * @param args - Vote arguments including reference and vote direction
   * 
   * Automatically calculates:
   * - MBR: votelist + potential tip delivery MBR (ARC-58/ARC-59) for upvotes
   * - Tip: reactFee in AKTA from DAO social fees
   */
  async vote({
    sender,
    signer,
    ref,
    refType,
    isUp
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const [socialFees, akitaAssets] = await Promise.all([
      this.getSocialFees(),
      this.getAkitaAssets()
    ]);
    const mbrAmount = this.calculateVoteMBR(false);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: socialFees.reactFee,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    const group = this.socialClient.newGroup();
    group.vote({
      ...sendParams,
      args: {
        mbrPayment,
        tip: tipTxn,
        ref,
        type: refType,
        isUp
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "2"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Edit an existing vote (undo or flip)
   * 
   * @param args - Edit vote arguments
   * 
   * Note: If flip=false, the vote is removed and MBR is refunded.
   * If flip=true, reactFee is charged.
   */
  /**
   * Invert an existing vote (upvote becomes downvote, or vice versa)
   * 
   * @param args - Invert vote arguments including the post reference
   * 
   * Automatically calculates tip fee from DAO social fees.
   */
  async invertVote({
    sender,
    signer,
    ref
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const [socialFees, akitaAssets] = await Promise.all([
      this.getSocialFees(),
      this.getAkitaAssets()
    ]);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, 0),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: socialFees.reactFee,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    const group = this.socialClient.newGroup();
    group.editVote({
      ...sendParams,
      args: {
        mbrPayment,
        tip: tipTxn,
        ref,
        flip: true
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "2"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Delete an existing vote (undo the vote entirely)
   * 
   * @param args - Delete vote arguments including the post reference
   * 
   * Refunds the MBR for the vote box storage.
   */
  async deleteVote({
    sender,
    signer,
    ref
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const akitaAssets = await this.getAkitaAssets();
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, 0),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: 0n,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    const group = this.socialClient.newGroup();
    group.editVote({
      ...sendParams,
      args: {
        mbrPayment,
        tip: tipTxn,
        ref,
        flip: false
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "2"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  // ============================================================================
  // WRITE METHODS - Reaction Operations
  // ============================================================================
  /**
   * React to a post with an NFT
   * 
   * @param args - React arguments including reference and NFT
   * 
   * Automatically calculates:
   * - MBR: reaction boxes + potential tip delivery MBR (ARC-58/ARC-59)
   * - Tip: reactFee in AKTA from DAO social fees
   * 
   * Note: MBR is higher if this is the first reaction with this specific NFT on the post
   */
  async react({
    sender,
    signer,
    ref,
    refType,
    nft,
    gateTxn
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const [socialFees, akitaAssets] = await Promise.all([
      this.getSocialFees(),
      this.getAkitaAssets()
    ]);
    const mbrAmount = this.calculateReactMBR(true, false);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const tipTxn = this.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: socialFees.reactFee,
      assetId: akitaAssets.akta,
      receiver: this.socialClient.appAddress
    });
    const group = this.socialClient.newGroup();
    if (gateTxn) {
      group.gatedReact({
        ...sendParams,
        args: {
          mbrPayment,
          tip: tipTxn,
          gateTxn,
          ref,
          type: refType,
          nft
        }
      });
    } else {
      group.react({
        ...sendParams,
        args: {
          mbrPayment,
          tip: tipTxn,
          ref,
          type: refType,
          nft
        }
      });
    }
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "2"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Delete a reaction from a post
   */
  async deleteReaction({
    sender,
    signer,
    ref,
    nft
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.socialClient.newGroup();
    group.deleteReaction({
      ...sendParams,
      args: { ref, nft }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos()
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "1"
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: 1e3.microAlgos(),
      note: "2"
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  // ============================================================================
  // READ METHODS - Reactions
  // ============================================================================
  /**
   * Get all reactions for a post
   * 
   * @param ref - The 32-byte post reference
   * @param userAddress - Optional user address to check which NFTs they've reacted with
   * @returns Object containing reactions array and set of NFT IDs the user has reacted with
   */
  async getPostReactions({
    ref,
    userAddress
  }) {
    const appId = this.socialAppId;
    const reactions = [];
    const userReactedNfts = /* @__PURE__ */ new Set();
    try {
      const boxesResponse = await this.algorand.client.algod.applicationBoxes(Number(appId));
      const reactionPrefix = new Uint8Array([114]);
      const reactionListPrefix = new Uint8Array([101]);
      for (const box of boxesResponse.boxes) {
        const boxName = box.name;
        if (boxName.length === 41 && boxName[0] === reactionPrefix[0]) {
          const boxRef = boxName.slice(1, 33);
          if (this.compareBytes(boxRef, ref)) {
            const nftIdBytes = boxName.slice(33, 41);
            const nftId = this.bytesToBigInt(nftIdBytes);
            try {
              const boxValue = await this.algorand.client.algod.applicationBoxByName(Number(appId), boxName);
              const count = this.bytesToBigInt(boxValue.value);
              reactions.push({ nftId, count });
            } catch (e) {
            }
          }
        }
        if (userAddress && boxName.length === 41 && boxName[0] === reactionListPrefix[0]) {
          const userBytes = this.addressToBytes16(userAddress);
          const boxUserBytes = boxName.slice(1, 17);
          const boxRefBytes = boxName.slice(17, 33);
          const refFirst16 = ref.slice(0, 16);
          if (this.compareBytes(boxUserBytes, userBytes) && this.compareBytes(boxRefBytes, refFirst16)) {
            const nftIdBytes = boxName.slice(33, 41);
            const nftId = this.bytesToBigInt(nftIdBytes);
            userReactedNfts.add(nftId);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch post reactions:", error);
    }
    return { reactions, userReactedNfts };
  }
  /**
   * Compare two Uint8Arrays for equality
   */
  compareBytes(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  /**
   * Convert Uint8Array to bigint (big-endian)
   */
  bytesToBigInt(bytes) {
    let result = 0n;
    for (const byte of bytes) {
      result = result << 8n | BigInt(byte);
    }
    return result;
  }
  /**
   * Convert address to first 16 bytes for reaction list lookup
   */
  addressToBytes16(address) {
    const decoded = _algosdk2.default.decodeAddress(address);
    return decoded.publicKey.slice(0, 16);
  }
  // ============================================================================
  // WRITE METHODS - Graph Operations (follows/blocks)
  // ============================================================================
  /**
   * Follow a user
   * 
   * @param args - Follow arguments
   * 
   * Required MBR: Use calculateFollowMBR() to get the exact amount
   */
  async follow({
    sender,
    signer,
    address,
    gateTxn
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrAmount = this.calculateFollowMBR();
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.graphClient.appAddress
    });
    if (gateTxn) {
      await this.graphClient.send.gatedFollow({
        ...sendParams,
        args: {
          mbrPayment,
          gateTxn,
          address
        }
      });
    } else {
      await this.graphClient.send.follow({
        ...sendParams,
        args: {
          mbrPayment,
          address
        }
      });
    }
  }
  /**
   * Unfollow a user
   */
  async unfollow({
    sender,
    signer,
    address
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.graphClient.send.unfollow({
      ...sendParams,
      args: { address }
    });
  }
  /**
   * Block a user
   * 
   * @param args - Block arguments
   * 
   * Required MBR: Use calculateBlockMBR() to get the exact amount
   */
  async block({
    sender,
    signer,
    address
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrAmount = this.calculateBlockMBR();
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.graphClient.appAddress
    });
    await this.graphClient.send.block({
      ...sendParams,
      args: {
        mbrPayment,
        address
      }
    });
  }
  /**
   * Unblock a user
   */
  async unblock({
    sender,
    signer,
    address
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.graphClient.send.unblock({
      ...sendParams,
      args: { address }
    });
  }
  // ============================================================================
  // WRITE METHODS - PayWall Operations
  // ============================================================================
  /**
   * Create a paywall configuration
   * 
   * @param args - PayWall arguments with user and agent payment options
   * 
   * Required MBR: Use calculatePayWallMBR() to get the exact amount
   */
  async createPayWall({
    sender,
    signer,
    userPayInfo,
    agentPayInfo
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrAmount = this.calculatePayWallMBR(userPayInfo.length, agentPayInfo.length);
    const mbrPayment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, mbrAmount),
      receiver: this.socialClient.appAddress
    });
    const payWall = {
      userPayInfo: userPayInfo.map((opt) => [
        opt.type,
        BigInt(opt.assetOrSubId),
        BigInt(opt.amount)
      ]),
      agentPayInfo: agentPayInfo.map((opt) => [
        opt.type,
        BigInt(opt.assetOrSubId),
        BigInt(opt.amount)
      ])
    };
    const result = await this.socialClient.send.createPayWall({
      ...sendParams,
      args: {
        mbrPayment,
        payWall
      }
    });
    return result.return;
  }
  // ============================================================================
  // WRITE METHODS - Moderation Operations (DAO-only)
  // ============================================================================
  /**
   * Add a moderator (requires DAO wallet sender)
   * 
   * Required MBR: Use calculateModeratorMBR() to get the exact amount
   */
  async addModerator({
    sender,
    signer,
    address
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.addModerator({
      ...sendParams,
      args: { address }
    });
  }
  /**
   * Remove a moderator (requires DAO wallet sender)
   */
  async removeModerator({
    sender,
    signer,
    address
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.removeModerator({
      ...sendParams,
      args: { address }
    });
  }
  /**
   * Ban a user (requires moderator)
   * 
   * Required MBR: Use calculateBanMBR() to get the exact amount
   */
  async ban({
    sender,
    signer,
    address,
    expiration
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.ban({
      ...sendParams,
      args: {
        address,
        expiration
      }
    });
  }
  /**
   * Unban a user (requires moderator)
   */
  async unban({
    sender,
    signer,
    address
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.unban({
      ...sendParams,
      args: { address }
    });
  }
  /**
   * Flag a post as against content policy (requires moderator)
   */
  async flagPost({
    sender,
    signer,
    ref
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.flagPost({
      ...sendParams,
      args: { ref }
    });
  }
  /**
   * Unflag a post (requires moderator)
   */
  async unflagPost({
    sender,
    signer,
    ref
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.unflagPost({
      ...sendParams,
      args: { ref }
    });
  }
  /**
   * Set moderator content flags on a post (requires moderator)
   *
   * @param args - ref (post key) and flags (uint64 bitmask)
   */
  async setModeratorContentFlags({
    sender,
    signer,
    ref,
    flags
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.setModeratorContentFlags({
      ...sendParams,
      args: { ref, flags }
    });
  }
  // ============================================================================
  // WRITE METHODS - Action Operations (DAO-only)
  // ============================================================================
  /**
   * Add a new action type (requires DAO wallet sender)
   * 
   * Required MBR: Use calculateActionMBR() to get the exact amount
   */
  async addAction({
    sender,
    signer,
    actionAppId,
    content
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.addAction({
      ...sendParams,
      args: {
        actionAppId,
        content
      }
    });
  }
  /**
   * Remove an action type (requires DAO wallet sender)
   */
  async removeAction({
    sender,
    signer,
    actionAppId
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.moderationClient.send.removeAction({
      ...sendParams,
      args: { actionAppId }
    });
  }
}, _class9);




















































exports.RefType = RefType; exports.PayWallType = PayWallType; exports.BOX_COST_PER_BYTE = BOX_COST_PER_BYTE; exports.FOLLOWS_MBR = FOLLOWS_MBR; exports.BLOCKS_MBR = BLOCKS_MBR; exports.MIN_POSTS_MBR = MIN_POSTS_MBR; exports.MIN_PAYWALL_MBR = MIN_PAYWALL_MBR; exports.VOTES_MBR = VOTES_MBR; exports.VOTELIST_MBR = VOTELIST_MBR; exports.REACTIONS_MBR = REACTIONS_MBR; exports.REACTIONLIST_MBR = REACTIONLIST_MBR; exports.META_MBR = META_MBR; exports.MODERATORS_MBR = MODERATORS_MBR; exports.BANNED_MBR = BANNED_MBR; exports.ACTIONS_MBR = ACTIONS_MBR; exports.AMENDMENT_MBR = AMENDMENT_MBR; exports.EDIT_BACK_REF_MBR = EDIT_BACK_REF_MBR; exports.PAYWALL_PAY_OPTION_SIZE = PAYWALL_PAY_OPTION_SIZE; exports.IMPACT_META_MBR = IMPACT_META_MBR; exports.SUBSCRIPTION_STATE_MODIFIER_MBR = SUBSCRIPTION_STATE_MODIFIER_MBR; exports.POST_BASE_MBR = POST_BASE_MBR; exports.REPLY_BASE_MBR = REPLY_BASE_MBR; exports.VOTE_BASE_MBR = VOTE_BASE_MBR; exports.REACT_BASE_MBR = REACT_BASE_MBR; exports.REACT_NEW_NFT_MBR = REACT_NEW_NFT_MBR; exports.ONE_DAY_SECONDS = ONE_DAY_SECONDS; exports.ONE_WEEK_SECONDS = ONE_WEEK_SECONDS; exports.ONE_MONTH_SECONDS = ONE_MONTH_SECONDS; exports.ONE_YEAR_SECONDS = ONE_YEAR_SECONDS; exports.TWO_YEARS_SECONDS = TWO_YEARS_SECONDS; exports.MAX_TIMESTAMP_DRIFT_SECONDS = MAX_TIMESTAMP_DRIFT_SECONDS; exports.CID_LENGTH = CID_LENGTH; exports.POST_REF_LENGTH = POST_REF_LENGTH; exports.REPLY_TYPE_POST = REPLY_TYPE_POST; exports.REPLY_TYPE_ASSET = REPLY_TYPE_ASSET; exports.REPLY_TYPE_ADDRESS = REPLY_TYPE_ADDRESS; exports.REPLY_TYPE_APP = REPLY_TYPE_APP; exports.POST_TYPE_POST = POST_TYPE_POST; exports.POST_TYPE_REPLY = POST_TYPE_REPLY; exports.POST_TYPE_EDIT_POST = POST_TYPE_EDIT_POST; exports.POST_TYPE_EDIT_REPLY = POST_TYPE_EDIT_REPLY; exports.TIP_ACTION_POST = TIP_ACTION_POST; exports.TIP_ACTION_REACT = TIP_ACTION_REACT; exports.TIP_SEND_TYPE_DIRECT = TIP_SEND_TYPE_DIRECT; exports.TIP_SEND_TYPE_ARC59 = TIP_SEND_TYPE_ARC59; exports.TIP_SEND_TYPE_ARC58 = TIP_SEND_TYPE_ARC58; exports.SOCIAL_ERROR_MESSAGES = SOCIAL_ERROR_MESSAGES; exports.parseSocialErrorCode = parseSocialErrorCode; exports.translateSocialError = translateSocialError; exports.SocialSDK = SocialSDK;
//# sourceMappingURL=chunk-HJZDMAXE.js.map
"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4; var _class5; var _class6; var _class7; var _class8; var _class9;

var _chunk5EV47XMVjs = require('./chunk-5EV47XMV.js');







var _chunkHFHM5QOFjs = require('./chunk-HFHM5QOF.js');



var _chunkL3SAIW4Gjs = require('./chunk-L3SAIW4G.js');

// src/social/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var _transact = require('@algorandfoundation/algokit-utils/transact');

// src/generated/AkitaSocialClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "AkitaSocial", "structs": { "AkitaSocialMBRData": [{ "name": "follows", "type": "uint64" }, { "name": "blocks", "type": "uint64" }, { "name": "posts", "type": "uint64" }, { "name": "votes", "type": "uint64" }, { "name": "votelist", "type": "uint64" }, { "name": "reactions", "type": "uint64" }, { "name": "reactionlist", "type": "uint64" }, { "name": "meta", "type": "uint64" }, { "name": "moderators", "type": "uint64" }, { "name": "banned", "type": "uint64" }, { "name": "actions", "type": "uint64" }, { "name": "refTypes", "type": "uint64" }], "MetaValue": [{ "name": "initialized", "type": "bool" }, { "name": "wallet", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "lastActive", "type": "uint64" }, { "name": "followerIndex", "type": "uint64" }, { "name": "followerCount", "type": "uint64" }, { "name": "automated", "type": "bool" }, { "name": "followGateId", "type": "uint64" }, { "name": "addressGateId", "type": "uint64" }, { "name": "defaultPayWallId", "type": "uint64" }], "PostValue": [{ "name": "creator", "type": "address" }, { "name": "timestamp", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "usePayWall", "type": "bool" }, { "name": "payWallId", "type": "uint64" }, { "name": "againstContentPolicy", "type": "bool" }, { "name": "postType", "type": "uint8" }, { "name": "creatorFlags", "type": "uint64" }, { "name": "moderatorFlags", "type": "uint64" }, { "name": "ref", "type": "byte[]" }], "ReactionListKey": [{ "name": "user", "type": "byte[16]" }, { "name": "ref", "type": "byte[16]" }, { "name": "nft", "type": "uint64" }], "ReactionsKey": [{ "name": "ref", "type": "byte[32]" }, { "name": "nft", "type": "uint64" }], "RefTypeValue": [{ "name": "name", "type": "string" }, { "name": "schema", "type": "byte[]" }], "SocialImpactInputs": [{ "name": "hasMeta", "type": "bool" }, { "name": "streak", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "voteCount", "type": "uint64" }, { "name": "isNegative", "type": "bool" }], "ViewPayWallValue": [{ "name": "userPayInfo", "type": "(uint8,uint64,uint64)[]" }, { "name": "agentPayInfo", "type": "(uint8,uint64,uint64)[]" }], "VoteListKey": [{ "name": "user", "type": "byte[16]" }, { "name": "ref", "type": "byte[16]" }], "VoteListValue": [{ "name": "impact", "type": "uint64" }, { "name": "isUp", "type": "bool" }], "VotesValue": [{ "name": "voteCount", "type": "uint64" }, { "name": "isNegative", "type": "bool" }], "tipMBRInfo": [{ "name": "type", "type": "uint8" }, { "name": "arc58", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "post", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "uint64", "name": "timestamp" }, { "type": "byte[24]", "name": "nonce" }, { "type": "byte[36]", "name": "cid" }, { "type": "uint64", "name": "gateID" }, { "type": "bool", "name": "usePayWall" }, { "type": "uint64", "name": "payWallID" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editPost", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[32]", "name": "amendment" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedReply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "appl", "name": "gateTxn" }, { "type": "uint64", "name": "timestamp" }, { "type": "byte[24]", "name": "nonce" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "gateID" }, { "type": "bool", "name": "usePayWall" }, { "type": "uint64", "name": "payWallID" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "reply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "uint64", "name": "timestamp" }, { "type": "byte[24]", "name": "nonce" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "gateID" }, { "type": "bool", "name": "usePayWall" }, { "type": "uint64", "name": "payWallID" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEditReply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "appl", "name": "gateTxn" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[32]", "name": "amendment" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editReply", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[36]", "name": "cid" }, { "type": "byte[32]", "name": "amendment" }, { "type": "uint64", "name": "creatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "vote", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "bool", "name": "isUp" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "editVote", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[32]", "name": "ref" }, { "type": "bool", "name": "flip" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedReact", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "appl", "name": "gateTxn" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "react", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "axfer", "name": "tip" }, { "type": "byte[]", "name": "ref" }, { "type": "uint64", "name": "type" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteReaction", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setPostModeration", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "bool", "name": "againstContentPolicy" }, { "type": "uint64", "name": "moderatorFlags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initMeta", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "address", "name": "user" }, { "type": "bool", "name": "automated" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "NFD" }, { "type": "uint64", "name": "akitaNFT" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "createPayWall", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "((uint8,uint64,uint64)[],(uint8,uint64,uint64)[])", "struct": "ViewPayWallValue", "name": "payWall" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateMeta", "args": [{ "type": "uint64", "name": "followGateID" }, { "type": "uint64", "name": "addressGateID" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "NFD" }, { "type": "uint64", "name": "akitaNFT" }, { "type": "uint64", "name": "defaultPayWallID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateFollowerMeta", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "newFollowerIndex" }, { "type": "uint64", "name": "newFollowerCount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "registerRefType", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "name" }, { "type": "byte[]", "name": "schema" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "getSocialImpactInputs", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(bool,uint64,uint64,uint64,bool)", "struct": "SocialImpactInputs" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMetaExists", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMeta", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(bool,uint64,uint64,uint64,uint64,uint64,uint64,bool,uint64,uint64,uint64)", "struct": "MetaValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getPostExists", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getPost", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "(address,uint64,uint64,bool,uint64,bool,uint8,uint64,uint64,byte[])", "struct": "PostValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getVote", "args": [{ "type": "address", "name": "account" }, { "type": "byte[32]", "name": "ref" }], "returns": { "type": "(uint64,bool)", "struct": "VoteListValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getVotes", "args": [{ "type": "(address,byte[32])[]", "name": "keys" }], "returns": { "type": "(uint64,bool)[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getReactionExists", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "uint64", "name": "NFT" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "byte[]", "name": "ref" }, { "type": "string", "name": "refTypeName" }, { "type": "byte[]", "name": "refTypeSchema" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "AkitaSocialMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "payWallMbr", "args": [{ "type": "((uint8,uint64,uint64)[],(uint8,uint64,uint64)[])", "struct": "ViewPayWallValue", "name": "paywall" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkTipMbrRequirements", "args": [{ "type": "uint64", "name": "akitaDAO" }, { "type": "address", "name": "creator" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(uint8,uint64)", "struct": "tipMBRInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "payWallId": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGF5d2FsbF9pZA==" }, "refTypeCounter": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmX3R5cGVfY291bnRlcg==" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "posts": { "keyType": "AVMBytes", "valueType": "PostValue", "desc": "All the posts on the network", "prefix": "cA==" }, "paywall": { "keyType": "uint64", "valueType": "ViewPayWallValue", "desc": "Pay wall information for posts", "prefix": "dw==" }, "votes": { "keyType": "AVMBytes", "valueType": "VotesValue", "desc": "Counters for each post to track votes", "prefix": "dg==" }, "votelist": { "keyType": "VoteListKey", "valueType": "VoteListValue", "desc": "User votes and their impact", "prefix": "bw==" }, "reactions": { "keyType": "ReactionsKey", "valueType": "uint64", "desc": "Counters for each post to track reactions", "prefix": "cg==" }, "reactionlist": { "keyType": "ReactionListKey", "valueType": "AVMBytes", "desc": "Who has reacted to what", "prefix": "ZQ==" }, "meta": { "keyType": "address", "valueType": "MetaValue", "desc": "The meta data for each user", "prefix": "bQ==" }, "refTypes": { "keyType": "uint64", "valueType": "RefTypeValue", "desc": "Registered ref types (key = uint64 ID, value = name + external flag + schema)", "prefix": "dA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2514, 2873, 3525, 3903, 3962, 4012, 4090, 4655, 5137, 5419, 5458, 5634, 6091, 6153, 6211, 6436, 6969, 7366], "errorMessage": "Box must have value" }, { "pc": [738, 1040, 1167, 3229, 3293, 3596, 4823, 5551, 7714, 7954], "errorMessage": "Bytes has valid prefix" }, { "pc": [1337], "errorMessage": "ERR:AOPT" }, { "pc": [2863, 7230], "errorMessage": "ERR:ARCT" }, { "pc": [6988], "errorMessage": "ERR:AUTO" }, { "pc": [6942], "errorMessage": "ERR:AVOT" }, { "pc": [4846, 6391, 6675], "errorMessage": "ERR:BAND" }, { "pc": [4879, 6697], "errorMessage": "ERR:BLKD" }, { "pc": [5109], "errorMessage": "ERR:EAMD" }, { "pc": [3099], "errorMessage": "ERR:EMTA" }, { "pc": [6513, 6805], "errorMessage": "ERR:EPST" }, { "pc": [1799, 2149, 2695], "errorMessage": "ERR:FGTE" }, { "pc": [1985, 2279, 2791, 4665], "errorMessage": "ERR:HGTE" }, { "pc": [4714], "errorMessage": "ERR:IAPP" }, { "pc": [4594], "errorMessage": "ERR:IAST" }, { "pc": [3131, 3394, 3771, 7088, 7138, 7357, 7564], "errorMessage": "ERR:IPAY" }, { "pc": [6465], "errorMessage": "ERR:IPWL" }, { "pc": [4545, 4572, 4636, 4691], "errorMessage": "ERR:IRFL" }, { "pc": [1590], "errorMessage": "ERR:ISRP" }, { "pc": [4454], "errorMessage": "ERR:IUPG" }, { "pc": [7463], "errorMessage": "ERR:IXFR" }, { "pc": [5332], "errorMessage": "ERR:NARP" }, { "pc": [3740, 4382, 4425, 4490], "errorMessage": "ERR:NDAO" }, { "pc": [5079], "errorMessage": "ERR:NEDT" }, { "pc": [3658], "errorMessage": "ERR:NGRF" }, { "pc": [2964], "errorMessage": "ERR:NMDX" }, { "pc": [3495, 6086], "errorMessage": "ERR:NMTA" }, { "pc": [7196], "errorMessage": "ERR:NONT" }, { "pc": [1539, 2402, 2980, 3960, 4862, 4953], "errorMessage": "ERR:NPST" }, { "pc": [3518], "errorMessage": "ERR:NPWL" }, { "pc": [5268], "errorMessage": "ERR:NRPL" }, { "pc": [4761], "errorMessage": "ERR:NRTP" }, { "pc": [2511, 4010], "errorMessage": "ERR:NVOT" }, { "pc": [6962], "errorMessage": "ERR:SVOT" }, { "pc": [4906], "errorMessage": "ERR:TSOL" }, { "pc": [902, 6741, 7051, 7274], "errorMessage": "IPCT" }, { "pc": [625], "errorMessage": "Length must be 16" }, { "pc": [4546, 4607, 4637, 4727, 5367], "errorMessage": "Length must be 32" }, { "pc": [977, 1067, 1083, 1089, 1188, 2948, 3147, 3642, 3732, 4374, 4417, 4482, 4698, 4731, 5592, 5864, 5921, 6634, 7149, 7587], "errorMessage": "application exists" }, { "pc": [4579, 4611], "errorMessage": "asset exists" }, { "pc": [1308, 1781, 2131, 2677, 2938, 3067, 3135, 3399, 3547, 3633, 3725, 3776, 4367, 4410, 4429, 4475, 4778, 5507, 5575, 5587, 5642, 5661, 5684, 5730, 5859, 5913, 6597, 6629, 6706, 6721, 6992, 7008, 7144, 7239, 7397, 7497, 7672], "errorMessage": "check GlobalState exists" }, { "pc": [4060], "errorMessage": "index access is out of bounds" }, { "pc": [2406, 2996, 3001, 3669, 3674, 4866, 4958, 4963, 5006, 5033, 5042, 5052, 5060, 5376, 6130, 6143, 6163, 6684], "errorMessage": "index out of bounds" }, { "pc": [741, 956, 1243, 1284, 1685, 1887, 2333, 2624, 2736, 3336, 3359, 3692, 3708, 4025, 4182, 4198, 4214, 4255, 4278, 4356, 4394, 7840, 7852], "errorMessage": "invalid array length header" }, { "pc": [1423, 1723, 1925, 2360, 2483, 2922, 3030], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [4037], "errorMessage": "invalid number of bytes for arc4.dynamic_array<ObjectE3B8A401>" }, { "pc": [1250, 1692, 1894, 2340, 2631, 2743, 3699, 3715, 4189, 4205, 4221, 4401], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1397, 1668, 1870], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 24>" }, { "pc": [1514, 2074, 2221, 2475, 2815, 2914, 3022, 3611, 3852, 3870, 3897, 3918, 3945, 3977, 3986, 4147, 4315], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1406, 1502, 1679, 1881, 2062, 2209], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [1261, 1387, 1414, 1433, 1442, 1522, 1658, 1703, 1712, 1735, 1746, 1860, 1905, 1914, 1937, 1948, 2082, 2229, 2351, 2642, 2651, 2754, 2763, 2823, 2932, 3043, 3053, 3063, 3432, 3440, 3450, 3460, 3470, 3479, 3619, 3627, 4155, 4305, 4323, 4468], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [4828, 7719, 7959], "errorMessage": "invalid number of bytes for bool" }, { "pc": [747], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [3367, 4286], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::ViewPayWallValue" }, { "pc": [1289, 4361], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1045, 1172, 3233, 3298, 3600, 5556], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [3328, 4247], "errorMessage": "invalid tail pointer at index 0 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1276, 4348], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [3351, 4270], "errorMessage": "invalid tail pointer at index 1 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1271, 3323, 3346, 4242, 4265, 4343], "errorMessage": "invalid tuple encoding" }, { "pc": [1650, 2050, 2618], "errorMessage": "transaction type is appl" }, { "pc": [1379, 1491, 1639, 1852, 2039, 2197, 2327, 2463, 2607, 2730], "errorMessage": "transaction type is axfer" }, { "pc": [1368, 1480, 1628, 1841, 2028, 2186, 2316, 2452, 2596, 2719, 3013, 3314, 3686], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgMTMyMDAgMzE3MDAgODY0MDAgNjcwMDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAweDAwICIiICJwIiAibSIgMHgxNCAiYWtpdGFfYXNzZXRzIiAiYWtpdGFfZXNjcm93IiAic2FsIiAiRVJSOklQQVkiICJzb2NpYWxfZmVlcyIgIkVSUjpOUFNUIiAweDAwMDAgMHgwMyAibyIgMHgwMSAiRVJSOkhHVEUiICJ3IiAid2FsbGV0IiAiRVJSOk5EQU8iICJFUlI6SVJGTCIgInBheXdhbGxfaWQiICJyZWZfdHlwZV9jb3VudGVyIiAiYWFsIiAweDBhIDB4MDIgIkVSUjpGR1RFIiAiciIgMHgyN2UzYmI0ZiAicGFsIiAiRVJSOkJBTkQiIDB4MDAwMSAidmVyc2lvbiIgIkVSUjpOVk9UIiAiRVJSOkFSQ1QiICJFUlI6Tk1UQSIgMHgwMDAwMDAwMDAwMDAwMDAwMDAgIkVSUjpCTEtEIiAweDY4MzVlM2JjICJFUlI6RVBTVCIgMHgwMDRkCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIHBheVdhbGxJZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEFraXRhU29jaWFsR2xvYmFsU3RhdGVLZXlzUGF5d2FsbElELCBpbml0aWFsVmFsdWU6IDEgfSkKICAgIGJ5dGVjIDIyIC8vICJwYXl3YWxsX2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHJlZlR5cGVDb3VudGVyID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQWtpdGFTb2NpYWxHbG9iYWxTdGF0ZUtleXNSZWZUeXBlQ291bnRlciwgaW5pdGlhbFZhbHVlOiBCdWlsdEluUmVmVHlwZUNvdW50IH0pCiAgICBieXRlYyAyMyAvLyAicmVmX3R5cGVfY291bnRlciIKICAgIHB1c2hpbnQgNAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI2LTMyCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbCBleHRlbmRzIGNsYXNzZXMoQmFzZVNvY2lhbCwgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNi0zMgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWwgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4pIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BANDAKICAgIHB1c2hieXRlc3MgMHg4M2YxNDc0OCAweDhlNTA3ZjFiIDB4MzM1YjNhOWMgMHhlMTVhODQyYiAweDAxMDI0NWRhIDB4ZjY1YTQ3YmQgMHhiZmY4YzNiNSAweDNhOWZkYTVlIDB4ODRmYTRiNWUgMHg1YWY2MDIyNyAweDYzNTk4YTE4IDB4NmU1Yjc3MDIgMHg1MTBlZGViNiAweDg1NjQzM2VhIDB4ZDA5ZjNkZTggMHg2OWE0ZWY5NyAweDMzMDZiMzJhIDB4OTVmOWYxYTMgMHhlM2JlZjk0MyAweGU2ZTY3YmRjIDB4NzM5ZWE3MGIgMHhjMDIyYmU4OSAweDk4YjgxZjc4IDB4OWUxNzRiYjYgMHhhODkxMjA0NCAweGYxMzYwMGQxIDB4MTQzMjRmYjcgMHhhMTM0YTI3OCAweDM0NDE3NWYwIDB4YWU4NGNiZDggMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAiaW5pdCgpdm9pZCIsIG1ldGhvZCAicG9zdChwYXksYXhmZXIsdWludDY0LGJ5dGVbMjRdLGJ5dGVbMzZdLHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZWRpdFBvc3QocGF5LGF4ZmVyLGJ5dGVbMzZdLGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJnYXRlZFJlcGx5KHBheSxheGZlcixhcHBsLHVpbnQ2NCxieXRlWzI0XSxieXRlWzM2XSxieXRlW10sdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVwbHkocGF5LGF4ZmVyLHVpbnQ2NCxieXRlWzI0XSxieXRlWzM2XSxieXRlW10sdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRFZGl0UmVwbHkocGF5LGF4ZmVyLGFwcGwsYnl0ZVszNl0sYnl0ZVszMl0sdWludDY0KXZvaWQiLCBtZXRob2QgImVkaXRSZXBseShwYXksYXhmZXIsYnl0ZVszNl0sYnl0ZVszMl0sdWludDY0KXZvaWQiLCBtZXRob2QgInZvdGUocGF5LGF4ZmVyLGJ5dGVbXSx1aW50NjQsYm9vbCl2b2lkIiwgbWV0aG9kICJlZGl0Vm90ZShwYXksYXhmZXIsYnl0ZVszMl0sYm9vbCl2b2lkIiwgbWV0aG9kICJnYXRlZFJlYWN0KHBheSxheGZlcixhcHBsLGJ5dGVbXSx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgInJlYWN0KHBheSxheGZlcixieXRlW10sdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkZWxldGVSZWFjdGlvbihieXRlWzMyXSx1aW50NjQpdm9pZCIsIG1ldGhvZCAic2V0UG9zdE1vZGVyYXRpb24oYnl0ZVszMl0sYm9vbCx1aW50NjQpdm9pZCIsIG1ldGhvZCAiaW5pdE1ldGEocGF5LGFkZHJlc3MsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImNyZWF0ZVBheVdhbGwocGF5LCgodWludDgsdWludDY0LHVpbnQ2NClbXSwodWludDgsdWludDY0LHVpbnQ2NClbXSkpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVNZXRhKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUZvbGxvd2VyTWV0YShhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVnaXN0ZXJSZWZUeXBlKHBheSxzdHJpbmcsYnl0ZVtdKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0U29jaWFsSW1wYWN0SW5wdXRzKGFkZHJlc3MpKGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbCkiLCBtZXRob2QgImdldE1ldGFFeGlzdHMoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRNZXRhKGFkZHJlc3MpKGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImdldFBvc3RFeGlzdHMoYnl0ZVszMl0pYm9vbCIsIG1ldGhvZCAiZ2V0UG9zdChieXRlWzMyXSkoYWRkcmVzcyx1aW50NjQsdWludDY0LGJvb2wsdWludDY0LGJvb2wsdWludDgsdWludDY0LHVpbnQ2NCxieXRlW10pIiwgbWV0aG9kICJnZXRWb3RlKGFkZHJlc3MsYnl0ZVszMl0pKHVpbnQ2NCxib29sKSIsIG1ldGhvZCAiZ2V0Vm90ZXMoKGFkZHJlc3MsYnl0ZVszMl0pW10pKHVpbnQ2NCxib29sKVtdIiwgbWV0aG9kICJnZXRSZWFjdGlvbkV4aXN0cyhieXRlWzMyXSx1aW50NjQpYm9vbCIsIG1ldGhvZCAibWJyKGJ5dGVbXSxzdHJpbmcsYnl0ZVtdKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInBheVdhbGxNYnIoKCh1aW50OCx1aW50NjQsdWludDY0KVtdLCh1aW50OCx1aW50NjQsdWludDY0KVtdKSl1aW50NjQiLCBtZXRob2QgImNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCkodWludDgsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBwb3N0IGVkaXRQb3N0IGdhdGVkUmVwbHkgcmVwbHkgZ2F0ZWRFZGl0UmVwbHkgZWRpdFJlcGx5IHZvdGUgZWRpdFZvdGUgZ2F0ZWRSZWFjdCByZWFjdCBkZWxldGVSZWFjdGlvbiBzZXRQb3N0TW9kZXJhdGlvbiBpbml0TWV0YSBjcmVhdGVQYXlXYWxsIHVwZGF0ZU1ldGEgdXBkYXRlRm9sbG93ZXJNZXRhIHJlZ2lzdGVyUmVmVHlwZSBnZXRTb2NpYWxJbXBhY3RJbnB1dHMgZ2V0TWV0YUV4aXN0cyBnZXRNZXRhIGdldFBvc3RFeGlzdHMgZ2V0UG9zdCBnZXRWb3RlIGdldFZvdGVzIGdldFJlYWN0aW9uRXhpc3RzIG1iciBwYXlXYWxsTWJyIGNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAzOAogICAgZXJyCgptYWluX29wVXBfcm91dGVAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MQogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEA0MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNi0zMgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWwgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweDVhZDlmNGM2IC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6YjE2KGI6IGJ5dGVzKSAtPiBieXRlczoKYjE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYjE2KGI6IGJ5dGVzKTogYnl0ZXM8MTY+IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzCiAgICAvLyByZXR1cm4gYi5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmltcGFjdFJhbmdlKGltcGFjdDogdWludDY0LCBtaW46IHVpbnQ2NCwgbWF4OiB1aW50NjQpIC0+IHVpbnQ2NDoKaW1wYWN0UmFuZ2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGltcGFjdFJhbmdlKGltcGFjdDogdWludDY0LCBtaW46IHVpbnQ2NCwgbWF4OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogaW1wYWN0UmFuZ2VfdGVybmFyeV9mYWxzZUAyCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMSAvLyAxCiAgICAtCgppbXBhY3RSYW5nZV90ZXJuYXJ5X21lcmdlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgKgogICAgcHVzaGludCAxMDAwCiAgICAvCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIC0KICAgIHJldHN1YgoKaW1wYWN0UmFuZ2VfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGltcGFjdFJhbmdlX3Rlcm5hcnlfbWVyZ2VAMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXRJRDogdWludDY0KSAtPiBieXRlczoKcmVmZXJyZXJPclplcm9BZGRyZXNzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0SUQ6IEFwcGxpY2F0aW9uKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiByZWZlcnJlck9yWmVyb0FkZHJlc3NfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIHJldHN1YgoKcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lmX2Vsc2VAMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NQogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICBwdXNoYnl0ZXMgInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU86IHVpbnQ2NCwgYWRkcmVzczogYnl0ZXMpIC0+IHVpbnQ2NDoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhZGRyZXNzOiBBY2NvdW50KTogQXBwbGljYXRpb24gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5CiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGJ5dGVzICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4Ni0xODkKICAgIC8vIGNvbnN0IGRhdGEgPSBhYmlDYWxsPHR5cGVvZiBFc2Nyb3dGYWN0b3J5LnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGVzY3Jvd0ZhY3RvcnksCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4M2MxYTZmMzMgLy8gbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTkxCiAgICAvLyBpZiAoQnl0ZXMoZGF0YSkubGVuZ3RoID09PSAwIHx8IEJ5dGVzKGRhdGEpLmxlbmd0aCAhPT0gOCkgewogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ6IGdldFdhbGxldElEVXNpbmdBa2l0YURBT19pZl9ib2R5QDYKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pZl9lbHNlQDcKCmdldFdhbGxldElEVXNpbmdBa2l0YURBT19pZl9ib2R5QDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTkyCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MgogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGdldFdhbGxldElEKGVzY3Jvd0ZhY3RvcnksIGFkZHJlc3MpKQogICAgc3dhcAogICAgcmV0c3ViCgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTUKICAgIC8vIHJldHVybiBidG9pKGRhdGEpCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MgogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGdldFdhbGxldElEKGVzY3Jvd0ZhY3RvcnksIGFkZHJlc3MpKQogICAgYiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2F0ZUNoZWNrKGdhdGVUeG46IHVpbnQ2NCwgYWtpdGFEQU86IHVpbnQ2NCwgY2FsbGVyOiBieXRlcywgaWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpnYXRlQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdhdGVDaGVjayhnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjYWxsZXI6IEFjY291bnQsIGlkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUwCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MAogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUxCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUxCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUyCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUzCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU0CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjU0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDgtMjU1CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ4LTI1NQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpzZW5kUmVmZXJyYWxQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDcKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiBSZWZlcnJhbFBheW1lbnRJbmZvIHsKICAgIHByb3RvIDMgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDgKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA5CiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXQpCiAgICBjYWxsc3ViIHJlZmVycmVyT3JaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTIKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgKICAgIC8vIGNvbnN0IFt3YWxsZXRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0RmVlcykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAid2FsbGV0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxNAogICAgLy8gY29uc3QgeyByZWZlcnJlclBlcmNlbnRhZ2UgfSA9IGdldFdhbGxldEZlZXMoYWtpdGFEQU8pCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTcKICAgIC8vIGlmIChyZWZlcnJhbEZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE4CiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjQKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNQogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICBkdXAKICAgIHB1c2hpbnQgNjA0ODAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNgogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMAogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDMyIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMjQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM2CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM5CiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDQxNzAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MAogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2Vsc2VfYm9keUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDEtNTUyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ1CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDYKICAgIC8vIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIGRpZyAyCiAgICBmcmFtZV9kaWcgMAogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ0LTU0NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDEtNTUyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDgKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDkKICAgIC8vIGV4cGlyYXRpb24sCiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MS01NTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4N2I3ZGM1ZmMgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTMKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEtNjI5CiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBleHRyYWN0IDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAwCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFJlZmVycmFsUGF5bWVudF9lbHNlX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1NAogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfaWZfYm9keUAxNAogICAgZGlnIDEKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY5CiAgICAvLyBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgc3dhcAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3OC01OTAKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODIKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgxLTU4NAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODUKICAgIC8vIHRyYW5zZmVyVHhuLAogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2OC01NzIKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHN1bSwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3OC01OTAKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4NgogICAgLy8gdGltZVRvVW5sb2NrLAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4NwogICAgLy8gZXhwaXJhdGlvbiwKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTc4LTU5MAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhhZjFhMTRmMiAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBiIHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTUKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Ni01NjUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYwCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYxCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTktNTYyCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTYtNTY1CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYzCiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Ni01NjUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDM5NGVhZWIyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTUKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzQKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDMzIC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgwMgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDggLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDQKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODAwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuaW5pdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODA4CiAgICAvLyBjb25zdCBha3RhID0gQXNzZXQoZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBieXRlYyA3IC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODA4CiAgICAvLyBjb25zdCBha3RhID0gQXNzZXQoZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODA5CiAgICAvLyBsb2dnZWRBc3NlcnQoIUdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihha3RhKSwgRVJSX0FMUkVBRFlfT1BURURfSU4pCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGluaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkFPUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QU9QVAoKaW5pdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MTEtODE3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFrdGEKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODEzCiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgxNAogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODExLTgxNgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgxMS04MTcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODA3CiAgICAvLyBpbml0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwucG9zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnBvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODIyLTgzMgogICAgLy8gcG9zdCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG5vbmNlOiBieXRlczwyND4sCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMjQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDI0PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MzMKICAgIC8vIGNvbnN0IHBvc3RLZXkgPSB0aGlzLmNvbXB1dGVQb3N0S2V5KHRpbWVzdGFtcCwgbm9uY2UpCiAgICB1bmNvdmVyIDYKICAgIHVuY292ZXIgNgogICAgY2FsbHN1YiBjb21wdXRlUG9zdEtleQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblBvc3QpCiAgICB1bmNvdmVyIDYKICAgIGJ5dGVjIDI1IC8vIDB4MGEKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIHRoaXMuY3JlYXRlUG9zdChwb3N0S2V5LCBtYnJQYXltZW50LCBjaWQsIGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBQb3N0VHlwZVBvc3QsIEJ5dGVzKCcnKSwgY3JlYXRvckZsYWdzKQogICAgY292ZXIgNgogICAgY292ZXIgNgogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBieXRlY18zIC8vICIiCiAgICB1bmNvdmVyIDgKICAgIGNhbGxzdWIgY3JlYXRlUG9zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgyMi04MzIKICAgIC8vIHBvc3QoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBub25jZTogYnl0ZXM8MjQ+LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5lZGl0UG9zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVkaXRQb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgzOS04NDUKICAgIC8vIGVkaXRQb3N0KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucG9zdHMoYW1lbmRtZW50KS5leGlzdHMsIEVSUl9QT1NUX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGVkaXRQb3N0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMiAvLyAiRVJSOk5QU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBTVAoKZWRpdFBvc3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBjb25zdCB7IGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBwb3N0VHlwZSwgZWRpdEtleSB9ID0gdGhpcy52ZXJpZnlFZGl0QW1lbmRtZW50KGFtZW5kbWVudCwgY2lkKQogICAgZGlnIDIKICAgIGRpZyAyCiAgICBjYWxsc3ViIHZlcmlmeUVkaXRBbWVuZG1lbnQKICAgIGR1cAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA1CiAgICBkdXAKICAgIHB1c2hpbnQgODAKICAgIGdldGJpdAogICAgY292ZXIgNQogICAgZHVwCiAgICBwdXNoaW50IDExCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgNQogICAgZHVwCiAgICBleHRyYWN0IDE5IDEKICAgIHN3YXAKICAgIGV4dHJhY3QgMjAgMzIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NDgKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc1JlcGx5KHBvc3RUeXBlKSwgRVJSX0lTX0FfUkVQTFkpCiAgICBjYWxsc3ViIGlzUmVwbHkKICAgIGJ6IGVkaXRQb3N0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJU1JQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklTUlAKCmVkaXRQb3N0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg1MAogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblBvc3QpCiAgICBzd2FwCiAgICBieXRlYyAyNSAvLyAweDBhCiAgICBjYWxsc3ViIHZhbGlkYXRlVGlwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyB0aGlzLmNyZWF0ZVBvc3QoZWRpdEtleSwgbWJyUGF5bWVudCwgY2lkLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgUG9zdFR5cGVFZGl0UG9zdCwgYW1lbmRtZW50LCBjcmVhdG9yRmxhZ3MpCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA2CiAgICB1bmNvdmVyIDYKICAgIHVuY292ZXIgNgogICAgYnl0ZWMgMjYgLy8gMHgwMgogICAgdW5jb3ZlciA3CiAgICB1bmNvdmVyIDgKICAgIGNhbGxzdWIgY3JlYXRlUG9zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgzOS04NDUKICAgIC8vIGVkaXRQb3N0KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdhdGVkUmVwbHlbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFJlcGx5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg1NC04NjcKICAgIC8vIGdhdGVkUmVwbHkoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICB0aW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbm9uY2U6IGJ5dGVzPDI0PiwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIHJlZjogYnl0ZXMsCiAgICAvLyAgIHR5cGU6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMjQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDI0PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciA1CiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciA4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODY4CiAgICAvLyBjb25zdCByZXBseUtleSA9IHRoaXMuY29tcHV0ZVBvc3RLZXkodGltZXN0YW1wLCBub25jZSkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNvbXB1dGVQb3N0S2V5CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODcwCiAgICAvLyBjb25zdCB7IHJlZkJ5dGVzLCBhZGRlZE1iciwgcG9zdEdhdGVJRCB9ID0gdGhpcy5yZXNvbHZlUGFyZW50Q29udGV4dCh0eXBlLCByZWYpCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlc29sdmVQYXJlbnRDb250ZXh0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMwogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NzEKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgcG9zdEdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NzEKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgcG9zdEdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZFJlcGx5X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNyAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRSZXBseV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NzMKICAgIC8vIHRoaXMudmFsaWRhdGVUaXAodGlwLCBUaXBBY3Rpb25SZWFjdCkKICAgIHVuY292ZXIgMwogICAgYnl0ZWMgNiAvLyAweDE0CiAgICBjYWxsc3ViIHZhbGlkYXRlVGlwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyB0aGlzLmNyZWF0ZVJlcGx5KHJlcGx5S2V5LCBtYnJQYXltZW50LCBhZGRlZE1iciwgY2lkLCByZWZCeXRlcywgZ2F0ZUlELCB1c2VQYXlXYWxsLCBwYXlXYWxsSUQsIFBvc3RUeXBlUmVwbHksIEJ5dGVzKCcnKSwgY3JlYXRvckZsYWdzKQogICAgc3dhcAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICBieXRlYyAxNiAvLyAweDAxCiAgICBieXRlY18zIC8vICIiCiAgICB1bmNvdmVyIDEwCiAgICBjYWxsc3ViIGNyZWF0ZVJlcGx5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODU0LTg2NwogICAgLy8gZ2F0ZWRSZXBseSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBub25jZTogYnl0ZXM8MjQ+LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnJlcGx5W3JvdXRpbmddKCkgLT4gdm9pZDoKcmVwbHk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODc3LTg4OQogICAgLy8gcmVwbHkoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBub25jZTogYnl0ZXM8MjQ+LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMjQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDI0PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDcKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciA3CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA3CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyBjb25zdCByZXBseUtleSA9IHRoaXMuY29tcHV0ZVBvc3RLZXkodGltZXN0YW1wLCBub25jZSkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNvbXB1dGVQb3N0S2V5CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODkyCiAgICAvLyBjb25zdCB7IHJlZkJ5dGVzLCBhZGRlZE1iciwgcG9zdEdhdGVJRCB9ID0gdGhpcy5yZXNvbHZlUGFyZW50Q29udGV4dCh0eXBlLCByZWYpCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlc29sdmVQYXJlbnRDb250ZXh0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4OTMKICAgIC8vIGxvZ2dlZEFzc2VydChwb3N0R2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiByZXBseV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTcgLy8gIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCnJlcGx5X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg5NQogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgdW5jb3ZlciAzCiAgICBieXRlYyA2IC8vIDB4MTQKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4OTYKICAgIC8vIHRoaXMuY3JlYXRlUmVwbHkocmVwbHlLZXksIG1iclBheW1lbnQsIGFkZGVkTWJyLCBjaWQsIHJlZkJ5dGVzLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgUG9zdFR5cGVSZXBseSwgQnl0ZXMoJycpLCBjcmVhdG9yRmxhZ3MpCiAgICBzd2FwCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIGJ5dGVjIDE2IC8vIDB4MDEKICAgIGJ5dGVjXzMgLy8gIiIKICAgIHVuY292ZXIgMTAKICAgIGNhbGxzdWIgY3JlYXRlUmVwbHkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4NzctODg5CiAgICAvLyByZXBseSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG5vbmNlOiBieXRlczwyND4sCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICB1c2VQYXlXYWxsOiBib29sZWFuLAogICAgLy8gICBwYXlXYWxsSUQ6IHVpbnQ2NCwKICAgIC8vICAgY3JlYXRvckZsYWdzOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2F0ZWRFZGl0UmVwbHlbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEVkaXRSZXBseToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4OTktOTA2CiAgICAvLyBnYXRlZEVkaXRSZXBseSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICBhbWVuZG1lbnQ6IGJ5dGVzPDMyPiwKICAgIC8vICAgY3JlYXRvckZsYWdzOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyBjb25zdCB7IHBhcmVudFBvc3RSZWYsIG9nUG9zdEdhdGVJRCwgZ2F0ZUlELCB1c2VQYXlXYWxsLCBwYXlXYWxsSUQsIGVkaXRLZXkgfSA9IHRoaXMucHJlcGFyZVJlcGx5RWRpdChhbWVuZG1lbnQsIGNpZCkKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJlcGFyZVJlcGx5RWRpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgZGlnIDEKICAgIHB1c2hpbnQgMzg0CiAgICBnZXRiaXQKICAgIGNvdmVyIDMKICAgIGRpZyAxCiAgICBwdXNoaW50IDQ5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgc3dhcAogICAgZXh0cmFjdCA1NyAzMgogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyLCBvZ1Bvc3RHYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTA4CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIG9nUG9zdEdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZEVkaXRSZXBseV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjcgLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkRWRpdFJlcGx5X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkxMAogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgdW5jb3ZlciA1CiAgICBieXRlYyA2IC8vIDB4MTQKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MTEKICAgIC8vIHRoaXMuY3JlYXRlUmVwbHkoZWRpdEtleSwgbWJyUGF5bWVudCwgMCwgY2lkLCBwYXJlbnRQb3N0UmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgUG9zdFR5cGVFZGl0UmVwbHksIGFtZW5kbWVudCwgY3JlYXRvckZsYWdzKQogICAgdW5jb3ZlciA2CiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgNwogICAgY292ZXIgNwogICAgY292ZXIgNwogICAgYnl0ZWMgMTQgLy8gMHgwMwogICAgdW5jb3ZlciAxMAogICAgdW5jb3ZlciAxMAogICAgY2FsbHN1YiBjcmVhdGVSZXBseQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg5OS05MDYKICAgIC8vIGdhdGVkRWRpdFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIGFtZW5kbWVudDogYnl0ZXM8MzI+LAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5lZGl0UmVwbHlbcm91dGluZ10oKSAtPiB2b2lkOgplZGl0UmVwbHk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTE0LTkyMAogICAgLy8gZWRpdFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzNgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzY+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MjEKICAgIC8vIGNvbnN0IHsgcGFyZW50UG9zdFJlZiwgb2dQb3N0R2F0ZUlELCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgZWRpdEtleSB9ID0gdGhpcy5wcmVwYXJlUmVwbHlFZGl0KGFtZW5kbWVudCwgY2lkKQogICAgc3dhcAogICAgY2FsbHN1YiBwcmVwYXJlUmVwbHlFZGl0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgcHVzaGludCAzODQKICAgIGdldGJpdAogICAgY292ZXIgMgogICAgZGlnIDEKICAgIHB1c2hpbnQgNDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBzd2FwCiAgICBleHRyYWN0IDU3IDMyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBsb2dnZWRBc3NlcnQob2dQb3N0R2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiBlZGl0UmVwbHlfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6SEdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpIR1RFCgplZGl0UmVwbHlfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTI0CiAgICAvLyB0aGlzLnZhbGlkYXRlVGlwKHRpcCwgVGlwQWN0aW9uUmVhY3QpCiAgICB1bmNvdmVyIDUKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gdGhpcy5jcmVhdGVSZXBseShlZGl0S2V5LCBtYnJQYXltZW50LCAwLCBjaWQsIHBhcmVudFBvc3RSZWYsIGdhdGVJRCwgdXNlUGF5V2FsbCwgcGF5V2FsbElELCBQb3N0VHlwZUVkaXRSZXBseSwgYW1lbmRtZW50LCBjcmVhdG9yRmxhZ3MpCiAgICB1bmNvdmVyIDYKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciA3CiAgICBjb3ZlciA3CiAgICBjb3ZlciA3CiAgICBieXRlYyAxNCAvLyAweDAzCiAgICB1bmNvdmVyIDEwCiAgICB1bmNvdmVyIDEwCiAgICBjYWxsc3ViIGNyZWF0ZVJlcGx5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTE0LTkyMAogICAgLy8gZWRpdFJlcGx5KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYW1lbmRtZW50OiBieXRlczwzMj4sCiAgICAvLyAgIGNyZWF0b3JGbGFnczogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnZvdGVbcm91dGluZ10oKSAtPiB2b2lkOgp2b3RlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkyOC05MzQKICAgIC8vIHZvdGUoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlZjogYnl0ZXMsCiAgICAvLyAgIHR5cGU6IHVpbnQ2NCwKICAgIC8vICAgaXNVcDogYm9vbGVhbgogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkzNQogICAgLy8gbGV0IHsgcmVmQnl0ZXMsIGNyZWF0b3IgfSA9IHRoaXMudG9CeXRlczMyKHR5cGUsIHJlZikKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHRvQnl0ZXMzMgogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMzIgMzIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MzYKICAgIC8vIGlmICh0eXBlID09PSBSZWZUeXBlUG9zdCkgewogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBieiB2b3RlX2FmdGVyX2lmX2Vsc2VANQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucG9zdHMocmVmQnl0ZXMpLmV4aXN0cywgRVJSX1BPU1RfTk9UX0ZPVU5EKTsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHZvdGVfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDEyIC8vICJFUlI6TlBTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUFNUCgp2b3RlX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjkzOAogICAgLy8gKHsgY3JlYXRvciB9ID0gdGhpcy5wb3N0cyhyZWZCeXRlcykudmFsdWUpOwogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgp2b3RlX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIGNvbnN0IGFkZGVkTWJyID0gdGhpcy5jcmVhdGVFbXB0eVBvc3RJZk5lY2Vzc2FyeShyZWZCeXRlcywgY3JlYXRvcikKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyB0aGlzLnZhbGlkYXRlVGlwKHRpcCwgVGlwQWN0aW9uUmVhY3QpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk0NAogICAgLy8gY29uc3QgbWJyTmVlZGVkOiB1aW50NjQgPSB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLnZvdGVsaXN0ICsgYWRkZWRNYnIKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk0NQogICAgLy8gdGhpcy5jcmVhdGVWb3RlKG1iclBheW1lbnQsIG1ick5lZWRlZCwgcmVmQnl0ZXMsIGlzVXApCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVZvdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MjgtOTM0CiAgICAvLyB2b3RlKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIGlzVXA6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZWRpdFZvdGVbcm91dGluZ10oKSAtPiB2b2lkOgplZGl0Vm90ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NDgtOTUzCiAgICAvLyBlZGl0Vm90ZSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlczwzMj4sCiAgICAvLyAgIGZsaXA6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBjb25zdCB2b3RlTGlzdEtleTogVm90ZUxpc3RLZXkgPSB7IHVzZXI6IGIxNihUeG4uc2VuZGVyLmJ5dGVzKSwgcmVmOiBiMTYocmVmKSB9CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGIxNgogICAgc3dhcAogICAgY2FsbHN1YiBiMTYKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyB2b3RlbGlzdCA9IEJveE1hcDxWb3RlTGlzdEtleSwgVm90ZUxpc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4Vm90ZUxpc3QgfSkKICAgIGJ5dGVjIDE1IC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnZvdGVsaXN0KHZvdGVMaXN0S2V5KS5leGlzdHMsIEVSUl9IQVZFTlRfVk9URUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBlZGl0Vm90ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjpOVk9UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5WT1QKCmVkaXRWb3RlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gY29uc3QgeyBpbXBhY3QsIGlzVXAgfSA9IHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCA2NAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTYwCiAgICAvLyB0aGlzLnVwZGF0ZVZvdGVzKHJlZiwgIWlzVXAsIGltcGFjdCkKICAgICEKICAgIGR1cAogICAgY292ZXIgMwogICAgZGlnIDYKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiB1cGRhdGVWb3RlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk2MwogICAgLy8gdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk2NgogICAgLy8gaWYgKCFmbGlwKSB7CiAgICBzd2FwCiAgICBibnogZWRpdFZvdGVfYWZ0ZXJfaWZfZWxzZUA2CiAgICBwb3BuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NjgtOTczCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkudm90ZWxpc3QKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTcwCiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NzEKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS52b3RlbGlzdAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk2OC05NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS52b3RlbGlzdAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk2OC05NzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS52b3RlbGlzdAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgplZGl0Vm90ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZWRpdFZvdGVANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NDgtOTUzCiAgICAvLyBlZGl0Vm90ZSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlczwzMj4sCiAgICAvLyAgIGZsaXA6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZWRpdFZvdGVfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gdGhpcy52YWxpZGF0ZVRpcCh0aXAsIFRpcEFjdGlvblJlYWN0KQogICAgc3dhcAogICAgYnl0ZWMgNiAvLyAweDE0CiAgICBjYWxsc3ViIHZhbGlkYXRlVGlwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTgwCiAgICAvLyB0aGlzLmNyZWF0ZVZvdGUobWJyUGF5bWVudCwgMCwgcmVmLCAhaXNVcCkKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVZvdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NDgtOTUzCiAgICAvLyBlZGl0Vm90ZSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVmOiBieXRlczwzMj4sCiAgICAvLyAgIGZsaXA6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgYiBlZGl0Vm90ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZWRpdFZvdGVANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2F0ZWRSZWFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkUmVhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTgzLTk5MAogICAgLy8gZ2F0ZWRSZWFjdCgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aXA6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlZjogYnl0ZXMsCiAgICAvLyAgIHR5cGU6IHVpbnQ2NCwKICAgIC8vICAgTkZUOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBjb25zdCB7IHJlZkJ5dGVzLCBhZGRlZE1iciwgcG9zdEdhdGVJRCB9ID0gdGhpcy5yZXNvbHZlUGFyZW50Q29udGV4dCh0eXBlLCByZWYpCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlc29sdmVQYXJlbnRDb250ZXh0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMwogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5OTIKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgcG9zdEdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5OTIKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgcG9zdEdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZFJlYWN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNyAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRSZWFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5OTQKICAgIC8vIHRoaXMudmFsaWRhdGVUaXAodGlwLCBUaXBBY3Rpb25SZWFjdCkKICAgIHN3YXAKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgY2FsbHN1YiB2YWxpZGF0ZVRpcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk5NQogICAgLy8gdGhpcy5jcmVhdGVSZWFjdGlvbihtYnJQYXltZW50LCBhZGRlZE1iciwgcmVmQnl0ZXMsIE5GVCkKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBjcmVhdGVSZWFjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk4My05OTAKICAgIC8vIGdhdGVkUmVhY3QoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIE5GVDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnJlYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKcmVhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTk4LTEwMDQKICAgIC8vIHJlYWN0KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIE5GVDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDA1CiAgICAvLyBjb25zdCB7IHJlZkJ5dGVzLCBhZGRlZE1iciwgcG9zdEdhdGVJRCB9ID0gdGhpcy5yZXNvbHZlUGFyZW50Q29udGV4dCh0eXBlLCByZWYpCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlc29sdmVQYXJlbnRDb250ZXh0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDA2CiAgICAvLyBsb2dnZWRBc3NlcnQocG9zdEdhdGVJRCA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgYnogcmVhY3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE3IC8vICJFUlI6SEdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpIR1RFCgpyZWFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyB0aGlzLnZhbGlkYXRlVGlwKHRpcCwgVGlwQWN0aW9uUmVhY3QpCiAgICBzd2FwCiAgICBieXRlYyA2IC8vIDB4MTQKICAgIGNhbGxzdWIgdmFsaWRhdGVUaXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDA5CiAgICAvLyB0aGlzLmNyZWF0ZVJlYWN0aW9uKG1iclBheW1lbnQsIGFkZGVkTWJyLCByZWZCeXRlcywgTkZUKQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVJlYWN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTk4LTEwMDQKICAgIC8vIHJlYWN0KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpcDogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gICB0eXBlOiB1aW50NjQsCiAgICAvLyAgIE5GVDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmRlbGV0ZVJlYWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlUmVhY3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gZGVsZXRlUmVhY3Rpb24ocmVmOiBieXRlczwzMj4sIE5GVDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxMwogICAgLy8gdGhpcy5sb2FkUG9zdFdpdGhBY2Nlc3NDaGVjayhyZWYpCiAgICBkaWcgMQogICAgY2FsbHN1YiBsb2FkUG9zdFdpdGhBY2Nlc3NDaGVjawogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxNQogICAgLy8gY29uc3QgcmVhY3Rpb25MaXN0S2V5OiBSZWFjdGlvbkxpc3RLZXkgPSB7IHVzZXI6IGIxNihUeG4uc2VuZGVyLmJ5dGVzKSwgcmVmOiBiMTYocmVmKSwgTkZUIH0KICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYjE2CiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYjE2CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIHJlYWN0aW9ubGlzdCA9IEJveE1hcDxSZWFjdGlvbkxpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhSZWFjdGlvbkxpc3QgfSkKICAgIHB1c2hieXRlcyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVhY3Rpb25saXN0KHJlYWN0aW9uTGlzdEtleSkuZXhpc3RzLCBFUlJfQUxSRUFEWV9SRUFDVEVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGVsZXRlUmVhY3Rpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6QVJDVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBUkNUCgpkZWxldGVSZWFjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDE5CiAgICAvLyB0aGlzLnJlYWN0aW9ucyh7IHJlZiwgTkZUIH0pLnZhbHVlIC09IDEKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyByZWFjdGlvbnMgPSBCb3hNYXA8UmVhY3Rpb25zS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFJlYWN0aW9ucyB9KQogICAgYnl0ZWMgMjggLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDE5CiAgICAvLyB0aGlzLnJlYWN0aW9ucyh7IHJlZiwgTkZUIH0pLnZhbHVlIC09IDEKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAyMAogICAgLy8gdGhpcy5yZWFjdGlvbmxpc3QocmVhY3Rpb25MaXN0S2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAyMi0xMDI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkucmVhY3Rpb25saXN0LAogICAgLy8gCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMjQKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMjUKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5yZWFjdGlvbmxpc3QsCiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgcHVzaGludCA0OAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAyMi0xMDI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkucmVhY3Rpb25saXN0LAogICAgLy8gCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAyMi0xMDI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkucmVhY3Rpb25saXN0LAogICAgLy8gCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDEyCiAgICAvLyBkZWxldGVSZWFjdGlvbihyZWY6IGJ5dGVzPDMyPiwgTkZUOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnNldFBvc3RNb2RlcmF0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UG9zdE1vZGVyYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTAzNwogICAgLy8gc2V0UG9zdE1vZGVyYXRpb24ocmVmOiBieXRlczwzMj4sIGFnYWluc3RDb250ZW50UG9saWN5OiBib29sZWFuLCBtb2RlcmF0b3JGbGFnczogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMzkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubW9kZXJhdGlvbikuYWRkcmVzcywgRVJSX05PVF9NT0RFUkFUSU9OKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMzkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubW9kZXJhdGlvbikuYWRkcmVzcywgRVJSX05PVF9NT0RFUkFUSU9OKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDM5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1vZGVyYXRpb24pLmFkZHJlc3MsIEVSUl9OT1RfTU9ERVJBVElPTikKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHNldFBvc3RNb2RlcmF0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpOTURYIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NRFgKCnNldFBvc3RNb2RlcmF0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucG9zdHMocmVmKS5leGlzdHMsIEVSUl9QT1NUX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldFBvc3RNb2RlcmF0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMiAvLyAiRVJSOk5QU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBTVAoKc2V0UG9zdE1vZGVyYXRpb25fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gdGhpcy5wb3N0cyhyZWYpLnZhbHVlLmFnYWluc3RDb250ZW50UG9saWN5ID0gYWdhaW5zdENvbnRlbnRQb2xpY3kKICAgIGR1cAogICAgcHVzaGludCA1NwogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA0CiAgICBzZXRiaXQKICAgIGRpZyAxCiAgICBwdXNoaW50IDU3CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0MgogICAgLy8gdGhpcy5wb3N0cyhyZWYpLnZhbHVlLm1vZGVyYXRvckZsYWdzID0gbW9kZXJhdG9yRmxhZ3MKICAgIHB1c2hpbnQgNjcKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDM3CiAgICAvLyBzZXRQb3N0TW9kZXJhdGlvbihyZWY6IGJ5dGVzPDMyPiwgYWdhaW5zdENvbnRlbnRQb2xpY3k6IGJvb2xlYW4sIG1vZGVyYXRvckZsYWdzOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmluaXRNZXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdE1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0NS0xMDUyCiAgICAvLyBpbml0TWV0YSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB1c2VyOiBBY2NvdW50LAogICAgLy8gICBhdXRvbWF0ZWQ6IGJvb2xlYW4sCiAgICAvLyAgIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsCiAgICAvLyAgIE5GRDogdWludDY0LAogICAgLy8gICBha2l0YU5GVDogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDUzCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgdXNlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDUzCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgdXNlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU0CiAgICAvLyBjb25zdCB1c2VySXNTZW5kZXIgPSAoVHhuLnNlbmRlciA9PT0gdXNlcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNTYKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5tZXRhKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX01FVEFfQUxSRUFEWV9FWElTVFMpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU2CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMubWV0YShUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9NRVRBX0FMUkVBRFlfRVhJU1RTKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBpbml0TWV0YV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6RU1UQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFTVRBCgppbml0TWV0YV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU5LTEwNjUKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5tZXRhICsgSW1wYWN0TWV0YU1CUgogICAgLy8gICB9CiAgICAvLyApLAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA2MgogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU5LTEwNjUKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5tZXRhICsgSW1wYWN0TWV0YU1CUgogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNjMKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5tZXRhICsgSW1wYWN0TWV0YU1CUgogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjIDYgLy8gMzE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDU5LTEwNjUKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5tZXRhICsgSW1wYWN0TWV0YU1CUgogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA1OC0xMDY3CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLm1ldGEgKyBJbXBhY3RNZXRhTUJSCiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogaW5pdE1ldGFfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDEwIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgppbml0TWV0YV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDY5CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA2OQogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmltcGFjdAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDY5CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA3MS0xMDc2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oaW1wYWN0KS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogSW1wYWN0TWV0YU1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDczCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oaW1wYWN0KS5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNzQKICAgIC8vIGFtb3VudDogSW1wYWN0TWV0YU1CUgogICAgaW50YyA2IC8vIDMxNzAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNzEtMTA3NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGltcGFjdCkuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEltcGFjdE1ldGFNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDcxLTEwNzYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihpbXBhY3QpLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBJbXBhY3RNZXRhTUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDc4CiAgICAvLyBpZiAoYXV0b21hdGVkKSB7CiAgICB1bmNvdmVyIDMKICAgIGJ6IGluaXRNZXRhX2FmdGVyX2lmX2Vsc2VAOQogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNzkKICAgIC8vIHRoaXMuY3JlYXRlRGVmYXVsdE1ldGEoVHhuLnNlbmRlciwgdXNlcklzU2VuZGVyLCB3YWxsZXQuaWQsIHRydWUpCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgY3JlYXRlRGVmYXVsdE1ldGEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDgxLTEwODkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5jYWNoZU1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IGltcGFjdCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgMCwKICAgIC8vICAgICAwLAogICAgLy8gICAgIDAKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDg0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwODUKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDgxLTEwODkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5jYWNoZU1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IGltcGFjdCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgMCwKICAgIC8vICAgICAwLAogICAgLy8gICAgIDAKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGJ5dGVjIDI5IC8vIG1ldGhvZCAiY2FjaGVNZXRhKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDkxCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmluaXRNZXRhX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pbml0TWV0YUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDQ1LTEwNTIKICAgIC8vIGluaXRNZXRhKAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHVzZXI6IEFjY291bnQsCiAgICAvLyAgIGF1dG9tYXRlZDogYm9vbGVhbiwKICAgIC8vICAgc3Vic2NyaXB0aW9uSW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgTkZEOiB1aW50NjQsCiAgICAvLyAgIGFraXRhTkZUOiB1aW50NjQsCiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdE1ldGFfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOTQKICAgIC8vIHRoaXMuY3JlYXRlRGVmYXVsdE1ldGEoVHhuLnNlbmRlciwgdXNlcklzU2VuZGVyLCB3YWxsZXQuaWQsIGZhbHNlKQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGNyZWF0ZURlZmF1bHRNZXRhCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEwMC0xMTA4CiAgICAvLyBjb25zdCBpbXBhY3RTY29yZSA9IGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5jYWNoZU1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IGltcGFjdCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgc3Vic2NyaXB0aW9uSW5kZXgsCiAgICAvLyAgICAgTkZELAogICAgLy8gICAgIGFraXRhTkZUCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEwMwogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMDAtMTEwOAogICAgLy8gY29uc3QgaW1wYWN0U2NvcmUgPSBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuY2FjaGVNZXRhPih7CiAgICAvLyAgIGFwcElkOiBpbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHN1YnNjcmlwdGlvbkluZGV4LAogICAgLy8gICAgIE5GRCwKICAgIC8vICAgICBha2l0YU5GVAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJjYWNoZU1ldGEoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTQKICAgIC8vIHJldHVybiBpbXBhY3RTY29yZSArIDEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA0NS0xMDUyCiAgICAvLyBpbml0TWV0YSgKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB1c2VyOiBBY2NvdW50LAogICAgLy8gICBhdXRvbWF0ZWQ6IGJvb2xlYW4sCiAgICAvLyAgIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsCiAgICAvLyAgIE5GRDogdWludDY0LAogICAgLy8gICBha2l0YU5GVDogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIGIgaW5pdE1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmluaXRNZXRhQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jcmVhdGVQYXlXYWxsW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlUGF5V2FsbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTE3CiAgICAvLyBjcmVhdGVQYXlXYWxsKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgcGF5V2FsbDogVmlld1BheVdhbGxWYWx1ZSk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSwobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIHB1c2hpbnQgNgogICAgKwogICAgZGlnIDIKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICgobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSwobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc29jaWFsL3R5cGVzLnRzOjpWaWV3UGF5V2FsbFZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTExOS0xMTI3CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHsKICAgIC8vICAgICAgIGdyZWF0ZXJUaGFuRXE6IHRoaXMucGF5V2FsbE1icihwYXlXYWxsKQogICAgLy8gICAgIH0KICAgIC8vICAgfQogICAgLy8gKSwKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMjIKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTExOS0xMTI3CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHsKICAgIC8vICAgICAgIGdyZWF0ZXJUaGFuRXE6IHRoaXMucGF5V2FsbE1icihwYXlXYWxsKQogICAgLy8gICAgIH0KICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMjQKICAgIC8vIGdyZWF0ZXJUaGFuRXE6IHRoaXMucGF5V2FsbE1icihwYXlXYWxsKQogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5wYXlXYWxsTWJyCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTExOS0xMTI3CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHsKICAgIC8vICAgICAgIGdyZWF0ZXJUaGFuRXE6IHRoaXMucGF5V2FsbE1icihwYXlXYWxsKQogICAgLy8gICAgIH0KICAgIC8vICAgfQogICAgLy8gKSwKICAgID49CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTgtMTEyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaCgKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogewogICAgLy8gICAgICAgICBncmVhdGVyVGhhbkVxOiB0aGlzLnBheVdhbGxNYnIocGF5V2FsbCkKICAgIC8vICAgICAgIH0KICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBjcmVhdGVQYXlXYWxsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlUGF5V2FsbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTMxCiAgICAvLyBjb25zdCBpZCA9IHRoaXMucGF5V2FsbElkLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2CiAgICAvLyBwYXlXYWxsSWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBa2l0YVNvY2lhbEdsb2JhbFN0YXRlS2V5c1BheXdhbGxJRCwgaW5pdGlhbFZhbHVlOiAxIH0pCiAgICBieXRlYyAyMiAvLyAicGF5d2FsbF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTMxCiAgICAvLyBjb25zdCBpZCA9IHRoaXMucGF5V2FsbElkLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMzIKICAgIC8vIHRoaXMucGF5V2FsbElkLnZhbHVlKysKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNgogICAgLy8gcGF5V2FsbElkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQWtpdGFTb2NpYWxHbG9iYWxTdGF0ZUtleXNQYXl3YWxsSUQsIGluaXRpYWxWYWx1ZTogMSB9KQogICAgYnl0ZWMgMjIgLy8gInBheXdhbGxfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTEzMgogICAgLy8gdGhpcy5wYXlXYWxsSWQudmFsdWUrKwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTM0CiAgICAvLyB0aGlzLnBheXdhbGwoaWQpLnZhbHVlID0gY2xvbmUocGF5V2FsbCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NQogICAgLy8gcGF5d2FsbCA9IEJveE1hcDx1aW50NjQsIFZpZXdQYXlXYWxsVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbGJveFByZWZpeFBheVdhbGwgfSkKICAgIGJ5dGVjIDE4IC8vICJ3IgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMzQKICAgIC8vIHRoaXMucGF5d2FsbChpZCkudmFsdWUgPSBjbG9uZShwYXlXYWxsKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMTcKICAgIC8vIGNyZWF0ZVBheVdhbGwobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBwYXlXYWxsOiBWaWV3UGF5V2FsbFZhbHVlKTogdWludDY0IHsKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnVwZGF0ZU1ldGFbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVNZXRhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMzktMTE0NgogICAgLy8gdXBkYXRlTWV0YSgKICAgIC8vICAgZm9sbG93R2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIGFkZHJlc3NHYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgc3Vic2NyaXB0aW9uSW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgTkZEOiB1aW50NjQsCiAgICAvLyAgIGFraXRhTkZUOiB1aW50NjQsCiAgICAvLyAgIGRlZmF1bHRQYXlXYWxsSUQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1ldGEoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTUVUQV9ET0VTTlRfRVhJU1QpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tZXRhKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX01FVEFfRE9FU05UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdXBkYXRlTWV0YV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzYgLy8gIkVSUjpOTVRBIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NVEEKCnVwZGF0ZU1ldGFfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5d2FsbChkZWZhdWx0UGF5V2FsbElEKS5leGlzdHMsIEVSUl9QQVlXQUxMX05PVF9GT1VORCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NQogICAgLy8gcGF5d2FsbCA9IEJveE1hcDx1aW50NjQsIFZpZXdQYXlXYWxsVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbGJveFByZWZpeFBheVdhbGwgfSkKICAgIGJ5dGVjIDE4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGF5d2FsbChkZWZhdWx0UGF5V2FsbElEKS5leGlzdHMsIEVSUl9QQVlXQUxMX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVwZGF0ZU1ldGFfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOk5QV0wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBXTAoKdXBkYXRlTWV0YV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NQogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1ldGEgfSkKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE1NQogICAgLy8gY29uc3QgbSA9IGNsb25lKHRoaXMubWV0YShUeG4uc2VuZGVyKS52YWx1ZSkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NQogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1ldGEgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNTUKICAgIC8vIGNvbnN0IG0gPSBjbG9uZSh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNTYKICAgIC8vIG0uZm9sbG93R2F0ZUlEID0gZm9sbG93R2F0ZUlECiAgICB1bmNvdmVyIDMKICAgIHJlcGxhY2UyIDUwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE1NwogICAgLy8gbS5hZGRyZXNzR2F0ZUlEID0gYWRkcmVzc0dhdGVJRAogICAgdW5jb3ZlciAyCiAgICByZXBsYWNlMiA1OAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNTgKICAgIC8vIG0uZGVmYXVsdFBheVdhbGxJRCA9IGRlZmF1bHRQYXlXYWxsSUQKICAgIHN3YXAKICAgIHJlcGxhY2UyIDY2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNTkKICAgIC8vIHRoaXMubWV0YShUeG4uc2VuZGVyKS52YWx1ZSA9IGNsb25lKG0pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTU5CiAgICAvLyB0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUgPSBjbG9uZShtKQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNjEKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5pbXBhY3QKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTYxCiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgOSAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNjEKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5pbXBhY3QKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE2Mi0xMTcwCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuY2FjaGVNZXRhPih7CiAgICAvLyAgIGFwcElkOiBpbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHN1YnNjcmlwdGlvbkluZGV4LAogICAgLy8gICAgIE5GRCwKICAgIC8vICAgICBha2l0YU5GVAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNjUKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTYyLTExNzAKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5jYWNoZU1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IGltcGFjdCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgc3Vic2NyaXB0aW9uSW5kZXgsCiAgICAvLyAgICAgTkZELAogICAgLy8gICAgIGFraXRhTkZUCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBieXRlYyAyOSAvLyBtZXRob2QgImNhY2hlTWV0YShhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExMzktMTE0NgogICAgLy8gdXBkYXRlTWV0YSgKICAgIC8vICAgZm9sbG93R2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIGFkZHJlc3NHYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgc3Vic2NyaXB0aW9uSW5kZXg6IHVpbnQ2NCwKICAgIC8vICAgTkZEOiB1aW50NjQsCiAgICAvLyAgIGFraXRhTkZUOiB1aW50NjQsCiAgICAvLyAgIGRlZmF1bHRQYXlXYWxsSUQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC51cGRhdGVGb2xsb3dlck1ldGFbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVGb2xsb3dlck1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE3MwogICAgLy8gdXBkYXRlRm9sbG93ZXJNZXRhKGFkZHJlc3M6IEFjY291bnQsIG5ld0ZvbGxvd2VySW5kZXg6IHVpbnQ2NCwgbmV3Rm9sbG93ZXJDb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE3NAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCkuYWRkcmVzcywgRVJSX05PVF9HUkFQSCkKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTc0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmdyYXBoKS5hZGRyZXNzLCBFUlJfTk9UX0dSQVBIKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTc0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmdyYXBoKS5hZGRyZXNzLCBFUlJfTk9UX0dSQVBIKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUZvbGxvd2VyTWV0YV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6TkdSRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOR1JGCgp1cGRhdGVGb2xsb3dlck1ldGFfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTc1CiAgICAvLyB0aGlzLm1ldGEoYWRkcmVzcykudmFsdWUuZm9sbG93ZXJJbmRleCA9IG5ld0ZvbGxvd2VySW5kZXgKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgdW5jb3ZlciA0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNzYKICAgIC8vIHRoaXMubWV0YShhZGRyZXNzKS52YWx1ZS5mb2xsb3dlckNvdW50ID0gbmV3Rm9sbG93ZXJDb3VudAogICAgcHVzaGludCA0MQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNzMKICAgIC8vIHVwZGF0ZUZvbGxvd2VyTWV0YShhZGRyZXNzOiBBY2NvdW50LCBuZXdGb2xsb3dlckluZGV4OiB1aW50NjQsIG5ld0ZvbGxvd2VyQ291bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwucmVnaXN0ZXJSZWZUeXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVnaXN0ZXJSZWZUeXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODEKICAgIC8vIHJlZ2lzdGVyUmVmVHlwZShtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG5hbWU6IHN0cmluZywgc2NoZW1hOiBieXRlcyk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTgyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiByZWdpc3RlclJlZlR5cGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgpyZWdpc3RlclJlZlR5cGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4NS0xMTkxCiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgbmFtZSwgc2NoZW1hKS5yZWZUeXBlcwogICAgLy8gICB9CiAgICAvLyApLAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4OAogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTg1LTExOTEKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCBuYW1lLCBzY2hlbWEpLnJlZlR5cGVzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4OQogICAgLy8gYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksIG5hbWUsIHNjaGVtYSkucmVmVHlwZXMKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGRpZyAzCiAgICBkaWcgNQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODUtMTE5MQogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksIG5hbWUsIHNjaGVtYSkucmVmVHlwZXMKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExODQtMTE5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaCgKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCBuYW1lLCBzY2hlbWEpLnJlZlR5cGVzCiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogcmVnaXN0ZXJSZWZUeXBlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKcmVnaXN0ZXJSZWZUeXBlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExOTUKICAgIC8vIHRoaXMucmVmVHlwZUNvdW50ZXIudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozOAogICAgLy8gcmVmVHlwZUNvdW50ZXIgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBa2l0YVNvY2lhbEdsb2JhbFN0YXRlS2V5c1JlZlR5cGVDb3VudGVyLCBpbml0aWFsVmFsdWU6IEJ1aWx0SW5SZWZUeXBlQ291bnQgfSkKICAgIGJ5dGVjIDIzIC8vICJyZWZfdHlwZV9jb3VudGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExOTUKICAgIC8vIHRoaXMucmVmVHlwZUNvdW50ZXIudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHJlZlR5cGVDb3VudGVyID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQWtpdGFTb2NpYWxHbG9iYWxTdGF0ZUtleXNSZWZUeXBlQ291bnRlciwgaW5pdGlhbFZhbHVlOiBCdWlsdEluUmVmVHlwZUNvdW50IH0pCiAgICBieXRlYyAyMyAvLyAicmVmX3R5cGVfY291bnRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTk1CiAgICAvLyB0aGlzLnJlZlR5cGVDb3VudGVyLnZhbHVlICs9IDEKICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExOTgKICAgIC8vIHRoaXMucmVmVHlwZXMoaWQpLnZhbHVlID0geyBuYW1lLCBzY2hlbWEgfQogICAgc3dhcAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQKICAgICsKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBwdXNoYnl0ZXMgMHgwMDA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NwogICAgLy8gcmVmVHlwZXMgPSBCb3hNYXA8dWludDY0LCBSZWZUeXBlVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFJlZlR5cGVzIH0pCiAgICBwdXNoYnl0ZXMgInQiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE5OAogICAgLy8gdGhpcy5yZWZUeXBlcyhpZCkudmFsdWUgPSB7IG5hbWUsIHNjaGVtYSB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE4MQogICAgLy8gcmVnaXN0ZXJSZWZUeXBlKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbmFtZTogc3RyaW5nLCBzY2hlbWE6IGJ5dGVzKTogdWludDY0IHsKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldFNvY2lhbEltcGFjdElucHV0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFNvY2lhbEltcGFjdElucHV0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjI0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjI2CiAgICAvLyByZXR1cm4gdGhpcy5yZWFkU29jaWFsSW1wYWN0SW5wdXRzKHVzZXIpCiAgICBjYWxsc3ViIHJlYWRTb2NpYWxJbXBhY3RJbnB1dHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjI0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldE1ldGFFeGlzdHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRNZXRhRXhpc3RzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMzEKICAgIC8vIHJldHVybiB0aGlzLm1ldGEodXNlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjI5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRNZXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0TWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjM0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NQogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1ldGEgfSkKICAgIGJ5dGVjIDUgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjM2CiAgICAvLyByZXR1cm4gdGhpcy5tZXRhKHVzZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0UG9zdEV4aXN0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFBvc3RFeGlzdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI0MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNDIKICAgIC8vIHJldHVybiB0aGlzLnBvc3RzKHJlZikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRQb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0UG9zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQ1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MwogICAgLy8gcG9zdHMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBQb3N0VmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFBvc3RzIH0pCiAgICBieXRlYyA0IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQ3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wb3N0cyhyZWYpLmV4aXN0cywgRVJSX1BPU1RfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0UG9zdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUFNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QU1QKCmdldFBvc3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI0OAogICAgLy8gcmV0dXJuIHRoaXMucG9zdHMocmVmKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQ1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldFZvdGVbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRWb3RlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTMKICAgIC8vIGNvbnN0IHZvdGVMaXN0S2V5OiBWb3RlTGlzdEtleSA9IHsgdXNlcjogYjE2KGFjY291bnQuYnl0ZXMpLCByZWY6IGIxNihyZWYpIH0KICAgIHN3YXAKICAgIGNhbGxzdWIgYjE2CiAgICBzd2FwCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnZvdGVsaXN0KHZvdGVMaXN0S2V5KS5leGlzdHMsIEVSUl9IQVZFTlRfVk9URUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRWb3RlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNCAvLyAiRVJSOk5WT1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlZPVAoKZ2V0Vm90ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjU2CiAgICAvLyByZXR1cm4gdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI1MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5nZXRWb3Rlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFZvdGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNTkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDY0CiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8T2JqZWN0RTNCOEE0MDE+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI2MQogICAgLy8gY29uc3Qgdm90ZXM6IFZvdGVMaXN0VmFsdWVbXSA9IFtdCiAgICBieXRlYyAxMyAvLyAweDAwMDAKICAgIGludGNfMCAvLyAwCgpnZXRWb3Rlc19mb3JfaGVhZGVyQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI2MgogICAgLy8gZm9yIChjb25zdCB7IHVzZXIsIHJlZiB9IG9mIGNsb25lKGtleXMpKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRWb3Rlc19hZnRlcl9mb3JAOAogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCA2NAogICAgKgogICAgcHVzaGludCA2NAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjMKICAgIC8vIGNvbnN0IHZvdGVMaXN0S2V5OiBWb3RlTGlzdEtleSA9IHsgdXNlcjogYjE2KHVzZXIuYnl0ZXMpLCByZWY6IGIxNihyZWYpIH0KICAgIHN3YXAKICAgIGNhbGxzdWIgYjE2CiAgICBzd2FwCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjQKICAgIC8vIGlmICh0aGlzLnZvdGVsaXN0KHZvdGVMaXN0S2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0Vm90ZXNfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjY1CiAgICAvLyB2b3Rlcy5wdXNoKHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjY1CiAgICAvLyB2b3Rlcy5wdXNoKHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLnZhbHVlKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKCmdldFZvdGVzX2FmdGVyX2lmX2Vsc2VANjoKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGdldFZvdGVzX2Zvcl9oZWFkZXJAMgoKZ2V0Vm90ZXNfZWxzZV9ib2R5QDU6CiAgICBwb3AKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI2NwogICAgLy8gdm90ZXMucHVzaCh7IGltcGFjdDogMCwgaXNVcDogZmFsc2UgfSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyNjcKICAgIC8vIHZvdGVzLnB1c2goeyBpbXBhY3Q6IDAsIGlzVXA6IGZhbHNlIH0pCiAgICBieXRlYyAzNyAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMAogICAgY29uY2F0CiAgICBzd2FwCiAgICBiIGdldFZvdGVzX2FmdGVyX2lmX2Vsc2VANgoKZ2V0Vm90ZXNfYWZ0ZXJfZm9yQDg6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjU5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmdldFJlYWN0aW9uRXhpc3RzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0UmVhY3Rpb25FeGlzdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI3NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI3NgogICAgLy8gcmV0dXJuIHRoaXMucmVhY3Rpb25zKHsgcmVmLCBORlQgfSkuZXhpc3RzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MQogICAgLy8gcmVhY3Rpb25zID0gQm94TWFwPFJlYWN0aW9uc0tleSwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhSZWFjdGlvbnMgfSkKICAgIGJ5dGVjIDI4IC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI3NgogICAgLy8gcmV0dXJuIHRoaXMucmVhY3Rpb25zKHsgcmVmLCBORlQgfSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjc0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNQogICAgLy8gbWJyKHJlZjogYnl0ZXMsIHJlZlR5cGVOYW1lOiBzdHJpbmcsIHJlZlR5cGVTY2hlbWE6IGJ5dGVzKTogQWtpdGFTb2NpYWxNQlJEYXRhIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5wYXlXYWxsTWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKcGF5V2FsbE1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czozNAogICAgLy8gcGF5V2FsbE1icihwYXl3YWxsOiBWaWV3UGF5V2FsbFZhbHVlKTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSwobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIHB1c2hpbnQgNgogICAgKwogICAgZGlnIDIKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICgobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSwobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc29jaWFsL3R5cGVzLnRzOjpWaWV3UGF5V2FsbFZhbHVlCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5wYXlXYWxsTWJyCiAgICBwb3AKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNbcm91dGluZ10oKSAtPiB2b2lkOgpjaGVja1RpcE1iclJlcXVpcmVtZW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NQogICAgLy8gY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjcmVhdG9yOiBBY2NvdW50LCB3YWxsZXQ6IEFwcGxpY2F0aW9uKTogdGlwTUJSSW5mbyB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50cwogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyMCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGNvbmZpZykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIwIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAzMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBFUlJfSU5WQUxJRF9VUEdSQURFKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJVVBHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklVUEcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAzMyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuaXNSZXBseShwb3N0VHlwZTogYnl0ZXMpIC0+IHVpbnQ2NDoKaXNSZXBseToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NQogICAgLy8gcHJpdmF0ZSBpc1JlcGx5KHBvc3RUeXBlOiBQb3N0VHlwZSk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIHJldHVybiBwb3N0VHlwZSA9PT0gUG9zdFR5cGVSZXBseSB8fCBwb3N0VHlwZSA9PT0gUG9zdFR5cGVFZGl0UmVwbHkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTYgLy8gMHgwMQogICAgPT0KICAgIGJueiBpc1JlcGx5X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDE0IC8vIDB4MDMKICAgID09CiAgICBieiBpc1JlcGx5X2Jvb2xfZmFsc2VAMwoKaXNSZXBseV9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIHJldHVybiBwb3N0VHlwZSA9PT0gUG9zdFR5cGVSZXBseSB8fCBwb3N0VHlwZSA9PT0gUG9zdFR5cGVFZGl0UmVwbHkKICAgIHJldHN1YgoKaXNSZXBseV9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyByZXR1cm4gcG9zdFR5cGUgPT09IFBvc3RUeXBlUmVwbHkgfHwgcG9zdFR5cGUgPT09IFBvc3RUeXBlRWRpdFJlcGx5CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnRvQnl0ZXMzMih0eXBlOiB1aW50NjQsIHJlZjogYnl0ZXMpIC0+IGJ5dGVzOgp0b0J5dGVzMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIHByaXZhdGUgdG9CeXRlczMyKHR5cGU6IHVpbnQ2NCwgcmVmOiBieXRlcyk6IHsgcmVmQnl0ZXM6IGJ5dGVzPDMyPiwgY3JlYXRvcjogQWNjb3VudCB9IHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5NwogICAgLy8gbGV0IGNyZWF0b3I6IEFjY291bnQgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyBjYXNlIFJlZlR5cGVQb3N0OgogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5OS0xMDIKICAgIC8vIGNhc2UgUmVmVHlwZVBvc3Q6CiAgICAvLyAgIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIC8vICAgcmVmQnl0ZXMgPSByZWYudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIC8vICAgYnJlYWsKICAgIGJ6IHRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgZHVwCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyMSAvLyAiRVJSOklSRkwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJGTAoKdG9CeXRlczMyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gcmVmQnl0ZXMgPSByZWYudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAzMgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCgp0b0J5dGVzMzJfYmxvY2tAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM1CiAgICAvLyByZXR1cm4geyByZWZCeXRlcywgY3JlYXRvciB9CiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VANToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMwogICAgLy8gY2FzZSBSZWZUeXBlQXNzZXQ6CiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMyAvLyAyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwMy0xMDgKICAgIC8vIGNhc2UgUmVmVHlwZUFzc2V0OgogICAgLy8gICBsb2dnZWRBc3NlcnQocmVmLmxlbmd0aCA9PT0gOCwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIC8vICAgbG9nZ2VkQXNzZXJ0KEFzc2V0KGJ0b2kocmVmKSkudG90YWwgPiAwLCBFUlJfSU5WQUxJRF9BU1NFVCkKICAgIC8vICAgcmVmQnl0ZXMgPSByZWYuY29uY2F0KG9wLmJ6ZXJvKDI0KSkudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIC8vICAgY3JlYXRvciA9IEFzc2V0KGJ0b2kocmVmKSkuY3JlYXRvcgogICAgLy8gICBicmVhawogICAgYnogdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDQKICAgIC8vIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSA4LCBFUlJfSU5WQUxJRF9SRUZfTEVOR1RIKQogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYm56IHRvQnl0ZXMzMl9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMjEgLy8gIkVSUjpJUkZMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSRkwKCnRvQnl0ZXMzMl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldChidG9pKHJlZikpLnRvdGFsID4gMCwgRVJSX0lOVkFMSURfQVNTRVQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ0b2kKICAgIGR1cAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFRvdGFsCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6SUFTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVNUCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gcmVmQnl0ZXMgPSByZWYuY29uY2F0KG9wLmJ6ZXJvKDI0KSkudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIHB1c2hpbnQgMjQKICAgIGJ6ZXJvCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIGNyZWF0b3IgPSBBc3NldChidG9pKHJlZikpLmNyZWF0b3IKICAgIHN3YXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyBicmVhawogICAgYiB0b0J5dGVzMzJfYmxvY2tAMzIKCnRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gY2FzZSBSZWZUeXBlQWRkcmVzczoKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEwOS0xMTkKICAgIC8vIGNhc2UgUmVmVHlwZUFkZHJlc3M6CiAgICAvLyAgIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIC8vICAgcmVmQnl0ZXMgPSByZWYudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIC8vICAgY3JlYXRvciA9IEFjY291bnQocmVmQnl0ZXMpCiAgICAvLyAKICAgIC8vICAgaWYgKHRoaXMubWV0YShjcmVhdG9yKS5leGlzdHMpIHsKICAgIC8vICAgICBjb25zdCB7IGFkZHJlc3NHYXRlSUQgfSA9IHRoaXMubWV0YShjcmVhdG9yKS52YWx1ZQogICAgLy8gICAgIGxvZ2dlZEFzc2VydChhZGRyZXNzR2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICAvLyAgIH0KICAgIC8vIAogICAgLy8gICBicmVhawogICAgYnogdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSAzMiwgRVJSX0lOVkFMSURfUkVGX0xFTkdUSCkKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgZHVwCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAxNgogICAgYnl0ZWMgMjEgLy8gIkVSUjpJUkZMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSRkwKCnRvQnl0ZXMzMl9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTExCiAgICAvLyByZWZCeXRlcyA9IHJlZi50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyBpZiAodGhpcy5tZXRhKGNyZWF0b3IpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB0b0J5dGVzMzJfYWZ0ZXJfaWZfZWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gY29uc3QgeyBhZGRyZXNzR2F0ZUlEIH0gPSB0aGlzLm1ldGEoY3JlYXRvcikudmFsdWUKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA1OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIGxvZ2dlZEFzc2VydChhZGRyZXNzR2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBieiB0b0J5dGVzMzJfYWZ0ZXJfaWZfZWxzZUAyMAogICAgYnl0ZWMgMTcgLy8gIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCnRvQnl0ZXMzMl9hZnRlcl9pZl9lbHNlQDIwOgogICAgZnJhbWVfZGlnIC0xCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMTkKICAgIC8vIGJyZWFrCiAgICBiIHRvQnl0ZXMzMl9ibG9ja0AzMgoKdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBjYXNlIFJlZlR5cGVBcHA6CiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjAtMTI1CiAgICAvLyBjYXNlIFJlZlR5cGVBcHA6CiAgICAvLyAgIGxvZ2dlZEFzc2VydChyZWYubGVuZ3RoID09PSA4LCBFUlJfSU5WQUxJRF9SRUZfTEVOR1RIKQogICAgLy8gICBsb2dnZWRBc3NlcnQoQXBwbGljYXRpb24oYnRvaShyZWYpKS5hcHByb3ZhbFByb2dyYW0ubGVuZ3RoID4gMCwgRVJSX0lOVkFMSURfQVBQKQogICAgLy8gICByZWZCeXRlcyA9IHJlZi5jb25jYXQob3AuYnplcm8oMjQpKS50b0ZpeGVkKHsgbGVuZ3RoOiAzMiB9KQogICAgLy8gICBjcmVhdG9yID0gQXBwbGljYXRpb24oYnRvaShyZWYpKS5jcmVhdG9yCiAgICAvLyAgIGJyZWFrCiAgICBieiB0b0J5dGVzMzJfYWZ0ZXJfaWZfZWxzZUAyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlZi5sZW5ndGggPT09IDgsIEVSUl9JTlZBTElEX1JFRl9MRU5HVEgpCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgMjEgLy8gIkVSUjpJUkZMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklSRkwKCnRvQnl0ZXMzMl9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBsb2dnZWRBc3NlcnQoQXBwbGljYXRpb24oYnRvaShyZWYpKS5hcHByb3ZhbFByb2dyYW0ubGVuZ3RoID4gMCwgRVJSX0lOVkFMSURfQVBQKQogICAgZnJhbWVfZGlnIC0xCiAgICBidG9pCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFwcHJvdmFsUHJvZ3JhbQogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgbGVuCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAyNwogICAgcHVzaGJ5dGVzICJFUlI6SUFQUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVBQCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMwogICAgLy8gcmVmQnl0ZXMgPSByZWYuY29uY2F0KG9wLmJ6ZXJvKDI0KSkudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIHB1c2hpbnQgMjQKICAgIGJ6ZXJvCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIGNyZWF0b3IgPSBBcHBsaWNhdGlvbihidG9pKHJlZikpLmNyZWF0b3IKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGJyZWFrCiAgICBiIHRvQnl0ZXMzMl9ibG9ja0AzMgoKdG9CeXRlczMyX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZWZUeXBlcyh0eXBlKS5leGlzdHMsIEVSUl9SRUZfVFlQRV9OT1RfRk9VTkQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3CiAgICAvLyByZWZUeXBlcyA9IEJveE1hcDx1aW50NjQsIFJlZlR5cGVWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UmVmVHlwZXMgfSkKICAgIHB1c2hieXRlcyAidCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmVHlwZXModHlwZSkuZXhpc3RzLCBFUlJfUkVGX1RZUEVfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdG9CeXRlczMyX2FmdGVyX2Fzc2VydEAzMQogICAgcHVzaGJ5dGVzICJFUlI6TlJUUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUlRQCgp0b0J5dGVzMzJfYWZ0ZXJfYXNzZXJ0QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gcmVmQnl0ZXMgPSBvcC5zaGEyNTYoaXRvYih0eXBlKS5jb25jYXQocmVmKSkKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzEKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gYnJlYWsKICAgIGIgdG9CeXRlczMyX2Jsb2NrQDMyCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5pc0Jsb2NrZWQodXNlcjogYnl0ZXMsIGJsb2NrZWQ6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzQmxvY2tlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHByaXZhdGUgaXNCbG9ja2VkKHVzZXI6IEFjY291bnQsIGJsb2NrZWQ6IEFjY291bnQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEzOS0xNDIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEdyYXBoLnByb3RvdHlwZS5pc0Jsb2NrZWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCwKICAgIC8vICAgYXJnczogW3VzZXIsIGJsb2NrZWRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuZ3JhcGgsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgOSAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ncmFwaCwKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTM5LTE0MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsR3JhcGgucHJvdG90eXBlLmlzQmxvY2tlZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmdyYXBoLAogICAgLy8gICBhcmdzOiBbdXNlciwgYmxvY2tlZF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg0MzAzNjY4ZSAvLyBtZXRob2QgImlzQmxvY2tlZChhZGRyZXNzLGFkZHJlc3MpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5sb2FkUG9zdFdpdGhBY2Nlc3NDaGVjayhyZWY6IGJ5dGVzKSAtPiBieXRlczoKbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBwcml2YXRlIGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrKHJlZjogYnl0ZXM8MzI+KTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jhbm5lZChUeG4uc2VuZGVyKSwgRVJSX0JBTk5FRCkKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgaXNCYW5uZWQKICAgIGJ6IGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMSAvLyAiRVJSOkJBTkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkFORAoKbG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2tfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBvc3RzKHJlZikuZXhpc3RzLCBFUlJfUE9TVF9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsb2FkUG9zdFdpdGhBY2Nlc3NDaGVja19hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUFNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QU1QKCmxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gY29uc3QgeyBjcmVhdG9yIH0gPSB0aGlzLnBvc3RzKHJlZikudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCbG9ja2VkKGNyZWF0b3IsIFR4bi5zZW5kZXIpLCBFUlJfQkxPQ0tFRCkKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgaXNCbG9ja2VkCiAgICBieiBsb2FkUG9zdFdpdGhBY2Nlc3NDaGVja19hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMzggLy8gIkVSUjpCTEtEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJMS0QKCmxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gcmV0dXJuIGNyZWF0b3IKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY29tcHV0ZVBvc3RLZXkodGltZXN0YW1wOiB1aW50NjQsIG5vbmNlOiBieXRlcykgLT4gYnl0ZXM6CmNvbXB1dGVQb3N0S2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gcHJpdmF0ZSBjb21wdXRlUG9zdEtleSh0aW1lc3RhbXA6IHVpbnQ2NCwgbm9uY2U6IGJ5dGVzPDI0Pik6IGJ5dGVzPDMyPiB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gdGltZXN0YW1wIDw9IE1BWF9USU1FU1RBTVBfRFJJRlQsIEVSUl9USU1FU1RBTVBfVE9PX09MRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgcHVzaGludCA2MAogICAgPD0KICAgIGJueiBjb21wdXRlUG9zdEtleV9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6VFNPTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUU09MCgpjb21wdXRlUG9zdEtleV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIHJldHVybiBvcC5zaGEyNTYoVHhuLnNlbmRlci5ieXRlcy5jb25jYXQoaXRvYih0aW1lc3RhbXApKS5jb25jYXQobm9uY2UpKQogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBzaGEyNTYKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwucmVzb2x2ZVBhcmVudENvbnRleHQodHlwZTogdWludDY0LCByZWY6IGJ5dGVzKSAtPiBieXRlczoKcmVzb2x2ZVBhcmVudENvbnRleHQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTcyLTE3NQogICAgLy8gcHJpdmF0ZSByZXNvbHZlUGFyZW50Q29udGV4dCgKICAgIC8vICAgdHlwZTogdWludDY0LAogICAgLy8gICByZWY6IGJ5dGVzLAogICAgLy8gKTogeyByZWZCeXRlczogYnl0ZXM8MzI+LCBhZGRlZE1icjogdWludDY0LCBwb3N0R2F0ZUlEOiB1aW50NjQgfSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIGNvbnN0IHsgcmVmQnl0ZXMsIGNyZWF0b3I6IGZhbGxiYWNrIH0gPSB0aGlzLnRvQnl0ZXMzMih0eXBlLCByZWYpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiB0b0J5dGVzMzIKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCAzMiAzMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucG9zdHMocmVmQnl0ZXMpLmV4aXN0cywgRVJSX1BPU1RfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVzb2x2ZVBhcmVudENvbnRleHRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDEyIC8vICJFUlI6TlBTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUFNUCgpyZXNvbHZlUGFyZW50Q29udGV4dF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxNzkKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgZ2F0ZUlEOiBwb3N0R2F0ZUlEIH0gPSB0aGlzLnBvc3RzKHJlZkJ5dGVzKS52YWx1ZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgNDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gY29uc3QgYyA9IChmYWxsYmFjayA9PT0gR2xvYmFsLnplcm9BZGRyZXNzKSA/IGNyZWF0b3IgOiBmYWxsYmFjawogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE4MgogICAgLy8gY29uc3QgYWRkZWRNYnIgPSB0aGlzLmNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5KHJlZkJ5dGVzLCBjKQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBjcmVhdGVFbXB0eVBvc3RJZk5lY2Vzc2FyeQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gcmV0dXJuIHsgcmVmQnl0ZXMsIGFkZGVkTWJyLCBwb3N0R2F0ZUlEIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnZlcmlmeUVkaXRBbWVuZG1lbnQoYW1lbmRtZW50OiBieXRlcywgY2lkOiBieXRlcykgLT4gYnl0ZXM6CnZlcmlmeUVkaXRBbWVuZG1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTk1LTIwMgogICAgLy8gcHJpdmF0ZSB2ZXJpZnlFZGl0QW1lbmRtZW50KGFtZW5kbWVudDogYnl0ZXM8MzI+LCBjaWQ6IENJRCk6IHsKICAgIC8vICAgcmVmOiBieXRlcywKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBwb3N0VHlwZTogUG9zdFR5cGUsCiAgICAvLyAgIGVkaXRLZXk6IGJ5dGVzPDMyPiwKICAgIC8vIH0gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDMKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgcmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUgfSA9IHRoaXMucG9zdHMoYW1lbmRtZW50KS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCA3NwogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNzcKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA0OAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCA0OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBwdXNoaW50IDU4CiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzQ3JlYXRvcihjcmVhdG9yLCBUeG4uc2VuZGVyKSwgRVJSX05PVF9ZT1VSX1BPU1RfVE9fRURJVCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MgogICAgLy8gcmV0dXJuIGNyZWF0b3IgPT09IHNlbmRlcgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzQ3JlYXRvcihjcmVhdG9yLCBUeG4uc2VuZGVyKSwgRVJSX05PVF9ZT1VSX1BPU1RfVE9fRURJVCkKICAgIGJueiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjpORURUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FRFQKCnZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIGNhc2UgUG9zdFR5cGVQb3N0OgogICAgZHVwCiAgICBieXRlY18yIC8vIDB4MDAKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzYtNzcKICAgIC8vIGNhc2UgUG9zdFR5cGVQb3N0OgogICAgLy8gICByZXR1cm4gMzYKICAgIGJ6IHZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIHJldHVybiAzNgogICAgcHVzaGludCAzNgoKdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MgogICAgLy8gcmV0dXJuIHJlZi5sZW5ndGggPiBiYXNlTGVuZ3RoCiAgICBkaWcgMgogICAgbGVuCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzQW1lbmRlZChyZWYsIHBvc3RUeXBlKSwgRVJSX0lTX0FMUkVBRFlfQU1FTkRFRCkKICAgIGJ6IHZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOkVBTUQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUFNRAoKdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIGNvbnN0IGVkaXRLZXkgPSBvcC5zaGEyNTYoVHhuLnNlbmRlci5ieXRlcy5jb25jYXQoYW1lbmRtZW50KS5jb25jYXQoQnl0ZXMoY2lkKSkpCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gdGhpcy5wb3N0cyhhbWVuZG1lbnQpLnZhbHVlLnJlZiA9IHJlZi5jb25jYXQoQnl0ZXMoJ2EnKS5jb25jYXQoZWRpdEtleSkpCiAgICBwdXNoYnl0ZXMgImEiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgcHVzaGludCA3NQogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gcmV0dXJuIHsgcmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUsIGVkaXRLZXkgfQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwMzQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA3CiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICByZXRzdWIKCnZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4CiAgICAvLyBjYXNlIFBvc3RUeXBlUmVwbHk6CiAgICBkdXAKICAgIGJ5dGVjIDE2IC8vIDB4MDEKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzgtNzkKICAgIC8vIGNhc2UgUG9zdFR5cGVSZXBseToKICAgIC8vICAgcmV0dXJuIDY4CiAgICBieiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyByZXR1cm4gNjgKICAgIHB1c2hpbnQgNjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gY29uc3QgYmFzZUxlbmd0aCA9IHRoaXMuZ2V0QmFzZVJlZkxlbmd0aChwb3N0VHlwZSkKICAgIGIgdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNAoKdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGNhc2UgUG9zdFR5cGVFZGl0UG9zdDoKICAgIGR1cAogICAgYnl0ZWMgMjYgLy8gMHgwMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MC04MQogICAgLy8gY2FzZSBQb3N0VHlwZUVkaXRQb3N0OgogICAgLy8gICByZXR1cm4gNjgKICAgIGJ6IHZlcmlmeUVkaXRBbWVuZG1lbnRfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyByZXR1cm4gNjgKICAgIHB1c2hpbnQgNjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gY29uc3QgYmFzZUxlbmd0aCA9IHRoaXMuZ2V0QmFzZVJlZkxlbmd0aChwb3N0VHlwZSkKICAgIGIgdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNAoKdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgyCiAgICAvLyBjYXNlIFBvc3RUeXBlRWRpdFJlcGx5OgogICAgZHVwCiAgICBieXRlYyAxNCAvLyAweDAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjgyLTgzCiAgICAvLyBjYXNlIFBvc3RUeXBlRWRpdFJlcGx5OgogICAgLy8gICByZXR1cm4gMTAwCiAgICBieiB2ZXJpZnlFZGl0QW1lbmRtZW50X2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo4MwogICAgLy8gcmV0dXJuIDEwMAogICAgcHVzaGludCAxMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gY29uc3QgYmFzZUxlbmd0aCA9IHRoaXMuZ2V0QmFzZVJlZkxlbmd0aChwb3N0VHlwZSkKICAgIGIgdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNAoKdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByZXR1cm4gMzYKICAgIHB1c2hpbnQgMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo5MQogICAgLy8gY29uc3QgYmFzZUxlbmd0aCA9IHRoaXMuZ2V0QmFzZVJlZkxlbmd0aChwb3N0VHlwZSkKICAgIGIgdmVyaWZ5RWRpdEFtZW5kbWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0QmFzZVJlZkxlbmd0aEAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwucHJlcGFyZVJlcGx5RWRpdChhbWVuZG1lbnQ6IGJ5dGVzLCBjaWQ6IGJ5dGVzKSAtPiBieXRlczoKcHJlcGFyZVJlcGx5RWRpdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMTYtMjIzCiAgICAvLyBwcml2YXRlIHByZXBhcmVSZXBseUVkaXQoYW1lbmRtZW50OiBieXRlczwzMj4sIGNpZDogQ0lEKTogewogICAgLy8gICBwYXJlbnRQb3N0UmVmOiBieXRlczwzMj4sCiAgICAvLyAgIG9nUG9zdEdhdGVJRDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdXNlUGF5V2FsbDogYm9vbGVhbiwKICAgIC8vICAgcGF5V2FsbElEOiB1aW50NjQsCiAgICAvLyAgIGVkaXRLZXk6IGJ5dGVzPDMyPiwKICAgIC8vIH0gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjI0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wb3N0cyhhbWVuZG1lbnQpLmV4aXN0cywgRVJSX1JFUExZX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHByZXBhcmVSZXBseUVkaXRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOk5SUEwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlJQTAoKcHJlcGFyZVJlcGx5RWRpdF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMjUKICAgIC8vIGNvbnN0IHsgcmVmLCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgcG9zdFR5cGUsIGVkaXRLZXkgfSA9IHRoaXMudmVyaWZ5RWRpdEFtZW5kbWVudChhbWVuZG1lbnQsIGNpZCkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHZlcmlmeUVkaXRBbWVuZG1lbnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBkaWcgMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIGR1cAogICAgZXh0cmFjdCAyIDgKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCA4MAogICAgZ2V0Yml0CiAgICBzd2FwCiAgICBkdXAKICAgIGV4dHJhY3QgMTEgOAogICAgc3dhcAogICAgZHVwCiAgICBleHRyYWN0IDE5IDEKICAgIHN3YXAKICAgIGV4dHJhY3QgMjAgMzIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMjYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzUmVwbHkocG9zdFR5cGUpLCBFUlJfTk9UX0FfUkVQTFkpCiAgICBjYWxsc3ViIGlzUmVwbHkKICAgIGJueiBwcmVwYXJlUmVwbHlFZGl0X2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjpOQVJQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BUlAKCnByZXBhcmVSZXBseUVkaXRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyBjb25zdCBwYXJlbnRQb3N0UmVmID0gcmVmLnNsaWNlKDM2LCA2OCkudG9GaXhlZCh7IGxlbmd0aDogMzIgfSkKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgIGRpZyAxCiAgICA+PQogICAgcHVzaGludCAzNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDY4CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgNjgKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyMjkKICAgIC8vIGNvbnN0IHsgZ2F0ZUlEOiBvZ1Bvc3RHYXRlSUQgfSA9IHRoaXMucG9zdHMocGFyZW50UG9zdFJlZikudmFsdWUKICAgIHB1c2hpbnQgNDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gcmV0dXJuIHsgcGFyZW50UG9zdFJlZiwgb2dQb3N0R2F0ZUlELCBnYXRlSUQsIHVzZVBheVdhbGwsIHBheVdhbGxJRCwgZWRpdEtleSB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBieXRlY18yIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDUKICAgIHNldGJpdAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnJlYWRTb2NpYWxJbXBhY3RJbnB1dHMoYWNjb3VudDogYnl0ZXMpIC0+IGJ5dGVzOgpyZWFkU29jaWFsSW1wYWN0SW5wdXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gcHJpdmF0ZSByZWFkU29jaWFsSW1wYWN0SW5wdXRzKGFjY291bnQ6IEFjY291bnQpOiBTb2NpYWxJbXBhY3RJbnB1dHMgewogICAgcHJvdG8gMSAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjM3CiAgICAvLyBsZXQgaGFzTWV0YSA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjIzOC0yMzkKICAgIC8vIGxldCBzdHJlYWs6IHVpbnQ2NCA9IDAKICAgIC8vIGxldCBzdGFydERhdGU6IHVpbnQ2NCA9IDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIGlmICh0aGlzLm1ldGEoYWNjb3VudCkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHJlYWRTb2NpYWxJbXBhY3RJbnB1dHNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQyCiAgICAvLyBjb25zdCBtID0gY2xvbmUodGhpcy5tZXRhKGFjY291bnQpLnZhbHVlKQogICAgZnJhbWVfZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBoYXNNZXRhID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI0NAogICAgLy8gc3RyZWFrID0gbS5zdHJlYWsKICAgIGR1cAogICAgcHVzaGludCA5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBzdGFydERhdGUgPSBtLnN0YXJ0RGF0ZQogICAgcHVzaGludCAxNwogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNQoKcmVhZFNvY2lhbEltcGFjdElucHV0c19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQ4CiAgICAvLyBsZXQgdm90ZUNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBsZXQgaXNOZWdhdGl2ZSA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDcKICAgIC8vIHZvdGVzID0gQm94TWFwPGJ5dGVzPDMyPiwgVm90ZXNWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4Vm90ZXMgfSkKICAgIHB1c2hieXRlcyAidiIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8gaWYgKHRoaXMudm90ZXMoYWNjb3VudC5ieXRlcykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHJlYWRTb2NpYWxJbXBhY3RJbnB1dHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBjb25zdCB2ID0gY2xvbmUodGhpcy52b3RlcyhhY2NvdW50LmJ5dGVzKS52YWx1ZSkKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gdm90ZUNvdW50ID0gdi52b3RlQ291bnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGlzTmVnYXRpdmUgPSB2LmlzTmVnYXRpdmUKICAgIHB1c2hpbnQgNjQKICAgIGdldGJpdAogICAgZnJhbWVfYnVyeSAxCgpyZWFkU29jaWFsSW1wYWN0SW5wdXRzX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIHJldHVybiB7IGhhc01ldGEsIHN0cmVhaywgc3RhcnREYXRlLCB2b3RlQ291bnQsIGlzTmVnYXRpdmUgfQogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIDMKICAgIHNldGJpdAogICAgZnJhbWVfZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIDEKICAgIHNldGJpdAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuZ2V0VXNlckltcGFjdChhY2NvdW50OiBieXRlcykgLT4gdWludDY0OgpnZXRVc2VySW1wYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gcHJpdmF0ZSBnZXRVc2VySW1wYWN0KGFjY291bnQ6IEFjY291bnQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjY0CiAgICAvLyBjb25zdCBpbnB1dHMgPSB0aGlzLnJlYWRTb2NpYWxJbXBhY3RJbnB1dHMoYWNjb3VudCkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZWFkU29jaWFsSW1wYWN0SW5wdXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjY2LTI2OQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0V2l0aElucHV0cz4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnQsIGlucHV0c10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmltcGFjdCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0LAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI2Ni0yNjkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuZ2V0VXNlckltcGFjdFdpdGhJbnB1dHM+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5pbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50LCBpbnB1dHNdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZjI0ZDYwNjMgLy8gbWV0aG9kICJnZXRVc2VySW1wYWN0V2l0aElucHV0cyhhZGRyZXNzLChib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC50aXBDcmVhdG9yKGNyZWF0b3I6IGJ5dGVzLCBmZWU6IHVpbnQ2NCwgdGF4OiB1aW50NjQpIC0+IHVpbnQ2NDoKdGlwQ3JlYXRvcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjEKICAgIC8vIHByaXZhdGUgdGlwQ3JlYXRvcihjcmVhdG9yOiBBY2NvdW50LCBmZWU6IHVpbnQ2NCwgdGF4OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2MgogICAgLy8gaWYgKGNyZWF0b3IgPT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0zCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiB0aXBDcmVhdG9yX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyBjb25zdCBha3RhID0gQXNzZXQoZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgYnl0ZWMgNyAvLyAiYWtpdGFfYXNzZXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjQtMzcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBmZWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM2NgogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzY0LTM2OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogZmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNjQtMzcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBmZWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNzEKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM3NAogICAgLy8gbGV0IHdhbGxldDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM3NQogICAgLy8gaWYgKHRoaXMubWV0YShjcmVhdG9yKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogdGlwQ3JlYXRvcl9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIHdhbGxldCA9IHRoaXMubWV0YShjcmVhdG9yKS52YWx1ZS53YWxsZXQKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgaW50Y18xIC8vIDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDEKCnRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gY29uc3QgeyB0eXBlLCBhcmM1OCB9ID0gdGhpcy5jaGVja1RpcE1iclJlcXVpcmVtZW50cyh0aGlzLmFraXRhREFPLnZhbHVlLCBjcmVhdG9yLCBBcHBsaWNhdGlvbih3YWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gY29uc3QgeyB0eXBlLCBhcmM1OCB9ID0gdGhpcy5jaGVja1RpcE1iclJlcXVpcmVtZW50cyh0aGlzLmFraXRhREFPLnZhbHVlLCBjcmVhdG9yLCBBcHBsaWNhdGlvbih3YWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIDEKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODAKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgwCiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBkdXAKICAgIGJ5dGVjIDcgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODAKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4MQogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCBha3RhLCB0YXgpCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBjb25zdCB7IHJlYWN0RmVlIH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBjb25zdCB7IHJlYWN0RmVlIH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MwogICAgLy8gY29uc3QgW3NvY2lhbEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTb2NpYWxGZWVzKSkKICAgIGJ5dGVjIDExIC8vICJzb2NpYWxfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUgfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8gaWYgKHR5cGUgPT09IFRpcFNlbmRUeXBlQVJDNTgpIHsKICAgIGJ5dGVjIDYgLy8gMHgxNAogICAgPT0KICAgIGJ6IHRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mzg1CiAgICAvLyB0aGlzLmFyYzU4U2VuZFJlYWN0aW9uUGF5bWVudHMoQXBwbGljYXRpb24od2FsbGV0KSwgYWt0YSwgbGVmdG92ZXIsIChyZWFjdEZlZSAtIHRheCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY3CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjUtMTY4CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gY29uc3Qgb3B0aW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm9wdGluCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjg4CiAgICAvLyBjb25zdCBvcHRpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkub3B0aW4KICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMzAgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIGNvbnN0IG9wdGluID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5vcHRpbgogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjkwLTI5OQogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBvcHRpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgICcnLCAvLyBkZWZhdWx0IGFjY291bnQKICAgIC8vICAgICBbXSwgLy8gbm8gbWV0aG9kIG9mZnNldHMKICAgIC8vICAgICBbXSAvLyBubyBmdW5kcyByZXF1ZXN0CiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyBDYWxsZXJUeXBlR2xvYmFsLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyOTAtMjk5CiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgJycsIC8vIGRlZmF1bHQgYWNjb3VudAogICAgLy8gICAgIFtdLCAvLyBubyBtZXRob2Qgb2Zmc2V0cwogICAgLy8gICAgIFtdIC8vIG5vIGZ1bmRzIHJlcXVlc3QKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyAnJywgLy8gZGVmYXVsdCBhY2NvdW50CiAgICBieXRlYyAxMyAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjk2CiAgICAvLyBbXSwgLy8gbm8gbWV0aG9kIG9mZnNldHMKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyOTcKICAgIC8vIFtdIC8vIG5vIGZ1bmRzIHJlcXVlc3QKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyOTAtMjk5CiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgJycsIC8vIGRlZmF1bHQgYWNjb3VudAogICAgLy8gICAgIFtdLCAvLyBubyBtZXRob2Qgb2Zmc2V0cwogICAgLy8gICAgIFtdIC8vIG5vIGZ1bmRzIHJlcXVlc3QKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDEtMzEyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIC8vICAgICBbYXNzZXRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4KICAgIC8vICAgICB9KQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMwOAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMwNy0zMTAKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICByZWNlaXZlcjogb3JpZ2luCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMwMS0zMTIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogb3B0aW4sCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwgLy8gcmVrZXkgYmFjayBpbW1lZGlhdGVseQogICAgLy8gICAgIFthc3NldF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgICAgcmVjZWl2ZXI6IG9yaWdpbgogICAgLy8gICAgIH0pCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMwNgogICAgLy8gW2Fzc2V0XSwKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICBpdG9iCiAgICBieXRlYyAzMiAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDEtMzEyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIC8vICAgICBbYXNzZXRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4KICAgIC8vICAgICB9KQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGJ5dGVjIDM5IC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMDEtMzEyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IG9wdGluLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsIC8vIHJla2V5IGJhY2sgaW1tZWRpYXRlbHkKICAgIC8vICAgICBbYXNzZXRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICAgIHJlY2VpdmVyOiBvcmlnaW4KICAgIC8vICAgICB9KQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMTQtMzE2CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMTgtMzI0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0KAogICAgLy8gICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHRheCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyApCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMyMAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMTktMzIzCiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogdGF4LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozMjYtMzMyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0KAogICAgLy8gICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgICBhc3NldEFtb3VudDogcmVtYWluZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMyNy0zMzEKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IG9yaWdpbiwKICAgIC8vICAgYXNzZXRBbW91bnQ6IHJlbWFpbmRlciwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzM0CiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODYKICAgIC8vIHJldHVybiBhcmM1OAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUA3OgogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIHRoaXMuc2VuZERpcmVjdFJlYWN0aW9uUGF5bWVudHMoY3JlYXRvciwgYWt0YSwgbGVmdG92ZXIsIChyZWFjdEZlZSAtIHRheCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM0NQogICAgLy8gaWYgKHJlbWFpbmRlciA+IDAgJiYgY3JlYXRvci5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgYnogdGlwQ3JlYXRvcl9lbHNlX2JvZHlAMTEKICAgIGZyYW1lX2RpZyAtMwogICAgZGlnIDIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiB0aXBDcmVhdG9yX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cCh0YXhUeG4sIHhmZXJUeG4pCiAgICBpdHhuX2JlZ2luCiAgICBzd2FwCiAgICBkdXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjMzOS0zNDMKICAgIC8vIGNvbnN0IHRheFR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiB0YXgsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8gaXR4bi5zdWJtaXRHcm91cCh0YXhUeG4sIHhmZXJUeG4pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM0Ni0zNTAKICAgIC8vIGNvbnN0IHhmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBjcmVhdG9yLAogICAgLy8gICBhc3NldEFtb3VudDogcmVtYWluZGVyLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNTIKICAgIC8vIGl0eG4uc3VibWl0R3JvdXAodGF4VHhuLCB4ZmVyVHhuKQogICAgaXR4bl9zdWJtaXQKCnRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnRpcENyZWF0b3JfZWxzZV9ib2R5QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjM1NQogICAgLy8gYXNzZXRBbW91bnQ6IHRheCArIHJlbWFpbmRlcgogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czozNTcKICAgIC8vIHRheFR4bi5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzM5LTM0MwogICAgLy8gY29uc3QgdGF4VHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHRheCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzU3CiAgICAvLyB0YXhUeG4uc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHRpcENyZWF0b3JfYWZ0ZXJfaWZfZWxzZUAxMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3Nhcnkoa2V5OiBieXRlcywgY3JlYXRvcjogYnl0ZXMpIC0+IHVpbnQ2NDoKY3JlYXRlRW1wdHlQb3N0SWZOZWNlc3Nhcnk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBwcml2YXRlIGNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5KGtleTogYnl0ZXM8MzI+LCBjcmVhdG9yOiBBY2NvdW50KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBwb3N0cyA9IEJveE1hcDxieXRlczwzMj4sIFBvc3RWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UG9zdHMgfSkKICAgIGJ5dGVjIDQgLy8gInAiCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBpZiAoIXRoaXMucG9zdHMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gcG9zdFR5cGU6IFBvc3RUeXBlUG9zdCwKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mzk1LTQxMwogICAgLy8gdGhpcy5wb3N0cyhrZXkpLnZhbHVlID0gewogICAgLy8gICByZWY6IG9wLmJ6ZXJvKDApLAogICAgLy8gICAvKioKICAgIC8vICAgICogd2hlbiBhIHVzZXIgcmVhY3RzIHRvIGNvbnRlbnQgb3RoZXIgdGhhbiBwb3N0cwogICAgLy8gICAgKiB3ZSBzZXQgdGhlIGNyZWF0b3IgdG8gdGhlIGZvbGxvd2luZzoKICAgIC8vICAgICogLSBBc3NldElEOiBBc3NldCBDcmVhdG9yCiAgICAvLyAgICAqIC0gQWRkcmVzczogQWNjb3VudAogICAgLy8gICAgKiAtICAgQXBwSUQ6IEFwcGxpY2F0aW9uIENyZWF0b3IKICAgIC8vICAgICovCiAgICAvLyAgIGNyZWF0b3IsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZ2F0ZUlEOiAwLAogICAgLy8gICB1c2VQYXlXYWxsOiBmYWxzZSwKICAgIC8vICAgcGF5V2FsbElEOiAwLAogICAgLy8gICBhZ2FpbnN0Q29udGVudFBvbGljeTogZmFsc2UsCiAgICAvLyAgIHBvc3RUeXBlOiBQb3N0VHlwZVBvc3QsCiAgICAvLyAgIGNyZWF0b3JGbGFnczogMCwKICAgIC8vICAgbW9kZXJhdG9yRmxhZ3M6IDAsCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgY29uY2F0CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwNGQwMDAwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDE1CiAgICAvLyByZXR1cm4gdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5wb3N0cwogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICByZXRzdWIKCmNyZWF0ZUVtcHR5UG9zdElmTmVjZXNzYXJ5X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC51cGRhdGVTdHJlYWsoYWNjb3VudDogYnl0ZXMpIC0+IHZvaWQ6CnVwZGF0ZVN0cmVhazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjAKICAgIC8vIHByaXZhdGUgdXBkYXRlU3RyZWFrKGFjY291bnQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNSAvLyAibSIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1ldGEoYWNjb3VudCkuZXhpc3RzLCBFUlJfTUVUQV9ET0VTTlRfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1cGRhdGVTdHJlYWtfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDM2IC8vICJFUlI6Tk1UQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTVRBCgp1cGRhdGVTdHJlYWtfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDIzCiAgICAvLyBjb25zdCB7IHN0YXJ0RGF0ZSwgbGFzdEFjdGl2ZSB9ID0gdGhpcy5tZXRhKGFjY291bnQpLnZhbHVlCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDE3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCAyNQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQyNQogICAgLy8gY29uc3QgdGhpc1dpbmRvd1N0YXJ0OiB1aW50NjQgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gKChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gc3RhcnREYXRlKSAlIE9ORV9EQVkpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLQogICAgaW50YyA3IC8vIDg2NDAwCiAgICAlCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGNvbnN0IGxhc3RXaW5kb3dTdGFydDogdWludDY0ID0gdGhpc1dpbmRvd1N0YXJ0IC0gT05FX0RBWQogICAgaW50YyA3IC8vIDg2NDAwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyB0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUubGFzdEFjdGl2ZSA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgcHVzaGludCAyNQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzMQogICAgLy8gaWYgKGxhc3RXaW5kb3dTdGFydCA+IGxhc3RBY3RpdmUpIHsKICAgIDwKICAgIGJ6IHVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MzIKICAgIC8vIHRoaXMubWV0YShhY2NvdW50KS52YWx1ZS5zdHJlYWsgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgOQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBpZiAobGFzdEFjdGl2ZSA8IHRoaXNXaW5kb3dTdGFydCkgewogICAgPAogICAgYnogdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gdGhpcy5tZXRhKGFjY291bnQpLnZhbHVlLnN0cmVhayArPSAxCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA5CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgOQogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCnVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnVwZGF0ZVZvdGVzKHJlZjogYnl0ZXMsIGlzVXA6IHVpbnQ2NCwgaW1wYWN0OiB1aW50NjQpIC0+IHZvaWQ6CnVwZGF0ZVZvdGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gcHJpdmF0ZSB1cGRhdGVWb3RlcyhyZWY6IGJ5dGVzPDMyPiwgaXNVcDogYm9vbGVhbiwgaW1wYWN0OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3CiAgICAvLyB2b3RlcyA9IEJveE1hcDxieXRlczwzMj4sIFZvdGVzVmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFZvdGVzIH0pCiAgICBwdXNoYnl0ZXMgInYiCiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDQ2CiAgICAvLyBpZiAoIXRoaXMudm90ZXMocmVmKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ0NwogICAgLy8gcmV0dXJuIHsgbmV3Q291bnQ6IGltcGFjdCwgaXNOZWdhdGl2ZTogIWlzVXAgfQogICAgZnJhbWVfZGlnIC0yCiAgICAhCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKCnVwZGF0ZVZvdGVzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jYWxjVm90ZXNAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDc2CiAgICAvLyBjb25zdCB7IG5ld0NvdW50OiB2b3RlQ291bnQsIGlzTmVnYXRpdmUgfSA9IHRoaXMuY2FsY1ZvdGVzKHJlZiwgaXNVcCwgaW1wYWN0KQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgcHVzaGludCA2NAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDc3CiAgICAvLyB0aGlzLnZvdGVzKHJlZikudmFsdWUgPSB7IHZvdGVDb3VudCwgaXNOZWdhdGl2ZSB9CiAgICBieXRlY18yIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgY29uY2F0CiAgICBib3hfcHV0CiAgICByZXRzdWIKCnVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGNvbnN0IHsgaXNOZWdhdGl2ZSwgdm90ZUNvdW50IH0gPSB0aGlzLnZvdGVzKHJlZikudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCA2NAogICAgZ2V0Yml0CiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NTMKICAgIC8vIGNvbnN0IGRpZmZlcmluZ0RpcmVjdGlvbnMgPSAoaXNVcCAmJiBpc05lZ2F0aXZlKSB8fCAoIWlzVXAgJiYgIWlzTmVnYXRpdmUpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHVwZGF0ZVZvdGVzX29yX2NvbnRkQDUKICAgIGRpZyAyCiAgICBibnogdXBkYXRlVm90ZXNfYm9vbF90cnVlQDcKCnVwZGF0ZVZvdGVzX29yX2NvbnRkQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBjb25zdCBkaWZmZXJpbmdEaXJlY3Rpb25zID0gKGlzVXAgJiYgaXNOZWdhdGl2ZSkgfHwgKCFpc1VwICYmICFpc05lZ2F0aXZlKQogICAgZnJhbWVfZGlnIC0yCiAgICBibnogdXBkYXRlVm90ZXNfYm9vbF9mYWxzZUA4CiAgICBkaWcgMgogICAgYm56IHVwZGF0ZVZvdGVzX2Jvb2xfZmFsc2VAOAoKdXBkYXRlVm90ZXNfYm9vbF90cnVlQDc6CiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKdXBkYXRlVm90ZXNfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gaWYgKHZvdGVDb3VudCA9PT0gMCkgewogICAgZHVwCiAgICBibnogdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgcG9wbiAyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIHJldHVybiB7IG5ld0NvdW50OiBpbXBhY3QsIGlzTmVnYXRpdmU6ICFpc1VwIH0KICAgIGZyYW1lX2RpZyAtMgogICAgIQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDc2CiAgICAvLyBjb25zdCB7IG5ld0NvdW50OiB2b3RlQ291bnQsIGlzTmVnYXRpdmUgfSA9IHRoaXMuY2FsY1ZvdGVzKHJlZiwgaXNVcCwgaW1wYWN0KQogICAgYiB1cGRhdGVWb3Rlc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY2FsY1ZvdGVzQDIwCgp1cGRhdGVWb3Rlc19hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gaWYgKGltcGFjdCA9PT0gdm90ZUNvdW50ICYmIGRpZmZlcmluZ0RpcmVjdGlvbnMpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDEKICAgID09CiAgICBieiB1cGRhdGVWb3Rlc19hZnRlcl9pZl9lbHNlQDE0CiAgICBkaWcgMQogICAgYnogdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAxNAogICAgcG9wbiAyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIHJldHVybiB7IG5ld0NvdW50OiAwLCBpc05lZ2F0aXZlOiBmYWxzZSB9CiAgICBieXRlYyAzNyAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY29uc3QgeyBuZXdDb3VudDogdm90ZUNvdW50LCBpc05lZ2F0aXZlIH0gPSB0aGlzLmNhbGNWb3RlcyhyZWYsIGlzVXAsIGltcGFjdCkKICAgIGIgdXBkYXRlVm90ZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNhbGNWb3Rlc0AyMAoKdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NjUKICAgIC8vIGNvbnN0IGZsaXAgPSBpbXBhY3QgPiB2b3RlQ291bnQgJiYgZGlmZmVyaW5nRGlyZWN0aW9ucwogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgPgogICAgZGlnIDIKICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDY2CiAgICAvLyBpZiAoZmxpcCkgewogICAgYnogdXBkYXRlVm90ZXNfYWZ0ZXJfaWZfZWxzZUAxNgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBjb25zdCBuZXdDb3VudDogdWludDY0ID0gaW1wYWN0IC0gdm90ZUNvdW50CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIHJldHVybiB7IG5ld0NvdW50LCBpc05lZ2F0aXZlOiAhaXNOZWdhdGl2ZSB9CiAgICB1bmNvdmVyIDIKICAgICEKICAgIHN3YXAKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIGNvbnN0IHsgbmV3Q291bnQ6IHZvdGVDb3VudCwgaXNOZWdhdGl2ZSB9ID0gdGhpcy5jYWxjVm90ZXMocmVmLCBpc1VwLCBpbXBhY3QpCiAgICBiIHVwZGF0ZVZvdGVzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jYWxjVm90ZXNAMjAKCnVwZGF0ZVZvdGVzX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBjb25zdCBuZXdDb3VudDogdWludDY0ID0gZGlmZmVyaW5nRGlyZWN0aW9ucyA/IHZvdGVDb3VudCAtIGltcGFjdCA6IHZvdGVDb3VudCArIGltcGFjdAogICAgc3dhcAogICAgYnogdXBkYXRlVm90ZXNfdGVybmFyeV9mYWxzZUAxOAogICAgZnJhbWVfZGlnIC0xCiAgICAtCgp1cGRhdGVWb3Rlc190ZXJuYXJ5X21lcmdlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gcmV0dXJuIHsgbmV3Q291bnQsIGlzTmVnYXRpdmUgfQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA0CiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gY29uc3QgeyBuZXdDb3VudDogdm90ZUNvdW50LCBpc05lZ2F0aXZlIH0gPSB0aGlzLmNhbGNWb3RlcyhyZWYsIGlzVXAsIGltcGFjdCkKICAgIGIgdXBkYXRlVm90ZXNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNhbGNWb3Rlc0AyMAoKdXBkYXRlVm90ZXNfdGVybmFyeV9mYWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGNvbnN0IG5ld0NvdW50OiB1aW50NjQgPSBkaWZmZXJpbmdEaXJlY3Rpb25zID8gdm90ZUNvdW50IC0gaW1wYWN0IDogdm90ZUNvdW50ICsgaW1wYWN0CiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGIgdXBkYXRlVm90ZXNfdGVybmFyeV9tZXJnZUAxOQoKdXBkYXRlVm90ZXNfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGIgdXBkYXRlVm90ZXNfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jcmVhdGVWb3RlTGlzdChyZWY6IGJ5dGVzLCBpc1VwOiB1aW50NjQsIGFjY291bnQ6IGJ5dGVzLCBpbXBhY3Q6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlVm90ZUxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDgwCiAgICAvLyBwcml2YXRlIGNyZWF0ZVZvdGVMaXN0KHJlZjogYnl0ZXM8MzI+LCBpc1VwOiBib29sZWFuLCBhY2NvdW50OiBBY2NvdW50LCBpbXBhY3Q6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gNCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyBjb25zdCB2b3RlTGlzdEtleTogVm90ZUxpc3RLZXkgPSB7IHVzZXI6IGIxNihhY2NvdW50LmJ5dGVzKSwgcmVmOiBiMTYocmVmKSB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgYjE2CiAgICBmcmFtZV9kaWcgLTQKICAgIGNhbGxzdWIgYjE2CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIHRoaXMudm90ZWxpc3Qodm90ZUxpc3RLZXkpLnZhbHVlID0geyBpbXBhY3QsIGlzVXAgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkudmFsdWUgPSB7IGltcGFjdCwgaXNVcCB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmNyZWF0ZVBvc3QocG9zdEtleTogYnl0ZXMsIG1iclBheW1lbnQ6IHVpbnQ2NCwgY2lkOiBieXRlcywgZ2F0ZUlEOiB1aW50NjQsIHVzZVBheVdhbGw6IHVpbnQ2NCwgcGF5V2FsbElEOiB1aW50NjQsIHBvc3RUeXBlOiBieXRlcywgYW1lbmRtZW50T2Y6IGJ5dGVzLCBjcmVhdG9yRmxhZ3M6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlUG9zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0ODUtNDk5CiAgICAvLyBwcml2YXRlIGNyZWF0ZVBvc3QoCiAgICAvLyAgIHBvc3RLZXk6IGJ5dGVzPDMyPiwKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHVzZVBheVdhbGw6IGJvb2xlYW4sCiAgICAvLyAgIHBheVdhbGxJRDogdWludDY0LAogICAgLy8gICBwb3N0VHlwZTogUG9zdFR5cGUsCiAgICAvLyAgIC8vIGBhbWVuZG1lbnRPZmAgaXMgb25seSBjb25zdW1lZCB3aGVuIGBwb3N0VHlwZSA9PT0gUG9zdFR5cGVFZGl0UG9zdGA7CiAgICAvLyAgIC8vIG5vbi1lZGl0IGNhbGxlcnMgcGFzcyBgQnl0ZXMoJycpYCBzbyB0aGUgY29tcGlsZXIgY2FuIHN1YnN0aXR1dGUgdGhlCiAgICAvLyAgIC8vIGFscmVhZHktYnl0ZWNibG9ja2VkIGVtcHR5LWJ5dGVzIGNvbnN0YW50ICgxIGJ5dGUpIGZvciBhbiBleHBsaWNpdAogICAgLy8gICAvLyBgcHVzaGludCAzMjsgYnplcm9gIHNlcXVlbmNlICgzIGJ5dGVzKSBhdCBlYWNoIGNhbGwgc2l0ZS4KICAgIC8vICAgYW1lbmRtZW50T2Y6IGJ5dGVzLAogICAgLy8gICBjcmVhdG9yRmxhZ3M6IHVpbnQ2NCwKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gOSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCYW5uZWQoVHhuLnNlbmRlciksIEVSUl9CQU5ORUQpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGlzQmFubmVkCiAgICBieiBjcmVhdGVQb3N0X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMSAvLyAiRVJSOkJBTkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkFORAoKY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vICghdXNlUGF5V2FsbCAmJiBwYXlXYWxsSUQgPT09IDApIHx8ICgKICAgIGZyYW1lX2RpZyAtNQogICAgYm56IGNyZWF0ZVBvc3Rfb3JfY29udGRANAogICAgZnJhbWVfZGlnIC00CiAgICBieiBjcmVhdGVQb3N0X2Jvb2xfdHJ1ZUA5CgpjcmVhdGVQb3N0X29yX2NvbnRkQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTAzLTUwNgogICAgLy8gdXNlUGF5V2FsbCAmJiAoCiAgICAvLyAgIHBheVdhbGxJRCAhPT0gMCAmJiB0aGlzLnBheXdhbGwocGF5V2FsbElEKS5leGlzdHMgfHwKICAgIC8vICAgcGF5V2FsbElEID09PSAwICYmIHRoaXMucGF5d2FsbCh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuZGVmYXVsdFBheVdhbGxJRCkuZXhpc3RzCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTUKICAgIGJ6IGNyZWF0ZVBvc3RfYm9vbF9mYWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gcGF5V2FsbElEICE9PSAwICYmIHRoaXMucGF5d2FsbChwYXlXYWxsSUQpLmV4aXN0cyB8fAogICAgZnJhbWVfZGlnIC00CiAgICBieiBjcmVhdGVQb3N0X29yX2NvbnRkQDcKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBwYXl3YWxsID0gQm94TWFwPHVpbnQ2NCwgVmlld1BheVdhbGxWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsYm94UHJlZml4UGF5V2FsbCB9KQogICAgYnl0ZWMgMTggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIHBheVdhbGxJRCAhPT0gMCAmJiB0aGlzLnBheXdhbGwocGF5V2FsbElEKS5leGlzdHMgfHwKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZVBvc3RfYm9vbF90cnVlQDkKCmNyZWF0ZVBvc3Rfb3JfY29udGRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHBheVdhbGxJRCA9PT0gMCAmJiB0aGlzLnBheXdhbGwodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cwogICAgZnJhbWVfZGlnIC00CiAgICBibnogY3JlYXRlUG9zdF9ib29sX2ZhbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUwNQogICAgLy8gcGF5V2FsbElEID09PSAwICYmIHRoaXMucGF5d2FsbCh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuZGVmYXVsdFBheVdhbGxJRCkuZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHBheVdhbGxJRCA9PT0gMCAmJiB0aGlzLnBheXdhbGwodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGV4dHJhY3QgNjYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBwYXl3YWxsID0gQm94TWFwPHVpbnQ2NCwgVmlld1BheVdhbGxWYWx1ZT4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsYm94UHJlZml4UGF5V2FsbCB9KQogICAgYnl0ZWMgMTggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MDUKICAgIC8vIHBheVdhbGxJRCA9PT0gMCAmJiB0aGlzLnBheXdhbGwodGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmRlZmF1bHRQYXlXYWxsSUQpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVQb3N0X2Jvb2xfZmFsc2VAMTAKCmNyZWF0ZVBvc3RfYm9vbF90cnVlQDk6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlUG9zdF9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUwMS01MDkKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgKCF1c2VQYXlXYWxsICYmIHBheVdhbGxJRCA9PT0gMCkgfHwgKAogICAgLy8gICAgIHVzZVBheVdhbGwgJiYgKAogICAgLy8gICAgICAgcGF5V2FsbElEICE9PSAwICYmIHRoaXMucGF5d2FsbChwYXlXYWxsSUQpLmV4aXN0cyB8fAogICAgLy8gICAgICAgcGF5V2FsbElEID09PSAwICYmIHRoaXMucGF5d2FsbCh0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuZGVmYXVsdFBheVdhbGxJRCkuZXhpc3RzCiAgICAvLyAgICAgKQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlXQUxMCiAgICAvLyApCiAgICBibnogY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOklQV0wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBXTAoKY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyBjb25zdCBpc0VkaXRQb3N0ID0gcG9zdFR5cGUgPT09IFBvc3RUeXBlRWRpdFBvc3QKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMjYgLy8gMHgwMgogICAgPT0KICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUxMwogICAgLy8gY29uc3QgZWRpdEV4dHJhTWJyOiB1aW50NjQgPSBpc0VkaXRQb3N0ID8gRWRpdEJhY2tSZWZNQlIgOiAwCiAgICBpbnRjIDUgLy8gMTMyMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MTQKICAgIC8vIHRoaXMudmFsaWRhdGVQb3N0UGF5bWVudChtYnJQYXltZW50LCBjaWQsIGlzRWRpdFBvc3QsIGVkaXRFeHRyYU1icikKICAgIGZyYW1lX2RpZyAtOAogICAgZnJhbWVfZGlnIC03CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiB2YWxpZGF0ZVBvc3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyB0aGlzLnVwZGF0ZVN0cmVhayhUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiB1cGRhdGVTdHJlYWsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIGNvbnN0IGltcGFjdCA9IHRoaXMuZ2V0VXNlckltcGFjdChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRVc2VySW1wYWN0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtOQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wb3N0cyhwb3N0S2V5KS5leGlzdHMsIEVSUl9QT1NUX0VYSVNUUykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlUG9zdF9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDQwIC8vICJFUlI6RVBTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFUFNUCgpjcmVhdGVQb3N0X2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MjctNTI5CiAgICAvLyBjb25zdCBwb3N0UmVmOiBieXRlcyA9IGlzRWRpdFBvc3QKICAgIC8vICAgPyBCeXRlcyhjaWQpLmNvbmNhdChhbWVuZG1lbnRPZikKICAgIC8vICAgOiBCeXRlcyhjaWQpCiAgICBzd2FwCiAgICBieiBjcmVhdGVQb3N0X3Rlcm5hcnlfZmFsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1MjgKICAgIC8vID8gQnl0ZXMoY2lkKS5jb25jYXQoYW1lbmRtZW50T2YpCiAgICBmcmFtZV9kaWcgLTcKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CgpjcmVhdGVQb3N0X3Rlcm5hcnlfbWVyZ2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjUzMS01NDIKICAgIC8vIHRoaXMucG9zdHMocG9zdEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlZjogcG9zdFJlZiwKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBnYXRlSUQ6IGdhdGVJRCwKICAgIC8vICAgdXNlUGF5V2FsbCwKICAgIC8vICAgcGF5V2FsbElELAogICAgLy8gICBhZ2FpbnN0Q29udGVudFBvbGljeTogZmFsc2UsCiAgICAvLyAgIHBvc3RUeXBlOiBwb3N0VHlwZSwKICAgIC8vICAgY3JlYXRvckZsYWdzLAogICAgLy8gICBtb2RlcmF0b3JGbGFnczogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18yIC8vIDB4MDAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyBtb2RlcmF0b3JGbGFnczogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMxLTU0MgogICAgLy8gdGhpcy5wb3N0cyhwb3N0S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVmOiBwb3N0UmVmLAogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGdhdGVJRDogZ2F0ZUlELAogICAgLy8gICB1c2VQYXlXYWxsLAogICAgLy8gICBwYXlXYWxsSUQsCiAgICAvLyAgIGFnYWluc3RDb250ZW50UG9saWN5OiBmYWxzZSwKICAgIC8vICAgcG9zdFR5cGU6IHBvc3RUeXBlLAogICAgLy8gICBjcmVhdG9yRmxhZ3MsCiAgICAvLyAgIG1vZGVyYXRvckZsYWdzOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgNDEgLy8gMHgwMDRkCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIHRoaXMudXBkYXRlVm90ZXMocG9zdEtleSwgdHJ1ZSwgaW1wYWN0KQogICAgZnJhbWVfZGlnIC05CiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDIKICAgIGNhbGxzdWIgdXBkYXRlVm90ZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIHRoaXMuY3JlYXRlVm90ZUxpc3QocG9zdEtleSwgdHJ1ZSwgVHhuLnNlbmRlciwgaW1wYWN0KQogICAgZnJhbWVfZGlnIC05CiAgICBpbnRjXzEgLy8gMQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVZvdGVMaXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgZHVwCiAgICBieXRlYyA3IC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczCiAgICAvLyBjb25zdCBbc29jaWFsRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1NvY2lhbEZlZXMpKQogICAgZGlnIDEKICAgIGJ5dGVjIDExIC8vICJzb2NpYWxfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoyNzQKICAgIC8vIGNvbnN0IHsgcG9zdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc1CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFrdGEsIHBvc3RGZWUpCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc3LTI4MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI3OQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Mjc3LTI4MgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjI3Ny0yODMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCmNyZWF0ZVBvc3RfdGVybmFyeV9mYWxzZUAxNzoKICAgIGZyYW1lX2RpZyAtNwogICAgYiBjcmVhdGVQb3N0X3Rlcm5hcnlfbWVyZ2VAMTgKCmNyZWF0ZVBvc3RfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZVBvc3RfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlUmVwbHkocmVwbHlLZXk6IGJ5dGVzLCBtYnJQYXltZW50OiB1aW50NjQsIG1ick5lZWRlZDogdWludDY0LCBjaWQ6IGJ5dGVzLCBwYXJlbnRSZWY6IGJ5dGVzLCBnYXRlSUQ6IHVpbnQ2NCwgdXNlUGF5V2FsbDogdWludDY0LCBwYXlXYWxsSUQ6IHVpbnQ2NCwgcG9zdFR5cGU6IGJ5dGVzLCBhbWVuZG1lbnRPZjogYnl0ZXMsIGNyZWF0b3JGbGFnczogdWludDY0KSAtPiB2b2lkOgpjcmVhdGVSZXBseToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NDgtNTYyCiAgICAvLyBwcml2YXRlIGNyZWF0ZVJlcGx5KAogICAgLy8gICByZXBseUtleTogYnl0ZXM8MzI+LAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1ick5lZWRlZDogdWludDY0LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgcGFyZW50UmVmOiBieXRlczwzMj4sCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICB1c2VQYXlXYWxsOiBib29sZWFuLAogICAgLy8gICBwYXlXYWxsSUQ6IHVpbnQ2NCwKICAgIC8vICAgcG9zdFR5cGU6IFBvc3RUeXBlLAogICAgLy8gICAvLyBgYW1lbmRtZW50T2ZgIGlzIG9ubHkgY29uc3VtZWQgd2hlbiBgcG9zdFR5cGUgPT09IFBvc3RUeXBlRWRpdFJlcGx5YDsKICAgIC8vICAgLy8gbm9uLWVkaXQgY2FsbGVycyBwYXNzIGBCeXRlcygnJylgIOKAlCBzZWUgbm90ZSBvbiBgY3JlYXRlUG9zdGAuCiAgICAvLyAgIGFtZW5kbWVudE9mOiBieXRlcywKICAgIC8vICAgY3JlYXRvckZsYWdzOiB1aW50NjQsCiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDExIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jhbm5lZChUeG4uc2VuZGVyKSwgRVJSX0JBTk5FRCkKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgaXNCYW5uZWQKICAgIGJ6IGNyZWF0ZVJlcGx5X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMSAvLyAiRVJSOkJBTkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkFORAoKY3JlYXRlUmVwbHlfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIHBvc3RzID0gQm94TWFwPGJ5dGVzPDMyPiwgUG9zdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhQb3N0cyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTY0CiAgICAvLyBjb25zdCB7IGNyZWF0b3IgfSA9IHRoaXMucG9zdHMocGFyZW50UmVmKS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jsb2NrZWQoY3JlYXRvciwgVHhuLnNlbmRlciksIEVSUl9CTE9DS0VEKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBpc0Jsb2NrZWQKICAgIGJ6IGNyZWF0ZVJlcGx5X2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAzOCAvLyAiRVJSOkJMS0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkxLRAoKY3JlYXRlUmVwbHlfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTY5CiAgICAvLyB0aGlzLnVwZGF0ZVN0cmVhayhUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiB1cGRhdGVTdHJlYWsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUgfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUgfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczCiAgICAvLyBjb25zdCBbc29jaWFsRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1NvY2lhbEZlZXMpKQogICAgYnl0ZWMgMTEgLy8gInNvY2lhbF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gY29uc3QgeyByZWFjdEZlZSB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTcyCiAgICAvLyBjb25zdCBjcmVhdG9ySW1wYWN0ID0gdGhpcy5nZXRVc2VySW1wYWN0KGNyZWF0b3IpCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRVc2VySW1wYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTczCiAgICAvLyBjb25zdCB0YXhQZXJjZW50YWdlID0gYWtpdGFTb2NpYWxGZWUodGhpcy5ha2l0YURBTy52YWx1ZSwgY3JlYXRvckltcGFjdCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1NzMKICAgIC8vIGNvbnN0IHRheFBlcmNlbnRhZ2UgPSBha2l0YVNvY2lhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCBjcmVhdG9ySW1wYWN0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMKICAgIC8vIGNvbnN0IFtzb2NpYWxGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU29jaWFsRmVlcykpCiAgICBieXRlYyAxMSAvLyAic29jaWFsX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEyNQogICAgLy8gY29uc3QgeyBpbXBhY3RUYXhNaW4sIGltcGFjdFRheE1heCB9ID0gZ2V0U29jaWFsRmVlcyhha2l0YURBTykKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEyNgogICAgLy8gcmV0dXJuIGltcGFjdFJhbmdlKGltcGFjdCwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXgpCiAgICBjYWxsc3ViIGltcGFjdFJhbmdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGRpZyAxCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyBjb25zdCBpc0VkaXRSZXBseSA9IHBvc3RUeXBlID09PSBQb3N0VHlwZUVkaXRSZXBseQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAxNCAvLyAweDAzCiAgICA9PQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBleHRyYSArPSB0aGlzLnRpcENyZWF0b3IoY3JlYXRvciwgcmVhY3RGZWUsIHRheCkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgdGlwQ3JlYXRvcgogICAgZnJhbWVfZGlnIC05CiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyBpZiAoaXNFZGl0UmVwbHkpIHsKICAgIGJ6IGNyZWF0ZVJlcGx5X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gZXh0cmEgKz0gRWRpdEJhY2tSZWZNQlIKICAgIGludGMgNSAvLyAxMzIwMAogICAgKwoKY3JlYXRlUmVwbHlfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gdGhpcy52YWxpZGF0ZVBvc3RQYXltZW50KG1iclBheW1lbnQsIGNpZCwgaXNFZGl0UmVwbHksIGV4dHJhKQogICAgZnJhbWVfZGlnIC0xMAogICAgZnJhbWVfZGlnIC04CiAgICBkaWcgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHZhbGlkYXRlUG9zdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo0MwogICAgLy8gcG9zdHMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBQb3N0VmFsdWU+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeFBvc3RzIH0pCiAgICBieXRlYyA0IC8vICJwIgogICAgZnJhbWVfZGlnIC0xMQogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wb3N0cyhyZXBseUtleSkuZXhpc3RzLCBFUlJfUE9TVF9FWElTVFMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZVJlcGx5X2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA0MCAvLyAiRVJSOkVQU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RVBTVAoKY3JlYXRlUmVwbHlfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTkyLTU5NAogICAgLy8gY29uc3QgcmVwbHlSZWY6IGJ5dGVzID0gaXNFZGl0UmVwbHkKICAgIC8vICAgPyBCeXRlcyhjaWQpLmNvbmNhdChwYXJlbnRSZWYpLmNvbmNhdChhbWVuZG1lbnRPZikKICAgIC8vICAgOiBCeXRlcyhjaWQpLmNvbmNhdChwYXJlbnRSZWYpCiAgICBieiBjcmVhdGVSZXBseV90ZXJuYXJ5X2ZhbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyA/IEJ5dGVzKGNpZCkuY29uY2F0KHBhcmVudFJlZikuY29uY2F0KGFtZW5kbWVudE9mKQogICAgZnJhbWVfZGlnIC04CiAgICBmcmFtZV9kaWcgLTcKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKCmNyZWF0ZVJlcGx5X3Rlcm5hcnlfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTk4CiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gdGltZXN0YW1wOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjU5Ni02MDcKICAgIC8vIHRoaXMucG9zdHMocmVwbHlLZXkpLnZhbHVlID0gewogICAgLy8gICByZWY6IHJlcGx5UmVmLAogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICB0aW1lc3RhbXA6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgdXNlUGF5V2FsbCwKICAgIC8vICAgcGF5V2FsbElELAogICAgLy8gICBhZ2FpbnN0Q29udGVudFBvbGljeTogZmFsc2UsCiAgICAvLyAgIHBvc3RUeXBlOiBwb3N0VHlwZSwKICAgIC8vICAgY3JlYXRvckZsYWdzLAogICAgLy8gICBtb2RlcmF0b3JGbGFnczogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzIgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtNQogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlY18yIC8vIDB4MDAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjA2CiAgICAvLyBtb2RlcmF0b3JGbGFnczogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTk2LTYwNwogICAgLy8gdGhpcy5wb3N0cyhyZXBseUtleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlZjogcmVwbHlSZWYsCiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHRpbWVzdGFtcDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICB1c2VQYXlXYWxsLAogICAgLy8gICBwYXlXYWxsSUQsCiAgICAvLyAgIGFnYWluc3RDb250ZW50UG9saWN5OiBmYWxzZSwKICAgIC8vICAgcG9zdFR5cGU6IHBvc3RUeXBlLAogICAgLy8gICBjcmVhdG9yRmxhZ3MsCiAgICAvLyAgIG1vZGVyYXRvckZsYWdzOiAwLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgNDEgLy8gMHgwMDRkCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIGNvbnN0IHNlbmRlckltcGFjdCA9IHRoaXMuZ2V0VXNlckltcGFjdChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRVc2VySW1wYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjEwCiAgICAvLyB0aGlzLnVwZGF0ZVZvdGVzKHJlcGx5S2V5LCB0cnVlLCBzZW5kZXJJbXBhY3QpCiAgICBmcmFtZV9kaWcgLTExCiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDIKICAgIGNhbGxzdWIgdXBkYXRlVm90ZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MTEKICAgIC8vIHRoaXMuY3JlYXRlVm90ZUxpc3QocmVwbHlLZXksIHRydWUsIFR4bi5zZW5kZXIsIHNlbmRlckltcGFjdCkKICAgIGZyYW1lX2RpZyAtMTEKICAgIGludGNfMSAvLyAxCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgY3JlYXRlVm90ZUxpc3QKICAgIHJldHN1YgoKY3JlYXRlUmVwbHlfdGVybmFyeV9mYWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIDogQnl0ZXMoY2lkKS5jb25jYXQocGFyZW50UmVmKQogICAgZnJhbWVfZGlnIC04CiAgICBmcmFtZV9kaWcgLTcKICAgIGNvbmNhdAogICAgYiBjcmVhdGVSZXBseV90ZXJuYXJ5X21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jcmVhdGVWb3RlKG1iclBheW1lbnQ6IHVpbnQ2NCwgbWJyTmVlZGVkOiB1aW50NjQsIHJlZjogYnl0ZXMsIGlzVXA6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlVm90ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MTQtNjE5CiAgICAvLyBwcml2YXRlIGNyZWF0ZVZvdGUoCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgbWJyTmVlZGVkOiB1aW50NjQsCiAgICAvLyAgIHJlZjogYnl0ZXM8MzI+LAogICAgLy8gICBpc1VwOiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMubG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2socmVmKQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjIyCiAgICAvLyBjb25zdCB2b3RlTGlzdEtleTogVm90ZUxpc3RLZXkgPSB7IHVzZXI6IGIxNihUeG4uc2VuZGVyLmJ5dGVzKSwgcmVmOiBiMTYocmVmKSB9CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGIxNgogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHZvdGVsaXN0ID0gQm94TWFwPFZvdGVMaXN0S2V5LCBWb3RlTGlzdFZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhWb3RlTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy52b3RlbGlzdCh2b3RlTGlzdEtleSkuZXhpc3RzLCBFUlJfQUxSRUFEWV9WT1RFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlVm90ZV9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6QVZPVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBVk9UCgpjcmVhdGVWb3RlX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgIT09IGNyZWF0b3IsIEVSUl9OT19TRUxGX1ZPVEUpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgIT0KICAgIGJueiBjcmVhdGVWb3RlX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjpTVk9UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNWT1QKCmNyZWF0ZVZvdGVfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gY29uc3Qgc2VuZGVySXNBdXRvbWF0ZWQgPSB0aGlzLm1ldGEoVHhuLnNlbmRlcikudmFsdWUuYXV0b21hdGVkCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIGNvbnN0IHNlbmRlcklzQXV0b21hdGVkID0gdGhpcy5tZXRhKFR4bi5zZW5kZXIpLnZhbHVlLmF1dG9tYXRlZAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgMzkyCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGxvZ2dlZEFzc2VydCghc2VuZGVySXNBdXRvbWF0ZWQsIEVSUl9BVVRPTUFURURfQUNDT1VOVCkKICAgIGJ6IGNyZWF0ZVZvdGVfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOkFVVE8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVVUTwoKY3JlYXRlVm90ZV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBieXRlYyA3IC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjMzCiAgICAvLyB0aGlzLnVwZGF0ZVN0cmVhayhUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiB1cGRhdGVTdHJlYWsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIGNvbnN0IHsgcmVhY3RGZWUsIGltcGFjdFRheE1pbiwgaW1wYWN0VGF4TWF4IH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyBjb25zdCB7IHJlYWN0RmVlLCBpbXBhY3RUYXhNaW4sIGltcGFjdFRheE1heCB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMKICAgIC8vIGNvbnN0IFtzb2NpYWxGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU29jaWFsRmVlcykpCiAgICBieXRlYyAxMSAvLyAic29jaWFsX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyBjb25zdCB7IHJlYWN0RmVlLCBpbXBhY3RUYXhNaW4sIGltcGFjdFRheE1heCB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjM2CiAgICAvLyBpZiAoaXNVcCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBjcmVhdGVWb3RlX2Vsc2VfYm9keUAxMAogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzgKICAgIC8vIGNvbnN0IHJlY2lwaWVudEltcGFjdCA9IHRoaXMuZ2V0VXNlckltcGFjdChjcmVhdG9yKQogICAgc3dhcAogICAgZHVwCiAgICBjYWxsc3ViIGdldFVzZXJJbXBhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2MzkKICAgIC8vIGNvbnN0IHRheFBlcmNlbnRhZ2UgPSBpbXBhY3RSYW5nZShyZWNpcGllbnRJbXBhY3QsIGltcGFjdFRheE1pbiwgaW1wYWN0VGF4TWF4KQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgaW1wYWN0UmFuZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gY29uc3QgZXh0cmEgPSB0aGlzLnRpcENyZWF0b3IoY3JlYXRvciwgcmVhY3RGZWUsIHRheCkKICAgIGNhbGxzdWIgdGlwQ3JlYXRvcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY0NS02NTEKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbWJyTmVlZGVkICsgZXh0cmEKICAgIC8vICAgfQogICAgLy8gKSwKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NDgKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjQ1LTY1MQogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQgKyBleHRyYQogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjQ5CiAgICAvLyBhbW91bnQ6IG1ick5lZWRlZCArIGV4dHJhCiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgMwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY0NS02NTEKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbWJyTmVlZGVkICsgZXh0cmEKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY0NC02NTMKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgbWJyUGF5bWVudCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ick5lZWRlZCArIGV4dHJhCiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogY3JlYXRlVm90ZV9hZnRlcl9pZl9lbHNlQDE0CiAgICBieXRlYyAxMCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlVm90ZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gY29uc3Qgc2VuZGVySW1wYWN0ID0gdGhpcy5nZXRVc2VySW1wYWN0KFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFVzZXJJbXBhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NzcKICAgIC8vIHRoaXMudXBkYXRlVm90ZXMocmVmLCBpc1VwLCBzZW5kZXJJbXBhY3QpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDIKICAgIGNhbGxzdWIgdXBkYXRlVm90ZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIHRoaXMuY3JlYXRlVm90ZUxpc3QocmVmLCBpc1VwLCBUeG4uc2VuZGVyLCBzZW5kZXJJbXBhY3QpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVZvdGVMaXN0CiAgICByZXRzdWIKCmNyZWF0ZVZvdGVfZWxzZV9ib2R5QDEwOgogICAgcG9wbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjU2LTY2MgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQKICAgIC8vICAgfQogICAgLy8gKSwKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjU2LTY2MgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJOZWVkZWQKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0zCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NTUtNjY0CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJOZWVkZWQKICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBjcmVhdGVWb3RlX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVZvdGVfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY2Ni02NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJlYWN0RmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NjgKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY2OAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2NjYtNjcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiByZWFjdEZlZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFrdGEKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjY2LTY3MgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogcmVhY3RGZWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiBha3RhCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY3JlYXRlVm90ZV9hZnRlcl9pZl9lbHNlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbC5jcmVhdGVSZWFjdGlvbihtYnJQYXltZW50OiB1aW50NjQsIG1ick5lZWRlZDogdWludDY0LCByZWY6IGJ5dGVzLCBORlQ6IHVpbnQ2NCkgLT4gdm9pZDoKY3JlYXRlUmVhY3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjgxLTY4NgogICAgLy8gcHJpdmF0ZSBjcmVhdGVSZWFjdGlvbigKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBtYnJOZWVkZWQ6IHVpbnQ2NCwKICAgIC8vICAgcmVmOiBieXRlczwzMj4sCiAgICAvLyAgIE5GVDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMubG9hZFBvc3RXaXRoQWNjZXNzQ2hlY2socmVmKQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGxvYWRQb3N0V2l0aEFjY2Vzc0NoZWNrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Njg5CiAgICAvLyBsb2dnZWRBc3NlcnQoQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShUeG4uc2VuZGVyLCBORlQpWzBdID4gMCwgRVJSX1VTRVJfRE9FU19OT1RfT1dOX05GVCkKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBwb3AKICAgIGJueiBjcmVhdGVSZWFjdGlvbl9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6Tk9OVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT05UCgpjcmVhdGVSZWFjdGlvbl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGNvbnN0IHJlYWN0aW9uTGlzdEtleTogUmVhY3Rpb25MaXN0S2V5ID0geyB1c2VyOiBiMTYoVHhuLnNlbmRlci5ieXRlcyksIHJlZjogYjE2KHJlZiksIE5GVCB9CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGIxNgogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGIxNgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIHJlYWN0aW9ubGlzdCA9IEJveE1hcDxSZWFjdGlvbkxpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhSZWFjdGlvbkxpc3QgfSkKICAgIHB1c2hieXRlcyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucmVhY3Rpb25saXN0KHJlYWN0aW9uTGlzdEtleSkuZXhpc3RzLCBFUlJfQUxSRUFEWV9SRUFDVEVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVSZWFjdGlvbl9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMzUgLy8gIkVSUjpBUkNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFSQ1QKCmNyZWF0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gdGhpcy51cGRhdGVTdHJlYWsoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgdXBkYXRlU3RyZWFrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Njk5CiAgICAvLyBjb25zdCB7IHJlYWN0RmVlLCBpbXBhY3RUYXhNaW4sIGltcGFjdFRheE1heCB9ID0gZ2V0U29jaWFsRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY5OQogICAgLy8gY29uc3QgeyByZWFjdEZlZSwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXggfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczCiAgICAvLyBjb25zdCBbc29jaWFsRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1NvY2lhbEZlZXMpKQogICAgYnl0ZWMgMTEgLy8gInNvY2lhbF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjY5OQogICAgLy8gY29uc3QgeyByZWFjdEZlZSwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXggfSA9IGdldFNvY2lhbEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIGNvbnN0IHJlY2lwaWVudEltcGFjdCA9IHRoaXMuZ2V0VXNlckltcGFjdChjcmVhdG9yKQogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgZ2V0VXNlckltcGFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcwMQogICAgLy8gY29uc3QgdGF4UGVyY2VudGFnZSA9IGltcGFjdFJhbmdlKHJlY2lwaWVudEltcGFjdCwgaW1wYWN0VGF4TWluLCBpbXBhY3RUYXhNYXgpCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGltcGFjdFJhbmdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGRpZyAxCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzA0CiAgICAvLyBjb25zdCByZWFjdGlvbktleTogUmVhY3Rpb25zS2V5ID0geyByZWYsIE5GVCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHJlYWN0aW9ucyA9IEJveE1hcDxSZWFjdGlvbnNLZXksIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4UmVhY3Rpb25zIH0pCiAgICBieXRlYyAyOCAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzA1CiAgICAvLyBjb25zdCByZWFjdGlvbkV4aXN0cyA9IHRoaXMucmVhY3Rpb25zKHJlYWN0aW9uS2V5KS5leGlzdHMKICAgIGJveF9sZW4KICAgIGR1cAogICAgY292ZXIgNAogICAgY292ZXIgNwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBleHRyYSArPSB0aGlzLnRpcENyZWF0b3IoY3JlYXRvciwgcmVhY3RGZWUsIHRheCkKICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgY2FsbHN1YiB0aXBDcmVhdG9yCiAgICBmcmFtZV9kaWcgLTMKICAgICsKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIGNvbnN0IHsgcmVhY3Rpb25saXN0LCByZWFjdGlvbnMgfSA9IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBkdXAKICAgIHB1c2hpbnQgNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc2Ni03NjgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gcmVhY3Rpb25FeGlzdHMKICAgIC8vICAgPyByZWFjdGlvbmxpc3QKICAgIC8vICAgOiByZWFjdGlvbnMgKyByZWFjdGlvbmxpc3QKICAgIGJ6IGNyZWF0ZVJlYWN0aW9uX3Rlcm5hcnlfZmFsc2VAMTAKICAgIHBvcAogICAgc3dhcAoKY3JlYXRlUmVhY3Rpb25fdGVybmFyeV9tZXJnZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NzEtNzc3CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ickFtb3VudCArIGV4dHJhCiAgICAvLyAgIH0KICAgIC8vICksCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Nzc0CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc3MS03NzcKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbWJyQW1vdW50ICsgZXh0cmEKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gYW1vdW50OiBtYnJBbW91bnQgKyBleHRyYQogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDUKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NzEtNzc3CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ickFtb3VudCArIGV4dHJhCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NzAtNzc5CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQgKyBleHRyYQogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IGNyZWF0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVJlYWN0aW9uX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MTMKICAgIC8vIGlmIChyZWFjdGlvbkV4aXN0cykgewogICAgdW5jb3ZlciAyCiAgICBieiBjcmVhdGVSZWFjdGlvbl9lbHNlX2JvZHlANgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcxNAogICAgLy8gdGhpcy5yZWFjdGlvbnMocmVhY3Rpb25LZXkpLnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBib3hfcHV0CgpjcmVhdGVSZWFjdGlvbl9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzE5CiAgICAvLyB0aGlzLnJlYWN0aW9ubGlzdChyZWFjdGlvbkxpc3RLZXkpLmNyZWF0ZSgpCiAgICBpbnRjXzAgLy8gMAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICByZXRzdWIKCmNyZWF0ZVJlYWN0aW9uX2Vsc2VfYm9keUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gdGhpcy5yZWFjdGlvbnMocmVhY3Rpb25LZXkpLnZhbHVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgYm94X3B1dAogICAgYiBjcmVhdGVSZWFjdGlvbl9hZnRlcl9pZl9lbHNlQDcKCmNyZWF0ZVJlYWN0aW9uX3Rlcm5hcnlfZmFsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzY4CiAgICAvLyA6IHJlYWN0aW9ucyArIHJlYWN0aW9ubGlzdAogICAgdW5jb3ZlciAyCiAgICArCiAgICBiIGNyZWF0ZVJlYWN0aW9uX3Rlcm5hcnlfbWVyZ2VAMTEKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLnZhbGlkYXRlVGlwKHRpcDogdWludDY0LCBhY3Rpb246IGJ5dGVzKSAtPiB2b2lkOgp2YWxpZGF0ZVRpcDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MjIKICAgIC8vIHByaXZhdGUgdmFsaWRhdGVUaXAodGlwOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGFjdGlvbjogVGlwQWN0aW9uKSB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MjMKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyMwogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGR1cAogICAgYnl0ZWMgNyAvLyAiYWtpdGFfYXNzZXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyMwogICAgLy8gY29uc3QgYWt0YSA9IEFzc2V0KGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMKICAgIC8vIGNvbnN0IFtzb2NpYWxGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU29jaWFsRmVlcykpCiAgICBzd2FwCiAgICBieXRlYyAxMSAvLyAic29jaWFsX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzI0CiAgICAvLyBjb25zdCB7IHBvc3RGZWUsIHJlYWN0RmVlIH0gPSBnZXRTb2NpYWxGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzI2LTczMwogICAgLy8gbWF0Y2goCiAgICAvLyAgIHRpcCwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYWt0YSwKICAgIC8vICAgICBhc3NldEFtb3VudDogKGFjdGlvbiA9PT0gVGlwQWN0aW9uUG9zdCkgPyBwb3N0RmVlIDogcmVhY3RGZWUKICAgIC8vICAgfQogICAgLy8gKSwKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyOQogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyNi03MzMKICAgIC8vIG1hdGNoKAogICAgLy8gICB0aXAsCiAgICAvLyAgIHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFrdGEsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IChhY3Rpb24gPT09IFRpcEFjdGlvblBvc3QpID8gcG9zdEZlZSA6IHJlYWN0RmVlCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBYZmVyQXNzZXQKICAgIHVuY292ZXIgNAogICAgPT0KICAgICYmCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzMxCiAgICAvLyBhc3NldEFtb3VudDogKGFjdGlvbiA9PT0gVGlwQWN0aW9uUG9zdCkgPyBwb3N0RmVlIDogcmVhY3RGZWUKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjUgLy8gMHgwYQogICAgPT0KICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjcyNi03MzMKICAgIC8vIG1hdGNoKAogICAgLy8gICB0aXAsCiAgICAvLyAgIHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFrdGEsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IChhY3Rpb24gPT09IFRpcEFjdGlvblBvc3QpID8gcG9zdEZlZSA6IHJlYWN0RmVlCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3MjUtNzM1CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIHRpcCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICAgIHhmZXJBc3NldDogYWt0YSwKICAgIC8vICAgICAgIGFzc2V0QW1vdW50OiAoYWN0aW9uID09PSBUaXBBY3Rpb25Qb3N0KSA/IHBvc3RGZWUgOiByZWFjdEZlZQogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgIGJueiB2YWxpZGF0ZVRpcF9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgp2YWxpZGF0ZVRpcF9hZnRlcl9hc3NlcnRAMjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwudmFsaWRhdGVQb3N0UGF5bWVudChtYnJQYXltZW50OiB1aW50NjQsIGNpZDogYnl0ZXMsIGlzQW1lbmRtZW50OiB1aW50NjQsIGV4dHJhQW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnZhbGlkYXRlUG9zdFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzM4LTc0MwogICAgLy8gcHJpdmF0ZSB2YWxpZGF0ZVBvc3RQYXltZW50KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICBpc0FtZW5kbWVudDogYm9vbGVhbiwKICAgIC8vICAgZXh0cmFBbW91bnQ6IHVpbnQ2NAogICAgLy8gKTogdm9pZCB7CiAgICBwcm90byA0IDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0NAogICAgLy8gY29uc3QgeyBwb3N0cywgdm90ZXMsIHZvdGVsaXN0IH0gPSB0aGlzLm1icihjaWQsICcnLCBCeXRlcygnJykpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBkdXAKICAgIGJ5dGVjIDcgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTk3CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU8sIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldCkKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMAogICAgLy8gaWYgKHJlZmVycmVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IHZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA3CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAxCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJhbEZlZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NDcKICAgIC8vIGxldCBhbW91bnQ6IHVpbnQ2NCA9IHBvc3RzICsgdm90ZXMgKyB2b3RlbGlzdCArIHJlZmVycmFsRmVlQW1vdW50ICsgZXh0cmFBbW91bnQKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICArCiAgICB1bmNvdmVyIDIKICAgICsKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gaWYgKGlzQW1lbmRtZW50KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzQ5CiAgICAvLyBhbW91bnQgKz0gQW1lbmRtZW50TUJSCiAgICBpbnRjIDUgLy8gMTMyMDAKICAgICsKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc1My03NTkKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudAogICAgLy8gICB9CiAgICAvLyApLAogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc1NgogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NTMtNzU5CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3NTItNzYxCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50CiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogdmFsaWRhdGVQb3N0UGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMTAgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgMjQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAyCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDMKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDggLy8gNjcwMDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDUKICAgIC8vIGlmIChhc3NldCAhPT0gMCAmJiAhQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZnJhbWVfZGlnIDIKICAgIGJ6IHZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgZnJhbWVfZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAyCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDMKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDggLy8gNjcwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTA2CiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIGZyYW1lX2RpZyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzQ2CiAgICAvLyBjb25zdCByZWZlcnJhbEZlZUFtb3VudCA9IHJlZmVycmFsRmVlKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFrdGEpCiAgICBiIHZhbGlkYXRlUG9zdFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJhbEZlZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo6QWtpdGFTb2NpYWwuY3JlYXRlRGVmYXVsdE1ldGEob3JpZ2luOiBieXRlcywgaW5pdGlhbGl6ZWQ6IHVpbnQ2NCwgd2FsbGV0OiB1aW50NjQsIGF1dG9tYXRlZDogdWludDY0KSAtPiB2b2lkOgpjcmVhdGVEZWZhdWx0TWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3ODIKICAgIC8vIHByaXZhdGUgY3JlYXRlRGVmYXVsdE1ldGEob3JpZ2luOiBBY2NvdW50LCBpbml0aWFsaXplZDogYm9vbGVhbiwgd2FsbGV0OiB1aW50NjQsIGF1dG9tYXRlZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gNCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Nzg4CiAgICAvLyBsYXN0QWN0aXZlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzgzLTc5NQogICAgLy8gdGhpcy5tZXRhKG9yaWdpbikudmFsdWUgPSB7CiAgICAvLyAgIGluaXRpYWxpemVkLAogICAgLy8gICB3YWxsZXQsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBsYXN0QWN0aXZlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBmb2xsb3dlckluZGV4OiAwLAogICAgLy8gICBmb2xsb3dlckNvdW50OiAwLAogICAgLy8gICBhdXRvbWF0ZWQsCiAgICAvLyAgIGZvbGxvd0dhdGVJRDogMCwKICAgIC8vICAgYWRkcmVzc0dhdGVJRDogMCwKICAgIC8vICAgZGVmYXVsdFBheVdhbGxJRDogMAogICAgLy8gfQogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0zCiAgICBzZXRiaXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6Nzg2CiAgICAvLyBzdHJlYWs6IDEsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4My03OTUKICAgIC8vIHRoaXMubWV0YShvcmlnaW4pLnZhbHVlID0gewogICAgLy8gICBpbml0aWFsaXplZCwKICAgIC8vICAgd2FsbGV0LAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgbGFzdEFjdGl2ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZm9sbG93ZXJJbmRleDogMCwKICAgIC8vICAgZm9sbG93ZXJDb3VudDogMCwKICAgIC8vICAgYXV0b21hdGVkLAogICAgLy8gICBmb2xsb3dHYXRlSUQ6IDAsCiAgICAvLyAgIGFkZHJlc3NHYXRlSUQ6IDAsCiAgICAvLyAgIGRlZmF1bHRQYXlXYWxsSUQ6IDAKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjc4OQogICAgLy8gZm9sbG93ZXJJbmRleDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NzgzLTc5NQogICAgLy8gdGhpcy5tZXRhKG9yaWdpbikudmFsdWUgPSB7CiAgICAvLyAgIGluaXRpYWxpemVkLAogICAgLy8gICB3YWxsZXQsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBsYXN0QWN0aXZlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBmb2xsb3dlckluZGV4OiAwLAogICAgLy8gICBmb2xsb3dlckNvdW50OiAwLAogICAgLy8gICBhdXRvbWF0ZWQsCiAgICAvLyAgIGZvbGxvd0dhdGVJRDogMCwKICAgIC8vICAgYWRkcmVzc0dhdGVJRDogMCwKICAgIC8vICAgZGVmYXVsdFBheVdhbGxJRDogMAogICAgLy8gfQogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgYnl0ZWNfMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6NTUKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgTWV0YVZhbHVlPih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA1IC8vICJtIgogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czo3ODMtNzk1CiAgICAvLyB0aGlzLm1ldGEob3JpZ2luKS52YWx1ZSA9IHsKICAgIC8vICAgaW5pdGlhbGl6ZWQsCiAgICAvLyAgIHdhbGxldCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGxhc3RBY3RpdmU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGZvbGxvd2VySW5kZXg6IDAsCiAgICAvLyAgIGZvbGxvd2VyQ291bnQ6IDAsCiAgICAvLyAgIGF1dG9tYXRlZCwKICAgIC8vICAgZm9sbG93R2F0ZUlEOiAwLAogICAgLy8gICBhZGRyZXNzR2F0ZUlEOiAwLAogICAgLy8gICBkZWZhdWx0UGF5V2FsbElEOiAwCiAgICAvLyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6OkFraXRhU29jaWFsLmlzQmFubmVkKGFjY291bnQ6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzQmFubmVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9jb250cmFjdC5hbGdvLnRzOjEyMTQKICAgIC8vIHByaXZhdGUgaXNCYW5uZWQoYWNjb3VudDogQWNjb3VudCk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIxNS0xMjE4CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxNb2RlcmF0aW9uLnByb3RvdHlwZS5pc0Jhbm5lZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1vZGVyYXRpb24sCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjE2CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1vZGVyYXRpb24sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIxNgogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tb2RlcmF0aW9uLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDkgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvY29udHJhY3QuYWxnby50czoxMjE2CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1vZGVyYXRpb24sCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2NvbnRyYWN0LmFsZ28udHM6MTIxNS0xMjE4CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxNb2RlcmF0aW9uLnByb3RvdHlwZS5pc0Jhbm5lZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1vZGVyYXRpb24sCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDg0MjY5Yzc4IC8vIG1ldGhvZCAiaXNCYW5uZWQoYWRkcmVzcylib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyKHJlZjogYnl0ZXMsIHJlZlR5cGVOYW1lOiBieXRlcywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpIC0+IGJ5dGVzOgpzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE1CiAgICAvLyBtYnIocmVmOiBieXRlcywgcmVmVHlwZU5hbWU6IHN0cmluZywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpOiBBa2l0YVNvY2lhbE1CUkRhdGEgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTkKICAgIC8vIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICBwdXNoaW50IDQ2NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzAKICAgIC8vIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgICsKICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICBwdXNoaW50IDkzMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDA3YmQ0MDAwMDAwMDAwMDAwM2Q1NAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjAKICAgIC8vIHZvdGVzOiBWb3Rlc01CUiwKICAgIHB1c2hpbnQgMTkzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoyMgogICAgLy8gcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICBwdXNoaW50IDIyMTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjMKICAgIC8vIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgcHVzaGludCAxODkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE2LTMxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBmb2xsb3dzOiBGb2xsb3dzTUJSLAogICAgLy8gICBibG9ja3M6IEJsb2Nrc01CUiwKICAgIC8vICAgcG9zdHM6IE1pblBvc3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogcmVmLmxlbmd0aCksCiAgICAvLyAgIHZvdGVzOiBWb3Rlc01CUiwKICAgIC8vICAgdm90ZWxpc3Q6IFZvdGVsaXN0TUJSLAogICAgLy8gICByZWFjdGlvbnM6IFJlYWN0aW9uc01CUiwKICAgIC8vICAgcmVhY3Rpb25saXN0OiBSZWFjdGlvbmxpc3RNQlIsCiAgICAvLyAgIG1ldGE6IE1ldGFNQlIsCiAgICAvLyAgIG1vZGVyYXRvcnM6IE1vZGVyYXRvcnNNQlIsCiAgICAvLyAgIGJhbm5lZDogQmFubmVkTUJSLAogICAgLy8gICBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgLy8gICAvLyBCb3gga2V5OiBwcmVmaXgoMSkgKyB1aW50NjQoOCkgPSA5IGJ5dGVzCiAgICAvLyAgIC8vIEJveCB2YWx1ZTogQVJDLTQgaGVhZGVyKDQpICsgc3RyaW5nIGxlbmd0aCgyKSArIG5hbWUgKyBieXRlcyBsZW5ndGgoMikgKyBzY2hlbWEKICAgIC8vICAgcmVmVHlwZXM6IFJlZlR5cGVzQmFzZU1CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyhyZWZUeXBlTmFtZSkubGVuZ3RoICsgQnl0ZXMocmVmVHlwZVNjaGVtYSkubGVuZ3RoKSkKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoyNAogICAgLy8gbWV0YTogTWV0YU1CUiwKICAgIHB1c2hpbnQgNDUzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjI3CiAgICAvLyBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgcHVzaGludCAyOTcwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE2LTMxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBmb2xsb3dzOiBGb2xsb3dzTUJSLAogICAgLy8gICBibG9ja3M6IEJsb2Nrc01CUiwKICAgIC8vICAgcG9zdHM6IE1pblBvc3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogcmVmLmxlbmd0aCksCiAgICAvLyAgIHZvdGVzOiBWb3Rlc01CUiwKICAgIC8vICAgdm90ZWxpc3Q6IFZvdGVsaXN0TUJSLAogICAgLy8gICByZWFjdGlvbnM6IFJlYWN0aW9uc01CUiwKICAgIC8vICAgcmVhY3Rpb25saXN0OiBSZWFjdGlvbmxpc3RNQlIsCiAgICAvLyAgIG1ldGE6IE1ldGFNQlIsCiAgICAvLyAgIG1vZGVyYXRvcnM6IE1vZGVyYXRvcnNNQlIsCiAgICAvLyAgIGJhbm5lZDogQmFubmVkTUJSLAogICAgLy8gICBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgLy8gICAvLyBCb3gga2V5OiBwcmVmaXgoMSkgKyB1aW50NjQoOCkgPSA5IGJ5dGVzCiAgICAvLyAgIC8vIEJveCB2YWx1ZTogQVJDLTQgaGVhZGVyKDQpICsgc3RyaW5nIGxlbmd0aCgyKSArIG5hbWUgKyBieXRlcyBsZW5ndGgoMikgKyBzY2hlbWEKICAgIC8vICAgcmVmVHlwZXM6IFJlZlR5cGVzQmFzZU1CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyhyZWZUeXBlTmFtZSkubGVuZ3RoICsgQnl0ZXMocmVmVHlwZVNjaGVtYSkubGVuZ3RoKSkKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwucGF5V2FsbE1icihwYXl3YWxsOiBieXRlcykgLT4gdWludDY0LCBieXRlczoKc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLnBheVdhbGxNYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzQKICAgIC8vIHBheVdhbGxNYnIocGF5d2FsbDogVmlld1BheVdhbGxWYWx1ZSk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czozNwogICAgLy8gUGF5V2FsbFBheU9wdGlvblNpemUgKiAocGF5d2FsbC5hZ2VudFBheUluZm8ubGVuZ3RoICsgcGF5d2FsbC51c2VyUGF5SW5mby5sZW5ndGgpCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czozNi0zOAogICAgLy8gQm94Q29zdFBlckJ5dGUgKiAoCiAgICAvLyAgIFBheVdhbGxQYXlPcHRpb25TaXplICogKHBheXdhbGwuYWdlbnRQYXlJbmZvLmxlbmd0aCArIHBheXdhbGwudXNlclBheUluZm8ubGVuZ3RoKQogICAgLy8gKQogICAgcHVzaGludCA2ODAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzUKICAgIC8vIHJldHVybiBNaW5QYXlXYWxsTUJSICsgKAogICAgcHVzaGludCA1MjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzUtMzkKICAgIC8vIHJldHVybiBNaW5QYXlXYWxsTUJSICsgKAogICAgLy8gICBCb3hDb3N0UGVyQnl0ZSAqICgKICAgIC8vICAgICBQYXlXYWxsUGF5T3B0aW9uU2l6ZSAqIChwYXl3YWxsLmFnZW50UGF5SW5mby5sZW5ndGggKyBwYXl3YWxsLnVzZXJQYXlJbmZvLmxlbmd0aCkKICAgIC8vICAgKQogICAgLy8gKQogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IHVpbnQ2NCwgY3JlYXRvcjogYnl0ZXMsIHdhbGxldDogdWludDY0KSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLmNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjU1CiAgICAvLyBjaGVja1RpcE1iclJlcXVpcmVtZW50cyhha2l0YURBTzogQXBwbGljYXRpb24sIGNyZWF0b3I6IEFjY291bnQsIHdhbGxldDogQXBwbGljYXRpb24pOiB0aXBNQlJJbmZvIHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgNyAvLyAiYWtpdGFfYXNzZXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjU2CiAgICAvLyBjb25zdCBha3RhID0gQXNzZXQoZ2V0QWtpdGFBc3NldHMoYWtpdGFEQU8pLmFrdGEpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1OAogICAgLy8gaWYgKCFjcmVhdG9yLmlzT3B0ZWRJbihha3RhKSAmJiB3YWxsZXQuaWQgIT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0My01MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgbWV0aG9kU2VsZWN0b3I8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oKQogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMzAgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0NgogICAgLy8gZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICBleHRyYWN0IDAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQ3CiAgICAvLyBDYWxsZXJUeXBlR2xvYmFsLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0OAogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQzLTUyCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NhbkNhbGw+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBnZXRQbHVnaW5BcHBMaXN0KGFraXRhREFPKS5vcHRpbiwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgICAnJywKICAgIC8vICAgICBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPigpCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhiMzYyMzRhNSAvLyBtZXRob2QgImFyYzU4X2NhbkNhbGwodWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzRdKWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDkKICAgIC8vICcnLAogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjUwCiAgICAvLyBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPigpCiAgICBieXRlYyAzOSAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0My01MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgbWV0aG9kU2VsZWN0b3I8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oKQogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MAogICAgLy8gaWYgKGNhbkNhbGxBcmM1OE9wdEluKSB7CiAgICBieiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjMKICAgIC8vIGFyYzU4OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjYxLTY0CiAgICAvLyByZXR1cm4gewogICAgLy8gICB0eXBlOiBUaXBTZW5kVHlwZUFSQzU4LAogICAgLy8gICBhcmM1ODogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjIKICAgIC8vIHR5cGU6IFRpcFNlbmRUeXBlQVJDNTgsCiAgICBieXRlYyA2IC8vIDB4MTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MS02NAogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgdHlwZTogVGlwU2VuZFR5cGVBUkM1OCwKICAgIC8vICAgYXJjNTg6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfQogICAgc3dhcAogICAgY29uY2F0CiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjgtNzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHR5cGU6IFRpcFNlbmRUeXBlRGlyZWN0LAogICAgLy8gICBhcmM1ODogMAogICAgLy8gfQogICAgcHVzaGJ5dGVzIDB4MGEwMDAwMDAwMDAwMDAwMDAwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAJAAEIAqCNBpBn1PcBgKMFuIsEJioJYWtpdGFfZGFvBBUffHUBAAABcAFtARQMYWtpdGFfYXNzZXRzDGFraXRhX2VzY3JvdwNzYWwIRVJSOklQQVkLc29jaWFsX2ZlZXMIRVJSOk5QU1QCAAABAwFvAQEIRVJSOkhHVEUBdwZ3YWxsZXQIRVJSOk5EQU8IRVJSOklSRkwKcGF5d2FsbF9pZBByZWZfdHlwZV9jb3VudGVyA2FhbAEKAQIIRVJSOkZHVEUBcgQn47tPA3BhbAhFUlI6QkFORAIAAQd2ZXJzaW9uCEVSUjpOVk9UCEVSUjpBUkNUCEVSUjpOTVRBCQAAAAAAAAAAAAhFUlI6QkxLRARoNeO8CEVSUjpFUFNUAgBNMRhAAAknFiNnJxeBBGeABOqRgN02GgCOAQEBMRkURDEYQQDqgiAEg/FHSASOUH8bBDNbOpwE4VqEKwQBAkXaBPZaR70Ev/jDtQQ6n9peBIT6S14EWvYCJwRjWYoYBG5bdwIEUQ7etgSFZDPqBNCfPegEaaTvlwQzBrMqBJX58aME4775QwTm5nvcBHOepwsEwCK+iQSYuB94BJ4XS7YEqJEgRATxNgDRBBQyT7cEoTSieAQ0QXXwBK6Ey9gEM+kslASFTe3gNhoAjiAC6wMhA5EEJAT6BbQGUwbVB10H7AhoCMgJLAmOCrsLMwvlDC8M1gzoDQMNGA0zDVMNhQ39DiMOXA6cDsAPPwABACNDgARa2fTGNhoAjgECmAAxGYEEEjEYEERCDtqKAQGL/xUiSwEPIksCTwJNgRBLAg+BEE8DTwJNi/9OAlJJFYEQEkSJigMBi/0jDUEAE4v9IwmL/4v+CQuB6AcKi/9MCYkjQv/tigEBMgOL/0AAAYlIi/+ACHJlZmVycmVyZUiJigIBi/6AA29hbGVIgRhbsbIYgAQ8Gm8zshqL/7IagQayECKyAbO0PklXBABLAVcABCkSREkiWSUITBUSRFcGAEkVSU4CQQAHiwAkE0EABEgiTIkXQv/6igQBi/w4GIv9JxhlSIEoWxJBADmL/DgZQAAyi/w4G4EEEkEAKIv8ORoAgARDkiZVEkEAGYv8ORoBi/4SQQAOi/w5GgKL/xYSQQACI4kiiYoDASuL/TEAiP9PiP8xi/9BAWVJMgMTQQFei/2AC3dhbGxldF9mZWVzZUgkW0khBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjAAyB0mBgPUkCEyLABZPA0xQJyBMUElOA4v9JxhlSCRbTCJZgdTFAQuB5MUCCEyL/kAAW7FJcghESwKLAAiyCLIHI7IQIrIBtk8CFk8DFk8CshiABHt9xfyyGkyyGrIaTLIagQayECKyAbO0PklXBABMVwAEKRJESRUkEkQXFkwWUFcICIv/iwAJFkxQTIlJcghEi/5wAEUBQQBkSwFMSXIIRLFLAXIIRE8EsgiyByOyECKyAbaL/rIRiwCyErIUgQSyECKyAbZPAhZPAxZPArIYgASvGhTyshpMshqyGkyyGoEGshAisgGztD5JVwQATFcABCkSREkVJBJEF0L/fksBMhAIsUsBSXIIRDIQsgiyByOyECKyAbaL/hZMshiABDlOrrKyGrIagQayECKyAbNC/2qL/xYiFlCMAIk2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXNhoDSRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJyFPA2coTwJnJwhMZyNDIihlRCcHZUgiW0kyCkxwAEUBQQAMgAhFUlI6QU9QVLAAsTIKTLIRIrISshSBBLIQIrIBsyNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUkEkQXNhoCSRWBGBJENhoDSRWBJBJENhoESRUkEkQXNhoFSRUjEkQiUzYaBkkVJBJEFzYaB0kVJBJEF08GTwaIDWZPBicZiBctTgZOBiorTwiIEywjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUlOAhWBJBJENhoCSU4DSRWBIBJENhoDSRUkEkQXTgUnBExQvUUBQAAEJwywAEsCSwKIDXZJJVtOBUmBUFNOBUmBC1tOBUlXEwFMVxQgTIgLaEEADIAIRVJSOklTUlCwAEwnGYgWok8DTwJPBk8GTwYnGk8HTwiIEpkjQzEWgQMJSTgQIxJEMRYlCUk4EIEEEkQxFiMJSTgQgQYSRDYaAUkVJBJEFzYaAkkVgRgSRDYaA0lOBRWBJBJENhoESSJZJQhLARUSRFcCADYaBUkVJBJEFzYaBkkVJBJEF04INhoHSRUjEkQiU04INhoISRUkEkQXTgg2GglJFSQSRBdOCE8DTwOIDDROA0yIDFNJVwAgTgNJgSBbTgKBKFsiKGVEMQBPA04CTwOI/AVAAAQnG7AATwMnBogV0ExPBE8CTwRPBE8ITwhPCCcQK08KiBLfI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFSQSRBc2GgJJFYEYEkQ2GgNJTgQVgSQSRDYaBEkiWSUISwEVEkRXAgA2GgVJFSQSRBc2GgZJFSQSRBdOBzYaB0kVIxJEIlNOBzYaCEkVJBJEF04HNhoJSRUkEkQXTgdPA08DiAtqTgJMiAuJSVcAIE4CSYEgW0yBKFtBAAQnEbAATwMnBogVFkxPBE8CTwRPBE8ITwhPCCcQK08KiBIlI0MxFoEDCUk4ECMSRDEWJQlJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJTgNJFYEkEkQ2GgJJTgZJFYEgEkQ2GgNJFSQSRBdOBkyIDFFJVwAgTgJJgSBbSwGBKFtOA0sBgYADU04DSwGBMVtOA0xXOSBOAiIoZUQxAE8DTgJPA4j6p0AABCcbsABPBScGiBRyTwYiTgdOB04HJw5PCk8KiBGGI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJTgJJFYEkEkQ2GgJJTgVJFYEgEkQ2GgNJFSQSRBdOBUyIC75JVwAgTEmBIFtLAYEoW04CSwGBgANTTgJLAYExW04CTFc5IExBAAQnEbAATwUnBogT8E8GIk4HTgdOBycOTwpPCogRBCNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVIxJEIlNOA0lPAogIZElXACBOAlcgIEwjEkEAFUgnBEsBUEm9RQFAAAQnDLAAIoEgukxJTwKIDgNPAicGiBNqK0cCiBSwgSBbCE8DTE8CTwOIEW0jQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUlOAkkVgSASRDYaAkkVIxJEIlNMMQCI+I9MiPiLUCcPTFBJvUUBQAAEJyKwAEm+REkiW0yBQFMUSU4DSwZMTwKIDi+8SExAABtGBLExACtHAogUNIEgW7IIsgcjshAisgGzI0NMJwaIEtJPAiJPA08DiBDfQv/rMRaBAwlJOBAjEkQxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVJBJEF04FTIgI00lXACBOA0mBIFtOAoEoWyIoZUQxAE8DTgJPA4j4hUAABCcbsABMJwaIElFMTwOIEWsjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBc2GgNJFSQSRBdOBEyICGNJVwAgTgJJgSBbTIEoW0EABCcRsABMJwaIEfFMTwOIEQsjQzYaAUcCFYEgEkQ2GgJJFSQSRBdLAYgH0kgxAIj3N08CiPcyUEwWSU4CUIABZUxQSb1FAUAABCcjsABOAlAnHExQSb5EFyMJFr+8SLExACtHAogS4YEwW7IIsgcjshAisgGzI0M2GgFJFYEgEkQ2GgJJFSMSRCJTNhoDSRUkEkQxACIoZUQnCWVIgRhbcghEEkAADIAIRVJSOk5NRFiwACcETwNQSb1FAUAABCcMsABJgTkjuiJPBFRLAYE5TwK7gUNPArsjQzEWIwlJOBAjEkQ2GgFJFYEgEkQ2GgJJFSMSRCJTTDYaA0lOBBUkEkQ2GgRJTgQVJBJENhoFSU4EFSQSRCIoZURLAYj2rkwxABInBTEAUL1FAUEADIAIRVJSOkVNVEGwAE8DSTgHMgoSTDgIK0cCiBH+gThbIQYIEhBAAAQnCrAAIihlRCcJZUiBEFtJsXIIRCEGsgiyByOyECKyAbNPA0EATE8DSE8DSE8DSDEATwJPAyOIEUixMQAiFk8CshgnHbIaTLIaSbIaSbIashqBBrIQIrIBs7Q+SVcEAExXAAQpEkQVJBJEIhYpTFCwI0MxAE8CTwMiiBEFsTEATLIYJx2yGrIaTwKyGkyyGrIagQayECKyAbO0PklXBABMVwAEKRJESRUkEkQXIwhC/7oxFiMJSTgQIxJENhoBSRVLASJZSYEEEkRLAkxLAlIiWYERC4EGCEsCJVlJSwISREsDTEsDUiJZgRELJQgIEkRLATgHMgoSTwI4CE8CiBFWTgMPEEAABCcKsAAiJxZlREkjCCcWTGcWJxJLAVBJvEhPAr8pTFCwI0M2GgFJFSQSRDYaAkkVJBJENhoDSU4DFSQSRDYaBElOAxUkEkQ2GgVJTgMVJBJENhoGRwIVJBJEFycFMQBQvUUBQAAEJySwABYnEkxQvUUBQAAMgAhFUlI6TlBXTLAAJwUxAFC+RE8DXDJPAlw6TFxCJwUxAFBMvyIoZUQnCWVIgRBbsTEATLIYJx2yGrIaTwKyGkyyGrIagQayECKyAbO0PklXBABMVwAEKRJEFSQSRCNDNhoBSRWBIBJENhoCSRUkEkQ2GgNJFSQSRDEAIihlRCcJZUgkW3IIRBJAAAyACEVSUjpOR1JGsAAnBU8DUEmBIU8Eu4EpTwK7I0MxFiMJSTgQIxJENhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgBMMQAiKGVEJxNlSHIIRBJAAAQnFLAATwJJOAcyChJMOAgrSwNLBYgPe4FYWxIQQAAEJwqwACInF2VEIwgnF0sBZ0xJFRZXBgJMUEkVgQQITwNJFRZXBgJMUEwWVwYCgAIABExQTwJQTFBMFoABdEsBUEm8SE8CvylMULAjQzYaAUkVgSASRIgGAylMULAjQzYaAUkVgSASRCcFTFC9RQEqIk8CVClMULAjQzYaAUkVgSASRCcFTFC+RClMULAjQzYaAUkVgSASRCcETFC9RQEqIk8CVClMULAjQzYaAUkVgSASRCcETFBJvUUBQAAEJwywAL5EKUxQsCNDNhoBSRWBIBJENhoCSRWBIBJETIjytEyI8rBQJw9MUEm9RQFAAAQnIrAAvkQpTFCwI0M2GgFHAiJZSU4CgUALJQhMFRJEJw0iSUsDDEEAVEsDVwIASwGBQAuBQFhJVwAgTFcgIEyI8mJMiPJeUCcPTFBJvUUBQQAXvkRPAkkiWSMIFlcGAFwATFBMIwhC/7lITEkiWSMIFlcGAFwAJyVQTEL/50gpTFCwI0M2GgFJFYEgEkQ2GgJJFSQSRBcWUCccTFC9RQEqIk8CVClMULAjQzYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIANhoDSSJZJQhLARUSRFcCAIgNpylMULAjQzYaAUkVSwEiWUmBBBJESwJMSwJSIlmBEQuBBghLAiVZSUsCEkRLA0xLA1IiWYERCyUICBJEiA3MSBYpTFCwI0M2GgFJFSQSRBc2GgJJFYEgEkQ2GgNJFSQSRBeIDdEpTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJxNlSHIIRBJAAAQnFLAAJwhMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcTZUhyCEQSQAAEJxSwACIoZUQnHmVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAJyFMZyNDNhoBSRUkEkQXMQAiKGVEJxNlSHIIRBJAAAQnFLAAKExnI0OKAQGL/ycQEkAACIv/Jw4SQQACI4kiiYoCASIyA4v+IxJBABWL/xWBIBJJQAAEJxWwAESL/0xQTIlIi/4lEkEANov/FSQSQAAEJxWwAIv/F0lxAERAAAyACEVSUjpJQVNUsACBGK+L/0xQSRWBIBJETHELREL/v4v+gQMSQQAxi/8VgSASSUAABCcVsABEJwWL/1BJjAC9RQFBAA6LAL5EgTpbQQAEJxGwAIv/SUL/hov+gQQSQQA3i/8VJBJAAAQnFbAAi/8XSXIARBVAAAyACEVSUjpJQVBQsACBGK+L/0xQSRWBIBJETHIHREL/R4v+FkmAAXRMUL1FAUAADIAIRVJSOk5SVFCwAIv/UAEyA0L/I4oCAbEiKGVEJwllSCRbshiABEMDZo6yGov+shqL/7IagQayECKyAbO0PklXBABMVwAEKRJESRUjEkQiU4mKAQExAIgLCUEABCcfsAAnBIv/UEm9RQFAAAQnDLAAIoEgukkxAIj/mkEABCcmsACJigIBMgeL/gmBPA5AAAyACEVSUjpUU09MsAAxAIv+FlCL/1ABiYoCAYv+i/+I/mdJVwAgSU8CVyAgTCcETFBJvUUBQAAEJwywAEkigSC6TIEoJLoXMgNPA0lPAhJMTwNPAk1PAklPAogD9hZQTBZQiYoCAScEi/5QRwIigSC6SwGBTSW6FyUISwKBTU8CulcCAE4CSwGBKCS6F04DSwGBMCO6IlNOA0sBgTEkuhdOA0yBOiO6TDEAEkAADIAIRVJSOk5FRFSwAEkqEkEAdIEkSwIVSU8CDUEADIAIRVJSOkVBTUSwADEAi/5Qi/9QAYABYUsBUE8ESU8CUE8ISU4CvkRLARUWVwYCTwJQSwGBS1lPAiJPAlhMUEsBvEi/TwIWVwYCTFBPBRaAAgA0TFAqIk8HVFBPBBZQTwNQTwJQTFCJSScQEkEABYFEQv+CSScaEkEABYFEQv92SScOEkEABYFkQv9qgSRC/2WKAgEnBIv+UL1FAUAADIAIRVJSOk5SUEywAIv+i/+I/uVJIllLARVLAk4CUlcCAExJVwIITEmBUFNMSVcLCExJVxMBTFcUIEyI/MpAAAyACEVSUjpOQVJQsABPBEkVgSRLAQ+BJEsCTwJNgURLAg+BRE8DTwJNUkkVgSASRCcESwFQgSgkuhcWUE8EUCoiTwVUUE8CUExQiYoBASIrSSJHAicFi/9QSb1FAUEAEosGvkQjjANJgQlbjASBEVuMBSKMAiKMAYABdov/UEmMAL1FAUEADosAvkRJIluMAoFAU4wBKiKLA1SLBBZQiwUWUIsCFlAqIosBVFCMAImKAQGL/4j/lLEiKGVEJwllSIEQW7IYgATyTWBjshqL/7IashqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSQSRBeJigMBIiuL/TIDEkEAKiIoZUQnB2VIIluxIicIZUQlW3IIREyyEYv+shKyFIEEshAisgGzIowAiSKMAScFi/1QSYwAvUUBQQAIiwC+RCNbjAEiKGVEi/2LAYgIp0lXAAFMI1tMIihlREknB2VIIltJTgOL/4jtKCJbTgIiKGVEJwtlSCRbTCcGEkEAyov/CYsBSYASY29udHJvbGxlZF9hZGRyZXNzZUhMIihlRCceZUhJVwAITCJbsSMWSwOyGIAEWt8zj7IaTwKyGrIaJw2yGicNshonDbIagQayECKyAbYyEEsDsgeyCCOyECKyAbZLARZPBUlOBBYnIExQTwKyGCcnshpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAbYiJwhlRCVbcghESwGyEU8EshKyFIEEshAisgG2shGyFLISgQSyECKyAbOMAIlPA0iL/wlJTgMiJwhlRCVbcghMTgJEQQAzi/1LAnAARQFBACixTEmyEU8CshJMshSBBLIQIrIBtrIRshKL/bIUgQSyECKyAbMijACJTwJPAwixTwKyEbISshSBBLIQIrIBs0L/44oCAScEi/5QSb1FAUAAMTIHIhZMFov/TFBLAVAqUEsBUCcNUEsBUExQgAQATQAAUExJvEhMvytHAogGfoEQW4kiTImKAQAnBYv/UEm9RQFAAAQnJLAAiwBJvkRJgRFbTIEZW0lOAk4DMgdJTwIJIQcYCUlOAyEHCTIHFk8DgRlPArsMQQAKIxaLAIEJTwK7iQxBAA+LAEm+RIEJWyMIFoEJTLuJigMAgAF2i/1QSb1FAUAAHIv+FIv/FioiTwNUUElXAAhMgUBTKiJPAlRQv4lJvkRJgUBTTgIiW4v+QQAFSwJAAAqL/kAAaksCQABlI0xJQAATRgJFAYv+FIv/FioiTwNUUEL/uIv/SwESQQAOSwFBAAlGAkUBJyVC/6KL/0sBDUsCEEEAFEUBi/9MCU8CFEwWKiJPA1RQQv+DTEEADYv/CRYqIk8EVFBC/3KL/whC//AiTEL/mIoEAIv+iOl5i/yI6XRQi/8WKiKL/VRQJw9PAlBMv4mKCQAxAIgFAEEABCcfsACL+0AABYv8QQAwi/tBAPqL/EEADYv8FicSTFC9RQFAABmL/EAA4ycFMQBQvkRXQggnEkxQvUUBQQDPI0AADIAIRVJSOklQV0ywAIv9JxoSRwIhBQuL+Iv5TwNPA4gD0jEAiP5YMQCI/BZMJwSL91BJvUUBQQAEJyiwAExBAIaL+Yv+UDEAMgcWUIv6FlAqIov7VFCL/BZQKlCL/VCL/xZQIhZQTEkVFlcGAkxQTCcpUExQTEm8SEy/i/cjSwKI/l2L9yMxAE8DiP8IIihlREknB2VIIltLAScLZUgiW08CSwJPAojpdyJbsSInCGVEJVtyCERPArIRshSyEoEEshAisgGziYv5Qv96IkL/LooLADEAiAPkQQAEJx+wACcEi/lQIoEgukkxAIj4gEEABCcmsAAxAIj9hSIoZUQnC2VIJFtLAYj7OSIoZUQnC2VISYEQW0yBGFuI6CJJIQQOREsBHSEEl4v9Jw4SSU4CTgRPA08DTwKI+0iL9whMQQADIQUIi/aL+EsDTwOIAqUnBIv1UElOAr1FAUEABCcosABBAFWL+Iv5UIv+UDEAMgcWUIv6FlAqIov7VFCL/BZQKlCL/VCL/xZQIhZQTEkVFlcGAkxQTCcpUExQTEm8SEy/MQCI+pyL9SNLAoj9Mov1IzEATwOI/d2Ji/iL+VBC/6uKBACL/oj34jEAiOdIi/6I50NQJw9MUL1FAUEADIAIRVJSOkFWT1SwADEASwETQAAMgAhFUlI6U1ZPVLAAJwUxAFC+RIGIA1NBAAyACEVSUjpBVVRPsAAiKGVEJwdlSCJbTDEAiPxXIihlRCcLZUhJJFtOA0mBEFtOAoEYW4v/QQBTTwNITEmI+fdPA08DiObsSSEEDkRPAklPAh0hBJeI+h+L/DgHMgoSi/w4CIv9TwMIEhBAAAQnCrAAMQCI+cGL/ov/SwKI/FaL/ov/MQBPA4j9AIlGA4v8OAcyChKL/DgIi/0SEEAABCcKsACxIicIZUQlW3IIRLIUshGyEoEEshAisgGzQv+yigQAi/6I9tkxAIv/cABIQAAMgAhFUlI6Tk9OVLAAMQCI5imL/ojmJFCL/xZJTgNQgAFlTFBJvUUBQQAEJyOwADEAiPtwIihlRCcLZUhJJFtLAYEQW08CgRhbTwRJTgSI+RZOAojmDUkhBA5ESwEdIQSXi/5PBVAnHExQSU4FvUlOBE4HSE8DTgKI+SyL/QhOAytHAogBlUmBMFtOA4EoW0xBADZITIv8OAcyChKL/DgITwJPBQgSEEAABCcKsABPAkEADUxJvkQXIwgWvyK5SIkjFk8CTL9C//NPAghC/8aKAgAiKGVESScHZUgiW0wnC2VISSJbTCRbi/44FDIKEov+OBFPBBIQi/44Eov/JxkSTwNPBE8CTRIQQAAMgAhFUlI6SVhGUrAAiYoEACtJi/0rSYgA9kmBEFtMSYEYW0yBIFsiKGVMSU8CREknB2VIIltOBTEAiOVXiOU5MgMSQQAtSCJPA08DCE8CCAiL/wiL/kEAAyEFCIv8OAcyChKL/DgITwISEEAABCcKsACJJxhlSCRbjAEhCIwAiwJBABWLAXIIRIsCcABFAUAAByEIMhAIjACLAEL/qooEADIHSSoii/1Ui/4WUCMWUE8CFlBMFlAiFkxLAVBLAVAqIov/VFBLAVBLAVBMUCcFi/xQTL+JigEBsSIoZUQnCWVIgRhbshiABIQmnHiyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSMSRCJTiYoDAYv9FYGQAwuBpOsCCIv+FYv/FQiBkAMLgdRICEwWgBAAAAAAAAB71AAAAAAAAD1UTFCB5JYBFkxLAVBMUIHUrAEWUIHUkwEWTEsBUIH04QIWUEsBUExQgYToARZQTBZQiYoBAov/JVmL/xWL/0sCTwJSIlmL/yJZi/9MTwNSIlkIgZA1C4HQKAiL/4mKAwGL/ScHZUgiW4v+THAARQFAAFeL/0EAUrGL/SceZUhXAAgjFjIDi/+yGIAEs2I0pbIaTwKyGkyyGrIaJw2yGicnshqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSMSRCJTQQAIMhAWJwZMUImACQoAAAAAAAAAAIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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



var APP_SPEC2 = { "name": "AkitaSocialGraph", "structs": { "AkitaSocialMBRData": [{ "name": "follows", "type": "uint64" }, { "name": "blocks", "type": "uint64" }, { "name": "posts", "type": "uint64" }, { "name": "votes", "type": "uint64" }, { "name": "votelist", "type": "uint64" }, { "name": "reactions", "type": "uint64" }, { "name": "reactionlist", "type": "uint64" }, { "name": "meta", "type": "uint64" }, { "name": "moderators", "type": "uint64" }, { "name": "banned", "type": "uint64" }, { "name": "actions", "type": "uint64" }, { "name": "refTypes", "type": "uint64" }], "BlockListKey": [{ "name": "user", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "FollowsKey": [{ "name": "user", "type": "byte[16]" }, { "name": "follower", "type": "byte[16]" }], "ViewPayWallValue": [{ "name": "userPayInfo", "type": "(uint8,uint64,uint64)[]" }, { "name": "agentPayInfo", "type": "(uint8,uint64,uint64)[]" }], "tipMBRInfo": [{ "name": "type", "type": "uint8" }, { "name": "arc58", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "akitaDao", "desc": "The Akita DAO app ID" }, { "type": "string", "name": "version", "desc": "The version string for this contract" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "desc": "Create method to initialize the contract with the DAO reference", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedFollow", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "follow", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unfollow", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "user" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFollowing", "args": [{ "type": "address", "name": "follower" }, { "type": "address", "name": "user" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getFollowIndex", "args": [{ "type": "address", "name": "follower" }, { "type": "address", "name": "user" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "byte[]", "name": "ref" }, { "type": "string", "name": "refTypeName" }, { "type": "byte[]", "name": "refTypeSchema" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "AkitaSocialMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "payWallMbr", "args": [{ "type": "((uint8,uint64,uint64)[],(uint8,uint64,uint64)[])", "struct": "ViewPayWallValue", "name": "paywall" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "checkTipMbrRequirements", "args": [{ "type": "uint64", "name": "akitaDAO" }, { "type": "address", "name": "creator" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(uint8,uint64)", "struct": "tipMBRInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "follows": { "keyType": "FollowsKey", "valueType": "uint64", "desc": "Who follows who - key is {user, follower}, value is the follow index", "prefix": "Zg==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "All the blocks on the network", "prefix": "Yg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [887], "errorMessage": "Box must have value" }, { "pc": [1272, 1360, 1471], "errorMessage": "Bytes has valid prefix" }, { "pc": [1645], "errorMessage": "ERR:AFLW" }, { "pc": [1615], "errorMessage": "ERR:AUTO" }, { "pc": [292, 374, 708, 1542], "errorMessage": "ERR:BAND" }, { "pc": [1571], "errorMessage": "ERR:BLKD" }, { "pc": [569], "errorMessage": "ERR:FGTE" }, { "pc": [651], "errorMessage": "ERR:HGTE" }, { "pc": [340, 599, 681], "errorMessage": "ERR:IPAY" }, { "pc": [961], "errorMessage": "ERR:IUPG" }, { "pc": [932, 998], "errorMessage": "ERR:NDAO" }, { "pc": [737], "errorMessage": "ERR:NFLW" }, { "pc": [312], "errorMessage": "ERR:SBLK" }, { "pc": [1591], "errorMessage": "ERR:SFLW" }, { "pc": [403], "errorMessage": "ERR:UNBK" }, { "pc": [1382, 1393, 1409, 1420], "errorMessage": "Length must be 16" }, { "pc": [924, 990], "errorMessage": "application exists" }, { "pc": [477, 917, 936, 983, 1317, 1429, 1485], "errorMessage": "check GlobalState exists" }, { "pc": [243, 901, 1009, 1025, 1041, 1083, 1107, 1125], "errorMessage": "invalid array length header" }, { "pc": [250, 908, 1016, 1032, 1048], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [281, 363, 465, 630, 697, 790, 798, 829, 837, 869, 877, 1160], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [236, 976, 1150, 1169], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1277, 1365], "errorMessage": "invalid number of bytes for bool" }, { "pc": [1477], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::MetaValue" }, { "pc": [1120], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::ViewPayWallValue" }, { "pc": [1074], "errorMessage": "invalid tail pointer at index 0 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1098], "errorMessage": "invalid tail pointer at index 1 of ((len+(uint8,uint64,uint64)[]),(len+(uint8,uint64,uint64)[]))" }, { "pc": [1069, 1093], "errorMessage": "invalid tuple encoding" }, { "pc": [454], "errorMessage": "transaction type is appl" }, { "pc": [273, 440, 621], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDMyIDIKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAiIiAiRVJSOkJBTkQiICJiIiAiZiIgIkVSUjpJUEFZIiAic2FsIiAidmVyc2lvbiIgIndhbGxldCIgIkVSUjpOREFPIiAicGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxHcmFwaCBleHRlbmRzIGNsYXNzZXMoQmFzZVNvY2lhbCwgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsR3JhcGggZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjEKICAgIHB1c2hieXRlc3MgMHhiNTljOGE1NCAweGFlZWJiMzc4IDB4ODY2NzU0OTQgMHg0YjZmOTA3ZiAweDE2MWIzYTdhIDB4NDMwMzY2OGUgMHhlYjYyZjUwOCAweDA5ODM4MGE0IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDE0MzI0ZmI3IDB4YTEzNGEyNzggMHgzNDQxNzVmMCAvLyBtZXRob2QgImJsb2NrKHBheSxhZGRyZXNzKXZvaWQiLCBtZXRob2QgInVuYmxvY2soYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZEZvbGxvdyhwYXksYXBwbCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImZvbGxvdyhwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1bmZvbGxvdyhhZGRyZXNzKXZvaWQiLCBtZXRob2QgImlzQmxvY2tlZChhZGRyZXNzLGFkZHJlc3MpYm9vbCIsIG1ldGhvZCAiaXNGb2xsb3dpbmcoYWRkcmVzcyxhZGRyZXNzKWJvb2wiLCBtZXRob2QgImdldEZvbGxvd0luZGV4KGFkZHJlc3MsYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoYnl0ZVtdLHN0cmluZyxieXRlW10pKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAicGF5V2FsbE1icigoKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10sKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pKXVpbnQ2NCIsIG1ldGhvZCAiY2hlY2tUaXBNYnJSZXF1aXJlbWVudHModWludDY0LGFkZHJlc3MsdWludDY0KSh1aW50OCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggYmxvY2sgdW5ibG9jayBnYXRlZEZvbGxvdyBmb2xsb3cgdW5mb2xsb3cgaXNCbG9ja2VkIGlzRm9sbG93aW5nIGdldEZvbGxvd0luZGV4IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxNiBtYnIgcGF5V2FsbE1iciBjaGVja1RpcE1iclJlcXVpcmVtZW50cwogICAgZXJyCgptYWluX29wVXBfcm91dGVAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MQogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsR3JhcGggZXh0ZW5kcyBjbGFzc2VzKEJhc2VTb2NpYWwsIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweDZmOTgxN2Y2IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURhbwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjMKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmJsb2NrW3JvdXRpbmddKCkgLT4gdm9pZDoKYmxvY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OTUKICAgIC8vIGJsb2NrKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzQmFubmVkKFR4bi5zZW5kZXIpLCBFUlJfQkFOTkVEKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBpc0Jhbm5lZAogICAgYnogYmxvY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpCQU5EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJBTkQKCmJsb2NrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjk3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciAhPT0gYWRkcmVzcywgRVJSX1NFTEZfQkxPQ0spCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgIT0KICAgIGJueiBibG9ja19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6U0JMSyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTQkxLCgpibG9ja19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMDAtMTA2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICBzd2FwCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTAzCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEwMC0xMDYKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIC8vICAgfQogICAgLy8gKSwKICAgID09CiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMDQKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBwdXNoaW50IDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTAwLTEwNgogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmJsb2NrcwogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OTktMTA4CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmJsb2NrcwogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IGJsb2NrX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA2IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpibG9ja19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTAKICAgIC8vIGNvbnN0IGJsb2Nrc0tleSA9IHRoaXMuYmxrKFR4bi5zZW5kZXIsIGFkZHJlc3MpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIGJsawogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjI5CiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyA0IC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTExCiAgICAvLyB0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmNyZWF0ZSgpCiAgICBpbnRjXzAgLy8gMAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OTUKICAgIC8vIGJsb2NrKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC51bmJsb2NrW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5ibG9jazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTQKICAgIC8vIHVuYmxvY2soYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTE1CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCYW5uZWQoVHhuLnNlbmRlciksIEVSUl9CQU5ORUQpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGlzQmFubmVkCiAgICBieiB1bmJsb2NrX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6QkFORCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCQU5ECgp1bmJsb2NrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjExNwogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5ibGsoVHhuLnNlbmRlciwgYWRkcmVzcykKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgYmxrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjkKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDQgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjExOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzLCBFUlJfVVNFUl9OT1RfQkxPQ0tFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuYmxvY2tfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOlVOQksiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VU5CSwoKdW5ibG9ja19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTkKICAgIC8vIHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEyMS0xMjYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTIzCiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMjQKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBwdXNoaW50IDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEyMS0xMjUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5ibG9ja3MKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMjEtMTI2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKEJ5dGVzKCcnKSwgJycsIEJ5dGVzKCcnKSkuYmxvY2tzCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMTQKICAgIC8vIHVuYmxvY2soYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5nYXRlZEZvbGxvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkRm9sbG93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEyOS0xMzMKICAgIC8vIGdhdGVkRm9sbG93KAogICAgLy8gICBtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBhZGRyZXNzOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMzQKICAgIC8vIGNvbnN0IHsgZm9sbG93R2F0ZUlEIH0gPSB0aGlzLmdldE1ldGEoYWRkcmVzcykKICAgIGNhbGxzdWIgZ2V0TWV0YQogICAgZXh0cmFjdCA1MCA4CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTM1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIsIGZvbGxvd0dhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMzUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgZm9sbG93R2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBzd2FwCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogZ2F0ZWRGb2xsb3dfYm9vbF9mYWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTAKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGRpZyA0CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVkRm9sbG93X2Jvb2xfZmFsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUxCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGRpZyA0CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTEKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogZ2F0ZWRGb2xsb3dfYm9vbF9mYWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTIKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZGlnIDQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTIKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBnYXRlZEZvbGxvd19ib29sX2ZhbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBkaWcgNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkaWcgMwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgYnogZ2F0ZWRGb2xsb3dfYm9vbF9mYWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTQKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGRpZyA0CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGRpZyA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjU0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlZEZvbGxvd19ib29sX2ZhbHNlQDEzCiAgICBpbnRjXzEgLy8gMQoKZ2F0ZWRGb2xsb3dfYm9vbF9tZXJnZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMzUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlciwgZm9sbG93R2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYm56IGdhdGVkRm9sbG93X2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkRm9sbG93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzNwogICAgLy8gY29uc3QgeyBmb2xsb3dzIH0gPSB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTM5LTE0NQogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmb2xsb3dzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNDIKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTM5LTE0NQogICAgLy8gbWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmb2xsb3dzCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICB1bmNvdmVyIDIKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjEzOC0xNDcKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgbWJyUGF5bWVudCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IGZvbGxvd3MKICAgIC8vICAgICB9CiAgICAvLyAgICksCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGJueiBnYXRlZEZvbGxvd19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKZ2F0ZWRGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTQ5CiAgICAvLyB0aGlzLmNyZWF0ZUZvbGxvdyhUeG4uc2VuZGVyLCBhZGRyZXNzKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiBjcmVhdGVGb2xsb3cKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxMjktMTMzCiAgICAvLyBnYXRlZEZvbGxvdygKICAgIC8vICAgbWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgYWRkcmVzczogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnYXRlZEZvbGxvd19ib29sX2ZhbHNlQDEzOgogICAgaW50Y18wIC8vIDAKICAgIGIgZ2F0ZWRGb2xsb3dfYm9vbF9tZXJnZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5mb2xsb3dbcm91dGluZ10oKSAtPiB2b2lkOgpmb2xsb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTUyCiAgICAvLyBmb2xsb3cobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhZGRyZXNzOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE1MwogICAgLy8gY29uc3QgeyBmb2xsb3dHYXRlSUQgfSA9IHRoaXMuZ2V0TWV0YShhZGRyZXNzKQogICAgY2FsbHN1YiBnZXRNZXRhCiAgICBwdXNoaW50IDUwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGZvbGxvd0dhdGVJRCA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgYnogZm9sbG93X2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpIR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkhHVEUKCmZvbGxvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNTYKICAgIC8vIGNvbnN0IHsgZm9sbG93cyB9ID0gdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKQogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5tYnIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE1OC0xNjQKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZm9sbG93cwogICAgLy8gICB9CiAgICAvLyApLAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTYxCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE1OC0xNjQKICAgIC8vIG1hdGNoKAogICAgLy8gICBtYnJQYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZm9sbG93cwogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNTctMTY2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKAogICAgLy8gICAgIG1iclBheW1lbnQsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBmb2xsb3dzCiAgICAvLyAgICAgfQogICAgLy8gICApLAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBibnogZm9sbG93X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA2IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpmb2xsb3dfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTY4CiAgICAvLyB0aGlzLmNyZWF0ZUZvbGxvdyhUeG4uc2VuZGVyLCBhZGRyZXNzKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiBjcmVhdGVGb2xsb3cKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNTIKICAgIC8vIGZvbGxvdyhtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGgudW5mb2xsb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1bmZvbGxvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNzEKICAgIC8vIHVuZm9sbG93KGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmlzQmFubmVkKFR4bi5zZW5kZXIpLCBFUlJfQkFOTkVEKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBpc0Jhbm5lZAogICAgYnogdW5mb2xsb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpCQU5EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJBTkQKCnVuZm9sbG93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3NAogICAgLy8gY29uc3QgZm9sbG93c0tleSA9IHRoaXMuZmx3KGFkZHJlc3MsIFR4bi5zZW5kZXIpCiAgICBkdXAKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZmx3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjcKICAgIC8vIGZvbGxvd3MgPSBCb3hNYXA8Rm9sbG93c0tleSwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhGb2xsb3dzIH0pCiAgICBieXRlYyA1IC8vICJmIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxNzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkuZXhpc3RzLCBFUlJfTk9UX0ZPTExPV0lORykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuZm9sbG93X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpORkxXIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5GTFcKCnVuZm9sbG93X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3OAogICAgLy8gY29uc3QgeyBmb2xsb3dlckNvdW50LCBmb2xsb3dlckluZGV4IH0gPSB0aGlzLmdldE1ldGEoYWRkcmVzcykKICAgIHN3YXAKICAgIGR1cAogICAgY2FsbHN1YiBnZXRNZXRhCiAgICBkdXAKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE4MAogICAgLy8gdGhpcy51cGRhdGVGb2xsb3dlck1ldGEoYWRkcmVzcywgZm9sbG93ZXJJbmRleCwgZm9sbG93ZXJDb3VudCAtIDEpCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgY2FsbHN1YiB1cGRhdGVGb2xsb3dlck1ldGEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxODEKICAgIC8vIHRoaXMuZm9sbG93cyhmb2xsb3dzS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTgzLTE4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmZvbGxvd3MKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTg1CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxODYKICAgIC8vIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5mb2xsb3dzCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLm1icgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE4My0xODcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoQnl0ZXMoJycpLCAnJywgQnl0ZXMoJycpKS5mb2xsb3dzCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTgzLTE4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiB0aGlzLm1icihCeXRlcygnJyksICcnLCBCeXRlcygnJykpLmZvbGxvd3MKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE3MQogICAgLy8gdW5mb2xsb3coYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5pc0Jsb2NrZWRbcm91dGluZ10oKSAtPiB2b2lkOgppc0Jsb2NrZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTkxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTkzCiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmJsayh1c2VyLCBibG9ja2VkKQogICAgY2FsbHN1YiBibGsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyOQogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNCAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE5NAogICAgLy8gcmV0dXJuIHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxOTEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5pc0ZvbGxvd2luZ1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzRm9sbG93aW5nOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE5NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjE5OQogICAgLy8gY29uc3QgZm9sbG93c0tleSA9IHRoaXMuZmx3KHVzZXIsIGZvbGxvd2VyKQogICAgc3dhcAogICAgY2FsbHN1YiBmbHcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyNwogICAgLy8gZm9sbG93cyA9IEJveE1hcDxGb2xsb3dzS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEZvbGxvd3MgfSkKICAgIGJ5dGVjIDUgLy8gImYiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyMDAKICAgIC8vIHJldHVybiB0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxOTcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC5nZXRGb2xsb3dJbmRleFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEZvbGxvd0luZGV4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjIwMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjIwNQogICAgLy8gY29uc3QgZm9sbG93c0tleSA9IHRoaXMuZmx3KHVzZXIsIGZvbGxvd2VyKQogICAgc3dhcAogICAgY2FsbHN1YiBmbHcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyNwogICAgLy8gZm9sbG93cyA9IEJveE1hcDxGb2xsb3dzS2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEZvbGxvd3MgfSkKICAgIGJ5dGVjIDUgLy8gImYiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoyMDYKICAgIC8vIHJldHVybiB0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjAzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDExIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEwIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE1CiAgICAvLyBtYnIocmVmOiBieXRlcywgcmVmVHlwZU5hbWU6IHN0cmluZywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpOiBBa2l0YVNvY2lhbE1CUkRhdGEgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjpCYXNlU29jaWFsLnBheVdhbGxNYnJbcm91dGluZ10oKSAtPiB2b2lkOgpwYXlXYWxsTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM0CiAgICAvLyBwYXlXYWxsTWJyKHBheXdhbGw6IFZpZXdQYXlXYWxsVmFsdWUpOiB1aW50NjQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pLChsZW4rKHVpbnQ4LHVpbnQ2NCx1aW50NjQpW10pKQogICAgZGlnIDIKICAgIGRpZyAxCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIHB1c2hpbnQgNgogICAgKwogICAgZGlnIDMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICgobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSwobGVuKyh1aW50OCx1aW50NjQsdWludDY0KVtdKSkKICAgIGRpZyA0CiAgICBkaWcgMQogICAgZGlnIDUKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIHB1c2hpbnQgMTcKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICB1bmNvdmVyIDMKICAgICsKICAgIHVuY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3NvY2lhbC90eXBlcy50czo6Vmlld1BheVdhbGxWYWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM3CiAgICAvLyBQYXlXYWxsUGF5T3B0aW9uU2l6ZSAqIChwYXl3YWxsLmFnZW50UGF5SW5mby5sZW5ndGggKyBwYXl3YWxsLnVzZXJQYXlJbmZvLmxlbmd0aCkKICAgIGNvdmVyIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzYtMzgKICAgIC8vIEJveENvc3RQZXJCeXRlICogKAogICAgLy8gICBQYXlXYWxsUGF5T3B0aW9uU2l6ZSAqIChwYXl3YWxsLmFnZW50UGF5SW5mby5sZW5ndGggKyBwYXl3YWxsLnVzZXJQYXlJbmZvLmxlbmd0aCkKICAgIC8vICkKICAgIHB1c2hpbnQgNjgwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM1CiAgICAvLyByZXR1cm4gTWluUGF5V2FsbE1CUiArICgKICAgIHB1c2hpbnQgNTIwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjM1LTM5CiAgICAvLyByZXR1cm4gTWluUGF5V2FsbE1CUiArICgKICAgIC8vICAgQm94Q29zdFBlckJ5dGUgKiAoCiAgICAvLyAgICAgUGF5V2FsbFBheU9wdGlvblNpemUgKiAocGF5d2FsbC5hZ2VudFBheUluZm8ubGVuZ3RoICsgcGF5d2FsbC51c2VyUGF5SW5mby5sZW5ndGgpCiAgICAvLyAgICkKICAgIC8vICkKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czozNAogICAgLy8gcGF5V2FsbE1icihwYXl3YWxsOiBWaWV3UGF5V2FsbFZhbHVlKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNbcm91dGluZ10oKSAtPiB2b2lkOgpjaGVja1RpcE1iclJlcXVpcmVtZW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NQogICAgLy8gY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjcmVhdG9yOiBBY2NvdW50LCB3YWxsZXQ6IEFwcGxpY2F0aW9uKTogdGlwTUJSSW5mbyB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NTYKICAgIC8vIGNvbnN0IGFrdGEgPSBBc3NldChnZXRBa2l0YUFzc2V0cyhha2l0YURBTykuYWt0YSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjU4CiAgICAvLyBpZiAoIWNyZWF0b3IuaXNPcHRlZEluKGFrdGEpICYmIHdhbGxldC5pZCAhPT0gMCkgewogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgYnogY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDMtNTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KCkKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkaWcgMQogICAgYnl0ZWMgMTEgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0NgogICAgLy8gZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICBleHRyYWN0IDAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjQ3CiAgICAvLyBDYWxsZXJUeXBlR2xvYmFsLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0OAogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NDMtNTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfY2FuQ2FsbD4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGdldFBsdWdpbkFwcExpc3QoYWtpdGFEQU8pLm9wdGluLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICAgICcnLAogICAgLy8gICAgIG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBPcHRJblBsdWdpbi5wcm90b3R5cGUub3B0SW4+KCkKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGIzNjIzNGE1IC8vIG1ldGhvZCAiYXJjNThfY2FuQ2FsbCh1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbNF0pYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0OQogICAgLy8gJycsCiAgICBwdXNoYnl0ZXMgMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjUwCiAgICAvLyBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgT3B0SW5QbHVnaW4ucHJvdG90eXBlLm9wdEluPigpCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo0My01MgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9jYW5DYWxsPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgZ2V0UGx1Z2luQXBwTGlzdChha2l0YURBTykub3B0aW4sCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgJycsCiAgICAvLyAgICAgbWV0aG9kU2VsZWN0b3I8dHlwZW9mIE9wdEluUGx1Z2luLnByb3RvdHlwZS5vcHRJbj4oKQogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MAogICAgLy8gaWYgKGNhbkNhbGxBcmM1OE9wdEluKSB7CiAgICBieiBjaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MwogICAgLy8gYXJjNTg6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjEtNjQKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHR5cGU6IFRpcFNlbmRUeXBlQVJDNTgsCiAgICAvLyAgIGFyYzU4OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0KICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo2MgogICAgLy8gdHlwZTogVGlwU2VuZFR5cGVBUkM1OCwKICAgIHB1c2hieXRlcyAweDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjEtNjQKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHR5cGU6IFRpcFNlbmRUeXBlQVJDNTgsCiAgICAvLyAgIGFyYzU4OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0KICAgIHN3YXAKICAgIGNvbmNhdAoKY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwuY2hlY2tUaXBNYnJSZXF1aXJlbWVudHNANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo1NQogICAgLy8gY2hlY2tUaXBNYnJSZXF1aXJlbWVudHMoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjcmVhdG9yOiBBY2NvdW50LCB3YWxsZXQ6IEFwcGxpY2F0aW9uKTogdGlwTUJSSW5mbyB7CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NjgtNzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHR5cGU6IFRpcFNlbmRUeXBlRGlyZWN0LAogICAgLy8gICBhcmM1ODogMAogICAgLy8gfQogICAgcHVzaGJ5dGVzIDB4MGEwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6NTUKICAgIC8vIGNoZWNrVGlwTWJyUmVxdWlyZW1lbnRzKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgY3JlYXRvcjogQWNjb3VudCwgd2FsbGV0OiBBcHBsaWNhdGlvbik6IHRpcE1CUkluZm8gewogICAgYiBjaGVja1RpcE1iclJlcXVpcmVtZW50c19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czo6QmFzZVNvY2lhbC5jaGVja1RpcE1iclJlcXVpcmVtZW50c0A3CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmlzQmFubmVkKGFjY291bnQ6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzQmFubmVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjMxCiAgICAvLyBwcml2YXRlIGlzQmFubmVkKGFjY291bnQ6IEFjY291bnQpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjMyCiAgICAvLyBjb25zdCB7IG1vZGVyYXRpb24gfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjMyCiAgICAvLyBjb25zdCB7IG1vZGVyYXRpb24gfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDcgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czozMgogICAgLy8gY29uc3QgeyBtb2RlcmF0aW9uIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MzMtMzYKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbE1vZGVyYXRpb24ucHJvdG90eXBlLmlzQmFubmVkPih7CiAgICAvLyAgIGFwcElkOiBtb2RlcmF0aW9uLAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDg0MjY5Yzc4IC8vIG1ldGhvZCAiaXNCYW5uZWQoYWRkcmVzcylib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGguYmxrKHVzZXJBZGRyZXNzOiBieXRlcywgYmxvY2tlZEFkZHJlc3M6IGJ5dGVzKSAtPiBieXRlczoKYmxrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjQwCiAgICAvLyBwcml2YXRlIGJsayh1c2VyQWRkcmVzczogQWNjb3VudCwgYmxvY2tlZEFkZHJlc3M6IEFjY291bnQpOiBCbG9ja0xpc3RLZXkgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NDEKICAgIC8vIGNvbnN0IHVzZXIgPSB1c2VyQWRkcmVzcy5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSkKICAgIGZyYW1lX2RpZyAtMgogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NDIKICAgIC8vIGNvbnN0IGJsb2NrZWQgPSBibG9ja2VkQWRkcmVzcy5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSkKICAgIGZyYW1lX2RpZyAtMQogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NDMKICAgIC8vIHJldHVybiB7IHVzZXIsIGJsb2NrZWQgfQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGguZmx3KHVzZXI6IGJ5dGVzLCBmb2xsb3dlcjogYnl0ZXMpIC0+IGJ5dGVzOgpmbHc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NDcKICAgIC8vIHByaXZhdGUgZmx3KHVzZXI6IEFjY291bnQsIGZvbGxvd2VyOiBBY2NvdW50KTogRm9sbG93c0tleSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo0OAogICAgLy8gY29uc3QgdXNlckJ5dGVzID0gdXNlci5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSkKICAgIGZyYW1lX2RpZyAtMgogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NDkKICAgIC8vIGNvbnN0IGZvbGxvd2VyQnl0ZXMgPSBmb2xsb3dlci5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSkKICAgIGZyYW1lX2RpZyAtMQogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NTAKICAgIC8vIHJldHVybiB7IHVzZXI6IHVzZXJCeXRlcywgZm9sbG93ZXI6IGZvbGxvd2VyQnl0ZXMgfQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OkFraXRhU29jaWFsR3JhcGguZ2V0TWV0YShhZGRyZXNzOiBieXRlcykgLT4gYnl0ZXM6CmdldE1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NTMKICAgIC8vIHByaXZhdGUgZ2V0TWV0YShhZGRyZXNzOiBBY2NvdW50KTogTWV0YVZhbHVlIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjU0CiAgICAvLyBjb25zdCB7IHNvY2lhbCB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NTQKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBieXRlYyA3IC8vICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NTQKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjU1LTU4CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLmdldE1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IHNvY2lhbCwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg3MzllYTcwYiAvLyBtZXRob2QgImdldE1ldGEoYWRkcmVzcykoYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDc0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc29jaWFsL3R5cGVzLnRzOjpNZXRhVmFsdWUKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo6QWtpdGFTb2NpYWxHcmFwaC51cGRhdGVGb2xsb3dlck1ldGEoYWNjb3VudDogYnl0ZXMsIG5ld0ZvbGxvd2VySW5kZXg6IHVpbnQ2NCwgbmV3Rm9sbG93ZXJDb3VudDogdWludDY0KSAtPiB2b2lkOgp1cGRhdGVGb2xsb3dlck1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NjEKICAgIC8vIHByaXZhdGUgdXBkYXRlRm9sbG93ZXJNZXRhKGFjY291bnQ6IEFjY291bnQsIG5ld0ZvbGxvd2VySW5kZXg6IHVpbnQ2NCwgbmV3Rm9sbG93ZXJDb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo2MgogICAgLy8gY29uc3QgeyBzb2NpYWwgfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjYyCiAgICAvLyBjb25zdCB7IHNvY2lhbCB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgYnl0ZWMgNyAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjYyCiAgICAvLyBjb25zdCB7IHNvY2lhbCB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo2My02NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLnVwZGF0ZUZvbGxvd2VyTWV0YT4oewogICAgLy8gICBhcHBJZDogc29jaWFsLAogICAgLy8gICBhcmdzOiBbYWNjb3VudCwgbmV3Rm9sbG93ZXJJbmRleCwgbmV3Rm9sbG93ZXJDb3VudF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NjUKICAgIC8vIGFyZ3M6IFthY2NvdW50LCBuZXdGb2xsb3dlckluZGV4LCBuZXdGb2xsb3dlckNvdW50XQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NjMtNjYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsLnByb3RvdHlwZS51cGRhdGVGb2xsb3dlck1ldGE+KHsKICAgIC8vICAgYXBwSWQ6IHNvY2lhbCwKICAgIC8vICAgYXJnczogW2FjY291bnQsIG5ld0ZvbGxvd2VySW5kZXgsIG5ld0ZvbGxvd2VyQ291bnRdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4MzMwNmIzMmEgLy8gbWV0aG9kICJ1cGRhdGVGb2xsb3dlck1ldGEoYWRkcmVzcyx1aW50NjQsdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjpBa2l0YVNvY2lhbEdyYXBoLmNyZWF0ZUZvbGxvdyhzZW5kZXI6IGJ5dGVzLCBhZGRyZXNzOiBieXRlcykgLT4gdm9pZDoKY3JlYXRlRm9sbG93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjY5CiAgICAvLyBwcml2YXRlIGNyZWF0ZUZvbGxvdyhzZW5kZXI6IEFjY291bnQsIGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjcwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuaXNCYW5uZWQoc2VuZGVyKSwgRVJSX0JBTk5FRCkKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBpc0Jhbm5lZAogICAgYnogY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlY18zIC8vICJFUlI6QkFORCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCQU5ECgpjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MTkzCiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmJsayh1c2VyLCBibG9ja2VkKQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgYmxrCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjkKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDQgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czoxOTQKICAgIC8vIHJldHVybiB0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NzEKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5pc0Jsb2NrZWQoYWRkcmVzcywgc2VuZGVyKSwgRVJSX0JMT0NLRUQpCiAgICBieiBjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOkJMS0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkxLRAoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjcyCiAgICAvLyBsb2dnZWRBc3NlcnQoc2VuZGVyICE9PSBhZGRyZXNzLCBFUlJfU0VMRl9GT0xMT1cpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJueiBjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOlNGTFciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0ZMVwoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjc1CiAgICAvLyBjb25zdCB7IGF1dG9tYXRlZCB9ID0gdGhpcy5nZXRNZXRhKHNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBnZXRNZXRhCiAgICBwdXNoaW50IDM5MgogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6NzYKICAgIC8vIGxvZ2dlZEFzc2VydCghYXV0b21hdGVkLCBFUlJfQVVUT01BVEVEX0FDQ09VTlQpCiAgICBieiBjcmVhdGVGb2xsb3dfYWZ0ZXJfYXNzZXJ0QDgKICAgIHB1c2hieXRlcyAiRVJSOkFVVE8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVVUTwoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjc5CiAgICAvLyBjb25zdCBmb2xsb3dzS2V5ID0gdGhpcy5mbHcoYWRkcmVzcywgc2VuZGVyKQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgZmx3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6MjcKICAgIC8vIGZvbGxvd3MgPSBCb3hNYXA8Rm9sbG93c0tleSwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhGb2xsb3dzIH0pCiAgICBieXRlYyA1IC8vICJmIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkuZXhpc3RzLCBFUlJfQUxSRUFEWV9GT0xMT1dJTkcpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUZvbGxvd19hZnRlcl9hc3NlcnRAMTAKICAgIHB1c2hieXRlcyAiRVJSOkFGTFciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUZMVwoKY3JlYXRlRm9sbG93X2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvZ3JhcGguYWxnby50czo4NQogICAgLy8gY29uc3QgeyBmb2xsb3dlckNvdW50LCBmb2xsb3dlckluZGV4IH0gPSB0aGlzLmdldE1ldGEoYWRkcmVzcykKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBnZXRNZXRhCiAgICBkdXAKICAgIHB1c2hpbnQgNDEKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9ncmFwaC5hbGdvLnRzOjg4CiAgICAvLyB0aGlzLmZvbGxvd3MoZm9sbG93c0tleSkudmFsdWUgPSBmb2xsb3dlckluZGV4ICsgMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2dyYXBoLmFsZ28udHM6OTAKICAgIC8vIHRoaXMudXBkYXRlRm9sbG93ZXJNZXRhKGFkZHJlc3MsIGZvbGxvd2VySW5kZXggKyAxLCBmb2xsb3dlckNvdW50ICsgMSkKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgdXBkYXRlRm9sbG93ZXJNZXRhCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyKHJlZjogYnl0ZXMsIHJlZlR5cGVOYW1lOiBieXRlcywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpIC0+IGJ5dGVzOgpzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6OkJhc2VTb2NpYWwubWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE1CiAgICAvLyBtYnIocmVmOiBieXRlcywgcmVmVHlwZU5hbWU6IHN0cmluZywgcmVmVHlwZVNjaGVtYTogYnl0ZXMpOiBBa2l0YVNvY2lhbE1CUkRhdGEgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTkKICAgIC8vIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICBwdXNoaW50IDQ2NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MzAKICAgIC8vIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgICsKICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICBwdXNoaW50IDkzMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDA3YmQ0MDAwMDAwMDAwMDAwM2Q1NAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjAKICAgIC8vIHZvdGVzOiBWb3Rlc01CUiwKICAgIHB1c2hpbnQgMTkzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoyMgogICAgLy8gcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICBwdXNoaW50IDIyMTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MTYtMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGZvbGxvd3M6IEZvbGxvd3NNQlIsCiAgICAvLyAgIGJsb2NrczogQmxvY2tzTUJSLAogICAgLy8gICBwb3N0czogTWluUG9zdHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiByZWYubGVuZ3RoKSwKICAgIC8vICAgdm90ZXM6IFZvdGVzTUJSLAogICAgLy8gICB2b3RlbGlzdDogVm90ZWxpc3RNQlIsCiAgICAvLyAgIHJlYWN0aW9uczogUmVhY3Rpb25zTUJSLAogICAgLy8gICByZWFjdGlvbmxpc3Q6IFJlYWN0aW9ubGlzdE1CUiwKICAgIC8vICAgbWV0YTogTWV0YU1CUiwKICAgIC8vICAgbW9kZXJhdG9yczogTW9kZXJhdG9yc01CUiwKICAgIC8vICAgYmFubmVkOiBCYW5uZWRNQlIsCiAgICAvLyAgIGFjdGlvbnM6IEFjdGlvbnNNQlIsCiAgICAvLyAgIC8vIEJveCBrZXk6IHByZWZpeCgxKSArIHVpbnQ2NCg4KSA9IDkgYnl0ZXMKICAgIC8vICAgLy8gQm94IHZhbHVlOiBBUkMtNCBoZWFkZXIoNCkgKyBzdHJpbmcgbGVuZ3RoKDIpICsgbmFtZSArIGJ5dGVzIGxlbmd0aCgyKSArIHNjaGVtYQogICAgLy8gICByZWZUeXBlczogUmVmVHlwZXNCYXNlTUJSICsgKEJveENvc3RQZXJCeXRlICogKEJ5dGVzKHJlZlR5cGVOYW1lKS5sZW5ndGggKyBCeXRlcyhyZWZUeXBlU2NoZW1hKS5sZW5ndGgpKQogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2Jhc2UudHM6MjMKICAgIC8vIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgcHVzaGludCAxODkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE2LTMxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBmb2xsb3dzOiBGb2xsb3dzTUJSLAogICAgLy8gICBibG9ja3M6IEJsb2Nrc01CUiwKICAgIC8vICAgcG9zdHM6IE1pblBvc3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogcmVmLmxlbmd0aCksCiAgICAvLyAgIHZvdGVzOiBWb3Rlc01CUiwKICAgIC8vICAgdm90ZWxpc3Q6IFZvdGVsaXN0TUJSLAogICAgLy8gICByZWFjdGlvbnM6IFJlYWN0aW9uc01CUiwKICAgIC8vICAgcmVhY3Rpb25saXN0OiBSZWFjdGlvbmxpc3RNQlIsCiAgICAvLyAgIG1ldGE6IE1ldGFNQlIsCiAgICAvLyAgIG1vZGVyYXRvcnM6IE1vZGVyYXRvcnNNQlIsCiAgICAvLyAgIGJhbm5lZDogQmFubmVkTUJSLAogICAgLy8gICBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgLy8gICAvLyBCb3gga2V5OiBwcmVmaXgoMSkgKyB1aW50NjQoOCkgPSA5IGJ5dGVzCiAgICAvLyAgIC8vIEJveCB2YWx1ZTogQVJDLTQgaGVhZGVyKDQpICsgc3RyaW5nIGxlbmd0aCgyKSArIG5hbWUgKyBieXRlcyBsZW5ndGgoMikgKyBzY2hlbWEKICAgIC8vICAgcmVmVHlwZXM6IFJlZlR5cGVzQmFzZU1CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyhyZWZUeXBlTmFtZSkubGVuZ3RoICsgQnl0ZXMocmVmVHlwZVNjaGVtYSkubGVuZ3RoKSkKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoyNAogICAgLy8gbWV0YTogTWV0YU1CUiwKICAgIHB1c2hpbnQgNDUzMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvYmFzZS50czoxNi0zMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZm9sbG93czogRm9sbG93c01CUiwKICAgIC8vICAgYmxvY2tzOiBCbG9ja3NNQlIsCiAgICAvLyAgIHBvc3RzOiBNaW5Qb3N0c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIHJlZi5sZW5ndGgpLAogICAgLy8gICB2b3RlczogVm90ZXNNQlIsCiAgICAvLyAgIHZvdGVsaXN0OiBWb3RlbGlzdE1CUiwKICAgIC8vICAgcmVhY3Rpb25zOiBSZWFjdGlvbnNNQlIsCiAgICAvLyAgIHJlYWN0aW9ubGlzdDogUmVhY3Rpb25saXN0TUJSLAogICAgLy8gICBtZXRhOiBNZXRhTUJSLAogICAgLy8gICBtb2RlcmF0b3JzOiBNb2RlcmF0b3JzTUJSLAogICAgLy8gICBiYW5uZWQ6IEJhbm5lZE1CUiwKICAgIC8vICAgYWN0aW9uczogQWN0aW9uc01CUiwKICAgIC8vICAgLy8gQm94IGtleTogcHJlZml4KDEpICsgdWludDY0KDgpID0gOSBieXRlcwogICAgLy8gICAvLyBCb3ggdmFsdWU6IEFSQy00IGhlYWRlcig0KSArIHN0cmluZyBsZW5ndGgoMikgKyBuYW1lICsgYnl0ZXMgbGVuZ3RoKDIpICsgc2NoZW1hCiAgICAvLyAgIHJlZlR5cGVzOiBSZWZUeXBlc0Jhc2VNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiAoQnl0ZXMocmVmVHlwZU5hbWUpLmxlbmd0aCArIEJ5dGVzKHJlZlR5cGVTY2hlbWEpLmxlbmd0aCkpCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjI3CiAgICAvLyBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgcHVzaGludCAyOTcwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9iYXNlLnRzOjE2LTMxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBmb2xsb3dzOiBGb2xsb3dzTUJSLAogICAgLy8gICBibG9ja3M6IEJsb2Nrc01CUiwKICAgIC8vICAgcG9zdHM6IE1pblBvc3RzTUJSICsgKEJveENvc3RQZXJCeXRlICogcmVmLmxlbmd0aCksCiAgICAvLyAgIHZvdGVzOiBWb3Rlc01CUiwKICAgIC8vICAgdm90ZWxpc3Q6IFZvdGVsaXN0TUJSLAogICAgLy8gICByZWFjdGlvbnM6IFJlYWN0aW9uc01CUiwKICAgIC8vICAgcmVhY3Rpb25saXN0OiBSZWFjdGlvbmxpc3RNQlIsCiAgICAvLyAgIG1ldGE6IE1ldGFNQlIsCiAgICAvLyAgIG1vZGVyYXRvcnM6IE1vZGVyYXRvcnNNQlIsCiAgICAvLyAgIGJhbm5lZDogQmFubmVkTUJSLAogICAgLy8gICBhY3Rpb25zOiBBY3Rpb25zTUJSLAogICAgLy8gICAvLyBCb3gga2V5OiBwcmVmaXgoMSkgKyB1aW50NjQoOCkgPSA5IGJ5dGVzCiAgICAvLyAgIC8vIEJveCB2YWx1ZTogQVJDLTQgaGVhZGVyKDQpICsgc3RyaW5nIGxlbmd0aCgyKSArIG5hbWUgKyBieXRlcyBsZW5ndGgoMikgKyBzY2hlbWEKICAgIC8vICAgcmVmVHlwZXM6IFJlZlR5cGVzQmFzZU1CUiArIChCb3hDb3N0UGVyQnl0ZSAqIChCeXRlcyhyZWZUeXBlTmFtZSkubGVuZ3RoICsgQnl0ZXMocmVmVHlwZVNjaGVtYSkubGVuZ3RoKSkKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAEgAiYMCWFraXRhX2RhbwQVH3x1AAhFUlI6QkFORAFiAWYIRVJSOklQQVkDc2FsB3ZlcnNpb24Gd2FsbGV0CEVSUjpOREFPA3BhbIAE6pGA3TYaAI4BAHwxGRREMRhBAGWCDQS1nIpUBK7rs3gEhmdUlARLb5B/BBYbOnoEQwNmjgTrYvUIBAmDgKQEM+kslASFTe3gBBQyT7cEoTSieAQ0QXXwNhoAjg0AQQCdAOgBnQHrAkgCbwKXAwEAAQMlA14DrwAjQ4AEb5gX9jYaAI4BAA0AMRmBBBIxGBBEQgKcNhoBSRWBCBJEFzYaAkkiWSUISwEVEkRXAgAoTwJnJwhMZyNDMRYjCUk4ECMSRDYaAUkVJBJEMQCIBABBAAMrsAAxAEsBE0AADIAIRVJSOlNCTEuwAExJOAcyChJMOAgqRwKIBUWBCFsSEEAABCcGsAAxAEyIA/4nBExQIrlII0M2GgFJFSQSRDEAiAOuQQADK7AAMQBMiAPcJwRMUEm9RQFAAAyACEVSUjpVTkJLsAC8SLExACpHAogE74EIW7IIsgcjshAisgGzI0MxFiUJSTgQIxJEMRYjCUlOAkk4EIEGEkQ2GgFJTgJJFSQSRIgDulcyCE4DIihlRDEATgRMOBhMgANhYWxlSIEoWxJBAGxLBDgZQABlSwQ4G4EEEkEAW0sEORoAgARDkiZVEkEATEsEORoBSwMSQQBBSwQ5GgJLBBJBADYjQAAMgAhFUlI6RkdURbAAKkcCiAROIltPAkk4BzIKEkw4CE8CEhBAAAQnBrAAMQBMiAObI0MiQv/HMRYjCUk4ECMSRDYaAUcCFSQSRIgDFYEyW0EADIAIRVJSOkhHVEWwACpHAogD/CJbTwJJOAcyChJMOAhPAhIQQAAEJwawADEATIgDSSNDNhoBSRUkEkQxAIgCYEEAAyuwAEkxAIgCqScFTFBJvUUBQAAMgAhFUlI6TkZMV7AATEmIAqhJgSlbTIEhW0wjCYgC0rxIsTEAKkcCiAOOIluyCLIHI7IQIrIBsyNDNhoBSRUkEkQ2GgJJFSQSRIgCNycETFC9RQGAAQAiTwJUKUxQsCNDNhoBSRUkEkQ2GgJJFSQSREyIAionBUxQvUUBgAEAIk8CVClMULAjQzYaAUkVJBJENhoCSRUkEkRMiAICJwVMUL5EFxYpTFCwI0M2GgFJIlklCEsBFRJEVwIAMQAiKGVEJwllSHIIRBJAAAQnCrAAIihlRCcLZUiBEFsyDRJAAAyACEVSUjpJVVBHsAAnCExnI0M2GgFJFYEIEkQXMQAiKGVEJwllSHIIRBJAAAQnCrAAKExnI0M2GgFJIlklCEsBFRJEVwIANhoCSSJZJQhLARUSRFcCADYaA0kiWSUISwEVEkRXAgCIAm8pTFCwI0M2GgFJFUsBIllJgQQSREsCSwFLA1IiWYERC4EGCEsDJVlJSwISREsESwFLBVIiWUmBEQslCE8DCE8EEkROA1IiWQiBkDULgdAoCBYpTFCwI0M2GgFJFYEIEkQXSTYaAkkVJBJENhoDSRWBCBJEF04CTIAMYWtpdGFfYXNzZXRzZUgiW3AARQFAAGJJQQBesUsBJwtlSFcACCMWMgNLA7IYgASzYjSlshpPArIaTLIashqAAgAAshqABGg147yyGoEGshAisgGztD5JVwQATFcABCkSREkVIxJEIlNBAA4yEBaAARRMUClMULAjQ4AJCgAAAAAAAAAAQv/sigEBIihlRCcHZUiBGFuxshiABIQmnHiyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSMSRCJTiYoCAYv+UQAQSRWBEBJEi/9RABBJFYEQEkRQiYoCAYv+UQAQSRWBEBJEi/9RABBJFYEQEkRQiYoBASIoZUQnB2VIIluxshiABHOepwuyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFYFKEkSJigMAIihlRCcHZUgiW7GL/haL/xZPArIYgAQzBrMqshqL/bIaTLIashqBBrIQIrIBs4mKAgCL/oj/HkEAAyuwAIv/i/6I/0snBExQvUUBQQAMgAhFUlI6QkxLRLAAi/6L/xNAAAyACEVSUjpTRkxXsACL/oj/UoGIA1NBAAyACEVSUjpBVVRPsACL/4v+iP8dJwVMUEm9RQFBAAyACEVSUjpBRkxXsACL/4j/HEmBKVtMgSFbIwhJFk8DTL9MIwiL/04CiP86iYoDAYv9FYGQAwuBpOsCCIv+FYv/FQiBkAMLgdRICEwWgBAAAAAAAAB71AAAAAAAAD1UTFCB5JYBFkxLAVBMUIHUrAEWUIHUkwEWTEsBUIH04QIWUEsBUExQgYToARZQTBZQiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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



var APP_SPEC3 = { "name": "AkitaSocialImpact", "structs": { "ImpactMetaValue": [{ "name": "subscriptionIndex", "type": "uint64" }, { "name": "nfd", "type": "uint64" }, { "name": "nfdTimeChanged", "type": "uint64" }, { "name": "nfdImpact", "type": "uint64" }, { "name": "akitaNft", "type": "uint64" }], "SocialImpactInputs": [{ "name": "hasMeta", "type": "bool" }, { "name": "streak", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "voteCount", "type": "uint64" }, { "name": "isNegative", "type": "bool" }], "StakeCheck": [{ "name": "valid", "type": "bool" }, { "name": "balance", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "akitaDAO" }, { "type": "string", "name": "version" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cacheMeta", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "NFDAppID" }, { "type": "uint64", "name": "akitaAssetID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateSubscriptionStateModifier", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "subscriptionIndex" }, { "type": "uint64", "name": "newModifier" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "commitStakingImpact", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "amount" }, { "type": "bool", "name": "inheritRoot" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Enrolls the caller in this application's AKTA soft-stake commitment.", "events": [], "recommendations": {} }, { "name": "checkpointStakingImpact", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "(bool,uint64)", "struct": "StakeCheck" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permissionlessly records a currently observed shortfall for social impact.", "events": [], "recommendations": {} }, { "name": "stakingImpactCost", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Returns the MBR this application must fund to create an AKTA commitment for an account.", "events": [], "recommendations": {} }, { "name": "getUserImpactWithoutSocial", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getUserImpact", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getUserImpactWithInputs", "args": [{ "type": "address", "name": "address" }, { "type": "(bool,uint64,uint64,uint64,bool)", "struct": "SocialImpactInputs", "name": "inputs" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "calculateSocialImpactScore", "args": [{ "type": "(bool,uint64,uint64,uint64,bool)", "struct": "SocialImpactInputs", "name": "inputs" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMeta", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64)", "struct": "ImpactMetaValue" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "meta": { "keyType": "address", "valueType": "ImpactMetaValue", "desc": "A map of the meta data for each user", "prefix": "bQ==" }, "subscriptionStateModifier": { "keyType": "uint64", "valueType": "uint64", "desc": "A map of how each akita subscription affects impact calculation", "prefix": "cw==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1727, 2102, 2180, 2212], "errorMessage": "Box must have value" }, { "pc": [526, 596, 1340, 1492, 1563, 1898, 2055, 2533, 2821], "errorMessage": "Bytes has valid prefix" }, { "pc": [2271], "errorMessage": "ERR:CNFD" }, { "pc": [2253], "errorMessage": "ERR:INFD" }, { "pc": [1248, 1359, 1373], "errorMessage": "ERR:IPAY" }, { "pc": [1803], "errorMessage": "ERR:IUPG" }, { "pc": [1103], "errorMessage": "ERR:NANT" }, { "pc": [1217, 1771, 1839], "errorMessage": "ERR:NDAO" }, { "pc": [548], "errorMessage": "ERR:NNFD" }, { "pc": [702], "errorMessage": "ERR:NONF" }, { "pc": [1125], "errorMessage": "ERR:NONT" }, { "pc": [418, 1655, 1701], "errorMessage": "ERR:NSOC" }, { "pc": [447], "errorMessage": "ERR:NSUB" }, { "pc": [410, 1209, 1379, 1647, 1693, 1763, 1831, 1945], "errorMessage": "application exists" }, { "pc": [1085, 2302, 2341], "errorMessage": "asset exists" }, { "pc": [401, 484, 744, 1202, 1285, 1436, 1517, 1638, 1684, 1756, 1775, 1824, 1859, 1938, 2015, 2121, 2278, 2479], "errorMessage": "check GlobalState exists" }, { "pc": [331, 599, 1739, 2824], "errorMessage": "invalid array length header" }, { "pc": [1281], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [339, 1747], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [364, 1432, 1513, 1583, 1603, 1623, 1721], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [324, 372, 384, 393, 1186, 1195, 1271, 1817], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [531], "errorMessage": "invalid number of bytes for bool" }, { "pc": [606, 2831], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1632, 1678, 2061], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::SocialImpactInputs" }, { "pc": [1498], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::StakeCheck" }, { "pc": [2538], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::WeightedStake" }, { "pc": [1904], "errorMessage": "invalid number of bytes for smart_contracts/subscriptions/types.ts::SubscriptionInfoWithExistence" }, { "pc": [1345, 1568], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1178, 1261], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiAxMDAwMDAwMDAwMDAwIDIwMDAwMDAwMDAwMCAzMTUzNjAwMCAxMDAwMDAwMDAwMCA2MzA3MjAwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAweDE1MWY3Yzc1ICJhYWwiICJha2l0YV9hc3NldHMiICJzYWwiICJ3YWxsZXQiICJFUlI6TlNPQyIgIm0iICJFUlI6TkRBTyIgIkVSUjpJUEFZIiAidmVyc2lvbiIgIm9hbCIgMHg2YzEzZWRlNCAiaS50aW1lQ2hhbmdlZCIgYmFzZTMyKEFLQ1RSREs0T1dOV0hUUEg0WFBLTE5XTkxaMzMzVkUzNVNLUTRGR1FLM1pKQTRGSUhDTFEpIDB4YTE0NzdiNzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTgKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbEltcGFjdCBleHRlbmRzIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUAyCgptYWluX3N3aXRjaF9jYXNlX25leHRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTgKICAgIC8vIGV4cG9ydCBjbGFzcyBBa2l0YVNvY2lhbEltcGFjdCBleHRlbmRzIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAxOAogICAgcHVzaGJ5dGVzcyAweDI3ZTNiYjRmIDB4OWQ3NGY1YTEgMHg4NDUwOWU0NSAweDAyY2QwYzhhIDB4ZjA0NTBlYzUgMHhmODFjN2I2MiAweGQ1NzRiYjEwIDB4ZjI0ZDYwNjMgMHg4MDE0NDQwZSAweGI2ZWM2YTVkIDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImNhY2hlTWV0YShhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihwYXksdWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjb21taXRTdGFraW5nSW1wYWN0KHBheSx1aW50NjQsYm9vbCl2b2lkIiwgbWV0aG9kICJjaGVja3BvaW50U3Rha2luZ0ltcGFjdChhZGRyZXNzKShib29sLHVpbnQ2NCkiLCBtZXRob2QgInN0YWtpbmdJbXBhY3RDb3N0KGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnZXRVc2VySW1wYWN0V2l0aG91dFNvY2lhbChhZGRyZXNzKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0VXNlckltcGFjdChhZGRyZXNzKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0VXNlckltcGFjdFdpdGhJbnB1dHMoYWRkcmVzcywoYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKSl1aW50NjQiLCBtZXRob2QgImNhbGN1bGF0ZVNvY2lhbEltcGFjdFNjb3JlKChib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0TWV0YShhZGRyZXNzKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjYWNoZU1ldGEgdXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllciBjb21taXRTdGFraW5nSW1wYWN0IGNoZWNrcG9pbnRTdGFraW5nSW1wYWN0IHN0YWtpbmdJbXBhY3RDb3N0IGdldFVzZXJJbXBhY3RXaXRob3V0U29jaWFsIGdldFVzZXJJbXBhY3QgZ2V0VXNlckltcGFjdFdpdGhJbnB1dHMgY2FsY3VsYXRlU29jaWFsSW1wYWN0U2NvcmUgZ2V0TWV0YSB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTYKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE4CiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxJbXBhY3QgZXh0ZW5kcyBVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDZmOTgxN2Y2IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNjEKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxMCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzYzCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM2NAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IEFwcGxpY2F0aW9uKGFraXRhREFPKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzYxCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmNhY2hlTWV0YVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhY2hlTWV0YToKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNjkKICAgIC8vIGNhY2hlTWV0YShhZGRyZXNzOiBBY2NvdW50LCBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LCBORkRBcHBJRDogdWludDY0LCBha2l0YUFzc2V0SUQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzcwCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCkuYWRkcmVzcywgRVJSX05PVF9TT0NJQUwpCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zb2NpYWwpLmFkZHJlc3MsIEVSUl9OT1RfU09DSUFMKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDQgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzcwCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCkuYWRkcmVzcywgRVJSX05PVF9TT0NJQUwpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogY2FjaGVNZXRhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6TlNPQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOU09DCgpjYWNoZU1ldGFfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM3MgogICAgLy8gaWYgKHN1YnNjcmlwdGlvbkluZGV4ICE9PSAwKSB7CiAgICBkaWcgMgogICAgYnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzU3Vic2NyaWJlZChhZGRyZXNzLCBzdWJzY3JpcHRpb25JbmRleCkuYWN0aXZlLCBFUlJfTk9UX0FfU1VCU0NSSVBUSU9OKQogICAgZGlnIDMKICAgIGRpZyAzCiAgICBjYWxsc3ViIGlzU3Vic2NyaWJlZAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYm56IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDcKICAgIHB1c2hieXRlcyAiRVJSOk5TVUIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlNVQgoKY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6Mzc2CiAgICAvLyBsZXQgbmZkVGltZUNoYW5nZWQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM3NwogICAgLy8gbGV0IG5mZEltcGFjdDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNzgKICAgIC8vIGlmIChORkRBcHBJRCAhPT0gMCkgewogICAgZHVwCiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAxMwogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NzUKICAgIC8vIGNvbnN0IFtuZmROYW1lQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoTkZEQXBwLCBCeXRlcyhORkRHbG9iYWxTdGF0ZUtleXNOYW1lKSkKICAgIGR1cAogICAgcHVzaGJ5dGVzICJpLm5hbWUiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjc3LTgwCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgTkZEUmVnaXN0cnkucHJvdG90eXBlLmlzVmFsaWROZmRBcHBJZD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm5mZFJlZ2lzdHJ5LAogICAgLy8gICBhcmdzOiBbU3RyaW5nKG5mZE5hbWVCeXRlcyksIE5GREFwcC5pZF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjc5CiAgICAvLyBhcmdzOiBbU3RyaW5nKG5mZE5hbWVCeXRlcyksIE5GREFwcC5pZF0KICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjc4CiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm5mZFJlZ2lzdHJ5LAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo3OAogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5uZmRSZWdpc3RyeSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5CiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGJ5dGVjIDExIC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjc4CiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm5mZFJlZ2lzdHJ5LAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NzctODAKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBORkRSZWdpc3RyeS5wcm90b3R5cGUuaXNWYWxpZE5mZEFwcElkPih7CiAgICAvLyAgIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkubmZkUmVnaXN0cnksCiAgICAvLyAgIGFyZ3M6IFtTdHJpbmcobmZkTmFtZUJ5dGVzKSwgTkZEQXBwLmlkXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDRiZTIyZmM2IC8vIG1ldGhvZCAiaXNWYWxpZE5mZEFwcElkKHN0cmluZyx1aW50NjQpYm9vbCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTkZEKG5mZEFwcCksIEVSUl9OT1RfQU5fTkZEKQogICAgYm56IGNhY2hlTWV0YV9hZnRlcl9hc3NlcnRAMTAKICAgIHB1c2hieXRlcyAiRVJSOk5ORkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk5GRAoKY2FjaGVNZXRhX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6ODUtODgKICAgIC8vIGNvbnN0IGNhQWxnb0RhdGEgPSBhYmlDYWxsPHR5cGVvZiBORkQucHJvdG90eXBlLnJlYWRGaWVsZD4oewogICAgLy8gICBhcHBJZDogTkZEQXBwLmlkLAogICAgLy8gICBhcmdzOiBbQnl0ZXMoTkZETWV0YUtleVZlcmlmaWVkQWRkcmVzc2VzKV0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTIgLy8gbWV0aG9kICJyZWFkRmllbGQoYnl0ZVtdKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjg3CiAgICAvLyBhcmdzOiBbQnl0ZXMoTkZETWV0YUtleVZlcmlmaWVkQWRkcmVzc2VzKV0KICAgIHB1c2hieXRlcyAweDAwMGQ3NjJlNjM2MTQxNmM2NzZmMmUzMDJlNjE3MwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6ODUtODgKICAgIC8vIGNvbnN0IGNhQWxnb0RhdGEgPSBhYmlDYWxsPHR5cGVvZiBORkQucHJvdG90eXBlLnJlYWRGaWVsZD4oewogICAgLy8gICBhcHBJZDogTkZEQXBwLmlkLAogICAgLy8gICBhcmdzOiBbQnl0ZXMoTkZETWV0YUtleVZlcmlmaWVkQWRkcmVzc2VzKV0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjkwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY2FBbGdvRGF0YS5sZW5ndGg7IGkgKz0gMzIpIHsKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCgpjYWNoZU1ldGFfd2hpbGVfdG9wQDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo5MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNhQWxnb0RhdGEubGVuZ3RoOyBpICs9IDMyKSB7CiAgICBkaWcgMgogICAgbGVuCiAgICBkdXAKICAgIGRpZyAzCiAgICA+CiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfd2hpbGVANDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OTEKICAgIC8vIGNvbnN0IGFkZHIgPSBjYUFsZ29EYXRhLnNsaWNlKGksIGkgKyAzMikKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBkaWcgMgogICAgPj0KICAgIGRpZyAxCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgICsKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBkaWcgMwogICAgPj0KICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGRpZyAyCiAgICBzd2FwCiAgICBzZWxlY3QKICAgIGRpZyA0CiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OTIKICAgIC8vIGlmIChhZGRyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MuYnl0ZXMgJiYgYWRkciA9PT0gYWNjb3VudC5ieXRlcykgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogY2FjaGVNZXRhX3doaWxlX3RvcEA0MAogICAgZGlnIDkKICAgIGRpZyA2CiAgICA9PQogICAgYnogY2FjaGVNZXRhX3doaWxlX3RvcEA0MAogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OTMKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQoKY2FjaGVNZXRhX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuYWRkcmVzc1ZlcmlmaWVkT25ORkRANDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWRkcmVzc1ZlcmlmaWVkT25ORkQoYWRkcmVzcywgbmZkQXBwKSwgRVJSX1VTRVJfRE9FU19OT1RfT1dOX05GRCkKICAgIGJueiBjYWNoZU1ldGFfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjpOT05GIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5PTkYKCmNhY2hlTWV0YV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM4MgogICAgLy8gY29uc3QgW3RpbWVDaGFuZ2VkQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMobmZkQXBwLCBCeXRlcyhORkRHbG9iYWxTdGF0ZUtleXNUaW1lQ2hhbmdlZCkpCiAgICBkdXBuIDIKICAgIGJ5dGVjIDEzIC8vICJpLnRpbWVDaGFuZ2VkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozODMKICAgIC8vIG5mZFRpbWVDaGFuZ2VkID0gYnRvaSh0aW1lQ2hhbmdlZEJ5dGVzKQogICAgYnRvaQogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyOTYKICAgIC8vIGxldCBuZmRJbXBhY3Q6IHVpbnQ2NCA9IDUwCiAgICBwdXNoaW50IDUwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6Mjk4CiAgICAvLyBjb25zdCBbcGFyZW50QXBwSURCeXRlcywgcGFyZW50QXBwSURCeXRlc0V4aXN0XSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKE5GREFwcCwgQnl0ZXMoTkZER2xvYmFsU3RhdGVLZXlzUGFyZW50QXBwSUQpKQogICAgcHVzaGJ5dGVzICJpLnBhcmVudEFwcElEIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMDAKICAgIC8vIGlmIChwYXJlbnRBcHBJREJ5dGVzRXhpc3QgJiYgYnRvaShwYXJlbnRBcHBJREJ5dGVzKSA9PT0gZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLmFraXRhTmZkKSB7CiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAyNwogICAgZGlnIDcKICAgIGJ0b2kKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzAwCiAgICAvLyBpZiAocGFyZW50QXBwSURCeXRlc0V4aXN0ICYmIGJ0b2kocGFyZW50QXBwSURCeXRlcykgPT09IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ha2l0YU5mZCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgYnl0ZWMgMTEgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzAwCiAgICAvLyBpZiAocGFyZW50QXBwSURCeXRlc0V4aXN0ICYmIGJ0b2kocGFyZW50QXBwSURCeXRlcykgPT09IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5ha2l0YU5mZCkgewogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMDEKICAgIC8vIG5mZEltcGFjdCArPSA1MAogICAgcHVzaGludCAxMDAKICAgIGJ1cnkgNwoKY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjMwNAogICAgLy8gY29uc3QgdmVyc2lvbiA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKE5GREFwcCwgQnl0ZXMoTkZER2xvYmFsU3RhdGVLZXlzVmVyc2lvbikpWzBdLnNsaWNlKDAsIDIpCiAgICBkdXAKICAgIHB1c2hieXRlcyAiaS52ZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAyCiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMDYKICAgIC8vIGlmICh2ZXJzaW9uICE9PSBCeXRlcygnMy4nKSkgewogICAgcHVzaGJ5dGVzICIzLiIKICAgICE9CiAgICBibnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6Mjg2CiAgICAvLyBjb25zdCBkb21haW4gPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZERvbWFpbikKICAgIGR1cG4gMgogICAgcHVzaGJ5dGVzICJ2LmRvbWFpbiIKICAgIGNhbGxzdWIgbmZkUmVhZEZpZWxkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI4NwogICAgLy8gY29uc3QgdHdpdHRlciA9IHRoaXMubmZkUmVhZEZpZWxkKE5GREFwcCwgTkZETWV0YUtleVZlcmlmaWVkVHdpdHRlcikKICAgIGRpZyAxCiAgICBwdXNoYnl0ZXMgInYudHdpdHRlciIKICAgIGNhbGxzdWIgbmZkUmVhZEZpZWxkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI4OAogICAgLy8gY29uc3QgZGlzY29yZCA9IHRoaXMubmZkUmVhZEZpZWxkKE5GREFwcCwgTkZETWV0YUtleVZlcmlmaWVkRGlzY29yZCkKICAgIGRpZyAyCiAgICBwdXNoYnl0ZXMgInYuZGlzY29yZCIKICAgIGNhbGxzdWIgbmZkUmVhZEZpZWxkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI4OQogICAgLy8gY29uc3QgdGVsZWdyYW0gPSB0aGlzLm5mZFJlYWRGaWVsZChORkRBcHAsIE5GRE1ldGFLZXlWZXJpZmllZFRlbGVncmFtKQogICAgdW5jb3ZlciAzCiAgICBwdXNoYnl0ZXMgInYudGVsZWdyYW0iCiAgICBjYWxsc3ViIG5mZFJlYWRGaWVsZAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyOTEKICAgIC8vIHJldHVybiB7IGRvbWFpbiwgdHdpdHRlciwgZGlzY29yZCwgdGVsZWdyYW0gfQogICAgZGlnIDMKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgICsKICAgIGRpZyA0CiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBwdXNoYnl0ZXMgMHgwMDA4CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgKwogICAgZGlnIDUKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICBkaWcgMQogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICB1bmNvdmVyIDMKICAgICsKICAgIGRpZyA1CiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzEwCiAgICAvLyBjb25zdCB7IGRvbWFpbiwgdHdpdHRlciwgZGlzY29yZCwgdGVsZWdyYW0gfSA9IHRoaXMuZ2V0TkZEU29jaWFsRmllbGRzKE5GREFwcCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMgogICAgcHVzaGludCA0CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDMKICAgIHVuY292ZXIgMwogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA0CiAgICBkaWcgMgogICAgaW50Y18zIC8vIDYKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDQKICAgIGRpZyAyCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzEzCiAgICAvLyBpZiAoZG9tYWluLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMzEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzE0CiAgICAvLyBuZmRJbXBhY3QgKz0gMTAKICAgIGRpZyA5CiAgICBwdXNoaW50IDEwCiAgICArCiAgICBidXJ5IDEwCgpjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzE4CiAgICAvLyBpZiAodHdpdHRlci5sZW5ndGggPiAwKSB7CiAgICB1bmNvdmVyIDMKICAgIGxlbgogICAgYnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzE5CiAgICAvLyBuZmRJbXBhY3QgKz0gMjAKICAgIGRpZyA4CiAgICBwdXNoaW50IDIwCiAgICArCiAgICBidXJ5IDkKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMjMKICAgIC8vIGlmIChkaXNjb3JkLmxlbmd0aCA+IDApIHsKICAgIHVuY292ZXIgMgogICAgbGVuCiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMjQKICAgIC8vIG5mZEltcGFjdCArPSAxMAogICAgZGlnIDcKICAgIHB1c2hpbnQgMTAKICAgICsKICAgIGJ1cnkgOAoKY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjMyOAogICAgLy8gaWYgKHRlbGVncmFtLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogY2FjaGVNZXRhX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzI5CiAgICAvLyBuZmRJbXBhY3QgKz0gMTAKICAgIGRpZyA2CiAgICBwdXNoaW50IDEwCiAgICArCiAgICBidXJ5IDcKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozODcKICAgIC8vIGlmIChha2l0YUFzc2V0SUQgIT09IDApIHsKICAgIGRpZyAxCiAgICBieiBjYWNoZU1ldGFfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxMDEKICAgIC8vIHJldHVybiBha2l0YU5GVC5jcmVhdG9yID09PSBBY2NvdW50KEFraXRhTkZUQ3JlYXRvckFkZHJlc3MpCiAgICBkaWcgMQogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGJ5dGVjIDE0IC8vIGFkZHIgQUtDVFJESzRPV05XSFRQSDRYUEtMTldOTFozMzNWRTM1U0tRNEZHUUszWkpBNEZJSENMVFJHM1BGSQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0FraXRhTkZUKGFraXRhTkZUKSwgRVJSX05PVF9BTl9BS0lUQV9ORlQpCiAgICBibnogY2FjaGVNZXRhX2FmdGVyX2Fzc2VydEAxNgogICAgcHVzaGJ5dGVzICJFUlI6TkFOVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQU5UCgpjYWNoZU1ldGFfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNwogICAgLy8gcmV0dXJuIEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoYWNjb3VudCwgTkZUKVswXSA+IDAKICAgIGRpZyA0CiAgICBkaWcgMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzkwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy51c2VySG9sZHMoYWRkcmVzcywgYWtpdGFORlQpLCBFUlJfVVNFUl9ET0VTX05PVF9PV05fTkZUKQogICAgYm56IGNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDE5CiAgICBwdXNoYnl0ZXMgIkVSUjpOT05UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5PTlQKCmNhY2hlTWV0YV9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozOTMtMzk5CiAgICAvLyB0aGlzLm1ldGEoYWRkcmVzcykudmFsdWUgPSB7CiAgICAvLyAgIHN1YnNjcmlwdGlvbkluZGV4LAogICAgLy8gICBORkQ6IE5GREFwcElELAogICAgLy8gICBuZmRUaW1lQ2hhbmdlZCwKICAgIC8vICAgbmZkSW1wYWN0LAogICAgLy8gICBha2l0YU5GVDogYWtpdGFBc3NldElELAogICAgLy8gfQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNAogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjMKICAgIC8vIG1ldGEgPSBCb3hNYXA8QWNjb3VudCwgSW1wYWN0TWV0YVZhbHVlPih7IGtleVByZWZpeDogSW1wYWN0Qm94UHJlZml4TWV0YSB9KQogICAgYnl0ZWMgNyAvLyAibSIKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM5My0zOTkKICAgIC8vIHRoaXMubWV0YShhZGRyZXNzKS52YWx1ZSA9IHsKICAgIC8vICAgc3Vic2NyaXB0aW9uSW5kZXgsCiAgICAvLyAgIE5GRDogTkZEQXBwSUQsCiAgICAvLyAgIG5mZFRpbWVDaGFuZ2VkLAogICAgLy8gICBuZmRJbXBhY3QsCiAgICAvLyAgIGFraXRhTkZUOiBha2l0YUFzc2V0SUQsCiAgICAvLyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM2OQogICAgLy8gY2FjaGVNZXRhKGFkZHJlc3M6IEFjY291bnQsIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsIE5GREFwcElEOiB1aW50NjQsIGFraXRhQXNzZXRJRDogdWludDY0KTogdWludDY0IHsKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNhY2hlTWV0YV9hZnRlcl93aGlsZUA0NToKICAgIHBvcAogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OTcKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzgxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5hZGRyZXNzVmVyaWZpZWRPbk5GRChhZGRyZXNzLCBuZmRBcHApLCBFUlJfVVNFUl9ET0VTX05PVF9PV05fTkZEKQogICAgYiBjYWNoZU1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5hZGRyZXNzVmVyaWZpZWRPbk5GREA0NgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LnVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXJbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MDQKICAgIC8vIHVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBzdWJzY3JpcHRpb25JbmRleDogdWludDY0LCBuZXdNb2RpZmllcjogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDA1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDA1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA4IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVTdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MDcKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihzdWJzY3JpcHRpb25JbmRleCkudmFsdWUgPSBuZXdNb2RpZmllcgogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNQogICAgLy8gc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllciA9IEJveE1hcDx1aW50NjQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEltcGFjdEJveFByZWZpeFN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIgfSkKICAgIHB1c2hieXRlcyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MDcKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihzdWJzY3JpcHRpb25JbmRleCkudmFsdWUgPSBuZXdNb2RpZmllcgogICAgc3dhcAogICAgaXRvYgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MTAtNDE2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKCkuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcgogICAgLy8gICB9CiAgICAvLyApLAogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MTMKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQxMC00MTYKICAgIC8vIG1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdGhpcy5tYnIoKS5zdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyCiAgICAvLyAgIH0KICAgIC8vICksCiAgICA9PQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQxNAogICAgLy8gYW1vdW50OiB0aGlzLm1icigpLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIKICAgIHB1c2hpbnQgOTMwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MTAtNDE2CiAgICAvLyBtYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHRoaXMubWJyKCkuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcgogICAgLy8gICB9CiAgICAvLyApLAogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQwOS00MTgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2goCiAgICAvLyAgICAgcGF5bWVudCwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHRoaXMubWJyKCkuc3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcgogICAgLy8gICAgIH0KICAgIC8vICAgKSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgYm56IHVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDkgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnVwZGF0ZVN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQwNAogICAgLy8gdXBkYXRlU3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllcihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQsIG5ld01vZGlmaWVyOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5jb21taXRTdGFraW5nSW1wYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKY29tbWl0U3Rha2luZ0ltcGFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDIyCiAgICAvLyBjb21taXRTdGFraW5nSW1wYWN0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYW1vdW50OiB1aW50NjQsIGluaGVyaXRSb290OiBib29sZWFuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQyMwogICAgLy8gY29uc3Qgc3Rha2luZyA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MjMKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDIzCiAgICAvLyBjb25zdCBzdGFraW5nID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGJ5dGVjXzMgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDI0CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgZXh0cmFjdCAwIDgKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MjUtNDI4CiAgICAvLyBjb25zdCBjb3N0ID0gYWJpQ2FsbDx0eXBlb2YgU3Rha2luZy5wcm90b3R5cGUuYXBwU3Rha2VDb3N0Pih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlciwgYWt0YV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MjcKICAgIC8vIGFyZ3M6IFtUeG4uc2VuZGVyLCBha3RhXSwKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQyNS00MjgKICAgIC8vIGNvbnN0IGNvc3QgPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5hcHBTdGFrZUNvc3Q+KHsKICAgIC8vICAgYXBwSWQ6IHN0YWtpbmcsCiAgICAvLyAgIGFyZ3M6IFtUeG4uc2VuZGVyLCBha3RhXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBieXRlYyAxNSAvLyBtZXRob2QgImFwcFN0YWtlQ29zdChhZGRyZXNzLHVpbnQ2NCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNvbW1pdFN0YWtpbmdJbXBhY3RfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDkgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNvbW1pdFN0YWtpbmdJbXBhY3RfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0LCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgdW5jb3ZlciAzCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAxCiAgICA9PQogICAgYm56IGNvbW1pdFN0YWtpbmdJbXBhY3RfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDkgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNvbW1pdFN0YWtpbmdJbXBhY3RfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQzMy00NDIKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmNvbW1pdEFwcFNvZnRTdGFrZT4oewogICAgLy8gICBhcHBJZDogc3Rha2luZywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBzdGFraW5nLmFkZHJlc3MsIGFtb3VudDogY29zdCB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFrdGEsCiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICAgIGluaGVyaXRSb290LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDM2CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogc3Rha2luZy5hZGRyZXNzLCBhbW91bnQ6IGNvc3QgfSksCiAgICBzd2FwCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDMzLTQ0MgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgU3Rha2luZy5wcm90b3R5cGUuY29tbWl0QXBwU29mdFN0YWtlPih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHN0YWtpbmcuYWRkcmVzcywgYW1vdW50OiBjb3N0IH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYWt0YSwKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgICAgaW5oZXJpdFJvb3QsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQzNwogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MzMtNDQyCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jb21taXRBcHBTb2Z0U3Rha2U+KHsKICAgIC8vICAgYXBwSWQ6IHN0YWtpbmcsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogc3Rha2luZy5hZGRyZXNzLCBhbW91bnQ6IGNvc3QgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBha3RhLAogICAgLy8gICAgIGFtb3VudCwKICAgIC8vICAgICBpbmhlcml0Um9vdCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHgwZDAzN2M4OSAvLyBtZXRob2QgImNvbW1pdEFwcFNvZnRTdGFrZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LGJvb2wpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDIyCiAgICAvLyBjb21taXRTdGFraW5nSW1wYWN0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYW1vdW50OiB1aW50NjQsIGluaGVyaXRSb290OiBib29sZWFuKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuY2hlY2twb2ludFN0YWtpbmdJbXBhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpjaGVja3BvaW50U3Rha2luZ0ltcGFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDQ2CiAgICAvLyBjaGVja3BvaW50U3Rha2luZ0ltcGFjdChhZGRyZXNzOiBBY2NvdW50KTogU3Rha2VDaGVjayB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ0NwogICAgLy8gY29uc3Qgc3Rha2luZyA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ0NwogICAgLy8gY29uc3Qgc3Rha2luZyA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZHVwCiAgICBieXRlY18yIC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ0NwogICAgLy8gY29uc3Qgc3Rha2luZyA9IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgKICAgIC8vIGNvbnN0IGFraXRhQXNzZXRzQnl0ZXMgPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFzc2V0cykpWzBdCiAgICBzd2FwCiAgICBieXRlY18zIC8vICJha2l0YV9hc3NldHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ0OAogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGV4dHJhY3QgMCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ0OS00NTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jaGVja3BvaW50QXBwU29mdFN0YWtlPih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLmlkLCBhZGRyZXNzLCBha3RhXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ1MQogICAgLy8gYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWRkcmVzcywgYWt0YV0sCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ0OS00NTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jaGVja3BvaW50QXBwU29mdFN0YWtlPih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLmlkLCBhZGRyZXNzLCBha3RhXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg1YmZkZTgwMiAvLyBtZXRob2QgImNoZWNrcG9pbnRBcHBTb2Z0U3Rha2UodWludDY0LGFkZHJlc3MsdWludDY0KShib29sLHVpbnQ2NCkiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6U3Rha2VDaGVjawogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NDYKICAgIC8vIGNoZWNrcG9pbnRTdGFraW5nSW1wYWN0KGFkZHJlc3M6IEFjY291bnQpOiBTdGFrZUNoZWNrIHsKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5zdGFraW5nSW1wYWN0Q29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN0YWtpbmdJbXBhY3RDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NjAKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NjAKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWNfMiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NjAKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgc3dhcAogICAgYnl0ZWNfMyAvLyAiYWtpdGFfYXNzZXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NjEKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBleHRyYWN0IDAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NjItNDY1CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgU3Rha2luZy5wcm90b3R5cGUuYXBwU3Rha2VDb3N0Pih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbYWRkcmVzcywgYWt0YV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxNSAvLyBtZXRob2QgImFwcFN0YWtlQ29zdChhZGRyZXNzLHVpbnQ2NCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ1OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0VXNlckltcGFjdFdpdGhvdXRTb2NpYWxbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRVc2VySW1wYWN0V2l0aG91dFNvY2lhbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDY5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDcxCiAgICAvLyByZXR1cm4gdGhpcy51c2VySW1wYWN0KGFkZHJlc3MsIGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgdXNlckltcGFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFVzZXJJbXBhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRVc2VySW1wYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0NzYKICAgIC8vIHJldHVybiB0aGlzLnVzZXJJbXBhY3QoYWRkcmVzcywgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHVzZXJJbXBhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDc0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5nZXRVc2VySW1wYWN0V2l0aElucHV0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFVzZXJJbXBhY3RXaXRoSW5wdXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0ODMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMjYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvdHlwZXMudHM6OlNvY2lhbEltcGFjdElucHV0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0ODYKICAgIC8vIFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zb2NpYWwpLmFkZHJlc3MsCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ4NgogICAgLy8gVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCkuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBieXRlYyA0IC8vICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ4NgogICAgLy8gVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCkuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDg1LTQ4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc29jaWFsKS5hZGRyZXNzLAogICAgLy8gICBFUlJfTk9UX1NPQ0lBTAogICAgLy8gKQogICAgYm56IGdldFVzZXJJbXBhY3RXaXRoSW5wdXRzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6TlNPQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOU09DCgpnZXRVc2VySW1wYWN0V2l0aElucHV0c19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDkwCiAgICAvLyBjb25zdCBzb2NpYWxJbXBhY3QgPSB0aGlzLmNhbGN1bGF0ZVNvY2lhbEltcGFjdChpbnB1dHMpCiAgICBjYWxsc3ViIGNhbGN1bGF0ZVNvY2lhbEltcGFjdAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ5MQogICAgLy8gcmV0dXJuIHRoaXMudXNlckltcGFjdFdpdGhTb2NpYWwoYWRkcmVzcywgc29jaWFsSW1wYWN0KQogICAgY2FsbHN1YiB1c2VySW1wYWN0V2l0aFNvY2lhbAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0ODMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmNhbGN1bGF0ZVNvY2lhbEltcGFjdFNjb3JlW3JvdXRpbmddKCkgLT4gdm9pZDoKY2FsY3VsYXRlU29jaWFsSW1wYWN0U2NvcmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ5OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAyNgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3NvY2lhbC90eXBlcy50czo6U29jaWFsSW1wYWN0SW5wdXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjUwMQogICAgLy8gVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCkuYWRkcmVzcywKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTAxCiAgICAvLyBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc29jaWFsKS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFTb2NpYWxBcHBMaXN0KSkKICAgIGJ5dGVjIDQgLy8gInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTAxCiAgICAvLyBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc29jaWFsKS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo1MDAtNTAzCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zb2NpYWwpLmFkZHJlc3MsCiAgICAvLyAgIEVSUl9OT1RfU09DSUFMCiAgICAvLyApCiAgICBibnogY2FsY3VsYXRlU29jaWFsSW1wYWN0U2NvcmVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDYgLy8gIkVSUjpOU09DIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5TT0MKCmNhbGN1bGF0ZVNvY2lhbEltcGFjdFNjb3JlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo1MDUKICAgIC8vIHJldHVybiB0aGlzLmNhbGN1bGF0ZVNvY2lhbEltcGFjdChpbnB1dHMpCiAgICBjYWxsc3ViIGNhbGN1bGF0ZVNvY2lhbEltcGFjdAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ5OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0TWV0YVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldE1ldGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjUwOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIzCiAgICAvLyBtZXRhID0gQm94TWFwPEFjY291bnQsIEltcGFjdE1ldGFWYWx1ZT4oeyBrZXlQcmVmaXg6IEltcGFjdEJveFByZWZpeE1ldGEgfSkKICAgIGJ5dGVjIDcgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTEwCiAgICAvLyByZXR1cm4gdGhpcy5tZXRhKHVzZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo1MDgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgOCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDEwIC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmlzU3Vic2NyaWJlZChhZGRyZXNzOiBieXRlcywgaWQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmlzU3Vic2NyaWJlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDAKICAgIC8vIHByaXZhdGUgaXNTdWJzY3JpYmVkKGFkZHJlc3M6IEFjY291bnQsIGlkOiB1aW50NjQpOiB7IGFjdGl2ZTogYm9vbGVhbjsgc2VydmljZUlEOiB1aW50NjQ7IHN0cmVhazogdWludDY0IH0gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQxLTQ0CiAgICAvLyBjb25zdCBpbmZvID0gYWJpQ2FsbDx0eXBlb2YgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuZ2V0U3Vic2NyaXB0aW9uPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Vic2NyaXB0aW9ucywKICAgIC8vICAgYXJnczogW3sgYWRkcmVzcywgaWQgfV0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQzCiAgICAvLyBhcmdzOiBbeyBhZGRyZXNzLCBpZCB9XQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdWJzY3JpcHRpb25zLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo0MgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdWJzY3JpcHRpb25zLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjXzIgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDIKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Vic2NyaXB0aW9ucywKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDEtNDQKICAgIC8vIGNvbnN0IGluZm8gPSBhYmlDYWxsPHR5cGVvZiBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5nZXRTdWJzY3JpcHRpb24+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdWJzY3JpcHRpb25zLAogICAgLy8gICBhcmdzOiBbeyBhZGRyZXNzLCBpZCB9XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDI1YjgxMmE3IC8vIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uKChhZGRyZXNzLHVpbnQ2NCkpKGJvb2wsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cG4gMgogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTA1CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uSW5mb1dpdGhFeGlzdGVuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NDYKICAgIC8vIGlmICghaW5mby5leGlzdHMpIHsKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGJueiBpc1N1YnNjcmliZWRfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjQ3LTUxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBhY3RpdmU6IGZhbHNlLAogICAgLy8gICBzZXJ2aWNlSUQ6IDAsCiAgICAvLyAgIHN0cmVhazogMCwKICAgIC8vIH0KICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIHN3YXAKICAgIHJldHN1YgoKaXNTdWJzY3JpYmVkX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTUKICAgIC8vIGNvbnN0IHRvQWtpdGEgPSBpbmZvLnJlY2lwaWVudCA9PT0gZ2V0REFPQVJDNThXYWxsZXQodGhpcy5ha2l0YURBTy52YWx1ZSkuYWRkcmVzcwogICAgZHVwCiAgICBleHRyYWN0IDUgMzIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTUKICAgIC8vIGNvbnN0IHRvQWtpdGEgPSBpbmZvLnJlY2lwaWVudCA9PT0gZ2V0REFPQVJDNThXYWxsZXQodGhpcy5ha2l0YURBTy52YWx1ZSkuYWRkcmVzcwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGJ5dGVjIDUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTUKICAgIC8vIGNvbnN0IHRvQWtpdGEgPSBpbmZvLnJlY2lwaWVudCA9PT0gZ2V0REFPQVJDNThXYWxsZXQodGhpcy5ha2l0YURBTy52YWx1ZSkuYWRkcmVzcwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NTkKICAgIC8vIGNvbnN0IG5vdERvbmF0aW5nID0gaW5mby5zZXJ2aWNlSUQgIT09IDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDM3CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo2MQogICAgLy8gY29uc3QgcHJldmlvdXNXaW5kb3dTdGFydDogdWludDY0ID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtICgoKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBpbmZvLnN0YXJ0RGF0ZSkgJSBpbmZvLmludGVydmFsKSArIGluZm8uaW50ZXJ2YWwpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIGRpZyA0CiAgICBwdXNoaW50IDQ1CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLQogICAgZGlnIDQKICAgIHB1c2hpbnQgNjEKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgJQogICAgKwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo2NQogICAgLy8gY29uc3Qgbm90U3RhbGUgPSBpbmZvLmxhc3RQYXltZW50ID4gcHJldmlvdXNXaW5kb3dTdGFydAogICAgZGlnIDMKICAgIHB1c2hpbnQgODUKICAgIGV4dHJhY3RfdWludDY0CiAgICA8CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjY4CiAgICAvLyBhY3RpdmU6IHRvQWtpdGEgJiYgbm90RG9uYXRpbmcgJiYgbm90U3RhbGUsCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICAmJgogICAgJiYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6NzAKICAgIC8vIHN0cmVhazogaW5mby5zdHJlYWssCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgOTMgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo2Ny03MQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYWN0aXZlOiB0b0FraXRhICYmIG5vdERvbmF0aW5nICYmIG5vdFN0YWxlLAogICAgLy8gICBzZXJ2aWNlSUQ6IGluZm8uc2VydmljZUlELAogICAgLy8gICBzdHJlYWs6IGluZm8uc3RyZWFrLAogICAgLy8gfQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QudXNlckltcGFjdChhY2NvdW50OiBieXRlcywgaW5jbHVkZVNvY2lhbDogdWludDY0KSAtPiB1aW50NjQ6CnVzZXJJbXBhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEwNAogICAgLy8gcHJpdmF0ZSB1c2VySW1wYWN0KGFjY291bnQ6IEFjY291bnQsIGluY2x1ZGVTb2NpYWw6IGJvb2xlYW4pOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEwNQogICAgLy8gY29uc3Qgc29jaWFsSW1wYWN0OiB1aW50NjQgPSBpbmNsdWRlU29jaWFsID8gdGhpcy5nZXRTb2NpYWxJbXBhY3RTY29yZShhY2NvdW50KSA6IDAgLy8gU29jaWFsIEFjdGl2aXR5IHwgdXAgdG8gMjUwCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHVzZXJJbXBhY3RfdGVybmFyeV9mYWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI2OC0yNzEKICAgIC8vIGNvbnN0IGlucHV0cyA9IGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsLnByb3RvdHlwZS5nZXRTb2NpYWxJbXBhY3RJbnB1dHM+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zb2NpYWwsCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjY5CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjY5CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnNvY2lhbCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBieXRlYyA0IC8vICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI2OQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zb2NpYWwsCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNjgtMjcxCiAgICAvLyBjb25zdCBpbnB1dHMgPSBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbC5wcm90b3R5cGUuZ2V0U29jaWFsSW1wYWN0SW5wdXRzPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc29jaWFsLAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhlM2JlZjk0MyAvLyBtZXRob2QgImdldFNvY2lhbEltcGFjdElucHV0cyhhZGRyZXNzKShib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMjYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvdHlwZXMudHM6OlNvY2lhbEltcGFjdElucHV0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNzMKICAgIC8vIHJldHVybiB0aGlzLmNhbGN1bGF0ZVNvY2lhbEltcGFjdChpbnB1dHMpCiAgICBjYWxsc3ViIGNhbGN1bGF0ZVNvY2lhbEltcGFjdAogICAgcG9wCgp1c2VySW1wYWN0X3Rlcm5hcnlfbWVyZ2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTA2CiAgICAvLyByZXR1cm4gdGhpcy51c2VySW1wYWN0V2l0aFNvY2lhbChhY2NvdW50LCBzb2NpYWxJbXBhY3QpCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNhbGxzdWIgdXNlckltcGFjdFdpdGhTb2NpYWwKICAgIHJldHN1YgoKdXNlckltcGFjdF90ZXJuYXJ5X2ZhbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEwNQogICAgLy8gY29uc3Qgc29jaWFsSW1wYWN0OiB1aW50NjQgPSBpbmNsdWRlU29jaWFsID8gdGhpcy5nZXRTb2NpYWxJbXBhY3RTY29yZShhY2NvdW50KSA6IDAgLy8gU29jaWFsIEFjdGl2aXR5IHwgdXAgdG8gMjUwCiAgICBpbnRjXzAgLy8gMAogICAgYiB1c2VySW1wYWN0X3Rlcm5hcnlfbWVyZ2VAMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LnVzZXJJbXBhY3RXaXRoU29jaWFsKGFjY291bnQ6IGJ5dGVzLCBzb2NpYWxJbXBhY3Q6IHVpbnQ2NCkgLT4gdWludDY0Ogp1c2VySW1wYWN0V2l0aFNvY2lhbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTEyCiAgICAvLyBwcml2YXRlIHVzZXJJbXBhY3RXaXRoU29jaWFsKGFjY291bnQ6IEFjY291bnQsIHNvY2lhbEltcGFjdDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjExNAogICAgLy8gbGV0IHN1YnNjcmlwdGlvbkluZGV4OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxMTUtMTE2CiAgICAvLyBsZXQgTkZEOiB1aW50NjQgPSAwCiAgICAvLyBsZXQgYWtpdGFORlQ6IHVpbnQ2NCA9IDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMwogICAgLy8gbWV0YSA9IEJveE1hcDxBY2NvdW50LCBJbXBhY3RNZXRhVmFsdWU+KHsga2V5UHJlZml4OiBJbXBhY3RCb3hQcmVmaXhNZXRhIH0pCiAgICBieXRlYyA3IC8vICJtIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxMTgKICAgIC8vIGlmICh0aGlzLm1ldGEoYWNjb3VudCkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxMTkKICAgIC8vIGNvbnN0IG1ldGEgPSBjbG9uZSh0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEyMAogICAgLy8gc3Vic2NyaXB0aW9uSW5kZXggPSBtZXRhLnN1YnNjcmlwdGlvbkluZGV4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEyMQogICAgLy8gTkZEID0gbWV0YS5ORkQKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTIyCiAgICAvLyBha2l0YU5GVCA9IG1ldGEuYWtpdGFORlQKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDYKCnVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjA2CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMDYKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OAogICAgLy8gY29uc3QgYWtpdGFBc3NldHNCeXRlcyA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXNzZXRzKSlbMF0KICAgIGJ5dGVjXzMgLy8gImFraXRhX2Fzc2V0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjA2CiAgICAvLyBjb25zdCBha3RhID0gZ2V0QWtpdGFBc3NldHModGhpcy5ha2l0YURBTy52YWx1ZSkuYWt0YQogICAgZHVwCiAgICBleHRyYWN0IDAgOAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIwOQogICAgLy8gaWYgKGFrdGEgPT09IDApIHsKICAgIGJueiB1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pZl9lbHNlQDM0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjEwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCnVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNDMKICAgIC8vIGxldCBzdWJzY3JpYmVySW1wYWN0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNDUKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvblN0YXRlID0gdGhpcy5pc1N1YnNjcmliZWQoYWNjb3VudCwgc3Vic2NyaXB0aW9uSW5kZXgpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyA0CiAgICBjYWxsc3ViIGlzU3Vic2NyaWJlZAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjQ3CiAgICAvLyBpZiAoIXN1YnNjcmlwdGlvblN0YXRlLmFjdGl2ZSB8fCAhdGhpcy5zdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyKHN1YnNjcmlwdGlvblN0YXRlLnNlcnZpY2VJRCkuZXhpc3RzKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBieiB1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldFN1YnNjcmliZXJJbXBhY3RTY29yZUA0NAogICAgZnJhbWVfZGlnIDIKICAgIGV4dHJhY3QgMSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI1CiAgICAvLyBzdWJzY3JpcHRpb25TdGF0ZU1vZGlmaWVyID0gQm94TWFwPHVpbnQ2NCwgdWludDY0Pih7IGtleVByZWZpeDogSW1wYWN0Qm94UHJlZml4U3Vic2NyaXB0aW9uU3RhdGVNb2RpZmllciB9KQogICAgcHVzaGJ5dGVzICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNDcKICAgIC8vIGlmICghc3Vic2NyaXB0aW9uU3RhdGUuYWN0aXZlIHx8ICF0aGlzLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIoc3Vic2NyaXB0aW9uU3RhdGUuc2VydmljZUlEKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5nZXRTdWJzY3JpYmVySW1wYWN0U2NvcmVANDQKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI1MQogICAgLy8gY29uc3QgbW9kaWZpZXIgPSB0aGlzLnN1YnNjcmlwdGlvblN0YXRlTW9kaWZpZXIoc3Vic2NyaXB0aW9uU3RhdGUuc2VydmljZUlEKS52YWx1ZQogICAgZnJhbWVfZGlnIDAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI1NAogICAgLy8gaWYgKHN1YnNjcmlwdGlvblN0YXRlLnN0cmVhayA+PSAxMikgewogICAgZnJhbWVfZGlnIDIKICAgIHB1c2hpbnQgOQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgcHVzaGludCAxMgogICAgPj0KICAgIGJ6IHVzZXJJbXBhY3RXaXRoU29jaWFsX2Vsc2VfYm9keUA0MgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI1NQogICAgLy8gc3Vic2NyaWJlckltcGFjdCArPSAyNTAgLyBtb2RpZmllcgogICAgcHVzaGludCAyNTAKICAgIHVuY292ZXIgMwogICAgLwogICAgY292ZXIgMgoKdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5nZXRTdWJzY3JpYmVySW1wYWN0U2NvcmVANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEyNwogICAgLy8gY29uc3QgbmZkU2NvcmU6IHVpbnQ2NCA9IE5GRCAhPT0gMCA/IHRoaXMuZ2V0TkZESW1wYWN0U2NvcmUoYWNjb3VudCwgQXBwbGljYXRpb24oTkZEKSkgOiAwIC8vIE5GRCB8IHVwIHRvIDE1MAogICAgZnJhbWVfZGlnIDUKICAgIGJ6IHVzZXJJbXBhY3RXaXRoU29jaWFsX3Rlcm5hcnlfZmFsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMzYKICAgIC8vIGNvbnN0IHsgTkZELCBuZmRUaW1lQ2hhbmdlZCwgbmZkSW1wYWN0IH0gPSB0aGlzLm1ldGEoYWNjb3VudCkudmFsdWUKICAgIHN3YXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA0CiAgICBzd2FwCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMzcKICAgIC8vIGNvbnN0IHRpbWVDaGFuZ2VkID0gYnRvaShvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhORkQsIEJ5dGVzKE5GREdsb2JhbFN0YXRlS2V5c1RpbWVDaGFuZ2VkKSlbMF0pCiAgICBkdXAKICAgIGJ5dGVjIDEzIC8vICJpLnRpbWVDaGFuZ2VkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozMzkKICAgIC8vIGxvZ2dlZEFzc2VydChORkRBcHAuaWQgPT09IEFwcGxpY2F0aW9uKE5GRCkuaWQsIEVSUl9JTlZBTElEX05GRCkKICAgIGZyYW1lX2RpZyA1CiAgICA9PQogICAgYm56IHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2Fzc2VydEAyOAogICAgcHVzaGJ5dGVzICJFUlI6SU5GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJTkZECgp1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KG5mZFRpbWVDaGFuZ2VkID09PSB0aW1lQ2hhbmdlZCwgRVJSX05GRF9DSEFOR0VEKQogICAgdW5jb3ZlciA0CiAgICA9PQogICAgYm56IHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2Fzc2VydEAzMAogICAgcHVzaGJ5dGVzICJFUlI6Q05GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDTkZECgp1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9hc3NlcnRAMzA6CiAgICBiIHVzZXJJbXBhY3RXaXRoU29jaWFsX3Rlcm5hcnlfbWVyZ2VANQoKdXNlckltcGFjdFdpdGhTb2NpYWxfdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMjQKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIyNAogICAgLy8gY29uc3QgYWt0YSA9IGdldEFraXRhQXNzZXRzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmFrdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4CiAgICAvLyBjb25zdCBha2l0YUFzc2V0c0J5dGVzID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBc3NldHMpKVswXQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfYXNzZXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMjQKICAgIC8vIGNvbnN0IGFrdGEgPSBnZXRBa2l0YUFzc2V0cyh0aGlzLmFraXRhREFPLnZhbHVlKS5ha3RhCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMjcKICAgIC8vIGlmIChha3RhID09PSAwKSB7CiAgICBibnogdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaWZfZWxzZUAyMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIyOAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCgp1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldEhlbGRBa3RhSW1wYWN0U2NvcmVAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEyOQogICAgLy8gY29uc3QgbmZ0SW1wYWN0OiB1aW50NjQgPSBha2l0YU5GVCAhPT0gMCA/IHRoaXMuZ2V0TkZUSW1wYWN0U2NvcmUoYWNjb3VudCwgQXNzZXQoYWtpdGFORlQpKSA6IDAgLy8gSG9sZHMgQUtDL09tbmlnZW0gfCA1MAogICAgZnJhbWVfZGlnIDYKICAgIGJ6IHVzZXJJbXBhY3RXaXRoU29jaWFsX3Rlcm5hcnlfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNDYKICAgIC8vIGNvbnN0IHByZWZpeCA9IGFzc2V0LnVuaXROYW1lLnNsaWNlKDAsIDMpCiAgICBmcmFtZV9kaWcgNgogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0VW5pdE5hbWUKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDMKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBjb25zdCBiYWxhbmNlID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShhY2NvdW50LCBhc3NldClbMF0KICAgIGZyYW1lX2RpZyAtMgogICAgZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzQ4CiAgICAvLyBpZiAoYXNzZXQuY3JlYXRvciA9PT0gQWNjb3VudChBa2l0YU5GVENyZWF0b3JBZGRyZXNzKSAmJiBiYWxhbmNlID4gMCkgewogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGJ5dGVjIDE0IC8vIGFkZHIgQUtDVFJESzRPV05XSFRQSDRYUEtMTldOTFozMzNWRTM1U0tRNEZHUUszWkpBNEZJSENMVFJHM1BGSQogICAgPT0KICAgIGJ6IHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMTgKICAgIGZyYW1lX2RpZyAzCiAgICBieiB1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pZl9lbHNlQDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM0OQogICAgLy8gaWYgKHByZWZpeCA9PT0gQnl0ZXMoQWtpdGFDb2xsZWN0aW9uc1ByZWZpeEFLQykpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBwdXNoYnl0ZXMgIkFLQyIKICAgID09CiAgICBieiB1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjM1MAogICAgLy8gcmV0dXJuIDUwCiAgICBwdXNoaW50IDUwCgp1c2VySW1wYWN0V2l0aFNvY2lhbF90ZXJuYXJ5X21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEzMQogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IHN0YWtlZEFrdGFJbXBhY3QgKyBzdWJzY3JpYmVySW1wYWN0ICsgc29jaWFsSW1wYWN0ICsgbmZkU2NvcmUgKyBoZWxkQWtpdGFJbXBhY3QgKyBuZnRJbXBhY3QKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICB1bmNvdmVyIDIKICAgICsKICAgIHVuY292ZXIgMgogICAgKwogICAgKwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEzMgogICAgLy8gaWYgKHRvdGFsID09PSAwKSB7CiAgICBibnogdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxMzMKICAgIC8vIHJldHVybiAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEzNgogICAgLy8gcmV0dXJuIHRvdGFsCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzUyCiAgICAvLyBpZiAocHJlZml4ID09PSBCeXRlcyhBa2l0YUNvbGxlY3Rpb25zUHJlZml4QU9HKSkgewogICAgZnJhbWVfZGlnIDEKICAgIHB1c2hieXRlcyAiQU9HIgogICAgPT0KICAgIGJ6IHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MzUzCiAgICAvLyByZXR1cm4gMjUKICAgIHB1c2hpbnQgMjUKICAgIGIgdXNlckltcGFjdFdpdGhTb2NpYWxfdGVybmFyeV9tZXJnZUA4Cgp1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pZl9lbHNlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czozNTYKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiB1c2VySW1wYWN0V2l0aFNvY2lhbF90ZXJuYXJ5X21lcmdlQDgKCnVzZXJJbXBhY3RXaXRoU29jaWFsX3Rlcm5hcnlfZmFsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTI5CiAgICAvLyBjb25zdCBuZnRJbXBhY3Q6IHVpbnQ2NCA9IGFraXRhTkZUICE9PSAwID8gdGhpcy5nZXRORlRJbXBhY3RTY29yZShhY2NvdW50LCBBc3NldChha2l0YU5GVCkpIDogMCAvLyBIb2xkcyBBS0MvT21uaWdlbSB8IDUwCiAgICBpbnRjXzAgLy8gMAogICAgYiB1c2VySW1wYWN0V2l0aFNvY2lhbF90ZXJuYXJ5X21lcmdlQDgKCnVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIzMQogICAgLy8gY29uc3QgYmFsYW5jZSA9IEFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoYWNjb3VudCwgYWt0YSlbMF0KICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBwb3AKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIzNAogICAgLy8gaWYgKGJhbGFuY2UgPCBURU5fVEhPVVNBTkRfQUtJVEEpIHsKICAgIGludGMgNyAvLyAxMDAwMDAwMDAwMAogICAgPAogICAgYnogdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMzUKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxMjgKICAgIC8vIGNvbnN0IGhlbGRBa2l0YUltcGFjdCA9IHRoaXMuZ2V0SGVsZEFrdGFJbXBhY3RTY29yZShhY2NvdW50KSAvLyBIZWxkIEFLVEEgfCB1cCB0byA1MAogICAgYiB1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6OkFraXRhU29jaWFsSW1wYWN0LmdldEhlbGRBa3RhSW1wYWN0U2NvcmVAMjUKCnVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIzOAogICAgLy8gY29uc3QgY2FwcGVkID0gYmFsYW5jZSA+PSBPTkVfTUlMTElPTl9BS0lUQSA/IE9ORV9NSUxMSU9OX0FLSVRBIDogYmFsYW5jZQogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMDAwMDAwMDAKICAgID49CiAgICBpbnRjIDQgLy8gMTAwMDAwMDAwMDAwMAogICAgc3dhcAogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIzOQogICAgLy8gcmV0dXJuIChjYXBwZWQgKiA1MCkgLyBPTkVfTUlMTElPTl9BS0lUQQogICAgcHVzaGludCA1MAogICAgKgogICAgaW50YyA0IC8vIDEwMDAwMDAwMDAwMDAKICAgIC8KICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTI4CiAgICAvLyBjb25zdCBoZWxkQWtpdGFJbXBhY3QgPSB0aGlzLmdldEhlbGRBa3RhSW1wYWN0U2NvcmUoYWNjb3VudCkgLy8gSGVsZCBBS1RBIHwgdXAgdG8gNTAKICAgIGIgdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjpBa2l0YVNvY2lhbEltcGFjdC5nZXRIZWxkQWt0YUltcGFjdFNjb3JlQDI1Cgp1c2VySW1wYWN0V2l0aFNvY2lhbF90ZXJuYXJ5X2ZhbHNlQDQ6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTI3CiAgICAvLyBjb25zdCBuZmRTY29yZTogdWludDY0ID0gTkZEICE9PSAwID8gdGhpcy5nZXRORkRJbXBhY3RTY29yZShhY2NvdW50LCBBcHBsaWNhdGlvbihORkQpKSA6IDAgLy8gTkZEIHwgdXAgdG8gMTUwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgYiB1c2VySW1wYWN0V2l0aFNvY2lhbF90ZXJuYXJ5X21lcmdlQDUKCnVzZXJJbXBhY3RXaXRoU29jaWFsX2Vsc2VfYm9keUA0MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjU3CiAgICAvLyBzdWJzY3JpYmVySW1wYWN0ICs9IChzdWJzY3JpcHRpb25TdGF0ZS5zdHJlYWsgKiAyMCkgLyBtb2RpZmllcgogICAgcHVzaGludCAyMAogICAgKgogICAgdW5jb3ZlciAzCiAgICAvCiAgICBjb3ZlciAyCiAgICBiIHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0U3Vic2NyaWJlckltcGFjdFNjb3JlQDQ0Cgp1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pZl9lbHNlQDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMTMKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMTMKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjXzIgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjEzCiAgICAvLyBjb25zdCBzdGFraW5nID0gZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMTUtMjE4CiAgICAvLyBjb25zdCB3ZWlnaHRlZFN0YWtlID0gYWJpQ2FsbDx0eXBlb2YgU3Rha2luZy5wcm90b3R5cGUuZ2V0QXBwV2VpZ2h0ZWRTdGFrZT4oewogICAgLy8gICBhcHBJZDogc3Rha2luZywKICAgIC8vICAgYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWNjb3VudCwgYWt0YSwgdHJ1ZV0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIxNwogICAgLy8gYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWNjb3VudCwgYWt0YSwgdHJ1ZV0KICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIxNS0yMTgKICAgIC8vIGNvbnN0IHdlaWdodGVkU3Rha2UgPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5nZXRBcHBXZWlnaHRlZFN0YWtlPih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLmlkLCBhY2NvdW50LCBha3RhLCB0cnVlXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGVmMThhNDk2IC8vIG1ldGhvZCAiZ2V0QXBwV2VpZ2h0ZWRTdGFrZSh1aW50NjQsYWRkcmVzcyx1aW50NjQsYm9vbCkodWludDY0LHVpbnQ2NCkiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIxNwogICAgLy8gYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWNjb3VudCwgYWt0YSwgdHJ1ZV0KICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyMTUtMjE4CiAgICAvLyBjb25zdCB3ZWlnaHRlZFN0YWtlID0gYWJpQ2FsbDx0eXBlb2YgU3Rha2luZy5wcm90b3R5cGUuZ2V0QXBwV2VpZ2h0ZWRTdGFrZT4oewogICAgLy8gICBhcHBJZDogc3Rha2luZywKICAgIC8vICAgYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWNjb3VudCwgYWt0YSwgdHJ1ZV0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nL3R5cGVzLnRzOjpXZWlnaHRlZFN0YWtlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjIyMAogICAgLy8gcmV0dXJuIHRoaXMuY2FsY3VsYXRlU3Rha2luZ0ltcGFjdFNjb3JlKHdlaWdodGVkU3Rha2UuYW1vdW50LCB3ZWlnaHRlZFN0YWtlLndlaWdodGVkQWdlKQogICAgZHVwCiAgICBwdXNoaW50IDQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgMTIKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE4OAogICAgLy8gaWYgKGFtb3VudCA8IFRFTl9USE9VU0FORF9BS0lUQSB8fCB3ZWlnaHRlZEFnZSA8IFRISVJUWV9EQVlTKSB7CiAgICBpbnRjIDcgLy8gMTAwMDAwMDAwMDAKICAgIDwKICAgIGJueiB1c2VySW1wYWN0V2l0aFNvY2lhbF9pZl9ib2R5QDQ3CiAgICBkdXAKICAgIHB1c2hpbnQgMjU5MjAwMAogICAgPAogICAgYnogdXNlckltcGFjdFdpdGhTb2NpYWxfYWZ0ZXJfaWZfZWxzZUA0OAoKdXNlckltcGFjdFdpdGhTb2NpYWxfaWZfYm9keUA0NzoKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE4OQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEyNQogICAgLy8gY29uc3Qgc3Rha2VkQWt0YUltcGFjdCA9IHRoaXMuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlKGFjY291bnQpIC8vIFN0YWtlZCBBS1RBIHwgdXAgdG8gMjUwCiAgICBiIHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlQDM2Cgp1c2VySW1wYWN0V2l0aFNvY2lhbF9hZnRlcl9pZl9lbHNlQDQ4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxOTMKICAgIC8vIGNvbnN0IGFtdENhcHBlZCA9IGFtb3VudCA+PSBUV09fSFVORFJFRF9USE9VU0FORF9BS0lUQSA/IFRXT19IVU5EUkVEX1RIT1VTQU5EX0FLSVRBIDogYW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgaW50YyA1IC8vIDIwMDAwMDAwMDAwMAogICAgPj0KICAgIGludGMgNSAvLyAyMDAwMDAwMDAwMDAKICAgIHN3YXAKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxOTYKICAgIC8vIGNvbnN0IG1heFNjb3JlOiB1aW50NjQgPSAoYW10Q2FwcGVkICogMjUwKSAvIFRXT19IVU5EUkVEX1RIT1VTQU5EX0FLSVRBCiAgICBwdXNoaW50IDI1MAogICAgKgogICAgaW50YyA1IC8vIDIwMDAwMDAwMDAwMAogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxOTkKICAgIC8vIGNvbnN0IHRpbWVDYXBwZWQgPSB3ZWlnaHRlZEFnZSA+PSBPTkVfWUVBUiA/IE9ORV9ZRUFSIDogd2VpZ2h0ZWRBZ2UKICAgIHN3YXAKICAgIGR1cAogICAgaW50YyA2IC8vIDMxNTM2MDAwCiAgICA+PQogICAgaW50YyA2IC8vIDMxNTM2MDAwCiAgICBzd2FwCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjAxCiAgICAvLyByZXR1cm4gKHRpbWVDYXBwZWQgKiBtYXhTY29yZSkgLyBPTkVfWUVBUgogICAgKgogICAgaW50YyA2IC8vIDMxNTM2MDAwCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjEyNQogICAgLy8gY29uc3Qgc3Rha2VkQWt0YUltcGFjdCA9IHRoaXMuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlKGFjY291bnQpIC8vIFN0YWtlZCBBS1RBIHwgdXAgdG8gMjUwCiAgICBiIHVzZXJJbXBhY3RXaXRoU29jaWFsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuZ2V0U3Rha2luZ0ltcGFjdFNjb3JlQDM2CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QuY2FsY3VsYXRlU29jaWFsSW1wYWN0KGlucHV0czogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CmNhbGN1bGF0ZVNvY2lhbEltcGFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTQyCiAgICAvLyBwcml2YXRlIGNhbGN1bGF0ZVNvY2lhbEltcGFjdChpbnB1dHM6IFNvY2lhbEltcGFjdElucHV0cyk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDIKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE0MwogICAgLy8gaWYgKCFpbnB1dHMuaGFzTWV0YSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBibnogY2FsY3VsYXRlU29jaWFsSW1wYWN0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxNDQKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYWxjdWxhdGVTb2NpYWxJbXBhY3RfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxNTAKICAgIC8vIGlmIChpbnB1dHMuc3RyZWFrID49IDYwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBwdXNoaW50IDYwCiAgICA+PQogICAgYnogY2FsY3VsYXRlU29jaWFsSW1wYWN0X2Vsc2VfYm9keUA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTUxCiAgICAvLyBzb2NpYWxJbXBhY3QgKz0gMTAwCiAgICBwdXNoaW50IDEwMAogICAgZnJhbWVfYnVyeSAwCgpjYWxjdWxhdGVTb2NpYWxJbXBhY3RfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxNTcKICAgIC8vIGNvbnN0IGFjY291bnRBZ2U6IHVpbnQ2NCA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBpbnB1dHMuc3RhcnREYXRlCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgOQogICAgZXh0cmFjdF91aW50NjQKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxNTgKICAgIC8vIGlmIChhY2NvdW50QWdlID49IFRXT19ZRUFSUykgewogICAgaW50YyA4IC8vIDYzMDcyMDAwCiAgICA+PQogICAgYnogY2FsY3VsYXRlU29jaWFsSW1wYWN0X2Vsc2VfYm9keUA3CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTU5CiAgICAvLyBzb2NpYWxJbXBhY3QgKz0gNzUKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDc1CiAgICArCiAgICBmcmFtZV9idXJ5IDAKCmNhbGN1bGF0ZVNvY2lhbEltcGFjdF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE2NQogICAgLy8gaWYgKGlucHV0cy52b3RlQ291bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTcKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgYnogY2FsY3VsYXRlU29jaWFsSW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTY2CiAgICAvLyBsZXQgdm90ZUltcGFjdDogdWludDY0ID0gKGlucHV0cy52b3RlQ291bnQgKiA3NSkgLyAxMDBfMDAwCiAgICBmcmFtZV9kaWcgMQogICAgcHVzaGludCA3NQogICAgKgogICAgcHVzaGludCAxMDAwMDAKICAgIC8KICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE2NwogICAgLy8gaWYgKHZvdGVJbXBhY3QgPiA3NSkgewogICAgcHVzaGludCA3NQogICAgPgogICAgYnogY2FsY3VsYXRlU29jaWFsSW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTY4CiAgICAvLyB2b3RlSW1wYWN0ID0gNzUKICAgIHB1c2hpbnQgNzUKICAgIGZyYW1lX2J1cnkgMgoKY2FsY3VsYXRlU29jaWFsSW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE3MQogICAgLy8gaWYgKGlucHV0cy5pc05lZ2F0aXZlKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMjAwCiAgICBnZXRiaXQKICAgIGJ6IGNhbGN1bGF0ZVNvY2lhbEltcGFjdF9lbHNlX2JvZHlAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTczCiAgICAvLyBpZiAoc29jaWFsSW1wYWN0ID4gdm90ZUltcGFjdCkgewogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2RpZyAyCiAgICA+CiAgICBieiBjYWxjdWxhdGVTb2NpYWxJbXBhY3RfZWxzZV9ib2R5QDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE3NAogICAgLy8gc29jaWFsSW1wYWN0IC09IHZvdGVJbXBhY3QKICAgIGZyYW1lX2RpZyAwCiAgICBmcmFtZV9kaWcgMgogICAgLQogICAgZnJhbWVfYnVyeSAwCgpjYWxjdWxhdGVTb2NpYWxJbXBhY3RfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MTgzCiAgICAvLyByZXR1cm4gc29jaWFsSW1wYWN0CiAgICBmcmFtZV9kaWcgMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYWxjdWxhdGVTb2NpYWxJbXBhY3RfZWxzZV9ib2R5QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxNzYKICAgIC8vIHNvY2lhbEltcGFjdCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIGIgY2FsY3VsYXRlU29jaWFsSW1wYWN0X2FmdGVyX2lmX2Vsc2VAMTgKCmNhbGN1bGF0ZVNvY2lhbEltcGFjdF9lbHNlX2JvZHlAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE3OQogICAgLy8gc29jaWFsSW1wYWN0ICs9IHZvdGVJbXBhY3QKICAgIGZyYW1lX2RpZyAwCiAgICBmcmFtZV9kaWcgMgogICAgKwogICAgZnJhbWVfYnVyeSAwCiAgICBiIGNhbGN1bGF0ZVNvY2lhbEltcGFjdF9hZnRlcl9pZl9lbHNlQDE4CgpjYWxjdWxhdGVTb2NpYWxJbXBhY3RfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjE2MQogICAgLy8gc29jaWFsSW1wYWN0ICs9IChhY2NvdW50QWdlICogNzUpIC8gVFdPX1lFQVJTCiAgICBwdXNoaW50IDc1CiAgICAqCiAgICBpbnRjIDggLy8gNjMwNzIwMDAKICAgIC8KICAgIGZyYW1lX2RpZyAwCiAgICArCiAgICBmcmFtZV9idXJ5IDAKICAgIGIgY2FsY3VsYXRlU29jaWFsSW1wYWN0X2FmdGVyX2lmX2Vsc2VAOAoKY2FsY3VsYXRlU29jaWFsSW1wYWN0X2Vsc2VfYm9keUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoxNTMKICAgIC8vIHNvY2lhbEltcGFjdCArPSAoaW5wdXRzLnN0cmVhayAqIDEwMCkgLyA2MAogICAgcHVzaGludCAxMDAKICAgICoKICAgIHB1c2hpbnQgNjAKICAgIC8KICAgIGZyYW1lX2J1cnkgMAogICAgYiBjYWxjdWxhdGVTb2NpYWxJbXBhY3RfYWZ0ZXJfaWZfZWxzZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czo6QWtpdGFTb2NpYWxJbXBhY3QubmZkUmVhZEZpZWxkKE5GREFwcDogdWludDY0LCBmaWVsZDogYnl0ZXMpIC0+IGJ5dGVzOgpuZmRSZWFkRmllbGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI3NgogICAgLy8gcHJpdmF0ZSBuZmRSZWFkRmllbGQoTkZEQXBwOiBBcHBsaWNhdGlvbiwgZmllbGQ6IHN0cmluZyk6IGJ5dGVzIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9pbXBhY3QuYWxnby50czoyNzctMjgwCiAgICAvLyBjb25zdCBmaWVsZEJ5dGVzID0gYWJpQ2FsbDx0eXBlb2YgTkZELnByb3RvdHlwZS5yZWFkRmllbGQ+KHsKICAgIC8vICAgYXBwSWQ6IE5GREFwcC5pZCwKICAgIC8vICAgYXJnczogW0J5dGVzKGZpZWxkKV0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI3OQogICAgLy8gYXJnczogW0J5dGVzKGZpZWxkKV0KICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL2ltcGFjdC5hbGdvLnRzOjI3Ny0yODAKICAgIC8vIGNvbnN0IGZpZWxkQnl0ZXMgPSBhYmlDYWxsPHR5cGVvZiBORkQucHJvdG90eXBlLnJlYWRGaWVsZD4oewogICAgLy8gICBhcHBJZDogTkZEQXBwLmlkLAogICAgLy8gICBhcmdzOiBbQnl0ZXMoZmllbGQpXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGJ5dGVjIDEyIC8vIG1ldGhvZCAicmVhZEZpZWxkKGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvaW1wYWN0LmFsZ28udHM6MjgyCiAgICAvLyByZXR1cm4gZmllbGRCeXRlcwogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAJAAEIBoCglKWNHYCgt4fpBYDnhA+AyK+gJYDOiR4mEAlha2l0YV9kYW8EFR98dQNhYWwMYWtpdGFfYXNzZXRzA3NhbAZ3YWxsZXQIRVJSOk5TT0MBbQhFUlI6TkRBTwhFUlI6SVBBWQd2ZXJzaW9uA29hbARsE+3kDWkudGltZUNoYW5nZWQgAoU4jVx1m2PN5+XepbbNXne91JvslQ4U0FbykHCoOJcEoUd7c4AE6pGA3TYaAI4BAHUxGRREMRhBAF6CDAQn47tPBJ109aEEhFCeRQQCzQyKBPBFDsUE+Bx7YgTVdLsQBPJNYGMEgBREDgS27GpdBDPpLJQEhU3t4DYaAI4MAEADcQPDBHAEwQUHBRsFLwVmBZEF8gABACNDgARvmBf2NhoAjgEADQAxGYEEEjEYEERCBYk2GgFJFSQSRBc2GgJJIlmBAghLARUSRFcCACcKTGcoTGcjQyJJgAA2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJTgNJFSQSRBc2GgRJFSQSRBdMMQAiKGVEJwRlSCJbcghEEkAABCcGsABLAkEAGEsDSwOIBYYiU0AADIAIRVJSOk5TVUKwACJOAyJFB0lBAmpPA0hJgAZpLm5hbWVlSLFJFRZXBgJMUCIoZUQnC2VIJFuyGIAES+IvxrIashpLBLIaJbIQIrIBs7Q+SVcEAExXAAQpEkRJFSMSRCJTQAAMgAhFUlI6Tk5GRLAAsUmyGCcMshqADwANdi5jYUFsZ28uMC5hc7IaJbIQIrIBs7Q+SVcEAEsBVwAEKRJESSJZgQIITBUSRFcGAEwiTEsCFUlLAw1BAhlPAklLAg9LAUsDTwJNTIEgCElOBElLAw9MTwNPAk1JSwIMSwJMTUsETgJSSUULMgMTQf/CSwlLBhJB/7pFAUUBI0AADIAIRVJSOk5PTkawAEcCJw1lSBdOBIEyRQiADWkucGFyZW50QXBwSURlTEUJQQAWSwcXIihlRCcLZUiBKFsSQQAEgWRFB0mABWkudmVyZUhJFSJLAQ8iSwJPAk2BAksCD4ECTwNPAk1SgAIzLhNAARFHAoAIdi5kb21haW6IB6dLAYAJdi50d2l0dGVyiAeXSwKACXYuZGlzY29yZIgHh08DgAp2LnRlbGVncmFtiAd2SwMVFlcGAk8EUEkVJAhLBBUWVwYCTwVQSwEWVwYCgAIACExQSwEVTwMISwUVFlcGAk8GUEsBFlcGAk8DTFBLARVPAwhLBRUWVwYCTwZQTBZXBgJPAkxQTwRQTwNQTwJQTFBJIllLAYECWUsCTwJLAlJXAgBLAoEEWUsDTwNLAlJXAgBOBEsCJVlLA08CSwJSVwIATgRLAhVPA04CUlcCAEwVQQAHSwmBCghFCk8DFUEAB0sIgRQIRQlPAhVBAAdLB4EKCEUIFUEAB0sGgQoIRQdLAUEALUsBcQtEJw4SQAAMgAhFUlI6TkFOVLAASwRLAnAASEAADIAIRVJSOk5PTlSwAE8CFkwWUE8CFlBLBBZMSwFQTwIWUCcHTwNQTL8pTFCwI0NIRQFFASJC/h8xFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXMQAiKGVEJwVlSHIIRBJAAAQnCLAATBaAAXNMUEwWv0k4BzIKEkw4CIHUSBIQQAAEJwmwACNDMRYjCUcCOBAjEkQ2GgFJTgMVJBJENhoCSU4DFSMSRCIoZURJKmVIIltJTgJOAytlSFcACElOBLExAE8CshgnD7IashqyGiWyECKyAbO0PklXBABMVwAEKRJESRUkEkQXTDgHMgoSQAAEJwmwAE8DOAhLARJAAAQnCbAAsUxJcghETwKyCLIHI7IQIrIBtjEATLIYgAQNA3yJshqyGrIaTLIasholshAisgGzI0M2GgFJFYEgEkQiKGVESSplSCJbTCtlSFcACLEyCBZPArIYgARb/egCshqyGkyyGrIaJbIQIrIBs7Q+SVcEAExXAAQpEkRJFYEJEkQpTFCwI0M2GgFJFYEgEkQiKGVESSplSCJbTCtlSFcACLFMshgnD7IaTLIasholshAisgGztD5JVwQATFcABCkSREkVJBJEKUxQsCNDNhoBSRWBIBJEIogBnxYpTFCwI0M2GgFJFYEgEkQjiAGLFilMULAjQzYaAUkVgSASRDYaAkkVgRoSRDEAIihlRCcEZUgiW3IIRBJAAAQnBrAAiAO1SIgBnhYpTFCwI0M2GgFJFYEaEkQxACIoZUQnBGVIIltyCEQSQAAEJwawAIgDh0gWKUxQsCNDNhoBSRWBIBJEJwdMUL5EKUxQsCNDNhoBSSJZgQIISwEVEkRXAgAxACIoZUQnBWVIcghEEkAABCcIsAAiKGVEgANwYWxlSIEQWzINEkAADIAIRVJSOklVUEewACcKTGcjQzYaAUkVJBJEFzEAIihlRCcFZUhyCEQSQAAEJwiwAChMZyNDigIBsYv/Fov+TFAiKGVEKmVIgSBbshiABCW4EqeyGrIaJbIQIrIBs7Q+RwJXBABMVwAEKRJESRWBaRJEIlNAABWAEQAAAAAAAAAAAAAAAAAAAAAATIlJVwUgIihlRCcFZUhyCEQSSwGBJVsyB0lLBIEtWwlLBIE9W0xLARgICUsDgVVbDE8CSwIQEE8CV10IgAEAIk8DVE8CFlBMUImKAgGL/0EAPrEiKGVEJwRlSCJbshiABOO++UOyGov+sholshAisgGztD5JVwQATFcABCkSREkVgRoSRIgCH0iL/kyIAAWJIkL/9YoCASJHAoAAIkcCJweL/lBJvUUBQQASSb5ESSJbjARJJFuMBYEgW4wGIihlRCtlSElXAAhMIltAAVVIIiJOAov+iwSI/tJJjAIiU0EAMosCVwEIgAFzTFBJjAC9RQFBAB9PAkiLAL5EF04CiwKBCVtJgQwPQQENSIH6AU8DCk4CiwVBAPdMvkRJJFtLAYEQW04ETIEYW04DSScNZUgXTIsFEkAADIAIRVJSOklORkSwAE8EEkAADIAIRVJSOkNORkSwAEIAACIoZUQrZUgiW0lAAH9IIk4DiwZBAHKLBklxA0RJFSJLAQ8iSwJPAk2BA0sCD4EDTwNPAk1SjAGL/ksBcABIjANxC0QnDhJBADuLA0EANosBgANBS0MSQQAbgTJMTwIIi/8ITwIITwIICElAAAQjjACJjACJiwGAA0FPRxJBAAWBGUL/1yJC/9MiQv/Pi/5McABISYwDIQcMQQAGIk4DQv9wiwNJIQQPIQRMTYEyCyEECk4DQv9bRQEiTgJC/0KBFAtPAwpOAkL+8SIoZUQqZUgiW7EyCBZMshiABO8YpJayGrIai/6yGrIagAGAsholshAisgGztD5JVwQASwFXAAQpEkQVgRASREmBBFtJTgJOA4EMW0whBwxAAApJgYCangEMQQAHSEUBIkL+Sk8CSSEFDyEFTE2B+gELIQUKTEkhBg8hBkxNCyEGCkL+KYoBAoAARwKL/yJTQAAIIov/jAGMAImL/yNbSYE8D0EAfUiBZIwAMgeL/4EJWwlJIQgPQQBbSIsAgUsIjACL/4ERW0mMAUEAL4sBgUsLgaCNBgpJjAKBSw1BAASBS4wCi/+ByAFTQQAeiwCLAg1BABCLAIsCCYwAiwCL/4wBjACJIowAQv/xiwCLAgiMAEL/54FLCyEICosACIwAQv+fgWQLgTwKjABC/32KAgGxi/8VFlcGAov/UIv+shgnDLIasholshAisgGztD5JVwQASwFXAAQpEkRJIlmBAghMFRJEVwYAiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Constructs a no op call for the cacheMeta(address,uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static cacheMeta(params) {
    return {
      ...params,
      method: "cacheMeta(address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.subscriptionIndex, params.args.nfdAppId, params.args.akitaAssetId]
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
   * Constructs a no op call for the commitStakingImpact(pay,uint64,bool)void ABI method
   *
   * Enrolls the caller in this application's AKTA soft-stake commitment.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static commitStakingImpact(params) {
    return {
      ...params,
      method: "commitStakingImpact(pay,uint64,bool)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.amount, params.args.inheritRoot]
    };
  }
  /**
   * Constructs a no op call for the checkpointStakingImpact(address)(bool,uint64) ABI method
   *
   * Permissionlessly records a currently observed shortfall for social impact.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static checkpointStakingImpact(params) {
    return {
      ...params,
      method: "checkpointStakingImpact(address)(bool,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the stakingImpactCost(address)uint64 ABI method
   *
   * Returns the MBR this application must fund to create an AKTA commitment for an account.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static stakingImpactCost(params) {
    return {
      ...params,
      method: "stakingImpactCost(address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
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
   * Constructs a no op call for the getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getUserImpactWithInputs(params) {
    return {
      ...params,
      method: "getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.inputs]
    };
  }
  /**
   * Constructs a no op call for the calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static calculateSocialImpactScore(params) {
    return {
      ...params,
      method: "calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.inputs]
    };
  }
  /**
   * Constructs a no op call for the getMeta(address)(uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getMeta(params) {
    return {
      ...params,
      method: "getMeta(address)(uint64,uint64,uint64,uint64,uint64)",
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
     * Makes a call to the AkitaSocialImpact smart contract using the `cacheMeta(address,uint64,uint64,uint64)uint64` ABI method.
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
     * Makes a call to the AkitaSocialImpact smart contract using the `commitStakingImpact(pay,uint64,bool)void` ABI method.
     *
     * Enrolls the caller in this application's AKTA soft-stake commitment.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    commitStakingImpact: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.commitStakingImpact(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `checkpointStakingImpact(address)(bool,uint64)` ABI method.
     *
     * Permissionlessly records a currently observed shortfall for social impact.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    checkpointStakingImpact: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.checkpointStakingImpact(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `stakingImpactCost(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Returns the MBR this application must fund to create an AKTA commitment for an account.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    stakingImpactCost: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.stakingImpactCost(params));
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
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getUserImpactWithInputs: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.getUserImpactWithInputs(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    calculateSocialImpactScore: (params) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.calculateSocialImpactScore(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64)` ABI method.
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
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(AkitaSocialImpactParamsFactory.opUp(params));
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
     * Makes a call to the AkitaSocialImpact smart contract using the `cacheMeta(address,uint64,uint64,uint64)uint64` ABI method.
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
     * Makes a call to the AkitaSocialImpact smart contract using the `commitStakingImpact(pay,uint64,bool)void` ABI method.
     *
     * Enrolls the caller in this application's AKTA soft-stake commitment.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    commitStakingImpact: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.commitStakingImpact(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `checkpointStakingImpact(address)(bool,uint64)` ABI method.
     *
     * Permissionlessly records a currently observed shortfall for social impact.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    checkpointStakingImpact: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.checkpointStakingImpact(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `stakingImpactCost(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Returns the MBR this application must fund to create an AKTA commitment for an account.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    stakingImpactCost: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.stakingImpactCost(params));
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
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getUserImpactWithInputs: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.getUserImpactWithInputs(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    calculateSocialImpactScore: (params) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.calculateSocialImpactScore(params));
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64)` ABI method.
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
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AkitaSocialImpactParamsFactory.opUp(params));
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
     * Makes a call to the AkitaSocialImpact smart contract using the `cacheMeta(address,uint64,uint64,uint64)uint64` ABI method.
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
     * Makes a call to the AkitaSocialImpact smart contract using the `commitStakingImpact(pay,uint64,bool)void` ABI method.
     *
     * Enrolls the caller in this application's AKTA soft-stake commitment.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    commitStakingImpact: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.commitStakingImpact(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `checkpointStakingImpact(address)(bool,uint64)` ABI method.
     *
     * Permissionlessly records a currently observed shortfall for social impact.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    checkpointStakingImpact: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.checkpointStakingImpact(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `stakingImpactCost(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Returns the MBR this application must fund to create an AKTA commitment for an account.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    stakingImpactCost: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.stakingImpactCost(params));
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
     * Makes a call to the AkitaSocialImpact smart contract using the `getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getUserImpactWithInputs: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getUserImpactWithInputs(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    calculateSocialImpactScore: async (params) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.calculateSocialImpactScore(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64)` ABI method.
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
    },
    /**
     * Makes a call to the AkitaSocialImpact smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.opUp(params));
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
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `stakingImpactCost(address)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Returns the MBR this application must fund to create an AKTA commitment for an account.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async stakingImpactCost(params) {
    const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.stakingImpactCost(params));
    return result.return;
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
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getUserImpactWithInputs(params) {
    const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.getUserImpactWithInputs(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async calculateSocialImpactScore(params) {
    const result = await this.appClient.send.call(AkitaSocialImpactParamsFactory.calculateSocialImpactScore(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaSocialImpact smart contract using the `getMeta(address)(uint64,uint64,uint64,uint64,uint64)` ABI method.
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
       * Add a cacheMeta(address,uint64,uint64,uint64)uint64 method call against the AkitaSocialImpact contract
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
       * Add a commitStakingImpact(pay,uint64,bool)void method call against the AkitaSocialImpact contract
       */
      commitStakingImpact(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.commitStakingImpact(params)));
        return this;
      },
      /**
       * Add a checkpointStakingImpact(address)(bool,uint64) method call against the AkitaSocialImpact contract
       */
      checkpointStakingImpact(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.checkpointStakingImpact(params)));
        return this;
      },
      /**
       * Add a stakingImpactCost(address)uint64 method call against the AkitaSocialImpact contract
       */
      stakingImpactCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.stakingImpactCost(params)));
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
       * Add a getUserImpactWithInputs(address,(bool,uint64,uint64,uint64,bool))uint64 method call against the AkitaSocialImpact contract
       */
      getUserImpactWithInputs(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getUserImpactWithInputs(params)));
        return this;
      },
      /**
       * Add a calculateSocialImpactScore((bool,uint64,uint64,uint64,bool))uint64 method call against the AkitaSocialImpact contract
       */
      calculateSocialImpactScore(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.calculateSocialImpactScore(params)));
        return this;
      },
      /**
       * Add a getMeta(address)(uint64,uint64,uint64,uint64,uint64) method call against the AkitaSocialImpact contract
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
      /**
       * Add a opUp()void method call against the AkitaSocialImpact contract
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



var APP_SPEC4 = { "name": "AkitaSocialModeration", "structs": { "ObjectAED1FA93": [{ "name": "exists", "type": "bool" }, { "name": "lastActive", "type": "uint64" }], "Action": [{ "name": "content", "type": "byte[36]" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addModerator", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "removeModerator", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "ban", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "expiration" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unban", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "flagPost", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unflagPost", "args": [{ "type": "byte[32]", "name": "ref" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setModeratorContentFlags", "args": [{ "type": "byte[32]", "name": "ref" }, { "type": "uint64", "name": "flags" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addAction", "args": [{ "type": "uint64", "name": "actionAppID" }, { "type": "byte[36]", "name": "content" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "removeAction", "args": [{ "type": "uint64", "name": "actionAppID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isBanned", "args": [{ "type": "address", "name": "account" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isModerator", "args": [{ "type": "address", "name": "account" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "moderatorMeta", "args": [{ "type": "address", "name": "user" }], "returns": { "type": "(bool,uint64)", "struct": "ObjectAED1FA93" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "moderators": { "keyType": "address", "valueType": "uint64", "desc": "Who is a moderator", "prefix": "ZA==" }, "banned": { "keyType": "address", "valueType": "uint64", "desc": "Who is banned and when they can return", "prefix": "bg==" }, "actions": { "keyType": "uint64", "valueType": "Action", "desc": "Actions usable on an akita post", "prefix": "YQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [705, 777], "errorMessage": "Box must have value" }, { "pc": [970], "errorMessage": "Bytes has valid prefix" }, { "pc": [630, 679], "errorMessage": "ERR:EACT" }, { "pc": [417], "errorMessage": "ERR:EBAN" }, { "pc": [312], "errorMessage": "ERR:EMOD" }, { "pc": [874], "errorMessage": "ERR:IUPG" }, { "pc": [467], "errorMessage": "ERR:NBAN" }, { "pc": [290, 344, 612, 662, 842, 908], "errorMessage": "ERR:NDAO" }, { "pc": [358, 393, 444, 493, 524, 564], "errorMessage": "ERR:NMOD" }, { "pc": [283, 337, 605, 655, 835, 901], "errorMessage": "application exists" }, { "pc": [277, 331, 599, 649, 829, 846, 895, 920], "errorMessage": "check GlobalState exists" }, { "pc": [233, 812, 990], "errorMessage": "invalid array length header" }, { "pc": [241, 820], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [271, 325, 370, 430, 479, 510, 541, 691, 738, 765], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [593], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [252, 378, 549, 583, 642, 888], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [995], "errorMessage": "invalid number of bytes for smart_contracts/social/types.ts::PostValue" }, { "pc": [982], "errorMessage": "invalid tail pointer at index 9 of (uint8[32],uint64,uint64,bool1,uint64,bool1,uint8,uint64,uint64,(len+uint8[]))" }, { "pc": [977], "errorMessage": "invalid tuple encoding" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDMyIDgKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgImQiICJ3YWxsZXQiICJFUlI6TkRBTyIgIkVSUjpOTU9EIiAweDE1MWY3Yzc1ICJuIiAweDAwICJ2ZXJzaW9uIiAiRVJSOkVBQ1QiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsTW9kZXJhdGlvbiBleHRlbmRzIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUAyCgptYWluX3N3aXRjaF9jYXNlX25leHRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEzCiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFTb2NpYWxNb2RlcmF0aW9uIGV4dGVuZHMgVXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIwCiAgICBwdXNoYnl0ZXNzIDB4Y2NkOWI4ZDMgMHgwM2UzYWIyMiAweDdhODMzYjQwIDB4YTBkMjMyMWQgMHg2MWRjZDJlZiAweDc5NjBlYTc2IDB4ZmJmNGRkMzUgMHhkYTZhZGNkOSAweGYxNDkyYmY0IDB4ODQyNjljNzggMHg3MTJlZTgyMyAweDFmM2M2MThjIDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImFkZE1vZGVyYXRvcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgInJlbW92ZU1vZGVyYXRvcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgImJhbihhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bmJhbihhZGRyZXNzKXZvaWQiLCBtZXRob2QgImZsYWdQb3N0KGJ5dGVbMzJdKXZvaWQiLCBtZXRob2QgInVuZmxhZ1Bvc3QoYnl0ZVszMl0pdm9pZCIsIG1ldGhvZCAic2V0TW9kZXJhdG9yQ29udGVudEZsYWdzKGJ5dGVbMzJdLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJhZGRBY3Rpb24odWludDY0LGJ5dGVbMzZdKXZvaWQiLCBtZXRob2QgInJlbW92ZUFjdGlvbih1aW50NjQpdm9pZCIsIG1ldGhvZCAiaXNCYW5uZWQoYWRkcmVzcylib29sIiwgbWV0aG9kICJpc01vZGVyYXRvcihhZGRyZXNzKWJvb2wiLCBtZXRob2QgIm1vZGVyYXRvck1ldGEoYWRkcmVzcykoYm9vbCx1aW50NjQpIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGFkZE1vZGVyYXRvciByZW1vdmVNb2RlcmF0b3IgYmFuIHVuYmFuIGZsYWdQb3N0IHVuZmxhZ1Bvc3Qgc2V0TW9kZXJhdG9yQ29udGVudEZsYWdzIGFkZEFjdGlvbiByZW1vdmVBY3Rpb24gaXNCYW5uZWQgaXNNb2RlcmF0b3IgbW9kZXJhdG9yTWV0YSB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTgKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMwogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhU29jaWFsTW9kZXJhdGlvbiBleHRlbmRzIFVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4Y2Q5YWQ2N2UgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjI2CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjI4CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjI5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoyNgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmFkZE1vZGVyYXRvcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkZE1vZGVyYXRvcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjM0CiAgICAvLyBhZGRNb2RlcmF0b3IoYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czozNQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czozNQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogYWRkTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgphZGRNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MzYKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5tb2RlcmF0b3JzKGFkZHJlc3MpLmV4aXN0cywgRVJSX0FMUkVBRFlfQV9NT0RFUkFUT1IpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFkZE1vZGVyYXRvcl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6RU1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFTU9ECgphZGRNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czozNwogICAgLy8gdGhpcy5tb2RlcmF0b3JzKGFkZHJlc3MpLmNyZWF0ZSgpCiAgICBpbnRjXzMgLy8gOAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czozNAogICAgLy8gYWRkTW9kZXJhdG9yKGFkZHJlc3M6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLnJlbW92ZU1vZGVyYXRvcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlbW92ZU1vZGVyYXRvcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjQwCiAgICAvLyByZW1vdmVNb2RlcmF0b3IoYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogcmVtb3ZlTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgpyZW1vdmVNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoYWRkcmVzcykuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVtb3ZlTW9kZXJhdG9yX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0IC8vICJFUlI6Tk1PRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOTU9ECgpyZW1vdmVNb2RlcmF0b3JfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo0MwogICAgLy8gdGhpcy5tb2RlcmF0b3JzKGFkZHJlc3MpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjQwCiAgICAvLyByZW1vdmVNb2RlcmF0b3IoYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjpBa2l0YVNvY2lhbE1vZGVyYXRpb24uYmFuW3JvdXRpbmddKCkgLT4gdm9pZDoKYmFuOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDYKICAgIC8vIGJhbihhZGRyZXNzOiBBY2NvdW50LCBleHBpcmF0aW9uOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBieXRlY18xIC8vICJkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjQ3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGJhbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOk5NT0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk1PRAoKYmFuX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MjAKICAgIC8vIGJhbm5lZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEJhbm5lZCB9KQogICAgYnl0ZWMgNiAvLyAibiIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmFubmVkKGFkZHJlc3MpLmV4aXN0cywgRVJSX0FMUkVBRFlfQkFOTkVEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBiYW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOkVCQU4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUJBTgoKYmFuX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDkKICAgIC8vIHRoaXMuYmFubmVkKGFkZHJlc3MpLnZhbHVlID0gZXhwaXJhdGlvbgogICAgc3dhcAogICAgaXRvYgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NDYKICAgIC8vIGJhbihhZGRyZXNzOiBBY2NvdW50LCBleHBpcmF0aW9uOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLnVuYmFuW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5iYW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo1MgogICAgLy8gdW5iYW4oYWRkcmVzczogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubW9kZXJhdG9ycyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9OT1RfQV9NT0RFUkFUT1IpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdW5iYW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOTU9EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NT0QKCnVuYmFuX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MjAKICAgIC8vIGJhbm5lZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEJhbm5lZCB9KQogICAgYnl0ZWMgNiAvLyAibiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmFubmVkKGFkZHJlc3MpLmV4aXN0cywgRVJSX1VTRVJfTk9UX0JBTk5FRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuYmFuX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpOQkFOIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5CQU4KCnVuYmFuX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTUKICAgIC8vIHRoaXMuYmFubmVkKGFkZHJlc3MpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjUyCiAgICAvLyB1bmJhbihhZGRyZXNzOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5mbGFnUG9zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmZsYWdQb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NTgKICAgIC8vIGZsYWdQb3N0KHJlZjogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgYnl0ZWNfMSAvLyAiZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjU5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubW9kZXJhdG9ycyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9OT1RfQV9NT0RFUkFUT1IpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBmbGFnUG9zdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOk5NT0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk1PRAoKZmxhZ1Bvc3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2MAogICAgLy8gdGhpcy5hcHBseU1vZGVyYXRpb24ocmVmLCB0cnVlLCB0cnVlLCAwLCBmYWxzZSkKICAgIGludGNfMSAvLyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGNhbGxzdWIgYXBwbHlNb2RlcmF0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo1OAogICAgLy8gZmxhZ1Bvc3QocmVmOiBieXRlczwzMj4pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLnVuZmxhZ1Bvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgp1bmZsYWdQb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NjMKICAgIC8vIHVuZmxhZ1Bvc3QocmVmOiBieXRlczwzMj4pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBieXRlY18xIC8vICJkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1vZGVyYXRvcnMoVHhuLnNlbmRlcikuZXhpc3RzLCBFUlJfTk9UX0FfTU9ERVJBVE9SKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTgKICAgIC8vIG1vZGVyYXRvcnMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogQWtpdGFTb2NpYWxCb3hQcmVmaXhNb2RlcmF0b3JzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjY0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuZmxhZ1Bvc3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOTU9EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NT0QKCnVuZmxhZ1Bvc3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2NQogICAgLy8gdGhpcy5hcHBseU1vZGVyYXRpb24ocmVmLCB0cnVlLCBmYWxzZSwgMCwgZmFsc2UpCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgY2FsbHN1YiBhcHBseU1vZGVyYXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjYzCiAgICAvLyB1bmZsYWdQb3N0KHJlZjogYnl0ZXM8MzI+KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5zZXRNb2RlcmF0b3JDb250ZW50RmxhZ3Nbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRNb2RlcmF0b3JDb250ZW50RmxhZ3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2OAogICAgLy8gc2V0TW9kZXJhdG9yQ29udGVudEZsYWdzKHJlZjogYnl0ZXM8MzI+LCBmbGFnczogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgYnl0ZWNfMSAvLyAiZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5tb2RlcmF0b3JzKFR4bi5zZW5kZXIpLmV4aXN0cywgRVJSX05PVF9BX01PREVSQVRPUikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMubW9kZXJhdG9ycyhUeG4uc2VuZGVyKS5leGlzdHMsIEVSUl9OT1RfQV9NT0RFUkFUT1IpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRNb2RlcmF0b3JDb250ZW50RmxhZ3NfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpOTU9EIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5NT0QKCnNldE1vZGVyYXRvckNvbnRlbnRGbGFnc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjcwCiAgICAvLyB0aGlzLmFwcGx5TW9kZXJhdGlvbihyZWYsIGZhbHNlLCBmYWxzZSwgZmxhZ3MsIHRydWUpCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGFwcGx5TW9kZXJhdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6NjgKICAgIC8vIHNldE1vZGVyYXRvckNvbnRlbnRGbGFncyhyZWY6IGJ5dGVzPDMyPiwgZmxhZ3M6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjpBa2l0YVNvY2lhbE1vZGVyYXRpb24uYWRkQWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkQWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTAxCiAgICAvLyBhZGRBY3Rpb24oYWN0aW9uQXBwSUQ6IHVpbnQ2NCwgY29udGVudDogQ0lEKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzNgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzY+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTAyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiBhZGRBY3Rpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmFkZEFjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmFjdGlvbnMoYWN0aW9uQXBwSUQpLmV4aXN0cywgRVJSX0FMUkVBRFlfQU5fQUNUSU9OKQogICAgc3dhcAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MjIKICAgIC8vIGFjdGlvbnMgPSBCb3hNYXA8dWludDY0LCBBY3Rpb24+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEFjdGlvbnMgfSkKICAgIHB1c2hieXRlcyAiYSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDMKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5hY3Rpb25zKGFjdGlvbkFwcElEKS5leGlzdHMsIEVSUl9BTFJFQURZX0FOX0FDVElPTikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWRkQWN0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA5IC8vICJFUlI6RUFDVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFQUNUCgphZGRBY3Rpb25fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDQKICAgIC8vIHRoaXMuYWN0aW9ucyhhY3Rpb25BcHBJRCkudmFsdWUgPSB7IGNvbnRlbnQgfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTAxCiAgICAvLyBhZGRBY3Rpb24oYWN0aW9uQXBwSUQ6IHVpbnQ2NCwgY29udGVudDogQ0lEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5yZW1vdmVBY3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpyZW1vdmVBY3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDcKICAgIC8vIHJlbW92ZUFjdGlvbihhY3Rpb25BcHBJRDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTA4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiByZW1vdmVBY3Rpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzMgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnJlbW92ZUFjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEwOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWN0aW9ucyhhY3Rpb25BcHBJRCkuZXhpc3RzLCBFUlJfQUxSRUFEWV9BTl9BQ1RJT04pCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoyMgogICAgLy8gYWN0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjdGlvbj4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4QWN0aW9ucyB9KQogICAgcHVzaGJ5dGVzICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEwOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWN0aW9ucyhhY3Rpb25BcHBJRCkuZXhpc3RzLCBFUlJfQUxSRUFEWV9BTl9BQ1RJT04pCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZW1vdmVBY3Rpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDkgLy8gIkVSUjpFQUNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVBQ1QKCnJlbW92ZUFjdGlvbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjExMAogICAgLy8gdGhpcy5hY3Rpb25zKGFjdGlvbkFwcElEKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMDcKICAgIC8vIHJlbW92ZUFjdGlvbihhY3Rpb25BcHBJRDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5pc0Jhbm5lZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzQmFubmVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTE1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MjAKICAgIC8vIGJhbm5lZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeEJhbm5lZCB9KQogICAgYnl0ZWMgNiAvLyAibiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMTcKICAgIC8vIHJldHVybiB0aGlzLmJhbm5lZChhY2NvdW50KS5leGlzdHMgJiYgdGhpcy5iYW5uZWQoYWNjb3VudCkudmFsdWUgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGlzQmFubmVkX2Jvb2xfZmFsc2VANAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYnogaXNCYW5uZWRfYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKaXNCYW5uZWRfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTE1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDcgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppc0Jhbm5lZF9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBpc0Jhbm5lZF9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLmlzTW9kZXJhdG9yW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNNb2RlcmF0b3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxOAogICAgLy8gbW9kZXJhdG9ycyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBBa2l0YVNvY2lhbEJveFByZWZpeE1vZGVyYXRvcnMgfSkKICAgIGJ5dGVjXzEgLy8gImQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyMgogICAgLy8gcmV0dXJuIHRoaXMubW9kZXJhdG9ycyhhY2NvdW50KS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6MTIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDcgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5tb2RlcmF0b3JNZXRhW3JvdXRpbmddKCkgLT4gdm9pZDoKbW9kZXJhdG9yTWV0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjE4CiAgICAvLyBtb2RlcmF0b3JzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IEFraXRhU29jaWFsQm94UHJlZml4TW9kZXJhdG9ycyB9KQogICAgYnl0ZWNfMSAvLyAiZCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMjcKICAgIC8vIGlmICh0aGlzLm1vZGVyYXRvcnModXNlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IG1vZGVyYXRvck1ldGFfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMzAKICAgIC8vIGxhc3RBY3RpdmU6IHRoaXMubW9kZXJhdG9ycyh1c2VyKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyOC0xMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGV4aXN0czogdHJ1ZSwKICAgIC8vICAgbGFzdEFjdGl2ZTogdGhpcy5tb2RlcmF0b3JzKHVzZXIpLnZhbHVlCiAgICAvLyB9CiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgc3dhcAogICAgY29uY2F0Cgptb2RlcmF0b3JNZXRhX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5tb2RlcmF0b3JNZXRhQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czoxMjUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbW9kZXJhdG9yTWV0YV9hZnRlcl9pZl9lbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEzMwogICAgLy8gcmV0dXJuIHsgZXhpc3RzOiBmYWxzZSwgbGFzdEFjdGl2ZTogMCB9CiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjEyNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIG1vZGVyYXRvck1ldGFfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo6QWtpdGFTb2NpYWxNb2RlcmF0aW9uLm1vZGVyYXRvck1ldGFANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OkFraXRhU29jaWFsTW9kZXJhdGlvbi5hcHBseU1vZGVyYXRpb24ocmVmOiBieXRlcywgdXBkYXRlRmxhZ2dlZDogdWludDY0LCBmbGFnZ2VkVmFsdWU6IHVpbnQ2NCwgZmxhZ3NWYWx1ZTogdWludDY0LCB1cGRhdGVGbGFnczogdWludDY0KSAtPiB2b2lkOgphcHBseU1vZGVyYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo3OS04NQogICAgLy8gcHJpdmF0ZSBhcHBseU1vZGVyYXRpb24oCiAgICAvLyAgIHJlZjogYnl0ZXM8MzI+LAogICAgLy8gICB1cGRhdGVGbGFnZ2VkOiBib29sZWFuLAogICAgLy8gICBmbGFnZ2VkVmFsdWU6IGJvb2xlYW4sCiAgICAvLyAgIGZsYWdzVmFsdWU6IHVpbnQ2NCwKICAgIC8vICAgdXBkYXRlRmxhZ3M6IGJvb2xlYW4sCiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDUgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6ODYKICAgIC8vIGNvbnN0IHsgc29jaWFsIH0gPSBnZXRBa2l0YVNvY2lhbEFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjg2CiAgICAvLyBjb25zdCB7IHNvY2lhbCB9ID0gZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo4NgogICAgLy8gY29uc3QgeyBzb2NpYWwgfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjg3LTkwCiAgICAvLyBjb25zdCBwb3N0ID0gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLmdldFBvc3Q+KHsKICAgIC8vICAgYXBwSWQ6IHNvY2lhbCwKICAgIC8vICAgYXJnczogW3JlZl0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDk4YjgxZjc4IC8vIG1ldGhvZCAiZ2V0UG9zdChieXRlWzMyXSkoYWRkcmVzcyx1aW50NjQsdWludDY0LGJvb2wsdWludDY0LGJvb2wsdWludDgsdWludDY0LHVpbnQ2NCxieXRlW10pIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cG4gMgogICAgZXh0cmFjdCA0IDAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCA3NQogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA3NwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCA5IG9mICh1aW50OFszMl0sdWludDY0LHVpbnQ2NCxib29sMSx1aW50NjQsYm9vbDEsdWludDgsdWludDY0LHVpbnQ2NCwobGVuK3VpbnQ4W10pKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNzkKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvdHlwZXMudHM6OlBvc3RWYWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OTIKICAgIC8vIGNvbnN0IG5leHRGbGFnZ2VkOiBib29sZWFuID0gdXBkYXRlRmxhZ2dlZCA/IGZsYWdnZWRWYWx1ZSA6IHBvc3QuYWdhaW5zdENvbnRlbnRQb2xpY3kKICAgIGZyYW1lX2RpZyAtNAogICAgYnogYXBwbHlNb2RlcmF0aW9uX3Rlcm5hcnlfZmFsc2VAMwogICAgcG9wCiAgICBmcmFtZV9kaWcgLTMKCmFwcGx5TW9kZXJhdGlvbl90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo5MwogICAgLy8gY29uc3QgbmV4dEZsYWdzOiB1aW50NjQgPSB1cGRhdGVGbGFncyA/IGZsYWdzVmFsdWUgOiBwb3N0Lm1vZGVyYXRvckZsYWdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGFwcGx5TW9kZXJhdGlvbl90ZXJuYXJ5X2ZhbHNlQDYKICAgIGJ1cnkgMQogICAgZnJhbWVfZGlnIC0yCgphcHBseU1vZGVyYXRpb25fdGVybmFyeV9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3NvY2lhbC9tb2RlcmF0aW9uLmFsZ28udHM6OTUtOTgKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsLnByb3RvdHlwZS5zZXRQb3N0TW9kZXJhdGlvbj4oewogICAgLy8gICBhcHBJZDogc29jaWFsLAogICAgLy8gICBhcmdzOiBbcmVmLCBuZXh0RmxhZ2dlZCwgbmV4dEZsYWdzXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjk3CiAgICAvLyBhcmdzOiBbcmVmLCBuZXh0RmxhZ2dlZCwgbmV4dEZsYWdzXQogICAgYnl0ZWMgNyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICBzZXRiaXQKICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo5NS05OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWwucHJvdG90eXBlLnNldFBvc3RNb2RlcmF0aW9uPih7CiAgICAvLyAgIGFwcElkOiBzb2NpYWwsCiAgICAvLyAgIGFyZ3M6IFtyZWYsIG5leHRGbGFnZ2VkLCBuZXh0RmxhZ3NdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NTEwZWRlYjYgLy8gbWV0aG9kICJzZXRQb3N0TW9kZXJhdGlvbihieXRlWzMyXSxib29sLHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKYXBwbHlNb2RlcmF0aW9uX3Rlcm5hcnlfZmFsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zb2NpYWwvbW9kZXJhdGlvbi5hbGdvLnRzOjkzCiAgICAvLyBjb25zdCBuZXh0RmxhZ3M6IHVpbnQ2NCA9IHVwZGF0ZUZsYWdzID8gZmxhZ3NWYWx1ZSA6IHBvc3QubW9kZXJhdG9yRmxhZ3MKICAgIHN3YXAKICAgIHB1c2hpbnQgNzEKICAgIGV4dHJhY3RfdWludDY0CiAgICBiIGFwcGx5TW9kZXJhdGlvbl90ZXJuYXJ5X21lcmdlQDcKCmFwcGx5TW9kZXJhdGlvbl90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc29jaWFsL21vZGVyYXRpb24uYWxnby50czo5MgogICAgLy8gY29uc3QgbmV4dEZsYWdnZWQ6IGJvb2xlYW4gPSB1cGRhdGVGbGFnZ2VkID8gZmxhZ2dlZFZhbHVlIDogcG9zdC5hZ2FpbnN0Q29udGVudFBvbGljeQogICAgcHVzaGludCA0NTYKICAgIGdldGJpdAogICAgYiBhcHBseU1vZGVyYXRpb25fdGVybmFyeV9tZXJnZUA0Cg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAEgCCYKCWFraXRhX2RhbwFkBndhbGxldAhFUlI6TkRBTwhFUlI6Tk1PRAQVH3x1AW4BAAd2ZXJzaW9uCEVSUjpFQUNUgATqkYDdNhoAjgEAgzEZFEQxGEEAbIIOBMzZuNMEA+OrIgR6gztABKDSMh0EYdzS7wR5YOp2BPv03TUE2mrc2QTxSSv0BIQmnHgEcS7oIwQfPGGMBDPpLJQEhU3t4DYaAI4OAEEAdwCkAOABEQEwAU8BeQG0AeUCFAIvAqoAAQAjQ4AEzZrWfjYaAI4BAA0AMRmBBBIxGBBEQgJDNhoBSSJZgQIISwEVEkRXAgA2GgJJFSUSRBcnCE8CZyhMZyNDNhoBSRUkEkQxACIoZUQqZUhyCEQSQAADK7AAKUxQSb1FAUEADIAIRVJSOkVNT0SwACW5SCNDNhoBSRUkEkQxACIoZUQqZUhyCEQSQAADK7AAKUxQSb1FAUAABCcEsAC8SCNDNhoBSRUkEkQ2GgJJFSUSRBcpMQBQvUUBQAAEJwSwACcGTwJQSb1FAUEADIAIRVJSOkVCQU6wAEwWvyNDNhoBSRUkEkQpMQBQvUUBQAAEJwSwACcGTFBJvUUBQAAMgAhFUlI6TkJBTrAAvEgjQzYaAUkVJBJEKTEAUL1FAUAABCcEsAAjSSJJiAGdI0M2GgFJFSQSRCkxAFC9RQFAAAQnBLAAIyJHAogBfiNDNhoBSRUkEkQ2GgJJFSUSRBcpMQBQvUUBQAAEJwSwAEwiSU8DI4gBVCNDNhoBSRUlEkQXNhoCSRWBJBJEMQAiKGVEKmVIcghEEkAAAyuwAEwWgAFhTFBJvUUBQQAEJwmwAEy/I0M2GgFJFSUSRBcxACIoZUQqZUhyCEQSQAADK7AAFoABYUxQSb1FAUAABCcJsAC8SCNDNhoBSRUkEkQnBkxQSb1FAUEAGEm+RBcyBw1BAA4jJwciTwJUJwVMULAjQyJC/+82GgFJFSQSRClMUL1FAScHIk8CVCcFTFCwI0M2GgFJFSQSRClMUEm9RQFBABC+RBcWgAGATFAnBUxQsCNDSIAJAAAAAAAAAAAAQv/qNhoBSSJZgQIISwEVEkRXAgAxACIoZUQqZUhyCEQSQAADK7AAIihlRIADcGFsZUiBEFsyDRJAAAyACEVSUjpJVVBHsAAnCExnI0M2GgFJFSUSRBcxACIoZUQqZUhyCEQSQAADK7AAKExnI0OKBQAiKGVEgANzYWxlSCJbSbGyGIAEmLgfeLIai/uyGoEGshAisgGztD5HAlcEAElPAlcABCcFEkRJFUsBgUtZSYFNEkRPAkxLAlIiWYFPCBJEi/xBADpIi/2L/0EAK0UBi/6xJwciTwNUTBZPArIYgARRDt62shqL+7IaTLIashqBBrIQIrIBs4lMgUdbQv/SgcgDU0L/wg==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var _sha2js = require('@noble/hashes/sha2.js');

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
    readerAccount = _chunkHFHM5QOFjs.DEFAULT_READER,
    sendParams = _chunkHFHM5QOFjs.DEFAULT_SEND_PARAMS,
    ipfsUrl = ""
  }) {;_class9.prototype.__init29.call(this);_class9.prototype.__init30.call(this);_class9.prototype.__init31.call(this);
    this.algorand = algorand;
    this.network = _chunkHFHM5QOFjs.detectNetworkFromClient.call(void 0, algorand);
    this.daoAppId = _nullishCoalesce(daoAppId, () => ( _chunkHFHM5QOFjs.getAppIdFromEnv.call(void 0, _chunkHFHM5QOFjs.ENV_VAR_NAMES.DAO_APP_ID)));
    this.readerAccount = readerAccount;
    this.sendParams = { ...sendParams };
    this.ipfsUrl = ipfsUrl;
    if (socialFactoryParams.defaultSender) {
      this.sendParams.sender = socialFactoryParams.defaultSender;
    }
    if (socialFactoryParams.defaultSigner) {
      this.sendParams.signer = socialFactoryParams.defaultSigner;
    }
    const resolvedSocialAppId = _chunkHFHM5QOFjs.resolveAppIdWithClient.call(void 0, algorand, socialFactoryParams.appId, _chunkHFHM5QOFjs.ENV_VAR_NAMES.SOCIAL_APP_ID, "SocialSDK.social");
    const resolvedGraphAppId = _chunkHFHM5QOFjs.resolveAppIdWithClient.call(void 0, algorand, graphFactoryParams.appId, _chunkHFHM5QOFjs.ENV_VAR_NAMES.SOCIAL_GRAPH_APP_ID, "SocialSDK.graph");
    const resolvedImpactAppId = _chunkHFHM5QOFjs.resolveAppIdWithClient.call(void 0, algorand, impactFactoryParams.appId, _chunkHFHM5QOFjs.ENV_VAR_NAMES.SOCIAL_IMPACT_APP_ID, "SocialSDK.impact");
    const resolvedModerationAppId = _chunkHFHM5QOFjs.resolveAppIdWithClient.call(void 0, algorand, moderationFactoryParams.appId, _chunkHFHM5QOFjs.ENV_VAR_NAMES.SOCIAL_MODERATION_APP_ID, "SocialSDK.moderation");
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
      this.daoClient = new (0, _chunk5EV47XMVjs.AkitaDaoFactory)({ algorand }).getAppClientById({ appId: this.daoAppId });
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
      ...signer !== void 0 && { signer: _chunkL3SAIW4Gjs.normalizeSigner.call(void 0, signer) }
    };
  }
  getRequiredSendParams(params = {}) {
    const sendParams = this.getSendParams(params);
    if (!_chunkL3SAIW4Gjs.hasSenderSigner.call(void 0, sendParams)) {
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
    return _sha2js.sha256.call(void 0, combined);
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
    return _sha2js.sha256.call(void 0, combined);
  }
  /** Mirror AkitaSocial.toBytes32() so aggregate reaction state can be queried. */
  reactionStorageRef(ref, refType) {
    if (refType === 1 /* Post */ || refType === 3 /* Address */) {
      return ref.length === 32 ? ref : void 0;
    }
    if (refType === 2 /* Asset */ || refType === 4 /* App */) {
      if (ref.length !== 8) return void 0;
      const padded = new Uint8Array(32);
      padded.set(ref);
      return padded;
    }
    const typeBytes = new Uint8Array(8);
    let type = BigInt(refType);
    for (let index = typeBytes.length - 1; index >= 0; index -= 1) {
      typeBytes[index] = Number(type & 0xffn);
      type >>= 8n;
    }
    const encoded = new Uint8Array(typeBytes.length + ref.length);
    encoded.set(typeBytes);
    encoded.set(ref, typeBytes.length);
    return _sha2js.sha256.call(void 0, encoded);
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
    return _sha2js.sha256.call(void 0, combined);
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
  /** Get the MBR required for social impact to create the sender's commitment. */
  async getStakingImpactCost({ sender, signer, address }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.impactClient.stakingImpactCost({ ...sendParams, args: { address } });
  }
  /** Create or add to the sender's app-specific AKTA commitment. */
  async commitStakingImpact({
    sender,
    signer,
    amount,
    inheritRoot = true
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const address = sendParams.sender.toString();
    const cost = await this.getStakingImpactCost({
      sender: sendParams.sender,
      signer: sendParams.signer,
      address
    });
    const payment = this.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.impactClient.appAddress
    });
    const group = this.impactClient.newGroup();
    group.commitStakingImpact({
      ...sendParams,
      args: { payment, amount, inheritRoot },
      maxFee: _algokitutils.microAlgo.call(void 0, 4e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /** Permanently record a currently observed shortfall in social impact's commitment. */
  async checkpointStakingImpact({
    sender,
    signer,
    address
  }) {
    const result = await this.impactClient.send.checkpointStakingImpact({
      ...this.getRequiredSendParams({ sender, signer }),
      args: { address },
      maxFee: _algokitutils.microAlgo.call(void 0, 2e3)
    });
    if (result.return === void 0) throw new Error("Failed to checkpoint social impact stake");
    return result.return;
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
    const reactionRef = this.reactionStorageRef(ref, refType);
    const reactionExists = reactionRef ? await this.socialClient.getReactionExists({
      ...sendParams,
      args: { ref: reactionRef, nft }
    }) : false;
    const mbrAmount = this.calculateReactMBR(!reactionExists, false);
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
//# sourceMappingURL=chunk-XONU4NYP.js.map
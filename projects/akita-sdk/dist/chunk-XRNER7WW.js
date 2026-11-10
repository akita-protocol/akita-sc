"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class; var _class2; var _class3; var _class4;// src/generated/GuildClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Guild", "structs": { "GuildBaseConfig": [{ "name": "proposalActionLimit", "type": "uint64" }, { "name": "proposalSettings", "type": "GuildProposalSettingsConfig" }], "GuildConsensusBallot": [{ "name": "resolved", "type": "bool" }, { "name": "approved", "type": "bool" }, { "name": "votingEnd", "type": "uint64" }, { "name": "eligiblePower", "type": "uint64" }, { "name": "voteCount", "type": "uint64" }, { "name": "requirements", "type": "GuildConsensusRequirements" }, { "name": "votes", "type": "GuildVoteTotals" }], "GuildConsensusRequirements": [{ "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "minimumApprovals", "type": "uint64" }], "GuildExecutionMetadata": [{ "name": "proposalId", "type": "uint64" }, { "name": "index", "type": "uint64" }], "GuildPluginKey": [{ "name": "plugin", "type": "uint64" }, { "name": "escrow", "type": "string" }], "GuildProposal": [{ "name": "status", "type": "uint8" }, { "name": "cid", "type": "byte[36]" }, { "name": "creator", "type": "address" }, { "name": "votingTs", "type": "uint64" }, { "name": "created", "type": "uint64" }, { "name": "feesPaid", "type": "uint64" }, { "name": "actions", "type": "(uint8,byte[])[]" }], "GuildProposalCostInfo": [{ "name": "total", "type": "uint64" }, { "name": "mbr", "type": "uint64" }, { "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "minimumApprovals", "type": "uint64" }], "GuildProposalSettings": [{ "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "minimumApprovals", "type": "uint64" }], "GuildProposalSettingsConfig": [{ "name": "upgradeApp", "type": "GuildProposalSettings" }, { "name": "addPlugin", "type": "GuildProposalSettings" }, { "name": "removeExecution", "type": "GuildProposalSettings" }, { "name": "removePlugin", "type": "GuildProposalSettings" }, { "name": "addAllowances", "type": "GuildProposalSettings" }, { "name": "removeAllowances", "type": "GuildProposalSettings" }, { "name": "newEscrow", "type": "GuildProposalSettings" }, { "name": "toggleEscrowLock", "type": "GuildProposalSettings" }, { "name": "updateGuild", "type": "GuildProposalSettings" }], "GuildVoteTotals": [{ "name": "approvals", "type": "uint64" }, { "name": "rejections", "type": "uint64" }, { "name": "abstains", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "address", "name": "creator" }, { "type": "uint64", "name": "walletFactory" }, { "type": "uint64", "name": "consensus" }, { "type": "(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64)))", "struct": "GuildBaseConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "consensusConfigurationMbr", "args": [{ "type": "byte[]", "name": "config" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return the MBR required by the paired consensus implementation for an opaque draft configuration.", "events": [], "recommendations": {} }, { "name": "configureConsensus", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "byte[]", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Forward opaque draft configuration to the paired consensus implementation.", "events": [], "recommendations": {} }, { "name": "setup", "args": [{ "type": "string", "name": "nickname" }, { "type": "byte[32]", "name": "salt" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Create the Guild's ARC-58 wallet through its configured wallet factory.", "events": [], "recommendations": {} }, { "name": "setProposalSettings", "args": [{ "type": "uint8", "name": "actionType" }, { "type": "(uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "GuildProposalSettings", "name": "settings" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Update one action class's proposal settings while the Guild remains in draft.", "events": [], "recommendations": {} }, { "name": "setConsensusActionSettings", "args": [{ "type": "uint64", "name": "code" }, { "type": "(uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "GuildProposalSettings", "name": "settings" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Attach proposal settings to one opaque consensus action code while the Guild remains in draft.", "events": [], "recommendations": {} }, { "name": "setProposalActionLimit", "args": [{ "type": "uint64", "name": "limit" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Update the maximum proposal action count while the Guild remains in draft.", "events": [], "recommendations": {} }, { "name": "lockPluginSet", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Permanently prevent this Guild from adding or removing ARC-58 plugins.", "events": [], "recommendations": {} }, { "name": "partiallyInitialize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "End creator control while allowing consensus to attach the ARC-58 wallet later.", "events": [], "recommendations": {} }, { "name": "initialize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "End creator control and require the Guild's ARC-58 wallet to be configured.", "events": [], "recommendations": {} }, { "name": "newProposal", "args": [{ "type": "pay", "name": "payment" }, { "type": "byte[36]", "name": "cid" }, { "type": "(uint8,byte[])[]", "name": "actions" }, { "type": "byte[]", "name": "evidence" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Create a proposal after the paired consensus app verifies proposer power.", "events": [], "recommendations": {} }, { "name": "editProposal", "args": [{ "type": "uint64", "name": "id" }, { "type": "byte[36]", "name": "cid" }, { "type": "(uint8,byte[])[]", "name": "actions" }, { "type": "byte[]", "name": "evidence" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Edit a draft proposal without adding funding.", "events": [], "recommendations": {} }, { "name": "editProposalWithPayment", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }, { "type": "byte[36]", "name": "cid" }, { "type": "(uint8,byte[])[]", "name": "actions" }, { "type": "byte[]", "name": "evidence" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Edit a draft proposal and fund its increased storage, ballot MBR, or action fees.", "events": [], "recommendations": {} }, { "name": "deleteProposal", "args": [{ "type": "uint64", "name": "proposalID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete a never-submitted draft or any bootstrap proposal as its creator.\n\nDrafts refund the full prepayment; bootstrap proposals, which the Guild funded from\ncreator-provided balance, refund the storage they release.", "events": [], "recommendations": {} }, { "name": "submitProposal", "args": [{ "type": "uint64", "name": "proposalID" }, { "type": "byte[]", "name": "evidence" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Move a proposal created under Guild consensus from draft to voting.", "events": [], "recommendations": {} }, { "name": "voteProposal", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "uint64", "name": "proposalID" }, { "type": "uint8", "name": "vote" }, { "type": "byte[]", "name": "evidence" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Vote through the Guild while its consensus app calculates and stores the result. Voting again changes\nthe vote; only a first vote pays for its receipt (see `voteCost`).", "events": [], "recommendations": {} }, { "name": "finalizeProposal", "args": [{ "type": "uint64", "name": "proposalID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Resolve the proposal using the result returned by the paired consensus app.", "events": [], "recommendations": {} }, { "name": "cleanupProposalConsensus", "args": [{ "type": "uint64", "name": "proposalID" }, { "type": "address[]", "name": "voters" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Reclaim terminal consensus boxes without deleting the historical Guild proposal.\n\nEvery listed voter recovers their own vote receipt; the ballot storage returns to the proposer.\nApproved ballots stay until execution or cancellation, since policies read the approving\nballot while applying consensus actions.", "events": [], "recommendations": {} }, { "name": "cancelProposal", "args": [{ "type": "uint64", "name": "proposalID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Abandon an approved proposal that has not executed, refunding its execution reserve.\n\nApproved proposals never expire, and state changes after approval can leave one permanently\nunexecutable; cancellation is the proposer's way to recover the reserve they prepaid.", "events": [], "recommendations": {} }, { "name": "executeProposal", "args": [{ "type": "uint64", "name": "proposalID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Execute every action in an approved proposal.", "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "desc": "Active upgrades consume a voted transaction-group commitment, including exact program bytes and version.", "events": [], "recommendations": {} }, { "name": "sweep", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Forward every microALGO that is not the Guild's own storage or a proposer's reserve to the treasury.\n\nAnyone may call this once the Guild is active; in draft only the creator may, since the\ncreator funds draft storage from this balance.", "events": [], "recommendations": {} }, { "name": "setupCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return the funding required to create the Guild's ARC-58 wallet.", "events": [], "recommendations": {} }, { "name": "proposalCost", "args": [{ "type": "(uint8,byte[])[]", "name": "actions" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "GuildProposalCostInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return proposal cost and the strictest consensus settings among all actions.", "events": [], "recommendations": {} }, { "name": "getProposal", "args": [{ "type": "uint64", "name": "proposalID" }], "returns": { "type": "(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])", "struct": "GuildProposal" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return a proposal by ID.", "events": [], "recommendations": {} }, { "name": "getBallot", "args": [{ "type": "uint64", "name": "proposalID" }], "returns": { "type": "(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))", "struct": "GuildConsensusBallot" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return the consensus ballot for a Guild proposal.", "events": [], "recommendations": {} }, { "name": "mustGetExecution", "args": [{ "type": "byte[32]", "name": "lease" }], "returns": { "type": "(uint64,uint64)", "struct": "GuildExecutionMetadata" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return proposal metadata associated with an ARC-58 execution key.", "events": [], "recommendations": {} }, { "name": "getConsensusActionSettings", "args": [{ "type": "uint64", "name": "code" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "GuildProposalSettings" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return the settings that govern one opaque consensus action code.", "events": [], "recommendations": {} }, { "name": "voteCost", "args": [{ "type": "uint64", "name": "proposalID" }, { "type": "address", "name": "voter" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.", "events": [], "recommendations": {} }, { "name": "voteMbr", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return the minimum-balance payment required to store one vote.", "events": [], "recommendations": {} }, { "name": "sweepable", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return the balance sweep() would forward to the treasury right now.", "events": [], "recommendations": {} }, { "name": "canChangePluginSet", "args": [], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Return whether proposals may still add or remove wallet plugins.", "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "desc": "Generic proposal and ARC-58 execution kernel. Membership, voting, vote\nstorage, and final resolution live in the permanently paired consensus app.\n\nFunds model: the Guild application account only ever holds its own minimum\nbalance plus proposer prepayments for proposals that have not reached a\nterminal outcome (`reserved`). Everything else is returned to whoever paid it\nor forwarded to the treasury, the Guild's ARC-58 wallet.", "networks": {}, "state": { "schema": { "global": { "ints": 12, "bytes": 24 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "state": { "keyType": "AVMString", "valueType": "uint8", "key": "c3RhdGU=", "desc": "lifecycle state of the Guild" }, "consensus": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y29uc2Vuc3Vz", "desc": "dedicated consensus application permanently paired with this Guild" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "version number of the Guild implementation" }, "creator": { "keyType": "AVMString", "valueType": "address", "key": "Y3JlYXRvcg==", "desc": "account with unrestricted bootstrap authority while the Guild is in draft" }, "wallet": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2FsbGV0", "desc": "ARC-58 wallet administered by the Guild" }, "walletFactory": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2FsbGV0X2ZhY3Rvcnk=", "desc": "factory used to create and update the ARC-58 wallet" }, "proposalActionLimit": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJvcG9zYWxfYWN0aW9uX2xpbWl0", "desc": "maximum number of actions in one proposal" }, "proposalID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJvcG9zYWxfaWQ=", "desc": "next proposal ID" }, "pluginSetLocked": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGx1Z2luc19sb2NrZWQ=", "desc": "whether plugin additions and removals are permanently disabled" }, "reserved": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVzZXJ2ZWQ=", "desc": "Proposer prepayments held in free balance for proposals that have not reached a terminal\noutcome. Proposal boxes are already locked as minimum balance and are therefore excluded." }, "upgradeAppProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "dXBncmFkZV9hcHBfcHM=", "desc": "settings for Guild or managed application upgrades" }, "addPluginProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "YWRkX3BsdWdpbl9wcw==", "desc": "settings for adding ARC-58 plugins" }, "removeExecutionProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "cmVtb3ZlX2V4ZWN1dGlvbl9wcw==", "desc": "settings for removing ARC-58 execution keys" }, "removePluginProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "cmVtb3ZlX3BsdWdpbl9wcw==", "desc": "settings for removing ARC-58 plugins" }, "addAllowancesProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "YWRkX2FsbG93YW5jZXNfcHM=", "desc": "settings for adding ARC-58 escrow allowances" }, "removeAllowancesProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "cmVtb3ZlX2FsbG93YW5jZXNfcHM=", "desc": "settings for removing ARC-58 escrow allowances" }, "newEscrowProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "bmV3X2VzY3Jvd19wcw==", "desc": "settings for creating ARC-58 escrows" }, "toggleEscrowLockProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "dG9nZ2xlX2VzY3Jvd19wcw==", "desc": "settings for locking, unlocking, and reclaiming ARC-58 escrows" }, "updateGuildProposalSettings": { "keyType": "AVMString", "valueType": "GuildProposalSettings", "key": "dXBkYXRlX2d1aWxkX3Bz", "desc": "settings for changing the Guild itself" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "plugins": { "keyType": "GuildPluginKey", "valueType": "GuildProposalSettings", "desc": "execution-proposal settings attached to installed ARC-58 plugins", "prefix": "Zw==" }, "proposals": { "keyType": "uint64", "valueType": "GuildProposal", "desc": "proposals keyed by proposal ID", "prefix": "bA==" }, "executions": { "keyType": "AVMBytes", "valueType": "GuildExecutionMetadata", "desc": "proposal metadata keyed by ARC-58 execution key", "prefix": "eA==" }, "consensusActions": { "keyType": "uint64", "valueType": "GuildProposalSettings", "desc": "proposal settings keyed by opaque consensus action code; codes without settings use updateGuild", "prefix": "Yw==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1894, 2159, 2341, 2549, 3496, 3826, 5138, 5588, 5637, 6921, 7048, 10340], "errorMessage": "Box must have value" }, { "pc": [2678, 3069, 3265, 4483, 4543, 5722, 5918, 6297, 8009, 9062, 9445, 9508, 9564, 9615, 9661, 10315], "errorMessage": "Bytes has valid prefix" }, { "pc": [3644, 3665, 3698, 4291, 4957, 5125, 5209, 5272, 5301, 5364, 5635, 6627, 6919, 7211, 7322, 7667, 7836, 8420, 9144], "errorMessage": "ERR:errGacn" }, { "pc": [2528], "errorMessage": "ERR:errGact" }, { "pc": [7783], "errorMessage": "ERR:errGadm" }, { "pc": [6854], "errorMessage": "ERR:errGcac" }, { "pc": [945], "errorMessage": "ERR:errGcns" }, { "pc": [2408, 3436, 5419, 5815], "errorMessage": "ERR:errGcrt" }, { "pc": [5801], "errorMessage": "ERR:errGdrf" }, { "pc": [915, 5095], "errorMessage": "ERR:errGfac" }, { "pc": [7133], "errorMessage": "ERR:errGlko" }, { "pc": [977, 1463, 7223, 7699], "errorMessage": "ERR:errGmax" }, { "pc": [1249, 1666, 1922, 2190, 2222, 2589, 2932, 4982], "errorMessage": "ERR:errGpay" }, { "pc": [7361, 8436, 8990], "errorMessage": "ERR:errGplk" }, { "pc": [2334, 2885, 3015, 3162, 3393, 3489, 5586, 7905], "errorMessage": "ERR:errGprp" }, { "pc": [1881, 2146, 2389, 2538, 2897, 3028, 3205, 3417, 3508, 4928, 5160], "errorMessage": "ERR:errGpst" }, { "pc": [2624, 8095], "errorMessage": "ERR:errGpwr" }, { "pc": [926, 5105], "errorMessage": "ERR:errGver" }, { "pc": [953, 4829], "errorMessage": "ERR:errGwlf" }, { "pc": [5886, 5933], "errorMessage": "ERR:errGwlk" }, { "pc": [5872], "errorMessage": "ERR:errGwlr" }, { "pc": [9333], "errorMessage": "ERR:errGwst" }, { "pc": [1258, 1311, 3216, 3280, 6097, 6108], "errorMessage": "account funded" }, { "pc": [1268, 2690, 2942, 4715, 5970, 9347], "errorMessage": "application exists" }, { "pc": [1264, 1626, 1705, 1973, 2273, 2448, 2509, 2650, 2771, 2938, 3034, 3222, 3758, 3861, 3869, 4337, 4396, 4447, 4510, 4588, 4711, 4834, 4840, 4880, 4918, 5014, 5080, 5398, 5409, 5430, 5437, 5695, 5741, 5748, 5765, 5782, 5808, 5825, 5880, 5938, 5967, 6152, 6264, 6476, 6503, 6530, 6543, 6563, 6576, 6589, 6602, 6622, 6945, 6960, 6978, 7045, 7059, 7216, 7297, 7355, 7939, 7969, 8024, 8180, 8430, 8653, 8768, 8880, 8984, 9023, 9230, 9276, 9338, 9475, 9527, 9584, 9634, 10243, 10254, 10286, 10346], "errorMessage": "check GlobalState exists" }, { "pc": [3312, 5336], "errorMessage": "index access is out of bounds" }, { "pc": [1911, 2179, 2345, 2354, 2378, 2398, 2414, 2572, 2795, 2805, 2810, 2815, 2888, 3019, 3085, 3092, 3098, 3103, 3166, 3176, 3397, 3407, 3426, 3442, 3446, 3499, 3514, 3541, 3545, 3580, 3601, 3844, 5029, 5034, 5151, 5181, 5200, 5221, 5377, 6171, 7099, 7909, 7915, 8158], "errorMessage": "index out of bounds" }, { "pc": [1551, 1808, 2073, 5506], "errorMessage": "invalid array encoding" }, { "pc": [857, 1160, 1200, 1342, 1522, 1578, 1603, 1779, 1835, 1860, 2044, 2100, 2125, 2493, 2864, 3135, 3676, 5065, 5320, 5477, 5533, 6199, 7204, 7244, 8761, 9085, 9749], "errorMessage": "invalid array length header" }, { "pc": [5924], "errorMessage": "invalid number of bytes for account" }, { "pc": [3147], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [864, 1167, 1207, 1349, 1610, 1867, 2132, 2500, 2870, 5072], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1597, 1854, 2119, 5552], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/guilds/core/types.ts::GuildProposalAction>" }, { "pc": [878, 1361, 5621, 5679], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1515, 1772, 2037], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [886, 896, 1409, 1443, 1760, 2025, 2318, 2486, 2843, 2998, 3125, 3376, 3469, 5570, 5602, 5651, 5669], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1382, 2855], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [9569], "errorMessage": "invalid number of bytes for bool" }, { "pc": [4548], "errorMessage": "invalid number of bytes for smart_contracts/arc58/account/types.ts::EscrowInfo" }, { "pc": [9090], "errorMessage": "invalid number of bytes for smart_contracts/arc58/account/types.ts::PluginKey" }, { "pc": [907], "errorMessage": "invalid number of bytes for smart_contracts/arc58/guilds/core/types.ts::GuildBaseConfig" }, { "pc": [10321], "errorMessage": "invalid number of bytes for smart_contracts/arc58/guilds/core/types.ts::GuildConsensusBallot" }, { "pc": [3075], "errorMessage": "invalid number of bytes for smart_contracts/arc58/guilds/core/types.ts::GuildConsensusResult" }, { "pc": [1391, 1419], "errorMessage": "invalid number of bytes for smart_contracts/arc58/guilds/core/types.ts::GuildProposalSettings" }, { "pc": [2683, 3269, 4487, 5727, 6302, 8014, 9450, 9513, 9620, 9666], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1574, 1831, 2096, 5529], "errorMessage": "invalid tail pointer at index 1 of (uint8,(len+uint8[]))" }, { "pc": [9074], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+utf8[]))" }, { "pc": [1559, 1816, 2081, 5514], "errorMessage": "invalid tail pointer for (len+(uint8,(len+uint8[]))[])" }, { "pc": [1569, 1826, 2091, 5524, 9069], "errorMessage": "invalid tuple encoding" }, { "pc": [1191, 1506, 2017, 2834], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiA4IDQwMCAyMjUwMCAyMjEwMCA0ODkgNTA0IDUwNSA1MDYgNTA3IDI2OTAwCiAgICBieXRlY2Jsb2NrIDB4MTUxZjdjNzUgMHgwMCAid2FsbGV0IiAicmVzZXJ2ZWQiICJFUlI6ZXJyR2FjbiIgImwiICJjb25zZW5zdXMiICJzdGF0ZSIgIkVSUjplcnJHcHN0IiAweDI4IDB4MTQgMHgwYSAiRVJSOmVyckdwYXkiICJFUlI6ZXJyR3BycCIgMHgzMiAicGx1Z2luc19sb2NrZWQiICJ1cGRhdGVfZ3VpbGRfcHMiICJ4IiAweDE1IDB4MTYgMHgwMDBhICJnIiAiY3JlYXRvciIgImFkZF9wbHVnaW5fcHMiICJ3YWxsZXRfZmFjdG9yeSIgMHgxZSAweDFmIDB4MjkgMHg1YiAiRVJSOmVyckdtYXgiICJwcm9wb3NhbF9hY3Rpb25fbGltaXQiICJjIiAiRVJSOmVyckdjcnQiIDB4MDAwMCAweDNjIDB4NDYgMHg0NyAweDQ4IDB4NTMgMHg1NCAweDVhICJwcm9wb3NhbF9pZCIgInVwZ3JhZGVfYXBwX3BzIiAicmVtb3ZlX2V4ZWN1dGlvbl9wcyIgInJlbW92ZV9wbHVnaW5fcHMiICJhZGRfYWxsb3dhbmNlc19wcyIgInJlbW92ZV9hbGxvd2FuY2VzX3BzIiAibmV3X2VzY3Jvd19wcyIgInRvZ2dsZV9lc2Nyb3dfcHMiIDB4NTAgIkVSUjplcnJHcGxrIiAweDkyYmI3NjllIDB4NmY5Mzc4ZTMgIkVSUjplcnJHZmFjIiAiRVJSOmVyckd2ZXIiICJFUlI6ZXJyR3dsZiIgInZlcnNpb24iICJFUlI6ZXJyR3B3ciIgMHhkM2QyOTY0MyAweGJmNGQ3YzU3ICJFUlI6ZXJyR3dsayIgMHgwMDVmCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHN0YXRlID0gR2xvYmFsU3RhdGU8R3VpbGRTdGF0ZT4oeyBpbml0aWFsVmFsdWU6IEd1aWxkU3RhdGVEcmFmdCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5U3RhdGUgfSkKICAgIGJ5dGVjIDcgLy8gInN0YXRlIgogICAgYnl0ZWNfMSAvLyAweDAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBwcm9wb3NhbElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UHJvcG9zYWxJRCB9KQogICAgYnl0ZWMgNDEgLy8gInByb3Bvc2FsX2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODEKICAgIC8vIHBsdWdpblNldExvY2tlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UGx1Z2luU2V0TG9ja2VkIH0pCiAgICBieXRlYyAxNSAvLyAicGx1Z2luc19sb2NrZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTYwLTE2MQogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMsIHN0YXRlVG90YWxzOiB7IGdsb2JhbEJ5dGVzOiBHdWlsZE51bUdsb2JhbEJ5dGVzLCBnbG9iYWxVaW50czogR3VpbGROdW1HbG9iYWxVaW50cyB9IH0pCiAgICAvLyBleHBvcnQgY2xhc3MgR3VpbGQgZXh0ZW5kcyBDb250cmFjdCBpbXBsZW1lbnRzIEd1aWxkRmFjdG9yeUNyZWF0ZUludGVyZmFjZSB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDQKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTYwLTE2MQogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMsIHN0YXRlVG90YWxzOiB7IGdsb2JhbEJ5dGVzOiBHdWlsZE51bUdsb2JhbEJ5dGVzLCBnbG9iYWxVaW50czogR3VpbGROdW1HbG9iYWxVaW50cyB9IH0pCiAgICAvLyBleHBvcnQgY2xhc3MgR3VpbGQgZXh0ZW5kcyBDb250cmFjdCBpbXBsZW1lbnRzIEd1aWxkRmFjdG9yeUNyZWF0ZUludGVyZmFjZSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDM5CiAgICBwdXNoYnl0ZXNzIDB4OTc4ODFlMjEgMHg1MDgxZjc5MyAweGY4ZTE0MGFhIDB4Y2U3MzE0N2IgMHgyMzZjYjFiYiAweDc4YjY0M2U4IDB4NDA5ODhjYjkgMHg1M2M0NzU2NiAweGZkMmM5M2NkIDB4MzQ5NTc4MWEgMHhkMDQ2ZmI3MSAweDg4MDk1MGY5IDB4MjhmODAxNTQgMHhhOWUxZjU3YiAweDM3Njk5ODlmIDB4NjJjZTliNWIgMHhiNTdhMWVjZCAweGJmYjUyNDhmIDB4ZjFmZjI4YWEgMHhiYzBkNThhNyAweDk2OTlkMTA4IDB4OGZlYWRhZGIgMHhmZTAyMjdjOSAvLyBtZXRob2QgImNvbnNlbnN1c0NvbmZpZ3VyYXRpb25NYnIoYnl0ZVtdKXVpbnQ2NCIsIG1ldGhvZCAiY29uZmlndXJlQ29uc2Vuc3VzKHBheSxieXRlW10pdm9pZCIsIG1ldGhvZCAic2V0dXAoc3RyaW5nLGJ5dGVbMzJdKXVpbnQ2NCIsIG1ldGhvZCAic2V0UHJvcG9zYWxTZXR0aW5ncyh1aW50OCwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpKXZvaWQiLCBtZXRob2QgInNldENvbnNlbnN1c0FjdGlvblNldHRpbmdzKHVpbnQ2NCwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpKXZvaWQiLCBtZXRob2QgInNldFByb3Bvc2FsQWN0aW9uTGltaXQodWludDY0KXZvaWQiLCBtZXRob2QgImxvY2tQbHVnaW5TZXQoKXZvaWQiLCBtZXRob2QgInBhcnRpYWxseUluaXRpYWxpemUoKXZvaWQiLCBtZXRob2QgImluaXRpYWxpemUoKXZvaWQiLCBtZXRob2QgIm5ld1Byb3Bvc2FsKHBheSxieXRlWzM2XSwodWludDgsYnl0ZVtdKVtdLGJ5dGVbXSl1aW50NjQiLCBtZXRob2QgImVkaXRQcm9wb3NhbCh1aW50NjQsYnl0ZVszNl0sKHVpbnQ4LGJ5dGVbXSlbXSxieXRlW10pdm9pZCIsIG1ldGhvZCAiZWRpdFByb3Bvc2FsV2l0aFBheW1lbnQocGF5LHVpbnQ2NCxieXRlWzM2XSwodWludDgsYnl0ZVtdKVtdLGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVQcm9wb3NhbCh1aW50NjQpdm9pZCIsIG1ldGhvZCAic3VibWl0UHJvcG9zYWwodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJ2b3RlUHJvcG9zYWwocGF5LHVpbnQ2NCx1aW50OCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZmluYWxpemVQcm9wb3NhbCh1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzKHVpbnQ2NCxhZGRyZXNzW10pdWludDY0IiwgbWV0aG9kICJjYW5jZWxQcm9wb3NhbCh1aW50NjQpdm9pZCIsIG1ldGhvZCAiZXhlY3V0ZVByb3Bvc2FsKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzd2VlcCgpdWludDY0IiwgbWV0aG9kICJzZXR1cENvc3QoKXVpbnQ2NCIsIG1ldGhvZCAicHJvcG9zYWxDb3N0KCh1aW50OCxieXRlW10pW10pKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRQcm9wb3NhbCh1aW50NjQpKHVpbnQ4LGJ5dGVbMzZdLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsKHVpbnQ4LGJ5dGVbXSlbXSkiCiAgICBieXRlYyA1MSAvLyBtZXRob2QgImdldEJhbGxvdCh1aW50NjQpKGJvb2wsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCwodWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCkpIgogICAgcHVzaGJ5dGVzcyAweGRiYmVjNmQyIDB4OTU3Yzc1MmUgMHg4YjVmODZlMCAvLyBtZXRob2QgIm11c3RHZXRFeGVjdXRpb24oYnl0ZVszMl0pKHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncyh1aW50NjQpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAidm90ZUNvc3QodWludDY0LGFkZHJlc3MpdWludDY0IgogICAgYnl0ZWMgNTIgLy8gbWV0aG9kICJ2b3RlTWJyKCl1aW50NjQiCiAgICBwdXNoYnl0ZXNzIDB4ZjFjMDhlNmEgMHgyN2FkZjkxZiAweDg1NGRlZGUwIC8vIG1ldGhvZCAic3dlZXBhYmxlKCl1aW50NjQiLCBtZXRob2QgImNhbkNoYW5nZVBsdWdpblNldCgpYm9vbCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNvbnNlbnN1c0NvbmZpZ3VyYXRpb25NYnIgY29uZmlndXJlQ29uc2Vuc3VzIHNldHVwIHNldFByb3Bvc2FsU2V0dGluZ3Mgc2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3Mgc2V0UHJvcG9zYWxBY3Rpb25MaW1pdCBsb2NrUGx1Z2luU2V0IHBhcnRpYWxseUluaXRpYWxpemUgaW5pdGlhbGl6ZSBuZXdQcm9wb3NhbCBlZGl0UHJvcG9zYWwgZWRpdFByb3Bvc2FsV2l0aFBheW1lbnQgZGVsZXRlUHJvcG9zYWwgc3VibWl0UHJvcG9zYWwgdm90ZVByb3Bvc2FsIGZpbmFsaXplUHJvcG9zYWwgY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzIGNhbmNlbFByb3Bvc2FsIGV4ZWN1dGVQcm9wb3NhbCBzd2VlcCBzZXR1cENvc3QgcHJvcG9zYWxDb3N0IGdldFByb3Bvc2FsIGdldEJhbGxvdCBtdXN0R2V0RXhlY3V0aW9uIGdldENvbnNlbnN1c0FjdGlvblNldHRpbmdzIHZvdGVDb3N0IHZvdGVNYnIgc3dlZXBhYmxlIGNhbkNoYW5nZVBsdWdpblNldCBtYWluX29wVXBfcm91dGVAMzcKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUzNgogICAgLy8gb3BVcCgpOiB2b2lkIHt9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTYwLTE2MQogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMsIHN0YXRlVG90YWxzOiB7IGdsb2JhbEJ5dGVzOiBHdWlsZE51bUdsb2JhbEJ5dGVzLCBnbG9iYWxVaW50czogR3VpbGROdW1HbG9iYWxVaW50cyB9IH0pCiAgICAvLyBleHBvcnQgY2xhc3MgR3VpbGQgZXh0ZW5kcyBDb250cmFjdCBpbXBsZW1lbnRzIEd1aWxkRmFjdG9yeUNyZWF0ZUludGVyZmFjZSB7CiAgICBwdXNoYnl0ZXMgMHgwNmNiMmU1NCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsYWRkcmVzcyx1aW50NjQsdWludDY0LCh1aW50NjQsKCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpKSkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM1NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBfcHV5YV9saWIuYXJjNC5keW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50KGFycmF5OiBieXRlcywgaW5kZXg6IHVpbnQ2NCkgLT4gYnl0ZXM6CmR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQ6CiAgICBwcm90byAyIDEKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMiAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgc3dhcAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAyCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgICoKICAgIGRpZyA1CiAgICBzd2FwCiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIC0KICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxOQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0NDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS90eXBlcy50czo6R3VpbGRCYXNlQ29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMjcKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyR3VpbGRGYWN0b3J5T25seSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1MyAvLyAiRVJSOmVyckdmYWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2ZhYwoKY3JlYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyBsb2dnZWRBc3NlcnQodmVyc2lvbiAhPT0gJycsIGVyckd1aWxkSW52YWxpZFZlcnNpb24pCiAgICBkaWcgMgogICAgcHVzaGJ5dGVzICIiCiAgICAhPQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTQgLy8gIkVSUjplcnJHdmVyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckd2ZXIKCmNyZWF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGNvbnNlbnN1cy5pZCA+IDAsIGVyckd1aWxkSW52YWxpZENvbnNlbnN1cykKICAgIGRpZyAxCiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJHY25zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdjbnMKCmNyZWF0ZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHdhbGxldEZhY3RvcnkuaWQgPiAwLCBlcnJHdWlsZEludmFsaWRXYWxsZXRGYWN0b3J5KQogICAgZGlnIDMKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDU1IC8vICJFUlI6ZXJyR3dsZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHd2xmCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIGNvbmZpZy5wcm9wb3NhbEFjdGlvbkxpbWl0ID4gMCAmJiBjb25maWcucHJvcG9zYWxBY3Rpb25MaW1pdCA8PSBNQVhfR1VJTERfUFJPUE9TQUxfQUNUSU9OUywKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDEyCiAgICBkaWcgMgogICAgcHVzaGludCAxMgogICAgPD0KICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDEyCiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlX2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMzEtMjM0CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGNvbmZpZy5wcm9wb3NhbEFjdGlvbkxpbWl0ID4gMCAmJiBjb25maWcucHJvcG9zYWxBY3Rpb25MaW1pdCA8PSBNQVhfR1VJTERfUFJPUE9TQUxfQUNUSU9OUywKICAgIC8vICAgZXJyR3VpbGRUb29NYW55QWN0aW9ucywKICAgIC8vICkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyAyOSAvLyAiRVJSOmVyckdtYXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR21heAoKY3JlYXRlX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gY29uc2Vuc3VzID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5Q29uc2Vuc3VzIH0pCiAgICBieXRlYyA2IC8vICJjb25zZW5zdXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMzYKICAgIC8vIHRoaXMuY29uc2Vuc3VzLnZhbHVlID0gY29uc2Vuc3VzCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMzcKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy51cGdyYWRlQXBwKQogICAgaW50Y18zIC8vIDgKICAgIHB1c2hpbnQgNDMyCiAgICBleHRyYWN0MwogICAgZHVwCiAgICBleHRyYWN0IDAgNDgKICAgIGR1cAogICAgY2FsbHN1YiB2YWxpZGF0ZVNldHRpbmdzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIzNy0yMzgKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy51cGdyYWRlQXBwKQogICAgLy8gdGhpcy52YWxpZGF0ZVNldHRpbmdzKGNvbmZpZy5wcm9wb3NhbFNldHRpbmdzLmFkZFBsdWdpbikKICAgIGRpZyAxCiAgICBleHRyYWN0IDQ4IDQ4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMzgKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy5hZGRQbHVnaW4pCiAgICBkdXAKICAgIGNhbGxzdWIgdmFsaWRhdGVTZXR0aW5ncwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy5yZW1vdmVFeGVjdXRpb24pCiAgICBkaWcgMgogICAgZXh0cmFjdCA5NiA0OAogICAgZHVwCiAgICBjYWxsc3ViIHZhbGlkYXRlU2V0dGluZ3MKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjQwCiAgICAvLyB0aGlzLnZhbGlkYXRlU2V0dGluZ3MoY29uZmlnLnByb3Bvc2FsU2V0dGluZ3MucmVtb3ZlUGx1Z2luKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMTQ0IDQ4CiAgICBkdXAKICAgIGNhbGxzdWIgdmFsaWRhdGVTZXR0aW5ncwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy5hZGRBbGxvd2FuY2VzKQogICAgZGlnIDQKICAgIGV4dHJhY3QgMTkyIDQ4CiAgICBkdXAKICAgIGNhbGxzdWIgdmFsaWRhdGVTZXR0aW5ncwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNDIKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy5yZW1vdmVBbGxvd2FuY2VzKQogICAgZGlnIDUKICAgIGV4dHJhY3QgMjQwIDQ4CiAgICBkdXAKICAgIGNhbGxzdWIgdmFsaWRhdGVTZXR0aW5ncwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNDMKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy5uZXdFc2Nyb3cpCiAgICBkaWcgNgogICAgcHVzaGludHMgMjg4IDQ4CiAgICBleHRyYWN0MwogICAgZHVwCiAgICBjYWxsc3ViIHZhbGlkYXRlU2V0dGluZ3MKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjQ0CiAgICAvLyB0aGlzLnZhbGlkYXRlU2V0dGluZ3MoY29uZmlnLnByb3Bvc2FsU2V0dGluZ3MudG9nZ2xlRXNjcm93TG9jaykKICAgIGRpZyA3CiAgICBwdXNoaW50cyAzMzYgNDgKICAgIGV4dHJhY3QzCiAgICBkdXAKICAgIGNhbGxzdWIgdmFsaWRhdGVTZXR0aW5ncwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhjb25maWcucHJvcG9zYWxTZXR0aW5ncy51cGRhdGVHdWlsZCkKICAgIHVuY292ZXIgOAogICAgcHVzaGludHMgMzg0IDQ4CiAgICBleHRyYWN0MwogICAgZHVwCiAgICBjYWxsc3ViIHZhbGlkYXRlU2V0dGluZ3MKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA1NiAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI0NwogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gY3JlYXRvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5Q3JlYXRvciB9KQogICAgYnl0ZWMgMjIgLy8gImNyZWF0b3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIHRoaXMuY3JlYXRvci52YWx1ZSA9IGNyZWF0b3IKICAgIHVuY292ZXIgMTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIHByb3Bvc2FsQWN0aW9uTGltaXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UHJvcG9zYWxBY3Rpb25MaW1pdCB9KQogICAgYnl0ZWMgMzAgLy8gInByb3Bvc2FsX2FjdGlvbl9saW1pdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gdGhpcy5wcm9wb3NhbEFjdGlvbkxpbWl0LnZhbHVlID0gY29uZmlnLnByb3Bvc2FsQWN0aW9uTGltaXQKICAgIHVuY292ZXIgMTAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODgKICAgIC8vIHVwZ3JhZGVBcHBQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVVwZ3JhZGVBcHBQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0MiAvLyAidXBncmFkZV9hcHBfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNTAKICAgIC8vIHRoaXMudXBncmFkZUFwcFByb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShjb25maWcucHJvcG9zYWxTZXR0aW5ncy51cGdyYWRlQXBwKQogICAgdW5jb3ZlciA5CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBhZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUFkZFBsdWdpblByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDIzIC8vICJhZGRfcGx1Z2luX3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyB0aGlzLmFkZFBsdWdpblByb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShjb25maWcucHJvcG9zYWxTZXR0aW5ncy5hZGRQbHVnaW4pCiAgICB1bmNvdmVyIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxOTIKICAgIC8vIHJlbW92ZUV4ZWN1dGlvblByb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVtb3ZlRXhlY3V0aW9uUHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgNDMgLy8gInJlbW92ZV9leGVjdXRpb25fcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIHRoaXMucmVtb3ZlRXhlY3V0aW9uUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKGNvbmZpZy5wcm9wb3NhbFNldHRpbmdzLnJlbW92ZUV4ZWN1dGlvbikKICAgIHVuY292ZXIgNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gcmVtb3ZlUGx1Z2luUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZW1vdmVQbHVnaW5Qcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0NCAvLyAicmVtb3ZlX3BsdWdpbl9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gdGhpcy5yZW1vdmVQbHVnaW5Qcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoY29uZmlnLnByb3Bvc2FsU2V0dGluZ3MucmVtb3ZlUGx1Z2luKQogICAgdW5jb3ZlciA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyBhZGRBbGxvd2FuY2VzUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlBZGRBbGxvd2FuY2VzUHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgNDUgLy8gImFkZF9hbGxvd2FuY2VzX3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyB0aGlzLmFkZEFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoY29uZmlnLnByb3Bvc2FsU2V0dGluZ3MuYWRkQWxsb3dhbmNlcykKICAgIHVuY292ZXIgNQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gcmVtb3ZlQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVtb3ZlQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQ2IC8vICJyZW1vdmVfYWxsb3dhbmNlc19wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI1NQogICAgLy8gdGhpcy5yZW1vdmVBbGxvd2FuY2VzUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKGNvbmZpZy5wcm9wb3NhbFNldHRpbmdzLnJlbW92ZUFsbG93YW5jZXMpCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIG5ld0VzY3Jvd1Byb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5TmV3RXNjcm93UHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgNDcgLy8gIm5ld19lc2Nyb3dfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNTYKICAgIC8vIHRoaXMubmV3RXNjcm93UHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKGNvbmZpZy5wcm9wb3NhbFNldHRpbmdzLm5ld0VzY3JvdykKICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIwMgogICAgLy8gdG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5VG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQ4IC8vICJ0b2dnbGVfZXNjcm93X3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyB0aGlzLnRvZ2dsZUVzY3Jvd0xvY2tQcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoY29uZmlnLnByb3Bvc2FsU2V0dGluZ3MudG9nZ2xlRXNjcm93TG9jaykKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gdXBkYXRlR3VpbGRQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgMTYgLy8gInVwZGF0ZV9ndWlsZF9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI1OAogICAgLy8gdGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShjb25maWcucHJvcG9zYWxTZXR0aW5ncy51cGRhdGVHdWlsZCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHdhbGxldEZhY3RvcnkgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXRGYWN0b3J5IH0pCiAgICBieXRlYyAyNCAvLyAid2FsbGV0X2ZhY3RvcnkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNTkKICAgIC8vIHRoaXMud2FsbGV0RmFjdG9yeS52YWx1ZSA9IHdhbGxldEZhY3RvcnkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTkKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjcmVhdGVfYm9vbF9mYWxzZUAxMjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNvbnNlbnN1c0NvbmZpZ3VyYXRpb25NYnJbcm91dGluZ10oKSAtPiB2b2lkOgpjb25zZW5zdXNDb25maWd1cmF0aW9uTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5jb25zZW5zdXNDb25maWd1cmF0aW9uTWJyCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNvbmZpZ3VyZUNvbnNlbnN1c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNvbmZpZ3VyZUNvbnNlbnN1czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg2MAogICAgLy8gY29uZmlndXJlQ29uc2Vuc3VzKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgY29uZmlnOiBieXRlcyk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NjEKICAgIC8vIHRoaXMucmVxdWlyZUNyZWF0b3JEcmFmdCgpCiAgICBjYWxsc3ViIHJlcXVpcmVDcmVhdG9yRHJhZnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg2MgogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy5jb25zZW5zdXNDb25maWd1cmF0aW9uTWJyKGNvbmZpZykKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNvbnNlbnN1c0NvbmZpZ3VyYXRpb25NYnIKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODY0LTg2OAogICAgLy8gbWF0Y2gobWJyUGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50LAogICAgLy8gfSksCiAgICBkaWcgMQogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NjUKICAgIC8vIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg2NC04NjgKICAgIC8vIG1hdGNoKG1iclBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vIH0pLAogICAgPT0KICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODY0LTg2OAogICAgLy8gbWF0Y2gobWJyUGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50LAogICAgLy8gfSksCiAgICA9PQogICAgJiYKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICB1bmNvdmVyIDIKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODYzLTg3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaChtYnJQYXltZW50LCB7CiAgICAvLyAgICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgIH0pLAogICAgLy8gICBlcnJHdWlsZEludmFsaWRQYXltZW50LAogICAgLy8gKQogICAgYm56IGNvbmZpZ3VyZUNvbnNlbnN1c19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJHcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwYXkKCmNvbmZpZ3VyZUNvbnNlbnN1c19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg3MQogICAgLy8gY29uc3QgYmVmb3JlID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODcyLTg3NQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5jb25maWd1cmU+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLCBjb25maWddLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg3NAogICAgLy8gYXJnczogW2l0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiB0aGlzLmNvbnNlbnN1cy52YWx1ZS5hZGRyZXNzLCBhbW91bnQsIGZlZTogMCB9KSwgY29uZmlnXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLCBjb25maWddLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NzItODc1CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLmNvbmZpZ3VyZT4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5jb25zZW5zdXMudmFsdWUuYWRkcmVzcywgYW1vdW50LCBmZWU6IDAgfSksIGNvbmZpZ10sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDhiZmY4Mzg3IC8vIG1ldGhvZCAiY29uZmlndXJlKHBheSxieXRlW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODc3CiAgICAvLyBjb25zdCBhZnRlciA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODc4CiAgICAvLyB0aGlzLnJlZnVuZChUeG4uc2VuZGVyLCBhZnRlciArIGFtb3VudCA+IGJlZm9yZSA/IGFmdGVyICsgYW1vdW50IC0gYmVmb3JlIDogMCkKICAgIHR4biBTZW5kZXIKICAgIGNvdmVyIDMKICAgICsKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA+CiAgICBieiBjb25maWd1cmVDb25zZW5zdXNfdGVybmFyeV9mYWxzZUA3CiAgICB1bmNvdmVyIDIKICAgIC0KCmNvbmZpZ3VyZUNvbnNlbnN1c190ZXJuYXJ5X21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NzgKICAgIC8vIHRoaXMucmVmdW5kKFR4bi5zZW5kZXIsIGFmdGVyICsgYW1vdW50ID4gYmVmb3JlID8gYWZ0ZXIgKyBhbW91bnQgLSBiZWZvcmUgOiAwKQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg2MAogICAgLy8gY29uZmlndXJlQ29uc2Vuc3VzKG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgY29uZmlnOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY29uZmlndXJlQ29uc2Vuc3VzX3Rlcm5hcnlfZmFsc2VANzoKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NzgKICAgIC8vIHRoaXMucmVmdW5kKFR4bi5zZW5kZXIsIGFmdGVyICsgYW1vdW50ID4gYmVmb3JlID8gYWZ0ZXIgKyBhbW91bnQgLSBiZWZvcmUgOiAwKQogICAgaW50Y18wIC8vIDAKICAgIGIgY29uZmlndXJlQ29uc2Vuc3VzX3Rlcm5hcnlfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXR1cFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldHVwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBzZXR1cChuaWNrbmFtZTogc3RyaW5nLCBzYWx0OiBieXRlczwzMj4pOiB1aW50NjQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg4MwogICAgLy8gdGhpcy5yZXF1aXJlQ3JlYXRvckRyYWZ0KCkKICAgIGNhbGxzdWIgcmVxdWlyZUNyZWF0b3JEcmFmdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODg0CiAgICAvLyByZXR1cm4gdGhpcy5jcmVhdGVXYWxsZXQobmlja25hbWUsIHNhbHQpCiAgICBjYWxsc3ViIGNyZWF0ZVdhbGxldAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBzZXR1cChuaWNrbmFtZTogc3RyaW5nLCBzYWx0OiBieXRlczwzMj4pOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXRQcm9wb3NhbFNldHRpbmdzW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UHJvcG9zYWxTZXR0aW5nczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg4OAogICAgLy8gc2V0UHJvcG9zYWxTZXR0aW5ncyhhY3Rpb25UeXBlOiBHdWlsZEFjdGlvblR5cGUsIHNldHRpbmdzOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS90eXBlcy50czo6R3VpbGRQcm9wb3NhbFNldHRpbmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4ODkKICAgIC8vIHRoaXMucmVxdWlyZUNyZWF0b3JEcmFmdCgpCiAgICBjYWxsc3ViIHJlcXVpcmVDcmVhdG9yRHJhZnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg5MAogICAgLy8gdGhpcy5zZXRTZXR0aW5nc0ZvckFjdGlvbihhY3Rpb25UeXBlLCBzZXR0aW5ncywgMCkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHNldFNldHRpbmdzRm9yQWN0aW9uCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg4OAogICAgLy8gc2V0UHJvcG9zYWxTZXR0aW5ncyhhY3Rpb25UeXBlOiBHdWlsZEFjdGlvblR5cGUsIHNldHRpbmdzOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuc2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3Nbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5nczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg5NAogICAgLy8gc2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3MoY29kZTogdWludDY0LCBzZXR0aW5nczogR3VpbGRQcm9wb3NhbFNldHRpbmdzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0OAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL3R5cGVzLnRzOjpHdWlsZFByb3Bvc2FsU2V0dGluZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg5NQogICAgLy8gdGhpcy5yZXF1aXJlQ3JlYXRvckRyYWZ0KCkKICAgIGNhbGxzdWIgcmVxdWlyZUNyZWF0b3JEcmFmdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyB0aGlzLnZhbGlkYXRlU2V0dGluZ3Moc2V0dGluZ3MpCiAgICBjYWxsc3ViIHZhbGlkYXRlU2V0dGluZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg5NwogICAgLy8gdGhpcy5jb25zZW5zdXNBY3Rpb25zKGNvZGUpLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICBzd2FwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIGNvbnNlbnN1c0FjdGlvbnMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeENvbnNlbnN1c0FjdGlvbnMgfSkKICAgIGJ5dGVjIDMxIC8vICJjIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4OTcKICAgIC8vIHRoaXMuY29uc2Vuc3VzQWN0aW9ucyhjb2RlKS52YWx1ZSA9IGNsb25lKHNldHRpbmdzKQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODk0CiAgICAvLyBzZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncyhjb2RlOiB1aW50NjQsIHNldHRpbmdzOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuc2V0UHJvcG9zYWxBY3Rpb25MaW1pdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldFByb3Bvc2FsQWN0aW9uTGltaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MDEKICAgIC8vIHNldFByb3Bvc2FsQWN0aW9uTGltaXQobGltaXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MDIKICAgIC8vIHRoaXMucmVxdWlyZUNyZWF0b3JEcmFmdCgpCiAgICBjYWxsc3ViIHJlcXVpcmVDcmVhdG9yRHJhZnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGxpbWl0ID4gMCAmJiBsaW1pdCA8PSBNQVhfR1VJTERfUFJPUE9TQUxfQUNUSU9OUywgZXJyR3VpbGRUb29NYW55QWN0aW9ucykKICAgIGJ6IHNldFByb3Bvc2FsQWN0aW9uTGltaXRfYm9vbF9mYWxzZUA0CiAgICBkdXAKICAgIHB1c2hpbnQgMTIKICAgIDw9CiAgICBieiBzZXRQcm9wb3NhbEFjdGlvbkxpbWl0X2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCnNldFByb3Bvc2FsQWN0aW9uTGltaXRfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTAzCiAgICAvLyBsb2dnZWRBc3NlcnQobGltaXQgPiAwICYmIGxpbWl0IDw9IE1BWF9HVUlMRF9QUk9QT1NBTF9BQ1RJT05TLCBlcnJHdWlsZFRvb01hbnlBY3Rpb25zKQogICAgYm56IHNldFByb3Bvc2FsQWN0aW9uTGltaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDI5IC8vICJFUlI6ZXJyR21heCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHbWF4CgpzZXRQcm9wb3NhbEFjdGlvbkxpbWl0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBwcm9wb3NhbEFjdGlvbkxpbWl0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVByb3Bvc2FsQWN0aW9uTGltaXQgfSkKICAgIGJ5dGVjIDMwIC8vICJwcm9wb3NhbF9hY3Rpb25fbGltaXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MDQKICAgIC8vIHRoaXMucHJvcG9zYWxBY3Rpb25MaW1pdC52YWx1ZSA9IGxpbWl0CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBzZXRQcm9wb3NhbEFjdGlvbkxpbWl0KGxpbWl0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldFByb3Bvc2FsQWN0aW9uTGltaXRfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgc2V0UHJvcG9zYWxBY3Rpb25MaW1pdF9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQubG9ja1BsdWdpblNldFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvY2tQbHVnaW5TZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIHRoaXMucmVxdWlyZUNyZWF0b3JEcmFmdCgpCiAgICBjYWxsc3ViIHJlcXVpcmVDcmVhdG9yRHJhZnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gcGx1Z2luU2V0TG9ja2VkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlQbHVnaW5TZXRMb2NrZWQgfSkKICAgIGJ5dGVjIDE1IC8vICJwbHVnaW5zX2xvY2tlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkxMAogICAgLy8gdGhpcy5wbHVnaW5TZXRMb2NrZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkwOAogICAgLy8gbG9ja1BsdWdpblNldCgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucGFydGlhbGx5SW5pdGlhbGl6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnBhcnRpYWxseUluaXRpYWxpemU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MTUKICAgIC8vIHRoaXMuYWN0aXZhdGUodHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGFjdGl2YXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MTQKICAgIC8vIHBhcnRpYWxseUluaXRpYWxpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmluaXRpYWxpemVbcm91dGluZ10oKSAtPiB2b2lkOgppbml0aWFsaXplOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTIwCiAgICAvLyB0aGlzLmFjdGl2YXRlKGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgYWN0aXZhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkxOQogICAgLy8gaW5pdGlhbGl6ZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQubmV3UHJvcG9zYWxbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdQcm9wb3NhbDoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkyNgogICAgLy8gbmV3UHJvcG9zYWwocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBjaWQ6IENJRCwgYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdLCBldmlkZW5jZTogYnl0ZXMpOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzNgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzY+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyAyCiAgICAqCiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIGludGNfMCAvLyAwCgpuZXdQcm9wb3NhbF9mb3JfaGVhZGVyQDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MjYKICAgIC8vIG5ld1Byb3Bvc2FsKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgY2lkOiBDSUQsIGFjdGlvbnM6IEd1aWxkUHJvcG9zYWxBY3Rpb25bXSwgZXZpZGVuY2U6IGJ5dGVzKTogdWludDY0IHsKICAgIGR1cAogICAgZGlnIDUKICAgIDwKICAgIGJ6IG5ld1Byb3Bvc2FsX2FmdGVyX2ZvckA0CiAgICBkdXAKICAgIGludGNfMiAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGVuY29kaW5nCiAgICBkdXAKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGZvciAobGVuKyh1aW50OCwobGVuK3VpbnQ4W10pKVtdKQogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKHVpbnQ4LChsZW4rdWludDhbXSkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA1CiAgICArCiAgICArCiAgICBjb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBuZXdQcm9wb3NhbF9mb3JfaGVhZGVyQDEKCm5ld1Byb3Bvc2FsX2FmdGVyX2ZvckA0OgogICAgcG9wbiAyCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTI2CiAgICAvLyBuZXdQcm9wb3NhbChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGNpZDogQ0lELCBhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10sIGV2aWRlbmNlOiBieXRlcyk6IHVpbnQ2NCB7CiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS90eXBlcy50czo6R3VpbGRQcm9wb3NhbEFjdGlvbj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gY29uc3QgY29zdCA9IHRoaXMucHJvcG9zYWxDb3N0KGFjdGlvbnMpCiAgICBkdXAKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdAogICAgYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MjgKICAgIC8vIGNvbnN0IGJvb3RzdHJhcCA9IHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc3RhdGUgPSBHbG9iYWxTdGF0ZTxHdWlsZFN0YXRlPih7IGluaXRpYWxWYWx1ZTogR3VpbGRTdGF0ZURyYWZ0LCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlTdGF0ZSB9KQogICAgYnl0ZWMgNyAvLyAic3RhdGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MjgKICAgIC8vIGNvbnN0IGJvb3RzdHJhcCA9IHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgPT0KICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyBjb25zdCBmZWU6IHVpbnQ2NCA9IGJvb3RzdHJhcCA/IDAgOiBjb3N0LnRvdGFsCiAgICBieiBuZXdQcm9wb3NhbF90ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDYKCm5ld1Byb3Bvc2FsX3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkzMS05MzUKICAgIC8vIG1hdGNoKHBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogZmVlLAogICAgLy8gfSksCiAgICBkaWcgNAogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkzMgogICAgLy8gc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTMxLTkzNQogICAgLy8gbWF0Y2gocGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBmZWUsCiAgICAvLyB9KSwKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkzMS05MzUKICAgIC8vIG1hdGNoKHBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogZmVlLAogICAgLy8gfSksCiAgICA9PQogICAgJiYKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDcKICAgID09CiAgICAmJgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTMwLTkzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBtYXRjaChwYXltZW50LCB7CiAgICAvLyAgICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZSwKICAgIC8vICAgfSksCiAgICAvLyAgIGVyckd1aWxkSW52YWxpZFBheW1lbnQsCiAgICAvLyApCiAgICBibnogbmV3UHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckdwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BheQoKbmV3UHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyB0aGlzLnZhbGlkYXRlQWN0aW9ucyhhY3Rpb25zKQogICAgZGlnIDIKICAgIGNhbGxzdWIgdmFsaWRhdGVBY3Rpb25zCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkzOS05NDEKICAgIC8vIGNvbnN0IHByb3Bvc2VyUG93ZXI6IHVpbnQ2NCA9IGJvb3RzdHJhcAogICAgLy8gICA/IDAKICAgIC8vICAgOiB0aGlzLmdvdmVybmFuY2VQb3dlcihUeG4uc2VuZGVyLCBldmlkZW5jZSwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIGNvc3QuZHVyYXRpb24pCiAgICBkaWcgMQogICAgYnogbmV3UHJvcG9zYWxfdGVybmFyeV9mYWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTQwCiAgICAvLyA/IDAKICAgIGludGNfMCAvLyAwCgpuZXdQcm9wb3NhbF90ZXJuYXJ5X21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTQyCiAgICAvLyBjb25zdCBpZCA9IHRoaXMuY3JlYXRlT3JVcGRhdGVQcm9wb3NhbCgwLCBjaWQsIGFjdGlvbnMsIGZlZSwgY29zdC5wb3dlciwgcHJvcG9zZXJQb3dlcikKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDUKICAgIGRpZyA1CiAgICBkaWcgOQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgY3JlYXRlT3JVcGRhdGVQcm9wb3NhbAogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NDMKICAgIC8vIGlmICghYm9vdHN0cmFwKSB7CiAgICBzd2FwCiAgICBibnogbmV3UHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlICs9IHRoaXMuZHJhZnRSZXNlcnZlKGZlZSwgYWN0aW9ucykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIHJlc2VydmVkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVzZXJ2ZWQgfSkKICAgIGJ5dGVjXzMgLy8gInJlc2VydmVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlICs9IHRoaXMuZHJhZnRSZXNlcnZlKGZlZSwgYWN0aW9ucykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIHJldHVybiBmZWVzUGFpZCAtIHRoaXMucHJvcG9zYWxNYnIoYWN0aW9ucykKICAgIGRpZyAyCiAgICBjYWxsc3ViIHByb3Bvc2FsTWJyCiAgICBwb3AKICAgIGRpZyA2CiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NDQKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgKz0gdGhpcy5kcmFmdFJlc2VydmUoZmVlLCBhY3Rpb25zKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTg2CiAgICAvLyByZXNlcnZlZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVJlc2VydmVkIH0pCiAgICBieXRlY18zIC8vICJyZXNlcnZlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk0NAogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSArPSB0aGlzLmRyYWZ0UmVzZXJ2ZShmZWUsIGFjdGlvbnMpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbmV3UHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjkyNgogICAgLy8gbmV3UHJvcG9zYWwocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBjaWQ6IENJRCwgYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdLCBldmlkZW5jZTogYnl0ZXMpOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3UHJvcG9zYWxfdGVybmFyeV9mYWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk0MQogICAgLy8gOiB0aGlzLmdvdmVybmFuY2VQb3dlcihUeG4uc2VuZGVyLCBldmlkZW5jZSwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIGNvc3QuZHVyYXRpb24pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMgogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIGRpZyA4CiAgICBzd2FwCiAgICBjYWxsc3ViIGdvdmVybmFuY2VQb3dlcgogICAgYiBuZXdQcm9wb3NhbF90ZXJuYXJ5X21lcmdlQDEzCgpuZXdQcm9wb3NhbF90ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5MjkKICAgIC8vIGNvbnN0IGZlZTogdWludDY0ID0gYm9vdHN0cmFwID8gMCA6IGNvc3QudG90YWwKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIGIgbmV3UHJvcG9zYWxfdGVybmFyeV9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmVkaXRQcm9wb3NhbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVkaXRQcm9wb3NhbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gZWRpdFByb3Bvc2FsKGlkOiB1aW50NjQsIGNpZDogQ0lELCBhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10sIGV2aWRlbmNlOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gMgogICAgKgogICAgc3dhcAogICAgZHVwCiAgICBsZW4KICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzAgLy8gMAoKZWRpdFByb3Bvc2FsX2Zvcl9oZWFkZXJAMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gZWRpdFByb3Bvc2FsKGlkOiB1aW50NjQsIGNpZDogQ0lELCBhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10sIGV2aWRlbmNlOiBieXRlcyk6IHZvaWQgewogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogZWRpdFByb3Bvc2FsX2FmdGVyX2ZvckA0CiAgICBkdXAKICAgIGludGNfMiAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGVuY29kaW5nCiAgICBkdXAKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGZvciAobGVuKyh1aW50OCwobGVuK3VpbnQ4W10pKVtdKQogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKHVpbnQ4LChsZW4rdWludDhbXSkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA1CiAgICArCiAgICArCiAgICBjb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBlZGl0UHJvcG9zYWxfZm9yX2hlYWRlckAxCgplZGl0UHJvcG9zYWxfYWZ0ZXJfZm9yQDQ6CiAgICBwb3BuIDIKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NTAKICAgIC8vIGVkaXRQcm9wb3NhbChpZDogdWludDY0LCBjaWQ6IENJRCwgYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdLCBldmlkZW5jZTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMiAvLyAyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL3R5cGVzLnRzOjpHdWlsZFByb3Bvc2FsQWN0aW9uPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmFsaWRFZGl0T3JTdWJtaXQoaWQpLCBlcnJHdWlsZEludmFsaWRQcm9wb3NhbFN0YXRlKQogICAgZGlnIDIKICAgIGNhbGxzdWIgdmFsaWRFZGl0T3JTdWJtaXQKICAgIGJueiBlZGl0UHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJHcHN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwc3QKCmVkaXRQcm9wb3NhbF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gY29uc3QgcHJldmlvdXMgPSBjbG9uZSh0aGlzLnByb3Bvc2FscyhpZCkudmFsdWUpCiAgICBkaWcgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gY29uc3QgcHJldmlvdXMgPSBjbG9uZSh0aGlzLnByb3Bvc2FscyhpZCkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGNvdmVyIDUKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIGNvbnN0IGNvc3QgPSB0aGlzLnByb3Bvc2FsQ29zdChhY3Rpb25zKQogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3QKICAgIGNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBsb2dnZWRBc3NlcnQoY29zdC50b3RhbCA8PSBwcmV2aW91cy5mZWVzUGFpZCwgZXJyR3VpbGRJbnZhbGlkUGF5bWVudCkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCA4NQogICAgaW50Y18zIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIDw9CiAgICBibnogZWRpdFByb3Bvc2FsX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckdwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BheQoKZWRpdFByb3Bvc2FsX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyB0aGlzLnZhbGlkYXRlQWN0aW9ucyhhY3Rpb25zKQogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHZhbGlkYXRlQWN0aW9ucwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTU2CiAgICAvLyBjb25zdCBwcm9wb3NlclBvd2VyID0gdGhpcy5nb3Zlcm5hbmNlUG93ZXIoVHhuLnNlbmRlciwgZXZpZGVuY2UsIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBjb3N0LmR1cmF0aW9uKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICBzd2FwCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBnb3Zlcm5hbmNlUG93ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gdGhpcy5jcmVhdGVPclVwZGF0ZVByb3Bvc2FsKGlkLCBjaWQsIGFjdGlvbnMsIHByZXZpb3VzLmZlZXNQYWlkLCBjb3N0LnBvd2VyLCBwcm9wb3NlclBvd2VyKQogICAgc3dhcAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA2CiAgICB1bmNvdmVyIDQKICAgIGRpZyA1CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiBjcmVhdGVPclVwZGF0ZVByb3Bvc2FsCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1OQogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSArIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBhY3Rpb25zKSAtIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBwcmV2aW91cy5hY3Rpb25zKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgKyB0aGlzLmRyYWZ0UmVzZXJ2ZShwcmV2aW91cy5mZWVzUGFpZCwgYWN0aW9ucykgLSB0aGlzLmRyYWZ0UmVzZXJ2ZShwcmV2aW91cy5mZWVzUGFpZCwgcHJldmlvdXMuYWN0aW9ucykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIHJldHVybiBmZWVzUGFpZCAtIHRoaXMucHJvcG9zYWxNYnIoYWN0aW9ucykKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJvcG9zYWxNYnIKICAgIHBvcAogICAgZGlnIDIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1OQogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSArIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBhY3Rpb25zKSAtIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBwcmV2aW91cy5hY3Rpb25zKQogICAgKwogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgOTMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIHJldHVybiBmZWVzUGFpZCAtIHRoaXMucHJvcG9zYWxNYnIoYWN0aW9ucykKICAgIGNhbGxzdWIgcHJvcG9zYWxNYnIKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgKyB0aGlzLmRyYWZ0UmVzZXJ2ZShwcmV2aW91cy5mZWVzUGFpZCwgYWN0aW9ucykgLSB0aGlzLmRyYWZ0UmVzZXJ2ZShwcmV2aW91cy5mZWVzUGFpZCwgcHJldmlvdXMuYWN0aW9ucykKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NTgtOTU5CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlID0KICAgIC8vICAgdGhpcy5yZXNlcnZlZC52YWx1ZSArIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBhY3Rpb25zKSAtIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBwcmV2aW91cy5hY3Rpb25zKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gZWRpdFByb3Bvc2FsKGlkOiB1aW50NjQsIGNpZDogQ0lELCBhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10sIGV2aWRlbmNlOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5lZGl0UHJvcG9zYWxXaXRoUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVkaXRQcm9wb3NhbFdpdGhQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTYzLTk2OQogICAgLy8gZWRpdFByb3Bvc2FsV2l0aFBheW1lbnQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaWQ6IHVpbnQ2NCwKICAgIC8vICAgY2lkOiBDSUQsCiAgICAvLyAgIGFjdGlvbnM6IEd1aWxkUHJvcG9zYWxBY3Rpb25bXSwKICAgIC8vICAgZXZpZGVuY2U6IGJ5dGVzLAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDIKICAgICoKICAgIHN3YXAKICAgIGR1cAogICAgbGVuCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgaW50Y18wIC8vIDAKCmVkaXRQcm9wb3NhbFdpdGhQYXltZW50X2Zvcl9oZWFkZXJAMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk2My05NjkKICAgIC8vIGVkaXRQcm9wb3NhbFdpdGhQYXltZW50KAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICBhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10sCiAgICAvLyAgIGV2aWRlbmNlOiBieXRlcywKICAgIC8vICk6IHZvaWQgewogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogZWRpdFByb3Bvc2FsV2l0aFBheW1lbnRfYWZ0ZXJfZm9yQDQKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgICoKICAgIGRpZyAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgZW5jb2RpbmcKICAgIGR1cAogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGNvdmVyIDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgZm9yIChsZW4rKHVpbnQ4LChsZW4rdWludDhbXSkpW10pCiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAodWludDgsKGxlbit1aW50OFtdKSkKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDUKICAgICsKICAgICsKICAgIGNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGVkaXRQcm9wb3NhbFdpdGhQYXltZW50X2Zvcl9oZWFkZXJAMQoKZWRpdFByb3Bvc2FsV2l0aFBheW1lbnRfYWZ0ZXJfZm9yQDQ6CiAgICBwb3BuIDIKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NjMtOTY5CiAgICAvLyBlZGl0UHJvcG9zYWxXaXRoUGF5bWVudCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdLAogICAgLy8gICBldmlkZW5jZTogYnl0ZXMsCiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMiAvLyAyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL3R5cGVzLnRzOjpHdWlsZFByb3Bvc2FsQWN0aW9uPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmFsaWRFZGl0T3JTdWJtaXQoaWQpLCBlcnJHdWlsZEludmFsaWRQcm9wb3NhbFN0YXRlKQogICAgZGlnIDIKICAgIGNhbGxzdWIgdmFsaWRFZGl0T3JTdWJtaXQKICAgIGJueiBlZGl0UHJvcG9zYWxXaXRoUGF5bWVudF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckdwc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BzdAoKZWRpdFByb3Bvc2FsV2l0aFBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzEKICAgIC8vIGNvbnN0IHByZXZpb3VzID0gY2xvbmUodGhpcy5wcm9wb3NhbHMoaWQpLnZhbHVlKQogICAgZGlnIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gcHJvcG9zYWxzID0gQm94TWFwPHVpbnQ2NCwgR3VpbGRQcm9wb3NhbD4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UHJvcG9zYWxzIH0pCiAgICBieXRlYyA1IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzEKICAgIC8vIGNvbnN0IHByZXZpb3VzID0gY2xvbmUodGhpcy5wcm9wb3NhbHMoaWQpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBjb3ZlciA2CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTcyCiAgICAvLyBjb25zdCBjb3N0ID0gdGhpcy5wcm9wb3NhbENvc3QoYWN0aW9ucykKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0CiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGNvc3QudG90YWwgPiBwcmV2aW91cy5mZWVzUGFpZCwgZXJyR3VpbGRJbnZhbGlkUGF5bWVudCkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBzd2FwCiAgICBwdXNoaW50IDg1CiAgICBpbnRjXzMgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgNgogICAgPgogICAgYm56IGVkaXRQcm9wb3NhbFdpdGhQYXltZW50X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckdwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BheQoKZWRpdFByb3Bvc2FsV2l0aFBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzUtOTc5CiAgICAvLyBtYXRjaChwYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IGNvc3QudG90YWwgLSBwcmV2aW91cy5mZWVzUGFpZCwKICAgIC8vIH0pLAogICAgdW5jb3ZlciA2CiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzUtOTc5CiAgICAvLyBtYXRjaChwYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IGNvc3QudG90YWwgLSBwcmV2aW91cy5mZWVzUGFpZCwKICAgIC8vIH0pLAogICAgPT0KICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTc3CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTc1LTk3OQogICAgLy8gbWF0Y2gocGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBjb3N0LnRvdGFsIC0gcHJldmlvdXMuZmVlc1BhaWQsCiAgICAvLyB9KSwKICAgID09CiAgICAmJgogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzgKICAgIC8vIGFtb3VudDogY29zdC50b3RhbCAtIHByZXZpb3VzLmZlZXNQYWlkLAogICAgZGlnIDUKICAgIGRpZyA3CiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzUtOTc5CiAgICAvLyBtYXRjaChwYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IGNvc3QudG90YWwgLSBwcmV2aW91cy5mZWVzUGFpZCwKICAgIC8vIH0pLAogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5NzQtOTgxCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIG1hdGNoKHBheW1lbnQsIHsKICAgIC8vICAgICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogY29zdC50b3RhbCAtIHByZXZpb3VzLmZlZXNQYWlkLAogICAgLy8gICB9KSwKICAgIC8vICAgZXJyR3VpbGRJbnZhbGlkUGF5bWVudCwKICAgIC8vICkKICAgIGJueiBlZGl0UHJvcG9zYWxXaXRoUGF5bWVudF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyR3BheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcGF5CgplZGl0UHJvcG9zYWxXaXRoUGF5bWVudF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIHRoaXMudmFsaWRhdGVBY3Rpb25zKGFjdGlvbnMpCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgdmFsaWRhdGVBY3Rpb25zCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5ODMKICAgIC8vIGNvbnN0IHByb3Bvc2VyUG93ZXIgPSB0aGlzLmdvdmVybmFuY2VQb3dlcihUeG4uc2VuZGVyLCBldmlkZW5jZSwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIGNvc3QuZHVyYXRpb24pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGdvdmVybmFuY2VQb3dlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTg0CiAgICAvLyB0aGlzLmNyZWF0ZU9yVXBkYXRlUHJvcG9zYWwoaWQsIGNpZCwgYWN0aW9ucywgY29zdC50b3RhbCwgY29zdC5wb3dlciwgcHJvcG9zZXJQb3dlcikKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNwogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgY3JlYXRlT3JVcGRhdGVQcm9wb3NhbAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5ODYKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgKyB0aGlzLmRyYWZ0UmVzZXJ2ZShjb3N0LnRvdGFsLCBhY3Rpb25zKSAtIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBwcmV2aW91cy5hY3Rpb25zKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5ODYKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgKyB0aGlzLmRyYWZ0UmVzZXJ2ZShjb3N0LnRvdGFsLCBhY3Rpb25zKSAtIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBwcmV2aW91cy5hY3Rpb25zKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gcmV0dXJuIGZlZXNQYWlkIC0gdGhpcy5wcm9wb3NhbE1icihhY3Rpb25zKQogICAgc3dhcAogICAgY2FsbHN1YiBwcm9wb3NhbE1icgogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSArIHRoaXMuZHJhZnRSZXNlcnZlKGNvc3QudG90YWwsIGFjdGlvbnMpIC0gdGhpcy5kcmFmdFJlc2VydmUocHJldmlvdXMuZmVlc1BhaWQsIHByZXZpb3VzLmFjdGlvbnMpCiAgICArCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA5MwogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gcmV0dXJuIGZlZXNQYWlkIC0gdGhpcy5wcm9wb3NhbE1icihhY3Rpb25zKQogICAgY2FsbHN1YiBwcm9wb3NhbE1icgogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSArIHRoaXMuZHJhZnRSZXNlcnZlKGNvc3QudG90YWwsIGFjdGlvbnMpIC0gdGhpcy5kcmFmdFJlc2VydmUocHJldmlvdXMuZmVlc1BhaWQsIHByZXZpb3VzLmFjdGlvbnMpCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIHJlc2VydmVkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVzZXJ2ZWQgfSkKICAgIGJ5dGVjXzMgLy8gInJlc2VydmVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTg1LTk4NgogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSA9CiAgICAvLyAgIHRoaXMucmVzZXJ2ZWQudmFsdWUgKyB0aGlzLmRyYWZ0UmVzZXJ2ZShjb3N0LnRvdGFsLCBhY3Rpb25zKSAtIHRoaXMuZHJhZnRSZXNlcnZlKHByZXZpb3VzLmZlZXNQYWlkLCBwcmV2aW91cy5hY3Rpb25zKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk2My05NjkKICAgIC8vIGVkaXRQcm9wb3NhbFdpdGhQYXltZW50KAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGlkOiB1aW50NjQsCiAgICAvLyAgIGNpZDogQ0lELAogICAgLy8gICBhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10sCiAgICAvLyAgIGV2aWRlbmNlOiBieXRlcywKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5kZWxldGVQcm9wb3NhbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVByb3Bvc2FsOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTk1CiAgICAvLyBkZWxldGVQcm9wb3NhbChwcm9wb3NhbElEOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHByb3Bvc2FscyA9IEJveE1hcDx1aW50NjQsIEd1aWxkUHJvcG9zYWw+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFByb3Bvc2FscyB9KQogICAgYnl0ZWMgNSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo5OTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGVsZXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyR3BycCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcHJwCgpkZWxldGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk5NwogICAgLy8gY29uc3QgcHJvcG9zYWwgPSBjbG9uZSh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZSkKICAgIGR1cG4gMgogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk5OQogICAgLy8gcHJvcG9zYWwudm90aW5nVHMgPT09IDAgJiYKICAgIHB1c2hpbnQgNjkKICAgIGludGNfMyAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6OTk5LTEwMDAKICAgIC8vIHByb3Bvc2FsLnZvdGluZ1RzID09PSAwICYmCiAgICAvLyAocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQgfHwgcHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQpCiAgICBibnogZGVsZXRlUHJvcG9zYWxfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDAwCiAgICAvLyAocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQgfHwgcHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQpCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBidXJ5IDUKICAgIGJ5dGVjIDkgLy8gMHgyOAogICAgPT0KICAgIGJueiBkZWxldGVQcm9wb3NhbF9ib29sX3RydWVANgogICAgZGlnIDMKICAgIGJ5dGVjIDE0IC8vIDB4MzIKICAgID09CiAgICBieiBkZWxldGVQcm9wb3NhbF9ib29sX2ZhbHNlQDcKCmRlbGV0ZVByb3Bvc2FsX2Jvb2xfdHJ1ZUA2OgogICAgaW50Y18xIC8vIDEKICAgIGNvdmVyIDIKCmRlbGV0ZVByb3Bvc2FsX2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMDEKICAgIC8vIGxvZ2dlZEFzc2VydChwcm9wb3NhbC5zdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNEcmFmdCB8fCBib290c3RyYXAsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWNfMSAvLyAweDAwCiAgICA9PQogICAgZGlnIDMKICAgIHx8CiAgICBibnogZGVsZXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyA4IC8vICJFUlI6ZXJyR3BzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcHN0CgpkZWxldGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDAyCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gcHJvcG9zYWwuY3JlYXRvciwgZXJyR3VpbGRDcmVhdG9yT25seSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBwdXNoaW50cyAzNyAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGJueiBkZWxldGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDMyIC8vICJFUlI6ZXJyR2NydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHY3J0CgpkZWxldGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDA0CiAgICAvLyBsZXQgcmVmdW5kOiB1aW50NjQgPSBwcm9wb3NhbC5mZWVzUGFpZAogICAgZGlnIDEKICAgIHB1c2hpbnQgODUKICAgIGludGNfMyAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDA1CiAgICAvLyBpZiAoYm9vdHN0cmFwKSB7CiAgICB1bmNvdmVyIDMKICAgIGJ6IGRlbGV0ZVByb3Bvc2FsX2Vsc2VfYm9keUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAwNgogICAgLy8gcmVmdW5kID0gdGhpcy5wcm9wb3NhbE1icihwcm9wb3NhbC5hY3Rpb25zKQogICAgZHVwCiAgICBwdXNoaW50IDkzCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgY2FsbHN1YiBwcm9wb3NhbE1icgogICAgcG9wCiAgICBidXJ5IDMKCmRlbGV0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDExCiAgICAvLyB0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDEyCiAgICAvLyB0aGlzLnJlZnVuZChwcm9wb3NhbC5jcmVhdG9yLCByZWZ1bmQpCiAgICBkaWcgMQogICAgY2FsbHN1YiByZWZ1bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjk5NQogICAgLy8gZGVsZXRlUHJvcG9zYWwocHJvcG9zYWxJRDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxldGVQcm9wb3NhbF9lbHNlX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IHRoaXMuZHJhZnRSZXNlcnZlKHByb3Bvc2FsLmZlZXNQYWlkLCBwcm9wb3NhbC5hY3Rpb25zKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IHRoaXMuZHJhZnRSZXNlcnZlKHByb3Bvc2FsLmZlZXNQYWlkLCBwcm9wb3NhbC5hY3Rpb25zKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCA5MwogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gcmV0dXJuIGZlZXNQYWlkIC0gdGhpcy5wcm9wb3NhbE1icihhY3Rpb25zKQogICAgY2FsbHN1YiBwcm9wb3NhbE1icgogICAgcG9wCiAgICBkaWcgNAogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAwOAogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSAtPSB0aGlzLmRyYWZ0UmVzZXJ2ZShwcm9wb3NhbC5mZWVzUGFpZCwgcHJvcG9zYWwuYWN0aW9ucykKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IHRoaXMuZHJhZnRSZXNlcnZlKHByb3Bvc2FsLmZlZXNQYWlkLCBwcm9wb3NhbC5hY3Rpb25zKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIGIgZGVsZXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxNQoKZGVsZXRlUHJvcG9zYWxfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIGIgZGVsZXRlUHJvcG9zYWxfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnN1Ym1pdFByb3Bvc2FsW3JvdXRpbmddKCkgLT4gdm9pZDoKc3VibWl0UHJvcG9zYWw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDE2CiAgICAvLyBzdWJtaXRQcm9wb3NhbChwcm9wb3NhbElEOiB1aW50NjQsIGV2aWRlbmNlOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YXRlLnZhbHVlICE9PSBHdWlsZFN0YXRlRHJhZnQsIGVyckd1aWxkTm90QWN0aXZlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc3RhdGUgPSBHbG9iYWxTdGF0ZTxHdWlsZFN0YXRlPih7IGluaXRpYWxWYWx1ZTogR3VpbGRTdGF0ZURyYWZ0LCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlTdGF0ZSB9KQogICAgYnl0ZWMgNyAvLyAic3RhdGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDE3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGF0ZS52YWx1ZSAhPT0gR3VpbGRTdGF0ZURyYWZ0LCBlcnJHdWlsZE5vdEFjdGl2ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18xIC8vIDB4MDAKICAgICE9CiAgICBibnogc3VibWl0UHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyckdhY3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2FjdAoKc3VibWl0UHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDE4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy52YWxpZEVkaXRPclN1Ym1pdChwcm9wb3NhbElEKSwgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWxTdGF0ZSkKICAgIGR1cAogICAgY2FsbHN1YiB2YWxpZEVkaXRPclN1Ym1pdAogICAgYm56IHN1Ym1pdFByb3Bvc2FsX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyR3BzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcHN0CgpzdWJtaXRQcm9wb3NhbF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMTkKICAgIC8vIGNvbnN0IHByb3Bvc2FsID0gY2xvbmUodGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHByb3Bvc2FscyA9IEJveE1hcDx1aW50NjQsIEd1aWxkUHJvcG9zYWw+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFByb3Bvc2FscyB9KQogICAgYnl0ZWMgNSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDE5CiAgICAvLyBjb25zdCBwcm9wb3NhbCA9IGNsb25lKHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAyMAogICAgLy8gY29uc3QgY29zdCA9IHRoaXMucHJvcG9zYWxDb3N0KHByb3Bvc2FsLmFjdGlvbnMpCiAgICBkdXAKICAgIHB1c2hpbnQgOTMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdAogICAgcG9wCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMjEKICAgIC8vIGxvZ2dlZEFzc2VydChwcm9wb3NhbC5mZWVzUGFpZCA+PSBjb3N0LnRvdGFsLCBlcnJHdWlsZEludmFsaWRQYXltZW50KQogICAgc3dhcAogICAgcHVzaGludCA4NQogICAgaW50Y18zIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA0CiAgICA+PQogICAgYm56IHN1Ym1pdFByb3Bvc2FsX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckdwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BheQoKc3VibWl0UHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDIzCiAgICAvLyB0aGlzLmdvdmVybmFuY2VQb3dlcihUeG4uc2VuZGVyLCBldmlkZW5jZSwgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIGNvc3QuZHVyYXRpb24pID49IGNvc3QucG93ZXIsCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkaWcgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA0CiAgICArCiAgICBzd2FwCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBnb3Zlcm5hbmNlUG93ZXIKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICA+PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAyMi0xMDI1CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHRoaXMuZ292ZXJuYW5jZVBvd2VyKFR4bi5zZW5kZXIsIGV2aWRlbmNlLCBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgY29zdC5kdXJhdGlvbikgPj0gY29zdC5wb3dlciwKICAgIC8vICAgZXJyR3VpbGROb0dvdmVybmFuY2VQb3dlciwKICAgIC8vICkKICAgIGJueiBzdWJtaXRQcm9wb3NhbF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgNTcgLy8gIkVSUjplcnJHcHdyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwd3IKCnN1Ym1pdFByb3Bvc2FsX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAyNwogICAgLy8gcGFydGljaXBhdGlvbjogY29zdC5wYXJ0aWNpcGF0aW9uLAogICAgc3dhcAogICAgZHVwCiAgICBleHRyYWN0IDQwIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMjgKICAgIC8vIGFwcHJvdmFsOiBjb3N0LmFwcHJvdmFsLAogICAgZGlnIDEKICAgIGV4dHJhY3QgNDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAyOQogICAgLy8gbWluaW11bUFwcHJvdmFsczogY29zdC5taW5pbXVtQXBwcm92YWxzLAogICAgZGlnIDIKICAgIGV4dHJhY3QgNTYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAyNi0xMDMwCiAgICAvLyBjb25zdCByZXF1aXJlbWVudHM6IEd1aWxkQ29uc2Vuc3VzUmVxdWlyZW1lbnRzID0gewogICAgLy8gICBwYXJ0aWNpcGF0aW9uOiBjb3N0LnBhcnRpY2lwYXRpb24sCiAgICAvLyAgIGFwcHJvdmFsOiBjb3N0LmFwcHJvdmFsLAogICAgLy8gICBtaW5pbXVtQXBwcm92YWxzOiBjb3N0Lm1pbmltdW1BcHByb3ZhbHMsCiAgICAvLyB9CiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAzMQogICAgLy8gY29uc3QgYmFsbG90TWJyID0gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNCYXNlLnByb3RvdHlwZS5iYWxsb3RNYnI+KHsgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLCBhcmdzOiBbXSB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gY29uc2Vuc3VzID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5Q29uc2Vuc3VzIH0pCiAgICBieXRlYyA2IC8vICJjb25zZW5zdXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDMxCiAgICAvLyBjb25zdCBiYWxsb3RNYnIgPSBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0Jhc2UucHJvdG90eXBlLmJhbGxvdE1icj4oeyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsIGFyZ3M6IFtdIH0pLnJldHVyblZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDU4IC8vIG1ldGhvZCAiYmFsbG90TWJyKCl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTAzMi0xMDQ0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLm9wZW5Qcm9wb3NhbD4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IGJhbGxvdE1iciwKICAgIC8vICAgICAgIGZlZTogMCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBwcm9wb3NhbElELAogICAgLy8gICAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBjb3N0LmR1cmF0aW9uLAogICAgLy8gICAgIHJlcXVpcmVtZW50cywKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDM2CiAgICAvLyByZWNlaXZlcjogdGhpcy5jb25zZW5zdXMudmFsdWUuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMzUtMTAzOQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogYmFsbG90TWJyLAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDM4CiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMzItMTA0NAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5vcGVuUHJvcG9zYWw+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmNvbnNlbnN1cy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBiYWxsb3RNYnIsCiAgICAvLyAgICAgICBmZWU6IDAsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgcHJvcG9zYWxJRCwKICAgIC8vICAgICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgY29zdC5kdXJhdGlvbiwKICAgIC8vICAgICByZXF1aXJlbWVudHMsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDQxCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgY29zdC5kdXJhdGlvbiwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIHVuY292ZXIgNQogICAgKwogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMzItMTA0NAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5vcGVuUHJvcG9zYWw+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmNvbnNlbnN1cy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBiYWxsb3RNYnIsCiAgICAvLyAgICAgICBmZWU6IDAsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgcHJvcG9zYWxJRCwKICAgIC8vICAgICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgY29zdC5kdXJhdGlvbiwKICAgIC8vICAgICByZXF1aXJlbWVudHMsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Njg0NDkwODggLy8gbWV0aG9kICJvcGVuUHJvcG9zYWwocGF5LHVpbnQ2NCx1aW50NjQsKHVpbnQ2NCx1aW50NjQsdWludDY0KSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNDgKICAgIC8vIGNvbnN0IGhlbGQ6IHVpbnQ2NCA9IGNvc3QudG90YWwgLSAodGhpcy5wcm9wb3NhbE1icihwcm9wb3NhbC5hY3Rpb25zKSArIGJhbGxvdE1iciArIGNvc3QuZmVlKQogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHByb3Bvc2FsTWJyCiAgICBwb3AKICAgIGRpZyAxCiAgICArCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgKwogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA0OQogICAgLy8gY29uc3Qgc3VycGx1czogdWludDY0ID0gcHJvcG9zYWwuZmVlc1BhaWQgLSBjb3N0LnRvdGFsCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA1MAogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSAtPSBiYWxsb3RNYnIgKyBjb3N0LmZlZSArIHN1cnBsdXMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIHJlc2VydmVkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVzZXJ2ZWQgfSkKICAgIGJ5dGVjXzMgLy8gInJlc2VydmVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA1MAogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSAtPSBiYWxsb3RNYnIgKyBjb3N0LmZlZSArIHN1cnBsdXMKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDQKICAgIGRpZyA0CiAgICArCiAgICBkaWcgMgogICAgKwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTg2CiAgICAvLyByZXNlcnZlZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVJlc2VydmVkIH0pCiAgICBieXRlY18zIC8vICJyZXNlcnZlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNTAKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgLT0gYmFsbG90TWJyICsgY29zdC5mZWUgKyBzdXJwbHVzCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA1MQogICAgLy8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuZmVlc1BhaWQgPSBoZWxkCiAgICBzd2FwCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCA4NQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA1MgogICAgLy8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUudm90aW5nVHMgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA2OQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuc3RhdHVzID0gR3VpbGRQcm9wb3NhbFN0YXR1c1ZvdGluZwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNTQKICAgIC8vIHRoaXMucmVmdW5kKHByb3Bvc2FsLmNyZWF0b3IsIHN1cnBsdXMpCiAgICBwdXNoaW50cyAzNyAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcmVmdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDU1CiAgICAvLyB0aGlzLmZvcndhcmRGZWUoY29zdC5mZWUpCiAgICBjYWxsc3ViIGZvcndhcmRGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwMTYKICAgIC8vIHN1Ym1pdFByb3Bvc2FsKHByb3Bvc2FsSUQ6IHVpbnQ2NCwgZXZpZGVuY2U6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnZvdGVQcm9wb3NhbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZvdGVQcm9wb3NhbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNjIKICAgIC8vIHZvdGVQcm9wb3NhbChtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHByb3Bvc2FsSUQ6IHVpbnQ2NCwgdm90ZTogR3VpbGRWb3RlVHlwZSwgZXZpZGVuY2U6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHByb3Bvc2FscyA9IEJveE1hcDx1aW50NjQsIEd1aWxkUHJvcG9zYWw+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFByb3Bvc2FscyB9KQogICAgYnl0ZWMgNSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDYzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkuZXhpc3RzLCBlcnJHdWlsZEludmFsaWRQcm9wb3NhbCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHZvdGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJHcHJwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwcnAKCnZvdGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNjUKICAgIC8vIHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlLnN0YXR1cyA9PT0gR3VpbGRQcm9wb3NhbFN0YXR1c1ZvdGluZywKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDY0LTEwNjcKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzVm90aW5nLAogICAgLy8gICBlcnJHdWlsZEludmFsaWRQcm9wb3NhbFN0YXRlLAogICAgLy8gKQogICAgYm56IHZvdGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckdwc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BzdAoKdm90ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA2OAogICAgLy8gY29uc3QgY29zdCA9IHRoaXMubmV4dFZvdGVDb3N0KHByb3Bvc2FsSUQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIG5leHRWb3RlQ29zdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDcwLTEwNzQKICAgIC8vIG1hdGNoKG1iclBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogY29zdCwKICAgIC8vIH0pLAogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA3MQogICAgLy8gc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA3MC0xMDc0CiAgICAvLyBtYXRjaChtYnJQYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IGNvc3QsCiAgICAvLyB9KSwKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNzIKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDcwLTEwNzQKICAgIC8vIG1hdGNoKG1iclBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogY29zdCwKICAgIC8vIH0pLAogICAgPT0KICAgICYmCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgMgogICAgPT0KICAgICYmCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDY5LTEwNzYKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgbWF0Y2gobWJyUGF5bWVudCwgewogICAgLy8gICAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBjb3N0LAogICAgLy8gICB9KSwKICAgIC8vICAgZXJyR3VpbGRJbnZhbGlkUGF5bWVudCwKICAgIC8vICkKICAgIGJueiB2b3RlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyR3BheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcGF5Cgp2b3RlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDc3LTEwOTAKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUudm90ZT4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IGNvc3QsCiAgICAvLyAgICAgICBmZWU6IDAsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICBwcm9wb3NhbElELAogICAgLy8gICAgIHZvdGUsCiAgICAvLyAgICAgZXZpZGVuY2UsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA4MQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyBjb25zZW5zdXMgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlDb25zZW5zdXMgfSkKICAgIGJ5dGVjIDYgLy8gImNvbnNlbnN1cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwODEKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmNvbnNlbnN1cy52YWx1ZS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA4MC0xMDg0CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogdGhpcy5jb25zZW5zdXMudmFsdWUuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBjb3N0LAogICAgLy8gICBmZWU6IDAsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDgzCiAgICAvLyBmZWU6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNzctMTA5MAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS52b3RlPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogdGhpcy5jb25zZW5zdXMudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogY29zdCwKICAgIC8vICAgICAgIGZlZTogMCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHByb3Bvc2FsSUQsCiAgICAvLyAgICAgdm90ZSwKICAgIC8vICAgICBldmlkZW5jZSwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwODUKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwNzctMTA5MAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS52b3RlPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogdGhpcy5jb25zZW5zdXMudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogY29zdCwKICAgIC8vICAgICAgIGZlZTogMCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHByb3Bvc2FsSUQsCiAgICAvLyAgICAgdm90ZSwKICAgIC8vICAgICBldmlkZW5jZSwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHgzZDc1MjVlOSAvLyBtZXRob2QgInZvdGUocGF5LGFkZHJlc3MsdWludDY0LHVpbnQ4LGJ5dGVbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDYyCiAgICAvLyB2b3RlUHJvcG9zYWwobWJyUGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBwcm9wb3NhbElEOiB1aW50NjQsIHZvdGU6IEd1aWxkVm90ZVR5cGUsIGV2aWRlbmNlOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5maW5hbGl6ZVByb3Bvc2FsW3JvdXRpbmddKCkgLT4gdm9pZDoKZmluYWxpemVQcm9wb3NhbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMDIKICAgIC8vIGZpbmFsaXplUHJvcG9zYWwocHJvcG9zYWxJRDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBmaW5hbGl6ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMyAvLyAiRVJSOmVyckdwcnAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BycAoKZmluYWxpemVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMDQtMTEwNQogICAgLy8gY29uc3QgcHJvcG9zYWwgPSBjbG9uZSh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZSkKICAgIC8vIGxvZ2dlZEFzc2VydChwcm9wb3NhbC5zdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNWb3RpbmcsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMDUKICAgIC8vIGxvZ2dlZEFzc2VydChwcm9wb3NhbC5zdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNWb3RpbmcsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBieXRlYyAxMCAvLyAweDE0CiAgICA9PQogICAgYm56IGZpbmFsaXplUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJHcHN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwc3QKCmZpbmFsaXplUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTA2LTExMDkKICAgIC8vIGNvbnN0IHJlc3VsdCA9IGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUucmVzb2x2ZVByb3Bvc2FsPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW3Byb3Bvc2FsSURdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMDcKICAgIC8vIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEwNwogICAgLy8gYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEwNi0xMTA5CiAgICAvLyBjb25zdCByZXN1bHQgPSBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLnJlc29sdmVQcm9wb3NhbD4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtwcm9wb3NhbElEXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg1YjNhOGIwMCAvLyBtZXRob2QgInJlc29sdmVQcm9wb3NhbCh1aW50NjQpKGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMzCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvdHlwZXMudHM6Okd1aWxkQ29uc2Vuc3VzUmVzdWx0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTEwCiAgICAvLyBpZiAocmVzdWx0LmFwcHJvdmVkKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBieiBmaW5hbGl6ZVByb3Bvc2FsX2Vsc2VfYm9keUA4CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMTEKICAgIC8vIHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlLnN0YXR1cyA9IEd1aWxkUHJvcG9zYWxTdGF0dXNBcHByb3ZlZAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDkgLy8gMHgyOAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmZpbmFsaXplUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEwMgogICAgLy8gZmluYWxpemVQcm9wb3NhbChwcm9wb3NhbElEOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmZpbmFsaXplUHJvcG9zYWxfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTEzCiAgICAvLyB0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZS5zdGF0dXMgPSBHdWlsZFByb3Bvc2FsU3RhdHVzUmVqZWN0ZWQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDI1IC8vIDB4MWUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTE1CiAgICAvLyB0aGlzLnJlbGVhc2VSZXNlcnZlKHByb3Bvc2FsSUQsIHByb3Bvc2FsLmNyZWF0b3IsIHByb3Bvc2FsLmZlZXNQYWlkLCAwKQogICAgZHVwCiAgICBwdXNoaW50cyAzNyAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgODUKICAgIGludGNfMyAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVsZWFzZVJlc2VydmUKICAgIGIgZmluYWxpemVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDkKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMjYKICAgIC8vIGNsZWFudXBQcm9wb3NhbENvbnNlbnN1cyhwcm9wb3NhbElEOiB1aW50NjQsIHZvdGVyczogQWNjb3VudFtdKTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciA1CiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YWNjb3VudD4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDEzIC8vICJFUlI6ZXJyR3BycCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcHJwCgpjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTI4CiAgICAvLyBjb25zdCB7IHN0YXR1cywgY3JlYXRvciB9ID0gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDkKICAgIHB1c2hpbnRzIDM3IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTMwCiAgICAvLyBzdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNSZWplY3RlZCB8fAogICAgYnl0ZWMgMjUgLy8gMHgxZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzAtMTEzMQogICAgLy8gc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzUmVqZWN0ZWQgfHwKICAgIC8vICAgc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQgfHwKICAgIGJueiBjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfYm9vbF90cnVlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzEKICAgIC8vIHN0YXR1cyA9PT0gR3VpbGRQcm9wb3NhbFN0YXR1c0V4ZWN1dGVkIHx8CiAgICBkaWcgNgogICAgYnl0ZWMgMTQgLy8gMHgzMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzAtMTEzMQogICAgLy8gc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzUmVqZWN0ZWQgfHwKICAgIC8vICAgc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQgfHwKICAgIGJueiBjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfYm9vbF90cnVlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzIKICAgIC8vIHN0YXR1cyA9PT0gR3VpbGRQcm9wb3NhbFN0YXR1c0ludmFsaWQsCiAgICBkaWcgNgogICAgYnl0ZWMgMTEgLy8gMHgwYQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzAtMTEzMgogICAgLy8gc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzUmVqZWN0ZWQgfHwKICAgIC8vICAgc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQgfHwKICAgIC8vICAgc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzSW52YWxpZCwKICAgIGJ6IGNsZWFudXBQcm9wb3NhbENvbnNlbnN1c19ib29sX2ZhbHNlQDcKCmNsZWFudXBQcm9wb3NhbENvbnNlbnN1c19ib29sX3RydWVANjoKICAgIGludGNfMSAvLyAxCgpjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEyOS0xMTM0CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHN0YXR1cyA9PT0gR3VpbGRQcm9wb3NhbFN0YXR1c1JlamVjdGVkIHx8CiAgICAvLyAgICAgc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQgfHwKICAgIC8vICAgICBzdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNJbnZhbGlkLAogICAgLy8gICBlcnJHdWlsZEludmFsaWRQcm9wb3NhbFN0YXRlLAogICAgLy8gKQogICAgYm56IGNsZWFudXBQcm9wb3NhbENvbnNlbnN1c19hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJHcHN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwc3QKCmNsZWFudXBQcm9wb3NhbENvbnNlbnN1c19hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTM1CiAgICAvLyBjb25zdCBiZWZvcmUgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTEzNi0xMTM5CiAgICAvLyBjb25zdCByZW1haW5pbmcgPSBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0Jhc2UucHJvdG90eXBlLmNsZWFudXBCYWxsb3Q+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbcHJvcG9zYWxJRCwgdm90ZXJzXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTM3CiAgICAvLyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyBjb25zZW5zdXMgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlDb25zZW5zdXMgfSkKICAgIGJ5dGVjIDYgLy8gImNvbnNlbnN1cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzcKICAgIC8vIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExMzYtMTEzOQogICAgLy8gY29uc3QgcmVtYWluaW5nID0gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNCYXNlLnByb3RvdHlwZS5jbGVhbnVwQmFsbG90Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW3Byb3Bvc2FsSUQsIHZvdGVyc10sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YTllODIzY2QgLy8gbWV0aG9kICJjbGVhbnVwQmFsbG90KHVpbnQ2NCxhZGRyZXNzW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDkKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTQwCiAgICAvLyBjb25zdCBhZnRlciA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTQxCiAgICAvLyBjb25zdCByZWNlaXZlZDogdWludDY0ID0gYWZ0ZXIgPiBiZWZvcmUgPyBhZnRlciAtIGJlZm9yZSA6IDAKICAgIDwKICAgIGJ6IGNsZWFudXBQcm9wb3NhbENvbnNlbnN1c190ZXJuYXJ5X2ZhbHNlQDEzCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGJ1cnkgMwoKY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzX3Rlcm5hcnlfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTQyCiAgICAvLyBsZXQgZGlzdHJpYnV0ZWQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNDMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB2b3RlcnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfd2hpbGVfdG9wQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE0MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHZvdGVycy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzX2FmdGVyX3doaWxlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTQ0CiAgICAvLyB0aGlzLnJlZnVuZCh2b3RlcnNbaV0sIEd1aWxkVm90ZU1CUikKICAgIGRpZyAxCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgaW50YyA1IC8vIDIyNTAwCiAgICBjYWxsc3ViIHJlZnVuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE0NQogICAgLy8gZGlzdHJpYnV0ZWQgKz0gR3VpbGRWb3RlTUJSCiAgICBkaWcgNAogICAgaW50YyA1IC8vIDIyNTAwCiAgICArCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNDMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB2b3RlcnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNsZWFudXBQcm9wb3NhbENvbnNlbnN1c193aGlsZV90b3BAMTUKCmNsZWFudXBQcm9wb3NhbENvbnNlbnN1c19hZnRlcl93aGlsZUAxNzoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE0NwogICAgLy8gaWYgKHJlY2VpdmVkID4gZGlzdHJpYnV0ZWQpIHsKICAgIGRpZyAxCiAgICBkaWcgMwogICAgPgogICAgYnogY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzX2FmdGVyX2lmX2Vsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNDgKICAgIC8vIHRoaXMucmVmdW5kKGNyZWF0b3IsIHJlY2VpdmVkIC0gZGlzdHJpYnV0ZWQpCiAgICBkaWcgMQogICAgZGlnIDMKICAgIC0KICAgIGRpZyA2CiAgICBzd2FwCiAgICBjYWxsc3ViIHJlZnVuZAoKY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzX2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTI2CiAgICAvLyBjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXMocHJvcG9zYWxJRDogdWludDY0LCB2b3RlcnM6IEFjY291bnRbXSk6IHVpbnQ2NCB7CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIGRpZyA0CiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzX3Rlcm5hcnlfZmFsc2VAMTM6CiAgICBwb3AKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE0MQogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGFmdGVyID4gYmVmb3JlID8gYWZ0ZXIgLSBiZWZvcmUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAzCiAgICBiIGNsZWFudXBQcm9wb3NhbENvbnNlbnN1c190ZXJuYXJ5X21lcmdlQDE0CgpjbGVhbnVwUHJvcG9zYWxDb25zZW5zdXNfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgY2xlYW51cFByb3Bvc2FsQ29uc2Vuc3VzX2Jvb2xfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5jYW5jZWxQcm9wb3NhbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbFByb3Bvc2FsOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE1OQogICAgLy8gY2FuY2VsUHJvcG9zYWwocHJvcG9zYWxJRDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjYW5jZWxQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJHcHJwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwcnAKCmNhbmNlbFByb3Bvc2FsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE2MS0xMTYyCiAgICAvLyBjb25zdCBwcm9wb3NhbCA9IGNsb25lKHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlKQogICAgLy8gbG9nZ2VkQXNzZXJ0KHByb3Bvc2FsLnN0YXR1cyA9PT0gR3VpbGRQcm9wb3NhbFN0YXR1c0FwcHJvdmVkICYmIHByb3Bvc2FsLnZvdGluZ1RzICE9PSAwLCBlcnJHdWlsZEludmFsaWRQcm9wb3NhbFN0YXRlKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTYyCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQgJiYgcHJvcG9zYWwudm90aW5nVHMgIT09IDAsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBieXRlYyA5IC8vIDB4MjgKICAgID09CiAgICBieiBjYW5jZWxQcm9wb3NhbF9ib29sX2ZhbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNjEtMTE2MgogICAgLy8gY29uc3QgcHJvcG9zYWwgPSBjbG9uZSh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZSkKICAgIC8vIGxvZ2dlZEFzc2VydChwcm9wb3NhbC5zdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNBcHByb3ZlZCAmJiBwcm9wb3NhbC52b3RpbmdUcyAhPT0gMCwgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWxTdGF0ZSkKICAgIGR1cAogICAgcHVzaGludCA2OQogICAgaW50Y18zIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTYyCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQgJiYgcHJvcG9zYWwudm90aW5nVHMgIT09IDAsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBidG9pCiAgICBieiBjYW5jZWxQcm9wb3NhbF9ib29sX2ZhbHNlQDYKICAgIGludGNfMSAvLyAxCgpjYW5jZWxQcm9wb3NhbF9ib29sX21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTYyCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQgJiYgcHJvcG9zYWwudm90aW5nVHMgIT09IDAsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBibnogY2FuY2VsUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJHcHN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwc3QKCmNhbmNlbFByb3Bvc2FsX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHByb3Bvc2FsLmNyZWF0b3IsIGVyckd1aWxkQ3JlYXRvck9ubHkpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMQogICAgcHVzaGludHMgMzcgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID09CiAgICBibnogY2FuY2VsUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDExCiAgICBieXRlYyAzMiAvLyAiRVJSOmVyckdjcnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2NydAoKY2FuY2VsUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE2NAogICAgLy8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuc3RhdHVzID0gR3VpbGRQcm9wb3NhbFN0YXR1c0ludmFsaWQKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDExIC8vIDB4MGEKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTY1CiAgICAvLyB0aGlzLnJlbGVhc2VSZXNlcnZlKHByb3Bvc2FsSUQsIHByb3Bvc2FsLmNyZWF0b3IsIHByb3Bvc2FsLmZlZXNQYWlkLCAwKQogICAgcHVzaGludCA4NQogICAgaW50Y18zIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiByZWxlYXNlUmVzZXJ2ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE1OQogICAgLy8gY2FuY2VsUHJvcG9zYWwocHJvcG9zYWxJRDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjYW5jZWxQcm9wb3NhbF9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjYW5jZWxQcm9wb3NhbF9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuZXhlY3V0ZVByb3Bvc2FsW3JvdXRpbmddKCkgLT4gdm9pZDoKZXhlY3V0ZVByb3Bvc2FsOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTY5CiAgICAvLyBleGVjdXRlUHJvcG9zYWwocHJvcG9zYWxJRDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsKQogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHByb3Bvc2FscyA9IEJveE1hcDx1aW50NjQsIEd1aWxkUHJvcG9zYWw+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFByb3Bvc2FscyB9KQogICAgYnl0ZWMgNSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTcwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkuZXhpc3RzLCBlcnJHdWlsZEludmFsaWRQcm9wb3NhbCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJHcHJwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwcnAKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExNzEKICAgIC8vIGNvbnN0IHByb3Bvc2FsID0gY2xvbmUodGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUpCiAgICBkdXBuIDIKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTcxLTExNzIKICAgIC8vIGNvbnN0IHByb3Bvc2FsID0gY2xvbmUodGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUpCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTcyCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBieXRlYyA5IC8vIDB4MjgKICAgID09CiAgICBibnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyR3BzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcHN0CgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTc1CiAgICAvLyBpZiAocHJvcG9zYWwudm90aW5nVHMgPT09IDApIHsKICAgIGRpZyAxCiAgICBwdXNoaW50IDY5CiAgICBpbnRjXzMgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGR1cAogICAgYnVyeSA3CiAgICBibnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE3NgogICAgLy8gdGhpcy5yZXF1aXJlQ3JlYXRvckRyYWZ0KCkKICAgIGNhbGxzdWIgcmVxdWlyZUNyZWF0b3JEcmFmdAoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExODAKICAgIC8vIHRoaXMudmFsaWRhdGVFYWNoQWN0aW9uKHByb3Bvc2FsLmFjdGlvbnMpCiAgICBkdXAKICAgIHB1c2hpbnQgOTMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBjYWxsc3ViIHZhbGlkYXRlRWFjaEFjdGlvbgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTgxCiAgICAvLyB0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZS5zdGF0dXMgPSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDE0IC8vIDB4MzIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTgyCiAgICAvLyBjb25zdCBoZWxkID0gcHJvcG9zYWwuZmVlc1BhaWQKICAgIHB1c2hpbnQgODUKICAgIGludGNfMyAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTgzCiAgICAvLyBjb25zdCBmcmVlQmVmb3JlID0gdGhpcy5mcmVlQmFsYW5jZSgpCiAgICBjYWxsc3ViIGZyZWVCYWxhbmNlCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTg1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcHJvcG9zYWwuYWN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKCmV4ZWN1dGVQcm9wb3NhbF93aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExODUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBwcm9wb3NhbC5hY3Rpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIHB1c2hpbnQgOTUKICAgIGludGNfMiAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZGlnIDIKICAgID4KICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl93aGlsZUAxMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExODYKICAgIC8vIGNvbnN0IHsgdHlwZSwgZGF0YSB9ID0gcHJvcG9zYWwuYWN0aW9uc1tpXQogICAgZHVwbiAyCiAgICBwdXNoaW50IDk1CiAgICBpbnRjXzIgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGRpZyAzCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPAogICAgYXNzZXJ0IC8vIGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMiAvLyAyCiAgICAqCiAgICBwdXNoaW50IDk3CiAgICArCiAgICBkaWcgMQogICAgc3dhcAogICAgaW50Y18yIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBwdXNoaW50IDk3CiAgICBkaWcgMQogICAgKwogICAgZGlnIDIKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDEwMAogICAgKwogICAgZHVwMgogICAgaW50Y18yIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgYm94X2V4dHJhY3QKICAgIGR1cAogICAgYnVyeSAxMgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExODgKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25VcGdyYWRlQXBwOiB7CiAgICBieXRlYyAxMSAvLyAweDBhCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE4OC0xMTk1CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uVXBncmFkZUFwcDogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxVcGdyYWRlQXBwPihkYXRhKQogICAgLy8gICBsb2dnZWRBc3NlcnQoYWN0aW9uLmFwcCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLmlkLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICAvLyAgIGxvZ2dlZEFzc2VydCghdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgLy8gICBsb2dnZWRBc3NlcnQoYWN0aW9uLmdyb3Vwcy5sZW5ndGggPiAwICYmIGFjdGlvbi5maXJzdFZhbGlkIDw9IGFjdGlvbi5sYXN0VmFsaWQsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIC8vICAgdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLnZhbHVlID0geyBwcm9wb3NhbElELCBpbmRleDogaSB9CiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAyMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTkwCiAgICAvLyBsb2dnZWRBc3NlcnQoYWN0aW9uLmFwcCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLmlkLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBkaWcgOQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckdhY24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2FjbgoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExOTEKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgZGlnIDkKICAgIGV4dHJhY3QgMTAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gZXhlY3V0aW9ucyA9IEJveE1hcDxieXRlczwzMj4sIEd1aWxkRXhlY3V0aW9uTWV0YWRhdGE+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeEV4ZWN1dGlvbnMgfSkKICAgIGJ5dGVjIDE3IC8vICJ4IgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExOTEKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyA0IC8vICJFUlI6ZXJyR2FjbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHYWNuCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFjdGlvbi5ncm91cHMubGVuZ3RoID4gMCAmJiBhY3Rpb24uZmlyc3RWYWxpZCA8PSBhY3Rpb24ubGFzdFZhbGlkLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2Jvb2xfZmFsc2VAMTkKICAgIGRpZyA5CiAgICBkdXAKICAgIHB1c2hpbnQgNDQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDUyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPD0KICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9ib29sX2ZhbHNlQDE5CiAgICBpbnRjXzEgLy8gMQoKZXhlY3V0ZVByb3Bvc2FsX2Jvb2xfbWVyZ2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTkyCiAgICAvLyBsb2dnZWRBc3NlcnQoYWN0aW9uLmdyb3Vwcy5sZW5ndGggPiAwICYmIGFjdGlvbi5maXJzdFZhbGlkIDw9IGFjdGlvbi5sYXN0VmFsaWQsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGJueiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDIyCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyR2FjbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHYWNuCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE5MwogICAgLy8gdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLnZhbHVlID0geyBwcm9wb3NhbElELCBpbmRleDogaSB9CiAgICBkaWcgMQogICAgaXRvYgogICAgZGlnIDYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICBib3hfcHV0CgpleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE4NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHByb3Bvc2FsLmFjdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF93aGlsZV90b3BAOAoKZXhlY3V0ZVByb3Bvc2FsX2Jvb2xfZmFsc2VAMTk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBleGVjdXRlUHJvcG9zYWxfYm9vbF9tZXJnZUAyMAoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTk2CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uRXhlY3V0ZVBsdWdpbjogewogICAgZHVwCiAgICBieXRlYyAyNSAvLyAweDFlCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE5Ni0xMjAzCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uRXhlY3V0ZVBsdWdpbjogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxFeGVjdXRpb24+KGRhdGEpCiAgICAvLyAgIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9hZGRFeGVjdXRpb25LZXk+KHsKICAgIC8vICAgICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgICAgYXJnczogW2FjdGlvbi5leGVjdXRpb25LZXksIGFjdGlvbi5ncm91cHMsIGFjdGlvbi5maXJzdFZhbGlkLCBhY3Rpb24ubGFzdFZhbGlkXSwKICAgIC8vICAgfSkKICAgIC8vICAgYnJlYWsKICAgIC8vIH0KICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDI4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExOTgtMTIwMQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2FkZEV4ZWN1dGlvbktleT4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXhlY3V0aW9uS2V5LCBhY3Rpb24uZ3JvdXBzLCBhY3Rpb24uZmlyc3RWYWxpZCwgYWN0aW9uLmxhc3RWYWxpZF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIwMAogICAgLy8gYXJnczogW2FjdGlvbi5leGVjdXRpb25LZXksIGFjdGlvbi5ncm91cHMsIGFjdGlvbi5maXJzdFZhbGlkLCBhY3Rpb24ubGFzdFZhbGlkXSwKICAgIGRpZyA5CiAgICBkdXAKICAgIGV4dHJhY3QgMTIgMzIKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZGlnIDIKICAgIGV4dHJhY3QgNDYgOAogICAgdW5jb3ZlciAzCiAgICBleHRyYWN0IDU0IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExOTkKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE5OQogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE5OC0xMjAxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfYWRkRXhlY3V0aW9uS2V5Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5leGVjdXRpb25LZXksIGFjdGlvbi5ncm91cHMsIGFjdGlvbi5maXJzdFZhbGlkLCBhY3Rpb24ubGFzdFZhbGlkXSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg1Y2ViZWQ0MyAvLyBtZXRob2QgImFyYzU4X2FkZEV4ZWN1dGlvbktleShieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjAyCiAgICAvLyBicmVhawogICAgYiBleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMDQKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVFeGVjdXRpb246IHsKICAgIGR1cAogICAgYnl0ZWMgMjYgLy8gMHgxZgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMDQtMTIxNwogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbjogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxSZW1vdmVFeGVjdXRpb24+KGRhdGEpCiAgICAvLyAgIGlmICh0aGlzLmV4ZWN1dGlvbnMoYWN0aW9uLmV4ZWN1dGlvbktleSkuZXhpc3RzKSB7CiAgICAvLyAgICAgY29uc3QgZnVuZGVyID0gdGhpcy5leGVjdXRpb25GdW5kZXIodGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLnZhbHVlLnByb3Bvc2FsSUQpCiAgICAvLyAgICAgdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmRlbGV0ZSgpCiAgICAvLyAgICAgdGhpcy5yZWZ1bmQoZnVuZGVyLCBHdWlsZEV4ZWN1dGlvbk1CUikKICAgIC8vICAgfSBlbHNlIHsKICAgIC8vICAgICBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVtb3ZlRXhlY3V0aW9uS2V5Pih7CiAgICAvLyAgICAgICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgICAgICBhcmdzOiBbYWN0aW9uLmV4ZWN1dGlvbktleV0sCiAgICAvLyAgICAgfSkKICAgIC8vICAgfQogICAgLy8gICBicmVhawogICAgLy8gfQogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMzYKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjA2CiAgICAvLyBpZiAodGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmV4aXN0cykgewogICAgZGlnIDgKICAgIGV4dHJhY3QgMiAzMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGV4ZWN1dGlvbnMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBHdWlsZEV4ZWN1dGlvbk1ldGFkYXRhPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhFeGVjdXRpb25zIH0pCiAgICBieXRlYyAxNyAvLyAieCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjA2CiAgICAvLyBpZiAodGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBleGVjdXRlUHJvcG9zYWxfZWxzZV9ib2R5QDMzCiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIwNwogICAgLy8gY29uc3QgZnVuZGVyID0gdGhpcy5leGVjdXRpb25GdW5kZXIodGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLnZhbHVlLnByb3Bvc2FsSUQpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzU1CiAgICAvLyByZXR1cm4gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkuZXhpc3RzID8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuY3JlYXRvciA6IHRoaXMuY3JlYXRvci52YWx1ZQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBleGVjdXRlUHJvcG9zYWxfdGVybmFyeV9mYWxzZUAxMzcKICAgIHB1c2hpbnRzIDM3IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKZXhlY3V0ZVByb3Bvc2FsX3Rlcm5hcnlfbWVyZ2VAMTM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIwOAogICAgLy8gdGhpcy5leGVjdXRpb25zKGFjdGlvbi5leGVjdXRpb25LZXkpLmRlbGV0ZSgpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMDkKICAgIC8vIHRoaXMucmVmdW5kKGZ1bmRlciwgR3VpbGRFeGVjdXRpb25NQlIpCiAgICBpbnRjIDYgLy8gMjIxMDAKICAgIGNhbGxzdWIgcmVmdW5kCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF90ZXJuYXJ5X2ZhbHNlQDEzNzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzU1CiAgICAvLyByZXR1cm4gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkuZXhpc3RzID8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuY3JlYXRvciA6IHRoaXMuY3JlYXRvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gY3JlYXRvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5Q3JlYXRvciB9KQogICAgYnl0ZWMgMjIgLy8gImNyZWF0b3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIHJldHVybiB0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMgPyB0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZS5jcmVhdG9yIDogdGhpcy5jcmVhdG9yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYiBleGVjdXRlUHJvcG9zYWxfdGVybmFyeV9tZXJnZUAxMzgKCmV4ZWN1dGVQcm9wb3NhbF9lbHNlX2JvZHlAMzM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMTEtMTIxNAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3JlbW92ZUV4ZWN1dGlvbktleT4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXhlY3V0aW9uS2V5XSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjEyCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMTIKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMTEtMTIxNAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3JlbW92ZUV4ZWN1dGlvbktleT4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXhlY3V0aW9uS2V5XSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHhkNTg2ODVhZiAvLyBtZXRob2QgImFyYzU4X3JlbW92ZUV4ZWN1dGlvbktleShieXRlWzMyXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIxOAogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkFkZFBsdWdpbjoKICAgIGR1cAogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMTgtMTIyMAogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkFkZFBsdWdpbjoKICAgIC8vICAgdGhpcy5hZGRQbHVnaW4oeyBuYW1lOiAnJywgLi4uZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsQWRkUGx1Z2luPihkYXRhKSB9KQogICAgLy8gICBicmVhawogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMzkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIxOQogICAgLy8gdGhpcy5hZGRQbHVnaW4oeyBuYW1lOiAnJywgLi4uZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsQWRkUGx1Z2luPihkYXRhKSB9KQogICAgZGlnIDkKICAgIGR1cAogICAgZXh0cmFjdCAyIDgKICAgIGRpZyAxCiAgICBleHRyYWN0IDEwIDMyCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBwdXNoaW50IDU5CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgNQogICAgZXh0cmFjdCA0NCAxCiAgICBkaWcgNgogICAgZXh0cmFjdCA0NSA4CiAgICBkaWcgNwogICAgZXh0cmFjdCA1MyA4CiAgICBkaWcgNQogICAgcHVzaGludCAxMTAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgNgogICAgdW5jb3ZlciA2CiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZGlnIDYKICAgIHB1c2hpbnQgNDg4CiAgICBnZXRiaXQKICAgIGRpZyA3CiAgICBpbnRjIDcgLy8gNDg5CiAgICBnZXRiaXQKICAgIGRpZyA4CiAgICBwdXNoaW50IDQ5MAogICAgZ2V0Yml0CiAgICBkaWcgOQogICAgcHVzaGludCA0OTEKICAgIGdldGJpdAogICAgZGlnIDEzCiAgICBleHRyYWN0IDY0IDgKICAgIGRpZyAxNAogICAgZXh0cmFjdCA3MiA4CiAgICBkaWcgMTUKICAgIGV4dHJhY3QgODAgOAogICAgZGlnIDE2CiAgICBleHRyYWN0IDg4IDgKICAgIGRpZyAxNwogICAgZXh0cmFjdCA5NiA4CiAgICB1bmNvdmVyIDE4CiAgICBleHRyYWN0IDEwNCA4CiAgICBkaWcgMTYKICAgIGxlbgogICAgdW5jb3ZlciAxNwogICAgdW5jb3ZlciAxMwogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBwdXNoYnl0ZXMgMHgwMDcyCiAgICB1bmNvdmVyIDE4CiAgICBjb25jYXQKICAgIHVuY292ZXIgMTcKICAgIGNvbmNhdAogICAgZGlnIDE2CiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDE3CiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwNzQKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAxMTYKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgMTcKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDE1CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgY29uY2F0CiAgICBkaWcgMTQKICAgIGxlbgogICAgdW5jb3ZlciAyCiAgICArCiAgICBieXRlY18xIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDE1CiAgICBzZXRiaXQKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDE0CiAgICBzZXRiaXQKICAgIGludGNfMiAvLyAyCiAgICB1bmNvdmVyIDEzCiAgICBzZXRiaXQKICAgIHB1c2hpbnQgMwogICAgdW5jb3ZlciAxMgogICAgc2V0Yml0CiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA5CiAgICBjb25jYXQKICAgIHVuY292ZXIgOAogICAgY29uY2F0CiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGNvbmNhdAogICAgYnl0ZWMgMzMgLy8gMHgwMDAwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY2FsbHN1YiBhZGRQbHVnaW4KICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyMAogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjIxCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uQWRkTmFtZWRQbHVnaW46CiAgICBkdXAKICAgIGJ5dGVjIDE4IC8vIDB4MTUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjIxLTEyMjMKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbjoKICAgIC8vICAgdGhpcy5hZGRQbHVnaW4oZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsQWRkTmFtZWRQbHVnaW4+KGRhdGEpKQogICAgLy8gICBicmVhawogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyMgogICAgLy8gdGhpcy5hZGRQbHVnaW4oZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsQWRkTmFtZWRQbHVnaW4+KGRhdGEpKQogICAgc3dhcAogICAgY2FsbHN1YiBhZGRQbHVnaW4KICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyMwogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjI0CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luOgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMTcyCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBieXRlYyA5IC8vIDB4MjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMjQKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVQbHVnaW46CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyNC0xMjI2CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luOgogICAgLy8gICB0aGlzLnJlbW92ZVBsdWdpbih7IG5hbWU6ICcnLCAuLi5kZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxSZW1vdmVQbHVnaW4+KGRhdGEpIH0pCiAgICAvLyAgIGJyZWFrCiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA0NQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjI1CiAgICAvLyB0aGlzLnJlbW92ZVBsdWdpbih7IG5hbWU6ICcnLCAuLi5kZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxSZW1vdmVQbHVnaW4+KGRhdGEpIH0pCiAgICBkaWcgOQogICAgZHVwCiAgICBleHRyYWN0IDIgOAogICAgc3dhcAogICAgZXh0cmFjdCAxMCAzMgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgcHVzaGJ5dGVzIDB4MDAyYwogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwMmUwMDAwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY2FsbHN1YiByZW1vdmVQbHVnaW4KICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyNgogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjI3CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlTmFtZWRQbHVnaW46CiAgICBkdXAKICAgIGJ5dGVjIDI3IC8vIDB4MjkKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjI3LTEyMjkKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbjoKICAgIC8vICAgdGhpcy5yZW1vdmVQbHVnaW4oZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsUmVtb3ZlTmFtZWRQbHVnaW4+KGRhdGEpKQogICAgLy8gICBicmVhawogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANDgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyOAogICAgLy8gdGhpcy5yZW1vdmVQbHVnaW4oZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsUmVtb3ZlTmFtZWRQbHVnaW4+KGRhdGEpKQogICAgc3dhcAogICAgY2FsbHN1YiByZW1vdmVQbHVnaW4KICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIyOQogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjMwCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uU2V0UGx1Z2luU2V0dGluZ3M6IHsKICAgIGR1cAogICAgYnl0ZWMgMTkgLy8gMHgxNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMzAtMTIzNgogICAgLy8gY2FzZSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzOiB7CiAgICAvLyAgIGNvbnN0IGFjdGlvbiA9IGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbFNldFBsdWdpblNldHRpbmdzPihkYXRhKQogICAgLy8gICAvLyBBbiBlYXJsaWVyIGFjdGlvbiBpbiB0aGlzIHByb3Bvc2FsIG1heSBoYXZlIHJlbW92ZWQgdGhlIHBsdWdpbjsgbmV2ZXIgcmUtY3JlYXRlIGl0cyBwb2xpY3kuCiAgICAvLyAgIGxvZ2dlZEFzc2VydCh0aGlzLnBsdWdpbnMoeyBwbHVnaW46IGFjdGlvbi5wbHVnaW4sIGVzY3JvdzogYWN0aW9uLmVzY3JvdyB9KS5leGlzdHMsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIC8vICAgdGhpcy5wbHVnaW5zKHsgcGx1Z2luOiBhY3Rpb24ucGx1Z2luLCBlc2Nyb3c6IGFjdGlvbi5lc2Nyb3cgfSkudmFsdWUgPSBjbG9uZShhY3Rpb24uc2V0dGluZ3MpCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA1NAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wbHVnaW5zKHsgcGx1Z2luOiBhY3Rpb24ucGx1Z2luLCBlc2Nyb3c6IGFjdGlvbi5lc2Nyb3cgfSkuZXhpc3RzLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBkaWcgOQogICAgZXh0cmFjdCAyIDgKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgMjAgLy8gMHgwMDBhCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyBwbHVnaW5zID0gQm94TWFwPEd1aWxkUGx1Z2luS2V5LCBHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFBsdWdpbnMgfSkKICAgIGJ5dGVjIDIxIC8vICJnIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBsdWdpbnMoeyBwbHVnaW46IGFjdGlvbi5wbHVnaW4sIGVzY3JvdzogYWN0aW9uLmVzY3JvdyB9KS5leGlzdHMsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRANTMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRANTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjM0CiAgICAvLyB0aGlzLnBsdWdpbnMoeyBwbHVnaW46IGFjdGlvbi5wbHVnaW4sIGVzY3JvdzogYWN0aW9uLmVzY3JvdyB9KS52YWx1ZSA9IGNsb25lKGFjdGlvbi5zZXR0aW5ncykKICAgIGRpZyA5CiAgICBleHRyYWN0IDEyIDQ4CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjM1CiAgICAvLyBicmVhawogICAgYiBleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMzcKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25BZGRBbGxvd2FuY2VzOiB7CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjExODEKICAgIC8vIHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlLnN0YXR1cyA9IEd1aWxkUHJvcG9zYWxTdGF0dXNFeGVjdXRlZAogICAgYnl0ZWMgMTQgLy8gMHgzMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTIzNwogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkFkZEFsbG93YW5jZXM6IHsKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjM3LTEyNDQKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25BZGRBbGxvd2FuY2VzOiB7CiAgICAvLyAgIGNvbnN0IGFjdGlvbiA9IGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbEFkZEFsbG93YW5jZXM+KGRhdGEpCiAgICAvLyAgIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9hZGRBbGxvd2FuY2VzPih7CiAgICAvLyAgICAgYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgLy8gICAgIGFyZ3M6IFthY3Rpb24uZXNjcm93LCBhY3Rpb24uYWxsb3dhbmNlc10sCiAgICAvLyAgIH0pCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA1OQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjM5LTEyNDIKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9hZGRBbGxvd2FuY2VzPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5hbGxvd2FuY2VzXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjQxCiAgICAvLyBhcmdzOiBbYWN0aW9uLmVzY3JvdywgYWN0aW9uLmFsbG93YW5jZXNdLAogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBkaWcgMgogICAgbGVuCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjQwCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNDAKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyMzktMTI0MgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2FkZEFsbG93YW5jZXM+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgLy8gICBhcmdzOiBbYWN0aW9uLmVzY3JvdywgYWN0aW9uLmFsbG93YW5jZXNdLAogICAgLy8gfSkKICAgIGJ5dGVjIDU5IC8vIG1ldGhvZCAiYXJjNThfYWRkQWxsb3dhbmNlcyhzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI0MwogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjQ1CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlQWxsb3dhbmNlczogewogICAgZHVwCiAgICBieXRlYyAzNCAvLyAweDNjCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI0NS0xMjUyCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlQWxsb3dhbmNlczogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxSZW1vdmVBbGxvd2FuY2VzPihkYXRhKQogICAgLy8gICBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVtb3ZlQWxsb3dhbmNlcz4oewogICAgLy8gICAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgICBhcmdzOiBbYWN0aW9uLmVzY3JvdywgYWN0aW9uLmFzc2V0c10sCiAgICAvLyAgIH0pCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA2NAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjQ3LTEyNTAKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZW1vdmVBbGxvd2FuY2VzPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5hc3NldHNdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNDkKICAgIC8vIGFyZ3M6IFthY3Rpb24uZXNjcm93LCBhY3Rpb24uYXNzZXRzXSwKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZGlnIDIKICAgIGxlbgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI0OAogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gd2FsbGV0ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5V2FsbGV0IH0pCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjQ4CiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjQ3LTEyNTAKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZW1vdmVBbGxvd2FuY2VzPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5hc3NldHNdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGQ1ZGQzODJiIC8vIG1ldGhvZCAiYXJjNThfcmVtb3ZlQWxsb3dhbmNlcyhzdHJpbmcsdWludDY0W10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjUxCiAgICAvLyBicmVhawogICAgYiBleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA2NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNTMKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25OZXdFc2Nyb3c6IHsKICAgIGR1cAogICAgYnl0ZWMgMzUgLy8gMHg0NgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNTMtMTI2MAogICAgLy8gY2FzZSBHdWlsZEFjdGlvbk5ld0VzY3JvdzogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxOZXdFc2Nyb3c+KGRhdGEpCiAgICAvLyAgIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9uZXdFc2Nyb3c+KHsKICAgIC8vICAgICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgICAgYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5hZGRyZXNzXSwKICAgIC8vICAgfSkKICAgIC8vICAgYnJlYWsKICAgIC8vIH0KICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDY5CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNTUtMTI1OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X25ld0VzY3Jvdz4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXNjcm93LCBhY3Rpb24uYWRkcmVzc10sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI1NwogICAgLy8gYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5hZGRyZXNzXSwKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkaWcgOQogICAgZXh0cmFjdCA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjU2CiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNTYKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNTUtMTI1OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X25ld0VzY3Jvdz4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXNjcm93LCBhY3Rpb24uYWRkcmVzc10sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4ZGY0OWI0ZmQgLy8gbWV0aG9kICJhcmM1OF9uZXdFc2Nyb3coc3RyaW5nLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNTkKICAgIC8vIGJyZWFrCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDY5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI2MQogICAgLy8gY2FzZSBHdWlsZEFjdGlvblRvZ2dsZUVzY3Jvd0xvY2s6IHsKICAgIGR1cAogICAgYnl0ZWMgMzYgLy8gMHg0NwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNjEtMTI2OAogICAgLy8gY2FzZSBHdWlsZEFjdGlvblRvZ2dsZUVzY3Jvd0xvY2s6IHsKICAgIC8vICAgY29uc3QgYWN0aW9uID0gZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsVG9nZ2xlRXNjcm93TG9jaz4oZGF0YSkKICAgIC8vICAgYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3RvZ2dsZUVzY3Jvd0xvY2s+KHsKICAgIC8vICAgICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgICAgYXJnczogW2FjdGlvbi5lc2Nyb3ddLAogICAgLy8gICB9KQogICAgLy8gICBicmVhawogICAgLy8gfQogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANzQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI2My0xMjY2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdG9nZ2xlRXNjcm93TG9jaz4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXNjcm93XSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjY1CiAgICAvLyBhcmdzOiBbYWN0aW9uLmVzY3Jvd10sCiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI2NAogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gd2FsbGV0ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5V2FsbGV0IH0pCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjY0CiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjYzLTEyNjYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF90b2dnbGVFc2Nyb3dMb2NrPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5lc2Nyb3ddLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDA5NDNiYWI5IC8vIG1ldGhvZCAiYXJjNThfdG9nZ2xlRXNjcm93TG9jayhzdHJpbmcpKHVpbnQ2NCxhZGRyZXNzLGJvb2wpIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGxlbgogICAgcHVzaGludCA0MQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNjcKICAgIC8vIGJyZWFrCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDc0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI2OQogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlY2xhaW06IHsKICAgIGR1cAogICAgYnl0ZWMgMzcgLy8gMHg0OAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNjktMTI3NgogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlY2xhaW06IHsKICAgIC8vICAgY29uc3QgYWN0aW9uID0gZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsUmVjbGFpbT4oZGF0YSkKICAgIC8vICAgYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3JlY2xhaW0+KHsKICAgIC8vICAgICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgICAgYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5yZWNsYWltc10sCiAgICAvLyAgIH0pCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA3OQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjcxLTEyNzQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWNsYWltPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5yZWNsYWltc10sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI3MwogICAgLy8gYXJnczogW2FjdGlvbi5lc2Nyb3csIGFjdGlvbi5yZWNsYWltc10sCiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGRpZyAyCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNzIKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI3MgogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI3MS0xMjc0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVjbGFpbT4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFthY3Rpb24uZXNjcm93LCBhY3Rpb24ucmVjbGFpbXNdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGViYWYxNGEwIC8vIG1ldGhvZCAiYXJjNThfcmVjbGFpbShzdHJpbmcsKHVpbnQ2NCx1aW50NjQsYm9vbClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNzUKICAgIC8vIGJyZWFrCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDc5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI3NwogICAgLy8gY2FzZSBHdWlsZEFjdGlvblNldFByb3Bvc2FsU2V0dGluZ3M6IHsKICAgIGR1cAogICAgYnl0ZWMgNDkgLy8gMHg1MAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyNzctMTI4MQogICAgLy8gY2FzZSBHdWlsZEFjdGlvblNldFByb3Bvc2FsU2V0dGluZ3M6IHsKICAgIC8vICAgY29uc3QgYWN0aW9uID0gZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsU2V0U2V0dGluZ3M+KGRhdGEpCiAgICAvLyAgIHRoaXMuc2V0U2V0dGluZ3NGb3JBY3Rpb24oYWN0aW9uLmFjdGlvblR5cGUsIGFjdGlvbi5zZXR0aW5ncywgcHJvcG9zYWxJRCkKICAgIC8vICAgYnJlYWsKICAgIC8vIH0KICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDgzCiAgICBwb3AKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI3OQogICAgLy8gdGhpcy5zZXRTZXR0aW5nc0ZvckFjdGlvbihhY3Rpb24uYWN0aW9uVHlwZSwgYWN0aW9uLnNldHRpbmdzLCBwcm9wb3NhbElEKQogICAgZGlnIDgKICAgIGR1cAogICAgZXh0cmFjdCAyIDEKICAgIHN3YXAKICAgIGV4dHJhY3QgMyA0OAogICAgZGlnIDUKICAgIGNhbGxzdWIgc2V0U2V0dGluZ3NGb3JBY3Rpb24KICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI4MAogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAODM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjgyCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uU2V0UHJvcG9zYWxBY3Rpb25MaW1pdDoKICAgIGR1cAogICAgcHVzaGJ5dGVzIDB4NTEKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjgyLTEyODQKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25TZXRQcm9wb3NhbEFjdGlvbkxpbWl0OgogICAgLy8gICB0aGlzLnByb3Bvc2FsQWN0aW9uTGltaXQudmFsdWUgPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxTZXRBY3Rpb25MaW1pdD4oZGF0YSkubGltaXQKICAgIC8vICAgYnJlYWsKICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDg2CiAgICBwb3AKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI4MwogICAgLy8gdGhpcy5wcm9wb3NhbEFjdGlvbkxpbWl0LnZhbHVlID0gZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsU2V0QWN0aW9uTGltaXQ+KGRhdGEpLmxpbWl0CiAgICBkaWcgOAogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIHByb3Bvc2FsQWN0aW9uTGltaXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UHJvcG9zYWxBY3Rpb25MaW1pdCB9KQogICAgYnl0ZWMgMzAgLy8gInByb3Bvc2FsX2FjdGlvbl9saW1pdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyODMKICAgIC8vIHRoaXMucHJvcG9zYWxBY3Rpb25MaW1pdC52YWx1ZSA9IGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbFNldEFjdGlvbkxpbWl0PihkYXRhKS5saW1pdAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyODQKICAgIC8vIGJyZWFrCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDg2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI4NQogICAgLy8gY2FzZSBHdWlsZEFjdGlvbk5ld1dhbGxldDogewogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHg1MgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyODUtMTI4OQogICAgLy8gY2FzZSBHdWlsZEFjdGlvbk5ld1dhbGxldDogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxOZXdXYWxsZXQ+KGRhdGEpCiAgICAvLyAgIHRoaXMuY3JlYXRlV2FsbGV0KGFjdGlvbi5uaWNrbmFtZSwgYWN0aW9uLnNhbHQpCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA5MAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjg3CiAgICAvLyB0aGlzLmNyZWF0ZVdhbGxldChhY3Rpb24ubmlja25hbWUsIGFjdGlvbi5zYWx0KQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgOQogICAgZXh0cmFjdCA0IDMyCiAgICBjYWxsc3ViIGNyZWF0ZVdhbGxldAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjg4CiAgICAvLyBicmVhawogICAgYiBleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA5MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyOTAKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25Db25zZW5zdXM6IHsKICAgIGR1cAogICAgYnl0ZWMgMzggLy8gMHg1MwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEyOTAtMTI5NwogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkNvbnNlbnN1czogewogICAgLy8gICBjb25zdCBhbW91bnQgPSB0aGlzLmNvbnNlbnN1c0FjdGlvbk1icihkYXRhKQogICAgLy8gICBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLmFwcGx5Q29uc2Vuc3VzQWN0aW9uPih7CiAgICAvLyAgICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICAgIGFyZ3M6IFtpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5jb25zZW5zdXMudmFsdWUuYWRkcmVzcywgYW1vdW50LCBmZWU6IDAgfSksIHByb3Bvc2FsSUQsIGRhdGFdLAogICAgLy8gICB9KQogICAgLy8gICBicmVhawogICAgLy8gfQogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAOTYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI5MQogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy5jb25zZW5zdXNBY3Rpb25NYnIoZGF0YSkKICAgIHN3YXAKICAgIGNhbGxzdWIgY29uc2Vuc3VzQWN0aW9uTWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjkyLTEyOTUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUuYXBwbHlDb25zZW5zdXNBY3Rpb24+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLCBwcm9wb3NhbElELCBkYXRhXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjk0CiAgICAvLyBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLCBwcm9wb3NhbElELCBkYXRhXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI5NAogICAgLy8gYXJnczogW2l0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiB0aGlzLmNvbnNlbnN1cy52YWx1ZS5hZGRyZXNzLCBhbW91bnQsIGZlZTogMCB9KSwgcHJvcG9zYWxJRCwgZGF0YV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjkyLTEyOTUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUuYXBwbHlDb25zZW5zdXNBY3Rpb24+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLmFkZHJlc3MsIGFtb3VudCwgZmVlOiAwIH0pLCBwcm9wb3NhbElELCBkYXRhXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NjdlZDVmZWQgLy8gbWV0aG9kICJhcHBseUNvbnNlbnN1c0FjdGlvbihwYXksdWludDY0LGJ5dGVbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI5NgogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAOTY6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTI5OAogICAgLy8gY2FzZSBHdWlsZEFjdGlvblNldENvbnNlbnN1c0FjdGlvblNldHRpbmdzOiB7CiAgICBkdXAKICAgIGJ5dGVjIDM5IC8vIDB4NTQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMjk4LTEzMDgKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25TZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5nczogewogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxDb25zZW5zdXNBY3Rpb25TZXR0aW5ncz4oZGF0YSkKICAgIC8vICAgdGhpcy52YWxpZGF0ZVNldHRpbmdzKGFjdGlvbi5zZXR0aW5ncykKICAgIC8vICAgdGhpcy5yZXF1aXJlQXR0YWluYWJsZU1pbmltdW0oCiAgICAvLyAgICAgcHJvcG9zYWxJRCwKICAgIC8vICAgICB0aGlzLmdldENvbnNlbnN1c0FjdGlvblNldHRpbmdzKGFjdGlvbi5jb2RlKS5taW5pbXVtQXBwcm92YWxzLAogICAgLy8gICAgIGFjdGlvbi5zZXR0aW5ncy5taW5pbXVtQXBwcm92YWxzLAogICAgLy8gICApCiAgICAvLyAgIHRoaXMuY29uc2Vuc3VzQWN0aW9ucyhhY3Rpb24uY29kZSkudmFsdWUgPSBjbG9uZShhY3Rpb24uc2V0dGluZ3MpCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMDAKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMwMAogICAgLy8gdGhpcy52YWxpZGF0ZVNldHRpbmdzKGFjdGlvbi5zZXR0aW5ncykKICAgIGRpZyA4CiAgICBkdXAKICAgIGV4dHJhY3QgMTAgNDgKICAgIGR1cAogICAgY2FsbHN1YiB2YWxpZGF0ZVNldHRpbmdzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMDMKICAgIC8vIHRoaXMuZ2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3MoYWN0aW9uLmNvZGUpLm1pbmltdW1BcHByb3ZhbHMsCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuZ2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3MKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzA0CiAgICAvLyBhY3Rpb24uc2V0dGluZ3MubWluaW11bUFwcHJvdmFscywKICAgIGRpZyAyCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMwMS0xMzA1CiAgICAvLyB0aGlzLnJlcXVpcmVBdHRhaW5hYmxlTWluaW11bSgKICAgIC8vICAgcHJvcG9zYWxJRCwKICAgIC8vICAgdGhpcy5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncyhhY3Rpb24uY29kZSkubWluaW11bUFwcHJvdmFscywKICAgIC8vICAgYWN0aW9uLnNldHRpbmdzLm1pbmltdW1BcHByb3ZhbHMsCiAgICAvLyApCiAgICBkaWcgNwogICAgY292ZXIgMgogICAgY2FsbHN1YiByZXF1aXJlQXR0YWluYWJsZU1pbmltdW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMDYKICAgIC8vIHRoaXMuY29uc2Vuc3VzQWN0aW9ucyhhY3Rpb24uY29kZSkudmFsdWUgPSBjbG9uZShhY3Rpb24uc2V0dGluZ3MpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIGNvbnNlbnN1c0FjdGlvbnMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeENvbnNlbnN1c0FjdGlvbnMgfSkKICAgIGJ5dGVjIDMxIC8vICJjIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzA2CiAgICAvLyB0aGlzLmNvbnNlbnN1c0FjdGlvbnMoYWN0aW9uLmNvZGUpLnZhbHVlID0gY2xvbmUoYWN0aW9uLnNldHRpbmdzKQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMwNwogICAgLy8gYnJlYWsKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX2Jsb2NrQDEyMQoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMTAwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMwOQogICAgLy8gY2FzZSBHdWlsZEFjdGlvblVwZGF0ZVdhbGxldDoKICAgIGR1cAogICAgYnl0ZWMgNDAgLy8gMHg1YQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMDktMTMxNQogICAgLy8gY2FzZSBHdWlsZEFjdGlvblVwZGF0ZVdhbGxldDoKICAgIC8vICAgbG9nZ2VkQXNzZXJ0KHRoaXMud2FsbGV0RmFjdG9yeS5oYXNWYWx1ZSwgZXJyR3VpbGRJbnZhbGlkV2FsbGV0RmFjdG9yeSkKICAgIC8vICAgYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS51cGRhdGVXYWxsZXQ+KHsKICAgIC8vICAgICBhcHBJZDogdGhpcy53YWxsZXRGYWN0b3J5LnZhbHVlLAogICAgLy8gICAgIGFyZ3M6IFt0aGlzLndhbGxldC52YWx1ZV0sCiAgICAvLyAgIH0pCiAgICAvLyAgIGJyZWFrCiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2FsbGV0RmFjdG9yeS5oYXNWYWx1ZSwgZXJyR3VpbGRJbnZhbGlkV2FsbGV0RmFjdG9yeSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHdhbGxldEZhY3RvcnkgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXRGYWN0b3J5IH0pCiAgICBieXRlYyAyNCAvLyAid2FsbGV0X2ZhY3RvcnkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzEwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53YWxsZXRGYWN0b3J5Lmhhc1ZhbHVlLCBlcnJHdWlsZEludmFsaWRXYWxsZXRGYWN0b3J5KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYm56IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMTA0CiAgICBieXRlYyA1NSAvLyAiRVJSOmVyckd3bGYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3dsZgoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEAxMDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzExLTEzMTQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50RmFjdG9yeS5wcm90b3R5cGUudXBkYXRlV2FsbGV0Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLndhbGxldC52YWx1ZV0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMxMwogICAgLy8gYXJnczogW3RoaXMud2FsbGV0LnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMxMwogICAgLy8gYXJnczogW3RoaXMud2FsbGV0LnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzEyCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXRGYWN0b3J5LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gd2FsbGV0RmFjdG9yeSA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldEZhY3RvcnkgfSkKICAgIGJ5dGVjIDI0IC8vICJ3YWxsZXRfZmFjdG9yeSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMTIKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzExLTEzMTQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50RmFjdG9yeS5wcm90b3R5cGUudXBkYXRlV2FsbGV0Pih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLndhbGxldC52YWx1ZV0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4MDFlMjJmM2YgLy8gbWV0aG9kICJ1cGRhdGVXYWxsZXQodWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzE1CiAgICAvLyBicmVhawogICAgYiBleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzE2CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW46IHsKICAgIGR1cAogICAgYnl0ZWMgMjggLy8gMHg1YgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMTYtMTMyNQogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkNoYW5nZUFkbWluOiB7CiAgICAvLyAgIC8vIEhhbmQgdGhlIHRyZWFzdXJ5IHRvIGFub3RoZXIgYWRtaW5pc3RyYXRvciBhbmQgZnJlZSB0aGUgc2xvdCBzbyBhIG5ldyB3YWxsZXQgY2FuIGJlIGF0dGFjaGVkLgogICAgLy8gICBjb25zdCBhY3Rpb24gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxDaGFuZ2VBZG1pbj4oZGF0YSkKICAgIC8vICAgYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NoYW5nZUFkbWluPih7CiAgICAvLyAgICAgYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgLy8gICAgIGFyZ3M6IFthY3Rpb24uYWRtaW5dLAogICAgLy8gICB9KQogICAgLy8gICB0aGlzLndhbGxldC5kZWxldGUoKQogICAgLy8gICBicmVhawogICAgLy8gfQogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMTExCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMTktMTMyMgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NoYW5nZUFkbWluPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5hZG1pbl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMyMQogICAgLy8gYXJnczogW2FjdGlvbi5hZG1pbl0sCiAgICBkaWcgOAogICAgZXh0cmFjdCAyIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzIwCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMjAKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMTktMTMyMgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2NoYW5nZUFkbWluPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjdGlvbi5hZG1pbl0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4ZDI0Yjc1NTYgLy8gbWV0aG9kICJhcmM1OF9jaGFuZ2VBZG1pbihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMyMwogICAgLy8gdGhpcy53YWxsZXQuZGVsZXRlKCkKICAgIGFwcF9nbG9iYWxfZGVsCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzI0CiAgICAvLyBicmVhawogICAgYiBleGVjdXRlUHJvcG9zYWxfYmxvY2tAMTIxCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzI2CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uRnVsbHlJbml0aWFsaXplOgogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHg2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMjYtMTMzMAogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkZ1bGx5SW5pdGlhbGl6ZToKICAgIC8vICAgbG9nZ2VkQXNzZXJ0KHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVQYXJ0aWFsbHlJbml0aWFsaXplZCwgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWxTdGF0ZSkKICAgIC8vICAgdGhpcy5yZXF1aXJlV2FsbGV0KCkKICAgIC8vICAgdGhpcy5zdGF0ZS52YWx1ZSA9IEd1aWxkU3RhdGVGdWxseUluaXRpYWxpemVkCiAgICAvLyAgIGJyZWFrCiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMTYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVQYXJ0aWFsbHlJbml0aWFsaXplZCwgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWxTdGF0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHN0YXRlID0gR2xvYmFsU3RhdGU8R3VpbGRTdGF0ZT4oeyBpbml0aWFsVmFsdWU6IEd1aWxkU3RhdGVEcmFmdCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5U3RhdGUgfSkKICAgIGJ5dGVjIDcgLy8gInN0YXRlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVQYXJ0aWFsbHlJbml0aWFsaXplZCwgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWxTdGF0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoYnl0ZXMgMHgwMQogICAgPT0KICAgIGJueiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfYXNzZXJ0QDExNQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckdwc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BzdAoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEAxMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzI4CiAgICAvLyB0aGlzLnJlcXVpcmVXYWxsZXQoKQogICAgY2FsbHN1YiByZXF1aXJlV2FsbGV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHN0YXRlID0gR2xvYmFsU3RhdGU8R3VpbGRTdGF0ZT4oeyBpbml0aWFsVmFsdWU6IEd1aWxkU3RhdGVEcmFmdCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5U3RhdGUgfSkKICAgIGJ5dGVjIDcgLy8gInN0YXRlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMyOQogICAgLy8gdGhpcy5zdGF0ZS52YWx1ZSA9IEd1aWxkU3RhdGVGdWxseUluaXRpYWxpemVkCiAgICBwdXNoYnl0ZXMgMHgwMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMzAKICAgIC8vIGJyZWFrCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDExNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMzEKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25Mb2NrUGx1Z2luU2V0OgogICAgcHVzaGJ5dGVzIDB4NmUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzMxLTEzMzMKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25Mb2NrUGx1Z2luU2V0OgogICAgLy8gICB0aGlzLnBsdWdpblNldExvY2tlZC52YWx1ZSA9IHRydWUKICAgIC8vICAgYnJlYWsKICAgIGJ6IGV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDExOQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTgxCiAgICAvLyBwbHVnaW5TZXRMb2NrZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVBsdWdpblNldExvY2tlZCB9KQogICAgYnl0ZWMgMTUgLy8gInBsdWdpbnNfbG9ja2VkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTMzMgogICAgLy8gdGhpcy5wbHVnaW5TZXRMb2NrZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMzMKICAgIC8vIGJyZWFrCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF9ibG9ja0AxMjEKCmV4ZWN1dGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDExOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzMzUKICAgIC8vIGxvZ2dlZEVycihlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyR2FjbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHYWNuCgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfd2hpbGVAMTIyOgogICAgYnVyeSAxCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM0MQogICAgLy8gY29uc3QgZnJlZUFmdGVyID0gdGhpcy5mcmVlQmFsYW5jZSgpCiAgICBjYWxsc3ViIGZyZWVCYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzQyCiAgICAvLyBpZiAocHJvcG9zYWwudm90aW5nVHMgIT09IDApIHsKICAgIGRpZyA1CiAgICBieiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNDQKICAgIC8vIGxvZ2dlZEFzc2VydChmcmVlQWZ0ZXIgKyBoZWxkID49IGZyZWVCZWZvcmUsIGVyckd1aWxkSW52YWxpZFBheW1lbnQpCiAgICBkdXAKICAgIGRpZyA3CiAgICArCiAgICBkaWcgMwogICAgPj0KICAgIGJueiBleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMjYKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJyR3BheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcGF5CgpleGVjdXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUAxMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzQ2CiAgICAvLyBjb25zdCBiYXNlbGluZTogdWludDY0ID0gZnJlZUJlZm9yZSA+IGhlbGQgPyBmcmVlQmVmb3JlIC0gaGVsZCA6IDAKICAgIGRpZyAyCiAgICBkaWcgNwogICAgPgogICAgYnogZXhlY3V0ZVByb3Bvc2FsX3Rlcm5hcnlfZmFsc2VAMTI4CiAgICB1bmNvdmVyIDIKICAgIGRpZyA2CiAgICAtCiAgICBjb3ZlciAyCgpleGVjdXRlUHJvcG9zYWxfdGVybmFyeV9tZXJnZUAxMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzQ3CiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IGZyZWVBZnRlciA+IGJhc2VsaW5lID8gZnJlZUFmdGVyIC0gYmFzZWxpbmUgOiAwCiAgICBkdXAKICAgIGRpZyAzCiAgICA+CiAgICBieiBleGVjdXRlUHJvcG9zYWxfdGVybmFyeV9mYWxzZUAxMzEKICAgIHVuY292ZXIgMgogICAgLQogICAgc3dhcAoKZXhlY3V0ZVByb3Bvc2FsX3Rlcm5hcnlfbWVyZ2VAMTMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM0OAogICAgLy8gaWYgKGhlbGQgPiAwKSB7CiAgICBkaWcgNQogICAgYnogZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMTM0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzQ5CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IGhlbGQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIHJlc2VydmVkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVzZXJ2ZWQgfSkKICAgIGJ5dGVjXzMgLy8gInJlc2VydmVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM0OQogICAgLy8gdGhpcy5yZXNlcnZlZC52YWx1ZSAtPSBoZWxkCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDYKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzQ5CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IGhlbGQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzUwCiAgICAvLyB0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS52YWx1ZS5mZWVzUGFpZCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA4NQogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKZXhlY3V0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VAMTM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM1MgogICAgLy8gdGhpcy5yZWZ1bmQocHJvcG9zYWwuY3JlYXRvciwgcmVmdW5kKQogICAgcHVzaGludHMgMzcgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBzd2FwCiAgICBjYWxsc3ViIHJlZnVuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTE2OQogICAgLy8gZXhlY3V0ZVByb3Bvc2FsKHByb3Bvc2FsSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZXhlY3V0ZVByb3Bvc2FsX3Rlcm5hcnlfZmFsc2VAMTMxOgogICAgcG9wCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNDcKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gZnJlZUFmdGVyID4gYmFzZWxpbmUgPyBmcmVlQWZ0ZXIgLSBiYXNlbGluZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBiIGV4ZWN1dGVQcm9wb3NhbF90ZXJuYXJ5X21lcmdlQDEzMgoKZXhlY3V0ZVByb3Bvc2FsX3Rlcm5hcnlfZmFsc2VAMTI4OgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNDYKICAgIC8vIGNvbnN0IGJhc2VsaW5lOiB1aW50NjQgPSBmcmVlQmVmb3JlID4gaGVsZCA/IGZyZWVCZWZvcmUgLSBoZWxkIDogMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIGIgZXhlY3V0ZVByb3Bvc2FsX3Rlcm5hcnlfbWVyZ2VAMTI5CgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM1NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM1OAogICAgLy8gaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc3RhdGUgPSBHbG9iYWxTdGF0ZTxHdWlsZFN0YXRlPih7IGluaXRpYWxWYWx1ZTogR3VpbGRTdGF0ZURyYWZ0LCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlTdGF0ZSB9KQogICAgYnl0ZWMgNyAvLyAic3RhdGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzU4CiAgICAvLyBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PT0gR3VpbGRTdGF0ZURyYWZ0KSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMSAvLyAweDAwCiAgICA9PQogICAgYnogdXBkYXRlX2Vsc2VfYm9keUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzU5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcyA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJHdWlsZEZhY3RvcnlPbmx5KQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9pZl9lbHNlQDMxCiAgICBieXRlYyA1MyAvLyAiRVJSOmVyckdmYWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2ZhYwoKdXBkYXRlX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzgwCiAgICAvLyBsb2dnZWRBc3NlcnQobmV3VmVyc2lvbiAhPT0gJycsIGVyckd1aWxkSW52YWxpZFZlcnNpb24pCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMzCiAgICBieXRlYyA1NCAvLyAiRVJSOmVyckd2ZXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3ZlcgoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTYgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzgxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM1NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp1cGRhdGVfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGV4ZWN1dGlvbnMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBHdWlsZEV4ZWN1dGlvbk1ldGFkYXRhPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhFeGVjdXRpb25zIH0pCiAgICBieXRlYyAxNyAvLyAieCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmV4ZWN1dGlvbnMoVHhuLmxlYXNlKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIHR4biBMZWFzZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBleGVjdXRpb25zID0gQm94TWFwPGJ5dGVzPDMyPiwgR3VpbGRFeGVjdXRpb25NZXRhZGF0YT4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4RXhlY3V0aW9ucyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzYxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leGVjdXRpb25zKFR4bi5sZWFzZSkuZXhpc3RzLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCnVwZGF0ZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gZXhlY3V0aW9ucyA9IEJveE1hcDxieXRlczwzMj4sIEd1aWxkRXhlY3V0aW9uTWV0YWRhdGE+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeEV4ZWN1dGlvbnMgfSkKICAgIGJ5dGVjIDE3IC8vICJ4IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM2MgogICAgLy8gY29uc3QgbWV0YWRhdGEgPSBjbG9uZSh0aGlzLmV4ZWN1dGlvbnMoVHhuLmxlYXNlKS52YWx1ZSkKICAgIHR4biBMZWFzZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBleGVjdXRpb25zID0gQm94TWFwPGJ5dGVzPDMyPiwgR3VpbGRFeGVjdXRpb25NZXRhZGF0YT4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4RXhlY3V0aW9ucyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzYyCiAgICAvLyBjb25zdCBtZXRhZGF0YSA9IGNsb25lKHRoaXMuZXhlY3V0aW9ucyhUeG4ubGVhc2UpLnZhbHVlKQogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM2MwogICAgLy8gY29uc3QgcHJvcG9zYWwgPSBjbG9uZSh0aGlzLnByb3Bvc2FscyhtZXRhZGF0YS5wcm9wb3NhbElEKS52YWx1ZSkKICAgIGV4dHJhY3QgMCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHByb3Bvc2FscyA9IEJveE1hcDx1aW50NjQsIEd1aWxkUHJvcG9zYWw+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFByb3Bvc2FscyB9KQogICAgYnl0ZWMgNSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzYzLTEzNjQKICAgIC8vIGNvbnN0IHByb3Bvc2FsID0gY2xvbmUodGhpcy5wcm9wb3NhbHMobWV0YWRhdGEucHJvcG9zYWxJRCkudmFsdWUpCiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzY0CiAgICAvLyBsb2dnZWRBc3NlcnQocHJvcG9zYWwuc3RhdHVzID09PSBHdWlsZFByb3Bvc2FsU3RhdHVzRXhlY3V0ZWQsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsU3RhdGUpCiAgICBieXRlYyAxNCAvLyAweDMyCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckdwc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BzdAoKdXBkYXRlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM2NQogICAgLy8gY29uc3QgYWN0aW9uID0gY2xvbmUocHJvcG9zYWwuYWN0aW9uc1ttZXRhZGF0YS5pbmRleF0pCiAgICB1bmNvdmVyIDIKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzY1LTEzNjYKICAgIC8vIGNvbnN0IGFjdGlvbiA9IGNsb25lKHByb3Bvc2FsLmFjdGlvbnNbbWV0YWRhdGEuaW5kZXhdKQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvblVwZ3JhZGVBcHAsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgOTUKICAgIGludGNfMiAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZGlnIDEKICAgID4KICAgIGFzc2VydCAvLyBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzIgLy8gMgogICAgKgogICAgcHVzaGludCA5NwogICAgKwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMQogICAgc3dhcAogICAgaW50Y18yIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBwdXNoaW50IDk3CiAgICArCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNjYKICAgIC8vIGxvZ2dlZEFzc2VydChhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25VcGdyYWRlQXBwLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBieXRlYyAxMSAvLyAweDBhCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzY3CiAgICAvLyBjb25zdCB1cGdyYWRlID0gZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsVXBncmFkZUFwcD4oYWN0aW9uLmRhdGEpCiAgICBkaWcgMgogICAgZHVwCiAgICBwdXNoaW50IDk1CiAgICBpbnRjXzIgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIHVuY292ZXIgNQogICAgPgogICAgYXNzZXJ0IC8vIGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBpbnRjXzIgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIHB1c2hpbnQgMTAwCiAgICArCiAgICBkdXAyCiAgICBpbnRjXzIgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBib3hfZXh0cmFjdAogICAgZHVwCiAgICBidXJ5IDYKICAgIGR1cAogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgNQogICAgaW50Y18yIC8vIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNjgKICAgIC8vIGxvZ2dlZEFzc2VydCh1cGdyYWRlLmFwcCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLmlkICYmIHVwZ3JhZGUuZXhlY3V0aW9uS2V5ID09PSBUeG4ubGVhc2UsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGV4dHJhY3RfdWludDY0CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICBieiB1cGRhdGVfYm9vbF9mYWxzZUAxNAogICAgZGlnIDQKICAgIGV4dHJhY3QgMTAgMzIKICAgIHR4biBMZWFzZQogICAgPT0KICAgIGJ6IHVwZGF0ZV9ib29sX2ZhbHNlQDE0CiAgICBpbnRjXzEgLy8gMQoKdXBkYXRlX2Jvb2xfbWVyZ2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzY4CiAgICAvLyBsb2dnZWRBc3NlcnQodXBncmFkZS5hcHAgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCAmJiB1cGdyYWRlLmV4ZWN1dGlvbktleSA9PT0gVHhuLmxlYXNlLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckdhY24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2FjbgoKdXBkYXRlX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNjkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwucm91bmQgPj0gdXBncmFkZS5maXJzdFZhbGlkICYmIEdsb2JhbC5yb3VuZCA8PSB1cGdyYWRlLmxhc3RWYWxpZCwgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgZ2xvYmFsIFJvdW5kCiAgICBkaWcgNQogICAgcHVzaGludCA0NAogICAgZXh0cmFjdF91aW50NjQKICAgID49CiAgICBieiB1cGRhdGVfYm9vbF9mYWxzZUAyMAogICAgZ2xvYmFsIFJvdW5kCiAgICBkaWcgNQogICAgcHVzaGludCA1MgogICAgZXh0cmFjdF91aW50NjQKICAgIDw9CiAgICBieiB1cGRhdGVfYm9vbF9mYWxzZUAyMAogICAgaW50Y18xIC8vIDEKCnVwZGF0ZV9ib29sX21lcmdlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSB1cGdyYWRlLmZpcnN0VmFsaWQgJiYgR2xvYmFsLnJvdW5kIDw9IHVwZ3JhZGUubGFzdFZhbGlkLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckdhY24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2FjbgoKdXBkYXRlX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNzAKICAgIC8vIGxldCBhcHByb3ZlZEdyb3VwID0gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNzEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB1cGdyYWRlLmdyb3Vwcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKCnVwZGF0ZV93aGlsZV90b3BAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzcxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdXBncmFkZS5ncm91cHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyA0CiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkaWcgNAogICAgPgogICAgYnogdXBkYXRlX2FmdGVyX3doaWxlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzcxLTEzNzIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB1cGdyYWRlLmdyb3Vwcy5sZW5ndGg7IGkgKz0gMSkgewogICAgLy8gICBpZiAodXBncmFkZS5ncm91cHNbaV0gPT09IEdsb2JhbC5ncm91cElkKSB7CiAgICBleHRyYWN0IDIgMAogICAgZGlnIDMKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM3MgogICAgLy8gaWYgKHVwZ3JhZGUuZ3JvdXBzW2ldID09PSBHbG9iYWwuZ3JvdXBJZCkgewogICAgZ2xvYmFsIEdyb3VwSUQKICAgID09CiAgICBieiB1cGRhdGVfYWZ0ZXJfaWZfZWxzZUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM3MwogICAgLy8gYXBwcm92ZWRHcm91cCA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDQKCnVwZGF0ZV9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM3MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHVwZ3JhZGUuZ3JvdXBzLmxlbmd0aDsgaSArPSAxKSB7CiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAyCiAgICBiIHVwZGF0ZV93aGlsZV90b3BAMjQKCnVwZGF0ZV9hZnRlcl93aGlsZUAyODoKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNzYKICAgIC8vIGxvZ2dlZEFzc2VydChhcHByb3ZlZEdyb3VwLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBkaWcgMgogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMzAKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGV4ZWN1dGlvbnMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBHdWlsZEV4ZWN1dGlvbk1ldGFkYXRhPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhFeGVjdXRpb25zIH0pCiAgICBieXRlYyAxNyAvLyAieCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzNzcKICAgIC8vIHRoaXMuZXhlY3V0aW9ucyhUeG4ubGVhc2UpLmRlbGV0ZSgpCiAgICB0eG4gTGVhc2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gZXhlY3V0aW9ucyA9IEJveE1hcDxieXRlczwzMj4sIEd1aWxkRXhlY3V0aW9uTWV0YWRhdGE+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeEV4ZWN1dGlvbnMgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM3NwogICAgLy8gdGhpcy5leGVjdXRpb25zKFR4bi5sZWFzZSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM3OAogICAgLy8gdGhpcy5yZWZ1bmQocHJvcG9zYWwuY3JlYXRvciwgR3VpbGRFeGVjdXRpb25NQlIpCiAgICBzd2FwCiAgICBwdXNoaW50cyAzNyAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGMgNiAvLyAyMjEwMAogICAgY2FsbHN1YiByZWZ1bmQKICAgIGIgdXBkYXRlX2FmdGVyX2lmX2Vsc2VAMzEKCnVwZGF0ZV9ib29sX2ZhbHNlQDIwOgogICAgaW50Y18wIC8vIDAKICAgIGIgdXBkYXRlX2Jvb2xfbWVyZ2VAMjEKCnVwZGF0ZV9ib29sX2ZhbHNlQDE0OgogICAgaW50Y18wIC8vIDAKICAgIGIgdXBkYXRlX2Jvb2xfbWVyZ2VAMTUKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuc3dlZXBbcm91dGluZ10oKSAtPiB2b2lkOgpzd2VlcDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzOTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YXRlLnZhbHVlICE9PSBHdWlsZFN0YXRlRHJhZnQgfHwgVHhuLnNlbmRlciA9PT0gdGhpcy5jcmVhdG9yLnZhbHVlLCBlcnJHdWlsZENyZWF0b3JPbmx5KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc3RhdGUgPSBHbG9iYWxTdGF0ZTxHdWlsZFN0YXRlPih7IGluaXRpYWxWYWx1ZTogR3VpbGRTdGF0ZURyYWZ0LCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlTdGF0ZSB9KQogICAgYnl0ZWMgNyAvLyAic3RhdGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzkxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGF0ZS52YWx1ZSAhPT0gR3VpbGRTdGF0ZURyYWZ0IHx8IFR4bi5zZW5kZXIgPT09IHRoaXMuY3JlYXRvci52YWx1ZSwgZXJyR3VpbGRDcmVhdG9yT25seSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18xIC8vIDB4MDAKICAgICE9CiAgICBibnogc3dlZXBfYm9vbF90cnVlQDMKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNyZWF0b3IgfSkKICAgIGJ5dGVjIDIyIC8vICJjcmVhdG9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3RhdGUudmFsdWUgIT09IEd1aWxkU3RhdGVEcmFmdCB8fCBUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIGVyckd1aWxkQ3JlYXRvck9ubHkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJ6IHN3ZWVwX2Jvb2xfZmFsc2VANAoKc3dlZXBfYm9vbF90cnVlQDM6CiAgICBpbnRjXzEgLy8gMQoKc3dlZXBfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3RhdGUudmFsdWUgIT09IEd1aWxkU3RhdGVEcmFmdCB8fCBUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIGVyckd1aWxkQ3JlYXRvck9ubHkpCiAgICBibnogc3dlZXBfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDMyIC8vICJFUlI6ZXJyR2NydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHY3J0Cgpzd2VlcF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzOTIKICAgIC8vIHRoaXMucmVxdWlyZVdhbGxldCgpCiAgICBjYWxsc3ViIHJlcXVpcmVXYWxsZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzOTMKICAgIC8vIGNvbnN0IGZyZWUgPSB0aGlzLmZyZWVCYWxhbmNlKCkKICAgIGNhbGxzdWIgZnJlZUJhbGFuY2UKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM5NAogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSBmcmVlID4gdGhpcy5yZXNlcnZlZC52YWx1ZSA/IGZyZWUgLSB0aGlzLnJlc2VydmVkLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMzk0CiAgICAvLyBjb25zdCBhbW91bnQ6IHVpbnQ2NCA9IGZyZWUgPiB0aGlzLnJlc2VydmVkLnZhbHVlID8gZnJlZSAtIHRoaXMucmVzZXJ2ZWQudmFsdWUgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYnogc3dlZXBfdGVybmFyeV9mYWxzZUA5CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTg2CiAgICAvLyByZXNlcnZlZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVJlc2VydmVkIH0pCiAgICBieXRlY18zIC8vICJyZXNlcnZlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzOTQKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gZnJlZSA+IHRoaXMucmVzZXJ2ZWQudmFsdWUgPyBmcmVlIC0gdGhpcy5yZXNlcnZlZC52YWx1ZSA6IDAKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAtCgpzd2VlcF90ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTM5NQogICAgLy8gdGhpcy5wYXkodGhpcy50cmVhc3VyeSgpLCBhbW91bnQpCiAgICBjYWxsc3ViIHRyZWFzdXJ5CiAgICBkaWcgMQogICAgY2FsbHN1YiBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzOTAKICAgIC8vIHN3ZWVwKCk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzd2VlcF90ZXJuYXJ5X2ZhbHNlQDk6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEzOTQKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gZnJlZSA+IHRoaXMucmVzZXJ2ZWQudmFsdWUgPyBmcmVlIC0gdGhpcy5yZXNlcnZlZC52YWx1ZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHN3ZWVwX3Rlcm5hcnlfbWVyZ2VAMTAKCnN3ZWVwX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIHN3ZWVwX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXR1cENvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpzZXR1cENvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDAyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnNldHVwQ29zdAogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbENvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDA4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDIKICAgICoKICAgIHN3YXAKICAgIGR1cAogICAgbGVuCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgaW50Y18wIC8vIDAKCnByb3Bvc2FsQ29zdF9mb3JfaGVhZGVyQDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDA4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGR1cAogICAgZGlnIDUKICAgIDwKICAgIGJ6IHByb3Bvc2FsQ29zdF9hZnRlcl9mb3JANAogICAgZHVwCiAgICBpbnRjXzIgLy8gMgogICAgKgogICAgZGlnIDIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBlbmNvZGluZwogICAgZHVwCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBmb3IgKGxlbisodWludDgsKGxlbit1aW50OFtdKSlbXSkKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18xIC8vIDEKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50OCwobGVuK3VpbnQ4W10pKQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNQogICAgKwogICAgKwogICAgY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgcHJvcG9zYWxDb3N0X2Zvcl9oZWFkZXJAMQoKcHJvcG9zYWxDb3N0X2FmdGVyX2ZvckA0OgogICAgcG9wbiAyCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQwOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS90eXBlcy50czo6R3VpbGRQcm9wb3NhbEFjdGlvbj4KICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdAogICAgcG9wCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmdldFByb3Bvc2FsW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0UHJvcG9zYWw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDgwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0ODIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZFByb3Bvc2FsKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRQcm9wb3NhbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJHcHJwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwcnAKCmdldFByb3Bvc2FsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ4MwogICAgLy8gcmV0dXJuIHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ4MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmdldEJhbGxvdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldEJhbGxvdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0ODcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuZ2V0QmFsbG90CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLm11c3RHZXRFeGVjdXRpb25bcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0RXhlY3V0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ5NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGV4ZWN1dGlvbnMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBHdWlsZEV4ZWN1dGlvbk1ldGFkYXRhPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhFeGVjdXRpb25zIH0pCiAgICBieXRlYyAxNyAvLyAieCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5leGVjdXRpb25zKGxlYXNlKS5leGlzdHMsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRFeGVjdXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCm11c3RHZXRFeGVjdXRpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDk5CiAgICAvLyByZXR1cm4gdGhpcy5leGVjdXRpb25zKGxlYXNlKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0OTYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5nc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldENvbnNlbnN1c0FjdGlvblNldHRpbmdzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUwMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncwogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC52b3RlQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnZvdGVDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUxMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTE0CiAgICAvLyByZXR1cm4gdGhpcy5uZXh0Vm90ZUNvc3QocHJvcG9zYWxJRCwgdm90ZXIpCiAgICBjYWxsc3ViIG5leHRWb3RlQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUxMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnZvdGVNYnJbcm91dGluZ10oKSAtPiB2b2lkOgp2b3RlTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUyMAogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQmFzZS5wcm90b3R5cGUudm90ZU1icj4oeyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUgfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUyMAogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQmFzZS5wcm90b3R5cGUudm90ZU1icj4oeyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUgfSkucmV0dXJuVmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDUyIC8vIG1ldGhvZCAidm90ZU1icigpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zd2VlcGFibGVbcm91dGluZ10oKSAtPiB2b2lkOgpzd2VlcGFibGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTI2CiAgICAvLyBjb25zdCBmcmVlID0gdGhpcy5mcmVlQmFsYW5jZSgpCiAgICBjYWxsc3ViIGZyZWVCYWxhbmNlCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MjcKICAgIC8vIHJldHVybiBmcmVlID4gdGhpcy5yZXNlcnZlZC52YWx1ZSA/IGZyZWUgLSB0aGlzLnJlc2VydmVkLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTI3CiAgICAvLyByZXR1cm4gZnJlZSA+IHRoaXMucmVzZXJ2ZWQudmFsdWUgPyBmcmVlIC0gdGhpcy5yZXNlcnZlZC52YWx1ZSA6IDAKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBieiBzd2VlcGFibGVfdGVybmFyeV9mYWxzZUAzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTg2CiAgICAvLyByZXNlcnZlZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVJlc2VydmVkIH0pCiAgICBieXRlY18zIC8vICJyZXNlcnZlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MjcKICAgIC8vIHJldHVybiBmcmVlID4gdGhpcy5yZXNlcnZlZC52YWx1ZSA/IGZyZWUgLSB0aGlzLnJlc2VydmVkLnZhbHVlIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC0KCnN3ZWVwYWJsZV90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTI0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnN3ZWVwYWJsZV90ZXJuYXJ5X2ZhbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MjcKICAgIC8vIHJldHVybiBmcmVlID4gdGhpcy5yZXNlcnZlZC52YWx1ZSA/IGZyZWUgLSB0aGlzLnJlc2VydmVkLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgc3dlZXBhYmxlX3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5jYW5DaGFuZ2VQbHVnaW5TZXRbcm91dGluZ10oKSAtPiB2b2lkOgpjYW5DaGFuZ2VQbHVnaW5TZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTMzCiAgICAvLyByZXR1cm4gIXRoaXMucGx1Z2luU2V0TG9ja2VkLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTgxCiAgICAvLyBwbHVnaW5TZXRMb2NrZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVBsdWdpblNldExvY2tlZCB9KQogICAgYnl0ZWMgMTUgLy8gInBsdWdpbnNfbG9ja2VkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTUzMwogICAgLy8gcmV0dXJuICF0aGlzLnBsdWdpblNldExvY2tlZC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MzEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucmVxdWlyZUNyZWF0b3JEcmFmdCgpIC0+IHZvaWQ6CnJlcXVpcmVDcmVhdG9yRHJhZnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YXRlLnZhbHVlID09PSBHdWlsZFN0YXRlRHJhZnQsIGVyckd1aWxkRHJhZnRPbmx5KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc3RhdGUgPSBHbG9iYWxTdGF0ZTxHdWlsZFN0YXRlPih7IGluaXRpYWxWYWx1ZTogR3VpbGRTdGF0ZURyYWZ0LCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlTdGF0ZSB9KQogICAgYnl0ZWMgNyAvLyAic3RhdGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YXRlLnZhbHVlID09PSBHdWlsZFN0YXRlRHJhZnQsIGVyckd1aWxkRHJhZnRPbmx5KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgPT0KICAgIGJueiByZXF1aXJlQ3JlYXRvckRyYWZ0X2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJHZHJmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdkcmYKCnJlcXVpcmVDcmVhdG9yRHJhZnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIGVyckd1aWxkQ3JlYXRvck9ubHkpCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyBjcmVhdG9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlDcmVhdG9yIH0pCiAgICBieXRlYyAyMiAvLyAiY3JlYXRvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuY3JlYXRvci52YWx1ZSwgZXJyR3VpbGRDcmVhdG9yT25seSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IHJlcXVpcmVDcmVhdG9yRHJhZnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDMyIC8vICJFUlI6ZXJyR2NydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHY3J0CgpyZXF1aXJlQ3JlYXRvckRyYWZ0X2FmdGVyX2Fzc2VydEA0OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnZhbGlkYXRlU2V0dGluZ3Moc2V0dGluZ3M6IGJ5dGVzKSAtPiBieXRlczoKdmFsaWRhdGVTZXR0aW5nczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gcHJpdmF0ZSB2YWxpZGF0ZVNldHRpbmdzKHNldHRpbmdzOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MpOiB2b2lkIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjcwLTI3MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNCYXNlLnByb3RvdHlwZS52YWxpZGF0ZVNldHRpbmdzPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW3NldHRpbmdzXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNzEKICAgIC8vIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjcxCiAgICAvLyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNzAtMjczCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0Jhc2UucHJvdG90eXBlLnZhbGlkYXRlU2V0dGluZ3M+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbc2V0dGluZ3NdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDkxNDBjNjM4IC8vIG1ldGhvZCAidmFsaWRhdGVTZXR0aW5ncygodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnJlcXVpcmVXYWxsZXQoKSAtPiB2b2lkOgpyZXF1aXJlV2FsbGV0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53YWxsZXQuaGFzVmFsdWUsIGVyckd1aWxkV2FsbGV0UmVxdWlyZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2FsbGV0Lmhhc1ZhbHVlLCBlcnJHdWlsZFdhbGxldFJlcXVpcmVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYm56IHJlcXVpcmVXYWxsZXRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOmVyckd3bHIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3dscgoKcmVxdWlyZVdhbGxldF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gdGhpcy52YWxpZGF0ZVdhbGxldCh0aGlzLndhbGxldC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyB0aGlzLnZhbGlkYXRlV2FsbGV0KHRoaXMud2FsbGV0LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIGxvZ2dlZEFzc2VydCh3YWxsZXQuaWQgPiAwLCBlcnJHdWlsZEludmFsaWRXYWxsZXQpCiAgICBibnogcmVxdWlyZVdhbGxldF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNjAgLy8gIkVSUjplcnJHd2xrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckd3bGsKCnJlcXVpcmVXYWxsZXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vIGNvbnN0IGFkbWluID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEFkbWluPih7IGFwcElkOiB3YWxsZXQgfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MTNiYzQ0ZTQgLy8gbWV0aG9kICJhcmM1OF9nZXRBZG1pbigpYWRkcmVzcyIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhY2NvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyNzkKICAgIC8vIGxvZ2dlZEFzc2VydChhZG1pbiA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckd1aWxkSW52YWxpZFdhbGxldCkKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHJlcXVpcmVXYWxsZXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDYwIC8vICJFUlI6ZXJyR3dsayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHd2xrCgpyZXF1aXJlV2FsbGV0X2FmdGVyX2Fzc2VydEA3OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnRyZWFzdXJ5KCkgLT4gYnl0ZXM6CnRyZWFzdXJ5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyB0aGlzLndhbGxldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyB0aGlzLndhbGxldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyOTEKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKSwKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Mjg5LTI5MgogICAgLy8gY29uc3QgW2NvbnRyb2xsZWQsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKSwKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIHJldHVybiBleGlzdHMgPyBBY2NvdW50KGNvbnRyb2xsZWQpIDogdGhpcy53YWxsZXQudmFsdWUuYWRkcmVzcwogICAgYnogdHJlYXN1cnlfdGVybmFyeV9mYWxzZUAyCiAgICByZXRzdWIKCnRyZWFzdXJ5X3Rlcm5hcnlfZmFsc2VAMjoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyByZXR1cm4gZXhpc3RzID8gQWNjb3VudChjb250cm9sbGVkKSA6IHRoaXMud2FsbGV0LnZhbHVlLmFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyByZXR1cm4gZXhpc3RzID8gQWNjb3VudChjb250cm9sbGVkKSA6IHRoaXMud2FsbGV0LnZhbHVlLmFkZHJlc3MKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucGF5KHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnBheToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI5NgogICAgLy8gcHJpdmF0ZSBwYXkocmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjI5NwogICAgLy8gaWYgKGFtb3VudCA+IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcGF5X2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Mjk4CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnBheV9hZnRlcl9pZl9lbHNlQDM6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuY2FuUmVjZWl2ZShyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMDMKICAgIC8vIHByaXZhdGUgY2FuUmVjZWl2ZShyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyBjb25zdCBbLCBmdW5kZWRdID0gb3AuQWNjdFBhcmFtcy5hY2N0QmFsYW5jZShyZWNlaXZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMwNQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiBjYW5SZWNlaXZlX2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICA+PQogICAgYnogY2FuUmVjZWl2ZV9ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVfYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzA1CiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgpjYW5SZWNlaXZlX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIHJldHVybiBmdW5kZWQgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucmVmdW5kKHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlZnVuZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gcHJpdmF0ZSByZWZ1bmQocmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMTQKICAgIC8vIGlmIChhbW91bnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHJlZnVuZF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnJlZnVuZF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMTcKICAgIC8vIGlmICh0aGlzLmNhblJlY2VpdmUocmVjZWl2ZXIsIGFtb3VudCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblJlY2VpdmUKICAgIGJ6IHJlZnVuZF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlZnVuZF9hZnRlcl9pZl9lbHNlQDExOgogICAgcmV0c3ViCgpyZWZ1bmRfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMTkKICAgIC8vIH0gZWxzZSBpZiAodGhpcy53YWxsZXQuaGFzVmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzE5CiAgICAvLyB9IGVsc2UgaWYgKHRoaXMud2FsbGV0Lmhhc1ZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBieiByZWZ1bmRfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyBjb25zdCB0cmVhc3VyeSA9IHRoaXMudHJlYXN1cnkoKQogICAgY2FsbHN1YiB0cmVhc3VyeQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gaWYgKHRoaXMuY2FuUmVjZWl2ZSh0cmVhc3VyeSwgYW1vdW50KSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblJlY2VpdmUKICAgIGJ6IHJlZnVuZF9hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMjIKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiB0cmVhc3VyeSwgYW1vdW50LCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmZyZWVCYWxhbmNlKCkgLT4gdWludDY0OgpmcmVlQmFsYW5jZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMyOQogICAgLy8gY29uc3QgYmFsYW5jZSA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMzMAogICAgLy8gY29uc3QgbWluaW11bSA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIHJldHVybiBiYWxhbmNlID4gbWluaW11bSA/IGJhbGFuY2UgLSBtaW5pbXVtIDogMAogICAgPgogICAgYnogZnJlZUJhbGFuY2VfdGVybmFyeV9mYWxzZUAyCiAgICAtCiAgICByZXRzdWIKCmZyZWVCYWxhbmNlX3Rlcm5hcnlfZmFsc2VAMjoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyByZXR1cm4gYmFsYW5jZSA+IG1pbmltdW0gPyBiYWxhbmNlIC0gbWluaW11bSA6IDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuZm9yd2FyZEZlZShmZWU6IHVpbnQ2NCkgLT4gdm9pZDoKZm9yd2FyZEZlZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8gcHJpdmF0ZSBmb3J3YXJkRmVlKGZlZTogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gaWYgKGZlZSA+IDAgJiYgdGhpcy53YWxsZXQuaGFzVmFsdWUpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZm9yd2FyZEZlZV9hZnRlcl9pZl9lbHNlQDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyBpZiAoZmVlID4gMCAmJiB0aGlzLndhbGxldC5oYXNWYWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYnogZm9yd2FyZEZlZV9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjMzNwogICAgLy8gdGhpcy5wYXkodGhpcy50cmVhc3VyeSgpLCBmZWUpCiAgICBjYWxsc3ViIHRyZWFzdXJ5CiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgcGF5Cgpmb3J3YXJkRmVlX2FmdGVyX2lmX2Vsc2VAMzoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5yZWxlYXNlUmVzZXJ2ZShwcm9wb3NhbElEOiB1aW50NjQsIGNyZWF0b3I6IGJ5dGVzLCBoZWxkOiB1aW50NjQsIHNwZW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlbGVhc2VSZXNlcnZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBwcml2YXRlIHJlbGVhc2VSZXNlcnZlKHByb3Bvc2FsSUQ6IHVpbnQ2NCwgY3JlYXRvcjogQWNjb3VudCwgaGVsZDogdWludDY0LCBzcGVudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byA0IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gaWYgKGhlbGQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHJlbGVhc2VSZXNlcnZlX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyByZXR1cm4KICAgIHJldHN1YgoKcmVsZWFzZVJlc2VydmVfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzQ2CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IGhlbGQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIHJlc2VydmVkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVzZXJ2ZWQgfSkKICAgIGJ5dGVjXzMgLy8gInJlc2VydmVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzQ2CiAgICAvLyB0aGlzLnJlc2VydmVkLnZhbHVlIC09IGhlbGQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gcmVzZXJ2ZWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZXNlcnZlZCB9KQogICAgYnl0ZWNfMyAvLyAicmVzZXJ2ZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIHRoaXMucmVzZXJ2ZWQudmFsdWUgLT0gaGVsZAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUuZmVlc1BhaWQgPSAwCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gcHJvcG9zYWxzID0gQm94TWFwPHVpbnQ2NCwgR3VpbGRQcm9wb3NhbD4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UHJvcG9zYWxzIH0pCiAgICBieXRlYyA1IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlLmZlZXNQYWlkID0gMAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIHB1c2hpbnQgODUKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIGlmIChoZWxkID4gc3BlbnQpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICA+CiAgICBieiByZWxlYXNlUmVzZXJ2ZV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gdGhpcy5yZWZ1bmQoY3JlYXRvciwgaGVsZCAtIHNwZW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIGZyYW1lX2RpZyAtMwogICAgc3dhcAogICAgY2FsbHN1YiByZWZ1bmQKCnJlbGVhc2VSZXNlcnZlX2FmdGVyX2lmX2Vsc2VANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbE1icihhY3Rpb25zOiBieXRlcykgLT4gdWludDY0LCBieXRlczoKcHJvcG9zYWxNYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIHByaXZhdGUgcHJvcG9zYWxNYnIoYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdKTogdWludDY0IHsKICAgIHByb3RvIDEgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyBsZXQgYWN0aW9uQnl0ZXM6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNjkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKCnByb3Bvc2FsTWJyX3doaWxlX3RvcEAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZGlnIDEKICAgID4KICAgIGJ6IHByb3Bvc2FsTWJyX2FmdGVyX3doaWxlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gYWN0aW9uQnl0ZXMgKz0gTWluR3VpbGRQcm9wb3NhbEFjdGlvbk1iciArIGFjdGlvbnNbaV0uZGF0YS5sZW5ndGgKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDEKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBsZW4KICAgIHB1c2hpbnQgNwogICAgKwogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNjkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBwcm9wb3NhbE1icl93aGlsZV90b3BAMQoKcHJvcG9zYWxNYnJfYWZ0ZXJfd2hpbGVAMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyByZXR1cm4gTWluR3VpbGRQcm9wb3NhbE1CUiArIEJveENvc3RQZXJCeXRlICogYWN0aW9uQnl0ZXMKICAgIGludGMgNCAvLyA0MDAKICAgICoKICAgIHB1c2hpbnQgNDQ5MDAKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNvbnNlbnN1c0FjdGlvbk1icihkYXRhOiBieXRlcykgLT4gdWludDY0Ogpjb25zZW5zdXNBY3Rpb25NYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozODAKICAgIC8vIHByaXZhdGUgY29uc2Vuc3VzQWN0aW9uTWJyKGRhdGE6IGJ5dGVzKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzgxLTM4NAogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUuY29uc2Vuc3VzQWN0aW9uTWJyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW2RhdGFdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM4MwogICAgLy8gYXJnczogW2RhdGFdLAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyBjb25zZW5zdXMgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlDb25zZW5zdXMgfSkKICAgIGJ5dGVjIDYgLy8gImNvbnNlbnN1cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzgxLTM4NAogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUuY29uc2Vuc3VzQWN0aW9uTWJyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW2RhdGFdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDg1N2UyNzE3IC8vIG1ldGhvZCAiY29uc2Vuc3VzQWN0aW9uTWJyKGJ5dGVbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGU6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzVXBkYXRlR3VpbGRBY3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozODgKICAgIC8vIHByaXZhdGUgaXNVcGRhdGVHdWlsZEFjdGlvbih0eXBlOiBHdWlsZEFjdGlvblR5cGUpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBjb25zdCB2YWx1ZSA9IHR5cGUuYXNVaW50NjQoKQogICAgZnJhbWVfZGlnIC0xCiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM5MQogICAgLy8gKHZhbHVlID49IEd1aWxkQWN0aW9uU2V0UHJvcG9zYWxTZXR0aW5ncy5hc1VpbnQ2NCgpICYmIHZhbHVlIDw9IEd1aWxkQWN0aW9uU2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3MuYXNVaW50NjQoKSkgfHwKICAgIHB1c2hpbnQgODAKICAgID49CiAgICBieiBpc1VwZGF0ZUd1aWxkQWN0aW9uX29yX2NvbnRkQDIKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDg0CiAgICA8PQogICAgYm56IGlzVXBkYXRlR3VpbGRBY3Rpb25fYm9vbF90cnVlQDQKCmlzVXBkYXRlR3VpbGRBY3Rpb25fb3JfY29udGRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM5MgogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25GdWxseUluaXRpYWxpemUgfHwKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzIDB4NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozOTEtMzkyCiAgICAvLyAodmFsdWUgPj0gR3VpbGRBY3Rpb25TZXRQcm9wb3NhbFNldHRpbmdzLmFzVWludDY0KCkgJiYgdmFsdWUgPD0gR3VpbGRBY3Rpb25TZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncy5hc1VpbnQ2NCgpKSB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25GdWxseUluaXRpYWxpemUgfHwKICAgIGJueiBpc1VwZGF0ZUd1aWxkQWN0aW9uX2Jvb2xfdHJ1ZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozOTMKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uTG9ja1BsdWdpblNldAogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgMHg2ZQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM5MS0zOTMKICAgIC8vICh2YWx1ZSA+PSBHdWlsZEFjdGlvblNldFByb3Bvc2FsU2V0dGluZ3MuYXNVaW50NjQoKSAmJiB2YWx1ZSA8PSBHdWlsZEFjdGlvblNldENvbnNlbnN1c0FjdGlvblNldHRpbmdzLmFzVWludDY0KCkpIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkZ1bGx5SW5pdGlhbGl6ZSB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25Mb2NrUGx1Z2luU2V0CiAgICBieiBpc1VwZGF0ZUd1aWxkQWN0aW9uX2Jvb2xfZmFsc2VANQoKaXNVcGRhdGVHdWlsZEFjdGlvbl9ib29sX3RydWVANDoKICAgIGludGNfMSAvLyAxCgppc1VwZGF0ZUd1aWxkQWN0aW9uX2Jvb2xfbWVyZ2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM5MC0zOTQKICAgIC8vIHJldHVybiAoCiAgICAvLyAgICh2YWx1ZSA+PSBHdWlsZEFjdGlvblNldFByb3Bvc2FsU2V0dGluZ3MuYXNVaW50NjQoKSAmJiB2YWx1ZSA8PSBHdWlsZEFjdGlvblNldENvbnNlbnN1c0FjdGlvblNldHRpbmdzLmFzVWludDY0KCkpIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uRnVsbHlJbml0aWFsaXplIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uTG9ja1BsdWdpblNldAogICAgLy8gKQogICAgc3dhcAogICAgcmV0c3ViCgppc1VwZGF0ZUd1aWxkQWN0aW9uX2Jvb2xfZmFsc2VANToKICAgIGludGNfMCAvLyAwCiAgICBiIGlzVXBkYXRlR3VpbGRBY3Rpb25fYm9vbF9tZXJnZUA2CgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmlzQ29uZmlndXJhYmxlQWN0aW9uKHR5cGU6IGJ5dGVzKSAtPiB1aW50NjQ6CmlzQ29uZmlndXJhYmxlQWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Mzk4CiAgICAvLyBwcml2YXRlIGlzQ29uZmlndXJhYmxlQWN0aW9uKHR5cGU6IEd1aWxkQWN0aW9uVHlwZSk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIHRoaXMuaXNVcGRhdGVHdWlsZEFjdGlvbih0eXBlKSB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGlzVXBkYXRlR3VpbGRBY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwMC00MDEKICAgIC8vIHRoaXMuaXNVcGRhdGVHdWlsZEFjdGlvbih0eXBlKSB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGdyYWRlQXBwIHx8CiAgICBibnogaXNDb25maWd1cmFibGVBY3Rpb25fYm9vbF90cnVlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxMSAvLyAweDBhCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDAwLTQwMQogICAgLy8gdGhpcy5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGUpIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZ3JhZGVBcHAgfHwKICAgIGJueiBpc0NvbmZpZ3VyYWJsZUFjdGlvbl9ib29sX3RydWVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwMgogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgNDAgLy8gMHg1YQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwMC00MDIKICAgIC8vIHRoaXMuaXNVcGRhdGVHdWlsZEFjdGlvbih0eXBlKSB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGdyYWRlQXBwIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZGF0ZVdhbGxldCB8fAogICAgYm56IGlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfdHJ1ZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDAzCiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkNoYW5nZUFkbWluIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDI4IC8vIDB4NWIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDAzCiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIGJueiBpc0NvbmZpZ3VyYWJsZUFjdGlvbl9ib29sX3RydWVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRQbHVnaW4gfHwKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwMC00MDQKICAgIC8vIHRoaXMuaXNVcGRhdGVHdWlsZEFjdGlvbih0eXBlKSB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGdyYWRlQXBwIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZGF0ZVdhbGxldCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25DaGFuZ2VBZG1pbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRQbHVnaW4gfHwKICAgIGJueiBpc0NvbmZpZ3VyYWJsZUFjdGlvbl9ib29sX3RydWVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxOCAvLyAweDE1CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDAwLTQwNQogICAgLy8gdGhpcy5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGUpIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZ3JhZGVBcHAgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBkYXRlV2FsbGV0IHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkNoYW5nZUFkbWluIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZFBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgYm56IGlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfdHJ1ZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDA2CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDE5IC8vIDB4MTYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDA2CiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICBibnogaXNDb25maWd1cmFibGVBY3Rpb25fYm9vbF90cnVlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDcKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDI2IC8vIDB4MWYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDA3CiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbiB8fAogICAgYm56IGlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfdHJ1ZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDA4CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZVBsdWdpbiB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyA5IC8vIDB4MjgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDA4CiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVQbHVnaW4gfHwKICAgIGJueiBpc0NvbmZpZ3VyYWJsZUFjdGlvbl9ib29sX3RydWVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwOQogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbiB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAyNyAvLyAweDI5CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDAwLTQwOQogICAgLy8gdGhpcy5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGUpIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZ3JhZGVBcHAgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBkYXRlV2FsbGV0IHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkNoYW5nZUFkbWluIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZFBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25TZXRQbHVnaW5TZXR0aW5ncyB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVFeGVjdXRpb24gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZU5hbWVkUGx1Z2luIHx8CiAgICBibnogaXNDb25maWd1cmFibGVBY3Rpb25fYm9vbF90cnVlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MTAKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlcyB8fAogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxNCAvLyAweDMyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDAwLTQxMAogICAgLy8gdGhpcy5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGUpIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZ3JhZGVBcHAgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBkYXRlV2FsbGV0IHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkNoYW5nZUFkbWluIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZFBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25TZXRQbHVnaW5TZXR0aW5ncyB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVFeGVjdXRpb24gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZU5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZEFsbG93YW5jZXMgfHwKICAgIGJueiBpc0NvbmZpZ3VyYWJsZUFjdGlvbl9ib29sX3RydWVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVBbGxvd2FuY2VzIHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDM0IC8vIDB4M2MKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDExCiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlTmFtZWRQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlcyB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVBbGxvd2FuY2VzIHx8CiAgICBibnogaXNDb25maWd1cmFibGVBY3Rpb25fYm9vbF90cnVlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uTmV3RXNjcm93IHx8CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDM1IC8vIDB4NDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDEyCiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlTmFtZWRQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlcyB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVBbGxvd2FuY2VzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbk5ld0VzY3JvdyB8fAogICAgYm56IGlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfdHJ1ZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblRvZ2dsZUVzY3Jvd0xvY2sgfHwKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMzYgLy8gMHg0NwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQwMC00MTMKICAgIC8vIHRoaXMuaXNVcGRhdGVHdWlsZEFjdGlvbih0eXBlKSB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGdyYWRlQXBwIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblVwZGF0ZVdhbGxldCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25DaGFuZ2VBZG1pbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkTmFtZWRQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uU2V0UGx1Z2luU2V0dGluZ3MgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZVBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRBbGxvd2FuY2VzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUFsbG93YW5jZXMgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uTmV3RXNjcm93IHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblRvZ2dsZUVzY3Jvd0xvY2sgfHwKICAgIGJueiBpc0NvbmZpZ3VyYWJsZUFjdGlvbl9ib29sX3RydWVAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQxNAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZWNsYWltCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDM3IC8vIDB4NDgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MDAtNDE0CiAgICAvLyB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQgfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbiB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlTmFtZWRQbHVnaW4gfHwKICAgIC8vIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlcyB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVBbGxvd2FuY2VzIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvbk5ld0VzY3JvdyB8fAogICAgLy8gdHlwZSA9PT0gR3VpbGRBY3Rpb25Ub2dnbGVFc2Nyb3dMb2NrIHx8CiAgICAvLyB0eXBlID09PSBHdWlsZEFjdGlvblJlY2xhaW0KICAgIGJ6IGlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfZmFsc2VAMTYKCmlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfdHJ1ZUAxNToKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozOTktNDE1CiAgICAvLyByZXR1cm4gKAogICAgLy8gICB0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkgfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25VcGdyYWRlQXBwIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBkYXRlV2FsbGV0IHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4gfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRQbHVnaW4gfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlTmFtZWRQbHVnaW4gfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRBbGxvd2FuY2VzIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlQWxsb3dhbmNlcyB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvbk5ld0VzY3JvdyB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblRvZ2dsZUVzY3Jvd0xvY2sgfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25SZWNsYWltCiAgICAvLyApCiAgICByZXRzdWIKCmlzQ29uZmlndXJhYmxlQWN0aW9uX2Jvb2xfZmFsc2VAMTY6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Mzk5LTQxNQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgdGhpcy5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGUpIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblVwZGF0ZVdhbGxldCB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvbkNoYW5nZUFkbWluIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkTmFtZWRQbHVnaW4gfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25TZXRQbHVnaW5TZXR0aW5ncyB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbiB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZVBsdWdpbiB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZU5hbWVkUGx1Z2luIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlcyB8fAogICAgLy8gICB0eXBlID09PSBHdWlsZEFjdGlvblJlbW92ZUFsbG93YW5jZXMgfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25OZXdFc2Nyb3cgfHwKICAgIC8vICAgdHlwZSA9PT0gR3VpbGRBY3Rpb25Ub2dnbGVFc2Nyb3dMb2NrIHx8CiAgICAvLyAgIHR5cGUgPT09IEd1aWxkQWN0aW9uUmVjbGFpbQogICAgLy8gKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNsYXNzU2V0dGluZ3ModHlwZTogYnl0ZXMpIC0+IGJ5dGVzOgpjbGFzc1NldHRpbmdzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBwcml2YXRlIGNsYXNzU2V0dGluZ3ModHlwZTogR3VpbGRBY3Rpb25UeXBlKTogR3VpbGRQcm9wb3NhbFNldHRpbmdzIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBpZiAodGhpcy5pc1VwZGF0ZUd1aWxkQWN0aW9uKHR5cGUpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgaXNVcGRhdGVHdWlsZEFjdGlvbgogICAgYnogY2xhc3NTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQyMQogICAgLy8gcmV0dXJuIHRoaXMudXBkYXRlR3VpbGRQcm9wb3NhbFNldHRpbmdzLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyB1cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5VXBkYXRlR3VpbGRQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyAxNiAvLyAidXBkYXRlX2d1aWxkX3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyByZXR1cm4gdGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCmNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uVXBncmFkZUFwcDoKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTEgLy8gMHgwYQogICAgPT0KICAgIGJueiBjbGFzc1NldHRpbmdzX2Jsb2NrQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25VcGRhdGVXYWxsZXQ6CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDQwIC8vIDB4NWEKICAgID09CiAgICBibnogY2xhc3NTZXR0aW5nc19ibG9ja0AxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDI2CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW46IHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjggLy8gMHg1YgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQyNi00MjgKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25DaGFuZ2VBZG1pbjogewogICAgLy8gICByZXR1cm4gdGhpcy51cGdyYWRlQXBwUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgLy8gfQogICAgYnogY2xhc3NTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDEyCgpjbGFzc1NldHRpbmdzX2Jsb2NrQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyByZXR1cm4gdGhpcy51cGdyYWRlQXBwUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE4OAogICAgLy8gdXBncmFkZUFwcFByb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5VXBncmFkZUFwcFByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQyIC8vICJ1cGdyYWRlX2FwcF9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gcmV0dXJuIHRoaXMudXBncmFkZUFwcFByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCmNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkFkZFBsdWdpbjoKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIGJueiBjbGFzc1NldHRpbmdzX2Jsb2NrQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbjoKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTggLy8gMHgxNQogICAgPT0KICAgIGJueiBjbGFzc1NldHRpbmdzX2Jsb2NrQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MzEKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25TZXRQbHVnaW5TZXR0aW5nczogewogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxOSAvLyAweDE2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDMxLTQzMwogICAgLy8gY2FzZSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzOiB7CiAgICAvLyAgIHJldHVybiB0aGlzLmFkZFBsdWdpblByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIC8vIH0KICAgIGJ6IGNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyMgoKY2xhc3NTZXR0aW5nc19ibG9ja0AyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQzMgogICAgLy8gcmV0dXJuIHRoaXMuYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlBZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyAyMyAvLyAiYWRkX3BsdWdpbl9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQzMgogICAgLy8gcmV0dXJuIHRoaXMuYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHJldHN1YgoKY2xhc3NTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDM0CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uOiB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDI2IC8vIDB4MWYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MzQtNDM2CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uOiB7CiAgICAvLyAgIHJldHVybiB0aGlzLnJlbW92ZUV4ZWN1dGlvblByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIC8vIH0KICAgIGJ6IGNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyByZXR1cm4gdGhpcy5yZW1vdmVFeGVjdXRpb25Qcm9wb3NhbFNldHRpbmdzLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTkyCiAgICAvLyByZW1vdmVFeGVjdXRpb25Qcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVJlbW92ZUV4ZWN1dGlvblByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQzIC8vICJyZW1vdmVfZXhlY3V0aW9uX3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyByZXR1cm4gdGhpcy5yZW1vdmVFeGVjdXRpb25Qcm9wb3NhbFNldHRpbmdzLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcmV0c3ViCgpjbGFzc1NldHRpbmdzX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MzcKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVQbHVnaW46CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDkgLy8gMHgyOAogICAgPT0KICAgIGJueiBjbGFzc1NldHRpbmdzX2Jsb2NrQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbjogewogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAyNyAvLyAweDI5CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDM4LTQ0MAogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlbW92ZU5hbWVkUGx1Z2luOiB7CiAgICAvLyAgIHJldHVybiB0aGlzLnJlbW92ZVBsdWdpblByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIC8vIH0KICAgIGJ6IGNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAzMwoKY2xhc3NTZXR0aW5nc19ibG9ja0AzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gcmV0dXJuIHRoaXMucmVtb3ZlUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gcmVtb3ZlUGx1Z2luUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZW1vdmVQbHVnaW5Qcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0NCAvLyAicmVtb3ZlX3BsdWdpbl9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gcmV0dXJuIHRoaXMucmVtb3ZlUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHJldHN1YgoKY2xhc3NTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDQxCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlczogewogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAxNCAvLyAweDMyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDQxLTQ0MwogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkFkZEFsbG93YW5jZXM6IHsKICAgIC8vICAgcmV0dXJuIHRoaXMuYWRkQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIC8vIH0KICAgIGJ6IGNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAzNwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDQyCiAgICAvLyByZXR1cm4gdGhpcy5hZGRBbGxvd2FuY2VzUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gYWRkQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5QWRkQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQ1IC8vICJhZGRfYWxsb3dhbmNlc19wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ0MgogICAgLy8gcmV0dXJuIHRoaXMuYWRkQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCmNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlbW92ZUFsbG93YW5jZXM6IHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMzQgLy8gMHgzYwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ0NC00NDYKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVBbGxvd2FuY2VzOiB7CiAgICAvLyAgIHJldHVybiB0aGlzLnJlbW92ZUFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzLnZhbHVlCiAgICAvLyB9CiAgICBieiBjbGFzc1NldHRpbmdzX2FmdGVyX2lmX2Vsc2VANDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gcmV0dXJuIHRoaXMucmVtb3ZlQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIHJlbW92ZUFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVJlbW92ZUFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0NiAvLyAicmVtb3ZlX2FsbG93YW5jZXNfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIHJldHVybiB0aGlzLnJlbW92ZUFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcmV0c3ViCgpjbGFzc1NldHRpbmdzX2FmdGVyX2lmX2Vsc2VANDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NDcKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25OZXdFc2Nyb3c6IHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMzUgLy8gMHg0NgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ0Ny00NDkKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25OZXdFc2Nyb3c6IHsKICAgIC8vICAgcmV0dXJuIHRoaXMubmV3RXNjcm93UHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgLy8gfQogICAgYnogY2xhc3NTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDQ1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NDgKICAgIC8vIHJldHVybiB0aGlzLm5ld0VzY3Jvd1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIG5ld0VzY3Jvd1Byb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5TmV3RXNjcm93UHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgNDcgLy8gIm5ld19lc2Nyb3dfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NDgKICAgIC8vIHJldHVybiB0aGlzLm5ld0VzY3Jvd1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCmNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gY2FzZSBHdWlsZEFjdGlvblRvZ2dsZUVzY3Jvd0xvY2s6CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDM2IC8vIDB4NDcKICAgID09CiAgICBibnogY2xhc3NTZXR0aW5nc19ibG9ja0A1MAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVjbGFpbTogewogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAzNyAvLyAweDQ4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDUxLTQ1MwogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlY2xhaW06IHsKICAgIC8vICAgcmV0dXJuIHRoaXMudG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIC8vIH0KICAgIGJ6IGNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUA1MgoKY2xhc3NTZXR0aW5nc19ibG9ja0A1MDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gcmV0dXJuIHRoaXMudG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDIKICAgIC8vIHRvZ2dsZUVzY3Jvd0xvY2tQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVRvZ2dsZUVzY3Jvd0xvY2tQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0OCAvLyAidG9nZ2xlX2VzY3Jvd19wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gcmV0dXJuIHRoaXMudG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCmNsYXNzU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUA1MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gbG9nZ2VkRXJyKGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuc3Ryb25nZXJTZXR0aW5ncyhhOiBieXRlcywgYjogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlcywgYnl0ZXM6CnN0cm9uZ2VyU2V0dGluZ3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NjEKICAgIC8vIHByaXZhdGUgc3Ryb25nZXJTZXR0aW5ncyhhOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MsIGI6IEd1aWxkUHJvcG9zYWxTZXR0aW5ncyk6IEd1aWxkUHJvcG9zYWxTZXR0aW5ncyB7CiAgICBwcm90byAyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gZmVlOiBhLmZlZSA+IGIuZmVlID8gYS5mZWUgOiBiLmZlZSwKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID4KICAgIGJ6IHN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9mYWxzZUAyCiAgICBwb3AKCnN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDY0CiAgICAvLyBwb3dlcjogYS5wb3dlciA+IGIucG93ZXIgPyBhLnBvd2VyIDogYi5wb3dlciwKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18zIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID4KICAgIGJ6IHN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9mYWxzZUA1CiAgICBwb3AKCnN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyBkdXJhdGlvbjogYS5kdXJhdGlvbiA+IGIuZHVyYXRpb24gPyBhLmR1cmF0aW9uIDogYi5kdXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+CiAgICBieiBzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfZmFsc2VAOAogICAgcG9wCgpzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gcGFydGljaXBhdGlvbjogYS5wYXJ0aWNpcGF0aW9uID4gYi5wYXJ0aWNpcGF0aW9uID8gYS5wYXJ0aWNpcGF0aW9uIDogYi5wYXJ0aWNpcGF0aW9uLAogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAzCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID4KICAgIGJ6IHN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9mYWxzZUAxMQogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIGNvdmVyIDMKCnN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ2NwogICAgLy8gYXBwcm92YWw6IGEuYXBwcm92YWwgPiBiLmFwcHJvdmFsID8gYS5hcHByb3ZhbCA6IGIuYXBwcm92YWwsCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgPgogICAgYnogc3Ryb25nZXJTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDE0CiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgY292ZXIgNAoKc3Ryb25nZXJTZXR0aW5nc190ZXJuYXJ5X21lcmdlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDY4CiAgICAvLyBtaW5pbXVtQXBwcm92YWxzOiBhLm1pbmltdW1BcHByb3ZhbHMgPiBiLm1pbmltdW1BcHByb3ZhbHMgPyBhLm1pbmltdW1BcHByb3ZhbHMgOiBiLm1pbmltdW1BcHByb3ZhbHMsCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgPgogICAgYnogc3Ryb25nZXJTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDE3CiAgICBwb3AKICAgIHVuY292ZXIgMgoKc3Ryb25nZXJTZXR0aW5nc190ZXJuYXJ5X21lcmdlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDYyLTQ2OQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZmVlOiBhLmZlZSA+IGIuZmVlID8gYS5mZWUgOiBiLmZlZSwKICAgIC8vICAgcG93ZXI6IGEucG93ZXIgPiBiLnBvd2VyID8gYS5wb3dlciA6IGIucG93ZXIsCiAgICAvLyAgIGR1cmF0aW9uOiBhLmR1cmF0aW9uID4gYi5kdXJhdGlvbiA/IGEuZHVyYXRpb24gOiBiLmR1cmF0aW9uLAogICAgLy8gICBwYXJ0aWNpcGF0aW9uOiBhLnBhcnRpY2lwYXRpb24gPiBiLnBhcnRpY2lwYXRpb24gPyBhLnBhcnRpY2lwYXRpb24gOiBiLnBhcnRpY2lwYXRpb24sCiAgICAvLyAgIGFwcHJvdmFsOiBhLmFwcHJvdmFsID4gYi5hcHByb3ZhbCA/IGEuYXBwcm92YWwgOiBiLmFwcHJvdmFsLAogICAgLy8gICBtaW5pbXVtQXBwcm92YWxzOiBhLm1pbmltdW1BcHByb3ZhbHMgPiBiLm1pbmltdW1BcHByb3ZhbHMgPyBhLm1pbmltdW1BcHByb3ZhbHMgOiBiLm1pbmltdW1BcHByb3ZhbHMsCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgpzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfZmFsc2VAMTc6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgYiBzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfbWVyZ2VAMTgKCnN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9mYWxzZUAxNDoKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICBjb3ZlciA0CiAgICBiIHN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9tZXJnZUAxNQoKc3Ryb25nZXJTZXR0aW5nc190ZXJuYXJ5X2ZhbHNlQDExOgogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIGNvdmVyIDMKICAgIGIgc3Ryb25nZXJTZXR0aW5nc190ZXJuYXJ5X21lcmdlQDEyCgpzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfZmFsc2VAODoKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICBjb3ZlciAyCiAgICBiIHN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9tZXJnZUA5CgpzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfZmFsc2VANToKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICBzd2FwCiAgICBiIHN0cm9uZ2VyU2V0dGluZ3NfdGVybmFyeV9tZXJnZUA2CgpzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfZmFsc2VAMjoKICAgIGJ1cnkgMQogICAgYiBzdHJvbmdlclNldHRpbmdzX3Rlcm5hcnlfbWVyZ2VAMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRQcm9wb3NhbFNldHRpbmdzKHR5cGU6IGJ5dGVzLCBkYXRhOiBieXRlcykgLT4gYnl0ZXM6CmdldFByb3Bvc2FsU2V0dGluZ3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIHByaXZhdGUgZ2V0UHJvcG9zYWxTZXR0aW5ncyh0eXBlOiBHdWlsZEFjdGlvblR5cGUsIGRhdGE6IGJ5dGVzKTogR3VpbGRQcm9wb3NhbFNldHRpbmdzIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDc3CiAgICAvLyBpZiAodHlwZSA9PT0gR3VpbGRBY3Rpb25Db25zZW5zdXMpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgMzggLy8gMHg1MwogICAgPT0KICAgIGJ6IGdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIGxvZ2dlZEFzc2VydChkYXRhLmxlbmd0aCA+IDAsIGVyckd1aWxkSW52YWxpZENvbnNlbnN1c0FjdGlvbikKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBibnogZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9hc3NlcnRAMTkKICAgIHB1c2hieXRlcyAiRVJSOmVyckdjYWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2NhYwoKZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czozNzcKICAgIC8vIHJldHVybiBvcC5nZXRCeXRlKGRhdGEsIDApCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBnZXRieXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIHJldHVybiB0aGlzLmdldENvbnNlbnN1c0FjdGlvblNldHRpbmdzKHRoaXMuY29uc2Vuc3VzQWN0aW9uQ29kZShkYXRhKSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmdldENvbnNlbnN1c0FjdGlvblNldHRpbmdzCiAgICByZXRzdWIKCmdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDgwCiAgICAvLyBpZiAodHlwZSA9PT0gR3VpbGRBY3Rpb25FeGVjdXRlUGx1Z2luKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDI1IC8vIDB4MWUKICAgID09CiAgICBieiBnZXRQcm9wb3NhbFNldHRpbmdzX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyBjb25zdCB7IHBsdWdpbiwgZXNjcm93IH0gPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxFeGVjdXRpb24+KGRhdGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wbHVnaW5zKHsgcGx1Z2luLCBlc2Nyb3cgfSkuZXhpc3RzLCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgMjAgLy8gMHgwMDBhCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyBwbHVnaW5zID0gQm94TWFwPEd1aWxkUGx1Z2luS2V5LCBHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFBsdWdpbnMgfSkKICAgIGJ5dGVjIDIxIC8vICJnIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGx1Z2lucyh7IHBsdWdpbiwgZXNjcm93IH0pLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckdhY24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2FjbgoKZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ4MwogICAgLy8gcmV0dXJuIHRoaXMucGx1Z2lucyh7IHBsdWdpbiwgZXNjcm93IH0pLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcmV0c3ViCgpnZXRQcm9wb3NhbFNldHRpbmdzX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gaWYgKHR5cGUgPT09IEd1aWxkQWN0aW9uU2V0UHJvcG9zYWxTZXR0aW5ncykgewogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA0OSAvLyAweDUwCiAgICA9PQogICAgYnogZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIGNvbnN0IHRhcmdldCA9IGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbFNldFNldHRpbmdzPihkYXRhKS5hY3Rpb25UeXBlCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCAxCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ4OAogICAgLy8gaWYgKHRoaXMuaXNDb25maWd1cmFibGVBY3Rpb24odGFyZ2V0KSkgewogICAgY2FsbHN1YiBpc0NvbmZpZ3VyYWJsZUFjdGlvbgogICAgYnogZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gcmV0dXJuIHRoaXMuc3Ryb25nZXJTZXR0aW5ncyh0aGlzLnVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSwgdGhpcy5jbGFzc1NldHRpbmdzKHRhcmdldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyB1cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5VXBkYXRlR3VpbGRQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyAxNiAvLyAidXBkYXRlX2d1aWxkX3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDg5CiAgICAvLyByZXR1cm4gdGhpcy5zdHJvbmdlclNldHRpbmdzKHRoaXMudXBkYXRlR3VpbGRQcm9wb3NhbFNldHRpbmdzLnZhbHVlLCB0aGlzLmNsYXNzU2V0dGluZ3ModGFyZ2V0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIGNsYXNzU2V0dGluZ3MKICAgIGNhbGxzdWIgc3Ryb25nZXJTZXR0aW5ncwogICAgcG9wbiAyCiAgICByZXRzdWIKCmdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDkxCiAgICAvLyByZXR1cm4gdGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIHVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlVcGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDE2IC8vICJ1cGRhdGVfZ3VpbGRfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0OTEKICAgIC8vIHJldHVybiB0aGlzLnVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIHJldHN1YgoKZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDkzCiAgICAvLyBpZiAodHlwZSA9PT0gR3VpbGRBY3Rpb25TZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncykgewogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyAzOSAvLyAweDU0CiAgICA9PQogICAgYnogZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0OTQKICAgIC8vIGNvbnN0IGNvZGUgPSBkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxDb25zZW5zdXNBY3Rpb25TZXR0aW5ncz4oZGF0YSkuY29kZQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gcmV0dXJuIHRoaXMuc3Ryb25nZXJTZXR0aW5ncyh0aGlzLnVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSwgdGhpcy5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncyhjb2RlKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIHVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlVcGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDE2IC8vICJ1cGRhdGVfZ3VpbGRfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIHJldHVybiB0aGlzLnN0cm9uZ2VyU2V0dGluZ3ModGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUsIHRoaXMuZ2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3MoY29kZSkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuZ2V0Q29uc2Vuc3VzQWN0aW9uU2V0dGluZ3MKICAgIGNhbGxzdWIgc3Ryb25nZXJTZXR0aW5ncwogICAgcG9wbiAyCiAgICByZXRzdWIKCmdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gaWYgKHR5cGUgPT09IEd1aWxkQWN0aW9uU2V0UGx1Z2luU2V0dGluZ3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgMTkgLy8gMHgxNgogICAgPT0KICAgIGJ6IGdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyBjb25zdCBrZXk6IEd1aWxkUGx1Z2luS2V5ID0geyBwbHVnaW46IHVwZGF0ZS5wbHVnaW4sIGVzY3JvdzogdXBkYXRlLmVzY3JvdyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBieXRlYyAyMCAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDkKICAgIC8vIHBsdWdpbnMgPSBCb3hNYXA8R3VpbGRQbHVnaW5LZXksIEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UGx1Z2lucyB9KQogICAgYnl0ZWMgMjEgLy8gImciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBpZiAodGhpcy5wbHVnaW5zKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTAxCiAgICAvLyByZXR1cm4gdGhpcy5zdHJvbmdlclNldHRpbmdzKHRoaXMuYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSwgdGhpcy5wbHVnaW5zKGtleSkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBhZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUFkZFBsdWdpblByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDIzIC8vICJhZGRfcGx1Z2luX3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTAxCiAgICAvLyByZXR1cm4gdGhpcy5zdHJvbmdlclNldHRpbmdzKHRoaXMuYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSwgdGhpcy5wbHVnaW5zKGtleSkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGNhbGxzdWIgc3Ryb25nZXJTZXR0aW5ncwogICAgcG9wbiAyCiAgICByZXRzdWIKCmdldFByb3Bvc2FsU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjUwMwogICAgLy8gcmV0dXJuIHRoaXMuYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlBZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyAyMyAvLyAiYWRkX3BsdWdpbl9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjUwMwogICAgLy8gcmV0dXJuIHRoaXMuYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncy52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIHJldHN1YgoKZ2V0UHJvcG9zYWxTZXR0aW5nc19hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTA1CiAgICAvLyByZXR1cm4gdGhpcy5jbGFzc1NldHRpbmdzKHR5cGUpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgY2xhc3NTZXR0aW5ncwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnJlcXVpcmVBdHRhaW5hYmxlTWluaW11bShwcm9wb3NhbElEOiB1aW50NjQsIGN1cnJlbnQ6IHVpbnQ2NCwgbmV4dDogdWludDY0KSAtPiB2b2lkOgpyZXF1aXJlQXR0YWluYWJsZU1pbmltdW06CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIHByaXZhdGUgcmVxdWlyZUF0dGFpbmFibGVNaW5pbXVtKHByb3Bvc2FsSUQ6IHVpbnQ2NCwgY3VycmVudDogdWludDY0LCBuZXh0OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjUxNAogICAgLy8gaWYgKG5leHQgPD0gY3VycmVudCB8fCAhdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkuZXhpc3RzIHx8IHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLnZhbHVlLnZvdGluZ1RzID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAtMgogICAgPD0KICAgIGJueiByZXF1aXJlQXR0YWluYWJsZU1pbmltdW1faWZfYm9keUAzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gcHJvcG9zYWxzID0gQm94TWFwPHVpbnQ2NCwgR3VpbGRQcm9wb3NhbD4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UHJvcG9zYWxzIH0pCiAgICBieXRlYyA1IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyBpZiAobmV4dCA8PSBjdXJyZW50IHx8ICF0aGlzLnByb3Bvc2Fscyhwcm9wb3NhbElEKS5leGlzdHMgfHwgdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUudm90aW5nVHMgPT09IDApIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogcmVxdWlyZUF0dGFpbmFibGVNaW5pbXVtX2lmX2JvZHlAMwogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgNjkKICAgIGludGNfMyAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYm56IHJlcXVpcmVBdHRhaW5hYmxlTWluaW11bV9hZnRlcl9pZl9lbHNlQDQKCnJlcXVpcmVBdHRhaW5hYmxlTWluaW11bV9pZl9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIHJldHVybgogICAgcmV0c3ViCgpyZXF1aXJlQXR0YWluYWJsZU1pbmltdW1fYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTE3CiAgICAvLyBsb2dnZWRBc3NlcnQobmV4dCA8PSB0aGlzLmdldEJhbGxvdChwcm9wb3NhbElEKS52b3Rlcy5hcHByb3ZhbHMsIGVyckd1aWxkTG9ja291dCkKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQuZ2V0QmFsbG90CiAgICBleHRyYWN0IDQ5IDI0CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMQogICAgPj0KICAgIGJueiByZXF1aXJlQXR0YWluYWJsZU1pbmltdW1fYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOmVyckdsa28iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2xrbwoKcmVxdWlyZUF0dGFpbmFibGVNaW5pbXVtX2FmdGVyX2Fzc2VydEA2OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnZhbGlkYXRlUGx1Z2luU2V0dGluZ3MocGx1Z2luOiBieXRlcykgLT4gYnl0ZXM6CnZhbGlkYXRlUGx1Z2luU2V0dGluZ3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1ODQKICAgIC8vIHByaXZhdGUgdmFsaWRhdGVQbHVnaW5TZXR0aW5ncyhwbHVnaW46IEd1aWxkUHJvcG9zYWxBZGRQbHVnaW4pOiB2b2lkIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBpZiAocGx1Z2luLnVzZUV4ZWN1dGlvbktleSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDcgLy8gNDg5CiAgICBnZXRiaXQKICAgIGJ6IHZhbGlkYXRlUGx1Z2luU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGZlZTogcGx1Z2luLmZlZSwKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA2MiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIHBvd2VyOiBwbHVnaW4ucG93ZXIsCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNzAgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyBkdXJhdGlvbjogcGx1Z2luLmR1cmF0aW9uLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDc4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gcGFydGljaXBhdGlvbjogcGx1Z2luLnBhcnRpY2lwYXRpb24sCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgODYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTkxCiAgICAvLyBhcHByb3ZhbDogcGx1Z2luLmFwcHJvdmFsLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDk0IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gbWluaW11bUFwcHJvdmFsczogcGx1Z2luLm1pbmltdW1BcHByb3ZhbHMsCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMTAyIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU4Ni01OTMKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyh7CiAgICAvLyAgIGZlZTogcGx1Z2luLmZlZSwKICAgIC8vICAgcG93ZXI6IHBsdWdpbi5wb3dlciwKICAgIC8vICAgZHVyYXRpb246IHBsdWdpbi5kdXJhdGlvbiwKICAgIC8vICAgcGFydGljaXBhdGlvbjogcGx1Z2luLnBhcnRpY2lwYXRpb24sCiAgICAvLyAgIGFwcHJvdmFsOiBwbHVnaW4uYXBwcm92YWwsCiAgICAvLyAgIG1pbmltdW1BcHByb3ZhbHM6IHBsdWdpbi5taW5pbXVtQXBwcm92YWxzLAogICAgLy8gfSkKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY2FsbHN1YiB2YWxpZGF0ZVNldHRpbmdzCiAgICBwb3AKCnZhbGlkYXRlUGx1Z2luU2V0dGluZ3NfYWZ0ZXJfaWZfZWxzZUAyOgogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQudmFsaWRhdGVBY3Rpb25zKGFjdGlvbnM6IGJ5dGVzKSAtPiBieXRlczoKdmFsaWRhdGVBY3Rpb25zOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyBwcm90ZWN0ZWQgdmFsaWRhdGVBY3Rpb25zKGFjdGlvbnM6IEd1aWxkUHJvcG9zYWxBY3Rpb25bXSk6IHZvaWQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIGxvZ2dlZEFzc2VydChhY3Rpb25zLmxlbmd0aCA+IDAsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgYm56IHZhbGlkYXRlQWN0aW9uc19hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckdhY24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2FjbgoKdmFsaWRhdGVBY3Rpb25zX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBsb2dnZWRBc3NlcnQoYWN0aW9ucy5sZW5ndGggPD0gdGhpcy5wcm9wb3NhbEFjdGlvbkxpbWl0LnZhbHVlLCBlcnJHdWlsZFRvb01hbnlBY3Rpb25zKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3NwogICAgLy8gcHJvcG9zYWxBY3Rpb25MaW1pdCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlQcm9wb3NhbEFjdGlvbkxpbWl0IH0pCiAgICBieXRlYyAzMCAvLyAicHJvcG9zYWxfYWN0aW9uX2xpbWl0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBsb2dnZWRBc3NlcnQoYWN0aW9ucy5sZW5ndGggPD0gdGhpcy5wcm9wb3NhbEFjdGlvbkxpbWl0LnZhbHVlLCBlcnJHdWlsZFRvb01hbnlBY3Rpb25zKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDw9CiAgICBibnogdmFsaWRhdGVBY3Rpb25zX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyOSAvLyAiRVJSOmVyckdtYXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR21heAoKdmFsaWRhdGVBY3Rpb25zX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjAwCiAgICAvLyB0aGlzLnZhbGlkYXRlRWFjaEFjdGlvbihhY3Rpb25zKQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHZhbGlkYXRlRWFjaEFjdGlvbgogICAgZHVwCiAgICBmcmFtZV9idXJ5IC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQudmFsaWRhdGVFYWNoQWN0aW9uKGFjdGlvbnM6IGJ5dGVzKSAtPiBieXRlczoKdmFsaWRhdGVFYWNoQWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjA0CiAgICAvLyBwcml2YXRlIHZhbGlkYXRlRWFjaEFjdGlvbihhY3Rpb25zOiBHdWlsZFByb3Bvc2FsQWN0aW9uW10pOiB2b2lkIHsKICAgIHByb3RvIDEgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MDUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKdmFsaWRhdGVFYWNoQWN0aW9uX3doaWxlX3RvcEAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjA1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZnJhbWVfZGlnIDQKICAgID4KICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl93aGlsZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MzMKICAgIC8vIHRoaXMuZ2V0UHJvcG9zYWxTZXR0aW5ncyhhY3Rpb24udHlwZSwgYWN0aW9uLmRhdGEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZXh0cmFjdCAwIDEKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIGNhbGxzdWIgZ2V0UHJvcG9zYWxTZXR0aW5ncwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MzUKICAgIC8vIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSBHdWlsZFN0YXRlRHJhZnQpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHN0YXRlID0gR2xvYmFsU3RhdGU8R3VpbGRTdGF0ZT4oeyBpbml0aWFsVmFsdWU6IEd1aWxkU3RhdGVEcmFmdCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5U3RhdGUgfSkKICAgIGJ5dGVjIDcgLy8gInN0YXRlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PT0gR3VpbGRTdGF0ZURyYWZ0KSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMSAvLyAweDAwCiAgICA9PQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gYWN0aW9uLnR5cGUgIT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCAmJiBhY3Rpb24udHlwZSAhPT0gR3VpbGRBY3Rpb25FeGVjdXRlUGx1Z2luLAogICAgZHVwCiAgICBieXRlYyAxMSAvLyAweDBhCiAgICAhPQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2Jvb2xfZmFsc2VAOAogICAgZHVwCiAgICBieXRlYyAyNSAvLyAweDFlCiAgICAhPQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2Jvb2xfZmFsc2VAOAogICAgaW50Y18xIC8vIDEKCnZhbGlkYXRlRWFjaEFjdGlvbl9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MzctNTQwCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGFjdGlvbi50eXBlICE9PSBHdWlsZEFjdGlvblVwZ3JhZGVBcHAgJiYgYWN0aW9uLnR5cGUgIT09IEd1aWxkQWN0aW9uRXhlY3V0ZVBsdWdpbiwKICAgIC8vICAgZXJyR3VpbGRJbnZhbGlkQWN0aW9uLAogICAgLy8gKQogICAgYm56IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDExCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyR2FjbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHYWNuCgp2YWxpZGF0ZUVhY2hBY3Rpb25fYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICBkdXAKICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgID09CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU0NC01NDUKICAgIC8vIGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvbkFkZFBsdWdpbiB8fAogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQWRkTmFtZWRQbHVnaW4gfHwKICAgIGJueiB2YWxpZGF0ZUVhY2hBY3Rpb25faWZfYm9keUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgZGlnIDEKICAgIGJ5dGVjIDE4IC8vIDB4MTUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NDQtNTQ1CiAgICAvLyBhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25BZGRQbHVnaW4gfHwKICAgIC8vIGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luIHx8CiAgICBibnogdmFsaWRhdGVFYWNoQWN0aW9uX2lmX2JvZHlAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luIHx8CiAgICBkaWcgMQogICAgYnl0ZWMgOSAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTQ0LTU0NgogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyBhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luIHx8CiAgICBibnogdmFsaWRhdGVFYWNoQWN0aW9uX2lmX2JvZHlAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU0NwogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlTmFtZWRQbHVnaW4KICAgIGRpZyAxCiAgICBieXRlYyAyNyAvLyAweDI5CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTQ0LTU0NwogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luIHx8CiAgICAvLyBhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbiB8fAogICAgLy8gYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlUGx1Z2luIHx8CiAgICAvLyBhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbgogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTcKCnZhbGlkYXRlRWFjaEFjdGlvbl9pZl9ib2R5QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGx1Z2luU2V0TG9ja2VkLnZhbHVlLCBlcnJHdWlsZFBsdWdpblNldExvY2tlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODEKICAgIC8vIHBsdWdpblNldExvY2tlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UGx1Z2luU2V0TG9ja2VkIH0pCiAgICBieXRlYyAxNSAvLyAicGx1Z2luc19sb2NrZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NDkKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wbHVnaW5TZXRMb2NrZWQudmFsdWUsIGVyckd1aWxkUGx1Z2luU2V0TG9ja2VkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDE3CiAgICBieXRlYyA1MCAvLyAiRVJSOmVyckdwbGsiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3BsawoKdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGlmICh0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24oYWN0aW9uLnR5cGUpIHx8IGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzKSB7CiAgICBkaWcgMQogICAgY2FsbHN1YiBpc1VwZGF0ZUd1aWxkQWN0aW9uCiAgICBibnogdmFsaWRhdGVFYWNoQWN0aW9uX2lmX2JvZHlAMTkKICAgIGRpZyAxCiAgICBieXRlYyAxOSAvLyAweDE2CiAgICA9PQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjAKCnZhbGlkYXRlRWFjaEFjdGlvbl9pZl9ib2R5QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCgp2YWxpZGF0ZUVhY2hBY3Rpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucmVxdWlyZXNXYWxsZXRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIGlmICh0aGlzLnJlcXVpcmVzV2FsbGV0KGFjdGlvbikpIHsKICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NTMKICAgIC8vIHRoaXMucmVxdWlyZVdhbGxldCgpCiAgICBjYWxsc3ViIHJlcXVpcmVXYWxsZXQKCnZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyBpZiAoYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQWRkUGx1Z2luKSB7CiAgICBieiB2YWxpZGF0ZUVhY2hBY3Rpb25fZWxzZV9ib2R5QDI3CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU1OAogICAgLy8gdGhpcy52YWxpZGF0ZVBsdWdpblNldHRpbmdzKHBsdWdpbikKICAgIGZyYW1lX2RpZyAyCiAgICBjYWxsc3ViIHZhbGlkYXRlUGx1Z2luU2V0dGluZ3MKICAgIHBvcAoKdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VANTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MDUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgNAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGZyYW1lX2J1cnkgNAogICAgYiB2YWxpZGF0ZUVhY2hBY3Rpb25fd2hpbGVfdG9wQDEKCnZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NTkKICAgIC8vIH0gZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQWRkTmFtZWRQbHVnaW4pIHsKICAgIGR1cAogICAgYnl0ZWMgMTggLy8gMHgxNQogICAgPT0KICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlAMjkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTYxCiAgICAvLyB0aGlzLnZhbGlkYXRlUGx1Z2luU2V0dGluZ3MocGx1Z2luKQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgZXh0cmFjdCA0IDgKICAgIGRpZyAxCiAgICBleHRyYWN0IDEyIDMyCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIHB1c2hpbnQgNjEKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyA1CiAgICBleHRyYWN0IDQ2IDEKICAgIGRpZyA2CiAgICBleHRyYWN0IDQ3IDgKICAgIGRpZyA3CiAgICBleHRyYWN0IDU1IDgKICAgIGRpZyA1CiAgICBwdXNoaW50IDExMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyA2CiAgICB1bmNvdmVyIDYKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBkaWcgNgogICAgaW50YyA4IC8vIDUwNAogICAgZ2V0Yml0CiAgICBkaWcgNwogICAgaW50YyA5IC8vIDUwNQogICAgZ2V0Yml0CiAgICBkaWcgOAogICAgaW50YyAxMCAvLyA1MDYKICAgIGdldGJpdAogICAgZGlnIDkKICAgIGludGMgMTEgLy8gNTA3CiAgICBnZXRiaXQKICAgIGRpZyAxMwogICAgZXh0cmFjdCA2NiA4CiAgICBkaWcgMTQKICAgIGV4dHJhY3QgNzQgOAogICAgZGlnIDE1CiAgICBleHRyYWN0IDgyIDgKICAgIGRpZyAxNgogICAgZXh0cmFjdCA5MCA4CiAgICBkaWcgMTcKICAgIGV4dHJhY3QgOTggOAogICAgdW5jb3ZlciAxOAogICAgZXh0cmFjdCAxMDYgOAogICAgZGlnIDE2CiAgICBsZW4KICAgIHVuY292ZXIgMTcKICAgIHVuY292ZXIgMTMKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgdW5jb3ZlciAxNwogICAgdW5jb3ZlciAxNwogICAgY29uY2F0CiAgICBkaWcgMTYKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMTcKICAgIGNvbmNhdAogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MDA3MAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDExMgogICAgKwogICAgc3dhcAogICAgdW5jb3ZlciAxNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDE2CiAgICBjb25jYXQKICAgIHVuY292ZXIgMTUKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIGRpZyAxNAogICAgbGVuCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMTUKICAgIHNldGJpdAogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMTQKICAgIHNldGJpdAogICAgaW50Y18yIC8vIDIKICAgIHVuY292ZXIgMTMKICAgIHNldGJpdAogICAgcHVzaGludCAzCiAgICB1bmNvdmVyIDEyCiAgICBzZXRiaXQKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDkKICAgIGNvbmNhdAogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNhbGxzdWIgdmFsaWRhdGVQbHVnaW5TZXR0aW5ncwogICAgcG9wCiAgICBiIHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDU0Cgp2YWxpZGF0ZUVhY2hBY3Rpb25fZWxzZV9ib2R5QDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTYyCiAgICAvLyB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvblNldFByb3Bvc2FsU2V0dGluZ3MpIHsKICAgIGR1cAogICAgYnl0ZWMgNDkgLy8gMHg1MAogICAgPT0KICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlAMzIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTY0CiAgICAvLyB0aGlzLnZhbGlkYXRlU2V0dGluZ3ModXBkYXRlLnNldHRpbmdzKQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgZXh0cmFjdCAzIDQ4CiAgICBjYWxsc3ViIHZhbGlkYXRlU2V0dGluZ3MKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0NvbmZpZ3VyYWJsZUFjdGlvbih1cGRhdGUuYWN0aW9uVHlwZSksIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGV4dHJhY3QgMiAxCiAgICBjYWxsc3ViIGlzQ29uZmlndXJhYmxlQWN0aW9uCiAgICBibnogdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VANTQKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCnZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NjYKICAgIC8vIH0gZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uU2V0UHJvcG9zYWxBY3Rpb25MaW1pdCkgewogICAgZHVwCiAgICBwdXNoYnl0ZXMgMHg1MQogICAgPT0KICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlAMzkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTY3CiAgICAvLyBjb25zdCBsaW1pdCA9IGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbFNldEFjdGlvbkxpbWl0PihhY3Rpb24uZGF0YSkubGltaXQKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzIgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGxvZ2dlZEFzc2VydChsaW1pdCA+IDAgJiYgbGltaXQgPD0gTUFYX0dVSUxEX1BST1BPU0FMX0FDVElPTlMsIGVyckd1aWxkVG9vTWFueUFjdGlvbnMpCiAgICBieiB2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9mYWxzZUAzNgogICAgZnJhbWVfZGlnIDMKICAgIHB1c2hpbnQgMTIKICAgIDw9CiAgICBieiB2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9mYWxzZUAzNgogICAgaW50Y18xIC8vIDEKCnZhbGlkYXRlRWFjaEFjdGlvbl9ib29sX21lcmdlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTY4CiAgICAvLyBsb2dnZWRBc3NlcnQobGltaXQgPiAwICYmIGxpbWl0IDw9IE1BWF9HVUlMRF9QUk9QT1NBTF9BQ1RJT05TLCBlcnJHdWlsZFRvb01hbnlBY3Rpb25zKQogICAgYm56IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDU0CiAgICBieXRlYyAyOSAvLyAiRVJSOmVyckdtYXgiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR21heAoKdmFsaWRhdGVFYWNoQWN0aW9uX2Jvb2xfZmFsc2VAMzY6CiAgICBpbnRjXzAgLy8gMAogICAgYiB2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9tZXJnZUAzNwoKdmFsaWRhdGVFYWNoQWN0aW9uX2Vsc2VfYm9keUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU2OQogICAgLy8gfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25TZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncykgewogICAgZHVwCiAgICBieXRlYyAzOSAvLyAweDU0CiAgICA9PQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2Vsc2VfYm9keUA0MQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxDb25zZW5zdXNBY3Rpb25TZXR0aW5ncz4oYWN0aW9uLmRhdGEpLnNldHRpbmdzKQogICAgZnJhbWVfZGlnIDEKICAgIGV4dHJhY3QgMTAgNDgKICAgIGNhbGxzdWIgdmFsaWRhdGVTZXR0aW5ncwogICAgcG9wCiAgICBiIHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDU0Cgp2YWxpZGF0ZUVhY2hBY3Rpb25fZWxzZV9ib2R5QDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTcxCiAgICAvLyB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvbkNvbnNlbnN1cykgewogICAgZHVwCiAgICBieXRlYyAzOCAvLyAweDUzCiAgICA9PQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2Vsc2VfYm9keUA0MwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NzMKICAgIC8vIHRoaXMuY29uc2Vuc3VzQWN0aW9uTWJyKGFjdGlvbi5kYXRhKQogICAgZnJhbWVfZGlnIDIKICAgIGNhbGxzdWIgY29uc2Vuc3VzQWN0aW9uTWJyCiAgICBwb3AKICAgIGIgdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VANTQKCnZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NzQKICAgIC8vIH0gZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uQ2hhbmdlQWRtaW4pIHsKICAgIGR1cAogICAgYnl0ZWMgMjggLy8gMHg1YgogICAgPT0KICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9lbHNlX2JvZHlANTAKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTc1CiAgICAvLyBjb25zdCBhZG1pbiA9IGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbENoYW5nZUFkbWluPihhY3Rpb24uZGF0YSkuYWRtaW4KICAgIGZyYW1lX2RpZyAxCiAgICBleHRyYWN0IDIgMzIKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIGxvZ2dlZEFzc2VydChhZG1pbiAhPT0gR2xvYmFsLnplcm9BZGRyZXNzICYmIGFkbWluICE9PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyR3VpbGRJbnZhbGlkQWRtaW4pCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiB2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9mYWxzZUA0NwogICAgZnJhbWVfZGlnIDAKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAhPQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2Jvb2xfZmFsc2VANDcKICAgIGludGNfMSAvLyAxCgp2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9tZXJnZUA0ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFkbWluICE9PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgYWRtaW4gIT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJHdWlsZEludmFsaWRBZG1pbikKICAgIGJueiB2YWxpZGF0ZUVhY2hBY3Rpb25fYWZ0ZXJfaWZfZWxzZUA1NAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyR2FkbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHYWRtCgp2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9mYWxzZUA0NzoKICAgIGludGNfMCAvLyAwCiAgICBiIHZhbGlkYXRlRWFjaEFjdGlvbl9ib29sX21lcmdlQDQ4Cgp2YWxpZGF0ZUVhY2hBY3Rpb25fZWxzZV9ib2R5QDUwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvblNldFBsdWdpblNldHRpbmdzKSB7CiAgICBieXRlYyAxOSAvLyAweDE2CiAgICA9PQogICAgYnogdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VANTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjU3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGx1Z2lucyh7IHBsdWdpbjogdXBkYXRlLnBsdWdpbiwgZXNjcm93OiB1cGRhdGUuZXNjcm93IH0pLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgZnJhbWVfZGlnIDEKICAgIGV4dHJhY3QgMiA4CiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgYnl0ZWMgMjAgLy8gMHgwMDBhCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyBwbHVnaW5zID0gQm94TWFwPEd1aWxkUGx1Z2luS2V5LCBHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeFBsdWdpbnMgfSkKICAgIGJ5dGVjIDIxIC8vICJnIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBsdWdpbnMoeyBwbHVnaW46IHVwZGF0ZS5wbHVnaW4sIGVzY3JvdzogdXBkYXRlLmVzY3JvdyB9KS5leGlzdHMsIGVyckd1aWxkSW52YWxpZEFjdGlvbikKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9hc3NlcnRANTMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCnZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9hc3NlcnRANTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyh1cGRhdGUuc2V0dGluZ3MpCiAgICBmcmFtZV9kaWcgMQogICAgZXh0cmFjdCAxMiA0OAogICAgY2FsbHN1YiB2YWxpZGF0ZVNldHRpbmdzCiAgICBwb3AKICAgIGIgdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lmX2Vsc2VANTQKCnZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTI1CiAgICAvLyBpZiAoYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uKSB7CiAgICBkaWcgMQogICAgYnl0ZWMgMjYgLy8gMHgxZgogICAgPT0KICAgIGJ6IHZhbGlkYXRlRWFjaEFjdGlvbl9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1MjYKICAgIC8vIHJldHVybiAhdGhpcy5leGVjdXRpb25zKGRlY29kZUFyYzQ8R3VpbGRQcm9wb3NhbFJlbW92ZUV4ZWN1dGlvbj4oYWN0aW9uLmRhdGEpLmV4ZWN1dGlvbktleSkuZXhpc3RzCiAgICBmcmFtZV9kaWcgMQogICAgZXh0cmFjdCAyIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTMKICAgIC8vIGV4ZWN1dGlvbnMgPSBCb3hNYXA8Ynl0ZXM8MzI+LCBHdWlsZEV4ZWN1dGlvbk1ldGFkYXRhPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhFeGVjdXRpb25zIH0pCiAgICBieXRlYyAxNyAvLyAieCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NTI2CiAgICAvLyByZXR1cm4gIXRoaXMuZXhlY3V0aW9ucyhkZWNvZGVBcmM0PEd1aWxkUHJvcG9zYWxSZW1vdmVFeGVjdXRpb24+KGFjdGlvbi5kYXRhKS5leGVjdXRpb25LZXkpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIGlmICh0aGlzLnJlcXVpcmVzV2FsbGV0KGFjdGlvbikpIHsKICAgIGIgdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnJlcXVpcmVzV2FsbGV0QDIzCgp2YWxpZGF0ZUVhY2hBY3Rpb25fYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIGlmICh0aGlzLnJlcXVpcmVzV2FsbGV0KGFjdGlvbikpIHsKICAgIGIgdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnJlcXVpcmVzV2FsbGV0QDIzCgp2YWxpZGF0ZUVhY2hBY3Rpb25fYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgdmFsaWRhdGVFYWNoQWN0aW9uX2Jvb2xfbWVyZ2VAOQoKdmFsaWRhdGVFYWNoQWN0aW9uX2FmdGVyX3doaWxlQDM6CiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnZhbGlkRWRpdE9yU3VibWl0KHByb3Bvc2FsSUQ6IHVpbnQ2NCkgLT4gdWludDY0Ogp2YWxpZEVkaXRPclN1Ym1pdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8gcHJpdmF0ZSB2YWxpZEVkaXRPclN1Ym1pdChwcm9wb3NhbElEOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gcHJvcG9zYWxzID0gQm94TWFwPHVpbnQ2NCwgR3VpbGRQcm9wb3NhbD4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UHJvcG9zYWxzIH0pCiAgICBieXRlYyA1IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvcG9zYWxzKHByb3Bvc2FsSUQpLmV4aXN0cywgZXJyR3VpbGRJbnZhbGlkUHJvcG9zYWwpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB2YWxpZEVkaXRPclN1Ym1pdF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMTMgLy8gIkVSUjplcnJHcHJwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwcnAKCnZhbGlkRWRpdE9yU3VibWl0X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBjb25zdCB7IHN0YXR1cywgY3JlYXRvciB9ID0gdGhpcy5wcm9wb3NhbHMocHJvcG9zYWxJRCkudmFsdWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgc3dhcAogICAgcHVzaGludHMgMzcgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYxMwogICAgLy8gcmV0dXJuIHN0YXR1cyA9PT0gR3VpbGRQcm9wb3NhbFN0YXR1c0RyYWZ0ICYmIFR4bi5zZW5kZXIgPT09IGNyZWF0b3IKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgPT0KICAgIGJ6IHZhbGlkRWRpdE9yU3VibWl0X2Jvb2xfZmFsc2VANQogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiB2YWxpZEVkaXRPclN1Ym1pdF9ib29sX2ZhbHNlQDUKICAgIGludGNfMSAvLyAxCgp2YWxpZEVkaXRPclN1Ym1pdF9ib29sX21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MTMKICAgIC8vIHJldHVybiBzdGF0dXMgPT09IEd1aWxkUHJvcG9zYWxTdGF0dXNEcmFmdCAmJiBUeG4uc2VuZGVyID09PSBjcmVhdG9yCiAgICBzd2FwCiAgICByZXRzdWIKCnZhbGlkRWRpdE9yU3VibWl0X2Jvb2xfZmFsc2VANToKICAgIGludGNfMCAvLyAwCiAgICBiIHZhbGlkRWRpdE9yU3VibWl0X2Jvb2xfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5uZXh0UHJvcG9zYWxJRCgpIC0+IHVpbnQ2NDoKbmV4dFByb3Bvc2FsSUQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5wcm9wb3NhbElELnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBwcm9wb3NhbElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UHJvcG9zYWxJRCB9KQogICAgYnl0ZWMgNDEgLy8gInByb3Bvc2FsX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjE3CiAgICAvLyBjb25zdCBpZCA9IHRoaXMucHJvcG9zYWxJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYxOAogICAgLy8gdGhpcy5wcm9wb3NhbElELnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gcHJvcG9zYWxJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVByb3Bvc2FsSUQgfSkKICAgIGJ5dGVjIDQxIC8vICJwcm9wb3NhbF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYxOAogICAgLy8gdGhpcy5wcm9wb3NhbElELnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIHJldHVybiBpZAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmdvdmVybmFuY2VQb3dlcihhY2NvdW50OiBieXRlcywgZXZpZGVuY2U6IGJ5dGVzLCByZXF1aXJlZFRocm91Z2g6IHVpbnQ2NCkgLT4gdWludDY0Ogpnb3Zlcm5hbmNlUG93ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MjIKICAgIC8vIHByaXZhdGUgZ292ZXJuYW5jZVBvd2VyKGFjY291bnQ6IEFjY291bnQsIGV2aWRlbmNlOiBieXRlcywgcmVxdWlyZWRUaHJvdWdoOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MjMtNjI2CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5wcm9wb3NhbFBvd2VyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjY291bnQsIGV2aWRlbmNlLCByZXF1aXJlZFRocm91Z2hdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gYXJnczogW2FjY291bnQsIGV2aWRlbmNlLCByZXF1aXJlZFRocm91Z2hdLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MjQKICAgIC8vIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjI0CiAgICAvLyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MjMtNjI2CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5wcm9wb3NhbFBvd2VyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIC8vICAgYXJnczogW2FjY291bnQsIGV2aWRlbmNlLCByZXF1aXJlZFRocm91Z2hdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGMzZWI3Y2Q0IC8vIG1ldGhvZCAicHJvcG9zYWxQb3dlcihhZGRyZXNzLGJ5dGVbXSx1aW50NjQpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNyZWF0ZU9yVXBkYXRlUHJvcG9zYWwoaWQ6IHVpbnQ2NCwgY2lkOiBieXRlcywgYWN0aW9uczogYnl0ZXMsIGZlZXNQYWlkOiB1aW50NjQsIHBvd2VyUmVxdWlyZWQ6IHVpbnQ2NCwgcHJvcG9zZXJQb3dlcjogdWludDY0KSAtPiB1aW50NjQsIGJ5dGVzOgpjcmVhdGVPclVwZGF0ZVByb3Bvc2FsOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjI5LTYzNgogICAgLy8gcHJpdmF0ZSBjcmVhdGVPclVwZGF0ZVByb3Bvc2FsKAogICAgLy8gICBpZDogdWludDY0LAogICAgLy8gICBjaWQ6IENJRCwKICAgIC8vICAgYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdLAogICAgLy8gICBmZWVzUGFpZDogdWludDY0LAogICAgLy8gICBwb3dlclJlcXVpcmVkOiB1aW50NjQsCiAgICAvLyAgIHByb3Bvc2VyUG93ZXI6IHVpbnQ2NCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBwcm90byA2IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYzNwogICAgLy8gaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc3RhdGUgPSBHbG9iYWxTdGF0ZTxHdWlsZFN0YXRlPih7IGluaXRpYWxWYWx1ZTogR3VpbGRTdGF0ZURyYWZ0LCBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlTdGF0ZSB9KQogICAgYnl0ZWMgNyAvLyAic3RhdGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSBHdWlsZFN0YXRlRHJhZnQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgc3dhcAogICAgYnl0ZWNfMSAvLyAweDAwCiAgICA9PQogICAgYnogY3JlYXRlT3JVcGRhdGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYzOAogICAgLy8gdGhpcy5yZXF1aXJlQ3JlYXRvckRyYWZ0KCkKICAgIGNhbGxzdWIgcmVxdWlyZUNyZWF0b3JEcmFmdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjM5CiAgICAvLyBpZCA9IHRoaXMubmV4dFByb3Bvc2FsSUQoKQogICAgY2FsbHN1YiBuZXh0UHJvcG9zYWxJRAogICAgZnJhbWVfYnVyeSAtNgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjQzCiAgICAvLyBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyBjcmVhdGVkOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyBzdGF0dXM6IEd1aWxkUHJvcG9zYWxTdGF0dXNBcHByb3ZlZCwKICAgIGJ5dGVjIDkgLy8gMHgyOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjQwLTY0OAogICAgLy8gdGhpcy5wcm9wb3NhbHMoaWQpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IEd1aWxkUHJvcG9zYWxTdGF0dXNBcHByb3ZlZCwKICAgIC8vICAgY2lkLAogICAgLy8gICBjcmVhdG9yOiBUeG4uc2VuZGVyLAogICAgLy8gICB2b3RpbmdUczogMCwKICAgIC8vICAgY3JlYXRlZDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgZmVlc1BhaWQsCiAgICAvLyAgIGFjdGlvbnM6IGNsb25lKGFjdGlvbnMpLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC01CiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgNjEgLy8gMHgwMDVmCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NDAKICAgIC8vIHRoaXMucHJvcG9zYWxzKGlkKS52YWx1ZSA9IHsKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY0MC02NDgKICAgIC8vIHRoaXMucHJvcG9zYWxzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBHdWlsZFByb3Bvc2FsU3RhdHVzQXBwcm92ZWQsCiAgICAvLyAgIGNpZCwKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgdm90aW5nVHM6IDAsCiAgICAvLyAgIGNyZWF0ZWQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGZlZXNQYWlkLAogICAgLy8gICBhY3Rpb25zOiBjbG9uZShhY3Rpb25zKSwKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIHJldHVybiBpZAogICAgZnJhbWVfZGlnIC02CiAgICBmcmFtZV9kaWcgLTQKICAgIHJldHN1YgoKY3JlYXRlT3JVcGRhdGVQcm9wb3NhbF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIGxvZ2dlZEFzc2VydChwcm9wb3NlclBvd2VyID49IHBvd2VyUmVxdWlyZWQsIGVyckd1aWxkTm9Hb3Zlcm5hbmNlUG93ZXIpCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAtMgogICAgPj0KICAgIGJueiBjcmVhdGVPclVwZGF0ZVByb3Bvc2FsX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA1NyAvLyAiRVJSOmVyckdwd3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR3B3cgoKY3JlYXRlT3JVcGRhdGVQcm9wb3NhbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gaWYgKGlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVPclVwZGF0ZVByb3Bvc2FsX2Vsc2VfYm9keUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIGlkID0gdGhpcy5uZXh0UHJvcG9zYWxJRCgpCiAgICBjYWxsc3ViIG5leHRQcm9wb3NhbElECiAgICBmcmFtZV9idXJ5IC02CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NTYKICAgIC8vIGNyZWF0ZWQgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCgpjcmVhdGVPclVwZGF0ZVByb3Bvc2FsX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjYzNwogICAgLy8gaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdCkgewogICAgYnl0ZWNfMSAvLyAweDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NjEtNjY5CiAgICAvLyB0aGlzLnByb3Bvc2FscyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXR1czogR3VpbGRQcm9wb3NhbFN0YXR1c0RyYWZ0LAogICAgLy8gICBjaWQsCiAgICAvLyAgIGNyZWF0b3I6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHZvdGluZ1RzOiAwLAogICAgLy8gICBjcmVhdGVkLAogICAgLy8gICBmZWVzUGFpZCwKICAgIC8vICAgYWN0aW9uczogY2xvbmUoYWN0aW9ucyksCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTUKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgNjEgLy8gMHgwMDVmCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NjEKICAgIC8vIHRoaXMucHJvcG9zYWxzKGlkKS52YWx1ZSA9IHsKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBwcm9wb3NhbHMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsPih7IGtleVByZWZpeDogR3VpbGRCb3hQcmVmaXhQcm9wb3NhbHMgfSkKICAgIGJ5dGVjIDUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY2MS02NjkKICAgIC8vIHRoaXMucHJvcG9zYWxzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBHdWlsZFByb3Bvc2FsU3RhdHVzRHJhZnQsCiAgICAvLyAgIGNpZCwKICAgIC8vICAgY3JlYXRvcjogVHhuLnNlbmRlciwKICAgIC8vICAgdm90aW5nVHM6IDAsCiAgICAvLyAgIGNyZWF0ZWQsCiAgICAvLyAgIGZlZXNQYWlkLAogICAgLy8gICBhY3Rpb25zOiBjbG9uZShhY3Rpb25zKSwKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NzAKICAgIC8vIHJldHVybiBpZAogICAgZnJhbWVfZGlnIC02CiAgICBmcmFtZV9kaWcgLTQKICAgIHJldHN1YgoKY3JlYXRlT3JVcGRhdGVQcm9wb3NhbF9lbHNlX2JvZHlANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY1OAogICAgLy8gY3JlYXRlZCA9IHRoaXMucHJvcG9zYWxzKGlkKS52YWx1ZS5jcmVhdGVkCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gcHJvcG9zYWxzID0gQm94TWFwPHVpbnQ2NCwgR3VpbGRQcm9wb3NhbD4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UHJvcG9zYWxzIH0pCiAgICBieXRlYyA1IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIGNyZWF0ZWQgPSB0aGlzLnByb3Bvc2FscyhpZCkudmFsdWUuY3JlYXRlZAogICAgcHVzaGludCA3NwogICAgaW50Y18zIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBiIGNyZWF0ZU9yVXBkYXRlUHJvcG9zYWxfYWZ0ZXJfaWZfZWxzZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmFjdGl2YXRlKHBhcnRpYWw6IHVpbnQ2NCkgLT4gdm9pZDoKYWN0aXZhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NzMKICAgIC8vIHByaXZhdGUgYWN0aXZhdGUocGFydGlhbDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NzQKICAgIC8vIHRoaXMucmVxdWlyZUNyZWF0b3JEcmFmdCgpCiAgICBjYWxsc3ViIHJlcXVpcmVDcmVhdG9yRHJhZnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY3NQogICAgLy8gaWYgKCFwYXJ0aWFsKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBhY3RpdmF0ZV9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY3NgogICAgLy8gdGhpcy5yZXF1aXJlV2FsbGV0KCkKICAgIGNhbGxzdWIgcmVxdWlyZVdhbGxldAoKYWN0aXZhdGVfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Njc4CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLnZhbGlkYXRlQWN0aXZhdGlvbj4oeyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUgfSkKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Njc4CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLnZhbGlkYXRlQWN0aXZhdGlvbj4oeyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUgfSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweGI5ODY1YTYxIC8vIG1ldGhvZCAidmFsaWRhdGVBY3RpdmF0aW9uKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIHRoaXMuc3RhdGUudmFsdWUgPSBwYXJ0aWFsID8gR3VpbGRTdGF0ZVBhcnRpYWxseUluaXRpYWxpemVkIDogR3VpbGRTdGF0ZUZ1bGx5SW5pdGlhbGl6ZWQKICAgIHB1c2hieXRlc3MgMHgwMiAweDAxCiAgICBmcmFtZV9kaWcgLTEKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzdGF0ZSA9IEdsb2JhbFN0YXRlPEd1aWxkU3RhdGU+KHsgaW5pdGlhbFZhbHVlOiBHdWlsZFN0YXRlRHJhZnQsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVN0YXRlIH0pCiAgICBieXRlYyA3IC8vICJzdGF0ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY3OQogICAgLy8gdGhpcy5zdGF0ZS52YWx1ZSA9IHBhcnRpYWwgPyBHdWlsZFN0YXRlUGFydGlhbGx5SW5pdGlhbGl6ZWQgOiBHdWlsZFN0YXRlRnVsbHlJbml0aWFsaXplZAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXRTZXR0aW5nc0ZvckFjdGlvbih0eXBlOiBieXRlcywgc2V0dGluZ3M6IGJ5dGVzLCBwcm9wb3NhbElEOiB1aW50NjQpIC0+IGJ5dGVzOgpzZXRTZXR0aW5nc0ZvckFjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY4MgogICAgLy8gcHJpdmF0ZSBzZXRTZXR0aW5nc0ZvckFjdGlvbih0eXBlOiBHdWlsZEFjdGlvblR5cGUsIHNldHRpbmdzOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MsIHByb3Bvc2FsSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2ODMKICAgIC8vIHRoaXMudmFsaWRhdGVTZXR0aW5ncyhzZXR0aW5ncykKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiB2YWxpZGF0ZVNldHRpbmdzCiAgICBmcmFtZV9idXJ5IC0yCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIHRoaXMucmVxdWlyZUF0dGFpbmFibGVNaW5pbXVtKHByb3Bvc2FsSUQsIHRoaXMuY2xhc3NTZXR0aW5ncyh0eXBlKS5taW5pbXVtQXBwcm92YWxzLCBzZXR0aW5ncy5taW5pbXVtQXBwcm92YWxzKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGNsYXNzU2V0dGluZ3MKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVxdWlyZUF0dGFpbmFibGVNaW5pbXVtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2ODUKICAgIC8vIGlmICh0aGlzLmlzVXBkYXRlR3VpbGRBY3Rpb24odHlwZSkpIHsKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBpc1VwZGF0ZUd1aWxkQWN0aW9uCiAgICBieiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gdXBkYXRlR3VpbGRQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgMTYgLy8gInVwZGF0ZV9ndWlsZF9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY4NgogICAgLy8gdGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gcmV0dXJuCiAgICBmcmFtZV9kaWcgLTIKICAgIHJldHN1YgoKc2V0U2V0dGluZ3NGb3JBY3Rpb25fYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uVXBncmFkZUFwcDoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMTEgLy8gMHgwYQogICAgPT0KICAgIGJueiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9ibG9ja0AxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uVXBkYXRlV2FsbGV0OgogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA0MCAvLyAweDVhCiAgICA9PQogICAgYm56IHNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2OTIKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25DaGFuZ2VBZG1pbjoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMjggLy8gMHg1YgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY5Mi02OTQKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25DaGFuZ2VBZG1pbjoKICAgIC8vICAgdGhpcy51cGdyYWRlQXBwUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKHNldHRpbmdzKQogICAgLy8gICBicmVhawogICAgYnogc2V0U2V0dGluZ3NGb3JBY3Rpb25fYWZ0ZXJfaWZfZWxzZUAxMwoKc2V0U2V0dGluZ3NGb3JBY3Rpb25fYmxvY2tAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODgKICAgIC8vIHVwZ3JhZGVBcHBQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVVwZ3JhZGVBcHBQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0MiAvLyAidXBncmFkZV9hcHBfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2OTMKICAgIC8vIHRoaXMudXBncmFkZUFwcFByb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX2dsb2JhbF9wdXQKCnNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDQ4OgogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCnNldFNldHRpbmdzRm9yQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2OTUKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25BZGRQbHVnaW46CiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgID09CiAgICBibnogc2V0U2V0dGluZ3NGb3JBY3Rpb25fYmxvY2tAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY5NgogICAgLy8gY2FzZSBHdWlsZEFjdGlvbkFkZE5hbWVkUGx1Z2luOgogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAxOCAvLyAweDE1CiAgICA9PQogICAgYm56IHNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2OTcKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25TZXRQbHVnaW5TZXR0aW5nczoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMTkgLy8gMHgxNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY5Ny02OTkKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25TZXRQbHVnaW5TZXR0aW5nczoKICAgIC8vICAgdGhpcy5hZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICAvLyAgIGJyZWFrCiAgICBieiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDIyCgpzZXRTZXR0aW5nc0ZvckFjdGlvbl9ibG9ja0AyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gYWRkUGx1Z2luUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlBZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyAyMyAvLyAiYWRkX3BsdWdpbl9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjY5OAogICAgLy8gdGhpcy5hZGRQbHVnaW5Qcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo2OTkKICAgIC8vIGJyZWFrCiAgICBiIHNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDQ4CgpzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzAwCiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uUmVtb3ZlRXhlY3V0aW9uOgogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAyNiAvLyAweDFmCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzAwLTcwMgogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlbW92ZUV4ZWN1dGlvbjoKICAgIC8vICAgdGhpcy5yZW1vdmVFeGVjdXRpb25Qcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICAvLyAgIGJyZWFrCiAgICBieiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxOTIKICAgIC8vIHJlbW92ZUV4ZWN1dGlvblByb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVtb3ZlRXhlY3V0aW9uUHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgNDMgLy8gInJlbW92ZV9leGVjdXRpb25fcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MDEKICAgIC8vIHRoaXMucmVtb3ZlRXhlY3V0aW9uUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKHNldHRpbmdzKQogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzAyCiAgICAvLyBicmVhawogICAgYiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9ibG9ja0A0OAoKc2V0U2V0dGluZ3NGb3JBY3Rpb25fYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcwMwogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlbW92ZVBsdWdpbjoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgOSAvLyAweDI4CiAgICA9PQogICAgYm56IHNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbjoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMjcgLy8gMHgyOQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcwNC03MDYKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVOYW1lZFBsdWdpbjoKICAgIC8vICAgdGhpcy5yZW1vdmVQbHVnaW5Qcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICAvLyAgIGJyZWFrCiAgICBieiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDMxCgpzZXRTZXR0aW5nc0ZvckFjdGlvbl9ibG9ja0AzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gcmVtb3ZlUGx1Z2luUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlSZW1vdmVQbHVnaW5Qcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0NCAvLyAicmVtb3ZlX3BsdWdpbl9wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcwNQogICAgLy8gdGhpcy5yZW1vdmVQbHVnaW5Qcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGJyZWFrCiAgICBiIHNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDQ4CgpzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBjYXNlIEd1aWxkQWN0aW9uQWRkQWxsb3dhbmNlczoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMTQgLy8gMHgzMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcwNy03MDkKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25BZGRBbGxvd2FuY2VzOgogICAgLy8gICB0aGlzLmFkZEFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzLnZhbHVlID0gY2xvbmUoc2V0dGluZ3MpCiAgICAvLyAgIGJyZWFrCiAgICBieiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9hZnRlcl9pZl9lbHNlQDM0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIGFkZEFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUFkZEFsbG93YW5jZXNQcm9wb3NhbFNldHRpbmdzIH0pCiAgICBieXRlYyA0NSAvLyAiYWRkX2FsbG93YW5jZXNfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIHRoaXMuYWRkQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcwOQogICAgLy8gYnJlYWsKICAgIGIgc2V0U2V0dGluZ3NGb3JBY3Rpb25fYmxvY2tANDgKCnNldFNldHRpbmdzRm9yQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MTAKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZW1vdmVBbGxvd2FuY2VzOgogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAzNCAvLyAweDNjCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzEwLTcxMgogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlbW92ZUFsbG93YW5jZXM6CiAgICAvLyAgIHRoaXMucmVtb3ZlQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIC8vICAgYnJlYWsKICAgIGJ6IHNldFNldHRpbmdzRm9yQWN0aW9uX2FmdGVyX2lmX2Vsc2VAMzcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gcmVtb3ZlQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MgPSBHbG9iYWxTdGF0ZTxHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UmVtb3ZlQWxsb3dhbmNlc1Byb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQ2IC8vICJyZW1vdmVfYWxsb3dhbmNlc19wcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8gdGhpcy5yZW1vdmVBbGxvd2FuY2VzUHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKHNldHRpbmdzKQogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzEyCiAgICAvLyBicmVhawogICAgYiBzZXRTZXR0aW5nc0ZvckFjdGlvbl9ibG9ja0A0OAoKc2V0U2V0dGluZ3NGb3JBY3Rpb25fYWZ0ZXJfaWZfZWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcxMwogICAgLy8gY2FzZSBHdWlsZEFjdGlvbk5ld0VzY3JvdzoKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMzUgLy8gMHg0NgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcxMy03MTUKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25OZXdFc2Nyb3c6CiAgICAvLyAgIHRoaXMubmV3RXNjcm93UHJvcG9zYWxTZXR0aW5ncy52YWx1ZSA9IGNsb25lKHNldHRpbmdzKQogICAgLy8gICBicmVhawogICAgYnogc2V0U2V0dGluZ3NGb3JBY3Rpb25fYWZ0ZXJfaWZfZWxzZUA0MAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyBuZXdFc2Nyb3dQcm9wb3NhbFNldHRpbmdzID0gR2xvYmFsU3RhdGU8R3VpbGRQcm9wb3NhbFNldHRpbmdzPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleU5ld0VzY3Jvd1Byb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDQ3IC8vICJuZXdfZXNjcm93X3BzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzE0CiAgICAvLyB0aGlzLm5ld0VzY3Jvd1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcxNQogICAgLy8gYnJlYWsKICAgIGIgc2V0U2V0dGluZ3NGb3JBY3Rpb25fYmxvY2tANDgKCnNldFNldHRpbmdzRm9yQWN0aW9uX2FmdGVyX2lmX2Vsc2VANDA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MTYKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25Ub2dnbGVFc2Nyb3dMb2NrOgogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAzNiAvLyAweDQ3CiAgICA9PQogICAgYm56IHNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDQ1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MTcKICAgIC8vIGNhc2UgR3VpbGRBY3Rpb25SZWNsYWltOgogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAzNyAvLyAweDQ4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzE3LTcxOQogICAgLy8gY2FzZSBHdWlsZEFjdGlvblJlY2xhaW06CiAgICAvLyAgIHRoaXMudG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIC8vICAgYnJlYWsKICAgIGJ6IHNldFNldHRpbmdzRm9yQWN0aW9uX2FmdGVyX2lmX2Vsc2VANDYKCnNldFNldHRpbmdzRm9yQWN0aW9uX2Jsb2NrQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyB0b2dnbGVFc2Nyb3dMb2NrUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlUb2dnbGVFc2Nyb3dMb2NrUHJvcG9zYWxTZXR0aW5ncyB9KQogICAgYnl0ZWMgNDggLy8gInRvZ2dsZV9lc2Nyb3dfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MTgKICAgIC8vIHRoaXMudG9nZ2xlRXNjcm93TG9ja1Byb3Bvc2FsU2V0dGluZ3MudmFsdWUgPSBjbG9uZShzZXR0aW5ncykKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcxOQogICAgLy8gYnJlYWsKICAgIGIgc2V0U2V0dGluZ3NGb3JBY3Rpb25fYmxvY2tANDgKCnNldFNldHRpbmdzRm9yQWN0aW9uX2FmdGVyX2lmX2Vsc2VANDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MjEKICAgIC8vIGxvZ2dlZEVycihlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyR2FjbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHYWNuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmFkZFBsdWdpbihkYXRhOiBieXRlcykgLT4gYnl0ZXM6CmFkZFBsdWdpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcyNQogICAgLy8gcHJpdmF0ZSBhZGRQbHVnaW4oZGF0YTogR3VpbGRQcm9wb3NhbEFkZE5hbWVkUGx1Z2luKTogdm9pZCB7CiAgICBwcm90byAxIDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wbHVnaW5TZXRMb2NrZWQudmFsdWUsIGVyckd1aWxkUGx1Z2luU2V0TG9ja2VkKQogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxODEKICAgIC8vIHBsdWdpblNldExvY2tlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5UGx1Z2luU2V0TG9ja2VkIH0pCiAgICBieXRlYyAxNSAvLyAicGx1Z2luc19sb2NrZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wbHVnaW5TZXRMb2NrZWQudmFsdWUsIGVyckd1aWxkUGx1Z2luU2V0TG9ja2VkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGFkZFBsdWdpbl9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNTAgLy8gIkVSUjplcnJHcGxrIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdwbGsKCmFkZFBsdWdpbl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjcyOAogICAgLy8gY29uc3QgZXNjcm93S2V5ID0gcGx1Z2luLmRlZmF1bHRUb0VzY3JvdyA/ICcnIDogcGx1Z2luLmVzY3JvdwogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDExIC8vIDUwNwogICAgZ2V0Yml0CiAgICBkdXAKICAgIGJ6IGFkZFBsdWdpbl90ZXJuYXJ5X2ZhbHNlQDQKICAgIHB1c2hieXRlcyAiIgogICAgZnJhbWVfYnVyeSAyCgphZGRQbHVnaW5fdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyBpZiAocGx1Z2luLnVzZUV4ZWN1dGlvbktleSAmJiBwbHVnaW4uY2FsbGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgaW50YyA5IC8vIDUwNQogICAgZ2V0Yml0CiAgICBkdXAKICAgIGJ6IGFkZFBsdWdpbl9hZnRlcl9pZl9lbHNlQDgKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAxMCAzMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogYWRkUGx1Z2luX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzMxCiAgICAvLyBmZWU6IHBsdWdpbi5mZWUsCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNjQgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzMyCiAgICAvLyBwb3dlcjogcGx1Z2luLnBvd2VyLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDcyIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjczMwogICAgLy8gZHVyYXRpb246IHBsdWdpbi5kdXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4MCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MzQKICAgIC8vIHBhcnRpY2lwYXRpb246IHBsdWdpbi5wYXJ0aWNpcGF0aW9uLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDg4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjczNQogICAgLy8gYXBwcm92YWw6IHBsdWdpbi5hcHByb3ZhbCwKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA5NiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MzYKICAgIC8vIG1pbmltdW1BcHByb3ZhbHM6IHBsdWdpbi5taW5pbXVtQXBwcm92YWxzLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDEwNCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3MzAtNzM3CiAgICAvLyB0aGlzLnBsdWdpbnMoeyBwbHVnaW46IHBsdWdpbi5wbHVnaW4sIGVzY3JvdzogZXNjcm93S2V5IH0pLnZhbHVlID0gewogICAgLy8gICBmZWU6IHBsdWdpbi5mZWUsCiAgICAvLyAgIHBvd2VyOiBwbHVnaW4ucG93ZXIsCiAgICAvLyAgIGR1cmF0aW9uOiBwbHVnaW4uZHVyYXRpb24sCiAgICAvLyAgIHBhcnRpY2lwYXRpb246IHBsdWdpbi5wYXJ0aWNpcGF0aW9uLAogICAgLy8gICBhcHByb3ZhbDogcGx1Z2luLmFwcHJvdmFsLAogICAgLy8gICBtaW5pbXVtQXBwcm92YWxzOiBwbHVnaW4ubWluaW11bUFwcHJvdmFscywKICAgIC8vIH0KICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzMwCiAgICAvLyB0aGlzLnBsdWdpbnMoeyBwbHVnaW46IHBsdWdpbi5wbHVnaW4sIGVzY3JvdzogZXNjcm93S2V5IH0pLnZhbHVlID0gewogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDIgOAogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBieXRlYyAyMCAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDkKICAgIC8vIHBsdWdpbnMgPSBCb3hNYXA8R3VpbGRQbHVnaW5LZXksIEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UGx1Z2lucyB9KQogICAgYnl0ZWMgMjEgLy8gImciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjczMC03MzcKICAgIC8vIHRoaXMucGx1Z2lucyh7IHBsdWdpbjogcGx1Z2luLnBsdWdpbiwgZXNjcm93OiBlc2Nyb3dLZXkgfSkudmFsdWUgPSB7CiAgICAvLyAgIGZlZTogcGx1Z2luLmZlZSwKICAgIC8vICAgcG93ZXI6IHBsdWdpbi5wb3dlciwKICAgIC8vICAgZHVyYXRpb246IHBsdWdpbi5kdXJhdGlvbiwKICAgIC8vICAgcGFydGljaXBhdGlvbjogcGx1Z2luLnBhcnRpY2lwYXRpb24sCiAgICAvLyAgIGFwcHJvdmFsOiBwbHVnaW4uYXBwcm92YWwsCiAgICAvLyAgIG1pbmltdW1BcHByb3ZhbHM6IHBsdWdpbi5taW5pbXVtQXBwcm92YWxzLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAoKYWRkUGx1Z2luX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gaWYgKHBsdWdpbi5uYW1lICE9PSAnJykgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA0MgogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfZGlnIC0xCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBhZGRQbHVnaW5fZWxzZV9ib2R5QDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NDEtNzU5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfYWRkTmFtZWRQbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcGx1Z2luLm5hbWUsCiAgICAvLyAgICAgcGx1Z2luLnBsdWdpbiwKICAgIC8vICAgICBwbHVnaW4uY2FsbGVyLAogICAgLy8gICAgIHBsdWdpbi5lc2Nyb3csCiAgICAvLyAgICAgZmFsc2UsCiAgICAvLyAgICAgcGx1Z2luLmRlbGVnYXRpb25UeXBlLAogICAgLy8gICAgIHBsdWdpbi5sYXN0VmFsaWQsCiAgICAvLyAgICAgcGx1Z2luLmNvb2xkb3duLAogICAgLy8gICAgIHBsdWdpbi5tZXRob2RzLAogICAgLy8gICAgIHBsdWdpbi51c2VSb3VuZHMsCiAgICAvLyAgICAgcGx1Z2luLnVzZUV4ZWN1dGlvbktleSwKICAgIC8vICAgICBwbHVnaW4uY292ZXJGZWVzLAogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIHBsdWdpbi5kZWZhdWx0VG9Fc2Nyb3csCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyBwbHVnaW4ucGx1Z2luLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDIgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQ2CiAgICAvLyBwbHVnaW4uY2FsbGVyLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDEwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NDcKICAgIC8vIHBsdWdpbi5lc2Nyb3csCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgNjEKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIGRpZyA1CiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQ5CiAgICAvLyBwbHVnaW4uZGVsZWdhdGlvblR5cGUsCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzUwCiAgICAvLyBwbHVnaW4ubGFzdFZhbGlkLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDQ1IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc1MQogICAgLy8gcGx1Z2luLmNvb2xkb3duLAogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDUzIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc1MgogICAgLy8gcGx1Z2luLm1ldGhvZHMsCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTEyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDYKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzUzCiAgICAvLyBwbHVnaW4udXNlUm91bmRzLAogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDggLy8gNTA0CiAgICBnZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NTQKICAgIC8vIHBsdWdpbi51c2VFeGVjdXRpb25LZXksCiAgICBieXRlY18xIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDEyCiAgICBzZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gcGx1Z2luLmNvdmVyRmVlcywKICAgIGZyYW1lX2RpZyAtMQogICAgaW50YyAxMCAvLyA1MDYKICAgIGdldGJpdAogICAgYnl0ZWNfMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc1NwogICAgLy8gcGx1Z2luLmRlZmF1bHRUb0VzY3JvdywKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMTQKICAgIHNldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc0MgogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQxLTc1OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2FkZE5hbWVkUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHBsdWdpbi5uYW1lLAogICAgLy8gICAgIHBsdWdpbi5wbHVnaW4sCiAgICAvLyAgICAgcGx1Z2luLmNhbGxlciwKICAgIC8vICAgICBwbHVnaW4uZXNjcm93LAogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIHBsdWdpbi5kZWxlZ2F0aW9uVHlwZSwKICAgIC8vICAgICBwbHVnaW4ubGFzdFZhbGlkLAogICAgLy8gICAgIHBsdWdpbi5jb29sZG93biwKICAgIC8vICAgICBwbHVnaW4ubWV0aG9kcywKICAgIC8vICAgICBwbHVnaW4udXNlUm91bmRzLAogICAgLy8gICAgIHBsdWdpbi51c2VFeGVjdXRpb25LZXksCiAgICAvLyAgICAgcGx1Z2luLmNvdmVyRmVlcywKICAgIC8vICAgICBmYWxzZSwKICAgIC8vICAgICBwbHVnaW4uZGVmYXVsdFRvRXNjcm93LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDU3MmZkMWVhIC8vIG1ldGhvZCAiYXJjNThfYWRkTmFtZWRQbHVnaW4oc3RyaW5nLHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxib29sLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsYm9vbCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQ4CiAgICAvLyBmYWxzZSwKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBieXRlY18xIC8vIDB4MDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzQxLTc1OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2FkZE5hbWVkUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHBsdWdpbi5uYW1lLAogICAgLy8gICAgIHBsdWdpbi5wbHVnaW4sCiAgICAvLyAgICAgcGx1Z2luLmNhbGxlciwKICAgIC8vICAgICBwbHVnaW4uZXNjcm93LAogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIHBsdWdpbi5kZWxlZ2F0aW9uVHlwZSwKICAgIC8vICAgICBwbHVnaW4ubGFzdFZhbGlkLAogICAgLy8gICAgIHBsdWdpbi5jb29sZG93biwKICAgIC8vICAgICBwbHVnaW4ubWV0aG9kcywKICAgIC8vICAgICBwbHVnaW4udXNlUm91bmRzLAogICAgLy8gICAgIHBsdWdpbi51c2VFeGVjdXRpb25LZXksCiAgICAvLyAgICAgcGx1Z2luLmNvdmVyRmVlcywKICAgIC8vICAgICBmYWxzZSwKICAgIC8vICAgICBwbHVnaW4uZGVmYXVsdFRvRXNjcm93LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgphZGRQbHVnaW5fYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gaWYgKHBsdWdpbi5lc2Nyb3cgIT09ICcnICYmIHBsdWdpbi5hbGxvd2FuY2VzLmxlbmd0aCA+IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA2MQogICAgZXh0cmFjdF91aW50MTYKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBhZGRQbHVnaW5fYWZ0ZXJfaWZfZWxzZUAxNwogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDExMgogICAgZXh0cmFjdF91aW50MTYKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgYnogYWRkUGx1Z2luX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc4Mi03ODUKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9hZGRBbGxvd2FuY2VzPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW3BsdWdpbi5lc2Nyb3csIHBsdWdpbi5hbGxvd2FuY2VzXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3ODMKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzgzCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3ODItNzg1CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfYWRkQWxsb3dhbmNlcz4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtwbHVnaW4uZXNjcm93LCBwbHVnaW4uYWxsb3dhbmNlc10sCiAgICAvLyB9KQogICAgYnl0ZWMgNTkgLy8gbWV0aG9kICJhcmM1OF9hZGRBbGxvd2FuY2VzKHN0cmluZywodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmFkZFBsdWdpbl9hZnRlcl9pZl9lbHNlQDE3OgogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKYWRkUGx1Z2luX2Vsc2VfYm9keUAxMToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzYxLTc3OAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2FkZFBsdWdpbj4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBwbHVnaW4ucGx1Z2luLAogICAgLy8gICAgIHBsdWdpbi5jYWxsZXIsCiAgICAvLyAgICAgcGx1Z2luLmVzY3JvdywKICAgIC8vICAgICBmYWxzZSwKICAgIC8vICAgICBwbHVnaW4uZGVsZWdhdGlvblR5cGUsCiAgICAvLyAgICAgcGx1Z2luLmxhc3RWYWxpZCwKICAgIC8vICAgICBwbHVnaW4uY29vbGRvd24sCiAgICAvLyAgICAgcGx1Z2luLm1ldGhvZHMsCiAgICAvLyAgICAgcGx1Z2luLnVzZVJvdW5kcywKICAgIC8vICAgICBwbHVnaW4udXNlRXhlY3V0aW9uS2V5LAogICAgLy8gICAgIHBsdWdpbi5jb3ZlckZlZXMsCiAgICAvLyAgICAgZmFsc2UsCiAgICAvLyAgICAgcGx1Z2luLmRlZmF1bHRUb0VzY3JvdywKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjQKICAgIC8vIHBsdWdpbi5wbHVnaW4sCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIHBsdWdpbi5jYWxsZXIsCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMTAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc2NgogICAgLy8gcGx1Z2luLmVzY3JvdywKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA2MQogICAgZXh0cmFjdF91aW50MTYKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDQKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjgKICAgIC8vIHBsdWdpbi5kZWxlZ2F0aW9uVHlwZSwKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA0NCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjkKICAgIC8vIHBsdWdpbi5sYXN0VmFsaWQsCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNDUgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyBwbHVnaW4uY29vbGRvd24sCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNTMgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzcxCiAgICAvLyBwbHVnaW4ubWV0aG9kcywKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxMTIKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgNgogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NzIKICAgIC8vIHBsdWdpbi51c2VSb3VuZHMsCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgOCAvLyA1MDQKICAgIGdldGJpdAogICAgYnl0ZWNfMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc3MwogICAgLy8gcGx1Z2luLnVzZUV4ZWN1dGlvbktleSwKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMTEKICAgIHNldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Nzc0CiAgICAvLyBwbHVnaW4uY292ZXJGZWVzLAogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDEwIC8vIDUwNgogICAgZ2V0Yml0CiAgICBieXRlY18xIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Nzc2CiAgICAvLyBwbHVnaW4uZGVmYXVsdFRvRXNjcm93LAogICAgYnl0ZWNfMSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAxMwogICAgc2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjIKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjEtNzc4CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfYWRkUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHBsdWdpbi5wbHVnaW4sCiAgICAvLyAgICAgcGx1Z2luLmNhbGxlciwKICAgIC8vICAgICBwbHVnaW4uZXNjcm93LAogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIHBsdWdpbi5kZWxlZ2F0aW9uVHlwZSwKICAgIC8vICAgICBwbHVnaW4ubGFzdFZhbGlkLAogICAgLy8gICAgIHBsdWdpbi5jb29sZG93biwKICAgIC8vICAgICBwbHVnaW4ubWV0aG9kcywKICAgIC8vICAgICBwbHVnaW4udXNlUm91bmRzLAogICAgLy8gICAgIHBsdWdpbi51c2VFeGVjdXRpb25LZXksCiAgICAvLyAgICAgcGx1Z2luLmNvdmVyRmVlcywKICAgIC8vICAgICBmYWxzZSwKICAgIC8vICAgICBwbHVnaW4uZGVmYXVsdFRvRXNjcm93LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDU2NzI0NjJlIC8vIG1ldGhvZCAiYXJjNThfYWRkUGx1Z2luKHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxib29sLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsYm9vbCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjcKICAgIC8vIGZhbHNlLAogICAgYnl0ZWNfMSAvLyAweDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3NjEtNzc4CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfYWRkUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHBsdWdpbi5wbHVnaW4sCiAgICAvLyAgICAgcGx1Z2luLmNhbGxlciwKICAgIC8vICAgICBwbHVnaW4uZXNjcm93LAogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIHBsdWdpbi5kZWxlZ2F0aW9uVHlwZSwKICAgIC8vICAgICBwbHVnaW4ubGFzdFZhbGlkLAogICAgLy8gICAgIHBsdWdpbi5jb29sZG93biwKICAgIC8vICAgICBwbHVnaW4ubWV0aG9kcywKICAgIC8vICAgICBwbHVnaW4udXNlUm91bmRzLAogICAgLy8gICAgIHBsdWdpbi51c2VFeGVjdXRpb25LZXksCiAgICAvLyAgICAgcGx1Z2luLmNvdmVyRmVlcywKICAgIC8vICAgICBmYWxzZSwKICAgIC8vICAgICBwbHVnaW4uZGVmYXVsdFRvRXNjcm93LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGFkZFBsdWdpbl9hZnRlcl9pZl9lbHNlQDEzCgphZGRQbHVnaW5fdGVybmFyeV9mYWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzI4CiAgICAvLyBjb25zdCBlc2Nyb3dLZXkgPSBwbHVnaW4uZGVmYXVsdFRvRXNjcm93ID8gJycgOiBwbHVnaW4uZXNjcm93CiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgNDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgNjEKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBmcmFtZV9idXJ5IDIKICAgIGIgYWRkUGx1Z2luX3Rlcm5hcnlfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5yZW1vdmVQbHVnaW4oZGF0YTogYnl0ZXMpIC0+IGJ5dGVzOgpyZW1vdmVQbHVnaW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIHByaXZhdGUgcmVtb3ZlUGx1Z2luKGRhdGE6IEd1aWxkUHJvcG9zYWxSZW1vdmVOYW1lZFBsdWdpbik6IHZvaWQgewogICAgcHJvdG8gMSAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnBsdWdpblNldExvY2tlZC52YWx1ZSwgZXJyR3VpbGRQbHVnaW5TZXRMb2NrZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTgxCiAgICAvLyBwbHVnaW5TZXRMb2NrZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVBsdWdpblNldExvY2tlZCB9KQogICAgYnl0ZWMgMTUgLy8gInBsdWdpbnNfbG9ja2VkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6NzkwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucGx1Z2luU2V0TG9ja2VkLnZhbHVlLCBlcnJHdWlsZFBsdWdpblNldExvY2tlZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZW1vdmVQbHVnaW5fYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDUwIC8vICJFUlI6ZXJyR3BsayIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHcGxrCgpyZW1vdmVQbHVnaW5fYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3OTEKICAgIC8vIGlmIChkYXRhLm5hbWUgIT09ICcnKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgZXh0cmFjdCAyIDAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGR1cAogICAgYnogcmVtb3ZlUGx1Z2luX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc5Mi03OTUKICAgIC8vIGNvbnN0IGtleSA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXROYW1lZFBsdWdpbktleT4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtkYXRhLm5hbWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc5MwogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gd2FsbGV0ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5V2FsbGV0IH0pCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3OTMKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc5Mi03OTUKICAgIC8vIGNvbnN0IGtleSA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXROYW1lZFBsdWdpbktleT4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtkYXRhLm5hbWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDc3MjdmODUxIC8vIG1ldGhvZCAiYXJjNThfZ2V0TmFtZWRQbHVnaW5LZXkoc3RyaW5nKSh1aW50NjQsYWRkcmVzcyxzdHJpbmcpIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA0MgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAyIG9mICh1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0NAogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OlBsdWdpbktleQogICAgcHVzaGludCA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3OTYKICAgIC8vIGxvZ2dlZEFzc2VydChrZXkucGx1Z2luID09PSBkYXRhLnBsdWdpbiAmJiBrZXkuY2FsbGVyID09PSBkYXRhLmNhbGxlciAmJiBrZXkuZXNjcm93ID09PSBkYXRhLmVzY3JvdywgZXJyR3VpbGRJbnZhbGlkQWN0aW9uKQogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgYnogcmVtb3ZlUGx1Z2luX2Jvb2xfZmFsc2VAOAogICAgZnJhbWVfZGlnIDAKICAgIGV4dHJhY3QgMTIgMzIKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAxMCAzMgogICAgPT0KICAgIGJ6IHJlbW92ZVBsdWdpbl9ib29sX2ZhbHNlQDgKICAgIGZyYW1lX2RpZyAyCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDUKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgID09CiAgICBieiByZW1vdmVQbHVnaW5fYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKcmVtb3ZlUGx1Z2luX2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjc5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGtleS5wbHVnaW4gPT09IGRhdGEucGx1Z2luICYmIGtleS5jYWxsZXIgPT09IGRhdGEuY2FsbGVyICYmIGtleS5lc2Nyb3cgPT09IGRhdGEuZXNjcm93LCBlcnJHdWlsZEludmFsaWRBY3Rpb24pCiAgICBibnogcmVtb3ZlUGx1Z2luX2FmdGVyX2lmX2Vsc2VAMTIKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJHYWNuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdhY24KCnJlbW92ZVBsdWdpbl9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Nzk4CiAgICAvLyBpZiAoZGF0YS5jYWxsZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiB0aGlzLnBsdWdpbnMoeyBwbHVnaW46IGRhdGEucGx1Z2luLCBlc2Nyb3c6IGRhdGEuZXNjcm93IH0pLmV4aXN0cykgewogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDEwIDMyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IHJlbW92ZVBsdWdpbl9hZnRlcl9pZl9lbHNlQDE1CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMiA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgNgogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBsZW4KICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBieXRlYyAyMCAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDkKICAgIC8vIHBsdWdpbnMgPSBCb3hNYXA8R3VpbGRQbHVnaW5LZXksIEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4UGx1Z2lucyB9KQogICAgYnl0ZWMgMjEgLy8gImciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIGlmIChkYXRhLmNhbGxlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmIHRoaXMucGx1Z2lucyh7IHBsdWdpbjogZGF0YS5wbHVnaW4sIGVzY3JvdzogZGF0YS5lc2Nyb3cgfSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHJlbW92ZVBsdWdpbl9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo3OTkKICAgIC8vIHRoaXMucGx1Z2lucyh7IHBsdWdpbjogZGF0YS5wbHVnaW4sIGVzY3JvdzogZGF0YS5lc2Nyb3cgfSkuZGVsZXRlKCkKICAgIGZyYW1lX2RpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gcmV0dXJuIEd1aWxkUGx1Z2luTUJSICsgQm94Q29zdFBlckJ5dGUgKiBCeXRlcyhlc2Nyb3cpLmxlbmd0aAogICAgaW50YyA0IC8vIDQwMAogICAgZnJhbWVfZGlnIDMKICAgICoKICAgIGludGMgMTIgLy8gMjY5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgwMQogICAgLy8gdGhpcy5mb3J3YXJkRmVlKHRoaXMucGx1Z2luTWJyKGRhdGEuZXNjcm93KSkKICAgIGNhbGxzdWIgZm9yd2FyZEZlZQoKcmVtb3ZlUGx1Z2luX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MDMKICAgIC8vIGlmIChkYXRhLm5hbWUgIT09ICcnKSB7CiAgICBieiByZW1vdmVQbHVnaW5fZWxzZV9ib2R5QDE4CiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODA0LTgwNwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3JlbW92ZU5hbWVkUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2RhdGEubmFtZV0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODA1CiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgwNQogICAgLy8gYXBwSWQ6IHRoaXMud2FsbGV0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODA0LTgwNwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3JlbW92ZU5hbWVkUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2RhdGEubmFtZV0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4ZTM1MGI5ZDQgLy8gbWV0aG9kICJhcmM1OF9yZW1vdmVOYW1lZFBsdWdpbihzdHJpbmcpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlbW92ZVBsdWdpbl9hZnRlcl9pZl9lbHNlQDIwOgogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcmVtb3ZlUGx1Z2luX2Vsc2VfYm9keUAxODoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODA5LTgxMgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3JlbW92ZVBsdWdpbj4oewogICAgLy8gICBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtkYXRhLnBsdWdpbiwgZGF0YS5jYWxsZXIsIGRhdGEuZXNjcm93XSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MTEKICAgIC8vIGFyZ3M6IFtkYXRhLnBsdWdpbiwgZGF0YS5jYWxsZXIsIGRhdGEuZXNjcm93XSwKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAyIDgKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MTAKICAgIC8vIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHdhbGxldCA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleVdhbGxldCB9KQogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyBhcHBJZDogdGhpcy53YWxsZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MDktODEyCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVtb3ZlUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLndhbGxldC52YWx1ZSwKICAgIC8vICAgYXJnczogW2RhdGEucGx1Z2luLCBkYXRhLmNhbGxlciwgZGF0YS5lc2Nyb3ddLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGVlZjQ0OGZkIC8vIG1ldGhvZCAiYXJjNThfcmVtb3ZlUGx1Z2luKHVpbnQ2NCxhZGRyZXNzLHN0cmluZyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIHJlbW92ZVBsdWdpbl9hZnRlcl9pZl9lbHNlQDIwCgpyZW1vdmVQbHVnaW5fYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVtb3ZlUGx1Z2luX2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5jcmVhdGVXYWxsZXQobmlja25hbWU6IGJ5dGVzLCBzYWx0OiBieXRlcykgLT4gdWludDY0OgpjcmVhdGVXYWxsZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MjAKICAgIC8vIHByaXZhdGUgY3JlYXRlV2FsbGV0KG5pY2tuYW1lOiBzdHJpbmcsIHNhbHQ6IGJ5dGVzPDMyPik6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLndhbGxldC5oYXNWYWx1ZSwgZXJyR3VpbGRXYWxsZXRBbHJlYWR5U2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gd2FsbGV0ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5V2FsbGV0IH0pCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy53YWxsZXQuaGFzVmFsdWUsIGVyckd1aWxkV2FsbGV0QWxyZWFkeVNldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZVdhbGxldF9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyR3dzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHd3N0CgpjcmVhdGVXYWxsZXRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MjIKICAgIC8vIGNvbnN0IHdhbGxldEZhY3RvcnkgPSB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHdhbGxldEZhY3RvcnkgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXRGYWN0b3J5IH0pCiAgICBieXRlYyAyNCAvLyAid2FsbGV0X2ZhY3RvcnkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MjIKICAgIC8vIGNvbnN0IHdhbGxldEZhY3RvcnkgPSB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MjUKICAgIC8vIGNvbnN0IGNvc3QgPSB0aGlzLnNldHVwQ29zdCgpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXR1cENvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgyNi04NDIKICAgIC8vIGNvbnN0IHdhbGxldElEID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS5uZXdBY2NvdW50Pih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHdhbGxldEZhY3RvcnkuYWRkcmVzcywgYW1vdW50OiBjb3N0IH0pLAogICAgLy8gICAgIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBuaWNrbmFtZSwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgc2FsdCwKICAgIC8vICAgICAnJywKICAgIC8vICAgICAvLyBObyBhdXRvbWF0aWMgdXBkYXRlczogb25seSB0aGUgR3VpbGQncyBVcGRhdGVXYWxsZXQgYWN0aW9uIG1heSBwdXNoIHdhbGxldCBjb2RlLgogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIDAsCiAgICAvLyAgICAgW10sCiAgICAvLyAgICAgW10sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODI5CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogd2FsbGV0RmFjdG9yeS5hZGRyZXNzLCBhbW91bnQ6IGNvc3QgfSksCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgyNi04NDIKICAgIC8vIGNvbnN0IHdhbGxldElEID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS5uZXdBY2NvdW50Pih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHdhbGxldEZhY3RvcnkuYWRkcmVzcywgYW1vdW50OiBjb3N0IH0pLAogICAgLy8gICAgIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBuaWNrbmFtZSwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgc2FsdCwKICAgIC8vICAgICAnJywKICAgIC8vICAgICAvLyBObyBhdXRvbWF0aWMgdXBkYXRlczogb25seSB0aGUgR3VpbGQncyBVcGRhdGVXYWxsZXQgYWN0aW9uIG1heSBwdXNoIHdhbGxldCBjb2RlLgogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIDAsCiAgICAvLyAgICAgW10sCiAgICAvLyAgICAgW10sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MzAKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODMxCiAgICAvLyBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MzIKICAgIC8vIG5pY2tuYW1lLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gJycsCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgyNi04NDIKICAgIC8vIGNvbnN0IHdhbGxldElEID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS5uZXdBY2NvdW50Pih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHdhbGxldEZhY3RvcnkuYWRkcmVzcywgYW1vdW50OiBjb3N0IH0pLAogICAgLy8gICAgIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBuaWNrbmFtZSwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgc2FsdCwKICAgIC8vICAgICAnJywKICAgIC8vICAgICAvLyBObyBhdXRvbWF0aWMgdXBkYXRlczogb25seSB0aGUgR3VpbGQncyBVcGRhdGVXYWxsZXQgYWN0aW9uIG1heSBwdXNoIHdhbGxldCBjb2RlLgogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIDAsCiAgICAvLyAgICAgW10sCiAgICAvLyAgICAgW10sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZTBkMTg5YjggLy8gbWV0aG9kICJuZXdBY2NvdW50KHBheSxhZGRyZXNzLGFkZHJlc3Msc3RyaW5nLGFkZHJlc3MsYnl0ZVszMl0sc3RyaW5nLGJvb2wsdWludDY0LHVpbnQ2NFtdLCh1aW50NjQsYWRkcmVzcyxzdHJpbmcsYm9vbCx1aW50OCx1aW50NjQsdWludDY0LChieXRlWzRdLHVpbnQ2NClbXSxib29sLGJvb2wsYm9vbCxib29sLGJvb2wpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vICcnLAogICAgYnl0ZWMgMzMgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODM3CiAgICAvLyBmYWxzZSwKICAgIGJ5dGVjXzEgLy8gMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4MzkKICAgIC8vIFtdLAogICAgYnl0ZWMgMzMgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODQwCiAgICAvLyBbXSwKICAgIGJ5dGVjIDMzIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjgyNi04NDIKICAgIC8vIGNvbnN0IHdhbGxldElEID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS5uZXdBY2NvdW50Pih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHdhbGxldEZhY3RvcnkuYWRkcmVzcywgYW1vdW50OiBjb3N0IH0pLAogICAgLy8gICAgIEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgICBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBuaWNrbmFtZSwKICAgIC8vICAgICBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgICAgc2FsdCwKICAgIC8vICAgICAnJywKICAgIC8vICAgICAvLyBObyBhdXRvbWF0aWMgdXBkYXRlczogb25seSB0aGUgR3VpbGQncyBVcGRhdGVXYWxsZXQgYWN0aW9uIG1heSBwdXNoIHdhbGxldCBjb2RlLgogICAgLy8gICAgIGZhbHNlLAogICAgLy8gICAgIDAsCiAgICAvLyAgICAgW10sCiAgICAvLyAgICAgW10sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyB3YWxsZXQgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXQgfSkKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg0NAogICAgLy8gdGhpcy53YWxsZXQudmFsdWUgPSBBcHBsaWNhdGlvbih3YWxsZXRJRCkKICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODQ1CiAgICAvLyByZXR1cm4gd2FsbGV0SUQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5jb25zZW5zdXNDb25maWd1cmF0aW9uTWJyKGNvbmZpZzogYnl0ZXMpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmNvbnNlbnN1c0NvbmZpZ3VyYXRpb25NYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NTEtODUyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIC8vIGNvbnNlbnN1c0NvbmZpZ3VyYXRpb25NYnIoY29uZmlnOiBieXRlcyk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg1My04NTYKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0NyZWF0ZVN0dWIucHJvdG90eXBlLmNvbmZpZ3VyYXRpb25NYnI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbY29uZmlnXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo4NTUKICAgIC8vIGFyZ3M6IFtjb25maWddLAogICAgZnJhbWVfZGlnIC0xCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODU0CiAgICAvLyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyBjb25zZW5zdXMgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlDb25zZW5zdXMgfSkKICAgIGJ5dGVjIDYgLy8gImNvbnNlbnN1cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjg1NAogICAgLy8gYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6ODUzLTg1NgogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUuY29uZmlndXJhdGlvbk1icj4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtjb25maWddLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGFhM2U0MGE4IC8vIG1ldGhvZCAiY29uZmlndXJhdGlvbk1icihieXRlW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQubmV4dFZvdGVDb3N0KHByb3Bvc2FsSUQ6IHVpbnQ2NCwgdm90ZXI6IGJ5dGVzKSAtPiB1aW50NjQ6Cm5leHRWb3RlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjEwOTMKICAgIC8vIHByaXZhdGUgbmV4dFZvdGVDb3N0KHByb3Bvc2FsSUQ6IHVpbnQ2NCwgdm90ZXI6IEFjY291bnQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDk0LTEwOTcKICAgIC8vIGNvbnN0IHZvdGVkID0gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5oYXNWb3RlZD4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtwcm9wb3NhbElELCB2b3Rlcl0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA5NgogICAgLy8gYXJnczogW3Byb3Bvc2FsSUQsIHZvdGVyXSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA5NQogICAgLy8gYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gY29uc2Vuc3VzID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5Q29uc2Vuc3VzIH0pCiAgICBieXRlYyA2IC8vICJjb25zZW5zdXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDk1CiAgICAvLyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxMDk0LTEwOTcKICAgIC8vIGNvbnN0IHZvdGVkID0gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNDcmVhdGVTdHViLnByb3RvdHlwZS5oYXNWb3RlZD4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtwcm9wb3NhbElELCB2b3Rlcl0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZjUwODA4ZWYgLy8gbWV0aG9kICJoYXNWb3RlZCh1aW50NjQsYWRkcmVzcylib29sIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTA5OAogICAgLy8gcmV0dXJuIHZvdGVkID8gMCA6IEd1aWxkVm90ZU1CUgogICAgaW50YyA1IC8vIDIyNTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXR1cENvc3QoKSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXR1cENvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDA0CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS5jb3N0Pih7IGFwcElkOiB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUgfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHdhbGxldEZhY3RvcnkgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlXYWxsZXRGYWN0b3J5IH0pCiAgICBieXRlYyAyNCAvLyAid2FsbGV0X2ZhY3RvcnkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDA0CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnRGYWN0b3J5LnByb3RvdHlwZS5jb3N0Pih7IGFwcElkOiB0aGlzLndhbGxldEZhY3RvcnkudmFsdWUgfSkucmV0dXJuVmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDliNjdmYTZkIC8vIG1ldGhvZCAiY29zdCgpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3QoYWN0aW9uczogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0MDgtMTQwOQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBwcm9wb3NhbENvc3QoYWN0aW9uczogR3VpbGRQcm9wb3NhbEFjdGlvbltdKTogR3VpbGRQcm9wb3NhbENvc3RJbmZvIHsKICAgIHByb3RvIDEgMgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQxMAogICAgLy8gY29uc3QgYmFsbG90TWJyID0gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNCYXNlLnByb3RvdHlwZS5iYWxsb3RNYnI+KHsgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLCBhcmdzOiBbXSB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gY29uc2Vuc3VzID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5Q29uc2Vuc3VzIH0pCiAgICBieXRlYyA2IC8vICJjb25zZW5zdXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDEwCiAgICAvLyBjb25zdCBiYWxsb3RNYnIgPSBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0Jhc2UucHJvdG90eXBlLmJhbGxvdE1icj4oeyBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsIGFyZ3M6IFtdIH0pLnJldHVyblZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyA1OCAvLyBtZXRob2QgImJhbGxvdE1icigpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0MTEKICAgIC8vIGxldCBtYnI6IHVpbnQ2NCA9IHRoaXMucHJvcG9zYWxNYnIoYWN0aW9ucykgKyBiYWxsb3RNYnIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBwcm9wb3NhbE1icgogICAgZnJhbWVfYnVyeSAtMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQxMwogICAgLy8gdG90YWw6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQxMi0xNDIxCiAgICAvLyBjb25zdCBpbmZvOiBHdWlsZFByb3Bvc2FsQ29zdEluZm8gPSB7CiAgICAvLyAgIHRvdGFsOiAwLAogICAgLy8gICBtYnI6IDAsCiAgICAvLyAgIGZlZTogMCwKICAgIC8vICAgcG93ZXI6IDAsCiAgICAvLyAgIGR1cmF0aW9uOiAwLAogICAgLy8gICBwYXJ0aWNpcGF0aW9uOiAwLAogICAgLy8gICBhcHByb3ZhbDogMCwKICAgIC8vICAgbWluaW11bUFwcHJvdmFsczogMCwKICAgIC8vIH0KICAgIGl0b2IKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDIzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3Rfd2hpbGVfdG9wQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDIzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZGlnIDEKICAgID4KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfd2hpbGVANDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0MjQtMTQyNQogICAgLy8gY29uc3QgYWN0aW9uID0gY2xvbmUoYWN0aW9uc1tpXSkKICAgIC8vIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRQcm9wb3NhbFNldHRpbmdzKGFjdGlvbi50eXBlLCBhY3Rpb24uZGF0YSkKICAgIGZyYW1lX2RpZyAtMQogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBleHRyYWN0IDAgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA1CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDI1CiAgICAvLyBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0UHJvcG9zYWxTZXR0aW5ncyhhY3Rpb24udHlwZSwgYWN0aW9uLmRhdGEpCiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDYKICAgIGRpZyAxCiAgICBzd2FwCiAgICBjYWxsc3ViIGdldFByb3Bvc2FsU2V0dGluZ3MKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQyNgogICAgLy8gaW5mby50b3RhbCArPSBzZXR0aW5ncy5mZWUKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZGlnIDEKICAgICsKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgcmVwbGFjZTIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQyNwogICAgLy8gaW5mby5mZWUgKz0gc2V0dGluZ3MuZmVlCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgICsKICAgIGl0b2IKICAgIHJlcGxhY2UyIDE2CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDI5CiAgICAvLyBpZiAoYWN0aW9uLnR5cGUgPT09IEd1aWxkQWN0aW9uVXBncmFkZUFwcCkgewogICAgYnl0ZWMgMTEgLy8gMHgwYQogICAgPT0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfZWxzZV9ib2R5QDcKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDMwCiAgICAvLyBtYnIgKz0gR3VpbGRFeGVjdXRpb25NQlIKICAgIHVuY292ZXIgMwogICAgaW50YyA2IC8vIDIyMTAwCiAgICArCiAgICBjb3ZlciAzCgpzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDUyCiAgICAvLyBpZiAoc2V0dGluZ3MucG93ZXIgPiBpbmZvLnBvd2VyKSB7CiAgICBkaWcgMQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgZnJhbWVfYnVyeSAzCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgPgogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDUzCiAgICAvLyBpbmZvLnBvd2VyID0gc2V0dGluZ3MucG93ZXIKICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIDMKICAgIHJlcGxhY2UyIDI0CiAgICBjb3ZlciAyCgpzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDU1CiAgICAvLyBpZiAoc2V0dGluZ3MuZHVyYXRpb24gPiBpbmZvLmR1cmF0aW9uKSB7CiAgICBkaWcgMQogICAgZHVwCiAgICBleHRyYWN0IDE2IDgKICAgIGZyYW1lX2J1cnkgNAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPgogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDQwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDU2CiAgICAvLyBpbmZvLmR1cmF0aW9uID0gc2V0dGluZ3MuZHVyYXRpb24KICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIDQKICAgIHJlcGxhY2UyIDMyCiAgICBjb3ZlciAyCgpzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VANDA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDU4CiAgICAvLyBpZiAoc2V0dGluZ3MucGFydGljaXBhdGlvbiA+IGluZm8ucGFydGljaXBhdGlvbikgewogICAgZGlnIDEKICAgIGR1cAogICAgZXh0cmFjdCAyNCA4CiAgICBmcmFtZV9idXJ5IDAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID4KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfaWZfZWxzZUA0MgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ1OQogICAgLy8gaW5mby5wYXJ0aWNpcGF0aW9uID0gc2V0dGluZ3MucGFydGljaXBhdGlvbgogICAgdW5jb3ZlciAyCiAgICBmcmFtZV9kaWcgMAogICAgcmVwbGFjZTIgNDAKICAgIGNvdmVyIDIKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfaWZfZWxzZUA0MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NjEKICAgIC8vIGlmIChzZXR0aW5ncy5hcHByb3ZhbCA+IGluZm8uYXBwcm92YWwpIHsKICAgIGRpZyAxCiAgICBkdXAKICAgIGV4dHJhY3QgMzIgOAogICAgZnJhbWVfYnVyeSAxCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIHB1c2hpbnQgNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICA+CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VANDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NjIKICAgIC8vIGluZm8uYXBwcm92YWwgPSBzZXR0aW5ncy5hcHByb3ZhbAogICAgdW5jb3ZlciAyCiAgICBmcmFtZV9kaWcgMQogICAgcmVwbGFjZTIgNDgKICAgIGNvdmVyIDIKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfaWZfZWxzZUA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NjQKICAgIC8vIGlmIChzZXR0aW5ncy5taW5pbXVtQXBwcm92YWxzID4gaW5mby5taW5pbXVtQXBwcm92YWxzKSB7CiAgICBzd2FwCiAgICBkdXAKICAgIGV4dHJhY3QgNDAgOAogICAgZnJhbWVfYnVyeSAyCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDIKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICA+CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VANDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NjUKICAgIC8vIGluZm8ubWluaW11bUFwcHJvdmFscyA9IHNldHRpbmdzLm1pbmltdW1BcHByb3ZhbHMKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAyCiAgICByZXBsYWNlMiA1NgogICAgc3dhcAoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDQ2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQyMwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3Rfd2hpbGVfdG9wQDQKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDMxCiAgICAvLyB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvbk5ld1dhbGxldCkgewogICAgZGlnIDQKICAgIHB1c2hieXRlcyAweDUyCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9lbHNlX2JvZHlAOQogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0MzIKICAgIC8vIG1iciArPSB0aGlzLnNldHVwQ29zdCgpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5zZXR1cENvc3QKICAgIHVuY292ZXIgNAogICAgKwogICAgY292ZXIgMwogICAgYiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VAMzYKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfZWxzZV9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDMzCiAgICAvLyB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBHdWlsZEFjdGlvbkFkZFBsdWdpbikgewogICAgZGlnIDQKICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgID09CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2Vsc2VfYm9keUAxNwogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0MzUKICAgIC8vIGlmIChwbHVnaW4udXNlRXhlY3V0aW9uS2V5ICYmIHBsdWdpbi5jYWxsZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIDYKICAgIGludGMgNyAvLyA0ODkKICAgIGdldGJpdAogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM2CiAgICBmcmFtZV9kaWcgNQogICAgZXh0cmFjdCAxMCAzMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDM2CiAgICAvLyBtYnIgKz0gdGhpcy5wbHVnaW5NYnIocGx1Z2luLmRlZmF1bHRUb0VzY3JvdyA/ICcnIDogcGx1Z2luLmVzY3JvdykKICAgIGZyYW1lX2RpZyA2CiAgICBwdXNoaW50IDQ5MQogICAgZ2V0Yml0CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X3Rlcm5hcnlfZmFsc2VAMTQKICAgIHB1c2hieXRlcyAiIgogICAgc3dhcAoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF90ZXJuYXJ5X21lcmdlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyByZXR1cm4gR3VpbGRQbHVnaW5NQlIgKyBCb3hDb3N0UGVyQnl0ZSAqIEJ5dGVzKGVzY3JvdykubGVuZ3RoCiAgICBzd2FwCiAgICBsZW4KICAgIGludGMgNCAvLyA0MDAKICAgICoKICAgIGludGMgMTIgLy8gMjY5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0MzYKICAgIC8vIG1iciArPSB0aGlzLnBsdWdpbk1icihwbHVnaW4uZGVmYXVsdFRvRXNjcm93ID8gJycgOiBwbHVnaW4uZXNjcm93KQogICAgdW5jb3ZlciA0CiAgICArCiAgICBjb3ZlciAzCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfaWZfZWxzZUAzNgoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF90ZXJuYXJ5X2ZhbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQzNgogICAgLy8gbWJyICs9IHRoaXMucGx1Z2luTWJyKHBsdWdpbi5kZWZhdWx0VG9Fc2Nyb3cgPyAnJyA6IHBsdWdpbi5lc2Nyb3cpCiAgICBmcmFtZV9kaWcgNgogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIHB1c2hpbnQgNTkKICAgIGV4dHJhY3RfdWludDE2CiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgYiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X3Rlcm5hcnlfbWVyZ2VAMTUKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfZWxzZV9ib2R5QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQzOAogICAgLy8gfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25BZGROYW1lZFBsdWdpbikgewogICAgZGlnIDQKICAgIGJ5dGVjIDE4IC8vIDB4MTUKICAgID09CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2Vsc2VfYm9keUAyNQogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NDAKICAgIC8vIGlmIChwbHVnaW4udXNlRXhlY3V0aW9uS2V5ICYmIHBsdWdpbi5jYWxsZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIDYKICAgIGludGMgOSAvLyA1MDUKICAgIGdldGJpdAogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM2CiAgICBmcmFtZV9kaWcgNQogICAgZXh0cmFjdCAxMiAzMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDQxCiAgICAvLyBtYnIgKz0gdGhpcy5wbHVnaW5NYnIocGx1Z2luLmRlZmF1bHRUb0VzY3JvdyA/ICcnIDogcGx1Z2luLmVzY3JvdykKICAgIGZyYW1lX2RpZyA2CiAgICBpbnRjIDExIC8vIDUwNwogICAgZ2V0Yml0CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X3Rlcm5hcnlfZmFsc2VAMjIKICAgIHB1c2hieXRlcyAiIgogICAgc3dhcAoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF90ZXJuYXJ5X21lcmdlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyByZXR1cm4gR3VpbGRQbHVnaW5NQlIgKyBCb3hDb3N0UGVyQnl0ZSAqIEJ5dGVzKGVzY3JvdykubGVuZ3RoCiAgICBzd2FwCiAgICBsZW4KICAgIGludGMgNCAvLyA0MDAKICAgICoKICAgIGludGMgMTIgLy8gMjY5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NDEKICAgIC8vIG1iciArPSB0aGlzLnBsdWdpbk1icihwbHVnaW4uZGVmYXVsdFRvRXNjcm93ID8gJycgOiBwbHVnaW4uZXNjcm93KQogICAgdW5jb3ZlciA0CiAgICArCiAgICBjb3ZlciAzCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfaWZfZWxzZUAzNgoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF90ZXJuYXJ5X2ZhbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ0MQogICAgLy8gbWJyICs9IHRoaXMucGx1Z2luTWJyKHBsdWdpbi5kZWZhdWx0VG9Fc2Nyb3cgPyAnJyA6IHBsdWdpbi5lc2Nyb3cpCiAgICBmcmFtZV9kaWcgNgogICAgZHVwCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIHB1c2hpbnQgNjEKICAgIGV4dHJhY3RfdWludDE2CiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgYiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X3Rlcm5hcnlfbWVyZ2VAMjMKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfZWxzZV9ib2R5QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ0MwogICAgLy8gfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25Db25zZW5zdXMpIHsKICAgIGRpZyA0CiAgICBieXRlYyAzOCAvLyAweDUzCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9lbHNlX2JvZHlAMjcKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDQ0CiAgICAvLyBtYnIgKz0gdGhpcy5jb25zZW5zdXNBY3Rpb25NYnIoYWN0aW9uLmRhdGEpCiAgICBmcmFtZV9kaWcgNgogICAgY2FsbHN1YiBjb25zZW5zdXNBY3Rpb25NYnIKICAgIHVuY292ZXIgNAogICAgKwogICAgY292ZXIgMwogICAgYiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VAMzYKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfZWxzZV9ib2R5QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ0NQogICAgLy8gfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gR3VpbGRBY3Rpb25TZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncykgewogICAgdW5jb3ZlciA0CiAgICBieXRlYyAzOSAvLyAweDU0CiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDQ2CiAgICAvLyBjb25zdCBjb2RlID0gZGVjb2RlQXJjNDxHdWlsZFByb3Bvc2FsQ29uc2Vuc3VzQWN0aW9uU2V0dGluZ3M+KGFjdGlvbi5kYXRhKS5jb2RlCiAgICBmcmFtZV9kaWcgNQogICAgZXh0cmFjdCAyIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gY29uc2Vuc3VzQWN0aW9ucyA9IEJveE1hcDx1aW50NjQsIEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXlQcmVmaXg6IEd1aWxkQm94UHJlZml4Q29uc2Vuc3VzQWN0aW9ucyB9KQogICAgYnl0ZWMgMzEgLy8gImMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0NDcKICAgIC8vIGlmICghdGhpcy5jb25zZW5zdXNBY3Rpb25zKGNvZGUpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDQ4CiAgICAvLyBtYnIgKz0gR3VpbGRDb25zZW5zdXNBY3Rpb25TZXR0aW5nc01CUgogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDI1MzAwCiAgICArCiAgICBjb3ZlciAzCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5wcm9wb3NhbENvc3RfYWZ0ZXJfaWZfZWxzZUAzNgoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl93aGlsZUA0NzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ2OQogICAgLy8gaW5mby5tYnIgPSBtYnIKICAgIHN3YXAKICAgIGR1cAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICByZXBsYWNlMiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDcwCiAgICAvLyBpbmZvLnRvdGFsID0gbWJyICsgaW5mby5mZWUKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgKwogICAgaXRvYgogICAgcmVwbGFjZTIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ3MgogICAgLy8gaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdCAmJiBUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHN0YXRlID0gR2xvYmFsU3RhdGU8R3VpbGRTdGF0ZT4oeyBpbml0aWFsVmFsdWU6IEd1aWxkU3RhdGVEcmFmdCwga2V5OiBHdWlsZEdsb2JhbFN0YXRlS2V5U3RhdGUgfSkKICAgIGJ5dGVjIDcgLy8gInN0YXRlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ3MgogICAgLy8gaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdCAmJiBUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18xIC8vIDB4MDAKICAgID09CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czo6R3VpbGQucHJvcG9zYWxDb3N0X2FmdGVyX2lmX2Vsc2VANTAKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNyZWF0b3IgfSkKICAgIGJ5dGVjIDIyIC8vICJjcmVhdG9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ3MgogICAgLy8gaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09IEd1aWxkU3RhdGVEcmFmdCAmJiBUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDUwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDczCiAgICAvLyBpbmZvLnRvdGFsID0gMAogICAgZnJhbWVfZGlnIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgcmVwbGFjZTIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ3NAogICAgLy8gaW5mby5mZWUgPSAwCiAgICBzd2FwCiAgICByZXBsYWNlMiAxNgoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLnByb3Bvc2FsQ29zdF9hZnRlcl9pZl9lbHNlQDUwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ3NgogICAgLy8gcmV0dXJuIGluZm8KICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRCYWxsb3QocHJvcG9zYWxJRDogdWludDY0KSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmdldEJhbGxvdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0ODctMTQ4OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBnZXRCYWxsb3QocHJvcG9zYWxJRDogdWludDY0KTogR3VpbGRDb25zZW5zdXNCYWxsb3QgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDg5LTE0OTIKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0Jhc2UucHJvdG90eXBlLmdldEJhbGxvdD4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXMudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtwcm9wb3NhbElEXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNDkxCiAgICAvLyBhcmdzOiBbcHJvcG9zYWxJRF0sCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE0OTAKICAgIC8vIGFwcElkOiB0aGlzLmNvbnNlbnN1cy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnNlbnN1cyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR3VpbGRHbG9iYWxTdGF0ZUtleUNvbnNlbnN1cyB9KQogICAgYnl0ZWMgNiAvLyAiY29uc2Vuc3VzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ5MAogICAgLy8gYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6MTQ4OS0xNDkyCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNCYXNlLnByb3RvdHlwZS5nZXRCYWxsb3Q+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzLnZhbHVlLAogICAgLy8gICBhcmdzOiBbcHJvcG9zYWxJRF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgYnl0ZWMgNTEgLy8gbWV0aG9kICJnZXRCYWxsb3QodWludDY0KShib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsKHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQpKSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA3MwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL3R5cGVzLnRzOjpHdWlsZENvbnNlbnN1c0JhbGxvdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9jb3JlL2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkLmdldENvbnNlbnN1c0FjdGlvblNldHRpbmdzKGNvZGU6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5nczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MDMtMTUwNAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBnZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5ncyhjb2RlOiB1aW50NjQpOiBHdWlsZFByb3Bvc2FsU2V0dGluZ3MgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTA1CiAgICAvLyBpZiAodGhpcy5jb25zZW5zdXNBY3Rpb25zKGNvZGUpLmV4aXN0cykgewogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIGNvbnNlbnN1c0FjdGlvbnMgPSBCb3hNYXA8dWludDY0LCBHdWlsZFByb3Bvc2FsU2V0dGluZ3M+KHsga2V5UHJlZml4OiBHdWlsZEJveFByZWZpeENvbnNlbnN1c0FjdGlvbnMgfSkKICAgIGJ5dGVjIDMxIC8vICJjIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MDUKICAgIC8vIGlmICh0aGlzLmNvbnNlbnN1c0FjdGlvbnMoY29kZSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5nc19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjE1MDYKICAgIC8vIHJldHVybiB0aGlzLmNvbnNlbnN1c0FjdGlvbnMoY29kZSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZC5nZXRDb25zZW5zdXNBY3Rpb25TZXR0aW5nc19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTA4CiAgICAvLyByZXR1cm4gdGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIHVwZGF0ZUd1aWxkUHJvcG9zYWxTZXR0aW5ncyA9IEdsb2JhbFN0YXRlPEd1aWxkUHJvcG9zYWxTZXR0aW5ncz4oeyBrZXk6IEd1aWxkR2xvYmFsU3RhdGVLZXlVcGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MgfSkKICAgIGJ5dGVjIDE2IC8vICJ1cGRhdGVfZ3VpbGRfcHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2NvcmUvY29udHJhY3QuYWxnby50czoxNTA4CiAgICAvLyByZXR1cm4gdGhpcy51cGRhdGVHdWlsZFByb3Bvc2FsU2V0dGluZ3MudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSANAAECCJAD5K8B1KwB6QP4A/kD+gP7A5TSASY+BBUffHUBAAZ3YWxsZXQIcmVzZXJ2ZWQLRVJSOmVyckdhY24BbAljb25zZW5zdXMFc3RhdGULRVJSOmVyckdwc3QBKAEUAQoLRVJSOmVyckdwYXkLRVJSOmVyckdwcnABMg5wbHVnaW5zX2xvY2tlZA91cGRhdGVfZ3VpbGRfcHMBeAEVARYCAAoBZwdjcmVhdG9yDWFkZF9wbHVnaW5fcHMOd2FsbGV0X2ZhY3RvcnkBHgEfASkBWwtFUlI6ZXJyR21heBVwcm9wb3NhbF9hY3Rpb25fbGltaXQBYwtFUlI6ZXJyR2NydAIAAAE8AUYBRwFIAVMBVAFaC3Byb3Bvc2FsX2lkDnVwZ3JhZGVfYXBwX3BzE3JlbW92ZV9leGVjdXRpb25fcHMQcmVtb3ZlX3BsdWdpbl9wcxFhZGRfYWxsb3dhbmNlc19wcxRyZW1vdmVfYWxsb3dhbmNlc19wcw1uZXdfZXNjcm93X3BzEHRvZ2dsZV9lc2Nyb3dfcHMBUAtFUlI6ZXJyR3BsawSSu3aeBG+TeOMLRVJSOmVyckdmYWMLRVJSOmVyckd2ZXILRVJSOmVyckd3bGYHdmVyc2lvbgtFUlI6ZXJyR3B3cgTT0pZDBL9NfFcLRVJSOmVyckd3bGsCAF8xGEAeJwcpZycpI2cnDyJnKyJngATqkYDdNhoAjgEA+DEZFEQxGEHCA4IXBJeIHiEEUIH3kwT44UCqBM5zFHsEI2yxuwR4tkPoBECYjLkEU8R1ZgT9LJPNBDSVeBoE0Eb7cQSICVD5BCj4AVQEqeH1ewQ3aZifBGLOm1sEtXoezQS/tSSPBPH/KKoEvA1YpwSWmdEIBI/q2tsE/gInySczggME277G0gSVfHUuBItfhuAnNIIDBPHAjmoEJ635HwSFTe3gNhoAjh8BdgGRAiwCUgJtAo8CtAK9AsMCyQPMBMsF9wahB/wIoQkaChwKdBIFEkgSUhKuEs4S4BL/ExETLRNZE3QAAQAjQ4AEBssuVDYaAI4BADcAMRmBBBIxGBBEQqxCigIBi/5XAgCL/iJZi/8kC0sCTFlLAhWL/yMISSQLSwVMWU8ETwIJTVKJNhoBSSJZJAhLARUSRFcCADYaAklOAhWBIBJENhoDSRUlEkQXTDYaBEkVJRJEFzYaBUkVgbgDEkQyDUAIJzWwAEsCgAATQAgnNrAASwFAHoALRVJSOmVyckdjbnOwAEsDQAgnN7AASSJbSU4DQfgCSwKBDA5B6AIjQAgnHbAAJwZPAmclgbADWElXADBJiKpLSEsBVzAwSYiWS0hLAldgMEmIgktISwNXkDBJiO5KSEsEV8AwSYjaSkhLBVfwMEmIxkpISwaDAqACMFhJiKxKSEsHgwLQAjBYSYiSSkhPCIMCgAMwWEmI+ElIJzhPC2cnFk8MZyceTwpnJypPCWcnF08IZycrTwdnJyxPBmcnLU8FZycuTwRnJy9PA2cnME8CZycQTGcnGExnI0MiQucCNhoBSSJZJAhLARUSRFcCAIi0gQEWKExQsCNDMRYjCUk4ECMSRDYaAUlOAkkiWSQISwEVEkRXAgCIqEeI3oABSU4CSwE4ADEAEksCOAcyChIQTwI4CE8CEhBACCcMsAAyCnMATElPAkSxIicGZURJcghETwRJTgOyCLIHI7IQIrIBtrIYgASL/4OHshpPA7IagQayECKyAbMyCnMARDEATgMISU8CDUEQTwIJiKJJI0NIRQEiQhE2GgFJIlkkCEsBFRJEVwIANhoCSRWBIBJEiPpEiIp8FihMULAjQzYaAUkVIxJENhoCSRWBMBJEiL5EIoi8akgjQzYaAUkVJRJEFzYaAkkVgTASRIiGRIjOREwWJx9MUEy/I0M2GgFJFSUSRBdJiNJDQSZJgQwOQRojQAgnHbAAJx5MZyNDIkIZiJxDJw8jZyNDI4ioaCNDIoicaCNDIoAAMRYjCUk4ECMSRDYaAUkVgSQSRDYaAkcCIllJTgIkC0xJFU4CVwIAIklLBQxBXEkkC0sCSU8CWUlPBUlOBBJESwEVUkkVSwEjWUmBAxJETFIiWYEFCAhOAiMIQmNGAk8CSCQIEkQ2GgNJIlkkCEsBFRJEVwIARQVJiIZ9RQIiJwdlRCkSSU4CQdwBIkUGSwRJOAAxABJLATgHMgoSEEw4CEsHEhBACCcMsABLAoisVkUDSwFBYiJMgRhbIksFSwVLCU8ETwWI4GJFA0xAJCIrZURLAoiARkhLBkwJCCtMZxYoTFCwI0MxADIHSwKBIFsISwhMiPpgQn9JIltFBkLfATYaAUkVJRJEFzYaAklOAhWBJBJENhoDRwIiWUlOAyQLTEkVTgJXAgAiSUsGDEFcSSQLSwJJTwJZSU8FSU4EEkRLARVSSRVLASNZSYEDEkRMUiJZgQUICE4CIwhCY0YCTwNIJAgSRDYaBEkiWSQISwEVEkRXAgBLAojyXUAIJwiwAEsCFicFTFBJvkxOBURPAojWeE4DSU4CIltMgVUluhdJTgIOQAgnDLAATwOIrFIxADIHTwRJTgOBIFsITE8FTwKI3l1MgRhbTwRPBk8ESwVPBE8FiMJeRQEiK2VETIjqQUhLAkwJCE8CSYFdWUsBFVKIxEFITwJMCQkrTGcjQzEWIwlJOBAjEkQ2GgFJFSUSRBc2GgJJTgMVgSQSRDYaA0cCIllJTgMkC0xJFU4CVwIAIklLBgxBXEkkC0sCSU8CWUlPBUlOBBJESwEVUkkVSwEjWUmBAxJETFIiWYEFCAhOAiMIQmNGAk8DSCQIEkQ2GgRJIlkkCEsBFRJEVwIASwKI4FlACCcIsABLAhYnBUxQSb5MTgZETwKIxHROA0lOAyJbSU4FTIFVJboXSU4GDUAIJwywAE8GSTgAMQASSwE4BzIKEhBMOAhLBUsHCRIQQAgnDLAATwKI1E0xADIHTwRJTgOBIFsITE8ETwKIhllMgRhbTwVPB08ESwVPBE8FiOpZRQEiK2VETIiSPUhPAkwJCE8CSYFdWUsBFVKI7DxITwJMCQkrTGcjQyKAADYaAUkVJRJEFxYnBUxQSb1FAUAIJw2wAEcCvkxOAkSBRSW6F0D0AUsBIiO6SUUFJwkSQBBLAycOEkHKASNOAksBIiO6KRJLAxFACCcIsAAxAEsCgwIlILpJTgQSQAgnILAASwGBVSW6F0UFTwNBLkmBXVlLARVSiNw6SEUDvEhLAYjuNyNDIitlRExJgV1ZSwEVUoikOkhLBEwJCStMZ0JDIk4CQskBNhoBRwIVJRJEFzYaAkkiWSQISwEVEkRXAgBMIicHZUQpE0AegAtFUlI6ZXJyR2FjdLAASYjQU0AIJwiwABYnBUxQSU4DSb5ESYFdWUsBFVJJTgSIpm5ISU4DTIFVJboXSU4FTCJbSU4ED0AIJwywADEAMgdLA0lOA4EgW0lOBAhMTwRPAoisU0yBGFsPQAgnObAATElXKAhLAVcwCEsCVzgITgJQTFCxIicGZURJshgnOrIagQayECKyAbO0PklXBABMVwAEKBJESRUlEkQXsUsBcghESwGyCLIHI7IQIrIBtjIHTwUIFk8CshiABGhEkIiyGk8FshqyGkyyGoEGshAisgGzTwSI7jVISwEITwKBEFtMSwEITwNJTwIJTwRPAgkiK2VETwRLBAhLAggJK0xnTBZPA0lOAoFVTwK7MgcWSwGBRU8Cu0kiJwq7gwIlILpMiPwxiL4zI0MxFiMJSTgQIxJENhoBRwIVJRJEF0k2GgJJTgMVIxJENhoDSU4DSSJZJAhMFRJEFicFTFBJvUUBQAgnDbAAIiO6JwoSQAgnCLAAMQCIqmdJTwVJOAAxABJLATgHMgoSEEw4CE8CEhBACCcMsACxIicGZURJcghETwKyCLIHI7IQIrIBtjEATLIYgAQ9dSXpshqyGk8CshpMshqyGoEGshAisgGzI0M2GgFHAhUlEkQXSRYnBUxQSb1FAUAIJw2wAEkiI7onChJACCcIsACxIicGZUSyGIAEWzqLALIaTwKyGoEGshAisgGztD5JVwQATFcABCgSREkVgSESRCJTQRBFASInCbsjQ0kiJxm7SYMCJSC6TIFVJboXIoiwL0ItIkcCgABJNhoBRwIVJRJEFzYaAklOAkkiWUlOBYEgCyQITBUSRBYnBUxQSb1FAUAIJw2wAEkiI7pJTgJFCYMCJSC6RQknGRJAHksGJw4SQBBLBicLEkHMAiNACCcIsAAyCnMATElOAk4DRLEiJwZlRLIYgASp6CPNshpPA7IaSwGyGoEGshAisgGztD5JVwQASU4CRQlXAAQoEkQVJRJEMgpzAExJTgJOA0QMQY4BTwIJRQMiRQQiSUsDDEE6SwFXAgBLAYEgC4EgWCEFiJgqSwQhBQhFBSMIQkFGAksBSwMNQRZLAUsDCUsGTIjaKShLBFCwI0NIRQEiRQNCjwEiQssCNhoBSRUlEkQXSRYnBUxQSb1FAUAIJw2wAEkiI7onCRJBZkmBRSW6F0FWI0AIJwiwADEASwGDAiUguklOAhJACCcgsABMSSInC7uBVSW6FyKIgiojQyJCVSKAAEk2GgFHAhUlEkQXSRZJTgInBUxQSb1FAUAIJw2wAEcCvkxOAkQiI7onCRJACCcIsABLAYFFJboXSUUHQAaInCNJgV1ZSwEVUojiOUhHAiInDruBVSW6F0UGiNInTCJMSYFfJLoXSwINQd4VRwKBXyS6F0sDSU8CDEQkC4FhCEsBTCS6F4FhSwEISwJMI7pJTgNOA4FkCEokuhckCLpJRQxXAgBOAycLEkGyAUhLCSRbMggSQAgnBLAASwlXCiAnEUxQSU4FvUUBQQgnBLAATEmBKFlLARVSIllBTEsJSYEsW0yBNFsOQTIjQAgnBLAASwEWSwZMUE8ETL9MIwhMQr0CIkIxSScZEkGEAUixSwlJVwwgTwNJgSpZSwEVUksCVy4ITwNXNggiKmVEshiABFzr7UOyGk8DshpPArIaTLIashqBBrIQIrIBs0KfAUknGhJBvgFIRQFLCFcCIElOAycRTFBJvUUBQVZPA0hJvkRXAAgnBUxQSb1FAUEggwIlILpMvEghBojqIUKdAkgiJxZlREIhSLEiKmVEshiABNWGha+yGk8CshqBBrIQIrIBs0LrAkknChJB4gNISwlJVwIISwFXCiBPBEmBKFlLAYE7WUsCTwJLAlJXAgBLBVcsAUsGVy0ISwdXNQhLBYFuWUsGTwZLAlJLBoHoA1NLByEHU0sIgeoDU0sJgesDU0sNV0AISw5XSAhLD1dQCEsQV1gISxFXYAhPEldoCEsQFU8RTw1PAlKAAgByTxJQTxFQSxAVFlcGAk8RUEyAAgB0UEsBFYF0CExPEVBPEFBPD1BLARZXBgJQSw4VTwIIKSJPD1QjTw5UJE8NVIEDTwxUTwJMUE8JUE8IUE8HUE8GUE8FUE8EUEwWVwYCUCchUExQTwJQTFCI9EJIQtsGSScSEkESSEyI1kJIQvkGSScJEkF6SEsJSVcCCExXCiBPA0mBKFlLARVSVwIAgAIALE8DUE8CUEsBFRZXBgJPAlBMgAQALgAAUExQiJ5KSEL/B0knGxJBEkhMiIBKSEKdCEknExJBbkhLCVcCCE8CSSVZSwEVUlcCAEkVFlcGAkxQTCcUUExQJxVMUEm9RQFACCcEsABLCVcMML9ClwlJJw4SQWpIsUxJIllLASRZSwJPAksCUksCFU8DTwNPAlIiKmVEshgnO7IaTLIashqBBrIQIrIBs0KNCkknIhJBckixTEkiWUsBJFlLAk8CSwJSSwIVTwNPA08CUiIqZUSyGIAE1d04K7IaTLIashqBBrIQIrIBs0KLC0knIxJBfEixTEkiWUsBFVJLCVcEICIqZUSyGIAE30m0/bIaTLIashqBBrIQIrIBs7Q+SVcEAExXAAQoEkQVJRJEQpMMSSckEkFuSLFMSSJZSwEVUiIqZUSyGIAECUO6ubIashqBBrIQIrIBs7Q+SVcEAExXAAQoEkQVgSkSREKNDUknJRJBckixTEkiWUsBJFlLAk8CSwJSSwIVTwNPA08CUiIqZUSyGIAE668UoLIaTLIashqBBrIQIrIBs0KLDkknMRJBLEhFAUsISVcCAUxXAzBLBYjsN0hCww5JgAFREkEcSEUBSwgkWyceTGdC7Q5JgAFSEkEwSExJIllLARVSVwIASwlXBCCIlEhIQqsPSScmEkFySEyIiBixIicGZURJcghETwKyCLIHI7IQIrIBtrIYgARn7V/tshpLBbIaSwiyGoEGshAisgGzQqkQTwJISScnEkFYSEsISVcKMEmInhBITCRbSYjCVoEoW0sCgShbSwdOAoi2IxYnH0xQTL9CkxFJJygSQV5IIicYZUUBQAgnN7AAsSIqZUQWIicYZUSyGIAEAeIvP7IashqBBrIQIrIBs0L9EUknHBJBSEixSwhXAiAiKmVEshiABNJLdVayGrIagQayECKyAbMqaULREkmAAWQSQThIIicHZUSAAQESQAgnCLAAiK4OJweAAQJnQpcTgAFuEkEOJw8jZ0KxEycEsABFAU8CSIjGEUsFQRpJSwcISwMPQAgnDLAASwJLBw1BdE8CSwYJTgJJSwMNQUxPAglMSwVBJiIrZURLBgkrTGciFksBgVVPAruDAiUgukyIpg8jQ0hFASJMQk1PAkgiTgJCcSJJgAA2GgFJIlkkCEsBFRJEVwIAIicHZUQpEkE2Mg4yCRJACCc1sABJgAATQAgnNrAAJzhMZyNDJxExBlC9RQFACCcEsAAnETEGUL5MSU4CTgNEVwAIJwVMUElOAiIjuicOEkAIJwiwAE8CJVtJTgNLAklOAoFfJLoXSwENRCQLgWEISU4CSwFMJLoXgWEII7onCxJACCcEsABLAkmBXyS6F08FDURJTwIkuheBZAhKJLoXJAi6SUUGSVcCAEUFJFsyCBJBjgJLBFcKIDEGEkH4ASNACCcEsAAyBksFgSxbD0HMATIGSwWBNFsOQbYBI0AIJwSwACJFAyJOAksESYEoWUsBFVJJIllLBA1BNlcCAEsDgSALgSBYMgsSQQYjRQRPAiMITgJCVUhPAkhLAkAIJwSwACcRMQZQvEhMgwIlILohBoj2CUK9BCJCtQEiQvcBIicHZUQpE0AUMQAiJxZlRBJBWiNACCcgsACI2AaIrgpJIitlRA1BKCIrZUQJiNoHSwGImggWKExQsCNDSCJCISJCWYimQBYoTFCwI0M2GgFHAiJZSU4CJAtMSRVOAlcCACJJSwUMQVxJJAtLAklPAllJTwVJTgQSREsBFVJJFUsBI1lJgQMSRExSIlmBBQgITgIjCEJjRgJPAkgkCBJEiMY/SChMULAjQzYaAUkVJRJEFxYnBUxQSb1FAUAIJw2wAL5EKExQsCNDNhoBSRUlEkQXiPhIKExQsCNDNhoBSRWBIBJEJxFMUEm9RQFACCcEsAC+RChMULAjQzYaAUkVJRJEF4j2SChMULAjQzYaAUkVJRJEFzYaAkkVgSASRIjyOxYoTFCwI0OxIicGZUSyGCc0shqBBrIQIrIBs7Q+SVcEAExXAAQoEkRJFSUSRChMULAjQ4jABUkiK2VEDUEYIitlRAkWKExQsCNDSCJCESInD2VEFCkiTwJUKExQsCNDIicHZUQpEkAegAtFUlI6ZXJyR2RyZrAAMQAiJxZlRBJACCcgsACJigEBsSInBmVEshiABJFAxjiyGov/shqBBrIQIrIBs4v/iSIqZUUBQB6AC0VSUjplcnJHd2xysAAiKmVMSU8CREAIJzywALGyGIAEE7xE5LIagQayECKyAbO0PklXBABMVwAEKBJESRWBIBJEMgoSQAgnPLAAiSIqZUSAEmNvbnRyb2xsZWRfYWRkcmVzc2VBAolIIiplRHIIRImKAgCL/0EgsYv/sgiL/rIHI7IQIrIBs4mKAgGL/nMARQFADov/MgEPQQQjiSKJigIAIov/QAKJi/6L/4hFQSKxi/+yCIv+sgcjshAisgGziSIqZUUBQQuI9wFJjACL/4iNAUElsYv/sgiLALIHI7IQIrIBs4kyCnMATElPAkQyCnMBTElOAk4DRA1BBAmJRgIiiYoBAIv/QR4iKmVFAUEQiIkDi/+IyQKJigQAi/5AAokiK2VEi/4JK0xni/wWJwVMUCIWgVVMu4v+i/8NQRaL/ov/CYv9TIjRAomKAQIiSYv/IllLAQ1BOov/SwGIrVRJI1lLARVSVwIAFYEHCE8CCEwjCEJHSCEEC4Hk3gIIi/+JigEBsYv/FRZXBgKL/1AiJwZlRLIYgASFficXshqyGoEGshAisgGztD5JVwQATFcABCgSREkVJRJEF4mKAQGL/xdJgVAPQQ6LAIFUDkAgi/+AAWQSQBCL/4ABbhJBBiNMiSJCBYoBAYv/iFtAzAGL/ycLEkC8AYv/JygSQKwBi/8nHBJAnAGL/ycKEkCMAYv/JxISQH6L/ycTEkBwi/8nGhJAYov/JwkSQFSL/ycbEkBGi/8nDhJAOIv/JyISQCqL/ycjEkAci/8nJBJADov/JyUSQQQjiSKJigEBi/+IwwJBDCInEGVEiYv/JwsSQByL/ycoEkAOi/8nHBJBDCInKmVEiYv/JwoSQByL/ycSEkAOi/8nExJBDCInF2VEiYv/JxoSQQwiJytlRImL/ycJEkAOi/8nGxJBDCInLGVEiYv/Jw4SQQwiJy1lRImL/yciEkEMIicuZUSJi/8nIxJBDCInL2VEiYv/JyQSQA6L/yclEkEMIicwZUSJJwSwAIoCA4v+IltJi/8iW0lOAg1B2gJIi/4lW0lOAov/JVtJTgINQaYCSIv+gRBbSU4Di/+BEFtJTgINQewBSIv+gRhbSU4Di/+BGFtJTgINQbIBSE8CTgOL/oEgW0lOA4v/gSBbSU4CDUF0SE8CTgSL/oEoW0lOA4v/gShbSU4CDUE6SE8CTBZPAhZQTwIWUE8CFlBPAhZQTBZQi/6L/4lPA0hCOU8DSE4EQnNPA0hOA0KxAU8DSE4CQvMBTwJITEKrAkUBQtsCigIBi/4nJhJBOIv/FUAegAtFUlI6ZXJyR2NhY7AAi/8iVYiKNomL/icZEkFqi/9XAAiL/yVZi/+BKlmL/04CUlcCAEkVFlcGAkxQTCcUUExQJxVMUEm9RQFACCcEsAC+RImL/icxEkFCi/9XAAFJiJsJQR4iJxBlREyIyQeIgwVGAokiJxBlREyJi/4nJxJBJov/IlsiJxBlREyImDSIxQVGAomL/icTEkGCAYv/VwAIi/8lWYv/FYv/TgJSVwIASRUWVwYCTFBMJxRQTFAnFUxQSb1FAUEcIicXZURMvkSIyQZGAokiJxdlREyJi/6IswmJigMAIov/i/4OQDCL/RYnBUxQSYwAvUUBQRKLAIFFJboXQAKJi/2IvDFXMRgiW4v/D0AegAtFUlI6ZXJyR2xrb7AAiYoBAYv/IQdTQWSL/1c+CIv/V0YIi/9XTgiL/1dWCIv/V14Ii/9XZghPBU8FUE8EUE8DUE8CUExQiLsVSIv/iYoBAYv/IllJQAgnBLAAIiceZUQOQAgnHbAAi/+ICEmM/4mKAQEiRwKAACKL/yJZiwQNQeoJi/+LBElOAojfZFcAAUlPAov/TIj3ZEkjWUsBFVJJjAFXAgBJjAKInwdIIicHZUQpEkEqSScLE0HuCEknGRNB4AgjQAgnBLAASScKEklAKksBJxISQBxLAScJEkAOSwEnGxJBFiInD2VEQQgnMrAASwGIxRBAEEsBJxMSQbAHIkEGiPEXQSBIiwKI+QNIiwQjCIwEQrkCSScSEkHMA0iLAUlXBAhLAVcMIIsCSYEqWUsBgT1ZSwJPAksCUlcCAEsFVy4BSwZXLwhLB1c3CEsFgXBZSwZPBksCUksGIQhTSwchCVNLCCEKU0sJIQtTSw1XQghLDldKCEsPV1IISxBXWghLEVdiCE8SV2oISxAVTxFPDU8CUk8RTxFQSxAVFlcGAk8RUEyAAgBwUEsBFYFwCExPEVBPEFBPD1BLARZXBgJQSw4VTwIIKSJPD1QjTw5UJE8NVIEDTwxUTwJMUE8JUE8IUE8HUE8GUE8FUE8EUEwWVwYCUExQTwJQTFCI3wdIQuUDSScxEkEwSIsBSVcDMIjTHEhXAgGIvxRAmQQnBLAASYABURJBOEiLASRbSYwDQR6LA4EMDkEQI0DZBCcdsAAiQg9JJycSQRpIiwFXCjCI0x1IQo0FSScmEkEUSIsCiJkXSEKtBUknHBJBVkiLAVcCIEmMADIDE0E0iwAyChNBJiNA6wWAC0VSUjplcnJHYWRtsAAiQiUnExJBmwaLAVcCCIsCSSVZSwEVUlcCAEkVFlcGAkxQTCcUUExQJxVMUL1FAUAIJwSwAIsBVwwwiNEfSEKLB0sBJxoSQSCLAVcCICcRTFC9RQEUQtUHI0LdByJC3wiL/4wAiYoBASKL/xYnBUxQSb1FAUAIJw2wAEkiI7pMgwIlILqMACkSQRQxAIsAEkEGI0yJIkIFIicpZURJIwgnKUxniYoDAbGL/hUWVwYCi/5Qi/8WIicGZUSyGIAEw+t81LIai/2yGkyyGrIagQayECKyAbO0PklXBABMVwAEKBJESRUlEkQXiYoGAiInB2VEIhZMKRJBaoibI4jHAYz6MQAyBycJi/tQTwJQTwJQTBZQi/0WUCc9UIv8UIv6FicFTFBJvEhMv4v6i/yJi/+L/g9ACCc5sACL+kBgiMkCjPoyBzEAKYv7UExQTwJQTBZQi/0WUCc9UIv8UIv6FicFTFBJvEhMv4v6i/yJi/oWJwVMUIFNJboXQmmKAQCIpSWL/0AGiKEksSInBmVEshiABLmGWmGyGoEGshAisgGzggIBAgEBi/9NJwdMZ4mKAwGL/ojBJYz+i/2IxRuBKFuL/oEoW4v/TgKIpxKL/YinHkEQJxCL/meL/omL/ScLEkAci/0nKBJADov9JxwSQRAnKov+Z4v+iYv9JwoSQByL/ScSEkAOi/0nExJBDicXi/5nQjmL/ScaEkEOJyuL/mdCVYv9JwkSQA6L/ScbEkEOJyyL/mdCf4v9Jw4SQRAnLYv+Z0KbAYv9JyISQRAnLov+Z0K5AYv9JyMSQRAnL4v+Z0LXAYv9JyQSQA6L/SclEkEQJzCL/mdCgwInBLAAigEBIkcDJw9lREEIJzKwAIv/IQtTSUHuB4AAjAKL/yEJU0lBqAGL/1cKIDIDEkGSAYv/V0AIi/9XSAiL/1dQCIv/V1gIi/9XYAiL/1doCE8FTwVQTwRQTwNQTwJQTFCL/1cCCIsCSRUWVwYCTFBMJxRQTFAnFUxQTL+L/yJZi/+BKllJTgKL/04CUklXAgCAABNBxAOxi/9XAgiL/1cKIIv/gT1Zi/9LBUsCUov/VywBi/9XLQiL/1c1CIv/gXBZi/9PBk8CUov/IQhTKSJPAlQpIk8MVIv/IQpTKSJPAlQpIk8OVCIqZUSyGIAEVy/R6rIaTwuyGk8KshpPCbIaTwiyGimyGk8HshpPBrIaTwWyGk8EshpPA7IaTwKyGkyyGimyGrIagQayECKyAbOL/4E9WYv/TgJSSYwAVwIAgAATQV6L/4FwWYv/FYv/TgJSSYwBIllBNrEiKmVEshgnO7IaiwCyGosBshqBBrIQIrIBs4v/jACJSLGL/1cCCIv/Vwogi/+BPVmL/0sESwJSi/9XLAGL/1ctCIv/VzUIi/+BcFmL/08GTwJSi/8hCFMpIk8CVCkiTwtUi/8hClMpIk8CVCkiTw1UIiplRLIYgARWckYushpPCrIaTwmyGk8IshopshpPB7IaTwayGk8FshpPBLIaTwOyGk8CshpMshopshqyGoEGshAisgGzQr0Di/+BKlmL/4E9WYv/TgJSVwIAjAJCjQiKAQEiRwKAACInD2VEQQgnMrAAi/8iWYv/gSpZSU4Ci/9OAlJJVwIAgAATSUH8AbEiKmVEshiABHcn+FGyGksBshqBBrIQIrIBs7Q+SYwASVcEAEsBVwAEKBJESRVLAYEoWUmBKhJETwJMSwJSSYwCIlmBLAgSRIEEW4v/JFsSQZYDiwBXDCCL/1cKIBJB+gKLAlcCAIv/FYv/SwVPAlJXAgASQc4CI0AIJwSwAIv/VwogSU4DMgMSQXyL/1cCCIv/FYv/SwZPAlJXAgBJFUmMAxZXBgJMUEwnFFBMUCcVTFBJjAG9RQFBHosBvEghBIsDCyEMCIi1MEFERQFFAbEiKmVEshiABONQudSyGrIagQayECKyAbOL/4wAiUixi/9XAgiL/xWL/08ETwJSIiplRLIYgATu9Ej9shpMshpMshqyGoEGshAisgGzQmciQs0CigIBIiplRQFBHoALRVJSOmVyckd3c3SwACInGGVEiNoDsUsBcghEsgeyCCOyECKyAbYyAzIKi/4VFlcGAov+UDIDIhZPBbIYgATg0Ym4shpPBLIaTwOyGk8CshpMshqL/7IaJyGyGimyGrIaJyGyGichshqBBrIQIrIBs7Q+SVcEAExXAAQoEkRJFSUSRBcqSwFniYoBAbGL/xUWVwYCi/9QIicGZUSyGIAEqj5AqLIashqBBrIQIrIBs7Q+SVcEAExXAAQoEkRJFSUSRBeJigIBsYv+FiInBmVEshiABPUICO+yGrIai/+yGoEGshAisgGztD5JVwQATFcABCgSREkVIxJEIlMhBSJPAk2JsSInGGVEshiABJtn+m2yGoEGshAisgGztD5JVwQATFcABCgSREkVJRJEF4mKAQIiRwaxIicGZUSyGCc6shqBBrIQIrIBs7Q+SVcEAExXAAQoEkRJFSUSRBeL/4itNoz/CCIWTIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKL/yJZSwENQaAHi/9LAUlOAojxiwFXAAFJTgJOBYv/TIiPjAFJI1lLARVSSYwFVwIASYwGSwFMiL8uSU4DTwRJTgIiW0wiW0xLAQgWTwJMXABJgRBbTwIIFlwQTgMnCxJBpAJPBEhPAyEGCE4DSwFJVwgIjAMlW0sDgRhbDUEQTwKLA1wYTgJLAUlXEAiMBIEQW0sDgSBbDUEQTwKLBFwgTgJLAUlXGAiMAIEYW0sDgShbDUEQTwKLAFwoTgJLAUlXIAiMAYEgW0sDgTBbDUEQTwKLAVwwTgJMSVcoCIwCgShbSwKBOFsNQQxMiwJcOEwjCELjA0sEgAFSEkEcTwRIiM0GTwQITgNCtQJLBCcKEkGGAU8ESIsGIQdTQdsCiwVXCiAyAxJB8QKLBoHrA1NBJoAATEwVIQQLIQwITwQITgNCpwOLBkmBKFlLAYE7WVJXAgBMQj9LBCcSEkGEAU8ESIsGIQlTQfEDiwVXDCAyAxJBhwSLBiELU0EmgABMTBUhBAshDAhPBAhOA0K7BIsGSYEqWUsBgT1ZUlcCAExCP0sEJyYSQSBPBEiLBoivPU8ECE4DQo0FTwQnJxJBnQWLBVcCCCcfTFC9RQFAuwVPA4HUxQEITgNC0wVITEkWTwJMXAhJgRBbTwIIFlwAIicHZUQpEkEoMQAiJxZlRBJBFIsHSU4CXABMXBCL/4wBjACJigEBsYv/FiInBmVEshgnM7IashqBBrIQIrIBs7Q+SVcEAExXAAQoEkRJFYFJEkSJigEBi/8WJx9MUEm9RQFBBr5EiSInEGVETIk=", "clear": "DYEBQw==" }, "events": [], "templateVariables": {} };
var GuildParamsFactory = class _GuildParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,address,uint64,uint64,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))))void":
            return _GuildParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Guild smart contract using the create(string,address,uint64,uint64,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,address,uint64,uint64,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))))void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.creator, params.args.walletFactory, params.args.consensus, params.args.config]
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
            return _GuildParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Guild smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the consensusConfigurationMbr(byte[])uint64 ABI method
   *
   * Return the MBR required by the paired consensus implementation for an opaque draft configuration.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static consensusConfigurationMbr(params) {
    return {
      ...params,
      method: "consensusConfigurationMbr(byte[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.config]
    };
  }
  /**
   * Constructs a no op call for the configureConsensus(pay,byte[])void ABI method
   *
   * Forward opaque draft configuration to the paired consensus implementation.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static configureConsensus(params) {
    return {
      ...params,
      method: "configureConsensus(pay,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.config]
    };
  }
  /**
   * Constructs a no op call for the setup(string,byte[32])uint64 ABI method
   *
   * Create the Guild's ARC-58 wallet through its configured wallet factory.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setup(params) {
    return {
      ...params,
      method: "setup(string,byte[32])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.nickname, params.args.salt]
    };
  }
  /**
   * Constructs a no op call for the setProposalSettings(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))void ABI method
   *
   * Update one action class's proposal settings while the Guild remains in draft.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setProposalSettings(params) {
    return {
      ...params,
      method: "setProposalSettings(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.actionType, params.args.settings]
    };
  }
  /**
   * Constructs a no op call for the setConsensusActionSettings(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))void ABI method
   *
   * Attach proposal settings to one opaque consensus action code while the Guild remains in draft.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setConsensusActionSettings(params) {
    return {
      ...params,
      method: "setConsensusActionSettings(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.code, params.args.settings]
    };
  }
  /**
   * Constructs a no op call for the setProposalActionLimit(uint64)void ABI method
   *
   * Update the maximum proposal action count while the Guild remains in draft.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setProposalActionLimit(params) {
    return {
      ...params,
      method: "setProposalActionLimit(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.limit]
    };
  }
  /**
   * Constructs a no op call for the lockPluginSet()void ABI method
   *
   * Permanently prevent this Guild from adding or removing ARC-58 plugins.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static lockPluginSet(params) {
    return {
      ...params,
      method: "lockPluginSet()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the partiallyInitialize()void ABI method
   *
   * End creator control while allowing consensus to attach the ARC-58 wallet later.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static partiallyInitialize(params) {
    return {
      ...params,
      method: "partiallyInitialize()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the initialize()void ABI method
   *
   * End creator control and require the Guild's ARC-58 wallet to be configured.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static initialize(params) {
    return {
      ...params,
      method: "initialize()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64 ABI method
   *
   * Create a proposal after the paired consensus app verifies proposer power.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newProposal(params) {
    return {
      ...params,
      method: "newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.cid, params.args.actions, params.args.evidence]
    };
  }
  /**
   * Constructs a no op call for the editProposal(uint64,byte[36],(uint8,byte[])[],byte[])void ABI method
   *
   * Edit a draft proposal without adding funding.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static editProposal(params) {
    return {
      ...params,
      method: "editProposal(uint64,byte[36],(uint8,byte[])[],byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.cid, params.args.actions, params.args.evidence]
    };
  }
  /**
   * Constructs a no op call for the editProposalWithPayment(pay,uint64,byte[36],(uint8,byte[])[],byte[])void ABI method
   *
   * Edit a draft proposal and fund its increased storage, ballot MBR, or action fees.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static editProposalWithPayment(params) {
    return {
      ...params,
      method: "editProposalWithPayment(pay,uint64,byte[36],(uint8,byte[])[],byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.id, params.args.cid, params.args.actions, params.args.evidence]
    };
  }
  /**
     * Constructs a no op call for the deleteProposal(uint64)void ABI method
     *
    * Delete a never-submitted draft or any bootstrap proposal as its creator.
  
    Drafts refund the full prepayment; bootstrap proposals, which the Guild funded from
    creator-provided balance, refund the storage they release.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static deleteProposal(params) {
    return {
      ...params,
      method: "deleteProposal(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId]
    };
  }
  /**
   * Constructs a no op call for the submitProposal(uint64,byte[])void ABI method
   *
   * Move a proposal created under Guild consensus from draft to voting.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static submitProposal(params) {
    return {
      ...params,
      method: "submitProposal(uint64,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId, params.args.evidence]
    };
  }
  /**
     * Constructs a no op call for the voteProposal(pay,uint64,uint8,byte[])void ABI method
     *
    * Vote through the Guild while its consensus app calculates and stores the result. Voting again changes
    the vote; only a first vote pays for its receipt (see `voteCost`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static voteProposal(params) {
    return {
      ...params,
      method: "voteProposal(pay,uint64,uint8,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.proposalId, params.args.vote, params.args.evidence]
    };
  }
  /**
   * Constructs a no op call for the finalizeProposal(uint64)void ABI method
   *
   * Resolve the proposal using the result returned by the paired consensus app.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static finalizeProposal(params) {
    return {
      ...params,
      method: "finalizeProposal(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId]
    };
  }
  /**
     * Constructs a no op call for the cleanupProposalConsensus(uint64,address[])uint64 ABI method
     *
    * Reclaim terminal consensus boxes without deleting the historical Guild proposal.
  
    Every listed voter recovers their own vote receipt; the ballot storage returns to the proposer.
    Approved ballots stay until execution or cancellation, since policies read the approving
    ballot while applying consensus actions.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static cleanupProposalConsensus(params) {
    return {
      ...params,
      method: "cleanupProposalConsensus(uint64,address[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId, params.args.voters]
    };
  }
  /**
     * Constructs a no op call for the cancelProposal(uint64)void ABI method
     *
    * Abandon an approved proposal that has not executed, refunding its execution reserve.
  
    Approved proposals never expire, and state changes after approval can leave one permanently
    unexecutable; cancellation is the proposer's way to recover the reserve they prepaid.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static cancelProposal(params) {
    return {
      ...params,
      method: "cancelProposal(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId]
    };
  }
  /**
   * Constructs a no op call for the executeProposal(uint64)void ABI method
   *
   * Execute every action in an approved proposal.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static executeProposal(params) {
    return {
      ...params,
      method: "executeProposal(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId]
    };
  }
  /**
     * Constructs a no op call for the sweep()uint64 ABI method
     *
    * Forward every microALGO that is not the Guild's own storage or a proposer's reserve to the treasury.
  
    Anyone may call this once the Guild is active; in draft only the creator may, since the
    creator funds draft storage from this balance.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static sweep(params) {
    return {
      ...params,
      method: "sweep()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the setupCost()uint64 ABI method
   *
   * Return the funding required to create the Guild's ARC-58 wallet.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setupCost(params) {
    return {
      ...params,
      method: "setupCost()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * Return proposal cost and the strictest consensus settings among all actions.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalCost(params) {
    return {
      ...params,
      method: "proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.actions]
    };
  }
  /**
   * Constructs a no op call for the getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[]) ABI method
   *
   * Return a proposal by ID.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getProposal(params) {
    return {
      ...params,
      method: "getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId]
    };
  }
  /**
   * Constructs a no op call for the getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64)) ABI method
   *
   * Return the consensus ballot for a Guild proposal.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getBallot(params) {
    return {
      ...params,
      method: "getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId]
    };
  }
  /**
   * Constructs a no op call for the mustGetExecution(byte[32])(uint64,uint64) ABI method
   *
   * Return proposal metadata associated with an ARC-58 execution key.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetExecution(params) {
    return {
      ...params,
      method: "mustGetExecution(byte[32])(uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.lease]
    };
  }
  /**
   * Constructs a no op call for the getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * Return the settings that govern one opaque consensus action code.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getConsensusActionSettings(params) {
    return {
      ...params,
      method: "getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.code]
    };
  }
  /**
   * Constructs a no op call for the voteCost(uint64,address)uint64 ABI method
   *
   * What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static voteCost(params) {
    return {
      ...params,
      method: "voteCost(uint64,address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.proposalId, params.args.voter]
    };
  }
  /**
   * Constructs a no op call for the voteMbr()uint64 ABI method
   *
   * Return the minimum-balance payment required to store one vote.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static voteMbr(params) {
    return {
      ...params,
      method: "voteMbr()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the sweepable()uint64 ABI method
   *
   * Return the balance sweep() would forward to the treasury right now.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static sweepable(params) {
    return {
      ...params,
      method: "sweepable()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the canChangePluginSet()bool ABI method
   *
   * Return whether proposals may still add or remove wallet plugins.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static canChangePluginSet(params) {
    return {
      ...params,
      method: "canChangePluginSet()bool",
      args: Array.isArray(params.args) ? params.args : []
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
var GuildFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `GuildFactory`
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
    return new GuildClient(this.appFactory.getAppClientById(params));
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
    return new GuildClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Guild smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? GuildParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? GuildParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new GuildClient(result.appClient) };
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
       * Creates a new instance of the Guild smart contract using the create(string,address,uint64,uint64,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(GuildParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Guild smart contract using the update(string)void ABI method.
       *
       * Active upgrades consume a voted transaction-group commitment, including exact program bytes and version.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(GuildParamsFactory.update.update(params));
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
       * Creates a new instance of the Guild smart contract using the create(string,address,uint64,uint64,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(GuildParamsFactory.create.create(params));
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
       * Creates a new instance of the Guild smart contract using an ABI method call using the create(string,address,uint64,uint64,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(GuildParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new GuildClient(result.appClient) };
      }
    }
  }}
}, _class);
var GuildClient = (_class2 = class _GuildClient {
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
   * Returns a new `GuildClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _GuildClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `GuildClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _GuildClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the Guild smart contract using the `update(string)void` ABI method.
       *
       * Active upgrades consume a voted transaction-group commitment, including exact program bytes and version.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(GuildParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Guild smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Guild smart contract using the `consensusConfigurationMbr(byte[])uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the MBR required by the paired consensus implementation for an opaque draft configuration.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    consensusConfigurationMbr: (params) => {
      return this.appClient.params.call(GuildParamsFactory.consensusConfigurationMbr(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `configureConsensus(pay,byte[])void` ABI method.
     *
     * Forward opaque draft configuration to the paired consensus implementation.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    configureConsensus: (params) => {
      return this.appClient.params.call(GuildParamsFactory.configureConsensus(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setup(string,byte[32])uint64` ABI method.
     *
     * Create the Guild's ARC-58 wallet through its configured wallet factory.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setup: (params) => {
      return this.appClient.params.call(GuildParamsFactory.setup(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setProposalSettings(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * Update one action class's proposal settings while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setProposalSettings: (params) => {
      return this.appClient.params.call(GuildParamsFactory.setProposalSettings(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setConsensusActionSettings(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * Attach proposal settings to one opaque consensus action code while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setConsensusActionSettings: (params) => {
      return this.appClient.params.call(GuildParamsFactory.setConsensusActionSettings(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setProposalActionLimit(uint64)void` ABI method.
     *
     * Update the maximum proposal action count while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setProposalActionLimit: (params) => {
      return this.appClient.params.call(GuildParamsFactory.setProposalActionLimit(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `lockPluginSet()void` ABI method.
     *
     * Permanently prevent this Guild from adding or removing ARC-58 plugins.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    lockPluginSet: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.lockPluginSet(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `partiallyInitialize()void` ABI method.
     *
     * End creator control while allowing consensus to attach the ARC-58 wallet later.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    partiallyInitialize: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.partiallyInitialize(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `initialize()void` ABI method.
     *
     * End creator control and require the Guild's ARC-58 wallet to be configured.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initialize: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.initialize(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64` ABI method.
     *
     * Create a proposal after the paired consensus app verifies proposer power.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.newProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `editProposal(uint64,byte[36],(uint8,byte[])[],byte[])void` ABI method.
     *
     * Edit a draft proposal without adding funding.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    editProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.editProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `editProposalWithPayment(pay,uint64,byte[36],(uint8,byte[])[],byte[])void` ABI method.
     *
     * Edit a draft proposal and fund its increased storage, ballot MBR, or action fees.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    editProposalWithPayment: (params) => {
      return this.appClient.params.call(GuildParamsFactory.editProposalWithPayment(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `deleteProposal(uint64)void` ABI method.
         *
        * Delete a never-submitted draft or any bootstrap proposal as its creator.
    
        Drafts refund the full prepayment; bootstrap proposals, which the Guild funded from
        creator-provided balance, refund the storage they release.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    deleteProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.deleteProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `submitProposal(uint64,byte[])void` ABI method.
     *
     * Move a proposal created under Guild consensus from draft to voting.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    submitProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.submitProposal(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `voteProposal(pay,uint64,uint8,byte[])void` ABI method.
         *
        * Vote through the Guild while its consensus app calculates and stores the result. Voting again changes
        the vote; only a first vote pays for its receipt (see `voteCost`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    voteProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.voteProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `finalizeProposal(uint64)void` ABI method.
     *
     * Resolve the proposal using the result returned by the paired consensus app.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    finalizeProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.finalizeProposal(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `cleanupProposalConsensus(uint64,address[])uint64` ABI method.
         *
        * Reclaim terminal consensus boxes without deleting the historical Guild proposal.
    
        Every listed voter recovers their own vote receipt; the ballot storage returns to the proposer.
        Approved ballots stay until execution or cancellation, since policies read the approving
        ballot while applying consensus actions.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    cleanupProposalConsensus: (params) => {
      return this.appClient.params.call(GuildParamsFactory.cleanupProposalConsensus(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `cancelProposal(uint64)void` ABI method.
         *
        * Abandon an approved proposal that has not executed, refunding its execution reserve.
    
        Approved proposals never expire, and state changes after approval can leave one permanently
        unexecutable; cancellation is the proposer's way to recover the reserve they prepaid.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    cancelProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.cancelProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `executeProposal(uint64)void` ABI method.
     *
     * Execute every action in an approved proposal.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    executeProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.executeProposal(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `sweep()uint64` ABI method.
         *
        * Forward every microALGO that is not the Guild's own storage or a proposer's reserve to the treasury.
    
        Anyone may call this once the Guild is active; in draft only the creator may, since the
        creator funds draft storage from this balance.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    sweep: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.sweep(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setupCost()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the funding required to create the Guild's ARC-58 wallet.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setupCost: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.setupCost(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return proposal cost and the strictest consensus settings among all actions.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalCost: (params) => {
      return this.appClient.params.call(GuildParamsFactory.proposalCost(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return a proposal by ID.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getProposal: (params) => {
      return this.appClient.params.call(GuildParamsFactory.getProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the consensus ballot for a Guild proposal.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getBallot: (params) => {
      return this.appClient.params.call(GuildParamsFactory.getBallot(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `mustGetExecution(byte[32])(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return proposal metadata associated with an ARC-58 execution key.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetExecution: (params) => {
      return this.appClient.params.call(GuildParamsFactory.mustGetExecution(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the settings that govern one opaque consensus action code.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getConsensusActionSettings: (params) => {
      return this.appClient.params.call(GuildParamsFactory.getConsensusActionSettings(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `voteCost(uint64,address)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    voteCost: (params) => {
      return this.appClient.params.call(GuildParamsFactory.voteCost(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `voteMbr()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the minimum-balance payment required to store one vote.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    voteMbr: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.voteMbr(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `sweepable()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the balance sweep() would forward to the treasury right now.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    sweepable: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.sweepable(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `canChangePluginSet()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return whether proposals may still add or remove wallet plugins.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    canChangePluginSet: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.canChangePluginSet(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(GuildParamsFactory.opUp(params));
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
       * Updates an existing instance of the Guild smart contract using the `update(string)void` ABI method.
       *
       * Active upgrades consume a voted transaction-group commitment, including exact program bytes and version.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(GuildParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Guild smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Guild smart contract using the `consensusConfigurationMbr(byte[])uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the MBR required by the paired consensus implementation for an opaque draft configuration.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    consensusConfigurationMbr: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.consensusConfigurationMbr(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `configureConsensus(pay,byte[])void` ABI method.
     *
     * Forward opaque draft configuration to the paired consensus implementation.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    configureConsensus: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.configureConsensus(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setup(string,byte[32])uint64` ABI method.
     *
     * Create the Guild's ARC-58 wallet through its configured wallet factory.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setup: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.setup(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setProposalSettings(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * Update one action class's proposal settings while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setProposalSettings: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.setProposalSettings(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setConsensusActionSettings(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * Attach proposal settings to one opaque consensus action code while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setConsensusActionSettings: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.setConsensusActionSettings(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setProposalActionLimit(uint64)void` ABI method.
     *
     * Update the maximum proposal action count while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setProposalActionLimit: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.setProposalActionLimit(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `lockPluginSet()void` ABI method.
     *
     * Permanently prevent this Guild from adding or removing ARC-58 plugins.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    lockPluginSet: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.lockPluginSet(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `partiallyInitialize()void` ABI method.
     *
     * End creator control while allowing consensus to attach the ARC-58 wallet later.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    partiallyInitialize: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.partiallyInitialize(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `initialize()void` ABI method.
     *
     * End creator control and require the Guild's ARC-58 wallet to be configured.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initialize: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.initialize(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64` ABI method.
     *
     * Create a proposal after the paired consensus app verifies proposer power.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.newProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `editProposal(uint64,byte[36],(uint8,byte[])[],byte[])void` ABI method.
     *
     * Edit a draft proposal without adding funding.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    editProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.editProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `editProposalWithPayment(pay,uint64,byte[36],(uint8,byte[])[],byte[])void` ABI method.
     *
     * Edit a draft proposal and fund its increased storage, ballot MBR, or action fees.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    editProposalWithPayment: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.editProposalWithPayment(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `deleteProposal(uint64)void` ABI method.
         *
        * Delete a never-submitted draft or any bootstrap proposal as its creator.
    
        Drafts refund the full prepayment; bootstrap proposals, which the Guild funded from
        creator-provided balance, refund the storage they release.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    deleteProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.deleteProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `submitProposal(uint64,byte[])void` ABI method.
     *
     * Move a proposal created under Guild consensus from draft to voting.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    submitProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.submitProposal(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `voteProposal(pay,uint64,uint8,byte[])void` ABI method.
         *
        * Vote through the Guild while its consensus app calculates and stores the result. Voting again changes
        the vote; only a first vote pays for its receipt (see `voteCost`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    voteProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.voteProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `finalizeProposal(uint64)void` ABI method.
     *
     * Resolve the proposal using the result returned by the paired consensus app.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    finalizeProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.finalizeProposal(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `cleanupProposalConsensus(uint64,address[])uint64` ABI method.
         *
        * Reclaim terminal consensus boxes without deleting the historical Guild proposal.
    
        Every listed voter recovers their own vote receipt; the ballot storage returns to the proposer.
        Approved ballots stay until execution or cancellation, since policies read the approving
        ballot while applying consensus actions.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    cleanupProposalConsensus: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.cleanupProposalConsensus(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `cancelProposal(uint64)void` ABI method.
         *
        * Abandon an approved proposal that has not executed, refunding its execution reserve.
    
        Approved proposals never expire, and state changes after approval can leave one permanently
        unexecutable; cancellation is the proposer's way to recover the reserve they prepaid.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    cancelProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.cancelProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `executeProposal(uint64)void` ABI method.
     *
     * Execute every action in an approved proposal.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    executeProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.executeProposal(params));
    },
    /**
         * Makes a call to the Guild smart contract using the `sweep()uint64` ABI method.
         *
        * Forward every microALGO that is not the Guild's own storage or a proposer's reserve to the treasury.
    
        Anyone may call this once the Guild is active; in draft only the creator may, since the
        creator funds draft storage from this balance.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    sweep: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.sweep(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `setupCost()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the funding required to create the Guild's ARC-58 wallet.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setupCost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.setupCost(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return proposal cost and the strictest consensus settings among all actions.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalCost: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.proposalCost(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return a proposal by ID.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getProposal: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.getProposal(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the consensus ballot for a Guild proposal.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getBallot: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.getBallot(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `mustGetExecution(byte[32])(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return proposal metadata associated with an ARC-58 execution key.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetExecution: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.mustGetExecution(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the settings that govern one opaque consensus action code.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getConsensusActionSettings: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.getConsensusActionSettings(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `voteCost(uint64,address)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    voteCost: (params) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.voteCost(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `voteMbr()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the minimum-balance payment required to store one vote.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    voteMbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.voteMbr(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `sweepable()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the balance sweep() would forward to the treasury right now.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    sweepable: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.sweepable(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `canChangePluginSet()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return whether proposals may still add or remove wallet plugins.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    canChangePluginSet: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.canChangePluginSet(params));
    },
    /**
     * Makes a call to the Guild smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildParamsFactory.opUp(params));
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
       * Updates an existing instance of the Guild smart contract using the `update(string)void` ABI method.
       *
       * Active upgrades consume a voted transaction-group commitment, including exact program bytes and version.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(GuildParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Guild smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Guild smart contract using the `consensusConfigurationMbr(byte[])uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the MBR required by the paired consensus implementation for an opaque draft configuration.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    consensusConfigurationMbr: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.consensusConfigurationMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `configureConsensus(pay,byte[])void` ABI method.
     *
     * Forward opaque draft configuration to the paired consensus implementation.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    configureConsensus: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.configureConsensus(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `setup(string,byte[32])uint64` ABI method.
     *
     * Create the Guild's ARC-58 wallet through its configured wallet factory.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setup: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.setup(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `setProposalSettings(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * Update one action class's proposal settings while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setProposalSettings: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.setProposalSettings(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `setConsensusActionSettings(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * Attach proposal settings to one opaque consensus action code while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setConsensusActionSettings: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.setConsensusActionSettings(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `setProposalActionLimit(uint64)void` ABI method.
     *
     * Update the maximum proposal action count while the Guild remains in draft.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setProposalActionLimit: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.setProposalActionLimit(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `lockPluginSet()void` ABI method.
     *
     * Permanently prevent this Guild from adding or removing ARC-58 plugins.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    lockPluginSet: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.lockPluginSet(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `partiallyInitialize()void` ABI method.
     *
     * End creator control while allowing consensus to attach the ARC-58 wallet later.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    partiallyInitialize: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.partiallyInitialize(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `initialize()void` ABI method.
     *
     * End creator control and require the Guild's ARC-58 wallet to be configured.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initialize: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.initialize(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64` ABI method.
     *
     * Create a proposal after the paired consensus app verifies proposer power.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.newProposal(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `editProposal(uint64,byte[36],(uint8,byte[])[],byte[])void` ABI method.
     *
     * Edit a draft proposal without adding funding.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    editProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.editProposal(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `editProposalWithPayment(pay,uint64,byte[36],(uint8,byte[])[],byte[])void` ABI method.
     *
     * Edit a draft proposal and fund its increased storage, ballot MBR, or action fees.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    editProposalWithPayment: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.editProposalWithPayment(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Guild smart contract using the `deleteProposal(uint64)void` ABI method.
         *
        * Delete a never-submitted draft or any bootstrap proposal as its creator.
    
        Drafts refund the full prepayment; bootstrap proposals, which the Guild funded from
        creator-provided balance, refund the storage they release.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    deleteProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.deleteProposal(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `submitProposal(uint64,byte[])void` ABI method.
     *
     * Move a proposal created under Guild consensus from draft to voting.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    submitProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.submitProposal(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Guild smart contract using the `voteProposal(pay,uint64,uint8,byte[])void` ABI method.
         *
        * Vote through the Guild while its consensus app calculates and stores the result. Voting again changes
        the vote; only a first vote pays for its receipt (see `voteCost`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    voteProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.voteProposal(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `finalizeProposal(uint64)void` ABI method.
     *
     * Resolve the proposal using the result returned by the paired consensus app.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    finalizeProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.finalizeProposal(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Guild smart contract using the `cleanupProposalConsensus(uint64,address[])uint64` ABI method.
         *
        * Reclaim terminal consensus boxes without deleting the historical Guild proposal.
    
        Every listed voter recovers their own vote receipt; the ballot storage returns to the proposer.
        Approved ballots stay until execution or cancellation, since policies read the approving
        ballot while applying consensus actions.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    cleanupProposalConsensus: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.cleanupProposalConsensus(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Guild smart contract using the `cancelProposal(uint64)void` ABI method.
         *
        * Abandon an approved proposal that has not executed, refunding its execution reserve.
    
        Approved proposals never expire, and state changes after approval can leave one permanently
        unexecutable; cancellation is the proposer's way to recover the reserve they prepaid.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    cancelProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.cancelProposal(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `executeProposal(uint64)void` ABI method.
     *
     * Execute every action in an approved proposal.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    executeProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.executeProposal(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Guild smart contract using the `sweep()uint64` ABI method.
         *
        * Forward every microALGO that is not the Guild's own storage or a proposer's reserve to the treasury.
    
        Anyone may call this once the Guild is active; in draft only the creator may, since the
        creator funds draft storage from this balance.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    sweep: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.sweep(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `setupCost()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the funding required to create the Guild's ARC-58 wallet.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setupCost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.setupCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return proposal cost and the strictest consensus settings among all actions.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalCost: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.proposalCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return a proposal by ID.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getProposal: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.getProposal(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the consensus ballot for a Guild proposal.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getBallot: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.getBallot(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `mustGetExecution(byte[32])(uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return proposal metadata associated with an ARC-58 execution key.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetExecution: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.mustGetExecution(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the settings that govern one opaque consensus action code.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getConsensusActionSettings: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.getConsensusActionSettings(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `voteCost(uint64,address)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    voteCost: async (params) => {
      const result = await this.appClient.send.call(GuildParamsFactory.voteCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `voteMbr()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the minimum-balance payment required to store one vote.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    voteMbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.voteMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `sweepable()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return the balance sweep() would forward to the treasury right now.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    sweepable: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.sweepable(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `canChangePluginSet()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Return whether proposals may still add or remove wallet plugins.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    canChangePluginSet: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.canChangePluginSet(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Guild smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildParamsFactory.opUp(params));
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
    return new _GuildClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `consensusConfigurationMbr(byte[])uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return the MBR required by the paired consensus implementation for an opaque draft configuration.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async consensusConfigurationMbr(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.consensusConfigurationMbr(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `setupCost()uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return the funding required to create the Guild's ARC-58 wallet.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async setupCost(params = { args: [] }) {
    const result = await this.appClient.send.call(GuildParamsFactory.setupCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return proposal cost and the strictest consensus settings among all actions.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalCost(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.proposalCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return a proposal by ID.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getProposal(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.getProposal(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return the consensus ballot for a Guild proposal.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getBallot(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.getBallot(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `mustGetExecution(byte[32])(uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return proposal metadata associated with an ARC-58 execution key.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetExecution(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.mustGetExecution(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return the settings that govern one opaque consensus action code.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getConsensusActionSettings(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.getConsensusActionSettings(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `voteCost(uint64,address)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async voteCost(params) {
    const result = await this.appClient.send.call(GuildParamsFactory.voteCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `voteMbr()uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return the minimum-balance payment required to store one vote.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async voteMbr(params = { args: [] }) {
    const result = await this.appClient.send.call(GuildParamsFactory.voteMbr(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `sweepable()uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return the balance sweep() would forward to the treasury right now.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async sweepable(params = { args: [] }) {
    const result = await this.appClient.send.call(GuildParamsFactory.sweepable(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Guild smart contract using the `canChangePluginSet()bool` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Return whether proposals may still add or remove wallet plugins.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async canChangePluginSet(params = { args: [] }) {
    const result = await this.appClient.send.call(GuildParamsFactory.canChangePluginSet(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Guild app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current Guild app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          state: result.state,
          consensus: result.consensus,
          version: result.version,
          creator: result.creator,
          wallet: result.wallet,
          walletFactory: result.walletFactory,
          proposalActionLimit: result.proposalActionLimit,
          proposalId: result.proposalID,
          pluginSetLocked: result.pluginSetLocked,
          reserved: result.reserved,
          upgradeAppProposalSettings: result.upgradeAppProposalSettings,
          addPluginProposalSettings: result.addPluginProposalSettings,
          removeExecutionProposalSettings: result.removeExecutionProposalSettings,
          removePluginProposalSettings: result.removePluginProposalSettings,
          addAllowancesProposalSettings: result.addAllowancesProposalSettings,
          removeAllowancesProposalSettings: result.removeAllowancesProposalSettings,
          newEscrowProposalSettings: result.newEscrowProposalSettings,
          toggleEscrowLockProposalSettings: result.toggleEscrowLockProposalSettings,
          updateGuildProposalSettings: result.updateGuildProposalSettings
        };
      },
      /**
       * Get the current value of the state key in global state
       */
      state: async () => {
        return await this.appClient.state.global.getValue("state");
      },
      /**
       * Get the current value of the consensus key in global state
       */
      consensus: async () => {
        return await this.appClient.state.global.getValue("consensus");
      },
      /**
       * Get the current value of the version key in global state
       */
      version: async () => {
        return await this.appClient.state.global.getValue("version");
      },
      /**
       * Get the current value of the creator key in global state
       */
      creator: async () => {
        return await this.appClient.state.global.getValue("creator");
      },
      /**
       * Get the current value of the wallet key in global state
       */
      wallet: async () => {
        return await this.appClient.state.global.getValue("wallet");
      },
      /**
       * Get the current value of the walletFactory key in global state
       */
      walletFactory: async () => {
        return await this.appClient.state.global.getValue("walletFactory");
      },
      /**
       * Get the current value of the proposalActionLimit key in global state
       */
      proposalActionLimit: async () => {
        return await this.appClient.state.global.getValue("proposalActionLimit");
      },
      /**
       * Get the current value of the proposalID key in global state
       */
      proposalId: async () => {
        return await this.appClient.state.global.getValue("proposalID");
      },
      /**
       * Get the current value of the pluginSetLocked key in global state
       */
      pluginSetLocked: async () => {
        return await this.appClient.state.global.getValue("pluginSetLocked");
      },
      /**
       * Get the current value of the reserved key in global state
       */
      reserved: async () => {
        return await this.appClient.state.global.getValue("reserved");
      },
      /**
       * Get the current value of the upgradeAppProposalSettings key in global state
       */
      upgradeAppProposalSettings: async () => {
        return await this.appClient.state.global.getValue("upgradeAppProposalSettings");
      },
      /**
       * Get the current value of the addPluginProposalSettings key in global state
       */
      addPluginProposalSettings: async () => {
        return await this.appClient.state.global.getValue("addPluginProposalSettings");
      },
      /**
       * Get the current value of the removeExecutionProposalSettings key in global state
       */
      removeExecutionProposalSettings: async () => {
        return await this.appClient.state.global.getValue("removeExecutionProposalSettings");
      },
      /**
       * Get the current value of the removePluginProposalSettings key in global state
       */
      removePluginProposalSettings: async () => {
        return await this.appClient.state.global.getValue("removePluginProposalSettings");
      },
      /**
       * Get the current value of the addAllowancesProposalSettings key in global state
       */
      addAllowancesProposalSettings: async () => {
        return await this.appClient.state.global.getValue("addAllowancesProposalSettings");
      },
      /**
       * Get the current value of the removeAllowancesProposalSettings key in global state
       */
      removeAllowancesProposalSettings: async () => {
        return await this.appClient.state.global.getValue("removeAllowancesProposalSettings");
      },
      /**
       * Get the current value of the newEscrowProposalSettings key in global state
       */
      newEscrowProposalSettings: async () => {
        return await this.appClient.state.global.getValue("newEscrowProposalSettings");
      },
      /**
       * Get the current value of the toggleEscrowLockProposalSettings key in global state
       */
      toggleEscrowLockProposalSettings: async () => {
        return await this.appClient.state.global.getValue("toggleEscrowLockProposalSettings");
      },
      /**
       * Get the current value of the updateGuildProposalSettings key in global state
       */
      updateGuildProposalSettings: async () => {
        return await this.appClient.state.global.getValue("updateGuildProposalSettings");
      }
    },
    /**
     * Methods to access box state for the current Guild app
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
       * Get values from the plugins map in box state
       */
      plugins: {
        /**
         * Get all current values of the plugins map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("plugins");
        },
        /**
         * Get a current value of the plugins map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("plugins", key);
        }
      },
      /**
       * Get values from the proposals map in box state
       */
      proposals: {
        /**
         * Get all current values of the proposals map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("proposals");
        },
        /**
         * Get a current value of the proposals map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("proposals", key);
        }
      },
      /**
       * Get values from the executions map in box state
       */
      executions: {
        /**
         * Get all current values of the executions map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("executions");
        },
        /**
         * Get a current value of the executions map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("executions", key);
        }
      },
      /**
       * Get values from the consensusActions map in box state
       */
      consensusActions: {
        /**
         * Get all current values of the consensusActions map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("consensusActions");
        },
        /**
         * Get a current value of the consensusActions map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("consensusActions", key);
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
       * Add a consensusConfigurationMbr(byte[])uint64 method call against the Guild contract
       */
      consensusConfigurationMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.consensusConfigurationMbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("consensusConfigurationMbr(byte[])uint64", v));
        return this;
      },
      /**
       * Add a configureConsensus(pay,byte[])void method call against the Guild contract
       */
      configureConsensus(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.configureConsensus(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setup(string,byte[32])uint64 method call against the Guild contract
       */
      setup(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setup(params)));
        resultMappers.push((v) => client.decodeReturnValue("setup(string,byte[32])uint64", v));
        return this;
      },
      /**
       * Add a setProposalSettings(uint8,(uint64,uint64,uint64,uint64,uint64,uint64))void method call against the Guild contract
       */
      setProposalSettings(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setProposalSettings(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setConsensusActionSettings(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))void method call against the Guild contract
       */
      setConsensusActionSettings(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setConsensusActionSettings(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setProposalActionLimit(uint64)void method call against the Guild contract
       */
      setProposalActionLimit(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setProposalActionLimit(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a lockPluginSet()void method call against the Guild contract
       */
      lockPluginSet(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.lockPluginSet(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a partiallyInitialize()void method call against the Guild contract
       */
      partiallyInitialize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.partiallyInitialize(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a initialize()void method call against the Guild contract
       */
      initialize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initialize(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64 method call against the Guild contract
       */
      newProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newProposal(params)));
        resultMappers.push((v) => client.decodeReturnValue("newProposal(pay,byte[36],(uint8,byte[])[],byte[])uint64", v));
        return this;
      },
      /**
       * Add a editProposal(uint64,byte[36],(uint8,byte[])[],byte[])void method call against the Guild contract
       */
      editProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a editProposalWithPayment(pay,uint64,byte[36],(uint8,byte[])[],byte[])void method call against the Guild contract
       */
      editProposalWithPayment(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.editProposalWithPayment(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteProposal(uint64)void method call against the Guild contract
       */
      deleteProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a submitProposal(uint64,byte[])void method call against the Guild contract
       */
      submitProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.submitProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a voteProposal(pay,uint64,uint8,byte[])void method call against the Guild contract
       */
      voteProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.voteProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a finalizeProposal(uint64)void method call against the Guild contract
       */
      finalizeProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.finalizeProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a cleanupProposalConsensus(uint64,address[])uint64 method call against the Guild contract
       */
      cleanupProposalConsensus(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cleanupProposalConsensus(params)));
        resultMappers.push((v) => client.decodeReturnValue("cleanupProposalConsensus(uint64,address[])uint64", v));
        return this;
      },
      /**
       * Add a cancelProposal(uint64)void method call against the Guild contract
       */
      cancelProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cancelProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a executeProposal(uint64)void method call against the Guild contract
       */
      executeProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.executeProposal(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a sweep()uint64 method call against the Guild contract
       */
      sweep(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.sweep(params)));
        resultMappers.push((v) => client.decodeReturnValue("sweep()uint64", v));
        return this;
      },
      /**
       * Add a setupCost()uint64 method call against the Guild contract
       */
      setupCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setupCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("setupCost()uint64", v));
        return this;
      },
      /**
       * Add a proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the Guild contract
       */
      proposalCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalCost((uint8,byte[])[])(uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[]) method call against the Guild contract
       */
      getProposal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getProposal(params)));
        resultMappers.push((v) => client.decodeReturnValue("getProposal(uint64)(uint8,byte[36],address,uint64,uint64,uint64,(uint8,byte[])[])", v));
        return this;
      },
      /**
       * Add a getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64)) method call against the Guild contract
       */
      getBallot(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getBallot(params)));
        resultMappers.push((v) => client.decodeReturnValue("getBallot(uint64)(bool,bool,uint64,uint64,uint64,(uint64,uint64,uint64),(uint64,uint64,uint64))", v));
        return this;
      },
      /**
       * Add a mustGetExecution(byte[32])(uint64,uint64) method call against the Guild contract
       */
      mustGetExecution(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetExecution(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetExecution(byte[32])(uint64,uint64)", v));
        return this;
      },
      /**
       * Add a getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64) method call against the Guild contract
       */
      getConsensusActionSettings(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getConsensusActionSettings(params)));
        resultMappers.push((v) => client.decodeReturnValue("getConsensusActionSettings(uint64)(uint64,uint64,uint64,uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a voteCost(uint64,address)uint64 method call against the Guild contract
       */
      voteCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.voteCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("voteCost(uint64,address)uint64", v));
        return this;
      },
      /**
       * Add a voteMbr()uint64 method call against the Guild contract
       */
      voteMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.voteMbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("voteMbr()uint64", v));
        return this;
      },
      /**
       * Add a sweepable()uint64 method call against the Guild contract
       */
      sweepable(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.sweepable(params)));
        resultMappers.push((v) => client.decodeReturnValue("sweepable()uint64", v));
        return this;
      },
      /**
       * Add a canChangePluginSet()bool method call against the Guild contract
       */
      canChangePluginSet(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.canChangePluginSet(params)));
        resultMappers.push((v) => client.decodeReturnValue("canChangePluginSet()bool", v));
        return this;
      },
      /**
       * Add a opUp()void method call against the Guild contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
      /**
       * Add a clear state call to the Guild contract
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

// src/generated/GuildFactoryClient.ts





var APP_SPEC2 = { "name": "GuildFactory", "structs": { "GuildBaseConfig": [{ "name": "proposalActionLimit", "type": "uint64" }, { "name": "proposalSettings", "type": "GuildProposalSettingsConfig" }], "GuildDeployment": [{ "name": "guild", "type": "uint64" }, { "name": "consensus", "type": "uint64" }], "GuildProposalSettings": [{ "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "minimumApprovals", "type": "uint64" }], "GuildProposalSettingsConfig": [{ "name": "upgradeApp", "type": "GuildProposalSettings" }, { "name": "addPlugin", "type": "GuildProposalSettings" }, { "name": "removeExecution", "type": "GuildProposalSettings" }, { "name": "removePlugin", "type": "GuildProposalSettings" }, { "name": "addAllowances", "type": "GuildProposalSettings" }, { "name": "removeAllowances", "type": "GuildProposalSettings" }, { "name": "newEscrow", "type": "GuildProposalSettings" }, { "name": "toggleEscrowLock", "type": "GuildProposalSettings" }, { "name": "updateGuild", "type": "GuildProposalSettings" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "initProgram", "args": [{ "type": "pay", "name": "mbrPayment" }, { "type": "string", "name": "programName" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }, { "type": "uint64", "name": "consensusFactory" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateGuild", "args": [{ "type": "uint64", "name": "guild" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Push the registered kernel onto a draft Guild; only that Guild's creator may trigger it.", "events": [], "recommendations": {} }, { "name": "newGuild", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "consensusName" }, { "type": "(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64)))", "struct": "GuildBaseConfig", "name": "baseConfig" }, { "type": "byte[]", "name": "governanceConfig" }], "returns": { "type": "(uint64,uint64)", "struct": "GuildDeployment" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Both factories participate in one atomic deployment; no returned pair is left unbound.\n\nLike the Akita DAO, every Guild creates its treasury wallet through the DAO's wallet factory,\nso the creator cannot substitute a factory or wallet of their own.", "events": [], "recommendations": {} }, { "name": "guildCreateFee", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "cost", "args": [{ "type": "string", "name": "consensusName" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "loadProgram", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Load only the exact chunk authorized by the preceding initProgram transaction.", "events": [], "recommendations": {} }, { "name": "programMbr", "args": [{ "type": "string", "name": "programName" }, { "type": "uint64", "name": "size" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "programFunding", "args": [{ "type": "string", "name": "programName" }, { "type": "uint64", "name": "size" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "desc": "Creates only Guild kernels; policy programs are owned by the separate consensus factory.", "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==" }, "consensusFactory": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y29uc2Vuc3VzX2ZhY3Rvcnk=" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "programs": { "keyType": "AVMString", "valueType": "AVMBytes", "prefix": "cA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1565, 1934, 1945, 2010], "errorMessage": "Box must have value" }, { "pc": [1184, 1851], "errorMessage": "Bytes has valid prefix" }, { "pc": [1918], "errorMessage": "ERR:errCnst" }, { "pc": [910], "errorMessage": "ERR:errGcrt" }, { "pc": [440, 777, 1085, 1577], "errorMessage": "ERR:errGfcf" }, { "pc": [1800], "errorMessage": "ERR:errGfgf" }, { "pc": [474, 1123], "errorMessage": "ERR:errGfpy" }, { "pc": [371, 1882], "errorMessage": "ERR:errGfty" }, { "pc": [748], "errorMessage": "ERR:errGfvr" }, { "pc": [499, 626, 1469, 1485, 1545], "errorMessage": "ERR:errIcor" }, { "pc": [1726], "errorMessage": "ERR:errIupg" }, { "pc": [405, 848, 1692, 1761], "errorMessage": "ERR:errNdao" }, { "pc": [396, 841, 1133, 1306, 1359, 1685, 1754], "errorMessage": "application exists" }, { "pc": [389, 410, 834, 916, 1063, 1129, 1200, 1354, 1678, 1696, 1747, 1770, 1822], "errorMessage": "check GlobalState exists" }, { "pc": [337, 665, 714, 823, 1010, 1041, 1397, 1448, 1592, 1627, 1662], "errorMessage": "invalid array length header" }, { "pc": [1189], "errorMessage": "invalid number of bytes for application" }, { "pc": [344, 672, 1017, 1047, 1404, 1455, 1599, 1634, 1669], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [356, 684, 727, 862, 1440, 1610, 1645, 1740], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1032], "errorMessage": "invalid number of bytes for smart_contracts/arc58/guilds/core/types.ts::GuildBaseConfig" }, { "pc": [719, 828], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1856], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [703, 815], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [698, 810], "errorMessage": "invalid tuple encoding" }, { "pc": [331, 1003], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9hcmM0L2luZGV4LmQudHM6OkNvbnRyYWN0LmFwcHJvdmFsUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgMiA4IDIwMDAgNDA5NiAyMzQyMDAwCiAgICBieXRlY2Jsb2NrICJndWlsZCIgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAiIiAicCIgIkVSUjplcnJJY29yIiAid2FsbGV0IiAiRVJSOmVyck5kYW8iICJFUlI6ZXJyR2ZjZiIgInZlcnNpb24iICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAiYWtpdGFfZXNjcm93IiAiY29uc2Vuc3VzX2ZhY3RvcnkiIDB4ZWE5MTgwZGQgMHgwMzY0NGVjZiAweDQ4N2M0ZDRlIDB4NzEwOTZkMjUgIkVSUjplcnJHZnR5IiAiRVJSOmVyckdmcHkiIGJhc2U2NChEWUVCUXc9PSkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjMwLTMxCiAgICAvLyBAY29udHJhY3QoeyBhdm1WZXJzaW9uOiAxMywgc3RhdGVUb3RhbHM6IHsgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLCBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMgfSB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEd1aWxkRmFjdG9yeSBleHRlbmRzIEd1aWxkUHJvZ3JhbVJlZ2lzdHJ5IHsKICAgIGJ5dGVjIDEzIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVAMgoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czozMC0zMQogICAgLy8gQGNvbnRyYWN0KHsgYXZtVmVyc2lvbjogMTMsIHN0YXRlVG90YWxzOiB7IGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzIH0gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBHdWlsZEZhY3RvcnkgZXh0ZW5kcyBHdWlsZFByb2dyYW1SZWdpc3RyeSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE3CiAgICBieXRlYyAxNCAvLyBtZXRob2QgImluaXRQcm9ncmFtKHBheSxzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4YWU4NGNiZDggMHhhYTA4YmUxYSAweGVkMmIzZmJhIDB4M2RjNjFhMDMgLy8gbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlR3VpbGQodWludDY0KXZvaWQiLCBtZXRob2QgIm5ld0d1aWxkKHBheSxzdHJpbmcsKHVpbnQ2NCwoKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkpKSxieXRlW10pKHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJndWlsZENyZWF0ZUZlZSgpdWludDY0IgogICAgYnl0ZWMgMTUgLy8gbWV0aG9kICJjb3N0KHN0cmluZyl1aW50NjQiCiAgICBieXRlYyAxNiAvLyBtZXRob2QgImxvYWRQcm9ncmFtKHVpbnQ2NCxieXRlW10pdm9pZCIKICAgIHB1c2hieXRlc3MgMHgzYmEyNGIwMSAweDJkZDI0ZWIzIDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgInByb2dyYW1NYnIoc3RyaW5nLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInByb2dyYW1GdW5kaW5nKHN0cmluZyx1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGluaXRQcm9ncmFtIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUd1aWxkIG5ld0d1aWxkIGd1aWxkQ3JlYXRlRmVlIGNvc3QgbG9hZFByb2dyYW0gcHJvZ3JhbU1iciBwcm9ncmFtRnVuZGluZyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTUKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MzAtMzEKICAgIC8vIEBjb250cmFjdCh7IGF2bVZlcnNpb246IDEzLCBzdGF0ZVRvdGFsczogeyBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cyB9IH0pCiAgICAvLyBleHBvcnQgY2xhc3MgR3VpbGRGYWN0b3J5IGV4dGVuZHMgR3VpbGRQcm9ncmFtUmVnaXN0cnkgewogICAgcHVzaGJ5dGVzIDB4OWQ1ZjUzM2MgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCksdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo6R3VpbGRGYWN0b3J5LmluaXRQcm9ncmFtW3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdFByb2dyYW06CiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBpbml0UHJvZ3JhbShtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHByb2dyYW1OYW1lOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo0MgogICAgLy8gdGhpcy52YWxpZGF0ZVByb2dyYW1OYW1lKG5hbWUpCiAgICBkdXAKICAgIGNhbGxzdWIgdmFsaWRhdGVQcm9ncmFtTmFtZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIGxvZ2dlZEFzc2VydChuYW1lID09PSBHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIGVyckd1aWxkRmFjdG9yeUludmFsaWRUeXBlKQogICAgYnl0ZWNfMCAvLyAiZ3VpbGQiCiAgICA9PQogICAgYm56IGluaXRQcm9ncmFtX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNyAvLyAiRVJSOmVyckdmdHkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2Z0eQoKaW5pdFByb2dyYW1fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo0NQogICAgLy8gVHhuLnNlbmRlciA9PT0gKHRoaXMucHJvZ3JhbXMobmFtZSkuZXhpc3RzID8gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MgOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MpLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MjIKICAgIC8vIHByb2dyYW1zID0gQm94TWFwPHN0cmluZywgYnl0ZXM+KHsga2V5UHJlZml4OiBHdWlsZEZhY3RvcnlCb3hQcmVmaXhQcm9ncmFtcyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIFR4bi5zZW5kZXIgPT09ICh0aGlzLnByb2dyYW1zKG5hbWUpLmV4aXN0cyA/IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzIDogR2xvYmFsLmNyZWF0b3JBZGRyZXNzKSwKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogaW5pdFByb2dyYW1fdGVybmFyeV9mYWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIFR4bi5zZW5kZXIgPT09ICh0aGlzLnByb2dyYW1zKG5hbWUpLmV4aXN0cyA/IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzIDogR2xvYmFsLmNyZWF0b3JBZGRyZXNzKSwKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKCmluaXRQcm9ncmFtX3Rlcm5hcnlfbWVyZ2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBUeG4uc2VuZGVyID09PSAodGhpcy5wcm9ncmFtcyhuYW1lKS5leGlzdHMgPyB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcyA6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyksCiAgICB1bmNvdmVyIDIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo0NC00NwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBUeG4uc2VuZGVyID09PSAodGhpcy5wcm9ncmFtcyhuYW1lKS5leGlzdHMgPyB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcyA6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyksCiAgICAvLyAgIGVyck5vdEFraXRhRGFvLAogICAgLy8gKQogICAgYm56IGluaXRQcm9ncmFtX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgppbml0UHJvZ3JhbV9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjQ4CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gdGhpcy52ZXJzaW9uLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NDgKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB0aGlzLnZlcnNpb24udmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDEwIC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NDgKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB0aGlzLnZlcnNpb24udmFsdWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo1MwogICAgLy8gdGhpcy52YWxpZGF0ZVByb2dyYW1OYW1lKHByb2dyYW1OYW1lKQogICAgZGlnIDEKICAgIGNhbGxzdWIgdmFsaWRhdGVQcm9ncmFtTmFtZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NTQKICAgIC8vIGxvZ2dlZEFzc2VydChzaXplID4gMCAmJiBzaXplIDw9IE1BWF9HVUlMRF9BUFBST1ZBTF9QUk9HUkFNX1NJWkUsIGVyckd1aWxkRmFjdG9yeUludmFsaWRDb25maWcpCiAgICBkaWcgMgogICAgYnogaW5pdFByb2dyYW1fYm9vbF9mYWxzZUAxMgogICAgZGlnIDIKICAgIHB1c2hpbnQgMTYzNzIKICAgIDw9CiAgICBieiBpbml0UHJvZ3JhbV9ib29sX2ZhbHNlQDEyCiAgICBpbnRjXzEgLy8gMQoKaW5pdFByb2dyYW1fYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjU0CiAgICAvLyBsb2dnZWRBc3NlcnQoc2l6ZSA+IDAgJiYgc2l6ZSA8PSBNQVhfR1VJTERfQVBQUk9WQUxfUFJPR1JBTV9TSVpFLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkQ29uZmlnKQogICAgYm56IGluaXRQcm9ncmFtX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckdmY2YiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2ZjZgoKaW5pdFByb2dyYW1fYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NTUtNTkKICAgIC8vIGxvZ2dlZEFzc2VydChtYXRjaChtYnJQYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHRoaXMucHJvZ3JhbUZ1bmRpbmcocHJvZ3JhbU5hbWUsIHNpemUpLAogICAgLy8gfSksIGVyckd1aWxkRmFjdG9yeUludmFsaWRQYXltZW50KQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NTYKICAgIC8vIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjU1LTU5CiAgICAvLyBsb2dnZWRBc3NlcnQobWF0Y2gobWJyUGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB0aGlzLnByb2dyYW1GdW5kaW5nKHByb2dyYW1OYW1lLCBzaXplKSwKICAgIC8vIH0pLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkUGF5bWVudCkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjU3CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NTUtNTkKICAgIC8vIGxvZ2dlZEFzc2VydChtYXRjaChtYnJQYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHRoaXMucHJvZ3JhbUZ1bmRpbmcocHJvZ3JhbU5hbWUsIHNpemUpLAogICAgLy8gfSksIGVyckd1aWxkRmFjdG9yeUludmFsaWRQYXltZW50KQogICAgPT0KICAgICYmCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjU4CiAgICAvLyBhbW91bnQ6IHRoaXMucHJvZ3JhbUZ1bmRpbmcocHJvZ3JhbU5hbWUsIHNpemUpLAogICAgdW5jb3ZlciAzCiAgICBkaWcgNAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo6R3VpbGRQcm9ncmFtUmVnaXN0cnkucHJvZ3JhbUZ1bmRpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjU1LTU5CiAgICAvLyBsb2dnZWRBc3NlcnQobWF0Y2gobWJyUGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB0aGlzLnByb2dyYW1GdW5kaW5nKHByb2dyYW1OYW1lLCBzaXplKSwKICAgIC8vIH0pLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkUGF5bWVudCkKICAgID09CiAgICAmJgogICAgYm56IGluaXRQcm9ncmFtX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgMTggLy8gIkVSUjplcnJHZnB5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdmcHkKCmluaXRQcm9ncmFtX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjYxCiAgICAvLyBjb25zdCBjaHVua3M6IHVpbnQ2NCA9IChzaXplICsgUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSAtIDEpIC8gUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRQogICAgZGlnIDEKICAgIGludGMgNCAvLyAyMDAwCiAgICArCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaW50YyA0IC8vIDIwMDAKICAgIC8KICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5ncm91cEluZGV4ICsgY2h1bmtzIDwgR2xvYmFsLmdyb3VwU2l6ZSwgZXJySW52YWxpZENhbGxPcmRlcikKICAgIHR4biBHcm91cEluZGV4CiAgICArCiAgICBnbG9iYWwgR3JvdXBTaXplCiAgICA8CiAgICBibnogaW5pdFByb2dyYW1fYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySWNvciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY29yCgppbml0UHJvZ3JhbV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGNodW5rczsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKaW5pdFByb2dyYW1fd2hpbGVfdG9wQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NjMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBjaHVua3M7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogaW5pdFByb2dyYW1fYWZ0ZXJfd2hpbGVAMzQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjY0CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4ICsgaSArIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgKwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2NQogICAgLy8gY29uc3QgcmVtYWluaW5nOiB1aW50NjQgPSBzaXplIC0gaSAqIFBST0dSQU1fVVBMT0FEX0NIVU5LX1NJWkUKICAgIGludGMgNCAvLyAyMDAwCiAgICAqCiAgICBkdXAKICAgIGJ1cnkgNwogICAgZGlnIDQKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjY2CiAgICAvLyBjb25zdCBjaHVua1NpemU6IHVpbnQ2NCA9IHJlbWFpbmluZyA+IFBST0dSQU1fVVBMT0FEX0NIVU5LX1NJWkUgPyBQUk9HUkFNX1VQTE9BRF9DSFVOS19TSVpFIDogcmVtYWluaW5nCiAgICBkdXAKICAgIGludGMgNCAvLyAyMDAwCiAgICA+CiAgICBpbnRjIDQgLy8gMjAwMAogICAgc3dhcAogICAgc2VsZWN0CiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjY4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgPT0KICAgIGJ6IGluaXRQcm9ncmFtX2Jvb2xfZmFsc2VAMzAKICAgIGRpZyAzCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICBieiBpbml0UHJvZ3JhbV9ib29sX2ZhbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2OQogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMgJiYKICAgIGRpZyAzCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjY4LTY5CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMgJiYKICAgIGJueiBpbml0UHJvZ3JhbV9ib29sX2ZhbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2OQogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMgJiYKICAgIGRpZyAzCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2OC02OQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyICYmIHR4bi5udW1BcHBBcmdzID09PSAzICYmCiAgICBieiBpbml0UHJvZ3JhbV9ib29sX2ZhbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2OQogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMgJiYKICAgIGRpZyAzCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2OC02OQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyICYmIHR4bi5udW1BcHBBcmdzID09PSAzICYmCiAgICBieiBpbml0UHJvZ3JhbV9ib29sX2ZhbHNlQDMwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo3MAogICAgLy8gdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMubG9hZFByb2dyYW0pICYmIG9wLmJ0b2kodHhuLmFwcEFyZ3MoMSkpID09PSBpICogUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSAmJgogICAgZGlnIDMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMTYgLy8gbWV0aG9kICJsb2FkUHJvZ3JhbSh1aW50NjQsYnl0ZVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NjgtNzAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgLy8gdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMubG9hZFByb2dyYW0pICYmIG9wLmJ0b2kodHhuLmFwcEFyZ3MoMSkpID09PSBpICogUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSAmJgogICAgYnogaW5pdFByb2dyYW1fYm9vbF9mYWxzZUAzMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NzAKICAgIC8vIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmxvYWRQcm9ncmFtKSAmJiBvcC5idG9pKHR4bi5hcHBBcmdzKDEpKSA9PT0gaSAqIFBST0dSQU1fVVBMT0FEX0NIVU5LX1NJWkUgJiYKICAgIGRpZyAzCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGJ0b2kKICAgIGRpZyA1CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NjgtNzAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgLy8gdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMubG9hZFByb2dyYW0pICYmIG9wLmJ0b2kodHhuLmFwcEFyZ3MoMSkpID09PSBpICogUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSAmJgogICAgYnogaW5pdFByb2dyYW1fYm9vbF9mYWxzZUAzMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NzEKICAgIC8vIHR4bi5hcHBBcmdzKDIpLmxlbmd0aCA9PT0gY2h1bmtTaXplICsgMiwKICAgIGRpZyAzCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGxlbgogICAgZGlnIDcKICAgIGludGNfMiAvLyAyCiAgICArCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NjgtNzEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgLy8gdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMubG9hZFByb2dyYW0pICYmIG9wLmJ0b2kodHhuLmFwcEFyZ3MoMSkpID09PSBpICogUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSAmJgogICAgLy8gdHhuLmFwcEFyZ3MoMikubGVuZ3RoID09PSBjaHVua1NpemUgKyAyLAogICAgYnogaW5pdFByb2dyYW1fYm9vbF9mYWxzZUAzMAogICAgaW50Y18xIC8vIDEKCmluaXRQcm9ncmFtX2Jvb2xfbWVyZ2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo2Ny03MwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgLy8gICB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgLy8gICB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5sb2FkUHJvZ3JhbSkgJiYgb3AuYnRvaSh0eG4uYXBwQXJncygxKSkgPT09IGkgKiBQUk9HUkFNX1VQTE9BRF9DSFVOS19TSVpFICYmCiAgICAvLyAgIHR4bi5hcHBBcmdzKDIpLmxlbmd0aCA9PT0gY2h1bmtTaXplICsgMiwKICAgIC8vICAgZXJySW52YWxpZENhbGxPcmRlciwKICAgIC8vICkKICAgIGJueiBpbml0UHJvZ3JhbV9hZnRlcl9hc3NlcnRAMzMKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJJY29yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckljb3IKCmluaXRQcm9ncmFtX2FmdGVyX2Fzc2VydEAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjYzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgY2h1bmtzOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGluaXRQcm9ncmFtX3doaWxlX3RvcEAyMAoKaW5pdFByb2dyYW1fYm9vbF9mYWxzZUAzMDoKICAgIGludGNfMCAvLyAwCiAgICBiIGluaXRQcm9ncmFtX2Jvb2xfbWVyZ2VAMzEKCmluaXRQcm9ncmFtX2FmdGVyX3doaWxlQDM0OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo3NQogICAgLy8gaWYgKHRoaXMucHJvZ3JhbXMocHJvZ3JhbU5hbWUpLmV4aXN0cykgewogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGluaXRQcm9ncmFtX2Vsc2VfYm9keUAzNgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NzYKICAgIC8vIHRoaXMucHJvZ3JhbXMocHJvZ3JhbU5hbWUpLnJlc2l6ZShzaXplKQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQoKaW5pdFByb2dyYW1fYWZ0ZXJfaWZfZWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBpbml0UHJvZ3JhbShtYnJQYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHByb2dyYW1OYW1lOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdFByb2dyYW1fZWxzZV9ib2R5QDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NzgKICAgIC8vIHRoaXMucHJvZ3JhbXMocHJvZ3JhbU5hbWUpLmNyZWF0ZSh7IHNpemUgfSkKICAgIHN3YXAKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgYiBpbml0UHJvZ3JhbV9hZnRlcl9pZl9lbHNlQDM3Cgppbml0UHJvZ3JhbV9ib29sX2ZhbHNlQDEyOgogICAgaW50Y18wIC8vIDAKICAgIGIgaW5pdFByb2dyYW1fYm9vbF9tZXJnZUAxMwoKaW5pdFByb2dyYW1fdGVybmFyeV9mYWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NDUKICAgIC8vIFR4bi5zZW5kZXIgPT09ICh0aGlzLnByb2dyYW1zKG5hbWUpLmV4aXN0cyA/IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzIDogR2xvYmFsLmNyZWF0b3JBZGRyZXNzKSwKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgYiBpbml0UHJvZ3JhbV90ZXJuYXJ5X21lcmdlQDYKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo6R3VpbGRGYWN0b3J5LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHZlcnNpb24gIT09ICcnLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkVmVyc2lvbikKICAgIGJ5dGVjXzMgLy8gIiIKICAgICE9CiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJHZnZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdmdnIKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjczCiAgICAvLyBha2l0YURBTy5pZCA+IDAgJiYgYWtpdGFEQU9Fc2Nyb3cuYXBwLmlkID4gMCAmJiBha2l0YURBT0VzY3Jvdy5uYW1lICE9PSAnJyAmJiBjb25zZW5zdXNGYWN0b3J5LmlkID4gMCwKICAgIGRpZyAyCiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUA4CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUA4CiAgICBkaWcgNAogICAgZXh0cmFjdCAyIDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgICE9CiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUA4CiAgICBkdXAKICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpjcmVhdGVfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NzItNzUKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgYWtpdGFEQU8uaWQgPiAwICYmIGFraXRhREFPRXNjcm93LmFwcC5pZCA+IDAgJiYgYWtpdGFEQU9Fc2Nyb3cubmFtZSAhPT0gJycgJiYgY29uc2Vuc3VzRmFjdG9yeS5pZCA+IDAsCiAgICAvLyAgIGVyckd1aWxkRmFjdG9yeUludmFsaWRDb25maWcsCiAgICAvLyApCiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgOCAvLyAiRVJSOmVyckdmY2YiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2ZjZgoKY3JlYXRlX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo3NwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czozNgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBjb25zZW5zdXNGYWN0b3J5ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiAnY29uc2Vuc3VzX2ZhY3RvcnknIH0pCiAgICBieXRlYyAxMiAvLyAiY29uc2Vuc3VzX2ZhY3RvcnkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo3OQogICAgLy8gdGhpcy5jb25zZW5zdXNGYWN0b3J5LnZhbHVlID0gY29uc2Vuc3VzRmFjdG9yeQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlX2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo6R3VpbGRGYWN0b3J5LnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo4MgogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMTEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjgyCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZEZhY3RvcnkudXBkYXRlR3VpbGRbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVHdWlsZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1cGRhdGVHdWlsZChndWlsZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIHRoaXMucmVxdWlyZVByb2dyYW0oR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5KQogICAgYnl0ZWNfMCAvLyAiZ3VpbGQiCiAgICBjYWxsc3ViIHJlcXVpcmVQcm9ncmFtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo5MgogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhndWlsZCwgQnl0ZXMoR3VpbGRHbG9iYWxTdGF0ZUtleUNyZWF0b3IpKQogICAgcHVzaGJ5dGVzICJjcmVhdG9yIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjkzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIFR4bi5zZW5kZXIgPT09IEFjY291bnQoY3JlYXRvciksIGVyckd1aWxkQ3JlYXRvck9ubHkpCiAgICBieiB1cGRhdGVHdWlsZF9ib29sX2ZhbHNlQDQKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICA9PQogICAgYnogdXBkYXRlR3VpbGRfYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKdXBkYXRlR3VpbGRfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTMKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgVHhuLnNlbmRlciA9PT0gQWNjb3VudChjcmVhdG9yKSwgZXJyR3VpbGRDcmVhdG9yT25seSkKICAgIGJueiB1cGRhdGVHdWlsZF9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyR2NydCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHY3J0Cgp1cGRhdGVHdWlsZF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjk1LTEwNgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDcmVhdGVTdHViLnByb3RvdHlwZS51cGRhdGU+KHsKICAgIC8vICAgYXBwSWQ6IGd1aWxkLAogICAgLy8gICBhcmdzOiBbdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZV0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5VcGRhdGVBcHBsaWNhdGlvbiwKICAgIC8vICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCAwKSwKICAgIC8vICAgICB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEgpLAogICAgLy8gICAgIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCAqIDIpLAogICAgLy8gICAgIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCAqIDMpLAogICAgLy8gICBdLAogICAgLy8gICBjbGVhclN0YXRlUHJvZ3JhbTogdGVtcGxhdGUuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTcKICAgIC8vIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDEwIC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTcKICAgIC8vIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIDApLAogICAgYnl0ZWNfMCAvLyAiZ3VpbGQiCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBwcm9ncmFtQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIKSwKICAgIGJ5dGVjXzAgLy8gImd1aWxkIgogICAgaW50YyA1IC8vIDQwOTYKICAgIGNhbGxzdWIgcHJvZ3JhbUNodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMDIKICAgIC8vIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCAqIDIpLAogICAgYnl0ZWNfMCAvLyAiZ3VpbGQiCiAgICBwdXNoaW50IDgxOTIKICAgIGNhbGxzdWIgcHJvZ3JhbUNodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMDMKICAgIC8vIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCAqIDMpLAogICAgYnl0ZWNfMCAvLyAiZ3VpbGQiCiAgICBwdXNoaW50IDEyMjg4CiAgICBjYWxsc3ViIHByb2dyYW1DaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTQKICAgIC8vIGNvbnN0IHRlbXBsYXRlID0gY29tcGlsZUFyYzQoR3VpbGRDcmVhdGVTdHViKQogICAgYnl0ZWMgMTkgLy8gYmFzZTY0KERZRUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5VcGRhdGVBcHBsaWNhdGlvbiwKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6OTUtMTA2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBHdWlsZENyZWF0ZVN0dWIucHJvdG90eXBlLnVwZGF0ZT4oewogICAgLy8gICBhcHBJZDogZ3VpbGQsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlXSwKICAgIC8vICAgb25Db21wbGV0aW9uOiBPbkNvbXBsZXRlQWN0aW9uLlVwZGF0ZUFwcGxpY2F0aW9uLAogICAgLy8gICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIDApLAogICAgLy8gICAgIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMiksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMyksCiAgICAvLyAgIF0sCiAgICAvLyAgIGNsZWFyU3RhdGVQcm9ncmFtOiB0ZW1wbGF0ZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vIH0pCiAgICBieXRlYyAxMyAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1cGRhdGVHdWlsZChndWlsZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnVwZGF0ZUd1aWxkX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIHVwZGF0ZUd1aWxkX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZEZhY3RvcnkubmV3R3VpbGRbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdHdWlsZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjExNS0xMjAKICAgIC8vIG5ld0d1aWxkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGNvbnNlbnN1c05hbWU6IHN0cmluZywKICAgIC8vICAgYmFzZUNvbmZpZzogR3VpbGRCYXNlQ29uZmlnLAogICAgLy8gICBnb3Zlcm5hbmNlQ29uZmlnOiBieXRlcywKICAgIC8vICk6IEd1aWxkRGVwbG95bWVudCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGxlbgogICAgcHVzaGludCA0NDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvY29yZS90eXBlcy50czo6R3VpbGRCYXNlQ29uZmlnCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTIxCiAgICAvLyB0aGlzLnJlcXVpcmVQcm9ncmFtKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSkKICAgIGJ5dGVjXzAgLy8gImd1aWxkIgogICAgY2FsbHN1YiByZXF1aXJlUHJvZ3JhbQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBjb25zdCBjb25zZW5zdXNDb3N0ID0gdGhpcy5jb25zZW5zdXNDb3N0KGNvbnNlbnN1c05hbWUpCiAgICBjYWxsc3ViIGNvbnNlbnN1c0Nvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEyMwogICAgLy8gY29uc3QgY3JlYXRlRmVlID0gdGhpcy5nZXRHdWlsZENyZWF0ZUZlZSgpCiAgICBjYWxsc3ViIGdldEd1aWxkQ3JlYXRlRmVlCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIGNvbnN0IHdhbGxldEZhY3RvcnkgPSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkud2FsbGV0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gY29uc3Qgd2FsbGV0RmFjdG9yeSA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS53YWxsZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHB1c2hieXRlcyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBjb25zdCB3YWxsZXRGYWN0b3J5ID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLndhbGxldCkKICAgIGR1cAogICAgZXh0cmFjdCA4OCA4CiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyBsb2dnZWRBc3NlcnQod2FsbGV0RmFjdG9yeS5pZCA+IDAsIGVyckd1aWxkRmFjdG9yeUludmFsaWRDb25maWcpCiAgICBibnogbmV3R3VpbGRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjplcnJHZmNmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckdmY2YKCm5ld0d1aWxkX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTI2LTEzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1hdGNoKHBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogdGhpcy5ndWlsZE1icigpICsgY29uc2Vuc3VzQ29zdCArIGNyZWF0ZUZlZSwKICAgIC8vIH0pLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkUGF5bWVudCkKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTI2LTEzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1hdGNoKHBheW1lbnQsIHsKICAgIC8vICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogdGhpcy5ndWlsZE1icigpICsgY29uc2Vuc3VzQ29zdCArIGNyZWF0ZUZlZSwKICAgIC8vIH0pLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkUGF5bWVudCkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEyNi0xMzAKICAgIC8vIGxvZ2dlZEFzc2VydChtYXRjaChwYXltZW50LCB7CiAgICAvLyAgIHNlbmRlcjogVHhuLnNlbmRlciwKICAgIC8vICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHRoaXMuZ3VpbGRNYnIoKSArIGNvbnNlbnN1c0Nvc3QgKyBjcmVhdGVGZWUsCiAgICAvLyB9KSwgZXJyR3VpbGRGYWN0b3J5SW52YWxpZFBheW1lbnQpCiAgICA9PQogICAgJiYKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NjMtNjQKICAgIC8vIHJldHVybiA4ICogTUlOX1BST0dSQU1fUEFHRVMgKyBHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIEd1aWxkTnVtR2xvYmFsVWludHMgKwogICAgLy8gICBHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBHdWlsZE51bUdsb2JhbEJ5dGVzICsgR2xvYmFsLm1pbkJhbGFuY2UKICAgIGludGMgNiAvLyAyMzQyMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo2NAogICAgLy8gR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogR3VpbGROdW1HbG9iYWxCeXRlcyArIEdsb2JhbC5taW5CYWxhbmNlCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NjMtNjQKICAgIC8vIHJldHVybiA4ICogTUlOX1BST0dSQU1fUEFHRVMgKyBHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIEd1aWxkTnVtR2xvYmFsVWludHMgKwogICAgLy8gICBHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBHdWlsZE51bUdsb2JhbEJ5dGVzICsgR2xvYmFsLm1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYW1vdW50OiB0aGlzLmd1aWxkTWJyKCkgKyBjb25zZW5zdXNDb3N0ICsgY3JlYXRlRmVlLAogICAgZGlnIDMKICAgICsKICAgIGRpZyA4CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMjYtMTMwCiAgICAvLyBsb2dnZWRBc3NlcnQobWF0Y2gocGF5bWVudCwgewogICAgLy8gICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB0aGlzLmd1aWxkTWJyKCkgKyBjb25zZW5zdXNDb3N0ICsgY3JlYXRlRmVlLAogICAgLy8gfSksIGVyckd1aWxkRmFjdG9yeUludmFsaWRQYXltZW50KQogICAgPT0KICAgICYmCiAgICBibnogbmV3R3VpbGRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyR2ZweSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHZnB5CgpuZXdHdWlsZF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzQKICAgIC8vIGNvbnN0IGNvbnNlbnN1cyA9IGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzRmFjdG9yeS5wcm90b3R5cGUubmV3Q29uc2Vuc3VzPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLmNvbnNlbnN1c0ZhY3RvcnkudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5jb25zZW5zdXNGYWN0b3J5LnZhbHVlLmFkZHJlc3MsIGFtb3VudDogY29uc2Vuc3VzQ29zdCwgZmVlOiAwIH0pLCBjb25zZW5zdXNOYW1lLCBnb3Zlcm5hbmNlQ29uZmlnXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzMKICAgIC8vIGFyZ3M6IFtpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5jb25zZW5zdXNGYWN0b3J5LnZhbHVlLmFkZHJlc3MsIGFtb3VudDogY29uc2Vuc3VzQ29zdCwgZmVlOiAwIH0pLCBjb25zZW5zdXNOYW1lLCBnb3Zlcm5hbmNlQ29uZmlnXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czozNQogICAgLy8gY29uc2Vuc3VzRmFjdG9yeSA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogJ2NvbnNlbnN1c19mYWN0b3J5JyB9KQogICAgYnl0ZWMgMTIgLy8gImNvbnNlbnN1c19mYWN0b3J5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTMzCiAgICAvLyBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzRmFjdG9yeS52YWx1ZS5hZGRyZXNzLCBhbW91bnQ6IGNvbnNlbnN1c0Nvc3QsIGZlZTogMCB9KSwgY29uc2Vuc3VzTmFtZSwgZ292ZXJuYW5jZUNvbmZpZ10sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzEtMTM0CiAgICAvLyBjb25zdCBjb25zZW5zdXMgPSBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0ZhY3RvcnkucHJvdG90eXBlLm5ld0NvbnNlbnN1cz4oewogICAgLy8gICBhcHBJZDogdGhpcy5jb25zZW5zdXNGYWN0b3J5LnZhbHVlLAogICAgLy8gICBhcmdzOiBbaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuY29uc2Vuc3VzRmFjdG9yeS52YWx1ZS5hZGRyZXNzLCBhbW91bnQ6IGNvbnNlbnN1c0Nvc3QsIGZlZTogMCB9KSwgY29uc2Vuc3VzTmFtZSwgZ292ZXJuYW5jZUNvbmZpZ10sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweGQyNzY1N2FhIC8vIG1ldGhvZCAibmV3Q29uc2Vuc3VzKHBheSxzdHJpbmcsYnl0ZVtdKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFwcGxpY2F0aW9uCiAgICBkdXAKICAgIGJ0b2kKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzYtMTQ3CiAgICAvLyBjb25zdCBndWlsZCA9IHRlbXBsYXRlLmNhbGwuY3JlYXRlKHsKICAgIC8vICAgYXJnczogW3RoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsIFR4bi5zZW5kZXIsIHdhbGxldEZhY3RvcnksIGNvbnNlbnN1cywgYmFzZUNvbmZpZ10sCiAgICAvLyAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgMCksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIKSwKICAgIC8vICAgICB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggKiAyKSwKICAgIC8vICAgICB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggKiAzKSwKICAgIC8vICAgXSwKICAgIC8vICAgY2xlYXJTdGF0ZVByb2dyYW06IHRlbXBsYXRlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAvLyBSZXNlcnZlIEFWTSAxMyBjYXBhY2l0eSBmb3IgZ292ZXJuZWQgdXBncmFkZXMsIGluZGVwZW5kZW50bHkgb2YgdG9kYXkncyBwcm9ncmFtIHNpemUuCiAgICAvLyAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiA3LAogICAgLy8gfSkuaXR4bi5jcmVhdGVkQXBwCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzcKICAgIC8vIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLCBUeG4uc2VuZGVyLCB3YWxsZXRGYWN0b3J5LCBjb25zZW5zdXMsIGJhc2VDb25maWddLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgMTAgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzcKICAgIC8vIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLCBUeG4uc2VuZGVyLCB3YWxsZXRGYWN0b3J5LCBjb25zZW5zdXMsIGJhc2VDb25maWddLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgMCksCiAgICBieXRlY18wIC8vICJndWlsZCIKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHByb2dyYW1DaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEgpLAogICAgYnl0ZWNfMCAvLyAiZ3VpbGQiCiAgICBpbnRjIDUgLy8gNDA5NgogICAgY2FsbHN1YiBwcm9ncmFtQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjE0MQogICAgLy8gdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMiksCiAgICBieXRlY18wIC8vICJndWlsZCIKICAgIHB1c2hpbnQgODE5MgogICAgY2FsbHN1YiBwcm9ncmFtQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMyksCiAgICBieXRlY18wIC8vICJndWlsZCIKICAgIHB1c2hpbnQgMTIyODgKICAgIGNhbGxzdWIgcHJvZ3JhbUNodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzUKICAgIC8vIGNvbnN0IHRlbXBsYXRlID0gY29tcGlsZUFyYzQoR3VpbGRDcmVhdGVTdHViKQogICAgcHVzaGludCAyNAogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMTIKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTM2LTE0NwogICAgLy8gY29uc3QgZ3VpbGQgPSB0ZW1wbGF0ZS5jYWxsLmNyZWF0ZSh7CiAgICAvLyAgIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLCBUeG4uc2VuZGVyLCB3YWxsZXRGYWN0b3J5LCBjb25zZW5zdXMsIGJhc2VDb25maWddLAogICAgLy8gICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIDApLAogICAgLy8gICAgIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMiksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMyksCiAgICAvLyAgIF0sCiAgICAvLyAgIGNsZWFyU3RhdGVQcm9ncmFtOiB0ZW1wbGF0ZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgLy8gUmVzZXJ2ZSBBVk0gMTMgY2FwYWNpdHkgZm9yIGdvdmVybmVkIHVwZ3JhZGVzLCBpbmRlcGVuZGVudGx5IG9mIHRvZGF5J3MgcHJvZ3JhbSBzaXplLgogICAgLy8gICBleHRyYVByb2dyYW1QYWdlczogNywKICAgIC8vIH0pLml0eG4uY3JlYXRlZEFwcAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiA3LAogICAgcHVzaGludCA3CiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxMzUKICAgIC8vIGNvbnN0IHRlbXBsYXRlID0gY29tcGlsZUFyYzQoR3VpbGRDcmVhdGVTdHViKQogICAgYnl0ZWMgMTkgLy8gYmFzZTY0KERZRUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTM2LTE0NwogICAgLy8gY29uc3QgZ3VpbGQgPSB0ZW1wbGF0ZS5jYWxsLmNyZWF0ZSh7CiAgICAvLyAgIGFyZ3M6IFt0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLCBUeG4uc2VuZGVyLCB3YWxsZXRGYWN0b3J5LCBjb25zZW5zdXMsIGJhc2VDb25maWddLAogICAgLy8gICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICB0aGlzLnByb2dyYW1DaHVuayhHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXksIDApLAogICAgLy8gICAgIHRoaXMucHJvZ3JhbUNodW5rKEd1aWxkRmFjdG9yeUd1aWxkUHJvZ3JhbUtleSwgTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMiksCiAgICAvLyAgICAgdGhpcy5wcm9ncmFtQ2h1bmsoR3VpbGRGYWN0b3J5R3VpbGRQcm9ncmFtS2V5LCBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIICogMyksCiAgICAvLyAgIF0sCiAgICAvLyAgIGNsZWFyU3RhdGVQcm9ncmFtOiB0ZW1wbGF0ZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgLy8gUmVzZXJ2ZSBBVk0gMTMgY2FwYWNpdHkgZm9yIGdvdmVybmVkIHVwZ3JhZGVzLCBpbmRlcGVuZGVudGx5IG9mIHRvZGF5J3MgcHJvZ3JhbSBzaXplLgogICAgLy8gICBleHRyYVByb2dyYW1QYWdlczogNywKICAgIC8vIH0pLml0eG4uY3JlYXRlZEFwcAogICAgcHVzaGJ5dGVzIDB4MDZjYjJlNTQgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLGFkZHJlc3MsdWludDY0LHVpbnQ2NCwodWludDY0LCgodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSwodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpLCh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCksKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSkpKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IGd1aWxkLmFkZHJlc3MsIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsIGZlZTogMCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIEd1aWxkQ29uc2Vuc3VzQ3JlYXRlU3R1Yi5wcm90b3R5cGUuYmluZEd1aWxkPih7IGFwcElkOiBjb25zZW5zdXMsIGFyZ3M6IFtndWlsZF0gfSkKICAgIGl0eG5fYmVnaW4KICAgIGl0b2IKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNlODcwMTNiIC8vIG1ldGhvZCAiYmluZEd1aWxkKHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBpZiAoY3JlYXRlRmVlID4gMCkgewogICAgZGlnIDIKICAgIGJ6IG5ld0d1aWxkX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFtb3VudDogY3JlYXRlRmVlLCBmZWU6IDAgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czozNgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYW1vdW50OiBjcmVhdGVGZWUsIGZlZTogMCB9KS5zdWJtaXQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3R3VpbGRfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gcmV0dXJuIHsgZ3VpbGQsIGNvbnNlbnN1cyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjExNS0xMjAKICAgIC8vIG5ld0d1aWxkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGNvbnNlbnN1c05hbWU6IHN0cmluZywKICAgIC8vICAgYmFzZUNvbmZpZzogR3VpbGRCYXNlQ29uZmlnLAogICAgLy8gICBnb3Zlcm5hbmNlQ29uZmlnOiBieXRlcywKICAgIC8vICk6IEd1aWxkRGVwbG95bWVudCB7CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6Okd1aWxkRmFjdG9yeS5ndWlsZENyZWF0ZUZlZVtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmd1aWxkQ3JlYXRlRmVlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyByZXR1cm4gdGhpcy5nZXRHdWlsZENyZWF0ZUZlZSgpCiAgICBjYWxsc3ViIGdldEd1aWxkQ3JlYXRlRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjpHdWlsZEZhY3RvcnkuY29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gdGhpcy5yZXF1aXJlUHJvZ3JhbShHdWlsZEZhY3RvcnlHdWlsZFByb2dyYW1LZXkpCiAgICBieXRlY18wIC8vICJndWlsZCIKICAgIGNhbGxzdWIgcmVxdWlyZVByb2dyYW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjYzLTY0CiAgICAvLyByZXR1cm4gOCAqIE1JTl9QUk9HUkFNX1BBR0VTICsgR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBHdWlsZE51bUdsb2JhbFVpbnRzICsKICAgIC8vICAgR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogR3VpbGROdW1HbG9iYWxCeXRlcyArIEdsb2JhbC5taW5CYWxhbmNlCiAgICBpbnRjIDYgLy8gMjM0MjAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NjQKICAgIC8vIEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIEd1aWxkTnVtR2xvYmFsQnl0ZXMgKyBHbG9iYWwubWluQmFsYW5jZQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjYzLTY0CiAgICAvLyByZXR1cm4gOCAqIE1JTl9QUk9HUkFNX1BBR0VTICsgR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBHdWlsZE51bUdsb2JhbFVpbnRzICsKICAgIC8vICAgR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogR3VpbGROdW1HbG9iYWxCeXRlcyArIEdsb2JhbC5taW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIHJldHVybiB0aGlzLmd1aWxkTWJyKCkgKyB0aGlzLmNvbnNlbnN1c0Nvc3QoY29uc2Vuc3VzTmFtZSkgKyB0aGlzLmdldEd1aWxkQ3JlYXRlRmVlKCkKICAgIHN3YXAKICAgIGNhbGxzdWIgY29uc2Vuc3VzQ29zdAogICAgKwogICAgY2FsbHN1YiBnZXRHdWlsZENyZWF0ZUZlZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo6R3VpbGRQcm9ncmFtUmVnaXN0cnkubG9hZFByb2dyYW1bcm91dGluZ10oKSAtPiB2b2lkOgpsb2FkUHJvZ3JhbToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjgzCiAgICAvLyBsb2FkUHJvZ3JhbShvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjg0CiAgICAvLyBsb2dnZWRBc3NlcnQob2Zmc2V0ICUgUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSA9PT0gMCwgZXJySW52YWxpZENhbGxPcmRlcikKICAgIGludGMgNCAvLyAyMDAwCiAgICAlCiAgICBieiBsb2FkUHJvZ3JhbV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOmVyckljb3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWNvcgoKbG9hZFByb2dyYW1fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo4NQogICAgLy8gY29uc3QgcHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gUFJPR1JBTV9VUExPQURfQ0hVTktfU0laRSArIDEKICAgIGR1cAogICAgaW50YyA0IC8vIDIwMDAKICAgIC8KICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjg2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLmdyb3VwSW5kZXggPj0gcHJldmlvdXNDYWxscywgZXJySW52YWxpZENhbGxPcmRlcikKICAgIHR4biBHcm91cEluZGV4CiAgICA8PQogICAgYm56IGxvYWRQcm9ncmFtX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySWNvciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY29yCgpsb2FkUHJvZ3JhbV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjg3CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4IC0gcHJldmlvdXNDYWxscykKICAgIHR4biBHcm91cEluZGV4CiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjg5CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgPT0KICAgIGJ6IGxvYWRQcm9ncmFtX2Jvb2xfZmFsc2VAMTIKICAgIGR1cAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgYnogbG9hZFByb2dyYW1fYm9vbF9mYWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6OTAKICAgIC8vIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyICYmIHR4bi5udW1BcHBBcmdzID09PSAzICYmCiAgICBkdXAKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6ODktOTAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgYm56IGxvYWRQcm9ncmFtX2Jvb2xfZmFsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjkwCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo4OS05MAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyICYmIHR4bi5udW1BcHBBcmdzID09PSAzICYmCiAgICBieiBsb2FkUHJvZ3JhbV9ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo5MAogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMgJiYKICAgIGR1cAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6ODktOTAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMyAmJgogICAgYnogbG9hZFByb2dyYW1fYm9vbF9mYWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6OTEKICAgIC8vIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcignaW5pdFByb2dyYW0ocGF5LHN0cmluZyx1aW50NjQpdm9pZCcpLAogICAgZHVwCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDE0IC8vIG1ldGhvZCAiaW5pdFByb2dyYW0ocGF5LHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo4OS05MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyICYmIHR4bi5udW1BcHBBcmdzID09PSAzICYmCiAgICAvLyB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoJ2luaXRQcm9ncmFtKHBheSxzdHJpbmcsdWludDY0KXZvaWQnKSwKICAgIGJ6IGxvYWRQcm9ncmFtX2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgpsb2FkUHJvZ3JhbV9ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6ODgtOTMKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vICAgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMgJiYKICAgIC8vICAgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKCdpbml0UHJvZ3JhbShwYXksc3RyaW5nLHVpbnQ2NCl2b2lkJyksCiAgICAvLyAgIGVyckludmFsaWRDYWxsT3JkZXIsCiAgICAvLyApCiAgICBibnogbG9hZFByb2dyYW1fYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyA1IC8vICJFUlI6ZXJySWNvciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY29yCgpsb2FkUHJvZ3JhbV9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo5NAogICAgLy8gY29uc3QgbmFtZSA9IGRlY29kZUFyYzQ8c3RyaW5nPih0eG4uYXBwQXJncygxKSkKICAgIGR1cAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6OTUKICAgIC8vIHRoaXMucmVxdWlyZVByb2dyYW0obmFtZSkKICAgIGR1cAogICAgY2FsbHN1YiByZXF1aXJlUHJvZ3JhbQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MjIKICAgIC8vIHByb2dyYW1zID0gQm94TWFwPHN0cmluZywgYnl0ZXM+KHsga2V5UHJlZml4OiBHdWlsZEZhY3RvcnlCb3hQcmVmaXhQcm9ncmFtcyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvZ3JhbXMobmFtZSkubGVuZ3RoID09PSBvcC5idG9pKHR4bi5hcHBBcmdzKDIpKSwgZXJyR3VpbGRGYWN0b3J5SW52YWxpZENvbmZpZykKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBzd2FwCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGJ0b2kKICAgID09CiAgICBibnogbG9hZFByb2dyYW1fYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA4IC8vICJFUlI6ZXJyR2ZjZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHZmNmCgpsb2FkUHJvZ3JhbV9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo5NwogICAgLy8gdGhpcy5wcm9ncmFtcyhuYW1lKS5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjgzCiAgICAvLyBsb2FkUHJvZ3JhbShvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxvYWRQcm9ncmFtX2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsb2FkUHJvZ3JhbV9ib29sX21lcmdlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1NYnJbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9ncmFtTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MTAyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS5wcm9ncmFtTWJyCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1GdW5kaW5nW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvZ3JhbUZ1bmRpbmc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoxMDgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1GdW5kaW5nCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDYgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgOSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo6R3VpbGRGYWN0b3J5LmdldEd1aWxkQ3JlYXRlRmVlKCkgLT4gdWludDY0OgpnZXRHdWlsZENyZWF0ZUZlZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBjb25zdCBbZmVlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzR3VpbGRGZWVzKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo1MwogICAgLy8gY29uc3QgW2ZlZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0d1aWxkRmVlcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGJ5dGVzICJndWlsZF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzLCBlcnJHdWlsZEZhY3RvcnlHdWlsZEZlZXNVbnNldCkKICAgIGJueiBnZXRHdWlsZENyZWF0ZUZlZV9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyR2ZnZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJHZmdmCgpnZXRHdWlsZENyZWF0ZUZlZV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjU1CiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxHdWlsZEZlZXM+KGZlZXMpLmNyZWF0ZUZlZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvY29udHJhY3QuYWxnby50czo6R3VpbGRGYWN0b3J5LmNvbnNlbnN1c0Nvc3QobmFtZTogYnl0ZXMpIC0+IHVpbnQ2NDoKY29uc2Vuc3VzQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjU4CiAgICAvLyBwcml2YXRlIGNvbnNlbnN1c0Nvc3QobmFtZTogc3RyaW5nKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6NTkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBHdWlsZENvbnNlbnN1c0ZhY3RvcnkucHJvdG90eXBlLmNvc3Q+KHsgYXBwSWQ6IHRoaXMuY29uc2Vuc3VzRmFjdG9yeS52YWx1ZSwgYXJnczogW25hbWVdIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIGNvbnNlbnN1c0ZhY3RvcnkgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6ICdjb25zZW5zdXNfZmFjdG9yeScgfSkKICAgIGJ5dGVjIDEyIC8vICJjb25zZW5zdXNfZmFjdG9yeSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9jb250cmFjdC5hbGdvLnRzOjU5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgR3VpbGRDb25zZW5zdXNGYWN0b3J5LnByb3RvdHlwZS5jb3N0Pih7IGFwcElkOiB0aGlzLmNvbnNlbnN1c0ZhY3RvcnkudmFsdWUsIGFyZ3M6IFtuYW1lXSB9KS5yZXR1cm5WYWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTUgLy8gbWV0aG9kICJjb3N0KHN0cmluZyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS52YWxpZGF0ZVByb2dyYW1OYW1lKG5hbWU6IGJ5dGVzKSAtPiB2b2lkOgp2YWxpZGF0ZVByb2dyYW1OYW1lOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MjYKICAgIC8vIHByb3RlY3RlZCB2YWxpZGF0ZVByb2dyYW1OYW1lKG5hbWU6IHN0cmluZyk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KG5hbWUgIT09ICcnICYmIEJ5dGVzKG5hbWUpLmxlbmd0aCA8PSBNQVhfR1VJTERfUFJPR1JBTV9OQU1FX0JZVEVTLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkVHlwZSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWNfMyAvLyAiIgogICAgIT0KICAgIGJ6IHZhbGlkYXRlUHJvZ3JhbU5hbWVfYm9vbF9mYWxzZUAzCiAgICBmcmFtZV9kaWcgLTEKICAgIGxlbgogICAgcHVzaGludCA2MwogICAgPD0KICAgIGJ6IHZhbGlkYXRlUHJvZ3JhbU5hbWVfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQoKdmFsaWRhdGVQcm9ncmFtTmFtZV9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KG5hbWUgIT09ICcnICYmIEJ5dGVzKG5hbWUpLmxlbmd0aCA8PSBNQVhfR1VJTERfUFJPR1JBTV9OQU1FX0JZVEVTLCBlcnJHdWlsZEZhY3RvcnlJbnZhbGlkVHlwZSkKICAgIGJueiB2YWxpZGF0ZVByb2dyYW1OYW1lX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAxNyAvLyAiRVJSOmVyckdmdHkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyR2Z0eQoKdmFsaWRhdGVQcm9ncmFtTmFtZV9hZnRlcl9hc3NlcnRANjoKICAgIHJldHN1YgoKdmFsaWRhdGVQcm9ncmFtTmFtZV9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiB2YWxpZGF0ZVByb2dyYW1OYW1lX2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS5yZXF1aXJlUHJvZ3JhbShuYW1lOiBieXRlcykgLT4gdm9pZDoKcmVxdWlyZVByb2dyYW06CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czozMAogICAgLy8gcHJvdGVjdGVkIHJlcXVpcmVQcm9ncmFtKG5hbWU6IHN0cmluZyk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czozMQogICAgLy8gdGhpcy52YWxpZGF0ZVByb2dyYW1OYW1lKG5hbWUpCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgdmFsaWRhdGVQcm9ncmFtTmFtZQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MjIKICAgIC8vIHByb2dyYW1zID0gQm94TWFwPHN0cmluZywgYnl0ZXM+KHsga2V5UHJlZml4OiBHdWlsZEZhY3RvcnlCb3hQcmVmaXhQcm9ncmFtcyB9KQogICAgYnl0ZWMgNCAvLyAicCIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czozMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJvZ3JhbXMobmFtZSkuZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlcXVpcmVQcm9ncmFtX2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCnJlcXVpcmVQcm9ncmFtX2FmdGVyX2Fzc2VydEAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1DaHVuayhuYW1lOiBieXRlcywgb2Zmc2V0OiB1aW50NjQpIC0+IGJ5dGVzOgpwcm9ncmFtQ2h1bms6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czozNQogICAgLy8gcHJvdGVjdGVkIHByb2dyYW1DaHVuayhuYW1lOiBzdHJpbmcsIG9mZnNldDogdWludDY0KTogYnl0ZXMgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czozNgogICAgLy8gdGhpcy5yZXF1aXJlUHJvZ3JhbShuYW1lKQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJlcXVpcmVQcm9ncmFtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoyMgogICAgLy8gcHJvZ3JhbXMgPSBCb3hNYXA8c3RyaW5nLCBieXRlcz4oeyBrZXlQcmVmaXg6IEd1aWxkRmFjdG9yeUJveFByZWZpeFByb2dyYW1zIH0pCiAgICBieXRlYyA0IC8vICJwIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MzgKICAgIC8vIGlmIChvZmZzZXQgPj0gcHJvZ3JhbS5sZW5ndGgpIHsKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBmcmFtZV9kaWcgLTEKICAgIDw9CiAgICBieiBwcm9ncmFtQ2h1bmtfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czozOQogICAgLy8gcmV0dXJuIEJ5dGVzKCcnKQogICAgYnl0ZWNfMyAvLyAiIgogICAgc3dhcAogICAgcmV0c3ViCgpwcm9ncmFtQ2h1bmtfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NDEKICAgIC8vIGNvbnN0IHJlbWFpbmluZzogdWludDY0ID0gcHJvZ3JhbS5sZW5ndGggLSBvZmZzZXQKICAgIGR1cAogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGZyYW1lX2RpZyAtMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6NDIKICAgIC8vIHJldHVybiBwcm9ncmFtLmV4dHJhY3Qob2Zmc2V0LCByZW1haW5pbmcgPiBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIID8gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA6IHJlbWFpbmluZykKICAgIGR1cAogICAgaW50YyA1IC8vIDQwOTYKICAgID4KICAgIGludGMgNSAvLyA0MDk2CiAgICBzd2FwCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgYm94X2V4dHJhY3QKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS5wcm9ncmFtTWJyKHByb2dyYW1OYW1lOiBieXRlcywgc2l6ZTogdWludDY0KSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS5wcm9ncmFtTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MTAyLTEwMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBwcm9ncmFtTWJyKHByb2dyYW1OYW1lOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjEwNAogICAgLy8gdGhpcy52YWxpZGF0ZVByb2dyYW1OYW1lKHByb2dyYW1OYW1lKQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHZhbGlkYXRlUHJvZ3JhbU5hbWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjEwNQogICAgLy8gcmV0dXJuIDJfNTAwICsgNDAwICogKDEgKyBCeXRlcyhwcm9ncmFtTmFtZSkubGVuZ3RoICsgc2l6ZSkKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBwdXNoaW50IDQwMAogICAgKgogICAgcHVzaGludCAyNTAwCiAgICArCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo6R3VpbGRQcm9ncmFtUmVnaXN0cnkucHJvZ3JhbUZ1bmRpbmcocHJvZ3JhbU5hbWU6IGJ5dGVzLCBzaXplOiB1aW50NjQpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1GdW5kaW5nOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MTA4LTEwOQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICAvLyBwcm9ncmFtRnVuZGluZyhwcm9ncmFtTmFtZTogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoxMTAKICAgIC8vIGNvbnN0IHJlcXVlc3RlZCA9IHRoaXMucHJvZ3JhbU1icihwcm9ncmFtTmFtZSwgc2l6ZSkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS5wcm9ncmFtTWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoyMgogICAgLy8gcHJvZ3JhbXMgPSBCb3hNYXA8c3RyaW5nLCBieXRlcz4oeyBrZXlQcmVmaXg6IEd1aWxkRmFjdG9yeUJveFByZWZpeFByb2dyYW1zIH0pCiAgICBieXRlYyA0IC8vICJwIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6MTExCiAgICAvLyBpZiAoIXRoaXMucHJvZ3JhbXMocHJvZ3JhbU5hbWUpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1GdW5kaW5nX2FmdGVyX2lmX2Vsc2VAMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoxMTIKICAgIC8vIHJldHVybiByZXF1ZXN0ZWQKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL2FyYzU4L2d1aWxkcy9mYWN0b3J5L3JlZ2lzdHJ5LmFsZ28udHM6Okd1aWxkUHJvZ3JhbVJlZ2lzdHJ5LnByb2dyYW1GdW5kaW5nX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjExNAogICAgLy8gY29uc3QgY3VycmVudCA9IHRoaXMucHJvZ3JhbU1icihwcm9ncmFtTmFtZSwgdGhpcy5wcm9ncmFtcyhwcm9ncmFtTmFtZSkubGVuZ3RoKQogICAgYm94X2xlbgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo6R3VpbGRQcm9ncmFtUmVnaXN0cnkucHJvZ3JhbU1icgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czoxMTUKICAgIC8vIHJldHVybiByZXF1ZXN0ZWQgPiBjdXJyZW50ID8gcmVxdWVzdGVkIC0gY3VycmVudCA6IDAKICAgIGRpZyAyCiAgICA8CiAgICBieiBzbWFydF9jb250cmFjdHMvYXJjNTgvZ3VpbGRzL2ZhY3RvcnkvcmVnaXN0cnkuYWxnby50czo6R3VpbGRQcm9ncmFtUmVnaXN0cnkucHJvZ3JhbUZ1bmRpbmdfdGVybmFyeV9mYWxzZUA0CiAgICAtCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjpHdWlsZFByb2dyYW1SZWdpc3RyeS5wcm9ncmFtRnVuZGluZ190ZXJuYXJ5X2ZhbHNlQDQ6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9ndWlsZHMvZmFjdG9yeS9yZWdpc3RyeS5hbGdvLnRzOjExNQogICAgLy8gcmV0dXJuIHJlcXVlc3RlZCA+IGN1cnJlbnQgPyByZXF1ZXN0ZWQgLSBjdXJyZW50IDogMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEzCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCiNwcmFnbWEgYXV0b3NhbHQgZmFsc2UKCi8vIEBhbGdvcmFuZGZvdW5kYXRpb24vYWxnb3JhbmQtdHlwZXNjcmlwdC9iYXNlLWNvbnRyYWN0LmQudHM6OkJhc2VDb250cmFjdC5jbGVhclN0YXRlUHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "DSAHAAECCNAPgCDw+I4BJhQFZ3VpbGQJYWtpdGFfZGFvBBUffHUAAXALRVJSOmVyckljb3IGd2FsbGV0C0VSUjplcnJOZGFvC0VSUjplcnJHZmNmB3ZlcnNpb24WY2hpbGRfY29udHJhY3RfdmVyc2lvbgxha2l0YV9lc2Nyb3cRY29uc2Vuc3VzX2ZhY3RvcnkE6pGA3QQDZE7PBEh8TU4EcQltJQtFUlI6ZXJyR2Z0eQtFUlI6ZXJyR2ZweQQNgQFDJw02GgCOAQBnMRkURDEYQaABJw6CBASuhMvYBKoIvhoE7Ss/ugQ9xhoDJw8nEIIEBDuiSwEELdJOswQz6SyUBIVN7eA2GgCOCwAdAf8CNQLABEQETgR3BREFNAWjAAEAI0OABJ1fUzw2GgCOAQFiADEZgQQSMRgQREL0FCtHAzEWIwlJOBAjEkQ2GgFJIlkkCEsBFRJEVwIASTYaAkkVJRJEF04CSYiuFygSQAgnEbAAMQAnBEsCUEm9RQFBmgQiKWVEJwZlSHIIRE8CEkAIJwewACInCWVEJwpMZ0sBiL4WSwJBxANLAoH0fw5BsgMjQAgnCLAATwNJOAAxABJLATgHMgoSEEw4CE8DSwSI4BcSEEAIJxKwAEsBIQQIIwkhBApJRQYxFggyBAxACCcFsAAiSUsGDEH+ATEWSwFJTgIIIwhJTgJFBiEEC0lFB0sETAlJIQQNIQRMTUUIOBCBBhJBogFLAzgYMggSQY4BSwM4GUCAAUsDOAAxABJBbksDOBuBAxJBXEsDORoAJxASQUhLAzkaARdLBRJBMksDORoCFUsHJAgSQRgjQAgnBbAAIwhC/wEiQhdISb1FAUEITNMjQ0y5SEIJIkKxAzIJQocENhoBSSJZJAhLARUSRFcCAEk2GgJJFSUSRBdMNhoDSU4CSRVLASJZSYEKEkRPAkxLAlJJTgYiWYEMCBJENhoESRUlEkQXTCsTQB6AC0VSUjplcnJHZnZysABLAkFaSwEkW0FOSwRXAgArE0E8SUE2I0AIJwiwACcJTwRnKU8DZycLTwJnJwxMZyNDIkI1NhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIillRCcGZUhyCEQSQAgnB7AAJwtMZyNDNhoBSRUlEkQXSSiI9A+AB2NyZWF0b3JlTE4CQdIBMQBLAhJBwgEjQB6AC0VSUjplcnJHY3J0sACxIicKZURJFRZXBgJMUCgiiLwPKCEFiLAPKIGAQIiiDyiBgGCIlA8nE7JCTwOyQE8CskBMskCyQIEEshlMshgnDbIashqBBrIQIrIBsyNDIkLBATEWIwlJOBAjEkQ2GgFHAiJZJAhLARUSRFcCADYaAklOBBWBuAMSRDYaA0lOAkkiWSQITBUSRCiIhg2I2guIigtOBSIpZUSAA2FhbGVISVdYCE4CgVhbQAgnCLAATwRJOAAxABJLATgHMgoSEEw4CCEGMgEISwMISwgIEhBACCcSsACxIicMZURJcghETwKyCLIHI7IQIrIBtrIYgATSdleqshpPArIaTLIagQayECKyAbO0PklXBABMVwAEKhJESRUlEkRJF0lPArEiJwplREkVFlcGAkxQMQAoIoiACyghBYj0CiiBgECI5googYBgiNgKgRiyNYEMsjQishmBB7I4JxOyQk8DskBPArJATLJAskCABAbLLlSyGkyyGrIaTwOyGrIaTwKyGoEGshAisgGztwA9sUlyCEQyAbIIsgcjshAisgGzsRZJTwKyGIAEPocBO7IashqBBrIQIrIBs0sCQTCxIicLZUQkW3IIREsDsgiyByOyECKyAbNMFlAqTFCwI0OI/AUWKkxQsCNDNhoBSSJZJAhLARUSRFcCACiItgchBjIBCEyI/gUIiKwFCBYqTFCwI0M2GgFJFSUSRBdJNhoCSSJZJAhLARUSRFcCAE4CIQQYQQgnBbAASSEECiMISTEWDkAIJwWwADEWTAlJOBCBBhJBqgFJOBgyCBJBmAFJOBlAjAFJOAAxABJBfEk4G4EDEkFsSTkaACcOEkFaI0AIJwWwAEk5GgFXAgBJiJQFJwRMUElOAr1ETDkaAhcSQAgnCLAATE8CuyNDIkJZNhoBSSJZJAhLARUSRFcCADYaAkkVJRJEF4i2BRYqTFCwI0M2GgFJIlkkCEsBFRJEVwIANhoCSRUlEkQXiKIFFipMULAjQzYaAUkiWSQISwEVEkRXAgAxACIpZUQnBmVIcghEEkAIJwewACIpZUSAA3BhbGVIgRBbMg0SQB6AC0VSUjplcnJJdXBnsAAnCUxnI0M2GgFJFSUSRBcxACIpZUQnBmVIcghEEkAIJwewAClMZyNDIillRIAKZ3VpbGRfZmVlc2VAHoALRVJSOmVyckdmZ2awACJbiYoBAbGL/xUWVwYCi/9QIicMZUSyGCcPshqyGoEGshAisgGztD5JVwQATFcABCoSREkVJRJEF4mKAQCL/ysTQSCL/xWBPw5BECNACCcRsACJIkIPigEAi/+IQScEi/9QvUUBQB6AC0VSUjplcnJDbnN0sACJigIBi/6ISycEi/5QSb1Ei/8OQQYrTIlJvUSL/wlJIQUNIQVMTYv/TLqJigIBi/6I1wGL/hUjCIv/CIGQAwuBxBMIiYoCAYv+i/+IPycEi/5QSb1FAUAESIm9RIv+TIhnSUsCDEEECYlGAiKJ", "clear": "DYEBQw==" }, "events": [], "templateVariables": {} };
var GuildFactoryParamsFactory = class _GuildFactoryParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64,(string,uint64),uint64)void":
            return _GuildFactoryParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the GuildFactory smart contract using the create(string,uint64,(string,uint64),uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,uint64,(string,uint64),uint64)void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.akitaDao, params.args.akitaDaoEscrow, params.args.consensusFactory]
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
            return _GuildFactoryParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the GuildFactory smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the initProgram(pay,string,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static initProgram(params) {
    return {
      ...params,
      method: "initProgram(pay,string,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.mbrPayment, params.args.programName, params.args.size]
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
   * Constructs a no op call for the updateGuild(uint64)void ABI method
   *
   * Push the registered kernel onto a draft Guild; only that Guild's creator may trigger it.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateGuild(params) {
    return {
      ...params,
      method: "updateGuild(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.guild]
    };
  }
  /**
     * Constructs a no op call for the newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64) ABI method
     *
    * Both factories participate in one atomic deployment; no returned pair is left unbound.
  
    Like the Akita DAO, every Guild creates its treasury wallet through the DAO's wallet factory,
    so the creator cannot substitute a factory or wallet of their own.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static newGuild(params) {
    return {
      ...params,
      method: "newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.consensusName, params.args.baseConfig, params.args.governanceConfig]
    };
  }
  /**
   * Constructs a no op call for the guildCreateFee()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static guildCreateFee(params) {
    return {
      ...params,
      method: "guildCreateFee()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the cost(string)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static cost(params) {
    return {
      ...params,
      method: "cost(string)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.consensusName]
    };
  }
  /**
   * Constructs a no op call for the loadProgram(uint64,byte[])void ABI method
   *
   * Load only the exact chunk authorized by the preceding initProgram transaction.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static loadProgram(params) {
    return {
      ...params,
      method: "loadProgram(uint64,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.offset, params.args.data]
    };
  }
  /**
   * Constructs a no op call for the programMbr(string,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static programMbr(params) {
    return {
      ...params,
      method: "programMbr(string,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.programName, params.args.size]
    };
  }
  /**
   * Constructs a no op call for the programFunding(string,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static programFunding(params) {
    return {
      ...params,
      method: "programFunding(string,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.programName, params.args.size]
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
var GuildFactoryFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `GuildFactoryFactory`
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
    return new GuildFactoryClient(this.appFactory.getAppClientById(params));
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
    return new GuildFactoryClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the GuildFactory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? GuildFactoryParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? GuildFactoryParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new GuildFactoryClient(result.appClient) };
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
       * Creates a new instance of the GuildFactory smart contract using the create(string,uint64,(string,uint64),uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(GuildFactoryParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the GuildFactory smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(GuildFactoryParamsFactory.update.update(params));
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
       * Creates a new instance of the GuildFactory smart contract using the create(string,uint64,(string,uint64),uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(GuildFactoryParamsFactory.create.create(params));
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
       * Creates a new instance of the GuildFactory smart contract using an ABI method call using the create(string,uint64,(string,uint64),uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(GuildFactoryParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new GuildFactoryClient(result.appClient) };
      }
    }
  }}
}, _class3);
var GuildFactoryClient = (_class4 = class _GuildFactoryClient {
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
   * Returns a new `GuildFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _GuildFactoryClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `GuildFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _GuildFactoryClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
       * Updates an existing instance of the GuildFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(GuildFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the GuildFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `initProgram(pay,string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initProgram: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.initProgram(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateGuild(uint64)void` ABI method.
     *
     * Push the registered kernel onto a draft Guild; only that Guild's creator may trigger it.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateGuild: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.updateGuild(params));
    },
    /**
         * Makes a call to the GuildFactory smart contract using the `newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64)` ABI method.
         *
        * Both factories participate in one atomic deployment; no returned pair is left unbound.
    
        Like the Akita DAO, every Guild creates its treasury wallet through the DAO's wallet factory,
        so the creator cannot substitute a factory or wallet of their own.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    newGuild: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.newGuild(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `guildCreateFee()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    guildCreateFee: (params = { args: [] }) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.guildCreateFee(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `cost(string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    cost: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.cost(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `loadProgram(uint64,byte[])void` ABI method.
     *
     * Load only the exact chunk authorized by the preceding initProgram transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    loadProgram: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.loadProgram(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `programMbr(string,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    programMbr: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.programMbr(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `programFunding(string,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    programFunding: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.programFunding(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(GuildFactoryParamsFactory.opUp(params));
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
       * Updates an existing instance of the GuildFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(GuildFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the GuildFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `initProgram(pay,string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initProgram: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.initProgram(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateGuild(uint64)void` ABI method.
     *
     * Push the registered kernel onto a draft Guild; only that Guild's creator may trigger it.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateGuild: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.updateGuild(params));
    },
    /**
         * Makes a call to the GuildFactory smart contract using the `newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64)` ABI method.
         *
        * Both factories participate in one atomic deployment; no returned pair is left unbound.
    
        Like the Akita DAO, every Guild creates its treasury wallet through the DAO's wallet factory,
        so the creator cannot substitute a factory or wallet of their own.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    newGuild: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.newGuild(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `guildCreateFee()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    guildCreateFee: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.guildCreateFee(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `cost(string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    cost: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.cost(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `loadProgram(uint64,byte[])void` ABI method.
     *
     * Load only the exact chunk authorized by the preceding initProgram transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    loadProgram: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.loadProgram(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `programMbr(string,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    programMbr: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.programMbr(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `programFunding(string,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    programFunding: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.programFunding(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(GuildFactoryParamsFactory.opUp(params));
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
       * Updates an existing instance of the GuildFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(GuildFactoryParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the GuildFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `initProgram(pay,string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initProgram: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.initProgram(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateGuild(uint64)void` ABI method.
     *
     * Push the registered kernel onto a draft Guild; only that Guild's creator may trigger it.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateGuild: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.updateGuild(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the GuildFactory smart contract using the `newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64)` ABI method.
         *
        * Both factories participate in one atomic deployment; no returned pair is left unbound.
    
        Like the Akita DAO, every Guild creates its treasury wallet through the DAO's wallet factory,
        so the creator cannot substitute a factory or wallet of their own.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    newGuild: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.newGuild(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `guildCreateFee()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    guildCreateFee: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.guildCreateFee(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `cost(string)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    cost: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.cost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `loadProgram(uint64,byte[])void` ABI method.
     *
     * Load only the exact chunk authorized by the preceding initProgram transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    loadProgram: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.loadProgram(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `programMbr(string,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    programMbr: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.programMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `programFunding(string,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    programFunding: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.programFunding(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the GuildFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(GuildFactoryParamsFactory.opUp(params));
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
    return new _GuildFactoryClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the GuildFactory smart contract using the `guildCreateFee()uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async guildCreateFee(params = { args: [] }) {
    const result = await this.appClient.send.call(GuildFactoryParamsFactory.guildCreateFee(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the GuildFactory smart contract using the `cost(string)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async cost(params) {
    const result = await this.appClient.send.call(GuildFactoryParamsFactory.cost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the GuildFactory smart contract using the `programMbr(string,uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async programMbr(params) {
    const result = await this.appClient.send.call(GuildFactoryParamsFactory.programMbr(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the GuildFactory smart contract using the `programFunding(string,uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async programFunding(params) {
    const result = await this.appClient.send.call(GuildFactoryParamsFactory.programFunding(params));
    return result.return;
  }
  /**
   * Methods to access state for the current GuildFactory app
   */
  __init14() {this.state = {
    /**
     * Methods to access global state for the current GuildFactory app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          childContractVersion: result.childContractVersion,
          consensusFactory: result.consensusFactory,
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
       * Get the current value of the consensusFactory key in global state
       */
      consensusFactory: async () => {
        return await this.appClient.state.global.getValue("consensusFactory");
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
     * Methods to access box state for the current GuildFactory app
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
       * Get values from the programs map in box state
       */
      programs: {
        /**
         * Get all current values of the programs map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("programs");
        },
        /**
         * Get a current value of the programs map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("programs", key);
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
       * Add a initProgram(pay,string,uint64)void method call against the GuildFactory contract
       */
      initProgram(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initProgram(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the GuildFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateGuild(uint64)void method call against the GuildFactory contract
       */
      updateGuild(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateGuild(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64) method call against the GuildFactory contract
       */
      newGuild(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newGuild(params)));
        resultMappers.push((v) => client.decodeReturnValue("newGuild(pay,string,(uint64,((uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64),(uint64,uint64,uint64,uint64,uint64,uint64))),byte[])(uint64,uint64)", v));
        return this;
      },
      /**
       * Add a guildCreateFee()uint64 method call against the GuildFactory contract
       */
      guildCreateFee(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.guildCreateFee(params)));
        resultMappers.push((v) => client.decodeReturnValue("guildCreateFee()uint64", v));
        return this;
      },
      /**
       * Add a cost(string)uint64 method call against the GuildFactory contract
       */
      cost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cost(params)));
        resultMappers.push((v) => client.decodeReturnValue("cost(string)uint64", v));
        return this;
      },
      /**
       * Add a loadProgram(uint64,byte[])void method call against the GuildFactory contract
       */
      loadProgram(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadProgram(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a programMbr(string,uint64)uint64 method call against the GuildFactory contract
       */
      programMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.programMbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("programMbr(string,uint64)uint64", v));
        return this;
      },
      /**
       * Add a programFunding(string,uint64)uint64 method call against the GuildFactory contract
       */
      programFunding(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.programFunding(params)));
        resultMappers.push((v) => client.decodeReturnValue("programFunding(string,uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the GuildFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the GuildFactory contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
      /**
       * Add a clear state call to the GuildFactory contract
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






exports.GuildFactory = GuildFactory; exports.GuildClient = GuildClient; exports.GuildFactoryFactory = GuildFactoryFactory; exports.GuildFactoryClient = GuildFactoryClient;
//# sourceMappingURL=chunk-XRNER7WW.js.map
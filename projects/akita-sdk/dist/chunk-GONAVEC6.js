"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } var _class; var _class2;




var _chunkAP3B4YYAjs = require('./chunk-AP3B4YYA.js');


var _chunkDGKAG3SOjs = require('./chunk-DGKAG3SO.js');





var _chunkAP6ZTMSTjs = require('./chunk-AP6ZTMST.js');



var _chunkMZHAP7IAjs = require('./chunk-MZHAP7IA.js');


var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunk7VSUJWG7js = require('./chunk-7VSUJWG7.js');





var _chunkLNVZHCCXjs = require('./chunk-LNVZHCCX.js');


var _chunkWXNDITZIjs = require('./chunk-WXNDITZI.js');

// src/generated/AkitaDAOTypesClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "AkitaDAOTypes", "structs": { "ProposalAddAllowances": [{ "name": "escrow", "type": "string" }, { "name": "allowances", "type": "(uint64,uint8,uint64,uint64,uint64,bool)[]" }], "ProposalAddNamedPlugin": [{ "name": "name", "type": "string" }, { "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }, { "name": "delegationType", "type": "uint8" }, { "name": "lastValid", "type": "uint64" }, { "name": "cooldown", "type": "uint64" }, { "name": "methods", "type": "(byte[4],uint64)[]" }, { "name": "useRounds", "type": "bool" }, { "name": "useExecutionKey", "type": "bool" }, { "name": "coverFees", "type": "bool" }, { "name": "defaultToEscrow", "type": "bool" }, { "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "sourceLink", "type": "string" }, { "name": "allowances", "type": "(uint64,uint8,uint64,uint64,uint64,bool)[]" }], "ProposalAddPlugin": [{ "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }, { "name": "delegationType", "type": "uint8" }, { "name": "lastValid", "type": "uint64" }, { "name": "cooldown", "type": "uint64" }, { "name": "methods", "type": "(byte[4],uint64)[]" }, { "name": "useRounds", "type": "bool" }, { "name": "useExecutionKey", "type": "bool" }, { "name": "coverFees", "type": "bool" }, { "name": "defaultToEscrow", "type": "bool" }, { "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "sourceLink", "type": "string" }, { "name": "allowances", "type": "(uint64,uint8,uint64,uint64,uint64,bool)[]" }], "ProposalChangeAdmin": [{ "name": "admin", "type": "address" }], "ProposalDeleteEscrow": [{ "name": "escrow", "type": "string" }], "ProposalExecuteNamedPlugin": [{ "name": "name", "type": "string" }, { "name": "executionKey", "type": "byte[32]" }, { "name": "groups", "type": "byte[32][]" }, { "name": "firstValid", "type": "uint64" }, { "name": "lastValid", "type": "uint64" }], "ProposalExecutePlugin": [{ "name": "plugin", "type": "uint64" }, { "name": "escrow", "type": "string" }, { "name": "executionKey", "type": "byte[32]" }, { "name": "groups", "type": "byte[32][]" }, { "name": "firstValid", "type": "uint64" }, { "name": "lastValid", "type": "uint64" }], "ProposalNewEscrow": [{ "name": "escrow", "type": "string" }, { "name": "address", "type": "address" }], "ProposalReclaim": [{ "name": "escrow", "type": "string" }, { "name": "reclaims", "type": "(uint64,uint64,bool)[]" }], "ProposalRemoveAllowances": [{ "name": "escrow", "type": "string" }, { "name": "assets", "type": "uint64[]" }], "ProposalRemoveExecutePlugin": [{ "name": "executionKey", "type": "byte[32]" }], "ProposalRemoveNamedPlugin": [{ "name": "name", "type": "string" }, { "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }], "ProposalRemovePlugin": [{ "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }], "ProposalToggleEscrowLock": [{ "name": "escrow", "type": "string" }], "ProposalUpdateField": [{ "name": "field", "type": "string" }, { "name": "value", "type": "byte[]" }], "ProposalUpgradeApp": [{ "name": "app", "type": "uint64" }, { "name": "executionKey", "type": "byte[32]" }, { "name": "groups", "type": "byte[32][]" }, { "name": "firstValid", "type": "uint64" }, { "name": "lastValid", "type": "uint64" }] }, "methods": [{ "name": "proposalUpgradeAppShape", "args": [{ "type": "(uint64,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalUpgradeApp", "name": "shape" }], "returns": { "type": "(uint64,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalUpgradeApp" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalAddPluginShape", "args": [{ "type": "(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddPlugin", "name": "shape" }], "returns": { "type": "(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalAddNamedPluginShape", "args": [{ "type": "(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddNamedPlugin", "name": "shape" }], "returns": { "type": "(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddNamedPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemovePluginShape", "args": [{ "type": "(uint64,address,string)", "struct": "ProposalRemovePlugin", "name": "shape" }], "returns": { "type": "(uint64,address,string)", "struct": "ProposalRemovePlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemoveNamedPluginShape", "args": [{ "type": "(string,uint64,address,string)", "struct": "ProposalRemoveNamedPlugin", "name": "shape" }], "returns": { "type": "(string,uint64,address,string)", "struct": "ProposalRemoveNamedPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalExecutePluginShape", "args": [{ "type": "(uint64,string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecutePlugin", "name": "shape" }], "returns": { "type": "(uint64,string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecutePlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalExecuteNamedPluginShape", "args": [{ "type": "(string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecuteNamedPlugin", "name": "shape" }], "returns": { "type": "(string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecuteNamedPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemoveExecutePluginShape", "args": [{ "type": "(byte[32])", "struct": "ProposalRemoveExecutePlugin", "name": "shape" }], "returns": { "type": "(byte[32])", "struct": "ProposalRemoveExecutePlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalAddAllowancesShape", "args": [{ "type": "(string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddAllowances", "name": "shape" }], "returns": { "type": "(string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddAllowances" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemoveAllowancesShape", "args": [{ "type": "(string,uint64[])", "struct": "ProposalRemoveAllowances", "name": "shape" }], "returns": { "type": "(string,uint64[])", "struct": "ProposalRemoveAllowances" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalNewEscrowShape", "args": [{ "type": "(string,address)", "struct": "ProposalNewEscrow", "name": "shape" }], "returns": { "type": "(string,address)", "struct": "ProposalNewEscrow" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalToggleEscrowLockShape", "args": [{ "type": "(string)", "struct": "ProposalToggleEscrowLock", "name": "shape" }], "returns": { "type": "(string)", "struct": "ProposalToggleEscrowLock" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalUpdateFieldShape", "args": [{ "type": "(string,byte[])", "struct": "ProposalUpdateField", "name": "shape" }], "returns": { "type": "(string,byte[])", "struct": "ProposalUpdateField" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalReclaimShape", "args": [{ "type": "(string,(uint64,uint64,bool)[])", "struct": "ProposalReclaim", "name": "shape" }], "returns": { "type": "(string,(uint64,uint64,bool)[])", "struct": "ProposalReclaim" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalChangeAdminShape", "args": [{ "type": "(address)", "struct": "ProposalChangeAdmin", "name": "shape" }], "returns": { "type": "(address)", "struct": "ProposalChangeAdmin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalDeleteEscrowShape", "args": [{ "type": "(string)", "struct": "ProposalDeleteEscrow", "name": "shape" }], "returns": { "type": "(string)", "struct": "ProposalDeleteEscrow" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": ["NoOp"], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [176, 213, 234, 258, 279, 315, 336, 357, 381, 402, 439, 472, 493, 527, 548, 584, 605, 655, 675, 710, 730, 766, 798, 829, 849, 881, 901, 951], "errorMessage": "invalid array length header" }, { "pc": [683], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalAddAllowances" }, { "pc": [410], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalAddNamedPlugin" }, { "pc": [287], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalAddPlugin" }, { "pc": [924], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalChangeAdmin" }, { "pc": [955], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalDeleteEscrow" }, { "pc": [613], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalExecuteNamedPlugin" }, { "pc": [556], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalExecutePlugin" }, { "pc": [771], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalNewEscrow" }, { "pc": [909], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalReclaim" }, { "pc": [738], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemoveAllowances" }, { "pc": [628], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemoveExecutePlugin" }, { "pc": [498], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemoveNamedPlugin" }, { "pc": [444], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemovePlugin" }, { "pc": [802], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalToggleEscrowLock" }, { "pc": [854], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalUpdateField" }, { "pc": [184], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalUpgradeApp" }, { "pc": [790, 943], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]))" }, { "pc": [873], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+(uint64,uint64,bool1)[]))" }, { "pc": [647], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [702], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+uint64[]))" }, { "pc": [821], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+uint8[]))" }, { "pc": [464], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]))" }, { "pc": [307], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [758], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint8[32])" }, { "pc": [576], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [893], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+(uint64,uint64,bool1)[]))" }, { "pc": [667], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [722], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+uint64[]))" }, { "pc": [841], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+uint8[]))" }, { "pc": [519], "errorMessage": "invalid tail pointer at index 1 of (uint64,(len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [250], "errorMessage": "invalid tail pointer at index 16 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [373], "errorMessage": "invalid tail pointer at index 17 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [271], "errorMessage": "invalid tail pointer at index 17 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [394], "errorMessage": "invalid tail pointer at index 18 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [597], "errorMessage": "invalid tail pointer at index 2 of ((len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [168], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [431], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+utf8[]))" }, { "pc": [205], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [485], "errorMessage": "invalid tail pointer at index 3 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]))" }, { "pc": [328], "errorMessage": "invalid tail pointer at index 3 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [540], "errorMessage": "invalid tail pointer at index 3 of (uint64,(len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [226], "errorMessage": "invalid tail pointer at index 6 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [349], "errorMessage": "invalid tail pointer at index 7 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [163, 200, 221, 245, 266, 302, 323, 344, 368, 389, 426, 459, 480, 514, 535, 571, 592, 643, 662, 698, 717, 753, 786, 817, 836, 869, 888, 939], "errorMessage": "invalid tuple encoding" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAyIDEgNAogICAgYnl0ZWNibG9jayAweDE1MWY3Yzc1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhREFPVHlwZXMgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogbWFpbl9fX2FsZ290c19fLmRlZmF1bHRDcmVhdGVAMjMKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydAogICAgcHVzaGJ5dGVzcyAweDkyYjM1ODk2IDB4N2VlNGJhYjcgMHg4MmQ1ZjNmZiAweGYzOTQxYTJjIDB4ZjFjZjIyY2MgMHhiZDRlZjczMCAweGViYWI1ZTE0IDB4NmI4YWJkMmYgMHhmY2FmODQyMCAweDU1Y2U1Y2E5IDB4ZTQ1OGQ1NDQgMHg1MGFhYjgxZCAweDE0OWQzY2NiIDB4MWE0MDJkMWIgMHg3ODk2ZWE1YSAweGUwMzA2YTRiIC8vIG1ldGhvZCAicHJvcG9zYWxVcGdyYWRlQXBwU2hhcGUoKHVpbnQ2NCxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpKSh1aW50NjQsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAicHJvcG9zYWxBZGRQbHVnaW5TaGFwZSgodWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKSkodWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKSIsIG1ldGhvZCAicHJvcG9zYWxBZGROYW1lZFBsdWdpblNoYXBlKChzdHJpbmcsdWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKSkoc3RyaW5nLHVpbnQ2NCxhZGRyZXNzLHN0cmluZyx1aW50OCx1aW50NjQsdWludDY0LChieXRlWzRdLHVpbnQ2NClbXSxib29sLGJvb2wsYm9vbCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsc3RyaW5nLCh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbClbXSkiLCBtZXRob2QgInByb3Bvc2FsUmVtb3ZlUGx1Z2luU2hhcGUoKHVpbnQ2NCxhZGRyZXNzLHN0cmluZykpKHVpbnQ2NCxhZGRyZXNzLHN0cmluZykiLCBtZXRob2QgInByb3Bvc2FsUmVtb3ZlTmFtZWRQbHVnaW5TaGFwZSgoc3RyaW5nLHVpbnQ2NCxhZGRyZXNzLHN0cmluZykpKHN0cmluZyx1aW50NjQsYWRkcmVzcyxzdHJpbmcpIiwgbWV0aG9kICJwcm9wb3NhbEV4ZWN1dGVQbHVnaW5TaGFwZSgodWludDY0LHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpKSh1aW50NjQsc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInByb3Bvc2FsRXhlY3V0ZU5hbWVkUGx1Z2luU2hhcGUoKHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpKShzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAicHJvcG9zYWxSZW1vdmVFeGVjdXRlUGx1Z2luU2hhcGUoKGJ5dGVbMzJdKSkoYnl0ZVszMl0pIiwgbWV0aG9kICJwcm9wb3NhbEFkZEFsbG93YW5jZXNTaGFwZSgoc3RyaW5nLCh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbClbXSkpKHN0cmluZywodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpW10pIiwgbWV0aG9kICJwcm9wb3NhbFJlbW92ZUFsbG93YW5jZXNTaGFwZSgoc3RyaW5nLHVpbnQ2NFtdKSkoc3RyaW5nLHVpbnQ2NFtdKSIsIG1ldGhvZCAicHJvcG9zYWxOZXdFc2Nyb3dTaGFwZSgoc3RyaW5nLGFkZHJlc3MpKShzdHJpbmcsYWRkcmVzcykiLCBtZXRob2QgInByb3Bvc2FsVG9nZ2xlRXNjcm93TG9ja1NoYXBlKChzdHJpbmcpKShzdHJpbmcpIiwgbWV0aG9kICJwcm9wb3NhbFVwZGF0ZUZpZWxkU2hhcGUoKHN0cmluZyxieXRlW10pKShzdHJpbmcsYnl0ZVtdKSIsIG1ldGhvZCAicHJvcG9zYWxSZWNsYWltU2hhcGUoKHN0cmluZywodWludDY0LHVpbnQ2NCxib29sKVtdKSkoc3RyaW5nLCh1aW50NjQsdWludDY0LGJvb2wpW10pIiwgbWV0aG9kICJwcm9wb3NhbENoYW5nZUFkbWluU2hhcGUoKGFkZHJlc3MpKShhZGRyZXNzKSIsIG1ldGhvZCAicHJvcG9zYWxEZWxldGVFc2Nyb3dTaGFwZSgoc3RyaW5nKSkoc3RyaW5nKSIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIHByb3Bvc2FsVXBncmFkZUFwcFNoYXBlIHByb3Bvc2FsQWRkUGx1Z2luU2hhcGUgcHJvcG9zYWxBZGROYW1lZFBsdWdpblNoYXBlIHByb3Bvc2FsUmVtb3ZlUGx1Z2luU2hhcGUgcHJvcG9zYWxSZW1vdmVOYW1lZFBsdWdpblNoYXBlIHByb3Bvc2FsRXhlY3V0ZVBsdWdpblNoYXBlIHByb3Bvc2FsRXhlY3V0ZU5hbWVkUGx1Z2luU2hhcGUgcHJvcG9zYWxSZW1vdmVFeGVjdXRlUGx1Z2luU2hhcGUgcHJvcG9zYWxBZGRBbGxvd2FuY2VzU2hhcGUgcHJvcG9zYWxSZW1vdmVBbGxvd2FuY2VzU2hhcGUgcHJvcG9zYWxOZXdFc2Nyb3dTaGFwZSBwcm9wb3NhbFRvZ2dsZUVzY3Jvd0xvY2tTaGFwZSBwcm9wb3NhbFVwZGF0ZUZpZWxkU2hhcGUgcHJvcG9zYWxSZWNsYWltU2hhcGUgcHJvcG9zYWxDaGFuZ2VBZG1pblNoYXBlIHByb3Bvc2FsRGVsZXRlRXNjcm93U2hhcGUKICAgIGVycgoKbWFpbl9fX2FsZ290c19fLmRlZmF1bHRDcmVhdGVAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhREFPVHlwZXMgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgIQogICAgJiYKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbFVwZ3JhZGVBcHBTaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsVXBncmFkZUFwcFNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDU4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDIgb2YgKHVpbnQ2NCx1aW50OFszMl0sKGxlbit1aW50OFszMl1bXSksdWludDY0LHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgNjAKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsVXBncmFkZUFwcAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbEFkZFBsdWdpblNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxBZGRQbHVnaW5TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czoxMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTA2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDIgb2YgKHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMDgKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDU5CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCA2IG9mICh1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSx1aW50OCx1aW50NjQsdWludDY0LChsZW4rKHVpbnQ4WzRdLHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICoKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCAxMDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDE2IG9mICh1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSx1aW50OCx1aW50NjQsdWludDY0LChsZW4rKHVpbnQ4WzRdLHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCAxMDQKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDE3IG9mICh1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSx1aW50OCx1aW50NjQsdWludDY0LChsZW4rKHVpbnQ4WzRdLHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzQKICAgICoKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbEFkZFBsdWdpbgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbEFkZE5hbWVkUGx1Z2luU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbEFkZE5hbWVkUGx1Z2luU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6MTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMTAKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAzIG9mICgobGVuK3V0ZjhbXSksdWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSksdWludDgsdWludDY0LHVpbnQ2NCwobGVuKyh1aW50OFs0XSx1aW50NjQpW10pLGJvb2wxLGJvb2wxLGJvb2wxLGJvb2wxLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNjEKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDcgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSx1aW50OCx1aW50NjQsdWludDY0LChsZW4rKHVpbnQ4WzRdLHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICoKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCAxMDQKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDE3IG9mICgobGVuK3V0ZjhbXSksdWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSksdWludDgsdWludDY0LHVpbnQ2NCwobGVuKyh1aW50OFs0XSx1aW50NjQpW10pLGJvb2wxLGJvb2wxLGJvb2wxLGJvb2wxLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgMTA2CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxOCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzNAogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsQWRkTmFtZWRQbHVnaW4KICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxSZW1vdmVQbHVnaW5TaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsUmVtb3ZlUGx1Z2luU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6MjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDQyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDIgb2YgKHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0NAogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxSZW1vdmVQbHVnaW4KICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxSZW1vdmVOYW1lZFBsdWdpblNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxSZW1vdmVOYW1lZFBsdWdpblNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjI1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0NgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDMgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbFJlbW92ZU5hbWVkUGx1Z2luCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsRXhlY3V0ZVBsdWdpblNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxFeGVjdXRlUGx1Z2luU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDgKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNjAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAodWludDY0LChsZW4rdXRmOFtdKSx1aW50OFszMl0sKGxlbit1aW50OFszMl1bXSksdWludDY0LHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNjIKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDQyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAzIG9mICh1aW50NjQsKGxlbit1dGY4W10pLHVpbnQ4WzMyXSwobGVuK3VpbnQ4WzMyXVtdKSx1aW50NjQsdWludDY0KQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzMgogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsRXhlY3V0ZVBsdWdpbgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbEV4ZWN1dGVOYW1lZFBsdWdpblNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxFeGVjdXRlTmFtZWRQbHVnaW5TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDUyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50OFszMl0sKGxlbit1aW50OFszMl1bXSksdWludDY0LHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNTQKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDM0CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAyIG9mICgobGVuK3V0ZjhbXSksdWludDhbMzJdLChsZW4rdWludDhbMzJdW10pLHVpbnQ2NCx1aW50NjQpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxFeGVjdXRlTmFtZWRQbHVnaW4KICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxSZW1vdmVFeGVjdXRlUGx1Z2luU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbFJlbW92ZUV4ZWN1dGVQbHVnaW5TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo0MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxSZW1vdmVFeGVjdXRlUGx1Z2luCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsQWRkQWxsb3dhbmNlc1NoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxBZGRBbGxvd2FuY2VzU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgaW50Y18zIC8vIDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDYKICAgICsKICAgIGRpZyAyCiAgICBpbnRjXzEgLy8gMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAoKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDM0CiAgICAqCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxBZGRBbGxvd2FuY2VzCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsUmVtb3ZlQWxsb3dhbmNlc1NoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxSZW1vdmVBbGxvd2FuY2VzU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgaW50Y18zIC8vIDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLChsZW4rdWludDY0W10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA2CiAgICArCiAgICBkaWcgMgogICAgaW50Y18xIC8vIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKChsZW4rdXRmOFtdKSwobGVuK3VpbnQ2NFtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgOAogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsUmVtb3ZlQWxsb3dhbmNlcwogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbE5ld0VzY3Jvd1NoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxOZXdFc2Nyb3dTaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDM0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50OFszMl0pCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDM2CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbE5ld0VzY3JvdwogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbFRvZ2dsZUVzY3Jvd0xvY2tTaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsVG9nZ2xlRXNjcm93TG9ja1NoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjYwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGludGNfMSAvLyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyA0CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbFRvZ2dsZUVzY3Jvd0xvY2sKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxVcGRhdGVGaWVsZFNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxVcGRhdGVGaWVsZFNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjY1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGludGNfMyAvLyA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSwobGVuK3VpbnQ4W10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA2CiAgICArCiAgICBkaWcgMgogICAgaW50Y18xIC8vIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKChsZW4rdXRmOFtdKSwobGVuK3VpbnQ4W10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsVXBkYXRlRmllbGQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxSZWNsYWltU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbFJlY2xhaW1TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo3MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBpbnRjXzMgLy8gNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDYKICAgICsKICAgIGRpZyAyCiAgICBpbnRjXzEgLy8gMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAoKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxNwogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsUmVjbGFpbQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbENoYW5nZUFkbWluU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbENoYW5nZUFkbWluU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NzUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsQ2hhbmdlQWRtaW4KICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxEZWxldGVFc2Nyb3dTaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsRGVsZXRlRXNjcm93U2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6ODAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgaW50Y18xIC8vIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDQKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsRGVsZXRlRXNjcm93CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAIBBCYBBBUffHUxG0EAfzEZFEQxGESCEASSs1iWBH7kurcEgtXz/wTzlBosBPHPIswEvU73MATrq14UBGuKvS8E/K+EIARVzlypBORY1UQEUKq4HQQUnTzLBBpALRsEeJbqWgTgMGpLNhoAjhAACQAuAJUBEAEyAWgBogHbAeoCIQJYAnkCmALMAwMDEgAxGRQxGBQQQzYaAUkVSwGBKFlJgToSREsCTEsCUiJZgSALgTwIEkQoTFCwJEM2GgFJFUsBgShZSYFqEkRLAkxLAlIiWYFsCEsCgTtZSUsCEkRLA0xLA1IiWYEMCyMICEsCgWZZSUsCEkRLA0xLA1IiWSMICEsCgWhZSUsCEkRLA0xLA1IiWYEiCyMICBJEKExQsCRDNhoBSRVLASJZSYFsEkRLAkxLAlIiWYFuCEsCgSpZSUsCEkRLA0xLA1IiWSMICEsCgT1ZSUsCEkRLA0xLA1IiWYEMCyMICEsCgWhZSUsCEkRLA0xLA1IiWSMICEsCgWpZSUsCEkRLA0xLA1IiWYEiCyMICBJEKExQsCRDNhoBSRVLAYEoWUmBKhJESwJMSwJSIlmBLAgSRChMULAkQzYaAUkVSwEiWUmBLBJESwJMSwJSIlmBLghLAoEqWUlLAhJESwNMSwNSIlkjCAgSRChMULAkQzYaAUkVSwGBCFlJgTwSREsCTEsCUiJZgT4ISwKBKllJSwISREsDTEsDUiJZgSALIwgIEkQoTFCwJEM2GgFJFUsBIllJgTQSREsCTEsCUiJZgTYISwKBIllJSwISREsDTEsDUiJZgSALIwgIEkQoTFCwJEM2GgFJFYEgEkQoTFCwJEM2GgFJFUsBIllJJRJESwJMSwJSIlmBBghLAiNZSUsCEkRLA0xLA1IiWYEiCyMICBJEKExQsCRDNhoBSRVLASJZSSUSREsCTEsCUiJZgQYISwIjWUlLAhJESwNMSwNSIlmBCAsjCAgSRChMULAkQzYaAUkVSwEiWUmBIhJESwJMSwJSIlmBJAgSRChMULAkQzYaAUkVSwEiWUkjEkRLAkxLAlIiWSUIEkQoTFCwJEM2GgFJFUsBIllJJRJESwJMSwJSIlmBBghLAiNZSUsCEkRLA0xLA1IiWSMICBJEKExQsCRDNhoBSRVLASJZSSUSREsCTEsCUiJZgQYISwIjWUlLAhJESwNMSwNSIlmBEQsjCAgSRChMULAkQzYaAUkVgSASRChMULAkQzYaAUkVSwEiWUkjEkRLAkxLAlIiWSUIEkQoTFCwJEM=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var AkitaDaoTypesParamsFactory = class {
  /**
   * Constructs a no op call for the proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalUpgradeAppShape(params) {
    return {
      ...params,
      method: "proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalAddPluginShape(params) {
    return {
      ...params,
      method: "proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalAddNamedPluginShape(params) {
    return {
      ...params,
      method: "proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalRemovePluginShape((uint64,address,string))(uint64,address,string) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalRemovePluginShape(params) {
    return {
      ...params,
      method: "proposalRemovePluginShape((uint64,address,string))(uint64,address,string)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalRemoveNamedPluginShape(params) {
    return {
      ...params,
      method: "proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalExecutePluginShape(params) {
    return {
      ...params,
      method: "proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalExecuteNamedPluginShape(params) {
    return {
      ...params,
      method: "proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalRemoveExecutePluginShape((byte[32]))(byte[32]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalRemoveExecutePluginShape(params) {
    return {
      ...params,
      method: "proposalRemoveExecutePluginShape((byte[32]))(byte[32])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalAddAllowancesShape(params) {
    return {
      ...params,
      method: "proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalRemoveAllowancesShape(params) {
    return {
      ...params,
      method: "proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalNewEscrowShape((string,address))(string,address) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalNewEscrowShape(params) {
    return {
      ...params,
      method: "proposalNewEscrowShape((string,address))(string,address)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalToggleEscrowLockShape((string))(string) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalToggleEscrowLockShape(params) {
    return {
      ...params,
      method: "proposalToggleEscrowLockShape((string))(string)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalUpdateFieldShape((string,byte[]))(string,byte[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalUpdateFieldShape(params) {
    return {
      ...params,
      method: "proposalUpdateFieldShape((string,byte[]))(string,byte[])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalReclaimShape(params) {
    return {
      ...params,
      method: "proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[])",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalChangeAdminShape((address))(address) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalChangeAdminShape(params) {
    return {
      ...params,
      method: "proposalChangeAdminShape((address))(address)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
  /**
   * Constructs a no op call for the proposalDeleteEscrowShape((string))(string) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalDeleteEscrowShape(params) {
    return {
      ...params,
      method: "proposalDeleteEscrowShape((string))(string)",
      args: Array.isArray(params.args) ? params.args : [params.args.shape]
    };
  }
};
var AkitaDaoTypesClient = (_class = class _AkitaDaoTypesClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  
  constructor(appClientOrParams) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);
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
   * Returns a new `AkitaDaoTypesClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AkitaDaoTypesClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `AkitaDaoTypesClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AkitaDaoTypesClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
  __init() {this.params = {
    /**
     * Makes a clear_state call to an existing instance of the AkitaDAOTypes smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalUpgradeAppShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalUpgradeAppShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalAddPluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalAddPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalAddNamedPluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalAddNamedPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemovePluginShape((uint64,address,string))(uint64,address,string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalRemovePluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalRemovePluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalRemoveNamedPluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalRemoveNamedPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalExecutePluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalExecutePluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalExecuteNamedPluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalExecuteNamedPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveExecutePluginShape((byte[32]))(byte[32])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalRemoveExecutePluginShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalRemoveExecutePluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalAddAllowancesShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalAddAllowancesShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalRemoveAllowancesShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalRemoveAllowancesShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string,address))(string,address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalNewEscrowShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalNewEscrowShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalToggleEscrowLockShape((string))(string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalToggleEscrowLockShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalToggleEscrowLockShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalUpdateFieldShape((string,byte[]))(string,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalUpdateFieldShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalUpdateFieldShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalReclaimShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalReclaimShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalChangeAdminShape((address))(address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalChangeAdminShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalChangeAdminShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalDeleteEscrowShape((string))(string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    proposalDeleteEscrowShape: (params) => {
      return this.appClient.params.call(AkitaDaoTypesParamsFactory.proposalDeleteEscrowShape(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init2() {this.createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the AkitaDAOTypes smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalUpgradeAppShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalUpgradeAppShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalAddPluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalAddPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalAddNamedPluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalAddNamedPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemovePluginShape((uint64,address,string))(uint64,address,string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalRemovePluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalRemovePluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalRemoveNamedPluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalRemoveNamedPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalExecutePluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalExecutePluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalExecuteNamedPluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalExecuteNamedPluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveExecutePluginShape((byte[32]))(byte[32])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalRemoveExecutePluginShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalRemoveExecutePluginShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalAddAllowancesShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalAddAllowancesShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalRemoveAllowancesShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalRemoveAllowancesShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string,address))(string,address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalNewEscrowShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalNewEscrowShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalToggleEscrowLockShape((string))(string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalToggleEscrowLockShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalToggleEscrowLockShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalUpdateFieldShape((string,byte[]))(string,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalUpdateFieldShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalUpdateFieldShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalReclaimShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalReclaimShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalChangeAdminShape((address))(address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalChangeAdminShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalChangeAdminShape(params));
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalDeleteEscrowShape((string))(string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    proposalDeleteEscrowShape: (params) => {
      return this.appClient.createTransaction.call(AkitaDaoTypesParamsFactory.proposalDeleteEscrowShape(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init3() {this.send = {
    /**
     * Makes a clear_state call to an existing instance of the AkitaDAOTypes smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalUpgradeAppShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalUpgradeAppShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalAddPluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalAddPluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalAddNamedPluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalAddNamedPluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemovePluginShape((uint64,address,string))(uint64,address,string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalRemovePluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemovePluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalRemoveNamedPluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemoveNamedPluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalExecutePluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalExecutePluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalExecuteNamedPluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalExecuteNamedPluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveExecutePluginShape((byte[32]))(byte[32])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalRemoveExecutePluginShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemoveExecutePluginShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalAddAllowancesShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalAddAllowancesShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalRemoveAllowancesShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemoveAllowancesShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string,address))(string,address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalNewEscrowShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalNewEscrowShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalToggleEscrowLockShape((string))(string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalToggleEscrowLockShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalToggleEscrowLockShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalUpdateFieldShape((string,byte[]))(string,byte[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalUpdateFieldShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalUpdateFieldShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[])` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalReclaimShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalReclaimShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalChangeAdminShape((address))(address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalChangeAdminShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalChangeAdminShape(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalDeleteEscrowShape((string))(string)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    proposalDeleteEscrowShape: async (params) => {
      const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalDeleteEscrowShape(params));
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
    return new _AkitaDaoTypesClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalUpgradeAppShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalUpgradeAppShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalAddPluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalAddPluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalAddNamedPluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalAddNamedPluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalRemovePluginShape((uint64,address,string))(uint64,address,string)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalRemovePluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemovePluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalRemoveNamedPluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemoveNamedPluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalExecutePluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalExecutePluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalExecuteNamedPluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalExecuteNamedPluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalRemoveExecutePluginShape((byte[32]))(byte[32])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalRemoveExecutePluginShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemoveExecutePluginShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalAddAllowancesShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalAddAllowancesShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalRemoveAllowancesShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalRemoveAllowancesShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string,address))(string,address)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalNewEscrowShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalNewEscrowShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalToggleEscrowLockShape((string))(string)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalToggleEscrowLockShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalToggleEscrowLockShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalUpdateFieldShape((string,byte[]))(string,byte[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalUpdateFieldShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalUpdateFieldShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[])` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalReclaimShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalReclaimShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalChangeAdminShape((address))(address)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalChangeAdminShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalChangeAdminShape(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalDeleteEscrowShape((string))(string)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async proposalDeleteEscrowShape(params) {
    const result = await this.appClient.send.call(AkitaDaoTypesParamsFactory.proposalDeleteEscrowShape(params));
    return result.return;
  }
  /**
   * Methods to access state for the current AkitaDAOTypes app
   */
  __init4() {this.state = {}}
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64) method call against the AkitaDAOTypes contract
       */
      proposalUpgradeAppShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalUpgradeAppShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64)", v));
        return this;
      },
      /**
       * Add a proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalAddPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalAddPluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", v));
        return this;
      },
      /**
       * Add a proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalAddNamedPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalAddNamedPluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", v));
        return this;
      },
      /**
       * Add a proposalRemovePluginShape((uint64,address,string))(uint64,address,string) method call against the AkitaDAOTypes contract
       */
      proposalRemovePluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemovePluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalRemovePluginShape((uint64,address,string))(uint64,address,string)", v));
        return this;
      },
      /**
       * Add a proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string) method call against the AkitaDAOTypes contract
       */
      proposalRemoveNamedPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemoveNamedPluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string)", v));
        return this;
      },
      /**
       * Add a proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64) method call against the AkitaDAOTypes contract
       */
      proposalExecutePluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalExecutePluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64)", v));
        return this;
      },
      /**
       * Add a proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64) method call against the AkitaDAOTypes contract
       */
      proposalExecuteNamedPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalExecuteNamedPluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64)", v));
        return this;
      },
      /**
       * Add a proposalRemoveExecutePluginShape((byte[32]))(byte[32]) method call against the AkitaDAOTypes contract
       */
      proposalRemoveExecutePluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemoveExecutePluginShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalRemoveExecutePluginShape((byte[32]))(byte[32])", v));
        return this;
      },
      /**
       * Add a proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalAddAllowancesShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalAddAllowancesShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[])", v));
        return this;
      },
      /**
       * Add a proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[]) method call against the AkitaDAOTypes contract
       */
      proposalRemoveAllowancesShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemoveAllowancesShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[])", v));
        return this;
      },
      /**
       * Add a proposalNewEscrowShape((string,address))(string,address) method call against the AkitaDAOTypes contract
       */
      proposalNewEscrowShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalNewEscrowShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalNewEscrowShape((string,address))(string,address)", v));
        return this;
      },
      /**
       * Add a proposalToggleEscrowLockShape((string))(string) method call against the AkitaDAOTypes contract
       */
      proposalToggleEscrowLockShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalToggleEscrowLockShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalToggleEscrowLockShape((string))(string)", v));
        return this;
      },
      /**
       * Add a proposalUpdateFieldShape((string,byte[]))(string,byte[]) method call against the AkitaDAOTypes contract
       */
      proposalUpdateFieldShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalUpdateFieldShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalUpdateFieldShape((string,byte[]))(string,byte[])", v));
        return this;
      },
      /**
       * Add a proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalReclaimShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalReclaimShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalReclaimShape((string,(uint64,uint64,bool)[]))(string,(uint64,uint64,bool)[])", v));
        return this;
      },
      /**
       * Add a proposalChangeAdminShape((address))(address) method call against the AkitaDAOTypes contract
       */
      proposalChangeAdminShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalChangeAdminShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalChangeAdminShape((address))(address)", v));
        return this;
      },
      /**
       * Add a proposalDeleteEscrowShape((string))(string) method call against the AkitaDAOTypes contract
       */
      proposalDeleteEscrowShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalDeleteEscrowShape(params)));
        resultMappers.push((v) => client.decodeReturnValue("proposalDeleteEscrowShape((string))(string)", v));
        return this;
      },
      /**
       * Add a clear state call to the AkitaDAOTypes contract
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
}, _class);

// src/dao/types.ts
var SplitDistributionType = /* @__PURE__ */ ((SplitDistributionType2) => {
  SplitDistributionType2[SplitDistributionType2["Flat"] = 10] = "Flat";
  SplitDistributionType2[SplitDistributionType2["Percentage"] = 20] = "Percentage";
  SplitDistributionType2[SplitDistributionType2["Remainder"] = 30] = "Remainder";
  return SplitDistributionType2;
})(SplitDistributionType || {});
function SplitsToTuples(splits) {
  return splits.map((split) => [[split.receiver.wallet, split.receiver.escrow], split.type, split.value]);
}

// src/dao/constants.ts
var ProposalActionEnum = /* @__PURE__ */ ((ProposalActionEnum2) => {
  ProposalActionEnum2[ProposalActionEnum2["UpgradeApp"] = 10] = "UpgradeApp";
  ProposalActionEnum2[ProposalActionEnum2["AddPlugin"] = 20] = "AddPlugin";
  ProposalActionEnum2[ProposalActionEnum2["AddNamedPlugin"] = 21] = "AddNamedPlugin";
  ProposalActionEnum2[ProposalActionEnum2["ExecutePlugin"] = 30] = "ExecutePlugin";
  ProposalActionEnum2[ProposalActionEnum2["RemoveExecutePlugin"] = 31] = "RemoveExecutePlugin";
  ProposalActionEnum2[ProposalActionEnum2["RemovePlugin"] = 40] = "RemovePlugin";
  ProposalActionEnum2[ProposalActionEnum2["RemoveNamedPlugin"] = 41] = "RemoveNamedPlugin";
  ProposalActionEnum2[ProposalActionEnum2["AddAllowances"] = 50] = "AddAllowances";
  ProposalActionEnum2[ProposalActionEnum2["RemoveAllowances"] = 60] = "RemoveAllowances";
  ProposalActionEnum2[ProposalActionEnum2["NewEscrow"] = 70] = "NewEscrow";
  ProposalActionEnum2[ProposalActionEnum2["ToggleEscrowLock"] = 71] = "ToggleEscrowLock";
  ProposalActionEnum2[ProposalActionEnum2["Reclaim"] = 72] = "Reclaim";
  ProposalActionEnum2[ProposalActionEnum2["DeleteEscrow"] = 73] = "DeleteEscrow";
  ProposalActionEnum2[ProposalActionEnum2["UpdateFields"] = 80] = "UpdateFields";
  ProposalActionEnum2[ProposalActionEnum2["UpdateWallet"] = 90] = "UpdateWallet";
  ProposalActionEnum2[ProposalActionEnum2["ChangeAdmin"] = 91] = "ChangeAdmin";
  return ProposalActionEnum2;
})(ProposalActionEnum || {});
var EMPTY_CID = Buffer.from("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
var DAOProposalVotesMBR = 25700n;
var DAOLegacyProposalVotesMBR = 22500n;
var DAOParticipationMBR = 25300n;
var DAOVoteReceiptBoxPrefix = "w";
var DAOLegacyVoteReceiptBoxPrefix = "v";
var DAOParticipationBoxPrefix = "r";
var ProposalStatusEnum = /* @__PURE__ */ ((ProposalStatusEnum2) => {
  ProposalStatusEnum2[ProposalStatusEnum2["Draft"] = 0] = "Draft";
  ProposalStatusEnum2[ProposalStatusEnum2["Invalid"] = 10] = "Invalid";
  ProposalStatusEnum2[ProposalStatusEnum2["Voting"] = 20] = "Voting";
  ProposalStatusEnum2[ProposalStatusEnum2["Rejected"] = 30] = "Rejected";
  ProposalStatusEnum2[ProposalStatusEnum2["Approved"] = 40] = "Approved";
  ProposalStatusEnum2[ProposalStatusEnum2["Executed"] = 50] = "Executed";
  return ProposalStatusEnum2;
})(ProposalStatusEnum || {});
var DAOProposalTallyMBR = 25300n;
var MaxBootstrapKeyRounds = 10000n;
var DAOBootstrapKeyBoxPrefix = "b";

// src/dao/votes.ts
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var ascii = (prefix) => new Uint8Array([prefix.charCodeAt(0)]);
function concat(...parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
var u64 = (bytes, offset) => _algosdk2.default.bytesToBigInt(bytes.slice(offset, offset + 8));
function voteReceiptBoxName(proposalId, voter, legacy = false) {
  const prefix = legacy ? DAOLegacyVoteReceiptBoxPrefix : DAOVoteReceiptBoxPrefix;
  return concat(ascii(prefix), _algosdk.encodeUint64.call(void 0, proposalId), _algosdk2.default.decodeAddress(voter).publicKey);
}
function participationBoxName(voter) {
  return concat(ascii(DAOParticipationBoxPrefix), _algosdk2.default.decodeAddress(voter).publicKey);
}
function decodeVoteReceipt(value, legacy) {
  const size = legacy ? 9 : 17;
  if (value.length !== size) throw new Error(`vote receipt must be ${size} bytes, got ${value.length}`);
  return { type: value[0], power: u64(value, 1), weight: legacy ? 0n : u64(value, 9), legacy };
}
function decodeGovernanceParticipation(value) {
  if (value.length !== 24) throw new Error(`participation record must be 24 bytes, got ${value.length}`);
  return { lastVotedTs: u64(value, 0), lastProposalId: u64(value, 8), votes: u64(value, 16) };
}
function voteCost({ receipt, legacyReceipt, participation }) {
  const payment = (receipt ? 0n : DAOProposalVotesMBR) + (participation ? 0n : DAOParticipationMBR);
  const refund = !receipt && legacyReceipt ? DAOLegacyProposalVotesMBR : 0n;
  return { payment, refund };
}

// src/dao/index.ts

var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/dao/legacy.ts
var LEGACY_DAO_ACTION_STRUCTS = {
  ProposalNewEscrow: [{ name: "escrow", type: "string" }]
};
function decodeLegacyProposalNewEscrow(actionData) {
  return _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, 
    actionData,
    "ProposalNewEscrow",
    LEGACY_DAO_ACTION_STRUCTS
  );
}
function usesLegacyEscrowActionShape(proposalTimestamp, cutoverTimestamp) {
  return cutoverTimestamp !== void 0 && proposalTimestamp < cutoverTimestamp;
}

// src/dao/errors.ts
var DAO_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
  // --- Top-level aliases ---------------------------------------------------
  NDAO: "Not the Akita DAO",
  IPAY: "Invalid payment",
  // --- Account-scoped aliases ---------------------------------------------
  FORB: "Forbidden",
  IUPG: "Invalid upgrade",
  WSUP: "Wallet already set up",
  NEXK: "Execution key not found",
  EALW: "Allowance already exists",
  NALW: "Allowance does not exist",
  EESC: "Escrow already exists",
  NESC: "Escrow does not exist",
  // --- DAO errors ----------------------------------------------------------
  NINIT: "DAO is not initialized",
  NACT: "Action list cannot be empty",
  ISND: "Incorrect sender",
  LPOW: "Insufficient proposal threshold",
  IACT: "Invalid proposal action",
  IPST: "Invalid proposal state",
  NPAY: "Payment not required",
  RPAY: "Payment required",
  NPRP: "Proposal does not exist",
  NPVT: "Proposal vote not found",
  MXAC: "Too many actions in the proposal",
  VDUR: "Voting duration not met",
  VPRT: "Voting participation not met",
  INIT: "Already initialized",
  IVER: "Version cannot be empty",
  // --- Validator errors ----------------------------------------------------
  ALZ0: "Action limit must be greater than zero",
  LEMP: "Allowance list cannot be empty",
  ICID: "Invalid CID",
  IDUR: "Invalid duration",
  IMXA: "Invalid maximum approval percentage",
  IMXP: "Invalid maximum participation percentage",
  IMXW: "Invalid maximum power",
  IMNA: "Invalid minimum approval percentage",
  IMNP: "Invalid minimum participation percentage",
  IMNW: "Invalid minimum power",
  IMRI: "Invalid minimum rewards impact",
  IPAL: "Invalid proposal action limit",
  MRI0: "Minimum rewards impact must be greater than zero",
  MRI1K: "Minimum rewards impact must be less than or equal to 1000",
  NEXE: "Plugin is not executable",
  EPLG: "Plugin already exists",
  NPLG: "Plugin does not exist",
  PEXP: "Plugin has expired",
  // --- Validator inline-string constants ----------------------------------
  NGRP: "Upgrade app action must have at least one group",
  IFV: "First valid round must be greater than zero",
  ILV: "Last valid round must be greater than first valid",
  UFLD: "Unknown field in update fields proposal action",
  REMP: "Reclaim list cannot be empty",
  IADM: "Invalid administrator",
  // --- Audit 2026-10 remediation --------------------------------------------
  BSFB: "Not allowed in a bootstrap (creator-approved) proposal",
  BSEX: "Bootstrap proposals cannot execute after the DAO is fully initialized",
  BSKO: "Bootstrap execution keys are still outstanding; clear them before initializing",
  BSKA: "Only the creator can revoke a live, unexpired bootstrap execution key",
  EXKR: "Execution key already registered",
  VOUT: "Vote receipts are still outstanding for this proposal",
  CANL: "ChangeAdmin must be the last action of a proposal",
  CFCD: "A fee-covering plugin grant needs a cooldown and a named caller or an execution key",
  NUPX: "Group is not authorized by a DAO UpgradeApp execution for this target",
  NPOW: "No voting power: voting needs a lock that outlasts the vote with at least a week of it left"
});
var ARC65_PREFIX = "ERR:";
var ARC65_ALT_PREFIX = "AER:";
function parseDaoErrorCode(input) {
  var _a;
  if (!input) return void 0;
  let rest = input;
  if (rest.startsWith(ARC65_PREFIX)) rest = rest.slice(ARC65_PREFIX.length);
  else if (rest.startsWith(ARC65_ALT_PREFIX)) rest = rest.slice(ARC65_ALT_PREFIX.length);
  const code = (_a = rest.split(":", 1)[0]) == null ? void 0 : _a.trim();
  if (!code) return void 0;
  return code in DAO_ERROR_MESSAGES ? code : void 0;
}
function translateDaoError(input) {
  const code = parseDaoErrorCode(input);
  if (code !== void 0) return DAO_ERROR_MESSAGES[code];
  return input;
}

// src/dao/index.ts
var AkitaDaoSDK = (_class2 = class extends _chunk7VSUJWG7js.BaseSDK {
  
  __init5() {this._wallet = null}
  __init6() {this._walletInitPromise = null}
  
  constructor(params) {
    super({ factory: _chunkDGKAG3SOjs.AkitaDaoFactory, ...params }, _chunkLNVZHCCXjs.ENV_VAR_NAMES.DAO_APP_ID);_class2.prototype.__init5.call(this);_class2.prototype.__init6.call(this);;
    this.typeClient = new AkitaDaoTypesClient({ algorand: this.algorand, appId: 0n });
    this._constructorParams = params;
  }
  /**
   * Get the wallet SDK associated with this DAO.
   * Lazily fetches the wallet app ID from the DAO's global state on first access.
   */
  async getWallet() {
    if (this._wallet) {
      return this._wallet;
    }
    if (!this._walletInitPromise) {
      this._walletInitPromise = this._initializeWallet();
    }
    return this._walletInitPromise;
  }
  async _initializeWallet() {
    const walletAppId = await this.client.state.global.wallet();
    if (!walletAppId) {
      throw new Error("Could not read wallet app ID from DAO global state. Has the DAO been set up?");
    }
    this._wallet = new (0, _chunkAP3B4YYAjs.WalletSDK)({
      ...this._constructorParams,
      factoryParams: {
        ...this._constructorParams.factoryParams,
        appId: walletAppId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
    return this._wallet;
  }
  /**
   * @deprecated Use getWallet() instead for proper async initialization.
   * This getter exists for backwards compatibility but will throw if the wallet
   * hasn't been initialized yet via getWallet() or setup().
   */
  get wallet() {
    if (!this._wallet) {
      throw new Error(
        'Wallet not initialized. Call "await dao.getWallet()" first to initialize the wallet SDK, or use "await dao.setup()" to create a new DAO with its wallet.'
      );
    }
    return this._wallet;
  }
  /**
   * Allows setting the wallet directly (used by setup() and for testing)
   */
  set wallet(wallet) {
    this._wallet = wallet;
    this._walletInitPromise = Promise.resolve(wallet);
  }
  async prepProposalActions(actions) {
    const needsWallet = actions.some(
      (a) => a.type === 30 /* ExecutePlugin */ || a.type === 31 /* RemoveExecutePlugin */ || a.type === 40 /* RemovePlugin */ || a.type === 41 /* RemoveNamedPlugin */
    );
    const wallet = needsWallet ? await this.getWallet() : null;
    const preppedActions = [];
    for (let i = 0; i < actions.length; i++) {
      const typedAction = actions[i];
      let abiAction;
      let structType = "";
      switch (typedAction.type) {
        case 10 /* UpgradeApp */: {
          const { type, ...action } = typedAction;
          abiAction = action;
          structType = "ProposalUpgradeApp";
          break;
        }
        case 20 /* AddPlugin */:
        case 21 /* AddNamedPlugin */: {
          const { type: actionType, ...action } = typedAction;
          let {
            name = "",
            client,
            caller,
            callerType: pluginCallerType = _chunkAP3B4YYAjs.CallerType.Other,
            methods = [],
            escrow = "",
            delegationType = 0n,
            lastValid = _chunkLNVZHCCXjs.MAX_UINT64,
            cooldown = 0n,
            useRounds = false,
            useExecutionKey = false,
            coverFees = false,
            defaultToEscrow = false,
            sourceLink = "",
            allowances = []
          } = action;
          let fee = 0n;
          let power = 0n;
          let duration = 0n;
          let participation = 0n;
          let approval = 0n;
          if (action.useExecutionKey) {
            fee = action.fee;
            power = action.power;
            duration = action.duration;
            participation = action.participation;
            approval = action.approval;
            if (duration === 0n || participation === 0n || approval === 0n) {
              throw new Error("Proposal Settings must be set when using execution key");
            }
          }
          const plugin = client.appId;
          if (pluginCallerType === _chunkAP3B4YYAjs.CallerType.Global) {
            caller = _algosdk.ALGORAND_ZERO_ADDRESS_STRING;
          } else if (pluginCallerType === _chunkAP3B4YYAjs.CallerType.Admin) {
            caller = _algosdk2.default.getApplicationAddress(client.appId).toString();
          }
          let transformedMethods = [];
          if (methods.length > 0) {
            transformedMethods = methods.reduce(
              (acc, method) => {
                if (_chunkWXNDITZIjs.isPluginSDKReturn.call(void 0, method.name)) {
                  const selectors = _nullishCoalesce(method.name().selectors, () => ( []));
                  selectors.forEach((selector) => acc.push([selector, method.cooldown]));
                } else {
                  method.name.forEach((x) => acc.push([x, method.cooldown]));
                }
                return acc;
              },
              []
            );
          }
          const args = {
            plugin,
            caller,
            escrow,
            delegationType,
            lastValid,
            cooldown,
            methods: transformedMethods,
            useRounds,
            useExecutionKey,
            coverFees,
            defaultToEscrow,
            fee,
            power,
            duration,
            participation,
            approval,
            sourceLink,
            allowances: _chunkMZHAP7IAjs.AllowancesToTuple.call(void 0, allowances)
          };
          if (name) {
            abiAction = { name, ...args };
            structType = "ProposalAddNamedPlugin";
          } else {
            abiAction = args;
            structType = "ProposalAddPlugin";
          }
          break;
        }
        case 30 /* ExecutePlugin */: {
          const { type, ...action } = typedAction;
          const { plugin, escrow } = action;
          if (!wallet.plugins.has({ plugin, caller: _algosdk.ALGORAND_ZERO_ADDRESS_STRING, escrow })) {
            try {
              await wallet.getPluginByKey({ plugin, caller: _algosdk.ALGORAND_ZERO_ADDRESS_STRING, escrow });
            } catch (e) {
              throw new Error(`Plugin: ${plugin} for escrow: ${escrow} not found`);
            }
          }
          abiAction = action;
          structType = "ProposalExecutePlugin";
          break;
        }
        case 31 /* RemoveExecutePlugin */: {
          const { type, ...action } = typedAction;
          if (!wallet.executions.has(action.executionKey)) {
            try {
              await wallet.getExecution(action.executionKey);
            } catch (e) {
              throw new Error(`Execution with key: ${action.executionKey} not found`);
            }
          }
          abiAction = action;
          structType = "ProposalRemoveExecutePlugin";
          break;
        }
        case 40 /* RemovePlugin */: {
          const { type, ...action } = typedAction;
          const { plugin, caller, escrow } = action;
          if (!wallet.plugins.has({ plugin, caller, escrow })) {
            try {
              await wallet.getPluginByKey({ plugin, caller, escrow });
            } catch (e) {
              throw new Error(`Plugin: ${plugin} with caller: ${caller} for escrow: ${escrow} not found`);
            }
          }
          abiAction = action;
          structType = "ProposalRemovePlugin";
          break;
        }
        case 41 /* RemoveNamedPlugin */: {
          const { name } = typedAction;
          const key = await wallet.client.arc58GetNamedPluginKey({ args: { name } });
          abiAction = { name, plugin: key.plugin, caller: key.caller, escrow: key.escrow };
          structType = "ProposalRemoveNamedPlugin";
          break;
        }
        case 50 /* AddAllowances */: {
          const { escrow, allowances } = typedAction;
          abiAction = { escrow, allowances: _chunkMZHAP7IAjs.AllowancesToTuple.call(void 0, allowances) };
          structType = "ProposalAddAllowances";
          break;
        }
        case 60 /* RemoveAllowances */: {
          const { type, ...action } = typedAction;
          abiAction = action;
          structType = "ProposalRemoveAllowances";
          break;
        }
        case 70 /* NewEscrow */: {
          const { type, ...action } = typedAction;
          abiAction = action;
          structType = "ProposalNewEscrow";
          break;
        }
        case 71 /* ToggleEscrowLock */: {
          const { type, ...action } = typedAction;
          abiAction = action;
          structType = "ProposalToggleEscrowLock";
          break;
        }
        case 72 /* Reclaim */: {
          const { escrow, reclaims } = typedAction;
          abiAction = { escrow, reclaims: reclaims.map(({ asset, amount, closeOut }) => [asset, amount, closeOut]) };
          structType = "ProposalReclaim";
          break;
        }
        case 73 /* DeleteEscrow */: {
          const { type, ...action } = typedAction;
          abiAction = action;
          structType = "ProposalDeleteEscrow";
          break;
        }
        case 91 /* ChangeAdmin */: {
          const { type, ...action } = typedAction;
          abiAction = action;
          structType = "ProposalChangeAdmin";
          break;
        }
        case 80 /* UpdateFields */: {
          const { type, ...action } = typedAction;
          let data;
          switch (action.field) {
            case "content_policy": {
              data = action.value;
              break;
            }
            case "proposal_action_limit":
            case "min_rewards_impact": {
              data = _algosdk.encodeUint64.call(void 0, action.value);
              break;
            }
            case "aal": {
              const currentApps = await this.client.state.global.akitaAppList();
              const {
                staking = _nullishCoalesce((currentApps == null ? void 0 : currentApps.staking), () => ( 0n)),
                rewards = _nullishCoalesce((currentApps == null ? void 0 : currentApps.rewards), () => ( 0n)),
                pool = _nullishCoalesce((currentApps == null ? void 0 : currentApps.pool), () => ( 0n)),
                prizeBox = _nullishCoalesce((currentApps == null ? void 0 : currentApps.prizeBox), () => ( 0n)),
                subscriptions = _nullishCoalesce((currentApps == null ? void 0 : currentApps.subscriptions), () => ( 0n)),
                gate = _nullishCoalesce((currentApps == null ? void 0 : currentApps.gate), () => ( 0n)),
                auction = _nullishCoalesce((currentApps == null ? void 0 : currentApps.auction), () => ( 0n)),
                hyperSwap = _nullishCoalesce((currentApps == null ? void 0 : currentApps.hyperSwap), () => ( 0n)),
                raffle = _nullishCoalesce((currentApps == null ? void 0 : currentApps.raffle), () => ( 0n)),
                metaMerkles = _nullishCoalesce((currentApps == null ? void 0 : currentApps.metaMerkles), () => ( 0n)),
                marketplace = _nullishCoalesce((currentApps == null ? void 0 : currentApps.marketplace), () => ( 0n)),
                wallet: wallet2 = _nullishCoalesce((currentApps == null ? void 0 : currentApps.wallet), () => ( 0n))
              } = action.value;
              const abiData = {
                staking,
                rewards,
                pool,
                prizeBox,
                subscriptions,
                gate,
                auction,
                hyperSwap,
                raffle,
                metaMerkles,
                marketplace,
                wallet: wallet2
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "AkitaAppList", this.client.appClient.appSpec.structs);
              break;
            }
            case "sal": {
              const currentApps = await this.client.state.global.akitaSocialAppList();
              const {
                social = _nullishCoalesce((currentApps == null ? void 0 : currentApps.social), () => ( 0n)),
                graph = _nullishCoalesce((currentApps == null ? void 0 : currentApps.graph), () => ( 0n)),
                impact = _nullishCoalesce((currentApps == null ? void 0 : currentApps.impact), () => ( 0n)),
                moderation = _nullishCoalesce((currentApps == null ? void 0 : currentApps.moderation), () => ( 0n))
              } = action.value;
              const abiData = {
                social,
                graph,
                impact,
                moderation
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "AkitaSocialAppList", this.client.appClient.appSpec.structs);
              break;
            }
            case "pal": {
              const currentApps = await this.client.state.global.pluginAppList();
              const {
                optin = _nullishCoalesce((currentApps == null ? void 0 : currentApps.optin), () => ( 0n)),
                revenueManager = _nullishCoalesce((currentApps == null ? void 0 : currentApps.revenueManager), () => ( 0n)),
                update = _nullishCoalesce((currentApps == null ? void 0 : currentApps.update), () => ( 0n))
              } = action.value;
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, { optin, revenueManager, update }, "PluginAppList", this.client.appClient.appSpec.structs);
              break;
            }
            case "oal": {
              const currentApps = await this.client.state.global.otherAppList();
              const {
                vrfBeacon = _nullishCoalesce((currentApps == null ? void 0 : currentApps.vrfBeacon), () => ( 0n)),
                nfdRegistry = _nullishCoalesce((currentApps == null ? void 0 : currentApps.nfdRegistry), () => ( 0n)),
                assetInbox = _nullishCoalesce((currentApps == null ? void 0 : currentApps.assetInbox), () => ( 0n)),
                escrow = _nullishCoalesce((currentApps == null ? void 0 : currentApps.escrow), () => ( 0n)),
                poll = _nullishCoalesce((currentApps == null ? void 0 : currentApps.poll), () => ( 0n)),
                akitaNfd = _nullishCoalesce((currentApps == null ? void 0 : currentApps.akitaNfd), () => ( 0n)),
                daoProposalValidator = _nullishCoalesce((currentApps == null ? void 0 : currentApps.daoProposalValidator), () => ( 0n))
              } = action.value;
              const abiData = {
                vrfBeacon,
                nfdRegistry,
                assetInbox,
                escrow,
                poll,
                akitaNfd,
                daoProposalValidator
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "OtherAppList", this.client.appClient.appSpec.structs);
              break;
            }
            case "wallet_fees": {
              const currentFees = await this.client.state.global.walletFees();
              const {
                createFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.createFee), () => ( 0n)),
                referrerPercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.referrerPercentage), () => ( 0n))
              } = action.value;
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, { createFee, referrerPercentage }, "WalletFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "guild_fees": {
              const currentFees = await this.client.state.global.guildFees();
              const { createFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.createFee), () => ( 0n)) } = action.value;
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, { createFee }, "GuildFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "social_fees": {
              const currentFees = await this.client.state.global.socialFees();
              const {
                postFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.postFee), () => ( 0n)),
                reactFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.reactFee), () => ( 0n)),
                impactTaxMin = _nullishCoalesce((currentFees == null ? void 0 : currentFees.impactTaxMin), () => ( 0n)),
                impactTaxMax = _nullishCoalesce((currentFees == null ? void 0 : currentFees.impactTaxMax), () => ( 0n))
              } = action.value;
              const abiData = {
                postFee,
                reactFee,
                impactTaxMin,
                impactTaxMax
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "SocialFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "staking_fees": {
              const currentFees = await this.client.state.global.stakingFees();
              const {
                creationFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.creationFee), () => ( 0n)),
                impactTaxMin = _nullishCoalesce((currentFees == null ? void 0 : currentFees.impactTaxMin), () => ( 0n)),
                impactTaxMax = _nullishCoalesce((currentFees == null ? void 0 : currentFees.impactTaxMax), () => ( 0n))
              } = action.value;
              const abiData = {
                creationFee,
                impactTaxMin,
                impactTaxMax
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "StakingFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "subscription_fees": {
              const currentFees = await this.client.state.global.subscriptionFees();
              const {
                serviceCreationFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.serviceCreationFee), () => ( 0n)),
                paymentPercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.paymentPercentage), () => ( 0n)),
                triggerPercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.triggerPercentage), () => ( 0n))
              } = action.value;
              const abiData = {
                serviceCreationFee,
                paymentPercentage,
                triggerPercentage
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "SubscriptionFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "nft_fees": {
              const currentFees = await this.client.state.global.nftFees();
              const {
                marketplaceSalePercentageMin = _nullishCoalesce((currentFees == null ? void 0 : currentFees.marketplaceSalePercentageMin), () => ( 0n)),
                marketplaceSalePercentageMax = _nullishCoalesce((currentFees == null ? void 0 : currentFees.marketplaceSalePercentageMax), () => ( 0n)),
                marketplaceComposablePercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.marketplaceComposablePercentage), () => ( 0n)),
                marketplaceRoyaltyDefaultPercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.marketplaceRoyaltyDefaultPercentage), () => ( 0n)),
                shuffleSalePercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.shuffleSalePercentage), () => ( 0n)),
                omnigemSaleFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.omnigemSaleFee), () => ( 0n)),
                auctionCreationFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.auctionCreationFee), () => ( 0n)),
                auctionSaleImpactTaxMin = _nullishCoalesce((currentFees == null ? void 0 : currentFees.auctionSaleImpactTaxMin), () => ( 0n)),
                auctionSaleImpactTaxMax = _nullishCoalesce((currentFees == null ? void 0 : currentFees.auctionSaleImpactTaxMax), () => ( 0n)),
                auctionComposablePercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.auctionComposablePercentage), () => ( 0n)),
                auctionRafflePercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.auctionRafflePercentage), () => ( 0n)),
                raffleCreationFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.raffleCreationFee), () => ( 0n)),
                raffleSaleImpactTaxMin = _nullishCoalesce((currentFees == null ? void 0 : currentFees.raffleSaleImpactTaxMin), () => ( 0n)),
                raffleSaleImpactTaxMax = _nullishCoalesce((currentFees == null ? void 0 : currentFees.raffleSaleImpactTaxMax), () => ( 0n)),
                raffleComposablePercentage = _nullishCoalesce((currentFees == null ? void 0 : currentFees.raffleComposablePercentage), () => ( 0n))
              } = action.value;
              const abiData = {
                marketplaceSalePercentageMin,
                marketplaceSalePercentageMax,
                marketplaceComposablePercentage,
                marketplaceRoyaltyDefaultPercentage,
                shuffleSalePercentage,
                omnigemSaleFee,
                auctionCreationFee,
                auctionSaleImpactTaxMin,
                auctionSaleImpactTaxMax,
                auctionComposablePercentage,
                auctionRafflePercentage,
                raffleCreationFee,
                raffleSaleImpactTaxMin,
                raffleSaleImpactTaxMax,
                raffleComposablePercentage
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "NFTFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "swap_fees": {
              const currentFees = await this.client.state.global.swapFees();
              const {
                impactTaxMin = _nullishCoalesce((currentFees == null ? void 0 : currentFees.impactTaxMin), () => ( 0n)),
                impactTaxMax = _nullishCoalesce((currentFees == null ? void 0 : currentFees.impactTaxMax), () => ( 0n))
              } = action.value;
              const abiData = {
                impactTaxMin,
                impactTaxMax
              };
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiData, "SwapFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "akita_assets": {
              const currentAssets = await this.client.state.global.akitaAssets();
              const {
                akta = _nullishCoalesce((currentAssets == null ? void 0 : currentAssets.akta), () => ( 0n)),
                bones = _nullishCoalesce((currentAssets == null ? void 0 : currentAssets.bones), () => ( 0n))
              } = action.value;
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, { akta, bones }, "AkitaAssets", this.client.appClient.appSpec.structs);
              break;
            }
            case "upgrade_app_ps":
            case "add_plugin_ps":
            case "remove_plugin_ps":
            case "add_allowance_ps":
            case "remove_allowance_ps":
            case "new_escrow_ps":
            case "remove_execute_plugin_ps":
            case "toggle_escrow_lock_ps":
            case "update_fields_ps": {
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, action.value, "ProposalSettings", this.client.appClient.appSpec.structs);
              break;
            }
            case "revenue_splits": {
              data = _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, SplitsToTuples(action.value), "((uint64,string),uint8,uint64)[]", this.client.appClient.appSpec.structs);
              break;
            }
            default:
              throw new Error(`Unsupported field`);
          }
          abiAction = { field: action.field, value: data };
          structType = "ProposalUpdateField";
          break;
        }
        case 90 /* UpdateWallet */: {
          preppedActions.push([typedAction.type, new Uint8Array()]);
          continue;
        }
        default: {
          throw new Error(`Unsupported proposal action type`);
        }
      }
      preppedActions.push([
        typedAction.type,
        _chunkAP6ZTMSTjs.encodeABIValue.call(void 0, abiAction, structType, this.typeClient.appClient.appSpec.structs)
      ]);
    }
    return preppedActions;
  }
  async initialize(params) {
    const sendParams = this.getSendParams(params);
    return await this.client.send.initialize({
      ...sendParams,
      args: {}
    });
  }
  async setup(params = {}) {
    const sendParams = this.getSendParams(params);
    const { nickname = "Akita DAO", salt = _chunkAP6ZTMSTjs.randomByteArray.call(void 0, 32) } = params;
    _chunkAP6ZTMSTjs.assertByteArrayLength.call(void 0, salt, "salt", 32);
    const group = this.client.newGroup();
    group.setup({
      ...sendParams,
      args: { nickname, salt }
    });
    const result = await group.send({ ...sendParams });
    if (result.returns === void 0) {
      throw new Error("Failed to setup Akita DAO");
    }
    this._wallet = new (0, _chunkAP3B4YYAjs.WalletSDK)({
      algorand: this.algorand,
      factoryParams: {
        appId: result.returns[0],
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
    this._walletInitPromise = Promise.resolve(this._wallet);
    return result;
  }
  async newProposal({
    sender,
    signer,
    cid = EMPTY_CID,
    actions,
    consolidateFees = true
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const preppedActions = await this.prepProposalActions(actions);
    const group = this.client.newGroup();
    const { total } = await this.client.proposalCost({
      ...sendParams,
      args: { actions: preppedActions }
    });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      receiver: this.client.appAddress.toString(),
      amount: _algokitutils.microAlgo.call(void 0, total)
    });
    group.newProposal({
      ...sendParams,
      args: {
        payment,
        cid,
        actions: preppedActions
      },
      maxFee: _algokitutils.microAlgo.call(void 0, 257000n)
    });
    const prepared = await _chunkAP3B4YYAjs.prepareGroup.call(void 0, 
      await group.composer(),
      consolidateFees ? { consolidateFees: true } : {}
    );
    const { groupId, txIds, confirmedRound, returns } = await _chunkAP3B4YYAjs.sendPrepared.call(void 0, 
      prepared,
      this.client.algorand.client.algod
    );
    return {
      groupId,
      confirmedRound,
      txIDs: txIds,
      return: returns && returns.length > 0 ? returns[0].returnValue : void 0
    };
  }
  async editProposal({
    sender,
    signer,
    id,
    cid,
    actions
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const preppedActions = await this.prepProposalActions(actions);
    const req = await Promise.allSettled([
      this.client.state.box.proposals.value(id),
      this.client.proposalCost({ args: { actions: preppedActions } })
    ]);
    if (req[0].status === "rejected" || req[0].value === void 0) {
      throw new Error(`Proposal with id: ${id} not found`);
    }
    const { feesPaid } = req[0].value;
    if (req[1].status === "rejected") {
      throw new Error(`Failed to calculate proposal cost: ${req[1].reason}`);
    }
    const results = req[1].value;
    const cost = _nullishCoalesce(results.total, () => ( 0n));
    let paymentRequired = feesPaid < cost;
    if (paymentRequired) {
      const payment = this.client.algorand.createTransaction.payment({
        ...sendParams,
        receiver: this.client.appAddress.toString(),
        amount: _algokitutils.microAlgo.call(void 0, cost - feesPaid)
      });
      return await this.client.send.editProposalWithPayment({
        ...sendParams,
        args: {
          payment,
          id,
          cid,
          actions: preppedActions
        }
      });
    } else {
      return await this.client.send.editProposal({
        ...sendParams,
        args: {
          id,
          cid,
          actions: preppedActions
        }
      });
    }
  }
  async submitProposal({ sender, signer, proposalId }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.submitProposal({
      ...sendParams,
      args: { proposalId }
    });
  }
  async voteProposal({ proposalId, vote, sender, signer }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const { payment } = await this.voteCost({ proposalId: BigInt(proposalId), voter: sendParams.sender.toString() });
    const mbrPayment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      receiver: this.client.appAddress.toString(),
      amount: _algokitutils.microAlgo.call(void 0, payment)
    });
    return await this.client.send.voteProposal({
      ...sendParams,
      args: { mbrPayment, proposalId, vote }
    });
  }
  async finalizeProposal({ sender, signer, proposalId }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.finalizeProposal({
      ...sendParams,
      args: { proposalId }
    });
  }
  async executeProposal({ proposalId, sender, signer }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.executeProposal({
      ...sendParams,
      args: { proposalId }
    });
  }
  /**
   * Build the actions that delete an escrow of the DAO wallet, in the order the wallet needs them,
   * from what the chain lists for the escrow: unlock it if asked, remove every grant and alias that
   * names it, remove its allowances, close its assets out to the wallet, then delete it.
   *
   * Put them in one proposal so the whole removal runs in one transaction group. When they are more
   * than the DAO's action limit allows, split them over proposals in this order and execute those in
   * order: the wallet refuses the delete while a plugin or an allowance still names the escrow.
   *
   * It throws when something stands in the way that no action can undo: the escrow is opted in to
   * an app, or holds an asset the wallet's account cannot receive. An alias whose grant is already
   * gone does not stand in the way and is left alone.
   *
   * What becomes of the escrow's address afterwards cannot be undone, and differs with the kind of
   * escrow. Before an app lets a person create this proposal, it shows the `warnings` of
   * `(await dao.getWallet()).getEscrowTeardown(escrow)` prominently.
   */
  async deleteEscrowActions({ escrow, unlock = false }) {
    const plan = await (await this.getWallet()).getEscrowTeardown(escrow);
    _chunkMZHAP7IAjs.assertEscrowCanBeDeleted.call(void 0, plan, unlock);
    const actions = [];
    if (plan.locked) actions.push({ type: 71 /* ToggleEscrowLock */, escrow });
    for (const { plugin, caller, escrow: keyEscrow, names } of plan.plugins) {
      if (names.length === 0) actions.push({ type: 40 /* RemovePlugin */, plugin, caller, escrow: keyEscrow });
      for (const name of names) actions.push({ type: 41 /* RemoveNamedPlugin */, name });
    }
    if (plan.allowances.length > 0) {
      actions.push({ type: 60 /* RemoveAllowances */, escrow, assets: plan.allowances });
    }
    if (plan.assets.length > 0) {
      actions.push({
        type: 72 /* Reclaim */,
        escrow,
        reclaims: plan.assets.map((asset) => ({ asset, amount: 0n, closeOut: true }))
      });
    }
    actions.push({ type: 73 /* DeleteEscrow */, escrow });
    return actions;
  }
  /**
   * Delete one of your proposals (draft, rejected, executed, cancelled, or a leftover bootstrap proposal).
   * Voted proposals require every vote receipt to be cleared first (`deleteProposalVotes`).
   */
  async deleteProposal({ sender, signer, proposalId }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.deleteProposal({ ...sendParams, args: { proposalId } });
  }
  /** Delete vote receipts of a finished proposal; each voter is refunded their receipt deposit. */
  async deleteProposalVotes({ sender, signer, proposalId, voters }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.deleteProposalVotes({ ...sendParams, args: { proposalId, voters } });
  }
  /** Proposer-only: abandon an approved proposal that has not executed. */
  async cancelProposal({ sender, signer, proposalId }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.cancelProposal({ ...sendParams, args: { proposalId } });
  }
  /**
   * Voting-rule snapshot of a submitted proposal: duration, participation, approval, outstanding vote
   * receipts, base units locked at submit (the quorum denominator) and locked base units that voted.
   */
  async getProposalTally(proposalId) {
    return await this.client.getProposalTally({ ...this.getReaderSendParams(), args: { proposalId } });
  }
  /** `account`'s governance participation (last vote time and proposal, distinct proposals voted on); zeros if it never voted. */
  async getGovernanceParticipation(account) {
    return await this.client.getGovernanceParticipation({ ...this.getReaderSendParams(), args: { account } });
  }
  /** `voter`'s receipt on a proposal ('w', or a legacy 'v' receipt with weight 0), or undefined. */
  async getVoteReceipt({ proposalId, voter }) {
    for (const legacy of [false, true]) {
      const value = await this.readBox(voteReceiptBoxName(proposalId, voter, legacy));
      if (value) return decodeVoteReceipt(value, legacy);
    }
    return void 0;
  }
  /** The exact deposit `voteProposal` requires from `voter`, and what the DAO refunds in the same call. */
  async voteCost({ proposalId, voter }) {
    const [receipt, legacyReceipt, participation] = await Promise.all([
      this.readBox(voteReceiptBoxName(proposalId, voter)),
      this.readBox(voteReceiptBoxName(proposalId, voter, true)),
      this.getGovernanceParticipation(voter)
    ]);
    return voteCost({ receipt: receipt !== void 0, legacyReceipt: legacyReceipt !== void 0, participation: participation.votes > 0n });
  }
  async readBox(name) {
    try {
      return await this.algorand.app.getBoxValue(this.client.appId, name);
    } catch (error) {
      if (error instanceof Error && error.message.toLowerCase().includes("box not found")) return void 0;
      throw error;
    }
  }
  /** Leases of bootstrap execution keys the DAO still tracks (must be cleared before `initialize`). */
  async getBootstrapKeys() {
    const names = await this.algorand.app.getBoxNames(this.client.appId);
    return names.filter(({ nameRaw }) => nameRaw.length === 33 && nameRaw[0] === DAOBootstrapKeyBoxPrefix.charCodeAt(0)).map(({ nameRaw }) => nameRaw.slice(1));
  }
  /**
   * Caller-scoped plugin grants added by bootstrap proposals that are still installed: the pre-launch
   * automation the DAO starts with. They survive `initialize`; a RemovePlugin proposal removes one.
   */
  async getBootstrapGrants() {
    return Array.from((await this.client.state.box.bootstrapGrants.getMap()).keys());
  }
  /**
   * Stop tracking bootstrap execution keys, revoking any that are still live in the DAO wallet.
   * Anyone may clear used or expired keys; only the creator may revoke an unexpired one.
   * Defaults to every tracked key.
   */
  async clearBootstrapKeys({ sender, signer, leases } = {}) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const toClear = await _asyncNullishCoalesce(leases, async () => ( await this.getBootstrapKeys()));
    if (toClear.length === 0) return void 0;
    return await this.client.send.clearBootstrapKeys({ ...sendParams, args: { leases: toClear } });
  }
  async getGlobalState() {
    return await this.client.state.global.getAll();
  }
  async setupCost(params) {
    const sendParams = this.getSendParams({
      sender: this.readerAccount,
      signer: _chunkLNVZHCCXjs.emptySigner,
      ...params
    });
    const cost = await this.client.setupCost({
      ...sendParams,
      args: {}
    });
    return cost;
  }
  async proposalCost({ sender, signer, actions }) {
    const sendParams = this.getSendParams({
      sender: _nullishCoalesce(sender, () => ( this.readerAccount)),
      signer: _nullishCoalesce(signer, () => ( _chunkLNVZHCCXjs.emptySigner))
    });
    const requirements = await this.client.proposalCost({
      ...sendParams,
      args: { actions: await this.prepProposalActions(actions) }
    });
    return requirements;
  }
  /**
   * Maps proposal action type enum to its corresponding struct type name
   */
  getActionStructType(actionType) {
    switch (actionType) {
      case 10 /* UpgradeApp */:
        return "ProposalUpgradeApp";
      case 20 /* AddPlugin */:
        return "ProposalAddPlugin";
      case 21 /* AddNamedPlugin */:
        return "ProposalAddNamedPlugin";
      case 30 /* ExecutePlugin */:
        return "ProposalExecutePlugin";
      case 31 /* RemoveExecutePlugin */:
        return "ProposalRemoveExecutePlugin";
      case 40 /* RemovePlugin */:
        return "ProposalRemovePlugin";
      case 41 /* RemoveNamedPlugin */:
        return "ProposalRemoveNamedPlugin";
      case 50 /* AddAllowances */:
        return "ProposalAddAllowances";
      case 60 /* RemoveAllowances */:
        return "ProposalRemoveAllowances";
      case 70 /* NewEscrow */:
        return "ProposalNewEscrow";
      case 71 /* ToggleEscrowLock */:
        return "ProposalToggleEscrowLock";
      case 72 /* Reclaim */:
        return "ProposalReclaim";
      case 73 /* DeleteEscrow */:
        return "ProposalDeleteEscrow";
      case 80 /* UpdateFields */:
        return "ProposalUpdateField";
      case 90 /* UpdateWallet */:
        return "";
      // No struct — empty data
      case 91 /* ChangeAdmin */:
        return "ProposalChangeAdmin";
      default:
        throw new Error(`Unknown proposal action type: ${actionType}`);
    }
  }
  /**
   * Decodes the raw action bytes into their typed struct representation
   */
  decodeProposalAction(actionType, actionData, useLegacyEscrowShape = false) {
    const structType = this.getActionStructType(actionType);
    const structs = this.typeClient.appClient.appSpec.structs;
    switch (actionType) {
      case 10 /* UpgradeApp */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 10 /* UpgradeApp */, ...decoded };
      }
      case 20 /* AddPlugin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 20 /* AddPlugin */, ...decoded };
      }
      case 21 /* AddNamedPlugin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 21 /* AddNamedPlugin */, ...decoded };
      }
      case 30 /* ExecutePlugin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 30 /* ExecutePlugin */, ...decoded };
      }
      case 31 /* RemoveExecutePlugin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 31 /* RemoveExecutePlugin */, ...decoded };
      }
      case 40 /* RemovePlugin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 40 /* RemovePlugin */, ...decoded };
      }
      case 41 /* RemoveNamedPlugin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 41 /* RemoveNamedPlugin */, ...decoded };
      }
      case 50 /* AddAllowances */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 50 /* AddAllowances */, ...decoded };
      }
      case 60 /* RemoveAllowances */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 60 /* RemoveAllowances */, ...decoded };
      }
      case 70 /* NewEscrow */: {
        if (useLegacyEscrowShape) {
          try {
            const decoded2 = decodeLegacyProposalNewEscrow(actionData);
            return { type: 70 /* NewEscrow */, ...decoded2 };
          } catch (e2) {
          }
        }
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 70 /* NewEscrow */, ...decoded };
      }
      case 71 /* ToggleEscrowLock */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 71 /* ToggleEscrowLock */, ...decoded };
      }
      case 72 /* Reclaim */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 72 /* Reclaim */, ...decoded };
      }
      case 73 /* DeleteEscrow */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 73 /* DeleteEscrow */, ...decoded };
      }
      case 91 /* ChangeAdmin */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 91 /* ChangeAdmin */, ...decoded };
      }
      case 80 /* UpdateFields */: {
        const decoded = _chunkAP6ZTMSTjs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 80 /* UpdateFields */, ...decoded };
      }
      case 90 /* UpdateWallet */: {
        return { type: 90 /* UpdateWallet */ };
      }
      default:
        throw new Error(`Unknown proposal action type: ${actionType}`);
    }
  }
  /**
   * Fetches a proposal by ID and decodes all action data into typed structs
   */
  async getProposal(proposalId) {
    const proposal = await this.client.getProposal({ args: { proposalId } });
    if (!proposal) {
      throw new Error(`Proposal with id: ${proposalId} not found`);
    }
    const escrowActionV2Cutover = _chunkLNVZHCCXjs.getDaoEscrowActionV2Cutover.call(void 0, this.network);
    const useLegacyEscrowShape = usesLegacyEscrowActionShape(proposal.created, escrowActionV2Cutover == null ? void 0 : escrowActionV2Cutover.timestamp);
    const decodedActions = proposal.actions.map(([actionType, actionData]) => {
      return this.decodeProposalAction(actionType, actionData, useLegacyEscrowShape);
    });
    return {
      status: proposal.status,
      cid: proposal.cid,
      votes: proposal.votes,
      creator: proposal.creator,
      votingTs: proposal.votingTs,
      created: proposal.created,
      feesPaid: proposal.feesPaid,
      actions: decodedActions
    };
  }
}, _class2);




























exports.SplitDistributionType = SplitDistributionType; exports.SplitsToTuples = SplitsToTuples; exports.ProposalActionEnum = ProposalActionEnum; exports.EMPTY_CID = EMPTY_CID; exports.DAOProposalVotesMBR = DAOProposalVotesMBR; exports.DAOLegacyProposalVotesMBR = DAOLegacyProposalVotesMBR; exports.DAOParticipationMBR = DAOParticipationMBR; exports.DAOVoteReceiptBoxPrefix = DAOVoteReceiptBoxPrefix; exports.DAOLegacyVoteReceiptBoxPrefix = DAOLegacyVoteReceiptBoxPrefix; exports.DAOParticipationBoxPrefix = DAOParticipationBoxPrefix; exports.ProposalStatusEnum = ProposalStatusEnum; exports.DAOProposalTallyMBR = DAOProposalTallyMBR; exports.MaxBootstrapKeyRounds = MaxBootstrapKeyRounds; exports.DAOBootstrapKeyBoxPrefix = DAOBootstrapKeyBoxPrefix; exports.voteReceiptBoxName = voteReceiptBoxName; exports.participationBoxName = participationBoxName; exports.decodeVoteReceipt = decodeVoteReceipt; exports.decodeGovernanceParticipation = decodeGovernanceParticipation; exports.voteCost = voteCost; exports.LEGACY_DAO_ACTION_STRUCTS = LEGACY_DAO_ACTION_STRUCTS; exports.decodeLegacyProposalNewEscrow = decodeLegacyProposalNewEscrow; exports.usesLegacyEscrowActionShape = usesLegacyEscrowActionShape; exports.DAO_ERROR_MESSAGES = DAO_ERROR_MESSAGES; exports.parseDaoErrorCode = parseDaoErrorCode; exports.translateDaoError = translateDaoError; exports.AkitaDaoSDK = AkitaDaoSDK;
//# sourceMappingURL=chunk-GONAVEC6.js.map
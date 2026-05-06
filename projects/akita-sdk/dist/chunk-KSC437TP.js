"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2;




var _chunkXKX36IH7js = require('./chunk-XKX36IH7.js');


var _chunkVE4MYPMKjs = require('./chunk-VE4MYPMK.js');


var _chunkPFX6BSCEjs = require('./chunk-PFX6BSCE.js');





var _chunkAW5G7J3Ljs = require('./chunk-AW5G7J3L.js');


var _chunkOPF2XL3Kjs = require('./chunk-OPF2XL3K.js');




var _chunkVMMDQU5Ujs = require('./chunk-VMMDQU5U.js');


var _chunkFZLF55XCjs = require('./chunk-FZLF55XC.js');

// src/generated/AkitaDAOTypesClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "AkitaDAOTypes", "structs": { "ProposalAddAllowances": [{ "name": "escrow", "type": "string" }, { "name": "allowances", "type": "(uint64,uint8,uint64,uint64,uint64,bool)[]" }], "ProposalAddNamedPlugin": [{ "name": "name", "type": "string" }, { "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }, { "name": "delegationType", "type": "uint8" }, { "name": "lastValid", "type": "uint64" }, { "name": "cooldown", "type": "uint64" }, { "name": "methods", "type": "(byte[4],uint64)[]" }, { "name": "useRounds", "type": "bool" }, { "name": "useExecutionKey", "type": "bool" }, { "name": "coverFees", "type": "bool" }, { "name": "defaultToEscrow", "type": "bool" }, { "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "sourceLink", "type": "string" }, { "name": "allowances", "type": "(uint64,uint8,uint64,uint64,uint64,bool)[]" }], "ProposalAddPlugin": [{ "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }, { "name": "delegationType", "type": "uint8" }, { "name": "lastValid", "type": "uint64" }, { "name": "cooldown", "type": "uint64" }, { "name": "methods", "type": "(byte[4],uint64)[]" }, { "name": "useRounds", "type": "bool" }, { "name": "useExecutionKey", "type": "bool" }, { "name": "coverFees", "type": "bool" }, { "name": "defaultToEscrow", "type": "bool" }, { "name": "fee", "type": "uint64" }, { "name": "power", "type": "uint64" }, { "name": "duration", "type": "uint64" }, { "name": "participation", "type": "uint64" }, { "name": "approval", "type": "uint64" }, { "name": "sourceLink", "type": "string" }, { "name": "allowances", "type": "(uint64,uint8,uint64,uint64,uint64,bool)[]" }], "ProposalExecuteNamedPlugin": [{ "name": "name", "type": "string" }, { "name": "executionKey", "type": "byte[32]" }, { "name": "groups", "type": "byte[32][]" }, { "name": "firstValid", "type": "uint64" }, { "name": "lastValid", "type": "uint64" }], "ProposalExecutePlugin": [{ "name": "plugin", "type": "uint64" }, { "name": "escrow", "type": "string" }, { "name": "executionKey", "type": "byte[32]" }, { "name": "groups", "type": "byte[32][]" }, { "name": "firstValid", "type": "uint64" }, { "name": "lastValid", "type": "uint64" }], "ProposalNewEscrow": [{ "name": "escrow", "type": "string" }], "ProposalRemoveAllowances": [{ "name": "escrow", "type": "string" }, { "name": "assets", "type": "uint64[]" }], "ProposalRemoveExecutePlugin": [{ "name": "executionKey", "type": "byte[32]" }], "ProposalRemoveNamedPlugin": [{ "name": "name", "type": "string" }, { "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }], "ProposalRemovePlugin": [{ "name": "plugin", "type": "uint64" }, { "name": "caller", "type": "address" }, { "name": "escrow", "type": "string" }], "ProposalToggleEscrowLock": [{ "name": "escrow", "type": "string" }], "ProposalUpdateField": [{ "name": "field", "type": "string" }, { "name": "value", "type": "byte[]" }], "ProposalUpgradeApp": [{ "name": "app", "type": "uint64" }, { "name": "executionKey", "type": "byte[32]" }, { "name": "groups", "type": "byte[32][]" }, { "name": "firstValid", "type": "uint64" }, { "name": "lastValid", "type": "uint64" }] }, "methods": [{ "name": "proposalUpgradeAppShape", "args": [{ "type": "(uint64,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalUpgradeApp", "name": "shape" }], "returns": { "type": "(uint64,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalUpgradeApp" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalAddPluginShape", "args": [{ "type": "(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddPlugin", "name": "shape" }], "returns": { "type": "(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalAddNamedPluginShape", "args": [{ "type": "(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddNamedPlugin", "name": "shape" }], "returns": { "type": "(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddNamedPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemovePluginShape", "args": [{ "type": "(uint64,address,string)", "struct": "ProposalRemovePlugin", "name": "shape" }], "returns": { "type": "(uint64,address,string)", "struct": "ProposalRemovePlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemoveNamedPluginShape", "args": [{ "type": "(string,uint64,address,string)", "struct": "ProposalRemoveNamedPlugin", "name": "shape" }], "returns": { "type": "(string,uint64,address,string)", "struct": "ProposalRemoveNamedPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalExecutePluginShape", "args": [{ "type": "(uint64,string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecutePlugin", "name": "shape" }], "returns": { "type": "(uint64,string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecutePlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalExecuteNamedPluginShape", "args": [{ "type": "(string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecuteNamedPlugin", "name": "shape" }], "returns": { "type": "(string,byte[32],byte[32][],uint64,uint64)", "struct": "ProposalExecuteNamedPlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemoveExecutePluginShape", "args": [{ "type": "(byte[32])", "struct": "ProposalRemoveExecutePlugin", "name": "shape" }], "returns": { "type": "(byte[32])", "struct": "ProposalRemoveExecutePlugin" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalAddAllowancesShape", "args": [{ "type": "(string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddAllowances", "name": "shape" }], "returns": { "type": "(string,(uint64,uint8,uint64,uint64,uint64,bool)[])", "struct": "ProposalAddAllowances" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalRemoveAllowancesShape", "args": [{ "type": "(string,uint64[])", "struct": "ProposalRemoveAllowances", "name": "shape" }], "returns": { "type": "(string,uint64[])", "struct": "ProposalRemoveAllowances" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalNewEscrowShape", "args": [{ "type": "(string)", "struct": "ProposalNewEscrow", "name": "shape" }], "returns": { "type": "(string)", "struct": "ProposalNewEscrow" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalToggleEscrowLockShape", "args": [{ "type": "(string)", "struct": "ProposalToggleEscrowLock", "name": "shape" }], "returns": { "type": "(string)", "struct": "ProposalToggleEscrowLock" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "proposalUpdateFieldShape", "args": [{ "type": "(string,byte[])", "struct": "ProposalUpdateField", "name": "shape" }], "returns": { "type": "(string,byte[])", "struct": "ProposalUpdateField" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": ["NoOp"], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [155, 192, 213, 237, 258, 294, 315, 336, 360, 381, 418, 451, 472, 506, 527, 563, 584, 634, 654, 689, 709, 744, 775, 806, 826], "errorMessage": "invalid array length header" }, { "pc": [662], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalAddAllowances" }, { "pc": [389], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalAddNamedPlugin" }, { "pc": [266], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalAddPlugin" }, { "pc": [592], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalExecuteNamedPlugin" }, { "pc": [535], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalExecutePlugin" }, { "pc": [748], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalNewEscrow" }, { "pc": [717], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemoveAllowances" }, { "pc": [607], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemoveExecutePlugin" }, { "pc": [477], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemoveNamedPlugin" }, { "pc": [423], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalRemovePlugin" }, { "pc": [779], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalToggleEscrowLock" }, { "pc": [831], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalUpdateField" }, { "pc": [163], "errorMessage": "invalid number of bytes for smart_contracts/arc58/dao/types.ts::ProposalUpgradeApp" }, { "pc": [736, 767], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]))" }, { "pc": [626], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [681], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+uint64[]))" }, { "pc": [798], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),(len+uint8[]))" }, { "pc": [443], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]))" }, { "pc": [286], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [555], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [646], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [701], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+uint64[]))" }, { "pc": [818], "errorMessage": "invalid tail pointer at index 1 of ((len+utf8[]),(len+uint8[]))" }, { "pc": [498], "errorMessage": "invalid tail pointer at index 1 of (uint64,(len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [229], "errorMessage": "invalid tail pointer at index 16 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [352], "errorMessage": "invalid tail pointer at index 17 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [250], "errorMessage": "invalid tail pointer at index 17 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [373], "errorMessage": "invalid tail pointer at index 18 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [576], "errorMessage": "invalid tail pointer at index 2 of ((len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [147], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [410], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+utf8[]))" }, { "pc": [184], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [464], "errorMessage": "invalid tail pointer at index 3 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]))" }, { "pc": [307], "errorMessage": "invalid tail pointer at index 3 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [519], "errorMessage": "invalid tail pointer at index 3 of (uint64,(len+utf8[]),uint8[32],(len+uint8[32][]),uint64,uint64)" }, { "pc": [205], "errorMessage": "invalid tail pointer at index 6 of (uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [328], "errorMessage": "invalid tail pointer at index 7 of ((len+utf8[]),uint64,uint8[32],(len+utf8[]),uint8,uint64,uint64,(len+(uint8[4],uint64)[]),bool1,bool1,bool1,bool1,uint64,uint64,uint64,uint64,uint64,(len+utf8[]),(len+(uint64,uint8,uint64,uint64,uint64,bool1)[]))" }, { "pc": [142, 179, 200, 224, 245, 281, 302, 323, 347, 368, 405, 438, 459, 493, 514, 550, 571, 622, 641, 677, 696, 732, 763, 794, 813], "errorMessage": "invalid tuple encoding" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAyIDEgNAogICAgYnl0ZWNibG9jayAweDE1MWY3Yzc1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NAogICAgLy8gZXhwb3J0IGNsYXNzIEFraXRhREFPVHlwZXMgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogbWFpbl9fX2FsZ290c19fLmRlZmF1bHRDcmVhdGVAMjAKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydAogICAgcHVzaGJ5dGVzcyAweDkyYjM1ODk2IDB4N2VlNGJhYjcgMHg4MmQ1ZjNmZiAweGYzOTQxYTJjIDB4ZjFjZjIyY2MgMHhiZDRlZjczMCAweGViYWI1ZTE0IDB4NmI4YWJkMmYgMHhmY2FmODQyMCAweDU1Y2U1Y2E5IDB4YTYzOGJlMjMgMHg1MGFhYjgxZCAweDE0OWQzY2NiIC8vIG1ldGhvZCAicHJvcG9zYWxVcGdyYWRlQXBwU2hhcGUoKHVpbnQ2NCxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpKSh1aW50NjQsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAicHJvcG9zYWxBZGRQbHVnaW5TaGFwZSgodWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKSkodWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKSIsIG1ldGhvZCAicHJvcG9zYWxBZGROYW1lZFBsdWdpblNoYXBlKChzdHJpbmcsdWludDY0LGFkZHJlc3Msc3RyaW5nLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGJ5dGVbNF0sdWludDY0KVtdLGJvb2wsYm9vbCxib29sLGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sKVtdKSkoc3RyaW5nLHVpbnQ2NCxhZGRyZXNzLHN0cmluZyx1aW50OCx1aW50NjQsdWludDY0LChieXRlWzRdLHVpbnQ2NClbXSxib29sLGJvb2wsYm9vbCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsc3RyaW5nLCh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbClbXSkiLCBtZXRob2QgInByb3Bvc2FsUmVtb3ZlUGx1Z2luU2hhcGUoKHVpbnQ2NCxhZGRyZXNzLHN0cmluZykpKHVpbnQ2NCxhZGRyZXNzLHN0cmluZykiLCBtZXRob2QgInByb3Bvc2FsUmVtb3ZlTmFtZWRQbHVnaW5TaGFwZSgoc3RyaW5nLHVpbnQ2NCxhZGRyZXNzLHN0cmluZykpKHN0cmluZyx1aW50NjQsYWRkcmVzcyxzdHJpbmcpIiwgbWV0aG9kICJwcm9wb3NhbEV4ZWN1dGVQbHVnaW5TaGFwZSgodWludDY0LHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpKSh1aW50NjQsc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInByb3Bvc2FsRXhlY3V0ZU5hbWVkUGx1Z2luU2hhcGUoKHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQpKShzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsdWludDY0KSIsIG1ldGhvZCAicHJvcG9zYWxSZW1vdmVFeGVjdXRlUGx1Z2luU2hhcGUoKGJ5dGVbMzJdKSkoYnl0ZVszMl0pIiwgbWV0aG9kICJwcm9wb3NhbEFkZEFsbG93YW5jZXNTaGFwZSgoc3RyaW5nLCh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbClbXSkpKHN0cmluZywodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wpW10pIiwgbWV0aG9kICJwcm9wb3NhbFJlbW92ZUFsbG93YW5jZXNTaGFwZSgoc3RyaW5nLHVpbnQ2NFtdKSkoc3RyaW5nLHVpbnQ2NFtdKSIsIG1ldGhvZCAicHJvcG9zYWxOZXdFc2Nyb3dTaGFwZSgoc3RyaW5nKSkoc3RyaW5nKSIsIG1ldGhvZCAicHJvcG9zYWxUb2dnbGVFc2Nyb3dMb2NrU2hhcGUoKHN0cmluZykpKHN0cmluZykiLCBtZXRob2QgInByb3Bvc2FsVXBkYXRlRmllbGRTaGFwZSgoc3RyaW5nLGJ5dGVbXSkpKHN0cmluZyxieXRlW10pIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggcHJvcG9zYWxVcGdyYWRlQXBwU2hhcGUgcHJvcG9zYWxBZGRQbHVnaW5TaGFwZSBwcm9wb3NhbEFkZE5hbWVkUGx1Z2luU2hhcGUgcHJvcG9zYWxSZW1vdmVQbHVnaW5TaGFwZSBwcm9wb3NhbFJlbW92ZU5hbWVkUGx1Z2luU2hhcGUgcHJvcG9zYWxFeGVjdXRlUGx1Z2luU2hhcGUgcHJvcG9zYWxFeGVjdXRlTmFtZWRQbHVnaW5TaGFwZSBwcm9wb3NhbFJlbW92ZUV4ZWN1dGVQbHVnaW5TaGFwZSBwcm9wb3NhbEFkZEFsbG93YW5jZXNTaGFwZSBwcm9wb3NhbFJlbW92ZUFsbG93YW5jZXNTaGFwZSBwcm9wb3NhbE5ld0VzY3Jvd1NoYXBlIHByb3Bvc2FsVG9nZ2xlRXNjcm93TG9ja1NoYXBlIHByb3Bvc2FsVXBkYXRlRmllbGRTaGFwZQogICAgZXJyCgptYWluX19fYWxnb3RzX18uZGVmYXVsdENyZWF0ZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo0CiAgICAvLyBleHBvcnQgY2xhc3MgQWtpdGFEQU9UeXBlcyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICAmJgogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsVXBncmFkZUFwcFNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxVcGdyYWRlQXBwU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNTgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMiBvZiAodWludDY0LHVpbnQ4WzMyXSwobGVuK3VpbnQ4WzMyXVtdKSx1aW50NjQsdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzMgogICAgKgogICAgcHVzaGludCA2MAogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxVcGdyYWRlQXBwCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsQWRkUGx1Z2luU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbEFkZFBsdWdpblNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjEwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMDYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMiBvZiAodWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSksdWludDgsdWludDY0LHVpbnQ2NCwobGVuKyh1aW50OFs0XSx1aW50NjQpW10pLGJvb2wxLGJvb2wxLGJvb2wxLGJvb2wxLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEwOAogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNTkKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDYgb2YgKHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDEwMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMTYgb2YgKHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDEwNAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMTcgb2YgKHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzNAogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsQWRkUGx1Z2luCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsQWRkTmFtZWRQbHVnaW5TaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsQWRkTmFtZWRQbHVnaW5TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czoxNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSksdWludDgsdWludDY0LHVpbnQ2NCwobGVuKyh1aW50OFs0XSx1aW50NjQpW10pLGJvb2wxLGJvb2wxLGJvb2wxLGJvb2wxLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDExMAogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDMgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSx1aW50OCx1aW50NjQsdWludDY0LChsZW4rKHVpbnQ4WzRdLHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCA2MQogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggNyBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pLHVpbnQ4LHVpbnQ2NCx1aW50NjQsKGxlbisodWludDhbNF0sdWludDY0KVtdKSxib29sMSxib29sMSxib29sMSxib29sMSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChsZW4rdXRmOFtdKSwobGVuKyh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsYm9vbDEpW10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgIGRpZyAyCiAgICBwdXNoaW50IDEwNAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMTcgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQsdWludDhbMzJdLChsZW4rdXRmOFtdKSx1aW50OCx1aW50NjQsdWludDY0LChsZW4rKHVpbnQ4WzRdLHVpbnQ2NClbXSksYm9vbDEsYm9vbDEsYm9vbDEsYm9vbDEsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCAxMDYKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDE4IG9mICgobGVuK3V0ZjhbXSksdWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSksdWludDgsdWludDY0LHVpbnQ2NCwobGVuKyh1aW50OFs0XSx1aW50NjQpW10pLGJvb2wxLGJvb2wxLGJvb2wxLGJvb2wxLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGxlbit1dGY4W10pLChsZW4rKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sMSlbXSkpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDM0CiAgICAqCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxBZGROYW1lZFBsdWdpbgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbFJlbW92ZVBsdWdpblNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxSZW1vdmVQbHVnaW5TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czoyMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMiBvZiAodWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQ0CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbFJlbW92ZVBsdWdpbgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbFJlbW92ZU5hbWVkUGx1Z2luU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbFJlbW92ZU5hbWVkUGx1Z2luU2hhcGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6MjUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA0NAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0LHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQ2CiAgICArCiAgICBkaWcgMgogICAgcHVzaGludCA0MgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMyBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCx1aW50OFszMl0sKGxlbit1dGY4W10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsUmVtb3ZlTmFtZWRQbHVnaW4KICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxFeGVjdXRlUGx1Z2luU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbEV4ZWN1dGVQbHVnaW5TaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czozMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIHB1c2hpbnQgOAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCA2MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50NjQsKGxlbit1dGY4W10pLHVpbnQ4WzMyXSwobGVuK3VpbnQ4WzMyXVtdKSx1aW50NjQsdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA2MgogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgNDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDMgb2YgKHVpbnQ2NCwobGVuK3V0ZjhbXSksdWludDhbMzJdLChsZW4rdWludDhbMzJdW10pLHVpbnQ2NCx1aW50NjQpCiAgICBkaWcgMwogICAgc3dhcAogICAgZGlnIDMKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxFeGVjdXRlUGx1Z2luCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsRXhlY3V0ZU5hbWVkUGx1Z2luU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbEV4ZWN1dGVOYW1lZFBsdWdpblNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgNTIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ4WzMyXSwobGVuK3VpbnQ4WzMyXVtdKSx1aW50NjQsdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA1NAogICAgKwogICAgZGlnIDIKICAgIHB1c2hpbnQgMzQKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDIgb2YgKChsZW4rdXRmOFtdKSx1aW50OFszMl0sKGxlbit1aW50OFszMl1bXSksdWludDY0LHVpbnQ2NCkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbEV4ZWN1dGVOYW1lZFBsdWdpbgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbFJlbW92ZUV4ZWN1dGVQbHVnaW5TaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsUmVtb3ZlRXhlY3V0ZVBsdWdpblNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjQwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbFJlbW92ZUV4ZWN1dGVQbHVnaW4KICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxBZGRBbGxvd2FuY2VzU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbEFkZEFsbG93YW5jZXNTaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo0NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBpbnRjXzMgLy8gNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNgogICAgKwogICAgZGlnIDIKICAgIGludGNfMSAvLyAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICgobGVuK3V0ZjhbXSksKGxlbisodWludDY0LHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wxKVtdKSkKICAgIGRpZyAzCiAgICBzd2FwCiAgICBkaWcgMwogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzQKICAgICoKICAgIGludGNfMSAvLyAyCiAgICArCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbEFkZEFsbG93YW5jZXMKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxSZW1vdmVBbGxvd2FuY2VzU2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbFJlbW92ZUFsbG93YW5jZXNTaGFwZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo1MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBpbnRjXzMgLy8gNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksKGxlbit1aW50NjRbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDYKICAgICsKICAgIGRpZyAyCiAgICBpbnRjXzEgLy8gMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAoKGxlbit1dGY4W10pLChsZW4rdWludDY0W10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA4CiAgICAqCiAgICBpbnRjXzEgLy8gMgogICAgKwogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy50czo6UHJvcG9zYWxSZW1vdmVBbGxvd2FuY2VzCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzIgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjpBa2l0YURBT1R5cGVzLnByb3Bvc2FsTmV3RXNjcm93U2hhcGVbcm91dGluZ10oKSAtPiB2b2lkOgpwcm9wb3NhbE5ld0VzY3Jvd1NoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGludGNfMSAvLyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyA0CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbE5ld0VzY3JvdwogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18yIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMuYWxnby50czo6QWtpdGFEQU9UeXBlcy5wcm9wb3NhbFRvZ2dsZUVzY3Jvd0xvY2tTaGFwZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnByb3Bvc2FsVG9nZ2xlRXNjcm93TG9ja1NoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjYwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGludGNfMSAvLyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyA0CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLnRzOjpQcm9wb3NhbFRvZ2dsZUVzY3Jvd0xvY2sKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXJjNTgvZGFvL3R5cGVzLmFsZ28udHM6OkFraXRhREFPVHlwZXMucHJvcG9zYWxVcGRhdGVGaWVsZFNoYXBlW3JvdXRpbmddKCkgLT4gdm9pZDoKcHJvcG9zYWxVcGRhdGVGaWVsZFNoYXBlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2FyYzU4L2Rhby90eXBlcy5hbGdvLnRzOjY1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGludGNfMyAvLyA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSwobGVuK3VpbnQ4W10pKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA2CiAgICArCiAgICBkaWcgMgogICAgaW50Y18xIC8vIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKChsZW4rdXRmOFtdKSwobGVuK3VpbnQ4W10pKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGRpZyAzCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18xIC8vIDIKICAgICsKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9kYW8vdHlwZXMudHM6OlByb3Bvc2FsVXBkYXRlRmllbGQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMiAvLyAxCiAgICByZXR1cm4K", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAIBBCYBBBUffHUxG0EAajEZFEQxGESCDQSSs1iWBH7kurcEgtXz/wTzlBosBPHPIswEvU73MATrq14UBGuKvS8E/K+EIARVzlypBKY4viMEUKq4HQQUnTzLNhoAjg0ACQAuAJUBEAEyAWgBogHbAeoCIQJYAncClgAxGRQxGBQQQzYaAUkVSwGBKFlJgToSREsCTEsCUiJZgSALgTwIEkQoTFCwJEM2GgFJFUsBgShZSYFqEkRLAkxLAlIiWYFsCEsCgTtZSUsCEkRLA0xLA1IiWYEMCyMICEsCgWZZSUsCEkRLA0xLA1IiWSMICEsCgWhZSUsCEkRLA0xLA1IiWYEiCyMICBJEKExQsCRDNhoBSRVLASJZSYFsEkRLAkxLAlIiWYFuCEsCgSpZSUsCEkRLA0xLA1IiWSMICEsCgT1ZSUsCEkRLA0xLA1IiWYEMCyMICEsCgWhZSUsCEkRLA0xLA1IiWSMICEsCgWpZSUsCEkRLA0xLA1IiWYEiCyMICBJEKExQsCRDNhoBSRVLAYEoWUmBKhJESwJMSwJSIlmBLAgSRChMULAkQzYaAUkVSwEiWUmBLBJESwJMSwJSIlmBLghLAoEqWUlLAhJESwNMSwNSIlkjCAgSRChMULAkQzYaAUkVSwGBCFlJgTwSREsCTEsCUiJZgT4ISwKBKllJSwISREsDTEsDUiJZgSALIwgIEkQoTFCwJEM2GgFJFUsBIllJgTQSREsCTEsCUiJZgTYISwKBIllJSwISREsDTEsDUiJZgSALIwgIEkQoTFCwJEM2GgFJFYEgEkQoTFCwJEM2GgFJFUsBIllJJRJESwJMSwJSIlmBBghLAiNZSUsCEkRLA0xLA1IiWYEiCyMICBJEKExQsCRDNhoBSRVLASJZSSUSREsCTEsCUiJZgQYISwIjWUlLAhJESwNMSwNSIlmBCAsjCAgSRChMULAkQzYaAUkVSwEiWUkjEkRLAkxLAlIiWSUIEkQoTFCwJEM2GgFJFUsBIllJIxJESwJMSwJSIlklCBJEKExQsCRDNhoBSRVLASJZSSUSREsCTEsCUiJZgQYISwIjWUlLAhJESwNMSwNSIlkjCAgSRChMULAkQw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Constructs a no op call for the proposalNewEscrowShape((string))(string) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static proposalNewEscrowShape(params) {
    return {
      ...params,
      method: "proposalNewEscrowShape((string))(string)",
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
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string))(string)` ABI method.
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
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string))(string)` ABI method.
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
     * Makes a call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string))(string)` ABI method.
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
    }
  }}
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
   * Makes a readonly (simulated) call to the AkitaDAOTypes smart contract using the `proposalNewEscrowShape((string))(string)` ABI method.
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
   * Methods to access state for the current AkitaDAOTypes app
   */
  __init4() {this.state = {}}
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a proposalUpgradeAppShape((uint64,byte[32],byte[32][],uint64,uint64))(uint64,byte[32],byte[32][],uint64,uint64) method call against the AkitaDAOTypes contract
       */
      proposalUpgradeAppShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalUpgradeAppShape(params)));
        return this;
      },
      /**
       * Add a proposalAddPluginShape((uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalAddPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalAddPluginShape(params)));
        return this;
      },
      /**
       * Add a proposalAddNamedPluginShape((string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalAddNamedPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalAddNamedPluginShape(params)));
        return this;
      },
      /**
       * Add a proposalRemovePluginShape((uint64,address,string))(uint64,address,string) method call against the AkitaDAOTypes contract
       */
      proposalRemovePluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemovePluginShape(params)));
        return this;
      },
      /**
       * Add a proposalRemoveNamedPluginShape((string,uint64,address,string))(string,uint64,address,string) method call against the AkitaDAOTypes contract
       */
      proposalRemoveNamedPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemoveNamedPluginShape(params)));
        return this;
      },
      /**
       * Add a proposalExecutePluginShape((uint64,string,byte[32],byte[32][],uint64,uint64))(uint64,string,byte[32],byte[32][],uint64,uint64) method call against the AkitaDAOTypes contract
       */
      proposalExecutePluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalExecutePluginShape(params)));
        return this;
      },
      /**
       * Add a proposalExecuteNamedPluginShape((string,byte[32],byte[32][],uint64,uint64))(string,byte[32],byte[32][],uint64,uint64) method call against the AkitaDAOTypes contract
       */
      proposalExecuteNamedPluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalExecuteNamedPluginShape(params)));
        return this;
      },
      /**
       * Add a proposalRemoveExecutePluginShape((byte[32]))(byte[32]) method call against the AkitaDAOTypes contract
       */
      proposalRemoveExecutePluginShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemoveExecutePluginShape(params)));
        return this;
      },
      /**
       * Add a proposalAddAllowancesShape((string,(uint64,uint8,uint64,uint64,uint64,bool)[]))(string,(uint64,uint8,uint64,uint64,uint64,bool)[]) method call against the AkitaDAOTypes contract
       */
      proposalAddAllowancesShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalAddAllowancesShape(params)));
        return this;
      },
      /**
       * Add a proposalRemoveAllowancesShape((string,uint64[]))(string,uint64[]) method call against the AkitaDAOTypes contract
       */
      proposalRemoveAllowancesShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalRemoveAllowancesShape(params)));
        return this;
      },
      /**
       * Add a proposalNewEscrowShape((string))(string) method call against the AkitaDAOTypes contract
       */
      proposalNewEscrowShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalNewEscrowShape(params)));
        return this;
      },
      /**
       * Add a proposalToggleEscrowLockShape((string))(string) method call against the AkitaDAOTypes contract
       */
      proposalToggleEscrowLockShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalToggleEscrowLockShape(params)));
        return this;
      },
      /**
       * Add a proposalUpdateFieldShape((string,byte[]))(string,byte[]) method call against the AkitaDAOTypes contract
       */
      proposalUpdateFieldShape(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.proposalUpdateFieldShape(params)));
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
  ProposalActionEnum2[ProposalActionEnum2["UpdateFields"] = 80] = "UpdateFields";
  ProposalActionEnum2[ProposalActionEnum2["UpdateWallet"] = 90] = "UpdateWallet";
  return ProposalActionEnum2;
})(ProposalActionEnum || {});
var EMPTY_CID = Buffer.from("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
var DAOProposalVotesMBR = 22500n;

// src/dao/index.ts
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/dao/errors.ts
var DAO_ERROR_MESSAGES = {
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
  UFLD: "Unknown field in update fields proposal action"
};
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
var AkitaDaoSDK = (_class2 = class extends _chunkOPF2XL3Kjs.BaseSDK {
  
  __init5() {this._wallet = null}
  __init6() {this._walletInitPromise = null}
  
  constructor(params) {
    super({ factory: _chunkPFX6BSCEjs.AkitaDaoFactory, ...params }, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.DAO_APP_ID);_class2.prototype.__init5.call(this);_class2.prototype.__init6.call(this);;
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
    this._wallet = new (0, _chunkXKX36IH7js.WalletSDK)({
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
            callerType: pluginCallerType = _chunkXKX36IH7js.CallerType.Other,
            methods = [],
            escrow = "",
            delegationType = 0n,
            lastValid = _chunkVMMDQU5Ujs.MAX_UINT64,
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
          if (pluginCallerType === _chunkXKX36IH7js.CallerType.Global) {
            caller = _algosdk.ALGORAND_ZERO_ADDRESS_STRING;
          } else if (pluginCallerType === _chunkXKX36IH7js.CallerType.Admin) {
            caller = _algosdk2.default.getApplicationAddress(client.appId).toString();
          }
          let transformedMethods = [];
          if (methods.length > 0) {
            transformedMethods = methods.reduce(
              (acc, method) => {
                if (_chunkFZLF55XCjs.isPluginSDKReturn.call(void 0, method.name)) {
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
            allowances: _chunkVE4MYPMKjs.AllowancesToTuple.call(void 0, allowances)
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
          const { type, ...action } = typedAction;
          const { name } = action;
          if (!wallet.namedPlugins.has(name)) {
            try {
              await wallet.getPluginByName(name);
            } catch (e) {
              throw new Error(`Plugin named: ${name} not found`);
            }
          }
          abiAction = action;
          structType = "ProposalRemoveNamedPlugin";
          break;
        }
        case 50 /* AddAllowances */: {
          const { escrow, allowances } = typedAction;
          abiAction = { escrow, allowances: _chunkVE4MYPMKjs.AllowancesToTuple.call(void 0, allowances) };
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "AkitaAppList", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "AkitaSocialAppList", this.client.appClient.appSpec.structs);
              break;
            }
            case "pal": {
              const currentApps = await this.client.state.global.pluginAppList();
              const {
                optin = _nullishCoalesce((currentApps == null ? void 0 : currentApps.optin), () => ( 0n)),
                revenueManager = _nullishCoalesce((currentApps == null ? void 0 : currentApps.revenueManager), () => ( 0n)),
                update = _nullishCoalesce((currentApps == null ? void 0 : currentApps.update), () => ( 0n))
              } = action.value;
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, { optin, revenueManager, update }, "PluginAppList", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "OtherAppList", this.client.appClient.appSpec.structs);
              break;
            }
            case "wallet_fees": {
              const currentFees = await this.client.state.global.walletFees();
              const {
                createFee = _nullishCoalesce((currentFees == null ? void 0 : currentFees.createFee), () => ( 0n))
              } = action.value;
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, { createFee }, "WalletFees", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "SocialFees", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "StakingFees", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "SubscriptionFees", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "NftFees", this.client.appClient.appSpec.structs);
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
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiData, "SwapFees", this.client.appClient.appSpec.structs);
              break;
            }
            case "akita_assets": {
              const currentAssets = await this.client.state.global.akitaAssets();
              const {
                akta = _nullishCoalesce((currentAssets == null ? void 0 : currentAssets.akta), () => ( 0n)),
                bones = _nullishCoalesce((currentAssets == null ? void 0 : currentAssets.bones), () => ( 0n))
              } = action.value;
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, { akta, bones }, "AkitaAssets", this.client.appClient.appSpec.structs);
              break;
            }
            case "upgrade_app_ps":
            case "add_plugin_ps":
            case "remove_plugin_ps":
            case "add_allowance_ps":
            case "remove_allowance_ps":
            case "new_escrow_ps":
            case "update_fields_ps": {
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, action.value, "ProposalSettings", this.client.appClient.appSpec.structs);
              break;
            }
            case "revenue_splits": {
              data = _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, SplitsToTuples(action.value), "((uint64,string),uint8,uint64)[]", this.client.appClient.appSpec.structs);
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
        _chunkAW5G7J3Ljs.encodeABIValue.call(void 0, abiAction, structType, this.typeClient.appClient.appSpec.structs)
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
    const { nickname = "Akita DAO", salt = _chunkAW5G7J3Ljs.randomByteArray.call(void 0, 32) } = params;
    _chunkAW5G7J3Ljs.assertByteArrayLength.call(void 0, salt, "salt", 32);
    const group = this.client.newGroup();
    group.setup({
      ...sendParams,
      args: { nickname, salt },
      maxFee: _algokitutils.microAlgo.call(void 0, 6000n)
    });
    group.opUp({ args: {}, note: "1", maxFee: _algokitutils.microAlgo.call(void 0, 1000n) });
    group.opUp({ args: {}, note: "2", maxFee: _algokitutils.microAlgo.call(void 0, 1000n) });
    const result = await group.send({ ...sendParams });
    if (result.returns === void 0) {
      throw new Error("Failed to setup Akita DAO");
    }
    this._wallet = new (0, _chunkXKX36IH7js.WalletSDK)({
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
    const { total } = await this.client.proposalCost({ args: { actions: preppedActions } });
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
    for (let i = 0; i < actions.length; i++) {
      group.opUp({ args: {}, note: `${i}`, maxFee: _algokitutils.microAlgo.call(void 0, 257000n) });
    }
    const prepared = await _chunkXKX36IH7js.prepareGroup.call(void 0, 
      await group.composer(),
      consolidateFees ? { consolidateFees: true } : {}
    );
    const { groupId, txIds, confirmedRound, returns } = await _chunkXKX36IH7js.sendPrepared.call(void 0, 
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
    const mbrPayment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      receiver: this.client.appAddress.toString(),
      amount: _algokitutils.microAlgo.call(void 0, DAOProposalVotesMBR)
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
  async getGlobalState() {
    return await this.client.state.global.getAll();
  }
  async setupCost(params) {
    const sendParams = this.getSendParams({
      sender: this.readerAccount,
      signer: _chunkVMMDQU5Ujs.emptySigner,
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
      signer: _nullishCoalesce(signer, () => ( _chunkVMMDQU5Ujs.emptySigner))
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
      case 80 /* UpdateFields */:
        return "ProposalUpdateField";
      case 90 /* UpdateWallet */:
        return "";
      // No struct — empty data
      default:
        throw new Error(`Unknown proposal action type: ${actionType}`);
    }
  }
  /**
   * Decodes the raw action bytes into their typed struct representation
   */
  decodeProposalAction(actionType, actionData) {
    const structType = this.getActionStructType(actionType);
    const structs = this.typeClient.appClient.appSpec.structs;
    switch (actionType) {
      case 10 /* UpgradeApp */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 10 /* UpgradeApp */, ...decoded };
      }
      case 20 /* AddPlugin */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 20 /* AddPlugin */, ...decoded };
      }
      case 21 /* AddNamedPlugin */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 21 /* AddNamedPlugin */, ...decoded };
      }
      case 30 /* ExecutePlugin */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 30 /* ExecutePlugin */, ...decoded };
      }
      case 31 /* RemoveExecutePlugin */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 31 /* RemoveExecutePlugin */, ...decoded };
      }
      case 40 /* RemovePlugin */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 40 /* RemovePlugin */, ...decoded };
      }
      case 41 /* RemoveNamedPlugin */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 41 /* RemoveNamedPlugin */, ...decoded };
      }
      case 50 /* AddAllowances */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 50 /* AddAllowances */, ...decoded };
      }
      case 60 /* RemoveAllowances */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 60 /* RemoveAllowances */, ...decoded };
      }
      case 70 /* NewEscrow */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 70 /* NewEscrow */, ...decoded };
      }
      case 71 /* ToggleEscrowLock */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
        return { type: 71 /* ToggleEscrowLock */, ...decoded };
      }
      case 80 /* UpdateFields */: {
        const decoded = _chunkAW5G7J3Ljs.decodeABIValue.call(void 0, actionData, structType, structs);
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
    const decodedActions = proposal.actions.map(([actionType, actionData]) => {
      return this.decodeProposalAction(actionType, actionData);
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











exports.SplitDistributionType = SplitDistributionType; exports.SplitsToTuples = SplitsToTuples; exports.ProposalActionEnum = ProposalActionEnum; exports.EMPTY_CID = EMPTY_CID; exports.DAOProposalVotesMBR = DAOProposalVotesMBR; exports.DAO_ERROR_MESSAGES = DAO_ERROR_MESSAGES; exports.parseDaoErrorCode = parseDaoErrorCode; exports.translateDaoError = translateDaoError; exports.AkitaDaoSDK = AkitaDaoSDK;
//# sourceMappingURL=chunk-KSC437TP.js.map
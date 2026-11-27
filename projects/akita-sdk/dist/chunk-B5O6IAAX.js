"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;


var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunk7UO6FJCTjs = require('./chunk-7UO6FJCT.js');


var _chunkLMKWWXS5js = require('./chunk-LMKWWXS5.js');

// src/prize-box/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/PrizeBoxClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "PrizeBox", "structs": { "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "address", "name": "owner" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [{ "type": "address", "name": "caller" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "Deleted only through `PrizeBoxFactory.deletePrizeBox` so the creation MBR the factory\nreleases can be refunded to the minter; the box account closes to the owner.", "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "transfer", "args": [{ "type": "address", "name": "newOwner" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "(uint64,uint64)[]", "name": "assets" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "desc": "A transferable bundle of ASAs/ALGO. `funder` (from `ChildContract`) records who paid the\napp-creation MBR; the factory refunds it to them on deletion. Everything held in the box\naccount (its min balance, opt-in MBR, any ALGO) belongs to the current owner.", "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "owner": { "keyType": "AVMString", "valueType": "address", "key": "b3duZXI=", "desc": "the owner of the box of prizes" }, "optinCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b3B0aW5fY291bnQ=", "desc": "the current count of prizes opted in" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [326], "errorMessage": "ERR:errAopt" }, { "pc": [351], "errorMessage": "ERR:errClwa" }, { "pc": [496], "errorMessage": "ERR:errIast" }, { "pc": [288, 300], "errorMessage": "ERR:errIpay" }, { "pc": [194], "errorMessage": "ERR:errMbff" }, { "pc": [227], "errorMessage": "ERR:errNemt" }, { "pc": [205, 275, 402, 440], "errorMessage": "ERR:errNown" }, { "pc": [330], "errorMessage": "asset exists" }, { "pc": [198, 209, 232, 268, 374, 395, 433, 511, 521, 549, 578], "errorMessage": "check GlobalState exists" }, { "pc": [461], "errorMessage": "index access is out of bounds" }, { "pc": [414], "errorMessage": "invalid array length header" }, { "pc": [427], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/utils/types/asset.ts::AssetInfo>" }, { "pc": [135, 171, 389], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [261], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [144], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [253], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDMyIDgKICAgIGJ5dGVjYmxvY2sgIm93bmVyIiAib3B0aW5fY291bnQiICJFUlI6ZXJyTm93biIgIkVSUjplcnJJcGF5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjI4CiAgICAvLyBleHBvcnQgY2xhc3MgUHJpemVCb3ggZXh0ZW5kcyBDaGlsZENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDIxNTIxNWUwIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oYWRkcmVzcyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUAyCgptYWluX3N3aXRjaF9jYXNlX25leHRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyOAogICAgLy8gZXhwb3J0IGNsYXNzIFByaXplQm94IGV4dGVuZHMgQ2hpbGRDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDkKICAgIHB1c2hieXRlc3MgMHgzZWExMTgzMiAweGFkZjkyYWU0IDB4NDQyMDBmYmQgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXcoKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG9wdGluIHRyYW5zZmVyIHdpdGhkcmF3CiAgICBlcnIKCm1haW5fY3JlYXRlX05vT3BAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyOAogICAgLy8gZXhwb3J0IGNsYXNzIFByaXplQm94IGV4dGVuZHMgQ2hpbGRDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHg4NGNhYWYyYSAvLyBtZXRob2QgImNyZWF0ZShhZGRyZXNzLChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX2RlbGV0ZUFwcGxpY2F0aW9uX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGV0ZUFwcGxpY2F0aW9uCgoKLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjpQcml6ZUJveC5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbWJyLnRzOjpGdW5kZXJJbmZvCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzMKICAgIC8vIG93bmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lciB9KQogICAgYnl0ZWNfMCAvLyAib3duZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIHRoaXMub3duZXIudmFsdWUgPSBvd25lcgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBvcHRpbkNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU9wdGluQ291bnQgfSkKICAgIGJ5dGVjXzEgLy8gIm9wdGluX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyB0aGlzLm9wdGluQ291bnQudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo0MwogICAgLy8gdGhpcy5mdW5kZXIudmFsdWUgPSBjbG9uZShmdW5kZXIpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo6UHJpemVCb3guZGVsZXRlQXBwbGljYXRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVBcHBsaWNhdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1MAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBsb2dnZWRBc3NlcnQoY2FsbGVyID09PSB0aGlzLm93bmVyLnZhbHVlLCBlcnJOb3RPd25lcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzMKICAgIC8vIG93bmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lciB9KQogICAgYnl0ZWNfMCAvLyAib3duZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIGxvZ2dlZEFzc2VydChjYWxsZXIgPT09IHRoaXMub3duZXIudmFsdWUsIGVyck5vdE93bmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb3duIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vd24KCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5vcHRpbkNvdW50LnZhbHVlID09PSAwLCBlcnJOb3RFbXB0eSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIG9wdGluQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3B0aW5Db3VudCB9KQogICAgYnl0ZWNfMSAvLyAib3B0aW5fY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm9wdGluQ291bnQudmFsdWUgPT09IDAsIGVyck5vdEVtcHR5KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZW10IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lbXQKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjU1LTU3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogdGhpcy5vd25lci52YWx1ZSB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1NgogICAgLy8gLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiB0aGlzLm93bmVyLnZhbHVlIH0pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBvd25lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIgfSkKICAgIGJ5dGVjXzAgLy8gIm93bmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjU2CiAgICAvLyAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IHRoaXMub3duZXIudmFsdWUgfSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1NS01NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IHRoaXMub3duZXIudmFsdWUgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1NS01NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IHRoaXMub3duZXIudmFsdWUgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjUwCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjpQcml6ZUJveC5vcHRpbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdGluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjY3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5vd25lci52YWx1ZSwgZXJyTm90T3duZXIpCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBvd25lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIgfSkKICAgIGJ5dGVjXzAgLy8gIm93bmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5vd25lci52YWx1ZSwgZXJyTm90T3duZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vd24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm93bgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlY18zIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpvcHRpbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsIGVyckludmFsaWRQYXltZW50KQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjXzMgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCm9wdGluX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjcyCiAgICAvLyBsb2dnZWRBc3NlcnQoIUdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBlcnJBbHJlYWR5T3B0ZWRJbikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IG9wdGluX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJBb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFvcHQKCm9wdGluX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjc0CiAgICAvLyBsb2dnZWRBc3NlcnQoQXNzZXQoYXNzZXQpLmNsYXdiYWNrID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrQXNzZXQpCiAgICBkdXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDbGF3YmFjawogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ2x3YSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbHdhCgpvcHRpbl9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NzYtODIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjc4CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo3Ni04MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NzYtODIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gdGhpcy5vcHRpbkNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIG9wdGluQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3B0aW5Db3VudCB9KQogICAgYnl0ZWNfMSAvLyAib3B0aW5fY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIHRoaXMub3B0aW5Db3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozNQogICAgLy8gb3B0aW5Db3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPcHRpbkNvdW50IH0pCiAgICBieXRlY18xIC8vICJvcHRpbl9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gdGhpcy5vcHRpbkNvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIG9wdGluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo6UHJpemVCb3gudHJhbnNmZXJbcm91dGluZ10oKSAtPiB2b2lkOgp0cmFuc2ZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo4NwogICAgLy8gdHJhbnNmZXIobmV3T3duZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5vd25lci52YWx1ZSwgZXJyTm90T3duZXIpCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBvd25lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIgfSkKICAgIGJ5dGVjXzAgLy8gIm93bmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5vd25lci52YWx1ZSwgZXJyTm90T3duZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiB0cmFuc2Zlcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMiAvLyAiRVJSOmVyck5vd24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm93bgoKdHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzMKICAgIC8vIG93bmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lciB9KQogICAgYnl0ZWNfMCAvLyAib3duZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHRoaXMub3duZXIudmFsdWUgPSBuZXdPd25lcgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo4NwogICAgLy8gdHJhbnNmZXIobmV3T3duZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OlByaXplQm94LndpdGhkcmF3W3JvdXRpbmddKCkgLT4gdm9pZDoKd2l0aGRyYXc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdpdGhkcmF3KGFzc2V0czogQXNzZXRJbmZvW10pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAxNgogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvYXNzZXQudHM6OkFzc2V0SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMub3duZXIudmFsdWUsIGVyck5vdE93bmVyKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozMwogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMub3duZXIudmFsdWUsIGVyck5vdE93bmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJOb3duIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vd24KCndpdGhkcmF3X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjk1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKd2l0aGRyYXdfd2hpbGVfdG9wQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGJ6IHdpdGhkcmF3X2FmdGVyX3doaWxlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIGlmIChhc3NldHNbaV0uYXNzZXQgIT09IDApIHsKICAgIGRpZyAyCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgICoKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgYnogd2l0aGRyYXdfZWxzZV9ib2R5QDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5Ny0xMDAKICAgIC8vIGNvbnN0IFthc3NldEhvbGRpbmcsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZSgKICAgIC8vICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0c1tpXS5hc3NldAogICAgLy8gKQogICAgZGlnIDMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KG9wdGVkSW4sIGVyckludmFsaWRBc3NldCkKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXN0Cgp3aXRoZHJhd19hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMDMKICAgIC8vIGNvbnN0IGNsb3NlT3V0ID0gYXNzZXRIb2xkaW5nID09PSBhc3NldHNbaV0uYW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTA0CiAgICAvLyBpZiAoY2xvc2VPdXQpIHsKICAgIGJ6IHdpdGhkcmF3X2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gdGhpcy5vcHRpbkNvdW50LnZhbHVlIC09IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIG9wdGluQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3B0aW5Db3VudCB9KQogICAgYnl0ZWNfMSAvLyAib3B0aW5fY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyB0aGlzLm9wdGluQ291bnQudmFsdWUgLT0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIG9wdGluQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3B0aW5Db3VudCB9KQogICAgYnl0ZWNfMSAvLyAib3B0aW5fY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyB0aGlzLm9wdGluQ291bnQudmFsdWUgLT0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMDctMTE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXS5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTExCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozMwogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMTEKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEwNy0xMTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRzW2ldLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldHNbaV0uYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMDctMTE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXS5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgd2l0aGRyYXdfd2hpbGVfdG9wQDQKCndpdGhkcmF3X2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMTYtMTIyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXS5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBvd25lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIgfSkKICAgIGJ5dGVjXzAgLy8gIm93bmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTE2LTEyMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldHNbaV0uYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0c1tpXS5hbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTE2LTEyMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldHNbaV0uYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0c1tpXS5hbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE2Cgp3aXRoZHJhd19lbHNlX2JvZHlAMTQ6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEyNS0xMzAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBhbW91bnQ6IGFzc2V0c1tpXS5hbW91bnQsCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozMwogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTI1LTEyOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiBhc3NldHNbaV0uYW1vdW50LAogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEyNS0xMzAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDE2Cgp3aXRoZHJhd19hZnRlcl93aGlsZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5MgogICAgLy8gd2l0aGRyYXcoYXNzZXRzOiBBc3NldEluZm9bXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAEAAEgCCYEBW93bmVyC29wdGluX2NvdW50C0VSUjplcnJOb3duC0VSUjplcnJJcGF5gAQhUhXgNhoAjgEANDEZFEQxGEEAHYIDBD6hGDIErfkq5AREIA+9NhoAjgMAjwEZATMAgASEyq8qNhoAjgEADQAxGYEFEjEYEERCACQ2GgFJFSQSRDYaAkkVgSgSRChPAmcpImeABmZ1bmRlckxnI0M2GgFJFSQSRDEAMgkSQAAPgAtFUlI6ZXJyTWJmZrAAIihlRBJAAAMqsAAiKWVEQQAPgAtFUlI6ZXJyTmVtdLAAsSIoZUSyCSOyECKyAbMjQzEWIwlJOBAjEkQ2GgFJFSUSRBcxACIoZUQSQAADKrAASwE4BzIKEkAAAyuwAEw4CDIQEkAAAyuwADIKSwFwAEUBQQAPgAtFUlI6ZXJyQW9wdLAASXEKRDIDEkAAD4ALRVJSOmVyckNsd2GwALEyCkyyESKyErIUgQSyECKyAbMiKWVEIwgpTGcjQzYaAUkVJBJEMQAiKGVEEkAAAyqwAChMZyNDNhoBRwIiWUlOAoEQC4ECCEwVEkQxACIoZUQSQAADKrAAIklLAgxBAJBLAlcCAEsBgRALgRBYSU4CIltJTgNBAF8yCksDcABAAA+AC0VSUjplcnJJYXN0sABPAiVbSU8CEkEAJSIpZUQjCSlMZ7EiKGVESbIVshSyEkyyEYEEshAisgGzIwhC/5mxIihlRLIUshJMshGBBLIQIrIBs0L/5E8CSLFMJVsiKGVEsgeyCCOyECKyAbNC/8sjQw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var PrizeBoxParamsFactory = class _PrizeBoxParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(address,(address,uint64))void":
            return _PrizeBoxParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the PrizeBox smart contract using the create(address,(address,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(address,(address,uint64))void",
          args: Array.isArray(params.args) ? params.args : [params.args.owner, params.args.funder]
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
          case "deleteApplication(address)void":
            return _PrizeBoxParamsFactory.delete.deleteApplication(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the PrizeBox smart contract using the deleteApplication(address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      deleteApplication(params) {
        return {
          ...params,
          method: "deleteApplication(address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.caller]
        };
      }
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
   * Constructs a no op call for the transfer(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static transfer(params) {
    return {
      ...params,
      method: "transfer(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.newOwner]
    };
  }
  /**
   * Constructs a no op call for the withdraw((uint64,uint64)[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static withdraw(params) {
    return {
      ...params,
      method: "withdraw((uint64,uint64)[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.assets]
    };
  }
};
var PrizeBoxFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `PrizeBoxFactory`
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
    return new PrizeBoxClient(this.appFactory.getAppClientById(params));
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
    return new PrizeBoxClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the PrizeBox smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? PrizeBoxParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      deleteParams: ((_b = params.deleteParams) == null ? void 0 : _b.method) ? PrizeBoxParamsFactory.delete._resolveByMethod(params.deleteParams) : params.deleteParams ? params.deleteParams : void 0
    });
    return { result: result.result, appClient: new PrizeBoxClient(result.appClient) };
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
       * Creates a new instance of the PrizeBox smart contract using the create(address,(address,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(PrizeBoxParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployDelete methods
     */
    deployDelete: {
      /**
             * Deletes an existing instance of the PrizeBox smart contract using the deleteApplication(address)void ABI method.
             *
            * Deleted only through `PrizeBoxFactory.deletePrizeBox` so the creation MBR the factory
            releases can be refunded to the minter; the box account closes to the owner.
      
             *
             * @param params The params for the smart contract call
             * @returns The deployDelete params
             */
      deleteApplication: (params) => {
        return this.appFactory.params.deployDelete(PrizeBoxParamsFactory.delete.deleteApplication(params));
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
       * Creates a new instance of the PrizeBox smart contract using the create(address,(address,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(PrizeBoxParamsFactory.create.create(params));
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
       * Creates a new instance of the PrizeBox smart contract using an ABI method call using the create(address,(address,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(PrizeBoxParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new PrizeBoxClient(result.appClient) };
      }
    }
  }}
}, _class);
var PrizeBoxClient = (_class2 = class _PrizeBoxClient {
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
   * Returns a new `PrizeBoxClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _PrizeBoxClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `PrizeBoxClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _PrizeBoxClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Gets available delete methods
     */
    delete: {
      /**
             * Deletes an existing instance of the PrizeBox smart contract using the `deleteApplication(address)void` ABI method.
             *
            * Deleted only through `PrizeBoxFactory.deletePrizeBox` so the creation MBR the factory
            releases can be refunded to the minter; the box account closes to the owner.
      
             *
             * @param params The params for the smart contract call
             * @returns The delete params
             */
      deleteApplication: (params) => {
        return this.appClient.params.delete(PrizeBoxParamsFactory.delete.deleteApplication(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the PrizeBox smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optin: (params) => {
      return this.appClient.params.call(PrizeBoxParamsFactory.optin(params));
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `transfer(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    transfer: (params) => {
      return this.appClient.params.call(PrizeBoxParamsFactory.transfer(params));
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `withdraw((uint64,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    withdraw: (params) => {
      return this.appClient.params.call(PrizeBoxParamsFactory.withdraw(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init5() {this.createTransaction = {
    /**
     * Gets available delete methods
     */
    delete: {
      /**
             * Deletes an existing instance of the PrizeBox smart contract using the `deleteApplication(address)void` ABI method.
             *
            * Deleted only through `PrizeBoxFactory.deletePrizeBox` so the creation MBR the factory
            releases can be refunded to the minter; the box account closes to the owner.
      
             *
             * @param params The params for the smart contract call
             * @returns The delete transaction
             */
      deleteApplication: (params) => {
        return this.appClient.createTransaction.delete(PrizeBoxParamsFactory.delete.deleteApplication(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the PrizeBox smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optin: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxParamsFactory.optin(params));
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `transfer(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    transfer: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxParamsFactory.transfer(params));
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `withdraw((uint64,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    withdraw: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxParamsFactory.withdraw(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init6() {this.send = {
    /**
     * Gets available delete methods
     */
    delete: {
      /**
             * Deletes an existing instance of the PrizeBox smart contract using the `deleteApplication(address)void` ABI method.
             *
            * Deleted only through `PrizeBoxFactory.deletePrizeBox` so the creation MBR the factory
            releases can be refunded to the minter; the box account closes to the owner.
      
             *
             * @param params The params for the smart contract call
             * @returns The delete result
             */
      deleteApplication: async (params) => {
        const result = await this.appClient.send.delete(PrizeBoxParamsFactory.delete.deleteApplication(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the PrizeBox smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optin: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxParamsFactory.optin(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `transfer(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    transfer: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxParamsFactory.transfer(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBox smart contract using the `withdraw((uint64,uint64)[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    withdraw: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxParamsFactory.withdraw(params));
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
    return new _PrizeBoxClient(this.appClient.clone(params));
  }
  /**
   * Methods to access state for the current PrizeBox app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current PrizeBox app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          owner: result.owner,
          optinCount: result.optinCount,
          funder: result.funder
        };
      },
      /**
       * Get the current value of the owner key in global state
       */
      owner: async () => {
        return await this.appClient.state.global.getValue("owner");
      },
      /**
       * Get the current value of the optinCount key in global state
       */
      optinCount: async () => {
        return await this.appClient.state.global.getValue("optinCount");
      },
      /**
       * Get the current value of the funder key in global state
       */
      funder: async () => {
        return await this.appClient.state.global.getValue("funder");
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
       * Add a optin(pay,uint64)void method call against the PrizeBox contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a transfer(address)void method call against the PrizeBox contract
       */
      transfer(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.transfer(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a withdraw((uint64,uint64)[])void method call against the PrizeBox contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        resultMappers.push(void 0);
        return this;
      },
      get delete() {
        return {
          deleteApplication: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.deleteApplication(params)));
            resultMappers.push(void 0);
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the PrizeBox contract
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

// src/generated/PrizeBoxFactoryClient.ts





var APP_SPEC2 = { "name": "PrizeBoxFactory", "structs": { "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mint", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "owner" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deletePrizeBox", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Delete an empty prize box (caller must be its owner). The box account closes to the owner;\nthe creation MBR this factory releases is refunded to the recorded minter.", "events": [], "recommendations": {} }, { "name": "mintCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1728], "errorMessage": "Bytes has valid prefix" }, { "pc": [1435], "errorMessage": "ERR:errCnst" }, { "pc": [1413], "errorMessage": "ERR:errIcor" }, { "pc": [321, 337], "errorMessage": "ERR:errIpay" }, { "pc": [1578], "errorMessage": "ERR:errIpma" }, { "pc": [1548], "errorMessage": "ERR:errIpmr" }, { "pc": [2110], "errorMessage": "ERR:errIupg" }, { "pc": [1064], "errorMessage": "ERR:errNapb" }, { "pc": [1264, 1464, 2037, 2078, 2144], "errorMessage": "ERR:errNdao" }, { "pc": [1764], "errorMessage": "ERR:errNesc" }, { "pc": [1790], "errorMessage": "ERR:errWesc" }, { "pc": [1032, 1040, 1128, 1146], "errorMessage": "account funded" }, { "pc": [990, 1043, 1294, 1457, 1514, 1854, 1872, 1969, 2030, 2071, 2137], "errorMessage": "application exists" }, { "pc": [1245, 1451, 1503, 1509, 1622, 1653, 1849, 1959, 1964, 2024, 2065, 2082, 2131], "errorMessage": "check GlobalState exists" }, { "pc": [253, 1222, 1314, 1731, 2013, 2049], "errorMessage": "invalid array length header" }, { "pc": [260, 1229, 1321, 2056], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1740], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [309], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [271, 1022, 1240, 1306, 1488, 1952, 2124], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [2018], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [2005], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [2e3], "errorMessage": "invalid tuple encoding" }, { "pc": [298, 1480], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDIgOCAyMjg1MDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgIndhbGxldCIgImJjIiAiRVJSOmVyck5kYW8iIDB4MTUxZjdjNzUgImFraXRhX2VzY3JvdyIgMHhjNTNiMzJjYyAidmVyc2lvbiIgImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iICJFUlI6ZXJySXBheSIgInBhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjI1LTMxCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBQcml6ZUJveEZhY3RvcnkgZXh0ZW5kcyBGYWN0b3J5Q29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUAyCgptYWluX3N3aXRjaF9jYXNlX25leHRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjI1LTMxCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBQcml6ZUJveEZhY3RvcnkgZXh0ZW5kcyBGYWN0b3J5Q29udHJhY3QgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAxNwogICAgcHVzaGJ5dGVzcyAweDNkZWNiMTQwIDB4NmRlMWNkZTQgMHhkMzRmODZmZSAvLyBtZXRob2QgIm1pbnQocGF5LGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJkZWxldGVQcml6ZUJveCh1aW50NjQpdm9pZCIsIG1ldGhvZCAibWludENvc3QoKXVpbnQ2NCIKICAgIGJ5dGVjIDYgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgLy8gbWV0aG9kICJsb2FkQm94ZWRDb250cmFjdCh1aW50NjQsYnl0ZVtdKXZvaWQiLCBtZXRob2QgImRlbGV0ZUJveGVkQ29udHJhY3QoKXZvaWQiLCBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAib3B0SW5Db3N0KHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1pbnQgZGVsZXRlUHJpemVCb3ggbWludENvc3QgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE1CiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjI1LTMxCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBQcml6ZUJveEZhY3RvcnkgZXh0ZW5kcyBGYWN0b3J5Q29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4Y2Q5YWQ2N2UgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6OlByaXplQm94RmFjdG9yeS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDcgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czozNwogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgZGlnIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MgogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czozOAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjM5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo6UHJpemVCb3hGYWN0b3J5Lm1pbnRbcm91dGluZ10oKSAtPiB2b2lkOgptaW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NDQKICAgIC8vIG1pbnQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBvd25lcjogQWNjb3VudCk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjU2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG1pbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDkgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCm1pbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhcHBNQlIgKyBHbG9iYWwubWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBkdXAKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NTEtNTMKICAgIC8vIE1JTl9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIHByaXplQm94Lmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogcHJpemVCb3guZ2xvYmFsQnl0ZXMpCiAgICBpbnRjIDQgLy8gMjI4NTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBhcHBNQlIgKyBHbG9iYWwubWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgKwogICAgPT0KICAgIGJueiBtaW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA5IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgptaW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NTktNjIKICAgIC8vIGNvbnN0IHByaXplQm94QXBwID0gcHJpemVCb3guY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbb3duZXIsIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogYXBwTUJSIH1dLAogICAgLy8gICB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NjEKICAgIC8vIGFyZ3M6IFtvd25lciwgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBhcHBNQlIgfV0sCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjUxLTUzCiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHByaXplQm94Lmdsb2JhbEJ5dGVzKQogICAgaW50YyA0IC8vIDIyODUwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NjEKICAgIC8vIGFyZ3M6IFtvd25lciwgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBhcHBNQlIgfV0sCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjQ2CiAgICAvLyBjb25zdCBwcml6ZUJveCA9IGNvbXBpbGVBcmM0KFByaXplQm94KQogICAgaW50Y18yIC8vIDIKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtQnl0ZVNsaWNlCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICBwdXNoYnl0ZXMgYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICBwdXNoYnl0ZXMgYmFzZTY0KEN5QUVBQUVnQ0NZRUJXOTNibVZ5QzI5d2RHbHVYMk52ZFc1MEMwVlNVanBsY25KT2IzZHVDMFZTVWpwbGNuSkpjR0Y1Z0FRaFVoWGdOaG9BamdFQU5ERVpGRVF4R0VFQUhZSURCRDZoR0RJRXJma3E1QVJFSUErOU5ob0FqZ01BandFWkFUTUFnQVNFeXE4cU5ob0FqZ0VBRFFBeEdZRUZFakVZRUVSQ0FDUTJHZ0ZKRlNRU1JEWWFBa2tWZ1NnU1JDaFBBbWNwSW1lQUJtWjFibVJsY2t4bkkwTTJHZ0ZKRlNRU1JERUFNZ2tTUUFBUGdBdEZVbEk2WlhKeVRXSm1ackFBSWlobFJCSkFBQU1xc0FBaUtXVkVRUUFQZ0F0RlVsSTZaWEp5VG1WdGRMQUFzU0lvWlVTeUNTT3lFQ0t5QWJNalF6RVdJd2xKT0JBakVrUTJHZ0ZKRlNVU1JCY3hBQ0lvWlVRU1FBQURLckFBU3dFNEJ6SUtFa0FBQXl1d0FFdzRDRElRRWtBQUF5dXdBRElLU3dGd0FFVUJRUUFQZ0F0RlVsSTZaWEp5UVc5d2RMQUFTWEVLUkRJREVrQUFENEFMUlZKU09tVnlja05zZDJHd0FMRXlDa3l5RVNLeUVySVVnUVN5RUNLeUFiTWlLV1ZFSXdncFRHY2pRellhQVVrVkpCSkVNUUFpS0dWRUVrQUFBeXF3QUNoTVp5TkROaG9CUndJaVdVbE9Bb0VRQzRFQ0NFd1ZFa1F4QUNJb1pVUVNRQUFES3JBQUlrbExBZ3hCQUpCTEFsY0NBRXNCZ1JBTGdSQllTVTRDSWx0SlRnTkJBRjh5Q2tzRGNBQkFBQStBQzBWU1VqcGxjbkpKWVhOMHNBQlBBaVZiU1U4Q0VrRUFKU0lwWlVRakNTbE1aN0VpS0dWRVNiSVZzaFN5RWt5eUVZRUVzaEFpc2dHekl3aEMvNW14SWlobFJMSVVzaEpNc2hHQkJMSVFJcklCczBMLzVFOENTTEZNSlZzaUtHVkVzZ2V5Q0NPeUVDS3lBYk5DLzhzalF3PT0pCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo1OS02MgogICAgLy8gY29uc3QgcHJpemVCb3hBcHAgPSBwcml6ZUJveC5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFtvd25lciwgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiBhcHBNQlIgfV0sCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHB1c2hieXRlcyAweDg0Y2FhZjJhIC8vIG1ldGhvZCAiY3JlYXRlKGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjU5LTY0CiAgICAvLyBjb25zdCBwcml6ZUJveEFwcCA9IHByaXplQm94LmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogW293bmVyLCB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IGFwcE1CUiB9XSwKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjY2LTcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcHJpemVCb3hBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjY4CiAgICAvLyByZWNlaXZlcjogcHJpemVCb3hBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NjkKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjY2LTcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcHJpemVCb3hBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NjYtNzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwcml6ZUJveEFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjQ0CiAgICAvLyBtaW50KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgb3duZXI6IEFjY291bnQpOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjpQcml6ZUJveEZhY3RvcnkuZGVsZXRlUHJpemVCb3hbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVQcml6ZUJveDoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjgwCiAgICAvLyBkZWxldGVQcml6ZUJveChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6ODEKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6ODIKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RBUHJpemVCb3gpCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVQcml6ZUJveF9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmFwYiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOYXBiCgpkZWxldGVQcml6ZUJveF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzAyCiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBidXJ5IDYKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo4Ny05MQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLmRlbGV0ZUFwcGxpY2F0aW9uPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo4OQogICAgLy8gYXJnczogW1R4bi5zZW5kZXJdLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6OTAKICAgIC8vIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbiwKICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6ODctOTEKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS5kZWxldGVBcHBsaWNhdGlvbj4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1R4bi5zZW5kZXJdLAogICAgLy8gICBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4MjE1MjE1ZTAgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OAogICAgLy8gY29uc3Qgc2VsZiA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OQogICAgLy8gY29uc3QgZ3Jvc3M6IHVpbnQ2NCA9IHNlbGYuYmFsYW5jZSArIGZvcndhcmRlZAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MAogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGdyb3NzID4gYmFsYW5jZUJlZm9yZSA/IGdyb3NzIC0gYmFsYW5jZUJlZm9yZSA6IDAKICAgIGRpZyA0CiAgICA+CiAgICBieiBkZWxldGVQcml6ZUJveF90ZXJuYXJ5X2ZhbHNlQDgKICAgIHVuY292ZXIgMwogICAgLQoKZGVsZXRlUHJpemVCb3hfdGVybmFyeV9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTEKICAgIC8vIGNvbnN0IG1pbkFmdGVyOiB1aW50NjQgPSBzZWxmLm1pbkJhbGFuY2UKICAgIHVuY292ZXIgMgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBkaWcgMwogICAgPAogICAgYnogZGVsZXRlUHJpemVCb3hfdGVybmFyeV9mYWxzZUAxMQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAtCgpkZWxldGVQcml6ZUJveF90ZXJuYXJ5X21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gcmVjZWl2ZWQgKyByZWxlYXNlZAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIHJldHVybiByZWZ1bmQgPiByZWNvcmRlZCA/IHJlY29yZGVkIDogcmVmdW5kCiAgICBkdXAKICAgIGRpZyAyCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTAKICAgIC8vIGlmIChyZWZ1bmQgPiAwKSB7CiAgICBieiBkZWxldGVQcml6ZUJveF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTEKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQ6IHJlZnVuZCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpkZWxldGVQcml6ZUJveF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIGRlbGV0ZVByaXplQm94KGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlUHJpemVCb3hfdGVybmFyeV9mYWxzZUAxMToKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVQcml6ZUJveF90ZXJuYXJ5X21lcmdlQDEyCgpkZWxldGVQcml6ZUJveF90ZXJuYXJ5X2ZhbHNlQDg6CiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MAogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGdyb3NzID4gYmFsYW5jZUJlZm9yZSA/IGdyb3NzIC0gYmFsYW5jZUJlZm9yZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGRlbGV0ZVByaXplQm94X3Rlcm5hcnlfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjpQcml6ZUJveEZhY3RvcnkubWludENvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgptaW50Q29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIE1JTl9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIHByaXplQm94Lmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogcHJpemVCb3guZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNCAvLyAyMjg1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjEwMwogICAgLy8gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czoxMDAtMTAzCiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHByaXplQm94Lmdsb2JhbEJ5dGVzKSArCiAgICAvLyBHbG9iYWwubWluQmFsYW5jZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6OTYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjExOAogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjIKICAgIC8vIGNvbnN0IFtkYW9XYWxsZXRJZF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMgogICAgLy8gY29uc3QgW2Rhb1dhbGxldElkXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjQtMTI2CiAgICAvLyBkYW9XYWxsZXRJZCA9PT0gMAogICAgLy8gICA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgLy8gICA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfZmFsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjUKICAgIC8vID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09Cgppbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjMtMTI4CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGRhb1dhbGxldElkID09PSAwCiAgICAvLyAgICAgPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIC8vICAgICA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgLy8gICBlcnJOb3RBa2l0YURhbwogICAgLy8gKQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlY18zIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyOQogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzAKICAgIC8vIGlmICghdGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzEKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5jcmVhdGUoeyBzaXplIH0pCiAgICBzd2FwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjExOAogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18yIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMwogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlc2l6ZShzaXplKQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgYiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDkKCmluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfZmFsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyNgogICAgLy8gOiBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihkYW9XYWxsZXRJZCkuYWRkcmVzcywKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBiIGluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QubG9hZEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsb2FkQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzNwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzgKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzkKICAgIC8vIGNvbnN0IHR4biA9IGd0eG4uVHJhbnNhY3Rpb24oVHhuLmdyb3VwSW5kZXggLSBleHBlY3RlZFByZXZpb3VzQ2FsbHMgLSAxKQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHN3YXAKICAgIC0KICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQyCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgZGlnIDIKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDMKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBkaWcgMgogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MwogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDQKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZGlnIDIKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0NAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDUKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgZGlnIDIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgNiAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ1CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDYKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGRpZyAyCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ2CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQwLTE0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBlcnJJbnZhbGlkQ2FsbE9yZGVyKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWNvciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY29yCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzIgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18yIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0OQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlcGxhY2Uob2Zmc2V0LCBkYXRhKQogICAgY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzNwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmRlbGV0ZUJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzEgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMiAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTQKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTIKICAgIC8vIGRlbGV0ZUJveGVkQ29udHJhY3QoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTYKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgcG9wCiAgICAhCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTgKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA4CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYm56IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzEgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjE2CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAxMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGNvdmVyIDIKICAgIGludGNfMyAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4CiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWNfMSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgZGlnIDYKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldlc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgcHVzaGJ5dGVzIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDQKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTYKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA4CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTcKICAgIC8vIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE2LTExOQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMwogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNQogICAgLy8gW2Fzc2V0LmlkXSwKICAgIHN3YXAKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNAogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMwogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNQogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODcKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMiAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTYKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE2CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18xIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWNfMyAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxMCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18xIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlY18zIC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4K", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAFAAECCJT5DSYLCWFraXRhX2RhbwZ3YWxsZXQCYmMLRVJSOmVyck5kYW8EFR98dQxha2l0YV9lc2Nyb3cExTsyzAd2ZXJzaW9uFmNoaWxkX2NvbnRyYWN0X3ZlcnNpb24LRVJSOmVycklwYXkDcGFsgATqkYDdNhoAjgEAbTEZFEQxGEEAVoIDBD3ssUAEbeHN5ATTT4b+JwaCBwTcothiBNNGsaQEOU6usgQz94gIBK6Ey9gEM+kslASFTe3gNhoAjgsARQMZA9kD5gQ4BMsE4wa+BuwHagABACNDgATNmtZ+NhoAjgEADQAxGYEEEjEYEERCBwQ2GgFJIlkkCEsBFRJEVwIANhoCSRUlEkQXJwdLAmcnCE8CZyhMZyNDMRYjCUcCOBAjEkQ2GgFJTgMVgSASRDgHMgoSQAAEJwmwAEk4CCEEMgEIEkAABCcJsACxOAAhBBZQJLI1I7I0gAQLgQFDskKA0wQLIAQAASAIJgQFb3duZXILb3B0aW5fY291bnQLRVJSOmVyck5vd24LRVJSOmVycklwYXmABCFSFeA2GgCOAQA0MRkURDEYQQAdggMEPqEYMgSt+SrkBEQgD702GgCOAwCPARkBMwCABITKryo2GgCOAQANADEZgQUSMRgQREIAJDYaAUkVJBJENhoCSRWBKBJEKE8CZykiZ4AGZnVuZGVyTGcjQzYaAUkVJBJEMQAyCRJAAA+AC0VSUjplcnJNYmZmsAAiKGVEEkAAAyqwACIpZURBAA+AC0VSUjplcnJOZW10sACxIihlRLIJI7IQIrIBsyNDMRYjCUk4ECMSRDYaAUkVJRJEFzEAIihlRBJAAAMqsABLATgHMgoSQAADK7AATDgIMhASQAADK7AAMgpLAXAARQFBAA+AC0VSUjplcnJBb3B0sABJcQpEMgMSQAAPgAtFUlI6ZXJyQ2x3YbAAsTIKTLIRIrISshSBBLIQIrIBsyIpZUQjCClMZyNDNhoBSRUkEkQxACIoZUQSQAADKrAAKExnI0M2GgFHAiJZSU4CgRALgQIITBUSRDEAIihlRBJAAAMqsAAiSUsCDEEAkEsCVwIASwGBEAuBEFhJTgIiW0lOA0EAXzIKSwNwAEAAD4ALRVJSOmVycklhc3SwAE8CJVtJTwISQQAlIillRCMJKUxnsSIoZURJshWyFLISTLIRgQSyECKyAbMjCEL/mbEiKGVEshSyEkyyEYEEshAisgGzQv/kTwJIsUwlWyIoZUSyB7III7IQIrIBs0L/yyNDskAishmABITKryqyGkyyGrIagQayECKyAbO3AD2xSXIIRDIBsgiyByOyECKyAbMWJwRMULAjQyKAADYaAUkVJRJEF0kyCnMATE4CRDIKcwFMTgJEcgdEMgoSQAAPgAtFUlI6ZXJyTmFwYrAATwJJgAZmdW5kZXJlSElXACBFBoEgW04DsTEAgQWyGUyyGIAEIVIV4LIashqBBrIQIrIBszIKSU4CcwBMSU8CREsEDUEAPU8DCU8CcwFMSU8CREsDDEEAJE8CTAkISUsCDUxOAk1JRQJBAA+xSbIISwGyByOyECKyAbMjQ0hFASJC/9lITwJIIkL/viEEMgEIFicETFCwI0M2GgFJIlkkCEsBFRJEVwIANhoCSRUlEkQXIihlRCllSElAACRIMQAyCRJAAAMrsAAnCE8CZyq9RQFAAAYqTLlII0MqTNNC//gxAExyCEQSQv/YNhoBSRUlEkQXSTYaAkkiWSQISwEVEkRXAgBMgfAPCjEWTAkjCUlOAzgQgQYSQQBfSwI4GDIIEkEAVUsCOBuBAxJBAEtLAjgZQABESwI5GgAnBhJBADlLAjgAMQASQQAvI0AAD4ALRVJSOmVyckljb3KwACq9RQFAAA+AC0VSUjplcnJDbnN0sAAqTgK7I0MiQv/OMQAiKGVEKWVIcghEEkAAAyuwACq8SCNDMRYjCUcCOBAjEkQ2GgFJFSUSRBdJTgMiJwVlTElOAk4FRCIoZUUBRCRbcghETHAASU4CTgNIFEw4BzIKEkAAD4ALRVJSOmVycklwbXKwAE8COAgyECNPAwgLEkAAD4ALRVJSOmVycklwbWGwALEyCksDshEishKyFIEEshAisgGzQAFVRwIiWUsBFVJXAgCAABNBAUQiKGVESSllSExJJwplSElXCAhOAiVbTgMiJwVlTElOAkUHREkiWUsBFVJJTgJXAgBMKWVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWYEpCyQITBUSRFcGKSJbSUAAD4ALRVJSOmVyck5lc2OwAEsGJFtJTwISQAAPgAtFUlI6ZXJyV2VzY7AAsU8ESbIYgARa3zOPshpPBLIaTwKyGk8CshqACgABAAAAAAAAAACyGoACAACyGoEGshAisgEiKGVFAURMSXIIREsFSU4DcABFARQyEAu2THIIRLIHsggjshAisgG2SwEWTBaAAgABTFBPA7IYgARoNeO8shpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAbMjQzYaAUkVJRJEFyIoZUUBRCInBWVEJFtyCERMcABFARQyECNPAggLFicETFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEKWVIcghEEkAAAyuwACcFTGcjQzYaAUkiWSQISwEVEkRXAgAxACIoZUQpZUhyCEQSQAADK7AAIihlRCcKZUiBEFsyDRJAAA+AC0VSUjplcnJJdXBnsAAnB0xnI0M2GgFJFSUSRBcxACIoZUQpZUhyCEQSQAADK7AAKExnI0M=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var PrizeBoxFactoryParamsFactory = class _PrizeBoxFactoryParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64)void":
            return _PrizeBoxFactoryParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the PrizeBoxFactory smart contract using the create(string,uint64)void ABI method
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
            return _PrizeBoxFactoryParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the PrizeBoxFactory smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the mint(pay,address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mint(params) {
    return {
      ...params,
      method: "mint(pay,address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.owner]
    };
  }
  /**
     * Constructs a no op call for the deletePrizeBox(uint64)void ABI method
     *
    * Delete an empty prize box (caller must be its owner). The box account closes to the owner;
    the creation MBR this factory releases is refunded to the recorded minter.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static deletePrizeBox(params) {
    return {
      ...params,
      method: "deletePrizeBox(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.appId]
    };
  }
  /**
   * Constructs a no op call for the mintCost()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mintCost(params) {
    return {
      ...params,
      method: "mintCost()uint64",
      args: Array.isArray(params.args) ? params.args : []
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
};
var PrizeBoxFactoryFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `PrizeBoxFactoryFactory`
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
    return new PrizeBoxFactoryClient(this.appFactory.getAppClientById(params));
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
    return new PrizeBoxFactoryClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the PrizeBoxFactory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? PrizeBoxFactoryParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? PrizeBoxFactoryParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new PrizeBoxFactoryClient(result.appClient) };
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
       * Creates a new instance of the PrizeBoxFactory smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(PrizeBoxFactoryParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the PrizeBoxFactory smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(PrizeBoxFactoryParamsFactory.update.update(params));
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
       * Creates a new instance of the PrizeBoxFactory smart contract using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(PrizeBoxFactoryParamsFactory.create.create(params));
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
       * Creates a new instance of the PrizeBoxFactory smart contract using an ABI method call using the create(string,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(PrizeBoxFactoryParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new PrizeBoxFactoryClient(result.appClient) };
      }
    }
  }}
}, _class3);
var PrizeBoxFactoryClient = (_class4 = class _PrizeBoxFactoryClient {
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
   * Returns a new `PrizeBoxFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _PrizeBoxFactoryClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `PrizeBoxFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _PrizeBoxFactoryClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
       * Updates an existing instance of the PrizeBoxFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(PrizeBoxFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the PrizeBoxFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `mint(pay,address)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mint: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.mint(params));
    },
    /**
         * Makes a call to the PrizeBoxFactory smart contract using the `deletePrizeBox(uint64)void` ABI method.
         *
        * Delete an empty prize box (caller must be its owner). The box account closes to the owner;
        the creation MBR this factory releases is refunded to the recorded minter.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    deletePrizeBox: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.deletePrizeBox(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `mintCost()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mintCost: (params = { args: [] }) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.mintCost(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initBoxedContract: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    loadBoxedContract: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the PrizeBoxFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(PrizeBoxFactoryParamsFactory.opUp(params));
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
       * Updates an existing instance of the PrizeBoxFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(PrizeBoxFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the PrizeBoxFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `mint(pay,address)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mint: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.mint(params));
    },
    /**
         * Makes a call to the PrizeBoxFactory smart contract using the `deletePrizeBox(uint64)void` ABI method.
         *
        * Delete an empty prize box (caller must be its owner). The box account closes to the owner;
        the creation MBR this factory releases is refunded to the recorded minter.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    deletePrizeBox: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.deletePrizeBox(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `mintCost()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mintCost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.mintCost(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initBoxedContract: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    loadBoxedContract: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the PrizeBoxFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(PrizeBoxFactoryParamsFactory.opUp(params));
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
       * Updates an existing instance of the PrizeBoxFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(PrizeBoxFactoryParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the PrizeBoxFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `mint(pay,address)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mint: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.mint(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the PrizeBoxFactory smart contract using the `deletePrizeBox(uint64)void` ABI method.
         *
        * Delete an empty prize box (caller must be its owner). The box account closes to the owner;
        the creation MBR this factory releases is refunded to the recorded minter.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    deletePrizeBox: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.deletePrizeBox(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `mintCost()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mintCost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.mintCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initBoxedContract: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.initBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    loadBoxedContract: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.loadBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteBoxedContract: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.deleteBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the PrizeBoxFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the PrizeBoxFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.opUp(params));
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
    return new _PrizeBoxFactoryClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the PrizeBoxFactory smart contract using the `mintCost()uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mintCost(params = { args: [] }) {
    const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.mintCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the PrizeBoxFactory smart contract using the `optInCost(uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(PrizeBoxFactoryParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Methods to access state for the current PrizeBoxFactory app
   */
  __init14() {this.state = {
    /**
     * Methods to access global state for the current PrizeBoxFactory app
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
     * Methods to access box state for the current PrizeBoxFactory app
     */
    box: {
      /**
       * Get all current keyed values from box state
       */
      getAll: async () => {
        const result = await this.appClient.state.box.getAll();
        return {
          boxedContract: new BinaryStateValue(result.boxedContract)
        };
      },
      /**
       * Get the current value of the boxedContract key in box state
       */
      boxedContract: async () => {
        return new BinaryStateValue(await this.appClient.state.box.getValue("boxedContract"));
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
       * Add a mint(pay,address)uint64 method call against the PrizeBoxFactory contract
       */
      mint(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mint(params)));
        resultMappers.push((v) => client.decodeReturnValue("mint(pay,address)uint64", v));
        return this;
      },
      /**
       * Add a deletePrizeBox(uint64)void method call against the PrizeBoxFactory contract
       */
      deletePrizeBox(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deletePrizeBox(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mintCost()uint64 method call against the PrizeBoxFactory contract
       */
      mintCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mintCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("mintCost()uint64", v));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the PrizeBoxFactory contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the PrizeBoxFactory contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the PrizeBoxFactory contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the PrizeBoxFactory contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the PrizeBoxFactory contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("optInCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the PrizeBoxFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the PrizeBoxFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the PrizeBoxFactory contract
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
       * Add a clear state call to the PrizeBoxFactory contract
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

// src/prize-box/errors.ts
var PRIZE_BOX_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
  // --- PrizeBox ownership / lifecycle -------------------------------------
  NOWN: "Only the owner can perform this action",
  NEMT: "Cannot delete application with prizes"
});
var translatePrizeBoxError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, PRIZE_BOX_ERROR_MESSAGES);

// src/prize-box/index.ts
var PrizeBoxSDK = class extends _chunk7UO6FJCTjs.BaseSDK {
  /** The PrizeBoxFactory that created this box (set by PrizeBoxFactorySDK.get / mint). */
  
  constructor(params) {
    super({ factory: PrizeBoxFactory, ...params });
    this.factoryAppId = params.factoryAppId;
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the prize box.
   */
  async state() {
    var _a;
    const state = await this.client.state.global.getAll();
    return {
      owner: _nullishCoalesce(((_a = state.owner) == null ? void 0 : _a.toString()), () => ( "")),
      optinCount: _nullishCoalesce(state.optinCount, () => ( 0n))
    };
  }
  /**
   * Gets the owner of the prize box.
   */
  async owner() {
    const prizeBoxState = await this.state();
    return prizeBoxState.owner;
  }
  // ========== Write Methods ==========
  /**
   * Opts the prize box into an asset.
   * Can only be called by the owner.
   */
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, 1e5),
      // Asset opt-in MBR
      receiver: this.client.appAddress
    });
    await this.client.send.optin({
      ...sendParams,
      args: {
        payment,
        asset
      }
    });
  }
  /**
   * Transfers ownership of the prize box to a new owner.
   * Can only be called by the current owner.
   */
  async transfer({ sender, signer, newOwner }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.client.send.transfer({
      ...sendParams,
      args: { newOwner }
    });
  }
  /**
   * Withdraws assets from the prize box.
   * Can only be called by the owner.
   */
  async withdraw({ sender, signer, assets }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const assetsTuple = assets.map((a) => [BigInt(a.asset), BigInt(a.amount)]);
    await this.client.send.withdraw({
      ...sendParams,
      args: { assets: assetsTuple }
    });
  }
  /**
   * Deletes the prize box. Can only be called by the owner when the box is empty
   * (optinCount === 0). The box account (min balance) closes to the owner and the
   * creation MBR is refunded to the minter.
   *
   * Current boxes are deleted through `PrizeBoxFactory.deletePrizeBox`; legacy boxes
   * (minted before funder tracking, no `funder` state) still use their own
   * owner-callable `deleteApplication()`.
   */
  async delete(params) {
    const sendParams = this.getSendParams(params);
    const state = await this.client.state.global.getAll();
    if (state.funder === void 0) {
      await this.client.algorand.send.appDeleteMethodCall({
        ...sendParams,
        sender: sendParams.sender,
        appId: this.client.appId,
        method: _algosdk2.default.ABIMethod.fromSignature("deleteApplication()void"),
        args: []
      });
      return;
    }
    const factoryAppId = _nullishCoalesce((params == null ? void 0 : params.factoryAppId), () => ( this.factoryAppId));
    if (factoryAppId === void 0) {
      throw new Error("PrizeBoxSDK.delete: factoryAppId is required (use PrizeBoxFactorySDK.deletePrizeBox)");
    }
    const factory = new PrizeBoxFactorySDK({
      algorand: this.algorand,
      factoryParams: { appId: factoryAppId, defaultSender: sendParams.sender, defaultSigner: sendParams.signer }
    });
    await factory.deletePrizeBox({ ...sendParams, appId: this.client.appId });
  }
};
var PrizeBoxFactorySDK = class extends _chunk7UO6FJCTjs.BaseSDK {
  constructor(params) {
    super({ factory: PrizeBoxFactoryFactory, ...params }, _chunkLMKWWXS5js.ENV_VAR_NAMES.PRIZE_BOX_FACTORY_APP_ID);
  }
  /**
   * Creates a new prize box and returns a PrizeBoxSDK instance.
   * @returns PrizeBoxSDK for the newly created prize box
   */
  async mint({ sender, signer, owner }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = this.cost();
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    const { return: appId } = await this.client.send.mint({
      ...sendParams,
      args: {
        payment,
        owner
      }
    });
    if (appId === void 0) {
      throw new Error("Failed to create new prize box");
    }
    return new PrizeBoxSDK({
      algorand: this.algorand,
      factoryAppId: this.client.appId,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
  }
  /**
   * Deletes an empty prize box owned by `sender`: the box account closes to the owner and
   * the creation MBR is refunded to the minter.
   */
  async deletePrizeBox({ sender, signer, appId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.deletePrizeBox({
      ...sendParams,
      args: { appId }
    });
  }
  /**
   * Gets a PrizeBoxSDK instance for an existing prize box.
   * @param appId - The app ID of the prize box
   * @returns PrizeBoxSDK for the specified prize box
   */
  get({ appId }) {
    return new PrizeBoxSDK({
      algorand: this.algorand,
      factoryAppId: this.client.appId,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
  }
  /**
   * Gets the cost to create a new prize box.
   * Based on: MIN_PROGRAM_PAGES + (GLOBAL_STATE_KEY_UINT_COST * globalUints) + (GLOBAL_STATE_KEY_BYTES_COST * globalBytes) + Global.minBalance
   */
  cost() {
    return 328500n;
  }
};
async function newPrizeBox({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...mintParams
}) {
  const factory = new PrizeBoxFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.mint(mintParams);
}







exports.PRIZE_BOX_ERROR_MESSAGES = PRIZE_BOX_ERROR_MESSAGES; exports.translatePrizeBoxError = translatePrizeBoxError; exports.PrizeBoxSDK = PrizeBoxSDK; exports.PrizeBoxFactorySDK = PrizeBoxFactorySDK; exports.newPrizeBox = newPrizeBox;
//# sourceMappingURL=chunk-B5O6IAAX.js.map
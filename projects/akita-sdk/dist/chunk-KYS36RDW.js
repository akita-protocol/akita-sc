"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunk5DOZLI4Ejs = require('./chunk-5DOZLI4E.js');

// src/prize-box/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/PrizeBoxClient.ts


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "PrizeBox", "structs": {}, "methods": [{ "name": "create", "args": [{ "type": "address", "name": "owner" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "transfer", "args": [{ "type": "address", "name": "newOwner" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "(uint64,uint64)[]", "name": "assets" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "owner": { "keyType": "AVMString", "valueType": "address", "key": "b3duZXI=", "desc": "the owner of the box of prizes" }, "optinCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "b3B0aW5fY291bnQ=", "desc": "the current count of prizes opted in" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [137], "errorMessage": "Cannot delete application with prizes" }, { "pc": [310], "errorMessage": "Invalid asset" }, { "pc": [192], "errorMessage": "Invalid payment" }, { "pc": [100], "errorMessage": "OnCompletion must be DeleteApplication && can only call when not creating" }, { "pc": [43], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [131, 176, 238, 273], "errorMessage": "Only the owner can withdraw funds" }, { "pc": [126, 135, 174, 214, 236, 271, 324, 334, 365, 390], "errorMessage": "check GlobalState exists" }, { "pc": [294], "errorMessage": "index access is out of bounds" }, { "pc": [265], "errorMessage": "invalid number of bytes for (len+(uint64,uint64)[])" }, { "pc": [167], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [112, 230], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [159], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNAogICAgYnl0ZWNibG9jayAib3duZXIiICJvcHRpbl9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyMAogICAgLy8gZXhwb3J0IGNsYXNzIFByaXplQm94IGV4dGVuZHMgQ29udHJhY3QgewogICAgcHVzaGJ5dGVzIDB4MjQ4N2MzMmMgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVAMgoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjAKICAgIC8vIGV4cG9ydCBjbGFzcyBQcml6ZUJveCBleHRlbmRzIENvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEA5CiAgICBwdXNoYnl0ZXNzIDB4M2VhMTE4MzIgMHhhZGY5MmFlNCAweDQ0MjAwZmJkIC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiLCBtZXRob2QgIndpdGhkcmF3KCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBvcHRpbiB0cmFuc2ZlciB3aXRoZHJhdwogICAgZXJyCgptYWluX2NyZWF0ZV9Ob09wQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjAKICAgIC8vIGV4cG9ydCBjbGFzcyBQcml6ZUJveCBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweGNjNjk0ZWFhIC8vIG1ldGhvZCAiY3JlYXRlKGFkZHJlc3Mpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX2RlbGV0ZUFwcGxpY2F0aW9uX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBtdXN0IGJlIERlbGV0ZUFwcGxpY2F0aW9uICYmIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIGIgZGVsZXRlQXBwbGljYXRpb24KCgovLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OlByaXplQm94LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozMQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyNQogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozMwogICAgLy8gdGhpcy5vd25lci52YWx1ZSA9IG93bmVyCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBvcHRpbkNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU9wdGluQ291bnQgfSkKICAgIGJ5dGVjXzEgLy8gIm9wdGluX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyB0aGlzLm9wdGluQ291bnQudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozMQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OlByaXplQm94LmRlbGV0ZUFwcGxpY2F0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXBwbGljYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLm93bmVyLnZhbHVlLCBFUlJfTk9UX09XTkVSKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyNQogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozOQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMub3duZXIudmFsdWUsIEVSUl9OT1RfT1dORVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgb3duZXIgY2FuIHdpdGhkcmF3IGZ1bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGFzc2VydCh0aGlzLm9wdGluQ291bnQudmFsdWUgPT09IDAsIEVSUl9OT1RfRU1QVFkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBvcHRpbkNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU9wdGluQ291bnQgfSkKICAgIGJ5dGVjXzEgLy8gIm9wdGluX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBhc3NlcnQodGhpcy5vcHRpbkNvdW50LnZhbHVlID09PSAwLCBFUlJfTk9UX0VNUFRZKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIGFzc2VydCAvLyBDYW5ub3QgZGVsZXRlIGFwcGxpY2F0aW9uIHdpdGggcHJpemVzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NDEtNDMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiB0aGlzLm93bmVyLnZhbHVlIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NDEtNDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiB0aGlzLm93bmVyLnZhbHVlIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NDEtNDMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiB0aGlzLm93bmVyLnZhbHVlIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czozNwogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo6UHJpemVCb3gub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1MwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTQKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLm93bmVyLnZhbHVlLCBFUlJfTk9UX09XTkVSKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyNQogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1NAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMub3duZXIudmFsdWUsIEVSUl9OT1RfT1dORVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBvd25lciBjYW4gd2l0aGRyYXcgZnVuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo1NS02MgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjU4CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjU1LTYyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTkKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NTUtNjIKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo2NC03MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjY0LTY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjY0LTcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NzIKICAgIC8vIHRoaXMub3B0aW5Db3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBvcHRpbkNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU9wdGluQ291bnQgfSkKICAgIGJ5dGVjXzEgLy8gIm9wdGluX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjcyCiAgICAvLyB0aGlzLm9wdGluQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjcKICAgIC8vIG9wdGluQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3B0aW5Db3VudCB9KQogICAgYnl0ZWNfMSAvLyAib3B0aW5fY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NzIKICAgIC8vIHRoaXMub3B0aW5Db3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OlByaXplQm94LnRyYW5zZmVyW3JvdXRpbmddKCkgLT4gdm9pZDoKdHJhbnNmZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NzUKICAgIC8vIHRyYW5zZmVyKG5ld093bmVyOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLm93bmVyLnZhbHVlLCBFUlJfTk9UX09XTkVSKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyNQogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo3NgogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMub3duZXIudmFsdWUsIEVSUl9OT1RfT1dORVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBvd25lciBjYW4gd2l0aGRyYXcgZnVuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyNQogICAgLy8gb3duZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyIH0pCiAgICBieXRlY18wIC8vICJvd25lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo3NwogICAgLy8gdGhpcy5vd25lci52YWx1ZSA9IG5ld093bmVyCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB0cmFuc2ZlcihuZXdPd25lcjogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo6UHJpemVCb3gud2l0aGRyYXdbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhdzoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyB3aXRoZHJhdyhhc3NldHM6IEFzc2V0SW5mb1tdKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICAqCiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuKyh1aW50NjQsdWludDY0KVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5vd25lci52YWx1ZSwgRVJSX05PVF9PV05FUikKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjUKICAgIC8vIG93bmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lciB9KQogICAgYnl0ZWNfMCAvLyAib3duZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLm93bmVyLnZhbHVlLCBFUlJfTk9UX09XTkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgb3duZXIgY2FuIHdpdGhkcmF3IGZ1bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgp3aXRoZHJhd193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo4MwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgYnogd2l0aGRyYXdfYWZ0ZXJfd2hpbGVAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo4NAogICAgLy8gaWYgKGFzc2V0c1tpXS5hc3NldCAhPT0gMCkgewogICAgZGlnIDIKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCAxNiAvLyAxNgogICAgKgogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDYKICAgIGJ6IHdpdGhkcmF3X2Vsc2VfYm9keUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjg2CiAgICAvLyBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6ODUtODgKICAgIC8vIGNvbnN0IFthc3NldEhvbGRpbmcsIG9wdGVkSW5dID0gQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZSgKICAgIC8vICAgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0c1tpXS5hc3NldAogICAgLy8gKQogICAgZGlnIDUKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyBhc3NlcnQob3B0ZWRJbiwgRVJSX0lOVkFMSURfQVNTRVQpCiAgICBhc3NlcnQgLy8gSW52YWxpZCBhc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyBjb25zdCBjbG9zZU91dCA9IGFzc2V0SG9sZGluZyA9PT0gYXNzZXRzW2ldLmFtb3VudAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIGlmIChjbG9zZU91dCkgewogICAgYnogd2l0aGRyYXdfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5MwogICAgLy8gdGhpcy5vcHRpbkNvdW50LnZhbHVlIC09IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjcKICAgIC8vIG9wdGluQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3B0aW5Db3VudCB9KQogICAgYnl0ZWNfMSAvLyAib3B0aW5fY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTMKICAgIC8vIHRoaXMub3B0aW5Db3VudC52YWx1ZSAtPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoyNwogICAgLy8gb3B0aW5Db3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPcHRpbkNvdW50IH0pCiAgICBieXRlY18xIC8vICJvcHRpbl9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5MwogICAgLy8gdGhpcy5vcHRpbkNvdW50LnZhbHVlIC09IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTUtMTAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXS5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjI1CiAgICAvLyBvd25lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIgfSkKICAgIGJ5dGVjXzAgLy8gIm93bmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6OTUtMTAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXS5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czo5NS0xMDIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRzW2ldLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldHNbaV0uYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKICAgIGIgd2l0aGRyYXdfd2hpbGVfdG9wQDIKCndpdGhkcmF3X2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEwNC0xMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRzW2ldLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldHNbaV0uYW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjUKICAgIC8vIG93bmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lciB9KQogICAgYnl0ZWNfMCAvLyAib3duZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTA0LTEwOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldHNbaV0uYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0c1tpXS5hbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMDQtMTEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0c1tpXS5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm93bmVyLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMTIKCndpdGhkcmF3X2Vsc2VfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMTMtMTE4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFzc2V0c1tpXS5hbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gYW1vdW50OiBhc3NldHNbaV0uYW1vdW50LAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyByZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MjUKICAgIC8vIG93bmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lciB9KQogICAgYnl0ZWNfMCAvLyAib3duZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyByZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9jb250cmFjdC5hbGdvLnRzOjExMy0xMTcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogYXNzZXRzW2ldLmFtb3VudCwKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5vd25lci52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvY29udHJhY3QuYWxnby50czoxMTMtMTE4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGFzc2V0c1tpXS5hbW91bnQsCiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMub3duZXIudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxMgoKd2l0aGRyYXdfYWZ0ZXJfd2hpbGVAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIHdpdGhkcmF3KGFzc2V0czogQXNzZXRJbmZvW10pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4K", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAEAAEIBCYCBW93bmVyC29wdGluX2NvdW50gAQkh8MsNhoAjgEANDEZFEQxGEEAHYIDBD6hGDIErfkq5AREIA+9NhoAjgMASQCRAKcAgATMaU6qNhoAjgEADQAxGYEFEjEYEERCABE2GgFJFYEgEkQoTGcpImcjQzEAIihlRExLARJEIillRBREsbIJI7IQIrIBsyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAIihlRBJESwE4BzIKEk8COAgyEBIQRLEyCkyyESKyErIUJbIQIrIBsyIpZUQjCClMZyNDNhoBSRWBIBJEMQAiKGVEEkQoTGcjQ4AANhoBRwIiWUlOAoEQC4ECCEwVEkQxACIoZUQSRCJJSwIMQQB7SwJXAgBLAYEQC4EQWEkiW0lFBkEAUDIKSwVwAERMJFtJTgISQQAoIillRCMJKUxnsSIoZURJshWyFLISSwOyESWyECKyAbNJIwhFAUL/qrEiKGVEshSyEksDshElshAisgGzQv/hsSRbIihlRLIHsggjshAisgGzQv/MI0M=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var PrizeBoxParamsFactory = class _PrizeBoxParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(address)void":
            return _PrizeBoxParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the PrizeBox smart contract using the create(address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.owner]
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
            return _PrizeBoxParamsFactory.delete.deleteApplication(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the PrizeBox smart contract using the deleteApplication()void ABI method
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
       * Creates a new instance of the PrizeBox smart contract using the create(address)void ABI method.
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
       * Deletes an existing instance of the PrizeBox smart contract using the deleteApplication()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      deleteApplication: (params = { args: [] }) => {
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
       * Creates a new instance of the PrizeBox smart contract using the create(address)void ABI method.
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
       * Creates a new instance of the PrizeBox smart contract using an ABI method call using the create(address)void ABI method.
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
       * Deletes an existing instance of the PrizeBox smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      deleteApplication: (params = { args: [] }) => {
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
       * Deletes an existing instance of the PrizeBox smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      deleteApplication: (params = { args: [] }) => {
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
       * Deletes an existing instance of the PrizeBox smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      deleteApplication: async (params = { args: [] }) => {
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
          optinCount: result.optinCount
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
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');




var APP_SPEC2 = { "name": "PrizeBoxFactory", "structs": {}, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mint", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "owner" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow to use" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [968], "errorMessage": "Contract not set" }, { "pc": [1191], "errorMessage": "Invalid app upgrade" }, { "pc": [963], "errorMessage": "Invalid call order" }, { "pc": [326, 1055], "errorMessage": "Invalid payment" }, { "pc": [99], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [198], "errorMessage": "OnCompletion must be UpdateApplication && can only call when not creating" }, { "pc": [846, 866, 994, 1139, 1177, 1220], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [782, 864, 992, 1029, 1096, 1137, 1173, 1218], "errorMessage": "application exists" }, { "pc": [858, 986, 1022, 1026, 1089, 1093, 1131, 1166, 1212], "errorMessage": "check GlobalState exists" }, { "pc": [895], "errorMessage": "invalid number of bytes for (len+uint8[])" }, { "pc": [259, 816, 1157], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [270, 827, 880, 1017, 1084, 1124, 1205], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [305], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [296, 1009], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMSAwIDggMgogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmMiICJ3YWxsZXQiICJha2l0YV9lc2Nyb3ciIDB4YzUzYjMyY2MgInZlcnNpb24iICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAweDE1MWY3Yzc1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czoyMAogICAgLy8gZXhwb3J0IGNsYXNzIFByaXplQm94RmFjdG9yeSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDIKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6MjAKICAgIC8vIGV4cG9ydCBjbGFzcyBQcml6ZUJveEZhY3RvcnkgZXh0ZW5kcyBGYWN0b3J5Q29udHJhY3QgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBtdXN0IGJlIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE1CiAgICBwdXNoYnl0ZXMgMHgzZGVjYjE0MCAvLyBtZXRob2QgIm1pbnQocGF5LGFkZHJlc3MpdWludDY0IgogICAgYnl0ZWMgNCAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhkY2EyZDg2MiAweGQzNDZiMWE0IDB4Mzk0ZWFlYjIgMHgzM2Y3ODgwOCAweDFlYWQyMGE5IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3codWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWludCBpbml0Qm94ZWRDb250cmFjdCBsb2FkQm94ZWRDb250cmFjdCBkZWxldGVCb3hlZENvbnRyYWN0IG9wdEluIG9wdEluQ29zdCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMTMKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDMKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czoyMAogICAgLy8gZXhwb3J0IGNsYXNzIFByaXplQm94RmFjdG9yeSBleHRlbmRzIEZhY3RvcnlDb250cmFjdCB7CiAgICBwdXNoYnl0ZXMgMHhjZDlhZDY3ZSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBtdXN0IGJlIFVwZGF0ZUFwcGxpY2F0aW9uICYmIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiB1aW50NjQsIGVzY3JvdzogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKc3BsaXRPcHRJbkNvdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBlc2Nyb3c6IEFjY291bnQsIGFzc2V0OiBBc3NldCk6IHVpbnQ2NCB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIyCiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMSAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNAogICAgLy8gaWYgKCFlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDMKICAgIC8vIGNvbnN0IFtzcGxpdHNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNSZXZlbnVlU3BsaXRzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJyZXZlbnVlX3NwbGl0cyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzAgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMxCiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czo6UHJpemVCb3hGYWN0b3J5LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjI0CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDUgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czoyNgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgZGlnIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDYgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czoyNwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6MjgKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjI0CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjpQcml6ZUJveEZhY3RvcnkubWludFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm1pbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcHJpemUtYm94L2ZhY3RvcnkuYWxnby50czozMwogICAgLy8gbWludChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG93bmVyOiBBY2NvdW50KTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzAgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18wIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6MzctNDkKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogKAogICAgLy8gICAgICAgTUlOX1BST0dSQU1fUEFHRVMgKwogICAgLy8gICAgICAgKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcHJpemVCb3guZ2xvYmFsVWludHMpICsKICAgIC8vICAgICAgIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxCeXRlcykgKwogICAgLy8gICAgICAgR2xvYmFsLm1pbkJhbGFuY2UKICAgIC8vICAgICApLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjQwCiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6MzctNDkKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogKAogICAgLy8gICAgICAgTUlOX1BST0dSQU1fUEFHRVMgKwogICAgLy8gICAgICAgKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcHJpemVCb3guZ2xvYmFsVWludHMpICsKICAgIC8vICAgICAgIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxCeXRlcykgKwogICAgLy8gICAgICAgR2xvYmFsLm1pbkJhbGFuY2UKICAgIC8vICAgICApLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjQyLTQ0CiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHByaXplQm94Lmdsb2JhbEJ5dGVzKSArCiAgICBwdXNoaW50IDE3ODUwMCAvLyAxNzg1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjQ1CiAgICAvLyBHbG9iYWwubWluQmFsYW5jZQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjQyLTQ1CiAgICAvLyBNSU5fUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHByaXplQm94Lmdsb2JhbEJ5dGVzKSArCiAgICAvLyBHbG9iYWwubWluQmFsYW5jZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6MzctNDkKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogKAogICAgLy8gICAgICAgTUlOX1BST0dSQU1fUEFHRVMgKwogICAgLy8gICAgICAgKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcHJpemVCb3guZ2xvYmFsVWludHMpICsKICAgIC8vICAgICAgIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBwcml6ZUJveC5nbG9iYWxCeXRlcykgKwogICAgLy8gICAgICAgR2xvYmFsLm1pbkJhbGFuY2UKICAgIC8vICAgICApLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjUxLTU0CiAgICAvLyBjb25zdCBwcml6ZUJveEFwcCA9IHByaXplQm94LmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogW293bmVyXSwKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hieXRlcyAweGNjNjk0ZWFhIC8vIG1ldGhvZCAiY3JlYXRlKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6MzUKICAgIC8vIGNvbnN0IHByaXplQm94ID0gY29tcGlsZUFyYzQoUHJpemVCb3gpCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIGludGNfMCAvLyAxCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bVVpbnQKICAgIHB1c2hieXRlcyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHB1c2hieXRlcyBiYXNlNjQoQ3lBRUFBRUlCQ1lDQlc5M2JtVnlDMjl3ZEdsdVgyTnZkVzUwZ0FRa2g4TXNOaG9BamdFQU5ERVpGRVF4R0VFQUhZSURCRDZoR0RJRXJma3E1QVJFSUErOU5ob0FqZ01BU1FDUkFLY0FnQVRNYVU2cU5ob0FqZ0VBRFFBeEdZRUZFakVZRUVSQ0FCRTJHZ0ZKRllFZ0VrUW9UR2NwSW1jalF6RUFJaWhsUkV4TEFSSkVJaWxsUkJSRXNiSUpJN0lRSXJJQnN5TkRNUllqQ1VrNEVDTVNSRFlhQVVrVkpCSkVGekVBSWlobFJCSkVTd0U0QnpJS0VrOENPQWd5RUJJUVJMRXlDa3l5RVNLeUVySVVKYklRSXJJQnN5SXBaVVFqQ0NsTVp5TkROaG9CU1JXQklCSkVNUUFpS0dWRUVrUW9UR2NqUTRBQU5ob0JSd0lpV1VsT0FvRVFDNEVDQ0V3VkVrUXhBQ0lvWlVRU1JDSkpTd0lNUVFCN1N3SlhBZ0JMQVlFUUM0RVFXRWtpVzBsRkJrRUFVRElLU3dWd0FFUk1KRnRKVGdJU1FRQW9JaWxsUkNNSktVeG5zU0lvWlVSSnNoV3lGTElTU3dPeUVTV3lFQ0t5QWJOSkl3aEZBVUwvcXJFaUtHVkVzaFN5RWtzRHNoRWxzaEFpc2dHelF2L2hzU1JiSWlobFJMSUhzZ2dqc2hBaXNnR3pRdi9NSTBNPSkKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjUxLTU0CiAgICAvLyBjb25zdCBwcml6ZUJveEFwcCA9IHByaXplQm94LmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogW293bmVyXSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjUxLTU2CiAgICAvLyBjb25zdCBwcml6ZUJveEFwcCA9IHByaXplQm94LmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogW293bmVyXSwKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjU4LTYzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcHJpemVCb3hBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjYwCiAgICAvLyByZWNlaXZlcjogcHJpemVCb3hBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NjEKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjU4LTYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcHJpemVCb3hBcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3ByaXplLWJveC9mYWN0b3J5LmFsZ28udHM6NTgtNjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwcml6ZUJveEFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9wcml6ZS1ib3gvZmFjdG9yeS5hbGdvLnRzOjMzCiAgICAvLyBtaW50KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgb3duZXI6IEFjY291bnQpOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA2IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDMKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ0CiAgICAvLyBpZiAoIXRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NgogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmNyZWF0ZSh7IHNpemUgfSkKICAgIHN3YXAKICAgIGJveF9jcmVhdGUKICAgIHBvcAoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDIKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgppbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18xIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ5CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVzaXplKHNpemUpCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICBiIGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QubG9hZEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsb2FkQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18xIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbit1aW50OFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU0CiAgICAvLyBjb25zdCBleHBlY3RlZFByZXZpb3VzQ2FsbHM6IHVpbnQ2NCA9IG9mZnNldCAvIDIwMzIKICAgIHB1c2hpbnQgMjAzMiAvLyAyMDMyCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18wIC8vIDEKICAgIC0KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTcKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIDYKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU4CiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgZHVwCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU5CiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgZHVwCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMgLy8gMwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU5CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYwCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGR1cAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny02MAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MQogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBkdXAKICAgIGludGNfMSAvLyAwCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgNCAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny02MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGR1cAogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMCAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ni02MwogICAgLy8gYXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBFUlJfSU5WQUxJRF9DQUxMX09SREVSKQogICAgYXNzZXJ0IC8vIEludmFsaWQgY2FsbCBvcmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY0CiAgICAvLyBhc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBDb250cmFjdCBub3Qgc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjUKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIGRpZyAzCiAgICBkaWcgMwogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAODoKICAgIGludGNfMSAvLyAwCiAgICBiIGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuZGVsZXRlQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMSAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MAogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY4CiAgICAvLyBkZWxldGVCb3hlZENvbnRyYWN0KCk6IHZvaWQgewogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTAKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18wIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMCAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzEgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUyCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU0LTE2MQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTcKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTQtMTYxCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgdW5jb3ZlciAzCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18wIC8vIDEKICAgIHVuY292ZXIgNAogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU0LTE2MQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMtMTY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTY1CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTY2CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2My0xNjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2My0xNjkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTc0CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18xIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTc0CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3NAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzUKICAgIC8vIHJldHVybiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzAgLy8gMQogICAgdW5jb3ZlciAyCiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdC51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3JvdyhhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18xIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzOAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM5CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gYXBwCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3JvdyhhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMSAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgcHVzaGJ5dGVzICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MgogICAgLy8gYXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGFzc2VydCAvLyBJbnZhbGlkIGFwcCB1cGdyYWRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNSAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUzCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18xIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAEAQAIAiYICWFraXRhX2RhbwJiYwZ3YWxsZXQMYWtpdGFfZXNjcm93BMU7MswHdmVyc2lvbhZjaGlsZF9jb250cmFjdF92ZXJzaW9uBBUffHWABOqRgN02GgCOAQBeMRkURDEYQQBHgAQ97LFAJwSCBwTcothiBNNGsaQEOU6usgQz94gIBB6tIKkEM+kslASFTe3gNhoAjgkAcgJ3ArwDKAM7A4gDsAQBAAEAIkOABM2a1n42GgCOAQA6ADEZgQQSMRgQREIDr4oDASOL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VII1kiCIwAiwBMiTYaAUkjWSUISwEVEkRXAgA2GgJJFSQSRBcnBUsCZycGTwJnKExnIkMxFiIJSTgQIhJENhoBSRWBIBJESwE4BzIKEk8COAiBxPIKMgEIEhBEsYAEzGlOqrIashoisjUisjSABAuBAUOyQoCXAwsgBAABCAQmAgVvd25lcgtvcHRpbl9jb3VudIAEJIfDLDYaAI4BADQxGRREMRhBAB2CAwQ+oRgyBK35KuQERCAPvTYaAI4DAEkAkQCnAIAEzGlOqjYaAI4BAA0AMRmBBRIxGBBEQgARNhoBSRWBIBJEKExnKSJnI0MxACIoZURMSwESRCIpZUQURLGyCSOyECKyAbMjQzEWIwlJOBAjEkQ2GgFJFSQSRBcxACIoZUQSREsBOAcyChJPAjgIMhASEESxMgpMshEishKyFCWyECKyAbMiKWVEIwgpTGcjQzYaAUkVgSASRDEAIihlRBJEKExnI0OAADYaAUcCIllJTgKBEAuBAghMFRJEMQAiKGVEEkQiSUsCDEEAe0sCVwIASwGBEAuBEFhJIltJRQZBAFAyCksFcABETCRbSU4CEkEAKCIpZUQjCSlMZ7EiKGVESbIVshSyEksDshElshAisgGzSSMIRQFC/6qxIihlRLIUshJLA7IRJbIQIrIBs0L/4bEkWyIoZUSyB7III7IQIrIBs0L/zCNDskAjshmBBrIQI7IBs7cAPbFJcghEMgGyCLIHIrIQI7IBsxYnB0xQsCJDNhoBSSNZJQhLARUSRFcCADYaAkkVJBJEF0wnBkxnKb1FAUAADDEAMgkSRClMuUgiQzEAIyhlRCplSHIIRBJEKUzTQv/qNhoBSRUkEkQXSTYaAkkjWSUISwEVEkRXAgBMgfAPCjEWTAkiCUk4EIEGEkEAOkk4GDIIEkEAMUk4G4EDEkEAKEk4GUAAIkkjwhonBBJBABhJOAAxABJBAA8iRCm9RQFEKUsDSwO7IkMjQv/uMQAjKGVEKmVIcghEEkQpvEgiQzEWIglJOBAiEkQ2GgFJFSQSRBcjKGVEIytlRHIIREsCiPy/SwI4BzIKEk8DOAgyECJPBAgLEhBEsTIKTLIRI7ISshSBBLIQI7IBsyJDNhoBSRUkEkQXIyhlRCMrZURyCERPAoj8fDIQIk8CCAsWJwdMULAiQzYaAUkVJBJEFzEAIyhlRCplSHIIRBJEK0xnIkM2GgFJI1klCEsBFRJEVwIAMQAjKGVESSplSHIIRE8CEkSAA3BhbGVIgRBbMg0SRCcFTGciQzYaAUkVJBJEFzEAIyhlRCplSHIIRBJEKExnIkM=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * optin tells the contract to opt into an asa
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
   * Constructs a no op call for the updateAkitaDAOEscrow(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDaoEscrow(params) {
    return {
      ...params,
      method: "updateAkitaDAOEscrow(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.app]
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the PrizeBoxFactory smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
       * Add a updateAkitaDAOEscrow(uint64)void method call against the PrizeBoxFactory contract
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

// src/prize-box/index.ts
var PrizeBoxSDK = class extends _chunk5DOZLI4Ejs.BaseSDK {
  constructor(params) {
    super({ factory: PrizeBoxFactory, ...params });
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
   * Deletes the prize box and returns MBR to owner.
   * Can only be called when the box is empty (optinCount === 0).
   */
  async delete(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.delete.deleteApplication({
      ...sendParams,
      args: {}
    });
  }
};
var PrizeBoxFactorySDK = class extends _chunk5DOZLI4Ejs.BaseSDK {
  constructor(params) {
    super({ factory: PrizeBoxFactoryFactory, ...params });
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
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
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
    return 278500n;
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





exports.PrizeBoxSDK = PrizeBoxSDK; exports.PrizeBoxFactorySDK = PrizeBoxFactorySDK; exports.newPrizeBox = newPrizeBox;
//# sourceMappingURL=chunk-KYS36RDW.js.map
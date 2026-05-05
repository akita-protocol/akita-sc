"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkOPF2XL3Kjs = require('./chunk-OPF2XL3K.js');


var _chunkVMMDQU5Ujs = require('./chunk-VMMDQU5U.js');

// src/escrow/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/EscrowClient.ts
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Escrow", "structs": {}, "methods": [{ "name": "create", "args": [{ "type": "byte[]", "name": "creator" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "rekey", "args": [{ "type": "address", "name": "rekeyTo" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delete", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "creator": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "Y3JlYXRvcg==" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [125], "errorMessage": "ERR:OCCR" }, { "pc": [166], "errorMessage": "ERR:OFCD" }, { "pc": [72], "errorMessage": "invalid array length header" }, { "pc": [80], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [105], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6NgogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3JvdyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDI0Mzc4ZDNjIC8vIG1ldGhvZCAiZGVsZXRlKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVfcm91dGVAMgoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6NgogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3JvdyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BANwogICAgcHVzaGJ5dGVzIDB4NjVhOTdiY2MgLy8gbWV0aG9kICJyZWtleShhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCByZWtleQogICAgZXJyCgptYWluX2NyZWF0ZV9Ob09wQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6NgogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3JvdyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDhlNzkzNThkIC8vIG1ldGhvZCAiY3JlYXRlKGJ5dGVbXSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fZGVsZXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MjcKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGV0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czo6RXNjcm93LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18xIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjgKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWxTdGF0ZTxieXRlcz4oeyBrZXk6IEVzY3Jvd0dsb2JhbFN0YXRlS2V5c0NyZWF0b3IgfSkKICAgIHB1c2hieXRlcyAiY3JlYXRvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxMgogICAgLy8gdGhpcy5jcmVhdG9yLnZhbHVlID0gY3JlYXRvcgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6OkVzY3Jvdy5yZWtleVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJla2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjE1CiAgICAvLyByZWtleShyZWtleVRvOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MTYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9PTkxZX0NSRUFUT1JfQ0FOX1JFS0VZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IHJla2V5X2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpPQ0NSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk9DQ1IKCnJla2V5X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjE4LTI0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IDAsCiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHJla2V5VG8KICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MjEKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBSZWtleVRvCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MjAKICAgIC8vIGFtb3VudDogMCwKICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjE4LTIzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IDAsCiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIHJla2V5VG8KICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxOC0yNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiAwLAogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICByZWtleVRvCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxNQogICAgLy8gcmVrZXkocmVrZXlUbzogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czo6RXNjcm93LmRlbGV0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX09OTFlfRkFDVE9SWV9DQU5fREVMRVRFKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6T0ZDRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpPRkNECgpkZWxldGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MzEtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MzIKICAgIC8vIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjMxLTMyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MzEtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyACAQCABCQ3jTw2GgCOAQAlMRkURDEYQQAOgARlqXvMNhoAjgEAOQCABI55NY02GgCOAQANADEZgQUSMRgQREIAUDYaAUkjWYECCEsBFRJEVwIAgAdjcmVhdG9yTGciQzYaAUkVgSASRDEAMgkSQAAMgAhFUlI6T0NDUrAAsTIKSwGyILIHI7IIIrIQI7IBsyJDMQAyCRJAAAyACEVSUjpPRkNEsACxMgmyCSKyECOyAbMiQw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var EscrowParamsFactory = class _EscrowParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(byte[])void":
            return _EscrowParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Escrow smart contract using the create(byte[])void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(byte[])void",
          args: Array.isArray(params.args) ? params.args : [params.args.creator]
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
          case "delete":
          case "delete()void":
            return _EscrowParamsFactory.delete.delete(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the Escrow smart contract using the delete()void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      delete(params) {
        return {
          ...params,
          method: "delete()void",
          args: Array.isArray(params.args) ? params.args : []
        };
      }
    };
  }
  /**
   * Constructs a no op call for the rekey(address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static rekey(params) {
    return {
      ...params,
      method: "rekey(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.rekeyTo]
    };
  }
};
var EscrowFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `EscrowFactory`
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
    return new EscrowClient(this.appFactory.getAppClientById(params));
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
    return new EscrowClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Escrow smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? EscrowParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      deleteParams: ((_b = params.deleteParams) == null ? void 0 : _b.method) ? EscrowParamsFactory.delete._resolveByMethod(params.deleteParams) : params.deleteParams ? params.deleteParams : void 0
    });
    return { result: result.result, appClient: new EscrowClient(result.appClient) };
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
       * Creates a new instance of the Escrow smart contract using the create(byte[])void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(EscrowParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployDelete methods
     */
    deployDelete: {
      /**
       * Deletes an existing instance of the Escrow smart contract using the delete()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      delete: (params = { args: [] }) => {
        return this.appFactory.params.deployDelete(EscrowParamsFactory.delete.delete(params));
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
       * Creates a new instance of the Escrow smart contract using the create(byte[])void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(EscrowParamsFactory.create.create(params));
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
       * Creates a new instance of the Escrow smart contract using an ABI method call using the create(byte[])void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(EscrowParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new EscrowClient(result.appClient) };
      }
    }
  }}
}, _class);
var EscrowClient = (_class2 = class _EscrowClient {
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
   * Returns a new `EscrowClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _EscrowClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `EscrowClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _EscrowClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Deletes an existing instance of the Escrow smart contract using the `delete()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      delete: (params = { args: [] }) => {
        return this.appClient.params.delete(EscrowParamsFactory.delete.delete(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Escrow smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Escrow smart contract using the `rekey(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    rekey: (params) => {
      return this.appClient.params.call(EscrowParamsFactory.rekey(params));
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
       * Deletes an existing instance of the Escrow smart contract using the `delete()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      delete: (params = { args: [] }) => {
        return this.appClient.createTransaction.delete(EscrowParamsFactory.delete.delete(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Escrow smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Escrow smart contract using the `rekey(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    rekey: (params) => {
      return this.appClient.createTransaction.call(EscrowParamsFactory.rekey(params));
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
       * Deletes an existing instance of the Escrow smart contract using the `delete()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      delete: async (params = { args: [] }) => {
        const result = await this.appClient.send.delete(EscrowParamsFactory.delete.delete(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Escrow smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Escrow smart contract using the `rekey(address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    rekey: async (params) => {
      const result = await this.appClient.send.call(EscrowParamsFactory.rekey(params));
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
    return new _EscrowClient(this.appClient.clone(params));
  }
  /**
   * Methods to access state for the current Escrow app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current Escrow app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          creator: new BinaryStateValue(result.creator)
        };
      },
      /**
       * Get the current value of the creator key in global state
       */
      creator: async () => {
        return new BinaryStateValue(await this.appClient.state.global.getValue("creator"));
      }
    }
  }}
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a rekey(address)void method call against the Escrow contract
       */
      rekey(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.rekey(params)));
        return this;
      },
      get delete() {
        return {
          delete: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.delete(params)));
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the Escrow contract
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

// src/generated/EscrowFactoryClient.ts


var APP_SPEC2 = { "name": "EscrowFactory", "structs": {}, "methods": [{ "name": "new", "args": [{ "type": "pay", "name": "payment" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "register", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delete", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "registerCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "exists", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "get", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGet", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getList", "args": [{ "type": "address[]", "name": "addresses" }], "returns": { "type": "byte[][]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetList", "args": [{ "type": "address[]", "name": "addresses" }], "returns": { "type": "byte[][]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "walletIDsByAccounts": { "keyType": "AVMBytes", "valueType": "AVMBytes", "prefix": "" } } } }, "bareActions": { "create": ["NoOp"], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [891, 1076, 1107, 1179, 1285], "errorMessage": "Box must have value" }, { "pc": [781], "errorMessage": "ERR:EREG" }, { "pc": [916, 998], "errorMessage": "ERR:FORB" }, { "pc": [709], "errorMessage": "ERR:IAPP" }, { "pc": [753], "errorMessage": "ERR:ICRE" }, { "pc": [318, 334, 794, 816], "errorMessage": "ERR:IPAY" }, { "pc": [1101, 1278], "errorMessage": "ERR:NACT" }, { "pc": [884], "errorMessage": "ERR:NREG" }, { "pc": [679], "errorMessage": "ERR:OAPP" }, { "pc": [279], "errorMessage": "Length must be 16" }, { "pc": [573, 687, 713, 757, 862], "errorMessage": "application exists" }, { "pc": [1160, 1262], "errorMessage": "index access is out of bounds" }, { "pc": [1129, 1231], "errorMessage": "invalid array length header" }, { "pc": [1140, 1242], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [1018, 1046, 1088], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [661, 854], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [292, 652], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMSAwIDIgMzIgMTUwMDAwCiAgICBieXRlY2Jsb2NrIDB4MTUxZjdjNzUgIkVSUjpJUEFZIiAiIiAweDAwMDAgIkVSUjpGT1JCIiAiRVJSOk5BQ1QiCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoyNQogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3Jvd0ZhY3RvcnkgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogbWFpbl9fX2FsZ290c19fLmRlZmF1bHRDcmVhdGVAMTcKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydAogICAgcHVzaGJ5dGVzcyAweGQ4NWNmMTg0IDB4NjA3ZTcwNDYgMHg4YTM5ZTc5ZiAweDliNjdmYTZkIDB4M2M3NTQxMjAgMHg0YzlmYjY1NiAweDNjMWE2ZjMzIDB4MmI1NjAyYTMgMHgxM2RjNTA4YSAweDQ3NWQzNzczIC8vIG1ldGhvZCAibmV3KHBheSl1aW50NjQiLCBtZXRob2QgInJlZ2lzdGVyKHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGVsZXRlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjb3N0KCl1aW50NjQiLCBtZXRob2QgInJlZ2lzdGVyQ29zdCgpdWludDY0IiwgbWV0aG9kICJleGlzdHMoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iLCBtZXRob2QgIm11c3RHZXQoYWRkcmVzcylieXRlW10iLCBtZXRob2QgImdldExpc3QoYWRkcmVzc1tdKWJ5dGVbXVtdIiwgbWV0aG9kICJtdXN0R2V0TGlzdChhZGRyZXNzW10pYnl0ZVtdW10iCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBuZXcgcmVnaXN0ZXIgZGVsZXRlIGNvc3QgbWFpbl9yZWdpc3RlckNvc3Rfcm91dGVAOCBleGlzdHMgZ2V0IG11c3RHZXQgZ2V0TGlzdCBtdXN0R2V0TGlzdAogICAgZXJyCgptYWluX3JlZ2lzdGVyQ29zdF9yb3V0ZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTQ0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwMmY0NAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgptYWluX19fYWxnb3RzX18uZGVmYXVsdENyZWF0ZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjI1CiAgICAvLyBleHBvcnQgY2xhc3MgRXNjcm93RmFjdG9yeSBleHRlbmRzIENvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICAmJgogICAgcmV0dXJuCgoKLy8gX3B1eWFfbGliLmFyYzQuZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZChhcnJheTogYnl0ZXMsIG5ld19pdGVtc19ieXRlczogYnl0ZXMsIG5ld19pdGVtc19jb3VudDogdWludDY0KSAtPiBieXRlczoKZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZDoKICAgIHByb3RvIDMgMQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMiAvLyAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzIgLy8gMgogICAgKgogICAgYnplcm8KICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgZHVwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgc3dhcAogICAgaW50Y18yIC8vIDIKICAgICoKICAgIGR1cAogICAgaW50Y18xIC8vIDAKCmR5bmFtaWNfYXJyYXlfY29uY2F0X2J5dGVfbGVuZ3RoX2hlYWRfZm9yX2hlYWRlckA0OgogICAgZnJhbWVfZGlnIDQKICAgIGZyYW1lX2RpZyAyCiAgICA8CiAgICBieiBkeW5hbWljX2FycmF5X2NvbmNhdF9ieXRlX2xlbmd0aF9oZWFkX2FmdGVyX2ZvckA3CiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2RpZyA0CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgcmVwbGFjZTMKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBkaWcgMQogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMiAvLyAyCiAgICArCiAgICArCiAgICBmcmFtZV9idXJ5IDMKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBmcmFtZV9idXJ5IDQKICAgIGIgZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZF9mb3JfaGVhZGVyQDQKCmR5bmFtaWNfYXJyYXlfY29uY2F0X2J5dGVfbGVuZ3RoX2hlYWRfYWZ0ZXJfZm9yQDc6CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIDAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6Ynl0ZXMxNihhY2M6IGJ5dGVzKSAtPiBieXRlczoKYnl0ZXMxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjIxCiAgICAvLyBmdW5jdGlvbiBieXRlczE2KGFjYzogQWNjb3VudCk6IGJ5dGVzPDE2PiB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjIyCiAgICAvLyByZXR1cm4gYWNjLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KQogICAgZnJhbWVfZGlnIC0xCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjpFc2Nyb3dGYWN0b3J5Lm5ld1tyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ldzoKICAgIGludGNfMSAvLyAwCiAgICBieXRlY18yIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo0MQogICAgLy8gbmV3KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18wIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMCAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjQyCiAgICAvLyBjb25zdCBub25BcHBDYWxsZXIgPSBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gMAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjM1CiAgICAvLyBjb25zdCBub25BcHBDYWxsZXIgPSBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czozNi0zOAogICAgLy8gcmV0dXJuIG5vbkFwcENhbGxlcgogICAgLy8gICA/IEJ5dGVzKGJ5dGVzMTYoVHhuLnNlbmRlcikpCiAgICAvLyAgIDogQnl0ZXMoaXRvYihHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCkpCiAgICBibnogbmV3X3Rlcm5hcnlfZmFsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjM3CiAgICAvLyA/IEJ5dGVzKGJ5dGVzMTYoVHhuLnNlbmRlcikpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJ1cnkgNAoKbmV3X3Rlcm5hcnlfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm5ld19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjUzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGNoaWxkQXBwTUJSICsgR2xvYmFsLm1pbkJhbGFuY2UsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBpbnRjIDQgLy8gMTUwMDAwCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgKwogICAgPT0KICAgIGJueiBuZXdfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm5ld19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjU1LTU5CiAgICAvLyBjb25zdCBuZXdFc2Nyb3cgPSBlc2Nyb3cuY2FsbC5jcmVhdGUoCiAgICAvLyAgIHsKICAgIC8vICAgICBhcmdzOiBbY3JlYXRvcl0sCiAgICAvLyAgIH0KICAgIC8vICkuaXR4bi5jcmVhdGVkQXBwCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gYXJnczogW2NyZWF0b3JdLAogICAgZGlnIDMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo0NQogICAgLy8gY29uc3QgZXNjcm93ID0gY29tcGlsZUFyYzQoRXNjcm93KTsKICAgIGludGNfMCAvLyAxCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGJ5dGVzIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgcHVzaGJ5dGVzIGJhc2U2NChDeUFDQVFDQUJDUTNqVHcyR2dDT0FRQWxNUmtVUkRFWVFRQU9nQVJscVh2TU5ob0FqZ0VBT1FDQUJJNTVOWTAyR2dDT0FRQU5BREVaZ1FVU01SZ1FSRUlBVURZYUFVa2pXWUVDQ0VzQkZSSkVWd0lBZ0FkamNtVmhkRzl5VEdjaVF6WWFBVWtWZ1NBU1JERUFNZ2tTUUFBTWdBaEZVbEk2VDBORFVyQUFzVElLU3dHeUlMSUhJN0lJSXJJUUk3SUJzeUpETVFBeUNSSkFBQXlBQ0VWU1VqcFBSa05Fc0FDeE1nbXlDU0t5RUNPeUFiTWlRdz09KQogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NTUtNTkKICAgIC8vIGNvbnN0IG5ld0VzY3JvdyA9IGVzY3Jvdy5jYWxsLmNyZWF0ZSgKICAgIC8vICAgewogICAgLy8gICAgIGFyZ3M6IFtjcmVhdG9yXSwKICAgIC8vICAgfQogICAgLy8gKS5pdHhuLmNyZWF0ZWRBcHAKICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgcHVzaGJ5dGVzIDB4OGU3OTM1OGQgLy8gbWV0aG9kICJjcmVhdGUoYnl0ZVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBnaXR4biAwIENyZWF0ZWRBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NjEtNjYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBuZXdFc2Nyb3cuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NjMKICAgIC8vIHJlY2VpdmVyOiBuZXdFc2Nyb3cuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjY0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjYxLTY1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogbmV3RXNjcm93LmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZQogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NjEtNjYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBuZXdFc2Nyb3cuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjY4LTczCiAgICAvLyBlc2Nyb3cuY2FsbC5yZWtleSh7CiAgICAvLyAgIGFwcElkOiBuZXdFc2Nyb3cuaWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBub25BcHBDYWxsZXIgPyBUeG4uc2VuZGVyIDogR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NzEKICAgIC8vIG5vbkFwcENhbGxlciA/IFR4bi5zZW5kZXIgOiBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICBkdXAKICAgIGJueiBuZXdfdGVybmFyeV9mYWxzZUA5CiAgICB0eG4gU2VuZGVyCgpuZXdfdGVybmFyeV9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjY4LTczCiAgICAvLyBlc2Nyb3cuY2FsbC5yZWtleSh7CiAgICAvLyAgIGFwcElkOiBuZXdFc2Nyb3cuaWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBub25BcHBDYWxsZXIgPyBUeG4uc2VuZGVyIDogR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gICBdCiAgICAvLyB9KQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkaWcgMwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDY1YTk3YmNjIC8vIG1ldGhvZCAicmVrZXkoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NDEKICAgIC8vIG5ldyhwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKbmV3X3Rlcm5hcnlfZmFsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjcxCiAgICAvLyBub25BcHBDYWxsZXIgPyBUeG4uc2VuZGVyIDogR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgYiBuZXdfdGVybmFyeV9tZXJnZUAxMAoKbmV3X3Rlcm5hcnlfZmFsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czozOAogICAgLy8gOiBCeXRlcyhpdG9iKEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkKSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBpdG9iCiAgICBidXJ5IDQKICAgIGIgbmV3X3Rlcm5hcnlfbWVyZ2VAMTQKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5yZWdpc3Rlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlZ2lzdGVyOgogICAgaW50Y18xIC8vIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NzgKICAgIC8vIHJlZ2lzdGVyKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXBwOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzAgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18wIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjgwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIEVSUl9PTkxZX0FQUFMpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IHJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpPQVBQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk9BUFAKCnJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6ODMKICAgIC8vIGxvZ2dlZEFzc2VydChhcHAgPT09IDAgfHwgQXBwbGljYXRpb24oYXBwKS5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfQVBQKQogICAgZHVwCiAgICBieiByZWdpc3Rlcl9ib29sX3RydWVANQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJ6IHJlZ2lzdGVyX2Jvb2xfZmFsc2VANgoKcmVnaXN0ZXJfYm9vbF90cnVlQDU6CiAgICBpbnRjXzAgLy8gMQoKcmVnaXN0ZXJfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6ODMKICAgIC8vIGxvZ2dlZEFzc2VydChhcHAgPT09IDAgfHwgQXBwbGljYXRpb24oYXBwKS5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfQVBQKQogICAgYm56IHJlZ2lzdGVyX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjpJQVBQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBUFAKCnJlZ2lzdGVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6ODYKICAgIC8vIGlmIChBcHBsaWNhdGlvbihhcHApLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzKSB7CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYnogcmVnaXN0ZXJfZWxzZV9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo4NwogICAgLy8gY3JlYXRvciA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcCwgQnl0ZXMoRXNjcm93R2xvYmFsU3RhdGVLZXlzQ3JlYXRvcikpWzBdCiAgICBkdXAKICAgIHB1c2hieXRlcyAiY3JlYXRvciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ0b2koY3JlYXRvcikgPT09IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLCBFUlJfSU5WQUxJRF9DUkVBVE9SKQogICAgYnRvaQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogcmVnaXN0ZXJfYWZ0ZXJfaWZfZWxzZUAxNAogICAgcHVzaGJ5dGVzICJFUlI6SUNSRSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQ1JFCgpyZWdpc3Rlcl9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OTQKICAgIC8vIGNvbnN0IGFwcEFkZHJlc3MgPSBieXRlczE2KEFwcGxpY2F0aW9uKGFwcCkuYWRkcmVzcykKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgY2FsbHN1YiBieXRlczE2CiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OTUKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGFwcEFkZHJlc3MpLmV4aXN0cywgRVJSX0FMUkVBRFlfUkVHSVNURVJFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogcmVnaXN0ZXJfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBwdXNoYnl0ZXMgIkVSUjpFUkVHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVSRUcKCnJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjk3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWNfMSAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKcmVnaXN0ZXJfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OTgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5tYnIoY3JlYXRvci5sZW5ndGgpLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDMKICAgIGxlbgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MzEKICAgIC8vIHJldHVybiBNaW5XYWxsZXRJRHNCeUFjY291bnRzTWJyICsgKGxlbmd0aCAqIEJveENvc3RQZXJCeXRlKQogICAgcHVzaGludCA0MDAKICAgICoKICAgIHB1c2hpbnQgODkwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OTgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5tYnIoY3JlYXRvci5sZW5ndGgpLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgPT0KICAgIGJueiByZWdpc3Rlcl9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjXzEgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwMAogICAgLy8gdGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGFwcEFkZHJlc3MpLnZhbHVlID0gY3JlYXRvcgogICAgZGlnIDMKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBkaWcgMwogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NzgKICAgIC8vIHJlZ2lzdGVyKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXBwOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCnJlZ2lzdGVyX2Vsc2VfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjkwCiAgICAvLyBjcmVhdG9yID0gQnl0ZXMoaXRvYihHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgaXRvYgogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo5MQogICAgLy8gYXBwID0gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBidXJ5IDEKICAgIGIgcmVnaXN0ZXJfYWZ0ZXJfaWZfZWxzZUAxNAoKcmVnaXN0ZXJfYm9vbF9mYWxzZUA2OgogICAgaW50Y18xIC8vIDAKICAgIGIgcmVnaXN0ZXJfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkuZGVsZXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlOgogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMDMKICAgIC8vIGRlbGV0ZShpZDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMDQKICAgIC8vIGNvbnN0IGNhbGxlciA9IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTA1CiAgICAvLyBjb25zdCBrZXkgPSBieXRlczE2KEFwcGxpY2F0aW9uKGlkKS5hZGRyZXNzKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgY2FsbHN1YiBieXRlczE2CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhrZXkpLmV4aXN0cywgRVJSX0RPRVNOVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlbGV0ZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6TlJFRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUkVHCgpkZWxldGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMDgKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLndhbGxldElEc0J5QWNjb3VudHMoa2V5KS52YWx1ZQogICAgZHVwbiAyCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTA4LTEwOQogICAgLy8gY29uc3QgY3JlYXRvciA9IHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhrZXkpLnZhbHVlCiAgICAvLyBpZiAoY3JlYXRvci5sZW5ndGggPT09IDgpIHsKICAgIGJveF9sZW4KICAgIHBvcAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwOQogICAgLy8gaWYgKGNyZWF0b3IubGVuZ3RoID09PSA4KSB7CiAgICBwdXNoaW50IDgKICAgID09CiAgICBkdXAKICAgIGJ1cnkgNgogICAgYnogZGVsZXRlX2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMTAKICAgIC8vIGxvZ2dlZEFzc2VydChjYWxsZXIgPT09IGJ0b2koY3JlYXRvciksIEVSUl9GT1JCSURERU4pOwogICAgYnRvaQogICAgZGlnIDIKICAgID09CiAgICBibnogZGVsZXRlX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGJ5dGVjIDQgLy8gIkVSUjpGT1JCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZPUkIKCmRlbGV0ZV9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MzEKICAgIC8vIHJldHVybiBNaW5XYWxsZXRJRHNCeUFjY291bnRzTWJyICsgKGxlbmd0aCAqIEJveENvc3RQZXJCeXRlKQogICAgZGlnIDUKICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMTgtMTIwCiAgICAvLyBNaW5QYWdlcyArCiAgICAvLyBHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKwogICAgLy8gdGhpcy5tYnIoY3JlYXRvci5sZW5ndGgpCiAgICBwdXNoaW50IDE1ODkwMAogICAgKwogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMjMKICAgIC8vIHNwZW5kaW5nQWNjb3VudC5jYWxsLmRlbGV0ZSh7IGFwcElkOiBpZCB9KQogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA1CiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MjQzNzhkM2MgLy8gbWV0aG9kICJkZWxldGUoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEyNQogICAgLy8gdGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGtleSkuZGVsZXRlKCkKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMjctMTMyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvci5sZW5ndGggPT09IDggPyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzIDogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEyOQogICAgLy8gcmVjZWl2ZXI6IGNyZWF0b3IubGVuZ3RoID09PSA4ID8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcyA6IFR4bi5zZW5kZXIsCiAgICBkaWcgMwogICAgYnogZGVsZXRlX3Rlcm5hcnlfZmFsc2VAMTMKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKCmRlbGV0ZV90ZXJuYXJ5X21lcmdlQDE0OgogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMjctMTMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvci5sZW5ndGggPT09IDggPyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzIDogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTI3LTEzMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGNyZWF0b3IubGVuZ3RoID09PSA4ID8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcyA6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTAzCiAgICAvLyBkZWxldGUoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKZGVsZXRlX3Rlcm5hcnlfZmFsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMjkKICAgIC8vIHJlY2VpdmVyOiBjcmVhdG9yLmxlbmd0aCA9PT0gOCA/IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MgOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgYiBkZWxldGVfdGVybmFyeV9tZXJnZUAxNAoKZGVsZXRlX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTEyCiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMoYnl0ZXMxNihUeG4uc2VuZGVyKSkgPT09IGNyZWF0b3IsIEVSUl9GT1JCSURERU4pOwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBieXRlczE2CiAgICA9PQogICAgYm56IGRlbGV0ZV9hZnRlcl9pZl9lbHNlQDEwCiAgICBieXRlYyA0IC8vICJFUlI6Rk9SQiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGT1JCCgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkuY29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMzgtMTM5CiAgICAvLyBNaW5QYWdlcyArCiAgICAvLyBHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKwogICAgaW50YyA0IC8vIDE1MDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTQwCiAgICAvLyBHbG9iYWwubWluQmFsYW5jZQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEzOC0xNDAKICAgIC8vIE1pblBhZ2VzICsKICAgIC8vIEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCArCiAgICAvLyBHbG9iYWwubWluQmFsYW5jZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTM1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5leGlzdHNbcm91dGluZ10oKSAtPiB2b2lkOgpleGlzdHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNDkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNTEKICAgIC8vIHJldHVybiB0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkuZXhpc3RzCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTQ5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDAwCiAgICBpbnRjXzEgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5nZXRbcm91dGluZ10oKSAtPiB2b2lkOgpnZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNTQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNTYKICAgIC8vIGlmICghdGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGJ5dGVzMTYoYWRkcmVzcykpLmV4aXN0cykgewogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNTcKICAgIC8vIHJldHVybiBCeXRlcygnJykKICAgIGJ5dGVjXzIgLy8gIiIKCmdldF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjpFc2Nyb3dGYWN0b3J5LmdldEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTU0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgpnZXRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTU5CiAgICAvLyByZXR1cm4gdGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGJ5dGVzMTYoYWRkcmVzcykpLnZhbHVlCiAgICBkdXAKICAgIGNhbGxzdWIgYnl0ZXMxNgogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE1NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjpFc2Nyb3dGYWN0b3J5LmdldEA0CgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkubXVzdEdldFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNjIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkuZXhpc3RzLCBFUlJfQUNDT1VOVF9OT1RfRk9VTkQpCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUgLy8gIkVSUjpOQUNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BQ1QKCm11c3RHZXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNjUKICAgIC8vIHJldHVybiB0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkudmFsdWUKICAgIGR1cAogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTYyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkuZ2V0TGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldExpc3Q6CiAgICBpbnRjXzEgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTY4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18xIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YWNjb3VudD4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3MAogICAgLy8gY29uc3QgYXBwczogYnl0ZXNbXSA9IFtdCiAgICBieXRlY18zIC8vIDB4MDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTcxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzEgLy8gMAoKZ2V0TGlzdF93aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkrKykgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogZ2V0TGlzdF9hZnRlcl93aGlsZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNzIKICAgIC8vIGNvbnN0IGFkZHJlc3MgPSBhZGRyZXNzZXNbaV0KICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNzMKICAgIC8vIGlmICh0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkuZXhpc3RzKSB7CiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0TGlzdF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTc0CiAgICAvLyBhcHBzLnB1c2godGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGJ5dGVzMTYoYWRkcmVzcykpLnZhbHVlKQogICAgZGlnIDQKICAgIGNhbGxzdWIgYnl0ZXMxNgogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMgogICAgc3dhcAogICAgaW50Y18wIC8vIDEKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZAogICAgYnVyeSAyCgpnZXRMaXN0X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkrKykgewogICAgZHVwCiAgICBpbnRjXzAgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGdldExpc3Rfd2hpbGVfdG9wQDIKCmdldExpc3RfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNzYKICAgIC8vIGFwcHMucHVzaChCeXRlcygnJykpCiAgICBkaWcgMQogICAgYnl0ZWNfMyAvLyAweDAwMDAKICAgIGludGNfMCAvLyAxCiAgICBjYWxsc3ViIGR5bmFtaWNfYXJyYXlfY29uY2F0X2J5dGVfbGVuZ3RoX2hlYWQKICAgIGJ1cnkgMgogICAgYiBnZXRMaXN0X2FmdGVyX2lmX2Vsc2VANgoKZ2V0TGlzdF9hZnRlcl93aGlsZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTY4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgZGlnIDIKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkubXVzdEdldExpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0TGlzdDoKICAgIGludGNfMSAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxODIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhY2NvdW50PgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTg0CiAgICAvLyBjb25zdCBhcHBzOiBieXRlc1tdID0gW10KICAgIGJ5dGVjXzMgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxODUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMSAvLyAwCgptdXN0R2V0TGlzdF93aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE4NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkrKykgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogbXVzdEdldExpc3RfYWZ0ZXJfd2hpbGVANgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTg2CiAgICAvLyBjb25zdCBhZGRyZXNzID0gYWRkcmVzc2VzW2ldCiAgICBkaWcgMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTg3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGJ5dGVzMTYoYWRkcmVzcykpLmV4aXN0cywgRVJSX0FDQ09VTlRfTk9UX0ZPVU5EKQogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0TGlzdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNSAvLyAiRVJSOk5BQ1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkFDVAoKbXVzdEdldExpc3RfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxODgKICAgIC8vIGFwcHMucHVzaCh0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkudmFsdWUpCiAgICBkaWcgNAogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMQogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X2NvbmNhdF9ieXRlX2xlbmd0aF9oZWFkCiAgICBidXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE4NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkrKykgewogICAgZHVwCiAgICBpbnRjXzAgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIG11c3RHZXRMaXN0X3doaWxlX3RvcEAyCgptdXN0R2V0TGlzdF9hZnRlcl93aGlsZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTgyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgZGlnIDIKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAFAQACIPCTCSYGBBUffHUIRVJSOklQQVkAAgAACEVSUjpGT1JCCEVSUjpOQUNUMRtBAGYxGRREMRhEggoE2FzxhARgfnBGBIo5558Em2f6bQQ8dUEgBEyftlYEPBpvMwQrVgKjBBPcUIoER103czYaAI4KAJAB+ALCA14AAQNqA4UDrwPZBD8AgAwVH3x1AAAAAAAAL0SwIkMxGRQxGBQQQ4oDAYv9I1lJJAskCIv9JEsCUov/JAuvUIv9FYv9TwNPAlKL/lBQTIv/CEkWVwYATCQLSSOLBIsCDEEAI4sDSRZXBgCLAIsESU4ETwJdSYwASwFZJAgIjAMkCIwEQv/ViwGLAFCMAImKAQGL/1EAEEkVgRASRIkjKjEWIglJOBAiEkQyDUlAAU4xAIj/2kUESwE4BzIKEkAAAymwAEsBOAghBDIBCBJAAAMpsACxSwNJFRZXBgJMUCKyNYAEC4EBQ7JCgLUBCyACAQCABCQ3jTw2GgCOAQAlMRkURDEYQQAOgARlqXvMNhoAjgEAOQCABI55NY02GgCOAQANADEZgQUSMRgQREIAUDYaAUkjWYECCEsBFRJEVwIAgAdjcmVhdG9yTGciQzYaAUkVgSASRDEAMgkSQAAMgAhFUlI6T0NDUrAAsTIKSwGyILIHI7IIIrIQI7IBsyJDMQAyCRJAAAyACEVSUjpPRkNEsACxMgmyCSKyECOyAbMiQ7JAI7IZgASOeTWNshqyGoEGshAjsgGztwA9SUUEsXIIRDIBsgiyByKyECOyAbOxSUAAJDEAI7IZSwNJshiABGWpe8yyGkyyGoEGshAjsgGzFihMULAiQzIOQv/ZMg0WRQRC/rEjSTEWIglJOBAiEkQ2GgFJFYEIEkQXMg1AAAyACEVSUjpPQVBQsABJQQAKSXIHRDIKEkEAkSJAAAyACEVSUjpJQVBQsABJcgdEMgoSQQBrSYAHY3JlYXRvcmVISUUEFzINEkAADIAIRVJSOklDUkWwAElyCESI/hFJRQW9RQFBAAyACEVSUjpFUkVHsABLATgHMgoSQAADKbAASwE4CEsDFYGQAwuBxEUIEkAAAymwAEsDSbxISwO/IkMyDRZFAzINRQFC/6sjQv9sKkcCNhoBSRWBCBJEF0kyDUxyCESI/ahJvUUBQAAMgAhFUlI6TlJFR7AARwK+TE4CRL1ISUUIgQgSSUUGQQBQF0sCEkAABCcEsABLBYGQAwuBtNkJCEUFsYEFshlLArIYgAQkN408shqBBrIQI7IBs0m8SLFLA0EAETIOSwWyCLIHIrIQI7IBsyJDMQBC/+wxAIj9KxJA/7InBLAAIQQyAQgWKExQsCJDNhoBSRUlEkSI/Qy9RQGAAQAjTwJUKExQsCJDNhoBRwIVJRJEiPzwvUUBQAAPKkkVFlcGAkxQKExQsCJDSYj8175EQv/pNhoBRwIVJRJEiPzGvUUBQAAEJwWwAEmI/Li+REkVFlcGAkxQKExQsCJDIzYaAUcCI1lJTgIlCyQITBUSRCsjSUsDDEEAQ0sDVwIASwElCyVYSUUGiPx7vUUBQQAgSwSI/HC+REkVFlcGAkxQSwJMIoj7+EUCSSIIRQFC/8JLASsiiPvnRQJC/+woSwJQsCJDIzYaAUcCI1lJTgIlCyQITBUSRCsjSUsDDEEAO0sDVwIASwElCyVYSUUGiPwVvUUBQAAEJwWwAEsEiPwGvkRJFRZXBgJMUEsCTCKI+45FAkkiCEUBQv++KEsCULAiQw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var EscrowFactoryParamsFactory = class {
  /**
   * Constructs a no op call for the new(pay)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static new(params) {
    return {
      ...params,
      method: "new(pay)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment]
    };
  }
  /**
   * Constructs a no op call for the register(pay,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static register(params) {
    return {
      ...params,
      method: "register(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.app]
    };
  }
  /**
   * Constructs a no op call for the delete(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static delete(params) {
    return {
      ...params,
      method: "delete(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
   * Constructs a no op call for the cost()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static cost(params) {
    return {
      ...params,
      method: "cost()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the registerCost()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static registerCost(params) {
    return {
      ...params,
      method: "registerCost()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the exists(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static exists(params) {
    return {
      ...params,
      method: "exists(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the get(address)byte[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static get(params) {
    return {
      ...params,
      method: "get(address)byte[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the mustGet(address)byte[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGet(params) {
    return {
      ...params,
      method: "mustGet(address)byte[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getList(address[])byte[][] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getList(params) {
    return {
      ...params,
      method: "getList(address[])byte[][]",
      args: Array.isArray(params.args) ? params.args : [params.args.addresses]
    };
  }
  /**
   * Constructs a no op call for the mustGetList(address[])byte[][] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetList(params) {
    return {
      ...params,
      method: "mustGetList(address[])byte[][]",
      args: Array.isArray(params.args) ? params.args : [params.args.addresses]
    };
  }
};
var EscrowFactoryFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `EscrowFactoryFactory`
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
    return new EscrowFactoryClient(this.appFactory.getAppClientById(params));
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
    return new EscrowFactoryClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the EscrowFactory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    const result = await this.appFactory.deploy({
      ...params
    });
    return { result: result.result, appClient: new EscrowFactoryClient(result.appClient) };
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
       * Creates a new instance of the EscrowFactory smart contract using a bare call.
       *
       * @param params The params for the bare (raw) call
       * @returns The params for a create call
       */
      bare: (params) => {
        return this.appFactory.params.bare.create(params);
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
       * Creates a new instance of the EscrowFactory smart contract using a bare call.
       *
       * @param params The params for the bare (raw) call
       * @returns The transaction for a create call
       */
      bare: (params) => {
        return this.appFactory.createTransaction.bare.create(params);
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
       * Creates a new instance of the EscrowFactory smart contract using a bare call.
       *
       * @param params The params for the bare (raw) call
       * @returns The create result
       */
      bare: async (params) => {
        const result = await this.appFactory.send.bare.create(params);
        return { result: result.result, appClient: new EscrowFactoryClient(result.appClient) };
      }
    }
  }}
}, _class3);
var EscrowFactoryClient = (_class4 = class _EscrowFactoryClient {
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
   * Returns a new `EscrowFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _EscrowFactoryClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `EscrowFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _EscrowFactoryClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
     * Makes a clear_state call to an existing instance of the EscrowFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `new(pay)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    new: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.new(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `register(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    register: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.register(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `delete(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    delete: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.delete(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `cost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    cost: (params = { args: [] }) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.cost(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `registerCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    registerCost: (params = { args: [] }) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.registerCost(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `exists(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    exists: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.exists(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `get(address)byte[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    get: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.get(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `mustGet(address)byte[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGet: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.mustGet(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `getList(address[])byte[][]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getList: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.getList(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `mustGetList(address[])byte[][]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetList: (params) => {
      return this.appClient.params.call(EscrowFactoryParamsFactory.mustGetList(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init12() {this.createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the EscrowFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `new(pay)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    new: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.new(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `register(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    register: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.register(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `delete(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    delete: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.delete(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `cost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    cost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.cost(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `registerCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    registerCost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.registerCost(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `exists(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    exists: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.exists(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `get(address)byte[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    get: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.get(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `mustGet(address)byte[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGet: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.mustGet(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `getList(address[])byte[][]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getList: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.getList(params));
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `mustGetList(address[])byte[][]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetList: (params) => {
      return this.appClient.createTransaction.call(EscrowFactoryParamsFactory.mustGetList(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init13() {this.send = {
    /**
     * Makes a clear_state call to an existing instance of the EscrowFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `new(pay)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    new: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.new(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `register(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    register: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.register(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `delete(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    delete: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.delete(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `cost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    cost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.cost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `registerCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    registerCost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.registerCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `exists(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    exists: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.exists(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `get(address)byte[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    get: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.get(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `mustGet(address)byte[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGet: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.mustGet(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `getList(address[])byte[][]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getList: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.getList(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the EscrowFactory smart contract using the `mustGetList(address[])byte[][]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetList: async (params) => {
      const result = await this.appClient.send.call(EscrowFactoryParamsFactory.mustGetList(params));
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
    return new _EscrowFactoryClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `cost()uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async cost(params = { args: [] }) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.cost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `registerCost()uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async registerCost(params = { args: [] }) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.registerCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `exists(address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async exists(params) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.exists(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `get(address)byte[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async get(params) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.get(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `mustGet(address)byte[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGet(params) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.mustGet(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `getList(address[])byte[][]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getList(params) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.getList(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the EscrowFactory smart contract using the `mustGetList(address[])byte[][]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetList(params) {
    const result = await this.appClient.send.call(EscrowFactoryParamsFactory.mustGetList(params));
    return result.return;
  }
  /**
   * Methods to access state for the current EscrowFactory app
   */
  __init14() {this.state = {
    /**
     * Methods to access box state for the current EscrowFactory app
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
       * Get values from the walletIDsByAccounts map in box state
       */
      walletIDsByAccounts: {
        /**
         * Get all current values of the walletIDsByAccounts map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("walletIDsByAccounts");
        },
        /**
         * Get a current value of the walletIDsByAccounts map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("walletIDsByAccounts", key);
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
       * Add a new(pay)uint64 method call against the EscrowFactory contract
       */
      new(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.new(params)));
        return this;
      },
      /**
       * Add a register(pay,uint64)void method call against the EscrowFactory contract
       */
      register(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.register(params)));
        return this;
      },
      /**
       * Add a delete(uint64)void method call against the EscrowFactory contract
       */
      delete(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.delete(params)));
        return this;
      },
      /**
       * Add a cost()uint64 method call against the EscrowFactory contract
       */
      cost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cost(params)));
        return this;
      },
      /**
       * Add a registerCost()uint64 method call against the EscrowFactory contract
       */
      registerCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.registerCost(params)));
        return this;
      },
      /**
       * Add a exists(address)bool method call against the EscrowFactory contract
       */
      exists(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.exists(params)));
        return this;
      },
      /**
       * Add a get(address)byte[] method call against the EscrowFactory contract
       */
      get(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.get(params)));
        return this;
      },
      /**
       * Add a mustGet(address)byte[] method call against the EscrowFactory contract
       */
      mustGet(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGet(params)));
        return this;
      },
      /**
       * Add a getList(address[])byte[][] method call against the EscrowFactory contract
       */
      getList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getList(params)));
        return this;
      },
      /**
       * Add a mustGetList(address[])byte[][] method call against the EscrowFactory contract
       */
      mustGetList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetList(params)));
        return this;
      },
      /**
       * Add a clear state call to the EscrowFactory contract
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

// src/escrow/errors.ts
var ESCROW_ERROR_MESSAGES = {
  // --- Escrow lifecycle ---------------------------------------------------
  OCCR: "Only the creator can rekey a spend contract",
  OAPP: "Only applications can create spending accounts",
  OWOP: "Only the wallet or plugin can opt in",
  OFCD: "Only the factory can delete the application",
  // --- Registry -----------------------------------------------------------
  NREG: "Escrow is not registered",
  EREG: "Escrow is already registered",
  ICRE: "Invalid creator",
  NACT: "Account not found"
};
var translateEscrowError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, ESCROW_ERROR_MESSAGES);

// src/escrow/index.ts
var EscrowSDK = class extends _chunkOPF2XL3Kjs.BaseSDK {
  constructor(params) {
    super({ factory: EscrowFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the creator of the escrow.
   */
  async getCreator() {
    var _a;
    const state = await this.client.state.global.getAll();
    return _nullishCoalesce(((_a = state.creator) == null ? void 0 : _a.toString()), () => ( ""));
  }
  // ========== Write Methods ==========
  /**
   * Rekeys the escrow to a new account.
   * Can only be called by the factory (creator).
   */
  async rekey({ sender, signer, rekeyTo }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.rekey({
      ...sendParams,
      args: { rekeyTo }
    });
  }
};
var EscrowFactorySDK = class extends _chunkOPF2XL3Kjs.BaseSDK {
  constructor(params) {
    super({ factory: EscrowFactoryFactory, ...params }, _chunkVMMDQU5Ujs.ENV_VAR_NAMES.ESCROW_FACTORY_APP_ID);
  }
  // ========== Factory Methods ==========
  /**
   * Creates a new escrow and returns an EscrowSDK instance.
   * @returns EscrowSDK for the newly created escrow
   */
  async new(params) {
    const sendParams = this.getRequiredSendParams(params);
    const cost = await this.cost();
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    const { return: appId } = await this.client.send.new({
      ...sendParams,
      args: { payment }
    });
    if (appId === void 0) {
      throw new Error("Failed to create new escrow");
    }
    return new EscrowSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
  }
  /**
   * Gets an EscrowSDK instance for an existing escrow.
   * @param appId - The app ID of the escrow
   * @returns EscrowSDK for the specified escrow
   */
  get({ appId }) {
    return new EscrowSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
  }
  /**
   * Registers an escrow (or self) to enable lookup by address.
   */
  async register({ sender, signer, app }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = await this.registerCost();
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    await this.client.send.register({
      ...sendParams,
      args: {
        payment,
        app
      }
    });
  }
  /**
   * Deletes an escrow and refunds MBR.
   */
  async delete({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.delete({
      ...sendParams,
      args: { id }
    });
  }
  // ========== Read Methods ==========
  /**
   * Gets the cost to create a new escrow.
   */
  async cost() {
    return await this.client.cost();
  }
  /**
   * Gets the cost to register an escrow.
   */
  async registerCost() {
    return await this.client.registerCost();
  }
  /**
   * Checks if an escrow exists for an address.
   */
  async exists({ address }) {
    const exists = await this.client.exists({ args: { address } });
    return _nullishCoalesce(exists, () => ( false));
  }
  /**
   * Gets the creator bytes for an address.
   * Returns empty bytes if not found.
   */
  async getCreator({ address }) {
    const creator = await this.client.get({ args: { address } });
    return _nullishCoalesce(creator, () => ( new Uint8Array()));
  }
  /**
   * Gets creator bytes for multiple addresses.
   */
  async getList({ addresses }) {
    const creators = await this.client.getList({ args: { addresses } });
    return _nullishCoalesce(creators, () => ( []));
  }
};
async function newEscrow({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...escrowParams
}) {
  const factory = new EscrowFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.new(escrowParams);
}







exports.ESCROW_ERROR_MESSAGES = ESCROW_ERROR_MESSAGES; exports.translateEscrowError = translateEscrowError; exports.EscrowSDK = EscrowSDK; exports.EscrowFactorySDK = EscrowFactorySDK; exports.newEscrow = newEscrow;
//# sourceMappingURL=chunk-3QZUV2JW.js.map
import {
  makeErrorTranslator,
  withErrorCodeAliases
} from "./chunk-GOQ4H3PG.mjs";
import {
  BaseSDK
} from "./chunk-6RHOZH52.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-HZPGY6SV.mjs";

// src/escrow/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";

// src/generated/EscrowClient.ts
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Escrow", "structs": {}, "methods": [{ "name": "create", "args": [{ "type": "byte[]", "name": "creator" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "rekey", "args": [{ "type": "address", "name": "rekeyTo" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delete", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "creator": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "Y3JlYXRvcg==" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [128], "errorMessage": "ERR:errOccr" }, { "pc": [170], "errorMessage": "ERR:errOfcd" }, { "pc": [72], "errorMessage": "invalid array length header" }, { "pc": [80], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [105], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6NgogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3JvdyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDI0Mzc4ZDNjIC8vIG1ldGhvZCAiZGVsZXRlKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVfcm91dGVAMgoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6NgogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3JvdyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BANwogICAgcHVzaGJ5dGVzIDB4NjVhOTdiY2MgLy8gbWV0aG9kICJyZWtleShhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCByZWtleQogICAgZXJyCgptYWluX2NyZWF0ZV9Ob09wQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6NgogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3JvdyBleHRlbmRzIENvbnRyYWN0IHsKICAgIHB1c2hieXRlcyAweDhlNzkzNThkIC8vIG1ldGhvZCAiY3JlYXRlKGJ5dGVbXSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fZGVsZXRlX3JvdXRlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MjcKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGV0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czo6RXNjcm93LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18xIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjgKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWxTdGF0ZTxieXRlcz4oeyBrZXk6IEVzY3Jvd0dsb2JhbFN0YXRlS2V5c0NyZWF0b3IgfSkKICAgIHB1c2hieXRlcyAiY3JlYXRvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxMgogICAgLy8gdGhpcy5jcmVhdG9yLnZhbHVlID0gY3JlYXRvcgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6OkVzY3Jvdy5yZWtleVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJla2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjE1CiAgICAvLyByZWtleShyZWtleVRvOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MTYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck9ubHlDcmVhdG9yQ2FuUmVrZXkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogcmVrZXlfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyck9jY3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyT2NjcgoKcmVrZXlfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MTgtMjQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogMCwKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgcmVrZXlUbwogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoyMQogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgUmVrZXlUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjIwCiAgICAvLyBhbW91bnQ6IDAsCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvY29udHJhY3QuYWxnby50czoxOC0yMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgYW1vdW50OiAwLAogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICByZWtleVRvCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MTgtMjQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogMCwKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgcmVrZXlUbwogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MTUKICAgIC8vIHJla2V5KHJla2V5VG86IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6OkVzY3Jvdy5kZWxldGVbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck9ubHlGYWN0b3J5Q2FuRGVsZXRlKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyT2ZjZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJPZmNkCgpkZWxldGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MzEtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MzIKICAgIC8vIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjMxLTMyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2NvbnRyYWN0LmFsZ28udHM6MzEtMzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyACAQCABCQ3jTw2GgCOAQAlMRkURDEYQQAOgARlqXvMNhoAjgEAOQCABI55NY02GgCOAQANADEZgQUSMRgQREIAUTYaAUkjWYECCEsBFRJEVwIAgAdjcmVhdG9yTGciQzYaAUkVgSASRDEAMgkSQAAPgAtFUlI6ZXJyT2NjcrAAsTIKsgeyICOyCCKyECOyAbMiQzEAMgkSQAAPgAtFUlI6ZXJyT2ZjZLAAsTIJsgkishAjsgGzIkM=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue = class {
  constructor(value) {
    this.value = value;
  }
  value;
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
var EscrowFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `EscrowFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {
    this.appFactory = new _AppFactory({
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
  params = {
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
  };
};
var EscrowClient = class _EscrowClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  appClient;
  constructor(appClientOrParams) {
    this.appClient = appClientOrParams instanceof _AppClient ? appClientOrParams : new _AppClient({
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
    return new _EscrowClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `EscrowClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _EscrowClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
  params = {
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
  };
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  clone(params) {
    return new _EscrowClient(this.appClient.clone(params));
  }
  /**
   * Methods to access state for the current Escrow app
   */
  state = {
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
  };
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a rekey(address)void method call against the Escrow contract
       */
      rekey(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.rekey(params)));
        resultMappers.push(void 0);
        return this;
      },
      get delete() {
        return {
          delete: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.delete(params)));
            resultMappers.push(void 0);
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
};

// src/generated/EscrowFactoryClient.ts
import { getArc56ReturnValue } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient2
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory2 } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC2 = { "name": "EscrowFactory", "structs": {}, "methods": [{ "name": "new", "args": [{ "type": "pay", "name": "payment" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "register", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "delete", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "registerCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "exists", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "get", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGet", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "byte[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getList", "args": [{ "type": "address[]", "name": "addresses" }], "returns": { "type": "byte[][]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetList", "args": [{ "type": "address[]", "name": "addresses" }], "returns": { "type": "byte[][]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "walletIDsByAccounts": { "keyType": "AVMBytes", "valueType": "AVMBytes", "prefix": "" } } } }, "bareActions": { "create": ["NoOp"], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [979, 1194, 1224, 1291, 1387], "errorMessage": "Box must have value" }, { "pc": [869], "errorMessage": "ERR:errEreg" }, { "pc": [1002, 1116], "errorMessage": "ERR:errForb" }, { "pc": [790], "errorMessage": "ERR:errIapp" }, { "pc": [839], "errorMessage": "ERR:errIcre" }, { "pc": [882, 903], "errorMessage": "ERR:errIpay" }, { "pc": [411], "errorMessage": "ERR:errIpma" }, { "pc": [387], "errorMessage": "ERR:errIpmr" }, { "pc": [1219, 1382], "errorMessage": "ERR:errNact" }, { "pc": [337], "errorMessage": "ERR:errNcls" }, { "pc": [971], "errorMessage": "ERR:errNreg" }, { "pc": [362], "errorMessage": "ERR:errNrky" }, { "pc": [755], "errorMessage": "ERR:errOapp" }, { "pc": [277], "errorMessage": "Length must be 16" }, { "pc": [1011, 1047], "errorMessage": "account funded" }, { "pc": [650, 765, 795, 844, 944], "errorMessage": "application exists" }, { "pc": [1276, 1368], "errorMessage": "index access is out of bounds" }, { "pc": [1245, 1337], "errorMessage": "invalid array length header" }, { "pc": [1256, 1348], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [1136, 1164, 1206], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [733, 936], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [288, 724], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMSAwIDIgMzIgMTUwMDAwCiAgICBieXRlY2Jsb2NrIDB4MTUxZjdjNzUgMHgwMDAwICJFUlI6ZXJySXBheSIgIiIgIkVSUjplcnJGb3JiIiAiRVJSOmVyck5hY3QiCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoyNwogICAgLy8gZXhwb3J0IGNsYXNzIEVzY3Jvd0ZhY3RvcnkgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogbWFpbl9fX2FsZ290c19fLmRlZmF1bHRDcmVhdGVAMTcKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydAogICAgcHVzaGJ5dGVzcyAweGQ4NWNmMTg0IDB4NjA3ZTcwNDYgMHg4YTM5ZTc5ZiAweDliNjdmYTZkIDB4M2M3NTQxMjAgMHg0YzlmYjY1NiAweDNjMWE2ZjMzIDB4MmI1NjAyYTMgMHgxM2RjNTA4YSAweDQ3NWQzNzczIC8vIG1ldGhvZCAibmV3KHBheSl1aW50NjQiLCBtZXRob2QgInJlZ2lzdGVyKHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGVsZXRlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjb3N0KCl1aW50NjQiLCBtZXRob2QgInJlZ2lzdGVyQ29zdCgpdWludDY0IiwgbWV0aG9kICJleGlzdHMoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iLCBtZXRob2QgIm11c3RHZXQoYWRkcmVzcylieXRlW10iLCBtZXRob2QgImdldExpc3QoYWRkcmVzc1tdKWJ5dGVbXVtdIiwgbWV0aG9kICJtdXN0R2V0TGlzdChhZGRyZXNzW10pYnl0ZVtdW10iCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBuZXcgcmVnaXN0ZXIgZGVsZXRlIGNvc3QgbWFpbl9yZWdpc3RlckNvc3Rfcm91dGVAOCBleGlzdHMgZ2V0IG11c3RHZXQgZ2V0TGlzdCBtdXN0R2V0TGlzdAogICAgZXJyCgptYWluX3JlZ2lzdGVyQ29zdF9yb3V0ZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwMmY0NAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgptYWluX19fYWxnb3RzX18uZGVmYXVsdENyZWF0ZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjI3CiAgICAvLyBleHBvcnQgY2xhc3MgRXNjcm93RmFjdG9yeSBleHRlbmRzIENvbnRyYWN0IHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICAmJgogICAgcmV0dXJuCgoKLy8gX3B1eWFfbGliLmFyYzQuZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZChhcnJheTogYnl0ZXMsIG5ld19pdGVtc19ieXRlczogYnl0ZXMsIG5ld19pdGVtc19jb3VudDogdWludDY0KSAtPiBieXRlczoKZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZDoKICAgIHByb3RvIDMgMQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgaW50Y18yIC8vIDIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBmcmFtZV9kaWcgLTMKICAgIGludGNfMiAvLyAyCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzIgLy8gMgogICAgKgogICAgYnplcm8KICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHN1YnN0cmluZzMKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgZHVwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgc3dhcAogICAgaW50Y18yIC8vIDIKICAgICoKICAgIGR1cAogICAgaW50Y18xIC8vIDAKCmR5bmFtaWNfYXJyYXlfY29uY2F0X2J5dGVfbGVuZ3RoX2hlYWRfZm9yX2hlYWRlckA0OgogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZF9hZnRlcl9mb3JANwogICAgc3dhcAogICAgZHVwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgdW5jb3ZlciA1CiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICByZXBsYWNlMwogICAgZHVwCiAgICBjb3ZlciA1CiAgICBkaWcgMQogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMiAvLyAyCiAgICArCiAgICArCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gMgogICAgKwogICAgYiBkeW5hbWljX2FycmF5X2NvbmNhdF9ieXRlX2xlbmd0aF9oZWFkX2Zvcl9oZWFkZXJANAoKZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZF9hZnRlcl9mb3JANzoKICAgIHBvcG4gMwogICAgc3dhcAogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6Ynl0ZXMxNihhY2M6IGJ5dGVzKSAtPiBieXRlczoKYnl0ZXMxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjIzCiAgICAvLyBmdW5jdGlvbiBieXRlczE2KGFjYzogQWNjb3VudCk6IGJ5dGVzPDE2PiB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjI0CiAgICAvLyByZXR1cm4gYWNjLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KQogICAgZnJhbWVfZGlnIC0xCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjpFc2Nyb3dGYWN0b3J5Lm5ld1tyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ldzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjQzCiAgICAvLyBuZXcocGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzAgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18wIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NDQKICAgIC8vIGNvbnN0IG5vbkFwcENhbGxlciA9IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSAwCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MzcKICAgIC8vIGNvbnN0IG5vbkFwcENhbGxlciA9IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSAwCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MzgtNDAKICAgIC8vIHJldHVybiBub25BcHBDYWxsZXIKICAgIC8vICAgPyBCeXRlcyhieXRlczE2KFR4bi5zZW5kZXIpKQogICAgLy8gICA6IEJ5dGVzKGl0b2IoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQpKQogICAgYm56IG5ld190ZXJuYXJ5X2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjM5CiAgICAvLyA/IEJ5dGVzKGJ5dGVzMTYoVHhuLnNlbmRlcikpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGJ5dGVzMTYKCm5ld190ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NTUKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgY2hpbGRBcHBNQlIgKyBHbG9iYWwubWluQmFsYW5jZSkKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBjb3ZlciAzCiAgICBpbnRjIDQgLy8gMTUwMDAwCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgKwogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCm5ld19hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld19hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKbmV3X2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVjZWl2ZXIgPT09IHJlY2VpdmVyLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICB1bmNvdmVyIDUKICAgID09CiAgICBibnogbmV3X2FmdGVyX2Fzc2VydEAxOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpuZXdfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGJueiBuZXdfYWZ0ZXJfYXNzZXJ0QDIwCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm5ld19hZnRlcl9hc3NlcnRAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo1Ny02MQogICAgLy8gY29uc3QgbmV3RXNjcm93ID0gZXNjcm93LmNhbGwuY3JlYXRlKAogICAgLy8gICB7CiAgICAvLyAgICAgYXJnczogW2NyZWF0b3JdLAogICAgLy8gICB9CiAgICAvLyApLml0eG4uY3JlYXRlZEFwcAogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NTkKICAgIC8vIGFyZ3M6IFtjcmVhdG9yXSwKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo0NwogICAgLy8gY29uc3QgZXNjcm93ID0gY29tcGlsZUFyYzQoRXNjcm93KTsKICAgIGludGNfMCAvLyAxCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGJ5dGVzIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgcHVzaGJ5dGVzIGJhc2U2NChDeUFDQVFDQUJDUTNqVHcyR2dDT0FRQWxNUmtVUkRFWVFRQU9nQVJscVh2TU5ob0FqZ0VBT1FDQUJJNTVOWTAyR2dDT0FRQU5BREVaZ1FVU01SZ1FSRUlBVVRZYUFVa2pXWUVDQ0VzQkZSSkVWd0lBZ0FkamNtVmhkRzl5VEdjaVF6WWFBVWtWZ1NBU1JERUFNZ2tTUUFBUGdBdEZVbEk2WlhKeVQyTmpjckFBc1RJS3NnZXlJQ095Q0NLeUVDT3lBYk1pUXpFQU1na1NRQUFQZ0F0RlVsSTZaWEp5VDJaalpMQUFzVElKc2draXNoQWpzZ0d6SWtNPSkKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjU3LTYxCiAgICAvLyBjb25zdCBuZXdFc2Nyb3cgPSBlc2Nyb3cuY2FsbC5jcmVhdGUoCiAgICAvLyAgIHsKICAgIC8vICAgICBhcmdzOiBbY3JlYXRvcl0sCiAgICAvLyAgIH0KICAgIC8vICkuaXR4bi5jcmVhdGVkQXBwCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHB1c2hieXRlcyAweDhlNzkzNThkIC8vIG1ldGhvZCAiY3JlYXRlKGJ5dGVbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo2My02OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IG5ld0VzY3Jvdy5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo2NQogICAgLy8gcmVjZWl2ZXI6IG5ld0VzY3Jvdy5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NjYKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NjMtNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBuZXdFc2Nyb3cuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo2My02OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IG5ld0VzY3Jvdy5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NzAtNzUKICAgIC8vIGVzY3Jvdy5jYWxsLnJla2V5KHsKICAgIC8vICAgYXBwSWQ6IG5ld0VzY3Jvdy5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG5vbkFwcENhbGxlciA/IFR4bi5zZW5kZXIgOiBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo3MwogICAgLy8gbm9uQXBwQ2FsbGVyID8gVHhuLnNlbmRlciA6IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGJueiBuZXdfdGVybmFyeV9mYWxzZUA1CiAgICB0eG4gU2VuZGVyCgpuZXdfdGVybmFyeV9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6NzAtNzUKICAgIC8vIGVzY3Jvdy5jYWxsLnJla2V5KHsKICAgIC8vICAgYXBwSWQ6IG5ld0VzY3Jvdy5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIG5vbkFwcENhbGxlciA/IFR4bi5zZW5kZXIgOiBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHN3YXAKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2NWE5N2JjYyAvLyBtZXRob2QgInJla2V5KGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjQzCiAgICAvLyBuZXcocGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm5ld190ZXJuYXJ5X2ZhbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo3MwogICAgLy8gbm9uQXBwQ2FsbGVyID8gVHhuLnNlbmRlciA6IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGIgbmV3X3Rlcm5hcnlfbWVyZ2VANgoKbmV3X3Rlcm5hcnlfZmFsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjQwCiAgICAvLyA6IEJ5dGVzKGl0b2IoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQpKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGl0b2IKICAgIGIgbmV3X3Rlcm5hcnlfbWVyZ2VAMTAKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5yZWdpc3Rlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlZ2lzdGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIHJlZ2lzdGVyKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXBwOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzAgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18wIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjgyCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIGVyck9ubHlBcHBzKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGJueiByZWdpc3Rlcl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyT2FwcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJPYXBwCgpyZWdpc3Rlcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwID09PSAwIHx8IEFwcGxpY2F0aW9uKGFwcCkuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRBcHApCiAgICBkaWcgMQogICAgYnogcmVnaXN0ZXJfYm9vbF90cnVlQDUKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJ6IHJlZ2lzdGVyX2Jvb2xfZmFsc2VANgoKcmVnaXN0ZXJfYm9vbF90cnVlQDU6CiAgICBpbnRjXzAgLy8gMQoKcmVnaXN0ZXJfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChhcHAgPT09IDAgfHwgQXBwbGljYXRpb24oYXBwKS5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZEFwcCkKICAgIGJueiByZWdpc3Rlcl9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFwcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXBwCgpyZWdpc3Rlcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjg4CiAgICAvLyBpZiAoQXBwbGljYXRpb24oYXBwKS5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcykgewogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYnogcmVnaXN0ZXJfZWxzZV9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo4OQogICAgLy8gY3JlYXRvciA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcCwgQnl0ZXMoRXNjcm93R2xvYmFsU3RhdGVLZXlzQ3JlYXRvcikpWzBdCiAgICBkaWcgMQogICAgcHVzaGJ5dGVzICJjcmVhdG9yIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJ0b2koY3JlYXRvcikgPT09IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLCBlcnJJbnZhbGlkQ3JlYXRvcikKICAgIGJ0b2kKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHJlZ2lzdGVyX2FmdGVyX2lmX2Vsc2VAMTQKICAgIHB1c2hieXRlcyAiRVJSOmVyckljcmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWNyZQoKcmVnaXN0ZXJfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjk2CiAgICAvLyBjb25zdCBhcHBBZGRyZXNzID0gYnl0ZXMxNihBcHBsaWNhdGlvbihhcHApLmFkZHJlc3MpCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgY2FsbHN1YiBieXRlczE2CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjk3CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhhcHBBZGRyZXNzKS5leGlzdHMsIGVyckFscmVhZHlSZWdpc3RlcmVkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByZWdpc3Rlcl9hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOmVyckVyZWciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRXJlZwoKcmVnaXN0ZXJfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OTkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IHJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWNfMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKcmVnaXN0ZXJfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTAwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMubWJyKGNyZWF0b3IubGVuZ3RoKSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAyCiAgICBsZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjMzCiAgICAvLyByZXR1cm4gTWluV2FsbGV0SURzQnlBY2NvdW50c01iciArIChsZW5ndGggKiBCb3hDb3N0UGVyQnl0ZSkKICAgIHB1c2hpbnQgNDAwCiAgICAqCiAgICBwdXNoaW50IDg5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0aGlzLm1icihjcmVhdG9yLmxlbmd0aCksIGVyckludmFsaWRQYXltZW50KQogICAgPT0KICAgIGJueiByZWdpc3Rlcl9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjXzIgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCnJlZ2lzdGVyX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwMgogICAgLy8gdGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGFwcEFkZHJlc3MpLnZhbHVlID0gY3JlYXRvcgogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjgwCiAgICAvLyByZWdpc3RlcihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFwcDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgpyZWdpc3Rlcl9lbHNlX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo5MgogICAgLy8gY3JlYXRvciA9IEJ5dGVzKGl0b2IoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQpKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGl0b2IKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjkzCiAgICAvLyBhcHAgPSBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIGJ1cnkgMwogICAgYiByZWdpc3Rlcl9hZnRlcl9pZl9lbHNlQDE0CgpyZWdpc3Rlcl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzEgLy8gMAogICAgYiByZWdpc3Rlcl9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5kZWxldGVbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGU6CiAgICBieXRlY18zIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwNQogICAgLy8gZGVsZXRlKGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEwNgogICAgLy8gY29uc3QgY2FsbGVyID0gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMDcKICAgIC8vIGNvbnN0IGtleSA9IGJ5dGVzMTYoQXBwbGljYXRpb24oaWQpLmFkZHJlc3MpCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTA4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGtleSkuZXhpc3RzLCBlcnJEb2VzbnRFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlbGV0ZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnJlZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmVnCgpkZWxldGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMTAKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLndhbGxldElEc0J5QWNjb3VudHMoa2V5KS52YWx1ZQogICAgZGlnIDEKICAgIGR1cAogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjExMC0xMTEKICAgIC8vIGNvbnN0IGNyZWF0b3IgPSB0aGlzLndhbGxldElEc0J5QWNjb3VudHMoa2V5KS52YWx1ZQogICAgLy8gaWYgKGNyZWF0b3IubGVuZ3RoID09PSA4KSB7CiAgICBib3hfbGVuCiAgICBwb3AKICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMTEKICAgIC8vIGlmIChjcmVhdG9yLmxlbmd0aCA9PT0gOCkgewogICAgcHVzaGludCA4CiAgICA9PQogICAgZHVwCiAgICBidXJ5IDYKICAgIGJ6IGRlbGV0ZV9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTEyCiAgICAvLyBsb2dnZWRBc3NlcnQoY2FsbGVyID09PSBidG9pKGNyZWF0b3IpLCBlcnJGb3JiaWRkZW4pOwogICAgYnRvaQogICAgPT0KICAgIGJueiBkZWxldGVfYWZ0ZXJfaWZfZWxzZUAxMAogICAgYnl0ZWMgNCAvLyAiRVJSOmVyckZvcmIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRm9yYgoKZGVsZXRlX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMjIKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEyNAogICAgLy8gc3BlbmRpbmdBY2NvdW50LmNhbGwuZGVsZXRlKHsgYXBwSWQ6IGlkIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgyNDM3OGQzYyAvLyBtZXRob2QgImRlbGV0ZSgpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTI2CiAgICAvLyBjb25zdCBiYWxhbmNlQWZ0ZXI6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMjcKICAgIC8vIGNvbnN0IGNsb3NlZDogdWludDY0ID0gYmFsYW5jZUFmdGVyID4gYmFsYW5jZUJlZm9yZSA/IGJhbGFuY2VBZnRlciAtIGJhbGFuY2VCZWZvcmUgOiAwCiAgICA8CiAgICBieiBkZWxldGVfdGVybmFyeV9mYWxzZUAxMwogICAgc3dhcAogICAgLQoKZGVsZXRlX3Rlcm5hcnlfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czozMwogICAgLy8gcmV0dXJuIE1pbldhbGxldElEc0J5QWNjb3VudHNNYnIgKyAobGVuZ3RoICogQm94Q29zdFBlckJ5dGUpCiAgICBkaWcgNAogICAgcHVzaGludCA0MDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEzMC0xMzIKICAgIC8vIE1pblBhZ2VzICsKICAgIC8vIEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCArCiAgICAvLyB0aGlzLm1icihjcmVhdG9yLmxlbmd0aCkgKwogICAgcHVzaGludCAxNTg5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEzMC0xMzMKICAgIC8vIE1pblBhZ2VzICsKICAgIC8vIEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCArCiAgICAvLyB0aGlzLm1icihjcmVhdG9yLmxlbmd0aCkgKwogICAgLy8gY2xvc2VkCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMzYKICAgIC8vIHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhrZXkpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMzgtMTQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvci5sZW5ndGggPT09IDggPyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzIDogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE0MAogICAgLy8gcmVjZWl2ZXI6IGNyZWF0b3IubGVuZ3RoID09PSA4ID8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcyA6IFR4bi5zZW5kZXIsCiAgICBkaWcgMwogICAgYnogZGVsZXRlX3Rlcm5hcnlfZmFsc2VAMTYKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKCmRlbGV0ZV90ZXJuYXJ5X21lcmdlQDE3OgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjEzOC0xNDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBjcmVhdG9yLmxlbmd0aCA9PT0gOCA/IEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MgOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kQW1vdW50CiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18xIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMzgtMTQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogY3JlYXRvci5sZW5ndGggPT09IDggPyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzIDogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxMDUKICAgIC8vIGRlbGV0ZShpZDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgpkZWxldGVfdGVybmFyeV9mYWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE0MAogICAgLy8gcmVjZWl2ZXI6IGNyZWF0b3IubGVuZ3RoID09PSA4ID8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcyA6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBiIGRlbGV0ZV90ZXJuYXJ5X21lcmdlQDE3CgpkZWxldGVfdGVybmFyeV9mYWxzZUAxMzoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTI3CiAgICAvLyBjb25zdCBjbG9zZWQ6IHVpbnQ2NCA9IGJhbGFuY2VBZnRlciA+IGJhbGFuY2VCZWZvcmUgPyBiYWxhbmNlQWZ0ZXIgLSBiYWxhbmNlQmVmb3JlIDogMAogICAgaW50Y18xIC8vIDAKICAgIGIgZGVsZXRlX3Rlcm5hcnlfbWVyZ2VAMTQKCmRlbGV0ZV9lbHNlX2JvZHlANzoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTE0CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXMoYnl0ZXMxNihUeG4uc2VuZGVyKSkgPT09IGNyZWF0b3IsIGVyckZvcmJpZGRlbik7CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgID09CiAgICBibnogZGVsZXRlX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJGb3JiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZvcmIKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5jb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKY29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE0OS0xNTAKICAgIC8vIE1pblBhZ2VzICsKICAgIC8vIEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCArCiAgICBpbnRjIDQgLy8gMTUwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNTEKICAgIC8vIEdsb2JhbC5taW5CYWxhbmNlCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTQ5LTE1MQogICAgLy8gTWluUGFnZXMgKwogICAgLy8gR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICsKICAgIC8vIEdsb2JhbC5taW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNDYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjpFc2Nyb3dGYWN0b3J5LmV4aXN0c1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmV4aXN0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE2MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE2MgogICAgLy8gcmV0dXJuIHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhieXRlczE2KGFkZHJlc3MpKS5leGlzdHMKICAgIGNhbGxzdWIgYnl0ZXMxNgogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMSAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjpFc2Nyb3dGYWN0b3J5LmdldFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE2NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE2NwogICAgLy8gaWYgKCF0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkuZXhpc3RzKSB7CiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldF9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTY4CiAgICAvLyByZXR1cm4gQnl0ZXMoJycpCiAgICBieXRlY18zIC8vICIiCgpnZXRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5nZXRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE2NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKZ2V0X2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3MAogICAgLy8gcmV0dXJuIHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhieXRlczE2KGFkZHJlc3MpKS52YWx1ZQogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTY1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgZ2V0X2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkuZ2V0QDQKCgovLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czo6RXNjcm93RmFjdG9yeS5tdXN0R2V0W3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhieXRlczE2KGFkZHJlc3MpKS5leGlzdHMsIGVyckFjY291bnROb3RGb3VuZCkKICAgIGNhbGxzdWIgYnl0ZXMxNgogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOmVyck5hY3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFjdAoKbXVzdEdldF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3NgogICAgLy8gcmV0dXJuIHRoaXMud2FsbGV0SURzQnlBY2NvdW50cyhieXRlczE2KGFkZHJlc3MpKS52YWx1ZQogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTczCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkuZ2V0TGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldExpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxNzkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzEgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhY2NvdW50PgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTgxCiAgICAvLyBjb25zdCBhcHBzOiBieXRlc1tdID0gW10KICAgIGJ5dGVjXzEgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxODIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMSAvLyAwCgpnZXRMaXN0X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTgyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSsrKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBnZXRMaXN0X2FmdGVyX3doaWxlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE4MwogICAgLy8gY29uc3QgYWRkcmVzcyA9IGFkZHJlc3Nlc1tpXQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxODQKICAgIC8vIGlmICh0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkuZXhpc3RzKSB7CiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0TGlzdF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTg1CiAgICAvLyBhcHBzLnB1c2godGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGJ5dGVzMTYoYWRkcmVzcykpLnZhbHVlKQogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgaW50Y18wIC8vIDEKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9jb25jYXRfYnl0ZV9sZW5ndGhfaGVhZAogICAgc3dhcAoKZ2V0TGlzdF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxODIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMCAvLyAxCiAgICArCiAgICBiIGdldExpc3Rfd2hpbGVfdG9wQDIKCmdldExpc3RfZWxzZV9ib2R5QDU6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE4NwogICAgLy8gYXBwcy5wdXNoKEJ5dGVzKCcnKSkKICAgIHN3YXAKICAgIGJ5dGVjXzEgLy8gMHgwMDAwCiAgICBpbnRjXzAgLy8gMQogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X2NvbmNhdF9ieXRlX2xlbmd0aF9oZWFkCiAgICBzd2FwCiAgICBiIGdldExpc3RfYWZ0ZXJfaWZfZWxzZUA2CgpnZXRMaXN0X2FmdGVyX3doaWxlQDc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE3OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6OkVzY3Jvd0ZhY3RvcnkubXVzdEdldExpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0TGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE5MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGludGNfMSAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18yIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFjY291bnQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxOTUKICAgIC8vIGNvbnN0IGFwcHM6IGJ5dGVzW10gPSBbXQogICAgYnl0ZWNfMSAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9lc2Nyb3cvZmFjdG9yeS5hbGdvLnRzOjE5NgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkrKykgewogICAgaW50Y18xIC8vIDAKCm11c3RHZXRMaXN0X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTk2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSsrKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBtdXN0R2V0TGlzdF9hZnRlcl93aGlsZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxOTcKICAgIC8vIGNvbnN0IGFkZHJlc3MgPSBhZGRyZXNzZXNbaV0KICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGludGNfMyAvLyAzMgogICAgKgogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2VzY3Jvdy9mYWN0b3J5LmFsZ28udHM6MTk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53YWxsZXRJRHNCeUFjY291bnRzKGJ5dGVzMTYoYWRkcmVzcykpLmV4aXN0cywgZXJyQWNjb3VudE5vdEZvdW5kKQogICAgY2FsbHN1YiBieXRlczE2CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0TGlzdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNSAvLyAiRVJSOmVyck5hY3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFjdAoKbXVzdEdldExpc3RfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxOTkKICAgIC8vIGFwcHMucHVzaCh0aGlzLndhbGxldElEc0J5QWNjb3VudHMoYnl0ZXMxNihhZGRyZXNzKSkudmFsdWUpCiAgICBjYWxsc3ViIGJ5dGVzMTYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMQogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X2NvbmNhdF9ieXRlX2xlbmd0aF9oZWFkCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxOTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMCAvLyAxCiAgICArCiAgICBiIG11c3RHZXRMaXN0X3doaWxlX3RvcEAyCgptdXN0R2V0TGlzdF9hZnRlcl93aGlsZUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvZXNjcm93L2ZhY3RvcnkuYWxnby50czoxOTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAFAQACIPCTCSYGBBUffHUCAAALRVJSOmVycklwYXkAC0VSUjplcnJGb3JiC0VSUjplcnJOYWN0MRtBAGYxGRREMRhEggoE2FzxhARgfnBGBIo5558Em2f6bQQ8dUEgBEyftlYEPBpvMwQrVgKjBBPcUIoER103czYaAI4KAIUCOQMMA8sAAQPXA/IEHARFBKEAgAwVH3x1AAAAAAAAL0SwIkMxGRQxGBQQQ4oDAYv9I1lJJAskCIv9JEsCUov/JAuvUIv9FYv9TwNPAlKL/lBQTIv/CEkWVwYATCQLSSNJSwMMQQAcTEkWVwYATwVLA08CXUlOBUsBWSQICEwkCEL/3UYDTFCJigEBi/9RABBJFYEQEkSJMRYiCUk4ECISRDINTDINQAGcMQCI/9oyCk4DIQQyAQhOAksBOAkyAxJAAA+AC0VSUjplcnJOY2xzsABLATggMgMSQAAPgAtFUlI6ZXJyTnJrebAASwE4B08FEkAAD4ALRVJSOmVycklwbXKwAEw4CE8CEkAAD4ALRVJSOmVycklwbWGwALFJFRZXBgJMUCKyNYAEC4EBQ7JCgLkBCyACAQCABCQ3jTw2GgCOAQAlMRkURDEYQQAOgARlqXvMNhoAjgEAOQCABI55NY02GgCOAQANADEZgQUSMRgQREIAUTYaAUkjWYECCEsBFRJEVwIAgAdjcmVhdG9yTGciQzYaAUkVgSASRDEAMgkSQAAPgAtFUlI6ZXJyT2NjcrAAsTIKsgeyICOyCCKyECOyAbMiQzEAMgkSQAAPgAtFUlI6ZXJyT2ZjZLAAsTIJsgkishAjsgGzIkOyQCOyGYAEjnk1jbIashqBBrIQI7IBs7cAPUmxcghEMgGyCLIHIrIQI7IBs7FMQAAjMQAjshlMSbIYgARlqXvMshpMshqBBrIQI7IBsxYoTFCwIkMyDkL/2jINFkL+YzEWIglJOBAiEkQ2GgFJFYEIEkQXTDINQAAPgAtFUlI6ZXJyT2FwcLAASwFBAAtLAXIHRDIKEkEAliJAAA+AC0VSUjplcnJJYXBwsABLAXIHRDIKEkEAbUsBgAdjcmVhdG9yZUhJTgIXMg0SQAAPgAtFUlI6ZXJySWNyZbAASwJyCESI/bhJvUUBQQAPgAtFUlI6ZXJyRXJlZ7AASwE4BzIKEkAAAyqwAEw4CEsCFYGQAwuBxEUIEkAAAyqwAEm8SEy/IkMyDRZMMg1FA0L/riNC/2crSTYaAUkVgQgSRBdJMg1McghEiP1USU4CvUUBQAAPgAtFUlI6ZXJyTnJlZ7AASwFJvkxOAkS9SElFB4EIEklFBkEAbBcSQAAEJwSwADIKcwBMSU8CRLGBBbIZSwOyGIAEJDeNPLIagQayECOyAbMyCnMATElOAk4DRAxBACxMCUsEgZADC4G02QkICEsBvEixSwNBAA8yDrIHsggishAjsgGzIkMxAEL/7kYCI0L/0EUBMQCI/LMSQP+SJwSwACEEMgEIFihMULAiQzYaAUkVJRJEiPyUvUUBgAEAI08CVChMULAiQzYaAUcCFSUSRIj8eL1FAUAAEEgrSRUWVwYCTFAoTFCwIkOI/F++REL/6jYaAUcCFSUSRIj8Tr1FAUAABCcFsACI/EG+REkVFlcGAkxQKExQsCJDNhoBRwIjWUlOAiULJAhMFRJEKSNJSwMMQQA6SwNXAgBLASULJVhJiPwHvUUBQQAaiPv+vkRJFRZXBgJMUE8CTCKI+5FMIghC/8pITCkiiPuETEL/8EgoTFCwIkM2GgFHAiNZSU4CJQskCEwVEkQpI0lLAwxBADNLA1cCAEsBJQslWEmI+6u9RQFAAAQnBbAAiPuevkRJFRZXBgJMUE8CTCKI+zFMIghC/8ZIKExQsCJD", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var EscrowFactoryFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `EscrowFactoryFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {
    this.appFactory = new _AppFactory2({
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
  params = {
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
  };
};
var EscrowFactoryClient = class _EscrowFactoryClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  appClient;
  constructor(appClientOrParams) {
    this.appClient = appClientOrParams instanceof _AppClient2 ? appClientOrParams : new _AppClient2({
      ...appClientOrParams,
      appSpec: APP_SPEC2
    });
  }
  /**
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC2.structs) : void 0;
  }
  /**
   * Returns a new `EscrowFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _EscrowFactoryClient(await _AppClient2.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `EscrowFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _EscrowFactoryClient(await _AppClient2.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
  params = {
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
  };
  /**
   * Create transactions for the current app
   */
  createTransaction = {
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
  };
  /**
   * Send calls to the current app
   */
  send = {
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
  };
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  state = {
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
  };
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a new(pay)uint64 method call against the EscrowFactory contract
       */
      new(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.new(params)));
        resultMappers.push((v) => client.decodeReturnValue("new(pay)uint64", v));
        return this;
      },
      /**
       * Add a register(pay,uint64)void method call against the EscrowFactory contract
       */
      register(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.register(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a delete(uint64)void method call against the EscrowFactory contract
       */
      delete(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.delete(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a cost()uint64 method call against the EscrowFactory contract
       */
      cost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cost(params)));
        resultMappers.push((v) => client.decodeReturnValue("cost()uint64", v));
        return this;
      },
      /**
       * Add a registerCost()uint64 method call against the EscrowFactory contract
       */
      registerCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.registerCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("registerCost()uint64", v));
        return this;
      },
      /**
       * Add a exists(address)bool method call against the EscrowFactory contract
       */
      exists(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.exists(params)));
        resultMappers.push((v) => client.decodeReturnValue("exists(address)bool", v));
        return this;
      },
      /**
       * Add a get(address)byte[] method call against the EscrowFactory contract
       */
      get(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.get(params)));
        resultMappers.push((v) => client.decodeReturnValue("get(address)byte[]", v));
        return this;
      },
      /**
       * Add a mustGet(address)byte[] method call against the EscrowFactory contract
       */
      mustGet(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGet(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGet(address)byte[]", v));
        return this;
      },
      /**
       * Add a getList(address[])byte[][] method call against the EscrowFactory contract
       */
      getList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getList(params)));
        resultMappers.push((v) => client.decodeReturnValue("getList(address[])byte[][]", v));
        return this;
      },
      /**
       * Add a mustGetList(address[])byte[][] method call against the EscrowFactory contract
       */
      mustGetList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetList(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetList(address[])byte[][]", v));
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
};

// src/escrow/errors.ts
var ESCROW_ERROR_MESSAGES = withErrorCodeAliases({
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
});
var translateEscrowError = makeErrorTranslator(ESCROW_ERROR_MESSAGES);

// src/escrow/index.ts
var EscrowSDK = class extends BaseSDK {
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
    return ((_a = state.creator) == null ? void 0 : _a.toString()) ?? "";
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
var EscrowFactorySDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: EscrowFactoryFactory, ...params }, ENV_VAR_NAMES.ESCROW_FACTORY_APP_ID);
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
      amount: microAlgo(cost),
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
      amount: microAlgo(cost),
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
    return exists ?? false;
  }
  /**
   * Gets the creator bytes for an address.
   * Returns empty bytes if not found.
   */
  async getCreator({ address }) {
    const creator = await this.client.get({ args: { address } });
    return creator ?? new Uint8Array();
  }
  /**
   * Gets creator bytes for multiple addresses.
   */
  async getList({ addresses }) {
    const creators = await this.client.getList({ args: { addresses } });
    return creators ?? [];
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

export {
  ESCROW_ERROR_MESSAGES,
  translateEscrowError,
  EscrowSDK,
  EscrowFactorySDK,
  newEscrow
};
//# sourceMappingURL=chunk-NQI43ZT4.mjs.map
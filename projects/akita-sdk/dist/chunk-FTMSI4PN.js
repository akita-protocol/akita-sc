"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class;






var _chunkEG446GRHjs = require('./chunk-EG446GRH.js');



var _chunkWXNDITZIjs = require('./chunk-WXNDITZI.js');

// src/base.ts
var _algosdk = require('algosdk');
_chunkEG446GRHjs.installAccessListResourcePopulator.call(void 0, );
var BaseSDK = (_class = class {
  
  
  
  __init() {this.readerAccount = _chunkEG446GRHjs.DEFAULT_READER}
  
  /** The detected network for this SDK instance */
  
  /**
   * Override this in subclasses to specify the environment variable name for the app ID
   */
  static __initStatic() {this.envVarName = ""}
  constructor({ factoryParams, algorand, factory, readerAccount, sendParams }, envVarName) {;_class.prototype.__init.call(this);
    var _a;
    this.network = _chunkEG446GRHjs.detectNetworkFromClient.call(void 0, algorand);
    const resolvedAppId = _chunkEG446GRHjs.resolveAppIdWithClient.call(void 0, 
      algorand,
      factoryParams.appId,
      envVarName || this.constructor.envVarName || "",
      this.constructor.name
    );
    this.appId = resolvedAppId;
    this.algorand = algorand;
    if (readerAccount) {
      this.readerAccount = readerAccount;
    }
    this.sendParams = { ..._chunkEG446GRHjs.DEFAULT_SEND_PARAMS, ...sendParams };
    if (!!factoryParams.defaultSender) {
      this.sendParams.sender = factoryParams.defaultSender;
    }
    if (!!factoryParams.defaultSigner) {
      this.sendParams.signer = _chunkWXNDITZIjs.normalizeSigner.call(void 0, factoryParams.defaultSigner);
    }
    this.client = new factory({ algorand }).getAppClientById({
      ...factoryParams,
      defaultSender: _nullishCoalesce(factoryParams.defaultSender, () => ( this.readerAccount)),
      appId: resolvedAppId
    });
    _chunkEG446GRHjs.registerAccessListResourceCarrier.call(void 0, 
      resolvedAppId,
      this.client.appSpec,
      (_a = this.algorand.client) == null ? void 0 : _a.algod
    );
  }
  setReaderAccount(readerAccount) {
    this.readerAccount = readerAccount;
  }
  setSendParams(sendParams) {
    this.sendParams = { ...sendParams };
  }
  getSendParams({ sender, signer } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 && { sender },
      ...signer !== void 0 && { signer: _chunkWXNDITZIjs.normalizeSigner.call(void 0, signer) }
    };
  }
  getRequiredSendParams(params = {}) {
    const sendParams = this.getSendParams(params);
    if (!_chunkWXNDITZIjs.hasSenderSigner.call(void 0, sendParams)) {
      throw new Error("Sender and signer must be provided either explicitly or through defaults at SDK instantiation");
    }
    return sendParams;
  }
  getReaderSendParams({ sender } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 ? { sender } : { sender: this.readerAccount },
      signer: _algosdk.makeEmptyTransactionSigner.call(void 0, )
    };
  }
}, _class.__initStatic(), _class);



exports.BaseSDK = BaseSDK;
//# sourceMappingURL=chunk-FTMSI4PN.js.map
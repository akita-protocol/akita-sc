"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;




var _chunkVMMDQU5Ujs = require('./chunk-VMMDQU5U.js');



var _chunkFZLF55XCjs = require('./chunk-FZLF55XC.js');

// src/base.ts
var _transact = require('@algorandfoundation/algokit-utils/transact');
var BaseSDK = (_class = class {
  
  
  
  __init() {this.readerAccount = _chunkVMMDQU5Ujs.DEFAULT_READER}
  __init2() {this.sendParams = _chunkVMMDQU5Ujs.DEFAULT_SEND_PARAMS}
  /** The detected network for this SDK instance */
  
  /**
   * Override this in subclasses to specify the environment variable name for the app ID
   */
  static __initStatic() {this.envVarName = ""}
  constructor({ factoryParams, algorand, factory, readerAccount, sendParams }, envVarName) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.network = _chunkVMMDQU5Ujs.detectNetworkFromClient.call(void 0, algorand);
    const resolvedAppId = _chunkVMMDQU5Ujs.resolveAppIdWithClient.call(void 0, 
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
    if (sendParams) {
      this.sendParams = sendParams;
    }
    if (!!factoryParams.defaultSender) {
      this.sendParams.sender = factoryParams.defaultSender;
    }
    if (!!factoryParams.defaultSigner) {
      this.sendParams.signer = _chunkFZLF55XCjs.normalizeSigner.call(void 0, factoryParams.defaultSigner);
    }
    this.client = new factory({ algorand }).getAppClientById({
      ...factoryParams,
      appId: resolvedAppId
    });
  }
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
}, _class.__initStatic(), _class);



exports.BaseSDK = BaseSDK;
//# sourceMappingURL=chunk-OPF2XL3K.js.map
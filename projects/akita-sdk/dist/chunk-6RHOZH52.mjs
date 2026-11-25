import {
  DEFAULT_READER,
  DEFAULT_SEND_PARAMS,
  detectNetworkFromClient,
  installAccessListResourcePopulator,
  registerAccessListResourceCarrier,
  resolveAppIdWithClient
} from "./chunk-HZPGY6SV.mjs";
import {
  hasSenderSigner,
  normalizeSigner
} from "./chunk-JZMSW77U.mjs";

// src/base.ts
import { makeEmptyTransactionSigner } from "algosdk";
installAccessListResourcePopulator();
var BaseSDK = class {
  appId;
  client;
  algorand;
  readerAccount = DEFAULT_READER;
  sendParams;
  /** The detected network for this SDK instance */
  network;
  /**
   * Override this in subclasses to specify the environment variable name for the app ID
   */
  static envVarName = "";
  constructor({ factoryParams, algorand, factory, readerAccount, sendParams }, envVarName) {
    var _a;
    this.network = detectNetworkFromClient(algorand);
    const resolvedAppId = resolveAppIdWithClient(
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
    this.sendParams = { ...DEFAULT_SEND_PARAMS, ...sendParams };
    if (!!factoryParams.defaultSender) {
      this.sendParams.sender = factoryParams.defaultSender;
    }
    if (!!factoryParams.defaultSigner) {
      this.sendParams.signer = normalizeSigner(factoryParams.defaultSigner);
    }
    this.client = new factory({ algorand }).getAppClientById({
      ...factoryParams,
      defaultSender: factoryParams.defaultSender ?? this.readerAccount,
      appId: resolvedAppId
    });
    registerAccessListResourceCarrier(
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
      ...signer !== void 0 && { signer: normalizeSigner(signer) }
    };
  }
  getRequiredSendParams(params = {}) {
    const sendParams = this.getSendParams(params);
    if (!hasSenderSigner(sendParams)) {
      throw new Error("Sender and signer must be provided either explicitly or through defaults at SDK instantiation");
    }
    return sendParams;
  }
  getReaderSendParams({ sender } = {}) {
    return {
      ...this.sendParams,
      ...sender !== void 0 ? { sender } : { sender: this.readerAccount },
      signer: makeEmptyTransactionSigner()
    };
  }
};

export {
  BaseSDK
};
//# sourceMappingURL=chunk-6RHOZH52.mjs.map
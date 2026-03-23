"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkCXAUWVM5js = require('../chunk-CXAUWVM5.js');


var _chunkXUS7H5EPjs = require('../chunk-XUS7H5EP.js');
require('../chunk-56YZPYCL.js');
require('../chunk-B2QFHBQD.js');
require('../chunk-5DOZLI4E.js');
require('../chunk-UQLL4RRM.js');
require('../chunk-2WS6GQO5.js');
require('../chunk-DGUM43GV.js');

// src/dao-deployable/index.ts
var AkitaDaoDeployableSDK = class extends _chunkCXAUWVM5js.AkitaDaoSDK {
  constructor(params) {
    super(params);
  }
  async setup(params) {
    const sendParams = this.getSendParams(params);
    const group = this.client.newGroup();
    group.setup({
      ...sendParams,
      args: { nickname: "Akita DAO" },
      maxFee: 6e3.microAlgo()
    });
    group.opUp({ args: {}, maxFee: 1e3.microAlgos() });
    const result = await group.send({ ...sendParams });
    if (result.returns === void 0) {
      throw new Error("Failed to setup Akita DAO");
    }
    this.wallet = new (0, _chunkXUS7H5EPjs.WalletSDK)({
      algorand: this.algorand,
      factoryParams: {
        appId: result.returns[0],
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
    await this.wallet.register({ ...sendParams, escrow: "" });
    return result;
  }
};



exports.AkitaDaoDeployableSDK = AkitaDaoDeployableSDK; exports.AkitaDaoSDK = _chunkCXAUWVM5js.AkitaDaoSDK;
//# sourceMappingURL=index.js.map
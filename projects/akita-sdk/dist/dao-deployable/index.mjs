import {
  AkitaDaoSDK
} from "../chunk-V42UWD75.mjs";
import {
  WalletSDK
} from "../chunk-DZ2XEIUD.mjs";
import "../chunk-ZRCAYT2V.mjs";
import "../chunk-P4YWTMZR.mjs";
import "../chunk-CQJ6LHOR.mjs";
import "../chunk-2IK5OE34.mjs";
import "../chunk-V3TNOMIB.mjs";
import "../chunk-BJTO5JO5.mjs";

// src/dao-deployable/index.ts
var AkitaDaoDeployableSDK = class extends AkitaDaoSDK {
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
    this.wallet = new WalletSDK({
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
export {
  AkitaDaoDeployableSDK,
  AkitaDaoSDK
};
//# sourceMappingURL=index.mjs.map
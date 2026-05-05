// src/types.ts
function normalizeSigner(signer) {
  if (signer === void 0) return void 0;
  if (typeof signer === "function") return signer;
  return signer.signer;
}
function hasSenderSigner(params) {
  return params.sender !== void 0 && params.signer !== void 0;
}
function isPluginSDKReturn(value) {
  return typeof value === "function";
}

export {
  normalizeSigner,
  hasSenderSigner,
  isPluginSDKReturn
};
//# sourceMappingURL=chunk-RFJII2P3.mjs.map
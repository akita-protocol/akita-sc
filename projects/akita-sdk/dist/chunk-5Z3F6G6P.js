"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/marketplace/royalty.ts
var CREATOR_ROYALTY_MAXIMUM = 50000n;
var CREATOR_ROYALTY_DEFAULT = 5000n;
function resolveMaxCreatorRoyalty(maxCreatorRoyalty, proof) {
  if (maxCreatorRoyalty !== void 0) {
    return BigInt(maxCreatorRoyalty);
  }
  if (proof.length > 0) {
    throw new Error(
      "maxCreatorRoyalty is required when a royalty proof is supplied: pass the creator royalty the seller was shown (50_000 = 50%)"
    );
  }
  return CREATOR_ROYALTY_MAXIMUM;
}





exports.CREATOR_ROYALTY_MAXIMUM = CREATOR_ROYALTY_MAXIMUM; exports.CREATOR_ROYALTY_DEFAULT = CREATOR_ROYALTY_DEFAULT; exports.resolveMaxCreatorRoyalty = resolveMaxCreatorRoyalty;
//# sourceMappingURL=chunk-5Z3F6G6P.js.map
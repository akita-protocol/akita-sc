// src/marketplace/royalty.ts
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

export {
  CREATOR_ROYALTY_MAXIMUM,
  CREATOR_ROYALTY_DEFAULT,
  resolveMaxCreatorRoyalty
};
//# sourceMappingURL=chunk-VXHF5AKC.mjs.map
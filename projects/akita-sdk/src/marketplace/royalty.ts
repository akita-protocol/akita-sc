/** The highest creator royalty a listing can carry (50%). Sent as `maxCreatorRoyalty`, it sets no bound. */
export const CREATOR_ROYALTY_MAXIMUM = 50_000n;

/** The creator royalty of a listing made without a royalty proof (5%). */
export const CREATOR_ROYALTY_DEFAULT = 5_000n;

/**
 * The `maxCreatorRoyalty` a `list` call sends: the highest creator royalty the seller accepts, in the
 * units of the listing's `creatorRoyalty` (50_000 = 50%).
 *
 * A listing made without a royalty proof pays the protocol default, which nobody can change under
 * the seller, so it needs no bound. A listing made with a proof pays the rate in the creator's own
 * record when the call lands, and the creator can change that record at any time. The caller must
 * then say which rate the seller agreed to: pass the royalty the seller was shown.
 */
export function resolveMaxCreatorRoyalty(maxCreatorRoyalty: bigint | number | undefined, proof: Uint8Array[]): bigint {
  if (maxCreatorRoyalty !== undefined) {
    return BigInt(maxCreatorRoyalty);
  }
  if (proof.length > 0) {
    throw new Error(
      'maxCreatorRoyalty is required when a royalty proof is supplied: pass the creator royalty the seller was shown (50_000 = 50%)',
    );
  }
  return CREATOR_ROYALTY_MAXIMUM;
}

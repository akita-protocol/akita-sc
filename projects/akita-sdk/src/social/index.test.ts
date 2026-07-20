import { sha256 } from "@noble/hashes/sha2.js";
import { describe, expect, test, vi } from "vitest";
import { REACTIONS_MBR, REACTIONLIST_MBR } from "./constants";
import { SocialSDK } from "./index";
import { RefType } from "./types";

type ReactionStorageRef = {
  reactionStorageRef(ref: Uint8Array, refType: RefType): Uint8Array | undefined;
};

function bareSdk(): SocialSDK {
  return Object.create(SocialSDK.prototype) as SocialSDK;
}

describe("SocialSDK reactions", () => {
  test("mirrors contract reference-key normalization", () => {
    const sdk = bareSdk() as unknown as ReactionStorageRef;
    const post = new Uint8Array(32).fill(1);
    expect(sdk.reactionStorageRef(post, RefType.Post)).toEqual(post);

    const asset = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const paddedAsset = new Uint8Array(32);
    paddedAsset.set(asset);
    expect(sdk.reactionStorageRef(asset, RefType.Asset)).toEqual(paddedAsset);

    const extensionRef = new Uint8Array([9, 8, 7]);
    const encodedExtension = new Uint8Array(8 + extensionRef.length);
    encodedExtension[7] = RefType.Collection;
    encodedExtension.set(extensionRef, 8);
    expect(sdk.reactionStorageRef(extensionRef, RefType.Collection)).toEqual(sha256(encodedExtension));
  });

  test.each([
    { aggregateExists: false, expectedMbr: REACTIONS_MBR + REACTIONLIST_MBR },
    { aggregateExists: true, expectedMbr: REACTIONLIST_MBR },
  ])("pays exact reaction MBR when aggregateExists=$aggregateExists", async ({ aggregateExists, expectedMbr }) => {
    const sdk = bareSdk();
    const ref = new Uint8Array(32).fill(7);
    const payment = vi.fn((params: unknown) => params);
    const assetTransfer = vi.fn((params: unknown) => params);
    const getReactionExists = vi.fn().mockResolvedValue(aggregateExists);
    const react = vi.fn();
    const send = vi.fn().mockResolvedValue(undefined);
    const signer = vi.fn();

    Object.assign(sdk as unknown as Record<string, unknown>, {
      getRequiredSendParams: () => ({ sender: "sender", signer }),
      getSocialFees: async () => ({ reactFee: 10n }),
      getAkitaAssets: async () => ({ akta: 123n }),
      algorand: { createTransaction: { payment, assetTransfer } },
      socialClient: {
        appAddress: "social-app",
        getReactionExists,
        newGroup: () => ({ react, send }),
      },
    });

    await sdk.react({
      sender: "sender",
      signer,
      ref,
      refType: RefType.Post,
      nft: 42n,
    });

    expect(getReactionExists).toHaveBeenCalledWith(
      expect.objectContaining({ args: { ref, nft: 42n } }),
    );
    expect(payment).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: expect.objectContaining({ microAlgos: expectedMbr }),
      }),
    );
    expect(react).toHaveBeenCalledOnce();
    expect(send).toHaveBeenCalledOnce();
  });
});

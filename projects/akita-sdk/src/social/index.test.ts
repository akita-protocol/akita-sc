import { sha256 } from "@noble/hashes/sha2.js";
import { describe, expect, test, vi } from "vitest";
import { AlgorandClient } from "@algorandfoundation/algokit-utils/types/algorand-client";
import { setCurrentNetwork, SOCIAL_HINTED_TARGETS, socialHintedTargets } from "../config";
import {
  AMENDMENT_MBR,
  BOX_COST_PER_BYTE,
  EDIT_BACK_REF_MBR,
  LEGACY_MIN_PAYWALL_MBR,
  LEGACY_MIN_POSTS_MBR,
  MIN_PAYWALL_MBR,
  MIN_POSTS_MBR,
  PAYWALL_PAY_OPTION_SIZE,
  REACTIONLIST_MBR,
  REACTIONS_MBR,
  REACTION_RECORD_MBR,
  REPLY_PARENT_REF_MBR,
  VOTELIST_MBR,
  VOTES_MBR,
} from "./constants";
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
    { aggregateExists: false, expectedMbr: REACTIONS_MBR + REACTION_RECORD_MBR },
    { aggregateExists: true, expectedMbr: REACTION_RECORD_MBR },
  ])("pays exact reaction MBR when aggregateExists=$aggregateExists", async ({ aggregateExists, expectedMbr }) => {
    const sdk = bareSdk();
    const ref = new Uint8Array(32).fill(7);
    const payment = vi.fn((params: unknown) => params);
    const assetTransfer = vi.fn((params: unknown) => params);
    const getReactionExists = vi.fn().mockResolvedValue(aggregateExists);
    const react = vi.fn();
    const legacyReact = vi.fn();
    const send = vi.fn().mockResolvedValue(undefined);
    const signer = vi.fn();

    Object.assign(sdk as unknown as unknown as Record<string, unknown>, {
      getRequiredSendParams: () => ({ sender: "sender", signer }),
      getSocialFees: async () => ({ reactFee: 10n }),
      getAkitaAssets: async () => ({ akta: 123n }),
      algorand: { createTransaction: { payment, assetTransfer } },
      socialClient: {
        appAddress: "social-app",
        getReactionExists,
        // hinted overload vs the legacy shim (principal-resolution §6.2): the SDK must pick the hinted one
        newGroup: () => ({ reactPayAxferByteUint64Uint64Uint64Void: react, reactPayAxferByteUint64Uint64Void: legacyReact, send }),
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
    expect(react).toHaveBeenCalledWith(expect.objectContaining({ args: expect.objectContaining({ wallet: 0n }) }));
    expect(legacyReact).not.toHaveBeenCalled();
    expect(send).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------------------------
// Principal resolution (PHASE-0-SPEC §6.2, §6.13, P2-ABI-01): every SocialSDK write wrapper calls
// the HINTED overload (trailing `wallet: uint64`) and forwards `wallet` (default 0n), never the
// legacy shim selector.
// ---------------------------------------------------------------------------------------------

type Recorder = ReturnType<typeof vi.fn>;

function wiredSdk() {
  const sdk = bareSdk();
  const calls: Record<string, Recorder> = {};
  const record = (name: string) => (calls[name] ??= vi.fn().mockResolvedValue({ return: 1n }));
  const send = vi.fn().mockResolvedValue(undefined);
  const group = new Proxy({}, { get: (_t, name: string) => (name === "send" ? send : record(`group.${name}`)) });
  const socialSend = new Proxy({}, { get: (_t, name: string) => record(`social.${name}`) });
  const graphSend = new Proxy({}, { get: (_t, name: string) => record(`graph.${name}`) });
  const signer = vi.fn();
  Object.assign(sdk as unknown as Record<string, unknown>, {
    getRequiredSendParams: () => ({ sender: "SENDER", signer }),
    getSocialFees: async () => ({ postFee: 100n, reactFee: 10n }),
    getAkitaAssets: async () => ({ akta: 123n }),
    getBlockchainTimestamp: async () => 1_000n,
    computePostKey: () => new Uint8Array(32),
    computeEditKey: () => new Uint8Array(32),
    algorand: { createTransaction: { payment: vi.fn((p: unknown) => p), assetTransfer: vi.fn((p: unknown) => p) } },
    socialClient: {
      appAddress: "social-app",
      getReactionExists: vi.fn().mockResolvedValue(true),
      getPostExists: vi.fn().mockResolvedValue(true),
      getVotesExist: vi.fn().mockResolvedValue(true),
      newGroup: () => group,
      send: socialSend,
    },
    graphClient: { appAddress: "graph-app", send: graphSend },
  });
  return { sdk, calls, signer };
}

const HINTED = {
  post: "group.postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Uint64Void",
  editPost: "social.editPostPayAxferByte_36Byte_32Uint64Uint64Void",
  reply: "group.replyPayAxferUint64Byte_24Byte_36ByteUint64Uint64BoolUint64Uint64Uint64Void",
  gatedReply: "group.gatedReplyPayAxferApplUint64Byte_24Byte_36ByteUint64Uint64BoolUint64Uint64Uint64Void",
  vote: "group.votePayAxferByteUint64BoolUint64Void",
  editVote: "group.editVotePayAxferByte_32BoolUint64Void",
  react: "group.reactPayAxferByteUint64Uint64Uint64Void",
  gatedReact: "group.gatedReactPayAxferApplByteUint64Uint64Uint64Void",
  initMeta: "social.initMetaPayAddressBoolUint64Uint64Uint64Uint64Uint64",
  gatedFollow: "graph.gatedFollowPayApplAddressUint64Void",
  setMetaWallet: "social.setMetaWallet",
} as const;

describe("SocialSDK wallet hint (principal resolution)", () => {
  const ref = new Uint8Array(32).fill(3);
  const cid = new Uint8Array(36).fill(4);
  const gateTxn = { gate: true } as never;

  const cases: [string, keyof typeof HINTED, (sdk: SocialSDK, wallet?: bigint) => Promise<unknown>][] = [
    ["post", "post", (sdk, wallet) => sdk.post({ cid, wallet })],
    ["editPost", "editPost", (sdk, wallet) => sdk.editPost({ cid, amendment: ref, wallet })],
    ["reply", "reply", (sdk, wallet) => sdk.reply({ cid, ref, refType: RefType.Post, wallet })],
    ["gated reply", "gatedReply", (sdk, wallet) => sdk.reply({ cid, ref, refType: RefType.Post, gateTxn, wallet })],
    ["vote", "vote", (sdk, wallet) => sdk.vote({ ref, refType: RefType.Post, isUp: true, wallet })],
    ["invertVote", "editVote", (sdk, wallet) => sdk.invertVote({ ref, wallet })],
    ["deleteVote", "editVote", (sdk, wallet) => sdk.deleteVote({ ref, wallet })],
    ["react", "react", (sdk, wallet) => sdk.react({ ref, refType: RefType.Post, nft: 1n, wallet })],
    ["gated react", "gatedReact", (sdk, wallet) => sdk.react({ ref, refType: RefType.Post, nft: 1n, gateTxn, wallet })],
    ["initMeta", "initMeta", (sdk, wallet) => sdk.initMeta({ wallet })],
    ["gated follow", "gatedFollow", (sdk, wallet) => sdk.follow({ address: "ADDR", gateTxn, wallet })],
    ["setMetaWallet", "setMetaWallet", (sdk, wallet) => sdk.setMetaWallet({ wallet })],
  ];

  test.each(cases)("%s calls the hinted overload with wallet 0n by default", async (_label, key, run) => {
    const { sdk, calls } = wiredSdk();
    await run(sdk);
    const hinted = calls[HINTED[key]];
    expect(hinted).toBeDefined();
    expect(hinted).toHaveBeenCalledWith(expect.objectContaining({ args: expect.objectContaining({ wallet: 0n }) }));
    // no other social/graph write overload was used (in particular never a legacy shim)
    const writes = Object.keys(calls).filter((name) => name !== HINTED[key]);
    expect(writes).toEqual([]);
  });

  test.each(cases)("%s forwards an explicit wallet hint", async (_label, key, run) => {
    const { sdk, calls } = wiredSdk();
    await run(sdk, 77n);
    expect(calls[HINTED[key]]).toHaveBeenCalledWith(expect.objectContaining({ args: expect.objectContaining({ wallet: 77n }) }));
  });

  test("ungated follow has no hint (AkitaSocialGraph.follow is unchanged)", async () => {
    const { sdk, calls } = wiredSdk();
    await sdk.follow({ address: "ADDR" });
    expect(Object.keys(calls)).toEqual(["graph.follow"]);
  });

  test("directGateCtx is the verified context of a plain direct call", () => {
    expect(SocialSDK.directGateCtx("SENDER")).toEqual({ principal: "SENDER", wallet: 0n, spender: "SENDER" });
  });
});

// ---------------------------------------------------------------------------------------------
// Review fix (2026-10-04): per-network target switch (networks.ts SOCIAL_HINTED_TARGETS). Until the
// Phase 2 AkitaSocial/AkitaSocialGraph upgrade has executed on a network, the deployed programs have no
// hinted selectors, so SocialSDK must call the legacy selectors with the deployed MBR terms there.
// Release 2.0.0 (TestNet 2026-11-25, MainNet 2026-11-26) executed that upgrade on both networks, so every
// network's default is the hinted targets now. The legacy terms stay reachable with `hintedTargets: false`.
// ---------------------------------------------------------------------------------------------

const LEGACY = {
  post: "group.postPayAxferUint64Byte_24Byte_36Uint64BoolUint64Uint64Void",
  editPost: "social.editPostPayAxferByte_36Byte_32Uint64Void",
  reply: "group.replyPayAxferUint64Byte_24Byte_36ByteUint64Uint64BoolUint64Uint64Void",
  gatedReply: "group.gatedReplyPayAxferApplUint64Byte_24Byte_36ByteUint64Uint64BoolUint64Uint64Void",
  vote: "group.votePayAxferByteUint64BoolVoid",
  editVote: "group.editVotePayAxferByte_32BoolVoid",
  react: "group.reactPayAxferByteUint64Uint64Void",
  gatedReact: "group.gatedReactPayAxferApplByteUint64Uint64Void",
  initMeta: "social.initMetaPayAddressBoolUint64Uint64Uint64Uint64",
  gatedFollow: "graph.gatedFollowPayApplAddressVoid",
} as const;

describe("SOCIAL_HINTED_TARGETS (principal resolution Phase 2 switch)", () => {
  test("every network targets the upgraded contracts since release 2.0.0 (Phase 2 executed on TestNet and MainNet)", () => {
    expect(SOCIAL_HINTED_TARGETS).toEqual({ localnet: true, testnet: true, mainnet: true });
    expect(socialHintedTargets("localnet")).toBe(true);
    expect(socialHintedTargets("testnet")).toBe(true);
    expect(socialHintedTargets("mainnet")).toBe(true);
  });

  test("an explicit choice wins over the network default", () => {
    expect(socialHintedTargets("mainnet", true)).toBe(true);
    expect(socialHintedTargets("mainnet", false)).toBe(false);
    expect(socialHintedTargets("testnet", false)).toBe(false);
    expect(socialHintedTargets("localnet", false)).toBe(false);
  });

  test("the switch is honoured both ways (a network whose social programs are not upgraded)", () => {
    const saved = { ...SOCIAL_HINTED_TARGETS };
    try {
      SOCIAL_HINTED_TARGETS.mainnet = false;
      expect(socialHintedTargets("mainnet")).toBe(false);
      expect(socialHintedTargets("mainnet", true)).toBe(true);
    } finally {
      Object.assign(SOCIAL_HINTED_TARGETS, saved);
    }
  });
});

describe("SocialSDK on deployed (pre-Phase-2) social targets", () => {
  const ref = new Uint8Array(32).fill(3);
  const cid = new Uint8Array(36).fill(4);
  const gateTxn = { gate: true } as never;

  const legacySdk = () => {
    const wired = wiredSdk();
    wired.sdk.hintedTargets = false;
    return wired;
  };
  const paidAmounts = (sdk: SocialSDK): bigint[] => {
    const payment = (sdk as unknown as { algorand: { createTransaction: { payment: Recorder } } }).algorand.createTransaction.payment;
    return payment.mock.calls.map(([p]) => (p as { amount: { microAlgos: bigint } }).amount.microAlgos);
  };

  const cases: [string, keyof typeof LEGACY, (sdk: SocialSDK, wallet?: bigint) => Promise<unknown>][] = [
    ["post", "post", (sdk, wallet) => sdk.post({ cid, wallet })],
    ["editPost", "editPost", (sdk, wallet) => sdk.editPost({ cid, amendment: ref, wallet })],
    ["reply", "reply", (sdk, wallet) => sdk.reply({ cid, ref, refType: RefType.Post, wallet })],
    ["gated reply", "gatedReply", (sdk, wallet) => sdk.reply({ cid, ref, refType: RefType.Post, gateTxn, wallet })],
    ["vote", "vote", (sdk, wallet) => sdk.vote({ ref, refType: RefType.Post, isUp: true, wallet })],
    ["invertVote", "editVote", (sdk, wallet) => sdk.invertVote({ ref, wallet })],
    ["deleteVote", "editVote", (sdk, wallet) => sdk.deleteVote({ ref, wallet })],
    ["react", "react", (sdk, wallet) => sdk.react({ ref, refType: RefType.Post, nft: 1n, wallet })],
    ["gated react", "gatedReact", (sdk, wallet) => sdk.react({ ref, refType: RefType.Post, nft: 1n, gateTxn, wallet })],
    ["initMeta", "initMeta", (sdk, wallet) => sdk.initMeta({ wallet })],
    ["gated follow", "gatedFollow", (sdk, wallet) => sdk.follow({ address: "ADDR", gateTxn, wallet })],
  ];

  test.each(cases)("%s calls the legacy selector without a wallet argument", async (_label, key, run) => {
    const { sdk, calls } = legacySdk();
    await run(sdk);
    const legacy = calls[LEGACY[key]];
    expect(legacy).toBeDefined();
    expect(legacy).toHaveBeenCalledOnce();
    expect(legacy.mock.calls[0][0].args).not.toHaveProperty("wallet");
    // no other social/graph write overload was used (in particular never a hinted one)
    expect(Object.keys(calls).filter((name) => name !== LEGACY[key])).toEqual([]);
  });

  test.each(cases)("%s refuses a non-zero wallet hint before sending anything", async (_label, _key, run) => {
    const { sdk, calls } = legacySdk();
    await expect(run(sdk, 77n)).rejects.toThrow(/wallet hint needs the upgraded social contracts/);
    expect(Object.keys(calls)).toEqual([]);
  });

  test("setMetaWallet does not exist on the deployed AkitaSocial", async () => {
    const { sdk, calls } = legacySdk();
    await expect(sdk.setMetaWallet({})).rejects.toThrow(/setMetaWallet needs the upgraded AkitaSocial/);
    expect(Object.keys(calls)).toEqual([]);
  });

  test("ungated follow is the same call on both targets", async () => {
    const { sdk, calls } = legacySdk();
    await sdk.follow({ address: "ADDR" });
    expect(Object.keys(calls)).toEqual(["graph.follow"]);
  });

  test("post, reply and edit quote the deployed MBR (46,500 posts base, no parent-ref term)", async () => {
    const legacy = legacySdk().sdk;
    await legacy.post({ cid });
    await legacy.reply({ cid, ref, refType: RefType.Post });
    await legacy.editPost({ cid, amendment: ref });
    const postMbr = LEGACY_MIN_POSTS_MBR + BOX_COST_PER_BYTE * 36n + VOTES_MBR + VOTELIST_MBR;
    expect(paidAmounts(legacy)).toEqual([postMbr, postMbr, postMbr + AMENDMENT_MBR + EDIT_BACK_REF_MBR]);

    const hinted = wiredSdk().sdk;
    await hinted.post({ cid });
    await hinted.reply({ cid, ref, refType: RefType.Post });
    const hintedPost = MIN_POSTS_MBR + BOX_COST_PER_BYTE * 36n + VOTES_MBR + VOTELIST_MBR;
    expect(paidAmounts(hinted)).toEqual([hintedPost, hintedPost + REPLY_PARENT_REF_MBR]);
  });

  test("a vote that materializes a ref quotes the deployed posts box only", async () => {
    const legacy = legacySdk();
    (legacy.sdk as unknown as { socialClient: { getPostExists: Recorder } }).socialClient.getPostExists.mockResolvedValue(false);
    await legacy.sdk.vote({ ref, refType: RefType.Address, isUp: false });
    expect(paidAmounts(legacy.sdk)).toEqual([VOTELIST_MBR + LEGACY_MIN_POSTS_MBR]);

    // the deployed contract has no votes read
    expect((legacy.sdk as unknown as { socialClient: { getVotesExist: Recorder } }).socialClient.getVotesExist).not.toHaveBeenCalled();

    const hinted = wiredSdk();
    const client = (hinted.sdk as unknown as { socialClient: { getPostExists: Recorder, getVotesExist: Recorder } }).socialClient;
    client.getPostExists.mockResolvedValue(false);
    client.getVotesExist.mockResolvedValue(false);
    await hinted.sdk.vote({ ref, refType: RefType.Address, isUp: false });
    expect(paidAmounts(hinted.sdk)).toEqual([VOTELIST_MBR + MIN_POSTS_MBR + VOTES_MBR]);
  });

  test("a vote pays for the votes box whenever it is missing, with or without the posts box (audit 08, SOC-04)", async () => {
    const quote = async (postExists: boolean, votesExist: boolean, refType = RefType.Address) => {
      const { sdk } = wiredSdk();
      const client = (sdk as unknown as { socialClient: { getPostExists: Recorder, getVotesExist: Recorder } }).socialClient;
      client.getPostExists.mockResolvedValue(postExists);
      client.getVotesExist.mockResolvedValue(votesExist);
      await sdk.vote({ ref, refType, isUp: true });
      return paidAmounts(sdk);
    };
    // a reply, a reaction or a meta update created the posts box alone: the first vote adds the votes box
    expect(await quote(true, false)).toEqual([VOTELIST_MBR + VOTES_MBR]);
    expect(await quote(true, true)).toEqual([VOTELIST_MBR]);
    expect(await quote(false, false)).toEqual([VOTELIST_MBR + MIN_POSTS_MBR + VOTES_MBR]);
    // a post always has its votes box, so nothing is read for it
    expect(await quote(false, false, RefType.Post)).toEqual([VOTELIST_MBR]);

    const { sdk } = wiredSdk();
    expect(sdk.calculateVoteMBR()).toBe(VOTELIST_MBR);
    expect(sdk.calculateVoteMBR(true)).toBe(VOTELIST_MBR + MIN_POSTS_MBR + VOTES_MBR);
    expect(sdk.calculateVoteMBR(false, true)).toBe(VOTELIST_MBR + VOTES_MBR);
    expect(sdk.calculateVoteMBR(true, false)).toBe(VOTELIST_MBR + MIN_POSTS_MBR);
  });

  test("react quotes the deployed 18,900 reaction list; paywall the deployed 5,200 base", async () => {
    const legacy = legacySdk().sdk;
    await legacy.react({ ref, refType: RefType.Post, nft: 1n }); // aggregate exists in wiredSdk
    expect(paidAmounts(legacy)).toEqual([REACTIONLIST_MBR]);
    expect(legacy.calculateReactMBR(true)).toBe(REACTIONLIST_MBR + REACTIONS_MBR);
    expect(legacy.calculatePayWallMBR(1, 1)).toBe(LEGACY_MIN_PAYWALL_MBR + BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE * 2n);

    const hinted = wiredSdk().sdk;
    expect(hinted.calculateReactMBR(true)).toBe(REACTION_RECORD_MBR + REACTIONS_MBR);
    expect(hinted.calculatePayWallMBR(1, 1)).toBe(MIN_PAYWALL_MBR + BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE * 2n);
  });

  test("the constructor takes the network default and an explicit override", () => {
    const params = {
      algorand: AlgorandClient.mainNet(),
      daoAppId: 1n,
      socialFactoryParams: { appId: 11n },
      graphFactoryParams: { appId: 12n },
      impactFactoryParams: { appId: 13n },
      moderationFactoryParams: { appId: 14n },
    };
    setCurrentNetwork("mainnet");
    expect(new SocialSDK(params).hintedTargets).toBe(true);
    expect(new SocialSDK({ ...params, hintedTargets: false }).hintedTargets).toBe(false);
    expect(new SocialSDK({ ...params, hintedTargets: true }).hintedTargets).toBe(true);
    setCurrentNetwork("localnet");
    expect(new SocialSDK(params).hintedTargets).toBe(true);
    expect(new SocialSDK({ ...params, hintedTargets: false }).hintedTargets).toBe(false);
  });
});

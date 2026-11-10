import { sha256 } from "@noble/hashes/sha2.js";
import { encodeAddress, encodeUint64 } from "algosdk";
import { describe, expect, test } from "vitest";
import { computeOfferTerms, hyperSwapParticipantTree, hyperSwapTradeTree, offerTermsFromLists, validateOffer, HYPER_SWAP_MAX_OFFER_DURATION } from "./terms";
import { HyperSwapLeaf, OfferValue } from "./types";

const a = encodeAddress(new Uint8Array(32).fill(1));
const b = encodeAddress(new Uint8Array(32).fill(2));
const c = encodeAddress(new Uint8Array(32).fill(3));
const leaves: HyperSwapLeaf[] = [
  { from: a, receiver: b, asset: 0n, amount: 10n },
  { from: b, receiver: a, asset: 7n, amount: 1n },
];
const participants = [a, b];

const offerFor = (overrides: Partial<OfferValue> = {}): OfferValue => ({
  state: 10,
  root: hyperSwapTradeTree(leaves).root,
  leaves: 2n,
  escrowed: 0n,
  participantsRoot: hyperSwapParticipantTree(participants).root,
  participantsLeaves: 2n,
  acceptances: 1n,
  expiration: 1_000n,
  ...overrides,
});

describe("HyperSwap offer terms", () => {
  test("matches the contract's sha256(id ‖ root ‖ leaves ‖ participantsRoot ‖ participantsLeaves ‖ expiration)", () => {
    const offer = offerFor();
    const expected = sha256(new Uint8Array([
      ...encodeUint64(5n), ...offer.root, ...encodeUint64(2n),
      ...offer.participantsRoot, ...encodeUint64(2n), ...encodeUint64(1_000n),
    ]));
    expect(computeOfferTerms(5n, offer)).toEqual(expected);
    expect(validateOffer({ id: 5n, offer, leaves, participants })).toEqual(expected);
  });

  test("rejects under-declared leaves or participants, mismatched roots, duplicates and outside funders", () => {
    expect(() => validateOffer({ id: 0n, offer: offerFor({ leaves: 1n }), leaves, participants })).toThrow(/declares 1 leaves/);
    expect(() => validateOffer({ id: 0n, offer: offerFor({ participantsLeaves: 1n }), leaves, participants })).toThrow(/participants/);
    expect(() => validateOffer({ id: 0n, offer: offerFor({ root: new Uint8Array(32) }), leaves, participants })).toThrow(/trade root/);
    expect(() => validateOffer({ id: 0n, offer: offerFor(), leaves: [leaves[0], leaves[0]], participants })).toThrow(/repeats a trade leaf/);
    expect(() => validateOffer({ id: 0n, offer: offerFor(), leaves, participants: [a, a] })).toThrow(/repeats a participant/);
    expect(() => validateOffer({ id: 0n, offer: offerFor(), leaves: [{ ...leaves[0], from: c }, leaves[1]], participants }))
      .toThrow(/not a participant/);
  });

  test("AUD-C11: terms built from the lists alone equal the honest offer's and never an under-declared one's", () => {
    const fromLists = offerTermsFromLists({ id: 5n, leaves, participants, expiration: 1_000n });
    // The honest offer commits to the same value, so the contract accepts.
    expect(fromLists).toEqual(computeOfferTerms(5n, offerFor()));
    expect(fromLists).toEqual(validateOffer({ id: 5n, offer: offerFor(), leaves, participants }));
    // An offer that declares fewer leaves or participants, another root, expiration or id commits to
    // something else, so the contract refuses the accept with a terms mismatch.
    for (const dishonest of [
      offerFor({ leaves: 1n }),
      offerFor({ participantsLeaves: 1n }),
      offerFor({ root: new Uint8Array(32).fill(9) }),
      offerFor({ participantsRoot: new Uint8Array(32).fill(9) }),
      offerFor({ expiration: 1_001n }),
    ]) {
      expect(fromLists).not.toEqual(computeOfferTerms(5n, dishonest));
    }
    expect(fromLists).not.toEqual(computeOfferTerms(6n, offerFor()));
  });

  test("AUD-C11: terms cannot be built from bad lists", () => {
    const build = (l: HyperSwapLeaf[], p: string[]) => () => offerTermsFromLists({ id: 0n, leaves: l, participants: p, expiration: 1_000n });
    expect(build([], participants)).toThrow(/no trade leaves/);
    expect(build(leaves, [])).toThrow(/no participants/);
    expect(build([leaves[0], leaves[0]], participants)).toThrow(/repeats a trade leaf/);
    expect(build(leaves, [a, a])).toThrow(/repeats a participant/);
    expect(build([{ ...leaves[0], from: c }, leaves[1]], participants)).toThrow(/not a participant/);
  });

  test("checks the expiration window when the chain time is given", () => {
    const offer = offerFor({ expiration: 100n + HYPER_SWAP_MAX_OFFER_DURATION + 1n });
    expect(() => validateOffer({ id: 0n, offer, leaves, participants, now: 100n })).toThrow(/maximum offer duration/);
    expect(() => validateOffer({ id: 0n, offer, leaves, participants })).not.toThrow();
  });
});

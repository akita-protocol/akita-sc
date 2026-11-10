import { sha256 } from "@noble/hashes/sha2.js";
import { encodeAddress, encodeUint64 } from "algosdk";
import { describe, expect, test } from "vitest";
import { computeOfferTerms, hyperSwapParticipantTree, hyperSwapTradeTree, validateOffer, HYPER_SWAP_MAX_OFFER_DURATION } from "./terms";
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

  test("checks the expiration window when the chain time is given", () => {
    const offer = offerFor({ expiration: 100n + HYPER_SWAP_MAX_OFFER_DURATION + 1n });
    expect(() => validateOffer({ id: 0n, offer, leaves, participants, now: 100n })).toThrow(/maximum offer duration/);
    expect(() => validateOffer({ id: 0n, offer, leaves, participants })).not.toThrow();
  });
});

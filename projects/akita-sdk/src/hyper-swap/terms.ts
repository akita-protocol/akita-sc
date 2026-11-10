import { sha256 } from "@noble/hashes/sha2.js";
import { decodeAddress, encodeUint64 } from "algosdk";
import { MerkleTree } from "../meta/tree";
import { SchemaPart } from "../meta/types";
import { HyperSwapLeaf, OfferValue } from "./types";

/** Longest an offer may stay open (contract `MaxOfferDuration`): 30 days, in seconds. */
export const HYPER_SWAP_MAX_OFFER_DURATION = 2_592_000n;

/** Schema of a trade leaf: (from, receiver, asset, amount). */
export const HYPER_SWAP_TRADE_SCHEMA = [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64];

/** Schema of a participant leaf: (address). */
export const HYPER_SWAP_PARTICIPANT_SCHEMA = [SchemaPart.Address];

type TermsInput = Pick<OfferValue, "root" | "leaves" | "participantsRoot" | "participantsLeaves" | "expiration">;

function concat(...parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function sameBytes(a: Uint8Array, b: Uint8Array): boolean {
  return a.length === b.length && a.every((byte, i) => byte === b[i]);
}

/**
 * The terms commitment HyperSwap's `accept` requires:
 * sha256(id ‖ root ‖ leaves ‖ participantsRoot ‖ participantsLeaves ‖ expiration), integers as uint64.
 */
export function computeOfferTerms(id: bigint | number, offer: TermsInput): Uint8Array {
  return sha256(concat(
    encodeUint64(id),
    offer.root,
    encodeUint64(offer.leaves),
    offer.participantsRoot,
    encodeUint64(offer.participantsLeaves),
    encodeUint64(offer.expiration),
  ));
}

/** Builds the trade tree exactly as HyperSwap hashes leaves on-chain. Order matters. */
export function hyperSwapTradeTree(leaves: HyperSwapLeaf[]) {
  return MerkleTree.of(
    leaves.map(({ from, receiver, asset, amount }) => [
      decodeAddress(from).publicKey, decodeAddress(receiver).publicKey, BigInt(asset), BigInt(amount),
    ]),
    HYPER_SWAP_TRADE_SCHEMA,
  );
}

/** Builds the participant tree exactly as HyperSwap hashes participants on-chain. Order matters. */
export function hyperSwapParticipantTree(participants: string[]) {
  return MerkleTree.of(participants.map((address) => [decodeAddress(address).publicKey]), HYPER_SWAP_PARTICIPANT_SCHEMA);
}

export type ValidateOfferParams = {
  id: bigint | number;
  /** The on-chain offer (e.g. `HyperSwapSDK.getOffer`). */
  offer: OfferValue;
  /** The complete, ordered trade leaf list shared by the offeror. */
  leaves: HyperSwapLeaf[];
  /** The complete, ordered participant list shared by the offeror. */
  participants: string[];
  /** Current chain time in seconds; when given, the expiration window is checked too. */
  now?: bigint;
};

/**
 * Checks an on-chain offer against the full leaf and participant lists and returns the terms
 * commitment to pass to `accept`. Throws if the offer under-declares leaves or participants,
 * repeats a leaf or participant, lists a funder who is not a participant, or does not match
 * the lists' roots.
 */
export function validateOffer({ id, offer, leaves, participants, now }: ValidateOfferParams): Uint8Array {
  if (leaves.length === 0) throw new Error("HyperSwap offer has no trade leaves");
  if (participants.length === 0) throw new Error("HyperSwap offer has no participants");

  const leafKeys = leaves.map(({ from, receiver, asset, amount }) => `${from}|${receiver}|${BigInt(asset)}|${BigInt(amount)}`);
  if (new Set(leafKeys).size !== leafKeys.length) throw new Error("HyperSwap offer repeats a trade leaf");
  if (new Set(participants).size !== participants.length) throw new Error("HyperSwap offer repeats a participant");
  for (const { from } of leaves) {
    if (!participants.includes(from)) throw new Error(`HyperSwap leaf funder ${from} is not a participant`);
  }

  if (offer.leaves !== BigInt(leaves.length)) {
    throw new Error(`HyperSwap offer declares ${offer.leaves} leaves but the list has ${leaves.length}`);
  }
  if (offer.participantsLeaves !== BigInt(participants.length)) {
    throw new Error(`HyperSwap offer declares ${offer.participantsLeaves} participants but the list has ${participants.length}`);
  }
  if (!sameBytes(offer.root, hyperSwapTradeTree(leaves).root)) throw new Error("HyperSwap trade root does not match the leaf list");
  if (!sameBytes(offer.participantsRoot, hyperSwapParticipantTree(participants).root)) {
    throw new Error("HyperSwap participant root does not match the participant list");
  }
  if (now !== undefined && offer.expiration - now > HYPER_SWAP_MAX_OFFER_DURATION) {
    throw new Error("HyperSwap offer expiration exceeds the maximum offer duration");
  }

  return computeOfferTerms(id, offer);
}

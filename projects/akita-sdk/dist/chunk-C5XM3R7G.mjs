import {
  MerkleTree
} from "./chunk-RUHR54B7.mjs";

// src/hyper-swap/terms.ts
import { sha256 } from "@noble/hashes/sha2.js";
import { decodeAddress, encodeUint64 } from "algosdk";
var HYPER_SWAP_MAX_OFFER_DURATION = 2592000n;
var HYPER_SWAP_TRADE_SCHEMA = [40 /* Address */, 40 /* Address */, 13 /* Uint64 */, 13 /* Uint64 */];
var HYPER_SWAP_PARTICIPANT_SCHEMA = [40 /* Address */];
function concat(...parts) {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
function sameBytes(a, b) {
  return a.length === b.length && a.every((byte, i) => byte === b[i]);
}
function computeOfferTerms(id, offer) {
  return sha256(concat(
    encodeUint64(id),
    offer.root,
    encodeUint64(offer.leaves),
    offer.participantsRoot,
    encodeUint64(offer.participantsLeaves),
    encodeUint64(offer.expiration)
  ));
}
function hyperSwapTradeTree(leaves) {
  return MerkleTree.of(
    leaves.map(({ from, receiver, asset, amount }) => [
      decodeAddress(from).publicKey,
      decodeAddress(receiver).publicKey,
      BigInt(asset),
      BigInt(amount)
    ]),
    HYPER_SWAP_TRADE_SCHEMA
  );
}
function hyperSwapParticipantTree(participants) {
  return MerkleTree.of(participants.map((address) => [decodeAddress(address).publicKey]), HYPER_SWAP_PARTICIPANT_SCHEMA);
}
function assertOfferLists(leaves, participants) {
  if (leaves.length === 0) throw new Error("HyperSwap offer has no trade leaves");
  if (participants.length === 0) throw new Error("HyperSwap offer has no participants");
  const leafKeys = leaves.map(({ from, receiver, asset, amount }) => `${from}|${receiver}|${BigInt(asset)}|${BigInt(amount)}`);
  if (new Set(leafKeys).size !== leafKeys.length) throw new Error("HyperSwap offer repeats a trade leaf");
  if (new Set(participants).size !== participants.length) throw new Error("HyperSwap offer repeats a participant");
  for (const { from } of leaves) {
    if (!participants.includes(from)) throw new Error(`HyperSwap leaf funder ${from} is not a participant`);
  }
}
function validateOffer({ id, offer, leaves, participants, now }) {
  assertOfferLists(leaves, participants);
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
  if (now !== void 0 && offer.expiration - now > HYPER_SWAP_MAX_OFFER_DURATION) {
    throw new Error("HyperSwap offer expiration exceeds the maximum offer duration");
  }
  return computeOfferTerms(id, offer);
}
function offerTermsFromLists({ id, leaves, participants, expiration }) {
  assertOfferLists(leaves, participants);
  return computeOfferTerms(id, {
    root: hyperSwapTradeTree(leaves).root,
    leaves: BigInt(leaves.length),
    participantsRoot: hyperSwapParticipantTree(participants).root,
    participantsLeaves: BigInt(participants.length),
    expiration: BigInt(expiration)
  });
}

export {
  HYPER_SWAP_MAX_OFFER_DURATION,
  HYPER_SWAP_TRADE_SCHEMA,
  HYPER_SWAP_PARTICIPANT_SCHEMA,
  computeOfferTerms,
  hyperSwapTradeTree,
  hyperSwapParticipantTree,
  validateOffer,
  offerTermsFromLists
};
//# sourceMappingURL=chunk-C5XM3R7G.mjs.map
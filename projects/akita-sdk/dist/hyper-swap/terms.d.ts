import { MerkleTree } from "../meta/tree";
import { SchemaPart } from "../meta/types";
import { HyperSwapLeaf, OfferValue } from "./types";
/** Longest an offer may stay open (contract `MaxOfferDuration`): 30 days, in seconds. */
export declare const HYPER_SWAP_MAX_OFFER_DURATION = 2592000n;
/** Schema of a trade leaf: (from, receiver, asset, amount). */
export declare const HYPER_SWAP_TRADE_SCHEMA: SchemaPart[];
/** Schema of a participant leaf: (address). */
export declare const HYPER_SWAP_PARTICIPANT_SCHEMA: SchemaPart[];
type TermsInput = Pick<OfferValue, "root" | "leaves" | "participantsRoot" | "participantsLeaves" | "expiration">;
/**
 * The terms commitment HyperSwap's `accept` requires:
 * sha256(id ‖ root ‖ leaves ‖ participantsRoot ‖ participantsLeaves ‖ expiration), integers as uint64.
 */
export declare function computeOfferTerms(id: bigint | number, offer: TermsInput): Uint8Array;
/** Builds the trade tree exactly as HyperSwap hashes leaves on-chain. Order matters. */
export declare function hyperSwapTradeTree(leaves: HyperSwapLeaf[]): MerkleTree<(bigint | Uint8Array<ArrayBufferLike>)[]>;
/** Builds the participant tree exactly as HyperSwap hashes participants on-chain. Order matters. */
export declare function hyperSwapParticipantTree(participants: string[]): MerkleTree<Uint8Array<ArrayBufferLike>[]>;
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
export declare function validateOffer({ id, offer, leaves, participants, now }: ValidateOfferParams): Uint8Array;
export type OfferTermsFromListsParams = {
    id: bigint | number;
    /** The complete, ordered trade leaf list shared by the offeror. */
    leaves: HyperSwapLeaf[];
    /** The complete, ordered participant list shared by the offeror. */
    participants: string[];
    /** The expiration the participant agreed to, in chain seconds. */
    expiration: bigint | number;
};
/**
 * The terms commitment of the offer the lists describe. Roots and counts come from the lists and
 * nothing is read from the chain, so the contract refuses the `accept` (terms mismatch) unless the
 * offer on chain declares exactly these leaves, these participants and this expiration. An offer
 * that under-declares its leaves can therefore never be accepted with terms built here.
 *
 * Throws if a list is empty, repeats a leaf or participant, or lists a funder who is not a
 * participant. Use `validateOffer` when the offer has been read and a precise reason is wanted.
 */
export declare function offerTermsFromLists({ id, leaves, participants, expiration }: OfferTermsFromListsParams): Uint8Array;
export {};

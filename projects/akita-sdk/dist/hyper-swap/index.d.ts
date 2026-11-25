import { BaseSDK } from "../base";
import { HyperSwapClient, HyperSwapArgs } from '../generated/HyperSwapClient';
import { NewContractSDKParams } from "../types";
import { OfferParams, AcceptParams, EscrowParams, DisburseParams, DisburseFromParams, DisburseAllParams, CancelParams, WithdrawParams, WithdrawForParams, OptInParams, GetOfferParams, OfferValue, HyperSwapMbrData } from "./types";
export * from "./errors";
export * from "./types";
export * from "./roots";
export * from "./terms";
export type HyperSwapContractArgs = HyperSwapArgs["obj"];
/**
 * SDK for interacting with the HyperSwap contract.
 * HyperSwap enables atomic multi-party trades using merkle tree proofs.
 */
export declare class HyperSwapSDK extends BaseSDK<HyperSwapClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Gets the MBR data for HyperSwap operations.
     */
    mbr(): Promise<HyperSwapMbrData>;
    /**
     * Gets an offer by its ID.
     */
    getOffer({ id }: GetOfferParams): Promise<OfferValue>;
    /**
     * The terms commitment the contract expects for an offer. Use it only to cross-check:
     * `accept` derives the commitment from the full lists and never takes it from here.
     */
    offerTerms({ id }: GetOfferParams): Promise<Uint8Array>;
    /**
     * Opts the HyperSwap contract into an asset.
     */
    optIn({ sender, signer, asset }: OptInParams): Promise<void>;
    /**
     * Creates a new offer for an atomic multi-party trade.
     */
    offer({ sender, signer, root, leaves, participantsRoot, participantsLeaves, expiration, }: OfferParams): Promise<void>;
    /**
     * Accepts an offer as a participant.
     *
     * Takes the full, ordered leaf and participant lists the offeror shared. The offer is read from
     * the chain and checked against them (`validateOffer`), and the terms commitment sent to the
     * contract is derived here. An offer that under-declares its leaves or participants, repeats
     * one, or does not match the lists is refused before anything is signed. There is no way to pass
     * a ready-made `terms` value through this method.
     */
    accept({ sender, signer, id, leaves, participants, proof }: AcceptParams): Promise<void>;
    /**
     * Escrows assets for a trade leaf.
     * Use `isAsa: true` and `asset` for ASA escrows, otherwise ALGO is used.
     */
    escrow({ sender, signer, id, receiver, amount, proof, isAsa, ...rest }: EscrowParams): Promise<void>;
    /**
     * Disburses assets for a trade leaf.
     * @param receiverWallet - The receiver's ARC58 wallet app ID (0 if not an ARC58 wallet)
     */
    disburse({ sender, signer, id, receiverWallet, receiver, asset, amount }: DisburseParams): Promise<void>;
    /**
     * Disburses any escrowed leaf. Anyone may call this once the offer is DISBURSING.
     */
    disburseFrom({ sender, signer, id, from, receiverWallet, receiver, asset, amount }: DisburseFromParams): Promise<void>;
    /**
     * Disburses every given leaf in one atomic group (at most 16), so either the whole swap
     * settles or nothing moves and a stuck leaf leaves the offer cancellable.
     */
    disburseAll({ sender, signer, id, leaves }: DisburseAllParams): Promise<void>;
    /**
     * Cancels an offer.
     */
    cancel({ sender, signer, id, proof }: CancelParams): Promise<void>;
    /**
     * Withdraws escrowed assets from a cancelled offer.
     */
    withdraw({ sender, signer, id, receiver, asset, amount, proof }: WithdrawParams): Promise<void>;
    /**
     * Returns an escrowed leaf of a cancelled offer to its funder (`from`). Anyone may call this, and the
     * leaf can only go back to the account that funded it. Once every leaf is returned the offer is
     * complete and its storage can be cleaned up, so no funder has to come back for the others to finish.
     */
    withdrawFor({ sender, signer, id, from, receiver, asset, amount }: WithdrawForParams): Promise<void>;
}

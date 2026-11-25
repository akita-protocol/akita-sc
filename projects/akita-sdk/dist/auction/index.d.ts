import { BaseSDK } from "../base";
import { AuctionClient, BidInfo } from '../generated/AuctionClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import type { GateCtx } from "../principal";
import { BidParams, RefundBidParams, FindWinnerParams, RefundMBRParams, ClearWeightsBoxesParams, GetBidParams, HasBidParams, AuctionState, AuctionMbrData } from "./types";
export * from "./factory";
/** rounds between the commit round and the round its beacon value can be read */
export declare const AUCTION_BEACON_LAG_ROUNDS = 4n;
/** Global key whose existence marks an auction (or raffle) child with the principal ABI (spec §6.6). */
export declare const SELLER_REFERRER_KEY = "seller_referrer";
/**
 * The gate context a hinted target verifies for a DIRECT (top-level) caller, who can only hint 0:
 * `{ principal: sender, wallet: 0, spender: sender }`. Pass it to `GateSDK.build.mustCheckFor`.
 * Plugins compute theirs on chain (`pluginPrincipalOf`); off chain use `akita-sdk/principal`.
 */
export declare function directGateCtx(sender: string): GateCtx;
export * from "./errors";
export * from "./types";
/**
 * SDK for interacting with an individual Auction contract.
 * Use this to place bids, refund bids, claim prizes, and manage auction state.
 */
export declare class AuctionSDK extends BaseSDK<AuctionClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Gets the current state of the auction.
     */
    state(): Promise<AuctionState>;
    /**
     * Whether this auction has the principal ABI (created by the Phase 2 factory: it holds
     * `seller_referrer`). Gated bids then take the hinted `gatedBid`/`gatedBidAsa` and a
     * `Gate.mustCheckFor` gate txn; older auctions keep `gatedBid(pay,appl,address)` and `Gate.mustCheck`.
     */
    usesPrincipalAbi(): Promise<boolean>;
    /**
     * Whether a gated bid with `gateTxn` takes the hinted overload: the auction has the principal ABI
     * and the gate txn is not a legacy `Gate.mustCheck` (callers that still build `mustCheck` keep the
     * registry semantics through the legacy shim, as with `MarketplaceSDK.purchase`).
     */
    private usesHintedGate;
    /**
     * Checks if the auction is currently live (accepting bids).
     */
    isLive(): Promise<boolean>;
    /**
     * Gets the MBR (Minimum Balance Requirement) data for bids on this auction (see `AuctionMbrData`).
     * Always read it from the auction: it depends on the auction's bid asset.
     */
    mbr(): Promise<AuctionMbrData>;
    /**
     * Gets a bid by its ID.
     */
    getBid({ bidId }: GetBidParams): Promise<BidInfo>;
    /**
     * Checks if an address has placed a bid.
     */
    hasBid({ address }: HasBidParams): Promise<boolean>;
    /**
     * Gets the minimum bid amount required for the next bid.
     */
    getMinimumBidAmount(): Promise<bigint>;
    /**
     * Places a bid in the auction.
     * Use `isAsa: true` and `bidAsset` for ASA bids, otherwise ALGO is used.
     * Provide `gateTxn` for gated auctions.
     */
    bid({ sender, signer, amount, marketplace, isAsa, gateTxn, wallet, ...rest }: BidParams): Promise<void>;
    /**
     * Refunds a specific bid (not the most recent one).
     */
    refundBid({ sender, signer, id }: RefundBidParams): Promise<void>;
    /**
     * Round from which the committed loser-raffle draw can be completed (`raffleRound + 4`), or 0n
     * if nothing has been committed yet. `raffleRound` is a multiple of 8, the rounds the beacon stores.
     */
    drawReadyRound(): Promise<bigint>;
    /**
     * Two-phase loser-raffle draw (commit-reveal), fee auctions only. After the end, the first
     * call excludes the winner's weight and either settles (no eligible losers) or commits to a
     * future round. Call again once the chain reaches `drawReadyRound()` to draw the ticket.
     */
    raffle(params?: MaybeSigner): Promise<void>;
    /**
     * Iterates to find the raffle winner based on the winning ticket.
     * May need to be called multiple times for large auctions.
     */
    findWinner({ sender, signer, iterationAmount }: FindWinnerParams): Promise<void>;
    /**
     * Claims the auction prize for the highest bidder.
     * Also distributes royalties to marketplace, creator, and Akita.
     */
    claimPrize(params?: MaybeSigner): Promise<void>;
    /**
     * Claims the raffle prize for the raffle winner (loser raffle).
     */
    claimRafflePrize(params?: MaybeSigner): Promise<void>;
    /**
     * Refunds MBR to auction participants after prizes are claimed.
     * May need to be called multiple times for large auctions.
     */
    refundMBR({ sender, signer, iterationAmount }: RefundMBRParams): Promise<void>;
    /**
     * Removes a fee auction's totals box and returns its storage to whoever funded the auction;
     * resolves to the amount returned (0 when there is nothing to remove). From 2.0.0 on the weights
     * boxes themselves are freed by `refundMBR`, so this runs after every bid's storage is refunded
     * (or before the start, for a seller who cancels), `iterationAmount` is ignored, and the call is
     * optional: deleting or cancelling the auction removes a totals box that is still there.
     * On an auction created before 2.0.0 it deletes `iterationAmount` reserved weights boxes.
     */
    clearWeightsBoxes({ sender, signer, iterationAmount }: ClearWeightsBoxesParams): Promise<bigint>;
}

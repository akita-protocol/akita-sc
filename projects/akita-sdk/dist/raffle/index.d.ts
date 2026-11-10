import { BaseSDK } from "../base";
import { RaffleClient, RaffleState, EntryData } from '../generated/RaffleClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import type { GateCtx } from "../principal";
import { EnterParams, AddParams, RefundMBRParams, FindWinnerParams, GetEntryParams, IsEnteredParams, GetEntryByAddressParams, GetEntryWithTicketsParams, GetEntryWithTicketsByAddressParams, RaffleMbrData, EntryWithTickets, SetMinEntriesParams } from "./types";
/** rounds between the commit round and the round its beacon value can be read */
export declare const RAFFLE_BEACON_LAG_ROUNDS = 4n;
/** Global key whose existence marks a raffle child with the principal ABI (spec §6.8). */
export declare const RAFFLE_SELLER_REFERRER_KEY = "seller_referrer";
/**
 * `getState` of raffles created before principal resolution (no `seller_referrer`; every live MainNet
 * raffle). The audit ride-along appended `minEntries`, `failed` and `raffleRound` to the return tuple,
 * so the selector changed and old children do not route the new one (compat finding 2).
 */
export declare const RAFFLE_LEGACY_GET_STATE = "getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)";
/**
 * `RaffleSDK.state()` result. `legacyAbi` is true for a pre-principal raffle: it has no `minEntries`,
 * `failed` or `raffleRound`, so those read `0n` / `false` / `0n` (it settles with at least one entry).
 */
export type RaffleSdkState = RaffleState & {
    legacyAbi: boolean;
};
/**
 * The gate context a hinted raffle method verifies for a DIRECT (top-level) caller, who can only
 * hint 0: `{ principal: sender, wallet: 0, spender: sender }`. Pass it to `GateSDK.build.mustCheckFor`.
 */
export declare function raffleDirectGateCtx(sender: string): GateCtx;
export * from "./errors";
export * from "./factory";
export * from "./types";
/**
 * SDK for interacting with an individual Raffle contract.
 * Use this to manage raffle entries, draw winners, and claim prizes.
 */
export declare class RaffleSDK extends BaseSDK<RaffleClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Gets the current state of the raffle.
     */
    state(): Promise<RaffleSdkState>;
    /** Reads a pre-principal raffle through its deployed `getState` selector (simulated, not sent). */
    private legacyState;
    /**
     * Whether this raffle has the principal ABI (created by the Phase 2 factory: it holds
     * `seller_referrer`). Gated calls then take the hinted overloads and a `Gate.mustCheckFor` gate txn;
     * older raffles keep the pre-principal gated methods and `Gate.mustCheck` (subject: the sender).
     */
    usesPrincipalAbi(): Promise<boolean>;
    /**
     * Creation-time referrer of the seller's verified wallet, paid when the prize is claimed
     * ('' on raffles created before the principal ABI).
     */
    sellerReferrer(): Promise<string>;
    /**
     * Checks if the raffle is currently live (accepting entries).
     */
    isLive(): Promise<boolean>;
    /**
     * Gets the MBR (Minimum Balance Requirement) data for raffle operations.
     */
    mbr(): Promise<RaffleMbrData>;
    /**
     * Gets an entry by its ID.
     */
    getEntry({ entryId }: GetEntryParams): Promise<EntryData>;
    /**
     * Checks if an address has entered the raffle.
     */
    isEntered({ address }: IsEnteredParams): Promise<boolean>;
    /**
     * Gets the entry ID for an address.
     */
    getEntryByAddress({ address }: GetEntryByAddressParams): Promise<bigint>;
    /**
     * Gets the ticket count for an entry from the weights boxmap.
     * @param entryId - The entry ID to look up
     * @returns The ticket count for the entry
     */
    getTicketCount({ entryId }: GetEntryWithTicketsParams): Promise<bigint>;
    /**
     * Gets an entry with its ticket count combined.
     * This is a convenience method that fetches both entry data and the ticket count
     * from the weights boxmap in a single call.
     */
    getEntryWithTickets({ entryId }: GetEntryWithTicketsParams): Promise<EntryWithTickets>;
    /**
     * Gets an entry with its ticket count by address.
     * This is a convenience method that looks up the entry ID by address,
     * then fetches both entry data and the ticket count.
     */
    getEntryWithTicketsByAddress({ address }: GetEntryWithTicketsByAddressParams): Promise<EntryWithTickets>;
    /**
     * Gets all entries with their ticket counts.
     * This fetches all entries and their corresponding ticket counts from the weights boxmap.
     * Note: For large raffles, this may require multiple reads.
     */
    getAllEntriesWithTickets(): Promise<EntryWithTickets[]>;
    /**
     * Enters the raffle with tickets.
     * Use `isAsa: true` and `ticketAsset` for ASA tickets, otherwise ALGO is used.
     */
    enter({ sender, signer, amount, marketplace, isAsa, gateTxn, wallet, ...rest }: EnterParams): Promise<void>;
    /**
     * Adds more tickets to an existing entry.
     * Use `isAsa: true` and `ticketAsset` for ASA tickets, otherwise ALGO is used.
     */
    add({ sender, signer, amount, isAsa, gateTxn, wallet, ...rest }: AddParams): Promise<void>;
    /**
     * Sets the minimum number of entries needed for the raffle to be drawn.
     * Seller only, before anyone has entered.
     */
    setMinEntries({ sender, signer, minEntries }: SetMinEntriesParams): Promise<void>;
    /**
     * Round from which the committed draw can be completed (`raffleRound + 4`), or 0n if nothing has
     * been committed yet. `raffleRound` is a multiple of 8, the rounds the beacon stores.
     */
    drawReadyRound(): Promise<bigint>;
    /**
     * Two-phase draw (commit-reveal). After the end, the first call either settles the raffle
     * (below minimum participation: prize back to the seller; one ticket: that ticket wins) or
     * commits to a future round. Call again once the chain reaches `drawReadyRound()` to draw.
     */
    raffle(params?: MaybeSigner): Promise<void>;
    /**
     * Iterates to find the winner based on the winning ticket.
     * May need to be called multiple times for large raffles.
     */
    findWinner({ sender, signer, iterationAmount }: FindWinnerParams): Promise<void>;
    /**
     * Claims the raffle prize for the winner.
     * Also distributes royalties to marketplace, creator, and Akita.
     */
    claimPrize(params?: MaybeSigner): Promise<void>;
    /**
     * Refunds MBR to raffle participants after the winner is found.
     * May need to be called multiple times for large raffles.
     */
    refundMBR({ sender, signer, iterationAmount }: RefundMBRParams): Promise<void>;
    /**
     * Clears the weights boxes after the prize has been claimed.
     * Returns the MBR for the weights boxes to the factory.
     */
    clearWeightsBoxes(params?: MaybeSigner): Promise<bigint>;
}

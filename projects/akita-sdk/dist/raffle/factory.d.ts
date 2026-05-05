import { BaseSDK } from "../base";
import { RaffleFactoryClient, RaffleFactoryArgs } from '../generated/RaffleFactoryClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { RaffleSDK } from "./index";
import { NewRaffleParams, DeleteRaffleParams, OptInParams } from "./types";
export type RaffleFactoryContractArgs = RaffleFactoryArgs["obj"];
/**
 * SDK for interacting with the Raffle Factory contract.
 * Used to create new raffles and manage raffle lifecycle.
 */
export declare class RaffleFactorySDK extends BaseSDK<RaffleFactoryClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Creates a new raffle and returns a RaffleSDK instance.
     * Use `isPrizeBox: true` with `prizeBoxId` for PrizeBox prizes,
     * or omit/set `isPrizeBox: false` with `prizeAsset` and `prizeAmount` for ASA prizes.
     * @returns RaffleSDK for the newly created raffle
     */
    newRaffle({ sender, signer, isPrizeBox, ticketAsset, startTimestamp, endTimestamp, minTickets, maxTickets, gateId, marketplace, weightsListCount, ...rest }: NewRaffleParams): Promise<RaffleSDK>;
    /**
     * Gets a RaffleSDK instance for an existing raffle.
     * @param appId - The app ID of the raffle
     * @returns RaffleSDK for the specified raffle
     */
    get({ appId }: {
        appId: bigint;
    }): RaffleSDK;
    /**
     * Checks if the rewards app is already opted into the given asset.
     * Returns 0n if opted in (no cost needed), 100_000n if not.
     */
    private getRewardsOptInCost;
    /**
     * Gets the cost to create a new raffle.
     * @param isPrizeBox - Whether the prize is a PrizeBox
     * @param isAlgoTicket - Whether tickets are paid in ALGO (ticketAsset === 0)
     * @param weightsListCount - Number of weights boxes
     * @param raffleCreationFee - Optional: the raffle creation fee from the DAO (default: 10 ALGO)
     * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
     * @param ticketRewardsOptInCost - Rewards app opt-in cost for the ticket asset (default: 100,000, pass 0 if already opted in)
     */
    cost({ isPrizeBox, isAlgoTicket, weightsListCount, raffleCreationFee, prizeRewardsOptInCost, ticketRewardsOptInCost }?: {
        isPrizeBox?: boolean;
        isAlgoTicket?: boolean;
        weightsListCount?: bigint | number;
        raffleCreationFee?: bigint;
        prizeRewardsOptInCost?: bigint;
        ticketRewardsOptInCost?: bigint;
    }): bigint;
    /**
     * Opts the raffle factory into an asset so it can receive/forward that
     * asset as a rewards referral or prize. When the factory has a named DAO
     * escrow configured, this also eagerly opts the escrow + every revenue-
     * split escrow in via the revenue-manager plugin, so downstream raffle
     * creations/entries don't have to do the rekey dance mid-group.
     *
     * Worst case touches ~10 foreign refs (DAO, wallet, plugin, main escrow,
     * N split escrows, the asset). Since a single app call only holds 8
     * foreign-ref slots, we wrap the optIn in a 2-app-call group (optIn +
     * one opUp) so the resource populator has 16 slots to distribute refs
     * across.
     */
    optIn({ sender, signer, asset }: OptInParams): Promise<void>;
    /**
     * Deletes a raffle created by this factory.
     * Can only be called after prize is claimed and all MBR is refunded.
     */
    deleteRaffle({ sender, signer, appId }: DeleteRaffleParams): Promise<void>;
    /**
     * Updates the Akita DAO reference.
     */
    updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & RaffleFactoryContractArgs['updateAkitaDAO(uint64)void']): Promise<void>;
    /**
     * Updates the Akita DAO Escrow reference.
     */
    updateAkitaDAOEscrow({ sender, signer, config }: MaybeSigner & RaffleFactoryContractArgs['updateAkitaDAOEscrow((string,uint64))void']): Promise<void>;
}
/**
 * Convenience function to create a new raffle and return the SDK.
 * Creates a factory SDK, creates the raffle, and returns the raffle SDK.
 */
export declare function newRaffle({ factoryParams, algorand, readerAccount, sendParams, ...raffleParams }: NewContractSDKParams & NewRaffleParams): Promise<RaffleSDK>;

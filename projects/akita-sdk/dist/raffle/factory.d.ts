import { BaseSDK } from "../base";
import { RaffleFactoryClient, RaffleFactoryArgs } from '../generated/RaffleFactoryClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { RaffleSDK } from "./index";
import { NewRaffleParams, DeleteRaffleParams, OptInParams, RaffleCostParams } from "./types";
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
     *
     * Sends only the principal-ABI (hinted) creation methods and pays the on-chain `newRaffleCost` quote.
     * The upgraded factory does not route the DEPLOYED creation selectors (no `minEntries`, no hint;
     * Kyle decision K6, 2026-10-04), and this SDK never sends them. Deployed-era behaviour: the
     * pre-upgrade MainNet factory (3569557743) has neither `newRaffleCost` nor the hinted methods, so
     * this SDK cannot create raffles there, and an older SDK cannot create raffles on the upgraded
     * factory. Ship this SDK in lockstep with the Phase 2 RaffleFactory upgrade.
     * @returns RaffleSDK for the newly created raffle
     */
    newRaffle({ sender, signer, isPrizeBox, ticketAsset, startTimestamp, endTimestamp, minTickets, maxTickets, minEntries, gateId, marketplace, weightsListCount, wallet, ...rest }: NewRaffleParams): Promise<RaffleSDK>;
    /**
     * Gets a RaffleSDK instance for an existing raffle.
     * @param appId - The app ID of the raffle
     * @returns RaffleSDK for the specified raffle
     */
    get({ appId }: {
        appId: bigint;
    }): RaffleSDK;
    /**
     * Gets the exact ALGO payment `newRaffle` requires, quoted on-chain by the factory
     * (`newRaffleCost`): creation fee + child program/state MBR + child funding + weights boxes.
     */
    cost({ isPrizeBox, prizeId, ticketAsset, weightsListCount }?: RaffleCostParams): Promise<bigint>;
    /**
     * Opts the raffle factory into an asset so it can receive/forward that
     * asset as a rewards referral or prize. When the factory has a named DAO
     * escrow configured, this also eagerly opts the escrow + every revenue-
     * split escrow in via the revenue-manager plugin, so downstream raffle
     * creations/entries don't have to do the rekey dance mid-group.
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

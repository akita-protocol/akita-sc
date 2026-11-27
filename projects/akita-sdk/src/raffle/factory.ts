import { microAlgo } from "@algorandfoundation/algokit-utils";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import {
  RaffleFactoryClient,
  RaffleFactoryFactory,
  RaffleFactoryArgs,
} from '../generated/RaffleFactoryClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { PrizeBoxFactorySDK } from "../prize-box";
import { RaffleSDK } from "./index";
import {
  NewRaffleParams,
  DeleteRaffleParams,
  OptInParams,
  RaffleCostParams,
} from "./types";

export type RaffleFactoryContractArgs = RaffleFactoryArgs["obj"];

/**
 * SDK for interacting with the Raffle Factory contract.
 * Used to create new raffles and manage raffle lifecycle.
 */
export class RaffleFactorySDK extends BaseSDK<RaffleFactoryClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: RaffleFactoryFactory, ...params }, ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID);
  }

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
  async newRaffle({
    sender,
    signer,
    isPrizeBox = false,
    ticketAsset,
    startTimestamp,
    endTimestamp,
    minTickets,
    maxTickets,
    minEntries = 0n,
    gateId,
    marketplace,
    weightsListCount = 4n,
    wallet = 0n,
    ...rest
  }: NewRaffleParams): Promise<RaffleSDK> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Exact creation cost, quoted on-chain by the factory (includes the DAO creation fee)
    const prizeId = isPrizeBox
      ? BigInt((rest as { prizeBoxId: bigint | number }).prizeBoxId)
      : BigInt((rest as { prizeAsset: bigint | number }).prizeAsset);
    const cost = await this.cost({ isPrizeBox, prizeId, ticketAsset, weightsListCount });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    let appId: bigint | undefined;

    if (isPrizeBox) {
      const { prizeBoxId } = rest as Extract<NewRaffleParams, { isPrizeBox: true }>;

      const prizeBoxSDK = new PrizeBoxFactorySDK({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];

      // principal ABI (spec §6.8): the factory stores the seller's verified referrer
      ({ return: appId } = await this.client.send.newPrizeBoxRaffle({
        ...sendParams,
        args: {
          prizeBoxTransferTxn,
          payment,
          ticketAsset,
          startTimestamp,
          endTimestamp,
          minTickets,
          maxTickets,
          minEntries,
          gateId,
          marketplace,
          weightsListCount,
          wallet: BigInt(wallet),
        },
      }));
    } else {
      const { prizeAsset, prizeAmount, name, proof } = rest as Exclude<NewRaffleParams, { isPrizeBox: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset),
        receiver: this.client.appAddress,
      });

      // principal ABI (spec §6.8): the factory stores the seller's verified referrer
      ({ return: appId } = await this.client.send.newRaffle({
        ...sendParams,
        args: {
          payment,
          assetXfer,
          ticketAsset,
          startTimestamp,
          endTimestamp,
          minTickets,
          maxTickets,
          minEntries,
          gateId,
          marketplace,
          name,
          proof,
          weightsListCount,
          wallet: BigInt(wallet),
        },
      }));
    }

    if (appId === undefined) {
      throw new Error('Failed to create new raffle');
    }

    return new RaffleSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer,
      },
    });
  }

  /**
   * Gets a RaffleSDK instance for an existing raffle.
   * @param appId - The app ID of the raffle
   * @returns RaffleSDK for the specified raffle
   */
  get({ appId }: { appId: bigint }): RaffleSDK {
    return new RaffleSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer,
      },
    });
  }

  /**
   * Gets the exact ALGO payment `newRaffle` requires, quoted on-chain by the factory
   * (`newRaffleCost`): creation fee + child program/state MBR + child funding + weights storage.
   */
  async cost({ isPrizeBox = false, prizeId = 0n, ticketAsset = 0n, weightsListCount = 4n }: RaffleCostParams = {}): Promise<bigint> {
    return await this.client.newRaffleCost({
      args: {
        isPrizeBox,
        prizeId: BigInt(prizeId),
        ticketAsset: BigInt(ticketAsset),
        weightsListCount: BigInt(weightsListCount),
      },
    });
  }

  /**
   * Opts the raffle factory into an asset so it can receive/forward that
   * asset as a rewards referral or prize. When the factory has a named DAO
   * escrow configured, this also eagerly opts the escrow + every revenue-
   * split escrow in via the revenue-manager plugin, so downstream raffle
   * creations/entries don't have to do the rekey dance mid-group.
   */
  async optIn({ sender, signer, asset }: OptInParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const cost = await this.client.optInCost({ args: { asset } });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    await this.client.send.optIn({
      ...sendParams,
      args: { payment, asset },
      maxFee: microAlgo(257_000),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    });
  }

  /**
   * Deletes a raffle created by this factory.
   * Can only be called after prize is claimed and all MBR is refunded.
   */
  async deleteRaffle({ sender, signer, appId }: DeleteRaffleParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.deleteRaffle({
      ...sendParams,
      args: { appId },
    });
  }

  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & RaffleFactoryContractArgs['updateAkitaDAO(uint64)void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao },
    });
  }

  /**
   * Updates the Akita DAO Escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, config }: MaybeSigner & RaffleFactoryContractArgs['updateAkitaDAOEscrow((string,uint64))void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { config },
    });
  }
}

/**
 * Convenience function to create a new raffle and return the SDK.
 * Creates a factory SDK, creates the raffle, and returns the raffle SDK.
 */
export async function newRaffle({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...raffleParams
}: NewContractSDKParams & NewRaffleParams): Promise<RaffleSDK> {
  const factory = new RaffleFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.newRaffle(raffleParams);
}

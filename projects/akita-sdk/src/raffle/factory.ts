import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
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
    gateId,
    marketplace,
    weightsListCount,
    ...rest
  }: NewRaffleParams): Promise<RaffleSDK> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get the cost for creating a new raffle, dynamically querying rewards opt-in state
    const isAlgoTicket = BigInt(ticketAsset) === 0n;
    const prizeId = isPrizeBox ? 0n : BigInt((rest as { prizeAsset: bigint | number }).prizeAsset);
    const [prizeRewardsOptInCost, ticketRewardsOptInCost] = await Promise.all([
      this.getRewardsOptInCost(prizeId),
      this.getRewardsOptInCost(BigInt(ticketAsset)),
    ]);
    const cost = this.cost({ isPrizeBox, isAlgoTicket, weightsListCount, prizeRewardsOptInCost, ticketRewardsOptInCost });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    const needsOpUp = BigInt(weightsListCount) > 0n;
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

      if (needsOpUp) {
        const group = this.client.newGroup();
        group.newPrizeBoxRaffle({
          ...sendParams,
          args: {
            prizeBoxTransferTxn,
            payment,
            ticketAsset,
            startTimestamp,
            endTimestamp,
            minTickets,
            maxTickets,
            gateId,
            marketplace,
            weightsListCount,
          },
        });
        for (let i = 0; i < 10; i++) {
          group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : undefined });
        }
        const result = await group.send(sendParams);
        appId = result.returns[0] as bigint | undefined;
      } else {
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
            gateId,
            marketplace,
            weightsListCount,
          },
        }));
      }
    } else {
      const { prizeAsset, prizeAmount, name, proof } = rest as Exclude<NewRaffleParams, { isPrizeBox: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset),
        receiver: this.client.appAddress,
      });

      if (needsOpUp) {
        const group = this.client.newGroup();
        group.newRaffle({
          ...sendParams,
          args: {
            payment,
            assetXfer,
            ticketAsset,
            startTimestamp,
            endTimestamp,
            minTickets,
            maxTickets,
            gateId,
            marketplace,
            name,
            proof,
            weightsListCount,
          },
        });
        for (let i = 0; i < 10; i++) {
          group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : undefined });
        }
        const result = await group.send(sendParams);
        appId = result.returns[0] as bigint | undefined;
      } else {
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
            gateId,
            marketplace,
            name,
            proof,
            weightsListCount,
          },
        }));
      }
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
   * Checks if the rewards app is already opted into the given asset.
   * Returns 0n if opted in (no cost needed), 100_000n if not.
   */
  private async getRewardsOptInCost(assetId: bigint | number): Promise<bigint> {
    const asset = BigInt(assetId);
    if (asset === 0n) return 0n;

    try {
      const akitaDaoAppId = await this.client.state.global.akitaDao();
      if (!akitaDaoAppId) return 100_000n;

      const algod = this.algorand.client.algod;
      const daoApp = await algod.getApplicationByID(akitaDaoAppId).do();
      const globalState = daoApp.params.globalState;
      if (!globalState) return 100_000n;

      // Find the 'aal' (akitaAppList) key in AkitaDAO global state
      const aalKey = new TextEncoder().encode('aal');
      const aalEntry = globalState.find(
        (kv) => kv.key.length === aalKey.length && kv.key.every((b, i) => b === aalKey[i])
      );
      if (!aalEntry || aalEntry.value.type !== 1) return 100_000n;

      // Extract rewards app ID (2nd uint64 in ABI-encoded AkitaAppList, bytes 8-15)
      const aalBytes = aalEntry.value.bytes;
      if (aalBytes.length < 16) return 100_000n;
      const view = new DataView(aalBytes.buffer, aalBytes.byteOffset, aalBytes.byteLength);
      const rewardsAppId = view.getBigUint64(8);
      if (rewardsAppId === 0n) return 100_000n;

      // Check if rewards app address is already opted into the asset
      const rewardsAddress = algosdk.getApplicationAddress(rewardsAppId).toString();
      const response = await algod.accountAssetInformation(rewardsAddress, asset).do();
      return response.assetHolding ? 0n : 100_000n;
    } catch {
      // If any lookup fails (e.g. 404 not opted in), assume cost is needed
      return 100_000n;
    }
  }

  /**
   * Gets the cost to create a new raffle.
   * @param isPrizeBox - Whether the prize is a PrizeBox
   * @param isAlgoTicket - Whether tickets are paid in ALGO (ticketAsset === 0)
   * @param weightsListCount - Number of weights boxes
   * @param raffleCreationFee - Optional: the raffle creation fee from the DAO (default: 10 ALGO)
   * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
   * @param ticketRewardsOptInCost - Rewards app opt-in cost for the ticket asset (default: 100,000, pass 0 if already opted in)
   */
  cost({ isPrizeBox = false, isAlgoTicket = true, weightsListCount = 1n, raffleCreationFee = 10_000_000n, prizeRewardsOptInCost = 100_000n, ticketRewardsOptInCost = 100_000n }: { isPrizeBox?: boolean, isAlgoTicket?: boolean, weightsListCount?: bigint | number, raffleCreationFee?: bigint, prizeRewardsOptInCost?: bigint, ticketRewardsOptInCost?: bigint } = {}): bigint {
    // Base cost: MAX_PROGRAM_PAGES + (GLOBAL_STATE_KEY_UINT_COST * globalUints) + (GLOBAL_STATE_KEY_BYTES_COST * globalBytes)
    const baseCost = 1_427_000n;
    const minBalance = 100_000n;
    const assetOptInMinBalance = 100_000n;
    const weightsMbr = 13_113_300n; // per weights box
    const perDisbursement = 60_600n; // MinDisbursementsMBR + UserAllocationMBR

    // Calculate optinMBR
    let optinMbr = 0n;
    if (!isPrizeBox) {
      optinMbr += assetOptInMinBalance; // For prize asset
    }
    if (!isAlgoTicket) {
      optinMbr += assetOptInMinBalance; // For ticket asset
    }

    // Calculate disbursement MBR
    // 1 for referral (in ticket asset), 1 for prize (when not prize box)
    // up to 4 for ASA ticket payments (creator, marketplace x2, seller)
    // 3 for prize box (no creator royalty)
    let disbursementMbr = 0n;
    if (!isPrizeBox) {
      disbursementMbr += perDisbursement + prizeRewardsOptInCost; // prize
      if (isAlgoTicket) {
        disbursementMbr += perDisbursement; // referral (ALGO)
      } else {
        disbursementMbr += perDisbursement * 5n + ticketRewardsOptInCost; // referral + 4 ASA payments
      }
    } else if (isAlgoTicket) {
      disbursementMbr = perDisbursement; // referral (ALGO)
    } else {
      disbursementMbr = perDisbursement * 4n + ticketRewardsOptInCost; // referral + 3 ASA payments
    }

    const childAppMbr = minBalance + optinMbr + disbursementMbr;
    const weightsMbrTotal = BigInt(weightsListCount) * weightsMbr;

    return raffleCreationFee + baseCost + childAppMbr + weightsMbrTotal;
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
  async updateAkitaDAOEscrow({ sender, signer, app }: MaybeSigner & RaffleFactoryContractArgs['updateAkitaDAOEscrow(uint64)void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { app },
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

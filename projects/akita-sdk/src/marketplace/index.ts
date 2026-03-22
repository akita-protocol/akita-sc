import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import {
  MarketplaceClient,
  MarketplaceFactory,
  MarketplaceArgs,
} from '../generated/MarketplaceClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { ListingSDK } from "./listing";
import {
  ListParams,
  PurchaseParams,
  DelistParams,
} from "./types";
import { PrizeBoxFactorySDK } from "../prize-box";

export * from "./listing";
export * from "./types";

export type MarketplaceContractArgs = MarketplaceArgs["obj"];

/**
 * SDK for interacting with the Marketplace contract.
 * Use this to create listings, purchase items, and delist items.
 */
export class MarketplaceSDK extends BaseSDK<MarketplaceClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: MarketplaceFactory, ...params }, ENV_VAR_NAMES.MARKETPLACE_APP_ID);
  }

  // ========== Factory/Listing Methods ==========

  /**
   * Creates a new listing and returns a ListingSDK instance.
   * Can list either an ASA or a PrizeBox based on the `isPrizeBox` flag.
   * @returns ListingSDK for the newly created listing
   */
  async list({
    sender,
    signer,
    isPrizeBox = false,
    price,
    paymentAsset,
    expiration,
    reservedFor,
    gateId,
    marketplace,
    ...rest
  }: ListParams): Promise<ListingSDK> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get the cost for creating a new listing, dynamically querying rewards opt-in state
    const isAlgoPayment = BigInt(paymentAsset) === 0n;
    const prizeId = isPrizeBox ? 0n : BigInt((rest as { asset: bigint | number }).asset);
    const [prizeRewardsOptInCost, paymentRewardsOptInCost] = await Promise.all([
      this.getRewardsOptInCost(prizeId),
      this.getRewardsOptInCost(BigInt(paymentAsset)),
    ]);
    const cost = this.listCost({ isPrizeBox, isAlgoPayment, prizeRewardsOptInCost, paymentRewardsOptInCost });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    let appId: bigint | undefined;

    if (isPrizeBox) {
      const { prizeBoxId } = rest as Extract<ListParams, { isPrizeBox: true }>;

      const prizeBoxSDK = new PrizeBoxFactorySDK({ algorand: this.algorand, factoryParams: {}}).get({ appId: BigInt(prizeBoxId) })
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];

      ({ return: appId } = await this.client.send.listPrizeBox({
        ...sendParams,
        args: {
          prizeBoxTransferTxn,
          payment,
          price,
          paymentAsset,
          expiration,
          reservedFor,
          gateId,
          marketplace,
        },
      }));
    } else {
      const { asset, amount, name, proof } = rest as Exclude<ListParams, { isPrizeBox: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress,
      });

      ({ return: appId } = await this.client.send.list({
        ...sendParams,
        args: {
          payment,
          assetXfer,
          price,
          paymentAsset,
          expiration,
          reservedFor,
          gateId,
          marketplace,
          name,
          proof,
        },
      }));
    }

    if (appId === undefined) {
      throw new Error('Failed to create new listing');
    }

    return new ListingSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer,
      },
    });
  }

  /**
   * Gets a ListingSDK instance for an existing listing.
   * @param appId - The app ID of the listing
   * @returns ListingSDK for the specified listing
   */
  getListing({ appId }: { appId: bigint }): ListingSDK {
    return new ListingSDK({
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
   * Gets the cost to create a new listing.
   * @param isPrizeBox - Whether the prize is a PrizeBox
   * @param isAlgoPayment - Whether the listing will accept ALGO as payment
   * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
   * @param paymentRewardsOptInCost - Rewards app opt-in cost for the payment asset (default: 100,000, pass 0 if already opted in)
   */
  listCost({ isPrizeBox = false, isAlgoPayment = true, prizeRewardsOptInCost = 100_000n, paymentRewardsOptInCost = 100_000n, escrowOptInCost = 0n }: { isPrizeBox?: boolean, isAlgoPayment?: boolean, prizeRewardsOptInCost?: bigint, paymentRewardsOptInCost?: bigint, escrowOptInCost?: bigint } = {}): bigint {
    // Base cost: MIN_PROGRAM_PAGES + (GLOBAL_STATE_KEY_UINT_COST * globalUints) + (GLOBAL_STATE_KEY_BYTES_COST * globalBytes)
    const baseCost = 635_000n;
    const minBalance = 100_000n;
    const assetOptInMinBalance = 100_000n;
    const perDisbursement = 60_600n; // MinDisbursementsMBR + UserAllocationMBR

    // Asset opt-in MBR for the child contract
    const optinMbr = isPrizeBox
      ? (isAlgoPayment ? 0n : assetOptInMinBalance)
      : (isAlgoPayment ? assetOptInMinBalance : assetOptInMinBalance * 2n);

    // Disbursement MBR
    let disbursementMbr = 0n;
    if (!isPrizeBox) {
      // 1 prize + 1 referral + (4 ASA payments if ASA)
      disbursementMbr += perDisbursement + prizeRewardsOptInCost; // prize
      if (isAlgoPayment) {
        disbursementMbr += perDisbursement; // referral (ALGO)
      } else {
        disbursementMbr += perDisbursement * 5n + paymentRewardsOptInCost; // referral + 4 ASA payments
      }
    } else {
      // 1 referral + (3 ASA payments if ASA)
      if (isAlgoPayment) {
        disbursementMbr = perDisbursement; // referral (ALGO)
      } else {
        disbursementMbr = perDisbursement * 4n + paymentRewardsOptInCost; // referral + 3 ASA payments
      }
    }

    // Escrow opt-in cost for ASA payments (factory opts escrow into payment asset)
    const escrowCost = isAlgoPayment ? 0n : escrowOptInCost;

    return baseCost + minBalance + optinMbr + disbursementMbr + escrowCost;
  }

  // ========== Purchase Methods ==========

  /**
   * Purchases a listing.
   * Use `isAsa: true` with `paymentAsset` and `paymentAmount` for ASA payments, otherwise ALGO is used.
   * Provide `gateTxn` for gated listings.
   */
  async purchase({
    sender,
    signer,
    listingAppId,
    marketplace,
    isAsa = false,
    gateTxn,
    ...rest
  }: PurchaseParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Use opUps to handle app reference limits (royalty distribution, DAO access, etc.)
    const group = this.client.newGroup();

    if (isAsa) {
      const { paymentAsset, paymentAmount } = rest as Extract<PurchaseParams, { isAsa: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(paymentAmount),
        assetId: BigInt(paymentAsset),
        receiver: this.client.appAddress,
      });

      if (gateTxn) {
        group.gatedPurchaseAsa({
          ...sendParams,
          args: {
            assetXfer,
            gateTxn,
            appId: listingAppId,
            marketplace,
          },
        });
      } else {
        group.purchaseAsa({
          ...sendParams,
          args: {
            assetXfer,
            appId: listingAppId,
            marketplace,
          },
        });
      }
    } else {
      // Get listing to determine price for ALGO purchases
      const listing = this.getListing({ appId: BigInt(listingAppId) });
      const listingState = await listing.state();

      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(listingState.price),
        receiver: this.client.appAddress,
      });

      if (gateTxn) {
        group.gatedPurchase({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            appId: listingAppId,
            marketplace,
          },
        });
      } else {
        group.purchase({
          ...sendParams,
          args: {
            payment,
            appId: listingAppId,
            marketplace,
          },
        });
      }
    }

    // Add opUps to increase app reference limit
    // purchase + payment (and possibly assetXfer) = 2-3 transactions, so we can add up to 13-14 opUps
    for (let i = 0; i < 10; i++) {
      group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : undefined });
    }

    await group.send(sendParams);
  }

  // ========== Delist Methods ==========

  /**
   * Removes a listing and returns the asset to the seller.
   * Can only be called by the seller.
   */
  async delist({ sender, signer, appId }: DelistParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.delist({
      ...sendParams,
      args: { appId },
    });
  }

  // ========== Admin Methods ==========

  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & MarketplaceContractArgs['updateAkitaDAO(uint64)void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao },
    });
  }

  /**
   * Updates the Akita DAO Escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, app }: MaybeSigner & MarketplaceContractArgs['updateAkitaDAOEscrow(uint64)void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { app },
    });
  }
}

/**
 * Convenience function to create a new listing and return the SDK.
 * Creates a marketplace SDK, creates the listing, and returns the listing SDK.
 */
export async function newListing({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...listParams
}: NewContractSDKParams & ListParams): Promise<ListingSDK> {
  const marketplace = new MarketplaceSDK({ factoryParams, algorand, readerAccount, sendParams });
  return await marketplace.list(listParams);
}


import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import {
  PrizeBoxClient,
  PrizeBoxFactory,
} from '../generated/PrizeBoxClient';
import {
  PrizeBoxFactoryClient,
  PrizeBoxFactoryFactory,
  PrizeBoxFactoryArgs,
} from '../generated/PrizeBoxFactoryClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import {
  MintParams,
  OptInParams,
  TransferParams,
  WithdrawParams,
  PrizeBoxState,
} from "./types";

export * from "./errors";
export * from "./types";

/**
 * SDK for interacting with an individual PrizeBox contract.
 * PrizeBoxes hold multiple assets that can be transferred as a bundle.
 */
export class PrizeBoxSDK extends BaseSDK<PrizeBoxClient> {

  /** The PrizeBoxFactory that created this box (set by PrizeBoxFactorySDK.get / mint). */
  public factoryAppId?: bigint;

  constructor(params: NewContractSDKParams & { factoryAppId?: bigint }) {
    super({ factory: PrizeBoxFactory, ...params });
    this.factoryAppId = params.factoryAppId;
  }

  // ========== Read Methods ==========

  /**
   * Gets the current state of the prize box.
   */
  async state(): Promise<PrizeBoxState> {
    const state = await this.client.state.global.getAll();

    return {
      owner: state.owner?.toString() ?? '',
      optinCount: state.optinCount ?? 0n,
    };
  }

  /**
   * Gets the owner of the prize box.
   */
  async owner(): Promise<string> {
    const prizeBoxState = await this.state();
    return prizeBoxState.owner;
  }

  // ========== Write Methods ==========

  /**
   * Opts the prize box into an asset.
   * Can only be called by the owner.
   */
  async optIn({ sender, signer, asset }: OptInParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(100_000), // Asset opt-in MBR
      receiver: this.client.appAddress,
    });

    await this.client.send.optin({
      ...sendParams,
      args: {
        payment,
        asset,
      },
    });
  }

  /**
   * Transfers ownership of the prize box to a new owner.
   * Can only be called by the current owner.
   */
  async transfer({ sender, signer, newOwner }: TransferParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    await this.client.send.transfer({
      ...sendParams,
      args: { newOwner },
    });
  }

  /**
   * Withdraws assets from the prize box.
   * Can only be called by the owner.
   */
  async withdraw({ sender, signer, assets }: WithdrawParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Format assets as tuples [assetId, amount]
    const assetsTuple: [bigint, bigint][] = assets.map(a => [BigInt(a.asset), BigInt(a.amount)]);

    await this.client.send.withdraw({
      ...sendParams,
      args: { assets: assetsTuple },
    });
  }

  /**
   * Deletes the prize box. Can only be called by the owner when the box is empty
   * (optinCount === 0). The box account (min balance) closes to the owner and the
   * creation MBR is refunded to the minter.
   *
   * Current boxes are deleted through `PrizeBoxFactory.deletePrizeBox`; legacy boxes
   * (minted before funder tracking, no `funder` state) still use their own
   * owner-callable `deleteApplication()`.
   */
  async delete(params?: MaybeSigner & { factoryAppId?: bigint }): Promise<void> {
    const sendParams = this.getSendParams(params);

    const state = await this.client.state.global.getAll();
    if (state.funder === undefined) {
      await this.client.algorand.send.appDeleteMethodCall({
        ...sendParams,
        sender: sendParams.sender!,
        appId: this.client.appId,
        method: algosdk.ABIMethod.fromSignature('deleteApplication()void'),
        args: [],
      });
      return;
    }

    const factoryAppId = params?.factoryAppId ?? this.factoryAppId;
    if (factoryAppId === undefined) {
      throw new Error('PrizeBoxSDK.delete: factoryAppId is required (use PrizeBoxFactorySDK.deletePrizeBox)');
    }

    const factory = new PrizeBoxFactorySDK({
      algorand: this.algorand,
      factoryParams: { appId: factoryAppId, defaultSender: sendParams.sender, defaultSigner: sendParams.signer },
    });
    await factory.deletePrizeBox({ ...sendParams, appId: this.client.appId });
  }
}

export type PrizeBoxFactoryContractArgs = PrizeBoxFactoryArgs["obj"];

/**
 * SDK for interacting with the PrizeBox Factory contract.
 * Used to create new prize boxes.
 */
export class PrizeBoxFactorySDK extends BaseSDK<PrizeBoxFactoryClient> {

  constructor(params: NewContractSDKParams) {
    // The env var name also selects the baked-in network id. Without it, `new PrizeBoxFactorySDK({ factoryParams: {} })`
    // (the Raffle/Auction/Marketplace prize-box creation paths) threw "No app ID provided" on every network.
    super({ factory: PrizeBoxFactoryFactory, ...params }, ENV_VAR_NAMES.PRIZE_BOX_FACTORY_APP_ID);
  }

  /**
   * Creates a new prize box and returns a PrizeBoxSDK instance.
   * @returns PrizeBoxSDK for the newly created prize box
   */
  async mint({ sender, signer, owner }: MintParams): Promise<PrizeBoxSDK> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get the cost for creating a new prize box
    const cost = this.cost();

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    const { return: appId } = await this.client.send.mint({
      ...sendParams,
      args: {
        payment,
        owner,
      },
    });

    if (appId === undefined) {
      throw new Error('Failed to create new prize box');
    }

    return new PrizeBoxSDK({
      algorand: this.algorand,
      factoryAppId: this.client.appId,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer,
      },
    });
  }

  /**
   * Deletes an empty prize box owned by `sender`: the box account closes to the owner and
   * the creation MBR is refunded to the minter.
   */
  async deletePrizeBox({ sender, signer, appId }: MaybeSigner & { appId: bigint }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.deletePrizeBox({
      ...sendParams,
      args: { appId },
    });
  }

  /**
   * Gets a PrizeBoxSDK instance for an existing prize box.
   * @param appId - The app ID of the prize box
   * @returns PrizeBoxSDK for the specified prize box
   */
  get({ appId }: { appId: bigint }): PrizeBoxSDK {
    return new PrizeBoxSDK({
      algorand: this.algorand,
      factoryAppId: this.client.appId,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer,
      },
    });
  }

  /**
   * Gets the cost to create a new prize box.
   * Based on: MIN_PROGRAM_PAGES + (GLOBAL_STATE_KEY_UINT_COST * globalUints) + (GLOBAL_STATE_KEY_BYTES_COST * globalBytes) + Global.minBalance
   */
  cost(): bigint {
    // PrizeBox schema: 1 uint (optinCount) + 2 bytes (owner, funder)
    // 100,000 (1 page) + 28,500 + 2 * 50,000 = 228,500 creation MBR + minBalance (100,000)
    return 328_500n;
  }
}

/**
 * Convenience function to create a new prize box and return the SDK.
 */
export async function newPrizeBox({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...mintParams
}: NewContractSDKParams & MintParams): Promise<PrizeBoxSDK> {
  const factory = new PrizeBoxFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.mint(mintParams);
}

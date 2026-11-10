import { microAlgo } from "@algorandfoundation/algokit-utils";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import {
  HyperSwapClient,
  HyperSwapFactory,
  HyperSwapArgs,
} from '../generated/HyperSwapClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import {
  OfferParams,
  AcceptParams,
  EscrowParams,
  DisburseParams,
  DisburseFromParams,
  DisburseAllParams,
  CancelParams,
  WithdrawParams,
  OptInParams,
  GetOfferParams,
  OfferValue,
  HyperSwapMbrData,
} from "./types";

export * from "./errors";
export * from "./types";
export * from "./roots";
export * from "./terms";

export type HyperSwapContractArgs = HyperSwapArgs["obj"];

/**
 * SDK for interacting with the HyperSwap contract.
 * HyperSwap enables atomic multi-party trades using merkle tree proofs.
 */
export class HyperSwapSDK extends BaseSDK<HyperSwapClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: HyperSwapFactory, ...params }, ENV_VAR_NAMES.HYPER_SWAP_APP_ID);
  }

  // ========== Read Methods ==========

  /**
   * Gets the MBR data for HyperSwap operations.
   */
  async mbr(): Promise<HyperSwapMbrData> {
    const mbr = await this.client.mbr();

    return {
      offers: mbr.offers,
      participants: mbr.participants,
      hashes: mbr.hashes,
      mm: {
        root: mbr.mm.root,
        data: mbr.mm.data,
      },
    };
  }

  /**
   * Gets an offer by its ID.
   */
  async getOffer({ id }: GetOfferParams): Promise<OfferValue> {
    const offer = await this.client.state.box.offers.value(id);

    if (offer === undefined) {
      throw new Error(`Offer ${id} not found`);
    }

    return {
      state: Number(offer.state),
      root: offer.root,
      leaves: offer.leaves,
      escrowed: offer.escrowed,
      participantsRoot: offer.participantsRoot,
      participantsLeaves: offer.participantsLeaves,
      acceptances: offer.acceptances,
      expiration: offer.expiration,
    };
  }

  /**
   * The terms commitment the contract expects for an offer. Use it only to cross-check:
   * participants must derive `terms` themselves with `validateOffer`.
   */
  async offerTerms({ id }: GetOfferParams): Promise<Uint8Array> {
    const result = await this.client.offerTerms({ args: { id } });
    return new Uint8Array(result);
  }

  // ========== Write Methods ==========

  /**
   * Opts the HyperSwap contract into an asset.
   */
  async optIn({ sender, signer, asset }: OptInParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(100_000), // Asset opt-in MBR
      receiver: this.client.appAddress,
    });

    await this.client.send.optIn({
      ...sendParams,
      args: {
        payment,
        asset,
      },
    });
  }

  /**
   * Creates a new offer for an atomic multi-party trade.
   */
  async offer({
    sender,
    signer,
    root,
    leaves,
    participantsRoot,
    participantsLeaves,
    expiration,
  }: OfferParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const mbrData = await this.mbr();
    const metaMerklesCost = mbrData.mm.root + mbrData.mm.data;
    const totalMbr = mbrData.offers + mbrData.participants + (metaMerklesCost * 2n);

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(totalMbr),
      receiver: this.client.appAddress,
    });

    await this.client.send.offer({
      ...sendParams,
      args: {
        payment,
        root,
        leaves,
        participantsRoot,
        participantsLeaves,
        expiration,
      },
    });
  }

  /**
   * Accepts an offer as a participant. `terms` must come from `validateOffer`, computed against
   * the full leaf and participant lists, so an offer that under-declares its leaves is refused.
   */
  async accept({ sender, signer, id, proof, terms }: AcceptParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const mbrData = await this.mbr();

    const mbrPayment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(mbrData.participants),
      receiver: this.client.appAddress,
    });

    await this.client.send.accept({
      ...sendParams,
      args: {
        mbrPayment,
        id,
        proof,
        terms,
      },
    });
  }

  /**
   * Escrows assets for a trade leaf.
   * Use `isAsa: true` and `asset` for ASA escrows, otherwise ALGO is used.
   */
  async escrow({
    sender,
    signer,
    id,
    receiver,
    amount,
    proof,
    isAsa = false,
    ...rest
  }: EscrowParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const mbrData = await this.mbr();

    if (isAsa) {
      const { asset } = rest as Extract<EscrowParams, { isAsa: true }>;

      const group = this.client.newGroup();
      const holdings = await this.client.algorand.account.getInformation(this.client.appAddress);
      if (!holdings.assets?.some((holding) => holding.assetId === BigInt(asset))) {
        group.optIn({
          ...sendParams,
          args: {
            payment: this.client.algorand.createTransaction.payment({
              ...sendParams, receiver: this.client.appAddress, amount: microAlgo(100_000),
            }),
            asset,
          },
        });
      }
      const recipient = await this.client.algorand.account.getInformation(receiver);
      const recipientOptIn = recipient.assets?.some((holding) => holding.assetId === BigInt(asset)) ? 0n : 100_000n;
      const mbrPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(mbrData.hashes + recipientOptIn),
        receiver: this.client.appAddress,
      });

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress,
      });

      group.escrowAsa({
        ...sendParams,
        args: {
          mbrPayment,
          assetXfer,
          id,
          receiver,
          asset,
          amount,
          proof,
        },
      });
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(BigInt(amount) + mbrData.hashes),
        receiver: this.client.appAddress,
      });

      await this.client.send.escrow({
        ...sendParams,
        args: {
          payment,
          id,
          receiver,
          amount,
          proof,
        },
      });
    }
  }

  /**
   * Disburses assets for a trade leaf.
   * @param receiverWallet - The receiver's ARC58 wallet app ID (0 if not an ARC58 wallet)
   */
  async disburse({ sender, signer, id, receiverWallet, receiver, asset, amount }: DisburseParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.disburse({
      ...sendParams,
      args: {
        id,
        receiverWallet,
        receiver,
        asset,
        amount,
      },
    });
  }

  /**
   * Disburses any escrowed leaf. Anyone may call this once the offer is DISBURSING.
   */
  async disburseFrom({ sender, signer, id, from, receiverWallet, receiver, asset, amount }: DisburseFromParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.disburseFrom({
      ...sendParams,
      args: { id, from, receiverWallet, receiver, asset, amount },
    });
  }

  /**
   * Disburses every given leaf in one atomic group (at most 16), so either the whole swap
   * settles or nothing moves and a stuck leaf leaves the offer cancellable.
   */
  async disburseAll({ sender, signer, id, leaves }: DisburseAllParams): Promise<void> {
    if (leaves.length === 0) return;
    if (leaves.length > 16) throw new Error('disburseAll supports at most 16 leaves per atomic group');
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const group = this.client.newGroup();
    for (const { from, receiver, asset, amount, receiverWallet } of leaves) {
      group.disburseFrom({
        ...sendParams,
        args: { id, from, receiverWallet: receiverWallet ?? 0n, receiver, asset, amount },
      });
    }
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /**
   * Cancels an offer.
   */
  async cancel({ sender, signer, id, proof }: CancelParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.cancel({
      ...sendParams,
      args: {
        id,
        proof,
      },
    });
  }

  /**
   * Withdraws escrowed assets from a cancelled offer.
   */
  async withdraw({ sender, signer, id, receiver, asset, amount, proof }: WithdrawParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.withdraw({
      ...sendParams,
      args: {
        id,
        receiver,
        asset,
        amount,
        proof,
      },
    });
  }
}

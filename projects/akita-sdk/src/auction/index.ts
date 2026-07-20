import { microAlgo } from "@algorandfoundation/algokit-utils";
import { BaseSDK } from "../base";
import {
  AuctionClient,
  AuctionFactory,
  BidInfo,
} from '../generated/AuctionClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import {
  BidParams,
  RefundBidParams,
  FindWinnerParams,
  RefundMBRParams,
  ClearWeightsBoxesParams,
  GetBidParams,
  HasBidParams,
  AuctionState,
  AuctionMbrData,
} from "./types";

export * from "./factory";
export * from "./errors";
export * from "./types";

/**
 * SDK for interacting with an individual Auction contract.
 * Use this to place bids, refund bids, claim prizes, and manage auction state.
 */
export class AuctionSDK extends BaseSDK<AuctionClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: AuctionFactory, ...params });
  }

  // ========== Read Methods ==========

  /**
   * Gets the current state of the auction.
   */
  async state(): Promise<AuctionState> {
    const state = await this.client.state.global.getAll();

    return {
      prize: state.prize ?? 0n,
      isPrizeBox: state.isPrizeBox as unknown as boolean ?? false,
      prizeClaimed: state.prizeClaimed as unknown as boolean ?? false,
      bidAsset: state.bidAsset ?? 0n,
      bidFee: state.bidFee ?? 0n,
      startingBid: state.startingBid ?? 0n,
      bidMinimumIncrease: state.bidMinimumIncrease ?? 0n,
      startTimestamp: state.startTimestamp ?? 0n,
      endTimestamp: state.endTimestamp ?? 0n,
      seller: state.seller?.toString() ?? '',
      creatorRoyalty: state.creatorRoyalty ?? 0n,
      marketplace: state.marketplace?.toString() ?? '',
      marketplaceRoyalties: state.marketplaceRoyalties ?? 0n,
      gateId: state.gateId ?? 0n,
      vrfFailureCount: state.vrfFailureCount ?? 0n,
      refundCount: state.refundCount ?? 0n,
      bidTotal: state.bidTotal ?? 0n,
      weightedBidTotal: state.weightedBidTotal ?? 0n,
      highestBid: state.highestBid ?? 0n,
      bidID: state.bidId ?? 0n,
      raffleAmount: state.raffleAmount ?? 0n,
      rafflePrizeClaimed: state.rafflePrizeClaimed as unknown as boolean ?? false,
      uniqueAddressCount: state.uniqueAddressCount ?? 0n,
      weightsBoxCount: state.weightsBoxCount ?? 0n,
      winningTicket: state.winningTicket ?? 0n,
      raffleWinner: state.raffleWinner?.toString() ?? '',
      raffleRound: state.raffleRound ?? 0n,
    };
  }

  /**
   * Checks if the auction is currently live (accepting bids).
   */
  async isLive(): Promise<boolean> {
    const isLive = await this.client.isLive();
    return isLive ?? false;
  }

  /**
   * Gets the MBR (Minimum Balance Requirement) data for auction operations.
   * These are constant values defined in the auction contract.
   */
  async mbr(): Promise<AuctionMbrData> {
    return this.client.mbr();
  }

  /**
   * Gets a bid by its ID.
   */
  async getBid({ bidId }: GetBidParams): Promise<BidInfo> {
    const bid = await this.client.state.box.bids.value(bidId);

    if (bid === undefined) {
      throw new Error(`Bid ${bidId} not found`);
    }

    return bid;
  }

  /**
   * Checks if an address has placed a bid.
   */
  async hasBid({ address }: HasBidParams): Promise<boolean> {
    const hasBid = await this.client.hasBid({ args: { address } });
    return hasBid ?? false;
  }

  /**
   * Gets the minimum bid amount required for the next bid.
   */
  async getMinimumBidAmount(): Promise<bigint> {
    const state = await this.state();
    if (state.highestBid > 0n) {
      return state.highestBid + state.bidMinimumIncrease;
    }
    return state.startingBid;
  }

  // ========== Write Methods ==========

  /**
   * Places a bid in the auction.
   * Use `isAsa: true` and `bidAsset` for ASA bids, otherwise ALGO is used.
   * Provide `gateTxn` for gated auctions.
   */
  async bid({
    sender,
    signer,
    amount,
    marketplace,
    isAsa = false,
    gateTxn,
    ...rest
  }: BidParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get MBR costs
    const { bids, bidsByAddress, locations } = await this.mbr();
    const auctionState = await this.state();
    
    let mbrCost = bids;
    // Check if first time bidder - always need bidsByAddress MBR
    const hasBidResult = await this.hasBid({ address: sendParams.sender.toString() });
    if (!hasBidResult) {
      mbrCost += bidsByAddress;
      // Only need locations MBR if bidFee > 0
      if (auctionState.bidFee > 0n) {
        mbrCost += locations;
      }
    }

    if (isAsa) {
      const { bidAsset } = rest as Extract<BidParams, { isAsa: true }>;

      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(mbrCost),
        receiver: this.client.appAddress,
      });

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(bidAsset),
        receiver: this.client.appAddress,
      });

      if (gateTxn) {
        await this.client.send.gatedBidAsa({
          ...sendParams,
          args: { payment, assetXfer, gateTxn, marketplace },
        });
      } else {
        await this.client.send.bidAsa({
          ...sendParams,
          args: { payment, assetXfer, marketplace },
        });
      }
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(BigInt(amount) + mbrCost),
        receiver: this.client.appAddress,
      });

      if (gateTxn) {
        await this.client.send.gatedBid({
          ...sendParams,
          args: { payment, gateTxn, marketplace },
        });
      } else {
        await this.client.send.bid({
          ...sendParams,
          args: { payment, marketplace },
        });
      }
    }
  }

  /**
   * Refunds a specific bid (not the most recent one).
   */
  async refundBid({ sender, signer, id }: RefundBidParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.refundBid({
      ...sendParams,
      args: { id },
    });
  }

  /**
   * Triggers the raffle to draw the winning ticket number.
   * Only applicable for auctions with bid fees (loser raffle).
   */
  async raffle(params?: MaybeSigner): Promise<void> {
    const sendParams = this.getSendParams(params);

    await this.client.send.raffle({
      ...sendParams,
      args: {},
    });
  }

  /**
   * Iterates to find the raffle winner based on the winning ticket.
   * May need to be called multiple times for large auctions.
   */
  async findWinner({ sender, signer, iterationAmount }: FindWinnerParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.findWinner({
      ...sendParams,
      args: { iterationAmount },
    });
  }

  /**
   * Claims the auction prize for the highest bidder.
   * Also distributes royalties to marketplace, creator, and Akita.
   */
  async claimPrize(params?: MaybeSigner): Promise<void> {
    const sendParams = this.getSendParams(params);

    await this.client.send.claimPrize({
      ...sendParams,
      args: {},
    });
  }

  /**
   * Claims the raffle prize for the raffle winner (loser raffle).
   */
  async claimRafflePrize(params?: MaybeSigner): Promise<void> {
    const sendParams = this.getSendParams(params);

    await this.client.send.claimRafflePrize({
      ...sendParams,
      args: {},
    });
  }

  /**
   * Refunds MBR to auction participants after prizes are claimed.
   * May need to be called multiple times for large auctions.
   */
  async refundMBR({ sender, signer, iterationAmount }: RefundMBRParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.refundMbr({
      ...sendParams,
      args: { iterationAmount },
    });
  }

  /**
   * Clears the weights boxes after all prizes have been claimed.
   * Returns the MBR for the weights boxes to the factory.
   */
  async clearWeightsBoxes({ sender, signer, iterationAmount }: ClearWeightsBoxesParams): Promise<bigint> {
    const sendParams = this.getSendParams({ sender, signer });

    const { return: returnAmount } = await this.client.send.clearWeightsBoxes({
      ...sendParams,
      args: { iterationAmount },
    });

    if (returnAmount === undefined) {
      throw new Error('Failed to clear weights boxes');
    }

    return returnAmount;
  }
}

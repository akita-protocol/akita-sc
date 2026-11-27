import { MaybeSigner } from "../types";
import { AuctionArgs, BidInfo, FindWinnerCursors, FunderInfo } from '../generated/AuctionClient';
import { AuctionFactoryArgs } from '../generated/AuctionFactoryClient';
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
export { BidInfo, FindWinnerCursors, FunderInfo };
type FactoryContractArgs = AuctionFactoryArgs["obj"];
/**
 * Principal-resolution wallet hint (docs/principal-resolution/PHASE-0-SPEC.md §2): the ARC-58 wallet the
 * call acts for, or 0 (default) to act as the sender itself. A direct (top-level) call can only pass 0:
 * any other value reverts with `errHtop`; plugins pass their own window (`windowHint`).
 */
export type WalletHint = {
    wallet?: bigint | number;
};
/**
 * `weightsListCount` no longer sizes anything from 2.0.0 on: a fee auction's weights storage grows
 * with its bidders, so there is no bidder limit to choose and nothing to reserve. The factory only
 * needs it above 0 for an auction with a bid fee and 0 for one without. Leave it out and the SDK
 * passes 3 for a fee auction (also valid on an earlier factory) and 0 otherwise.
 */
export type WeightsListCount = {
    weightsListCount?: bigint | number;
};
export type NewAuctionParams = MaybeSigner & WalletHint & WeightsListCount & Omit<FactoryContractArgs['newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64'], 'payment' | 'assetXfer' | 'weightsListCount'> & ({
    isPrizeBox: true;
    prizeBoxId: bigint | number;
} | {
    isPrizeBox: false;
    prizeAsset: bigint | number;
    prizeAmount: bigint | number;
});
export type NewPrizeBoxAuctionParams = MaybeSigner & WalletHint & WeightsListCount & Omit<FactoryContractArgs['newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64'], 'payment' | 'weightsListCount'>;
export type DeleteAuctionParams = MaybeSigner & FactoryContractArgs['deleteAuctionApp(uint64)void'];
export type CancelAuctionParams = MaybeSigner & FactoryContractArgs['cancelAuction(uint64)void'];
type AuctionContractArgs = AuctionArgs["obj"];
export type InitAuctionParams = MaybeSigner & Omit<AuctionContractArgs['init(pay,uint64)void'], 'payment'>;
type BaseBidParams = MaybeSigner & WalletHint & {
    /** The amount to bid */
    amount: bigint | number;
    /** Marketplace address for referrals */
    marketplace: string;
    /**
     * Optional gate transaction for gated auctions. On an auction with the principal ABI
     * (`AuctionSDK.usesPrincipalAbi()`), build it with `GateSDK.build.mustCheckFor` and the context the
     * auction verifies (a direct caller: `directGateCtx(sender)`); on older auctions with
     * `GateSDK.build.mustCheck` and the sender as caller. A `mustCheck` gate txn always takes the
     * legacy (registry-subject) overload, also on principal-ABI children.
     */
    gateTxn?: AppCallMethodCall;
};
export type BidParams = BaseBidParams & ({
    /** Whether bidding with ASA (true) or ALGO (false/undefined) */
    isAsa?: false;
} | {
    /** Whether bidding with ASA (true) or ALGO (false/undefined) */
    isAsa: true;
    /** The bid asset ID (required when isAsa is true) */
    bidAsset: bigint | number;
});
export type RefundBidParams = MaybeSigner & AuctionContractArgs['refundBid(uint64)void'];
export type FindWinnerParams = MaybeSigner & AuctionContractArgs['findWinner(uint64)void'];
export type RefundMBRParams = MaybeSigner & AuctionContractArgs['refundMBR(uint64)void'];
export type ClearWeightsBoxesParams = MaybeSigner & AuctionContractArgs['clearWeightsBoxes(uint64)uint64'];
export type ClaimPrizeParams = MaybeSigner;
export type ClaimRafflePrizeParams = MaybeSigner;
export type RaffleParams = MaybeSigner;
export type GetBidParams = {
    /** The bid ID to look up */
    bidId: bigint | number;
};
export type HasBidParams = {
    /** The address to check */
    address: string;
};
export type AuctionState = {
    prize: bigint;
    isPrizeBox: boolean;
    prizeClaimed: boolean;
    bidAsset: bigint;
    bidFee: bigint;
    startingBid: bigint;
    bidMinimumIncrease: bigint;
    startTimestamp: bigint;
    endTimestamp: bigint;
    seller: string;
    creatorRoyalty: bigint;
    marketplace: string;
    marketplaceRoyalties: bigint;
    gateId: bigint;
    vrfFailureCount: bigint;
    refundCount: bigint;
    bidTotal: bigint;
    weightedBidTotal: bigint;
    highestBid: bigint;
    bidID: bigint;
    raffleAmount: bigint;
    rafflePrizeClaimed: boolean;
    uniqueAddressCount: bigint;
    weightsBoxCount: bigint;
    winningTicket: bigint;
    raffleWinner: string;
    raffleRound: bigint;
    /**
     * Creation-time referrer of the seller's verified wallet, paid at settlement ('' on auctions created
     * before the principal ABI, which still pay the seller's registry referrer).
     */
    sellerReferrer: string;
};
/**
 * What `AuctionSDK.mbr()` returns for one auction, all of it refundable:
 * - `bids`: every bid (on an ASA auction this includes the deposit that pays for the bid's refund
 *   if its bidder leaves the bid asset)
 * - `bidsByAddress`: added to an address's first bid
 * - `locations`: added to an address's first bid in a fee auction (its location box and its slot in
 *   the weights storage)
 * - `weights`: the totals box of a fee auction, funded by the seller at creation
 */
export type AuctionMbrData = {
    bids: bigint;
    weights: bigint;
    bidsByAddress: bigint;
    locations: bigint;
};
export type OptInParams = MaybeSigner & {
    asset: bigint | number;
};

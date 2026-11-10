import { BaseSDK } from "../../base";
import { AuctionPluginArgs, AuctionPluginClient } from "../../generated/AuctionPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = AuctionPluginArgs["obj"];
type HookArgs<K extends keyof ContractArgs> = (Omit<ContractArgs[K], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type NewAuctionArgs = HookArgs<'new(uint64,bool,uint64,uint64,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64'>;
type ListPrizeBoxArgs = HookArgs<'listPrizeBox(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64'>;
type BidArgs = HookArgs<'bid(uint64,bool,uint64,uint64,byte[][],address)void'>;
type ClaimPrizeArgs = HookArgs<'claimPrize(uint64,bool,uint64)void'>;
type ClaimRafflePrizeArgs = HookArgs<'claimRafflePrize(uint64,bool,uint64)void'>;
type RefundBidArgs = HookArgs<'refundBid(uint64,bool,uint64,uint64)void'>;
type RefundMBRArgs = HookArgs<'refundMBR(uint64,bool,uint64,uint64)void'>;
type RaffleArgs = HookArgs<'raffle(uint64,bool,uint64)void'>;
type FindWinnerArgs = HookArgs<'findWinner(uint64,bool,uint64,uint64)void'>;
type ClearWeightsBoxesArgs = HookArgs<'clearWeightsBoxes(uint64,bool,uint64,uint64)void'>;
type DeleteAuctionAppArgs = HookArgs<'deleteAuctionApp(uint64,bool,uint64)void'>;
type CancelArgs = HookArgs<'cancel(uint64,bool,uint64)void'>;
/**
 * SDK hooks for AuctionPlugin v2. Every method returns a plugin hook; called without
 * arguments it only yields the method selector (for installing method restrictions).
 */
export declare class AuctionPluginSDK extends BaseSDK<AuctionPluginClient> {
    constructor(params: NewContractSDKParams);
    private makeHook;
    new(): PluginSDKReturn;
    new(args: NewAuctionArgs): PluginSDKReturn;
    listPrizeBox(): PluginSDKReturn;
    listPrizeBox(args: ListPrizeBoxArgs): PluginSDKReturn;
    bid(): PluginSDKReturn;
    bid(args: BidArgs): PluginSDKReturn;
    claimPrize(): PluginSDKReturn;
    claimPrize(args: ClaimPrizeArgs): PluginSDKReturn;
    claimRafflePrize(): PluginSDKReturn;
    claimRafflePrize(args: ClaimRafflePrizeArgs): PluginSDKReturn;
    refundBid(): PluginSDKReturn;
    refundBid(args: RefundBidArgs): PluginSDKReturn;
    refundMBR(): PluginSDKReturn;
    refundMBR(args: RefundMBRArgs): PluginSDKReturn;
    /** two-phase draw: first call (after the end) commits to a future round, a later call draws */
    raffle(): PluginSDKReturn;
    raffle(args: RaffleArgs): PluginSDKReturn;
    findWinner(): PluginSDKReturn;
    findWinner(args: FindWinnerArgs): PluginSDKReturn;
    clearWeightsBoxes(): PluginSDKReturn;
    clearWeightsBoxes(args: ClearWeightsBoxesArgs): PluginSDKReturn;
    deleteAuctionApp(): PluginSDKReturn;
    deleteAuctionApp(args: DeleteAuctionAppArgs): PluginSDKReturn;
    cancel(): PluginSDKReturn;
    cancel(args: CancelArgs): PluginSDKReturn;
}
export {};

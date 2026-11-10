type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { AuctionPluginArgs, AuctionPluginClient, AuctionPluginFactory } from "../../generated/AuctionPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

type ContractArgs = AuctionPluginArgs["obj"];

type HookArgs<K extends keyof ContractArgs> = (
  Omit<ContractArgs[K], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

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
export class AuctionPluginSDK extends BaseSDK<AuctionPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: AuctionPluginFactory, ...params });
  }

  private makeHook<A extends MaybeSigner & { rekeyBack?: boolean }>(methodName: string, args?: A): PluginSDKReturn {
    const appId = this.client.appId;
    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];

    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({ appId, selectors, getTxns });
    }

    const { sender, signer, rekeyBack: rekeyBackArg, ...rest } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = rekeyBackArg ?? true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = await (this.client.params as any)[methodName]({
          ...sendParams,
          args: { wallet, rekeyBack, ...rest },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  new(): PluginSDKReturn;
  new(args: NewAuctionArgs): PluginSDKReturn;
  new(args?: NewAuctionArgs): PluginSDKReturn {
    return this.makeHook('new', args);
  }

  listPrizeBox(): PluginSDKReturn;
  listPrizeBox(args: ListPrizeBoxArgs): PluginSDKReturn;
  listPrizeBox(args?: ListPrizeBoxArgs): PluginSDKReturn {
    return this.makeHook('listPrizeBox', args);
  }

  bid(): PluginSDKReturn;
  bid(args: BidArgs): PluginSDKReturn;
  bid(args?: BidArgs): PluginSDKReturn {
    return this.makeHook('bid', args);
  }

  claimPrize(): PluginSDKReturn;
  claimPrize(args: ClaimPrizeArgs): PluginSDKReturn;
  claimPrize(args?: ClaimPrizeArgs): PluginSDKReturn {
    return this.makeHook('claimPrize', args);
  }

  claimRafflePrize(): PluginSDKReturn;
  claimRafflePrize(args: ClaimRafflePrizeArgs): PluginSDKReturn;
  claimRafflePrize(args?: ClaimRafflePrizeArgs): PluginSDKReturn {
    return this.makeHook('claimRafflePrize', args);
  }

  refundBid(): PluginSDKReturn;
  refundBid(args: RefundBidArgs): PluginSDKReturn;
  refundBid(args?: RefundBidArgs): PluginSDKReturn {
    return this.makeHook('refundBid', args);
  }

  refundMBR(): PluginSDKReturn;
  refundMBR(args: RefundMBRArgs): PluginSDKReturn;
  refundMBR(args?: RefundMBRArgs): PluginSDKReturn {
    return this.makeHook('refundMBR', args);
  }

  /** two-phase draw: first call (after the end) commits to a future round, a later call draws */
  raffle(): PluginSDKReturn;
  raffle(args: RaffleArgs): PluginSDKReturn;
  raffle(args?: RaffleArgs): PluginSDKReturn {
    return this.makeHook('raffle', args);
  }

  findWinner(): PluginSDKReturn;
  findWinner(args: FindWinnerArgs): PluginSDKReturn;
  findWinner(args?: FindWinnerArgs): PluginSDKReturn {
    return this.makeHook('findWinner', args);
  }

  clearWeightsBoxes(): PluginSDKReturn;
  clearWeightsBoxes(args: ClearWeightsBoxesArgs): PluginSDKReturn;
  clearWeightsBoxes(args?: ClearWeightsBoxesArgs): PluginSDKReturn {
    return this.makeHook('clearWeightsBoxes', args);
  }

  deleteAuctionApp(): PluginSDKReturn;
  deleteAuctionApp(args: DeleteAuctionAppArgs): PluginSDKReturn;
  deleteAuctionApp(args?: DeleteAuctionAppArgs): PluginSDKReturn {
    return this.makeHook('deleteAuctionApp', args);
  }

  cancel(): PluginSDKReturn;
  cancel(args: CancelArgs): PluginSDKReturn;
  cancel(args?: CancelArgs): PluginSDKReturn {
    return this.makeHook('cancel', args);
  }
}

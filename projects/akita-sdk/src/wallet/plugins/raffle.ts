type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { RafflePluginArgs, RafflePluginClient, RafflePluginFactory } from "../../generated/RafflePluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";

type ContractArgs = RafflePluginArgs["obj"];

type HookArgs<K extends keyof ContractArgs> = (
  Omit<ContractArgs[K], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

/**
 * `newRaffle` / `newPrizeBoxRaffle` exist twice on RafflePlugin v3: the DEPLOYED signature (MainNet
 * 3569561863, no `minEntries`; grants and old wrappers carry over, spec §6.11 / §7.3) and an overload
 * that also sets `minEntries` (AR-C). The hook sends the deployed form unless `minEntries > 0`.
 */
export const RAFFLE_PLUGIN_NEW_RAFFLE = 'newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64' as const;
export const RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES = 'newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64' as const;
export const RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE = 'newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64' as const;
export const RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES = 'newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64' as const;

type NewRaffleArgs = Omit<HookArgs<typeof RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES>, 'minEntries'> & { minEntries?: bigint | number };
type NewPrizeBoxRaffleArgs = Omit<HookArgs<typeof RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES>, 'minEntries'> & { minEntries?: bigint | number };

/** generated-client `params` keys of the overloads */
const PARAMS_KEY: Record<string, string> = {
  [RAFFLE_PLUGIN_NEW_RAFFLE]: 'newRaffleUint64BoolUint64Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressStringByte_32Uint64Uint64',
  [RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES]: 'newRaffleUint64BoolUint64Uint64Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressStringByte_32Uint64Uint64',
  [RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE]: 'newPrizeBoxRaffleUint64BoolUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64',
  [RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES]: 'newPrizeBoxRaffleUint64BoolUint64Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64',
};
type EnterArgs = HookArgs<'enter(uint64,bool,uint64,uint64,address,byte[][])void'>;
type AddArgs = HookArgs<'add(uint64,bool,uint64,uint64,byte[][])void'>;
type SetMinEntriesArgs = HookArgs<'setMinEntries(uint64,bool,uint64,uint64)void'>;
type RaffleArgs = HookArgs<'raffle(uint64,bool,uint64)void'>;
type FindWinnerArgs = HookArgs<'findWinner(uint64,bool,uint64,uint64)void'>;
type ClaimRafflePrizeArgs = HookArgs<'claimRafflePrize(uint64,bool,uint64)void'>;
type RefundMBRArgs = HookArgs<'refundMBR(uint64,bool,uint64,uint64)void'>;
type ClearWeightsBoxesArgs = HookArgs<'clearWeightsBoxes(uint64,bool,uint64)void'>;
type DeleteRaffleApplicationArgs = HookArgs<'deleteRaffleApplication(uint64,bool,uint64)void'>;

/**
 * SDK hooks for RafflePlugin v3 (and the deployed generation). Every method returns a plugin hook; called without
 * arguments it only yields the method selector (for installing method restrictions).
 */
export class RafflePluginSDK extends BaseSDK<RafflePluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: RafflePluginFactory, ...params });
  }

  /**
   * `methodName` is a method name or, for an overloaded method, its full signature. Without `args`
   * the hook carries the selectors of every name in `restrictTo` (default: just `methodName`).
   */
  private makeHook<A extends MaybeSigner & { rekeyBack?: boolean }>(methodName: string, args?: A, restrictTo: string[] = [methodName]): PluginSDKReturn {
    const appId = this.client.appId;

    if (args === undefined) {
      const selectors = restrictTo.map((m) => this.client.appClient.getABIMethod(m).getSelector());
      return (_spendingAddress?: ReadableAddress) => ({ appId, selectors, getTxns });
    }

    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];
    const paramsKey = PARAMS_KEY[methodName] ?? methodName;

    const { sender, signer, rekeyBack: rekeyBackArg, ...rest } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = rekeyBackArg ?? true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = await (this.client.params as any)[paramsKey]({
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

  /**
   * Without arguments: the selectors of BOTH overloads (for method restrictions). With arguments:
   * the deployed form when `minEntries` is absent or 0 (works on every plugin generation), the
   * `minEntries` overload otherwise (RafflePlugin v3 only).
   */
  newRaffle(): PluginSDKReturn;
  newRaffle(args: NewRaffleArgs): PluginSDKReturn;
  newRaffle(args?: NewRaffleArgs): PluginSDKReturn {
    const both = [RAFFLE_PLUGIN_NEW_RAFFLE, RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES];
    if (args === undefined) return this.makeHook(RAFFLE_PLUGIN_NEW_RAFFLE, undefined, both);
    const { minEntries, ...rest } = args;
    return BigInt(minEntries ?? 0) > 0n
      ? this.makeHook(RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES, { ...rest, minEntries })
      : this.makeHook(RAFFLE_PLUGIN_NEW_RAFFLE, rest);
  }

  /** See `newRaffle` (same overload rule). */
  newPrizeBoxRaffle(): PluginSDKReturn;
  newPrizeBoxRaffle(args: NewPrizeBoxRaffleArgs): PluginSDKReturn;
  newPrizeBoxRaffle(args?: NewPrizeBoxRaffleArgs): PluginSDKReturn {
    const both = [RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE, RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES];
    if (args === undefined) return this.makeHook(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE, undefined, both);
    const { minEntries, ...rest } = args;
    return BigInt(minEntries ?? 0) > 0n
      ? this.makeHook(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES, { ...rest, minEntries })
      : this.makeHook(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE, rest);
  }

  /** pass non-empty `args` (gate args) to enter a gated raffle */
  enter(): PluginSDKReturn;
  enter(args: EnterArgs): PluginSDKReturn;
  enter(args?: EnterArgs): PluginSDKReturn {
    return this.makeHook('enter', args);
  }

  add(): PluginSDKReturn;
  add(args: AddArgs): PluginSDKReturn;
  add(args?: AddArgs): PluginSDKReturn {
    return this.makeHook('add', args);
  }

  setMinEntries(): PluginSDKReturn;
  setMinEntries(args: SetMinEntriesArgs): PluginSDKReturn;
  setMinEntries(args?: SetMinEntriesArgs): PluginSDKReturn {
    return this.makeHook('setMinEntries', args);
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

  claimRafflePrize(): PluginSDKReturn;
  claimRafflePrize(args: ClaimRafflePrizeArgs): PluginSDKReturn;
  claimRafflePrize(args?: ClaimRafflePrizeArgs): PluginSDKReturn {
    return this.makeHook('claimRafflePrize', args);
  }

  refundMBR(): PluginSDKReturn;
  refundMBR(args: RefundMBRArgs): PluginSDKReturn;
  refundMBR(args?: RefundMBRArgs): PluginSDKReturn {
    return this.makeHook('refundMBR', args);
  }

  clearWeightsBoxes(): PluginSDKReturn;
  clearWeightsBoxes(args: ClearWeightsBoxesArgs): PluginSDKReturn;
  clearWeightsBoxes(args?: ClearWeightsBoxesArgs): PluginSDKReturn {
    return this.makeHook('clearWeightsBoxes', args);
  }

  deleteRaffleApplication(): PluginSDKReturn;
  deleteRaffleApplication(args: DeleteRaffleApplicationArgs): PluginSDKReturn;
  deleteRaffleApplication(args?: DeleteRaffleApplicationArgs): PluginSDKReturn {
    return this.makeHook('deleteRaffleApplication', args);
  }
}

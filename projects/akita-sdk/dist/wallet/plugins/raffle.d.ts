import { BaseSDK } from "../../base";
import { RafflePluginArgs, RafflePluginClient } from "../../generated/RafflePluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = RafflePluginArgs["obj"];
type HookArgs<K extends keyof ContractArgs> = (Omit<ContractArgs[K], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
/**
 * `newRaffle` / `newPrizeBoxRaffle` exist twice on RafflePlugin v3: the DEPLOYED signature (MainNet
 * 3569561863, no `minEntries`; grants and old wrappers carry over, spec §6.11 / §7.3) and an overload
 * that also sets `minEntries` (AR-C). The hook sends the deployed form unless `minEntries > 0`.
 */
export declare const RAFFLE_PLUGIN_NEW_RAFFLE: "newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64";
export declare const RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES: "newRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64";
export declare const RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE: "newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64";
export declare const RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES: "newPrizeBoxRaffle(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64";
type NewRaffleArgs = Omit<HookArgs<typeof RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES>, 'minEntries'> & {
    minEntries?: bigint | number;
};
type NewPrizeBoxRaffleArgs = Omit<HookArgs<typeof RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES>, 'minEntries'> & {
    minEntries?: bigint | number;
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
export declare class RafflePluginSDK extends BaseSDK<RafflePluginClient> {
    constructor(params: NewContractSDKParams);
    /**
     * `methodName` is a method name or, for an overloaded method, its full signature. Without `args`
     * the hook carries the selectors of every name in `restrictTo` (default: just `methodName`).
     */
    private makeHook;
    /**
     * Without arguments: the selectors of BOTH overloads (for method restrictions). With arguments:
     * the deployed form when `minEntries` is absent or 0 (works on every plugin generation), the
     * `minEntries` overload otherwise (RafflePlugin v3 only).
     */
    newRaffle(): PluginSDKReturn;
    newRaffle(args: NewRaffleArgs): PluginSDKReturn;
    /** See `newRaffle` (same overload rule). */
    newPrizeBoxRaffle(): PluginSDKReturn;
    newPrizeBoxRaffle(args: NewPrizeBoxRaffleArgs): PluginSDKReturn;
    /** pass non-empty `args` (gate args) to enter a gated raffle */
    enter(): PluginSDKReturn;
    enter(args: EnterArgs): PluginSDKReturn;
    add(): PluginSDKReturn;
    add(args: AddArgs): PluginSDKReturn;
    setMinEntries(): PluginSDKReturn;
    setMinEntries(args: SetMinEntriesArgs): PluginSDKReturn;
    /** two-phase draw: first call (after the end) commits to a future round, a later call draws */
    raffle(): PluginSDKReturn;
    raffle(args: RaffleArgs): PluginSDKReturn;
    findWinner(): PluginSDKReturn;
    findWinner(args: FindWinnerArgs): PluginSDKReturn;
    claimRafflePrize(): PluginSDKReturn;
    claimRafflePrize(args: ClaimRafflePrizeArgs): PluginSDKReturn;
    refundMBR(): PluginSDKReturn;
    refundMBR(args: RefundMBRArgs): PluginSDKReturn;
    clearWeightsBoxes(): PluginSDKReturn;
    clearWeightsBoxes(args: ClearWeightsBoxesArgs): PluginSDKReturn;
    deleteRaffleApplication(): PluginSDKReturn;
    deleteRaffleApplication(args: DeleteRaffleApplicationArgs): PluginSDKReturn;
}
export {};

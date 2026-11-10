import { BaseSDK } from "../../base";
import { HyperSwapPluginArgs, HyperSwapPluginClient } from "../../generated/HyperSwapPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
import { HyperSwapLeaf } from "../../hyper-swap/types";
type ContractArgs = HyperSwapPluginArgs["obj"];
type OfferArgs = (Omit<ContractArgs['offer(uint64,bool,byte[32],uint64,byte[32],uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
/**
 * Accepting takes the full, ordered lists and the agreed expiration instead of a `terms` value.
 * The commitment is derived from them (`offerTermsFromLists`), so the contract refuses the accept
 * unless the offer on chain declares exactly these leaves and participants (readiness audit
 * 2026-11-09, C11).
 */
type AcceptArgs = (Omit<ContractArgs['accept(uint64,bool,uint64,byte[32][],byte[32])void'], 'wallet' | 'rekeyBack' | 'terms'> & MaybeSigner & {
    rekeyBack?: boolean;
    /** The complete, ordered trade leaf list shared by the offeror. */
    leaves: HyperSwapLeaf[];
    /** The complete, ordered participant list shared by the offeror. */
    participants: string[];
    /** The expiration the participant agreed to, in chain seconds. */
    expiration: bigint | number;
});
type EscrowArgs = (Omit<ContractArgs['escrow(uint64,bool,uint64,address,uint64,uint64,byte[32][])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type DisburseArgs = (Omit<ContractArgs['disburse(uint64,bool,uint64,uint64,address,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type CancelArgs = (Omit<ContractArgs['cancel(uint64,bool,uint64,byte[32][])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type WithdrawArgs = (Omit<ContractArgs['withdraw(uint64,bool,uint64,address,uint64,uint64,byte[32][])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class HyperSwapPluginSDK extends BaseSDK<HyperSwapPluginClient> {
    constructor(params: NewContractSDKParams);
    offer(): PluginSDKReturn;
    offer(args: OfferArgs): PluginSDKReturn;
    accept(): PluginSDKReturn;
    accept(args: AcceptArgs): PluginSDKReturn;
    escrow(): PluginSDKReturn;
    escrow(args: EscrowArgs): PluginSDKReturn;
    disburse(): PluginSDKReturn;
    disburse(args: DisburseArgs): PluginSDKReturn;
    cancel(): PluginSDKReturn;
    cancel(args: CancelArgs): PluginSDKReturn;
    withdraw(): PluginSDKReturn;
    withdraw(args: WithdrawArgs): PluginSDKReturn;
}
export {};

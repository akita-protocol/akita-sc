import { BaseSDK } from "../../base";
import { ZeroSignalPluginArgs, ZeroSignalPluginClient } from "../../generated/ZeroSignalPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = ZeroSignalPluginArgs["obj"];
type ZeroSignalPaymentParams = {
    /** 0 = ALGO */
    asset: bigint | number;
    /** may be 0 */
    amount: bigint | number;
};
type PayArgs = (Omit<ContractArgs['pay(uint64,bool,(address,uint64,uint64)[])void'], 'wallet' | 'rekeyBack' | 'payments'> & MaybeSigner & {
    rekeyBack?: boolean;
    payments: ZeroSignalPaymentParams[];
});
type Method = keyof ContractArgs;
type CallArgs<M extends Method> = Omit<ContractArgs[M], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
};
declare const DEPOSIT_MBR = "depositMbr(uint64,bool,uint64)void";
declare const WITHDRAW_MBR = "withdrawMbr(uint64,bool,uint64)void";
declare const CLOSE_DEPOSIT = "closeDeposit(uint64,bool)void";
declare const SETTLE = "settle(uint64,bool,byte[],uint64,byte[],uint64,uint64,uint64,uint64,uint64,uint64,uint64)void";
declare const REFUND_INACTIVE = "refundInactive(uint64,bool,byte[])void";
declare const PROTEST = "protest(uint64,bool,byte[],uint64,byte[],byte[],byte[],uint64)void";
type DepositMbrArgs = CallArgs<typeof DEPOSIT_MBR>;
type WithdrawMbrArgs = CallArgs<typeof WITHDRAW_MBR>;
type CloseDepositArgs = CallArgs<typeof CLOSE_DEPOSIT>;
type SettleArgs = CallArgs<typeof SETTLE>;
type RefundInactiveArgs = CallArgs<typeof REFUND_INACTIVE>;
type ProtestArgs = CallArgs<typeof PROTEST>;
/**
 * Lets a wallet act as a ZeroSignal payer. The plugin reaches one app only, the
 * ZeroSignal escrow named at its creation: `pay` pays that app's account, and
 * the other methods call that app as the wallet's spending account.
 *
 * `pay` takes a receiver per payment in the contract and refuses any but the
 * escrow's address, so this SDK fills the receiver in from the plugin's own
 * `escrow_app` global.
 */
export declare class ZeroSignalPluginSDK extends BaseSDK<ZeroSignalPluginClient> {
    constructor(params: NewContractSDKParams);
    /** The ZeroSignal escrow app id this plugin was created for. */
    escrowApp(): Promise<bigint>;
    pay(): PluginSDKReturn;
    pay(args: PayArgs): PluginSDKReturn;
    /**
     * One escrow call through the plugin. With no arguments it returns the
     * method's selector, for method restrictions.
     */
    private call;
    /** Fund the payer's prepaid pool for ticket storage. The first deposit opts the spending account in to the escrow. */
    depositMbr(): PluginSDKReturn;
    depositMbr(args: DepositMbrArgs): PluginSDKReturn;
    /** Take unreserved ALGO back out of the payer's prepaid pool. */
    withdrawMbr(): PluginSDKReturn;
    withdrawMbr(args: WithdrawMbrArgs): PluginSDKReturn;
    /** Close the payer's prepaid pool and opt the spending account out of the escrow. Pass `{}` to send it. */
    closeDeposit(): PluginSDKReturn;
    closeDeposit(args: CloseDepositArgs): PluginSDKReturn;
    /** The payer's half of a settle: confirm the amount and receipt the operator claimed. */
    settle(): PluginSDKReturn;
    settle(args: SettleArgs): PluginSDKReturn;
    /** Take back the payment for a ticket no operator ever claimed. */
    refundInactive(): PluginSDKReturn;
    refundInactive(args: RefundInactiveArgs): PluginSDKReturn;
    /** Dispute an operator's claim with the receipt the node signed. */
    protest(): PluginSDKReturn;
    protest(args: ProtestArgs): PluginSDKReturn;
}
export {};

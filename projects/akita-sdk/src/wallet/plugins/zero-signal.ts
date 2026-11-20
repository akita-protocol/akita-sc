type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { ZeroSignalPluginArgs, ZeroSignalPluginClient, ZeroSignalPluginFactory } from "../../generated/ZeroSignalPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getApplicationAddress } from "algosdk";
import { getTxns } from "../utils";

type ContractArgs = ZeroSignalPluginArgs["obj"];

type ZeroSignalPaymentParams = {
  /** 0 = ALGO */
  asset: bigint | number,
  /** may be 0 */
  amount: bigint | number,
}

type PayArgs = (
  Omit<ContractArgs['pay(uint64,bool,(address,uint64,uint64)[])void'], 'wallet' | 'rekeyBack' | 'payments'>
  & MaybeSigner
  & {
    rekeyBack?: boolean
    payments: ZeroSignalPaymentParams[]
  }
);

type Method = keyof ContractArgs;
type CallArgs<M extends Method> = Omit<ContractArgs[M], 'wallet' | 'rekeyBack'> & MaybeSigner & { rekeyBack?: boolean };

const DEPOSIT_MBR = 'depositMbr(uint64,bool,uint64)void' satisfies Method;
const WITHDRAW_MBR = 'withdrawMbr(uint64,bool,uint64)void' satisfies Method;
const CLOSE_DEPOSIT = 'closeDeposit(uint64,bool)void' satisfies Method;
const SETTLE = 'settle(uint64,bool,byte[],uint64,byte[],uint64,uint64,uint64,uint64,uint64,uint64,uint64)void' satisfies Method;
const REFUND_INACTIVE = 'refundInactive(uint64,bool,byte[])void' satisfies Method;
const PROTEST = 'protest(uint64,bool,byte[],uint64,byte[],byte[],byte[],uint64)void' satisfies Method;

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
export class ZeroSignalPluginSDK extends BaseSDK<ZeroSignalPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: ZeroSignalPluginFactory, ...params });
  }

  /** The ZeroSignal escrow app id this plugin was created for. */
  async escrowApp(): Promise<bigint> {
    const escrowApp = await this.client.state.global.escrowApp();
    if (!escrowApp) throw new Error(`ZeroSignalPlugin ${this.client.appId} has no escrow app`);
    return escrowApp;
  }

  pay(): PluginSDKReturn;
  pay(args: PayArgs): PluginSDKReturn;
  pay(args?: PayArgs): PluginSDKReturn {
    const methodName = 'pay';
    if (args === undefined) {
      // Called without arguments - return selector for method restrictions
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer, payments } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const escrow = getApplicationAddress(await this.escrowApp()).toString();
        const paymentsTuple = payments.map(payment => [
          escrow,
          payment.asset,
          payment.amount,
        ]) as [string, bigint | number, bigint | number][];

        const params = await this.client.params.pay({
          ...sendParams,
          args: { wallet, rekeyBack, payments: paymentsTuple },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  /**
   * One escrow call through the plugin. With no arguments it returns the
   * method's selector, for method restrictions.
   */
  private call<M extends Method>(methodName: string, args: CallArgs<M> | undefined): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod(methodName).getSelector()];
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({ appId: this.client.appId, selectors, getTxns });
    }

    const { sender, signer, rekeyBack, ...rest } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const params = await (this.client.params as any)[methodName]({
          ...sendParams,
          args: { wallet, rekeyBack: rekeyBack ?? true, ...rest },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  /** Fund the payer's prepaid pool for ticket storage. The first deposit opts the spending account in to the escrow. */
  depositMbr(): PluginSDKReturn;
  depositMbr(args: DepositMbrArgs): PluginSDKReturn;
  depositMbr(args?: DepositMbrArgs): PluginSDKReturn {
    return this.call<typeof DEPOSIT_MBR>('depositMbr', args);
  }

  /** Take unreserved ALGO back out of the payer's prepaid pool. */
  withdrawMbr(): PluginSDKReturn;
  withdrawMbr(args: WithdrawMbrArgs): PluginSDKReturn;
  withdrawMbr(args?: WithdrawMbrArgs): PluginSDKReturn {
    return this.call<typeof WITHDRAW_MBR>('withdrawMbr', args);
  }

  /** Close the payer's prepaid pool and opt the spending account out of the escrow. Pass `{}` to send it. */
  closeDeposit(): PluginSDKReturn;
  closeDeposit(args: CloseDepositArgs): PluginSDKReturn;
  closeDeposit(args?: CloseDepositArgs): PluginSDKReturn {
    return this.call<typeof CLOSE_DEPOSIT>('closeDeposit', args);
  }

  /** The payer's half of a settle: confirm the amount and receipt the operator claimed. */
  settle(): PluginSDKReturn;
  settle(args: SettleArgs): PluginSDKReturn;
  settle(args?: SettleArgs): PluginSDKReturn {
    return this.call<typeof SETTLE>('settle', args);
  }

  /** Take back the payment for a ticket no operator ever claimed. */
  refundInactive(): PluginSDKReturn;
  refundInactive(args: RefundInactiveArgs): PluginSDKReturn;
  refundInactive(args?: RefundInactiveArgs): PluginSDKReturn {
    return this.call<typeof REFUND_INACTIVE>('refundInactive', args);
  }

  /** Dispute an operator's claim with the receipt the node signed. */
  protest(): PluginSDKReturn;
  protest(args: ProtestArgs): PluginSDKReturn;
  protest(args?: ProtestArgs): PluginSDKReturn {
    return this.call<typeof PROTEST>('protest', args);
  }
}

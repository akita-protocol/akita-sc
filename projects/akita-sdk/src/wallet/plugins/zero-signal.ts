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

/**
 * A pay plugin that can only pay the ZeroSignal escrow app. The contract takes
 * a receiver per payment and refuses any but the escrow's address, so this SDK
 * fills the receiver in from the plugin's own `escrow_app` global.
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
}

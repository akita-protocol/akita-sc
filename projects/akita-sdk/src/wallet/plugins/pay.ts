type ReadableAddress = string | import('algosdk').Address;
import { BaseSDK } from "../../base";
import { PayPluginArgs, PayPluginClient, PayPluginFactory } from "../../generated/PayPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { ABIType, Address } from "algosdk";
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { getTxns } from "../utils";

type CreatePaymentParams = {
  receiver: Address | string,
  amount: bigint | number,
  asset: bigint | number,
}

type ContractArgs = PayPluginArgs["obj"];

type PayArgs = (
  Omit<ContractArgs['pay(uint64,bool,(address,uint64,uint64)[])void'], 'wallet' | 'rekeyBack' | 'payments'>
  & MaybeSigner
  & {
    rekeyBack?: boolean
    payments: CreatePaymentParams[]
  }
);

export class PayPluginSDK extends BaseSDK<PayPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: PayPluginFactory, ...params });
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

        const paymentsTuple = payments.map(payment => [
          payment.receiver.toString(),
          payment.asset,
          payment.amount,
        ]) as [string, bigint | number, bigint | number][];

        const params = (
          await this.client.params.pay({
            ...sendParams,
            args: { wallet, payments: paymentsTuple, rekeyBack },
          })
        )

        return [{
          type: 'methodCall',
          ...params
        }]
      }
    });
  }
}

const payPolicyType = ABIType.from("(address[],uint64[])");

/** The policy of a delegated PayPlugin grant: the only receivers it may pay, and the only assets (0 is ALGO). */
export type PayPolicy = { recipients: string[]; assets: bigint[] };

/**
 * Encode a PayPlugin policy body for `MetaPluginSDK.configurePolicy`. Sorts both lists and drops
 * repeats, which the plugin's `validatePolicy` requires; each list must hold 1 to 8 entries.
 */
export function encodePayPolicy(policy: { recipients: (string | Address)[]; assets: (bigint | number)[] }): Uint8Array {
  const recipients = [...new Set(policy.recipients.map((r) => r.toString()))]
    .map((r) => Address.fromString(r))
    .sort((a, b) => Buffer.compare(Buffer.from(a.publicKey), Buffer.from(b.publicKey)))
    .map((a) => a.toString());
  const assets = [...new Set(policy.assets.map((a) => BigInt(a)))].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  if (recipients.length < 1 || recipients.length > 8) throw new Error("A pay policy lists 1 to 8 recipients");
  if (assets.length < 1 || assets.length > 8) throw new Error("A pay policy lists 1 to 8 assets");
  return payPolicyType.encode([recipients, assets]);
}

export function decodePayPolicy(body: Uint8Array): PayPolicy {
  const [recipients, assets] = payPolicyType.decode(body) as [string[], bigint[]];
  return { recipients: recipients.map((r) => r.toString()), assets: assets.map((a) => BigInt(a)) };
}

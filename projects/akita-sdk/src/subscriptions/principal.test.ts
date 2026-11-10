import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { generateAccount, makeEmptyTransactionSigner } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as SubscriptionsAppSpec } from "../generated/SubscriptionsClient";
import { gateCtx } from "../principal";
import { SUBSCRIPTION_PRINCIPAL_MBR } from "./constants";
import { directGateCtx, SubscriptionsSDK } from "./index";

/**
 * Principal resolution (PHASE-0-SPEC.md §6.4, §6.13, P2-ABI-01): the SDK wrappers pick the hinted
 * overload (trailing `wallet`, default 0n) and only use the pre-hint selectors when asked (`legacy`).
 */

const SENDER = generateAccount().addr.toString();
const SUBSCRIBER = generateAccount().addr.toString();
const signer = makeEmptyTransactionSigner();

const signatures = SubscriptionsAppSpec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(",")})${m.returns.type}`);

function sdk(): SubscriptionsSDK {
  // no network calls: the SDK only needs a network name to resolve defaults
  vi.stubEnv("ALGORAND_NETWORK", "localnet");
  return new SubscriptionsSDK({
    algorand: AlgorandClient.defaultLocalNet(),
    factoryParams: { appId: 1234n, defaultSender: SENDER, defaultSigner: signer },
  });
}

/** a stand-in for the typed composer that records which overload was used */
function recordingGroup() {
  const calls: { method: string; args: Record<string, unknown> }[] = [];
  const group = new Proxy({} as Record<string, unknown>, {
    get(_target, prop: string) {
      if (prop === "send") return async () => ({ returns: [] });
      return (params: { args: Record<string, unknown> }) => {
        calls.push({ method: prop, args: params.args });
        return group;
      };
    },
  });
  return { group, calls };
}

describe("Subscriptions SDK: hinted selectors (principal resolution)", () => {
  test("the generated client exposes both overloads; the hinted one ends in the wallet hint", () => {
    expect(signatures).toContain("subscribe(pay,address,uint64,uint64,uint64,uint64)uint64");
    expect(signatures).toContain("subscribe(pay,address,uint64,uint64,uint64)uint64");
    expect(signatures).toContain("gatedTriggerPayment(appl,(address,uint64),uint64)void");
    expect(signatures).toContain("gatedTriggerPayment(appl,(address,uint64))void");
    expect(signatures).toContain("triggerGateCtx((address,uint64),uint64)(address,uint64,address)");
    expect(signatures).toContain("adoptPrincipal(pay,(address,uint64))void");
  });

  test("directGateCtx is the context principalOf(dao, 0) resolves to", () => {
    expect(directGateCtx(SENDER)).toEqual({ principal: SENDER, wallet: 0n, spender: SENDER });
    expect(directGateCtx(SENDER)).toEqual(
      gateCtx({ wallet: 0n, principal: SENDER, origin: "", spender: SENDER, referrer: "", viaPlugin: false }),
    );
  });

  test("SUBSCRIPTION_PRINCIPAL_MBR = 2_500 + 400 * (41 + 40)", () => {
    expect(SUBSCRIPTION_PRINCIPAL_MBR).toBe(2_500n + 400n * (41n + 40n));
  });

  test("cost quotes use the hinted selectors by default and the legacy ones on request", async () => {
    const s = sdk();
    const client = s.client as unknown as Record<string, ReturnType<typeof vi.fn>>;
    client.newServiceCostUint64Uint64Uint64 = vi.fn().mockResolvedValue(10n);
    client.newServiceCostUint64Uint64 = vi.fn().mockResolvedValue(20n);
    client.newSubscriptionCostAddressUint64Uint64Uint64Uint64 = vi.fn().mockResolvedValue(30n);
    client.newSubscriptionCostAddressUint64Uint64Uint64 = vi.fn().mockResolvedValue(40n);

    expect(await s.newServiceCost({ asset: 0n, wallet: 7n })).toBe(10n);
    expect(client.newServiceCostUint64Uint64Uint64.mock.calls[0][0].args).toEqual({ asset: 0n, wallet: 7n });
    expect(await s.newServiceCost({ asset: 0n, legacy: true })).toBe(20n);
    expect(client.newServiceCostUint64Uint64.mock.calls[0][0].args).toEqual({ asset: 0n });

    expect(await s.newSubscriptionCost({ recipient: SUBSCRIBER, serviceId: 3n })).toBe(30n);
    expect(client.newSubscriptionCostAddressUint64Uint64Uint64Uint64.mock.calls[0][0].args).toEqual({ recipient: SUBSCRIBER, asset: 0n, serviceId: 3n, wallet: 0n });
    expect(await s.newSubscriptionCost({ recipient: SUBSCRIBER, serviceId: 3n, legacy: true })).toBe(40n);
  });

  test("a direct (top-level) call never carries a wallet hint: rejected before any network call", async () => {
    const s = sdk();
    await expect(s.subscribe({ sender: SENDER, signer, asset: 0n, amount: 4n, interval: 60n, recipient: SUBSCRIBER, wallet: 9n })).rejects.toThrow(/errHtop/);
    await expect(s.triggerPayment({ sender: SENDER, signer, address: SUBSCRIBER, id: 1n, wallet: 9n })).rejects.toThrow(/errHtop/);
  });

  test("gated triggerPayment: a builder receives triggerGateCtx(key, wallet) and the hinted selector is used", async () => {
    const s = sdk();
    const client = s.client as unknown as Record<string, unknown>;
    const ctx = { principal: SUBSCRIBER, wallet: 55n, spender: SUBSCRIBER };
    client.triggerGateCtx = vi.fn().mockResolvedValue(ctx);
    const { group, calls } = recordingGroup();
    client.newGroup = () => group;

    const gateTxn = { marker: "mustCheckFor" } as never;
    const builder = vi.fn().mockResolvedValue(gateTxn);
    await s.triggerPayment({ sender: SENDER, signer, address: SUBSCRIBER, id: 4n, gateTxn: builder });

    expect(builder).toHaveBeenCalledWith(ctx);
    expect((client.triggerGateCtx as ReturnType<typeof vi.fn>).mock.calls[0][0].args).toEqual({ key: { address: SUBSCRIBER, id: 4n }, wallet: 0n });
    expect(calls).toEqual([{ method: "gatedTriggerPaymentApplAddressUint64Uint64Void", args: { gateTxn, key: { address: SUBSCRIBER, id: 4n }, wallet: 0n } }]);
  });

  test("legacy gated triggerPayment uses the pre-hint selector and needs a prebuilt Gate.mustCheck txn", async () => {
    const s = sdk();
    const client = s.client as unknown as Record<string, unknown>;
    const { group, calls } = recordingGroup();
    client.newGroup = () => group;

    const gateTxn = { marker: "mustCheck" } as never;
    await s.triggerPayment({ sender: SENDER, signer, address: SUBSCRIBER, id: 4n, gateTxn, legacy: true });
    expect(calls).toEqual([{ method: "gatedTriggerPaymentApplAddressUint64Void", args: { gateTxn, key: { address: SUBSCRIBER, id: 4n } } }]);

    await expect(s.triggerPayment({ sender: SENDER, signer, address: SUBSCRIBER, id: 4n, gateTxn: async () => gateTxn, legacy: true }))
      .rejects.toThrow(/prebuilt/);
  });
});

import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ABIMethod, ABIType, generateAccount } from "algosdk";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as GateAppSpec } from "../generated/GateClient";
import { APP_SPEC as SubscriptionGateAppSpec } from "../generated/SubscriptionGateClient";
import { APP_SPEC as SubscriptionStreakGateAppSpec } from "../generated/SubscriptionStreakGateClient";
import { APP_SPEC as AkitaReferrerGateAppSpec } from "../generated/AkitaReferrerGateClient";
import { APP_SPEC as AssetGateAppSpec } from "../generated/AssetGateClient";
import { GATE_MUST_CHECK_FOR_SIGNATURE, type GateCtx } from "../principal";
import { CTX_AWARE_GATE_TYPES, GateSDK, isCtxAwareGateType } from "./index";

const PRINCIPAL = generateAccount().addr.toString();
const SUBSCRIBER = generateAccount().addr.toString();

const signatures = (spec: { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }) =>
  spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(",")})${m.returns.type}`);

function sdk(): GateSDK {
  // no network calls: the SDK only needs a network name to resolve defaults
  vi.stubEnv("ALGORAND_NETWORK", "localnet");
  return new GateSDK({
    algorand: AlgorandClient.defaultLocalNet(),
    factoryParams: { appId: 1234n, defaultSender: PRINCIPAL },
    gateRegistry: {},
  });
}

type Private = {
  encodeGateCheckArgs(args: unknown[]): Promise<Uint8Array[]>;
  encodeGateRegistryArgs(args: unknown[]): Promise<{ filters: unknown[]; args: Uint8Array[] }>;
};

describe("Gate v2 context forwarding (principal-resolution §6.9, Q12)", () => {
  test("Gate ABI: mustCheckFor matches the selector targets assert with gateCheckCtx", () => {
    const sigs = signatures(GateAppSpec);
    expect(sigs).toContain(GATE_MUST_CHECK_FOR_SIGNATURE);
    expect(sigs).toContain("checkFor((address,uint64,address),uint64,byte[][])bool");
    expect(sigs).toContain("setSubGate(uint64,bool,bool)void");
    expect(sigs).toContain("isCtxSubGate(uint64)bool");
    // the legacy entry points stay
    expect(sigs).toContain("mustCheck(address,uint64,byte[][])void");
    expect(sigs).toContain("check(address,uint64,byte[][])bool");
    expect(sigs).not.toContain("setSubGate(uint64,bool)void");
    expect(GateAppSpec.methods.find((m) => m.name === "checkFor")?.readonly).toBe(true);
  });

  test("context-aware sub-gates implement checkFor; plain sub-gates do not", () => {
    for (const spec of [SubscriptionGateAppSpec, SubscriptionStreakGateAppSpec, AkitaReferrerGateAppSpec]) {
      expect(signatures(spec)).toContain("checkFor((address,uint64,address),uint64,byte[])bool");
      expect(signatures(spec)).toContain("check(address,uint64,byte[])bool");
    }
    expect(signatures(AssetGateAppSpec).some((s) => s.startsWith("checkFor("))).toBe(false);
  });

  test("CTX_AWARE_GATE_TYPES lists exactly the sub-gates with checkFor", () => {
    expect([...CTX_AWARE_GATE_TYPES].sort()).toEqual(["akita_referrer", "governance_participation", "moderator_activity", "subscription", "subscription_streak"]);
    expect(isCtxAwareGateType("subscription")).toBe(true);
    expect(isCtxAwareGateType("asset")).toBe(false);
    expect(isCtxAwareGateType("social_activity")).toBe(false);
  });

  test("checkFor sends the ctx and the encoded sub-gate args to Gate.checkFor", async () => {
    const gate = sdk();
    const send = vi.fn().mockResolvedValue({ return: true });
    Object.assign(gate.client.send, { checkFor: send });
    const ctx: GateCtx = { principal: PRINCIPAL, wallet: 77n, spender: SUBSCRIBER };

    const passed = await gate.checkFor({ ctx, gateId: 9n, args: [{ type: "subscription", subscriber: SUBSCRIBER, id: 3n }] });

    expect(passed).toBe(true);
    const call = send.mock.calls[0][0];
    expect(call.args.ctx).toEqual(ctx);
    expect(call.args.gateId).toBe(9n);
    expect(call.args.args).toEqual([ABIType.from("(address,uint64)").encode([SUBSCRIBER, 3n])]);
  });

  test("build.mustCheckFor builds a Gate.mustCheckFor call with the same ctx", async () => {
    const gate = sdk();
    const params = vi.fn().mockResolvedValue({ method: "built" });
    Object.assign(gate.client.params, { mustCheckFor: params });
    const ctx: GateCtx = { principal: PRINCIPAL, wallet: 0n, spender: PRINCIPAL };

    await gate.build.mustCheckFor({ sender: PRINCIPAL, signer: vi.fn(), ctx, gateId: 5n, args: [{ type: "asset" }] });

    const call = params.mock.calls[0][0];
    expect(call.args).toEqual({ ctx, gateId: 5n, args: [new Uint8Array()] });
    // the method the call targets is the one gateCheckCtx compares
    expect(ABIMethod.fromSignature(GATE_MUST_CHECK_FOR_SIGNATURE).getSelector()).toEqual(
      new ABIMethod(GateAppSpec.methods.find((m) => m.name === "mustCheckFor")!).getSelector(),
    );
  });

  test("setSubGate forwards the ctxAware flag (default false)", async () => {
    const gate = sdk();
    const send = vi.fn().mockResolvedValue({});
    Object.assign(gate.client.send, { setSubGate: send });
    const signer = vi.fn();

    await gate.setSubGate({ sender: PRINCIPAL, signer, app: 10n, allowed: true });
    await gate.setSubGate({ sender: PRINCIPAL, signer, app: 11n, allowed: true, ctxAware: true });

    expect(send.mock.calls[0][0].args).toEqual({ app: 10n, allowed: true, ctxAware: false });
    expect(send.mock.calls[1][0].args).toEqual({ app: 11n, allowed: true, ctxAware: true });
  });

  test("regression: an args-less filter after one with args gets empty args (was the previous filter's bytes)", async () => {
    const gate = sdk() as unknown as Private;
    const checkArgs = await gate.encodeGateCheckArgs([
      { type: "subscription", subscriber: SUBSCRIBER, id: 1n },
      { type: "asset" },
      { type: "akita_referrer", wallet: 5n },
      { type: "social_activity" },
    ]);
    expect(checkArgs[0].length).toBe(40);
    expect(checkArgs[1]).toEqual(new Uint8Array());
    expect(checkArgs[2].length).toBe(8);
    expect(checkArgs[3]).toEqual(new Uint8Array());

    const registration = await gate.encodeGateRegistryArgs([
      { type: "akita_referrer", appId: 1n, layer: 0n, logicalOperator: 10, referrer: SUBSCRIBER },
      { type: "nfd", appId: 2n, layer: 0n, logicalOperator: 0 },
    ]);
    expect(registration.args[0].length).toBe(32);
    expect(registration.args[1]).toEqual(new Uint8Array());
  });
});

import { encodeAddress } from "algosdk";
import { MetaSDK } from "./index";
import { describe, expect, test, vi } from "vitest";
import { APP_SPEC as legacy } from "../generated/MetaMerklesClient";
import { APP_SPEC as meta } from "../generated/MetaClient";

describe("MetaMerkles compatibility", () => {
  test("retains every original non-creation ABI signature and allowed transaction action", () => {
    for (const previous of legacy.methods.filter((method) => method.name !== "create")) {
      const current = meta.methods.find((method) => method.name === previous.name);
      expect(current, previous.name).toBeDefined();
      expect(
        current!.args.map((arg) => arg.type),
        previous.name,
      ).toEqual(previous.args.map((arg) => arg.type));
      expect(current!.returns.type, previous.name).toBe(previous.returns.type);
      expect(current!.actions, previous.name).toEqual(previous.actions);
      expect(current!.readonly, previous.name).toEqual(previous.readonly);
    }
  });

  test("missing legacy type metadata returns undefined while other lookup errors propagate", async () => {
    const value = vi.fn().mockRejectedValueOnce(new Error("box not found")).mockRejectedValueOnce(new Error("network failure"));
    const sdk = { client: { state: { box: { roots: { value } } } } } as unknown as MetaSDK;
    const args = { address: encodeAddress(new Uint8Array(32).fill(1)), name: "removed", key: "l.type" };
    expect(await MetaSDK.prototype.getData.call(sdk, args)).toBeUndefined();
    await expect(MetaSDK.prototype.getData.call(sdk, args)).rejects.toThrow("network failure");
  });

  test("retains legacy proof signatures while attached data uses the shared record store", () => {
    expect(meta.state.maps.box.types).toEqual(legacy.state.maps.box.types);
    expect(meta.state.maps.box.data).toBeUndefined();
    expect(meta.state.maps.box.records).toBeDefined();
    expect(Object.keys(meta.state.maps.box).sort()).toEqual(["records", "roots", "types"]);
    for (const method of meta.methods.filter((method) => /Record$|^record/.test(method.name)))
      expect(method.args.some((arg) => arg.name === "namespace")).toBe(false);
  });
});

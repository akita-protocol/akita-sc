import { APP_SPEC as metaSpec } from "../generated/MetaClient";
import { APP_SPEC as pluginSpec } from "../generated/MetaPluginClient";
import { describe, expect, test } from "vitest";
import { ABIType, encodeAddress } from "algosdk";
import { decodeMetadataBoxName, decodeMetadataRecord, metadataDataKey, metadataBoxName, metadataStorageCost, metadataKeyBytes, metadataValueLimit, metadataPluginValueLimit, metadataDataParts } from "./records";
const first = new Uint8Array(32).fill(1);
const second = first.slice(); second[31] ^= 128;
const owner = encodeAddress(first);

describe("Meta direct record keys", () => {
  test("retains all address bytes and unambiguous caller keys in box names", () => {
    const key = metadataDataKey("ab", "c");
    const a = metadataBoxName(owner, key);
    const b = metadataBoxName(owner, metadataDataKey("a", "bc"));
    const c = metadataBoxName(encodeAddress(second), key);
    expect(new Set([a, b, c].map((value) => Buffer.from(value).toString("hex"))).size).toBe(3);
    expect(a).toEqual(new Uint8Array([0x6d, ...first, 2, 97, 98, 99]));
    expect(decodeMetadataBoxName(a)).toEqual({ account: owner, key });
  });
  test("bounds keys by bytes and charges for exactly one box", () => {
    expect(metadataBoxName(owner, new Uint8Array(31)).length).toBe(64);
    expect(() => metadataKeyBytes(new Uint8Array(32))).toThrow(/31/);
    expect(() => metadataKeyBytes("")).toThrow();
    expect(metadataKeyBytes("é".repeat(15) + "a").length).toBe(31);
    expect(() => metadataKeyBytes("é".repeat(16))).toThrow(/31/);
    expect(metadataStorageCost(0, "key")).toBe(21700n);
    expect(metadataStorageCost(16331, new Uint8Array(31))).toBe(6565300n);
    expect(() => metadataStorageCost(metadataValueLimit("key") + 1, "key")).toThrow(/16359/);
  });
  test("budgets the actual ABI arguments of both write methods", () => {
    const length = (spec: typeof metaSpec | typeof pluginSpec, name: string, args: Record<string, any>) => {
      const method = spec.methods.find((method) => method.name === name)!;
      return 4 + method.args.filter((arg) => arg.type !== "pay")
        .reduce((sum, arg) => sum + ABIType.from(arg.type).encode(args[arg.name!]).length, 0);
    };
    for (const key of [new Uint8Array(1), new Uint8Array(31)]) {
      const data = new Uint8Array(metadataValueLimit(key));
      const parts = metadataDataParts(data);
      expect(length(metaSpec, "setRecord", { key, ...parts, expectedRevision: 0n })).toBe(16384);
      expect(Object.values(parts).every((part) => part.length + 2 <= 4096)).toBe(true);
      expect([parts.data0.length, parts.data1.length, parts.data2.length]).toEqual([4094, 4094, 4094]);
      expect(parts.data3.length + 12).toBeLessThanOrEqual(4096);
      expect(Uint8Array.from(Object.values(parts).flatMap((part) => [...part]))).toEqual(data);
    }
    for (const [namespace, key] of [["a", "b"], ["é".repeat(14), "ab"]]) {
      const data = new Uint8Array(metadataPluginValueLimit(namespace, key));
      expect(length(pluginSpec, "set", { wallet: 1n, rekeyBack: true, namespace, key,
        ...metadataDataParts(data), expectedRevision: 0n })).toBe(16384);
    }
  });

  test("decodes revision and data as one ARC-4 object", () => {
    const value = ABIType.from("(uint64,byte[])").encode([123n, new Uint8Array([1, 2, 3])]);
    expect(decodeMetadataRecord(value)).toEqual({ exists: true, revision: 123n, data: new Uint8Array([1, 2, 3]) });
    expect(decodeMetadataRecord(ABIType.from("(uint64,byte[])").encode([1n, new Uint8Array()])))
      .toEqual({ exists: true, revision: 1n, data: new Uint8Array() });
    expect(() => decodeMetadataRecord(new Uint8Array(7))).toThrow();
    expect(() => decodeMetadataRecord(value.slice(0, -1))).toThrow();
  });
});

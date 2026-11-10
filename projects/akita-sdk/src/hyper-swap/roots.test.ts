import { encodeAddress } from "algosdk";
import { describe, expect, test } from "vitest";
import { hyperSwapRootBoxName, hyperSwapRootName } from "./roots";

describe("HyperSwap binary root names", () => {
  test("preserves NUL and non-UTF-8 bytes and separates the two trees", () => {
    const id = 0x0080ff0123456789n;
    expect(Buffer.from(hyperSwapRootName(id, false)).toString("hex")).toBe("740080ff0123456789");
    expect(Buffer.from(hyperSwapRootName(id, true)).toString("hex")).toBe("700080ff0123456789");
    const address = encodeAddress(new Uint8Array(32).fill(1));
    expect(Buffer.from(hyperSwapRootBoxName(address, id, false)).toString("hex"))
      .toBe("72" + "01".repeat(32) + "740080ff0123456789");
    expect(Buffer.from(hyperSwapRootBoxName(address, id, false, "MetaMerkles")).toString("hex"))
      .toBe("72" + "01".repeat(32) + "00220009" + "740080ff0123456789");
  });

  test("preserves the full uint64 range and rejects IDs outside it", () => {
    expect(Buffer.from(hyperSwapRootName(0n, false)).toString("hex")).toBe("740000000000000000");
    expect(Buffer.from(hyperSwapRootName(0xffffffffffffffffn, false)).toString("hex")).toBe("74ffffffffffffffff");
    expect(() => hyperSwapRootName(-1n, false)).toThrow();
    expect(() => hyperSwapRootName(1n << 64n, false)).toThrow();
  });
});

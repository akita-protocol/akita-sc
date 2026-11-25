import { describe, expect, test } from "vitest";
import { RAFFLE_CHUNK_SIZE, ticketsInSlot, weightLocation } from "./weights";

const box = (...tickets: bigint[]): Uint8Array => {
  const bytes = new Uint8Array(tickets.length * 8);
  const view = new DataView(bytes.buffer);
  tickets.forEach((count, slot) => view.setBigUint64(slot * 8, count));
  return bytes;
};

describe("raffle weights boxes", () => {
  test("an entry's ticket count lives in box id / 4096, slot id % 4096", () => {
    expect(weightLocation(0n)).toEqual({ box: 0n, slot: 0 });
    expect(weightLocation(4095)).toEqual({ box: 0n, slot: 4095 });
    expect(weightLocation(4096n)).toEqual({ box: 1n, slot: 0 });
    expect(weightLocation(3n * RAFFLE_CHUNK_SIZE + 7n)).toEqual({ box: 3n, slot: 7 });
  });

  test("a box as long as its entries is read slot by slot", () => {
    const weights = box(5_000_000n, 1n, 2n ** 64n - 1n);
    expect(ticketsInSlot(weights, 0)).toBe(5_000_000n);
    expect(ticketsInSlot(weights, 1)).toBe(1n);
    expect(ticketsInSlot(weights, 2)).toBe(2n ** 64n - 1n);
  });

  test("a slot the box does not have is undefined, never a neighbouring value", () => {
    const weights = box(7n, 8n);
    expect(ticketsInSlot(weights, 2)).toBeUndefined();
    expect(ticketsInSlot(weights, -1)).toBeUndefined();
    expect(ticketsInSlot(new Uint8Array(0), 0)).toBeUndefined();
    expect(ticketsInSlot(new Uint8Array(15), 1)).toBeUndefined();
  });

  test("a box reserved in full by an earlier raffle reads the same way", () => {
    const reserved = new Uint8Array(4096 * 8);
    new DataView(reserved.buffer).setBigUint64(9 * 8, 42n);
    expect(ticketsInSlot(reserved, 9)).toBe(42n);
    expect(ticketsInSlot(reserved, 10)).toBe(0n);
    expect(ticketsInSlot(reserved, 4095)).toBe(0n);
    expect(ticketsInSlot(reserved, 4096)).toBeUndefined();
  });

  test("a view into a larger buffer is read from its own start", () => {
    const backing = new Uint8Array(32);
    new DataView(backing.buffer).setBigUint64(16, 99n);
    expect(ticketsInSlot(backing.subarray(16), 0)).toBe(99n);
  });
});

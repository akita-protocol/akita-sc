import { expect, test, vi } from "vitest";
import { encodeAddress, decodeAddress } from "algosdk";
import { MetaSDK } from "./index";
import { metadataBoxName } from "./records";

const account = encodeAddress(new Uint8Array(32).fill(1));

test("record discovery follows pagination, pins the round, and filters exact namespaces", async () => {
  const pages = [
    { boxes: [{ name: metadataBoxName(account, "ns/first") }], nextToken: "cursor", round: 123 },
    { boxes: [{ name: metadataBoxName(account, "ns/second") }, { name: metadataBoxName(account, "ns2/other") }] },
  ];
  const requests = pages.map((page) => {
    const request = {
      prefix: vi.fn(() => request),
      limit: vi.fn(() => request),
      next: vi.fn(() => request),
      round: vi.fn(() => request),
      do: vi.fn(async () => page),
    };
    return request;
  });
  const getApplicationBoxes = vi.fn().mockReturnValueOnce(requests[0]).mockReturnValueOnce(requests[1]);
  const getBoxValue = vi.fn();
  const sdk = { appId: 123n, algorand: { app: { getBoxValue }, client: { algod: { getApplicationBoxes } } } } as unknown as MetaSDK;
  expect(await MetaSDK.prototype.listRecordKeys.call(sdk, { account, keyPrefix: new TextEncoder().encode("ns/") })).toEqual([
    { account, key: new TextEncoder().encode("ns/first") },
    { account, key: new TextEncoder().encode("ns/second") },
  ]);
  expect(requests[0].prefix).toHaveBeenCalledWith(new Uint8Array([0x6d, ...decodeAddress(account).publicKey, ...new TextEncoder().encode("ns/")]));
  expect(requests[1].prefix).toHaveBeenCalledWith(new Uint8Array([0x6d, ...decodeAddress(account).publicKey, ...new TextEncoder().encode("ns/")]));
  expect(requests[1].next).toHaveBeenCalledWith("cursor");
  expect(getBoxValue).not.toHaveBeenCalled();
  expect(requests[1].round).toHaveBeenCalledWith(123);
});

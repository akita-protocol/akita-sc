import { metadataDataKey, metadataPluginValueLimit } from './records'
import { describe, expect, test, vi } from "vitest";
import { MetaSDK } from "./index";
import { encodeLeaf, hashLeaf, MerkleTree, verifyProof } from "./tree";
import { SchemaPart } from "./types";
import { MetaPluginSDK } from "../wallet/plugins/meta";

describe("Meta audit regressions", () => {
  test("ALG-02: distinct tuples with dynamic fields cannot reuse a proof", () => {
    const schema = [SchemaPart.String, SchemaPart.String];
    const intended = ["alice", "admin"];
    const substituted = ["alicead", "min"];
    expect(substituted).not.toEqual(intended);
    expect(encodeLeaf(intended, schema)).not.toEqual(encodeLeaf(substituted, schema));
    const tree = MerkleTree.of([intended], schema);
    expect(verifyProof(tree.root, hashLeaf(encodeLeaf(intended, schema)), tree.getProof(0))).toBe(true);
    expect(verifyProof(tree.root, hashLeaf(encodeLeaf(substituted, schema)), tree.getProof(0))).toBe(false);
  });

  test.each([0, 1024, 4084, 4085, 4096, 8178, 16352])("ALG-03: direct %i-byte writes submit one complete app call", async (size) => {
    const error = new Error("Submission outcome unknown");
    const sdk = Object.create(MetaSDK.prototype) as MetaSDK;
    const send = vi.fn().mockRejectedValue(error);
    Object.assign(sdk, {
      sendParams: { sender: "test-owner", signer: vi.fn() },
      getReaderSendParams: () => ({}),
      algorand: { createTransaction: { payment: vi.fn() } },
      client: { appAddress: "registry", send: { setRecord: send }, recordCost: vi.fn().mockResolvedValue(100n) },
    });
    const data = Uint8Array.from({ length: size }, (_, i) => i % 251);
    await expect(sdk.setRecord({ key: metadataDataKey("audit", "data"), data, expectedRevision: 0n })).rejects.toBe(error);
    expect(send).toHaveBeenCalledTimes(1);
    const { data0, data1, data2, data3 } = send.mock.calls[0][0].args;
    expect(Uint8Array.from([data0, data1, data2, data3].flatMap((part: Uint8Array) => [...part]))).toEqual(data);
    expect(send.mock.calls[0][0].args.expectedRevision).toBe(0n);
  });

  test("ALG-03: a wallet write requests funds once and propagates uncertain submission", async () => {
    const error = new Error("Submission outcome unknown");
    const sdk = Object.create(MetaPluginSDK.prototype) as MetaPluginSDK;
    const hook = () => ({ appId: 1n, selectors: [], getTxns: vi.fn() });
    const set = vi.fn().mockReturnValue(hook);
    Object.assign(sdk, { set });
    const wallet = { usePlugin: vi.fn().mockRejectedValue(error) };
    const fundsRequest = [{ asset: 0n, amount: 15_000_000n }];
    const data = new Uint8Array(metadataPluginValueLimit("audit", "data"));
    await expect(sdk.setRecord({ wallet, execution: { fundsRequest }, namespace: "audit", key: "data", data, expectedRevision: 0n })).rejects.toBe(error);
    expect(wallet.usePlugin).toHaveBeenCalledTimes(1);
    expect(wallet.usePlugin.mock.calls[0][0].fundsRequest).toEqual(fundsRequest);
    expect(wallet.usePlugin.mock.calls[0][0].calls).toEqual([hook]);
    expect(set.mock.calls[0][0].data).toEqual(data);
  });
});

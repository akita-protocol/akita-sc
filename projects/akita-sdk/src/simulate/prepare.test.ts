import { describe, expect, test } from "vitest";
import type algosdk from "algosdk";
import { Address } from "@algorandfoundation/algokit-utils/common";
import type { AlgodClient } from "@algorandfoundation/algokit-utils/algod-client";
import { TransactionComposer } from "@algorandfoundation/algokit-utils/composer";
import {
  Transaction,
  TransactionType,
  type TransactionSigner,
} from "@algorandfoundation/algokit-utils/transact";

import { prepareGroup, sendPrepared } from "./prepare";

const address = (fill: number) => new Address(new Uint8Array(32).fill(fill));

function payment(): Transaction {
  return new Transaction({
    type: TransactionType.Payment,
    sender: address(1),
    fee: 1_000n,
    firstValid: 1n,
    lastValid: 1_001n,
    payment: {
      receiver: address(2),
      amount: 1n,
    },
  });
}

function groupWithSigners(signers: TransactionSigner[]): TransactionComposer {
  const composer = new TransactionComposer({
    algod: {} as AlgodClient,
    getSigner: () => signers[0],
    getSuggestedParams: async () => ({
      consensusVersion: "test",
      fee: 1n,
      minFee: 1_000n,
      genesisHash: new Uint8Array(32),
      genesisId: "test-v1",
      flatFee: true,
      firstValid: 1n,
      lastValid: 1_001n,
    }),
  });

  for (const signer of signers) composer.addTransaction(payment(), signer);
  return composer;
}

describe("prepared signer batching", () => {
  test("invokes one shared signer once with every owned transaction index", async () => {
    const stop = new Error("stop before submission");
    const calls: number[][] = [];
    const groupLengths: number[] = [];
    const signer: TransactionSigner = async (txnGroup, indexesToSign) => {
      groupLengths.push(txnGroup.length);
      calls.push([...indexesToSign]);
      throw stop;
    };

    const prepared = await prepareGroup(
      groupWithSigners([signer, signer, signer]),
    );

    expect(new Set(prepared.signers).size).toBe(1);
    await expect(
      sendPrepared(prepared, {} as AlgodClient),
    ).rejects.toBe(stop);
    expect(calls).toEqual([[0, 1, 2]]);
    expect(groupLengths).toEqual([3]);
  });

  test("keeps genuinely different signers in separate batches", async () => {
    const stop = new Error("stop before submission");
    const firstCalls: number[][] = [];
    const secondCalls: number[][] = [];
    const firstSigner: TransactionSigner = async (_txnGroup, indexesToSign) => {
      firstCalls.push([...indexesToSign]);
      return indexesToSign.map(() => new Uint8Array([1]));
    };
    const secondSigner: TransactionSigner = async (_txnGroup, indexesToSign) => {
      secondCalls.push([...indexesToSign]);
      throw stop;
    };

    const prepared = await prepareGroup(
      groupWithSigners([firstSigner, secondSigner, firstSigner]),
    );

    expect(new Set(prepared.signers).size).toBe(2);
    await expect(
      sendPrepared(prepared, {} as AlgodClient),
    ).rejects.toBe(stop);
    expect(firstCalls).toEqual([[0, 2]]);
    expect(secondCalls).toEqual([[1]]);
  });

  test("uses one explicit signer override for the entire group", async () => {
    const originalSigner: TransactionSigner = async () => [];
    const overrideSigner: algosdk.TransactionSigner = async () => [];

    const prepared = await prepareGroup(
      groupWithSigners([originalSigner, originalSigner, originalSigner]),
      { signer: overrideSigner },
    );

    expect(prepared.signers).toEqual([
      overrideSigner,
      overrideSigner,
      overrideSigner,
    ]);
  });
});

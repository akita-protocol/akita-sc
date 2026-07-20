import { describe, expect, test } from "vitest";
import algosdk from "algosdk";
import type { SimulateUnnamedResourcesAccessed } from "@algorandfoundation/algokit-utils/algod-client";
import { ABIMethod } from "@algorandfoundation/algokit-utils/abi";
import { TransactionComposer } from "@algorandfoundation/algokit-utils/composer";
import { Address } from "@algorandfoundation/algokit-utils/common";
import { AlgorandClientTransactionSender, microAlgo } from "@algorandfoundation/algokit-utils";
import {
  makeEmptyTransactionSigner,
  OnApplicationComplete,
  Transaction,
  TransactionType,
  calculateFee,
  decodeTransaction,
  encodeTransactionRaw,
  type ResourceReference,
} from "@algorandfoundation/algokit-utils/transact";

import {
  accessListEntryCount,
  type ComposerGroupAnalysis,
  installAccessListResourcePopulator,
  MAX_ACCESS_LIST_ENTRIES,
  populateAccessListResources,
  registerAccessListResourceCarrier,
} from "./access-list";

const address = (fill: number) => new Address(new Uint8Array(32).fill(fill));
const opUpSpec = { methods: [{ name: "opUp", args: [], returns: { type: "void" } }] };

function appCall({
  appId,
  sender = address(1),
  accountReferences,
  appReferences,
  assetReferences,
  boxReferences,
}: {
  appId: bigint;
  sender?: Address;
  accountReferences?: Address[];
  appReferences?: bigint[];
  assetReferences?: bigint[];
  boxReferences?: { appId: bigint; name: Uint8Array }[];
}): Transaction {
  return new Transaction({
    type: TransactionType.AppCall,
    sender,
    firstValid: 1n,
    lastValid: 2n,
    appCall: {
      appId,
      onComplete: OnApplicationComplete.NoOp,
      accountReferences,
      appReferences,
      assetReferences,
      boxReferences,
    },
  });
}

function analysis(
  transactionCount: number,
  groupResources?: SimulateUnnamedResourcesAccessed,
  transactionResources: Partial<Record<number, SimulateUnnamedResourcesAccessed>> = {},
): ComposerGroupAnalysis {
  return {
    transactions: Array.from({ length: transactionCount }, (_, index) => ({
      unnamedResourcesAccessed: transactionResources[index],
    })),
    unnamedResourcesAccessed: groupResources,
  };
}

function count(transaction: Transaction): number {
  return accessListEntryCount(transaction, transaction.appCall?.accessReferences ?? []);
}

describe("Access-list resource population", () => {
  test("counts encoded dependencies rather than semantic references", () => {
    const transaction = appCall({ appId: 100n });
    const other = address(2);
    const references: ResourceReference[] = [
      { holding: { address: other, assetId: 7n } },
      { address: other },
      { assetId: 7n },
      { box: { appId: 200n, name: new Uint8Array([1]) } },
      { appId: 200n },
      { locals: { address: other, appId: 200n } },
    ];

    // address + asset + holding + foreign app + box + locals
    expect(accessListEntryCount(transaction, references)).toBe(6);
  });

  test("packs more than 16 resources across app calls", () => {
    const transactions = [appCall({ appId: 100n }), appCall({ appId: 200n })];
    populateAccessListResources(transactions, analysis(2, { assets: Array.from({ length: 25 }, (_, index) => BigInt(index + 1)) }));

    expect(transactions.map(count).reduce((sum, value) => sum + value, 0)).toBe(25);
    expect(transactions.every((transaction) => count(transaction) <= MAX_ACCESS_LIST_ENTRIES)).toBe(true);
    expect(transactions.every((transaction) => transaction.appCall?.assetReferences === undefined)).toBe(true);
  });

  test("removes explicit inherent refs before enforcing the 16-entry wire limit", () => {
    const transaction = appCall({ appId: 100n });
    transaction.appCall!.accessReferences = [
      { address: transaction.sender },
      { appId: 100n },
      ...Array.from({ length: 16 }, (_, index) => ({ assetId: BigInt(index + 1) })),
    ];

    populateAccessListResources([transaction], analysis(1));

    expect(transaction.appCall?.accessReferences).toHaveLength(16);
    expect(transaction.appCall?.accessReferences?.every((reference) => reference.assetId !== undefined)).toBe(true);
    const wire = algosdk.decodeObj(encodeTransactionRaw(transaction)) as { al: unknown[] };
    expect(wire.al).toHaveLength(16);
  });

  test("keeps a literal zero-address account in the legacy Accounts array", () => {
    const transaction = appCall({ appId: 100n });
    const zeroAddress = Address.zeroAddress();

    populateAccessListResources([transaction], analysis(1, { accounts: [zeroAddress] }));

    expect(transaction.appCall?.accountReferences).toEqual([zeroAddress]);
    expect(transaction.appCall?.accessReferences).toBeUndefined();
    expect(count(transaction)).toBe(0);
  });

  test("uses a different call for Access resources when zero needs a legacy slot", () => {
    const transactions = [appCall({ appId: 100n }), appCall({ appId: 200n })];
    const zeroAddress = Address.zeroAddress();

    populateAccessListResources(
      transactions,
      analysis(2, { accounts: [zeroAddress], assets: [9n] }),
    );

    expect(transactions[0].appCall?.accountReferences).toEqual([zeroAddress]);
    expect(transactions[0].appCall?.accessReferences).toBeUndefined();
    expect(transactions[1].appCall?.accessReferences).toEqual([{ assetId: 9n }]);
  });

  test("honors the full 32 KiB box IO quota with 16 entries", () => {
    const transaction = appCall({ appId: 100n });
    populateAccessListResources(
      [transaction],
      analysis(1, {
        boxes: [{ appId: 100n, name: new TextEncoder().encode("weights") }],
        extraBoxRefs: 15,
      }),
    );

    expect(count(transaction)).toBe(16);
    expect(transaction.appCall?.accessReferences).toHaveLength(16);
    expect(
      transaction.appCall?.accessReferences?.slice(1).every(
        (reference) => reference.box?.appId === 0n && reference.box.name.length === 0,
      ),
    ).toBe(true);
    expect(transaction.appCall?.boxReferences).toBeUndefined();

    // The valid empty reference is encoded as `b: {}`. Verify the compatibility
    // shim also lets AlgoKit decode simulation responses containing that form.
    installAccessListResourcePopulator();
    const encoded = encodeTransactionRaw(transaction);
    const wire = algosdk.decodeObj(encoded) as { al: Array<Record<string, unknown>> };
    expect(wire.al.slice(1).every((reference) => Object.keys(reference).length === 0)).toBe(true);
    expect(decodeTransaction(encoded).appCall?.accessReferences).toHaveLength(16);
  });

  test("uses unnamed box entries for an inner-created app instead of its unstable ID", () => {
    const transaction = appCall({ appId: 100n });
    const childAppId = 999n;
    populateAccessListResources(
      [transaction],
      {
        ...analysis(1, {
          apps: [childAppId],
          boxes: [{ appId: childAppId, name: new TextEncoder().encode("w") }],
          extraBoxRefs: 16,
        }),
        createdAppIds: [childAppId],
      },
    );

    expect(transaction.appCall?.accessReferences).toHaveLength(16);
    expect(
      transaction.appCall?.accessReferences?.every(
        (reference) => reference.box?.appId === 0n && reference.box.name.length === 0,
      ),
    ).toBe(true);
  });

  test("deduplicates simple resources supplied by a holding", () => {
    const transaction = appCall({ appId: 100n });
    const holder = address(2);
    populateAccessListResources(
      [transaction],
      analysis(1, {
        accounts: [holder],
        assets: [7n],
        assetHoldings: [{ address: holder, assetId: 7n }],
      }),
    );

    expect(count(transaction)).toBe(3);
    expect(transaction.appCall?.accessReferences).toEqual([{ holding: { address: holder, assetId: 7n } }]);
  });

  test("preserves composite Access references through msgpack and algosdk decoding", () => {
    const transaction = appCall({ appId: 100n });
    const holder = address(2);
    populateAccessListResources(
      [transaction],
      analysis(1, {
        assetHoldings: [{ address: holder, assetId: 7n }],
        boxes: [{ appId: 200n, name: new Uint8Array([1, 2]) }],
      }),
    );

    const encoded = encodeTransactionRaw(transaction);
    const wire = algosdk.decodeObj(encoded) as {
      al: Array<{ d?: Uint8Array; s?: number; p?: number; h?: { d: number; s: number }; b?: { i: number; n: Uint8Array } }>;
      apat?: unknown[];
      apfa?: unknown[];
      apas?: unknown[];
      apbx?: unknown[];
    };
    const decoded = algosdk.decodeUnsignedTransaction(encoded);

    expect(wire.al).toHaveLength(5);
    expect(wire.al[2].h).toEqual({ d: 1, s: 2 });
    expect(wire.al[4].b).toEqual({ i: 4, n: new Uint8Array([1, 2]) });
    expect(wire.apat ?? []).toHaveLength(0);
    expect(wire.apfa ?? []).toHaveLength(0);
    expect(wire.apas ?? []).toHaveLength(0);
    expect(wire.apbx ?? []).toHaveLength(0);
    expect(decoded.applicationCall?.access).toHaveLength(5);
    expect(decoded.applicationCall?.accounts).toHaveLength(0);
    expect(decoded.applicationCall?.foreignApps).toHaveLength(0);
    expect(decoded.applicationCall?.foreignAssets).toHaveLength(0);
    expect(decoded.applicationCall?.boxes).toHaveLength(0);
  });

  test("places a box on a call to its owning app", () => {
    const transactions = [appCall({ appId: 100n }), appCall({ appId: 200n })];
    const box = { appId: 200n, name: new TextEncoder().encode("owned") };
    populateAccessListResources(transactions, analysis(2, { boxes: [box] }));

    expect(transactions[0].appCall?.accessReferences).toBeUndefined();
    expect(transactions[1].appCall?.accessReferences).toEqual([{ box: { appId: 0n, name: box.name } }]);
  });

  test("fits 16 foreign apps without pre-allocating their account addresses", () => {
    const transaction = appCall({ appId: 100n });
    const apps = Array.from({ length: 16 }, (_, index) => BigInt(index + 200));
    populateAccessListResources([transaction], analysis(1, { apps }));

    expect(count(transaction)).toBe(16);
    expect(transaction.appCall?.accessReferences).toEqual(apps.map((appId) => ({ appId })));
  });

  test("preserves indexed legacy arrays and uses a separate Access carrier", () => {
    const routerCall = appCall({
      appId: 100n,
      accountReferences: [address(3)],
      assetReferences: [7n],
    });
    const pluginCall = appCall({ appId: 200n });

    populateAccessListResources([routerCall, pluginCall], analysis(2, { assets: [9n] }));

    expect(routerCall.appCall?.accountReferences).toEqual([address(3)]);
    expect(routerCall.appCall?.assetReferences).toEqual([7n]);
    expect(routerCall.appCall?.accessReferences).toBeUndefined();
    expect(pluginCall.appCall?.accessReferences).toEqual([{ assetId: 9n }]);
  });

  test("keeps transaction-level resources on the transaction that accessed them", () => {
    const transactions = [appCall({ appId: 100n }), appCall({ appId: 200n })];
    populateAccessListResources(transactions, analysis(2, undefined, { 1: { assets: [55n] } }));

    expect(transactions[0].appCall?.accessReferences).toBeUndefined();
    expect(transactions[1].appCall?.accessReferences).toEqual([{ assetId: 55n }]);
  });

  test("moves a current-app local ref to a different app call for consensus v41", () => {
    const transactions = [appCall({ appId: 100n }), appCall({ appId: 200n })];
    const localAddress = address(9);
    populateAccessListResources(transactions, analysis(2, { appLocals: [{ address: localAddress, appId: 100n }] }));

    expect(transactions[0].appCall?.accessReferences).toBeUndefined();
    expect(transactions[1].appCall?.accessReferences).toEqual([{ locals: { address: localAddress, appId: 100n } }]);
    expect(count(transactions[1])).toBe(3);
  });

  test("fails before signing when the group has insufficient Access capacity", () => {
    const transaction = appCall({ appId: 100n });
    expect(() =>
      populateAccessListResources([transaction], analysis(1, { assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)) })),
    ).toThrow(/requires 1 additional safe resource-carrier/);
  });

  test("fails when every app call must retain indexed legacy arrays", () => {
    const transaction = appCall({ appId: 100n, assetReferences: [1n] });
    expect(() => populateAccessListResources([transaction], analysis(1, { assets: [2n] }))).toThrow(
      /requires 1 additional safe resource-carrier/,
    );
  });

  test("replaces AlgoKit's legacy composer population step", () => {
    installAccessListResourcePopulator();
    const transaction = appCall({ appId: 100n });
    const populate = (
      TransactionComposer.prototype as unknown as {
        populateTransactionAndGroupResources(transactions: Transaction[], groupAnalysis?: ComposerGroupAnalysis): Transaction[];
      }
    ).populateTransactionAndGroupResources;

    populate.call(
      { txns: [{ type: "appCall", data: {} }] },
      [transaction],
      analysis(1, { assets: Array.from({ length: 12 }, (_, index) => BigInt(index + 1)) }),
    );

    expect(count(transaction)).toBe(12);
    expect(transaction.appCall?.accessReferences).toHaveLength(12);
    expect(transaction.appCall?.assetReferences).toBeUndefined();
  });

  test("automatically adds a registered opUp carrier for Access and opcode overflow", async () => {
    installAccessListResourcePopulator();

    const requests: Array<{ extraOpcodeBudget?: number; allowUnnamedResources?: boolean }> = [];
    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      extraOpcodeBudget?: number;
      allowUnnamedResources?: boolean;
    }) => {
      requests.push(request);
      const transactionCount = request.txnGroups[0].txns.length;
      return {
        txnGroups: [
          {
            txnResults: Array.from({ length: transactionCount }, () => ({ txnResult: {} })),
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: transactionCount === 1 ? 900 : 930,
            unnamedResourcesAccessed: {
              assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)),
            },
          },
        ],
      };
    };
    const algod = { simulateTransactions };
    registerAccessListResourceCarrier(100n, opUpSpec, algod);

    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 100n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();

    expect(built.transactions).toHaveLength(2);
    expect(built.transactions.map(({ txn }) => count(txn)).reduce((sum, value) => sum + value, 0)).toBe(17);
    expect(built.transactions.every(({ txn }) => count(txn) <= MAX_ACCESS_LIST_ENTRIES)).toBe(true);
    expect(built.transactions[1].txn.appCall?.args?.[0]).toEqual(new Uint8Array([0x85, 0x4d, 0xed, 0xe0]));
    expect(requests).toHaveLength(3);
    expect(requests.slice(0, 2).every((request) => request.extraOpcodeBudget === 320_000)).toBe(true);
    expect(requests[2]).toMatchObject({ allowUnnamedResources: false });
    expect(requests[2].extraOpcodeBudget).toBeUndefined();
  });

  test("recalculates byte fees after adding long Access box references", async () => {
    installAccessListResourcePopulator();
    const boxes = Array.from({ length: 16 }, (_, index) => ({
      appId: 125n,
      name: new Uint8Array(64).fill(index + 1),
    }));
    let strictFee = 0n;
    const algod = {
      simulateTransactions: async (request: {
        txnGroups: Array<{ txns: Array<{ txn: Transaction }> }>;
        allowUnnamedResources?: boolean;
        extraOpcodeBudget?: number;
      }) => {
        const transaction = request.txnGroups[0].txns[0].txn;
        if (request.allowUnnamedResources === false) strictFee = transaction.fee ?? 0n;
        return {
          txnGroups: [
            {
              txnResults: [{ txnResult: {} }],
              appBudgetAdded: (request.extraOpcodeBudget ?? 0) + 700,
              appBudgetConsumed: 500,
              ...(request.allowUnnamedResources === false
                ? {}
                : { unnamedResourcesAccessed: { boxes } }),
            },
          ],
        };
      },
    };
    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({
      appId: 125n,
      sender: address(1),
      args: [new Uint8Array([1, 2, 3, 4])],
      maxFee: microAlgo(10_000n),
    });

    const built = await composer.build();
    const transaction = built.transactions[0].txn;

    expect(transaction.appCall?.accessReferences).toHaveLength(16);
    expect(strictFee).toBe(transaction.fee);
    expect(transaction.fee).toBeGreaterThan(1_000n);
    expect(transaction.fee).toBeGreaterThanOrEqual(
      calculateFee(transaction, { feePerByte: 2n, minFee: 1_000n, maxFee: 10_000n }),
    );
  });

  test("includes the group field when pooling Access bytes and inner fees", async () => {
    installAccessListResourcePopulator();
    const boxes = Array.from({ length: 16 }, (_, index) => ({
      appId: 129n,
      name: new Uint8Array(64).fill(index + 1),
    }));
    const algod = {
      simulateTransactions: async (request: {
        txnGroups: Array<{ txns: Array<{ txn: Transaction }> }>;
        allowUnnamedResources?: boolean;
        extraOpcodeBudget?: number;
      }) => ({
        txnGroups: [
          {
            txnResults: request.txnGroups[0].txns.map((_, index) => ({
              txnResult:
                index === 0
                  ? { innerTxns: [{ txn: { txn: { fee: 0n } } }] }
                  : {},
              ...(request.allowUnnamedResources === false || index !== 0
                ? {}
                : { unnamedResourcesAccessed: { boxes } }),
            })),
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + 1_400,
            appBudgetConsumed: 500,
          },
        ],
      }),
    };
    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      composerConfig: {
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
      },
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({
      appId: 129n,
      sender: address(1),
      args: [new Uint8Array([1, 2, 3, 4])],
      maxFee: microAlgo(10_000n),
    });
    composer.addAppCall({
      appId: 130n,
      sender: address(1),
      args: [new Uint8Array([4, 3, 2, 1])],
      maxFee: microAlgo(5_000n),
    });

    const built = await composer.build();
    const [first, second] = built.transactions.map(({ txn }) => txn);
    const outerRequirement = [first, second].reduce(
      (total, transaction) =>
        total + calculateFee(transaction, { feePerByte: 2n, minFee: 1_000n }),
      0n,
    );

    expect(first.appCall?.accessReferences).toHaveLength(16);
    expect((first.fee ?? 0n) + (second.fee ?? 0n)).toBeGreaterThanOrEqual(
      outerRequirement + 1_000n,
    );
  });

  test("does not rewrite a pooled zero-fee payment that gained no Access bytes", async () => {
    installAccessListResourcePopulator();
    const algod = {
      simulateTransactions: async (request: {
        txnGroups: Array<{ txns: Array<{ txn: Transaction }> }>;
        allowUnnamedResources?: boolean;
        extraOpcodeBudget?: number;
      }) => ({
        txnGroups: [
          {
            txnResults: request.txnGroups[0].txns.map(() => ({ txnResult: {} })),
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + 700,
            appBudgetConsumed: 500,
            ...(request.allowUnnamedResources === false
              ? {}
              : { unnamedResourcesAccessed: { assets: [7n] } }),
          },
        ],
      }),
    };
    const signer = makeEmptyTransactionSigner();
    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => signer,
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addTransaction(
      new Transaction({
        type: TransactionType.Payment,
        sender: address(1),
        fee: 0n,
        firstValid: 1n,
        lastValid: 1_001n,
        payment: { receiver: address(2), amount: 1n },
      }),
      signer,
    );
    composer.addAppCall({
      appId: 126n,
      sender: address(1),
      args: [new Uint8Array([1, 2, 3, 4])],
      staticFee: microAlgo(2_000n),
    });

    const built = await composer.build();

    expect(built.transactions.map(({ txn }) => txn.fee)).toEqual([0n, 2_000n]);
    expect(built.transactions[1].txn.appCall?.accessReferences).toEqual([{ assetId: 7n }]);
  });

  test("uses group surplus without rewriting a zero-fee prebuilt Access app call", async () => {
    installAccessListResourcePopulator();
    const boxes = Array.from({ length: 16 }, (_, index) => ({
      appId: 127n,
      name: new Uint8Array(64).fill(index + 1),
    }));
    const algod = {
      simulateTransactions: async (request: {
        txnGroups: Array<{ txns: Array<{ txn: Transaction }> }>;
        allowUnnamedResources?: boolean;
        extraOpcodeBudget?: number;
      }) => ({
        txnGroups: [
          {
            txnResults: request.txnGroups[0].txns.map((_, index) => ({
              txnResult: {},
              ...(request.allowUnnamedResources === false || index !== 0
                ? {}
                : { unnamedResourcesAccessed: { boxes } }),
            })),
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + 1_400,
            appBudgetConsumed: 500,
          },
        ],
      }),
    };
    const signer = makeEmptyTransactionSigner();
    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => signer,
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    const prebuilt = appCall({ appId: 127n });
    prebuilt.fee = 0n;
    composer.addTransaction(prebuilt, signer);
    composer.addAppCall({
      appId: 128n,
      sender: address(1),
      args: [new Uint8Array([1, 2, 3, 4])],
      staticFee: microAlgo(5_000n),
    });

    const built = await composer.build();

    expect(built.transactions.map(({ txn }) => txn.fee)).toEqual([0n, 5_000n]);
    expect(built.transactions[0].txn.appCall?.accessReferences).toHaveLength(16);
  });

  test("uses the readonly ARC-58 admin getter as the wallet carrier", async () => {
    installAccessListResourcePopulator();
    const algod = {
      simulateTransactions: async (request: { txnGroups: Array<{ txns: unknown[] }> }) => {
        const transactionCount = request.txnGroups[0].txns.length;
        return {
          txnGroups: [
            {
              txnResults: Array.from({ length: transactionCount }, () => ({ txnResult: {} })),
              appBudgetAdded: 320_000 + transactionCount * 700,
              appBudgetConsumed: 500,
              unnamedResourcesAccessed: {
                assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)),
              },
            },
          ],
        };
      },
    };
    registerAccessListResourceCarrier(
      150n,
      {
        methods: [
          {
            name: "arc58_getAdmin",
            args: [],
            returns: { type: "address" },
            readonly: true,
          },
        ],
      },
      algod,
    );
    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 150n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();

    expect(built.transactions.map(({ txn }) => txn.appCall?.appId)).toEqual([150n, 150n]);
    expect(built.transactions[1].txn.appCall?.args?.[0]).toEqual(
      ABIMethod.fromSignature("arc58_getAdmin()address").getSelector(),
    );
  });

  test("repairs a strict-simulation miss without duplicating existing box quota", async () => {
    installAccessListResourcePopulator();
    const missedAccount = address(12);
    const namedBox = { appId: 300n, name: new TextEncoder().encode("state") };
    let discoveryAttempt = 0;
    let strictAttempt = 0;

    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
    }) => {
      const transactionCount = request.txnGroups[0].txns.length;
      const txnResults = Array.from({ length: transactionCount }, () => ({ txnResult: {} }));
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults,
              ...(strictAttempt === 1
                ? {
                    failureMessage: `unavailable Account ${missedAccount.toString()}`,
                    failedAt: [0],
                  }
                : {}),
            },
          ],
        };
      }

      discoveryAttempt += 1;
      return {
        txnGroups: [
          {
            txnResults,
            appBudgetAdded: 320_700,
            appBudgetConsumed: 500,
            unnamedResourcesAccessed: {
              boxes: [namedBox],
              extraBoxRefs: 1,
              ...(discoveryAttempt === 2 ? { accounts: [missedAccount] } : {}),
            },
          },
        ],
      };
    };

    const composer = new TransactionComposer({
      algod: { simulateTransactions } as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 300n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();
    const references = built.transactions[0].txn.appCall?.accessReferences ?? [];

    expect(strictAttempt).toBe(2);
    expect(references.filter((reference) => reference.box?.name.length === 0)).toHaveLength(1);
    expect(references.filter((reference) => reference.box && reference.box.name.length !== 0)).toHaveLength(1);
    expect(references.filter((reference) => reference.address?.equals(missedAccount))).toHaveLength(1);
    expect(count(built.transactions[0].txn)).toBe(3);
  });

  test("tracks apps first reached by an adaptive relaxed simulation", async () => {
    installAccessListResourcePopulator();
    const missedAccount = address(13);
    const createdAppId = 777n;
    let discoveryAttempt = 0;
    let strictAttempt = 0;

    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
      extraOpcodeBudget?: number;
    }) => {
      const transactionCount = request.txnGroups[0].txns.length;
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults: Array.from({ length: transactionCount }, () => ({ txnResult: {} })),
              ...(strictAttempt === 1
                ? {
                    failureMessage: `unavailable Account ${missedAccount.toString()}`,
                    failedAt: [0],
                  }
                : {}),
            },
          ],
        };
      }

      discoveryAttempt += 1;
      const isAdaptiveRelaxedPass = discoveryAttempt === 2;
      return {
        txnGroups: [
          {
            txnResults: Array.from({ length: transactionCount }, (_, index) => ({
              txnResult:
                isAdaptiveRelaxedPass && index === 0
                  ? { innerTxns: [{ appId: createdAppId }] }
                  : {},
            })),
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: 500,
            ...(isAdaptiveRelaxedPass
              ? {
                  unnamedResourcesAccessed: {
                    accounts: [missedAccount],
                    apps: [createdAppId],
                    boxes: [{ appId: createdAppId, name: new TextEncoder().encode("w") }],
                    extraBoxRefs: 1,
                  },
                }
              : {}),
          },
        ],
      };
    };

    const composer = new TransactionComposer({
      algod: { simulateTransactions } as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 350n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();
    const references = built.transactions[0].txn.appCall?.accessReferences ?? [];

    expect(strictAttempt).toBe(2);
    expect(references).toHaveLength(2);
    expect(references.some((reference) => reference.address?.equals(missedAccount))).toBe(true);
    expect(references.some((reference) => reference.box?.name.length === 0)).toBe(true);
    expect(references.some((reference) => reference.appId === createdAppId)).toBe(false);
    expect(references.some((reference) => reference.box?.appId === createdAppId)).toBe(false);
  });

  test("appends repeated opcode carriers without disturbing caller-authored transaction order", async () => {
    installAccessListResourcePopulator();
    let strictAttempt = 0;

    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
      extraOpcodeBudget?: number;
    }) => {
      const transactionCount = request.txnGroups[0].txns.length;
      const txnResults = Array.from({ length: transactionCount }, () => ({ txnResult: {} }));
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults,
              ...(strictAttempt <= 2
                ? { failureMessage: "dynamic cost budget exceeded", failedAt: [transactionCount - 1] }
                : {}),
            },
          ],
        };
      }
      return {
        txnGroups: [
          {
            txnResults,
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: 500,
          },
        ],
      };
    };
    const algod = { simulateTransactions };
    registerAccessListResourceCarrier(400n, opUpSpec, algod);

    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    const firstArgs = new Uint8Array([1, 1, 1, 1]);
    const anchorArgs = new Uint8Array([9, 8, 7, 6]);
    const finalArgs = new Uint8Array([2, 2, 2, 2]);
    composer.addAppCall({ appId: 401n, sender: address(1), args: [firstArgs] });
    composer.addAppCall({ appId: 400n, sender: address(2), args: [anchorArgs] });
    composer.addAppCall({ appId: 402n, sender: address(3), args: [finalArgs] });

    const built = await composer.build();
    const carriers = built.transactions.slice(3).map(({ txn }) => txn);

    expect(strictAttempt).toBe(3);
    expect(built.transactions).toHaveLength(5);
    expect(built.transactions.map(({ txn }) => txn.appCall?.appId)).toEqual([401n, 400n, 402n, 400n, 400n]);
    expect(built.transactions[0].txn.appCall?.args?.[0]).toEqual(firstArgs);
    expect(built.transactions[1].txn.appCall?.args?.[0]).toEqual(anchorArgs);
    expect(built.transactions[2].txn.appCall?.args?.[0]).toEqual(finalArgs);
    expect(carriers.every((transaction) => transaction.sender.equals(address(3)))).toBe(true);
    expect(carriers.every((transaction) => transaction.appCall?.args?.[0]?.every((byte, index) => byte === [0x85, 0x4d, 0xed, 0xe0][index]))).toBe(true);
    expect(new Set(carriers.map((transaction) => transaction.txId())).size).toBe(2);
  });

  test("adds an opcode carrier when strict simulation exposes an ensureBudget inner-call fee", async () => {
    installAccessListResourcePopulator();
    let strictAttempt = 0;

    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
      extraOpcodeBudget?: number;
    }) => {
      const transactionCount = request.txnGroups[0].txns.length;
      const txnResults = Array.from({ length: transactionCount }, () => ({ txnResult: {} }));
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults,
              ...(strictAttempt === 1
                ? {
                    failureMessage:
                      "logic eval error: group fee 0.0A too small (need 1mA). Details: opcodes=itxn_submit",
                    failedAt: [0],
                  }
                : {}),
            },
          ],
        };
      }
      return {
        txnGroups: [
          {
            txnResults,
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: 500,
          },
        ],
      };
    };
    const algod = { simulateTransactions };
    registerAccessListResourceCarrier(410n, opUpSpec, algod);

    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 410n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();

    expect(strictAttempt).toBe(2);
    expect(built.transactions).toHaveLength(2);
    expect(built.transactions[1].txn.note).toEqual(new TextEncoder().encode("akta-access-carrier-2"));
  });

  test("appends a carrier after an ARC-4 application/payment argument block", async () => {
    installAccessListResourcePopulator();
    let strictAttempt = 0;

    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
      extraOpcodeBudget?: number;
    }) => {
      const transactionCount = request.txnGroups[0].txns.length;
      const txnResults = Array.from({ length: transactionCount }, () => ({ txnResult: {} }));
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults,
              ...(strictAttempt === 1
                ? { failureMessage: "opcode budget exceeded", failedAt: [2] }
                : {}),
            },
          ],
        };
      }
      return {
        txnGroups: [
          {
            txnResults,
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: 500,
          },
        ],
      };
    };
    const algod = { simulateTransactions };
    registerAccessListResourceCarrier(600n, opUpSpec, algod);

    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    const sender = address(1);
    const appArgument = appCall({ appId: 600n, sender });
    const paymentArgument = new Transaction({
      type: TransactionType.Payment,
      sender,
      firstValid: 1n,
      lastValid: 2n,
      payment: { receiver: address(2), amount: 1n },
    });
    composer.addAppCallMethodCall({
      appId: 700n,
      sender,
      method: new ABIMethod({
        name: "consume",
        args: [{ type: "appl" }, { type: "pay" }],
        returns: { type: "void" },
      }),
      args: [appArgument, paymentArgument],
    });

    const built = await composer.build();

    expect(strictAttempt).toBe(2);
    expect(built.transactions.map(({ txn }) => txn.type)).toEqual([
      TransactionType.AppCall,
      TransactionType.Payment,
      TransactionType.AppCall,
      TransactionType.AppCall,
    ]);
    expect(built.transactions.map(({ txn }) => txn.appCall?.appId)).toEqual([600n, undefined, 700n, 600n]);
    expect(built.transactions[3].txn.appCall?.args?.[0]).toEqual(new Uint8Array([0x85, 0x4d, 0xed, 0xe0]));
  });

  test("keeps carrier registration isolated by algod client", async () => {
    installAccessListResourcePopulator();
    const response = (transactionCount: number) => ({
      txnGroups: [
        {
          txnResults: Array.from({ length: transactionCount }, () => ({ txnResult: {} })),
          appBudgetAdded: 320_000 + transactionCount * 700,
          appBudgetConsumed: 500,
          unnamedResourcesAccessed: {
            assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)),
          },
        },
      ],
    });
    const registeredAlgod = {
      simulateTransactions: async (request: { txnGroups: Array<{ txns: unknown[] }> }) =>
        response(request.txnGroups[0].txns.length),
    };
    const unrelatedAlgod = {
      simulateTransactions: async (request: { txnGroups: Array<{ txns: unknown[] }> }) =>
        response(request.txnGroups[0].txns.length),
    };
    registerAccessListResourceCarrier(900n, opUpSpec, registeredAlgod);

    const makeComposer = (algod: typeof registeredAlgod) => {
      const composer = new TransactionComposer({
        algod: algod as never,
        getSigner: () => makeEmptyTransactionSigner(),
        getSuggestedParams: async () => ({
          consensusVersion: "test",
          fee: 0n,
          minFee: 1_000n,
          genesisHash: new Uint8Array(32),
          genesisId: "test-v1",
          flatFee: false,
          firstValid: 1n,
          lastValid: 1_001n,
        }),
      });
      composer.addAppCall({ appId: 900n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });
      return composer;
    };

    await expect(makeComposer(unrelatedAlgod).build()).rejects.toThrow(/none of its usable app IDs/);
    await expect(makeComposer(registeredAlgod).build()).resolves.toMatchObject({
      transactions: [{}, {}],
    });
  });

  test("uses another registered app when the business call deletes its own app", async () => {
    installAccessListResourcePopulator();
    const algod = {
      simulateTransactions: async (request: { txnGroups: Array<{ txns: unknown[] }> }) => {
        const transactionCount = request.txnGroups[0].txns.length;
        return {
          txnGroups: [
            {
              txnResults: Array.from({ length: transactionCount }, () => ({ txnResult: {} })),
              appBudgetAdded: 320_000 + transactionCount * 700,
              appBudgetConsumed: 500,
              unnamedResourcesAccessed: {
                assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)),
              },
            },
          ],
        };
      },
    };
    registerAccessListResourceCarrier(901n, opUpSpec, algod);
    registerAccessListResourceCarrier(902n, opUpSpec, algod);
    const composer = new TransactionComposer({
      algod: algod as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({
      appId: 901n,
      sender: address(1),
      onComplete: OnApplicationComplete.DeleteApplication,
      args: [new Uint8Array([1, 2, 3, 4])],
    });

    const built = await composer.build();

    expect(built.transactions.map(({ txn }) => txn.appCall?.appId)).toEqual([901n, 902n]);
    expect(built.transactions[0].txn.appCall?.onComplete).toBe(OnApplicationComplete.DeleteApplication);
    expect(built.transactions[1].txn.appCall?.onComplete).toBe(OnApplicationComplete.NoOp);
  });

  test("one-shot send helpers select the caller transaction while retaining appended carriers", async () => {
    installAccessListResourcePopulator();
    const original = appCall({ appId: 950n });
    const carrier = new Transaction({
      type: TransactionType.AppCall,
      sender: original.sender,
      firstValid: 1n,
      lastValid: 2n,
      note: new TextEncoder().encode("akta-access-carrier-2"),
      appCall: {
        appId: 950n,
        onComplete: OnApplicationComplete.NoOp,
        args: [new Uint8Array([0x85, 0x4d, 0xed, 0xe0])],
      },
    });
    const confirmations = [{ marker: "caller" }, { marker: "carrier" }];
    const fakeComposer = {
      addAppCall: () => fakeComposer,
      send: async () => ({
        transactions: [original, carrier],
        confirmations,
        txIds: ["caller-id", "carrier-id"],
        returns: [],
      }),
    };
    const sender = new AlgorandClientTransactionSender(
      () => fakeComposer as never,
      {} as never,
      {} as never,
    ) as unknown as {
      _send(
        composerCall: (composer: typeof fakeComposer) => typeof fakeComposer.addAppCall,
        log?: unknown,
      ): (params: unknown) => Promise<{
        transaction: Transaction;
        confirmation: unknown;
        txId: string;
        transactions: Transaction[];
      }>;
    };

    const result = await sender._send((composer) => composer.addAppCall)({});

    expect(result.transaction).toBe(original);
    expect(result.confirmation).toBe(confirmations[0]);
    expect(result.txId).toBe("caller-id");
    expect(result.transactions).toEqual([original, carrier]);
  });

  test("clears validation and repair state when a composer is rebuilt", async () => {
    installAccessListResourcePopulator();
    const missedAccount = address(14);
    let strictAttempt = 0;

    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
      extraOpcodeBudget?: number;
    }) => {
      const transactionCount = request.txnGroups[0].txns.length;
      const txnResults = Array.from({ length: transactionCount }, () => ({ txnResult: {} }));
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults,
              ...(strictAttempt === 2
                ? {
                    failureMessage: `unavailable Account ${missedAccount.toString()}`,
                    failedAt: [0],
                  }
                : {}),
            },
          ],
        };
      }
      return {
        txnGroups: [
          {
            txnResults,
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: 500,
            ...(strictAttempt === 2 ? { unnamedResourcesAccessed: { accounts: [missedAccount] } } : {}),
          },
        ],
      };
    };

    const composer = new TransactionComposer({
      algod: { simulateTransactions } as never,
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisId: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 500n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    await composer.build();
    const rebuilt = await composer.rebuild();

    expect(strictAttempt).toBe(3);
    expect(rebuilt.transactions[0].txn.appCall?.accessReferences).toEqual([{ address: missedAccount }]);
  });
});

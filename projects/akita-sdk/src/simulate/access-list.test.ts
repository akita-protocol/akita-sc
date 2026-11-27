import { configureAccessListComposer } from './access-list';
import { describe, expect, test } from "vitest";
import algosdk from "algosdk";
import type { modelsv2 } from 'algosdk';
import type { SimulateUnnamedResourcesAccessed } from './access-list';
import { ABIMethod } from 'algosdk';
import { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer';
import { Address } from 'algosdk';
import { AlgorandClientTransactionSender } from '@algorandfoundation/algokit-utils/types/algorand-client-transaction-sender';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { makeEmptyTransactionSigner, OnApplicationComplete, Transaction, TransactionType, decodeUnsignedTransaction as decodeTransaction, encodeUnsignedTransaction as encodeTransactionRaw } from 'algosdk';
type ResourceReference = algosdk.TransactionResourceReference;
const calculateFee = (txn: Transaction, p: { feePerByte: bigint; minFee: bigint }) => { const fee = BigInt(txn.toByte().length + 75) * p.feePerByte; return fee > p.minFee ? fee : p.minFee; };

import {
  accessListEntryCount,
  boxReadHeadroom,
  BYTES_PER_BOX_REFERENCE,
  canonicalResources,
  type ComposerGroupAnalysis,
  installAccessListResourcePopulator,
  MAX_ACCESS_LIST_ENTRIES,
  populateAccessListResources,
  registerAccessListResourceCarrier,
  requiredOpcodeCarriers,
  seedAccessResources,
  seededAccessResources,
  unavailableResourceFromFailure,
} from "./access-list";

const address = (fill: number) => new Address(new Uint8Array(32).fill(fill));
const opUpSpec = { methods: [{ name: "opUp", args: [], returns: { type: "void" } }] };

function appCall({
  appIndex,
  sender = address(1),
  accounts,
  foreignApps,
  foreignAssets,
  boxes,
}: {
  appIndex: bigint;
  sender?: Address;
  accounts?: Address[];
  foreignApps?: bigint[];
  foreignAssets?: bigint[];
  boxes?: { appIndex: bigint; name: Uint8Array }[];
}): Transaction {
  return new Transaction({ type: TransactionType.appl, sender, appCallParams: {
      appIndex,
      onComplete: OnApplicationComplete.NoOpOC,
      accounts,
      foreignApps,
      foreignAssets,
      boxes,
    }, suggestedParams: { flatFee: true, fee: 0n, minFee: 1000n, firstValid: 1n, lastValid: 2n } });
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
  return accessListEntryCount(transaction, transaction.applicationCall?.access ?? []);
}

describe("requiredOpcodeCarriers", () => {
  test("a group that succeeded at its real budget needs no opcode carriers, whatever consumed/added say", () => {
    // Guild configureConsensus (16 offerings) as simulated on LocalNet: it ran at real budget with nested
    // op-ups, yet the simulator reported consumed 37,927 > added 27,300. Sizing carriers from that asked for 16.
    expect(requiredOpcodeCarriers({ appBudgetConsumed: 37_927, appBudgetAdded: 27_300 }, 1, false)).toBe(0);
  });

  test("a group discovered with extra budget is sized from its consumption", () => {
    // 2 app calls (1,400) and 320,000 extra budget added; 3,500 consumed → 3 carriers of 700
    expect(requiredOpcodeCarriers({ appBudgetConsumed: 3_500, appBudgetAdded: 321_400 }, 2, true)).toBe(3);
    expect(requiredOpcodeCarriers({ appBudgetConsumed: 1_000, appBudgetAdded: 321_400 }, 2, true)).toBe(0);
  });
});

describe("Access-list resource population", () => {
  test("counts encoded dependencies rather than semantic references", () => {
    const transaction = appCall({ appIndex: 100n });
    const other = address(2);
    const references: ResourceReference[] = [
      { holding: { address: other, assetIndex: 7n } },
      { address: other },
      { assetIndex: 7n },
      { box: { appIndex: 200n, name: new Uint8Array([1]) } },
      { appIndex: 200n },
      { locals: { address: other, appIndex: 200n } },
    ];

    // address + asset + holding + foreign app + box + locals
    expect(accessListEntryCount(transaction, references)).toBe(6);
  });

  test("packs more than 16 resources across app calls", () => {
    const transactions = [appCall({ appIndex: 100n }), appCall({ appIndex: 200n })];
    populateAccessListResources(transactions, analysis(2, { assets: Array.from({ length: 25 }, (_, index) => BigInt(index + 1)) }));

    expect(transactions.map(count).reduce((sum, value) => sum + value, 0)).toBe(25);
    expect(transactions.every((transaction) => count(transaction) <= MAX_ACCESS_LIST_ENTRIES)).toBe(true);
    expect(transactions.every((transaction) => transaction.applicationCall?.foreignAssets.length === 0)).toBe(true);
  });

  test("removes explicit inherent refs before enforcing the 16-entry wire limit", () => {
    const transaction = appCall({ appIndex: 100n });
    transaction.applicationCall!.access = [
      { address: transaction.sender },
      { appIndex: 100n },
      ...Array.from({ length: 16 }, (_, index) => ({ assetIndex: BigInt(index + 1) })),
    ];

    populateAccessListResources([transaction], analysis(1));

    expect(transaction.applicationCall?.access).toHaveLength(16);
    expect(transaction.applicationCall?.access?.every((reference) => reference.assetIndex !== undefined)).toBe(true);
    const wire = algosdk.decodeObj(encodeTransactionRaw(transaction)) as { al: unknown[] };
    expect(wire.al).toHaveLength(16);
  });

  test("keeps a literal zero-address account in the legacy Accounts array", () => {
    const transaction = appCall({ appIndex: 100n });
    const zeroAddress = Address.zeroAddress();

    populateAccessListResources([transaction], analysis(1, { accounts: [zeroAddress] }));

    expect(transaction.applicationCall?.accounts).toEqual([zeroAddress]);
    expect(transaction.applicationCall?.access).toEqual([]);
    expect(count(transaction)).toBe(0);
  });

  test("uses a different call for Access resources when zero needs a legacy slot", () => {
    const transactions = [appCall({ appIndex: 100n }), appCall({ appIndex: 200n })];
    const zeroAddress = Address.zeroAddress();

    populateAccessListResources(
      transactions,
      analysis(2, { accounts: [zeroAddress], assets: [9n] }),
    );

    expect(transactions[0].applicationCall?.accounts).toEqual([zeroAddress]);
    expect(transactions[0].applicationCall?.access).toEqual([]);
    expect(transactions[1].applicationCall?.access).toEqual([{ assetIndex: 9n }]);
  });

  test("honors the full 32 KiB box IO quota with 16 entries", () => {
    const transaction = appCall({ appIndex: 100n });
    populateAccessListResources(
      [transaction],
      analysis(1, {
        boxes: [{ appIndex: 100n, name: new TextEncoder().encode("weights") }],
        extraBoxRefs: 15,
      }),
    );

    expect(count(transaction)).toBe(16);
    expect(transaction.applicationCall?.access).toHaveLength(16);
    expect(
      transaction.applicationCall?.access?.slice(1).every(
        (reference) => reference.box?.appIndex === 0n && reference.box.name.length === 0,
      ),
    ).toBe(true);
    expect(transaction.applicationCall?.boxes).toEqual([]);

    // The valid empty reference is encoded as `b: {}`. Verify the compatibility
    // shim also lets AlgoKit decode simulation responses containing that form.
    installAccessListResourcePopulator();
    const encoded = encodeTransactionRaw(transaction);
    const wire = algosdk.decodeObj(encoded) as { al: Array<Record<string, unknown>> };
    expect(wire.al.slice(1).every((reference) => Object.keys(reference).length === 0)).toBe(true);
    expect(decodeTransaction(encoded).applicationCall?.access).toHaveLength(16);
  });

  test("uses unnamed box entries for an inner-created app instead of its unstable ID", () => {
    const transaction = appCall({ appIndex: 100n });
    const childAppId = 999n;
    populateAccessListResources(
      [transaction],
      {
        ...analysis(1, {
          apps: [childAppId],
          boxes: [{ appIndex: childAppId, name: new TextEncoder().encode("w") }],
          extraBoxRefs: 16,
        }),
        createdAppIds: [childAppId],
      },
    );

    expect(transaction.applicationCall?.access).toHaveLength(16);
    expect(
      transaction.applicationCall?.access?.every(
        (reference) => reference.box?.appIndex === 0n && reference.box.name.length === 0,
      ),
    ).toBe(true);
  });

  test("deduplicates simple resources supplied by a holding", () => {
    const transaction = appCall({ appIndex: 100n });
    const holder = address(2);
    populateAccessListResources(
      [transaction],
      analysis(1, {
        accounts: [holder],
        assets: [7n],
        assetHoldings: [{ address: holder, assetIndex: 7n }],
      }),
    );

    expect(count(transaction)).toBe(3);
    expect(transaction.applicationCall?.access).toEqual([{ holding: { address: holder, assetIndex: 7n } }]);
  });

  test("preserves composite Access references through msgpack and algosdk decoding", () => {
    const transaction = appCall({ appIndex: 100n });
    const holder = address(2);
    populateAccessListResources(
      [transaction],
      analysis(1, {
        assetHoldings: [{ address: holder, assetIndex: 7n }],
        boxes: [{ appIndex: 200n, name: new Uint8Array([1, 2]) }],
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
    const transactions = [appCall({ appIndex: 100n }), appCall({ appIndex: 200n })];
    const box = { appIndex: 200n, name: new TextEncoder().encode("owned") };
    populateAccessListResources(transactions, analysis(2, { boxes: [box] }));

    expect(transactions[0].applicationCall?.access).toEqual([]);
    expect(transactions[1].applicationCall?.access).toEqual([{ box: { appIndex: 0n, name: box.name } }]);
  });

  test("fits 16 foreign apps without pre-allocating their account addresses", () => {
    const transaction = appCall({ appIndex: 100n });
    const apps = Array.from({ length: 16 }, (_, index) => BigInt(index + 200));
    populateAccessListResources([transaction], analysis(1, { apps }));

    expect(count(transaction)).toBe(16);
    expect(transaction.applicationCall?.access).toEqual(apps.map((appIndex) => ({ appIndex })));
  });

  test("preserves indexed legacy arrays and uses a separate Access carrier", () => {
    const routerCall = appCall({
      appIndex: 100n,
      accounts: [address(3)],
      foreignAssets: [7n],
    });
    const pluginCall = appCall({ appIndex: 200n });

    populateAccessListResources([routerCall, pluginCall], analysis(2, { assets: [9n] }));

    expect(routerCall.applicationCall?.accounts).toEqual([address(3)]);
    expect(routerCall.applicationCall?.foreignAssets).toEqual([7n]);
    expect(routerCall.applicationCall?.access).toEqual([]);
    expect(pluginCall.applicationCall?.access).toEqual([{ assetIndex: 9n }]);
  });

  test("keeps transaction-level resources on the transaction that accessed them", () => {
    const transactions = [appCall({ appIndex: 100n }), appCall({ appIndex: 200n })];
    populateAccessListResources(transactions, analysis(2, undefined, { 1: { assets: [55n] } }));

    expect(transactions[0].applicationCall?.access).toEqual([]);
    expect(transactions[1].applicationCall?.access).toEqual([{ assetIndex: 55n }]);
  });

  test("moves a current-app local ref to a different app call for consensus v41", () => {
    const transactions = [appCall({ appIndex: 100n }), appCall({ appIndex: 200n })];
    const localAddress = address(9);
    populateAccessListResources(transactions, analysis(2, { appLocals: [{ address: localAddress, appIndex: 100n }] }));

    expect(transactions[0].applicationCall?.access).toEqual([]);
    expect(transactions[1].applicationCall?.access).toEqual([{ locals: { address: localAddress, appIndex: 100n } }]);
    expect(count(transactions[1])).toBe(3);
  });

  test("fails before signing when the group has insufficient Access capacity", () => {
    const transaction = appCall({ appIndex: 100n });
    expect(() =>
      populateAccessListResources([transaction], analysis(1, { assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)) })),
    ).toThrow(/requires 1 additional safe resource-carrier/);
  });

  test("fails when every app call must retain indexed legacy arrays", () => {
    const transaction = appCall({ appIndex: 100n, foreignAssets: [1n] });
    expect(() => populateAccessListResources([transaction], analysis(1, { assets: [2n] }))).toThrow(
      /requires 1 additional safe resource-carrier/,
    );
  });

  test("replaces AlgoKit's legacy composer population step", () => {
    installAccessListResourcePopulator();
    const transaction = appCall({ appIndex: 100n });
    populateAccessListResources([transaction], analysis(1, { assets: Array.from({ length: 12 }, (_, index) => BigInt(index + 1)) }));

    expect(count(transaction)).toBe(12);
    expect(transaction.applicationCall?.access).toHaveLength(12);
    expect(transaction.applicationCall?.foreignAssets).toEqual([]);
  });

  test("charges protocol usage to an app call after a payment and respects its fee cap", async () => {
    installAccessListResourcePopulator();
    const algod = {
      simulateTransactions: async () => ({ txnGroups: [{
        groupUsage: 2_001_001n,
        txnResults: [{ txnResult: {} }, { txnResult: {} }],
        appBudgetAdded: 700, appBudgetConsumed: 100,
      }] }),
    };
    const build = (maxFee: bigint) => {
      const composer = configureAccessListComposer(createComposer({
        algod: nativeAlgod(algod as never),
        getSigner: () => makeEmptyTransactionSigner(),
        getSuggestedParams: async () => ({
          consensusVersion: "test", fee: 0n, minFee: 1_000n,
          genesisHash: new Uint8Array(32), genesisID: "test-v1", flatFee: false,
          firstValid: 1n, lastValid: 1_001n,
        }),
      }), { populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
      composer.addPayment({ sender: address(1), receiver: address(2), amount: microAlgo(1n) });
      composer.addAppCall({ sender: address(1), appId: 100n, maxFee: microAlgo(maxFee) });
      return composer.build();
    };
    const result = await build(2_000n);
    expect(result.transactions.map(({ txn }) => txn.fee)).toEqual([1_000n, 1_002n]);
    await expect(build(1_001n)).rejects.toThrow();
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
      const appBudgetAdded = (request.extraOpcodeBudget ?? 0) + transactionCount * 700;
      const appBudgetConsumed = transactionCount === 1 ? 900 : 930;
      return {
        txnGroups: [
          {
            // Like algod: a group over its pooled budget fails at real budget.
            ...(appBudgetConsumed > appBudgetAdded ? { failureMessage: "dynamic cost budget exceeded", failedAt: [0] } : {}),
            txnResults: Array.from({ length: transactionCount }, () => ({ txnResult: {} })),
            appBudgetAdded,
            appBudgetConsumed,
            unnamedResourcesAccessed: {
              assets: Array.from({ length: 17 }, (_, index) => BigInt(index + 1)),
            },
          },
        ],
      };
    };
    const algod = { simulateTransactions };
    registerAccessListResourceCarrier(100n, opUpSpec, algod);

    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
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
    expect(built.transactions[1].txn.applicationCall?.appArgs?.[0]).toEqual(new Uint8Array([0x85, 0x4d, 0xed, 0xe0]));
    // Pass 1: the real-budget discovery runs out of budget, so discovery is
    // repeated with extra budget to size the carrier. Pass 2 (with carrier)
    // fits the real budget, then the strict validation runs.
    expect(requests).toHaveLength(4);
    expect(requests.map((request) => request.extraOpcodeBudget)).toEqual([undefined, 320_000, undefined, undefined]);
    expect(requests.slice(0, 3).every((request) => request.allowUnnamedResources === true)).toBe(true);
    expect(requests[3]).toMatchObject({ allowUnnamedResources: false });
  });

  test("recalculates byte fees after adding long Access box references", async () => {
    installAccessListResourcePopulator();
    const boxes = Array.from({ length: 16 }, (_, index) => ({
      appIndex: 125n,
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
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
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

    expect(transaction.applicationCall?.access).toHaveLength(16);
    expect(strictFee).toBe(transaction.fee);
    expect(transaction.fee).toBeGreaterThan(1_000n);
    expect(transaction.fee).toBeGreaterThanOrEqual(
      calculateFee(transaction, { feePerByte: 2n, minFee: 1_000n, maxFee: 10_000n }),
    );
  });

  test("includes the group field when pooling Access bytes and inner fees", async () => {
    installAccessListResourcePopulator();
    const boxes = Array.from({ length: 16 }, (_, index) => ({
      appIndex: 129n,
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
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
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
        genesisID: "test-v1",
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

    expect(first.applicationCall?.access).toHaveLength(16);
    expect((first.fee ?? 0n) + (second.fee ?? 0n)).toBeGreaterThanOrEqual(
      outerRequirement + 1_000n,
    );
  });

  test("covers the fees of op-up inner calls an app makes for itself at real budget", async () => {
    // Regression (PluginDex v2): an app that calls `ensureBudget` only ops up
    // when `global OpcodeBudget` is low. Discovery with extra simulate budget
    // hid those inner calls, so their fees were never covered and the strict
    // run failed with "group fee too small", reported as a missing carrier.
    installAccessListResourcePopulator();
    const requests: Array<{ extraOpcodeBudget?: number; allowUnnamedResources?: boolean }> = [];
    const algod = {
      simulateTransactions: async (request: {
        txnGroups: Array<{ txns: Array<{ txn: Transaction }> }>;
        allowUnnamedResources?: boolean;
        extraOpcodeBudget?: number;
      }) => {
        requests.push(request);
        const realBudget = request.extraOpcodeBudget === undefined;
        const opUps = realBudget ? [{ txn: { txn: { fee: 0n } } }, { txn: { txn: { fee: 0n } } }] : [];
        const fee = request.txnGroups[0].txns.reduce((sum, { txn }) => sum + (txn.fee ?? 0n), 0n);
        const required = 1_000n * BigInt(request.txnGroups[0].txns.length + opUps.length);
        return {
          txnGroups: [
            {
              ...(fee < required ? { failureMessage: `group fee ${fee} too small (needs ${required - fee} more)`, failedAt: [0] } : {}),
              txnResults: request.txnGroups[0].txns.map(() => ({
                txnResult: { innerTxns: opUps },
                ...(request.allowUnnamedResources ? { unnamedResourcesAccessed: { assets: [7n] } } : {}),
              })),
              appBudgetAdded: (request.extraOpcodeBudget ?? 0) + 700 * (1 + opUps.length),
              appBudgetConsumed: 1_900,
            },
          ],
        };
      },
    };
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      composerConfig: { populateAppCallResources: true, coverAppCallInnerTransactionFees: true },
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    // No carrier is registered: none may be needed.
    composer.addAppCall({ appId: 131n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])], maxFee: microAlgo(10_000n) });

    const built = await composer.build();

    expect(built.transactions).toHaveLength(1);
    expect(built.transactions[0].txn.fee).toBe(3_000n);
    expect(built.transactions[0].txn.applicationCall?.access).toEqual([{ assetIndex: 7n }]);
    expect(requests.map((request) => request.extraOpcodeBudget)).toEqual([undefined, undefined]);
    expect(requests[1]).toMatchObject({ allowUnnamedResources: false });
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
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => signer,
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addTransaction(
      new Transaction({ type: TransactionType.pay, sender: address(1), paymentParams: { receiver: address(2), amount: 1n }, suggestedParams: { flatFee: true, fee: 0n, minFee: 1000n, fee: 0n, firstValid: 1n, lastValid: 1_001n } }),
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
    expect(built.transactions[1].txn.applicationCall?.access).toEqual([{ assetIndex: 7n }]);
  });

  test("uses group surplus without rewriting a zero-fee prebuilt Access app call", async () => {
    installAccessListResourcePopulator();
    const boxes = Array.from({ length: 16 }, (_, index) => ({
      appIndex: 127n,
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
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => signer,
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 2n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    const prebuilt = appCall({ appIndex: 127n });
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
    expect(built.transactions[0].txn.applicationCall?.access).toHaveLength(16);
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
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 150n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();

    expect(built.transactions.map(({ txn }) => txn.applicationCall?.appIndex)).toEqual([150n, 150n]);
    expect(built.transactions[1].txn.applicationCall?.appArgs?.[0]).toEqual(
      ABIMethod.fromSignature("arc58_getAdmin()address").getSelector(),
    );
  });

  test("repairs a strict-simulation miss without duplicating existing box quota", async () => {
    installAccessListResourcePopulator();
    const missedAccount = address(12);
    const namedBox = { appIndex: 300n, name: new TextEncoder().encode("state") };
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

    const composer = createComposer({
      algod: nativeAlgod({ simulateTransactions } as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 300n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();
    const references = built.transactions[0].txn.applicationCall?.access ?? [];

    expect(strictAttempt).toBe(2);
    expect(references.filter((reference) => reference.box?.name.length === 0)).toHaveLength(1);
    expect(references.filter((reference) => reference.box && reference.box.name.length !== 0)).toHaveLength(1);
    expect(references.filter((reference) => reference.address?.equals(missedAccount))).toHaveLength(1);
    expect(count(built.transactions[0].txn)).toBe(3);
  });

  test("repairs the Local State an inner app call makes accessible, which simulate never reports", async () => {
    // Regression (PluginDex v2 BackrunArbHook): a hook's inner call to the
    // Tinyman pool app passes the pool account, so the AVM requires the
    // (Tinyman, pool) Local State at itxn_submit. Relaxed simulate does not
    // list it, and Access has no implicit account x app cross-product.
    installAccessListResourcePopulator();
    const pool = address(14);
    let strictAttempt = 0;
    const simulateTransactions = async (request: {
      txnGroups: Array<{ txns: unknown[] }>;
      allowUnnamedResources?: boolean;
    }) => {
      const txnResults = request.txnGroups[0].txns.map(() => ({ txnResult: {} }));
      if (request.allowUnnamedResources === false) {
        strictAttempt += 1;
        return {
          txnGroups: [
            {
              txnResults,
              ...(strictAttempt === 1
                ? {
                    failureMessage:
                      `transaction X: logic eval error: inner tx 0 failed: logic eval error: appl ApplicationID: ` +
                      `unavailable Local State 77+${pool.toString()} would be accessible. Details: app=301, pc=1`,
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
            appBudgetAdded: 1_400,
            appBudgetConsumed: 500,
            unnamedResourcesAccessed: { accounts: [pool], apps: [77n, 302n] },
          },
        ],
      };
    };
    const composer = createComposer({
      algod: nativeAlgod({ simulateTransactions } as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 301n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();
    const references = built.transactions[0].txn.applicationCall?.access ?? [];

    expect(strictAttempt).toBe(2);
    expect(
      references.filter((reference) => reference.locals?.appIndex === 77n && reference.locals.address.equals(pool)),
    ).toHaveLength(1);
  });

  test("parses unavailable Local State and Holding failures into composite repairs", () => {
    const account = address(15);
    expect(unavailableResourceFromFailure(`unavailable Local State 9+${account.toString()} would be accessible`)).toEqual({
      appLocals: [{ appIndex: 9n, address: account }],
    });
    expect(unavailableResourceFromFailure(`unavailable Holding 10+${account.toString()}`)).toEqual({
      assetHoldings: [{ assetIndex: 10n, address: account }],
    });
    expect(unavailableResourceFromFailure(`unavailable Holding ${account.toString()}+11`)).toEqual({
      assetHoldings: [{ assetIndex: 11n, address: account }],
    });
    expect(unavailableResourceFromFailure(`unavailable App 12`)).toEqual({ apps: [12n] });
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
                  ? { innerTxns: [{ applicationIndex: createdAppId }] }
                  : {},
            })),
            appBudgetAdded: (request.extraOpcodeBudget ?? 0) + transactionCount * 700,
            appBudgetConsumed: 500,
            ...(isAdaptiveRelaxedPass
              ? {
                  unnamedResourcesAccessed: {
                    accounts: [missedAccount],
                    apps: [createdAppId],
                    boxes: [{ appIndex: createdAppId, name: new TextEncoder().encode("w") }],
                    extraBoxRefs: 1,
                  },
                }
              : {}),
          },
        ],
      };
    };

    const composer = createComposer({
      algod: nativeAlgod({ simulateTransactions } as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 350n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    const built = await composer.build();
    const references = built.transactions[0].txn.applicationCall?.access ?? [];

    expect(strictAttempt).toBe(2);
    expect(references).toHaveLength(2);
    expect(references.some((reference) => reference.address?.equals(missedAccount))).toBe(true);
    expect(references.some((reference) => reference.box?.name.length === 0)).toBe(true);
    expect(references.some((reference) => reference.appIndex === createdAppId)).toBe(false);
    expect(references.some((reference) => reference.box?.appIndex === createdAppId)).toBe(false);
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

    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
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
    expect(built.transactions.map(({ txn }) => txn.applicationCall?.appIndex)).toEqual([401n, 400n, 402n, 400n, 400n]);
    expect(built.transactions[0].txn.applicationCall?.appArgs?.[0]).toEqual(firstArgs);
    expect(built.transactions[1].txn.applicationCall?.appArgs?.[0]).toEqual(anchorArgs);
    expect(built.transactions[2].txn.applicationCall?.appArgs?.[0]).toEqual(finalArgs);
    expect(carriers.every((transaction) => transaction.sender.equals(address(3)))).toBe(true);
    expect(carriers.every((transaction) => transaction.applicationCall?.appArgs?.[0]?.every((byte, index) => byte === [0x85, 0x4d, 0xed, 0xe0][index]))).toBe(true);
    expect(new Set(carriers.map((transaction) => transaction.txID())).size).toBe(2);
  });

  test.each(['need', 'needs'])("adds an opcode carrier for an ensureBudget inner-call fee (%s)", async (wording) => {
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
                      `logic eval error: group fee 0.0A too small (${wording} 1mA). Details: opcodes=itxn_submit`,
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

    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
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

    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    const sender = address(1);
    const appArgument = appCall({ appIndex: 600n, sender });
    const paymentArgument = new Transaction({ type: TransactionType.pay, sender, paymentParams: { receiver: address(2), amount: 1n }, suggestedParams: { flatFee: true, fee: 0n, minFee: 1000n, firstValid: 1n, lastValid: 2n } });
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
      TransactionType.appl,
      TransactionType.pay,
      TransactionType.appl,
      TransactionType.appl,
    ]);
    expect(built.transactions.map(({ txn }) => txn.applicationCall?.appIndex)).toEqual([600n, undefined, 700n, 600n]);
    expect(built.transactions[3].txn.applicationCall?.appArgs?.[0]).toEqual(new Uint8Array([0x85, 0x4d, 0xed, 0xe0]));
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
      const composer = createComposer({
        algod: nativeAlgod(algod as never),
        getSigner: () => makeEmptyTransactionSigner(),
        getSuggestedParams: async () => ({
          consensusVersion: "test",
          fee: 0n,
          minFee: 1_000n,
          genesisHash: new Uint8Array(32),
          genesisID: "test-v1",
          flatFee: false,
          firstValid: 1n,
          lastValid: 1_001n,
        }),
      });
      composer.addAppCall({ appId: 900n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });
      return composer;
    };

    await expect(makeComposer(unrelatedAlgod).build()).rejects.toThrow(/None of its usable app IDs/);
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
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({
      appId: 901n,
      sender: address(1),
      onComplete: OnApplicationComplete.DeleteApplicationOC,
      args: [new Uint8Array([1, 2, 3, 4])],
    });

    const built = await composer.build();

    expect(built.transactions.map(({ txn }) => txn.applicationCall?.appIndex)).toEqual([901n, 902n]);
    expect(built.transactions[0].txn.applicationCall?.onComplete).toBe(OnApplicationComplete.DeleteApplicationOC);
    expect(built.transactions[1].txn.applicationCall?.onComplete).toBe(OnApplicationComplete.NoOpOC);
  });

  test("one-shot send helpers select the caller transaction while retaining appended carriers", async () => {
    installAccessListResourcePopulator();
    const original = appCall({ appIndex: 950n });
    const carrier = new Transaction({ type: TransactionType.appl, sender: original.sender, note: new TextEncoder().encode("akta-access-carrier-2"), appCallParams: {
        appIndex: 950n,
        onComplete: OnApplicationComplete.NoOpOC,
        appArgs: [new Uint8Array([0x85, 0x4d, 0xed, 0xe0])],
      }, suggestedParams: { flatFee: true, fee: 0n, minFee: 1000n, firstValid: 1n, lastValid: 2n } });
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

    const composer = createComposer({
      algod: nativeAlgod({ simulateTransactions } as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test",
        fee: 0n,
        minFee: 1_000n,
        genesisHash: new Uint8Array(32),
        genesisID: "test-v1",
        flatFee: false,
        firstValid: 1n,
        lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ appId: 500n, sender: address(1), args: [new Uint8Array([1, 2, 3, 4])] });

    await composer.build();
    const rebuilt = await composer.rebuild();

    expect(strictAttempt).toBe(3);
    expect(rebuilt.transactions[0].txn.applicationCall?.access).toEqual([{ address: missedAccount }]);
  });
});

describe("Access-list resource seeding (principal resolution, spec §3.6)", () => {
  test("places seeded principal resources group-wide and deduplicates them", () => {
    const wallet = 500n;
    const controlled = address(7);
    const transactions = [appCall({ appIndex: wallet }), appCall({ appIndex: 200n, sender: address(4) })];
    populateAccessListResources(
      transactions,
      analysis(2, { accounts: [controlled] }),
      // P(W) is the called app of call 0, A(C) was discovered, address(4) is a sender: only address(8) is new
      [{ appIndex: wallet }, { address: controlled }, { address: address(4) }, { address: address(8) }],
    );

    const placed = transactions.flatMap((txn) => txn.applicationCall?.access ?? []);
    expect(placed).toHaveLength(2);
    expect(placed).toEqual(expect.arrayContaining([{ address: controlled }, { address: address(8) }]));
  });

  test("ignores zero-address seeds and seeds for apps the group creates", () => {
    const transaction = appCall({ appIndex: 100n });
    populateAccessListResources(
      [transaction],
      { ...analysis(1), createdAppIds: [900n] },
      [{ address: Address.zeroAddress() }, { appIndex: 900n }],
    );

    expect(transaction.applicationCall?.access).toEqual([]);
    expect(transaction.applicationCall?.accounts ?? []).toEqual([]);
  });

  test("seeds count against Access capacity", () => {
    const transaction = appCall({ appIndex: 100n });
    expect(() =>
      populateAccessListResources(
        [transaction],
        analysis(1, { assets: Array.from({ length: 16 }, (_, index) => BigInt(index + 1)) }),
        [{ address: address(9) }],
      ),
    ).toThrow(/requires 1 additional safe resource-carrier/);
  });

  test("boxReadHeadroom is one all-zero box reference per 2,048 B, rounded up", () => {
    expect(BYTES_PER_BOX_REFERENCE).toBe(2_048);
    expect(boxReadHeadroom(0)).toEqual([]);
    expect(boxReadHeadroom(1)).toHaveLength(1);
    expect(boxReadHeadroom(2_048n)).toHaveLength(1);
    expect(boxReadHeadroom(2_049)).toHaveLength(2);
    expect(boxReadHeadroom(94)).toEqual([{ box: { appIndex: 0n, name: new Uint8Array(0) } }]);
  });

  test("seeded box read headroom is placed on top of the references the call and discovery already have", () => {
    const empty = { appIndex: 0n, name: new Uint8Array(0) };
    const isEmpty = (reference: { box?: { appIndex: bigint; name: Uint8Array } }) =>
      reference.box?.appIndex === 0n && reference.box.name.length === 0;
    // The call passes one all-zero reference itself and discovery asks for one more. A group built this
    // way has exactly the budget its simulation needed, so a box created before it is sent does not fit.
    const build = (seeds: Parameters<typeof populateAccessListResources>[2]) => {
      const transaction = appCall({ appIndex: 100n, boxes: [{ appIndex: 100n, name: new TextEncoder().encode("bc") }, empty] });
      populateAccessListResources([transaction], analysis(1, { extraBoxRefs: 1 }), seeds);
      return transaction.applicationCall?.access ?? [];
    };

    expect(build([]).filter(isEmpty)).toHaveLength(2);
    expect(build(boxReadHeadroom(94)).filter(isEmpty)).toHaveLength(3);
    expect(build(boxReadHeadroom(4_096)).filter(isEmpty)).toHaveLength(4);
    // a named seed is still deduplicated
    expect(build([{ box: { appIndex: 100n, name: new TextEncoder().encode("bc") } }])).toHaveLength(3);
  });

  test("box read headroom counts against Access capacity", () => {
    const transaction = appCall({ appIndex: 100n });
    expect(() =>
      populateAccessListResources([transaction], analysis(1, { extraBoxRefs: 16 }), boxReadHeadroom(1)),
    ).toThrow(/requires 1 additional safe resource-carrier/);
  });

  test("seedAccessResources reaches the preparer through composer.build()", async () => {
    installAccessListResourcePopulator();
    const algod = {
      simulateTransactions: async () => ({ txnGroups: [{
        txnResults: [{ txnResult: {} }],
        appBudgetAdded: 700, appBudgetConsumed: 100,
      }] }),
    };
    const composer = createComposer({
      algod: nativeAlgod(algod as never),
      getSigner: () => makeEmptyTransactionSigner(),
      getSuggestedParams: async () => ({
        consensusVersion: "test", fee: 0n, minFee: 1_000n,
        genesisHash: new Uint8Array(32), genesisID: "test-v1", flatFee: false,
        firstValid: 1n, lastValid: 1_001n,
      }),
    });
    composer.addAppCall({ sender: address(1), appId: 100n });
    const walletAddress = algosdk.getApplicationAddress(500n);
    seedAccessResources(composer, [{ appIndex: 500n }, { address: walletAddress }]);
    seedAccessResources(composer, [{ address: walletAddress }]);

    expect(seededAccessResources(composer)).toHaveLength(3);
    const result = await composer.build();
    expect(result.transactions[0].txn.applicationCall?.access).toEqual([{ appIndex: 500n }, { address: walletAddress }]);
  });
});

// Network fixtures use the same request-builder interface as Algodv2.
function nativeAlgod(client: any): any {
  return new Proxy(client, { get(target, key, receiver) {
    if (key !== 'simulateTransactions') return Reflect.get(target, key, receiver);
    return (request: any) => ({ do: async () => {
      const response = await target.simulateTransactions(request);
      const resources = (r: any) => r && ({ ...r, boxes: r.boxes?.map((b: any) => ({ app: b.appIndex, name: b.name })), appLocals: r.appLocals?.map((l: any) => ({ app: l.appIndex, account: l.address })), assetHoldings: r.assetHoldings?.map((h: any) => ({ asset: h.assetIndex, account: h.address })) });
      for (const group of response.txnGroups) {
        group.unnamedResourcesAccessed = resources(group.unnamedResourcesAccessed);
        for (const [i, result] of group.txnResults.entries()) {
          result.unnamedResourcesAccessed = resources(result.unnamedResourcesAccessed);
          result.txnResult.txn ??= request.txnGroups[0].txns[i];
        }
      }
      return response;
    } });
  } });
}

function createComposer(params: ConstructorParameters<typeof TransactionComposer>[0]) {
  return configureAccessListComposer(new TransactionComposer(params), { populateAppCallResources: true, coverAppCallInnerTransactionFees: false, ...(params as any).composerConfig });
}

describe("canonicalResources (deterministic carrier count)", () => {
  // The resources of a hinted AkitaSocial reply as confirmed on LocalNet (2026-10-04 indexer): 8 boxes
  // on the called app, 6 + 2 + 2 + 1 + 1 boxes on five other apps, two AKTA holdings and one more app.
  // 31 Access entries: the reply call plus one 16-entry carrier is enough.
  const REPLY_APP = 1_000n;
  const resources = (): SimulateUnnamedResourcesAccessed => {
    const boxes: { appIndex: bigint; name: Uint8Array }[] = [];
    const perApp: [bigint, number][] = [[REPLY_APP, 8], [995n, 6], [984n, 2], [998n, 2], [999n, 1], [1_001n, 1]];
    for (const [appIndex, n] of perApp) for (let i = 0; i < n; i++) boxes.push({ appIndex, name: new Uint8Array(33).fill(i * 7 + Number(appIndex % 97n)) });
    return {
      accounts: [address(20), address(21)],
      assets: [966n],
      apps: [1_455n],
      boxes,
      assetHoldings: [{ address: address(20), assetIndex: 966n }, { address: address(21), assetIndex: 966n }],
    };
  };

  let seed = 7;
  const random = () => (seed = (seed * 1_103_515_245 + 12_345) % 2 ** 31) / 2 ** 31;
  const shuffled = <T,>(items: readonly T[] | undefined) => {
    const copy = [...(items ?? [])];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  };
  const shuffledResources = (): SimulateUnnamedResourcesAccessed => {
    const r = resources();
    return { ...r, accounts: shuffled(r.accounts), boxes: shuffled(r.boxes), assetHoldings: shuffled(r.assetHoldings) };
  };
  const carriersFor = (groupResources: SimulateUnnamedResourcesAccessed): number => {
    try {
      populateAccessListResources([appCall({ appIndex: REPLY_APP })], analysis(1, groupResources));
      return 0;
    } catch (error) {
      if (error instanceof Error && "requiredCarrierCount" in error) return (error as { requiredCarrierCount: number }).requiredCarrierCount;
      throw error;
    }
  };

  test("the greedy planner's carrier count depends on the order algod reports the resources in", () => {
    const counts = new Set(Array.from({ length: 200 }, () => carriersFor(shuffledResources())));
    expect([...counts].sort()).toEqual([1, 2]);
  });

  test("in canonical order every simulate order packs the same way: exactly one carrier", () => {
    const counts = new Set(Array.from({ length: 200 }, () => carriersFor(canonicalResources(shuffledResources()))));
    expect([...counts]).toEqual([1]);
  });

  test("canonical order: apps, assets, accounts by value; boxes by app then name; holdings by address then asset", () => {
    const a = canonicalResources(shuffledResources());
    const b = canonicalResources(shuffledResources());
    expect(a).toEqual(b);
    expect(a.boxes!.map((box) => box.appIndex)).toEqual([...a.boxes!.map((box) => box.appIndex)].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0)));
    expect(a.assetHoldings!.map((h) => h.address.toString())).toEqual([address(20).toString(), address(21).toString()]);
    expect(a.extraBoxRefs).toBeUndefined();
  });
});

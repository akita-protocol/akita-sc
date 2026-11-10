import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { ABIType, encodeUint64 } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest';
import { registerAccessListResourceCarrier } from 'akita-sdk';
import { LogicalOperator, Operator } from 'akita-sdk/gates';
import { deployAkitaDAO } from '../../tests/fixtures/dao';
import { deployGateClient } from '../../tests/fixtures/gates/gate';
import { deployAssetGate } from '../../tests/fixtures/gates/sub-gates/asset';
import { deployNFDGate } from '../../tests/fixtures/gates/sub-gates/nfd';
import { deployNFDRootGate } from '../../tests/fixtures/gates/sub-gates/nfd-root';
import { GateClient } from '../artifacts/gates/GateClient';
import { MockSubGateFactory } from '../artifacts/mocks/gate/MockSubGateClient';
import { MockGateNfdFactory } from '../artifacts/mocks/gate/MockGateNFDClient';
import { MockGateNfdRegistryFactory } from '../artifacts/mocks/gate/MockGateNFDRegistryClient';
import {
  errBadOperation,
  errImportsClosed,
  errInvalidArgCount,
  errInvalidGateID,
  errInvalidLayer,
  errInvalidRegistryArg,
  errInvalidSubGate,
  errNotAkitaDao,
  errSubGateCostTooHigh,
} from './errors';

/**
 * Regression tests for the 2026-10-02 audit fixes in the Gate v2 family:
 * SG-06 (layered AND/OR semantics + structure validation), SG-16 (sub-gate allowlist and
 * cost cap), SG-A (legacy import window), SG-07 / SG-14 (NFD root / verified addresses)
 * and SG-15 (AssetGate MBR + ALGO).
 */

Config.configure({ populateAppCallResources: true });

const FIRST_GATE_V2_ID = 4_294_967_296n;
const AND = LogicalOperator.And;
const OR = LogicalOperator.Or;
const NONE = LogicalOperator.None;

describe('Gate v2 (audit fixes)', () => {
  const localnet = algorandFixture();
  let sender: string;
  let signer: import('algosdk').TransactionSigner;

  /** mock sub-gates answering true / false, plus one quoting a too-high cost */
  let T: bigint;
  let F: bigint;
  let EXPENSIVE: bigint;
  let UNLISTED: bigint;

  let gate: GateClient;

  const deployMock = async (result: boolean, registrationCost = 0n): Promise<bigint> => {
    const factory = localnet.context.algorand.client.getTypedAppFactory(MockSubGateFactory, {
      defaultSender: sender,
      defaultSigner: signer,
    });
    const { appClient } = await factory.send.create.create({ args: { result, registrationCost } });
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) });
    return appClient.appId;
  };

  type Filter = [bigint, bigint, number];

  const register = async (client: GateClient, filters: Filter[], args?: Uint8Array[]): Promise<bigint> => {
    const gateArgs = args ?? filters.map(() => new Uint8Array());
    const { return: cost } = await client.send.cost({ args: { filters, args: gateArgs }, extraFee: microAlgo(8_000) });
    const payment = await localnet.context.algorand.createTransaction.payment({
      sender,
      receiver: client.appAddress,
      amount: microAlgo(cost ?? 0n),
    });
    const { return: id } = await client.send.register({
      args: { payment, filters, args: gateArgs },
      extraFee: microAlgo(16_000),
    });
    return id!;
  };

  const check = async (client: GateClient, gateId: bigint, count: number): Promise<boolean> => {
    const { return: passed } = await client.send.check({
      args: { caller: sender, gateId, args: Array.from({ length: count }, () => new Uint8Array()) },
      extraFee: microAlgo(8_000),
    });
    return passed!;
  };

  beforeAll(async () => {
    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet;
    sender = testAccount.toString();
    signer = testAccount.signer;
    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    T = await deployMock(true);
    F = await deployMock(false);
    EXPENSIVE = await deployMock(true, 1_000_001n);
    UNLISTED = await deployMock(true);

    gate = await deployGateClient({
      fixture: localnet,
      sender,
      signer,
      args: { legacyCutoff: 100n },
      subGates: [T, F, EXPENSIVE],
    });
    await gate.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
    // let the SDK composer add Gate.opUp() calls when an evaluation needs pooled budget
    registerAccessListResourceCarrier(gate.appId, gate.appClient.appSpec, algorand.client.algod);
  });

  describe('SG-06 layered AND/OR semantics', () => {
    test('[F AND (F OR T)] is false (was (F AND F) OR T = true)', async () => {
      const id = await register(gate, [[0n, F, AND], [1n, F, OR], [1n, T, NONE]]);
      expect(id).toBeGreaterThanOrEqual(FIRST_GATE_V2_ID);
      expect(await check(gate, id, 3)).toBe(false);
    });

    test('[T AND (F OR T)] is true', async () => {
      const id = await register(gate, [[0n, T, AND], [1n, F, OR], [1n, T, NONE]]);
      expect(await check(gate, id, 3)).toBe(true);
    });

    test('[(F OR F) AND (T AND T)] is false (nested group uses the operator before it)', async () => {
      const id = await register(gate, [[0n, F, OR], [0n, F, AND], [1n, T, AND], [1n, T, NONE]]);
      expect(await check(gate, id, 4)).toBe(false);
    });

    test('flat left-to-right evaluation is unchanged', async () => {
      // (T AND F) OR T
      const id = await register(gate, [[0n, T, AND], [0n, F, OR], [0n, T, NONE]]);
      expect(await check(gate, id, 3)).toBe(true);
    });

    test('check rejects an args count different from the filter count', async () => {
      const id = await register(gate, [[0n, T, AND], [0n, T, NONE]]);
      await expect(check(gate, id, 1)).rejects.toThrow(errInvalidArgCount);
    });
  });

  describe('SG-06 structure validation', () => {
    test('rejects an unknown operator on a non-final filter', async () => {
      await expect(register(gate, [[0n, T, NONE], [0n, T, NONE]])).rejects.toThrow(errBadOperation);
    });

    test('rejects an empty filter list', async () => {
      await expect(register(gate, [], [])).rejects.toThrow(errInvalidLayer);
    });

    test('rejects a filter / args length mismatch', async () => {
      await expect(register(gate, [[0n, T, NONE]], [new Uint8Array(), new Uint8Array()])).rejects.toThrow(errInvalidArgCount);
    });

    test('rejects a first layer other than 0', async () => {
      await expect(register(gate, [[1n, T, NONE]])).rejects.toThrow(errInvalidLayer);
    });

    test('rejects a layer jump of more than 1', async () => {
      await expect(register(gate, [[0n, T, AND], [2n, T, NONE]])).rejects.toThrow(errInvalidLayer);
    });

    test('rejects decreasing layers', async () => {
      await expect(register(gate, [[0n, T, AND], [1n, T, AND], [0n, T, NONE]])).rejects.toThrow(errInvalidLayer);
    });
  });

  describe('SG-16 sub-gate allowlist and cost cap', () => {
    test('rejects a sub-gate that is not allowlisted', async () => {
      await expect(register(gate, [[0n, UNLISTED, NONE]])).rejects.toThrow(errInvalidSubGate);
    });

    test('rejects a sub-gate quoting more than the per-filter cost cap', async () => {
      await expect(register(gate, [[0n, EXPENSIVE, NONE]])).rejects.toThrow(errSubGateCostTooHigh);
    });

    test('only the creator can change the allowlist before sealing', async () => {
      const { algorand } = localnet;
      const other = await localnet.context.generateAccount({ initialFunds: (10).algos() });
      const otherClient = algorand.client.getTypedAppClientById(GateClient, {
        appId: gate.appId,
        defaultSender: other.addr,
        defaultSigner: other.signer,
      });
      await expect(otherClient.send.setSubGate({ args: { app: UNLISTED, allowed: true, ctxAware: false } })).rejects.toThrow(errNotAkitaDao);
      expect((await gate.send.isSubGate({ args: { app: UNLISTED } })).return).toBe(false);
      // the context-aware flag is admin-only too
      await expect(otherClient.send.setSubGate({ args: { app: T, allowed: true, ctxAware: true } })).rejects.toThrow(errNotAkitaDao);
      expect((await gate.send.isCtxSubGate({ args: { app: T } })).return).toBe(false);
    });
  });

  describe('SG-A legacy import window', () => {
    test('imports a legacy gate under its original id and evaluates it', async () => {
      await gate.send.importGate({
        args: { id: 7n, entries: [[0n, T, 0n, AND], [1n, F, 0n, OR], [1n, T, 0n, NONE]] },
      });
      expect(await check(gate, 7n, 3)).toBe(true);
      expect((await gate.send.size({ args: { gateId: 7n } })).return).toBe(3n);
    });

    test('rejects ids at or above the legacy cutoff, id 0 and duplicates', async () => {
      await expect(gate.send.importGate({ args: { id: 100n, entries: [[0n, T, 0n, NONE]] } })).rejects.toThrow(errInvalidGateID);
      await expect(gate.send.importGate({ args: { id: 0n, entries: [[0n, T, 0n, NONE]] } })).rejects.toThrow(errInvalidGateID);
      await expect(gate.send.importGate({ args: { id: 7n, entries: [[0n, T, 0n, NONE]] } })).rejects.toThrow(errInvalidGateID);
    });

    test('imports are validated like registrations', async () => {
      await expect(gate.send.importGate({ args: { id: 8n, entries: [[0n, UNLISTED, 0n, NONE]] } })).rejects.toThrow(errInvalidSubGate);
      await expect(gate.send.importGate({ args: { id: 8n, entries: [[0n, T, 0n, NONE], [0n, T, 0n, NONE]] } })).rejects.toThrow(errBadOperation);
    });

    test('after sealing: no imports and the creator loses allowlist control', async () => {
      const sealed = await deployGateClient({
        fixture: localnet,
        sender,
        signer,
        args: { legacyCutoff: 100n },
        subGates: [T],
      });
      await sealed.appClient.fundAppAccount({ amount: microAlgo(500_000) });
      registerAccessListResourceCarrier(sealed.appId, sealed.appClient.appSpec, localnet.context.algorand.client.algod);
      await sealed.send.sealImports({ args: [] });

      await expect(sealed.send.importGate({ args: { id: 9n, entries: [[0n, T, 0n, NONE]] } })).rejects.toThrow(errImportsClosed);
      await expect(sealed.send.sealImports({ args: [] })).rejects.toThrow(errImportsClosed);
      await expect(sealed.send.setSubGate({ args: { app: F, allowed: true, ctxAware: false } })).rejects.toThrow(errNotAkitaDao);

      // registration of allowlisted sub-gates keeps working
      const id = await register(sealed, [[0n, T, NONE]]);
      expect(id).toBe(FIRST_GATE_V2_ID);
      expect(await check(sealed, id, 1)).toBe(true);
    });
  });

  describe('SG-07 / SG-14 NFD root and NFD gates', () => {
    let nfdRootGate: Awaited<ReturnType<typeof deployNFDRootGate>>;
    let nfdGate: Awaited<ReturnType<typeof deployNFDGate>>;
    let rootRegistryId: bigint;

    const packed = (...addresses: string[]) => {
      const out = new Uint8Array(32 * addresses.length);
      addresses.forEach((a, i) => out.set(ABIType.from('address').encode(a), i * 32));
      return out;
    };

    const deployNfd = async (name: string, verified: Uint8Array): Promise<bigint> => {
      const factory = localnet.context.algorand.client.getTypedAppFactory(MockGateNfdFactory, {
        defaultSender: sender,
        defaultSigner: signer,
      });
      const { appClient } = await factory.send.create.create({ args: { name, verified } });
      return appClient.appId;
    };

    const checkRoot = async (nfdApp: bigint, caller = sender): Promise<boolean> => {
      const { return: passed } = await nfdRootGate.send.check({
        args: { caller, registryId: rootRegistryId, args: encodeUint64(nfdApp) },
        extraFee: microAlgo(4_000),
      });
      return passed!;
    };

    beforeAll(async () => {
      const registryFactory = localnet.context.algorand.client.getTypedAppFactory(MockGateNfdRegistryFactory, {
        defaultSender: sender,
        defaultSigner: signer,
      });
      const { appClient: registry } = await registryFactory.send.create.bare();

      const dao = await deployAkitaDAO({ fixture: localnet, sender, signer, apps: { nfdRegistry: registry.appId } });

      nfdRootGate = await deployNFDRootGate({ fixture: localnet, sender, signer, args: { akitaDao: dao.appId } });
      nfdGate = await deployNFDGate({ fixture: localnet, sender, signer, args: { akitaDao: dao.appId } });

      const root = new TextEncoder().encode('akita');
      const { return: cost } = await nfdRootGate.send.cost({ args: { args: root } });
      // SG-17: register cost is now the real box MBR (5_700 + 400 * (2 + len))
      expect(cost).toBe(5_700n + 400n * (2n + BigInt(root.length)));

      const payment = await localnet.context.algorand.createTransaction.payment({
        sender,
        receiver: nfdRootGate.appAddress,
        amount: microAlgo(cost!),
      });
      rootRegistryId = (await nfdRootGate.send.register({ args: { mbrPayment: payment, args: root } })).return!;
    });

    test('a root-level NFD of another root does not pass (was: root check skipped)', async () => {
      expect(await checkRoot(await deployNfd('evil.algo', packed(sender)))).toBe(false);
    });

    test('a segment of a root that merely ends with the label does not pass', async () => {
      expect(await checkRoot(await deployNfd('x.notakita.algo', packed(sender)))).toBe(false);
    });

    test('a segment of the root passes', async () => {
      expect(await checkRoot(await deployNfd('x.akita.algo', packed(sender)))).toBe(true);
    });

    test('the root NFD itself passes (decision SG-H)', async () => {
      expect(await checkRoot(await deployNfd('akita.algo', packed(sender)))).toBe(true);
    });

    test('SG-14: the second verified address is recognised', async () => {
      const other = (await localnet.context.generateAccount({ initialFunds: (1).algos() })).addr.toString();
      const app = await deployNfd('y.akita.algo', packed(other, sender));
      expect(await checkRoot(app)).toBe(true);
      expect(await checkRoot(app, other)).toBe(true);

      const { return: passed } = await nfdGate.send.check({
        args: { caller: sender, registryId: 0n, args: encodeUint64(app) },
        extraFee: microAlgo(4_000),
      });
      expect(passed).toBe(true);
    });

    test('rejects root labels containing a dot', async () => {
      const bad = new TextEncoder().encode('akita.algo');
      const payment = await localnet.context.algorand.createTransaction.payment({
        sender,
        receiver: nfdRootGate.appAddress,
        amount: microAlgo(5_700n + 400n * (2n + BigInt(bad.length))),
      });
      await expect(nfdRootGate.send.register({ args: { mbrPayment: payment, args: bad } })).rejects.toThrow(errInvalidRegistryArg);
    });
  });

  describe('SG-15 AssetGate', () => {
    test('registration MBR covers the box and asset 0 means ALGO', async () => {
      const { algorand } = localnet;
      const assetGate = await deployAssetGate({ fixture: localnet, sender, signer, args: {} });

      const before = await algorand.account.getInformation(assetGate.appAddress);
      const args = ABIType.from('(uint64,uint8,uint64)').encode([0n, Operator.GreaterThanOrEqualTo, 1_000_000n]);
      const { return: cost } = await assetGate.send.cost({ args: { args } });
      expect(cost).toBe(12_500n);

      const payment = await algorand.createTransaction.payment({
        sender,
        receiver: assetGate.appAddress,
        amount: microAlgo(cost!),
      });
      const { return: registryId } = await assetGate.send.register({ args: { mbrPayment: payment, args } });
      const after = await algorand.account.getInformation(assetGate.appAddress);

      // the free balance (balance - min balance) is unchanged: the payment covered the box exactly
      expect(after.balance.microAlgos - after.minBalance.microAlgos).toBe(before.balance.microAlgos - before.minBalance.microAlgos);

      // ALGO balance gate (was: ASA holding API on asset 0 → always false)
      const { return: passed } = await assetGate.send.check({ args: { caller: sender, registryId: registryId!, args: new Uint8Array() } });
      expect(passed).toBe(true);
    });

    test('rejects operators outside the comparison set', async () => {
      const { algorand } = localnet;
      const assetGate = await deployAssetGate({ fixture: localnet, sender, signer, args: {} });
      const args = ABIType.from('(uint64,uint8,uint64)').encode([0n, 70, 1n]);
      const payment = await algorand.createTransaction.payment({ sender, receiver: assetGate.appAddress, amount: microAlgo(12_500n) });
      await expect(assetGate.send.register({ args: { mbrPayment: payment, args } })).rejects.toThrow(errBadOperation);
    });
  });
});

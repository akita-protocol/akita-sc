import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import algosdk, { ABIType } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest';
import { registerAccessListResourceCarrier } from 'akita-sdk';
import { LogicalOperator } from 'akita-sdk/gates';
import { deployGateClient } from '../../tests/fixtures/gates/gate';
import { GateClient, type GateCtx } from '../artifacts/gates/GateClient';
import { MockEchoSubGateFactory } from '../artifacts/mocks/gate/MockEchoSubGateClient';
import { MockSubGateFactory } from '../artifacts/mocks/gate/MockSubGateClient';
import { MockFakeDaoFactory } from '../artifacts/mocks/fake-dao/MockFakeDAOClient';
import { MockPrincipalProbeFactory } from '../artifacts/mocks/principal-probe/MockPrincipalProbeClient';
import { GateMustCheckForAbiMethod, SubGateAllowlistMBR, SubGateCtxAllowlistMBR } from './constants';
import { errGateFailed } from './errors';

/**
 * Gate v2 context forwarding (principal-resolution spec §3.5, §6.9, Q12).
 *
 * `checkFor` / `mustCheckFor(ctx, gateID, args)` forward the first hop's verified
 * `ctx = (principal, wallet, spender)` to sub-gates allowlisted as context-aware, and pass
 * `ctx.principal` to every other sub-gate. The legacy `check` / `mustCheck(caller)` keep calling the
 * plain `check` of every sub-gate.
 *
 * `MockEchoSubGate` passes only when the filter args equal what it received: `check(caller)` →
 * args == caller (32 B); `checkFor(ctx)` → args == encode(ctx) (72 B). So each test proves which call,
 * and which subject, every filter got.
 */

Config.configure({ populateAppCallResources: true });

const AND = LogicalOperator.And;
const OR = LogicalOperator.Or;
const NONE = LogicalOperator.None;
const ctxType = ABIType.from('(address,uint64,address)');
const encodeCtx = (c: GateCtx) => ctxType.encode([c.principal, c.wallet, c.spender]);
const addressBytes = (a: string) => algosdk.decodeAddress(a).publicKey;

describe('Gate v2 context forwarding (Q12)', () => {
  const localnet = algorandFixture();
  let sender: string;
  let signer: algosdk.TransactionSigner;

  let gate: GateClient;
  /** echo sub-gates: flagged context-aware / allowlisted plain */
  let ECHO_CTX: bigint;
  let ECHO_PLAIN: bigint;
  /** fixed-answer sub-gates without checkFor */
  let T: bigint;
  let F: bigint;

  let ctx: GateCtx;
  let principal: string;
  let spender: string;

  type Filter = [bigint, bigint, number];

  const deployEcho = async (): Promise<bigint> => {
    const factory = localnet.context.algorand.client.getTypedAppFactory(MockEchoSubGateFactory, { defaultSender: sender, defaultSigner: signer });
    const { appClient } = await factory.send.create.bare();
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) });
    return appClient.appId;
  };

  const deployFixed = async (result: boolean): Promise<bigint> => {
    const factory = localnet.context.algorand.client.getTypedAppFactory(MockSubGateFactory, { defaultSender: sender, defaultSigner: signer });
    const { appClient } = await factory.send.create.create({ args: { result, registrationCost: 0n } });
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) });
    return appClient.appId;
  };

  const register = async (client: GateClient, filters: Filter[]): Promise<bigint> => {
    const gateArgs = filters.map(() => new Uint8Array());
    const { return: cost } = await client.send.cost({ args: { filters, args: gateArgs }, extraFee: microAlgo(8_000) });
    const payment = await localnet.context.algorand.createTransaction.payment({ sender, receiver: client.appAddress, amount: microAlgo(cost ?? 0n) });
    const { return: id } = await client.send.register({ args: { payment, filters, args: gateArgs }, extraFee: microAlgo(16_000) });
    return id!;
  };

  const checkFor = async (gateId: bigint, args: Uint8Array[], c: GateCtx = ctx, client: GateClient = gate): Promise<boolean> =>
    (await client.send.checkFor({ args: { ctx: c, gateId, args }, extraFee: microAlgo(10_000) })).return!;

  const check = async (gateId: bigint, args: Uint8Array[], caller = principal, client: GateClient = gate): Promise<boolean> =>
    (await client.send.check({ args: { caller, gateId, args }, extraFee: microAlgo(10_000) })).return!;

  const minBalance = async (client: GateClient) =>
    (await localnet.context.algorand.account.getInformation(client.appAddress)).minBalance.microAlgos;

  beforeAll(async () => {
    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet;
    sender = testAccount.toString();
    signer = testAccount.signer;
    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    principal = (await localnet.context.generateAccount({ initialFunds: (1).algos() })).addr.toString();
    spender = (await localnet.context.generateAccount({ initialFunds: (1).algos() })).addr.toString();
    // a ctx whose fields all differ, so a sub-gate that received the wrong one fails
    ctx = { principal, wallet: 4242n, spender };

    ECHO_CTX = await deployEcho();
    ECHO_PLAIN = await deployEcho();
    T = await deployFixed(true);
    F = await deployFixed(false);

    gate = await deployGateClient({ fixture: localnet, sender, signer, args: {}, subGates: [ECHO_PLAIN, T, F], ctxSubGates: [ECHO_CTX] });
    await gate.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });
    registerAccessListResourceCarrier(gate.appId, gate.appClient.appSpec, algorand.client.algod);
  });

  describe('allowlist flag', () => {
    test('setSubGate(app, true, ctxAware) records the flag; isCtxSubGate reads it', async () => {
      expect((await gate.send.isSubGate({ args: { app: ECHO_CTX } })).return).toBe(true);
      expect((await gate.send.isCtxSubGate({ args: { app: ECHO_CTX } })).return).toBe(true);
      expect((await gate.send.isSubGate({ args: { app: ECHO_PLAIN } })).return).toBe(true);
      expect((await gate.send.isCtxSubGate({ args: { app: ECHO_PLAIN } })).return).toBe(false);
      expect((await gate.send.isCtxSubGate({ args: { app: 999_999n } })).return).toBe(false);
    });

    test('box MBR: 6_100 plain, 6_500 context-aware; re-flagging in place adjusts it; removal refunds it', async () => {
      const app = await deployEcho();
      const base = await minBalance(gate);

      await gate.send.setSubGate({ args: { app, allowed: true, ctxAware: false } });
      expect(await minBalance(gate)).toBe(base + BigInt(SubGateAllowlistMBR));

      await gate.send.setSubGate({ args: { app, allowed: true, ctxAware: true } });
      expect(await minBalance(gate)).toBe(base + BigInt(SubGateCtxAllowlistMBR));
      expect((await gate.send.isCtxSubGate({ args: { app } })).return).toBe(true);

      await gate.send.setSubGate({ args: { app, allowed: true, ctxAware: false } });
      expect((await gate.send.isCtxSubGate({ args: { app } })).return).toBe(false);
      expect((await gate.send.isSubGate({ args: { app } })).return).toBe(true);

      await gate.send.setSubGate({ args: { app, allowed: false, ctxAware: true } });
      expect((await gate.send.isSubGate({ args: { app } })).return).toBe(false);
      expect(await minBalance(gate)).toBe(base);
    });
  });

  describe('routing', () => {
    test('a context-aware sub-gate receives checkFor(ctx): the whole verified context', async () => {
      const id = await register(gate, [[0n, ECHO_CTX, NONE]]);
      expect(await checkFor(id, [encodeCtx(ctx)])).toBe(true);
      // proves it was not called with check(ctx.principal)
      expect(await checkFor(id, [addressBytes(principal)])).toBe(false);
      // any other ctx does not match the args the filter was evaluated with
      expect(await checkFor(id, [encodeCtx(ctx)], { ...ctx, wallet: 1n })).toBe(false);
    });

    test('a plain sub-gate receives check(ctx.principal), never the spender', async () => {
      const id = await register(gate, [[0n, ECHO_PLAIN, NONE]]);
      expect(await checkFor(id, [addressBytes(principal)])).toBe(true);
      expect(await checkFor(id, [addressBytes(spender)])).toBe(false);
      expect(await checkFor(id, [encodeCtx(ctx)])).toBe(false);
    });

    test('legacy check(caller) calls the plain check of every sub-gate, context-aware or not', async () => {
      const id = await register(gate, [[0n, ECHO_CTX, NONE]]);
      expect(await check(id, [addressBytes(principal)])).toBe(true);
      expect(await check(id, [encodeCtx(ctx)])).toBe(false);
    });

    test('P2-GATE-04 mixed filters: each sub-gate receives its own call', async () => {
      // ECHO_CTX AND ECHO_PLAIN
      const id = await register(gate, [[0n, ECHO_CTX, AND], [0n, ECHO_PLAIN, NONE]]);
      expect(await checkFor(id, [encodeCtx(ctx), addressBytes(principal)])).toBe(true);
      expect(await checkFor(id, [addressBytes(principal), addressBytes(principal)])).toBe(false);
      expect(await check(id, [addressBytes(principal), addressBytes(principal)])).toBe(true);
      expect(await check(id, [encodeCtx(ctx), addressBytes(principal)])).toBe(false);

      // layered: F OR (ECHO_CTX AND T)
      const nested = await register(gate, [[0n, F, OR], [1n, ECHO_CTX, AND], [1n, T, NONE]]);
      expect(await checkFor(nested, [new Uint8Array(), encodeCtx(ctx), new Uint8Array()])).toBe(true);
      expect(await checkFor(nested, [new Uint8Array(), addressBytes(principal), new Uint8Array()])).toBe(false);
    });

    test('a sub-gate removed from the allowlist after registration is evaluated as plain', async () => {
      const app = await deployEcho();
      await gate.send.setSubGate({ args: { app, allowed: true, ctxAware: true } });
      const id = await register(gate, [[0n, app, NONE]]);
      expect(await checkFor(id, [encodeCtx(ctx)])).toBe(true);
      await gate.send.setSubGate({ args: { app, allowed: false, ctxAware: false } });
      expect(await checkFor(id, [addressBytes(principal)])).toBe(true);
      expect(await checkFor(id, [encodeCtx(ctx)])).toBe(false);
    });

    test('flagging a sub-gate without checkFor breaks context evaluation only (admin error, documented)', async () => {
      const app = await deployFixed(true);
      await gate.send.setSubGate({ args: { app, allowed: true, ctxAware: true } });
      const id = await register(gate, [[0n, app, NONE]]);
      await expect(checkFor(id, [new Uint8Array()])).rejects.toThrow();
      expect(await check(id, [new Uint8Array()])).toBe(true);
    });
  });

  describe('mustCheckFor', () => {
    test('passes like checkFor and fails with errFgte', async () => {
      const id = await register(gate, [[0n, ECHO_CTX, NONE]]);
      await gate.send.mustCheckFor({ args: { ctx, gateId: id, args: [encodeCtx(ctx)] }, extraFee: microAlgo(10_000) });
      await expect(
        gate.send.mustCheckFor({ args: { ctx, gateId: id, args: [addressBytes(principal)] }, extraFee: microAlgo(10_000) }),
      ).rejects.toThrow(errGateFailed);
    });

    test('its selector is the one gateCheckCtx compares (utils/functions.ts GateMustCheckForAbiMethod)', () => {
      const method = gate.appClient.appSpec.methods.find((m) => m.name === 'mustCheckFor')!;
      const signature = `${method.name}(${method.args.map((a) => a.type).join(',')})${method.returns.type}`;
      expect(signature).toBe(GateMustCheckForAbiMethod);
    });

    test('P2-GATE-03 a target rejects a mustCheckFor txn whose ctx differs from its own in any field', async () => {
      const { algorand } = localnet;
      // a probe whose DAO names this Gate, so gateCheckCtx compares against the real mustCheckFor txn
      const dao = (await algorand.client.getTypedAppFactory(MockFakeDaoFactory, { defaultSender: sender, defaultSigner: signer })
        .send.create.create({ args: {} })).appClient;
      await dao.send.setGate({ args: { gate: gate.appId } });
      const probe = (await algorand.client.getTypedAppFactory(MockPrincipalProbeFactory, { defaultSender: sender, defaultSigner: signer })
        .send.create.create({ args: { akitaDao: dao.appId } })).appClient;

      const id = await register(gate, [[0n, ECHO_CTX, NONE]]);
      let nonce = 0;
      const targetAccepts = async (targetCtx: GateCtx, targetId = id): Promise<boolean> => {
        nonce += 1;
        const gateTxn = await gate.params.mustCheckFor({
          args: { ctx, gateId: id, args: [encodeCtx(ctx)] },
          extraFee: microAlgo(10_000),
          note: `p2-gate-03-${nonce}`,
        });
        return (await probe.send.gateCheckCtxOf({ args: { gateTxn, ctx: targetCtx, id: targetId } })).return!;
      };

      expect(await targetAccepts(ctx)).toBe(true);
      expect(await targetAccepts({ ...ctx, principal: spender })).toBe(false);
      expect(await targetAccepts({ ...ctx, wallet: ctx.wallet + 1n })).toBe(false);
      expect(await targetAccepts({ ...ctx, spender: principal })).toBe(false);
      expect(await targetAccepts(ctx, id + 1n)).toBe(false);
    });
  });
});

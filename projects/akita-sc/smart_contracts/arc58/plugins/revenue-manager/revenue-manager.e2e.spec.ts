import * as algokit from '@algorandfoundation/algokit-utils';
import { ABIAddressType, ABIStringType, ABITupleType, ABIUintType, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, RevenueManagerPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { PluginSDKReturn, sendPrepared } from 'akita-sdk';
import { ProposalActionEnum } from 'akita-sdk/dao';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { proposeAndExecute } from '../../../../scripts/utils';
import { expectContractError } from '../../../../tests/utils/errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const BOX_BASE_MBR = 2_500n;
const BOX_BYTE_MBR = 400n;
const REMAINDER = 30n;
const PERCENTAGE = 20n;
const FLAT = 10n;

type SplitArg = [[bigint, string], bigint, bigint];

/**
 * Revenue Manager configuration is DAO-wallet only (F2): every persistent box
 * is funded by the plugin's own account. Configuration therefore runs through
 * the DAO wallet's execution-key grant (proposal + prepared group), while the
 * per-escrow public grant (optIn/start/process/finalize) is exercised directly.
 */
describe('RevenueManager plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let userWallet: WalletSDK;
  let daoWallet: WalletSDK;
  let rm: RevenueManagerPluginSDK;
  let testAssetId: bigint;
  let unmanagedAssetId: bigint;
  let leaseCounter = 0;

  const ESCROWS = {
    test: 'rev_test',
    ref: 'rev_ref',
    migrated: 'rev_migrated',
    disburse: 'rev_disburse',
    skip: 'rev_skip',
    rounding: 'rev_rounding',
  };
  const RECEIVER_OPTED = 'rcv_opt';
  const RECEIVER_NOT_OPTED = 'rcv_no';

  // ── DAO wallet helpers ────────────────────────────────────────────────────

  const ensureDaoExecutionFunds = async () => {
    const admin = (await daoWallet.client.state.global.admin())!;
    await algorand.account.ensureFunded(admin, dispenser.addr, (5).algo());
    await algorand.account.ensureFunded(daoWallet.client.appAddress, dispenser.addr, (20).algo());
    // The DAO funds the plugin's own account, which pays every box MBR (F2).
    await algorand.account.ensureFunded(rm.client.appAddress, dispenser.addr, (1).algo());
  };

  /** Simulate-only build through the DAO wallet's execution-key grant; rejects on invalid calls. */
  const daoBuild = async (calls: PluginSDKReturn[]) => {
    await ensureDaoExecutionFunds();
    leaseCounter += 1;
    return daoWallet.build.usePlugin({
      sender: deployer.addr,
      signer: deployer.signer,
      lease: `rm_spec_${Date.now() % 100_000}_${leaseCounter}`,
      callerType: CallerType.Global,
      windowSize: 2000n,
      calls,
    });
  };

  /** Authorize via DAO proposal and send through the DAO wallet's execution-key grant. */
  const daoExecute = async (calls: PluginSDKReturn[]) => {
    const build = await daoBuild(calls);
    await proposeAndExecute(algorand, akitaUniverse.dao, [{
      type: ProposalActionEnum.ExecutePlugin,
      plugin: rm.appId,
      caller: deployer.addr.toString(),
      escrow: '',
      executionKey: build.lease,
      groups: build.ids,
      firstValid: build.firstValid,
      lastValid: build.lastValid,
    }]);
    await sendPrepared(build.windows[0], algorand.client.algod);
  };

  /** Public per-escrow grant on the DAO wallet, called by `caller`. */
  const daoEscrowCall = (escrow: string, calls: PluginSDKReturn[], caller: TransactionSignerAccount = user) =>
    daoWallet.usePlugin({ sender: caller.addr, signer: caller.signer, callerType: CallerType.Global, escrow, calls });

  const userSplit = (escrow: string, type: bigint, value: bigint): SplitArg => [[userWallet.appId, escrow], type, value];

  const newEscrowCall = (escrow: string, splits: SplitArg[], opts: { allocatable?: boolean, optinAllowed?: boolean } = {}) =>
    rm.newReceiveEscrow({
      sender: deployer.addr,
      signer: deployer.signer,
      escrow,
      source: user.addr.toString(),
      allocatable: opts.allocatable ?? true,
      optinAllowed: opts.optinAllowed ?? true,
      splits,
    });

  // ── State helpers ─────────────────────────────────────────────────────────

  const getReceiveEscrow = async (escrow: string, walletId = daoWallet.appId) => {
    try {
      return await rm.client.state.box.escrows.value({ wallet: walletId, escrow });
    } catch (error) {
      if (error instanceof Error && error.message.includes('box not found')) return undefined;
      throw error;
    }
  };

  const getBox = async (boxName: Uint8Array) =>
    algorand.client.algod.getApplicationBoxByName(Number(rm.appId), boxName).do();

  const getReceiveAssetBoxName = (escrowAddress: string, asset: bigint) => {
    const key = new ABITupleType([new ABIAddressType(), new ABIUintType(64)]).encode([escrowAddress, asset]);
    return new Uint8Array([...Buffer.from('a'), ...key]);
  };

  const getManagedAssetBoxName = (escrow: string, asset: bigint) => {
    const key = new ABITupleType([new ABIUintType(64), new ABIStringType(), new ABIUintType(64)]).encode([
      daoWallet.appId,
      escrow,
      asset,
    ]);
    return new Uint8Array([...Buffer.from('m'), ...key]);
  };

  const boxMbr = (boxName: Uint8Array, valueLength = 0n) => BOX_BASE_MBR + (BOX_BYTE_MBR * (BigInt(boxName.length) + valueLength));

  const info = (address: string | import('algosdk').Address) => algorand.account.getInformation(address);
  const assetAmount = (account: Awaited<ReturnType<typeof info>>, asset: bigint) =>
    account.assets?.find((holding) => holding.assetId === asset)?.amount;

  const escrowAddressOf = async (wallet: WalletSDK, escrow: string) => (await wallet.getEscrow(escrow)).address.toString();

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (500).algo());

    akitaUniverse = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} });
    rm = akitaUniverse.revenueManagerPlugin;
    daoWallet = akitaUniverse.dao.wallet;

    testAssetId = BigInt((await algorand.send.assetCreate({
      sender: deployer.addr, signer: deployer.signer, total: 1_000n, decimals: 0,
      assetName: 'Revenue Manager Plugin Test', unitName: 'RMPT',
    })).confirmation.assetIndex!);
    unmanagedAssetId = BigInt((await algorand.send.assetCreate({
      sender: deployer.addr, signer: deployer.signer, total: 1_000n, decimals: 0,
      assetName: 'Unmanaged Revenue Test Asset', unitName: 'URTA',
    })).confirmation.assetIndex!);

    // A regular (non-DAO) factory wallet: split receiver and F2 negative cases.
    userWallet = await newWallet({
      algorand,
      factoryParams: { appId: akitaUniverse.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Test Wallet',
    });
    await userWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(100_000_000) });
    await userWallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global, sender: user.addr, signer: user.signer });
    await userWallet.usePlugin({ callerType: CallerType.Global, calls: [akitaUniverse.optInPlugin.optIn({ assets: [testAssetId] })] });
    for (const escrow of [RECEIVER_OPTED, RECEIVER_NOT_OPTED]) {
      await userWallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global, escrow, sender: user.addr, signer: user.signer });
    }
    await userWallet.usePlugin({ callerType: CallerType.Global, escrow: RECEIVER_OPTED, calls: [akitaUniverse.optInPlugin.optIn({ assets: [testAssetId] })] });

    // DAO receive escrows + their public, method-restricted RM grants.
    await ensureDaoExecutionFunds();
    const escrowNames = Object.values(ESCROWS);
    for (let i = 0; i < escrowNames.length; i += 2) {
      await proposeAndExecute(algorand, akitaUniverse.dao, escrowNames.slice(i, i + 2).flatMap((escrow) => [
        { type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING },
        {
          type: ProposalActionEnum.AddPlugin,
          client: rm,
          callerType: CallerType.Global,
          escrow,
          sourceLink: 'https://github.com/kylebee/akita-sc',
          useExecutionKey: false,
          methods: [
            { name: rm.optIn(), cooldown: 0n },
            { name: rm.startEscrowDisbursement(), cooldown: 0n },
            { name: rm.processEscrowAllocation(), cooldown: 0n },
            { name: rm.finalizeEscrowDisbursement(), cooldown: 0n },
          ],
        },
      ]) as Parameters<typeof proposeAndExecute>[2]);
    }
    await daoWallet.getPlugins();
    await daoWallet.getEscrows();

    await daoExecute([newEscrowCall(ESCROWS.test, [userSplit('', REMAINDER, 0n)])]);
  });

  beforeEach(fixture.newScope);

  describe('F2: configuration is DAO-wallet only', () => {
    test('rejects every configuration path from a non-DAO wallet without touching plugin state', async () => {
      const escrow = 'user_rev';
      await userWallet.addPlugin({ client: rm, callerType: CallerType.Global, sender: user.addr, signer: user.signer });
      await userWallet.addPlugin({ client: rm, callerType: CallerType.Global, escrow, sender: user.addr, signer: user.signer });
      const pluginBefore = await info(rm.client.appAddress);

      const attempts: PluginSDKReturn[] = [
        rm.newReceiveEscrow({ escrow, source: user.addr.toString(), allocatable: true, optinAllowed: true, splits: [userSplit('', REMAINDER, 0n)] }),
        rm.newReceiveEscrowWithRef({
          escrow, source: user.addr.toString(), allocatable: true, optinAllowed: true,
          splitRef: { app: akitaUniverse.dao.appId, key: new Uint8Array(Buffer.from('revenue_splits')) },
        }),
        rm.migrateReceiveEscrow({
          escrow,
          receiveEscrow: {
            source: user.addr.toString(), allocatable: true, optinAllowed: true, optinCount: 0n,
            phase: 0, allocationCounter: 0n, lastDisbursement: 0n, creationDate: 1_600_000_000n,
          },
          assets: [], splits: [userSplit('', REMAINDER, 0n)], splitRef: { app: 0n, key: new Uint8Array() }, useSplitRef: false,
        }),
        rm.updateSplits({ escrow, splits: [userSplit('', REMAINDER, 0n)] }),
        rm.skipEscrowAllocation({ escrow, ids: [0n] }),
      ];
      for (const call of attempts) {
        await expectContractError(userWallet.usePlugin({ callerType: CallerType.Global, calls: [call] }), 'errForb');
      }

      const pluginAfter = await info(rm.client.appAddress);
      expect(pluginAfter.minBalance.microAlgos).toBe(pluginBefore.minBalance.microAlgos);
      expect(pluginAfter.balance.microAlgos).toBe(pluginBefore.balance.microAlgos);
      expect(await getReceiveEscrow(escrow, userWallet.appId)).toBeUndefined();
    });
  });

  describe('DAO receive-escrow configuration', () => {
    test('creates receive escrow metadata with direct splits', async () => {
      expect(await getReceiveEscrow(ESCROWS.test)).toMatchObject({
        source: user.addr.toString(), allocatable: true, optinAllowed: true, phase: 0,
      });
      const splits = await rm.client.state.box.splits.value({ wallet: daoWallet.appId, escrow: ESCROWS.test });
      expect(splits).toEqual([[[userWallet.appId, ''], 30, 0n]]);
    });

    test('rejects duplicate and malformed configurations', async () => {
      const malformed = ESCROWS.rounding; // configured later in this suite
      await expect(daoBuild([newEscrowCall(ESCROWS.test, [userSplit('', REMAINDER, 0n)])])).rejects.toThrow();
      await expect(daoBuild([newEscrowCall(malformed, [])])).rejects.toThrow();
      await expect(daoBuild([newEscrowCall(malformed, [userSplit('', 99n, 1n)])])).rejects.toThrow();
      await expect(daoBuild([newEscrowCall(malformed, [userSplit('', FLAT, 1n)])])).rejects.toThrow();
      await expect(daoBuild([newEscrowCall(malformed, [userSplit('missing_receiver', REMAINDER, 0n)])])).rejects.toThrow();
      await expect(daoBuild([rm.newReceiveEscrowWithRef({
        escrow: malformed, source: user.addr.toString(), allocatable: true, optinAllowed: true,
        splitRef: { app: 0n, key: new Uint8Array() },
      })])).rejects.toThrow();
      expect(await getReceiveEscrow(malformed)).toBeUndefined();
    });

    test('creates receive escrow metadata with a split reference', async () => {
      await daoExecute([rm.newReceiveEscrowWithRef({
        escrow: ESCROWS.ref,
        source: user.addr.toString(),
        allocatable: false,
        optinAllowed: false,
        splitRef: { app: akitaUniverse.dao.appId, key: new Uint8Array(Buffer.from('revenue_splits')) },
      })]);

      expect(await getReceiveEscrow(ESCROWS.ref)).toMatchObject({ source: user.addr.toString(), allocatable: false, optinAllowed: false });
      const splitRef = await rm.client.state.box.splitRefs.value({ wallet: daoWallet.appId, escrow: ESCROWS.ref });
      expect(splitRef?.app).toBe(akitaUniverse.dao.appId);
      expect(Buffer.from(splitRef?.key ?? []).toString()).toBe('revenue_splits');

      await expect(daoEscrowCall(ESCROWS.ref, [rm.optIn({ sender: user.addr, signer: user.signer, assets: [testAssetId] })])).rejects.toThrow();
      await expect(daoEscrowCall(ESCROWS.ref, [rm.startEscrowDisbursement({ sender: user.addr, signer: user.signer })])).rejects.toThrow();
      expect(await getReceiveEscrow(ESCROWS.ref)).toMatchObject({ optinCount: 0n, phase: 0, allocationCounter: 0n });
    });

    test('migrates receive escrow metadata exactly and cannot overwrite it', async () => {
      const receiveEscrow = {
        source: user.addr.toString(), allocatable: true, optinAllowed: true, optinCount: 0n,
        phase: 0, allocationCounter: 0n, lastDisbursement: 1_700_000_000n, creationDate: 1_600_000_000n,
      };
      const splitRef = { app: akitaUniverse.dao.appId, key: new Uint8Array(Buffer.from('revenue_splits')) };
      const migrate = (overrides: Partial<typeof receiveEscrow> = {}) => rm.migrateReceiveEscrow({
        sender: deployer.addr, signer: deployer.signer,
        escrow: ESCROWS.migrated, receiveEscrow: { ...receiveEscrow, ...overrides },
        assets: [], splits: [], splitRef, useSplitRef: true,
      });

      await expect(daoBuild([migrate({ optinCount: 1n })])).rejects.toThrow();
      await daoExecute([migrate()]);

      expect(await getReceiveEscrow(ESCROWS.migrated)).toEqual(receiveEscrow);
      expect(await rm.client.state.box.splitRefs.value({ wallet: daoWallet.appId, escrow: ESCROWS.migrated })).toEqual(splitRef);
      await expect(daoBuild([migrate()])).rejects.toThrow();
    });

    test('opts the receive escrow into assets and tracks opt-in count', async () => {
      const optIn = (caller: TransactionSignerAccount, assets: bigint[]) =>
        daoEscrowCall(ESCROWS.test, [rm.optIn({ sender: caller.addr, signer: caller.signer, assets })], caller);

      await expect(optIn(user, [])).rejects.toThrow();
      await expect(optIn(deployer, [testAssetId])).rejects.toThrow(); // not the configured source
      expect((await getReceiveEscrow(ESCROWS.test))?.optinCount).toBe(0n);

      const pluginBefore = await info(rm.client.appAddress);
      await optIn(user, [testAssetId]);
      const pluginAfter = await info(rm.client.appAddress);
      const managedBoxName = getManagedAssetBoxName(ESCROWS.test, testAssetId);

      expect(assetAmount(await info(await escrowAddressOf(daoWallet, ESCROWS.test)), testAssetId)).toBe(0n);
      expect((await getReceiveEscrow(ESCROWS.test))?.optinCount).toBe(1n);
      await expect(getBox(managedBoxName)).resolves.toBeDefined();
      expect(pluginAfter.minBalance.microAlgos - pluginBefore.minBalance.microAlgos).toBe(boxMbr(managedBoxName));

      await expect(optIn(user, [testAssetId])).rejects.toThrow();
      expect((await getReceiveEscrow(ESCROWS.test))?.optinCount).toBe(1n);
    });
  });

  describe('F3: disbursement never reverts on a receiver that cannot accept an ASA', () => {
    test('pays opted-in receivers and leaves the undeliverable share in the escrow', async () => {
      const escrow = ESCROWS.disburse;
      await daoExecute([newEscrowCall(escrow, [
        userSplit('', PERCENTAGE, 40_000n),
        userSplit(RECEIVER_OPTED, PERCENTAGE, 30_000n),
        userSplit(RECEIVER_NOT_OPTED, REMAINDER, 0n),
      ])]);
      await daoEscrowCall(escrow, [rm.optIn({ sender: user.addr, signer: user.signer, assets: [testAssetId] })]);

      const escrowAddress = await escrowAddressOf(daoWallet, escrow);
      const mainAddress = userWallet.client.appAddress.toString();
      const optedAddress = await escrowAddressOf(userWallet, RECEIVER_OPTED);
      const notOptedAddress = await escrowAddressOf(userWallet, RECEIVER_NOT_OPTED);
      await algorand.send.payment({ sender: user.addr, signer: user.signer, receiver: escrowAddress, amount: algokit.microAlgo(3_000_000) });
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: escrowAddress, assetId: testAssetId, amount: 10n });

      await daoEscrowCall(escrow, [rm.startEscrowDisbursement({ sender: user.addr, signer: user.signer })]);
      expect((await getReceiveEscrow(escrow))?.phase).toBe(20);

      const process = (ids: bigint[]) => daoEscrowCall(escrow, [rm.processEscrowAllocation({ sender: user.addr, signer: user.signer, ids })]);
      await expect(process([])).rejects.toThrow();
      await expect(process([0n, unmanagedAssetId])).rejects.toThrow();
      await expect(process([0n, testAssetId, testAssetId + 1n])).rejects.toThrow();
      expect((await getReceiveEscrow(escrow))?.allocationCounter).toBe(0n);

      const escrowBefore = await info(escrowAddress);
      const [mainBefore, optedBefore, notOptedBefore, pluginBefore] = await Promise.all(
        [mainAddress, optedAddress, notOptedAddress, rm.client.appAddress].map((a) => info(a)),
      );
      const distributable = escrowBefore.balance.microAlgos - escrowBefore.minBalance.microAlgos;
      const mainAlgo = (distributable * 40_000n) / 100_000n;
      const optedAlgo = (distributable * 30_000n) / 100_000n;

      await process([0n, testAssetId]);

      const escrowAfter = await info(escrowAddress);
      const [mainAfter, optedAfter, notOptedAfter, pluginAfter] = await Promise.all(
        [mainAddress, optedAddress, notOptedAddress, rm.client.appAddress].map((a) => info(a)),
      );
      // ALGO: everyone is paid, the escrow is drained to its minimum balance.
      expect(mainAfter.balance.microAlgos - mainBefore.balance.microAlgos).toBe(mainAlgo);
      expect(optedAfter.balance.microAlgos - optedBefore.balance.microAlgos).toBe(optedAlgo);
      expect(notOptedAfter.balance.microAlgos - notOptedBefore.balance.microAlgos).toBe(distributable - mainAlgo - optedAlgo);
      expect(escrowAfter.balance.microAlgos).toBe(escrowAfter.minBalance.microAlgos);
      // ASA: opted-in receivers are paid; the not-opted-in share stays in the escrow.
      expect((assetAmount(mainAfter, testAssetId) ?? 0n) - (assetAmount(mainBefore, testAssetId) ?? 0n)).toBe(4n);
      expect((assetAmount(optedAfter, testAssetId) ?? 0n) - (assetAmount(optedBefore, testAssetId) ?? 0n)).toBe(3n);
      expect(assetAmount(notOptedAfter, testAssetId)).toBeUndefined();
      expect(assetAmount(escrowAfter, testAssetId)).toBe(3n);
      // The plugin pays no receiver opt-in MBR; only its tracking boxes grow.
      expect(pluginAfter.balance.microAlgos).toBe(pluginBefore.balance.microAlgos);
      expect(pluginAfter.minBalance.microAlgos - pluginBefore.minBalance.microAlgos).toBe(
        boxMbr(getReceiveAssetBoxName(escrowAddress, 0n)) + boxMbr(getReceiveAssetBoxName(escrowAddress, testAssetId)),
      );
      // Authorization is restored on both sides.
      expect(escrowAfter.authAddr?.toString()).toBe(daoWallet.client.appAddress.toString());
      expect(optedAfter.authAddr?.toString()).toBe(userWallet.client.appAddress.toString());
      expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 30, allocationCounter: 2n });

      const finalize = (ids: bigint[]) => daoEscrowCall(escrow, [rm.finalizeEscrowDisbursement({ sender: user.addr, signer: user.signer, ids })]);
      await expect(finalize([testAssetId + 1n])).rejects.toThrow();
      await finalize([0n]);
      expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 30, allocationCounter: 1n });
      await finalize([testAssetId]);
      expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 0, allocationCounter: 0n });
      expect((await info(rm.client.appAddress)).minBalance.microAlgos).toBe(pluginBefore.minBalance.microAlgos);
      await expect(finalize([testAssetId])).rejects.toThrow();
      await expect(daoEscrowCall(escrow, [rm.startEscrowDisbursement({ sender: user.addr, signer: user.signer })])).rejects.toThrow();
    });
  });

  describe('F3: DAO-only escape hatches', () => {
    test('skipEscrowAllocation unsticks a cycle; only the DAO main-account grant can call it', async () => {
      const escrow = ESCROWS.skip;
      // A flat share larger than any balance makes ALGO processing revert every time.
      await daoExecute([newEscrowCall(escrow, [userSplit('', FLAT, 10_000_000_000_000n), userSplit('', REMAINDER, 0n)])]);
      const escrowAddress = await escrowAddressOf(daoWallet, escrow);
      await algorand.send.payment({ sender: user.addr, signer: user.signer, receiver: escrowAddress, amount: algokit.microAlgo(1_000_000) });

      await daoEscrowCall(escrow, [rm.startEscrowDisbursement({ sender: user.addr, signer: user.signer })]);
      await expectContractError(daoEscrowCall(escrow, [rm.processEscrowAllocation({ sender: user.addr, signer: user.signer, ids: [0n] })]), 'errOval');

      // Not callable through the public escrow grant (method restriction), nor while not idle for updateSplits.
      await expect(daoEscrowCall(escrow, [rm.skipEscrowAllocation({ sender: user.addr, signer: user.signer, escrow, ids: [0n] })])).rejects.toThrow();
      await expect(daoBuild([rm.updateSplits({ sender: deployer.addr, signer: deployer.signer, escrow, splits: [userSplit('', REMAINDER, 0n)] })])).rejects.toThrow();

      const escrowBefore = await info(escrowAddress);
      await daoExecute([rm.skipEscrowAllocation({ sender: deployer.addr, signer: deployer.signer, escrow, ids: [0n] })]);
      expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 30, allocationCounter: 1n });
      expect((await info(escrowAddress)).balance.microAlgos).toBe(escrowBefore.balance.microAlgos); // rolls over

      await daoEscrowCall(escrow, [rm.finalizeEscrowDisbursement({ sender: user.addr, signer: user.signer, ids: [0n] })]);
      expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 0, allocationCounter: 0n });
    });

    test('updateSplits replaces splits of an idle escrow and drops a split reference', async () => {
      const replacement = [userSplit(RECEIVER_OPTED, REMAINDER, 0n)];
      await expect(daoBuild([rm.updateSplits({ sender: deployer.addr, signer: deployer.signer, escrow: ESCROWS.skip, splits: [] })])).rejects.toThrow();
      await expect(daoBuild([rm.updateSplits({ sender: deployer.addr, signer: deployer.signer, escrow: ESCROWS.skip, splits: [userSplit('missing_receiver', REMAINDER, 0n)] })])).rejects.toThrow();

      await daoExecute([
        // Chained calls: only the last one rekeys the DAO account back.
        rm.updateSplits({ sender: deployer.addr, signer: deployer.signer, escrow: ESCROWS.skip, splits: replacement, rekeyBack: false }),
        rm.updateSplits({ sender: deployer.addr, signer: deployer.signer, escrow: ESCROWS.ref, splits: replacement }),
      ]);

      expect(await rm.client.state.box.splits.value({ wallet: daoWallet.appId, escrow: ESCROWS.skip }))
        .toEqual([[[userWallet.appId, RECEIVER_OPTED], 30, 0n]]);
      expect(await rm.client.state.box.splits.value({ wallet: daoWallet.appId, escrow: ESCROWS.ref }))
        .toEqual([[[userWallet.appId, RECEIVER_OPTED], 30, 0n]]);
      await expect(rm.client.state.box.splitRefs.value({ wallet: daoWallet.appId, escrow: ESCROWS.ref })).rejects.toThrow('box not found');
    });
  });

  test('percentage-only splits consume the exact ALGO balance without rounding dust', async () => {
    const escrow = ESCROWS.rounding;
    await daoExecute([newEscrowCall(escrow, [
      userSplit('', PERCENTAGE, 33_333n),
      userSplit('', PERCENTAGE, 33_333n),
      userSplit('', PERCENTAGE, 33_334n),
    ], { optinAllowed: false })]);

    const escrowAddress = await escrowAddressOf(daoWallet, escrow);
    const recipientAddress = userWallet.client.appAddress.toString();
    await algorand.send.payment({ sender: user.addr, signer: user.signer, receiver: escrowAddress, amount: algokit.microAlgo(1_000_003) });

    await ensureDaoExecutionFunds();
    const escrowBefore = await info(escrowAddress);
    const recipientBefore = await info(recipientAddress);
    const expected = escrowBefore.balance.microAlgos - escrowBefore.minBalance.microAlgos;

    await daoEscrowCall(escrow, [rm.startEscrowDisbursement({ sender: user.addr, signer: user.signer })]);
    await daoEscrowCall(escrow, [rm.processEscrowAllocation({ sender: user.addr, signer: user.signer, ids: [0n] })]);

    const escrowAfter = await info(escrowAddress);
    const recipientAfter = await info(recipientAddress);
    expect(escrowAfter.balance.microAlgos).toBe(escrowAfter.minBalance.microAlgos);
    expect(recipientAfter.balance.microAlgos - recipientBefore.balance.microAlgos).toBe(expected);
    expect((await getReceiveEscrow(escrow))?.phase).toBe(30);

    await daoEscrowCall(escrow, [rm.finalizeEscrowDisbursement({ sender: user.addr, signer: user.signer, ids: [0n] })]);
    expect(await getReceiveEscrow(escrow)).toMatchObject({ phase: 0, allocationCounter: 0n });
  });
});

/**
 * arc58_deleteEscrow: the wallet's admin deletes an escrow by closing its account out.
 *
 * What a delete has to undo, and who holds each part:
 *   - the escrow account's ALGO, base minimum included        -> closed out to the controlled address
 *   - the escrow app and the factory's record of it           -> EscrowFactory.delete, which only the
 *                                                                wallet app may call for its own escrow
 *   - the wallet's own record of the escrow and its count of  -> deleted here, their storage refunded
 *     the plugins and allowances that name it (two boxes)
 *
 * The wallet refuses the delete while a plugin or an allowance still names the escrow, and the network
 * refuses to close an account that holds an asset. Calls earlier in the same group may remove all of
 * that, which is what the SDK's deleteEscrow sends.
 */
import { Config, microAlgo, populateAppCallResources } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { CallerType, defaultEscrowGrantMbr, escrowCountMbr, newWallet, OptInPluginSDK, PayPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet';
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk';
import { approvalBytes, clearBytes } from '../../../tests/compat/lib/snapshot';
import { sha256Hex } from '../../../tests/compat/lib/teal-facts';
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account';
import { AkitaUniverse, buildAkitaUniverse, deployAkitaDAO } from '../../../tests/fixtures/dao';
import { deployOptInPlugin } from '../../../tests/fixtures/plugins/optin';
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay';
import { expectContractError } from '../../../tests/utils/errors';
import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient';
import { errEscrowDoesNotExist, errEscrowInUse, errEscrowLocked, errForbidden } from './errors';

/** What the factory returns for an escrow app and its record: 100,000 + 50,000 + 12,100. */
const FACTORY_REFUND = 162_100n;
/** What the factory's record of an escrow costs. A delete pays it for an escrow not on record, and gets it back. */
const FACTORY_RECORD = 12_100n;
/** The wallet's record of an escrow: 19,300 plus 400 per byte of its name. */
const escrowRecordMbr = (name: string) => 19_300n + 400n * BigInt(Buffer.from(name).length);
/** The wallet's count of the plugins and allowances that name an escrow: 6,100 plus 400 per byte of its name. */
const countMbr = escrowCountMbr;
/** What the wallet stores to find the escrow of a plugin that uses it by default: 20,500 plus 400 per byte of its name. */
const defaultEscrowMbr = defaultEscrowGrantMbr;

describe('ARC58 escrow deletion', () => {
  const localnet = algorandFixture();

  let walletFactory: WalletFactorySDK;
  let wallet: WalletSDK;
  let payPluginSdk: PayPluginSDK;
  let optInPluginSdk: OptInPluginSDK;
  let universe: AkitaUniverse;
  let sender: string;

  const fees = { coverAppCallInnerTransactionFees: true, maxFee: microAlgo(20_000n), populateAppCallResources: true };

  const account = (address: string) => localnet.algorand.account.getInformation(address);
  const appExists = async (id: bigint) => {
    try {
      await localnet.algorand.client.algod.getApplicationByID(id).do();
      return true;
    } catch {
      return false;
    }
  };
  const hasRecord = async (escrow: string) => (await wallet.getEscrows()).has(escrow);
  /** Whether the factory has the escrow's address on record. */
  const registered = async (address: string) => (await universe.escrowFactory.send.exists({ args: { address } })).return;
  /** How many plugins and allowances the wallet counts for an escrow. */
  const counted = (escrow: string) => wallet.getEscrowRefs(escrow);

  /** A new escrow made by the factory, optionally put on the factory's record. Returns its app id and address. */
  const newEscrow = async (escrow: string, register = false) => {
    await wallet.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
    if (register) await wallet.register({ escrow });
    const { id } = await wallet.getEscrow(escrow);
    return { id, address: getApplicationAddress(id).toString() };
  };

  /** An outside account rekeyed to the wallet and registered as an escrow, which the factory has no part in. Returns its address. */
  const adoptOutsideAccount = async (escrow: string) => {
    const outside = await localnet.context.generateAccount({ initialFunds: (3).algos() });
    await localnet.algorand.send.payment({
      sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n),
      rekeyTo: wallet.client.appAddress,
    });
    await wallet.newEscrow({ escrow, address: outside.addr.toString() });
    return outside.addr.toString();
  };

  /** The contract call alone, with nothing removed first. */
  const deleteEscrow = (escrow: string, from = sender) =>
    wallet.client.send.arc58DeleteEscrow({ sender: from, args: { escrow }, ...fees });

  /** An asset the wallet's own account is opted in to, so the wallet can take it back from an escrow. */
  const assetTheWalletHolds = async () => {
    const { assetId } = await localnet.algorand.send.assetCreate({ sender, total: 1_000n, decimals: 0, assetName: 'Held' });
    await wallet.addPlugin({ client: optInPluginSdk, callerType: CallerType.Global });
    await wallet.usePlugin({ callerType: CallerType.Global, calls: [optInPluginSdk.optIn({ assets: [assetId] })] });
    return assetId;
  };

  beforeAll(async () => {
    Config.configure({ debug: true });
    registerDebugEventHandlers();

    await localnet.newScope();
    const { context: { testAccount } } = localnet;
    universe = await buildAkitaUniverse({ fixture: localnet, sender: testAccount.toString(), signer: testAccount.signer, apps: {} });
    ({ walletFactory } = universe);
    payPluginSdk = await deployPayPlugin({ fixture: localnet, sender: testAccount.toString(), signer: testAccount.signer });
    optInPluginSdk = await deployOptInPlugin({ fixture: localnet, sender: testAccount.toString(), signer: testAccount.signer });
  });

  beforeEach(async () => {
    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet;
    sender = testAccount.toString();

    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    wallet = await newWallet({
      factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: testAccount.signer },
      readerAccount: sender,
      algorand,
      nickname: 'test_wallet',
    });
    // enough for every escrow, grant and allowance a test makes
    await wallet.client.appClient.fundAppAccount({ amount: (10).algos() });
  });

  describe('the contract call', () => {
    test('deletes an escrow and returns everything it held and everything it cost', async () => {
      const escrow = 'to_delete';
      const { id, address } = await newEscrow(escrow, true);
      expect(await counted(escrow)).toBe(0n);

      // leave something in it beyond its 0.1 ALGO minimum
      await localnet.algorand.send.payment({ sender, receiver: address, amount: microAlgo(750_000n) });

      const escrowBefore = await account(address);
      const walletBefore = await account(wallet.client.appAddress.toString());
      expect(escrowBefore.balance.microAlgos).toBe(850_000n);
      expect(escrowBefore.authAddr?.toString()).toBe(wallet.client.appAddress.toString());

      await deleteEscrow(escrow);

      const escrowAfter = await account(address);
      const walletAfter = await account(wallet.client.appAddress.toString());

      // the account is closed: no balance, and no longer rekeyed to anything
      expect(escrowAfter.balance.microAlgos).toBe(0n);
      expect(escrowAfter.authAddr).toBeUndefined();
      // the app is gone, the factory has forgotten it, and so has the wallet
      expect(await appExists(id)).toBe(false);
      expect(await registered(address)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
      expect(await counted(escrow)).toBeUndefined();
      // everything came back to the wallet: what the escrow held, and what the factory was holding for it
      expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(850_000n + FACTORY_REFUND);
      // and the wallet's own storage for the record and the count is released
      expect(walletBefore.minBalance.microAlgos - walletAfter.minBalance.microAlgos).toBe(escrowRecordMbr(escrow) + countMbr(escrow));
    });

    test('puts an escrow the factory has no record of on record itself, and gets that cost back', async () => {
      const escrow = 'unregistered';
      const { id, address } = await newEscrow(escrow);
      expect(await registered(address)).toBe(false);
      const walletBefore = await account(wallet.client.appAddress.toString());

      await deleteEscrow(escrow);

      expect(await appExists(id)).toBe(false);
      expect(await registered(address)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
      // the record was paid for and refunded inside the call, so only the escrow's minimum and what the
      // factory held for its app arrive
      const walletAfter = await account(wallet.client.appAddress.toString());
      expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(100_000n + FACTORY_REFUND - FACTORY_RECORD);
    });

    test('strands nothing in the factory, on record or not', async () => {
      const factoryAddress = universe.escrowFactory.appAddress.toString();
      const before = await account(factoryAddress);
      const spare = before.balance.microAlgos - before.minBalance.microAlgos;

      for (const [escrow, register] of [['no_strand_a', true], ['no_strand_b', false]] as const) {
        const { address } = await newEscrow(escrow, register);
        await localnet.algorand.send.payment({ sender, receiver: address, amount: microAlgo(400_000n) });
        await deleteEscrow(escrow);
      }

      const after = await account(factoryAddress);
      expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos);
      expect(after.balance.microAlgos - after.minBalance.microAlgos).toBe(spare);
    });

    test('a new escrow and its count are made by a call built before other transactions landed', async () => {
      // On a live network other transactions land between building a call and its confirmation, and each
      // one moves the app id the new escrow will get. So nothing the wallet stores for a new escrow may be
      // named after that id: the call could not reference it. This builds the calls, with every
      // reference they need, then lets other transactions land, then sends them.
      const { algorand } = localnet;
      const build = async (group: { composer: () => Promise<{ build: () => Promise<{ atc: algosdk.AtomicTransactionComposer }> }> }) =>
        populateAppCallResources((await (await group.composer()).build()).atc, algorand.client.algod);
      const laterTransactions = async () => {
        for (let i = 0; i < 3; i += 1) {
          await algorand.send.payment({ sender, receiver: sender, amount: microAlgo(0n), note: `between ${Date.now()} ${i}` });
        }
      };
      const methods: [Uint8Array, bigint][] = [];
      const grant = {
        plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, admin: false, delegationType: 0, lastValid: 2n ** 64n - 1n,
        cooldown: 0n, methods, useRounds: false, useExecutionKey: false, coverFees: false, canReclaim: false,
      };

      // an escrow made by itself
      const alone = await build(wallet.client.newGroup().arc58NewEscrow({
        sender, args: { escrow: 'built_early', address: ALGORAND_ZERO_ADDRESS_STRING }, extraFee: microAlgo(10_000n),
      }));
      await laterTransactions();
      await alone.execute(algorand.client.algod, 4);
      expect(await hasRecord('built_early')).toBe(true);
      expect(await counted('built_early')).toBe(0n);

      // an escrow made by the plugin that names it, and one made by a plugin that uses it by default
      const withPlugins = await build(wallet.client.newGroup()
        .arc58AddPlugin({ sender, args: { ...grant, escrow: 'built_named', defaultToEscrow: false }, extraFee: microAlgo(10_000n) })
        .arc58AddPlugin({ sender, args: { ...grant, escrow: 'built_default', defaultToEscrow: true }, extraFee: microAlgo(10_000n) }));
      await laterTransactions();
      await withPlugins.execute(algorand.client.algod, 4);
      expect(await counted('built_named')).toBe(1n);
      expect(await counted('built_default')).toBe(1n);
    });

    test('refuses while a plugin still names the escrow', async () => {
      const escrow = 'has_plugin';
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
      const { id } = await wallet.getEscrow(escrow);
      expect(await counted(escrow)).toBe(1n);

      await expectContractError(deleteEscrow(escrow), errEscrowInUse);
      expect(await appExists(id)).toBe(true);
      expect(await hasRecord(escrow)).toBe(true);

      await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });
      expect(await counted(escrow)).toBe(0n);
      await deleteEscrow(escrow);
      expect(await appExists(id)).toBe(false);
    });

    test('refuses while an allowance is left on the escrow', async () => {
      const escrow = 'has_allowance';
      const { id } = await newEscrow(escrow);
      await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
      expect(await counted(escrow)).toBe(1n);

      await expectContractError(deleteEscrow(escrow), errEscrowInUse);
      expect(await appExists(id)).toBe(true);

      await wallet.removeAllowances({ escrow, assets: [0n] });
      expect(await counted(escrow)).toBe(0n);
      await deleteEscrow(escrow);
      expect(await appExists(id)).toBe(false);
      expect((await wallet.getAllowances()).size).toBe(0);
    });

    test('counts a grant that uses the escrow by default, though the grant is not stored under its name', async () => {
      const escrow = 'default_for';
      const { id } = await newEscrow(escrow);
      const walletAddress = wallet.client.appAddress.toString();
      const minimumBefore = (await account(walletAddress)).minBalance.microAlgos;
      const { plugins: grantMbr } = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });

      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow, defaultToEscrow: true });
      expect(await counted(escrow)).toBe(1n);
      // beside the grant, the wallet stores the escrow's name under the grant's key, to find the count again
      expect((await account(walletAddress)).minBalance.microAlgos - minimumBefore).toBe(grantMbr + defaultEscrowMbr(escrow));

      await expectContractError(deleteEscrow(escrow), errEscrowInUse);

      // such a grant is removed under the empty escrow name, and all its storage is released
      await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' });
      expect(await counted(escrow)).toBe(0n);
      expect((await account(walletAddress)).minBalance.microAlgos).toBe(minimumBefore);
      await deleteEscrow(escrow);
      expect(await appExists(id)).toBe(false);
    });

    test('a grant removed through its alias, or given up by its own caller, no longer counts', async () => {
      const escrow = 'two_ways_out';
      const agent = await localnet.context.generateAccount({ initialFunds: (2).algos() });
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow, name: 'payer' });
      await wallet.addPlugin({ client: payPluginSdk, caller: agent.addr.toString(), escrow });
      const { id } = await wallet.getEscrow(escrow);
      expect(await counted(escrow)).toBe(2n);

      await wallet.removeNamedPlugin({ name: 'payer' });
      expect(await counted(escrow)).toBe(1n);
      await expectContractError(deleteEscrow(escrow), errEscrowInUse);

      // the named caller leaves by itself
      await wallet.client.send.arc58RemovePlugin({
        sender: agent.addr, signer: agent.signer,
        args: { plugin: payPluginSdk.appId, caller: agent.addr.toString(), escrow },
        ...fees,
      });
      expect(await counted(escrow)).toBe(0n);
      await deleteEscrow(escrow);
      expect(await appExists(id)).toBe(false);
    });

    test('keeps count across several plugins and allowances, and other escrows do not count', async () => {
      const escrow = 'busy';
      const other = 'bystander';
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
      await wallet.addPlugin({ client: optInPluginSdk, callerType: CallerType.Global, escrow });
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow: other });
      const created = await localnet.algorand.send.assetCreate({ sender, total: 10n, decimals: 0 });
      await wallet.addAllowances({
        escrow,
        allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }, { asset: created.assetId, type: 'flat', amount: 5n }],
      });
      await wallet.addAllowances({ escrow: other, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
      const { id } = await wallet.getEscrow(escrow);
      expect(await counted(escrow)).toBe(4n);
      expect(await counted(other)).toBe(2n);

      await wallet.removePlugin({ plugin: optInPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });
      await wallet.removeAllowances({ escrow, assets: [created.assetId] });
      expect(await counted(escrow)).toBe(2n);
      await expectContractError(deleteEscrow(escrow), errEscrowInUse);

      await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });
      await wallet.removeAllowances({ escrow, assets: [0n] });
      expect(await counted(escrow)).toBe(0n);
      await deleteEscrow(escrow);

      expect(await hasRecord(escrow)).toBe(false);
      expect(await hasRecord(other)).toBe(true);
      expect(await counted(other)).toBe(2n);
    });

    test('refuses while the escrow still holds an asset, and works once the asset is closed out', async () => {
      const escrow = 'with_asset';
      const { id, address } = await newEscrow(escrow);
      const asset = await assetTheWalletHolds();
      await wallet.client.send.arc58OptInEscrow({ sender, args: { escrow, assets: [asset] }, ...fees });
      await localnet.algorand.send.assetTransfer({ sender, receiver: address, assetId: asset, amount: 25n });

      // an account that holds an asset cannot be closed, so the whole call fails and nothing changes
      await expect(deleteEscrow(escrow)).rejects.toThrow();
      expect(await appExists(id)).toBe(true);
      expect(await hasRecord(escrow)).toBe(true);
      expect((await account(address)).authAddr?.toString()).toBe(wallet.client.appAddress.toString());

      // the admin closes the asset out of the escrow, and then the escrow can go
      await wallet.client.send.arc58Reclaim({ sender, args: { escrow, reclaims: [[asset, 0n, true]] }, ...fees });
      const walletBefore = await account(wallet.client.appAddress.toString());

      await deleteEscrow(escrow);

      const walletAfter = await account(wallet.client.appAddress.toString());
      expect(await appExists(id)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
      expect((await account(address)).balance.microAlgos).toBe(0n);
      // the escrow's minimum and the minimum it held for the asset both come back
      expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(200_000n + FACTORY_REFUND - FACTORY_RECORD);
      expect(walletAfter.assets?.find((holding) => holding.assetId === asset)?.amount).toBe(25n);
    });

    test('refuses a locked escrow', async () => {
      const escrow = 'locked';
      const { id } = await newEscrow(escrow);
      await wallet.toggleEscrowLock({ escrow });

      await expectContractError(deleteEscrow(escrow), errEscrowLocked);
      expect(await appExists(id)).toBe(true);

      await wallet.toggleEscrowLock({ escrow });
      await deleteEscrow(escrow);
      expect(await appExists(id)).toBe(false);
    });

    test('refuses anyone but the admin', async () => {
      const escrow = 'not_yours';
      const { id } = await newEscrow(escrow);
      const stranger = await localnet.context.generateAccount({ initialFunds: (5).algos() });

      await expectContractError(
        wallet.client.send.arc58DeleteEscrow({ sender: stranger.addr, signer: stranger.signer, args: { escrow }, ...fees }),
        errForbidden,
      );
      expect(await appExists(id)).toBe(true);
      expect(await hasRecord(escrow)).toBe(true);
    });

    test('refuses an escrow that does not exist', async () => {
      await expectContractError(deleteEscrow('never_made'), errEscrowDoesNotExist);
    });

    test('an escrow that is an outside account rekeyed to the wallet is counted, closed out and forgotten', async () => {
      const escrow = 'outside';
      const outside = await localnet.context.generateAccount({ initialFunds: (3).algos() });
      await localnet.algorand.send.payment({
        sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n),
        rekeyTo: wallet.client.appAddress,
      });

      await wallet.newEscrow({ escrow, address: outside.addr.toString() });
      expect((await wallet.getEscrow(escrow)).id).toBe(0n);
      expect(await counted(escrow)).toBe(0n);

      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
      expect(await counted(escrow)).toBe(1n);
      await expectContractError(deleteEscrow(escrow), errEscrowInUse);
      await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });

      const held = (await account(outside.addr.toString())).balance.microAlgos;
      const walletBefore = await account(wallet.client.appAddress.toString());

      await deleteEscrow(escrow);

      const walletAfter = await account(wallet.client.appAddress.toString());
      expect((await account(outside.addr.toString())).balance.microAlgos).toBe(0n);
      expect((await account(outside.addr.toString())).authAddr).toBeUndefined();
      expect(await hasRecord(escrow)).toBe(false);
      expect(await counted(escrow)).toBeUndefined();
      // no app and no factory record were involved, so only what the account held comes back
      expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(held);
      expect(walletBefore.minBalance.microAlgos - walletAfter.minBalance.microAlgos).toBe(escrowRecordMbr(escrow) + countMbr(escrow));
    });

    test('an outside account that still holds an asset is refused, and goes once the asset is closed out', async () => {
      const escrow = 'outside_asset';
      const address = await adoptOutsideAccount(escrow);
      const asset = await assetTheWalletHolds();
      await wallet.client.send.arc58OptInEscrow({ sender, args: { escrow, assets: [asset] }, ...fees });
      await localnet.algorand.send.assetTransfer({ sender, receiver: address, assetId: asset, amount: 25n });

      // an account that holds an asset cannot be closed, so the whole call fails and nothing changes
      await expect(deleteEscrow(escrow)).rejects.toThrow();
      expect(await hasRecord(escrow)).toBe(true);
      expect(await counted(escrow)).toBe(0n);
      expect((await account(address)).authAddr?.toString()).toBe(wallet.client.appAddress.toString());

      // the admin closes the asset out of the account, and then the account can go
      await wallet.client.send.arc58Reclaim({ sender, args: { escrow, reclaims: [[asset, 0n, true]] }, ...fees });
      const held = (await account(address)).balance.microAlgos;
      const walletBefore = await account(wallet.client.appAddress.toString());

      await deleteEscrow(escrow);

      const walletAfter = await account(wallet.client.appAddress.toString());
      expect(await hasRecord(escrow)).toBe(false);
      expect(await counted(escrow)).toBeUndefined();
      expect((await account(address)).balance.microAlgos).toBe(0n);
      // closing the account ends its rekey: the address is its own key's again
      expect((await account(address)).authAddr).toBeUndefined();
      // what the account held comes back, the minimum it held for the asset included
      expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(held);
      expect(walletAfter.assets?.find((holding) => holding.assetId === asset)?.amount).toBe(25n);
    });

    test('an outside account that created an asset cannot be closed: the call fails, and the SDK says why and sends nothing', async () => {
      const escrow = 'outside_creator';
      const outside = await localnet.context.generateAccount({ initialFunds: (3).algos() });
      const { assetId } = await localnet.algorand.send.assetCreate({
        sender: outside.addr, signer: outside.signer, total: 10n, decimals: 0, assetName: 'Made',
      });
      await localnet.algorand.send.payment({
        sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n),
        rekeyTo: wallet.client.appAddress,
      });
      const address = outside.addr.toString();
      await wallet.newEscrow({ escrow, address });

      // the network closes no account while an asset it created exists, so the whole call fails and nothing changes
      await expect(deleteEscrow(escrow)).rejects.toThrow();
      expect(await hasRecord(escrow)).toBe(true);
      expect((await account(address)).authAddr?.toString()).toBe(wallet.client.appAddress.toString());

      // the SDK reads that from the chain, names it, and sends nothing
      const plan = await wallet.getEscrowTeardown(escrow);
      expect(plan.blockers.some((blocker) => blocker.includes(`it created an asset that still exists (${assetId})`))).toBe(true);
      await expect(wallet.deleteEscrow({ escrow })).rejects.toThrow(/cannot be deleted/);
      expect(await hasRecord(escrow)).toBe(true);
      expect((await account(address)).authAddr?.toString()).toBe(wallet.client.appAddress.toString());
    });

    test('an outside account registered under two names is closed by the first delete, and the second name can then not be deleted', async () => {
      const first = 'twice_a';
      const second = 'twice_b';
      const address = await adoptOutsideAccount(first);
      // the wallet does not check that an account is registered only once
      await wallet.newEscrow({ escrow: second, address });

      await deleteEscrow(first);
      expect((await account(address)).balance.microAlgos).toBe(0n);
      expect((await account(address)).authAddr).toBeUndefined();

      // The account is no longer rekeyed to the wallet, so the wallet cannot close it a second time. The
      // second record stays, and with it the storage the wallet holds for the record and its count.
      await expect(deleteEscrow(second)).rejects.toThrow(/unauthorized/);
      expect(await hasRecord(second)).toBe(true);
      expect(await counted(second)).toBe(0n);
    });

    test('a name made again is a new escrow that starts with nothing', async () => {
      const escrow = 'reused';
      await wallet.addPlugin({
        client: payPluginSdk, callerType: CallerType.Global, escrow,
        allowances: [{ type: 'flat', asset: 0n, amount: 1_000_000n }],
      });
      const first = await wallet.getEscrow(escrow);
      expect(await counted(escrow)).toBe(2n);

      await wallet.deleteEscrow({ escrow });

      await wallet.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
      const second = await wallet.getEscrow(escrow);
      expect(second.id).not.toBe(first.id);
      expect(await counted(escrow)).toBe(0n);
      // nothing of the first escrow is left to apply to the second: no grant and no allowance
      expect((await wallet.getAllowances()).size).toBe(0);
      const pay = () => wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [payPluginSdk.pay({ payments: [{ receiver: sender, amount: 0n, asset: 0n }] })],
      });
      await expect(pay()).rejects.toThrow();

      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
      await pay();
    });

    test('a locked escrow still keeps its allowances from being removed', async () => {
      const escrow = 'still_locked';
      await newEscrow(escrow);
      await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
      await wallet.toggleEscrowLock({ escrow });

      await expectContractError(wallet.removeAllowances({ escrow, assets: [0n] }), errEscrowLocked);
    });

    test('the address of a deleted escrow is no longer under the wallet, so nothing there can be reclaimed', async () => {
      const escrow = 'gone';
      const { address } = await newEscrow(escrow);
      await deleteEscrow(escrow);

      await localnet.algorand.send.payment({ sender, receiver: address, amount: microAlgo(300_000n) });
      await expectContractError(
        wallet.client.send.arc58Reclaim({ sender, args: { escrow, reclaims: [[0n, 100_000n, false]] }, ...fees }),
        errEscrowDoesNotExist,
      );
      // funds sent to a deleted escrow's address are lost: its app is gone and nothing controls the address
      expect((await account(address)).balance.microAlgos).toBe(300_000n);
      expect(algosdk.isValidAddress(address)).toBe(true);
    });
  });

  describe('through the SDK', () => {
    test('deleteEscrow removes the plugins and allowances, closes out the assets and deletes the escrow in one group', async () => {
      const escrow = 'sdk_whole';
      const other = 'sdk_other';
      const asset = await assetTheWalletHolds();

      // three grants that name the escrow in the three ways a grant can: by its name, by its name with
      // an alias, and by using it as the default
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
      await wallet.addPlugin({ client: optInPluginSdk, callerType: CallerType.Global, escrow, name: 'escrow_opt_in' });
      await wallet.addPlugin({ client: payPluginSdk, caller: sender, escrow, defaultToEscrow: true });
      await wallet.addAllowances({
        escrow,
        allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }, { asset, type: 'flat', amount: 5n }],
      });
      const { id, address } = await wallet.getEscrow(escrow);
      await wallet.client.send.arc58OptInEscrow({ sender, args: { escrow, assets: [asset] }, ...fees });
      await localnet.algorand.send.assetTransfer({ sender, receiver: address, assetId: asset, amount: 25n });
      await localnet.algorand.send.payment({ sender, receiver: address, amount: microAlgo(300_000n) });

      // another escrow with a grant and an allowance of its own, which must be left alone
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow: other });
      await wallet.addAllowances({ escrow: other, allowances: [{ asset: 0n, type: 'flat', amount: 2_000n }] });

      const plan = await wallet.getEscrowTeardown(escrow);
      expect(plan.counted).toBe(5n);
      expect(plan.plugins.length).toBe(3);
      expect(plan.allowances.sort()).toEqual([0n, asset].sort());
      expect(plan.assets).toEqual([asset]);
      expect(plan.blockers).toEqual([]);

      const escrowHeld = (await account(address)).balance.microAlgos;
      const before = await account(wallet.client.appAddress.toString());
      const pluginsBefore = (await wallet.getPlugins()).size;

      const sent = await wallet.deleteEscrow({ escrow });

      // one group: three plugin removals, one allowance removal, one asset close-out, the delete
      expect(sent.length).toBe(1);
      expect(sent[0].txIds.length).toBe(6);

      expect(await appExists(id)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
      expect(await counted(escrow)).toBeUndefined();
      expect((await account(address)).balance.microAlgos).toBe(0n);

      // the three grants and the alias are gone, and the other escrow's grant and the wallet's own are not
      expect((await wallet.getPlugins()).size).toBe(pluginsBefore - 3);
      expect((await wallet.getNamedPlugins()).has('escrow_opt_in')).toBe(false);
      const allowances = await wallet.getAllowances();
      expect(allowances.size).toBe(1);
      expect(allowances.get({ asset: 0n, escrow: other })).toBeDefined();
      expect(await counted(other)).toBe(2n);

      // the asset and every microALGO came back to the wallet (the sender paid the fees)
      const after = await account(wallet.client.appAddress.toString());
      expect(after.assets?.find((holding) => holding.assetId === asset)?.amount).toBe(25n);
      expect(after.balance.microAlgos - before.balance.microAlgos).toBe(escrowHeld + FACTORY_REFUND - FACTORY_RECORD);
    });

    test('deleteEscrow sends one call for an escrow nothing names, on the factory record or not', async () => {
      for (const [escrow, register] of [['sdk_registered', true], ['sdk_unregistered', false]] as const) {
        const { id } = await newEscrow(escrow, register);

        const sent = await wallet.deleteEscrow({ escrow });

        expect(sent.length).toBe(1);
        expect(sent[0].txIds.length).toBe(1);
        expect(await appExists(id)).toBe(false);
        expect(await hasRecord(escrow)).toBe(false);
      }
    });

    test('deleteEscrow leaves a locked escrow alone unless told to unlock it', async () => {
      const escrow = 'sdk_locked';
      const { id } = await newEscrow(escrow);
      await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
      await wallet.toggleEscrowLock({ escrow });

      await expect(wallet.deleteEscrow({ escrow })).rejects.toThrow(/is locked/);
      expect(await appExists(id)).toBe(true);
      expect((await wallet.getEscrow(escrow)).locked).toBe(true);

      // one group: the unlock, the allowance removal, the delete
      const sent = await wallet.deleteEscrow({ escrow, unlock: true });
      expect(sent.length).toBe(1);
      expect(sent[0].txIds.length).toBe(3);
      expect(await appExists(id)).toBe(false);
    });

    test('deleteEscrow sends nothing when the wallet could not take back an asset the escrow holds', async () => {
      const escrow = 'sdk_blocked';
      const { id, address } = await newEscrow(escrow);
      const created = await localnet.algorand.send.assetCreate({ sender, total: 10n, decimals: 0 });
      await wallet.client.send.arc58OptInEscrow({ sender, args: { escrow, assets: [created.assetId] }, ...fees });
      await localnet.algorand.send.assetTransfer({ sender, receiver: address, assetId: created.assetId, amount: 3n });

      const plan = await wallet.getEscrowTeardown(escrow);
      expect(plan.blockers.length).toBe(1);
      await expect(wallet.deleteEscrow({ escrow })).rejects.toThrow(/not opted in/);
      expect(await appExists(id)).toBe(true);
      expect(await hasRecord(escrow)).toBe(true);
    });

    test('deleteEscrow closes out an adopted account with one call', async () => {
      const escrow = 'sdk_outside';
      const outside = await localnet.context.generateAccount({ initialFunds: (2).algos() });
      await localnet.algorand.send.payment({
        sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n),
        rekeyTo: wallet.client.appAddress,
      });
      await wallet.newEscrow({ escrow, address: outside.addr.toString() });

      const sent = await wallet.deleteEscrow({ escrow });

      expect(sent.length).toBe(1);
      expect(sent[0].txIds.length).toBe(1);
      expect((await account(outside.addr.toString())).balance.microAlgos).toBe(0n);
      expect(await hasRecord(escrow)).toBe(false);
    });

    test('deleteEscrow takes an adopted account apart in one group: its plugin, its allowance, its asset and the account', async () => {
      const escrow = 'sdk_outside_whole';
      const address = await adoptOutsideAccount(escrow);
      const asset = await assetTheWalletHolds();
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
      await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
      await wallet.client.send.arc58OptInEscrow({ sender, args: { escrow, assets: [asset] }, ...fees });
      await localnet.algorand.send.assetTransfer({ sender, receiver: address, assetId: asset, amount: 25n });

      const plan = await wallet.getEscrowTeardown(escrow);
      expect(plan.counted).toBe(2n);
      expect(plan.plugins.length).toBe(1);
      expect(plan.allowances).toEqual([0n]);
      expect(plan.assets).toEqual([asset]);
      expect(plan.blockers).toEqual([]);

      const held = (await account(address)).balance.microAlgos;
      const before = await account(wallet.client.appAddress.toString());

      const sent = await wallet.deleteEscrow({ escrow });

      // one group: the plugin removal, the allowance removal, the asset close-out, the delete
      expect(sent.length).toBe(1);
      expect(sent[0].txIds.length).toBe(4);
      expect(await hasRecord(escrow)).toBe(false);
      expect(await counted(escrow)).toBeUndefined();
      expect((await account(address)).balance.microAlgos).toBe(0n);
      expect((await account(address)).authAddr).toBeUndefined();
      expect((await wallet.getAllowances()).size).toBe(0);

      // no app and no factory record were involved: the asset and what the account held come back
      const after = await account(wallet.client.appAddress.toString());
      expect(after.assets?.find((holding) => holding.assetId === asset)?.amount).toBe(25n);
      expect(after.balance.microAlgos - before.balance.microAlgos).toBe(held);
    });

    test('deleteEscrow spreads a removal too long for one group over two, with the delete last', async () => {
      const escrow = 'sdk_many';
      // 16 grants and the delete are 17 calls, one more than a group holds
      for (let i = 0; i < 16; i += 1) {
        await wallet.addPlugin({ client: payPluginSdk, caller: localnet.algorand.account.random().addr.toString(), escrow });
      }
      const { id } = await wallet.getEscrow(escrow);
      expect(await counted(escrow)).toBe(16n);

      const sent = await wallet.deleteEscrow({ escrow });

      expect(sent.map((group) => group.txIds.length)).toEqual([16, 1]);
      expect(await appExists(id)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
      expect((await wallet.getPlugins()).size).toBe(0);
    });
  });

  test('a wallet whose funds sit at an outside address gets everything back at that address', async () => {
    const { algorand, context: { testAccount } } = localnet;
    const outside = algorand.account.random();
    const controlled = outside.addr.toString();
    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.send.payment({ sender: dispenser.addr, signer: dispenser.signer, receiver: controlled, amount: (10).algos() });

    const external = await newWallet({
      factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: testAccount.signer },
      readerAccount: sender,
      algorand,
      nickname: 'outside_funds',
      controlledAddress: controlled,
      controlledSigner: outside.signer,
    });
    const appAddress = external.client.appAddress.toString();
    await external.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) });
    expect(await external.hasExternalControlledAddress()).toBe(true);

    const spare = async (address: string) => {
      const info = await account(address);
      return info.balance.microAlgos - info.minBalance.microAlgos;
    };
    const controlledStart = (await account(controlled)).balance.microAlgos;
    const appSpareStart = await spare(appAddress);

    const escrow = 'outside_escrow';
    await external.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
    const { id } = await external.getEscrow(escrow);
    const address = getApplicationAddress(id).toString();
    // the outside address paid for the escrow app (250,000) and for the wallet's record and count of it
    expect((await account(controlled)).balance.microAlgos).toBe(controlledStart - 250_000n - escrowRecordMbr(escrow) - countMbr(escrow));
    expect(await spare(appAddress)).toBe(appSpareStart);

    await external.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
    await algorand.send.payment({ sender, receiver: address, amount: microAlgo(400_000n) });

    // one group: the allowance removal, then the delete, which puts the escrow on the factory's record itself
    const sent = await external.deleteEscrow({ escrow });
    expect(sent.length).toBe(1);
    expect(sent[0].txIds.length).toBe(2);

    expect(await appExists(id)).toBe(false);
    expect((await account(address)).balance.microAlgos).toBe(0n);
    expect((await external.getEscrows()).has(escrow)).toBe(false);
    // the outside address has back all it paid, and what the escrow had been sent
    expect((await account(controlled)).balance.microAlgos).toBe(controlledStart + 400_000n);
    // the wallet app's own account ends where it began
    expect(await spare(appAddress)).toBe(appSpareStart);
  });
});

/**
 * The escrow factory on MainNet cannot be updated, and neither can the 37 escrows it has made. This is
 * the program pair an updated wallet will meet there (app 3569555755, tests/compat/fixtures), not the
 * tree's. The deployed factory returns what it held for the app and its record but keeps whatever the
 * escrow account still held when it closed, so the wallet has to close the account out first.
 */
describe('ARC58 escrow deletion with the escrow factory and escrow programs deployed on MainNet', () => {
  const fixture = algorandFixture();
  /** sha256 of the approval program all 37 MainNet escrows run (read from MainNet on 2026-11-20). */
  const MAINNET_ESCROW_SHA256 = '023671365f089b6520da77759e5396984a39745e208016597ab7dcc683df7228';

  let wallet: WalletSDK;
  let liveFactoryId: bigint;
  let liveFactoryAddress: string;
  let owner: string;
  let previousMbrAppId: string | undefined;

  const account = (address: string) => fixture.algorand.account.getInformation(address);
  const spare = async (address: string) => {
    const info = await account(address);
    return info.balance.microAlgos - info.minBalance.microAlgos;
  };

  beforeAll(async () => {
    previousMbrAppId = process.env.WALLET_MBR_APP_ID;
    await fixture.newScope();
    const { algorand, generateAccount } = fixture.context;
    const ownerAccount = await generateAccount({ initialFunds: (500).algo() });
    owner = ownerAccount.addr.toString();
    const defaults = { defaultSender: ownerAccount.addr, defaultSigner: ownerAccount.signer };

    const { appClient: mbr } = await new AbstractedAccountMbrFactory({ algorand, ...defaults }).send.create.bare();
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString();

    // the deployed factory: its bytes, its page count, and a bare create as on MainNet
    const created = await algorand.send.appCreate({
      sender: ownerAccount.addr,
      signer: ownerAccount.signer,
      approvalProgram: approvalBytes('EscrowFactory'),
      clearStateProgram: clearBytes('EscrowFactory')!,
      schema: { globalInts: 0, globalByteSlices: 0, localInts: 0, localByteSlices: 0 },
      extraProgramPages: 3,
    });
    liveFactoryId = created.appId;
    liveFactoryAddress = getApplicationAddress(liveFactoryId).toString();
    await algorand.send.payment({ sender: ownerAccount.addr, signer: ownerAccount.signer, receiver: liveFactoryAddress, amount: microAlgo(100_000n) });

    const fixtureAndAccount = { fixture, sender: ownerAccount.addr, signer: ownerAccount.signer };
    const dao = await deployAkitaDAO({ ...fixtureAndAccount, apps: { escrow: liveFactoryId } });
    const walletFactory = await deployAbstractedAccountFactory({
      ...fixtureAndAccount,
      args: { akitaDao: dao.appId, escrowFactory: liveFactoryId },
    });

    wallet = await newWallet({
      algorand,
      factoryParams: { appId: walletFactory.appId, ...defaults },
      readerAccount: owner,
      nickname: 'live-escrow-factory',
    });
    await wallet.client.appClient.fundAppAccount({ amount: (10).algo() });
  });

  afterAll(() => {
    if (previousMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID;
    else process.env.WALLET_MBR_APP_ID = previousMbrAppId;
  });

  test('deletes an escrow the deployed factory made, returns everything and strands nothing in the factory', async () => {
    const escrow = 'live_pair';
    await wallet.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
    const { id } = await wallet.getEscrow(escrow);
    const address = getApplicationAddress(id).toString();

    // this escrow runs the program the MainNet escrows run
    const program = (await fixture.algorand.app.getById(id)).approvalProgram;
    expect(sha256Hex(program)).toBe(MAINNET_ESCROW_SHA256);

    await fixture.algorand.send.payment({ sender: owner, receiver: address, amount: microAlgo(640_000n) });

    const factorySpare = await spare(liveFactoryAddress);
    const walletBefore = await account(wallet.client.appAddress.toString());

    // not on the factory's record yet, so the delete puts it there itself, in the one call
    const sent = await wallet.deleteEscrow({ escrow });
    expect(sent.length).toBe(1);
    expect(sent[0].txIds.length).toBe(1);

    const walletAfter = await account(wallet.client.appAddress.toString());
    await expect(fixture.algorand.client.algod.getApplicationByID(id).do()).rejects.toThrow();
    expect((await account(address)).balance.microAlgos).toBe(0n);
    expect((await wallet.getEscrows()).has(escrow)).toBe(false);
    // what the escrow held (740,000) and what the factory held for its app (150,000) are back. The
    // 12,100 paid to put it on record in this call came back with them, so it nets to nothing.
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(740_000n + 150_000n);
    // the factory is exactly where it was
    expect(await spare(liveFactoryAddress)).toBe(factorySpare);
  });
});

/**
 * arc58_deleteEscrow: the wallet's admin deletes an escrow by closing its account out.
 *
 * What a delete has to undo, and who holds each part:
 *   - the escrow account's ALGO, base minimum included        -> closed out to the controlled address
 *   - the escrow app and the factory's record of it           -> EscrowFactory.delete, which only the
 *                                                                wallet app may call for its own escrow
 *   - the wallet's own record of the escrow (a box)           -> deleted here, its storage refunded
 *
 * The factory deletes only an escrow it has on record, so an escrow is registered before it is deleted.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { CallerType, newWallet, OptInPluginSDK, PayPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet';
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk';
import { approvalBytes, clearBytes } from '../../../tests/compat/lib/snapshot';
import { sha256Hex } from '../../../tests/compat/lib/teal-facts';
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account';
import { AkitaUniverse, buildAkitaUniverse, deployAkitaDAO } from '../../../tests/fixtures/dao';
import { deployOptInPlugin } from '../../../tests/fixtures/plugins/optin';
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay';
import { expectContractError } from '../../../tests/utils/errors';
import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient';
import { errDoesntExist } from '../../escrow/errors';
import { errEscrowDoesNotExist, errEscrowLocked, errForbidden } from './errors';

/** What the factory returns for an escrow app and its record: 100,000 + 50,000 + 12,100. */
const FACTORY_REFUND = 162_100n;
/** The wallet's record of an escrow: 19,300 plus 400 per byte of its name. */
const escrowRecordMbr = (name: string) => 19_300n + 400n * BigInt(Buffer.from(name).length);

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

  /** A new escrow made by the factory, optionally registered there. Returns its app id and address. */
  const newEscrow = async (escrow: string, register = true) => {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(2_000_000n) });
    await wallet.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
    if (register) await wallet.register({ escrow });
    const { id } = await wallet.getEscrow(escrow);
    return { id, address: getApplicationAddress(id).toString() };
  };

  const deleteEscrow = (escrow: string, from = sender) =>
    wallet.client.send.arc58DeleteEscrow({ sender: from, args: { escrow }, ...fees });

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
  });

  test('deletes an escrow and returns everything it held and everything it cost', async () => {
    const escrow = 'to_delete';
    const { id, address } = await newEscrow(escrow);

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
    // everything came back to the wallet: what the escrow held, and what the factory was holding for it
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(850_000n + FACTORY_REFUND);
    // and the wallet's own storage for the record is released
    expect(walletBefore.minBalance.microAlgos - walletAfter.minBalance.microAlgos).toBe(escrowRecordMbr(escrow));
  });

  test('strands nothing in the factory', async () => {
    const escrow = 'no_strand';
    const factoryAddress = universe.escrowFactory.appAddress.toString();
    const before = await account(factoryAddress);
    const spare = before.balance.microAlgos - before.minBalance.microAlgos;

    const { address } = await newEscrow(escrow);
    await localnet.algorand.send.payment({ sender, receiver: address, amount: microAlgo(400_000n) });
    await deleteEscrow(escrow);

    const after = await account(factoryAddress);
    expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos);
    expect(after.balance.microAlgos - after.minBalance.microAlgos).toBe(spare);
  });

  test('refuses while the escrow still holds an asset, and works once the asset is closed out', async () => {
    const escrow = 'with_asset';
    const { id, address } = await newEscrow(escrow);

    const created = await localnet.algorand.send.assetCreate({ sender, total: 1_000n, decimals: 0, assetName: 'Held' });
    const asset = created.assetId;

    // the wallet opts in so it can take the asset back, then the escrow opts in and is sent some
    await wallet.addPlugin({ client: optInPluginSdk, callerType: CallerType.Global });
    await wallet.addAllowances({ escrow, allowances: [{ asset, type: 'flat', amount: 25n }] });
    await wallet.usePlugin({ callerType: CallerType.Global, calls: [optInPluginSdk.optIn({ assets: [asset] })] });
    await wallet.client.send.arc58OptInEscrow({ sender, args: { escrow, assets: [asset] }, ...fees });
    await localnet.algorand.send.assetTransfer({ sender, receiver: address, assetId: asset, amount: 25n });

    // an account that holds an asset cannot be closed, so the whole call fails and nothing changes
    await expect(deleteEscrow(escrow)).rejects.toThrow();
    expect(await appExists(id)).toBe(true);
    expect(await hasRecord(escrow)).toBe(true);
    expect((await account(address)).authAddr?.toString()).toBe(wallet.client.appAddress.toString());

    // the admin closes the asset out of the escrow, and then the escrow can go
    await wallet.client.send.arc58Reclaim({ sender, args: { escrow, reclaims: [[asset, 25n, true]] }, ...fees });
    const walletBefore = await account(wallet.client.appAddress.toString());

    await deleteEscrow(escrow);

    const walletAfter = await account(wallet.client.appAddress.toString());
    expect(await appExists(id)).toBe(false);
    expect(await hasRecord(escrow)).toBe(false);
    expect((await account(address)).balance.microAlgos).toBe(0n);
    // the escrow's minimum and the minimum it held for the asset both come back
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(200_000n + FACTORY_REFUND);
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

  test('an escrow the factory has no record of is refused by the factory, and registering it makes it work', async () => {
    const escrow = 'unregistered';
    const { id, address } = await newEscrow(escrow, false);
    expect(await registered(address)).toBe(false);

    await expectContractError(deleteEscrow(escrow), errDoesntExist);
    // nothing moved: the close-out is undone with the rest of the call
    expect((await account(address)).balance.microAlgos).toBe(100_000n);
    expect(await appExists(id)).toBe(true);

    await wallet.register({ escrow });
    await deleteEscrow(escrow);
    expect(await appExists(id)).toBe(false);
    expect(await hasRecord(escrow)).toBe(false);
  });

  test('an escrow that is an outside account rekeyed to the wallet is closed out and forgotten', async () => {
    const escrow = 'outside';
    const outside = await localnet.context.generateAccount({ initialFunds: (3).algos() });
    await localnet.algorand.send.payment({
      sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n),
      rekeyTo: wallet.client.appAddress,
    });

    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) });
    await wallet.newEscrow({ escrow, address: outside.addr.toString() });
    expect((await wallet.getEscrow(escrow)).id).toBe(0n);

    const held = (await account(outside.addr.toString())).balance.microAlgos;
    const walletBefore = await account(wallet.client.appAddress.toString());

    await deleteEscrow(escrow);

    const walletAfter = await account(wallet.client.appAddress.toString());
    expect((await account(outside.addr.toString())).balance.microAlgos).toBe(0n);
    expect((await account(outside.addr.toString())).authAddr).toBeUndefined();
    expect(await hasRecord(escrow)).toBe(false);
    // no app and no factory record were involved, so only what the account held comes back
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(held);
    expect(walletBefore.minBalance.microAlgos - walletAfter.minBalance.microAlgos).toBe(escrowRecordMbr(escrow));
  });

  test('a grant on a deleted escrow stops working, and stays dead when the name is made again', async () => {
    const escrow = 'reused';
    const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins * 2n + mbr.newEscrowMintCost * 2n + 2_000_000n) });
    await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
    if (!(await registered(getApplicationAddress((await wallet.getEscrow(escrow)).id).toString()))) await wallet.register({ escrow });
    const first = await wallet.getEscrow(escrow);

    const pay = () => wallet.usePlugin({
      escrow,
      callerType: CallerType.Global,
      calls: [payPluginSdk.pay({ payments: [{ receiver: sender, amount: 0n, asset: 0n }] })],
    });
    await pay();

    await deleteEscrow(escrow);
    // the grant's box is still there, but the escrow it names is gone
    await expect(pay()).rejects.toThrow();

    // A grant records the app id of its escrow. A new escrow of the same name is a new app, so the
    // old grant does not pass to it: it has to be removed and added again.
    await wallet.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
    const second = await wallet.getEscrow(escrow);
    expect(second.id).not.toBe(first.id);
    await expect(pay()).rejects.toThrow();

    await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });
    await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
    await pay();
  });

  test('a grant and an allowance left behind by a deleted escrow can still be removed, and their storage comes back', async () => {
    const escrow = 'leftovers';
    const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + mbr.newEscrowMintCost + mbr.allowances + 2_000_000n) });
    await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });
    await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
    if (!(await registered(getApplicationAddress((await wallet.getEscrow(escrow)).id).toString()))) await wallet.register({ escrow });

    await deleteEscrow(escrow);
    expect(await hasRecord(escrow)).toBe(false);

    const before = await account(wallet.client.appAddress.toString());
    await wallet.removeAllowances({ escrow, assets: [0n] });
    await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });
    const after = await account(wallet.client.appAddress.toString());

    expect((await wallet.getAllowances()).size).toBe(0);
    expect(before.minBalance.microAlgos - after.minBalance.microAlgos).toBe(mbr.plugins + mbr.allowances);
  });

  test('an allowance left behind applies again to a new escrow of the same name', async () => {
    const escrow = 'same_name';
    const allowed = 1_000_000n;
    const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({
      amount: microAlgo(allowed + mbr.plugins * 2n + mbr.newEscrowMintCost * 2n + mbr.allowances + 2_000_000n),
    });
    await wallet.addPlugin({
      client: payPluginSdk, callerType: CallerType.Global, escrow,
      allowances: [{ type: 'flat', asset: 0n, amount: allowed }],
    });
    if (!(await registered(getApplicationAddress((await wallet.getEscrow(escrow)).id).toString()))) await wallet.register({ escrow });

    // the contract call alone: it deletes the escrow and leaves its allowance and its grant in place
    await deleteEscrow(escrow);
    expect((await wallet.getAllowances()).size).toBe(1);

    // a new escrow of the same name, and a new grant for it with no allowance of its own
    await wallet.newEscrow({ escrow, address: ALGORAND_ZERO_ADDRESS_STRING });
    await wallet.removePlugin({ plugin: payPluginSdk.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow });
    await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow });

    // An allowance is kept under the escrow's name, so the old one lets the new grant draw funds
    // into the new escrow. This is why the SDK's deleteEscrow removes an escrow's allowances with it.
    const amount = 400_000n;
    await wallet.usePlugin({
      escrow,
      callerType: CallerType.Global,
      calls: [payPluginSdk.pay({ payments: [{ receiver: sender, amount, asset: 0n }] })],
      fundsRequest: [{ amount, asset: 0n }],
    });
    const allowance = (await wallet.getAllowances()).get({ asset: 0n, escrow })!;
    expect('spent' in allowance && allowance.spent).toBe(amount);
  });

  test('a locked escrow still keeps its allowances from being removed', async () => {
    const escrow = 'still_locked';
    const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });
    await newEscrow(escrow);
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.allowances) });
    await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
    await wallet.toggleEscrowLock({ escrow });

    await expectContractError(wallet.removeAllowances({ escrow, assets: [0n] }), errEscrowLocked);
  });

  describe('through the SDK', () => {
    test('deleteEscrow registers an escrow the factory has no record of, in the same group', async () => {
      const escrow = 'sdk_unregistered';
      const { id, address } = await newEscrow(escrow, false);
      expect(await registered(address)).toBe(false);
      const walletBefore = await account(wallet.client.appAddress.toString());

      const result = await wallet.deleteEscrow({ escrow });

      // one group of two calls: register, then delete
      expect(result.txIds.length).toBe(2);
      expect(await appExists(id)).toBe(false);
      expect(await registered(address)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
      // registering cost 12,100 and the delete returned it with the rest
      const walletAfter = await account(wallet.client.appAddress.toString());
      expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(100_000n + FACTORY_REFUND - 12_100n);
    });

    test('deleteEscrow removes the allowances of the escrow in the same group', async () => {
      const escrow = 'sdk_allowances';
      const other = 'sdk_other';
      const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });
      await newEscrow(escrow);
      await newEscrow(other);
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.allowances * 3n) });
      await wallet.addAllowances({ escrow, allowances: [{ asset: 0n, type: 'flat', amount: 1_000n }] });
      await wallet.addAllowances({ escrow: other, allowances: [{ asset: 0n, type: 'flat', amount: 2_000n }] });
      const before = await account(wallet.client.appAddress.toString());

      const result = await wallet.deleteEscrow({ escrow });

      // one group of two calls: the removal, then the delete
      expect(result.txIds.length).toBe(2);
      expect(await hasRecord(escrow)).toBe(false);
      // this escrow's allowance is gone with its storage, and the other escrow's is untouched
      const allowances = await wallet.getAllowances();
      expect(allowances.size).toBe(1);
      expect(allowances.get({ asset: 0n, escrow: other })).toBeDefined();
      const after = await account(wallet.client.appAddress.toString());
      expect(before.minBalance.microAlgos - after.minBalance.microAlgos).toBe(escrowRecordMbr(escrow) + mbr.allowances);
    });

    test('deleteEscrow sends one call for an escrow already on record', async () => {
      const escrow = 'sdk_registered';
      const { id } = await newEscrow(escrow);

      const result = await wallet.deleteEscrow({ escrow });

      expect(result.txIds.length).toBe(1);
      expect(await appExists(id)).toBe(false);
      expect(await hasRecord(escrow)).toBe(false);
    });

    test('deleteEscrow closes out an adopted account with one call', async () => {
      const escrow = 'sdk_outside';
      const outside = await localnet.context.generateAccount({ initialFunds: (2).algos() });
      await localnet.algorand.send.payment({
        sender: outside.addr, signer: outside.signer, receiver: outside.addr, amount: microAlgo(0n),
        rekeyTo: wallet.client.appAddress,
      });
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) });
      await wallet.newEscrow({ escrow, address: outside.addr.toString() });

      const result = await wallet.deleteEscrow({ escrow });

      expect(result.txIds.length).toBe(1);
      expect((await account(outside.addr.toString())).balance.microAlgos).toBe(0n);
      expect(await hasRecord(escrow)).toBe(false);
    });
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
    // the outside address paid for the escrow app (250,000) and for the wallet's record of it
    expect((await account(controlled)).balance.microAlgos).toBe(controlledStart - 250_000n - escrowRecordMbr(escrow));
    expect(await spare(appAddress)).toBe(appSpareStart);

    await algorand.send.payment({ sender, receiver: address, amount: microAlgo(400_000n) });

    // not on the factory's record, so the SDK registers it (the wallet app pays 12,100) and deletes it
    const result = await external.deleteEscrow({ escrow });
    expect(result.txIds.length).toBe(2);

    expect(await appExists(id)).toBe(false);
    expect((await account(address)).balance.microAlgos).toBe(0n);
    expect((await external.getEscrows()).has(escrow)).toBe(false);
    // the outside address has back all it paid, and what the escrow had been sent
    expect((await account(controlled)).balance.microAlgos).toBe(controlledStart + 400_000n);
    // the wallet app's own account ends where it began: it paid for the record and got that back
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

    // not on the factory's record yet, so the SDK registers it and deletes it in one group
    const result = await wallet.deleteEscrow({ escrow });
    expect(result.txIds.length).toBe(2);

    const walletAfter = await account(wallet.client.appAddress.toString());
    await expect(fixture.algorand.client.algod.getApplicationByID(id).do()).rejects.toThrow();
    expect((await account(address)).balance.microAlgos).toBe(0n);
    expect((await wallet.getEscrows()).has(escrow)).toBe(false);
    // what the escrow held (740,000) and what the factory held for its app (150,000) are back. The
    // 12,100 paid to put it on record in this group came back with them, so it nets to nothing.
    expect(walletAfter.balance.microAlgos - walletBefore.balance.microAlgos).toBe(740_000n + 150_000n);
    // the factory is exactly where it was
    expect(await spare(liveFactoryAddress)).toBe(factorySpare);
  });
});

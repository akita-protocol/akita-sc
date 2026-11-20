/**
 * ZeroSignalPlugin: a pay plugin with PayPlugin's `pay` signature whose every receiver must be the
 * address of the escrow app fixed at creation.
 *
 * The escrow here is a stand-in: a second wallet, which is simply an app with an account that can
 * hold ALGO and an asset. The plugin only ever looks at the app's address.
 */
import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaManagerPluginSDK, CallerType, newWallet, PayPluginSDK, WalletSDK, ZeroSignalPluginSDK } from 'akita-sdk/wallet';
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import fs from 'node:fs';
import path from 'node:path';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { expectContractError } from '../../../../tests/utils/errors';
import { APP_SPEC as PaySpec } from '../../../artifacts/arc58/plugins/pay/PayPluginClient';
import { APP_SPEC as ZeroSignalSpec, ZeroSignalPluginFactory } from '../../../artifacts/arc58/plugins/zero-signal/ZeroSignalPluginClient';
import { errNoEscrowApp, errReceiverNotEscrow } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('ZeroSignal plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let escrow: WalletSDK;
  let escrowAddress: string;
  let asaMintSdk: AsaManagerPluginSDK;
  let plugin: ZeroSignalPluginSDK;
  /** The same app through PayPlugin's client, which lets a test name any receiver. */
  let raw: PayPluginSDK;
  let asset: bigint;

  const algoOf = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos;
  const assetOf = async (address: string) =>
    (await algorand.account.getInformation(address)).assets?.find((a) => a.assetId === asset)?.amount ?? 0n;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    const dispenser = await algorand.account.dispenserFromEnvironment();

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (500).algo());

    akitaUniverse = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} });
    asaMintSdk = akitaUniverse.asaManagerPlugin;

    const walletParams = {
      algorand,
      factoryParams: { appId: akitaUniverse.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
      sender: user.addr,
      signer: user.signer,
    };
    wallet = await newWallet({ ...walletParams, nickname: 'Payer' });
    escrow = await newWallet({ ...walletParams, nickname: 'Escrow stand-in' });
    escrowAddress = escrow.client.appAddress.toString();

    const factory = algorand.client.getTypedAppFactory(ZeroSignalPluginFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer });
    const { appClient } = await factory.send.create.create({ args: { escrowApp: escrow.client.appId } });
    const sdkParams = { algorand, factoryParams: { appId: appClient.appId, defaultSender: user.addr, defaultSigner: user.signer } };
    plugin = new ZeroSignalPluginSDK(sdkParams);
    raw = new PayPluginSDK(sdkParams);

    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n + 20_000_000n) });
    await wallet.addPlugin({ client: asaMintSdk, callerType: CallerType.Global });
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global });

    const minted = await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        asaMintSdk.mint({
          assets: [{
            assetName: 'Test Dollar',
            unitName: 'TUSD',
            total: 1_000_000_000_000n,
            decimals: 6n,
            manager: wallet.client.appAddress.toString(),
            reserve: wallet.client.appAddress.toString(),
            freeze: ALGORAND_ZERO_ADDRESS_STRING,
            clawback: ALGORAND_ZERO_ADDRESS_STRING,
            defaultFrozen: false,
            url: 'https://test.token',
          }],
        }),
      ],
    });
    asset = minted.returns[1][0];

    // The stand-in escrow opts in to the asset, as the real escrow holds USDC.
    const escrowMbr = await escrow.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await escrow.client.appClient.fundAppAccount({ amount: algokit.microAlgo(escrowMbr.plugins + 10_000_000n) });
    await escrow.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global });
    await escrow.usePlugin({ callerType: CallerType.Global, calls: [akitaUniverse.optInPlugin.optIn({ assets: [asset] })] });
  });

  beforeEach(fixture.newScope);

  describe('shape', () => {
    test('pay has the selector and argument count of PayPlugin.pay', () => {
      const ours = new algosdk.ABIContract({ name: 'z', methods: ZeroSignalSpec.methods as algosdk.ABIMethodParams[] }).getMethodByName('pay');
      const theirs = new algosdk.ABIContract({ name: 'p', methods: PaySpec.methods as algosdk.ABIMethodParams[] }).getMethodByName('pay');
      expect(ours.getSignature()).toBe('pay(uint64,bool,(address,uint64,uint64)[])void');
      expect(Buffer.from(ours.getSelector()).toString('hex')).toBe(Buffer.from(theirs.getSelector()).toString('hex'));
      // the selector and three arguments: four app args
      expect(ours.args.length).toBe(3);
      expect(ZeroSignalSpec.methods.map((m) => m.name).sort()).toEqual(['create', 'pay']);
    });

    test('the release manifest gives it no extra pages', () => {
      const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../release/manifest.json'), 'utf8'));
      expect(manifest.programs['arc58/plugins/zero-signal/ZeroSignalPlugin'].extraPages).toBe(0);
    });

    test('the escrow app id is stored under escrow_app', async () => {
      expect(await plugin.escrowApp()).toBe(escrow.client.appId);
      const app = await algorand.client.algod.getApplicationByID(plugin.appId).do();
      const state = app.params!.globalState ?? [];
      expect(state.length).toBe(1);
      expect(Buffer.from(state[0].key).toString()).toBe('escrow_app');
      expect(state[0].value.uint).toBe(escrow.client.appId);
    });
  });

  describe('create', () => {
    test('refuses escrow app id 0', async () => {
      const factory = algorand.client.getTypedAppFactory(ZeroSignalPluginFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer });
      await expectContractError(factory.send.create.create({ args: { escrowApp: 0n } }), errNoEscrowApp);
    });
  });

  describe('pay', () => {
    test('pays ALGO to the escrow', async () => {
      const amount = 1_000_000n;
      const before = await algoOf(escrowAddress);
      await wallet.usePlugin({ callerType: CallerType.Global, calls: [plugin.pay({ payments: [{ asset: 0n, amount }] })] });
      expect((await algoOf(escrowAddress)) - before).toBe(amount);
    });

    test('pays an asset to the escrow', async () => {
      const amount = 25_000_000n;
      const before = await assetOf(escrowAddress);
      await wallet.usePlugin({ callerType: CallerType.Global, calls: [plugin.pay({ payments: [{ asset, amount }] })] });
      expect((await assetOf(escrowAddress)) - before).toBe(amount);
    });

    test('pays ALGO and an asset in one call', async () => {
      const algoBefore = await algoOf(escrowAddress);
      const assetBefore = await assetOf(escrowAddress);
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [plugin.pay({ payments: [{ asset: 0n, amount: 300_000n }, { asset, amount: 7n }] })],
      });
      expect((await algoOf(escrowAddress)) - algoBefore).toBe(300_000n);
      expect((await assetOf(escrowAddress)) - assetBefore).toBe(7n);
    });

    test('allows an amount of 0, in ALGO and in an asset', async () => {
      const algoBefore = await algoOf(escrowAddress);
      const assetBefore = await assetOf(escrowAddress);
      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [plugin.pay({ payments: [{ asset: 0n, amount: 0n }, { asset, amount: 0n }] })],
      });
      expect(results.txIds.length).toBeGreaterThan(0);
      expect(await algoOf(escrowAddress)).toBe(algoBefore);
      expect(await assetOf(escrowAddress)).toBe(assetBefore);
    });

    test('rekeyBack false keeps the wallet rekeyed for a later call that rekeys back', async () => {
      const before = await algoOf(escrowAddress);
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          plugin.pay({ rekeyBack: false, payments: [{ asset: 0n, amount: 100_000n }] }),
          plugin.pay({ rekeyBack: true, payments: [{ asset: 0n, amount: 200_000n }] }),
        ],
      });
      expect((await algoOf(escrowAddress)) - before).toBe(300_000n);
      const account = await algorand.client.algod.accountInformation(wallet.client.appAddress).do();
      expect(account.authAddr).toBeUndefined();
    });

    test('refuses a receiver other than the escrow', async () => {
      const other = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const before = await algoOf(other.addr.toString());
      await expectContractError(
        wallet.usePlugin({ callerType: CallerType.Global, calls: [raw.pay({ payments: [{ receiver: other.addr.toString(), asset: 0n, amount: 100_000n }] })] }),
        errReceiverNotEscrow,
      );
      await expectContractError(
        wallet.usePlugin({ callerType: CallerType.Global, calls: [raw.pay({ payments: [{ receiver: other.addr.toString(), asset: 0n, amount: 0n }] })] }),
        errReceiverNotEscrow,
      );
      expect(await algoOf(other.addr.toString())).toBe(before);
    });

    test('refuses the plugin itself and the wallet as receiver', async () => {
      for (const receiver of [algosdk.getApplicationAddress(plugin.appId).toString(), wallet.client.appAddress.toString()]) {
        await expectContractError(
          wallet.usePlugin({ callerType: CallerType.Global, calls: [raw.pay({ payments: [{ receiver, asset: 0n, amount: 0n }] })] }),
          errReceiverNotEscrow,
        );
      }
    });

    test('refuses a list that mixes the escrow with another receiver, and pays nothing', async () => {
      const other = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const before = await algoOf(escrowAddress);
      for (const payments of [
        [{ receiver: escrowAddress, asset: 0n, amount: 100_000n }, { receiver: other.addr.toString(), asset: 0n, amount: 100_000n }],
        [{ receiver: other.addr.toString(), asset: 0n, amount: 100_000n }, { receiver: escrowAddress, asset: 0n, amount: 100_000n }],
      ]) {
        await expectContractError(wallet.usePlugin({ callerType: CallerType.Global, calls: [raw.pay({ payments })] }), errReceiverNotEscrow);
      }
      expect(await algoOf(escrowAddress)).toBe(before);
    });
  });

  // A spoofed wallet is refused too (errNath): see ../spoofed-wallet.e2e.spec.ts, which covers every plugin.

  describe('immutability', () => {
    test('refuses an update and a delete, from its creator too', async () => {
      const app = await algorand.client.algod.getApplicationByID(plugin.appId).do();
      await expect(algorand.send.appUpdate({
        sender: deployer.addr,
        signer: deployer.signer,
        appId: plugin.appId,
        approvalProgram: app.params!.approvalProgram,
        clearStateProgram: app.params!.clearStateProgram,
      })).rejects.toThrow();
      await expect(algorand.send.appDelete({ sender: deployer.addr, signer: deployer.signer, appId: plugin.appId })).rejects.toThrow();
      const after = await algorand.client.algod.getApplicationByID(plugin.appId).do();
      expect(Buffer.from(after.params!.approvalProgram).equals(Buffer.from(app.params!.approvalProgram))).toBe(true);
    });
  });
});

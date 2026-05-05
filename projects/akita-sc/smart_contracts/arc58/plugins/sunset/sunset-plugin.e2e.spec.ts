import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import {
  SigningAccount,
  TransactionSignerAccount,
  Address,
} from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, WalletSDK, CallerType, SunsetPluginSDK } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import {
  deploySunsetContract,
  deploySunsetPlugin,
} from '../../../../tests/fixtures/sunset';
import { SunsetContractClient } from '../../../artifacts/sunset/SunsetContractClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

/**
 * End-to-end tests for the ARC-58 `SunsetPlugin`.
 *
 * The plugin is a thin forwarder: the wallet calls the plugin, which fires
 * an inner `abiCall` to a target `SunsetContract` using the wallet's spending
 * account as the inner-txn sender. The target checks auth against
 * `Global.creatorAddress` or `TMPL_SUNSET_CALLER`, so for plugin invocations
 * we pin `SUNSET_CALLER` to the wallet's spending address (the user, in the
 * default wallet setup) when deploying the target.
 *
 * Suite A (`sunset.e2e.spec.ts`) covers the contract's auth matrix and asset
 * destruction directly. This suite's job is to prove the plugin-driven path
 * works end-to-end: wallet → plugin → target.
 */
describe('SunsetPlugin (via wallet)', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: ReturnType<typeof algokit.AlgorandClient.fromConfig>;
  let wallet: WalletSDK;
  let sunsetPluginSdk: SunsetPluginSDK;
  /**
   * Every target SunsetContract in this suite is deployed with
   * `TMPL_SUNSET_CALLER` pinned to this address. Captured once in `beforeAll`
   * so it matches what the plugin will pass as the inner-txn sender when the
   * wallet invokes `usePlugin`.
   */
  let walletSpendingAddress: string;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (500).algo());

    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: akitaUniverse.walletFactory.appId,
        defaultSender: user.addr,
        defaultSigner: user.signer,
      },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Sunset Plugin Test Wallet',
    });

    // For a plugin call with no escrow, the wallet sets `spendingAddress`
    // to its own `controlledAddress` (the wallet's app address by default,
    // see arc58/account/contract.algo.ts:974-975). The sunset plugin reads
    // `getSpendingAccount(wallet)` to build its inner abiCall's `sender`,
    // so the target SunsetContract sees `Txn.sender == wallet.appAddress`.
    walletSpendingAddress = wallet.client.appAddress.toString();

    sunsetPluginSdk = await deploySunsetPlugin({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
    });

    // Fund the wallet for plugin MBR + some runway for inner fees (each
    // usePlugin group may cover 2–3 inner txns at 1000 uAlgo each).
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({
      amount: algokit.microAlgo(mbr.plugins + 10_000_000n),
    });
    await wallet.addPlugin({ client: sunsetPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  /**
   * Deploys a fresh target `SunsetContract` with `TMPL_SUNSET_CALLER` set to
   * the wallet's spending address. Each test gets its own target because the
   * `delete` test consumes its contract, and we don't want asset/box state
   * from one test leaking into another.
   */
  const freshTarget = async (): Promise<SunsetContractClient> => {
    return deploySunsetContract({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      sunsetCaller: walletSpendingAddress,
    });
  };

  describe('delete', () => {
    test('plugin deletes a target whose SUNSET_CALLER is the wallet', async () => {
      const target = await freshTarget();
      const recipient = await fixture.context.generateAccount({
        initialFunds: algokit.microAlgos(100_000),
      });
      const recipientBalanceBefore = await algorand.account.getInformation(recipient.addr);

      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          sunsetPluginSdk.delete({
            sender: user.addr,
            signer: user.signer,
            appId: target.appId,
            closeRemainderTo: recipient.addr.toString(),
          }),
        ],
      });

      expect(results.txIds.length).toBeGreaterThan(0);

      // Target app must be gone (algod returns 404 on the lookup).
      await expect(algorand.app.getById(target.appId)).rejects.toThrow();

      // The recipient received the app account's residual balance via
      // closeRemainderTo — should be strictly larger than before.
      const recipientBalanceAfter = await algorand.account.getInformation(recipient.addr);
      expect(recipientBalanceAfter.balance.microAlgos).toBeGreaterThan(
        recipientBalanceBefore.balance.microAlgos,
      );
    });
  });

  describe('deleteBoxes', () => {
    test('plugin forwards an empty box batch', async () => {
      // `deleteBoxes` is auth-free by design (it can only touch the target's
      // own boxes via op.Box.delete), so this also verifies the plugin's
      // args encoding + the wallet-plugin-target wiring even without auth.
      const target = await freshTarget();
      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          sunsetPluginSdk.deleteBoxes({
            sender: user.addr,
            signer: user.signer,
            appId: target.appId,
            boxes: [],
          }),
        ],
      });
      expect(results.txIds.length).toBeGreaterThan(0);

      // Target still exists — deleteBoxes doesn't delete the app.
      const info = await algorand.app.getById(target.appId);
      expect(info.appAddress.toString()).toBeTruthy();
    });

    test('plugin forwards a batch of non-existent box names as a no-op', async () => {
      const target = await freshTarget();
      const boxes = [new TextEncoder().encode('nope-one'), new TextEncoder().encode('nope-two')];
      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          sunsetPluginSdk.deleteBoxes({
            sender: user.addr,
            signer: user.signer,
            appId: target.appId,
            boxes,
          }),
        ],
      });
      expect(results.txIds.length).toBeGreaterThan(0);
    });
  });

  describe('closeOut', () => {
    test('plugin forwards an empty closeOut batch', async () => {
      const target = await freshTarget();
      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          sunsetPluginSdk.closeOut({
            sender: user.addr,
            signer: user.signer,
            appId: target.appId,
            closes: [],
          }),
        ],
      });
      expect(results.txIds.length).toBeGreaterThan(0);
    });
  });

  describe('deleteAssets', () => {
    test('plugin forwards an empty deleteAssets batch', async () => {
      const target = await freshTarget();
      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          sunsetPluginSdk.deleteAssets({
            sender: user.addr,
            signer: user.signer,
            appId: target.appId,
            assets: [],
          }),
        ],
      });
      expect(results.txIds.length).toBeGreaterThan(0);
    });

    test('plugin destroys an asset whose manager is the target app', async () => {
      // Mirror Suite A's asset-destruction test, but drive it via the plugin.
      // The ASA is created with `manager = target.appAddress`; the sunset
      // contract's inner `itxn.assetConfig` can destroy it because it signs
      // as the manager. The outer plugin call drives the target through
      // wallet → plugin → target abiCall → inner assetConfig.
      const target = await freshTarget();
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1n,
        decimals: 0,
        defaultFrozen: false,
        unitName: 'SUNP',
        assetName: 'Sunset Plugin Test',
        manager: target.appAddress.toString(),
        reserve: target.appAddress.toString(),
      });

      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          sunsetPluginSdk.deleteAssets({
            sender: user.addr,
            signer: user.signer,
            appId: target.appId,
            assets: [assetId],
          }),
        ],
      });
      expect(results.txIds.length).toBeGreaterThan(0);

      // Asset no longer exists — algod returns 404 on the info lookup.
      await expect(algorand.asset.getById(assetId)).rejects.toThrow();
    });
  });
});

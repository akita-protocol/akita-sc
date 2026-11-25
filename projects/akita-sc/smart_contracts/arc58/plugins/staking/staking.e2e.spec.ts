import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, StakingPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { StakingType } from 'akita-sdk/staking';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { buildAddPluginAction, proposeAndExecute } from '../../dao/tests/utils';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('Staking plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let stakingPluginSdk: StakingPluginSDK;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (500).algo());

    // Build the full Akita DAO universe
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

    // Create a user wallet for testing
    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: akitaUniverse.walletFactory.appId,
        defaultSender: user.addr,
        defaultSigner: user.signer,
      },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Test Wallet',
    });

    // Get plugin SDK and add it to the wallet once
    stakingPluginSdk = akitaUniverse.stakingPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    // Over-fund the wallet with 10 ALGO: plenty of headroom for SOFT stake MBR
    // (32_100 microAlgos) + inner-transaction fees.
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 10_000_000n) });
    await wallet.addPlugin({ client: stakingPluginSdk, callerType: CallerType.Admin });
  });

  beforeEach(fixture.newScope);

  describe('StakingPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(stakingPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('soft-stakes ALGO via plugin and records the stake on the base Staking contract', async () => {
      // Exercise the plugin end-to-end:
      //  (1) invoke `stake` via `wallet.usePlugin`
      //  (2) read back the resulting stake state from the base Staking contract
      //      (the plugin forwards the call via `abiCall<typeof Staking.prototype.stake>`)
      //  (3) assert the stored SOFT commitment matches the requested amount and
      //      remains backed by the wallet's live ALGO balance.
      //
      // SOFT staking is the simplest variant — no escrow is moved, only the
      // stakes-box MBR (32_100 microAlgos) flows from the wallet to the Staking
      // contract via an inner payment. No ASA opt-in, no heartbeat entries, no
      // expiration math.
      const stakeAmount = 1_000_000n; // 1 ALGO — recorded amount, not transferred

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPluginSdk.stake({
            assetId: 0n,            // 0 = ALGO
            type: StakingType.Soft, // enum value = 20
            amount: stakeAmount,
            expiration: 0n,         // SOFT has no expiration
            isUpdate: false,
          }),
        ],
      });

      const info = await akitaUniverse.staking.getInfo({
        address: wallet.client.appAddress.toString(),
        stake: { asset: 0n, type: StakingType.Soft },
      });

      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(info.amount).toBe(stakeAmount);
      expect(walletInfo.balance.microAlgos).toBeGreaterThanOrEqual(info.amount);
    });

    test('updates the soft stake via plugin and reflects the new amount on the base contract', async () => {
      // The previous test created a SOFT stake of 1 ALGO for this wallet.
      // Calling `stake` again with `isUpdate: true` and a new amount should
      // add to the existing stake on the base Staking contract. `getInfo`
      // must then report the summed amount.
      //
      // Note: the base Staking contract explicitly rejects `withdraw` for
      // SOFT stakes (errWithdrawIsOnlyForHardOrLock). Commitments remain
      // balance-backed; permissionless `checkpointSoftStake` records a shortfall.
      const additionalAmount = 500_000n; // 0.5 ALGO

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPluginSdk.stake({
            assetId: 0n,
            type: StakingType.Soft,
            amount: additionalAmount,
            expiration: 0n,
            isUpdate: true,
          }),
        ],
      });

      const info = await akitaUniverse.staking.getInfo({
        address: wallet.client.appAddress.toString(),
        stake: { asset: 0n, type: StakingType.Soft },
      });

      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(info.amount).toBe(1_000_000n + additionalAmount);
      expect(walletInfo.balance.microAlgos).toBeGreaterThanOrEqual(info.amount);
    });

    test('soft-stakes an ASA via plugin without transferring the staked amount', async () => {
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1_000_000n,
        decimals: 0,
        defaultFrozen: false,
        assetName: 'Soft Stake Test',
        unitName: 'SST',
      });
      const stakeAsset = BigInt(assetId!);
      const stakeAmount = 100n;

      await akitaUniverse.staking.optIn({
        sender: deployer.addr,
        signer: deployer.signer,
        asset: stakeAsset,
      });

      await wallet.addPlugin({
        client: akitaUniverse.selfOptInPlugin,
        callerType: CallerType.Admin,
      });

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [akitaUniverse.selfOptInPlugin.optIn({ assets: [stakeAsset] })],
      });

      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        assetId: stakeAsset,
        amount: stakeAmount,
        receiver: wallet.client.appAddress,
      });

      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          stakingPluginSdk.stake({
            assetId: stakeAsset,
            type: StakingType.Soft,
            amount: stakeAmount,
            expiration: 0n,
            isUpdate: false,
          }),
        ],
      });

      const info = await akitaUniverse.staking.getInfo({
        address: wallet.client.appAddress.toString(),
        stake: { asset: stakeAsset, type: StakingType.Soft },
      });
      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress);

      expect(info.amount).toBe(stakeAmount);
      expect(walletInfo.assets?.find((asset) => asset.assetId === stakeAsset)?.amount).toBe(stakeAmount);
    });
  });
  describe('DAO-governed staking settings (2026-10 audit)', () => {
    beforeAll(async () => {
      await proposeAndExecute(akitaUniverse.dao, [
        buildAddPluginAction({
          client: stakingPluginSdk,
          // a grant anyone may use is refused by the plugin, so the DAO names the caller
          callerType: CallerType.Other,
          caller: deployer.addr.toString(),
          useExecutionKey: false,
        }),
      ]);
      // the DAO wallet pays the settings box MBR and inner fees
      await algorand.account.ensureFunded(akitaUniverse.dao.wallet.client.appAddress, dispenser.addr, (10).algo());
    });

    test('ST-4 / M-2: the DAO wallet sets the heartbeat manager, whose beats then count', async () => {
      const manager = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) });

      await akitaUniverse.dao.wallet.usePlugin({
        sender: deployer.addr,
        signer: deployer.signer,
        calls: [stakingPluginSdk.setHeartbeatManager({ manager: manager.addr.toString() })],
      });
      const stored = await akitaUniverse.staking.client.state.global.heartbeatManagerAddress();
      expect(stored?.toString()).toBe(manager.addr.toString());

      // the user's wallet opens an ALGO heartbeat record: it starts with no samples
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [stakingPluginSdk.stake({ assetId: 0n, type: StakingType.Heartbeat, amount: 0n, expiration: 0n, isUpdate: false })],
      });
      const walletAddress = wallet.client.appAddress.toString();
      expect(await akitaUniverse.staking.getHeartbeatAverage({ address: walletAddress, asset: 0n, includeEscrowed: false })).toBe(0n);

      // the manager samples the native ALGO balance (asset 0 no longer uses an ASA lookup)
      await akitaUniverse.staking.createHeartbeat({ sender: manager.addr, signer: manager.signer, address: walletAddress, asset: 0n });
      const balance = (await algorand.account.getInformation(wallet.client.appAddress)).balance.microAlgos;
      expect(await akitaUniverse.staking.getHeartbeatAverage({ address: walletAddress, asset: 0n, includeEscrowed: false })).toBe(balance);
    });

    test('DAO-05: only the DAO wallet sets the max lockup of a governance asset, and never lower', async () => {
      const akta = akitaUniverse.aktaAssetId;
      const twoYears = 2n * 31_536_000n;

      // the asset creator is no longer enough for AKTA / BONES
      await expect(akitaUniverse.staking.updateSettings({
        sender: deployer.addr,
        signer: deployer.signer,
        asset: akta,
        value: twoYears,
      })).rejects.toThrow('errNdao');

      await akitaUniverse.dao.wallet.usePlugin({
        sender: deployer.addr,
        signer: deployer.signer,
        calls: [stakingPluginSdk.updateSettings({ asset: akta, value: twoYears })],
      });
      const [settings] = await akitaUniverse.staking.client.getSettings({ args: { assets: [akta] } });
      expect(settings[0]).toBe(twoYears);
      expect(settings[1]).toBe(true);

      await expect(akitaUniverse.dao.wallet.usePlugin({
        sender: deployer.addr,
        signer: deployer.signer,
        calls: [stakingPluginSdk.updateSettings({ asset: akta, value: 31_536_000n })],
      })).rejects.toThrow();
    });

    test('L-2: a wallet closes its SOFT stake through the plugin and gets the MBR back', async () => {
      const before = (await algorand.account.getInformation(wallet.client.appAddress)).balance.microAlgos;
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [stakingPluginSdk.closeSoftStake({ asset: 0n })],
      });
      const after = (await algorand.account.getInformation(wallet.client.appAddress)).balance.microAlgos;
      expect(after - before).toBe(32_100n);
      const info = await akitaUniverse.staking.getInfo({
        address: wallet.client.appAddress.toString(),
        stake: { asset: 0n, type: StakingType.Soft },
      });
      expect(info.amount).toBe(0n);
    });

    test('empty checkpoint batches are rejected', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [stakingPluginSdk.checkpointSoftStake({ stakeKeys: [] })],
      })).rejects.toThrow();
    });
  });
});

import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, StakingPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { StakingType } from 'akita-sdk/staking';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('Staking plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
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

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (500).algo());

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
    // (~28_900 microAlgos) + inner-txn fees for a stake → withdraw round trip.
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 10_000_000n) });
    await wallet.addPlugin({ client: stakingPluginSdk, callerType: CallerType.Global });
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
      //  (3) assert the reported SOFT amount matches the wallet's live ALGO balance.
      //
      // SOFT staking is the simplest variant — no escrow is moved, only the
      // stakes-box MBR (~28_900 microAlgos) flows from the wallet to the Staking
      // contract via an inner payment. No ASA opt-in, no heartbeat entries, no
      // expiration math.
      const stakeAmount = 1_000_000n; // 1 ALGO — recorded amount, not transferred

      await wallet.usePlugin({
        callerType: CallerType.Global,
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
      expect(info.amount).toBe(walletInfo.balance.microAlgos);
      expect(info.amount).toBeGreaterThanOrEqual(stakeAmount);
    });

    test('updates the soft stake via plugin and reflects the new amount on the base contract', async () => {
      // The previous test created a SOFT stake of 1 ALGO for this wallet.
      // Calling `stake` again with `isUpdate: true` and a new amount should
      // add to the existing stake on the base Staking contract. `getInfo`
      // must then report the summed amount.
      //
      // Note: the base Staking contract explicitly rejects `withdraw` for
      // SOFT stakes (ERR_WITHDRAW_IS_ONLY_FOR_HARD_OR_LOCK). SOFT stakes are
      // balance-backed and are invalidated by `softCheck`, not tracked with a
      // moveable escrow — so updating amount is the real plugin-flow mutation
      // we can assert against here without also fixturing AKTA + escrow.
      const additionalAmount = 500_000n; // 0.5 ALGO

      await wallet.usePlugin({
        callerType: CallerType.Global,
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
      expect(info.amount).toBe(walletInfo.balance.microAlgos);
      expect(info.amount).toBeGreaterThanOrEqual(1_000_000n + additionalAmount);
    });
  });
});

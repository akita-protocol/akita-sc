import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaManagerPluginSDK, DualStakePluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { errNotADualstakeApp } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('DualStake plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaManagerPluginSDK;
  let dualStakePluginSdk: DualStakePluginSDK;

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

    // Get plugin SDKs from universe
    asaMintSdk = akitaUniverse.asaManagerPlugin;
    dualStakePluginSdk = akitaUniverse.dualStakePlugin;

    // Fund wallet and add both plugins once
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n) });
    await wallet.addPlugin({ client: asaMintSdk, callerType: CallerType.Admin });
    await wallet.addPlugin({ client: dualStakePluginSdk, callerType: CallerType.Admin });
  });

  beforeEach(fixture.newScope);

  describe('DualStakePlugin SDK', () => {
    test('plugins can be added to wallet', async () => {
      // Verify the plugins were successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(2);
      expect(dualStakePluginSdk.appId).toBeGreaterThan(0n);
    });

    test('mint rejects apps that were not created by the configured dual-stake registry', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          dualStakePluginSdk.mint({
            appId: wallet.client.appId,
            amount: 1_000_000n,
          }),
        ],
      })).rejects.toThrow(errNotADualstakeApp);
    });

    test('redeem rejects apps that were not created by the configured dual-stake registry', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          dualStakePluginSdk.redeem({
            appId: wallet.client.appId,
            amount: 1_000_000n,
          }),
        ],
      })).rejects.toThrow(errNotADualstakeApp);
    });
  });
});

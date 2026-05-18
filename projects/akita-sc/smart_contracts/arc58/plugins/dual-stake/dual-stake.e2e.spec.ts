import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaMintPluginSDK, DualStakePluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { ERR_NOT_A_DUALSTAKE_APP } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('DualStake plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaMintPluginSDK;
  let dualStakePluginSdk: DualStakePluginSDK;

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

    // Get plugin SDKs from universe
    asaMintSdk = akitaUniverse.asaMintPlugin;
    dualStakePluginSdk = akitaUniverse.dualStakePlugin;

    // Fund wallet and add both plugins once
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n) });
    await wallet.addPlugin({ client: asaMintSdk, callerType: CallerType.Global });
    await wallet.addPlugin({ client: dualStakePluginSdk, callerType: CallerType.Global });
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
        callerType: CallerType.Global,
        calls: [
          dualStakePluginSdk.mint({
            appId: wallet.client.appId,
            amount: 1_000_000n,
          }),
        ],
      })).rejects.toThrow(ERR_NOT_A_DUALSTAKE_APP);
    });

    test('redeem rejects apps that were not created by the configured dual-stake registry', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          dualStakePluginSdk.redeem({
            appId: wallet.client.appId,
          }),
        ],
      })).rejects.toThrow(ERR_NOT_A_DUALSTAKE_APP);
    });
  });
});

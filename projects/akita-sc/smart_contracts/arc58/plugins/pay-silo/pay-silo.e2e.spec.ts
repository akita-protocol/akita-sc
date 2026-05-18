import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, WalletSDK, CallerType, PaySiloPluginSDK } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('PaySilo plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;

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

  });

  beforeEach(async () => {
    await fixture.newScope();

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
  });

  describe('PaySiloPlugin SDK', () => {
    test('plugin can be added OK', async () => {
      const paySiloPluginSdk = akitaUniverse.paySiloPlugin;

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins) });

      await wallet.addPlugin({
        client: paySiloPluginSdk,
        callerType: CallerType.Global,
      });

      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
    });

    test('pay sends ALGO to the configured silo recipient', async () => {
      const paySiloPluginSdk = akitaUniverse.paySiloPlugin;
      const paymentAmount = 250_000n;

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({
        amount: algokit.microAlgo(mbr.plugins + paymentAmount + 500_000n),
      });
      await wallet.addPlugin({ client: paySiloPluginSdk, callerType: CallerType.Global });

      const recipientBefore = await algorand.account.getInformation(deployer.addr);

      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          paySiloPluginSdk.pay({
            payments: [{ asset: 0n, amount: paymentAmount }],
          }),
        ],
      });

      const recipientAfter = await algorand.account.getInformation(deployer.addr);
      expect(results.txIds.length).toBeGreaterThan(0);
      expect(recipientAfter.balance.microAlgos - recipientBefore.balance.microAlgos).toBe(paymentAmount);
    });

    test('factory mints a silo that pays a custom recipient', async () => {
      const recipient = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const factoryPluginSdk = akitaUniverse.paySiloFactoryPlugin;
      const paymentAmount = 150_000n;

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({
        amount: algokit.microAlgo(mbr.plugins * 2n + paymentAmount + 2_000_000n),
      });
      await wallet.addPlugin({ client: factoryPluginSdk, callerType: CallerType.Global });

      const mintResults = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          factoryPluginSdk.mint({
            recipient: recipient.addr.toString(),
          }),
        ],
      });

      const mintedAppId = BigInt(mintResults.returns[1]);
      expect(mintedAppId).toBeGreaterThan(0n);

      const mintedPaySiloPluginSdk = new PaySiloPluginSDK({
        algorand,
        factoryParams: {
          appId: mintedAppId,
          defaultSender: user.addr,
          defaultSigner: user.signer,
        },
      });

      await wallet.addPlugin({ client: mintedPaySiloPluginSdk, callerType: CallerType.Global });

      const recipientBefore = await algorand.account.getInformation(recipient.addr);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          mintedPaySiloPluginSdk.pay({
            payments: [{ asset: 0n, amount: paymentAmount }],
          }),
        ],
      });

      const recipientAfter = await algorand.account.getInformation(recipient.addr);
      expect(recipientAfter.balance.microAlgos - recipientBefore.balance.microAlgos).toBe(paymentAmount);
    });
  });
});

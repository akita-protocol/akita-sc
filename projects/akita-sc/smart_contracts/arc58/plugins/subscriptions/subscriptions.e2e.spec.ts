import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/transact';
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, SubscriptionsPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { TimeWarp } from '../../../../tests/utils/time';
import { ERR_CANNOT_TRIGGER } from '../../../subscriptions/errors';
import { SubscriptionsPluginClient as SubscriptionsPluginArtifactClient } from '../../../artifacts/arc58/plugins/subscriptions/SubscriptionsPluginClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const MIN_INTERVAL = 60;

describe('Subscriptions plugin contract', () => {
  let deployer: AddressWithTransactionSigner;
  let user: AddressWithTransactionSigner;
  let akitaUniverse: AkitaUniverse;
  let dispenser: AddressWithTransactionSigner;
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let subscriptionsPluginSdk: SubscriptionsPluginSDK;
  let subscriptionsPluginClient: SubscriptionsPluginArtifactClient;
  let timeWarp: TimeWarp;

  const fundTriggerPayment = ({
    id,
    args = [],
    rekeyBack = true,
  }: {
    id: bigint;
    args?: Uint8Array[];
    rekeyBack?: boolean;
  }) => () => ({
    appId: subscriptionsPluginClient.appClient.appId,
    selectors: [subscriptionsPluginClient.appClient.getABIMethod('fundTriggerPayment').getSelector()],
    getTxns: async ({ wallet: walletId }: { wallet: bigint }) => {
      const params = await (subscriptionsPluginClient.params.fundTriggerPayment as any)({
        args: { wallet: walletId, rekeyBack, id, args },
        maxFee: algokit.microAlgo(10_000n),
      });

      return [{
        type: 'methodCall' as const,
        ...params,
      }];
    },
  });

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    timeWarp = new TimeWarp(algorand);
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser as never, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser as never, (500).algo());

    // Build the full Akita DAO universe
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: akitaUniverse.subscriptions.client.appAddress,
      amount: algokit.microAlgo(100_000n),
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
      extraFunding: 10_000_000n,
    });

    // Get the plugin SDK and add it to the wallet once
    subscriptionsPluginSdk = akitaUniverse.subscriptionsPlugin;
    subscriptionsPluginClient = new SubscriptionsPluginArtifactClient({
      algorand,
      appId: subscriptionsPluginSdk.appId,
      defaultSender: user.addr,
      defaultSigner: user.signer,
    });
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 10_000_000n) });
    await wallet.addPlugin({ client: subscriptionsPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  afterEach(async () => {
    await timeWarp.resetTimeWarp();
  });

  describe('SubscriptionsPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(subscriptionsPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('fundTriggerPayment returns a plugin hook', () => {
      const hook = fundTriggerPayment({
        id: 0n,
      });
      const result = hook();

      expect(result.appId).toBe(subscriptionsPluginSdk.appId);
      expect(result.selectors).toBeDefined();
      expect(result.selectors.length).toBe(1);
      expect(result.selectors[0]).toBeInstanceOf(Uint8Array);
      expect(result.selectors[0].length).toBe(4);
    });
  });

  describe('fundTriggerPayment', () => {
    test('funds exactly one unpaid ALGO window without triggering payment', async () => {
      const recipient = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const amount = 100_000n;

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.subscribe({
            recipient: recipient.addr.toString(),
            amount,
            interval: BigInt(MIN_INTERVAL),
          }),
        ],
      });

      const subscriptionId = (await akitaUniverse.subscriptions.getSubscriptionList({
        address: wallet.client.appAddress.toString(),
      })) - 1n;

      const subBefore = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });
      expect(subBefore.escrowed).toBe(0n);

      const recipientBefore = await algorand.account.getInformation(recipient.addr);

      await timeWarp.timeWarp(BigInt(MIN_INTERVAL + 1));

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          fundTriggerPayment({
            id: subscriptionId,
          }),
        ],
      });

      const subAfter = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });
      const recipientAfterFund = await algorand.account.getInformation(recipient.addr);

      expect(subAfter.escrowed).toBe(amount);
      expect(subAfter.lastPayment).toBe(subBefore.lastPayment);
      expect(recipientAfterFund.balance.microAlgos).toBe(recipientBefore.balance.microAlgos);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.triggerPayment({
            address: wallet.client.appAddress.toString(),
            id: subscriptionId,
          }),
        ],
      });

      const subAfterTrigger = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });
      const recipientAfterTrigger = await algorand.account.getInformation(recipient.addr);

      expect(subAfterTrigger.escrowed).toBe(0n);
      expect(subAfterTrigger.lastPayment).toBeGreaterThan(subAfter.lastPayment);
      expect(recipientAfterTrigger.balance.microAlgos).toBeGreaterThan(recipientBefore.balance.microAlgos);
    });

    test('rejects when the current payment window is already paid', async () => {
      const recipient = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const amount = 100_000n;

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.subscribe({
            recipient: recipient.addr.toString(),
            amount,
            interval: BigInt(MIN_INTERVAL),
          }),
        ],
      });

      const subscriptionId = (await akitaUniverse.subscriptions.getSubscriptionList({
        address: wallet.client.appAddress.toString(),
      })) - 1n;

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          fundTriggerPayment({
            id: subscriptionId,
          }),
        ],
      })).rejects.toThrow(ERR_CANNOT_TRIGGER);

      const subAfter = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });
      expect(subAfter.escrowed).toBe(0n);
    });

    test('rejects when the unpaid window already has enough escrow', async () => {
      const recipient = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const amount = 100_000n;

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.subscribe({
            recipient: recipient.addr.toString(),
            amount,
            interval: BigInt(MIN_INTERVAL),
          }),
        ],
      });

      const subscriptionId = (await akitaUniverse.subscriptions.getSubscriptionList({
        address: wallet.client.appAddress.toString(),
      })) - 1n;

      await timeWarp.timeWarp(BigInt(MIN_INTERVAL + 1));

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          fundTriggerPayment({
            id: subscriptionId,
          }),
        ],
      });

      const fundedSub = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });
      expect(fundedSub.escrowed).toBe(amount);

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          fundTriggerPayment({
            id: subscriptionId,
          }),
        ],
      })).rejects.toThrow(ERR_CANNOT_TRIGGER);

      const subAfter = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });
      expect(subAfter.escrowed).toBe(amount);
      expect(subAfter.lastPayment).toBe(fundedSub.lastPayment);
    });
  });
});

import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/transact';
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, SubscriptionsPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { ServiceStatus } from 'akita-sdk/subscriptions';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { TimeWarp } from '../../../../tests/utils/time';
import { ERR_CANNOT_TRIGGER } from '../../../subscriptions/errors';
import { ERR_INVALID_CALL_ORDER } from './errors';
import { SubscriptionsPluginClient as SubscriptionsPluginArtifactClient } from '../../../artifacts/arc58/plugins/subscriptions/SubscriptionsPluginClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const MIN_INTERVAL = 60;
const EMPTY_CID = new Uint8Array(36).fill(120);
const HIGHLIGHT_COLOR = new Uint8Array([0xaa, 0xbb, 0xcc]);

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

  const walletAddress = () => wallet.client.appAddress.toString();

  const fundWalletApp = async (amount = 150_000_000n) => {
    const walletAddresses = new Set([
      wallet.client.appAddress.toString(),
      await wallet.client.state.global.controlledAddress(),
      await wallet.client.state.global.spendingAddress(),
    ]);

    for (const address of walletAddresses) {
      if (!address) continue;
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: address,
        amount: algokit.microAlgo(amount),
      });
    }
  };

  const createWalletService = async ({
    title = 'Plugin Service',
    description = 'Created through the ARC58 subscriptions plugin.',
    amount = 100_000n,
    passes = 0n,
  }: {
    title?: string;
    description?: string;
    amount?: bigint;
    passes?: bigint;
  } = {}) => {
    await fundWalletApp();

    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        ...subscriptionsPluginSdk.newServiceWithDescription({
          interval: BigInt(MIN_INTERVAL),
          asset: 0n,
          amount,
          passes,
          gate: 0n,
          payoutAddress: deployer.addr.toString(),
          title,
          description,
          bannerImage: EMPTY_CID,
          highlightMessage: 0,
          highlightColor: HIGHLIGHT_COLOR,
        }),
      ],
    });

    const serviceId = (await akitaUniverse.subscriptions.getServiceList({
      address: walletAddress(),
    })) - 1n;
    const service = await akitaUniverse.subscriptions.getService({
      address: walletAddress(),
      id: Number(serviceId),
    });

    return { serviceId, service };
  };

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
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: subscriptionsPluginClient.appAddress,
      amount: algokit.microAlgo(500_000_000n),
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

    test('subscribes to an ASA service with passes using exact subscription cost', async () => {
      const asset = akitaUniverse.aktaAssetId;
      const serviceAmount = 1_000_000n;

      if (!(await akitaUniverse.subscriptions.isOptedInToAsset(asset))) {
        await akitaUniverse.subscriptions.optIn({
          sender: deployer.addr.toString(),
          signer: deployer.signer,
          asset,
        });
      }

      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: akitaUniverse.subscriptions.client.appAddress,
        amount: algokit.microAlgo(1_000_000n),
      });

      const serviceId = await akitaUniverse.subscriptions.newService({
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        interval: BigInt(MIN_INTERVAL),
        asset,
        amount: serviceAmount,
        passes: 3n,
        gateId: 0n,
        payoutAddress: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
        title: 'ASA Family Plan',
        description: 'ASA service with family passes',
        bannerImage: EMPTY_CID,
        highlightMessage: 0,
        highlightColor: '#AABBCC',
      });

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 2_000_000n) });
      await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          akitaUniverse.optInPlugin.optIn({ assets: [asset] }),
        ],
      });

      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: wallet.client.appAddress.toString(),
        assetId: asset,
        amount: serviceAmount,
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.subscribe({
            recipient: deployer.addr.toString(),
            asset,
            amount: serviceAmount,
            interval: BigInt(MIN_INTERVAL),
            index: serviceId,
          }),
        ],
      });

      const subscriptionId = (await akitaUniverse.subscriptions.getSubscriptionList({
        address: wallet.client.appAddress.toString(),
      })) - 1n;

      const subscription = await akitaUniverse.subscriptions.getSubscription({
        address: wallet.client.appAddress.toString(),
        id: subscriptionId,
      });

      expect(subscription.asset).toBe(asset);
      expect(subscription.amount).toBe(serviceAmount);
      expect(subscription.serviceId).toBe(serviceId);
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

    test('newServiceWithDescription creates a service and stores description chunks', async () => {
      const longDescription = `${'A'.repeat(2026)}${'B'.repeat(20)}`;

      const { serviceId, service } = await createWalletService({
        title: 'Chunked Description',
        description: longDescription,
        amount: 123_456n,
      });

      expect(serviceId).toBeGreaterThanOrEqual(0n);
      expect(service.status).toBe(ServiceStatus.Active);
      expect(service.amount).toBe(123_456n);
      expect(service.description).toBe(longDescription);
    });

    test('creator wallet can update service title and description through plugin states', async () => {
      const { serviceId } = await createWalletService({
        title: 'Original Plugin Title',
        description: 'Original plugin description',
      });

      const activeDescription = `${'Active '.repeat(350)}done`;

      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: akitaUniverse.subscriptions.client.appAddress,
        amount: algokit.microAlgo(1_000_000n),
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: subscriptionsPluginSdk.updateServiceMetadata({
          id: serviceId,
          title: 'Updated Plugin Title',
          description: activeDescription,
        }),
      });

      let service = await akitaUniverse.subscriptions.getService({
        address: walletAddress(),
        id: Number(serviceId),
      });
      expect(service.title).toBe('Updated Plugin Title');
      expect(service.description).toBe(activeDescription);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.pauseService({ id: serviceId, rekeyBack: false }),
          ...subscriptionsPluginSdk.updateServiceDescription({
            id: serviceId,
            description: 'Paused plugin description',
          }),
        ],
      });

      service = await akitaUniverse.subscriptions.getService({
        address: walletAddress(),
        id: Number(serviceId),
      });
      expect(service.status).toBe(ServiceStatus.Paused);
      expect(service.description).toBe('Paused plugin description');

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.shutdownService({ index: serviceId, rekeyBack: false }),
          ...subscriptionsPluginSdk.updateServiceMetadata({
            id: serviceId,
            title: 'Shutdown Plugin Title',
            description: '',
          }),
        ],
      });

      service = await akitaUniverse.subscriptions.getService({
        address: walletAddress(),
        id: Number(serviceId),
      });
      expect(service.status).toBe(ServiceStatus.Shutdown);
      expect(service.title).toBe('Shutdown Plugin Title');
      expect(service.description).toBe('');
    });

    test('loadDescription rejects without the required initDescription call order', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.loadDescription({
            offset: 0n,
            data: new Uint8Array([1, 2, 3]),
          }),
        ],
      })).rejects.toThrow(ERR_INVALID_CALL_ORDER);
    });

    test('pauseService and shutdownService update service status', async () => {
      const paused = await createWalletService({ title: 'Pause Me' });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.pauseService({ id: paused.serviceId }),
        ],
      });

      const pausedService = await akitaUniverse.subscriptions.getService({
        address: walletAddress(),
        id: Number(paused.serviceId),
      });
      expect(pausedService.status).toBe(ServiceStatus.Paused);

      const shutdown = await createWalletService({ title: 'Shutdown Me' });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.shutdownService({ index: shutdown.serviceId }),
        ],
      });

      const shutdownService = await akitaUniverse.subscriptions.getService({
        address: walletAddress(),
        id: Number(shutdown.serviceId),
      });
      expect(shutdownService.status).toBe(ServiceStatus.Shutdown);
    });

    test('block and unblock toggle blocked state for the wallet merchant', async () => {
      const blocked = await fixture.context.generateAccount({ initialFunds: (1).algos() });

      await fundWalletApp();
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.block({ address: blocked.addr.toString() }),
        ],
      });

      await expect(akitaUniverse.subscriptions.isBlocked({
        address: walletAddress(),
        blocked: blocked.addr.toString(),
      })).resolves.toBe(true);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.unblock({ address: blocked.addr.toString() }),
        ],
      });

      await expect(akitaUniverse.subscriptions.isBlocked({
        address: walletAddress(),
        blocked: blocked.addr.toString(),
      })).resolves.toBe(false);
    });

    test('setPasses stores family pass holders for a wallet subscription', async () => {
      const existingServices = await akitaUniverse.subscriptions.getServiceList({
        address: walletAddress(),
      });
      if (existingServices === 0n) {
        await createWalletService({ title: 'Donation Index Guard' });
      }

      const { serviceId } = await createWalletService({
        title: 'Family Passes',
        amount: 100_000n,
        passes: 2n,
      });
      const passHolder1 = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const passHolder2 = await fixture.context.generateAccount({ initialFunds: (1).algos() });

      await fundWalletApp();
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.subscribe({
            recipient: walletAddress(),
            amount: 100_000n,
            interval: BigInt(MIN_INTERVAL),
            index: serviceId,
          }),
        ],
      });

      const subscriptionId = (await akitaUniverse.subscriptions.getSubscriptionList({
        address: walletAddress(),
      })) - 1n;

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.setPasses({
            id: subscriptionId,
            addresses: [
              passHolder1.addr.toString(),
              passHolder2.addr.toString(),
            ],
          }),
        ],
      });

      const details = await akitaUniverse.subscriptions.getSubscriptionWithDetails({
        address: walletAddress(),
        id: subscriptionId,
      });

      expect(details.passes).toHaveLength(2);
      expect(details.passes).toContain(passHolder1.addr.toString());
      expect(details.passes).toContain(passHolder2.addr.toString());
    });

    test('streakCheck resets a missed subscription streak through the plugin path', async () => {
      const recipient = await fixture.context.generateAccount({ initialFunds: (1).algos() });
      const amount = 100_000n;

      await fundWalletApp();
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
        address: walletAddress(),
      })) - 1n;

      await timeWarp.timeWarp(BigInt(MIN_INTERVAL + 1));
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          fundTriggerPayment({ id: subscriptionId }),
        ],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.triggerPayment({
            address: walletAddress(),
            id: subscriptionId,
          }),
        ],
      });

      const subAfterPayment = await akitaUniverse.subscriptions.getSubscription({
        address: walletAddress(),
        id: subscriptionId,
      });
      expect(subAfterPayment.streak).toBeGreaterThan(0n);

      await timeWarp.timeWarp(BigInt(MIN_INTERVAL * 3));
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.streakCheck({
            key: {
              address: walletAddress(),
              id: subscriptionId,
            },
          }),
        ],
      });

      const subAfterMiss = await akitaUniverse.subscriptions.getSubscription({
        address: walletAddress(),
        id: subscriptionId,
      });
      expect(subAfterMiss.streak).toBe(0n);
    });

    test('streakCheck rejects a missing subscription key', async () => {
      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          subscriptionsPluginSdk.streakCheck({
            key: {
              address: walletAddress(),
              id: 999_999n,
            },
          }),
        ],
      })).rejects.toThrow();
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

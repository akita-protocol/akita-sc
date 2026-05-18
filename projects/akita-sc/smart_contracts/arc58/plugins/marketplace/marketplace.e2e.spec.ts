import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { MarketplacePluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { ListingSDK } from 'akita-sdk/marketplace';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const ONE_DAY = 86_400n;
const ZERO_ADDRESS = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ';

const getBlockTimestamp = async (algorand: import('@algorandfoundation/algokit-utils').AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status();
  const block = await algorand.client.algod.block(status.lastRound);
  return BigInt(block.block.header.timestamp);
};

const findLastCreatedAppId = (nodes: unknown[]): bigint | undefined => {
  let appId: bigint | undefined;

  const walk = (node: unknown): void => {
    if (node === null || typeof node !== 'object') return;
    const txn = node as Record<string, unknown>;
    const created = txn.applicationIndex ?? txn['application-index'] ?? txn.createdApplicationIndex;
    if (typeof created === 'bigint') {
      appId = created;
    } else if (typeof created === 'number') {
      appId = BigInt(created);
    }

    const innerTxns = txn.innerTxns ?? txn['inner-txns'];
    if (Array.isArray(innerTxns)) {
      innerTxns.forEach(walk);
    }
  };

  nodes.forEach(walk);
  return appId;
};

const getCreatedAppIds = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
  address: Address,
): Promise<bigint[]> => {
  const accountInfo = await algorand.client.algod.accountInformation(address) as Record<string, unknown>;
  const createdApps = accountInfo.createdApps ?? accountInfo['created-apps'];
  if (!Array.isArray(createdApps)) return [];

  return createdApps
    .map((app) => {
      const appRecord = app as Record<string, unknown>;
      const id = appRecord.id ?? appRecord.index ?? appRecord.applicationIndex ?? appRecord['application-index'];
      return typeof id === 'bigint' ? id : typeof id === 'number' ? BigInt(id) : undefined;
    })
    .filter((id): id is bigint => id !== undefined);
};

describe('Marketplace plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let buyer: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let buyerWallet: WalletSDK;
  let marketplacePluginSdk: MarketplacePluginSDK;
  let testAssetId: bigint;
  let prizeBoxId: bigint;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });
    buyer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (500).algo());
    await algorand.account.ensureFunded(buyer.addr, dispenser, (500).algo());

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

    buyerWallet = await newWallet({
      algorand,
      factoryParams: {
        appId: akitaUniverse.walletFactory.appId,
        defaultSender: buyer.addr,
        defaultSigner: buyer.signer,
      },
      sender: buyer.addr,
      signer: buyer.signer,
      nickname: 'Buyer Wallet',
    });

    // Get the plugin SDK and add it to the wallet once
    marketplacePluginSdk = akitaUniverse.marketplacePlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n + 100_000_000n) });
    await buyerWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n + 100_000_000n) });
    await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global, sender: user.addr, signer: user.signer });
    await wallet.addPlugin({ client: marketplacePluginSdk, callerType: CallerType.Global, sender: user.addr, signer: user.signer });
    await buyerWallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global, sender: buyer.addr, signer: buyer.signer });
    await buyerWallet.addPlugin({ client: marketplacePluginSdk, callerType: CallerType.Global, sender: buyer.addr, signer: buyer.signer });

    const assetCreateTxn = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000n,
      decimals: 0,
      assetName: 'Marketplace Plugin Test',
      unitName: 'MPT',
    });
    testAssetId = BigInt(assetCreateTxn.confirmation.assetId!);

    for (const testWallet of [wallet, buyerWallet]) {
      await testWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          akitaUniverse.optInPlugin.optIn({
            assets: [testAssetId],
          }),
        ],
      });
    }

    await algorand.send.assetTransfer({
      sender: deployer.addr,
      signer: deployer.signer,
      assetId: testAssetId,
      amount: 10n,
      receiver: wallet.client.appAddress,
    });

    await algorand.account.ensureFunded(akitaUniverse.prizeBoxFactory.client.appAddress, dispenser, (50).algo());
    const prizeBox = await akitaUniverse.prizeBoxFactory.mint({
      sender: user.addr,
      signer: user.signer,
      owner: wallet.client.appAddress.toString(),
    });
    prizeBoxId = prizeBox.client.appId;
  });

  beforeEach(fixture.newScope);

  describe('MarketplacePlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(2);
      expect(marketplacePluginSdk.appId).toBeGreaterThan(0n);
    });

    test('lists an ASA and changes its price through the plugin path', async () => {
      const listingId = await createListing({ amount: 1n, price: 5_000_000n, name: 'Plugin Listed ASA' });
      const listing = akitaUniverse.marketplace.getListing({ appId: listingId });

      expect(listing).toBeInstanceOf(ListingSDK);
      await expectListingState(listing, { price: 5_000_000n, seller: wallet.client.appAddress.toString() });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          marketplacePluginSdk.changePrice({
            appId: listingId,
            price: 3_000_000n,
          }),
        ],
      });

      await expectListingState(listing, { price: 3_000_000n, seller: wallet.client.appAddress.toString() });
    });

    test('delists an ASA listing through the plugin path', async () => {
      const listingId = await createListing({ amount: 1n, price: 4_000_000n, name: 'Plugin Delisted ASA' });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          marketplacePluginSdk.delist({
            appId: listingId,
          }),
        ],
      });

      await expect(algorand.client.algod.applicationById(Number(listingId))).rejects.toThrow();
    });

    test('purchases an ASA listing through the plugin path', async () => {
      const listingId = await createListing({ amount: 1n, price: 2_000_000n, name: 'Plugin Purchased ASA' });
      const buyerInfoBefore = await algorand.account.getInformation(buyerWallet.client.appAddress);
      const buyerAssetBefore = buyerInfoBefore.assets?.find((asset) => asset.assetId === testAssetId)?.amount ?? 0n;

      await buyerWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          marketplacePluginSdk.purchase({
            appId: listingId,
            marketplace: ZERO_ADDRESS,
            args: [],
          }),
        ],
      });

      const buyerInfoAfter = await algorand.account.getInformation(buyerWallet.client.appAddress);
      const buyerAssetAfter = buyerInfoAfter.assets?.find((asset) => asset.assetId === testAssetId)?.amount ?? 0n;
      expect(buyerAssetAfter - buyerAssetBefore).toBe(1n);
      await expect(algorand.client.algod.applicationById(Number(listingId))).rejects.toThrow();
    });

    test('lists a prize box through the plugin path', async () => {
      const listingId = await createPrizeBoxListing({ price: 6_000_000n });
      const listing = akitaUniverse.marketplace.getListing({ appId: listingId });

      const state = await listing.state();
      expect(state.prize).toBe(prizeBoxId);
      expect(state.isPrizeBox).toBeTruthy();
      expect(state.paymentAsset).toBe(0n);
      expect(state.price).toBe(6_000_000n);
      expect(state.seller).toBe(wallet.client.appAddress.toString());
    });
  });

  const createListing = async ({ amount, price, name }: { amount: bigint; price: bigint; name: string }): Promise<bigint> => {
    const currentTimestamp = await getBlockTimestamp(algorand);
    const marketplaceAddress = akitaUniverse.marketplace.client.appAddress;
    const createdBefore = new Set(await getCreatedAppIds(algorand, marketplaceAddress));

    const result = await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        marketplacePluginSdk.list({
          asset: testAssetId,
          assetAmount: amount,
          price,
          paymentAsset: 0n,
          expiration: currentTimestamp + (ONE_DAY * 30n),
          reservedFor: ZERO_ADDRESS,
          gateId: 0n,
          marketplace: ZERO_ADDRESS,
          name,
          proof: [],
        }),
      ],
    });

    const abiReturn = result.returns.at(-1) as { returnValue?: unknown } | bigint | undefined;
    const listingId = typeof abiReturn === 'bigint'
      ? abiReturn
        : typeof abiReturn?.returnValue === 'bigint'
          ? abiReturn.returnValue
          : findLastCreatedAppId(result.confirmations)
            ?? (await getCreatedAppIds(algorand, marketplaceAddress)).find((appId) => !createdBefore.has(appId));

    expect(listingId).toBeGreaterThan(0n);
    return listingId!;
  };

  const createPrizeBoxListing = async ({ price }: { price: bigint }): Promise<bigint> => {
    const currentTimestamp = await getBlockTimestamp(algorand);
    const marketplaceAddress = akitaUniverse.marketplace.client.appAddress;
    const createdBefore = new Set(await getCreatedAppIds(algorand, marketplaceAddress));

    const result = await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        marketplacePluginSdk.listPrizeBox({
          prizeBox: prizeBoxId,
          price,
          paymentAsset: 0n,
          expiration: currentTimestamp + (ONE_DAY * 30n),
          reservedFor: ZERO_ADDRESS,
          gateId: 0n,
          marketplace: ZERO_ADDRESS,
        }),
      ],
    });

    const abiReturn = result.returns.at(-1) as { returnValue?: unknown } | bigint | undefined;
    const listingId = typeof abiReturn === 'bigint'
      ? abiReturn
        : typeof abiReturn?.returnValue === 'bigint'
          ? abiReturn.returnValue
          : findLastCreatedAppId(result.confirmations)
            ?? (await getCreatedAppIds(algorand, marketplaceAddress)).find((appId) => !createdBefore.has(appId));

    expect(listingId).toBeGreaterThan(0n);
    return listingId!;
  };

  const expectListingState = async (
    listing: ListingSDK,
    expected: { price: bigint; seller: string },
  ): Promise<void> => {
    const state = await listing.state();
    expect(state.prize).toBe(testAssetId);
    expect(state.isPrizeBox).toBeFalsy();
    expect(state.paymentAsset).toBe(0n);
    expect(state.price).toBe(expected.price);
    expect(state.seller).toBe(expected.seller);
  };
});

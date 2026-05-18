import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaMintPluginSDK, AuctionPluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const ONE_DAY = 86_400n;

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status();
  const block = await algorand.client.algod.block(status.lastRound);
  return BigInt(block.block.header.timestamp);
};

describe('Auction plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaMintPluginSDK;
  let auctionPluginSdk: AuctionPluginSDK;

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
    auctionPluginSdk = akitaUniverse.auctionPlugin;

    // Fund wallet and add both plugins once
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n + 10_000_000n) });
    await wallet.addPlugin({ client: asaMintSdk, callerType: CallerType.Global });
    await wallet.addPlugin({ client: auctionPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  describe('AuctionPlugin SDK', () => {
    test('plugins can be added to wallet', async () => {
      // Verify the plugins were successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(2);
      expect(auctionPluginSdk.appId).toBeGreaterThan(0n);
      expect(asaMintSdk.appId).toBeGreaterThan(0n);
    });

    test('can place first bid on a zero-fee ALGO auction', async () => {
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1n,
        decimals: 0,
        assetName: 'Plugin Auction Prize',
        unitName: 'PAP',
      });
      const prizeAssetId = BigInt(assetId!);

      await algorand.account.ensureFunded(
        akitaUniverse.auctionFactory.client.appAddress,
        dispenser,
        (100).algo(),
      );
      await akitaUniverse.auctionFactory.optIn({
        sender: deployer.addr,
        signer: deployer.signer,
        asset: prizeAssetId,
      });

      const currentTimestamp = await getBlockTimestamp(algorand);
      const auction = await akitaUniverse.auctionFactory.newAuction({
        sender: deployer.addr,
        signer: deployer.signer,
        isPrizeBox: false,
        prizeAsset: prizeAssetId,
        prizeAmount: 1n,
        name: 'Plugin zero fee auction',
        proof: [],
        bidAssetId: 0n,
        bidFee: 0n,
        startingBid: 1_000_000n,
        bidMinimumIncrease: 100_000n,
        startTimestamp: currentTimestamp,
        endTimestamp: currentTimestamp + ONE_DAY,
        gateId: 0n,
        marketplace: deployer.addr.toString(),
        weightsListCount: 0n,
      });

      await wallet.usePlugin({
        sender: user.addr,
        signer: user.signer,
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [
          auctionPluginSdk.bid({
            appId: auction.client.appId,
            amount: 1_000_000n,
            args: [],
            marketplace: deployer.addr.toString(),
          }),
        ],
      });

      expect(await auction.hasBid({ address: wallet.client.appAddress.toString() })).toBe(true);
      expect(await auction.getMinimumBidAmount()).toBe(1_100_000n);
    });
  });
});

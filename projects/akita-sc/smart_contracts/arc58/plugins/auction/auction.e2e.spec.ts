import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaManagerPluginSDK, AuctionPluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { TimeWarp } from '../../../../tests/utils/time';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const ONE_DAY = 86_400n;

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status().do();
  const block = await algorand.client.algod.block(status.lastRound).do();
  return BigInt(block.block.header.timestamp);
};

describe('Auction plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaManagerPluginSDK;
  let auctionPluginSdk: AuctionPluginSDK;

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
      expect(plugins.size).toBeGreaterThanOrEqual(2);
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
        dispenser.addr,
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

    test('AR-14: creates a fee auction through the plugin (factory-quoted cost) and cancels it before start', async () => {
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 10n, decimals: 0, assetName: 'Plugin Created Prize', unitName: 'PCP',
      });
      const prizeAssetId = BigInt(assetId!);

      await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(80_000_000n) });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.optInPlugin.optIn({ assets: [prizeAssetId] })],
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr, signer: deployer.signer, assetId: prizeAssetId, amount: 1n, receiver: wallet.client.appAddress,
      });
      await algorand.account.ensureFunded(akitaUniverse.auctionFactory.client.appAddress, dispenser.addr, (100).algo());

      const factoryAddress = akitaUniverse.auctionFactory.client.appAddress;
      const createdApps = async () => {
        const info = await algorand.client.algod.accountInformation(factoryAddress).do();
        return (info.createdApps ?? []).map((app) => BigInt(app.id));
      };
      const before = new Set(await createdApps());
      // spendable = balance - min balance (the plugin's factory opt-in adds to both)
      const spendable = async () => {
        const info = await algorand.client.algod.accountInformation(factoryAddress).do();
        return info.amount - info.minBalance;
      };
      const factoryBefore = await spendable();
      // C33: the plugin pays the factory's quote, which includes the DAO's auction creation fee
      const auctionFee = (await akitaUniverse.dao.client.state.global.nftFees())!.auctionCreationFee;
      const escrowAddress = algosdk.getApplicationAddress((await akitaUniverse.dao.wallet.getEscrow('rev_auction')).id);
      const escrowBalance = async () => (await algorand.client.algod.accountInformation(escrowAddress).do()).amount;
      const escrowBefore = await escrowBalance();
      expect(auctionFee).toBeGreaterThan(0n);
      // the plugin also opts the factory into the prize, and that payment's share for the escrow's own
      // opt-ins lands in the same escrow: everything but the factory's own 0.1 ALGO opt-in
      const escrowOptIn = await akitaUniverse.auctionFactory.client.optInCost({ args: { asset: prizeAssetId } }) - 100_000n;

      const now = await getBlockTimestamp(algorand);
      await wallet.usePlugin({
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [
          auctionPluginSdk.new({
            prizeId: prizeAssetId,
            prizeAmount: 1n,
            name: 'Plugin fee auction',
            proof: [],
            bidAssetId: 0n,
            bidFee: 1_000n,
            startingBid: 1_000_000n,
            bidMinimumIncrease: 100_000n,
            startTimestamp: now + 30n * ONE_DAY,
            endtimestamp: now + 60n * ONE_DAY,
            gateId: 0n,
            marketplace: deployer.addr.toString(),
            weightsListCount: 3n,
          }),
        ],
      });

      const auctionId = (await createdApps()).find((id) => !before.has(id));
      expect(auctionId).toBeDefined();
      const auction = akitaUniverse.auctionFactory.get({ appId: auctionId! });
      const state = await auction.state();
      expect(state.seller).toBe(wallet.client.appAddress.toString());
      // weights storage grows with the bidders: nothing is reserved at creation
      expect(state.weightsBoxCount).toBe(0n);
      // C33: the fee reached the DAO escrow, and the wallet's recorded deposit is the storage cost alone
      expect(await escrowBalance() - escrowBefore).toBe(auctionFee + escrowOptIn);
      const quoted = await akitaUniverse.auctionFactory.cost({ isPrizeBox: false, bidAssetId: 0n, prizeAssetId, weightsListCount: 3n });
      const funder = await auction.client.state.global.funder();
      expect(funder?.account).toBe(wallet.client.appAddress.toString());
      expect(funder?.amount).toBe(quoted - auctionFee);

      // AR-04 + AR-14: the seller clears weights and cancels through the plugin before the start
      await wallet.usePlugin({
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [auctionPluginSdk.clearWeightsBoxes({ auctionAppId: auctionId!, iterationAmount: 3n })],
      });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [auctionPluginSdk.cancel({ appId: auctionId! })],
      });

      await expect(algorand.client.algod.getApplicationByID(auctionId!).do()).rejects.toThrow();
      const holding = await algorand.asset.getAccountInformation(wallet.client.appAddress, prizeAssetId);
      expect(holding.balance).toBe(1n);
      // AR-13: the factory refunded exactly what it released
      expect(await spendable()).toBe(factoryBefore);
      // C33: the creation fee is not refunded by a cancel
      expect(await escrowBalance() - escrowBefore).toBe(auctionFee + escrowOptIn);
      // no spending account is left rekeyed to the plugin
      const walletInfo = await algorand.client.algod.accountInformation(wallet.client.appAddress).do();
      expect(walletInfo.authAddr).toBeUndefined();
    });

    test('TRADE-1: the plugin cannot be deleted through its deleteApplication method, even with a spoofed wallet', async () => {
      const timeWarp = new TimeWarp(algorand);
      const attacker = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(50_000_000) });
      const caller = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) });
      await algorand.account.ensureFunded(attacker.addr, dispenser.addr, (50).algo());

      // a finished, claimed zero-fee auction whose seller is the attacker's EOA
      const { assetId } = await algorand.send.assetCreate({
        sender: attacker.addr, signer: attacker.signer, total: 1n, decimals: 0, assetName: 'Self Prize', unitName: 'SLF',
      });
      const prizeAssetId = BigInt(assetId!);
      await algorand.account.ensureFunded(akitaUniverse.auctionFactory.client.appAddress, dispenser.addr, (100).algo());
      await akitaUniverse.auctionFactory.optIn({ sender: deployer.addr, signer: deployer.signer, asset: prizeAssetId });
      const now = await getBlockTimestamp(algorand);
      const auction = await akitaUniverse.auctionFactory.newAuction({
        sender: attacker.addr,
        signer: attacker.signer,
        isPrizeBox: false,
        prizeAsset: prizeAssetId,
        prizeAmount: 1n,
        name: 'Self auction',
        proof: [],
        bidAssetId: 0n,
        bidFee: 0n,
        startingBid: 1_000_000n,
        bidMinimumIncrease: 100_000n,
        startTimestamp: now,
        endTimestamp: now + 301n,
        gateId: 0n,
        marketplace: attacker.addr.toString(),
        weightsListCount: 0n,
      });
      await timeWarp.timeWarp(400n);
      await auction.claimPrize({ sender: caller.addr, signer: caller.signer });

      // a fake "wallet" app whose spending_address is the attacker, who rekeys to the plugin
      const fakeWallet = await algorand.send.appCreate({
        sender: attacker.addr,
        signer: attacker.signer,
        approvalProgram: '#pragma version 10\nbyte "spending_address"\ntxna ApplicationArgs 0\napp_global_put\nint 1',
        clearStateProgram: '#pragma version 10\nint 1',
        schema: { globalInts: 0, globalByteSlices: 1, localInts: 0, localByteSlices: 0 },
        args: [attacker.addr.publicKey],
      });
      const pluginAddress = algosdk.getApplicationAddress(auctionPluginSdk.appId);
      await algorand.send.payment({
        sender: attacker.addr, signer: attacker.signer, receiver: attacker.addr, amount: algokit.microAlgos(0), rekeyTo: pluginAddress,
      });

      const deleteCall = {
        sender: caller.addr,
        signer: caller.signer,
        appId: auctionPluginSdk.appId,
        method: algosdk.ABIMethod.fromSignature('deleteApplication(uint64,bool,uint64)void'),
        args: [fakeWallet.appId, true, auction.client.appId],
        maxFee: algokit.microAlgos(20_000),
      };
      const sendParams = { coverAppCallInnerTransactionFees: true, populateAppCallResources: true };

      await expect(algorand.send.appDeleteMethodCall({ ...deleteCall, ...sendParams }).then(() => 'deleted')).rejects.toThrow();
      expect((await algorand.client.algod.getApplicationByID(auctionPluginSdk.appId).do()).id).toBe(auctionPluginSdk.appId);

      // the same method as a NoOp still routes the seller's deletion through the factory
      await algorand.send.appCallMethodCall({ ...deleteCall, ...sendParams });
      await expect(algorand.client.algod.getApplicationByID(auction.client.appId).do()).rejects.toThrow();
      expect((await algorand.client.algod.getApplicationByID(auctionPluginSdk.appId).do()).id).toBe(auctionPluginSdk.appId);
    });

    test('AR-10: a third party settling through its own wallet does not capture the referral cut', async () => {
      const timeWarp = new TimeWarp(algorand);
      const referrer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(1_000_000) });
      const settler = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(50_000_000) });
      await algorand.account.ensureFunded(settler.addr, dispenser.addr, (50).algo());

      // a wallet whose referrer is controlled by the third party
      const settlerWallet = await newWallet({
        algorand,
        factoryParams: {
          appId: akitaUniverse.walletFactory.appId,
          defaultSender: settler.addr,
          defaultSigner: settler.signer,
        },
        sender: settler.addr,
        signer: settler.signer,
        nickname: 'Settler Wallet',
        referrer: referrer.addr.toString(),
      });
      const mbr = await settlerWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await settlerWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n + 10_000_000n) });
      await settlerWallet.addPlugin({ client: auctionPluginSdk, callerType: CallerType.Global });

      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1n, decimals: 0, assetName: 'Referral Prize', unitName: 'RFP',
      });
      const prizeAssetId = BigInt(assetId!);
      await akitaUniverse.auctionFactory.optIn({ sender: deployer.addr, signer: deployer.signer, asset: prizeAssetId });
      const bidder = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(20_000_000) });
      await algorand.account.ensureFunded(bidder.addr, dispenser.addr, (20).algo());
      await algorand.send.assetOptIn({ sender: bidder.addr, signer: bidder.signer, assetId: prizeAssetId });

      const now = await getBlockTimestamp(algorand);
      const auction = await akitaUniverse.auctionFactory.newAuction({
        sender: deployer.addr,
        signer: deployer.signer,
        isPrizeBox: false,
        prizeAsset: prizeAssetId,
        prizeAmount: 1n,
        name: 'Referral auction',
        proof: [],
        bidAssetId: 0n,
        bidFee: 0n,
        startingBid: 5_000_000n,
        bidMinimumIncrease: 100_000n,
        startTimestamp: now,
        endTimestamp: now + 7n * ONE_DAY,
        gateId: 0n,
        marketplace: deployer.addr.toString(),
        weightsListCount: 0n,
      });
      await auction.bid({ sender: bidder.addr, signer: bidder.signer, amount: 5_000_000n, marketplace: deployer.addr.toString() });
      await timeWarp.timeWarp(8n * ONE_DAY);

      const rewardsAddress = algosdk.getApplicationAddress(akitaUniverse.rewards.appId);
      const rewardsBefore = (await algorand.client.algod.accountInformation(rewardsAddress).do()).amount;

      await settlerWallet.usePlugin({
        sender: settler.addr,
        signer: settler.signer,
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [auctionPluginSdk.claimPrize({ appId: auction.client.appId })],
      });

      expect((await auction.state()).prizeClaimed).toBeTruthy();
      // the seller (an EOA without a wallet) has no referrer: no referral disbursement is created,
      // whichever wallet triggered the settlement
      expect((await algorand.client.algod.accountInformation(rewardsAddress).do()).amount).toBe(rewardsBefore);
    });
  });
});

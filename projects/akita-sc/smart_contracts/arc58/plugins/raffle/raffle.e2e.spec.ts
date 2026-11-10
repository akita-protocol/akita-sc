import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaManagerPluginSDK, newWallet, RafflePluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('Raffle plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaManagerPluginSDK;
  let rafflePluginSdk: RafflePluginSDK;

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
    rafflePluginSdk = akitaUniverse.rafflePlugin;

    // Fund wallet and add both plugins once
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins * 2n + 10_000_000n) });
    await wallet.addPlugin({ client: asaMintSdk, callerType: CallerType.Global });
    await wallet.addPlugin({ client: rafflePluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  describe('RafflePlugin SDK', () => {
    test('plugins can be added to wallet', async () => {
      // Verify the plugins were successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBeGreaterThanOrEqual(2);
      expect(rafflePluginSdk.appId).toBeGreaterThan(0n);
      expect(asaMintSdk.appId).toBeGreaterThan(0n);
    });

    test('AR-14/AR-C: creates a raffle through the plugin (factory-quoted cost incl. creation fee, min entries) and enters it', async () => {
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 10n, decimals: 0, assetName: 'Plugin Raffle Prize', unitName: 'PRP',
      });
      const prizeAssetId = BigInt(assetId!);

      await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(120_000_000n) });
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.optInPlugin.optIn({ assets: [prizeAssetId] })],
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr, signer: deployer.signer, assetId: prizeAssetId, amount: 1n, receiver: wallet.client.appAddress,
      });
      await algorand.account.ensureFunded(akitaUniverse.raffleFactory.client.appAddress, dispenser.addr, (100).algo());

      const factoryAddress = akitaUniverse.raffleFactory.client.appAddress;
      const createdApps = async () => {
        const info = await algorand.client.algod.accountInformation(factoryAddress).do();
        return (info.createdApps ?? []).map((app) => BigInt(app.id));
      };
      const before = new Set(await createdApps());

      const status = await algorand.client.algod.status().do();
      const now = BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp);
      await wallet.usePlugin({
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [
          rafflePluginSdk.newRaffle({
            prizeId: prizeAssetId,
            prizeAmount: 1n,
            ticketAssetId: 0n,
            startTimestamp: now,
            endTimestamp: now + 86_400n,
            minTickets: 1_000_000n,
            maxTickets: 10_000_000n,
            minEntries: 2n,
            gateId: 0n,
            marketplace: deployer.addr.toString(),
            name: 'Plugin raffle',
            proof: [],
            weightsListCount: 4n,
          }),
        ],
      });

      const raffleId = (await createdApps()).find((id) => !before.has(id));
      expect(raffleId).toBeDefined();
      const raffle = akitaUniverse.raffleFactory.get({ appId: raffleId! });
      expect((await raffle.state()).minEntries).toBe(2n);
      expect((await raffle.state()).seller).toBe(wallet.client.appAddress.toString());

      // AR-14: ticket asset read correctly (uint64 global) and the entry pays tickets + child-quoted MBR
      await wallet.usePlugin({
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [
          rafflePluginSdk.enter({
            appId: raffleId!,
            amount: 2_000_000n,
            marketplace: deployer.addr.toString(),
            args: [],
          }),
        ],
      });

      const state = await raffle.state();
      expect(state.entryCount).toBe(1n);
      expect(state.ticketCount).toBe(2_000_000n);
      // no spending account is left rekeyed to the plugin
      const walletInfo = await algorand.client.algod.accountInformation(wallet.client.appAddress).do();
      expect(walletInfo.authAddr).toBeUndefined();
    });
  });
});

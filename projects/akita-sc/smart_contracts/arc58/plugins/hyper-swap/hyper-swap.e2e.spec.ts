import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { HyperSwapPluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { MerkleTree, SchemaPart } from 'akita-sdk/meta';
import { HyperSwapSDK, hyperSwapParticipantTree, hyperSwapTradeTree, validateOffer } from 'akita-sdk/hyper-swap';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('HyperSwap plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let hyperSwapPluginSdk: HyperSwapPluginSDK;

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

    // Get plugin SDK and add it to the wallet once
    hyperSwapPluginSdk = akitaUniverse.hyperSwapPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    // Fund the wallet with plugin MBR + ~0.5 ALGO headroom. The offer flow
    // requires the plugin to forward an inner payment of
    // `offers + participants + 2 * (mm.root + mm.data)` microAlgos (184_900)
    // to the base HyperSwap contract, so 500_000 is comfortable slack.
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 500_000n) });
    await wallet.addPlugin({ client: hyperSwapPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  describe('HyperSwapPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(hyperSwapPluginSdk.appId).toBeGreaterThan(0n);
    });

    test.each([false, true])('executes an offer through the wallet and restores authority (cancel: %s)', async (cancel) => {
      const partner = await newWallet({
        algorand,
        factoryParams: { appId: akitaUniverse.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
        sender: user.addr, signer: user.signer, nickname: cancel ? 'Cancel partner' : 'Trade partner',
      });
      await partner.client.appClient.fundAppAccount({ amount: algokit.microAlgo(5_000_000) });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(5_000_000) });
      await partner.addPlugin({ client: hyperSwapPluginSdk, callerType: CallerType.Global });
      const maker = wallet.client.appAddress.toString();
      const taker = partner.client.appAddress.toString();
      const participantList = [maker, taker];
      const leafList = [
        { from: maker, receiver: taker, asset: 0n, amount: 10_000n },
        { from: taker, receiver: maker, asset: 0n, amount: 20_000n },
      ];
      const participants = hyperSwapParticipantTree(participantList);
      const trades = hyperSwapTradeTree(leafList);
      const swap = akitaUniverse.hyperSwap.client;
      const swapSdk = new HyperSwapSDK({ algorand, factoryParams: { appId: swap.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } });
      const id = (await swap.state.global.offerCursor())!;
      const status = await algorand.client.algod.status().do();
      const block = await algorand.client.algod.block(status.lastRound).do();
      const execute = async (account: WalletSDK, call: ReturnType<HyperSwapPluginSDK['offer']>) => {
        await account.usePlugin({ callerType: CallerType.Global, calls: [call] });
        const address = account.client.appAddress.toString();
        const info = await algorand.account.getInformation(address);
        expect(info.authAddr?.toString() ?? address).toBe(address);
      };
      await execute(wallet, hyperSwapPluginSdk.offer({
        root: trades.root, leaves: 2, participantsRoot: participants.root, participantLeaves: 2,
        expiration: BigInt(block.block.header.timestamp) + 3600n,
      }));
      // The partner derives the terms from the full lists, never from the chain.
      const terms = validateOffer({ id, offer: await swapSdk.getOffer({ id }), leaves: leafList, participants: participantList });
      await execute(partner, hyperSwapPluginSdk.accept({ id, proof: participants.getProof(1), terms }));
      await execute(wallet, hyperSwapPluginSdk.escrow({ id, receiver: taker, asset: 0n, amount: 10_000n, proof: trades.getProof(0) }));
      if (cancel) {
        await execute(wallet, hyperSwapPluginSdk.cancel({ id, proof: participants.getProof(0) }));
        await execute(wallet, hyperSwapPluginSdk.withdraw({ id, receiver: taker, asset: 0n, amount: 10_000n, proof: trades.getProof(0) }));
      } else {
        await execute(partner, hyperSwapPluginSdk.escrow({ id, receiver: maker, asset: 0n, amount: 20_000n, proof: trades.getProof(1) }));
        await execute(wallet, hyperSwapPluginSdk.disburse({ id, receiverWallet: partner.appId, receiver: taker, asset: 0n, amount: 10_000n }));
        // Permissionless completion: an unrelated account releases the partner's leaf.
        await swapSdk.disburseFrom({
          id, from: taker, receiverWallet: wallet.appId, receiver: maker, asset: 0n, amount: 20_000n,
        });
      }
      expect((await swap.state.box.offers.value(id))?.state).toBe(cancel ? 60 : 40);
      for (const participant of [maker, taker]) {
        await swap.send.cleanupParticipant({ args: { id, participant }, extraFee: algokit.microAlgo(10_000) });
      }
      await swap.send.cleanupOffer({ args: { id }, extraFee: algokit.microAlgo(10_000) });
      await expect(swap.state.box.offers.value(id)).rejects.toThrow('box not found');
    });

    test('escrows ASA through the plugin after opting HyperSwap in before the transfer', async () => {
      const { assetId } = await algorand.send.assetCreate({ sender: deployer.addr, signer: deployer.signer, total: 100n, decimals: 0 });
      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(5_000_000) });
      await wallet.addPlugin({ client: akitaUniverse.optInPlugin, callerType: CallerType.Global });
      await wallet.usePlugin({ callerType: CallerType.Global, calls: [akitaUniverse.optInPlugin.optIn({ assets: [assetId] })] });
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: wallet.client.appAddress, assetId, amount: 10n });
      await algorand.send.assetOptIn({ sender: user.addr, signer: user.signer, assetId });
      const maker = wallet.client.appAddress.toString();
      const receiver = user.addr.toString();
      const participants = MerkleTree.of([[algosdk.decodeAddress(maker).publicKey]], [SchemaPart.Address]);
      const trades = MerkleTree.of([[algosdk.decodeAddress(maker).publicKey, algosdk.decodeAddress(receiver).publicKey, assetId, 10n]],
        [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64]);
      const swap = akitaUniverse.hyperSwap.client;
      const id = (await swap.state.global.offerCursor())!;
      const status = await algorand.client.algod.status().do();
      const block = await algorand.client.algod.block(status.lastRound).do();
      await wallet.usePlugin({ callerType: CallerType.Global, calls: [hyperSwapPluginSdk.offer({
        root: trades.root, leaves: 1, participantsRoot: participants.root, participantLeaves: 1,
        expiration: BigInt(block.block.header.timestamp) + 3600n,
      })] });
      await wallet.usePlugin({ callerType: CallerType.Global, calls: [hyperSwapPluginSdk.escrow({
        id, receiver, asset: assetId, amount: 10n, proof: [],
      })] });
      const account = await algorand.account.getInformation(maker);
      expect(account.authAddr?.toString() ?? maker).toBe(maker);
      await wallet.usePlugin({ callerType: CallerType.Global, calls: [hyperSwapPluginSdk.disburse({
        id, receiverWallet: 0n, receiver, asset: assetId, amount: 10n,
      })] });
      expect((await algorand.account.getInformation(receiver)).assets?.find(holding => holding.assetId === assetId)?.amount).toBe(10n);
      await swap.send.cleanupParticipant({ args: { id, participant: maker }, extraFee: algokit.microAlgo(10_000) });
      await swap.send.cleanupOffer({ args: { id }, extraFee: algokit.microAlgo(10_000) });
    });
  });
});
